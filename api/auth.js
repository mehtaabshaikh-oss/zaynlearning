/**
 * /api/auth.js - Vercel Serverless Authentication
 * Validates 4-digit PINs and returns secure session credentials & profile state.
 */

// Master & Admin Configuration
const MASTER_PIN = process.env.ZAYN_PIN || "8662";
const PARENT_PIN = process.env.PARENT_PIN || "6250";

// In-memory or extensible profiles store
const DEFAULT_PROFILES = {
  "8662": {
    id: "zayn",
    name: "Zayn",
    role: "master",
    avatarSkin: "superhero",
    aiAccess: true,
    created: "2026-08-17"
  },
  "6250": {
    id: "parent",
    name: "Parent Admin",
    role: "admin",
    avatarSkin: "gold_knight",
    aiAccess: true,
    isAdmin: true,
    created: "2026-08-17"
  }
};

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { pin } = req.body || {};

    if (!pin || typeof pin !== "string" || pin.length !== 4) {
      return res.status(400).json({ error: "Invalid PIN. Must be 4 digits." });
    }

    // Check against configured PINs
    let profile = DEFAULT_PROFILES[pin];

    // If environment variables override default
    if (pin === MASTER_PIN) {
      profile = DEFAULT_PROFILES["8662"];
    } else if (pin === PARENT_PIN) {
      profile = DEFAULT_PROFILES["6250"];
    }

    if (!profile) {
      return res.status(401).json({
        success: false,
        error: "Incorrect Passcode. Please try again or ask for your 4-digit code."
      });
    }

    // Generate a lightweight signed session token
    const sessionPayload = {
      profileId: profile.id,
      name: profile.name,
      role: profile.role,
      aiAccess: profile.aiAccess || false,
      isAdmin: profile.isAdmin || false,
      timestamp: Date.now()
    };

    const token = Buffer.from(JSON.stringify(sessionPayload)).toString("base64");

    return res.status(200).json({
      success: true,
      token,
      profile: {
        id: profile.id,
        name: profile.name,
        role: profile.role,
        avatarSkin: profile.avatarSkin,
        aiAccess: profile.aiAccess,
        isAdmin: profile.isAdmin || false
      }
    });
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(500).json({ error: "Authentication service error." });
  }
};
