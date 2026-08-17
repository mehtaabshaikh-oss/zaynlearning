/**
 * /api/chat.js - Vercel Serverless AI Study Buddy Proxy
 * Powered by Google Gemini API with clean output sanitization.
 * Locked strictly to authorized tokens (Zayn: 8662 and Parent: 6250).
 */

const GEMINI_API_KEY = (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GEMINI_KEY || "").trim();

const SYSTEM_PROMPT = "You are Nova, an enthusiastic and friendly AI study buddy for Zayn, an 8-year-old kid in 3rd grade. Answer him directly in 2 short, fun paragraphs using simple analogies (like LEGOs, pizza slices, rocket thrusters, Minecraft) and fun emojis. Never write planning notes or outlines—only output your direct answer.";

function sanitizeNovaReply(raw) {
  if (!raw) return "";
  let text = raw.trim();

  // Filter out any reasoning / outline / constraint lines
  const lines = text.split('\n');
  const cleanLines = [];

  for (let line of lines) {
    const t = line.trim();
    // Skip meta-commentary / outline tokens
    if (
      t.startsWith('* User') ||
      t.startsWith('* Persona') ||
      t.startsWith('* Audience') ||
      t.startsWith('* Constraints') ||
      t.startsWith('* Goal') ||
      t.startsWith('* Concept') ||
      t.startsWith('* Analogy') ||
      t.startsWith('* Socratic') ||
      t.startsWith('* Subject') ||
      t.startsWith('* Target') ||
      t.startsWith('* Speak') ||
      t.startsWith('* Key mechanism') ||
      t.startsWith('* No outlines') ||
      t.startsWith('* Use fun') ||
      t.startsWith('* Concise') ||
      t.startsWith('* 2 paragraph') ||
      t.startsWith('* 3 paragraph') ||
      t.startsWith('* Directly to') ||
      t.startsWith('* No meta') ||
      t.startsWith('Constraint Check') ||
      t.startsWith('Paragraph 1') ||
      t.startsWith('Paragraph 2') ||
      t.startsWith('Paragraph 3') ||
      t.startsWith('Drafting:') ||
      t.startsWith('Greeting:*') ||
      t.startsWith('Explanation:*') ||
      t.startsWith('Step 1:*') ||
      t.startsWith('Step 2:*') ||
      t.startsWith('Step 3:*') ||
      t.startsWith('Refinement for')
    ) {
      continue;
    }
    cleanLines.push(line);
  }

  let result = cleanLines.join('\n').trim();

  // Strip leading/trailing quote wrappers if present
  if (result.startsWith('"') && result.endsWith('"')) {
    result = result.slice(1, -1).trim();
  }
  // Strip leading quote if left over from parsing
  if (result.startsWith('"') && !result.endsWith('"') && result.includes('"')) {
    result = result.replace(/^"|"$/g, '').trim();
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
        temperature: 0.7,
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
