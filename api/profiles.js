/**
 * /api/profiles.js - Manage Friend Codes & Profiles
 */

// In-memory profiles repository
const ACTIVE_PROFILES = [
  { id: "zayn", name: "Zayn", pin: "8662", role: "master", isMaster: true },
  { id: "parent", name: "Parent Admin", pin: "6250", role: "admin", isMaster: false }
];

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Token Verification
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace(/^Bearer\s+/i, "");

  let session = null;
  if (token) {
    try {
      const decoded = Buffer.from(token, "base64").toString("utf-8");
      session = JSON.parse(decoded);
    } catch (e) {}
  }

  if (!session) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  // GET: List profiles (sanitized for regular users, full for parent)
  if (req.method === "GET") {
    if (session.isAdmin) {
      return res.status(200).json({ success: true, profiles: ACTIVE_PROFILES });
    }
    const publicProfiles = ACTIVE_PROFILES.map(p => ({ id: p.id, name: p.name, role: p.role }));
    return res.status(200).json({ success: true, profiles: publicProfiles });
  }

  // POST: Create a new Friend Code (Admin only)
  if (req.method === "POST") {
    if (!session.isAdmin) {
      return res.status(403).json({ error: "Only Parent Admin can create new friend codes." });
    }

    const { name, pin } = req.body || {};

    if (!name || !pin || pin.length !== 4) {
      return res.status(400).json({ error: "Name and 4-digit PIN required." });
    }

    if (ACTIVE_PROFILES.some(p => p.pin === pin)) {
      return res.status(400).json({ error: "This 4-digit PIN is already assigned." });
    }

    const newProfile = {
      id: "friend_" + Date.now(),
      name: String(name).trim(),
      pin: String(pin).trim(),
      role: "friend",
      isMaster: false,
      created: new Date().toISOString()
    };

    ACTIVE_PROFILES.push(newProfile);

    return res.status(200).json({
      success: true,
      message: `Friend code created for ${newProfile.name}!`,
      profile: newProfile
    });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
};
