/**
 * Supermath 24 (formerly Supernova 24) - Interactive Variable Target Math Game Engine
 * Features:
 * - 100% Solvability Guarantee via live 5-topology expression tree solver
 * - Variable Target Modes: 🎲 Variable Target (12-50), 🌟 Classic 24, 🚀 Big Goals (30-60)
 * - Tactile Card-Merge Interaction (Card A -> Operator -> Card B -> Merged Card)
 * - Multi-Step Undo & Reset
 * - Progressive Socratic Hints
 * - Integration with GameState (Aura, XP, Gems, Streaks) and SoundEngine
 */

class Supernova24Engine {
  constructor() {
    this.cards = [];
    this.originalCards = [];
    this.selectedCardId = null;
    this.selectedOperator = null;
    this.moveHistory = [];
    this.solution = null;
    this.hintStep = 0;
    this.difficulty = 'medium'; // 'easy' | 'medium' | 'hard'
    this.targetMode = 'variable'; // 'variable' | 'fixed24' | 'big'
    this.targetGoal = 24;
    this.score = 0;
    this.streak = 0;
    this.gamesPlayed = 0;
    this.timer = 0;
    this.timerInterval = null;

    // Cache DOM Elements
    this.viewEl = document.getElementById('view-supernova-24');
    this.cardsContainer = document.getElementById('s24-cards-container');
    this.opsContainer = document.getElementById('s24-ops-container');
    this.equationPreviewEl = document.getElementById('s24-equation-preview');
    this.scoreEl = document.getElementById('s24-score-val');
    this.streakEl = document.getElementById('s24-streak-val');
    this.timerEl = document.getElementById('s24-timer-val');
    this.hintBoxEl = document.getElementById('s24-hint-box');
    this.hintTextEl = document.getElementById('s24-hint-text');
    this.winModalEl = document.getElementById('s24-win-modal');

    this.titleTargetEl = document.getElementById('s24-title-target');
    this.targetNumberEl = document.getElementById('s24-target-number');
    this.targetSubtitleEl = document.getElementById('s24-target-subtitle');

    this.bindEvents();
  }

  bindEvents() {
    // Exit game button
    const exitBtn = document.getElementById('exit-s24-btn');
    if (exitBtn) {
      exitBtn.addEventListener('click', () => {
        this.stopTimer();
        window.app.showView('view-arcade-hub');
      });
    }

    // Undo button
    const undoBtn = document.getElementById('s24-undo-btn');
    if (undoBtn) {
      undoBtn.addEventListener('click', () => this.undoMove());
    }

    // Reset button
    const resetBtn = document.getElementById('s24-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.resetPuzzle());
    }

    // Hint button
    const hintBtn = document.getElementById('s24-hint-btn');
    if (hintBtn) {
      hintBtn.addEventListener('click', () => this.giveHint());
    }

    // Skip / New Game button
    const skipBtn = document.getElementById('s24-skip-btn');
    if (skipBtn) {
      skipBtn.addEventListener('click', () => this.startNewGame());
    }

    // Next Puzzle button on win modal
    const winNextBtn = document.getElementById('s24-win-next-btn');
    if (winNextBtn) {
      winNextBtn.addEventListener('click', () => {
        if (this.winModalEl) this.winModalEl.classList.add('hidden');
        this.startNewGame();
      });
    }

    // Mode Selector buttons
    const modeBtns = document.querySelectorAll('.s24-mode-pill');
    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.targetMode = btn.dataset.mode || 'variable';
        this.startNewGame();
      });
    });

    // Difficulty buttons
    const diffBtns = document.querySelectorAll('.s24-diff-btn');
    diffBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        diffBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.difficulty = btn.dataset.diff || 'medium';
        this.startNewGame();
      });
    });

    // Operator buttons
    const opBtns = document.querySelectorAll('.s24-op-btn');
    opBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const op = btn.dataset.op;
        this.selectOperator(op);
      });
    });
  }

  startNewGame() {
    this.stopTimer();
    this.timer = 0;
    this.updateTimerDisplay();
    this.startTimer();

    this.selectedCardId = null;
    this.selectedOperator = null;
    this.moveHistory = [];
    this.hintStep = 0;
    if (this.hintBoxEl) this.hintBoxEl.classList.add('hidden');
    if (this.winModalEl) this.winModalEl.classList.add('hidden');

    // Generate guaranteed solvable puzzle for the target goal
    const puzzle = this.generateSolvablePuzzle(this.difficulty);
    this.originalCards = [...puzzle.numbers];
    this.solution = puzzle.solution;

    this.cards = puzzle.numbers.map((val, idx) => ({
      id: `card-${Date.now()}-${idx}-${Math.random()}`,
      value: val,
      display: val.toString(),
      history: `${val}`
    }));

    this.updateTargetDisplay();
    this.updateEquationPreview();
    this.renderCards();
    this.updateHUD();
  }

  updateTargetDisplay() {
    if (this.titleTargetEl) this.titleTargetEl.textContent = this.targetGoal;
    if (this.targetNumberEl) this.targetNumberEl.textContent = this.targetGoal;
    if (this.targetSubtitleEl) this.targetSubtitleEl.textContent = this.targetGoal;
  }

  renderCards() {
    if (!this.cardsContainer) return;
    this.cardsContainer.innerHTML = '';

    const isSolved = (this.cards.length === 1 && Math.abs(this.cards[0].value - this.targetGoal) < 0.001);

    this.cards.forEach(card => {
      const cardEl = document.createElement('div');
      cardEl.className = 's24-card';
      cardEl.dataset.id = card.id;

      if (card.id === this.selectedCardId) {
        cardEl.classList.add('selected');
      }

      if (isSolved) {
        cardEl.classList.add('solved-winner');
      }

      const hasFormula = (card.history && card.history !== card.display && card.history !== `${card.value}`);
      const formulaText = isSolved ? `🌟 REACHED ${this.targetGoal}! 🌟` : (hasFormula ? card.history : '');

      cardEl.innerHTML = `
        <div class="s24-card-inner">
          <div class="s24-card-val">${card.display}</div>
          ${formulaText ? `<div class="s24-card-formula">${formulaText}</div>` : ''}
        </div>
      `;

      cardEl.addEventListener('click', () => this.selectCard(card.id));
      this.cardsContainer.appendChild(cardEl);
    });

    // Update Operator Buttons active/disabled state
    const opBtns = document.querySelectorAll('.s24-op-btn');
    opBtns.forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.op === this.selectedOperator);
      btn.disabled = (!this.selectedCardId || isSolved);
    });
  }

  selectCard(cardId) {
    if (this.cards.length === 1 && Math.abs(this.cards[0].value - this.targetGoal) < 0.001) {
      // Already solved; 1-tap progression to next puzzle
      this.startNewGame();
      return;
    }

    if (window.soundEngine) window.soundEngine.playTap();

    // 1. No card selected yet
    if (!this.selectedCardId) {
      this.selectedCardId = cardId;
      this.renderCards();
      this.updateEquationPreview();
      return;
    }

    // 2. Same card tapped again -> deselect
    if (this.selectedCardId === cardId) {
      this.selectedCardId = null;
      this.selectedOperator = null;
      this.renderCards();
      this.updateEquationPreview();
      return;
    }

    // 3. First card selected, no operator selected yet -> switch first card
    if (this.selectedCardId && !this.selectedOperator) {
      this.selectedCardId = cardId;
      this.renderCards();
      this.updateEquationPreview();
      return;
    }

    // 4. First card + Operator selected, second card tapped -> MERGE!
    if (this.selectedCardId && this.selectedOperator && this.selectedCardId !== cardId) {
      this.mergeCards(this.selectedCardId, cardId, this.selectedOperator);
    }
  }

  selectOperator(op) {
    if (!this.selectedCardId) return;

    if (window.soundEngine) window.soundEngine.playTap();
    this.selectedOperator = op;
    this.renderCards();
    this.updateEquationPreview();
  }

  updateEquationPreview() {
    if (!this.equationPreviewEl) return;

    const cardA = this.cards.find(c => c.id === this.selectedCardId);

    if (this.cards.length === 1 && Math.abs(this.cards[0].value - this.targetGoal) < 0.001) {
      this.equationPreviewEl.innerHTML = `🌟 <strong>SOLVED: ${this.cards[0].history} = ${this.targetGoal}!</strong> (Tap card for next deal ➔)`;
      this.equationPreviewEl.style.background = '#065f46';
      this.equationPreviewEl.style.color = '#34d399';
      return;
    }

    this.equationPreviewEl.style.background = '';
    this.equationPreviewEl.style.color = '';

    if (cardA && this.selectedOperator) {
      this.equationPreviewEl.innerHTML = `Calculating: <strong>${cardA.display} ${this.selectedOperator}</strong> [ Tap 2nd Card ]`;
    } else if (cardA) {
      this.equationPreviewEl.innerHTML = `Selected: <strong>${cardA.display}</strong> [ Choose +, −, ×, or ÷ ]`;
    } else {
      this.equationPreviewEl.innerHTML = `🎯 Target: <strong>${this.targetGoal}</strong> • Tap any card to begin!`;
    }
  }

  mergeCards(cardAId, cardBId, op) {
    const cardA = this.cards.find(c => c.id === cardAId);
    const cardB = this.cards.find(c => c.id === cardBId);
    if (!cardA || !cardB) return;

    let result = 0;
    const a = cardA.value;
    const b = cardB.value;

    switch (op) {
      case '+':
        result = a + b;
        break;
      case '-':
        result = a - b;
        break;
      case '×':
      case '*':
        result = a * b;
        break;
      case '÷':
      case '/':
        if (Math.abs(b) < 0.00001) {
          if (window.soundEngine) window.soundEngine.playWrong();
          this.showFeedbackToast("Cannot divide by 0!");
          return;
        }
        result = a / b;
        break;
    }

    if (result < 0) {
      if (window.soundEngine) window.soundEngine.playWrong();
      this.showFeedbackToast("Result was negative! Try larger number first 🚀");
      return;
    }

    // Save move to history for Undo
    this.moveHistory.push(JSON.parse(JSON.stringify(this.cards)));

    // Create merged card
    const mergedCard = {
      id: `card-merged-${Date.now()}`,
      value: Math.round(result * 1000) / 1000,
      display: this.formatCardValue(result),
      history: `(${cardA.history} ${op} ${cardB.history})`
    };

    // Remove Card A and Card B, insert Merged Card
    this.cards = this.cards.filter(c => c.id !== cardAId && c.id !== cardBId);
    this.cards.push(mergedCard);

    // Reset selection
    this.selectedCardId = null;
    this.selectedOperator = null;

    if (window.soundEngine) window.soundEngine.playCorrect();
    this.triggerMergeAnimation();
    this.renderCards();
    this.updateEquationPreview();

    // Check Win Condition
    this.checkWinCondition();
  }

  checkWinCondition() {
    if (this.cards.length === 1) {
      const finalVal = this.cards[0].value;
      if (Math.abs(finalVal - this.targetGoal) < 0.001) {
        this.handleWin();
      } else {
        if (window.soundEngine) window.soundEngine.playWrong();
        this.showFeedbackToast(`Reached ${this.formatCardValue(finalVal)}. Need exactly ${this.targetGoal}! Tap Undo ↩️`);
      }
    }
  }

  handleWin() {
    this.stopTimer();
    this.streak++;
    this.gamesPlayed++;

    // Aura Points & XP calculation
    const baseAura = this.difficulty === 'easy' ? 30 : this.difficulty === 'medium' ? 50 : 80;
    const timeBonus = Math.max(0, 30 - Math.floor(this.timer / 2));
    const totalAura = baseAura + timeBonus;

    try {
      if (window.gameState) {
        window.gameState.addAura(totalAura);
        window.gameState.addXP(Math.round(totalAura * 1.5));
        window.gameState.addGems(this.streak >= 3 ? 3 : 1);
        window.gameState.save();
      }

      if (window.soundEngine) window.soundEngine.playFanfare();
      if (window.helpers) {
        window.helpers.spawnConfetti();
        window.helpers.spawnAuraFloatingText(`+${totalAura} AURA! 🌟 SUPERMATH ${this.targetGoal}!`);
      }
    } catch (e) {
      console.warn("Victory effects error:", e);
    }

    // Populate and show Win Modal
    const winTitle = document.getElementById('s24-win-title');
    const winEq = document.getElementById('s24-win-equation');
    const winStats = document.getElementById('s24-win-stats');
    const winAura = document.getElementById('s24-win-aura');

    if (winTitle) winTitle.textContent = `🌟 TARGET ${this.targetGoal} ACHIEVED!`;
    if (winEq) winEq.textContent = `${this.cards[0].history} = ${this.targetGoal}!`;
    if (winStats) winStats.textContent = `⏱️ Time: ${this.timer}s • 🔥 Streak: ${this.streak}`;
    if (winAura) winAura.textContent = `+${totalAura} AURA • +${Math.round(totalAura * 1.5)} XP`;

    if (this.winModalEl) {
      this.winModalEl.classList.remove('hidden');
    }

    this.updateHUD();
  }

  undoMove() {
    if (this.moveHistory.length === 0) {
      this.showFeedbackToast("Nothing to undo!");
      return;
    }

    this.cards = this.moveHistory.pop();
    this.selectedCardId = null;
    this.selectedOperator = null;

    if (window.soundEngine) window.soundEngine.playTap();
    this.renderCards();
    this.updateEquationPreview();
  }

  resetPuzzle() {
    if (this.originalCards.length === 0) return;
    this.moveHistory.push(JSON.parse(JSON.stringify(this.cards)));

    this.cards = this.originalCards.map((val, idx) => ({
      id: `card-${Date.now()}-${idx}-${Math.random()}`,
      value: val,
      display: val.toString(),
      history: `${val}`
    }));

    this.selectedCardId = null;
    this.selectedOperator = null;

    if (window.soundEngine) window.soundEngine.playTap();
    this.renderCards();
    this.updateEquationPreview();
  }

  giveHint() {
    if (!this.solution || !this.hintBoxEl || !this.hintTextEl) return;

    if (window.soundEngine) window.soundEngine.playTap();
    this.hintStep++;

    if (this.hintStep === 1) {
      this.hintTextEl.innerHTML = `💡 <strong>Hint 1:</strong> Try forming <code>${this.solution.step1Text}</code> first!`;
    } else {
      this.hintTextEl.innerHTML = `💡 <strong>Solution Blueprint:</strong> <code>${this.solution.equation} = ${this.targetGoal}</code>`;
    }

    this.hintBoxEl.classList.remove('hidden');
  }

  formatCardValue(val) {
    if (Number.isInteger(val)) return val.toString();
    const rounded = Math.round(val * 100) / 100;
    return rounded.toString();
  }

  showFeedbackToast(msg) {
    if (window.helpers) {
      window.helpers.spawnAuraFloatingText(msg, undefined, undefined, true);
    }
  }

  triggerMergeAnimation() {
    if (!this.cardsContainer) return;
    this.cardsContainer.classList.add('merging');
    setTimeout(() => {
      if (this.cardsContainer) this.cardsContainer.classList.remove('merging');
    }, 300);
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
    if (this.scoreEl) this.scoreEl.textContent = this.score;
    if (this.streakEl) this.streakEl.textContent = `${this.streak} 🔥`;
  }

  // =========================================================================
  // 100% DETERMINISTIC VARIABLE TARGET EXPRESSION TREE SOLVER
  // =========================================================================

  generateSolvablePuzzle(difficulty = 'medium') {
    // Determine Target Goal based on active Target Mode
    if (this.targetMode === 'fixed24') {
      this.targetGoal = 24;
    } else if (this.targetMode === 'big') {
      const bigTargets = [30, 32, 36, 40, 42, 45, 48, 50, 54, 60];
      this.targetGoal = bigTargets[Math.floor(Math.random() * bigTargets.length)];
    } else {
      // Variable Target Mode (Rich variety of dynamic goals)
      const varTargets = [12, 14, 15, 16, 18, 20, 21, 24, 25, 27, 28, 30, 32, 36, 40, 42, 45, 48, 50];
      this.targetGoal = varTargets[Math.floor(Math.random() * varTargets.length)];
    }

    // Curated standard decks for target = 24
    if (this.targetGoal === 24) {
      const easyDecks = [
        [6, 4, 1, 1], [3, 8, 2, 1], [4, 6, 2, 2], [8, 3, 1, 1],
        [6, 2, 2, 1], [4, 4, 2, 1], [3, 3, 2, 1], [9, 3, 1, 1]
      ];
      const mediumDecks = [
        [8, 3, 6, 4], [7, 5, 3, 1], [9, 5, 3, 2], [6, 6, 4, 2],
        [8, 4, 4, 2], [7, 4, 3, 2], [8, 6, 3, 1], [5, 4, 3, 2]
      ];
      const hardDecks = [
        [3, 3, 8, 8], [5, 5, 5, 1], [7, 7, 3, 3], [6, 6, 5, 5],
        [8, 8, 3, 3], [4, 4, 7, 7], [9, 7, 5, 3], [8, 7, 5, 1]
      ];

      const pool = difficulty === 'easy' ? easyDecks : difficulty === 'hard' ? hardDecks : mediumDecks;
      const chosenDeck = pool[Math.floor(Math.random() * pool.length)];
      const solution = this.solve24(chosenDeck, 24);
      if (solution) {
        return { numbers: [...chosenDeck].sort(() => Math.random() - 0.5), solution };
      }
    }

    // Procedural solver search for arbitrary targetGoal
    for (let trial = 0; trial < 1500; trial++) {
      const maxVal = difficulty === 'easy' ? 8 : difficulty === 'hard' ? 13 : 10;
      const minVal = difficulty === 'easy' ? 1 : 2;

      const a = minVal + Math.floor(Math.random() * (maxVal - minVal + 1));
      const b = minVal + Math.floor(Math.random() * (maxVal - minVal + 1));
      const c = minVal + Math.floor(Math.random() * (maxVal - minVal + 1));
      const d = minVal + Math.floor(Math.random() * (maxVal - minVal + 1));

      const deck = [a, b, c, d];
      const solution = this.solve24(deck, this.targetGoal);
      if (solution) {
        return { numbers: deck, solution };
      }
    }

    // Guaranteed fallback deal for the target goal
    return {
      numbers: [this.targetGoal / 2, 2, 1, 1],
      solution: { equation: `((${this.targetGoal / 2} × 2) × 1) × 1`, step1Text: `${this.targetGoal / 2} × 2 = ${this.targetGoal}` }
    };
  }

  solve24(nums, target = this.targetGoal) {
    const ops = [
      { sym: '+', fn: (a, b) => a + b },
      { sym: '-', fn: (a, b) => a - b },
      { sym: '×', fn: (a, b) => a * b },
      { sym: '÷', fn: (a, b) => (Math.abs(b) > 0.00001 ? a / b : null) }
    ];

    // Permutations of 4 numbers
    const perms = this.getPermutations(nums);

    for (const [a, b, c, d] of perms) {
      for (const op1 of ops) {
        for (const op2 of ops) {
          for (const op3 of ops) {
            // Tree 1: ((a op1 b) op2 c) op3 d
            const t1_ab = op1.fn(a, b);
            if (t1_ab !== null) {
              const t1_abc = op2.fn(t1_ab, c);
              if (t1_abc !== null) {
                const t1_abcd = op3.fn(t1_abc, d);
                if (t1_abcd !== null && Math.abs(t1_abcd - target) < 0.0001) {
                  return {
                    equation: `((${a} ${op1.sym} ${b}) ${op2.sym} ${c}) ${op3.sym} ${d}`,
                    step1Text: `${a} ${op1.sym} ${b} = ${Math.round(t1_ab * 100) / 100}`
                  };
                }
              }
            }

            // Tree 2: (a op1 (b op2 c)) op3 d
            const t2_bc = op2.fn(b, c);
            if (t2_bc !== null) {
              const t2_abc = op1.fn(a, t2_bc);
              if (t2_abc !== null) {
                const t2_abcd = op3.fn(t2_abc, d);
                if (t2_abcd !== null && Math.abs(t2_abcd - target) < 0.0001) {
                  return {
                    equation: `(${a} ${op1.sym} (${b} ${op2.sym} ${c})) ${op3.sym} ${d}`,
                    step1Text: `${b} ${op2.sym} ${c} = ${Math.round(t2_bc * 100) / 100}`
                  };
                }
              }
            }

            // Tree 3: (a op1 b) op2 (c op3 d)
            const t3_ab = op1.fn(a, b);
            const t3_cd = op3.fn(c, d);
            if (t3_ab !== null && t3_cd !== null) {
              const t3_final = op2.fn(t3_ab, t3_cd);
              if (t3_final !== null && Math.abs(t3_final - target) < 0.0001) {
                return {
                  equation: `(${a} ${op1.sym} ${b}) ${op2.sym} (${c} ${op3.sym} ${d})`,
                  step1Text: `${a} ${op1.sym} ${b} = ${Math.round(t3_ab * 100) / 100}`
                };
              }
            }

            // Tree 4: a op1 ((b op2 c) op3 d)
            const t4_bc = op2.fn(b, c);
            if (t4_bc !== null) {
              const t4_bcd = op3.fn(t4_bc, d);
              if (t4_bcd !== null) {
                const t4_abcd = op1.fn(a, t4_bcd);
                if (t4_abcd !== null && Math.abs(t4_abcd - target) < 0.0001) {
                  return {
                    equation: `${a} ${op1.sym} ((${b} ${op2.sym} ${c}) ${op3.sym} ${d})`,
                    step1Text: `${b} ${op2.sym} ${c} = ${Math.round(t4_bc * 100) / 100}`
                  };
                }
              }
            }

            // Tree 5: a op1 (b op2 (c op3 d))
            const t5_cd = op3.fn(c, d);
            if (t5_cd !== null) {
              const t5_bcd = op2.fn(b, t5_cd);
              if (t5_bcd !== null) {
                const t5_abcd = op1.fn(a, t5_bcd);
                if (t5_abcd !== null && Math.abs(t5_abcd - target) < 0.0001) {
                  return {
                    equation: `${a} ${op1.sym} (${b} ${op2.sym} (${c} ${op3.sym} ${d}))`,
                    step1Text: `${c} ${op3.sym} ${d} = ${Math.round(t5_cd * 100) / 100}`
                  };
                }
              }
            }
          }
        }
      }
    }

    return null;
  }

  getPermutations(arr) {
    if (arr.length <= 1) return [arr];
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      const current = arr[i];
      const remaining = arr.slice(0, i).concat(arr.slice(i + 1));
      const remainingPerms = this.getPermutations(remaining);
      for (const p of remainingPerms) {
        result.push([current, ...p]);
      }
    }
    return result;
  }
}

window.Supernova24Engine = Supernova24Engine;
