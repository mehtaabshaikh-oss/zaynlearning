/**
 * ZaynLearns 1% Club - 11-Tier Lateral Logic Engine
 * 
 * 11 Tiers: 90%, 80%, 70%, 60%, 50%, 40%, 30%, 20%, 10%, 5%, 1%
 * Anti-Repetition with 80% unseen threshold and Spaced Memory
 * Interactive Visual SVG renderers for matrix, balance, cube, code, and map puzzles
 */

class LogicClubEngine {
  constructor() {
    this.tiers = ['90%', '80%', '70%', '60%', '50%', '40%', '30%', '20%', '10%', '5%', '1%'];
    this.currentTierIndex = 0;
    this.currentQuestion = null;
    this.selectedOption = null;
    this.isAnswerSubmitted = false;
    this.passesRemaining = 1;
    this.timer = 30;
    this.timerInterval = null;
    this.unlimitedTime = false;
    this.activeRunQuestions = [];

    this.initHistory();
    this.cacheDOM();
    this.bindEvents();
  }

  cacheDOM() {
    this.percentTag = document.getElementById('logic-percent-tag');
    this.passesIndicator = document.getElementById('logic-passes-indicator');
    this.stageContent = document.getElementById('logic-stage-content');
    this.passBtn = document.getElementById('logic-use-pass-btn');
    this.submitBtn = document.getElementById('logic-submit-btn');
    this.ladderContainer = document.getElementById('logic-ladder-container');
  }

  initHistory() {
    try {
      const stored = localStorage.getItem('zayn_1percent_history');
      this.history = stored ? JSON.parse(stored) : {
        seenQuestionIds: {}, // id -> { timesShown, timesCorrect, lastSession }
        sessionCount: 0,
        recentQuestions: []
      };
    } catch (e) {
      this.history = { seenQuestionIds: {}, sessionCount: 0, recentQuestions: [] };
    }
  }

  saveHistory() {
    try {
      localStorage.setItem('zayn_1percent_history', JSON.stringify(this.history));
    } catch (e) {}
  }

  bindEvents() {
    if (this.submitBtn) {
      this.submitBtn.addEventListener('click', () => {
        if (this.isAnswerSubmitted) {
          this.nextQuestion();
        } else {
          this.handleSubmitAnswer();
        }
      });
    }

    if (this.passBtn) {
      this.passBtn.addEventListener('click', () => this.handleUsePass());
    }

    const exitBtn = document.getElementById('exit-logic-btn');
    if (exitBtn) {
      exitBtn.addEventListener('click', () => {
        this.clearTimer();
        window.app.showView('view-arcade-hub');
      });
    }

    const quickBtn = document.getElementById('quick-logic-btn');
    if (quickBtn) {
      quickBtn.addEventListener('click', () => {
        window.app.showView('view-logic-club');
        this.startQuiz();
      });
    }

    const adminBtn = document.getElementById('open-logic-bank-admin-btn');
    if (adminBtn) {
      adminBtn.addEventListener('click', () => {
        if (window.logicBankAdminModal) {
          window.logicBankAdminModal.open();
        }
      });
    }
  }

  startQuiz() {
    this.history.sessionCount = (this.history.sessionCount || 0) + 1;
    this.saveHistory();

    this.currentTierIndex = 0;
    this.passesRemaining = 1;
    this.activeRunQuestions = this.selectQuestionsForRun();
    this.renderLadderHUD();
    this.renderCurrentTierQuestion();
  }

  selectQuestionsForRun() {
    const selected = [];
    const usedCategories = new Set();

    this.tiers.forEach(tier => {
      let pool = window.LogicClubData.getQuestionsByTier(tier);
      if (!pool || pool.length === 0) {
        pool = [window.LogicClubData.generators.generateNumberSequence(tier)];
      }

      // Filter out recently seen unless 80% of tier has been seen
      const seenInTier = pool.filter(q => {
        const h = this.history.seenQuestionIds[q.id];
        return h && (this.history.sessionCount - (h.lastSession || 0) < 5);
      });

      let candidatePool = pool;
      if (seenInTier.length < pool.length * 0.8) {
        const fresh = pool.filter(q => !this.history.seenQuestionIds[q.id]);
        if (fresh.length > 0) candidatePool = fresh;
      }

      // Prefer unused categories in current run for balance
      const balanced = candidatePool.filter(q => !usedCategories.has(q.category));
      const finalPool = balanced.length > 0 ? balanced : candidatePool;
      const chosen = finalPool[Math.floor(Math.random() * finalPool.length)];

      usedCategories.add(chosen.category);
      selected.push(chosen);
    });

    return selected;
  }

  renderLadderHUD() {
    if (!this.ladderContainer) return;
    this.ladderContainer.innerHTML = `
      <div class="logic-ladder-track">
        ${this.tiers.map((t, idx) => {
          let statusClass = 'pending';
          if (idx < this.currentTierIndex) statusClass = 'completed';
          else if (idx === this.currentTierIndex) statusClass = 'active';
          return `
            <div class="ladder-node ${statusClass} ${t === '1%' ? 'top-tier' : ''}">
              <span class="ladder-label">${t}</span>
              ${statusClass === 'completed' ? '<span class="check">✓</span>' : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  startTimer(seconds = 30) {
    this.clearTimer();
    this.timer = seconds;
    const timerFill = document.getElementById('logic-timer-fill');
    const timerText = document.getElementById('logic-timer-text');
    if (timerFill) timerFill.style.width = '100%';
    if (timerText) timerText.textContent = `${this.timer}s`;

    this.timerInterval = setInterval(() => {
      const el = document.getElementById('view-logic-club');
      if (!el || el.classList.contains('hidden')) {
        this.clearTimer();
        return;
      }
      if (this.unlimitedTime) return;
      this.timer--;
      if (timerFill) timerFill.style.width = `${(this.timer / seconds) * 100}%`;
      if (timerText) timerText.textContent = `${this.timer}s`;

      if (this.timer <= 0) {
        this.clearTimer();
        if (!this.isAnswerSubmitted) {
          this.handleTimeUp();
        }
      }
    }, 1000);
  }

  renderCurrentTierQuestion() {
    this.clearTimer();
    const tier = this.tiers[this.currentTierIndex];
    const q = this.activeRunQuestions[this.currentTierIndex];
    this.currentQuestion = q;

    if (!q) {
      this.finishGauntlet();
      return;
    }

    // Record Times Shown
    if (!this.history.seenQuestionIds[q.id]) {
      this.history.seenQuestionIds[q.id] = { timesShown: 0, timesCorrect: 0, lastSession: this.history.sessionCount };
    }
    this.history.seenQuestionIds[q.id].timesShown++;
    this.history.seenQuestionIds[q.id].lastSession = this.history.sessionCount;
    this.saveHistory();

    this.selectedOption = null;
    this.isAnswerSubmitted = false;
    this.renderLadderHUD();

    if (this.percentTag) {
      this.percentTag.textContent = tier === '1%' ? '👑 1% CHALLENGE' : `${tier} TIER`;
      this.percentTag.className = `logic-tier-pill ${tier === '1%' ? 'epic-1pct' : ''}`;
    }

    if (this.passesIndicator) {
      this.passesIndicator.textContent = `🎟️ Pass: ${this.passesRemaining} Left`;
    }
    if (this.passBtn) {
      this.passBtn.style.display = this.passesRemaining > 0 ? 'block' : 'none';
    }
    if (this.submitBtn) {
      this.submitBtn.textContent = 'LOCK IN ANSWER ➔';
      this.submitBtn.disabled = false;
    }

    const visualHTML = this.renderVisualPuzzle(q);
    const isEpic1Pct = tier === '1%';
    const timerSeconds = isEpic1Pct ? 60 : 30;

    this.stageContent.innerHTML = `
      <div class="logic-card ${isEpic1Pct ? 'card-1pct-glow' : ''}">
        <!-- Top Meta Bar & Timer -->
        <div class="logic-card-header">
          <span class="category-badge">🏷️ ${q.category.replace(/_/g, ' ')}</span>
          <div class="timer-wrap">
            <div class="timer-bar-bg">
              <div id="logic-timer-fill" class="timer-bar-fill ${isEpic1Pct ? 'gold' : ''}"></div>
            </div>
            <span id="logic-timer-text" class="timer-countdown">${timerSeconds}s</span>
          </div>
        </div>

        <h2 class="logic-question-prompt">${q.question}</h2>

        ${visualHTML ? `<div class="logic-visual-container">${visualHTML}</div>` : ''}

        <div class="options-grid" id="logic-options-grid"></div>

        <div id="logic-explanation-box" class="logic-reveal-box" style="display: none;">
          <div class="reveal-header">💡 1% CLUB LOGIC REVEAL:</div>
          <div class="reveal-text">${q.explanation}</div>
        </div>
      </div>
    `;

    const optionsGrid = this.stageContent.querySelector('#logic-options-grid');
    const choices = q.choices || ['Yes', 'No'];
    choices.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        if (this.isAnswerSubmitted) return;
        optionsGrid.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.selectedOption = opt;
        if (window.soundEngine) window.soundEngine.playTap();
      });
      optionsGrid.appendChild(btn);
    });

    this.startTimer(timerSeconds);
  }

  renderVisualPuzzle(q) {
    if (!q.visualType || q.visualType === 'none') return '';

    if (q.visualType === 'cube') {
      return `
        <svg viewBox="0 0 200 150" class="puzzle-svg">
          <polygon points="100,20 160,50 100,80 40,50" fill="#f87171" stroke="#fff" stroke-width="2"/>
          <polygon points="40,50 100,80 100,140 40,110" fill="#ef4444" stroke="#fff" stroke-width="2"/>
          <polygon points="100,80 160,50 160,110 100,140" fill="#b91c1c" stroke="#fff" stroke-width="2"/>
          <!-- Grid lines for 3x3 -->
          <line x1="60" y1="30" x2="120" y2="60" stroke="#fff" stroke-width="1.5"/>
          <line x1="80" y1="40" x2="140" y2="70" stroke="#fff" stroke-width="1.5"/>
          <line x1="120" y1="30" x2="60" y2="60" stroke="#fff" stroke-width="1.5"/>
          <line x1="140" y1="40" x2="80" y2="70" stroke="#fff" stroke-width="1.5"/>
        </svg>
      `;
    }

    if (q.visualType === 'balance') {
      return `
        <svg viewBox="0 0 240 120" class="puzzle-svg">
          <!-- Fulcrum -->
          <polygon points="120,70 100,110 140,110" fill="#64748b" stroke="#334155" stroke-width="2"/>
          <!-- Beam -->
          <line x1="30" y1="70" x2="210" y2="70" stroke="#cbd5e1" stroke-width="6" stroke-linecap="round"/>
          <!-- Left Pan -->
          <line x1="45" y1="70" x2="45" y2="95" stroke="#94a3b8" stroke-width="2"/>
          <path d="M 20 95 Q 45 110 70 95 Z" fill="#38bdf8"/>
          <!-- Right Pan -->
          <line x1="195" y1="70" x2="195" y2="95" stroke="#94a3b8" stroke-width="2"/>
          <path d="M 170 95 Q 195 110 220 95 Z" fill="#38bdf8"/>
          <!-- Gold Coins -->
          <circle cx="40" cy="92" r="7" fill="#ffd500" stroke="#b45309" stroke-width="1.5"/>
          <circle cx="50" cy="92" r="7" fill="#ffd500" stroke="#b45309" stroke-width="1.5"/>
          <circle cx="190" cy="92" r="7" fill="#ffd500" stroke="#b45309" stroke-width="1.5"/>
          <circle cx="200" cy="92" r="7" fill="#ffd500" stroke="#b45309" stroke-width="1.5"/>
        </svg>
      `;
    }

    if (q.visualType === 'map') {
      return `
        <svg viewBox="0 0 120 120" class="puzzle-svg" style="max-width: 100px;">
          <circle cx="60" cy="60" r="50" fill="rgba(15,23,42,0.8)" stroke="#38bdf8" stroke-width="3"/>
          <text x="60" y="24" fill="#fde047" font-weight="bold" text-anchor="middle" font-size="14">N</text>
          <text x="60" y="104" fill="#94a3b8" font-weight="bold" text-anchor="middle" font-size="14">S</text>
          <text x="100" y="65" fill="#94a3b8" font-weight="bold" text-anchor="middle" font-size="14">E</text>
          <text x="20" y="65" fill="#94a3b8" font-weight="bold" text-anchor="middle" font-size="14">W</text>
          <!-- Needle -->
          <polygon points="60,30 65,60 55,60" fill="#ef4444"/>
          <polygon points="60,90 65,60 55,60" fill="#64748b"/>
          <circle cx="60" cy="60" r="4" fill="#fff"/>
        </svg>
      `;
    }

    return '';
  }

  handleTimeUp() {
    if (window.soundEngine) window.soundEngine.playWrong();
    if (window.helpers) window.helpers.spawnAuraFloatingText("⏰ Time's Up!", undefined, undefined, false);
    this.handleSubmitAnswer();
  }

  handleUsePass() {
    if (this.passesRemaining <= 0 || this.isAnswerSubmitted) return;
    this.passesRemaining--;
    this.clearTimer();
    if (window.soundEngine) window.soundEngine.playTap();
    if (window.helpers) window.helpers.spawnAuraFloatingText("🎟️ Pass Used!", undefined, undefined, true);

    this.currentTierIndex++;
    this.renderCurrentTierQuestion();
  }

  handleSubmitAnswer() {
    this.clearTimer();
    const q = this.currentQuestion;
    if (!this.selectedOption) {
      if (window.helpers) window.helpers.spawnAuraFloatingText("Select an answer first! 🧠", undefined, undefined, false);
      return;
    }

    this.isAnswerSubmitted = true;
    const isCorrect = String(this.selectedOption).trim().toLowerCase() === String(q.answer).trim().toLowerCase();

    // Record accuracy
    if (isCorrect && this.history.seenQuestionIds[q.id]) {
      this.history.seenQuestionIds[q.id].timesCorrect++;
    }
    this.saveHistory();

    const allBtns = this.stageContent.querySelectorAll('.option-btn');
    const explBox = this.stageContent.querySelector('#logic-explanation-box');

    if (explBox) {
      explBox.style.display = 'block';
    }

    const tier = this.tiers[this.currentTierIndex];
    const auraBase = {
      '90%': 100, '80%': 150, '70%': 200, '60%': 250, '50%': 350,
      '40%': 500, '30%': 750, '20%': 1000, '10%': 1500, '5%': 2500, '1%': 5000
    }[tier] || 200;

    if (isCorrect) {
      if (window.soundEngine) window.soundEngine.playCorrect();
      if (window.helpers) window.helpers.spawnAuraFloatingText(`+${auraBase} AURA! 🧠📈`, undefined, undefined, true);
      window.gameState.addAura(auraBase);
      window.gameState.addXP(Math.floor(auraBase / 2));
      window.gameState.addGems(tier === '1%' ? 50 : 5);

      allBtns.forEach(btn => {
        if (String(btn.textContent).trim().toLowerCase() === String(q.answer).trim().toLowerCase()) {
          btn.classList.add('correct');
        }
      });

      this.submitBtn.textContent = this.currentTierIndex === this.tiers.length - 1 ? 'CLAIM 1% CROWN ➔' : 'NEXT TIER ➔';
    } else {
      if (window.soundEngine) window.soundEngine.playWrong();
      if (window.helpers) window.helpers.spawnAuraFloatingText("Logic Trap! 💀", undefined, undefined, false);

      allBtns.forEach(btn => {
        if (btn.textContent === this.selectedOption) btn.classList.add('wrong');
        if (String(btn.textContent).trim().toLowerCase() === String(q.answer).trim().toLowerCase()) {
          btn.classList.add('correct');
        }
      });

      this.submitBtn.textContent = 'CONTINUE ➔';
    }
  }

  nextQuestion() {
    this.currentTierIndex++;
    if (this.currentTierIndex >= this.tiers.length) {
      this.finishGauntlet();
    } else {
      this.renderCurrentTierQuestion();
    }
  }

  finishGauntlet() {
    this.clearTimer();
    if (window.soundEngine) window.soundEngine.playLevelUp();
    if (window.helpers) window.helpers.spawnConfetti(140);

    window.gameState.addGems(100);
    window.gameState.addXP(800);
    window.gameState.addAura(5000);

    document.getElementById('reward-title').textContent = "TOP 1% GRANDMASTER ACHIEVED!";
    document.getElementById('reward-sub').textContent = "You conquered all 11 tiers of the 1% Club gauntlet with legendary reasoning power!";
    document.getElementById('reward-xp').textContent = "+800 XP";
    document.getElementById('reward-gems').textContent = "+100 Gems";
    document.getElementById('reward-aura').textContent = "+5,000 Aura";

    const starsRow = document.getElementById('reward-stars-row');
    starsRow.innerHTML = '👑🧠⚡🏆';

    const rewardModal = document.getElementById('reward-modal');
    rewardModal.classList.remove('hidden');

    document.getElementById('claim-reward-btn').onclick = () => {
      rewardModal.classList.add('hidden');
      window.app.showView('view-arcade-hub');
    };
  }
}

window.LogicClubEngine = LogicClubEngine;
