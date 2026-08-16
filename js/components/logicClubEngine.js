/**
 * LogicClubEngine - "The 1% Club" Lateral Logic Quiz Engine
 * Progressively challenges logic, lateral deduction, and visual puzzles from 90% to 1%.
 */

class LogicClubEngine {
  constructor() {
    this.currentQuestionIdx = 0;
    this.passesRemaining = 1;
    this.selectedOption = null;
    this.timer = 30;
    this.timerInterval = null;
    this.isAnswerSubmitted = false;

    this.percentTag = document.getElementById('logic-percent-tag');
    this.passesIndicator = document.getElementById('logic-passes-indicator');
    this.stageContent = document.getElementById('logic-stage-content');
    this.passBtn = document.getElementById('logic-use-pass-btn');
    this.submitBtn = document.getElementById('logic-submit-btn');

    this.bindEvents();
  }

  bindEvents() {
    this.submitBtn.addEventListener('click', () => {
      if (this.isAnswerSubmitted) {
        this.nextQuestion();
      } else {
        this.handleSubmitAnswer();
      }
    });

    this.passBtn.addEventListener('click', () => this.handleUsePass());

    document.getElementById('exit-logic-btn').addEventListener('click', () => {
      this.clearTimer();
      window.app.showView('view-map');
    });

    const quickBtn = document.getElementById('quick-logic-btn');
    if (quickBtn) {
      quickBtn.addEventListener('click', () => {
        window.app.showView('view-logic-club');
        this.startQuiz();
      });
    }
  }

  startQuiz() {
    this.currentQuestionIdx = 0;
    this.passesRemaining = 1;
    this.renderQuestion();
  }

  clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  startTimer() {
    this.clearTimer();
    this.timer = 30;
    const timerFill = document.getElementById('logic-timer-fill');
    if (timerFill) timerFill.style.width = '100%';

    this.timerInterval = setInterval(() => {
      this.timer--;
      const timerFill = document.getElementById('logic-timer-fill');
      const timerText = document.getElementById('logic-timer-text');
      if (timerFill) {
        timerFill.style.width = `${(this.timer / 30) * 100}%`;
      }
      if (timerText) {
        timerText.textContent = `${this.timer}s`;
      }

      if (this.timer <= 0) {
        this.clearTimer();
        if (!this.isAnswerSubmitted) {
          this.handleTimeUp();
        }
      }
    }, 1000);
  }

  renderQuestion() {
    this.clearTimer();
    const q = CURRICULUM_DATA.logicClubQuestions[this.currentQuestionIdx];
    if (!q) {
      this.finishGauntlet();
      return;
    }

    this.selectedOption = null;
    this.isAnswerSubmitted = false;
    this.percentTag.textContent = q.tierLabel;
    this.passesIndicator.textContent = `🎟️ Pass: ${this.passesRemaining} Left`;
    this.passBtn.style.display = this.passesRemaining > 0 ? 'block' : 'none';
    this.submitBtn.textContent = 'LOCK IN ANSWER ➔';
    this.submitBtn.disabled = false;

    this.stageContent.innerHTML = `
      <div class="logic-card">
        <!-- Top Meta Bar & 30s Timer -->
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-family: var(--font-mono); font-size: 13px; color: #a5b4fc; font-weight: 700;">
            ${q.subLabel}
          </span>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 80px; height: 8px; background: rgba(0,0,0,0.5); border-radius: 4px; overflow: hidden;">
              <div id="logic-timer-fill" style="width: 100%; height: 100%; background: #6366f1; transition: width 1s linear;"></div>
            </div>
            <span id="logic-timer-text" style="font-family: var(--font-mono); font-size: 13px; color: #ffd500; font-weight: 800;">30s</span>
          </div>
        </div>

        <h2 style="font-size: 22px; font-family: var(--font-game); color: #fff; line-height: 1.4; white-space: pre-line;">
          ${q.prompt}
        </h2>

        ${q.clueText ? `<div class="logic-visual-clue">${q.clueText}</div>` : ''}

        <div class="options-grid" id="logic-options-grid" style="margin-top: 12px;"></div>

        <div id="logic-explanation-box" style="display: none; margin-top: 16px; padding: 16px 20px; border-radius: 12px; background: rgba(15, 23, 42, 0.95); border: 2px solid #818cf8; animation: slideUp 0.3s ease;">
          <div style="font-family: var(--font-mono); font-weight: 800; color: #ffd500; font-size: 13px; margin-bottom: 6px;">💡 1% CLUB LOGIC REVEAL:</div>
          <div style="font-size: 15px; color: #e2e8f0; line-height: 1.5;">${q.explanation}</div>
        </div>
      </div>
    `;

    const optionsGrid = this.stageContent.querySelector('#logic-options-grid');
    q.options.forEach(opt => {
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

    this.startTimer();
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

    this.currentQuestionIdx++;
    this.renderQuestion();
  }

  handleSubmitAnswer() {
    this.clearTimer();
    const q = CURRICULUM_DATA.logicClubQuestions[this.currentQuestionIdx];
    if (!this.selectedOption) {
      if (window.helpers) window.helpers.spawnAuraFloatingText("Select an option first! 🧠", undefined, undefined, false);
      return;
    }

    this.isAnswerSubmitted = true;
    const isCorrect = this.selectedOption === q.answer;
    const allBtns = this.stageContent.querySelectorAll('.option-btn');
    const explBox = this.stageContent.querySelector('#logic-explanation-box');

    if (explBox) {
      explBox.style.display = 'block';
    }

    if (isCorrect) {
      if (window.soundEngine) window.soundEngine.playCorrect();
      if (window.helpers) window.helpers.spawnAuraFloatingText(`+${q.auraGain} AURA! 🧠📈`, undefined, undefined, true);
      window.gameState.addAura(q.auraGain);
      window.gameState.addXP(Math.floor(q.auraGain / 3));

      allBtns.forEach(btn => {
        if (btn.textContent === q.answer) btn.classList.add('correct');
      });

      this.submitBtn.textContent = 'NEXT QUESTION ➔';
    } else {
      if (window.soundEngine) window.soundEngine.playWrong();
      if (window.helpers) window.helpers.spawnAuraFloatingText("Logic Trap! 💀", undefined, undefined, false);

      allBtns.forEach(btn => {
        if (btn.textContent === this.selectedOption) btn.classList.add('wrong');
        if (btn.textContent === q.answer) btn.classList.add('correct');
      });

      this.submitBtn.textContent = 'CONTINUE ➔';
    }
  }

  nextQuestion() {
    this.currentQuestionIdx++;
    this.renderQuestion();
  }

  finishGauntlet() {
    this.clearTimer();
    if (window.soundEngine) window.soundEngine.playLevelUp();
    if (window.helpers) window.helpers.spawnConfetti(120);

    window.gameState.addGems(100);
    window.gameState.addXP(500);

    document.getElementById('reward-title').textContent = "TOP 1% GRANDMASTER ACHIEVED!";
    document.getElementById('reward-sub').textContent = "You conquered the entire 1% Club logic gauntlet with 99th percentile brainpower!";
    document.getElementById('reward-xp').textContent = "+500 XP";
    document.getElementById('reward-gems').textContent = "+100 Gems";
    document.getElementById('reward-aura').textContent = "+5,000 Aura";

    const starsRow = document.getElementById('reward-stars-row');
    starsRow.innerHTML = '👑🧠🏆';

    const rewardModal = document.getElementById('reward-modal');
    rewardModal.classList.remove('hidden');

    document.getElementById('claim-reward-btn').onclick = () => {
      rewardModal.classList.add('hidden');
      window.app.showView('view-map');
    };
  }
}

window.LogicClubEngine = LogicClubEngine;
