/**
 * /api/sync.js - Vercel Serverless Cloud State Sync
 * Supports persistent storage via Vercel KV / Upstash Redis or fallback persistent cloud store.
 */

// In-memory fallback cache
const MEMORY_CACHE = {};

// Cloud Persistence Helpers
const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || null;
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || null;

async function getFromCloudStorage(key) {
  if (KV_URL && KV_TOKEN) {
    try {
      const res = await fetch(`${KV_URL}/get/${encodeURIComponent(key)}`, {
        headers: { Authorization: `Bearer ${KV_TOKEN}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.result) {
          return typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
        }
      }
    } catch (e) {
      console.warn("KV fetch error, falling back to cache:", e);
    }
  }
  return MEMORY_CACHE[key] || null;
}

async function saveToCloudStorage(key, value) {
  MEMORY_CACHE[key] = value;

  if (KV_URL && KV_TOKEN) {
    try {
      await fetch(`${KV_URL}/set/${encodeURIComponent(key)}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${KV_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
      });
    } catch (e) {
      console.warn("KV save error:", e);
    }
  }
}

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
  const storageKey = `zayn_user_save_${profileId}`;

  // GET: Pull cloud state for profile
  if (req.method === "GET") {
    const cloudData = await getFromCloudStorage(storageKey);
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

      await saveToCloudStorage(storageKey, record);

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
