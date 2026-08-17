/**
 * /api/sync.js - Vercel Serverless Cloud State Sync
 * Syncs user game progress, aura, streak, gems, achievements, and odyssey stamps.
 */

// In-memory fallback cloud store per profile
const CLOUD_DATABASE = {};

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Token Verification Helper
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace(/^Bearer\s+/i, "");

  let session = null;
  if (token) {
    try {
      const decoded = Buffer.from(token, "base64").toString("utf-8");
      session = JSON.parse(decoded);
    } catch (e) {
      // Invalid token format
    }
  }

  if (!session || !session.profileId) {
    return res.status(401).json({ error: "Unauthorized. Valid session token required." });
  }

  const profileId = session.profileId;

  // GET: Pull cloud state for profile
  if (req.method === "GET") {
    const cloudData = CLOUD_DATABASE[profileId] || null;
    return res.status(200).json({
      success: true,
      profileId,
      cloudData,
      lastSynced: cloudData ? cloudData.lastSynced : null
    });
  }

  // POST: Push full game state payload to cloud
  if (req.method === "POST") {
    try {
      const { gameState } = req.body || {};

      if (!gameState || typeof gameState !== "object") {
        return res.status(400).json({ error: "Missing gameState payload." });
      }

      const record = {
        profileId,
        gameState,
        lastSynced: new Date().toISOString(),
        version: "v1.2"
      };

      CLOUD_DATABASE[profileId] = record;

      return res.status(200).json({
        success: true,
        profileId,
        lastSynced: record.lastSynced,
        message: "Game state saved to cloud successfully."
      });
    } catch (err) {
      console.error("Sync error:", err);
      return res.status(500).json({ error: "Sync service error." });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
};
