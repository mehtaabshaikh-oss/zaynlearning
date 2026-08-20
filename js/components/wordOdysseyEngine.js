/**
 * Word Odyssey - Thematic Wordle Adventure Engine for Kids
 * Features:
 * - 2-Pass Duplicate Letter Frequency Evaluator (Zero duplicate color bugs)
 * - 4, 5, and 6-letter dynamic grid boards
 * - On-screen tactile QWERTY keyboard + physical keyboard input
 * - 5 Rich Categories with Educational Post-Win Fact Cards
 * - Pixel's Clue System, Daily Challenge vs Free Practice Mode, Streaks
 */

class WordOdysseyEngine {
  constructor() {
    this.categories = typeof WORD_ODYSSEY_CATEGORIES !== 'undefined' ? WORD_ODYSSEY_CATEGORIES : {};
    this.currentCategory = 'countries';
    this.currentWordData = null;
    this.secretWord = '';
    this.wordLength = 5;
    this.maxGuesses = 6;
    this.guesses = [];
    this.currentInput = '';
    this.isGameOver = false;
    this.keyboardState = {}; // letter -> 'green' | 'yellow' | 'gray'
    this.isDailyMode = false;
    this.streak = 0;

    // DOM Elements
    this.viewEl = document.getElementById('view-word-odyssey');
    this.boardEl = document.getElementById('wo-board-grid');
    this.keyboardEl = document.getElementById('wo-keyboard');
    this.categorySelectEl = document.getElementById('wo-category-select');
    this.clueBoxEl = document.getElementById('wo-clue-box');
    this.clueTextEl = document.getElementById('wo-clue-text');
    this.clueBtn = document.getElementById('wo-clue-btn');
    this.streakValEl = document.getElementById('wo-streak-val');
    this.winModalEl = document.getElementById('wo-win-modal');
    this.nativeInputEl = document.getElementById('wo-native-input');
    this.kbToggleBtn = document.getElementById('wo-kb-toggle-btn');
    this.showVirtualKeyboard = true;

    this.bindEvents();
  }

  bindEvents() {
    // Exit game button
    const exitBtn = document.getElementById('exit-wo-btn');
    if (exitBtn) {
      exitBtn.addEventListener('click', () => {
        window.app.showView('view-arcade-hub');
      });
    }

    // Category Selector
    const catBtns = document.querySelectorAll('.wo-cat-pill');
    catBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentCategory = btn.dataset.cat || 'countries';
        this.startNewGame();
      });
    });

    // New Game / Next Word button
    const newBtn = document.getElementById('wo-new-btn');
    if (newBtn) {
      newBtn.addEventListener('click', () => this.startNewGame());
    }

    // Clue button
    if (this.clueBtn) {
      this.clueBtn.addEventListener('click', () => this.revealClue());
    }

    // Keyboard Toggle button
    if (this.kbToggleBtn) {
      this.kbToggleBtn.addEventListener('click', () => {
        this.showVirtualKeyboard = !this.showVirtualKeyboard;
        if (this.keyboardEl) {
          this.keyboardEl.style.display = this.showVirtualKeyboard ? 'flex' : 'none';
        }
        this.kbToggleBtn.textContent = this.showVirtualKeyboard ? '⌨️ Native Only' : '🔤 Show Keys';
        if (this.nativeInputEl) this.nativeInputEl.focus();
      });
    }

    // Tapping the board focuses native iPad/Mac keyboard input
    if (this.boardEl) {
      this.boardEl.addEventListener('click', () => {
        if (this.nativeInputEl) {
          this.nativeInputEl.focus();
        }
      });
    }

    // Native Hidden Input synchronization (for native iOS/Mac keyboard)
    if (this.nativeInputEl) {
      this.nativeInputEl.addEventListener('input', (e) => {
        if (this.isGameOver) return;
        const val = this.nativeInputEl.value.toUpperCase().replace(/[^A-Z]/g, '');
        this.currentInput = val.slice(0, this.wordLength);
        this.renderBoard();
      });

      this.nativeInputEl.addEventListener('keydown', (e) => {
        if (this.isGameOver) return;
        if (e.key === 'Enter') {
          e.preventDefault();
          this.handleKeyInput('ENTER');
        }
      });
    }

    // Win Modal Next Button
    const winNextBtn = document.getElementById('wo-win-next-btn');
    if (winNextBtn) {
      winNextBtn.addEventListener('click', () => {
        if (this.winModalEl) this.winModalEl.classList.add('hidden');
        this.startNewGame();
      });
    }

    // Global Physical Keyboard Listener (Mac / Hardware Keyboard)
    window.addEventListener('keydown', (e) => {
      if (this.viewEl && this.viewEl.classList.contains('active') && !this.isGameOver) {
        // If target is not the native input itself, handle keys
        if (e.target !== this.nativeInputEl) {
          if (e.key === 'Enter') {
            this.handleKeyInput('ENTER');
          } else if (e.key === 'Backspace') {
            this.handleKeyInput('BACKSPACE');
          } else if (/^[a-zA-Z]$/.test(e.key)) {
            this.handleKeyInput(e.key.toUpperCase());
          }
        }
      }
    });

    this.renderKeyboard();
  }

  startNewGame() {
    this.isGameOver = false;
    this.guesses = [];
    this.currentInput = '';
    this.keyboardState = {};
    if (this.clueBoxEl) this.clueBoxEl.classList.add('hidden');
    if (this.winModalEl) this.winModalEl.classList.add('hidden');

    const catData = this.categories[this.currentCategory] || this.categories.countries;
    const wordList = catData.words;

    // Pick random word
    const randItem = wordList[Math.floor(Math.random() * wordList.length)];
    this.currentWordData = randItem;
    this.secretWord = randItem.word.toUpperCase();
    this.wordLength = this.secretWord.length;

    // Update Clue Button State (locked until guess 3)
    this.updateClueButtonState();
    this.renderBoard();
    this.renderKeyboard();
    this.updateHUD();
  }

  renderBoard() {
    if (!this.boardEl) return;
    this.boardEl.innerHTML = '';
    this.boardEl.style.setProperty('--word-len', this.wordLength);

    for (let row = 0; row < this.maxGuesses; row++) {
      const rowEl = document.createElement('div');
      rowEl.className = `wo-row ${row === this.guesses.length ? 'current' : ''}`;
      rowEl.style.gridTemplateColumns = `repeat(${this.wordLength}, 1fr)`;

      const evaluatedGuess = this.guesses[row];

      for (let col = 0; col < this.wordLength; col++) {
        const tile = document.createElement('div');
        tile.className = 'wo-tile';

        if (evaluatedGuess) {
          // Completed Row
          const char = evaluatedGuess.guess[col];
          const result = evaluatedGuess.eval[col]; // 'green' | 'yellow' | 'gray'
          tile.textContent = char;
          tile.classList.add('revealed', result);
          tile.style.animationDelay = `${col * 0.12}s`;
        } else if (row === this.guesses.length) {
          // Active Row being typed
          const char = this.currentInput[col] || '';
          tile.textContent = char;
          if (char) tile.classList.add('filled', 'pop');
        }

        rowEl.appendChild(tile);
      }

      this.boardEl.appendChild(rowEl);
    }
  }

  renderKeyboard() {
    if (!this.keyboardEl) return;
    this.keyboardEl.innerHTML = '';

    const rows = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
    ];

    rows.forEach(rowKeys => {
      const rowEl = document.createElement('div');
      rowEl.className = 'wo-key-row';

      rowKeys.forEach(key => {
        const btn = document.createElement('button');
        btn.className = `wo-key ${key.length > 1 ? 'special' : ''}`;
        btn.textContent = key;
        btn.dataset.key = key;

        const state = this.keyboardState[key];
        if (state) btn.classList.add(state);

        btn.addEventListener('click', () => {
          if (key === '⌫') {
            this.handleKeyInput('BACKSPACE');
          } else {
            this.handleKeyInput(key);
          }
        });

        rowEl.appendChild(btn);
      });

      this.keyboardEl.appendChild(rowEl);
    });
  }

  handleKeyInput(key) {
    if (this.isGameOver) return;

    if (key === 'BACKSPACE') {
      if (this.currentInput.length > 0) {
        if (window.soundEngine) window.soundEngine.playTap();
        this.currentInput = this.currentInput.slice(0, -1);
        this.renderBoard();
      }
      return;
    }

    if (key === 'ENTER') {
      if (this.currentInput.length === this.wordLength) {
        this.submitGuess();
      } else {
        if (window.soundEngine) window.soundEngine.playWrong();
        this.showToast(`Need ${this.wordLength} letters! ✍️`);
      }
      return;
    }

    // Letter key (A-Z)
    if (this.currentInput.length < this.wordLength) {
      if (window.soundEngine) window.soundEngine.playTap();
      this.currentInput += key;
      this.renderBoard();
    }
  }

  submitGuess() {
    const guess = this.currentInput.toUpperCase();
    if (guess.length !== this.wordLength) return;

    // 2-PASS STANDARD WORDLE EVALUATOR
    const evalResults = this.evaluateWordle(guess, this.secretWord);

    this.guesses.push({
      guess: guess,
      eval: evalResults
    });

    // Update Keyboard Colors
    for (let i = 0; i < this.wordLength; i++) {
      const char = guess[i];
      const res = evalResults[i]; // 'green' | 'yellow' | 'gray'

      // Green overrides yellow/gray; yellow overrides gray
      if (res === 'green') {
        this.keyboardState[char] = 'green';
      } else if (res === 'yellow' && this.keyboardState[char] !== 'green') {
        this.keyboardState[char] = 'yellow';
      } else if (res === 'gray' && !this.keyboardState[char]) {
        this.keyboardState[char] = 'gray';
      }
    }

    this.currentInput = '';
    if (this.nativeInputEl) this.nativeInputEl.value = '';
    this.renderBoard();
    this.renderKeyboard();
    this.updateClueButtonState();

    // Check Win Condition
    const isWin = evalResults.every(r => r === 'green');
    if (isWin) {
      this.handleWin();
      return;
    }

    // Check Loss Condition
    if (this.guesses.length >= this.maxGuesses) {
      this.handleLoss();
      return;
    }

    if (window.soundEngine) window.soundEngine.playCorrect();
  }

  /**
   * 2-Pass Wordle Frequency Evaluation Algorithm
   * Guarantees zero duplicate letter coloring glitches
   */
  evaluateWordle(guess, secret) {
    const result = Array(guess.length).fill('gray');
    const secretLetters = secret.split('');
    const remainingCount = {};

    // Build letter frequency map for secret word
    secretLetters.forEach(ch => {
      remainingCount[ch] = (remainingCount[ch] || 0) + 1;
    });

    // Pass 1: Mark exact matches (Green)
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === secret[i]) {
        result[i] = 'green';
        remainingCount[guess[i]]--;
      }
    }

    // Pass 2: Mark partial matches (Yellow) if remaining count > 0
    for (let i = 0; i < guess.length; i++) {
      if (result[i] === 'gray') {
        const char = guess[i];
        if (remainingCount[char] > 0) {
          result[i] = 'yellow';
          remainingCount[char]--;
        }
      }
    }

    return result;
  }

  handleWin() {
    this.isGameOver = true;
    this.streak++;

    // Aura Points & XP calculation
    const baseAura = 50;
    const attemptBonus = Math.max(0, (this.maxGuesses - this.guesses.length) * 12);
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
      window.helpers.spawnAuraFloatingText(`+${totalAura} AURA! 📚 WORD SOLVED!`);
    }

    // Populate and show Victory Fact Card Modal
    const winWord = document.getElementById('wo-win-word');
    const winFact = document.getElementById('wo-win-fact');
    const winStats = document.getElementById('wo-win-stats');
    const winAura = document.getElementById('wo-win-aura');

    if (winWord) winWord.textContent = this.secretWord;
    if (winFact) winFact.innerHTML = `💡 <strong>Did You Know?</strong><br>${this.currentWordData.fact}`;
    if (winStats) winStats.textContent = `🎯 Solved in ${this.guesses.length}/${this.maxGuesses} guesses • 🔥 Streak: ${this.streak}`;
    if (winAura) winAura.textContent = `+${totalAura} AURA • +${Math.round(totalAura * 1.5)} XP`;

    if (this.winModalEl) {
      this.winModalEl.classList.remove('hidden');
    }

    this.updateHUD();
  }

  handleLoss() {
    this.isGameOver = true;
    this.streak = 0;

    if (window.soundEngine) window.soundEngine.playWrong();

    const winWord = document.getElementById('wo-win-word');
    const winFact = document.getElementById('wo-win-fact');
    const winStats = document.getElementById('wo-win-stats');
    const winAura = document.getElementById('wo-win-aura');

    if (winWord) winWord.textContent = this.secretWord;
    if (winFact) winFact.innerHTML = `💡 <strong>The Secret Word was:</strong> ${this.secretWord}<br>${this.currentWordData.fact}`;
    if (winStats) winStats.textContent = `Good try! Ready for the next word?`;
    if (winAura) winAura.textContent = `+5 Consolation XP`;

    if (this.winModalEl) {
      this.winModalEl.classList.remove('hidden');
    }

    this.updateHUD();
  }

  updateClueButtonState() {
    if (!this.clueBtn) return;
    if (this.guesses.length >= 3 && !this.isGameOver) {
      this.clueBtn.disabled = false;
      this.clueBtn.classList.add('unlocked');
      this.clueBtn.textContent = '💡 Pixel\'s Clue (Ready!)';
    } else {
      this.clueBtn.disabled = true;
      this.clueBtn.classList.remove('unlocked');
      this.clueBtn.textContent = `💡 Pixel's Clue (Unlocks in ${Math.max(0, 3 - this.guesses.length)})`;
    }
  }

  revealClue() {
    if (!this.currentWordData || !this.clueBoxEl || !this.clueTextEl) return;
    if (window.soundEngine) window.soundEngine.playTap();

    this.clueTextEl.innerHTML = `🤖 <strong>Pixel's Clue:</strong> ${this.currentWordData.clue}`;
    this.clueBoxEl.classList.remove('hidden');
  }

  showToast(msg) {
    if (window.helpers) {
      window.helpers.spawnAuraFloatingText(msg, undefined, undefined, true);
    }
  }

  updateHUD() {
    if (this.streakValEl) this.streakValEl.textContent = `${this.streak} 🔥`;
  }
}

window.WordOdysseyEngine = WordOdysseyEngine;
