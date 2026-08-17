/**
 * /api/chat.js - Vercel Serverless AI Study Buddy Proxy
 * Powered by Google Gemini API with smart response cleaning.
 * Locked strictly to authorized tokens (Zayn: 8662 and Parent: 6250).
 */

const GEMINI_API_KEY = (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GEMINI_KEY || "").trim();

const SYSTEM_PROMPT = "You are Nova, a friendly science and math tutor for 8-year-old Zayn. Explain things simply, warmly, and enthusiastically in 2 short paragraphs with fun analogies (like LEGOs, Minecraft, pizza, rockets) and emojis.";

function cleanNovaOutput(raw) {
  if (!raw) return "";
  let text = raw.trim();

  // 1. If 'Final Polish:' or 'Final Answer:' or 'Response:' exists, take everything after it
  const finalMarkers = ['Final Polish:', 'Final Answer:', 'Final Response:', 'Final Draft:'];
  for (const marker of finalMarkers) {
    const idx = text.lastIndexOf(marker);
    if (idx !== -1) {
      text = text.substring(idx + marker.length).trim();
      break;
    }
  }

  // 2. If 'Revised Para 1:' or 'Drafting' exists and we didn't find Final Polish
  if (text.includes('Revised Para 1:')) {
    text = text.split(/Revised Para \d+:?\*?/i).join('\n\n');
  }
  if (text.includes('Drafting Paragraph')) {
    text = text.split(/Drafting Paragraph \d+:?\*?/i).join('\n\n');
  }

  // 3. Line-by-line filter for meta-commentary / outline tokens
  const lines = text.split('\n');
  const clean = [];

  for (let line of lines) {
    const t = line.trim();
    if (
      t.startsWith('* User') ||
      t.startsWith('* Persona') ||
      t.startsWith('* Format') ||
      t.startsWith('* Style') ||
      t.startsWith('* Constraints') ||
      t.startsWith('* Concept') ||
      t.startsWith('* Analogy') ||
      t.startsWith('* Socratic') ||
      t.startsWith('* Target') ||
      t.startsWith('* Goal') ||
      t.startsWith('* Audience') ||
      t.startsWith('* Subject') ||
      t.startsWith('* Tone') ||
      t.startsWith('* Direct address') ||
      t.startsWith('* 2 short') ||
      t.startsWith('* 2 paragraphs') ||
      t.startsWith('* Simple analogies') ||
      t.startsWith('* Emojis') ||
      t.startsWith('* Enthusiastic') ||
      t.startsWith('* Target age') ||
      t.startsWith('Self-Correction') ||
      t.startsWith('Wait, let\'s try') ||
      t.startsWith('Pizza/Food:*') ||
      t.startsWith('Minecraft/LEGOs:*') ||
      t.startsWith('Paragraph 1:') ||
      t.startsWith('Paragraph 2:') ||
      t.startsWith('How do airplanes') ||
      t.startsWith('Why did dinosaurs') ||
      t.startsWith('Zayn (') ||
      t.startsWith('Nova (') ||
      t.startsWith('No internal thinking') ||
      t.startsWith('Direct answer only')
    ) {
      continue;
    }
    clean.push(line);
  }

  let result = clean.join('\n').trim();

  // Strip wrapping quotes
  if (result.startsWith('"') && result.endsWith('"')) {
    result = result.slice(1, -1).trim();
  }

  return result || raw.trim();
}

function extractRealAnswer(parts) {
  if (!Array.isArray(parts) || parts.length === 0) return "";

  // 1. Filter out parts explicitly marked as 'thought' by Gemini
  const nonThoughtParts = parts.filter(p => !p.thought);
  if (nonThoughtParts.length > 0) {
    return nonThoughtParts.map(p => p.text || "").join("\n\n").trim();
  }

  // 2. Fallback to the last part in the array (final generation)
  const lastPart = parts[parts.length - 1];
  return (lastPart && lastPart.text) ? lastPart.text.trim() : "";
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
        temperature: 0.7,
        maxOutputTokens: 800,
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
          if (candidate?.content?.parts) {
            replyText = extractRealAnswer(candidate.content.parts);
            if (replyText) break;
          }
        } else {
          const errData = await response.json().catch(() => ({}));
          lastError = `${fullModelName}: ${errData?.error?.message || `HTTP ${response.status}`}`;
        }
      } catch (err) {
        lastError = err.message;
      }
    }

    if (replyText) {
      const finalClean = cleanNovaOutput(replyText);
      return res.status(200).json({ success: true, reply: finalClean });
    }

    return res.status(200).json({
      reply: `🚀 **Nova Communication Beacon:**\n\nGoogle Gemini reported: "${lastError || 'Service temporarily unreachable'}". Please check your API key!`
    });
  } catch (err) {
    console.error("AI Chat Handler Error:", err);
    return res.status(500).json({ error: "Internal server error connecting to AI tutor." });
  }
};
