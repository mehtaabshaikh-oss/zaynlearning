/**
 * Times Table 2048: Multiplier Matrix Engine
 * Hardware-Accelerated 60/120fps GPU Rendering (translate3d) & Persistent DOM Tiles
 *
 * Features:
 * - Multiplier Table Modes: 2 (Classic), 3, 4, 6, 7, 8, 9, 11, 12
 * - Persistent DOM tile elements with translate3d GPU sliding (no innerHTML wiping)
 * - 2-Stage Animated Merge (slide -> pop bounce -> spawn appear)
 * - 115ms input throttling for zero input lag and silky 120Hz ProMotion response
 * - iPad Touch Swipe gestures with deadzone & touch-action: none
 * - Keyboard WASD & Arrow Key controls
 * - Per-Multiplier High Score & Max Tile storage in LocalStorage
 * - Multi-Step Undo (up to 3 moves) & Restart
 * - Dynamic font auto-scaling for multi-digit numbers (up to 12,288)
 * - Endless Mode continuation after reaching Goal Tile (1024 * M)
 */

class Multiplier2048Engine {
  constructor() {
    this.gridSize = 4;
    this.baseMultiplier = 2;
    this.grid = Array.from({ length: this.gridSize }, () => Array(this.gridSize).fill(null));
    this.tiles = []; // Active persistent tile objects
    this.tileIdCounter = 1;
    this.score = 0;
    this.bestScore = 0;
    this.highestTile = 0;
    this.hasWon = false;
    this.isEndless = false;
    this.isGameOver = false;
    this.isAnimating = false;
    this.moveHistory = []; // max 3 moves for undo

    // DOM Elements
    this.viewEl = document.getElementById('view-multiplier-2048');
    this.boardEl = document.getElementById('m2048-board');
    this.tilesContainerEl = document.getElementById('m2048-tiles-container');
    this.scoreEl = document.getElementById('m2048-score-val');
    this.bestScoreEl = document.getElementById('m2048-best-val');
    this.targetTileGoalEl = document.getElementById('m2048-goal-val');
    this.winModalEl = document.getElementById('m2048-win-modal');
    this.gameOverModalEl = document.getElementById('m2048-gameover-modal');

    // Touch gesture state
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchStartTime = 0;

    this.bindEvents();
  }

  bindEvents() {
    // Exit game button
    const exitBtn = document.getElementById('exit-m2048-btn');
    if (exitBtn) {
      exitBtn.addEventListener('click', () => {
        if (window.app) window.app.showView('view-arcade-hub');
      });
    }

    // Multiplier Selector Buttons
    const multBtns = document.querySelectorAll('.m2048-mult-pill');
    multBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        multBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.baseMultiplier = parseInt(btn.dataset.mult, 10) || 2;
        this.startNewGame();
      });
    });

    // Undo Button
    const undoBtn = document.getElementById('m2048-undo-btn');
    if (undoBtn) {
      undoBtn.addEventListener('click', () => this.undoMove());
    }

    // Restart Button
    const restartBtn = document.getElementById('m2048-restart-btn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => this.startNewGame());
    }

    // Win Modal Keep Playing (Endless) Button
    const winKeepBtn = document.getElementById('m2048-win-keep-btn');
    if (winKeepBtn) {
      winKeepBtn.addEventListener('click', () => {
        if (this.winModalEl) this.winModalEl.classList.add('hidden');
        this.isEndless = true;
      });
    }

    // Win Modal New Game Button
    const winNewBtn = document.getElementById('m2048-win-new-btn');
    if (winNewBtn) {
      winNewBtn.addEventListener('click', () => {
        if (this.winModalEl) this.winModalEl.classList.add('hidden');
        this.startNewGame();
      });
    }

    // Game Over Retry Button
    const goRetryBtn = document.getElementById('m2048-go-retry-btn');
    if (goRetryBtn) {
      goRetryBtn.addEventListener('click', () => {
        if (this.gameOverModalEl) this.gameOverModalEl.classList.add('hidden');
        this.startNewGame();
      });
    }

    // Keyboard Listener (Arrow Keys + WASD)
    if (typeof window !== 'undefined' && window.addEventListener) {
      window.addEventListener('keydown', (e) => {
        if (this.viewEl && this.viewEl.classList.contains('active') && !this.isGameOver && !this.isAnimating) {
          let moved = false;
          if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
            e.preventDefault();
            moved = this.move('up');
          } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
            e.preventDefault();
            moved = this.move('down');
          } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
            e.preventDefault();
            moved = this.move('left');
          } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
            e.preventDefault();
            moved = this.move('right');
          }
        }
      });
    }

    // Touch Swipe Listeners with 25px threshold & zero lag
    if (this.boardEl) {
      this.boardEl.addEventListener('touchstart', (e) => {
        if (this.isGameOver || this.isAnimating) return;
        const touch = e.touches[0];
        this.touchStartX = touch.clientX;
        this.touchStartY = touch.clientY;
        this.touchStartTime = Date.now();
      }, { passive: false });

      this.boardEl.addEventListener('touchmove', (e) => {
        // Prevent iPad Safari pull-to-refresh & screen scrolling
        e.preventDefault();
      }, { passive: false });

      this.boardEl.addEventListener('touchend', (e) => {
        if (this.isGameOver || this.isAnimating) return;
        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - this.touchStartX;
        const deltaY = touch.clientY - this.touchStartY;
        const deltaTime = Date.now() - this.touchStartTime;

        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);

        if (Math.max(absX, absY) < 25 || deltaTime > 900) return;

        if (absX > absY) {
          if (deltaX > 0) this.move('right');
          else this.move('left');
        } else {
          if (deltaY > 0) this.move('down');
          else this.move('up');
        }
      }, { passive: false });
    }
  }

  startNewGame() {
    this.score = 0;
    this.hasWon = false;
    this.isEndless = false;
    this.isGameOver = false;
    this.isAnimating = false;
    this.moveHistory = [];
    this.tileIdCounter = 1;

    // Clear tile container DOM
    if (this.tilesContainerEl) this.tilesContainerEl.innerHTML = '';
    this.tiles = [];
    this.grid = Array.from({ length: this.gridSize }, () => Array(this.gridSize).fill(null));

    // Load High Score & Highest Tile
    this.loadStats();

    if (this.winModalEl) this.winModalEl.classList.add('hidden');
    if (this.gameOverModalEl) this.gameOverModalEl.classList.add('hidden');

    // Spawn 2 initial tiles
    this.spawnRandomTile(true);
    this.spawnRandomTile(true);

    this.updateHUD();
  }

  getGridValues() {
    return this.grid.map(row => row.map(cell => cell ? cell.value : 0));
  }

  setGridValues(matrix) {
    this.grid = Array.from({ length: this.gridSize }, () => Array(this.gridSize).fill(null));
    this.tiles = [];
    if (this.tilesContainerEl) this.tilesContainerEl.innerHTML = '';
    for (let r = 0; r < this.gridSize; r++) {
      for (let c = 0; c < this.gridSize; c++) {
        const val = matrix[r][c];
        if (val > 0) {
          const tile = {
            id: `tile_${this.tileIdCounter++}`,
            value: val,
            r,
            c,
            element: null
          };
          tile.element = this.createTileElement(tile, false);
          this.grid[r][c] = tile;
          this.tiles.push(tile);
          if (val > this.highestTile) this.highestTile = val;
        }
      }
    }
  }

  getTransformString(c, r) {
    return `translate3d(calc(${c} * (100% + 10px)), calc(${r} * (100% + 10px)), 0)`;
  }

  createTileElement(tile, isAppear = true) {
    if (!this.tilesContainerEl) return null;

    const el = document.createElement('div');
    el.className = 'm2048-tile';
    el.dataset.tileId = tile.id;
    el.textContent = tile.value.toLocaleString();

    // Compute tier relative to base multiplier
    const tier = Math.round(Math.log2(tile.value / this.baseMultiplier)) + 1;
    el.classList.add(`tier-${Math.min(tier, 13)}`);

    // Auto font-size scaling
    const digits = tile.value.toString().length;
    if (digits >= 5) el.classList.add('text-xs');
    else if (digits === 4) el.classList.add('text-sm');
    else if (digits === 3) el.classList.add('text-md');

    // Set GPU transform coordinates
    const posStr = this.getTransformString(tile.c, tile.r);
    el.style.setProperty('--tile-pos', posStr);
    el.style.transform = posStr;

    if (isAppear) {
      el.classList.add('tile-appear');
    }

    this.tilesContainerEl.appendChild(el);
    return el;
  }

  spawnRandomTile(isInitial = false) {
    const emptyCells = [];
    for (let r = 0; r < this.gridSize; r++) {
      for (let c = 0; c < this.gridSize; c++) {
        if (this.grid[r][c] === null) {
          emptyCells.push({ r, c });
        }
      }
    }

    if (emptyCells.length === 0) return false;

    const randCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    // 90% chance base multiplier M, 10% chance 2M
    const val = (Math.random() < 0.9) ? this.baseMultiplier : (this.baseMultiplier * 2);

    const tile = {
      id: `tile_${this.tileIdCounter++}`,
      value: val,
      r: randCell.r,
      c: randCell.c,
      element: null
    };

    tile.element = this.createTileElement(tile, true);
    this.grid[randCell.r][randCell.c] = tile;
    this.tiles.push(tile);

    if (val > this.highestTile) this.highestTile = val;
    return true;
  }

  /**
   * Move and Merge Tiles in specified direction with GPU Transitions
   */
  move(direction) {
    if (this.isGameOver || this.isAnimating) return false;

    // Snapshot board state for Undo before applying move
    const prevState = {
      gridValues: this.grid.map(row => row.map(cell => cell ? cell.value : 0)),
      score: this.score,
      highestTile: this.highestTile
    };

    let moved = false;
    let gainedScore = 0;
    const tilesToDelete = [];
    const newMergedTiles = [];

    // Helper: traverse a line in 2048 order
    const vectors = {
      up: { r: -1, c: 0 },
      down: { r: 1, c: 0 },
      left: { r: 0, c: -1 },
      right: { r: 0, c: 1 }
    };
    const vector = vectors[direction];

    const rIndices = (direction === 'down') ? [3, 2, 1, 0] : [0, 1, 2, 3];
    const cIndices = (direction === 'right') ? [3, 2, 1, 0] : [0, 1, 2, 3];

    // Reset merged flags for this turn
    this.tiles.forEach(t => { t.mergedThisTurn = false; });

    // Iterate through all tiles in movement order
    for (const r of rIndices) {
      for (const c of cIndices) {
        const tile = this.grid[r][c];
        if (!tile) continue;

        let currR = r;
        let currC = c;
        let nextR = r + vector.r;
        let nextC = c + vector.c;

        // Traverse as far as possible in the direction
        while (nextR >= 0 && nextR < this.gridSize && nextC >= 0 && nextC < this.gridSize && this.grid[nextR][nextC] === null) {
          currR = nextR;
          currC = nextC;
          nextR += vector.r;
          nextC += vector.c;
        }

        // Check if there is an adjacent tile to merge with
        if (nextR >= 0 && nextR < this.gridSize && nextC >= 0 && nextC < this.gridSize) {
          const targetTile = this.grid[nextR][nextC];
          if (targetTile && targetTile.value === tile.value && !targetTile.mergedThisTurn) {
            // MERGE OCCURS!
            moved = true;
            const mergedVal = tile.value * 2;
            gainedScore += mergedVal;

            // Update current tile to slide all the way to targetTile position
            this.grid[r][c] = null;
            tile.r = nextR;
            tile.c = nextC;

            // Mark both tiles for deletion after slide transition
            tilesToDelete.push(tile);
            tilesToDelete.push(targetTile);

            // Create new merged tile to appear at (nextR, nextC)
            const mergedTile = {
              id: `tile_${this.tileIdCounter++}`,
              value: mergedVal,
              r: nextR,
              c: nextC,
              mergedThisTurn: true,
              element: null
            };
            newMergedTiles.push(mergedTile);
            this.grid[nextR][nextC] = mergedTile; // Claim cell
            continue;
          }
        }

        // Standard slide without merge
        if (currR !== r || currC !== c) {
          moved = true;
          this.grid[r][c] = null;
          tile.r = currR;
          tile.c = currC;
          this.grid[currR][currC] = tile;
        }
      }
    }

    if (!moved) return false;

    // 1. Lock input during the GPU slide animation
    this.isAnimating = true;

    // 2. Save move to Undo History
    this.moveHistory.push(prevState);
    if (this.moveHistory.length > 3) this.moveHistory.shift();

    this.score += gainedScore;

    // 3. Update GPU Transforms on all sliding tiles (hardware accelerated translate3d)
    this.tiles.forEach(tile => {
      if (tile.element) {
        const posStr = this.getTransformString(tile.c, tile.r);
        tile.element.style.setProperty('--tile-pos', posStr);
        tile.element.style.transform = posStr;
      }
    });

    // Sound feedback
    if (gainedScore > 0 && window.soundEngine) {
      window.soundEngine.playCorrect();
    } else if (window.soundEngine) {
      window.soundEngine.playTap();
    }

    // 4. After Slide Animation (115ms): Clean up merged tiles and spawn new tile
    setTimeout(() => {
      // Remove deleted tile elements from DOM & tiles array
      tilesToDelete.forEach(t => {
        if (t.element && t.element.parentNode) {
          t.element.parentNode.removeChild(t.element);
        }
      });
      this.tiles = this.tiles.filter(t => !tilesToDelete.includes(t));

      // Insert new merged tile elements with Pop Animation
      newMergedTiles.forEach(mt => {
        mt.element = this.createTileElement(mt, false);
        if (mt.element) {
          mt.element.classList.add('tile-merged');
        }
        this.tiles.push(mt);
        if (mt.value > this.highestTile) this.highestTile = mt.value;
      });

      // Spawn new random tile with Appear Animation
      this.spawnRandomTile(false);

      // Update HUD and High Scores
      this.updateHUD();
      this.saveStats();

      // Check Win Condition (11th tier tile = 1024 * M)
      const goalTile = 1024 * this.baseMultiplier;
      if (!this.hasWon && !this.isEndless && this.highestTile >= goalTile) {
        this.handleWin();
      } else if (this.checkGameOver()) {
        this.handleGameOver();
      }

      this.isAnimating = false;
    }, 115);

    return true;
  }

  checkGameOver() {
    // 1. Any empty cells?
    for (let r = 0; r < this.gridSize; r++) {
      for (let c = 0; c < this.gridSize; c++) {
        if (this.grid[r][c] === null) return false;
      }
    }

    // 2. Any adjacent matching values horizontally?
    for (let r = 0; r < this.gridSize; r++) {
      for (let c = 0; c < this.gridSize - 1; c++) {
        if (this.grid[r][c] && this.grid[r][c + 1] && this.grid[r][c].value === this.grid[r][c + 1].value) {
          return false;
        }
      }
    }

    // 3. Any adjacent matching values vertically?
    for (let c = 0; c < this.gridSize; c++) {
      for (let r = 0; r < this.gridSize - 1; r++) {
        if (this.grid[r][c] && this.grid[r + 1][c] && this.grid[r][c].value === this.grid[r + 1][c].value) {
          return false;
        }
      }
    }

    return true;
  }

  handleWin() {
    this.hasWon = true;
    const totalAura = 100;
    const totalXP = 150;

    try {
      if (window.gameState) {
        window.gameState.addAura(totalAura);
        window.gameState.addXP(totalXP);
        window.gameState.addGems(3);
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
          window.helpers.spawnAuraFloatingText(`+${totalAura} AURA! 🌟 ${1024 * this.baseMultiplier} TILE REACHED!`);
        }
      }
    } catch (e) {
      console.warn("Win reward error:", e);
    }

    const winTitle = document.getElementById('m2048-win-title');
    const winTile = document.getElementById('m2048-win-tile-num');
    const winScore = document.getElementById('m2048-win-score');
    const winAura = document.getElementById('m2048-win-aura');

    if (winTitle) winTitle.textContent = `🎯 ${this.baseMultiplier}× TABLE MATRIX CONQUERED!`;
    if (winTile) winTile.textContent = (1024 * this.baseMultiplier).toLocaleString();
    if (winScore) winScore.textContent = `🏆 Final Score: ${this.score.toLocaleString()}`;
    if (winAura) winAura.textContent = `+${totalAura} AURA • +${totalXP} XP • +3 💎`;

    if (this.winModalEl) {
      this.winModalEl.classList.remove('hidden');
    }
  }

  handleGameOver() {
    this.isGameOver = true;
    if (window.soundEngine) window.soundEngine.playWrong();

    const goTile = document.getElementById('m2048-go-max-tile');
    const goScore = document.getElementById('m2048-go-score');

    if (goTile) goTile.textContent = this.highestTile.toLocaleString();
    if (goScore) goScore.textContent = this.score.toLocaleString();

    if (this.gameOverModalEl) {
      this.gameOverModalEl.classList.remove('hidden');
    }
  }

  undoMove() {
    if (this.moveHistory.length === 0 || this.isAnimating) {
      if (window.helpers) window.helpers.spawnAuraFloatingText("No moves to undo!", undefined, undefined, true);
      return;
    }

    const prev = this.moveHistory.pop();
    this.score = prev.score;
    this.highestTile = prev.highestTile;
    this.isGameOver = false;

    if (this.gameOverModalEl) this.gameOverModalEl.classList.add('hidden');
    if (window.soundEngine) window.soundEngine.playTap();

    // Rebuild grid & DOM elements from previous values snapshot
    if (this.tilesContainerEl) this.tilesContainerEl.innerHTML = '';
    this.tiles = [];
    this.grid = Array.from({ length: this.gridSize }, () => Array(this.gridSize).fill(null));

    for (let r = 0; r < this.gridSize; r++) {
      for (let c = 0; c < this.gridSize; c++) {
        const val = prev.gridValues[r][c];
        if (val > 0) {
          const tile = {
            id: `tile_${this.tileIdCounter++}`,
            value: val,
            r,
            c,
            element: null
          };
          tile.element = this.createTileElement(tile, false);
          this.grid[r][c] = tile;
          this.tiles.push(tile);
        }
      }
    }

    this.updateHUD();
  }

  updateHUD() {
    if (this.scoreEl) this.scoreEl.textContent = this.score.toLocaleString();
    if (this.bestScoreEl) this.bestScoreEl.textContent = Math.max(this.score, this.bestScore).toLocaleString();
    if (this.targetTileGoalEl) this.targetTileGoalEl.textContent = (1024 * this.baseMultiplier).toLocaleString();
  }

  loadStats() {
    try {
      const key = `m2048_stats_table_${this.baseMultiplier}`;
      const saved = JSON.parse(localStorage.getItem(key) || '{}');
      this.bestScore = saved.bestScore || 0;
      this.highestTile = saved.highestTile || 0;
    } catch (e) {
      this.bestScore = 0;
      this.highestTile = 0;
    }
  }

  saveStats() {
    try {
      const key = `m2048_stats_table_${this.baseMultiplier}`;
      const currentBest = Math.max(this.score, this.bestScore);
      this.bestScore = currentBest;
      localStorage.setItem(key, JSON.stringify({
        bestScore: this.bestScore,
        highestTile: this.highestTile
      }));
    } catch (e) {
      console.warn("Could not save 2048 stats:", e);
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Multiplier2048Engine };
}

if (typeof window !== 'undefined') {
  window.Multiplier2048Engine = Multiplier2048Engine;
}
