/**
 * Cryptic Codebreaker - Cyberpunk Mastermind Deductive Logic Engine
 * Features:
 * - 2-Pass Mastermind Evaluator (Zero ghost duplicates)
 * - 8 Guess Attempts with Glowing Feedback Beacons
 * - Color Palette Bar + Scratchpad Eliminator Mode
 * - Solved Rewards with GameState & SoundEngine Integration
 */

class CodebreakerEngine {
  constructor() {
    this.secretCode = [];
    this.currentGuess = [];
    this.attempts = [];
    this.maxAttempts = 8;
    this.codeLength = 4;
    this.difficulty = 'tier1'; // 'tier1' (No dupes) | 'tier2' (Dupes) | 'tier3' (5 slots, 8 colors)
    this.isGameOver = false;
    this.timer = 0;
    this.timerInterval = null;
    this.score = 0;
    this.streak = 0;
    this.eliminatedColors = new Set();
    this.isScratchpadMode = false;

    // Palette Definition
    this.palette = [
      { id: 'red', name: 'Ruby', emoji: '🔴', hex: '#ef4444' },
      { id: 'yellow', name: 'Solar', emoji: '🟡', hex: '#eab308' },
      { id: 'green', name: 'Emerald', emoji: '🟢', hex: '#22c55e' },
      { id: 'blue', name: 'Cobalt', emoji: '🔵', hex: '#3b82f6' },
      { id: 'purple', name: 'Nebula', emoji: '🟣', hex: '#a855f7' },
      { id: 'orange', name: 'Plasma', emoji: '🟠', hex: '#f97316' },
      { id: 'cyan', name: 'Quantum', emoji: '🩵', hex: '#06b6d4', tier3Only: true },
      { id: 'pink', name: 'Laser', emoji: '🩷', hex: '#ec4899', tier3Only: true }
    ];

    // DOM Elements
    this.viewEl = document.getElementById('view-codebreaker');
    this.boardEl = document.getElementById('cb-board-rows');
    this.paletteEl = document.getElementById('cb-palette-bar');
    this.currentSlotsEl = document.getElementById('cb-current-slots');
    this.submitBtn = document.getElementById('cb-submit-btn');
    this.clearBtn = document.getElementById('cb-clear-btn');
    this.scratchBtn = document.getElementById('cb-scratchpad-btn');
    this.timerEl = document.getElementById('cb-timer-val');
    this.streakEl = document.getElementById('cb-streak-val');
    this.winModalEl = document.getElementById('cb-win-modal');

    this.bindEvents();
  }

  bindEvents() {
    // Exit game button
    const exitBtn = document.getElementById('exit-cb-btn');
    if (exitBtn) {
      exitBtn.addEventListener('click', () => {
        this.stopTimer();
        window.app.showView('view-arcade-hub');
      });
    }

    // Submit Guess button
    if (this.submitBtn) {
      this.submitBtn.addEventListener('click', () => this.submitGuess());
    }

    // Clear current guess row button
    if (this.clearBtn) {
      this.clearBtn.addEventListener('click', () => this.clearCurrentGuess());
    }

    // Scratchpad mode toggle
    if (this.scratchBtn) {
      this.scratchBtn.addEventListener('click', () => this.toggleScratchpad());
    }

    // New Game button
    const newBtn = document.getElementById('cb-new-btn');
    if (newBtn) {
      newBtn.addEventListener('click', () => this.startNewGame());
    }

    // Next puzzle on win modal
    const winNextBtn = document.getElementById('cb-win-next-btn');
    if (winNextBtn) {
      winNextBtn.addEventListener('click', () => {
        if (this.winModalEl) this.winModalEl.classList.add('hidden');
        this.startNewGame();
      });
    }

    // Difficulty buttons
    const diffBtns = document.querySelectorAll('.cb-diff-btn');
    diffBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        diffBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.difficulty = btn.dataset.diff || 'tier1';
        this.startNewGame();
      });
    });
  }

  startNewGame() {
    this.stopTimer();
    this.timer = 0;
    this.updateTimerDisplay();
    this.startTimer();

    this.isGameOver = false;
    this.attempts = [];
    this.currentGuess = [];
    this.eliminatedColors.clear();
    this.isScratchpadMode = false;
    if (this.scratchBtn) this.scratchBtn.classList.remove('active');
    if (this.winModalEl) this.winModalEl.classList.add('hidden');

    this.codeLength = (this.difficulty === 'tier3') ? 5 : 4;
    this.generateSecretCode();

    this.renderBoard();
    this.renderCurrentSlots();
    this.renderPalette();
    this.updateHUD();
  }

  generateSecretCode() {
    const activePalette = this.getActivePalette();
    this.secretCode = [];

    if (this.difficulty === 'tier1') {
      // Tier 1: No duplicates
      const shuffled = [...activePalette].sort(() => Math.random() - 0.5);
      this.secretCode = shuffled.slice(0, this.codeLength).map(c => c.id);
    } else {
      // Tier 2 & 3: Duplicates allowed
      for (let i = 0; i < this.codeLength; i++) {
        const rand = activePalette[Math.floor(Math.random() * activePalette.length)];
        this.secretCode.push(rand.id);
      }
    }
  }

  getActivePalette() {
    if (this.difficulty === 'tier3') {
      return this.palette;
    }
    return this.palette.filter(c => !c.tier3Only);
  }

  renderPalette() {
    if (!this.paletteEl) return;
    this.paletteEl.innerHTML = '';

    const activePalette = this.getActivePalette();

    activePalette.forEach(item => {
      const btn = document.createElement('button');
      const isEliminated = this.eliminatedColors.has(item.id);
      btn.className = `cb-palette-item ${isEliminated ? 'eliminated' : ''}`;
      btn.style.setProperty('--color-hex', item.hex);

      btn.innerHTML = `
        <span class="cb-palette-emoji">${item.emoji}</span>
        <span class="cb-palette-name">${item.name}</span>
        ${isEliminated ? '<span class="cb-scratch-x">✕</span>' : ''}
      `;

      btn.addEventListener('click', () => this.handlePaletteClick(item.id));
      this.paletteEl.appendChild(btn);
    });
  }

  handlePaletteClick(colorId) {
    if (window.soundEngine) window.soundEngine.playTap();

    if (this.isScratchpadMode) {
      // Toggle color elimination
      if (this.eliminatedColors.has(colorId)) {
        this.eliminatedColors.delete(colorId);
      } else {
        this.eliminatedColors.add(colorId);
      }
      this.renderPalette();
      return;
    }

    if (this.isGameOver) return;
    if (this.currentGuess.length >= this.codeLength) return;

    this.currentGuess.push(colorId);
    this.renderCurrentSlots();

    if (this.submitBtn) {
      this.submitBtn.disabled = (this.currentGuess.length !== this.codeLength);
    }
  }

  renderCurrentSlots() {
    if (!this.currentSlotsEl) return;
    this.currentSlotsEl.innerHTML = '';

    for (let i = 0; i < this.codeLength; i++) {
      const slot = document.createElement('div');
      slot.className = 'cb-slot';

      if (i < this.currentGuess.length) {
        const colorId = this.currentGuess[i];
        const item = this.palette.find(p => p.id === colorId);
        slot.classList.add('filled');
        slot.style.setProperty('--color-hex', item ? item.hex : '#3b82f6');
        slot.innerHTML = `<span class="cb-slot-emoji">${item ? item.emoji : ''}</span>`;
        slot.addEventListener('click', () => this.removeSlotItem(i));
      } else {
        slot.classList.add('empty');
        slot.innerHTML = `<span class="cb-slot-num">${i + 1}</span>`;
      }

      this.currentSlotsEl.appendChild(slot);
    }

    if (this.submitBtn) {
      this.submitBtn.disabled = (this.currentGuess.length !== this.codeLength);
    }
  }

  removeSlotItem(index) {
    if (window.soundEngine) window.soundEngine.playTap();
    this.currentGuess.splice(index, 1);
    this.renderCurrentSlots();
  }

  clearCurrentGuess() {
    if (window.soundEngine) window.soundEngine.playTap();
    this.currentGuess = [];
    this.renderCurrentSlots();
  }

  toggleScratchpad() {
    if (window.soundEngine) window.soundEngine.playTap();
    this.isScratchpadMode = !this.isScratchpadMode;
    if (this.scratchBtn) {
      this.scratchBtn.classList.toggle('active', this.isScratchpadMode);
    }
    this.showFeedbackToast(this.isScratchpadMode ? "Scratchpad ON: Tap colors to cross out!" : "Scratchpad OFF: Tap colors to insert!");
  }

  submitGuess() {
    if (this.currentGuess.length !== this.codeLength || this.isGameOver) return;

    // 2-PASS MASTERMIND EVALUATION ALGORITHM
    const feedback = this.evaluateGuess(this.currentGuess, this.secretCode);

    this.attempts.push({
      guess: [...this.currentGuess],
      exact: feedback.exact,
      partial: feedback.partial
    });

    this.currentGuess = [];
    this.renderBoard();
    this.renderCurrentSlots();

    // Check Win Condition (All exact)
    if (feedback.exact === this.codeLength) {
      this.handleWin();
      return;
    }

    // Check Loss Condition (Hit max attempts)
    if (this.attempts.length >= this.maxAttempts) {
      this.handleLoss();
      return;
    }

    if (window.soundEngine) window.soundEngine.playCorrect();
  }

  evaluateGuess(guess, secret) {
    let exact = 0;
    let partial = 0;

    const secretCopy = [...secret];
    const guessCopy = [...guess];

    // Pass 1: Count exact position matches
    for (let i = 0; i < this.codeLength; i++) {
      if (guessCopy[i] === secretCopy[i]) {
        exact++;
        secretCopy[i] = null;
        guessCopy[i] = null;
      }
    }

    // Pass 2: Count color matches in different positions
    for (let i = 0; i < this.codeLength; i++) {
      if (guessCopy[i] !== null) {
        const foundIdx = secretCopy.indexOf(guessCopy[i]);
        if (foundIdx !== -1) {
          partial++;
          secretCopy[foundIdx] = null;
        }
      }
    }

    return { exact, partial };
  }

  renderBoard() {
    if (!this.boardEl) return;
    this.boardEl.innerHTML = '';

    for (let row = 0; row < this.maxAttempts; row++) {
      const attempt = this.attempts[row];
      const rowEl = document.createElement('div');
      rowEl.className = `cb-board-row ${attempt ? 'completed' : (row === this.attempts.length ? 'current' : 'locked')}`;

      // Left: Row number
      const numEl = document.createElement('div');
      numEl.className = 'cb-row-num';
      numEl.textContent = `#${row + 1}`;
      rowEl.appendChild(numEl);

      // Middle: Peg Slots
      const slotsWrap = document.createElement('div');
      slotsWrap.className = 'cb-row-slots';

      for (let s = 0; s < this.codeLength; s++) {
        const peg = document.createElement('div');
        peg.className = 'cb-row-peg';

        if (attempt) {
          const colorId = attempt.guess[s];
          const item = this.palette.find(p => p.id === colorId);
          peg.style.setProperty('--color-hex', item ? item.hex : '#3b82f6');
          peg.classList.add('filled');
          peg.innerHTML = `<span class="cb-peg-emoji">${item ? item.emoji : ''}</span>`;
        }
        slotsWrap.appendChild(peg);
      }
      rowEl.appendChild(slotsWrap);

      // Right: Detailed Feedback Area (Badges + Beacons)
      const feedbackWrap = document.createElement('div');
      feedbackWrap.className = 'cb-feedback-wrap';

      if (attempt) {
        let feedbackHTML = '';
        if (attempt.exact > 0) {
          feedbackHTML += `<span class="cb-fb-pill exact" title="Right item in right slot">🎯 ${attempt.exact} Perfect</span>`;
        }
        if (attempt.partial > 0) {
          feedbackHTML += `<span class="cb-fb-pill partial" title="Right item, needs to move to another slot">🔀 ${attempt.partial} Move Slot</span>`;
        }
        if (attempt.exact === 0 && attempt.partial === 0) {
          feedbackHTML += `<span class="cb-fb-pill none">❌ Miss</span>`;
        }
        feedbackWrap.innerHTML = feedbackHTML;
      } else {
        feedbackWrap.innerHTML = `<span class="cb-fb-pill empty">--</span>`;
      }
      rowEl.appendChild(feedbackWrap);

      this.boardEl.appendChild(rowEl);
    }
  }

  handleWin() {
    this.isGameOver = true;
    this.stopTimer();
    this.streak++;

    const baseAura = (this.difficulty === 'tier1') ? 35 : (this.difficulty === 'tier2') ? 55 : 85;
    const attemptBonus = Math.max(0, (this.maxAttempts - this.attempts.length) * 10);
    const totalAura = baseAura + attemptBonus;

    if (window.gameState) {
      window.gameState.addAura(totalAura);
      window.gameState.addXP(Math.round(totalAura * 1.5));
      window.gameState.addGems(this.streak >= 3 ? 3 : 1);
      window.gameState.save();
    }

    if (window.soundEngine) window.soundEngine.playFanfare();
    if (window.helpers) {
      window.helpers.spawnConfetti();
      window.helpers.spawnAuraFloatingText(`+${totalAura} AURA! 🕵️ VAULT CRACKED!`);
    }

    const winTitle = document.getElementById('cb-win-title');
    const winSecret = document.getElementById('cb-win-secret');
    const winStats = document.getElementById('cb-win-stats');
    const winAura = document.getElementById('cb-win-aura');

    if (winTitle) winTitle.textContent = "🔓 VAULT CRACKED!";
    if (winSecret) {
      winSecret.innerHTML = this.secretCode.map(id => {
        const item = this.palette.find(p => p.id === id);
        return `<span style="font-size:26px;">${item ? item.emoji : ''}</span>`;
      }).join(' ');
    }
    if (winStats) winStats.textContent = `🎯 Attempts: ${this.attempts.length}/${this.maxAttempts} • ⏱️ Time: ${this.timer}s`;
    if (winAura) winAura.textContent = `+${totalAura} AURA • +${Math.round(totalAura * 1.5)} XP`;

    if (this.winModalEl) {
      this.winModalEl.classList.remove('hidden');
    }

    this.updateHUD();
  }

  handleLoss() {
    this.isGameOver = true;
    this.stopTimer();
    this.streak = 0;

    if (window.soundEngine) window.soundEngine.playWrong();

    const winTitle = document.getElementById('cb-win-title');
    const winSecret = document.getElementById('cb-win-secret');
    const winStats = document.getElementById('cb-win-stats');
    const winAura = document.getElementById('cb-win-aura');

    if (winTitle) winTitle.textContent = "🔒 VAULT LOCKED!";
    if (winSecret) {
      winSecret.innerHTML = `Secret Code: ` + this.secretCode.map(id => {
        const item = this.palette.find(p => p.id === id);
        return `<span style="font-size:26px;">${item ? item.emoji : ''}</span>`;
      }).join(' ');
    }
    if (winStats) winStats.textContent = `Ran out of attempts! Try again!`;
    if (winAura) winAura.textContent = `+5 Consolation XP`;

    if (this.winModalEl) {
      this.winModalEl.classList.remove('hidden');
    }

    this.updateHUD();
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timer++;
      this.updateTimerDisplay();
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  updateTimerDisplay() {
    if (this.timerEl) {
      const mins = Math.floor(this.timer / 60);
      const secs = this.timer % 60;
      this.timerEl.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
  }

  updateHUD() {
    if (this.streakEl) this.streakEl.textContent = `${this.streak} 🔥`;
  }

  showFeedbackToast(msg) {
    if (window.helpers) {
      window.helpers.spawnAuraFloatingText(msg, undefined, undefined, true);
    }
  }
}

window.CodebreakerEngine = CodebreakerEngine;
