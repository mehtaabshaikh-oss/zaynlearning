/**
 * BossBattleEngine - World Boss Combat Arena
 * Combines multi-topic questions where correct answers deal heavy damage to the Boss HP bar.
 */

class BossBattleEngine {
  constructor() {
    this.currentBoss = null;
    this.bossHP = 100;
    this.maxHP = 100;
    this.currentQuestionIdx = 0;
    this.selectedOption = null;

    this.nameEl = document.getElementById('boss-display-name');
    this.hpTextEl = document.getElementById('boss-hp-text');
    this.hpFillEl = document.getElementById('boss-hp-fill');
    this.spriteEl = document.getElementById('boss-sprite-anim');
    this.speechEl = document.getElementById('boss-speech');
    this.qCardEl = document.getElementById('boss-question-card');

    this.bindEvents();
  }

  bindEvents() {
    document.getElementById('exit-boss-btn').addEventListener('click', () => {
      window.app.showView('view-map');
    });
  }

  startBattle(bossNode) {
    const bossData = bossNode.bossData || {
      name: "MEGA MATH BOSS",
      hp: 100,
      sprite: "🗿🔥",
      taunt: "Let's see your math power!",
      questions: [
        { prompt: "Calculate: 12 × 8", options: ["96", "84", "108", "92"], answer: "96" },
        { prompt: "Solve: 2x + 4 = 20", options: ["8", "10", "6", "12"], answer: "8" },
        { prompt: "Simplify 4/12", options: ["1/3", "1/4", "2/5", "1/2"], answer: "1/3" }
      ]
    };

    this.currentBoss = bossData;
    this.maxHP = bossData.hp || 100;
    this.bossHP = this.maxHP;
    this.currentQuestionIdx = 0;

    this.nameEl.textContent = bossData.name;
    this.spriteEl.textContent = bossData.sprite || "🗿";
    this.speechEl.textContent = `"${bossData.taunt}"`;
    this.updateHPUI();
    this.renderQuestion();
  }

  renderQuestion() {
    const q = this.currentBoss.questions[this.currentQuestionIdx];
    if (!q || this.bossHP <= 0) {
      this.defeatBoss();
      return;
    }

    this.selectedOption = null;
    this.qCardEl.innerHTML = `
      <div class="lesson-card">
        <h2 class="lesson-prompt-title">${q.prompt}</h2>
        <div class="options-grid" id="boss-options-grid"></div>
      </div>
    `;

    const grid = this.qCardEl.querySelector('#boss-options-grid');
    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => this.handleAnswer(opt, q, btn));
      grid.appendChild(btn);
    });
  }

  handleAnswer(chosen, q, btn) {
    const isCorrect = chosen === q.answer;

    if (isCorrect) {
      const damage = Math.ceil(this.maxHP / this.currentBoss.questions.length);
      this.bossHP = Math.max(0, this.bossHP - damage);
      this.updateHPUI();

      if (window.soundEngine) window.soundEngine.playBossHit();
      if (window.helpers) window.helpers.spawnAuraFloatingText(`CRITICAL HIT! -${damage} HP 💥`, undefined, undefined, true);

      this.speechEl.textContent = `"Ouch! That calculation was too powerful!"`;
      btn.classList.add('correct');

      setTimeout(() => {
        this.currentQuestionIdx++;
        this.renderQuestion();
      }, 600);
    } else {
      if (window.soundEngine) window.soundEngine.playWrong();
      if (window.helpers) window.helpers.spawnAuraFloatingText("Boss Defended! Try another option.", undefined, undefined, false);
      this.speechEl.textContent = `"Haha! Your strike missed! Try again!"`;
      btn.classList.add('wrong');
    }
  }

  updateHPUI() {
    this.hpTextEl.textContent = `${this.bossHP} / ${this.maxHP} HP`;
    const pct = (this.bossHP / this.maxHP) * 100;
    this.hpFillEl.style.width = `${pct}%`;
  }

  defeatBoss() {
    if (window.soundEngine) window.soundEngine.playLevelUp();
    if (window.helpers) window.helpers.spawnConfetti(100);

    const xpEarned = 350;
    const gemsEarned = 75;
    const auraEarned = 1000;

    window.gameState.addXP(xpEarned);
    window.gameState.addGems(gemsEarned);
    window.gameState.addAura(auraEarned);

    document.getElementById('reward-title').textContent = "BOSS DEFEATED!";
    document.getElementById('reward-sub').textContent = `You conquered ${this.currentBoss.name}!`;
    document.getElementById('reward-xp').textContent = `+${xpEarned} XP`;
    document.getElementById('reward-gems').textContent = `+${gemsEarned} Gems`;
    document.getElementById('reward-aura').textContent = `+${auraEarned} Aura`;

    const starsRow = document.getElementById('reward-stars-row');
    starsRow.innerHTML = '👑⚔️💥';

    const rewardModal = document.getElementById('reward-modal');
    rewardModal.classList.remove('hidden');

    document.getElementById('claim-reward-btn').onclick = () => {
      rewardModal.classList.add('hidden');
      window.app.showView('view-map');
    };
  }
}

window.BossBattleEngine = BossBattleEngine;
