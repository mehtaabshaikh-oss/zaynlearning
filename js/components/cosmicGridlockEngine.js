/**
 * Cosmic Gridlock (Rush Hour / Unblock Me) Game Engine
 * Features:
 * - Built-in Breadth-First Search (BFS) Solver for 100% solvability and dynamic hints
 * - Fluid iPad-first pointer drag physics with strict axis/collision clamping & grid snapping
 * - 3-Star progression, ↩️ Multi-step Undo, 🔄 Reset, 💡 Next Move Hint
 * - Level Selector Modal with persistent Star saves in GameState/LocalStorage
 */

class CosmicGridlockEngine {
  constructor() {
    this.levels = typeof COSMIC_GRIDLOCK_LEVELS !== 'undefined' ? COSMIC_GRIDLOCK_LEVELS : [];
    this.currentLevelIndex = 0;
    this.pieces = [];
    this.initialPieces = [];
    this.moveHistory = [];
    this.movesCount = 0;
    this.isWon = false;
    this.hintMove = null;

    // Drag State
    this.dragPieceId = null;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.pieceStartCoord = 0; // x if 'H', y if 'V'
    this.minCoord = 0;
    this.maxCoord = 0;
    this.cellSize = 60; // dynamically calculated

    // DOM Elements
    this.viewEl = document.getElementById('view-cosmic-gridlock');
    this.boardEl = document.getElementById('cgl-board');
    this.levelTitleEl = document.getElementById('cgl-level-title');
    this.levelTierEl = document.getElementById('cgl-level-tier');
    this.movesValEl = document.getElementById('cgl-moves-val');
    this.parValEl = document.getElementById('cgl-par-val');
    this.starsDisplayEl = document.getElementById('cgl-stars-display');
    this.winModalEl = document.getElementById('cgl-win-modal');
    this.levelSelectModalEl = document.getElementById('cgl-level-select-modal');

    this.bindEvents();
  }

  bindEvents() {
    // Exit game button
    const exitBtn = document.getElementById('exit-cgl-btn');
    if (exitBtn) {
      exitBtn.addEventListener('click', () => {
        window.app.showView('view-arcade-hub');
      });
    }

    // Undo button
    const undoBtn = document.getElementById('cgl-undo-btn');
    if (undoBtn) {
      undoBtn.addEventListener('click', () => this.undoMove());
    }

    // Reset button
    const resetBtn = document.getElementById('cgl-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.resetLevel());
    }

    // Hint button
    const hintBtn = document.getElementById('cgl-hint-btn');
    if (hintBtn) {
      hintBtn.addEventListener('click', () => this.showOptimalHint());
    }

    // Level Select button
    const selectBtn = document.getElementById('cgl-select-btn');
    if (selectBtn) {
      selectBtn.addEventListener('click', () => this.openLevelSelectModal());
    }

    // Close Level Select modal button
    const closeSelectBtn = document.getElementById('cgl-close-select-btn');
    if (closeSelectBtn) {
      closeSelectBtn.addEventListener('click', () => {
        if (this.levelSelectModalEl) this.levelSelectModalEl.classList.add('hidden');
      });
    }

    // Next Level button on Win Modal
    const winNextBtn = document.getElementById('cgl-win-next-btn');
    if (winNextBtn) {
      winNextBtn.addEventListener('click', () => {
        if (this.winModalEl) this.winModalEl.classList.add('hidden');
        if (this.currentLevelIndex < this.levels.length - 1) {
          this.loadLevel(this.currentLevelIndex + 1);
        } else {
          this.openLevelSelectModal();
        }
      });
    }

    // Replay Level button on Win Modal
    const winReplayBtn = document.getElementById('cgl-win-replay-btn');
    if (winReplayBtn) {
      winReplayBtn.addEventListener('click', () => {
        if (this.winModalEl) this.winModalEl.classList.add('hidden');
        this.resetLevel();
      });
    }

    // Warp Exit Gate Click Handler
    const exitGate = document.querySelector('.cgl-exit-gate');
    if (exitGate) {
      exitGate.addEventListener('click', () => {
        const target = this.pieces.find(p => p.id === 'target');
        if (target && target.y === 2) {
          const bounds = this.calculateMovementBounds(target);
          if (bounds.max >= 4) {
            target.x = 4;
            this.movesCount++;
            this.updateHUD();
            this.triggerWarpExitAnimation();
          }
        }
      });
    }

    // Handle window resize for dynamic cell scaling
    window.addEventListener('resize', () => {
      if (this.viewEl && this.viewEl.classList.contains('active')) {
        this.updateBoardDimensions();
        this.renderPieces();
      }
    });
  }

  loadLevel(levelIndex) {
    if (levelIndex < 0 || levelIndex >= this.levels.length) levelIndex = 0;
    this.currentLevelIndex = levelIndex;
    const levelData = this.levels[this.currentLevelIndex];

    this.isWon = false;
    this.movesCount = 0;
    this.moveHistory = [];
    this.hintMove = null;

    if (this.winModalEl) this.winModalEl.classList.add('hidden');
    if (this.levelSelectModalEl) this.levelSelectModalEl.classList.add('hidden');

    this.pieces = JSON.parse(JSON.stringify(levelData.pieces));
    this.initialPieces = JSON.parse(JSON.stringify(levelData.pieces));

    this.updateHUD();
    this.updateBoardDimensions();
    this.renderPieces();
  }

  updateBoardDimensions() {
    if (!this.boardEl) return;
    const rect = this.boardEl.getBoundingClientRect();
    // 6 cells per row/col
    this.cellSize = (rect.width > 0 ? rect.width : 360) / 6;
  }

  renderPieces() {
    if (!this.boardEl) return;
    // Clear existing rendered piece elements (preserve grid background or exit gate)
    const existingPieces = this.boardEl.querySelectorAll('.cgl-piece');
    existingPieces.forEach(p => p.remove());

    const hintIndicator = this.boardEl.querySelector('.cgl-hint-indicator');
    if (hintIndicator) hintIndicator.remove();

    this.pieces.forEach(p => {
      const pieceEl = document.createElement('div');
      pieceEl.className = `cgl-piece ${p.ori.toLowerCase()} ${p.type} ${p.id === 'target' ? 'target-ship' : ''}`;
      pieceEl.dataset.id = p.id;
      pieceEl.id = `cgl-piece-${p.id}`;

      const width = p.ori === 'H' ? (p.len * 100) / 6 : 100 / 6;
      const height = p.ori === 'V' ? (p.len * 100) / 6 : 100 / 6;
      const left = (p.x * 100) / 6;
      const top = (p.y * 100) / 6;

      pieceEl.style.width = `${width}%`;
      pieceEl.style.height = `${height}%`;
      pieceEl.style.left = `${left}%`;
      pieceEl.style.top = `${top}%`;

      // Interior spaceship styling
      pieceEl.innerHTML = `
        <div class="cgl-piece-inner">
          <div class="cgl-piece-thruster"></div>
          <span class="cgl-piece-label">${p.id === 'target' ? '🚀' : ''}</span>
        </div>
      `;

      // Bind Pointer Events for smooth drag and drop
      pieceEl.addEventListener('pointerdown', (e) => this.handlePointerDown(e, p.id));

      this.boardEl.appendChild(pieceEl);
    });

    // Render active hint animation if active
    if (this.hintMove) {
      this.renderHintArrow(this.hintMove);
    }
  }

  // =========================================================================
  // POINTER DRAG & AXIS-CLAMPED COLLISION PHYSICS
  // =========================================================================

  handlePointerDown(e, pieceId) {
    if (this.isWon) return;
    e.preventDefault();

    const piece = this.pieces.find(p => p.id === pieceId);
    if (!piece) return;

    this.dragPieceId = pieceId;
    this.dragStartX = e.clientX;
    this.dragStartY = e.clientY;
    this.pieceStartCoord = (piece.ori === 'H') ? piece.x : piece.y;

    // Calculate strict movement bounds (clamped against walls and obstacles)
    const bounds = this.calculateMovementBounds(piece);
    this.minCoord = bounds.min;
    this.maxCoord = bounds.max;

    const pieceEl = document.getElementById(`cgl-piece-${pieceId}`);
    if (pieceEl) {
      pieceEl.setPointerCapture(e.pointerId);
      pieceEl.classList.add('dragging');
      if (window.soundEngine) window.soundEngine.playTap();
    }

    const onPointerMove = (moveEvt) => this.handlePointerMove(moveEvt);
    const onPointerUp = (upEvt) => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      this.handlePointerUp(upEvt);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  }

  handlePointerMove(e) {
    if (!this.dragPieceId) return;
    const piece = this.pieces.find(p => p.id === this.dragPieceId);
    const pieceEl = document.getElementById(`cgl-piece-${this.dragPieceId}`);
    if (!piece || !pieceEl) return;

    this.updateBoardDimensions();

    if (piece.ori === 'H') {
      const deltaPx = e.clientX - this.dragStartX;
      const deltaGrid = deltaPx / this.cellSize;
      let newGridX = this.pieceStartCoord + deltaGrid;
      // Clamp between calculated min and max
      newGridX = Math.max(this.minCoord, Math.min(this.maxCoord, newGridX));
      pieceEl.style.left = `${(newGridX * 100) / 6}%`;
    } else {
      const deltaPx = e.clientY - this.dragStartY;
      const deltaGrid = deltaPx / this.cellSize;
      let newGridY = this.pieceStartCoord + deltaGrid;
      // Clamp between calculated min and max
      newGridY = Math.max(this.minCoord, Math.min(this.maxCoord, newGridY));
      pieceEl.style.top = `${(newGridY * 100) / 6}%`;
    }
  }

  handlePointerUp(e) {
    if (!this.dragPieceId) return;
    const piece = this.pieces.find(p => p.id === this.dragPieceId);
    const pieceEl = document.getElementById(`cgl-piece-${this.dragPieceId}`);

    if (piece && pieceEl) {
      pieceEl.classList.remove('dragging');

      // Calculate nearest integer snap coordinate
      let finalCoord = this.pieceStartCoord;
      if (piece.ori === 'H') {
        const deltaPx = e.clientX - this.dragStartX;
        const deltaGrid = deltaPx / this.cellSize;
        finalCoord = Math.round(this.pieceStartCoord + deltaGrid);
        finalCoord = Math.max(this.minCoord, Math.min(this.maxCoord, finalCoord));

        if (finalCoord !== piece.x) {
          // Record move history
          this.moveHistory.push(JSON.parse(JSON.stringify(this.pieces)));
          piece.x = finalCoord;
          this.movesCount++;
          if (window.soundEngine) window.soundEngine.playTap();
        }
      } else {
        const deltaPx = e.clientY - this.dragStartY;
        const deltaGrid = deltaPx / this.cellSize;
        finalCoord = Math.round(this.pieceStartCoord + deltaGrid);
        finalCoord = Math.max(this.minCoord, Math.min(this.maxCoord, finalCoord));

        if (finalCoord !== piece.y) {
          this.moveHistory.push(JSON.parse(JSON.stringify(this.pieces)));
          piece.y = finalCoord;
          this.movesCount++;
          if (window.soundEngine) window.soundEngine.playTap();
        }
      }
    }

    this.dragPieceId = null;
    this.hintMove = null;
    this.updateHUD();
    this.renderPieces();

    // Check Win Condition
    this.checkWinCondition();
  }

  calculateMovementBounds(piece) {
    // Build 6x6 occupancy grid excluding the active dragged piece
    const grid = Array.from({ length: 6 }, () => Array(6).fill(null));

    this.pieces.forEach(p => {
      if (p.id === piece.id) return;
      for (let i = 0; i < p.len; i++) {
        const gx = p.ori === 'H' ? p.x + i : p.x;
        const gy = p.ori === 'V' ? p.y + i : p.y;
        if (gx >= 0 && gx < 6 && gy >= 0 && gy < 6) {
          grid[gy][gx] = p.id;
        }
      }
    });

    let min = 0;
    let max = 6 - piece.len;

    if (piece.ori === 'H') {
      const row = piece.y;
      // Search left bound
      for (let col = piece.x - 1; col >= 0; col--) {
        if (grid[row][col] !== null) {
          min = col + 1;
          break;
        }
      }
      // Search right bound
      for (let col = piece.x + piece.len; col < 6; col++) {
        if (grid[row][col] !== null) {
          max = col - piece.len;
          break;
        }
      }

      // If Target Flagship has a clear path to the Exit Gate on Row 2, allow dragging into/through the gate!
      if (piece.id === 'target' && row === 2 && max === 6 - piece.len) {
        max = 5.5; // Allow visual overshoot into the warp gate!
      }
    } else {
      const col = piece.x;
      // Search top bound
      for (let row = piece.y - 1; row >= 0; row--) {
        if (grid[row][col] !== null) {
          min = row + 1;
          break;
        }
      }
      // Search bottom bound
      for (let row = piece.y + piece.len; row < 6; row++) {
        if (grid[row][col] !== null) {
          max = row - piece.len;
          break;
        }
      }
    }

    return { min, max };
  }

  // =========================================================================
  // WIN CONDITION & WARP JUMP PROGRESSION
  // =========================================================================

  checkWinCondition() {
    const target = this.pieces.find(p => p.id === 'target');
    if (target && target.x >= 4 && target.y === 2) {
      target.x = 4;
      this.triggerWarpExitAnimation();
    }
  }

  triggerWarpExitAnimation() {
    if (this.isWon) return;
    this.isWon = true;

    const targetEl = document.getElementById('cgl-piece-target');
    if (targetEl) {
      targetEl.style.transition = 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.55s ease';
      targetEl.style.transform = 'translateX(180%) scale(0.9)';
      targetEl.style.opacity = '0';
      targetEl.style.zIndex = '50';
    }

    // Pulse Exit Gate
    const exitGate = document.querySelector('.cgl-exit-gate');
    if (exitGate) {
      exitGate.style.transform = 'scale(1.3)';
      setTimeout(() => { if (exitGate) exitGate.style.transform = ''; }, 600);
    }

    setTimeout(() => {
      this.handleWin();
    }, 450);
  }

  handleWin() {
    const levelData = this.levels[this.currentLevelIndex];
    const par = levelData.par;
    const moves = this.movesCount;

    // Calculate Stars
    let stars = 1;
    if (moves <= par) stars = 3;
    else if (moves <= par + 4) stars = 2;

    // Save level stars to GameState / LocalStorage
    this.saveLevelProgress(levelData.id, stars, moves);

    // Aura Points & XP calculation
    const baseAura = (levelData.tier === 'Cadet') ? 40 : (levelData.tier === 'Explorer') ? 60 : (levelData.tier === 'Commander') ? 90 : 130;
    const starBonus = stars * 15;
    const totalAura = baseAura + starBonus;

    try {
      if (window.gameState) {
        window.gameState.addAura(totalAura);
        window.gameState.addXP(Math.round(totalAura * 1.5));
        window.gameState.addGems(stars === 3 ? 3 : 1);
        window.gameState.save();
      }

      if (window.soundEngine) {
        if (typeof window.soundEngine.playFanfare === 'function') {
          window.soundEngine.playFanfare();
        } else if (typeof window.soundEngine.playLevelUp === 'function') {
          window.soundEngine.playLevelUp();
        }
      }

      if (window.helpers) {
        if (typeof window.helpers.spawnConfetti === 'function') window.helpers.spawnConfetti();
        if (typeof window.helpers.spawnAuraFloatingText === 'function') {
          window.helpers.spawnAuraFloatingText(`+${totalAura} AURA! 🚀 WARP GATE CLEARED!`);
        }
      }
    } catch (err) {
      console.warn("Non-critical error during victory effects:", err);
    }

    // Populate and show Win Modal
    const winTitle = document.getElementById('cgl-win-title');
    const winStars = document.getElementById('cgl-win-stars');
    const winStats = document.getElementById('cgl-win-stats');
    const winAura = document.getElementById('cgl-win-aura');

    if (winTitle) winTitle.textContent = "🚀 WARP GATE CLEARED!";
    if (winStars) winStars.textContent = "⭐".repeat(stars) + "☆".repeat(3 - stars);
    if (winStats) winStats.textContent = `🎯 Moves: ${moves} (Goal Par: ${par}) • Rank: ${stars === 3 ? 'Master Pilot' : stars === 2 ? 'Ace Navigator' : 'Explorer'}`;
    if (winAura) winAura.textContent = `+${totalAura} AURA • +${Math.round(totalAura * 1.5)} XP`;

    if (this.winModalEl) {
      this.winModalEl.classList.remove('hidden');
    }
  }

  saveLevelProgress(levelId, stars, moves) {
    try {
      const key = `cosmic_gridlock_progress`;
      const saved = JSON.parse(localStorage.getItem(key) || '{}');
      const prev = saved[levelId] || { stars: 0, bestMoves: 999 };

      saved[levelId] = {
        stars: Math.max(prev.stars, stars),
        bestMoves: Math.min(prev.bestMoves, moves),
        unlocked: true
      };

      // Auto unlock next level
      const nextId = levelId + 1;
      if (!saved[nextId]) {
        saved[nextId] = { stars: 0, bestMoves: 999, unlocked: true };
      }

      localStorage.setItem(key, JSON.stringify(saved));
    } catch (e) {
      console.warn("Could not save level progress:", e);
    }
  }

  getLevelProgress(levelId) {
    try {
      const key = `cosmic_gridlock_progress`;
      const saved = JSON.parse(localStorage.getItem(key) || '{}');
      if (levelId === 1 && !saved[1]) {
        return { stars: 0, bestMoves: 0, unlocked: true };
      }
      return saved[levelId] || { stars: 0, bestMoves: 0, unlocked: levelId === 1 };
    } catch (e) {
      return { stars: 0, bestMoves: 0, unlocked: levelId === 1 };
    }
  }

  undoMove() {
    if (this.moveHistory.length === 0 || this.isWon) return;

    this.pieces = this.moveHistory.pop();
    this.movesCount = Math.max(0, this.movesCount - 1);
    this.hintMove = null;

    if (window.soundEngine) window.soundEngine.playTap();
    this.updateHUD();
    this.renderPieces();
  }

  resetLevel() {
    this.moveHistory.push(JSON.parse(JSON.stringify(this.pieces)));
    this.pieces = JSON.parse(JSON.stringify(this.initialPieces));
    this.movesCount = 0;
    this.isWon = false;
    this.hintMove = null;

    if (window.soundEngine) window.soundEngine.playTap();
    this.updateHUD();
    this.renderPieces();
  }

  // =========================================================================
  // BREADTH-FIRST SEARCH (BFS) SOLVER & HINT ENGINE
  // =========================================================================

  solve(pieces) {
    const queue = [{ state: pieces, path: [] }];
    const visited = new Set();
    visited.add(this.hashPieces(pieces));

    while (queue.length > 0) {
      const { state, path } = queue.shift();

      // Check win condition for target ship
      const target = state.find(p => p.id === 'target');
      if (target && target.x + target.len === 6 && target.y === 2) {
        return { solvable: true, path, minMoves: path.length };
      }

      // Generate all valid successor moves
      const nextMoves = this.generateValidMoves(state);
      for (const move of nextMoves) {
        const nextState = this.applyMove(state, move);
        const hash = this.hashPieces(nextState);

        if (!visited.has(hash)) {
          visited.add(hash);
          queue.push({
            state: nextState,
            path: [...path, move]
          });
        }
      }
    }

    return { solvable: false, path: [], minMoves: -1 };
  }

  generateValidMoves(state) {
    const grid = Array.from({ length: 6 }, () => Array(6).fill(null));
    state.forEach(p => {
      for (let i = 0; i < p.len; i++) {
        const gx = p.ori === 'H' ? p.x + i : p.x;
        const gy = p.ori === 'V' ? p.y + i : p.y;
        if (gx >= 0 && gx < 6 && gy >= 0 && gy < 6) {
          grid[gy][gx] = p.id;
        }
      }
    });

    const moves = [];

    state.forEach(p => {
      if (p.ori === 'H') {
        // Move Left
        for (let nx = p.x - 1; nx >= 0; nx--) {
          if (grid[p.y][nx] === null) {
            moves.push({ id: p.id, fromX: p.x, fromY: p.y, toX: nx, toY: p.y, dir: 'left' });
          } else {
            break;
          }
        }
        // Move Right
        for (let nx = p.x + 1; nx <= 6 - p.len; nx++) {
          if (grid[p.y][nx + p.len - 1] === null) {
            moves.push({ id: p.id, fromX: p.x, fromY: p.y, toX: nx, toY: p.y, dir: 'right' });
          } else {
            break;
          }
        }
      } else {
        // Move Up
        for (let ny = p.y - 1; ny >= 0; ny--) {
          if (grid[ny][p.x] === null) {
            moves.push({ id: p.id, fromX: p.x, fromY: p.y, toX: p.x, toY: ny, dir: 'up' });
          } else {
            break;
          }
        }
        // Move Down
        for (let ny = p.y + 1; ny <= 6 - p.len; ny++) {
          if (grid[ny + p.len - 1][p.x] === null) {
            moves.push({ id: p.id, fromX: p.x, fromY: p.y, toX: p.x, toY: ny, dir: 'down' });
          } else {
            break;
          }
        }
      }
    });

    return moves;
  }

  applyMove(state, move) {
    return state.map(p => {
      if (p.id === move.id) {
        return { ...p, x: move.toX, y: move.toY };
      }
      return { ...p };
    });
  }

  hashPieces(pieces) {
    return pieces
      .slice()
      .sort((a, b) => a.id.localeCompare(b.id))
      .map(p => `${p.id}:${p.x},${p.y}`)
      .join('|');
  }

  showOptimalHint() {
    if (this.isWon) return;
    if (window.soundEngine) window.soundEngine.playTap();

    const solution = this.solve(this.pieces);
    if (!solution.solvable || solution.path.length === 0) {
      if (window.helpers) window.helpers.spawnAuraFloatingText("No moves from here! Tap Reset 🔄", undefined, undefined, true);
      return;
    }

    const nextStep = solution.path[0];
    this.hintMove = nextStep;
    this.renderPieces();

    if (window.helpers) {
      const piece = this.pieces.find(p => p.id === nextStep.id);
      const pieceName = piece.id === 'target' ? 'Red Flagship' : `Cruiser ${piece.id.toUpperCase()}`;
      window.helpers.spawnAuraFloatingText(`💡 Slide ${pieceName} ${nextStep.dir.toUpperCase()}!`, undefined, undefined, true);
    }
  }

  renderHintArrow(move) {
    const existing = this.boardEl.querySelector('.cgl-hint-indicator');
    if (existing) existing.remove();

    const piece = this.pieces.find(p => p.id === move.id);
    if (!piece) return;

    const indicator = document.createElement('div');
    indicator.className = `cgl-hint-indicator dir-${move.dir}`;

    const left = (move.toX * 100) / 6;
    const top = (move.toY * 100) / 6;
    const width = piece.ori === 'H' ? (piece.len * 100) / 6 : 100 / 6;
    const height = piece.ori === 'V' ? (piece.len * 100) / 6 : 100 / 6;

    indicator.style.left = `${left}%`;
    indicator.style.top = `${top}%`;
    indicator.style.width = `${width}%`;
    indicator.style.height = `${height}%`;

    this.boardEl.appendChild(indicator);
  }

  // =========================================================================
  // LEVEL SELECT MODAL
  // =========================================================================

  openLevelSelectModal() {
    if (!this.levelSelectModalEl) return;
    if (window.soundEngine) window.soundEngine.playTap();

    const gridEl = document.getElementById('cgl-level-grid');
    if (gridEl) {
      gridEl.innerHTML = '';

      this.levels.forEach((lvl, idx) => {
        const prog = this.getLevelProgress(lvl.id);
        const card = document.createElement('div');
        card.className = `cgl-level-card ${prog.unlocked ? 'unlocked' : 'locked'} ${idx === this.currentLevelIndex ? 'current' : ''}`;

        card.innerHTML = `
          <div class="cgl-level-num">Level ${lvl.id}</div>
          <div class="cgl-level-name">${lvl.name}</div>
          <div class="cgl-level-tier">${lvl.tier}</div>
          <div class="cgl-level-stars">${prog.unlocked ? ('⭐'.repeat(prog.stars) + '☆'.repeat(3 - prog.stars)) : '🔒 Locked'}</div>
        `;

        if (prog.unlocked) {
          card.addEventListener('click', () => {
            if (this.levelSelectModalEl) this.levelSelectModalEl.classList.add('hidden');
            this.loadLevel(idx);
          });
        }

        gridEl.appendChild(card);
      });
    }

    this.levelSelectModalEl.classList.remove('hidden');
  }

  updateHUD() {
    const levelData = this.levels[this.currentLevelIndex];
    if (!levelData) return;

    if (this.levelTitleEl) this.levelTitleEl.textContent = `Level ${levelData.id}: ${levelData.name}`;
    if (this.levelTierEl) this.levelTierEl.textContent = levelData.tier.toUpperCase();
    if (this.movesValEl) this.movesValEl.textContent = this.movesCount;
    if (this.parValEl) this.parValEl.textContent = levelData.par;

    if (this.starsDisplayEl) {
      let stars = 1;
      if (this.movesCount <= levelData.par) stars = 3;
      else if (this.movesCount <= levelData.par + 4) stars = 2;
      this.starsDisplayEl.textContent = "⭐".repeat(stars) + "☆".repeat(3 - stars);
    }
  }
}

window.CosmicGridlockEngine = CosmicGridlockEngine;
