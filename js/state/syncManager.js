/**
 * SyncManager - Client-Side Local-First Cloud Sync
 * Automatically syncs gameState, streaks, shields, and high scores to Vercel Serverless backend.
 */

class SyncManager {
  constructor() {
    this.studentId = 'zayn';
    this.apiBase = '/api';
    this.syncTimeout = null;
    this.isOnline = navigator.onLine;
    this.pendingSync = false;

    this.initListeners();
    this.pullCloudStateOnLaunch();
  }

  initListeners() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      if (this.pendingSync) this.pushStateToCloud();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  // Pull latest snapshot from cloud on launch (e.g. switching iPad to Laptop)
  async pullCloudStateOnLaunch() {
    if (!this.isOnline || window.location.protocol === 'file:') return;

    try {
      const res = await fetch(`${this.apiBase}/sync?studentId=${this.studentId}`);
      if (!res.ok) return;

      const data = await res.json();
      if (data.success && data.state) {
        const cloud = data.state;
        const local = window.gameState?.data;

        if (local && cloud) {
          // If cloud has higher XP or newer progress, merge into local
          if ((cloud.xp || 0) > (local.xp || 0) || (cloud.streak || 0) > (local.streak || 0)) {
            local.xp = Math.max(local.xp, cloud.xp || 0);
            local.gems = Math.max(local.gems, cloud.gems || 0);
            local.aura = Math.max(local.aura, cloud.aura || 0);
            local.level = Math.max(local.level, cloud.level || 1);
            local.streak = Math.max(local.streak, cloud.streak || 1);
            if (cloud.streakShields !== undefined) local.streakShields = cloud.streakShields;

            window.gameState.save();
            if (window.app) window.app.updateTopBarHUD();
            console.log('🔄 Synced latest progress from cloud!');
          }
        }
      }
    } catch (err) {
      // Graceful offline failover
      console.log('Cloud sync unavailable, running local-first mode.');
    }
  }

  // Debounced push to cloud whenever local state changes
  schedulePush() {
    this.pendingSync = true;
    if (this.syncTimeout) clearTimeout(this.syncTimeout);

    this.syncTimeout = setTimeout(() => {
      this.pushStateToCloud();
    }, 1500);
  }

  async pushStateToCloud() {
    if (!this.isOnline || window.location.protocol === 'file:' || !window.gameState) return;

    const payload = {
      studentId: this.studentId,
      ...window.gameState.data
    };

    try {
      const res = await fetch(`${this.apiBase}/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        this.pendingSync = false;
      }
    } catch (e) {
      // Keeps pendingSync true to retry on next reconnect
    }
  }

  // Record high score and match telemetry
  async recordArcadeScore(gameId, score, accuracy, streak, mistakes = []) {
    if (!this.isOnline) return;

    try {
      const res = await fetch(`${this.apiBase}/scores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: this.studentId,
          gameId,
          score,
          accuracy,
          streak,
          mistakes
        })
      });

      if (res.ok) {
        const data = await res.json();
        return data.badgesAwarded;
      }
    } catch (e) {}
  }

  // Ask AI Kid-Tutor a question
  async askAITutor(question, topic = 'math') {
    try {
      const res = await fetch(`${this.apiBase}/tutor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          topic,
          gradeLevel: '4th Grade'
        })
      });

      if (res.ok) {
        const data = await res.json();
        return data.answer;
      }
    } catch (e) {}

    return "Think of numbers like puzzle pieces! 🧩 When you break them down step-by-step, you've got this! ✨";
  }
}

window.SyncManager = SyncManager;
