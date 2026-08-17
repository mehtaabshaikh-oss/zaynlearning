/**
 * /api/sync - Vercel Serverless Function
 * Handles cloud state synchronization for student profile, streaks, shields, and inventory.
 */

// In-memory / storage fallback for state sync
let cloudStorageCache = {};

module.exports = async function handler(req, res) {
  // Enable CORS for web client
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const studentId = req.query.studentId || (req.body && req.body.studentId) || 'zayn';

  if (req.method === 'GET') {
    // Return saved cloud state
    const saved = cloudStorageCache[studentId] || null;
    return res.status(200).json({
      success: true,
      studentId,
      state: saved,
      syncedAt: saved ? saved.lastSavedAt : null
    });
  }

  if (req.method === 'POST') {
    const incomingState = req.body;
    if (!incomingState) {
      return res.status(400).json({ error: 'Missing state payload in request body' });
    }

    const existing = cloudStorageCache[studentId] || {};
    
    // Conflict resolution: prefer highest XP / streak or latest timestamp
    const mergedState = {
      ...existing,
      ...incomingState,
      xp: Math.max(existing.xp || 0, incomingState.xp || 0),
      gems: Math.max(existing.gems || 0, incomingState.gems || 0),
      aura: Math.max(existing.aura || 0, incomingState.aura || 0),
      level: Math.max(existing.level || 1, incomingState.level || 1),
      streak: Math.max(existing.streak || 1, incomingState.streak || 1),
      streakShields: incomingState.streakShields !== undefined ? incomingState.streakShields : (existing.streakShields || 1),
      lastSavedAt: new Date().toISOString()
    };

    cloudStorageCache[studentId] = mergedState;

    return res.status(200).json({
      success: true,
      studentId,
      state: mergedState,
      syncedAt: mergedState.lastSavedAt
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
