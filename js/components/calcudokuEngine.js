/**
 * Calcudoku / KenKen Engine: Arithmetic Cross-Grid & Latin Square Solver
 * Features Cage Outline Math, Pencil Notes, Real-Time Row/Column Conflict Detection & Tactile Keypad
 */

class CalcudokuEngine {
  constructor(customData) {
    if (customData) {
      this.data = customData;
    } else if (typeof window !== 'undefined' && window.CALCUDOKU_DATA) {
      this.data = window.CALCUDOKU_DATA;
    } else if (typeof CALCUDOKU_DATA !== 'undefined') {
      this.data = CALCUDOKU_DATA;
    } else {
      try {
        this.data = require('../data/calcudokuData.js').CALCUDOKU_DATA;
      } catch (e) {
        this.data = null;
      }
    }

    this.currentPuzzleIndex = 0;
    this.grid = [];
    this.notes = [];
    this.selectedCell = null;
    this.isPencilMode = false;
    this.conflicts = new Set();
    this.isGameOver = false;
    this.audioCtx = null;

    if (typeof document !== 'undefined') {
      this.initDOM();
    }
  }

  initDOM() {
    this.puzzleTitle = document.getElementById('calcu-puzzle-title');
    this.puzzleTier = document.getElementById('calcu-puzzle-tier');
    this.gridContainer = document.getElementById('calcu-grid-container');
    this.keypad = document.getElementById('calcu-keypad');
    this.pencilToggleBtn = document.getElementById('calcu-pencil-btn');
    this.eraseBtn = document.getElementById('calcu-erase-btn');
    this.hintBtn = document.getElementById('calcu-hint-btn');
    this.restartBtn = document.getElementById('calcu-restart-btn');
    this.levelSelectBtn = document.getElementById('calcu-level-btn');
    this.exitBtn = document.getElementById('exit-calcu-btn');

    // Modals
    this.winModal = document.getElementById('calcu-win-modal');
    this.nextBtn = document.getElementById('calcu-next-btn');
    this.levelModal = document.getElementById('calcu-level-modal');
    this.levelGrid = document.getElementById('calcu-level-grid');
    this.levelModalClose = document.getElementById('calcu-level-close-btn');

    this.bindEvents();
    this.loadPuzzle(0);
  }

  bindEvents() {
    if (this.exitBtn) {
      this.exitBtn.addEventListener('click', () => {
        if (window.app) window.app.showView('view-arcade-hub');
      });
    }

    if (this.restartBtn) {
      this.restartBtn.addEventListener('click', () => this.loadPuzzle(this.currentPuzzleIndex));
    }

    if (this.pencilToggleBtn) {
      this.pencilToggleBtn.addEventListener('click', () => {
        this.isPencilMode = !this.isPencilMode;
        this.pencilToggleBtn.classList.toggle('active', this.isPencilMode);
      });
    }

    if (this.eraseBtn) {
      this.eraseBtn.addEventListener('click', () => this.enterDigit(0));
    }

    if (this.hintBtn) {
      this.hintBtn.addEventListener('click', () => this.giveHint());
    }

    if (this.levelSelectBtn) {
      this.levelSelectBtn.addEventListener('click', () => this.openLevelSelect());
    }

    if (this.levelModalClose) {
      this.levelModalClose.addEventListener('click', () => {
        if (this.levelModal) this.levelModal.classList.add('hidden');
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        if (this.winModal) this.winModal.classList.add('hidden');
        if (this.currentPuzzleIndex + 1 < this.data.puzzles.length) {
          this.loadPuzzle(this.currentPuzzleIndex + 1);
        } else {
          this.loadPuzzle(0);
        }
      });
    }

    // Keyboard listener for desktop
    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', (e) => {
        if (!this.selectedCell || this.isGameOver) return;
        const puzzle = this.data.puzzles[this.currentPuzzleIndex];
        if (!puzzle) return;

        const num = parseInt(e.key, 10);
        if (!isNaN(num) && num >= 1 && num <= puzzle.size) {
          this.enterDigit(num);
        } else if (e.key === 'Backspace' || e.key === 'Delete') {
          this.enterDigit(0);
        } else if (e.key === 'ArrowUp') {
          this.selectedCell.r = Math.max(0, this.selectedCell.r - 1);
          this.renderGrid();
        } else if (e.key === 'ArrowDown') {
          this.selectedCell.r = Math.min(puzzle.size - 1, this.selectedCell.r + 1);
          this.renderGrid();
        } else if (e.key === 'ArrowLeft') {
          this.selectedCell.c = Math.max(0, this.selectedCell.c - 1);
          this.renderGrid();
        } else if (e.key === 'ArrowRight') {
          this.selectedCell.c = Math.min(puzzle.size - 1, this.selectedCell.c + 1);
          this.renderGrid();
        }
      });
    }
  }

  loadPuzzle(puzzleIndex) {
    if (!this.data || !this.data.puzzles[puzzleIndex]) return;

    this.currentPuzzleIndex = puzzleIndex;
    const p = this.data.puzzles[puzzleIndex];
    this.isGameOver = false;
    this.selectedCell = { r: 0, c: 0 };
    this.isPencilMode = false;
    if (this.pencilToggleBtn) this.pencilToggleBtn.classList.remove('active');

    // Initialize blank grid and notes
    this.grid = [];
    this.notes = [];
    for (let r = 0; r < p.size; r++) {
      this.grid[r] = new Array(p.size).fill(0);
      this.notes[r] = [];
      for (let c = 0; c < p.size; c++) {
        this.notes[r][c] = new Set();
      }
    }

    if (this.puzzleTitle) this.puzzleTitle.textContent = p.title;
    if (this.puzzleTier) this.puzzleTier.textContent = p.tier;
    if (this.winModal) this.winModal.classList.add('hidden');

    this.renderGrid();
    this.renderKeypad();
  }

  enterDigit(digit) {
    if (!this.selectedCell || this.isGameOver) return;
    const { r, c } = this.selectedCell;

    if (this.isPencilMode && digit !== 0) {
      // Toggle note in cell
      if (this.notes[r][c].has(digit)) {
        this.notes[r][c].delete(digit);
      } else {
        this.notes[r][c].add(digit);
      }
    } else {
      // Main digit fill
      this.grid[r][c] = digit;
      this.notes[r][c].clear();
    }

    this.playTone(digit === 0 ? 220 : 380 + digit * 40, 'triangle', 0.06);
    this.validateGrid();
    this.renderGrid();
  }

  validateGrid() {
    const p = this.data.puzzles[this.currentPuzzleIndex];
    if (!p) return;

    this.conflicts.clear();

    // 1. Check Row Conflicts
    for (let r = 0; r < p.size; r++) {
      const seen = {};
      for (let c = 0; c < p.size; c++) {
        const val = this.grid[r][c];
        if (val !== 0) {
          if (seen[val] !== undefined) {
            this.conflicts.add(`${r},${c}`);
            this.conflicts.add(`${r},${seen[val]}`);
          } else {
            seen[val] = c;
          }
        }
      }
    }

    // 2. Check Column Conflicts
    for (let c = 0; c < p.size; c++) {
      const seen = {};
      for (let r = 0; r < p.size; r++) {
        const val = this.grid[r][c];
        if (val !== 0) {
          if (seen[val] !== undefined) {
            this.conflicts.add(`${r},${c}`);
            this.conflicts.add(`${seen[val]},${c}`);
          } else {
            seen[val] = r;
          }
        }
      }
    }

    // 3. Check All Cages and Board Complete
    let allCagesSatisfied = true;
    p.cages.forEach(cage => {
      const vals = cage.cells.map(([cr, cc]) => this.grid[cr][cc]);
      const res = this.data.validateCage(cage.op, cage.target, vals);
      if (!res.satisfied) {
        allCagesSatisfied = false;
      }
    });

    const isFull = this.grid.every(row => row.every(v => v !== 0));
    if (isFull && this.conflicts.size === 0 && allCagesSatisfied) {
      this.isGameOver = true;
      this.playFanfare();
      if (typeof window !== 'undefined' && window.gameState) {
        window.gameState.addXP(50);
        window.gameState.addAura(25);
        window.gameState.addGems(1);
      }
      setTimeout(() => {
        if (this.winModal) this.winModal.classList.remove('hidden');
      }, 500);
    }
  }

  giveHint() {
    const p = this.data.puzzles[this.currentPuzzleIndex];
    if (!p || this.isGameOver) return;

    let targetR = this.selectedCell ? this.selectedCell.r : 0;
    let targetC = this.selectedCell ? this.selectedCell.c : 0;

    // If active cell is already filled correctly, find first empty or incorrect cell
    if (this.grid[targetR][targetC] === p.solution[targetR][targetC]) {
      let found = false;
      for (let r = 0; r < p.size; r++) {
        for (let c = 0; c < p.size; c++) {
          if (this.grid[r][c] !== p.solution[r][c]) {
            targetR = r;
            targetC = c;
            found = true;
            break;
          }
        }
        if (found) break;
      }
    }

    this.selectedCell = { r: targetR, c: targetC };
    this.grid[targetR][targetC] = p.solution[targetR][targetC];
    this.notes[targetR][targetC].clear();
    this.validateGrid();
    this.renderGrid();
    this.playTone(600, 'sine', 0.15);
  }

  renderGrid() {
    if (!this.gridContainer) return;
    const p = this.data.puzzles[this.currentPuzzleIndex];
    if (!p) return;

    this.gridContainer.innerHTML = '';
    this.gridContainer.style.gridTemplateColumns = `repeat(${p.size}, 1fr)`;

    // Map cell coords to cage labels
    const cageLabels = {};
    const cageMap = {};
    p.cages.forEach(cage => {
      // Label top-left cell of cage
      const [topR, topC] = cage.cells[0];
      cageLabels[`${topR},${topC}`] = `${cage.target}${cage.op === '=' ? '' : cage.op}`;

      cage.cells.forEach(([cr, cc]) => {
        cageMap[`${cr},${cc}`] = cage;
      });
    });

    for (let r = 0; r < p.size; r++) {
      for (let c = 0; c < p.size; c++) {
        const val = this.grid[r][c];
        const isSelected = this.selectedCell && (this.selectedCell.r === r && this.selectedCell.c === c);
        const isConflict = this.conflicts.has(`${r},${c}`);
        const cage = cageMap[`${r},${c}`];
        const label = cageLabels[`${r},${c}`];

        // Check if entire cage is satisfied
        let isCageSatisfied = false;
        if (cage) {
          const vals = cage.cells.map(([cr, cc]) => this.grid[cr][cc]);
          isCageSatisfied = this.data.validateCage(cage.op, cage.target, vals).satisfied;
        }

        const cellEl = document.createElement('div');
        cellEl.className = `calcu-cell ${isSelected ? 'selected' : ''} ${isConflict ? 'conflict' : ''} ${isCageSatisfied ? 'cage-done' : ''}`;

        // Add cage boundary borders
        if (cage) {
          if (!this.isInSameCage(cage, r - 1, c)) cellEl.classList.add('border-top');
          if (!this.isInSameCage(cage, r + 1, c)) cellEl.classList.add('border-bottom');
          if (!this.isInSameCage(cage, r, c - 1)) cellEl.classList.add('border-left');
          if (!this.isInSameCage(cage, r, c + 1)) cellEl.classList.add('border-right');
        }

        // Top-left operator label
        if (label) {
          const labelEl = document.createElement('span');
          labelEl.className = 'calcu-cage-label';
          labelEl.textContent = label;
          cellEl.appendChild(labelEl);
        }

        // Cell Main Value or Pencil Notes
        if (val !== 0) {
          const valEl = document.createElement('span');
          valEl.className = 'calcu-cell-val';
          valEl.textContent = val;
          cellEl.appendChild(valEl);
        } else if (this.notes[r][c].size > 0) {
          const notesEl = document.createElement('div');
          notesEl.className = 'calcu-notes-grid';
          for (let n = 1; n <= p.size; n++) {
            const noteSpan = document.createElement('span');
            noteSpan.className = 'calcu-note-num';
            noteSpan.textContent = this.notes[r][c].has(n) ? n : '';
            notesEl.appendChild(noteSpan);
          }
          cellEl.appendChild(notesEl);
        }

        cellEl.addEventListener('click', () => {
          this.selectedCell = { r, c };
          this.renderGrid();
        });

        this.gridContainer.appendChild(cellEl);
      }
    }
  }

  isInSameCage(cage, r, c) {
    return cage.cells.some(([cr, cc]) => cr === r && cc === c);
  }

  renderKeypad() {
    if (!this.keypad) return;
    const p = this.data.puzzles[this.currentPuzzleIndex];
    if (!p) return;

    this.keypad.innerHTML = '';
    for (let n = 1; n <= p.size; n++) {
      const btn = document.createElement('button');
      btn.className = 'calcu-num-btn';
      btn.textContent = n;
      btn.addEventListener('click', () => this.enterDigit(n));
      this.keypad.appendChild(btn);
    }
  }

  openLevelSelect() {
    if (!this.levelModal || !this.levelGrid || !this.data) return;

    this.levelGrid.innerHTML = '';
    this.data.puzzles.forEach((pz, idx) => {
      const btn = document.createElement('button');
      btn.className = `calcu-lvl-btn ${idx === this.currentPuzzleIndex ? 'current' : ''}`;
      btn.innerHTML = `
        <span class="lvl-size-badge">${pz.size}×${pz.size}</span>
        <span class="lvl-title">${pz.title}</span>
        <span class="lvl-tier">${pz.tier}</span>
      `;
      btn.addEventListener('click', () => {
        this.levelModal.classList.add('hidden');
        this.loadPuzzle(idx);
      });
      this.levelGrid.appendChild(btn);
    });

    this.levelModal.classList.remove('hidden');
  }

  startNewGame() {
    this.loadPuzzle(0);
  }

  // Audio helpers
  getAudioContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) this.audioCtx = new AudioContext();
    }
    return this.audioCtx;
  }

  playTone(freq, type = 'sine', duration = 0.1) {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  }

  playFanfare() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.15, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.3);
      });
    } catch (e) {}
  }
}

// Export for Node.js unit tests & Browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CalcudokuEngine };
}
if (typeof window !== 'undefined') {
  window.CalcudokuEngine = CalcudokuEngine;
}
