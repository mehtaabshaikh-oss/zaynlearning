/**
 * /api/scores - Vercel Serverless Function
 * Handles arcade high scores, personal records, and match telemetry per game.
 */

let scoresCache = {
  zayn: {}
};

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
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
    const studentRecords = scoresCache[studentId] || {};
    return res.status(200).json({
      success: true,
      studentId,
      records: studentRecords
    });
  }

  if (req.method === 'POST') {
    const { gameId, score, accuracy, streak, mistakes } = req.body || {};
    if (!gameId) {
      return res.status(400).json({ error: 'Missing gameId in request body' });
    }

    if (!scoresCache[studentId]) scoresCache[studentId] = {};
    const currentRecord = scoresCache[studentId][gameId] || {
      highScore: 0,
      highAccuracy: 0,
      longestStreak: 0,
      gamesPlayed: 0,
      lastPlayedAt: null
    };

    const isNewHighScore = Number(score || 0) > currentRecord.highScore;
    const isNewHighAccuracy = Number(accuracy || 0) > currentRecord.highAccuracy;
    const isNewLongestStreak = Number(streak || 0) > currentRecord.longestStreak;

    scoresCache[studentId][gameId] = {
      highScore: Math.max(currentRecord.highScore, Number(score || 0)),
      highAccuracy: Math.max(currentRecord.highAccuracy, Number(accuracy || 0)),
      longestStreak: Math.max(currentRecord.longestStreak, Number(streak || 0)),
      gamesPlayed: currentRecord.gamesPlayed + 1,
      lastPlayedAt: new Date().toISOString(),
      recentMistakes: mistakes || []
    };

    return res.status(200).json({
      success: true,
      gameId,
      record: scoresCache[studentId][gameId],
      badgesAwarded: {
        newHighScore: isNewHighScore,
        newHighAccuracy: isNewHighAccuracy,
        newLongestStreak: isNewLongestStreak
      }
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
