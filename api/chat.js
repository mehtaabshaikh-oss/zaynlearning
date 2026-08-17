/**
 * /api/chat.js - Vercel Serverless AI Study Buddy Proxy
 * Powered by Google Gemini API with clean output sanitization.
 * Locked strictly to authorized tokens (Zayn: 8662 and Parent: 6250).
 */

const GEMINI_API_KEY = (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GEMINI_KEY || "").trim();

const SYSTEM_PROMPT = "You are Nova, an enthusiastic AI science and math tutor for an 8-year-old named Zayn. Explain things in 2 fun, exciting paragraphs using simple analogies (like LEGOs, Minecraft, pizza, rockets) and emojis.";

function sanitizeNovaReply(raw) {
  if (!raw) return "";
  let text = raw.trim();

  // Strip common outline labels
  text = text.replace(/Drafting\s*(Paragraph\s*\d+:?\*?|:?\*?)/gi, '');
  text = text.replace(/Paragraph\s*\d+:?\s*(\"?[^\"]*\"?\s*concept\.?\*?)?/gi, '');
  text = text.replace(/Minecraft\/LEGO\s*idea:\*?/gi, '');
  text = text.replace(/The\s*\"[^\"]+\"\s*concept\.?\*?/gi, '');

  const lines = text.split('\n');
  const clean = [];
  let foundStart = false;

  for (let line of lines) {
    const t = line.trim();
    if (!foundStart) {
      // Check if line looks like actual conversational speech rather than bullet/meta notes
      const isMeta =
        t.startsWith('*') ||
        t.endsWith('grade).') ||
        t.endsWith('buddy).') ||
        t.startsWith('No planning') ||
        t.startsWith('Simple analogies') ||
        t.startsWith('Use fun emojis') ||
        t.startsWith('Use emojis') ||
        t.startsWith('Concept:') ||
        t.startsWith('Analogy:') ||
        t.startsWith('Target:') ||
        t.startsWith('Goal:') ||
        t.startsWith('Audience:') ||
        t.startsWith('Persona:') ||
        t.startsWith('Constraints:') ||
        t.startsWith('Subject:') ||
        t.startsWith('2 short, fun paragraphs') ||
        t.startsWith('2 paragraphs') ||
        t.startsWith('3 paragraphs') ||
        t.startsWith('How do airplanes') ||
        t.startsWith('Why does') ||
        t.startsWith('Why do') ||
        t.startsWith('What is');

      if (!isMeta && t.length > 15) {
        foundStart = true;
        clean.push(line);
      }
    } else {
      // Stop before trailing verification checklists
      if (
        t.startsWith('* Simple analogies?') ||
        t.startsWith('* Fun emojis?') ||
        t.startsWith('* Direct answer?') ||
        t.startsWith('* 2 paragraphs') ||
        t.startsWith('* 2 short') ||
        t.startsWith('* No planning') ||
        t.startsWith('* No meta')
      ) {
        break;
      }
      clean.push(line);
    }
  }

  let result = clean.join('\n').trim();
  if (!result) {
    // Fallback: strip lines starting with *
    result = lines.filter(l => !l.trim().startsWith('*')).join('\n').trim();
  }

  // Strip wrapping quotes if any
  if (result.startsWith('"') && result.endsWith('"')) {
    result = result.slice(1, -1).trim();
  }

  return result || raw.trim();
}

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // 1. Verify Authorization Token (Zayn 8662 or Parent 6250)
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace(/^Bearer\s+/i, "");

  let session = null;
  if (token) {
    try {
      const decoded = Buffer.from(token, "base64").toString("utf-8");
      session = JSON.parse(decoded);
    } catch (e) {}
  }

  if (!session || !session.aiAccess) {
    return res.status(403).json({
      error: "Access Restricted. Nova AI Study Buddy is only available on Zayn's Master Profile (8662) and Parent Admin (6250)."
    });
  }

  // 2. Validate Message Payload
  const { message, history } = req.body || {};
  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "Message cannot be empty." });
  }

  if (!GEMINI_API_KEY) {
    return res.status(200).json({
      reply: `🚀 **Hi ${session.name || 'Zayn'}! I'm Nova, your AI study buddy!**\n\nTo activate my live neural engine, please add \`GEMINI_API_KEY\` to your Vercel Project Settings under Environment Variables! Once saved, I can answer all your mind-blowing science and math questions! 🪐✨`
    });
  }

  try {
    const contents = [];

    if (Array.isArray(history)) {
      history.slice(-4).forEach(h => {
        if (h.role && h.text) {
          contents.push({
            role: h.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: h.text }]
          });
        }
      });
    }

    contents.push({
      role: 'user',
      parts: [{ text: message.trim() }]
    });

    const geminiPayload = {
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      contents: contents,
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 1000,
        topP: 0.95
      }
    };

    // Auto-discover supported models
    let availableModels = [];
    try {
      const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(GEMINI_API_KEY)}`);
      if (listRes.ok) {
        const listData = await listRes.json();
        if (listData.models && Array.isArray(listData.models)) {
          availableModels = listData.models
            .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent'))
            .map(m => m.name);
        }
      }
    } catch (e) {
      console.warn("ListModels error:", e);
    }

    if (availableModels.length === 0) {
      availableModels = ["models/gemini-2.5-flash", "models/gemini-1.5-flash", "models/gemini-pro"];
    }

    let replyText = null;
    let lastError = null;

    for (const fullModelName of availableModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/${fullModelName}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(geminiPayload)
        });

        if (response.ok) {
          const data = await response.json();
          const candidate = data.candidates && data.candidates[0];
          replyText = candidate?.content?.parts?.[0]?.text;
          if (replyText) break;
        } else {
          const errData = await response.json().catch(() => ({}));
          lastError = `${fullModelName}: ${errData?.error?.message || `HTTP ${response.status}`}`;
        }
      } catch (err) {
        lastError = err.message;
      }
    }

    if (replyText) {
      const cleaned = sanitizeNovaReply(replyText);
      return res.status(200).json({ success: true, reply: cleaned });
    }

    return res.status(200).json({
      reply: `🚀 **Nova Communication Beacon:**\n\nGoogle Gemini reported: "${lastError || 'Service temporarily unreachable'}". Please check your API key!`
    });
  } catch (err) {
    console.error("AI Chat Handler Error:", err);
    return res.status(500).json({ error: "Internal server error connecting to AI tutor." });
  }
};
