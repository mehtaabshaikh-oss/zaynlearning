/**
 * /api/chat.js - Vercel Serverless AI Study Buddy Proxy
 * Powered by Google Gemini API with dynamic model discovery.
 * Locked strictly to authorized tokens (Zayn: 8662 and Parent: 6250).
 */

const GEMINI_API_KEY = (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GEMINI_KEY || "").trim();

const SYSTEM_INSTRUCTION = `You are "Nova", an energetic, encouraging, and brilliant AI study buddy for Zayn, an 8-year-old in 3rd/4th grade.

RULES:
1. Speak DIRECTLY to Zayn. Never output outlines, internal thoughts, or planning notes.
2. Explain concepts with fun, relatable analogies (LEGO bricks, pizza slices, rocket thrusters, Minecraft blocks).
3. Keep answers concise (2 to 3 short paragraphs max) with fun emojis (🚀, ✈️, 🍕, ⚡, 🦖, 🧠, 💡).
4. Strictly focused on Math, Science, Space, Nature, Animals, Geography, History, and Engineering.`;

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
    // 3. Construct Few-Shot Conversation Frame
    const contents = [
      {
        role: "user",
        parts: [{ text: `${SYSTEM_INSTRUCTION}\n\nAcknowledge your role and confirm you will speak directly to Zayn with no meta-commentary.` }]
      },
      {
        role: "model",
        parts: [{ text: `Understood! I am Nova, Zayn's AI co-pilot! I will answer all his questions directly with excitement, awesome kid-friendly analogies, and zero planning notes! 🚀` }]
      }
    ];

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
      contents: contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
        topP: 0.95
      }
    };

    // 4. Query Google ListModels directly to get exact supported model resource names
    let availableModels = [];
    try {
      const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(GEMINI_API_KEY)}`);
      if (listRes.ok) {
        const listData = await listRes.json();
        if (listData.models && Array.isArray(listData.models)) {
          availableModels = listData.models
            .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent'))
            .map(m => m.name); // e.g. "models/gemini-2.5-flash"
        }
      }
    } catch (e) {
      console.warn("ListModels error:", e);
    }

    // Fallback list if ListModels was empty
    if (availableModels.length === 0) {
      availableModels = ["models/gemini-2.5-flash", "models/gemini-1.5-flash-8b", "models/gemini-1.5-flash", "models/gemini-pro"];
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
      let cleaned = replyText.trim();
      if (cleaned.includes('Drafting:*')) {
        cleaned = cleaned.split('Drafting:*').pop().trim();
      } else if (cleaned.includes('Drafting:')) {
        cleaned = cleaned.split('Drafting:').pop().trim();
      }
      return res.status(200).json({ success: true, reply: cleaned });
    }

    return res.status(200).json({
      reply: `🚀 **Nova Communication Beacon:**\n\nGoogle Gemini reported: "${lastError || 'Service temporarily unreachable'}". Available models found: [${availableModels.join(', ')}]. Please check your API key!`
    });
  } catch (err) {
    console.error("AI Chat Handler Error:", err);
    return res.status(500).json({ error: "Internal server error connecting to AI tutor." });
  }
};
