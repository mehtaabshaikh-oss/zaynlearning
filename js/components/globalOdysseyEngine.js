/**
 * Global Odyssey Engine
 * Narrative scenario adventure coordinator
 */

class GlobalOdysseyEngine {
  constructor() {
    this.activeQuest = null;
    this.currentCardIdx = 0;
    this.inventory = [];
    this.isAnswered = false;
    this.bindEvents();
  }

  bindEvents() {
    const odysseyNavBtn = document.getElementById('quick-odyssey-btn');
    if (odysseyNavBtn) {
      odysseyNavBtn.addEventListener('click', () => {
        if (window.app) window.app.showView('view-odyssey-hub');
      });
    }

    const mobOdyssey = document.getElementById('mob-nav-odyssey');
    if (mobOdyssey) {
      mobOdyssey.addEventListener('click', () => {
        if (window.app) window.app.showView('view-odyssey-hub');
      });
    }
  }

  renderHub() {
    const container = document.getElementById('odyssey-quests-container');
    if (!container) return;
    container.innerHTML = '';

    const quests = window.GLOBAL_ODYSSEY_QUESTS || [];
    const completed = window.gameState?.data?.odysseyProgress?.completedQuests || [];

    quests.forEach(q => {
      const isDone = completed.includes(q.id);
      const card = document.createElement('div');
      card.className = 'odyssey-quest-card';

      card.innerHTML = `
        <div class="quest-card-top">
          <div class="quest-card-icon">${q.icon}</div>
          <span class="quest-card-badge ${isDone ? 'badge-completed' : 'badge-available'}">
            ${isDone ? 'COMPLETED ⭐' : 'AVAILABLE'}
          </span>
        </div>
        <div class="quest-card-tag">${q.tag}</div>
        <div class="quest-card-title">${q.title}</div>
        <div class="quest-card-sub">${q.subtitle}</div>
        <div class="quest-card-footer">
          <span class="quest-card-reward">⭐ +${q.xpReward} XP • +${q.auraReward} AURA</span>
          <button class="quest-start-btn">${isDone ? 'REPLAY ➔' : 'START QUEST ➔'}</button>
        </div>
      `;

      card.querySelector('.quest-start-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        this.startQuest(q);
      });
      card.addEventListener('click', () => this.startQuest(q));

      container.appendChild(card);
    });
  }

  startQuest(quest) {
    this.activeQuest = quest;
    this.currentCardIdx = 0;
    this.inventory = [];
    this.isAnswered = false;

    const modal = document.getElementById('odyssey-adventure-modal');
    if (modal) modal.classList.remove('hidden');

    if (window.soundEngine) window.soundEngine.playTap();
    this.renderCurrentCard();
  }

  closeModal() {
    const modal = document.getElementById('odyssey-adventure-modal');
    if (modal) modal.classList.add('hidden');
    this.renderHub();
  }

  renderCurrentCard() {
    const modal = document.getElementById('odyssey-adventure-modal');
    const body = document.getElementById('odyssey-modal-content');
    const stepBadge = document.getElementById('odyssey-step-badge');
    const footer = document.getElementById('odyssey-modal-footer');
    if (!modal || !body || !this.activeQuest) return;

    this.isAnswered = false;
    const card = this.activeQuest.cards[this.currentCardIdx];
    const totalCards = this.activeQuest.cards.length;

    if (stepBadge) {
      stepBadge.textContent = `CHAPTER ${this.currentCardIdx + 1} / ${totalCards} • ${card.countryBadge}`;
    }

    const optionsHTML = card.options.map((opt, idx) => `
      <button class="odyssey-opt-btn" onclick="window.globalOdysseyEngine.handleChoice(${idx})">
        <span style="color:#94a3b8; font-weight:700; width:18px;">${idx + 1}.</span>
        <span>${opt}</span>
      </button>
    `).join('');

    const inventoryHTML = this.inventory.length > 0
      ? this.inventory.map(item => `<span class="odyssey-item-pill">${item}</span>`).join('')
      : '<span style="color:#64748b; font-size:11px;">Backpack empty</span>';

    body.innerHTML = `
      <div class="odyssey-narrative-card">
        <div class="odyssey-hero-icon">${card.bgIcon || '✈️'}</div>
        <div style="flex:1;">
          <div class="odyssey-location-tag">📍 ${card.location}</div>
          <div class="odyssey-narrative-text">"${card.narrative}"</div>
        </div>
      </div>

      <div class="odyssey-question-card">
        <div class="odyssey-dilemma-title">⚠️ THE DILEMMA & CHALLENGE</div>
        <div style="font-size:13px; color:#cbd5e1; line-height:1.4;">${card.dilemma}</div>
        <div class="odyssey-question-text">${card.question}</div>
        <div class="odyssey-options-grid" id="odyssey-opts-grid">${optionsHTML}</div>
        <div id="odyssey-feedback-mount"></div>
      </div>

      <div class="odyssey-inventory-bar">
        <span class="odyssey-inventory-title">🎒 Backpack:</span>
        ${inventoryHTML}
      </div>
    `;

    footer.innerHTML = `
      <div style="font-size:12px; color:#94a3b8; font-weight:700;">Progress: ${Math.round(((this.currentCardIdx) / totalCards) * 100)}%</div>
      <button class="odyssey-next-btn" id="odyssey-next-btn" style="display:none;" onclick="window.globalOdysseyEngine.advanceStep()">NEXT CHAPTER ➔</button>
    `;
  }

  handleChoice(choiceIdx) {
    if (this.isAnswered) return;
    this.isAnswered = true;

    const card = this.activeQuest.cards[this.currentCardIdx];
    const opts = document.querySelectorAll('.odyssey-opt-btn');
    opts.forEach(b => b.disabled = true);

    const isCorrect = (choiceIdx === card.answer);
    if (isCorrect) {
      opts[choiceIdx].classList.add('correct');
      if (card.itemAwarded && !this.inventory.includes(card.itemAwarded)) {
        this.inventory.push(card.itemAwarded);
      }
      if (window.soundEngine) window.soundEngine.playCorrect();
      if (window.helpers) window.helpers.spawnAuraFloatingText("+50 Aura 🌟", undefined, undefined, true);
    } else {
      opts[choiceIdx].classList.add('wrong');
      opts[card.answer].classList.add('correct');
      if (window.soundEngine) window.soundEngine.playWrong();
    }

    const feedbackMount = document.getElementById('odyssey-feedback-mount');
    if (feedbackMount) {
      feedbackMount.innerHTML = `
        <div style="background:#172033; border-left:4px solid ${isCorrect ? '#22c55e' : '#38bdf8'}; border-radius:8px; padding:12px 16px; font-size:13px; color:#e2e8f0; line-height:1.5; margin-top:10px;">
          ${isCorrect ? '✅ <strong>Safe Passage!</strong> ' : '💡 <strong>Guide Clue:</strong> '}
          ${card.explanation}
          ${card.itemAwarded ? `<div style="margin-top:6px; color:#38bdf8; font-weight:700;">🎒 Item Acquired: ${card.itemAwarded}</div>` : ''}
        </div>
      `;
    }

    const nextBtn = document.getElementById('odyssey-next-btn');
    if (nextBtn) nextBtn.style.display = 'block';
  }

  advanceStep() {
    this.currentCardIdx++;
    if (this.currentCardIdx < this.activeQuest.cards.length) {
      this.renderCurrentCard();
    } else {
      this.renderQuestComplete();
    }
  }

  renderQuestComplete() {
    const body = document.getElementById('odyssey-modal-content');
    const stepBadge = document.getElementById('odyssey-step-badge');
    const footer = document.getElementById('odyssey-modal-footer');
    if (!body || !this.activeQuest) return;

    if (stepBadge) stepBadge.textContent = '🏆 MISSION ACCOMPLISHED!';

    // Grant XP and Aura
    window.gameState.addXP(this.activeQuest.xpReward);
    window.gameState.addAura(this.activeQuest.auraReward);

    // Save progress
    if (!window.gameState.data.odysseyProgress) {
      window.gameState.data.odysseyProgress = { completedQuests: [], passportStamps: [] };
    }
    const prog = window.gameState.data.odysseyProgress;
    if (!prog.completedQuests.includes(this.activeQuest.id)) {
      prog.completedQuests.push(this.activeQuest.id);
    }
    if (this.activeQuest.passportStamp && !prog.passportStamps.some(s => s.code === this.activeQuest.passportStamp.code)) {
      prog.passportStamps.push({
        ...this.activeQuest.passportStamp,
        dateUnlocked: new Date().toLocaleDateString()
      });
    }
    window.gameState.save();

    if (window.soundEngine) window.soundEngine.playLevelUp();
    if (window.helpers) window.helpers.spawnConfetti(60);

    const itemsHTML = this.inventory.map(i => `<span class="odyssey-item-pill" style="font-size:12px; padding:6px 12px;">${i}</span>`).join('');

    body.innerHTML = `
      <div style="text-align:center; padding:18px 0; font-family:'Space Grotesk', -apple-system, sans-serif;">
        <div style="font-size:56px; margin-bottom:12px;">🛬🎉</div>
        <h2 style="font-size:28px; font-weight:800; color:#ffffff; margin-bottom:8px;">HOME SAFE & SOUND!</h2>
        <p style="font-size:14px; color:#94a3b8; max-width:480px; margin:0 auto 20px auto; line-height:1.5;">
          Zayn navigated through Frankfurt, Tokyo, Brazil, the periodic table, and world history to board the charter plane home!
        </p>

        <div style="background:#131d38; border:1px solid #3b82f6; border-radius:16px; padding:20px; text-align:center; margin-bottom:20px;">
          <div style="font-size:12px; font-weight:700; color:#38bdf8; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">OFFICIAL PASSPORT STAMP UNLOCKED</div>
          <div style="font-size:36px; margin-bottom:6px;">${this.activeQuest.passportStamp.icon}</div>
          <div style="font-size:18px; font-weight:800; color:#fbbf24;">${this.activeQuest.passportStamp.country} (${this.activeQuest.passportStamp.code})</div>
          <div style="font-size:12px; color:#94a3b8; margin-top:4px;">Recorded on ${new Date().toLocaleDateString()}</div>
        </div>

        <div style="display:flex; justify-content:center; gap:16px; margin-bottom:18px;">
          <div style="background:#172033; border:1px solid #334460; border-radius:12px; padding:12px 20px;">
            <div style="font-size:11px; font-weight:700; color:#94a3b8;">XP EARNED</div>
            <div style="font-size:22px; font-weight:800; color:#fbbf24;">+${this.activeQuest.xpReward} XP</div>
          </div>
          <div style="background:#172033; border:1px solid #334460; border-radius:12px; padding:12px 20px;">
            <div style="font-size:11px; font-weight:700; color:#94a3b8;">AURA GAINED</div>
            <div style="font-size:22px; font-weight:800; color:#38bdf8;">+${this.activeQuest.auraReward} AURA</div>
          </div>
        </div>

        <div style="text-align:left; background:#0f172a; border:1px solid #243147; border-radius:12px; padding:14px;">
          <div style="font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase; margin-bottom:8px;">🎒 Backpack Relics Collected:</div>
          <div style="display:flex; flex-wrap:wrap; gap:8px;">${itemsHTML}</div>
        </div>
      </div>
    `;

    footer.innerHTML = `
      <div></div>
      <button class="odyssey-next-btn" onclick="window.globalOdysseyEngine.closeModal()">RETURN TO ODYSSEY HUB ➔</button>
    `;
  }
}

window.GlobalOdysseyEngine = GlobalOdysseyEngine;
