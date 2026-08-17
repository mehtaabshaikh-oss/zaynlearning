/**
 * PhonkDriftArena - Dual Speed Math Drill Arena
 * Mode 1: 🏎️ 60s Phonk Drift (Continuous rapid-fire with Phonk beats)
 * Mode 2: ⭐ Star Speed Math (2-Minute Championship • 5s/question countdown • 1×1 to 12×10)
 */

class PhonkDriftArena {
  constructor() {
    this.currentMode = 'drift'; // 'drift' | 'star'
    this.timeLeft = 60;
    this.timerInterval = null;

    // Per-question timer for Star Speed Math (5.0s)
    this.qTimeLeft = 5.0;
    this.qTimerInterval = null;

    this.combo = 1;
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.currentAnswer = null;

    // DOM Elements
    this.timerEl = document.getElementById('drift-timer');
    this.timerUnitEl = document.getElementById('drift-timer-unit');
    this.comboValEl = document.getElementById('drift-combo-val');
    this.scoreValEl = document.getElementById('drift-score');
    this.modeTitleEl = document.getElementById('drift-q-mode-title');
    this.statsEl = document.getElementById('drift-q-stats');
    this.mathExprEl = document.getElementById('drift-math-expr');
    this.optionsGrid = document.getElementById('drift-options-grid');

    // 5s Question countdown bar
    this.qTimerWrap = document.getElementById('speed-q-timer-wrap');
    this.qTimerValEl = document.getElementById('speed-q-timer-val');
    this.qTimerFillEl = document.getElementById('speed-q-timer-bar-fill');

    this.modeBtnDrift = document.getElementById('mode-btn-drift');
    this.modeBtnStar = document.getElementById('mode-btn-star');

    this.bindEvents();
  }

  bindEvents() {
    document.getElementById('exit-drift-btn').addEventListener('click', () => {
      this.endGame(true);
      window.app.showView('view-arcade-hub');
    });

    const quickBtn = document.getElementById('quick-drift-btn');
    if (quickBtn) {
      quickBtn.addEventListener('click', () => {
        window.app.showView('view-phonk-arena');
        this.startArena(this.currentMode);
      });
    }

    if (this.modeBtnDrift) {
      this.modeBtnDrift.addEventListener('click', () => {
        this.switchMode('drift');
      });
    }

    if (this.modeBtnStar) {
      this.modeBtnStar.addEventListener('click', () => {
        this.switchMode('star');
      });
    }
  }

  switchMode(newMode) {
    if (this.currentMode === newMode) return;
    this.currentMode = newMode;

    if (this.modeBtnDrift) this.modeBtnDrift.classList.toggle('active', newMode === 'drift');
    if (this.modeBtnStar) this.modeBtnStar.classList.toggle('active', newMode === 'star');

    this.startArena(newMode);
  }

  isActive() {
    const el = document.getElementById('view-phonk-arena');
    return el && !el.classList.contains('hidden');
  }

  startArena(mode = this.currentMode) {
    this.currentMode = mode;
    this.clearIntervals();

    this.combo = 1;
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;

    if (mode === 'star') {
      this.timeLeft = 120; // 2 Minutes total
      this.modeTitleEl.textContent = "⭐ STAR SPEED MATH";
      this.statsEl.textContent = "Multiplication: 1×1 to 12×10 (5s / Q)";
      if (this.qTimerWrap) this.qTimerWrap.classList.remove('hidden');
    } else {
      this.timeLeft = 60; // 60 Seconds total
      this.modeTitleEl.textContent = "🏎️ SPEED MULTIPLICATION";
      this.statsEl.textContent = "⚡ Rapid Phonk Drill: 2×2 to 12×12";
      if (this.qTimerWrap) this.qTimerWrap.classList.add('hidden');
    }

    this.updateHUD();

    if (window.soundEngine) {
      window.soundEngine.setMode('phonk');
    }

    // Main Overall Clock
    this.timerInterval = setInterval(() => {
      if (!this.isActive()) {
        this.clearIntervals();
        return;
      }
      this.timeLeft--;
      if (this.timerEl) this.timerEl.textContent = this.timeLeft;
      if (this.timeLeft <= 0) {
        this.endGame();
      }
    }, 1000);

    this.generateQuestion();
  }

  startQuestionCountdown() {
    if (this.currentMode !== 'star') return;
    if (this.qTimerInterval) clearInterval(this.qTimerInterval);

    this.qTimeLeft = 5.0;
    this.updateQuestionTimerBar();

    const tickMs = 50;
    this.qTimerInterval = setInterval(() => {
      if (!this.isActive()) {
        this.clearIntervals();
        return;
      }
      this.qTimeLeft -= tickMs / 1000;
      if (this.qTimeLeft <= 0) {
        this.qTimeLeft = 0;
        this.updateQuestionTimerBar();
        clearInterval(this.qTimerInterval);
        this.qTimerInterval = null;
        this.handleTimeOut();
      } else {
        this.updateQuestionTimerBar();
      }
    }, tickMs);
  }

  updateQuestionTimerBar() {
    if (!this.qTimerValEl || !this.qTimerFillEl) return;
    const pct = Math.max(0, Math.min(100, (this.qTimeLeft / 5.0) * 100));
    this.qTimerValEl.textContent = `${this.qTimeLeft.toFixed(1)}s`;
    this.qTimerFillEl.style.width = `${pct}%`;

    if (this.qTimeLeft <= 1.5) {
      this.qTimerFillEl.classList.add('danger');
    } else {
      this.qTimerFillEl.classList.remove('danger');
    }
  }

  handleTimeOut() {
    if (!this.isActive()) {
      this.clearIntervals();
      return;
    }
    // 5 seconds elapsed on Star Speed Math question
    this.incorrectCount++;
    this.combo = 1;
    if (window.soundEngine) window.soundEngine.playWrong();
    if (window.helpers) {
      window.helpers.spawnAuraFloatingText(`⏰ Time's Up! Ans: ${this.currentAnswer} (-25 Aura 📉)`, undefined, undefined, false);
    }
    this.updateHUD();
    this.generateQuestion();
  }

  generateQuestion() {
    let a, b;
    if (this.currentMode === 'star') {
      // Star Math multiplication: 1x1 to 12x10
      a = Math.floor(Math.random() * 12) + 1; // 1 to 12
      b = Math.floor(Math.random() * 10) + 1; // 1 to 10
    } else {
      // 60s Drift Arena: 2x2 to 12x12
      a = Math.floor(Math.random() * 11) + 2; // 2 to 12
      b = Math.floor(Math.random() * 11) + 2;
    }

    const ans = a * b;
    this.currentAnswer = ans;

    this.mathExprEl.textContent = `${a} × ${b} = ?`;
    this.optionsGrid.innerHTML = '';

    // Generate 3 clever distractors
    const options = new Set([ans]);
    while (options.size < 4) {
      const delta = (Math.floor(Math.random() * 4) + 1) * (Math.random() > 0.5 ? 1 : -1);
      let wrong;
      if (Math.random() > 0.5) {
        wrong = ans + delta;
      } else {
        wrong = ans + delta * (a > 1 ? a : b);
      }
      if (wrong > 0 && wrong !== ans) {
        options.add(wrong);
      }
    }

    // Shuffle options using Fisher-Yates
    const shuffled = Array.from(options).sort(() => Math.random() - 0.5);

    shuffled.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'drift-tap-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => this.handleAnswerTap(opt, btn));
      this.optionsGrid.appendChild(btn);
    });

    if (this.currentMode === 'star') {
      this.startQuestionCountdown();
    }
  }

  handleAnswerTap(chosen, btn) {
    if (this.currentMode === 'star' && this.qTimerInterval) {
      clearInterval(this.qTimerInterval);
      this.qTimerInterval = null;
    }

    if (chosen === this.currentAnswer) {
      // Correct!
      this.correctCount++;
      const basePts = this.currentMode === 'star' ? 150 : 100;
      const points = basePts * this.combo;
      this.score += points;
      this.combo = Math.min(10, this.combo + 1);

      if (window.soundEngine) {
        if (this.combo >= 4) {
          window.soundEngine.playCombo();
        } else {
          window.soundEngine.playCorrect();
        }
      }

      if (window.helpers) {
        window.helpers.spawnAuraFloatingText(`+${points} Aura! 🔥`, undefined, undefined, true);
      }

      this.comboValEl.classList.add('hype-bounce');
      setTimeout(() => this.comboValEl.classList.remove('hype-bounce'), 150);

      this.updateHUD();
      this.generateQuestion();
    } else {
      // Wrong
      this.incorrectCount++;
      this.combo = 1;
      if (window.soundEngine) window.soundEngine.playWrong();
      if (window.helpers) {
        window.helpers.spawnAuraFloatingText(`Wrong! (${chosen}) -25 Aura 📉`, undefined, undefined, false);
      }
      this.updateHUD();
      btn.style.borderColor = '#ef4444';
      setTimeout(() => this.generateQuestion(), 300);
    }
  }

  updateHUD() {
    this.scoreValEl.textContent = this.score;
    this.comboValEl.textContent = `${this.combo}x`;
    this.timerEl.textContent = this.timeLeft;

    const total = this.correctCount + this.incorrectCount;
    if (this.currentMode === 'star') {
      this.statsEl.textContent = `🎯 Solved: ${this.correctCount} / ${total} • Range: 1×1 to 12×10`;
    }
  }

  clearIntervals() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    if (this.qTimerInterval) {
      clearInterval(this.qTimerInterval);
      this.qTimerInterval = null;
    }
  }

  endGame(isManualExit = false) {
    this.clearIntervals();

    if (isManualExit) return;

    const finalAura = this.score;
    const finalXP = Math.floor(this.score / 2);
    const finalGems = Math.floor(this.score / 35);
    const totalQ = this.correctCount + this.incorrectCount;
    const acc = totalQ > 0 ? Math.round((this.correctCount / totalQ) * 100) : 0;

    window.gameState.addAura(finalAura);
    window.gameState.addXP(finalXP);
    window.gameState.addGems(finalGems);

    if (window.soundEngine) window.soundEngine.playLevelUp();
    if (window.helpers) window.helpers.spawnConfetti(90);

    const isStar = this.currentMode === 'star';
    document.getElementById('reward-title').textContent = isStar ? "⭐ STAR SPEED MATH CHAMPION!" : "🏎️ DRIFT SPEEDWAY COMPLETE!";
    document.getElementById('reward-sub').textContent = `Speed Sprint Finished! Solved ${this.correctCount}/${totalQ} (${acc}% Accuracy) • Total: +${finalAura} Aura!`;
    document.getElementById('reward-xp').textContent = `+${finalXP} XP`;
    document.getElementById('reward-gems').textContent = `+${finalGems} Gems`;
    document.getElementById('reward-aura').textContent = `+${finalAura} Aura`;

    const starsRow = document.getElementById('reward-stars-row');
    starsRow.innerHTML = isStar ? '⭐⭐⭐⭐⭐' : '🏎️💨⚡';

    const rewardModal = document.getElementById('reward-modal');
    rewardModal.classList.remove('hidden');

    document.getElementById('claim-reward-btn').onclick = () => {
      rewardModal.classList.add('hidden');
      window.app.showView('view-arcade-hub');
    };
  }
}

window.PhonkDriftArena = PhonkDriftArena;
