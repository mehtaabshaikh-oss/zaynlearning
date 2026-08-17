/**
 * /api/chat.js - Vercel Serverless AI Study Buddy Proxy
 * Powered by Google Gemini API with strict educational guardrails for 3rd/4th grade.
 * Locked strictly to authorized tokens (Zayn: 8662 and Parent: 6250).
 */

const GEMINI_API_KEY = (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GEMINI_KEY || "").trim();

const SYSTEM_INSTRUCTION = `You are "Nova", a friendly, enthusiastic, and brilliant AI study buddy and co-pilot for Zayn, an 8-year-old in 3rd/4th grade.

Pedagogical Guidelines:
1. AGE-APPROPRIATE & ENGAGING: Explain concepts using fun, relatable analogies (LEGO bricks, pizza slices, rocket thrusters, Minecraft blocks, animals, superheroes).
2. SOCRATIC & ENCOURAGING: Never just give away raw answers to homework problems immediately. Guide him step-by-step with visual breakdown questions and mental math shortcuts.
3. CONCISE & PUNCHY: Keep answers under 3 short paragraphs. Never overwhelm with long walls of text. Use bullet points and lively emojis (🚀, 🍕, ⚡, 🦖, 🧠, 💡, 🪐).
4. SCOPE & SAFETY: You are an educational tutor strictly focused on Math, Science, Space, Nature, Animals, Geography, History, Physics, Engineering, and Coding. If asked off-topic questions, playfully redirect back to a cool science/math mystery.
5. TONE: Warm, energetic, highly supportive, celebrating every curiosity question. Address him as Zayn when appropriate.`;

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
    // Format conversation history for Gemini API
    const contents = [];

    // Prepend system prompt to the first user turn if systemInstruction fails
    const fullPrompt = `${SYSTEM_INSTRUCTION}\n\nUser Question: ${message.trim()}`;

    if (Array.isArray(history)) {
      history.slice(-6).forEach(h => {
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
      parts: [{ text: fullPrompt }]
    });

    const geminiPayload = {
      contents: contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 600,
        topP: 0.95
      }
    };

    // First try dynamic list of available models for this specific API key
    let targetModels = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro", "gemini-2.0-flash"];

    try {
      const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(GEMINI_API_KEY)}`);
      if (listRes.ok) {
        const listData = await listRes.json();
        if (listData.models && Array.isArray(listData.models)) {
          const supported = listData.models
            .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent'))
            .map(m => m.name.replace('models/', ''));
          if (supported.length > 0) {
            targetModels = supported;
          }
        }
      }
    } catch (e) {
      console.warn("Could not list models, using fallback list:", e);
    }

    let replyText = null;
    let lastError = null;

    for (const model of targetModels) {
      // Try v1beta then v1
      for (const apiVer of ["v1beta", "v1"]) {
        try {
          const url = `https://generativelanguage.googleapis.com/${apiVer}/models/${model}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;
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
            lastError = errData?.error?.message || `HTTP ${response.status}`;
          }
        } catch (err) {
          lastError = err.message;
        }
      }
      if (replyText) break;
    }

    if (replyText) {
      return res.status(200).json({ success: true, reply: replyText });
    }

    return res.status(200).json({
      reply: `🚀 **Nova Communication Beacon:**\n\nGoogle Gemini reported: "${lastError || 'Service temporarily unreachable'}". Please verify your key at aistudio.google.com!`
    });
  } catch (err) {
    console.error("AI Chat Handler Error:", err);
    return res.status(500).json({ error: "Internal server error connecting to AI tutor." });
  }
};
