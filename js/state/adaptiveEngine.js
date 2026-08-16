/**
 * Adaptive Learning Engine & Mistake Memory
 * Tracks speed, accuracy, and hint usage per topic to adjust challenges.
 */

class AdaptiveEngine {
  constructor() {
    this.memory = this.loadMemory();
  }

  loadMemory() {
    try {
      const saved = localStorage.getItem('zayn_math_mistake_memory_v1');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  }

  saveMemory() {
    try {
      localStorage.setItem('zayn_math_mistake_memory_v1', JSON.stringify(this.memory));
    } catch (e) {}
  }

  recordAttempt(skillKey, isCorrect, usedHint, responseTimeMs) {
    if (!this.memory[skillKey]) {
      this.memory[skillKey] = {
        attempts: 0,
        correct: 0,
        hintCount: 0,
        history: [],
        avgTimeMs: 0
      };
    }

    const item = this.memory[skillKey];
    item.attempts += 1;
    if (isCorrect) item.correct += 1;
    if (usedHint) item.hintCount += 1;

    item.history.push({
      correct: isCorrect,
      time: responseTimeMs,
      timestamp: Date.now()
    });

    if (item.history.length > 20) item.history.shift();

    item.avgTimeMs = Math.round(
      item.history.reduce((acc, h) => acc + h.time, 0) / item.history.length
    );

    this.saveMemory();
  }

  getSkillMastery(skillKey) {
    const item = this.memory[skillKey];
    if (!item || item.attempts < 3) return { status: 'learning', scorePercent: 50 };

    const recent = item.history.slice(-5);
    const recentCorrect = recent.filter(r => r.correct).length;
    const scorePercent = Math.round((recentCorrect / recent.length) * 100);

    let status = 'learning';
    if (scorePercent >= 90 && item.attempts >= 8) status = 'mastered';
    else if (scorePercent >= 75) status = 'strong';
    else if (scorePercent < 50) status = 'needs_practice';

    return { status, scorePercent };
  }

  getEncouragingFeedback(context = 'general') {
    const feedbackOptions = {
      general: [
        "That did not work. What could we change? 💡",
        "Interesting result! Let's test a new hypothesis. 🔬",
        "Every experiment gets us closer to the answer! 🧪",
        "Great scientific attempt! What variable should we adjust? ⚙️"
      ],
      rover: [
        "Your rover reached a dead end. Debug the program! 🛰️",
        "Obstacle detected! Review your command sequence. 🛰️",
        "Rover out of path. Check your turns and steps! 🗺️"
      ],
      bridge: [
        "Your bridge needs more triangular support! 🏗️",
        "Tension overload! Reinforce the center beams. 📐"
      ],
      circuit: [
        "Current blocked! Check for disconnected wires or open switches. ⚡",
        "Circuit incomplete! Trace the path from (+) to (-). 🔌"
      ],
      angle: [
        "Close shot! Adjust the angle and try another trajectory. 🎯",
        "Trajectory was just off! Try estimating the target arc. 📐"
      ],
      code: [
        "Pattern not quite matching. Check the differences between numbers! 🔐",
        "Deduction clue: Look at the yellow and green peg feedback! 🟢🟡"
      ]
    };

    const list = feedbackOptions[context] || feedbackOptions.general;
    return list[Math.floor(Math.random() * list.length)];
  }
}

window.adaptiveEngine = new AdaptiveEngine();
