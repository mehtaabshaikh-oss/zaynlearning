/**
 * PhonkDriftArena - 60-Second High-Speed Mental Math Drill
 * Uses Phonk beats, rapid-fire multipliers, combo streak meters, and Aura bonuses.
 */

class PhonkDriftArena {
  constructor() {
    this.timeLeft = 60;
    this.timerInterval = null;
    this.combo = 1;
    this.score = 0;
    this.currentAnswer = null;

    this.timerEl = document.getElementById('drift-timer');
    this.comboValEl = document.getElementById('drift-combo-val');
    this.scoreValEl = document.getElementById('drift-score');
    this.mathExprEl = document.getElementById('drift-math-expr');
    this.optionsGrid = document.getElementById('drift-options-grid');

    this.bindEvents();
  }

  bindEvents() {
    document.getElementById('exit-drift-btn').addEventListener('click', () => {
      this.endGame();
      window.app.showView('view-arcade-hub');
    });

    const quickBtn = document.getElementById('quick-drift-btn');
    if (quickBtn) {
      quickBtn.addEventListener('click', () => {
        window.app.showView('view-phonk-arena');
        this.startArena();
      });
    }
  }

  startArena() {
    this.timeLeft = 60;
    this.combo = 1;
    this.score = 0;
    this.updateHUD();

    if (window.soundEngine) {
      window.soundEngine.setMode('phonk');
    }

    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      this.timerEl.textContent = this.timeLeft;
      if (this.timeLeft <= 0) {
        this.endGame();
      }
    }, 1000);

    this.generateQuestion();
  }

  generateQuestion() {
    // Generate multiplication tables 2 to 12 or 2-digit mental math
    const a = Math.floor(Math.random() * 11) + 2; // 2 to 12
    const b = Math.floor(Math.random() * 11) + 2;
    const ans = a * b;
    this.currentAnswer = ans;

    this.mathExprEl.textContent = `${a} × ${b} = ?`;
    this.optionsGrid.innerHTML = '';

    // Generate 3 clever distractors
    const options = new Set([ans]);
    while (options.size < 4) {
      const offset = (Math.floor(Math.random() * 5) + 1) * (Math.random() > 0.5 ? 1 : -1) * (Math.random() > 0.5 ? 1 : a);
      const wrong = ans + offset;
      if (wrong > 0 && wrong !== ans) {
        options.add(wrong);
      }
    }

    const shuffled = Array.from(options).sort(() => Math.random() - 0.5);

    shuffled.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'drift-tap-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => this.handleAnswerTap(opt, btn));
      this.optionsGrid.appendChild(btn);
    });
  }

  handleAnswerTap(chosen, btn) {
    if (chosen === this.currentAnswer) {
      // Correct!
      const points = 100 * this.combo;
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
      this.combo = 1;
      if (window.soundEngine) window.soundEngine.playWrong();
      if (window.helpers) {
        window.helpers.spawnAuraFloatingText("Combo Dropped!", undefined, undefined, false);
      }
      this.updateHUD();
      btn.style.borderColor = '#ef4444';
    }
  }

  updateHUD() {
    this.scoreValEl.textContent = this.score;
    this.comboValEl.textContent = `${this.combo}x`;
    this.timerEl.textContent = this.timeLeft;
  }

  endGame() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    const finalAura = this.score;
    const finalXP = Math.floor(this.score / 2);
    const finalGems = Math.floor(this.score / 40);

    window.gameState.addAura(finalAura);
    window.gameState.addXP(finalXP);
    window.gameState.addGems(finalGems);

    if (finalAura > 0) {
      if (window.soundEngine) window.soundEngine.playLevelUp();
      if (window.helpers) window.helpers.spawnConfetti(90);

      document.getElementById('reward-title').textContent = "DRIFT SPEEDWAY COMPLETE!";
      document.getElementById('reward-sub').textContent = `Speed Drill Finished! Total Score: ${finalAura} Aura!`;
      document.getElementById('reward-xp').textContent = `+${finalXP} XP`;
      document.getElementById('reward-gems').textContent = `+${finalGems} Gems`;
      document.getElementById('reward-aura').textContent = `+${finalAura} Aura`;

      const starsRow = document.getElementById('reward-stars-row');
      starsRow.innerHTML = '🏎️💨⚡';

      const rewardModal = document.getElementById('reward-modal');
      rewardModal.classList.remove('hidden');

      document.getElementById('claim-reward-btn').onclick = () => {
        rewardModal.classList.add('hidden');
        window.app.showView('view-arcade-hub');
      };
    }
  }
}

window.PhonkDriftArena = PhonkDriftArena;
