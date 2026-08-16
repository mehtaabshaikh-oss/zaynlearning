/**
 * LessonEngine - Step-by-Step Interactive Lesson Runner
 * Handles Discover, Watch, Try Together, Practice, Challenge & Results with Pixel companion reactions.
 */

class LessonEngine {
  constructor() {
    this.currentNode = null;
    this.currentStepIndex = 0;
    this.selectedOption = null;
    this.hintsUsed = 0;
    this.correctAnswersCount = 0;
    this.stageContainer = document.getElementById('lesson-stage-container');
    this.progressFill = document.getElementById('lesson-progress-fill');
    this.stepIndicator = document.getElementById('lesson-step-indicator');
    this.checkBtn = document.getElementById('lesson-check-btn');
    this.hintBtn = document.getElementById('lesson-hint-btn');
    this.sidekickText = document.getElementById('sidekick-text');

    this.bindEvents();
  }

  bindEvents() {
    this.checkBtn.addEventListener('click', () => this.handleCheckOrContinue());
    this.hintBtn.addEventListener('click', () => this.handleUseHint());
    document.getElementById('exit-lesson-btn').addEventListener('click', () => {
      window.app.showView('view-map');
    });
  }

  startLesson(node) {
    this.currentNode = node;
    this.currentStepIndex = 0;
    this.hintsUsed = 0;
    this.correctAnswersCount = 0;
    this.selectedOption = null;
    this.renderCurrentStep();
  }

  renderCurrentStep() {
    const step = this.currentNode.steps[this.currentStepIndex];
    if (!step) return;

    this.selectedOption = null;
    this.isStepResolved = false;
    this.checkBtn.textContent = (step.type === 'discover' || step.type === 'watch') ? 'CONTINUE ➔' : 'CHECK ANSWER ➔';
    this.checkBtn.disabled = false;
    this.hintBtn.style.display = step.hint ? 'block' : 'none';

    // Update Progress Bar
    const progressPct = ((this.currentStepIndex) / this.currentNode.steps.length) * 100;
    this.progressFill.style.width = `${progressPct}%`;
    this.stepIndicator.textContent = `Step ${this.currentStepIndex + 1}/${this.currentNode.steps.length}`;

    // Update Pixel Reaction
    this.sidekickText.textContent = step.sidekickReaction || "Let's lock in and master this!";

    // Render Stage Card
    this.stageContainer.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'lesson-card';

    card.innerHTML = `
      <div class="lesson-step-badge ${step.type}">${step.badge || 'LESSON'}</div>
      <h2 class="lesson-prompt-title">${step.title || step.prompt}</h2>
      ${step.explanation ? `<p class="lesson-explanation-text">${step.explanation}</p>` : ''}
      <div id="interactive-widget-area" class="interactive-widget-container"></div>
      <div id="options-area" class="options-grid"></div>
    `;

    this.stageContainer.appendChild(card);

    // Render Interactive Widget if present
    const widgetArea = card.querySelector('#interactive-widget-area');
    if (step.widget === 'lego-array') {
      InteractiveWidgets.renderLegoArray(widgetArea, step.widgetConfig);
    } else if (step.widget === 'minecraft-crafting') {
      InteractiveWidgets.renderMinecraftCrafting(widgetArea, step.widgetConfig);
    } else if (step.widget === 'balance-scale') {
      InteractiveWidgets.renderBalanceScale(widgetArea, step.widgetConfig);
    } else if (step.widget === 'fraction-visual') {
      InteractiveWidgets.renderFractionVisual(widgetArea, step.widgetConfig);
    } else if (step.widget === 'geometry-rect') {
      InteractiveWidgets.renderGeometryRect(widgetArea, step.widgetConfig);
    } else {
      widgetArea.style.display = 'none';
    }

    // Render Multiple Choice Options if question step
    const optionsArea = card.querySelector('#options-area');
    if (step.options && step.options.length > 0) {
      optionsArea.style.display = 'grid';
      step.options.forEach((opt) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.addEventListener('click', () => {
          if (this.isStepResolved) return;
          optionsArea.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          this.selectedOption = opt;
          if (window.soundEngine) window.soundEngine.playTap();
        });
        optionsArea.appendChild(btn);
      });
    } else {
      optionsArea.style.display = 'none';
    }
  }

  handleUseHint() {
    const step = this.currentNode.steps[this.currentStepIndex];
    if (step.hint) {
      this.hintsUsed++;
      this.sidekickText.textContent = `💡 HINT: ${step.hint}`;
      if (window.soundEngine) window.soundEngine.playTap();
    }
  }

  handleCheckOrContinue() {
    const step = this.currentNode.steps[this.currentStepIndex];

    // Informational steps (Discover / Watch) or already resolved step -> advance
    if (step.type === 'discover' || step.type === 'watch' || this.isStepResolved) {
      this.advanceStep();
      return;
    }

    // Question steps
    if (!this.selectedOption) {
      this.sidekickText.textContent = "Pick an answer before checking! 🧠";
      return;
    }

    const isCorrect = this.selectedOption === step.answer;
    const allOptionBtns = this.stageContainer.querySelectorAll('.option-btn');

    if (isCorrect) {
      this.correctAnswersCount++;
      this.isStepResolved = true;
      if (window.soundEngine) window.soundEngine.playCorrect();
      if (window.helpers) window.helpers.spawnAuraFloatingText("+100 Aura 📈", undefined, undefined, true);
      window.gameState.addAura(100);

      allOptionBtns.forEach(btn => {
        if (btn.textContent === step.answer) {
          btn.classList.add('correct');
        }
      });

      this.sidekickText.textContent = "Bro is COOKING! 🔥 That is 100% correct!";
      this.checkBtn.textContent = 'NEXT STEP ➔';
    } else {
      if (window.soundEngine) window.soundEngine.playWrong();
      if (window.helpers) window.helpers.spawnAuraFloatingText("Almost! Try again", undefined, undefined, false);

      allOptionBtns.forEach(btn => {
        if (btn.textContent === this.selectedOption) {
          btn.classList.add('wrong');
        }
      });

      this.sidekickText.textContent = "Hmm, not quite! Check the hint or look at the numbers again. You got this!";
    }
  }

  advanceStep() {
    this.currentStepIndex++;
    if (this.currentStepIndex < this.currentNode.steps.length) {
      this.renderCurrentStep();
    } else {
      this.finishLesson();
    }
  }

  finishLesson() {
    const totalSteps = this.currentNode.steps.length;
    const accuracy = (this.correctAnswersCount / Math.max(1, totalSteps - 2)) * 100;
    let stars = 3;
    if (accuracy < 70) stars = 1;
    else if (accuracy < 90 || this.hintsUsed > 2) stars = 2;

    const xpEarned = this.currentNode.xpReward || 100;
    const gemsEarned = this.currentNode.gemReward || 15;
    const auraEarned = stars * 150;

    window.gameState.completeNode(this.currentNode.id, stars);
    window.gameState.addXP(xpEarned);
    window.gameState.addGems(gemsEarned);
    window.gameState.addAura(auraEarned);

    if (window.soundEngine) window.soundEngine.playLevelUp();
    if (window.helpers) window.helpers.spawnConfetti(70);

    // Show Reward Popup Modal
    document.getElementById('reward-title').textContent = "LESSON MASTERED!";
    document.getElementById('reward-sub').textContent = `You earned ${stars} Stars with high-speed accuracy!`;
    document.getElementById('reward-xp').textContent = `+${xpEarned} XP`;
    document.getElementById('reward-gems').textContent = `+${gemsEarned} Gems`;
    document.getElementById('reward-aura').textContent = `+${auraEarned} Aura`;

    const starsRow = document.getElementById('reward-stars-row');
    starsRow.innerHTML = Array(stars).fill('<span class="star-pop">⭐</span>').join('');

    const rewardModal = document.getElementById('reward-modal');
    rewardModal.classList.remove('hidden');

    document.getElementById('claim-reward-btn').onclick = () => {
      rewardModal.classList.add('hidden');
      window.app.showView('view-map');
      if (window.mapRenderer) {
        window.mapRenderer.renderWorld(window.mapRenderer.currentWorldId);
      }
    };
  }
}

window.LessonEngine = LessonEngine;
