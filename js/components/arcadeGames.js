/**
 * Retro Math Arcade Games Hub & Engine
 * Playable arcade mini-games connected directly to adaptive 4th-grade+ math fluency.
 */

class ArcadeHub {
  constructor() {
    this.canvas = document.getElementById('arcade-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.currentGame = null;
    this.gameLoopId = null;
    this.currentGameType = null;
    this.isPracticeMode = false;

    // HUD Elements
    this.promptEl = document.getElementById('arcade-math-prompt');
    this.focusPromptEl = document.getElementById('arcade-focus-prompt');
    this.scoreEl = document.getElementById('arcade-score-val');
    this.comboTag = document.getElementById('arcade-combo-tag');
    this.levelEl = document.getElementById('arcade-level-badge');
    this.touchControlsBar = document.getElementById('arcade-touch-controls-bar');

    // Category Tabs & Practice Mode Toggle
    this.currentCategory = 'all';

    this.bindEvents();
    this.updateCardStats();
  }

  setPrompt(text) {
    if (this.promptEl) this.promptEl.textContent = text;
    if (this.focusPromptEl) this.focusPromptEl.textContent = text;
  }

  setLevel(text) {
    if (this.levelEl) this.levelEl.textContent = text;
  }

  bindEvents() {
    // Quick Arcade Hub button in top navbar
    const arcadeBtn = document.getElementById('quick-arcade-btn');
    if (arcadeBtn) {
      arcadeBtn.addEventListener('click', () => {
        window.app.showView('view-arcade-hub');
        this.updateCardStats();
      });
    }

    document.getElementById('exit-arcade-btn').addEventListener('click', () => {
      this.stopCurrentGame();
      window.app.showView('view-arcade-hub');
      this.updateCardStats();
    });

    // Category Filter Tabs
    const catBtns = document.querySelectorAll('.arcade-cat-btn');
    catBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.filterCategory(btn.dataset.cat);
      });
    });

    // Practice Mode Toggle
    const practiceToggle = document.getElementById('arcade-practice-mode-toggle');
    if (practiceToggle) {
      practiceToggle.addEventListener('change', (e) => {
        this.isPracticeMode = e.target.checked;
        if (window.soundEngine) window.soundEngine.playTap();
        if (window.helpers) {
          window.helpers.spawnAuraFloatingText(
            this.isPracticeMode ? "🛡️ Practice Mode (Untimed)" : "⚡ Arcade Mode (Ranked)",
            undefined, undefined, true
          );
        }
      });
    }

    // Arcade Game Card Clicks
    const cards = document.querySelectorAll('.arcade-game-card:not(.coming-soon)');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const gameType = card.dataset.game;
        this.launchGame(gameType);
      });
    });

    // Touch Controls
    const bindTouch = (id, key) => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener('touchstart', (e) => {
          e.preventDefault();
          this.handleInput(key);
        });
        btn.addEventListener('mousedown', () => this.handleInput(key));
      }
    };

    bindTouch('touch-up', 'ArrowUp');
    bindTouch('touch-down', 'ArrowDown');
    bindTouch('touch-left', 'ArrowLeft');
    bindTouch('touch-right', 'ArrowRight');
    bindTouch('touch-action', 'Space');

    window.addEventListener('keydown', (e) => {
      if (document.getElementById('view-arcade-arena').classList.contains('active')) {
        this.handleInput(e.code);
      }
    });

    // Canvas Pointer Event Handling for Swipe / Tap Games (Ninja, Pizza, Geometry, Number Line)
    if (this.canvas) {
      const handlePointer = (e, type) => {
        if (this.currentGame && this.currentGame.handlePointer) {
          const rect = this.canvas.getBoundingClientRect();
          const scaleX = this.canvas.width / rect.width;
          const scaleY = this.canvas.height / rect.height;
          const clientX = e.touches ? e.touches[0].clientX : e.clientX;
          const clientY = e.touches ? e.touches[0].clientY : e.clientY;
          const x = (clientX - rect.left) * scaleX;
          const y = (clientY - rect.top) * scaleY;
          this.currentGame.handlePointer(x, y, type);
        }
      };

      this.canvas.addEventListener('mousedown', (e) => handlePointer(e, 'down'));
      this.canvas.addEventListener('mousemove', (e) => handlePointer(e, 'move'));
      this.canvas.addEventListener('mouseup', (e) => handlePointer(e, 'up'));

      this.canvas.addEventListener('touchstart', (e) => { e.preventDefault(); handlePointer(e, 'down'); });
      this.canvas.addEventListener('touchmove', (e) => { e.preventDefault(); handlePointer(e, 'move'); });
      this.canvas.addEventListener('touchend', (e) => { e.preventDefault(); handlePointer(e, 'up'); });
    }

    // Results Modal Action Handlers
    document.getElementById('summary-exit-btn').addEventListener('click', () => {
      document.getElementById('arcade-results-modal').classList.add('hidden');
      window.app.showView('view-arcade-hub');
      this.updateCardStats();
    });

    document.getElementById('summary-replay-btn').addEventListener('click', () => {
      document.getElementById('arcade-results-modal').classList.add('hidden');
      if (this.currentGameType) {
        this.launchGame(this.currentGameType);
      }
    });
  }

  filterCategory(cat) {
    this.currentCategory = cat;
    const cards = document.querySelectorAll('.arcade-game-card');
    cards.forEach(card => {
      const cardCats = (card.dataset.cat || '').toLowerCase().split(/\s+/);
      if (cat === 'all' || cardCats.includes(cat.toLowerCase())) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  updateCardStats() {
    const stats = window.gameState.data.arcadeStats || {};
    for (let gameId in stats) {
      const el = document.getElementById(`stats-card-${gameId}`);
      if (el) {
        const s = stats[gameId];
        el.textContent = `Best: ${s.highScore.toLocaleString()} • Acc: ${s.highAccuracy}%`;
      }
    }
  }

  handleInput(code) {
    if (this.currentGame && this.currentGame.handleInput) {
      this.currentGame.handleInput(code);
    }
  }

  launchGame(gameType) {
    this.currentGameType = gameType;
    if (window.app) window.app.showView('view-arcade-arena');
    this.stopCurrentGame();

    this.canvas.width = 600;
    this.canvas.height = 420;
    this.scoreEl.textContent = '0';
    this.comboTag.textContent = '1x COMBO';

    if (gameType === 'snake') {
      this.currentGame = new SnakeMathGame(this);
    } else if (gameType === 'asteroids') {
      this.currentGame = new AsteroidBlasterGame(this);
    } else if (gameType === 'pizza') {
      this.currentGame = new PizzaFractionRushGame(this);
    } else if (gameType === 'ninja') {
      this.currentGame = new MathNinjaGame(this);
    } else if (gameType === 'racer') {
      this.currentGame = new DecimalRacerGame(this);
    } else if (gameType === 'frogger') {
      this.currentGame = new FroggerMathGame(this);
    } else if (gameType === 'geometry_builder') {
      this.currentGame = new GeometryBuilderGame(this);
    } else if (gameType === 'number_line') {
      this.currentGame = new NumberLineJumperGame(this);
    } else if (gameType === 'treasure_mine') {
      this.currentGame = new TreasureMineGame(this);
    } else if (gameType === 'flappy') {
      this.currentGame = new FlappyMathGame(this);
    } else if (gameType === 'escape') {
      this.currentGame = new EquationEscapeRoomGame(this);
    } else if (gameType === 'defense') {
      this.currentGame = new MathDefenseGame(this);
    } else if (gameType === 'potion') {
      this.currentGame = new PotionLabGame(this);
    } else if (gameType === 'kart') {
      this.currentGame = new MathKartGame(this);
    } else if (gameType === 'coordinates') {
      this.currentGame = new SpaceCoordinatesGame(this);
    } else if (gameType === 'detective') {
      this.currentGame = new MathDetectiveGame(this);
    } else if (gameType === 'jigsaw') {
      this.currentGame = new MathGridJigsawGame(this);
    } else if (gameType === 'code_breaker') {
      this.currentGame = new CodeBreakerGame(this);
    } else if (gameType === 'angle_cannon') {
      this.currentGame = new AngleCannonGame(this);
    } else if (gameType === 'rover_rescue') {
      this.currentGame = new RoverRescueGame(this);
    }

    if (this.currentGame) {
      this.currentGame.start();
      this.loop();
    }
  }

  loop() {
    if (!this.currentGame) return;
    this.currentGame.update();
    this.currentGame.render(this.ctx);
    this.gameLoopId = requestAnimationFrame(() => this.loop());
  }

  stopCurrentGame() {
    if (this.gameLoopId) {
      cancelAnimationFrame(this.gameLoopId);
      this.gameLoopId = null;
    }
    if (this.currentGame && this.currentGame.destroy) {
      this.currentGame.destroy();
    }
    this.currentGame = null;
  }

  showGameSummary(report) {
    this.stopCurrentGame();

    // Strict accuracy calculation (never hardcoded)
    const totalAnswers = report.correct + report.incorrect;
    const computedAccuracy = totalAnswers > 0 
      ? Math.round((report.correct / totalAnswers) * 100) 
      : (report.accuracy !== undefined ? report.accuracy : 0);

    report.accuracy = computedAccuracy;

    // Calculate XP and Gems
    const xpEarned = Math.floor(report.score / 5) + (report.correct * 15);
    const gemsEarned = Math.floor(report.score / 60) + Math.floor(report.accuracy / 10);
    const auraEarned = report.score;

    window.gameState.addXP(xpEarned);
    window.gameState.addGems(gemsEarned);
    window.gameState.addAura(auraEarned);

    // Update Arcade Stats in GameState
    if (!window.gameState.data.arcadeStats) {
      window.gameState.data.arcadeStats = {};
    }

    const prev = window.gameState.data.arcadeStats[this.currentGameType] || { highScore: 0, highAccuracy: 0, gamesPlayed: 0 };
    const isNewHigh = report.score > prev.highScore;

    window.gameState.data.arcadeStats[this.currentGameType] = {
      highScore: Math.max(prev.highScore, report.score),
      highAccuracy: Math.max(prev.highAccuracy, report.accuracy),
      gamesPlayed: prev.gamesPlayed + 1,
      lastPlayed: Date.now()
    };
    window.gameState.save();

    // Populate Results Modal
    document.getElementById('summary-game-name').textContent = report.gameName;
    document.getElementById('summary-score-val').textContent = report.score.toLocaleString();
    document.getElementById('summary-accuracy-val').textContent = `${report.accuracy}%`;
    document.getElementById('summary-correct-wrong-val').textContent = `${report.correct} / ${report.incorrect}`;
    document.getElementById('summary-streak-val').textContent = `🔥 ${report.longestStreak} In A Row`;

    document.getElementById('summary-xp-val').textContent = `+${xpEarned} XP`;
    document.getElementById('summary-gems-val').textContent = `+${gemsEarned} Gems`;
    document.getElementById('summary-aura-val').textContent = `+${auraEarned.toLocaleString()} Aura`;

    const mistakeBox = document.getElementById('summary-mistake-box');
    const mistakeText = document.getElementById('summary-mistake-text');

    if (report.missedSkills && report.missedSkills.length > 0) {
      mistakeBox.style.display = 'block';
      mistakeText.textContent = `Keep practicing: ${report.missedSkills.join(', ')}`;
    } else {
      mistakeBox.style.display = 'none';
    }

    if (isNewHigh && report.score > 0) {
      document.getElementById('summary-badge').textContent = '🏆 NEW PERSONAL RECORD!';
      if (window.soundEngine) window.soundEngine.playLevelUp();
      if (window.helpers) window.helpers.spawnConfetti(90);
    } else {
      document.getElementById('summary-badge').textContent = 'MATCH COMPLETE';
    }

    document.getElementById('arcade-results-modal').classList.remove('hidden');
  }
}

// ==========================================================================
// 1. GAME 1: MATH SNAKE (Multiplication, Factors, Golden Apple, Combos)
// ==========================================================================
class SnakeMathGame {
  constructor(hub) {
    this.hub = hub;
    this.gridSize = 20;
    this.snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
    this.foods = [];
    this.currentQ = null;
    this.lastTick = 0;
    this.tickRate = 120;
    this.score = 0;
    this.combo = 1;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.longestStreak = 0;
    this.currentStreak = 0;
    this.missedFacts = [];
    this.isGolden = false;
  }

  start() {
    this.generateQuestion();
  }

  generateQuestion() {
    // 5-streak triggers Golden Apple!
    this.isGolden = (this.currentStreak > 0 && this.currentStreak % 5 === 0);

    const a = Math.floor(Math.random() * 11) + 2; // 2 to 12
    const b = Math.floor(Math.random() * 11) + 2;
    const ans = a * b;
    this.currentQ = { a, b, ans, skillKey: `${a}×${b}` };

    this.hub.setPrompt(this.isGolden 
      ? `🌟 GOLDEN BONUS: ${a} × ${b} = ?`
      : `🐍 EAT: ${a} × ${b} = ?`);

    this.foods = [];
    const usedVals = new Set([ans]);

    // Spawn Correct Target
    this.foods.push({
      x: Math.floor(Math.random() * 24) + 3,
      y: Math.floor(Math.random() * 16) + 3,
      val: ans,
      isCorrect: true,
      isGolden: this.isGolden
    });

    // Spawn 2-3 Distinct Distractors
    const offsets = [-12, -8, -6, -4, -2, 2, 4, 6, 8, 12];
    offsets.sort(() => Math.random() - 0.5);

    for (let off of offsets) {
      if (this.foods.length >= 3) break;
      const wrong = ans + off;
      if (wrong > 0 && !usedVals.has(wrong)) {
        usedVals.add(wrong);
        this.foods.push({
          x: Math.floor(Math.random() * 24) + 3,
          y: Math.floor(Math.random() * 16) + 3,
          val: wrong,
          isCorrect: false,
          isGolden: false
        });
      }
    }
  }

  handleInput(code) {
    if ((code === 'ArrowUp' || code === 'KeyW') && this.direction.y === 0) {
      this.nextDirection = { x: 0, y: -1 };
    } else if ((code === 'ArrowDown' || code === 'KeyS') && this.direction.y === 0) {
      this.nextDirection = { x: 0, y: 1 };
    } else if ((code === 'ArrowLeft' || code === 'KeyA') && this.direction.x === 0) {
      this.nextDirection = { x: -1, y: 0 };
    } else if ((code === 'ArrowRight' || code === 'KeyD') && this.direction.x === 0) {
      this.nextDirection = { x: 1, y: 0 };
    }
  }

  handlePointer(x, y, type) {
    if (type === 'down') {
      this.touchStartX = x;
      this.touchStartY = y;
    } else if (type === 'up' || type === 'move') {
      if (this.touchStartX !== undefined && this.touchStartY !== undefined) {
        const dx = x - this.touchStartX;
        const dy = y - this.touchStartY;
        const dist = Math.hypot(dx, dy);

        // If swipe gesture detected (moved > 15px)
        if (dist > 15) {
          if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0 && this.direction.x === 0) this.nextDirection = { x: 1, y: 0 };
            else if (dx < 0 && this.direction.x === 0) this.nextDirection = { x: -1, y: 0 };
          } else {
            if (dy > 0 && this.direction.y === 0) this.nextDirection = { x: 0, y: 1 };
            else if (dy < 0 && this.direction.y === 0) this.nextDirection = { x: 0, y: -1 };
          }
          if (type === 'up') {
            this.touchStartX = undefined;
            this.touchStartY = undefined;
          }
          return;
        }
      }

      // If simple tap on canvas relative to snake head
      if (type === 'up' && this.snake && this.snake[0]) {
        const headScreenX = this.snake[0].x * this.gridSize;
        const headScreenY = this.snake[0].y * this.gridSize;
        const dx = x - headScreenX;
        const dy = y - headScreenY;

        if (Math.abs(dx) > Math.abs(dy)) {
          if (dx > 0 && this.direction.x === 0) this.nextDirection = { x: 1, y: 0 };
          else if (dx < 0 && this.direction.x === 0) this.nextDirection = { x: -1, y: 0 };
        } else {
          if (dy > 0 && this.direction.y === 0) this.nextDirection = { x: 0, y: 1 };
          else if (dy < 0 && this.direction.y === 0) this.nextDirection = { x: 0, y: -1 };
        }

        this.touchStartX = undefined;
        this.touchStartY = undefined;
      }
    }
  }

  update() {
    const now = performance.now();
    if (now - this.lastTick < this.tickRate) return;
    this.lastTick = now;

    this.direction = this.nextDirection;
    const head = { x: this.snake[0].x + this.direction.x, y: this.snake[0].y + this.direction.y };

    // Wall collision
    const maxX = Math.floor(this.hub.canvas.width / this.gridSize);
    const maxY = Math.floor(this.hub.canvas.height / this.gridSize);

    if (head.x < 0 || head.x >= maxX || head.y < 0 || head.y >= maxY) {
      if (this.hub.isPracticeMode) {
        // Wrap around in practice mode
        if (head.x < 0) head.x = maxX - 1;
        if (head.x >= maxX) head.x = 0;
        if (head.y < 0) head.y = maxY - 1;
        if (head.y >= maxY) head.y = 0;
      } else {
        // Normal snake death -> End game
        this.endGame();
        return;
      }
    }

    this.snake.unshift(head);

    let ate = false;
    this.foods.forEach(f => {
      if (Math.abs(f.x - head.x) <= 1 && Math.abs(f.y - head.y) <= 1) {
        ate = true;
        if (f.isCorrect) {
          this.correctCount++;
          this.currentStreak++;
          this.longestStreak = Math.max(this.longestStreak, this.currentStreak);
          this.combo = Math.min(5, 1 + Math.floor(this.currentStreak / 3));

          const pts = (f.isGolden ? 300 : 100) * this.combo;
          this.score += pts;
          this.hub.scoreEl.textContent = this.score;
          this.hub.comboTag.textContent = `${this.combo}x COMBO`;

          if (window.soundEngine) {
            if (this.combo >= 3) window.soundEngine.playCombo();
            else window.soundEngine.playCorrect();
          }

          if (window.helpers) {
            window.helpers.spawnAuraFloatingText(`+${pts} Aura! 🔥`, undefined, undefined, true);
          }

          window.adaptiveEngine.recordAttempt(this.currentQ.skillKey, true, false, 1500);
          this.generateQuestion();
        } else {
          this.incorrectCount++;
          this.currentStreak = 0;
          this.combo = 1;
          this.hub.comboTag.textContent = '1x COMBO';
          this.missedFacts.push(`${this.currentQ.a} × ${this.currentQ.b}`);

          if (window.soundEngine) window.soundEngine.playWrong();
          if (window.helpers) {
            window.helpers.spawnAuraFloatingText(`Oops! ${f.val} is wrong!`, undefined, undefined, false);
          }

          window.adaptiveEngine.recordAttempt(this.currentQ.skillKey, false, false, 2000);
          this.generateQuestion();
        }
      }
    });

    if (!ate) {
      this.snake.pop();
    }
  }

  render(ctx) {
    ctx.fillStyle = '#080317';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Subtle grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    for (let x = 0; x < ctx.canvas.width; x += this.gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, ctx.canvas.height);
      ctx.stroke();
    }

    // Draw Foods (Uniform styling)
    this.foods.forEach(f => {
      ctx.fillStyle = f.isGolden ? '#ffd500' : '#f59e0b';
      ctx.beginPath();
      ctx.arc(f.x * this.gridSize + 10, f.y * this.gridSize + 10, 16, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = f.isGolden ? '#ffffff' : '#fde68a';
      ctx.lineWidth = f.isGolden ? 3 : 2;
      ctx.stroke();

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 13px "Space Grotesk"';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(f.val, f.x * this.gridSize + 10, f.y * this.gridSize + 10);
    });

    // Draw Snake
    this.snake.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? '#38bdf8' : '#0284c7';
      ctx.fillRect(seg.x * this.gridSize + 1, seg.y * this.gridSize + 1, this.gridSize - 2, this.gridSize - 2);
    });
  }

  endGame() {
    const total = this.correctCount + this.incorrectCount;
    const acc = total > 0 ? Math.round((this.correctCount / total) * 100) : 0;

    this.hub.showGameSummary({
      gameName: "Math Snake",
      score: this.score,
      accuracy: acc,
      correct: this.correctCount,
      incorrect: this.incorrectCount,
      longestStreak: this.longestStreak,
      missedSkills: Array.from(new Set(this.missedFacts))
    });
  }
}

// ==========================================================================
// 2. GAME 2: ASTEROID BLASTER (Power-ups, Shields, Lasers, Boss Asteroid)
// ==========================================================================
class AsteroidBlasterGame {
  constructor(hub) {
    this.hub = hub;
    this.ship = { x: 300, y: 370 };
    this.lasers = [];
    this.asteroids = [];
    this.currentQ = null;
    this.score = 0;
    this.combo = 1;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.longestStreak = 0;
    this.currentStreak = 0;
    this.shieldActive = false;
    this.twinLasers = false;
    this.missedFacts = [];
    this.bossHP = 0;
  }

  start() {
    this.generateQuestion();
  }

  generateQuestion() {
    const a = Math.floor(Math.random() * 9) + 2;
    const b = Math.floor(Math.random() * 9) + 2;
    const ans = a * b;
    this.currentQ = { prompt: `${ans} ÷ ${a} = ?`, ans: b, skillKey: `${ans}÷${a}` };
    this.hub.setPrompt(`🚀 BLAST: ${this.currentQ.prompt}`);

    const dist1 = b + (Math.random() > 0.5 ? 2 : -1);
    const dist2 = b + (Math.random() > 0.5 ? 3 : -2);

    const options = [
      { val: b, isCorrect: true },
      { val: Math.max(1, dist1), isCorrect: false },
      { val: Math.max(1, dist2), isCorrect: false }
    ].sort(() => Math.random() - 0.5);

    const laneConfigs = [
      { x: 120, y: 15 + Math.random() * 15, vy: 0.60 + Math.random() * 0.15 },
      { x: 300, y: -20 + Math.random() * 15, vy: 0.55 + Math.random() * 0.15 },
      { x: 480, y: 0 + Math.random() * 15, vy: 0.65 + Math.random() * 0.15 }
    ].sort(() => Math.random() - 0.5);

    this.asteroids = options.map((opt, idx) => ({
      x: laneConfigs[idx].x,
      y: laneConfigs[idx].y,
      vy: laneConfigs[idx].vy,
      val: opt.val,
      isCorrect: opt.isCorrect,
      r: 28
    }));
  }

  handleInput(code) {
    if (code === 'ArrowLeft' || code === 'KeyA') {
      this.ship.x = Math.max(40, this.ship.x - 30);
    } else if (code === 'ArrowRight' || code === 'KeyD') {
      this.ship.x = Math.min(560, this.ship.x + 30);
    } else if (code === 'Space' || code === 'ArrowUp') {
      if (this.twinLasers) {
        this.lasers.push({ x: this.ship.x - 12, y: this.ship.y - 20, vy: -8 });
        this.lasers.push({ x: this.ship.x + 12, y: this.ship.y - 20, vy: -8 });
      } else {
        this.lasers.push({ x: this.ship.x, y: this.ship.y - 20, vy: -8 });
      }
      if (window.soundEngine) window.soundEngine.playTap();
    }
  }

  update() {
    for (let i = this.lasers.length - 1; i >= 0; i--) {
      const l = this.lasers[i];
      l.y += l.vy;
      if (l.y < 0) this.lasers.splice(i, 1);
    }

    this.asteroids.forEach(ast => {
      ast.y += ast.vy;
      if (ast.y > 440) ast.y = -30;
    });

    // Check Hits
    for (let i = this.lasers.length - 1; i >= 0; i--) {
      const l = this.lasers[i];
      this.asteroids.forEach(ast => {
        const dist = Math.hypot(l.x - ast.x, l.y - ast.y);
        if (dist < ast.r) {
          this.lasers.splice(i, 1);
          if (ast.isCorrect) {
            this.correctCount++;
            this.currentStreak++;
            this.longestStreak = Math.max(this.longestStreak, this.currentStreak);
            this.combo = Math.min(5, 1 + Math.floor(this.currentStreak / 3));

            if (this.currentStreak >= 5) this.twinLasers = true;

            const pts = 150 * this.combo;
            this.score += pts;
            this.hub.scoreEl.textContent = this.score;
            this.hub.comboTag.textContent = `${this.combo}x COMBO`;

            if (window.soundEngine) window.soundEngine.playBossHit();
            if (window.helpers) window.helpers.spawnAuraFloatingText(`+${pts} Aura! 💥`, undefined, undefined, true);

            window.adaptiveEngine.recordAttempt(this.currentQ.skillKey, true, false, 1500);
            this.generateQuestion();
          } else {
            this.incorrectCount++;
            this.currentStreak = 0;
            this.combo = 1;
            this.twinLasers = false;
            this.hub.comboTag.textContent = '1x COMBO';
            this.missedFacts.push(this.currentQ.prompt);

            if (window.soundEngine) window.soundEngine.playWrong();
            ast.y = -50;
            window.adaptiveEngine.recordAttempt(this.currentQ.skillKey, false, false, 2500);
          }
        }
      });
    }

    // End condition after 10 questions
    if (this.correctCount + this.incorrectCount >= 10 && !this.hub.isPracticeMode) {
      this.endGame();
    }
  }

  render(ctx) {
    ctx.fillStyle = '#050212';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Space stars
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 20; i++) {
      ctx.fillRect((i * 47) % 600, (i * 31 + Date.now() * 0.05) % 420, 2, 2);
    }

    // Asteroids
    this.asteroids.forEach(ast => {
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.arc(ast.x, ast.y, ast.r, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 16px "Space Grotesk"';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(ast.val, ast.x, ast.y);
    });

    // Lasers
    ctx.fillStyle = this.twinLasers ? '#00f0ff' : '#ff007f';
    this.lasers.forEach(l => {
      ctx.fillRect(l.x - 3, l.y, 6, 16);
    });

    // Starship
    ctx.font = '36px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🚀', this.ship.x, this.ship.y);
  }

  endGame() {
    const total = this.correctCount + this.incorrectCount;
    const acc = total > 0 ? Math.round((this.correctCount / total) * 100) : 0;

    this.hub.showGameSummary({
      gameName: "Asteroid Blaster",
      score: this.score,
      accuracy: acc,
      correct: this.correctCount,
      incorrect: this.incorrectCount,
      longestStreak: this.longestStreak,
      missedSkills: Array.from(new Set(this.missedFacts))
    });
  }
}

// ==========================================================================
// 3. GAME 3: PIZZA FRACTION RUSH (Pizzeria Fraction Slices & Rush Hour)
// ==========================================================================
class PizzaFractionRushGame {
  constructor(hub) {
    this.hub = hub;
    this.day = 1;
    this.maxDays = 3;
    this.orderNum = 0;
    this.ordersPerDay = 4;
    this.currentOrder = null;
    this.totalSlices = 8;
    this.toppedSlices = new Set();
    this.score = 0;
    this.combo = 1;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.longestStreak = 0;
    this.currentStreak = 0;
    this.missedFractions = [];
  }

  start() {
    this.day = 1;
    this.orderNum = 0;
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.currentStreak = 0;
    this.hub.setLevel(`DAY ${this.day} (ORDER 1/${this.ordersPerDay})`);
    this.generateOrder();
  }

  generateOrder() {
    this.orderNum++;
    this.toppedSlices.clear();

    const day1Pool = [
      { req: 4, text: "Customer Order: Make me 1/2 of a Pepperoni Pizza! 🍕" },
      { req: 2, text: "Customer Order: Make me 1/4 of a Pepperoni Pizza! 🍕" },
      { req: 6, text: "Customer Order: Make me 3/4 of a Pepperoni Pizza! 🍕" },
      { req: 8, text: "Customer Order: Make me 1 Whole Pepperoni Pizza! 🍕" }
    ];

    const day2Pool = [
      { req: 3, text: "Customer Order: Top exactly 3/8 of the pizza! 🍕" },
      { req: 5, text: "Customer Order: Top exactly 5/8 of the pizza! 🍕" },
      { req: 4, text: "Customer Order: Top exactly 2/4 of the pizza! 🍕" },
      { req: 7, text: "Customer Order: Top exactly 7/8 of the pizza! 🍕" },
      { req: 1, text: "Customer Order: Top exactly 1/8 of the pizza! 🍕" }
    ];

    const day3Pool = [
      { req: 6, text: "⚡ RUSH HOUR: Chef needs 3/4 of a Pepperoni Pizza! 🍕" },
      { req: 2, text: "⚡ RUSH HOUR: Chef needs 1/4 of a Pepperoni Pizza! 🍕" },
      { req: 5, text: "⚡ RUSH HOUR: Chef needs 5/8 of a Pepperoni Pizza! 🍕" },
      { req: 4, text: "⚡ RUSH HOUR: Chef needs 2/4 of a Pepperoni Pizza! 🍕" },
      { req: 6, text: "⚡ RUSH HOUR: Chef needs 6/8 of a Pepperoni Pizza! 🍕" },
      { req: 4, text: "⚡ RUSH HOUR: Chef needs 1/2 of a Pepperoni Pizza! 🍕" }
    ];

    let pool = day1Pool;
    if (this.day === 2) pool = day2Pool;
    if (this.day === 3) pool = day3Pool;

    const order = pool[Math.floor(Math.random() * pool.length)];
    this.currentOrder = order;

    this.hub.setLevel(`DAY ${this.day} (ORDER ${this.orderNum}/${this.ordersPerDay})`);
    this.hub.setPrompt(`🧑‍🍳 [DAY ${this.day}]: ${this.currentOrder.text}`);
  }

  handlePointer(x, y, type) {
    if (type !== 'down') return;
    const centerX = 300;
    const centerY = 210;
    const radius = 130;

    const dx = x - centerX;
    const dy = y - centerY;
    const dist = Math.hypot(dx, dy);

    // Click inside the pizza
    if (dist <= radius) {
      let angle = Math.atan2(dy, dx);
      if (angle < 0) angle += Math.PI * 2;
      const sliceAngle = (Math.PI * 2) / this.totalSlices;
      const sliceIdx = Math.floor(angle / sliceAngle);

      if (this.toppedSlices.has(sliceIdx)) {
        this.toppedSlices.delete(sliceIdx);
      } else {
        this.toppedSlices.add(sliceIdx);
      }

      if (window.soundEngine) window.soundEngine.playTap();
    }

    // Click Bake / Serve Button (Bottom Area)
    if (x >= 190 && x <= 410 && y >= 360 && y <= 405) {
      this.servePizza();
    }
  }

  servePizza() {
    const current = this.toppedSlices.size;
    const isCorrect = current === this.currentOrder.req;

    if (isCorrect) {
      this.correctCount++;
      this.currentStreak++;
      this.longestStreak = Math.max(this.longestStreak, this.currentStreak);
      this.combo = Math.min(6, 1 + Math.floor(this.currentStreak / 2));

      const pts = 200 * this.combo;
      this.score += pts;
      this.hub.scoreEl.textContent = this.score;
      this.hub.comboTag.textContent = `${this.combo}x COMBO`;

      if (window.soundEngine) window.soundEngine.playLevelUp();
      if (window.helpers) {
        window.helpers.spawnConfetti(60);
        window.helpers.spawnAuraFloatingText(`DELICIOUS! ${current}/8 Served! +${pts} Aura 🍕✨`, undefined, undefined, true);
      }

      if (this.orderNum >= this.ordersPerDay) {
        // Day complete
        this.day++;
        this.orderNum = 0;
        this.score += 400;

        if (window.helpers) {
          window.helpers.spawnConfetti(90);
          window.helpers.spawnAuraFloatingText(`🎉 DAY ${this.day - 1} SHIFT COMPLETED! +400 Bonus Aura`, undefined, undefined, true);
        }

        if (this.day <= this.maxDays) {
          this.generateOrder();
        } else {
          this.endGame();
        }
      } else {
        this.generateOrder();
      }
    } else {
      this.incorrectCount++;
      this.currentStreak = 0;
      this.combo = 1;
      this.hub.comboTag.textContent = '1x COMBO';
      this.missedFractions.push(this.currentOrder.text);

      if (window.soundEngine) window.soundEngine.playWrong();
      if (window.helpers) window.helpers.spawnAuraFloatingText(`Need ${this.currentOrder.req}/8 slices! (You have ${current}/8)`, undefined, undefined, false);
    }
  }

  update() {}

  render(ctx) {
    ctx.fillStyle = '#1c1917';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const centerX = 300;
    const centerY = 210;
    const radius = 130;
    const sliceAngle = (Math.PI * 2) / this.totalSlices;

    // Pizza Crust Base
    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 8, 0, Math.PI * 2);
    ctx.fill();

    // Cheese Base
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();

    // Slices & Pepperoni
    for (let i = 0; i < this.totalSlices; i++) {
      const start = i * sliceAngle;
      const end = (i + 1) * sliceAngle;

      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + Math.cos(start) * radius, centerY + Math.sin(start) * radius);
      ctx.stroke();

      // If sliced/topped
      if (this.toppedSlices.has(i)) {
        const mid = start + sliceAngle / 2;
        const pepX = centerX + Math.cos(mid) * (radius * 0.6);
        const pepY = centerY + Math.sin(mid) * (radius * 0.6);

        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.arc(pepX, pepY, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#7f1d1d';
        ctx.beginPath();
        ctx.arc(pepX - 3, pepY - 3, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Serve Button
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.roundRect(190, 360, 220, 44, 10);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 15px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`SERVE PIZZA 🍕 (${this.toppedSlices.size} Topped)`, 300, 387);
  }

  endGame() {
    const total = this.correctCount + this.incorrectCount;
    const acc = total > 0 ? Math.round((this.correctCount / total) * 100) : 0;

    this.hub.showGameSummary({
      gameName: "Pizza Fraction Rush",
      score: this.score,
      accuracy: acc,
      correct: this.correctCount,
      incorrect: this.incorrectCount,
      longestStreak: this.longestStreak,
      missedSkills: Array.from(new Set(this.missedFractions))
    });
  }
}

// ==========================================================================
// 4. GAME 4: MATH NINJA (Fruit Ninja Swipe Slicing for Multiples & Primes)
// ==========================================================================
class MathNinjaGame {
  constructor(hub) {
    this.hub = hub;
    this.items = [];
    this.bladeTrail = [];
    this.rule = null;
    this.score = 0;
    this.combo = 1;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.longestStreak = 0;
    this.currentStreak = 0;
    this.missedFacts = [];
  }

  start() {
    this.generateRule();
  }

  generateRule() {
    const rules = [
      { text: "SLICE MULTIPLES OF 6!", test: (n) => n % 6 === 0 },
      { text: "SLICE MULTIPLES OF 7!", test: (n) => n % 7 === 0 },
      { text: "SLICE PRIME NUMBERS!", test: (n) => [2, 3, 5, 7, 11, 13, 17, 19, 23].includes(n) }
    ];
    this.rule = rules[Math.floor(Math.random() * rules.length)];
    this.hub.setPrompt(`🥷 NINJA MISSION: ${this.rule.text}`);
    this.spawnItems();
  }

  spawnItems() {
    this.items = [];
    for (let i = 0; i < 4; i++) {
      const num = Math.floor(Math.random() * 35) + 2;
      this.items.push({
        x: 100 + i * 120,
        y: 430,
        vx: (Math.random() - 0.5) * 2,
        vy: -7 - Math.random() * 2.5,
        val: num,
        isTarget: this.rule.test(num),
        sliced: false,
        r: 28
      });
    }
  }

  handlePointer(x, y, type) {
    this.bladeTrail.push({ x, y, time: Date.now() });
    if (this.bladeTrail.length > 12) this.bladeTrail.shift();

    // Check collisions with blade swipe
    this.items.forEach(item => {
      if (!item.sliced && Math.hypot(x - item.x, y - item.y) <= item.r) {
        item.sliced = true;

        if (item.isTarget) {
          this.correctCount++;
          this.currentStreak++;
          this.longestStreak = Math.max(this.longestStreak, this.currentStreak);
          this.combo = Math.min(5, 1 + Math.floor(this.currentStreak / 3));

          const pts = 150 * this.combo;
          this.score += pts;
          this.hub.scoreEl.textContent = this.score;
          this.hub.comboTag.textContent = `${this.combo}x COMBO`;

          if (window.soundEngine) window.soundEngine.playBossHit();
          if (window.helpers) window.helpers.spawnAuraFloatingText(`NINJA SLICE! +${pts} Aura 🗡️`, undefined, undefined, true);
        } else {
          this.incorrectCount++;
          this.currentStreak = 0;
          this.combo = 1;
          this.hub.comboTag.textContent = '1x COMBO';
          this.missedFacts.push(`${item.val} (Not ${this.rule.text})`);

          if (window.soundEngine) window.soundEngine.playWrong();
        }
      }
    });
  }

  update() {
    this.items.forEach(item => {
      item.x += item.vx;
      item.y += item.vy;
      item.vy += 0.15; // Gravity
    });

    // Filter dead items and respawn wave
    if (this.items.every(i => i.y > 450 || i.sliced)) {
      this.spawnItems();
    }

    // Clean old blade points
    const now = Date.now();
    this.bladeTrail = this.bladeTrail.filter(p => now - p.time < 180);

    if (this.correctCount + this.incorrectCount >= 12 && !this.hub.isPracticeMode) {
      this.endGame();
    }
  }

  render(ctx) {
    ctx.fillStyle = '#0f051d';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw Floating Numbers
    this.items.forEach(item => {
      if (item.sliced) {
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('💥', item.x, item.y);
      } else {
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(item.x, item.y, item.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#60a5fa';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 18px "Space Grotesk"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.val, item.x, item.y);
      }
    });

    // Draw Blade Swipe Trail
    if (this.bladeTrail.length > 1) {
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(this.bladeTrail[0].x, this.bladeTrail[0].y);
      for (let i = 1; i < this.bladeTrail.length; i++) {
        ctx.lineTo(this.bladeTrail[i].x, this.bladeTrail[i].y);
      }
      ctx.stroke();
    }
  }

  endGame() {
    const total = this.correctCount + this.incorrectCount;
    const acc = total > 0 ? Math.round((this.correctCount / total) * 100) : 0;

    this.hub.showGameSummary({
      gameName: "Math Ninja",
      score: this.score,
      accuracy: acc,
      correct: this.correctCount,
      incorrect: this.incorrectCount,
      longestStreak: this.longestStreak,
      missedSkills: Array.from(new Set(this.missedFacts))
    });
  }
}

// ==========================================================================
// 5. GAME 5: DECIMAL RACER (3-Lane Racer & Nitro Speed Boosts)
// ==========================================================================
class DecimalRacerGame {
  constructor(hub) {
    this.hub = hub;
    this.carLane = 1; // 0, 1, 2
    this.lanesX = [160, 300, 440];
    this.gates = [];
    this.currentQ = null;
    this.score = 0;
    this.nitro = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.longestStreak = 0;
    this.currentStreak = 0;
    this.missedDecimals = [];
  }

  start() {
    this.generateGates();
  }

  generateGates() {
    this.totalRounds = this.totalRounds || 8;
    const currentRound = this.correctCount + this.incorrectCount + 1;
    this.hub.setLevel(`RACER GATE ${Math.min(this.totalRounds, currentRound)}/${this.totalRounds}`);

    const qTypes = ['largest', 'smallest', 'fraction_half', 'fraction_three_fourths', 'place_value', 'largest'];
    const chosenType = qTypes[Math.floor(Math.random() * qTypes.length)];

    let pool = [];
    let promptText = "";
    let correctVal = 0;

    if (chosenType === 'smallest') {
      const base = (Math.floor(Math.random() * 6) + 1) / 10;
      const v1 = parseFloat((base + 0.08).toFixed(2));
      const v2 = parseFloat((base + 0.008).toFixed(3));
      const v3 = parseFloat((base + 0.18).toFixed(2));
      pool = [v1, v2, v3];
      correctVal = Math.min(...pool);
      promptText = "DRIVE THROUGH SMALLEST NUMBER!";
    } else if (chosenType === 'fraction_half') {
      pool = [0.5, 0.05, 0.55];
      correctVal = 0.5;
      promptText = "DRIVE THROUGH DECIMAL EQUAL TO 1/2!";
    } else if (chosenType === 'fraction_three_fourths') {
      pool = [0.75, 0.705, 0.8];
      correctVal = 0.75;
      promptText = "DRIVE THROUGH DECIMAL EQUAL TO 3/4!";
    } else if (chosenType === 'place_value') {
      const targetDigit = Math.floor(Math.random() * 7) + 2; // e.g. 7
      const match = parseFloat(`0.${targetDigit}4`);
      const wrong1 = parseFloat(`0.0${targetDigit}`);
      const wrong2 = parseFloat(`0.9${targetDigit}`);
      pool = [match, wrong1, wrong2];
      correctVal = match;
      promptText = `DRIVE THROUGH NUMBER WITH ${targetDigit} IN TENTHS PLACE!`;
    } else {
      // General Largest Comparison (Tenths vs Hundredths vs Thousandths)
      const base = Math.floor(Math.random() * 8) + 1;
      const v1 = parseFloat((base * 0.1).toFixed(1)); // e.g. 0.7
      const v2 = parseFloat((base * 0.1 - 0.04).toFixed(2)); // e.g. 0.66
      const v3 = parseFloat((base * 0.1 + 0.05).toFixed(2)); // e.g. 0.75
      pool = [v1, v2, v3];
      correctVal = Math.max(...pool);
      promptText = "DRIVE THROUGH LARGEST NUMBER!";
    }

    // Ensure unique 3 options
    const uniquePool = Array.from(new Set(pool));
    while (uniquePool.length < 3) {
      uniquePool.push(parseFloat((Math.random() * 0.9 + 0.1).toFixed(2)));
    }

    this.currentQ = { prompt: promptText, ans: correctVal };
    this.hub.setPrompt(`🏎️ ${this.currentQ.prompt}`);

    const options = uniquePool.map(val => ({
      val: val,
      isCorrect: val === correctVal
    })).sort(() => Math.random() - 0.5);

    this.gates = options.map((opt, idx) => ({
      lane: idx,
      x: this.lanesX[idx],
      y: -40,
      val: opt.val,
      isCorrect: opt.isCorrect
    }));
  }

  handleInput(code) {
    if ((code === 'ArrowLeft' || code === 'KeyA') && this.carLane > 0) {
      this.carLane--;
      if (window.soundEngine) window.soundEngine.playTap();
    } else if ((code === 'ArrowRight' || code === 'KeyD') && this.carLane < 2) {
      this.carLane++;
      if (window.soundEngine) window.soundEngine.playTap();
    }
  }

  update() {
    if (this.gates.length === 0) return;
    const speed = 1.6 + (this.nitro > 50 ? 0.8 : 0);
    this.gates.forEach(g => { g.y += speed; });

    const gateY = this.gates[0].y;
    if (gateY >= 340 && gateY <= 365) {
      const chosenGate = this.gates.find(g => g.lane === this.carLane);
      if (chosenGate) {
        if (chosenGate.isCorrect) {
          this.correctCount++;
          this.currentStreak++;
          this.longestStreak = Math.max(this.longestStreak, this.currentStreak);
          this.nitro = Math.min(100, this.nitro + 25);

          const pts = 200 + (this.nitro > 50 ? 100 : 0);
          this.score += pts;
          this.hub.scoreEl.textContent = this.score;

          if (window.soundEngine) window.soundEngine.playLevelUp();
          if (window.helpers) window.helpers.spawnAuraFloatingText(`PERFECT DRIFT! +${pts} Aura ⚡🏎️`, undefined, undefined, true);

          if (this.correctCount + this.incorrectCount >= 8 && !this.hub.isPracticeMode) {
            this.endGame();
          } else {
            this.generateGates();
          }
        } else {
          this.incorrectCount++;
          this.currentStreak = 0;
          this.nitro = 0;
          this.missedDecimals.push(this.currentQ.prompt);

          if (window.soundEngine) window.soundEngine.playWrong();
          if (window.helpers) window.helpers.spawnAuraFloatingText(`Missed! Correct: ${this.currentQ.ans}`, undefined, undefined, false);

          if (this.correctCount + this.incorrectCount >= 8 && !this.hub.isPracticeMode) {
            this.endGame();
          } else {
            this.generateGates();
          }
        }
      }
    } else if (gateY > 430) {
      this.incorrectCount++;
      this.currentStreak = 0;
      if (this.correctCount + this.incorrectCount >= 8 && !this.hub.isPracticeMode) {
        this.endGame();
      } else {
        this.generateGates();
      }
    }
  }

  render(ctx) {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // 3 Highway Lanes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 3;
    ctx.setLineDash([20, 20]);
    ctx.beginPath();
    ctx.moveTo(230, 0); ctx.lineTo(230, 420);
    ctx.moveTo(370, 0); ctx.lineTo(370, 420);
    ctx.stroke();
    ctx.setLineDash([]);

    // Overhead Question Banner
    ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
    ctx.fillRect(110, 8, 380, 36);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.strokeRect(110, 8, 380, 36);
    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 17px "Space Grotesk"';
    ctx.textAlign = 'center';
    ctx.fillText(`🏎️ ${this.currentQ.prompt}`, 300, 32);

    // Gates
    this.gates.forEach(g => {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(g.x - 50, g.y - 15, 100, 30);
      ctx.strokeStyle = '#38bdf8';
      ctx.strokeRect(g.x - 50, g.y - 15, 100, 30);

      ctx.fillStyle = '#fde047';
      ctx.font = 'bold 16px "Space Grotesk"';
      ctx.textAlign = 'center';
      ctx.fillText(g.val, g.x, g.y + 6);
    });

    // Racer Car
    const carX = this.lanesX[this.carLane];
    ctx.font = '36px serif';
    ctx.textAlign = 'center';
    ctx.fillText('🏎️', carX, 360);
  }

  endGame() {
    const total = this.correctCount + this.incorrectCount;
    const acc = total > 0 ? Math.round((this.correctCount / total) * 100) : 0;

    this.hub.showGameSummary({
      gameName: "Decimal Racer",
      score: this.score,
      accuracy: acc,
      correct: this.correctCount,
      incorrect: this.incorrectCount,
      longestStreak: this.longestStreak,
      missedSkills: Array.from(new Set(this.missedDecimals))
    });
  }
}

// ==========================================================================
// 6. GAME 6: ALGEBRA FROGGER (RIVER LOG LEAP)
// ==========================================================================
class FroggerMathGame {
  constructor(hub) {
    this.hub = hub;
    this.stage = 1;
    this.maxStages = 5;
    this.lanes = [360, 275, 195, 115, 45]; // Start, River 1, River 2, River 3, Goal
    this.frog = { lane: 0, x: 300, y: 360, currentLog: null };
    this.logs = [];
    this.currentQ = null;
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.longestStreak = 0;
    this.currentStreak = 0;
    this.missedEquations = [];
  }

  start() {
    this.stage = 1;
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.currentStreak = 0;
    this.hub.setLevel(`STAGE ${this.stage}/${this.maxStages}`);
    this.generateQuestion();
    this.initLogs();
  }

  generateQuestion() {
    let eq = "";
    let ans = 0;

    if (this.stage === 1) {
      // 1-step add
      const add = Math.floor(Math.random() * 8) + 3;
      ans = Math.floor(Math.random() * 8) + 2;
      eq = `x + ${add} = ${ans + add}`;
    } else if (this.stage === 2) {
      // 1-step mult
      const mult = Math.floor(Math.random() * 6) + 3;
      ans = Math.floor(Math.random() * 7) + 2;
      eq = `${mult} × x = ${mult * ans}`;
    } else if (this.stage === 3) {
      // 2-step add
      const mult = 2;
      const add = Math.floor(Math.random() * 6) + 2;
      ans = Math.floor(Math.random() * 7) + 3;
      eq = `${mult}x + ${add} = ${mult * ans + add}`;
    } else if (this.stage === 4) {
      // 2-step sub
      const mult = 3;
      const sub = Math.floor(Math.random() * 5) + 2;
      ans = Math.floor(Math.random() * 6) + 3;
      eq = `${mult}x - ${sub} = ${mult * ans - sub}`;
    } else {
      // Stage 5 Cyber River
      const mult = 4;
      const add = Math.floor(Math.random() * 8) + 4;
      ans = Math.floor(Math.random() * 8) + 3;
      eq = `${mult}x + ${add} = ${mult * ans + add}`;
    }

    this.currentQ = { equation: eq, ans: ans };
    this.hub.setLevel(`STAGE ${this.stage}/${this.maxStages}`);
    this.hub.setPrompt(`🐸 RIVER STAGE ${this.stage}: Hop to x where ${this.currentQ.equation}`);
  }

  initLogs() {
    const ans = this.currentQ.ans;
    const distractors = [ans + 2, Math.max(1, ans - 1), ans + 4, ans + 1].filter(v => v > 0 && v !== ans);
    distractors.sort(() => Math.random() - 0.5);

    const speedBase = 1.3 + (this.stage * 0.15);

    // Randomize whether left or right log has correct answer per lane
    const lane1Order = Math.random() > 0.5;
    const lane2Order = Math.random() > 0.5;
    const lane3Order = Math.random() > 0.5;

    this.logs = [
      // Lane 1
      { lane: 1, y: 275, x: 60, speed: speedBase, val: lane1Order ? ans : (distractors[0] || ans + 3), isCorrect: lane1Order, width: 110 },
      { lane: 1, y: 275, x: 380, speed: speedBase, val: lane1Order ? (distractors[0] || ans + 3) : ans, isCorrect: !lane1Order, width: 110 },
      // Lane 2
      { lane: 2, y: 195, x: 140, speed: -speedBase * 1.2, val: lane2Order ? ans : (distractors[1] || ans + 5), isCorrect: lane2Order, width: 110 },
      { lane: 2, y: 195, x: 440, speed: -speedBase * 1.2, val: lane2Order ? (distractors[1] || ans + 5) : ans, isCorrect: !lane2Order, width: 110 },
      // Lane 3
      { lane: 3, y: 115, x: 80, speed: speedBase * 1.4, val: lane3Order ? ans : (distractors[2] || ans + 1), isCorrect: lane3Order, width: 110 },
      { lane: 3, y: 115, x: 400, speed: speedBase * 1.4, val: lane3Order ? (distractors[2] || ans + 1) : ans, isCorrect: !lane3Order, width: 110 }
    ];
  }

  resetFrog(reasonText) {
    this.frog.lane = 0;
    this.frog.y = this.lanes[0];
    this.frog.x = 300;
    this.frog.currentLog = null;
    if (window.soundEngine) window.soundEngine.playWrong();
    if (window.helpers && reasonText) {
      window.helpers.spawnAuraFloatingText(reasonText, undefined, undefined, false);
    }
  }

  handleInput(code) {
    let targetLane = this.frog.lane;
    let targetX = this.frog.x;

    if (code === 'ArrowUp' || code === 'KeyW' || code === 'Space') {
      if (this.frog.lane < 4) targetLane = this.frog.lane + 1;
    } else if (code === 'ArrowDown' || code === 'KeyS') {
      if (this.frog.lane > 0) targetLane = this.frog.lane - 1;
    } else if (code === 'ArrowLeft' || code === 'KeyA') {
      targetX = Math.max(30, this.frog.x - 35);
    } else if (code === 'ArrowRight' || code === 'KeyD') {
      targetX = Math.min(570, this.frog.x + 35);
    }

    if (targetLane !== this.frog.lane) {
      this.frog.lane = targetLane;
      this.frog.y = this.lanes[targetLane];

      if (targetLane === 0) {
        this.frog.currentLog = null;
        if (window.soundEngine) window.soundEngine.playTap();
      } else if (targetLane === 4) {
        // Goal reached!
        this.correctCount++;
        this.currentStreak++;
        this.longestStreak = Math.max(this.longestStreak, this.currentStreak);

        const pts = 250 * this.stage;
        this.score += pts;
        this.hub.scoreEl.textContent = this.score;

        if (window.soundEngine) window.soundEngine.playLevelUp();
        if (window.helpers) {
          window.helpers.spawnConfetti(70);
          window.helpers.spawnAuraFloatingText(`🎉 RIVER CROSSING CLEARED! +${pts} Aura`, undefined, undefined, true);
        }

        this.stage++;
        if (this.stage <= this.maxStages) {
          this.generateQuestion();
          this.initLogs();
          this.frog.lane = 0;
          this.frog.y = this.lanes[0];
          this.frog.x = 300;
        } else {
          this.endGame();
        }
        return;
      } else {
        const logUnderFrog = this.getLogAt(targetLane, this.frog.x);
        if (!logUnderFrog) {
          this.incorrectCount++;
          this.resetFrog("Splashed in water! 🌊");
          return;
        }

        if (!logUnderFrog.isCorrect) {
          this.incorrectCount++;
          this.missedEquations.push(this.currentQ.equation);
          this.resetFrog(`Wrong log (x = ${logUnderFrog.val})! 🪵❌`);
          return;
        }

        this.frog.currentLog = logUnderFrog;
        if (window.soundEngine) window.soundEngine.playCorrect();
        if (window.helpers) window.helpers.spawnAuraFloatingText("+50 Aura (Right Log!) 📈", undefined, undefined, true);
      }
    }

    if (targetX !== this.frog.x) {
      this.frog.x = targetX;
      if (this.frog.lane >= 1 && this.frog.lane <= 3) {
        const logUnderFrog = this.getLogAt(this.frog.lane, this.frog.x);
        if (!logUnderFrog) this.resetFrog("Stepped off log into water! 🌊");
        else this.frog.currentLog = logUnderFrog;
      }
    }
  }

  getLogAt(lane, x) {
    return this.logs.find(log => {
      if (log.lane !== lane) return false;
      const margin = 10;
      return x >= (log.x - margin) && x <= (log.x + log.width + margin);
    });
  }

  update() {
    this.logs.forEach(log => {
      log.x += log.speed;
      if (log.speed > 0 && log.x > 620) log.x = -130;
      if (log.speed < 0 && log.x < -130) log.x = 620;
    });

    if (this.frog.lane >= 1 && this.frog.lane <= 3 && this.frog.currentLog) {
      this.frog.x += this.frog.currentLog.speed;
      if (this.frog.x < 15 || this.frog.x > 585) {
        this.resetFrog("Drifted off-screen! 🌊");
      }
    }
  }

  render(ctx) {
    ctx.fillStyle = '#0f2b48';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = '#22c55e';
    ctx.fillRect(0, 335, ctx.canvas.width, 85);
    ctx.fillRect(0, 0, ctx.canvas.width, 65);

    // Goal chest
    ctx.font = '36px serif';
    ctx.textAlign = 'center';
    ctx.fillText('🎁', 300, 48);

    // Stage Header
    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 15px "Space Grotesk"';
    ctx.fillText(`STAGE ${Math.min(this.stage, this.maxStages)}/5`, 100, 38);

    this.logs.forEach(log => {
      ctx.fillStyle = '#854d0e';
      ctx.fillRect(log.x, log.y - 18, log.width, 36);
      ctx.strokeStyle = '#a16207';
      ctx.lineWidth = 2;
      ctx.strokeRect(log.x, log.y - 18, log.width, 36);

      ctx.fillStyle = '#fde047';
      ctx.font = 'bold 15px "Space Grotesk"';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`x = ${log.val}`, log.x + log.width / 2, log.y);
    });

    ctx.font = '34px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🐸', this.frog.x, this.frog.y);
  }

  endGame() {
    const total = this.correctCount + this.incorrectCount;
    const acc = total > 0 ? Math.round((this.correctCount / total) * 100) : 0;

    this.hub.showGameSummary({
      gameName: "Algebra Frogger",
      score: this.score,
      accuracy: acc,
      correct: this.correctCount,
      incorrect: this.incorrectCount,
      longestStreak: this.longestStreak,
      missedSkills: Array.from(new Set(this.missedEquations))
    });
  }
}

// ==========================================================================
// 7. GAME 7: GEOMETRY BUILDER (Multi-Stage Math City Sandbox)
// ==========================================================================
class GeometryBuilderGame {
  constructor(hub) {
    this.hub = hub;
    this.stage = 1;
    this.maxStages = 5;
    this.width = 6;
    this.height = 4;
    this.targetArea = 24;
    this.targetPerimeter = 20;
    this.currentBuilding = "Cottage Base";
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.longestStreak = 0;
    this.currentStreak = 0;
  }

  start() {
    this.stage = 1;
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.currentStreak = 0;
    this.hub.setLevel(`STAGE ${this.stage}/${this.maxStages}`);
    this.generateMission();
  }

  generateMission() {
    const missions = [
      { name: "Cottage Base", area: 24, perim: 20, initW: 5, initH: 3 },
      { name: "Square Tower", area: 36, perim: 24, initW: 4, initH: 4 },
      { name: "Park Garden", area: 40, perim: 28, initW: 6, initH: 5 },
      { name: "Sports Arena", area: 48, perim: 32, initW: 7, initH: 4 },
      { name: "Megatower Plaza", area: 60, perim: 34, initW: 8, initH: 5 }
    ];

    const m = missions[Math.min(missions.length - 1, this.stage - 1)];
    this.currentBuilding = m.name;
    this.targetArea = m.area;
    this.targetPerimeter = m.perim;
    this.width = m.initW;
    this.height = m.initH;

    this.hub.setLevel(`STAGE ${this.stage}: ${this.currentBuilding}`);
    this.hub.setPrompt(`📐 BUILD [${this.currentBuilding}]: Need Area = ${this.targetArea} & Perimeter = ${this.targetPerimeter}`);
  }

  handlePointer(x, y, type) {
    if (type !== 'down') return;
    // Width Adjusters
    if (x >= 120 && x <= 180 && y >= 350 && y <= 390) {
      this.width = Math.max(2, this.width - 1);
      if (window.soundEngine) window.soundEngine.playTap();
    } else if (x >= 200 && x <= 260 && y >= 350 && y <= 390) {
      this.width = Math.min(12, this.width + 1);
      if (window.soundEngine) window.soundEngine.playTap();
    } 
    // Height Adjusters
    else if (x >= 340 && x <= 400 && y >= 350 && y <= 390) {
      this.height = Math.max(2, this.height - 1);
      if (window.soundEngine) window.soundEngine.playTap();
    } else if (x >= 420 && x <= 480 && y >= 350 && y <= 390) {
      this.height = Math.min(12, this.height + 1);
      if (window.soundEngine) window.soundEngine.playTap();
    } 
    // Submit
    else if (x >= 240 && x <= 360 && y >= 300 && y <= 340) {
      this.checkBuild();
    }
  }

  checkBuild() {
    const area = this.width * this.height;
    const perim = 2 * (this.width + this.height);

    if (area === this.targetArea && perim === this.targetPerimeter) {
      this.correctCount++;
      this.currentStreak++;
      this.longestStreak = Math.max(this.longestStreak, this.currentStreak);

      const pts = 300 * this.stage;
      this.score += pts;
      this.hub.scoreEl.textContent = this.score;

      if (window.soundEngine) window.soundEngine.playLevelUp();
      if (window.helpers) {
        window.helpers.spawnConfetti(70);
        window.helpers.spawnAuraFloatingText(`🎉 ${this.currentBuilding} CONSTRUCTED! +${pts} Aura`, undefined, undefined, true);
      }

      this.stage++;
      if (this.stage <= this.maxStages) {
        this.generateMission();
      } else {
        this.endGame();
      }
    } else {
      this.incorrectCount++;
      this.currentStreak = 0;
      if (window.soundEngine) window.soundEngine.playWrong();
      if (window.helpers) window.helpers.spawnAuraFloatingText(`Current: Area=${area}, Perim=${perim} (Not target!)`, undefined, undefined, false);
    }
  }

  endGame() {
    const total = this.correctCount + this.incorrectCount;
    const acc = total > 0 ? Math.round((this.correctCount / total) * 100) : 0;
    this.hub.showGameSummary({
      gameName: "Geometry Builder",
      score: this.score,
      accuracy: acc,
      correct: this.correctCount,
      incorrect: this.incorrectCount,
      longestStreak: this.longestStreak,
      missedSkills: []
    });
  }

  update() {}

  render(ctx) {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Blueprint Grid Header
    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 16px "Space Grotesk"';
    ctx.textAlign = 'center';
    ctx.fillText(`🏗️ BLUEPRINT: ${this.currentBuilding.toUpperCase()} (STAGE ${Math.min(this.stage, this.maxStages)}/5)`, 300, 30);

    // Shape Grid
    const startX = 300 - (this.width * 16);
    const startY = 150 - (this.height * 10);
    const boxW = this.width * 32;
    const boxH = this.height * 20;

    ctx.fillStyle = 'rgba(77, 237, 244, 0.25)';
    ctx.fillRect(startX, startY, boxW, boxH);
    ctx.strokeStyle = '#4dedf4';
    ctx.lineWidth = 3;
    ctx.strokeRect(startX, startY, boxW, boxH);

    // Dimension labels on shape
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 13px "Space Grotesk"';
    ctx.fillText(`W = ${this.width}`, 300, startY - 8);
    ctx.fillText(`H = ${this.height}`, startX + boxW + 24, startY + boxH / 2);

    // Live Readout Box
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(160, 235, 280, 50);
    ctx.strokeStyle = '#334155';
    ctx.strokeRect(160, 235, 280, 50);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 14px "Space Grotesk"';
    ctx.fillText(`Target: Area = ${this.targetArea} | Perimeter = ${this.targetPerimeter}`, 300, 255);
    ctx.fillStyle = (this.width * this.height === this.targetArea && 2 * (this.width + this.height) === this.targetPerimeter) ? '#4ade80' : '#f87171';
    ctx.fillText(`Current: Area = ${this.width * this.height} | Perimeter = ${2 * (this.width + this.height)}`, 300, 275);

    // Check Build Button
    ctx.fillStyle = '#58cc02';
    ctx.fillRect(240, 300, 120, 36);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px "Space Grotesk"';
    ctx.fillText('SUBMIT SHAPE', 300, 323);

    // Width Adjusters
    ctx.fillStyle = '#334155';
    ctx.fillRect(120, 350, 60, 36);
    ctx.fillRect(200, 350, 60, 36);
    ctx.fillStyle = '#fff';
    ctx.fillText('W -', 150, 373);
    ctx.fillText('W +', 230, 373);

    // Height Adjusters
    ctx.fillStyle = '#334155';
    ctx.fillRect(340, 350, 60, 36);
    ctx.fillRect(420, 350, 60, 36);
    ctx.fillStyle = '#fff';
    ctx.fillText('H -', 370, 373);
    ctx.fillText('H +', 450, 373);
  }
}

// ==========================================================================
// 8. GAME 8: NUMBER LINE JUMPER (Multi-Stage Leap Islands)
// ==========================================================================
class NumberLineJumperGame {
  constructor(hub) {
    this.hub = hub;
    this.stage = 1;
    this.maxStages = 6;
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.longestStreak = 0;
    this.currentStreak = 0;
    this.currentQ = null;
  }

  start() {
    this.stage = 1;
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.currentStreak = 0;
    this.hub.setLevel(`STAGE ${this.stage}/${this.maxStages}`);
    this.generateStage();
  }

  generateStage() {
    const stagePool = [
      { prompt: "Tap where 1/2 (0.50) is located!", targetRatio: 0.50, label: "1/2" },
      { prompt: "Tap where 3/4 (0.75) is located!", targetRatio: 0.75, label: "3/4" },
      { prompt: "Tap where 1/4 (0.25) is located!", targetRatio: 0.25, label: "1/4" },
      { prompt: "Tap where 4/8 (Equivalent to 1/2) is located!", targetRatio: 0.50, label: "4/8" },
      { prompt: "Tap where 6/8 (Equivalent to 3/4) is located!", targetRatio: 0.75, label: "6/8" },
      { prompt: "Tap where 1/8 (0.125) is located!", targetRatio: 0.125, label: "1/8" }
    ];

    this.currentQ = stagePool[Math.min(stagePool.length - 1, this.stage - 1)];
    this.hub.setLevel(`STAGE ${this.stage}/${this.maxStages}`);
    this.hub.setPrompt(`🦘 NUMBER LINE: ${this.currentQ.prompt}`);
  }

  handlePointer(x, y, type) {
    if (type !== 'down') return;
    if (y >= 160 && y <= 260) {
      const lineStart = 100;
      const lineEnd = 500;
      const clickedRatio = (x - lineStart) / (lineEnd - lineStart);

      if (Math.abs(clickedRatio - this.currentQ.targetRatio) <= 0.09) {
        this.correctCount++;
        this.currentStreak++;
        this.longestStreak = Math.max(this.longestStreak, this.currentStreak);

        const pts = 200 * this.stage;
        this.score += pts;
        this.hub.scoreEl.textContent = this.score;

        if (window.soundEngine) window.soundEngine.playLevelUp();
        if (window.helpers) {
          window.helpers.spawnConfetti(70);
          window.helpers.spawnAuraFloatingText(`PERFECT JUMP (${this.currentQ.label})! +${pts} Aura 🦘✨`, undefined, undefined, true);
        }

        this.stage++;
        if (this.stage <= this.maxStages) {
          this.generateStage();
        } else {
          this.endGame();
        }
      } else {
        this.incorrectCount++;
        this.currentStreak = 0;
        if (window.soundEngine) window.soundEngine.playWrong();
        if (window.helpers) window.helpers.spawnAuraFloatingText(`Missed landing! Try closer to ${this.currentQ.label}`, undefined, undefined, false);
      }
    }
  }

  endGame() {
    const total = this.correctCount + this.incorrectCount;
    const acc = total > 0 ? Math.round((this.correctCount / total) * 100) : 0;
    this.hub.showGameSummary({
      gameName: "Number Line Jumper",
      score: this.score,
      accuracy: acc,
      correct: this.correctCount,
      incorrect: this.incorrectCount,
      longestStreak: this.longestStreak,
      missedSkills: []
    });
  }

  update() {}

  render(ctx) {
    ctx.fillStyle = '#080317';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Header
    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 16px "Space Grotesk"';
    ctx.textAlign = 'center';
    ctx.fillText(`🦘 NUMBER LINE ADVENTURE • STAGE ${Math.min(this.stage, this.maxStages)}/6`, 300, 40);

    // Number Line Bar
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(100, 200);
    ctx.lineTo(500, 200);
    ctx.stroke();

    // Benchmark Ticks: 0, 1/4, 1/2, 3/4, 1
    const ticks = [
      { x: 100, lbl: "0" },
      { x: 200, lbl: "1/4" },
      { x: 300, lbl: "1/2 (0.5)" },
      { x: 400, lbl: "3/4" },
      { x: 500, lbl: "1" }
    ];

    ticks.forEach(t => {
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(t.x - 2, 185, 4, 30);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 13px "Space Grotesk"';
      ctx.textAlign = 'center';
      ctx.fillText(t.lbl, t.x, 240);
    });

    // Instructions hint
    ctx.fillStyle = '#a5b4fc';
    ctx.font = '14px "Fredoka"';
    ctx.fillText('Tap directly along the number line where the prompt lands!', 300, 310);
  }
}

// ==========================================================================
// 9. GAME 9: TREASURE MINE (Deep Underground Word Problem Dungeon)
// ==========================================================================
class TreasureMineGame {
  constructor(hub) {
    this.hub = hub;
    this.shaft = 1;
    this.maxShafts = 8;
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.longestStreak = 0;
    this.currentStreak = 0;
    this.currentQ = null;
    this.tunnels = [];
    this.relicsFound = [];
  }

  start() {
    this.shaft = 1;
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.currentStreak = 0;
    this.relicsFound = [];
    this.hub.setLevel(`DEPTH: 100m (SHAFT ${this.shaft}/${this.maxShafts})`);
    this.generateShaft();
  }

  generateShaft() {
    const wordProblems = [
      {
        prompt: "48 diamond crystals packed into 6 minecarts. How many crystals per cart?",
        ans: 8,
        unit: "Crystals",
        distractors: [6, 9],
        relic: "💎 Diamond Core"
      },
      {
        prompt: "A goblin trades 9 gold ingots for 1 potion. Zayn buys 7 potions. How many gold ingots?",
        ans: 63,
        unit: "Ingots",
        distractors: [56, 72],
        relic: "🧪 Alchemist Flask"
      },
      {
        prompt: "The mine elevator drops 8 floors of 8 meters each. What is the total depth?",
        ans: 64,
        unit: "Meters",
        distractors: [54, 72],
        relic: "⚙️ Titan Gear"
      },
      {
        prompt: "Zayn finds 72 emeralds and shares them equally among 8 secret chests. How many in each?",
        ans: 9,
        unit: "Emeralds",
        distractors: [8, 12],
        relic: "💚 Emerald Idol"
      },
      {
        prompt: "To light the magma cavern, Zayn needs 6 bundles of 12 redstone torches. How many torches total?",
        ans: 72,
        unit: "Torches",
        distractors: [68, 84],
        relic: "🔥 Magma Torch"
      },
      {
        prompt: "The lava cooling pump takes 54 buckets of water, with 6 buckets per tank. How many tanks to fill?",
        ans: 9,
        unit: "Tanks",
        distractors: [7, 8],
        relic: "💧 Hydro Core"
      },
      {
        prompt: "Ancient Vault: 108 mystical runes split evenly across 9 glowing tablets. How many runes per tablet?",
        ans: 12,
        unit: "Runes",
        distractors: [11, 14],
        relic: "📜 Ancient Slate"
      },
      {
        prompt: "Grand Vault Chest: 7 bags of 12 platinum coins each. How many total coins discovered?",
        ans: 84,
        unit: "Coins",
        distractors: [74, 96],
        relic: "👑 Emperor Crown"
      }
    ];

    const q = wordProblems[Math.min(wordProblems.length - 1, this.shaft - 1)];
    this.currentQ = q;

    const values = [
      { val: `${q.ans} ${q.unit}`, isCorrect: true, num: q.ans },
      { val: `${q.distractors[0]} ${q.unit}`, isCorrect: false, num: q.distractors[0] },
      { val: `${q.distractors[1]} ${q.unit}`, isCorrect: false, num: q.distractors[1] }
    ].sort(() => Math.random() - 0.5);

    this.tunnels = values;
    const depthMeters = this.shaft * 150;
    this.hub.setLevel(`DEPTH: ${depthMeters}m (SHAFT ${this.shaft}/${this.maxShafts})`);
    this.hub.setPrompt(`⛏️ SHAFT ${this.shaft}: ${q.prompt}`);
  }

  handlePointer(x, y, type) {
    if (type !== 'down') return;

    let chosenIdx = -1;
    if (x >= 60 && x <= 180 && y >= 170 && y <= 330) chosenIdx = 0;
    else if (x >= 240 && x <= 360 && y >= 170 && y <= 330) chosenIdx = 1;
    else if (x >= 420 && x <= 540 && y >= 170 && y <= 330) chosenIdx = 2;

    if (chosenIdx !== -1 && this.tunnels[chosenIdx]) {
      const chosen = this.tunnels[chosenIdx];
      if (chosen.isCorrect) {
        this.correctCount++;
        this.currentStreak++;
        this.longestStreak = Math.max(this.longestStreak, this.currentStreak);
        this.relicsFound.push(this.currentQ.relic);

        const pts = 250 * this.shaft;
        this.score += pts;
        this.hub.scoreEl.textContent = this.score;

        if (window.soundEngine) window.soundEngine.playLevelUp();
        if (window.helpers) {
          window.helpers.spawnConfetti(80);
          window.helpers.spawnAuraFloatingText(`UNLOCKED: ${this.currentQ.relic}! +${pts} Aura ⛏️💎`, undefined, undefined, true);
        }

        this.shaft++;
        if (this.shaft <= this.maxShafts) {
          this.generateShaft();
        } else {
          this.endGame();
        }
      } else {
        this.incorrectCount++;
        this.currentStreak = 0;
        if (window.soundEngine) window.soundEngine.playWrong();
        if (window.helpers) window.helpers.spawnAuraFloatingText(`Tunnel Blocked! Need ${this.currentQ.ans} ${this.currentQ.unit}`, undefined, undefined, false);
      }
    }
  }

  endGame() {
    const total = this.correctCount + this.incorrectCount;
    const acc = total > 0 ? Math.round((this.correctCount / total) * 100) : 0;
    this.hub.showGameSummary({
      gameName: "Treasure Mine",
      score: this.score,
      accuracy: acc,
      correct: this.correctCount,
      incorrect: this.incorrectCount,
      longestStreak: this.longestStreak,
      missedSkills: []
    });
  }

  update() {}

  render(ctx) {
    ctx.fillStyle = '#1c1917';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Deep Mine Rock Textures
    ctx.fillStyle = '#0c0a09';
    ctx.fillRect(0, 0, ctx.canvas.width, 70);

    // Header Depth Readout
    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 16px "Space Grotesk"';
    ctx.textAlign = 'center';
    ctx.fillText(`⛏️ UNDERGROUND EXPEDITION • SHAFT ${Math.min(this.shaft, this.maxShafts)} (DEPTH: ${this.shaft * 150}m)`, 300, 30);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 13px "Space Grotesk"';
    ctx.fillText(`Loot Relics Discovered: ${this.relicsFound.join(' | ') || 'None yet'}`, 300, 55);

    // 3 Mine Tunnels
    const tunnelCoords = [
      { x: 60, title: "TUNNEL A" },
      { x: 240, title: "TUNNEL B" },
      { x: 420, title: "TUNNEL C" }
    ];

    tunnelCoords.forEach((t, idx) => {
      const data = this.tunnels[idx];
      if (!data) return;

      // Tunnel Arch
      ctx.fillStyle = '#0a0908';
      ctx.beginPath();
      ctx.arc(t.x + 60, 230, 55, Math.PI, 0);
      ctx.lineTo(t.x + 115, 330);
      ctx.lineTo(t.x + 5, 330);
      ctx.fill();

      // Stone Braces
      ctx.strokeStyle = '#78716c';
      ctx.lineWidth = 5;
      ctx.stroke();

      // Tunnel Label
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 12px "Space Grotesk"';
      ctx.fillText(t.title, t.x + 60, 160);

      // Value Pill
      ctx.fillStyle = '#ffd500';
      ctx.font = 'bold 15px "Space Grotesk"';
      ctx.fillText(data.val, t.x + 60, 255);
    });

    // Floor Track
    ctx.fillStyle = '#44403c';
    ctx.fillRect(0, 370, ctx.canvas.width, 10);
    ctx.fillStyle = '#a8a29e';
    for (let lx = 10; lx < 600; lx += 40) {
      ctx.fillRect(lx, 365, 14, 20);
    }

    ctx.font = '28px serif';
    ctx.fillText('🛒💎', 300, 370);
  }
}

// ==========================================================================
// 10. GAME 10: FLAPPY MATH BIRD (Floating Math Stars & Pipe Hazards)
// ==========================================================================
class FlappyMathGame {
  constructor(hub) {
    this.hub = hub;
    this.bird = { x: 110, y: 200, vy: 0, g: 0.34, r: 18 };
    this.pipes = [];
    this.stars = [];
    this.currentQ = null;
    this.score = 0;
    this.combo = 1;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.longestStreak = 0;
    this.currentStreak = 0;
    this.missedSkills = [];
  }

  start() {
    this.bird = { x: 110, y: 200, vy: 0, g: 0.34, r: 18 };
    this.generateQuestion();
    this.initRoundObjects();
  }

  generateQuestion() {
    const questionPool = [
      { prompt: "Fly to fraction equal to 2/4", ans: "1/2", distractors: ["2/3", "3/5", "1/4"] },
      { prompt: "Fly to fraction equal to 3/6", ans: "1/2", distractors: ["3/4", "2/5", "1/3"] },
      { prompt: "Fly to fraction equal to 4/8", ans: "1/2", distractors: ["4/6", "3/8", "2/3"] },
      { prompt: "Fly to fraction equal to 2/6", ans: "1/3", distractors: ["1/2", "3/5", "2/4"] },
      { prompt: "Fly to fraction equal to 6/8", ans: "3/4", distractors: ["2/4", "5/8", "1/2"] },
      { prompt: "Fly to fraction equal to 2/8", ans: "1/4", distractors: ["1/2", "2/6", "3/8"] },
      { prompt: "Fly to decimal equal to 1/2", ans: "0.50", distractors: ["0.25", "0.75", "0.20"] },
      { prompt: "Fly to decimal equal to 1/4", ans: "0.25", distractors: ["0.40", "0.50", "0.75"] },
      { prompt: "Fly to decimal equal to 3/4", ans: "0.75", distractors: ["0.34", "0.50", "0.25"] },
      { prompt: "Fly to decimal equal to 1/5", ans: "0.20", distractors: ["0.15", "0.50", "0.25"] },
      { prompt: "Fly to decimal equal to 2/5", ans: "0.40", distractors: ["0.25", "0.50", "0.20"] },
      { prompt: "Fly to fraction equal to 0.75", ans: "3/4", distractors: ["1/2", "2/3", "7/5"] },
      { prompt: "Fly to fraction equal to 0.50", ans: "1/2", distractors: ["1/5", "2/3", "3/4"] },
      { prompt: "Fly to fraction equal to 0.25", ans: "1/4", distractors: ["1/2", "2/5", "3/4"] }
    ];

    const q = questionPool[Math.floor(Math.random() * questionPool.length)];
    this.currentQ = q;
    this.hub.setPrompt(`🐦 FLAP TO STAR: ${q.prompt}`);
  }

  initRoundObjects() {
    // 1. Scrolling Green Pipe (with 150px gap in the middle)
    const gapY = Math.floor(Math.random() * 140) + 120; // 120 to 260
    const gapH = 150;
    this.pipes = [
      { x: 520, topH: gapY - gapH / 2, botY: gapY + gapH / 2, w: 55 }
    ];

    // 2. 3 Floating Golden Math Stars at different altitudes
    const ans = this.currentQ.ans;
    const shuffledDistractors = [...this.currentQ.distractors].sort(() => Math.random() - 0.5);

    const values = [
      { val: ans, isCorrect: true },
      { val: shuffledDistractors[0], isCorrect: false },
      { val: shuffledDistractors[1], isCorrect: false }
    ].sort(() => Math.random() - 0.5);

    const altitudes = [100, 210, 320];
    this.stars = values.map((item, idx) => ({
      x: 340 + idx * 75,
      y: altitudes[idx],
      val: item.val,
      isCorrect: item.isCorrect,
      r: 26,
      collected: false
    }));
  }

  handleInput(code) {
    if (code === 'Space' || code === 'ArrowUp' || code === 'KeyW') {
      this.bird.vy = -6.2;
      if (window.soundEngine) window.soundEngine.playTap();
    }
  }

  update() {
    this.bird.vy += this.bird.g;
    this.bird.y += this.bird.vy;

    // Floor / Ceiling Collision
    if (this.bird.y > 395 || this.bird.y < 15) {
      if (this.hub.isPracticeMode) {
        this.bird.y = Math.max(25, Math.min(385, this.bird.y));
        this.bird.vy = 0;
      } else {
        if (window.soundEngine) window.soundEngine.playWrong();
        if (window.helpers) window.helpers.spawnAuraFloatingText("Crashed! 💥", undefined, undefined, false);
        this.endGame();
        return;
      }
    }

    // Scroll Pipes and Check Collision
    this.pipes.forEach(pipe => {
      pipe.x -= 1.6;

      // Check pipe hit
      const inX = (this.bird.x + this.bird.r > pipe.x) && (this.bird.x - this.bird.r < pipe.x + pipe.w);
      const hitTop = inX && (this.bird.y - this.bird.r < pipe.topH);
      const hitBot = inX && (this.bird.y + this.bird.r > pipe.botY);

      if (hitTop || hitBot) {
        if (this.hub.isPracticeMode) {
          // Bounce off in practice mode
          this.bird.x = pipe.x - 25;
        } else {
          // Bonk pipe ends game!
          if (window.soundEngine) window.soundEngine.playWrong();
          if (window.helpers) window.helpers.spawnAuraFloatingText("Hit the pipe! 💥", undefined, undefined, false);
          this.endGame();
          return;
        }
      }
    });

    // Scroll Floating Stars and Check Collection
    this.stars.forEach(star => {
      star.x -= 1.6;

      if (!star.collected) {
        const dist = Math.hypot(this.bird.x - star.x, this.bird.y - star.y);
        if (dist <= this.bird.r + star.r) {
          star.collected = true;

          if (star.isCorrect) {
            this.correctCount++;
            this.currentStreak++;
            this.longestStreak = Math.max(this.longestStreak, this.currentStreak);
            this.combo = Math.min(5, 1 + Math.floor(this.currentStreak / 2));

            const pts = 200 * this.combo;
            this.score += pts;
            this.hub.scoreEl.textContent = this.score;
            this.hub.comboTag.textContent = `${this.combo}x COMBO`;

            if (window.soundEngine) window.soundEngine.playLevelUp();
            if (window.helpers) {
              window.helpers.spawnConfetti(60);
              window.helpers.spawnAuraFloatingText(`CORRECT STAR (${star.val})! +${pts} Aura ⭐✨`, undefined, undefined, true);
            }

            // Spawn next fresh question & new round
            this.generateQuestion();
            this.initRoundObjects();
          } else {
            this.incorrectCount++;
            this.currentStreak = 0;
            this.combo = 1;
            this.hub.comboTag.textContent = '1x COMBO';
            this.missedSkills.push(this.currentQ.prompt);

            if (window.soundEngine) window.soundEngine.playWrong();
            if (window.helpers) window.helpers.spawnAuraFloatingText(`Wrong Star (${star.val})!`, undefined, undefined, false);
          }
        }
      }
    });

    // Respawn round if objects fully drifted past
    if (this.pipes.length > 0 && this.pipes[0].x < -70 && this.stars.every(s => s.x < -40 || s.collected)) {
      this.generateQuestion();
      this.initRoundObjects();
    }

    // End match after 7 answers in ranked mode
    if (this.correctCount + this.incorrectCount >= 7 && !this.hub.isPracticeMode) {
      this.endGame();
    }
  }

  render(ctx) {
    // Sky Background
    ctx.fillStyle = '#0c4a6e';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.arc(150, 80, 45, 0, Math.PI * 2);
    ctx.arc(190, 70, 55, 0, Math.PI * 2);
    ctx.arc(230, 80, 45, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(420, 110, 40, 0, Math.PI * 2);
    ctx.arc(460, 100, 50, 0, Math.PI * 2);
    ctx.arc(500, 110, 40, 0, Math.PI * 2);
    ctx.fill();

    // Draw Pipes (Classic Green with dark border)
    this.pipes.forEach(pipe => {
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(pipe.x, 0, pipe.w, pipe.topH);
      ctx.fillRect(pipe.x, pipe.botY, pipe.w, ctx.canvas.height - pipe.botY);

      // Pipe rims
      ctx.fillStyle = '#16a34a';
      ctx.fillRect(pipe.x - 4, pipe.topH - 22, pipe.w + 8, 22);
      ctx.fillRect(pipe.x - 4, pipe.botY, pipe.w + 8, 22);

      ctx.strokeStyle = '#14532d';
      ctx.lineWidth = 3;
      ctx.strokeRect(pipe.x, 0, pipe.w, pipe.topH);
      ctx.strokeRect(pipe.x, pipe.botY, pipe.w, ctx.canvas.height - pipe.botY);
    });

    // Draw Floating Golden Math Stars
    this.stars.forEach(star => {
      if (!star.collected) {
        // Glowing star aura
        ctx.fillStyle = 'rgba(255, 213, 0, 0.25)';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r + 8, 0, Math.PI * 2);
        ctx.fill();

        // Star body
        ctx.fillStyle = '#ffd500';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Star Icon & Math Value
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 14px "Space Grotesk"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(star.val, star.x, star.y);
      }
    });

    // Ground grass line
    ctx.fillStyle = '#15803d';
    ctx.fillRect(0, 408, ctx.canvas.width, 12);

    // Draw Flappy Bird
    ctx.save();
    ctx.translate(this.bird.x, this.bird.y);
    ctx.rotate(Math.min(Math.PI / 4, Math.max(-Math.PI / 4, this.bird.vy * 0.08)));
    ctx.font = '34px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🐦', 0, 0);
    ctx.restore();
  }

  endGame() {
    const total = this.correctCount + this.incorrectCount;
    const acc = total > 0 ? Math.round((this.correctCount / total) * 100) : 0;

    this.hub.showGameSummary({
      gameName: "Flappy Math Bird",
      score: this.score,
      accuracy: acc,
      correct: this.correctCount,
      incorrect: this.incorrectCount,
      longestStreak: this.longestStreak,
      missedSkills: Array.from(new Set(this.missedSkills))
    });
  }
}

// ==========================================================================
// 11. GAME 11: EQUATION ESCAPE ROOM (Multi-Room Mystery Chambers)
// ==========================================================================
class EquationEscapeRoomGame {
  constructor(hub) {
    this.hub = hub;
    this.room = 1;
    this.maxRooms = 3;
    this.stage = 1; // 1: Safe equation, 2: Pattern clock, 3: Keypad door
    this.code1 = null;
    this.code2 = null;
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.longestStreak = 0;
    this.currentStreak = 0;
    this.roomNames = ["Pharaoh's Pyramid", "Cyber Space Station", "Alchemist's Vault"];
  }

  start() {
    this.room = 1;
    this.stage = 1;
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.currentStreak = 0;
    this.initPuzzles();
  }

  initPuzzles() {
    this.stage = 1;
    const roomTitle = this.roomNames[this.room - 1] || `Chamber ${this.room}`;
    this.hub.setLevel(`ROOM ${this.room}/${this.maxRooms}: ${roomTitle}`);

    if (this.room === 1) {
      this.code1 = Math.floor(Math.random() * 5) + 4; // 4 to 8
      this.code2 = 48; // Pattern: 3, 6, 12, 24, 48
      this.hub.setPrompt(`🔐 [${roomTitle}] PUZZLE 1/3: Solve 4 × x = ${4 * this.code1} for Digit 1`);
    } else if (this.room === 2) {
      this.code1 = Math.floor(Math.random() * 4) + 6; // 6 to 9
      this.code2 = 81; // Pattern: 1, 3, 9, 27, 81
      this.hub.setPrompt(`🔐 [${roomTitle}] PUZZLE 1/3: Solve 3x + 5 = ${3 * this.code1 + 5} for Digit 1`);
    } else {
      this.code1 = Math.floor(Math.random() * 4) + 7; // 7 to 10
      this.code2 = 64; // Pattern: 4, 8, 16, 32, 64
      this.hub.setPrompt(`🔐 [${roomTitle}] PUZZLE 1/3: Solve x ÷ 2 = ${this.code1} for Digit 1`);
    }
  }

  handlePointer(x, y, type) {
    if (type !== 'down') return;
    const roomTitle = this.roomNames[this.room - 1] || `Chamber ${this.room}`;

    if (this.stage === 1) {
      const choices = [this.code1, this.code1 + 2, Math.max(1, this.code1 - 2), this.code1 + 1].sort(() => Math.random() - 0.5);

      if (y >= 260 && y <= 320) {
        let selected = null;
        if (x >= 80 && x <= 180) selected = choices[0];
        else if (x >= 200 && x <= 300) selected = choices[1];
        else if (x >= 320 && x <= 420) selected = choices[2];
        else if (x >= 440 && x <= 540) selected = choices[3];

        if (selected !== null) {
          if (selected === this.code1) {
            this.correctCount++;
            this.currentStreak++;
            this.longestStreak = Math.max(this.longestStreak, this.currentStreak);
            this.score += 250;
            this.stage = 2;
            if (window.soundEngine) window.soundEngine.playCorrect();
            if (window.helpers) window.helpers.spawnAuraFloatingText(`Digit 1 Unlocked: [${this.code1}]! 🔓`, undefined, undefined, true);
            
            if (this.room === 1) {
              this.hub.setPrompt(`🕰️ PUZZLE 2/3: Clock pattern: 3, 6, 12, 24, __? (Find Digit 2)`);
            } else if (this.room === 2) {
              this.hub.setPrompt(`⚡ PUZZLE 2/3: Cyber circuit pattern: 1, 3, 9, 27, __? (Find Digit 2)`);
            } else {
              this.hub.setPrompt(`🔮 PUZZLE 2/3: Alchemy rune pattern: 4, 8, 16, 32, __? (Find Digit 2)`);
            }
          } else {
            this.incorrectCount++;
            this.currentStreak = 0;
            if (window.soundEngine) window.soundEngine.playWrong();
          }
        }
      }
    } else if (this.stage === 2) {
      const choices = [this.code2, this.code2 - 12, this.code2 + 10, this.code2 - 6].sort(() => Math.random() - 0.5);

      if (y >= 260 && y <= 320) {
        let selected = null;
        if (x >= 80 && x <= 180) selected = choices[0];
        else if (x >= 200 && x <= 300) selected = choices[1];
        else if (x >= 320 && x <= 420) selected = choices[2];
        else if (x >= 440 && x <= 540) selected = choices[3];

        if (selected !== null) {
          if (selected === this.code2) {
            this.correctCount++;
            this.currentStreak++;
            this.longestStreak = Math.max(this.longestStreak, this.currentStreak);
            this.score += 300;
            this.stage = 3;
            if (window.soundEngine) window.soundEngine.playCorrect();
            if (window.helpers) window.helpers.spawnAuraFloatingText(`Digit 2 Unlocked: [${this.code2}]! 🔓`, undefined, undefined, true);
            this.hub.setPrompt(`🚪 PUZZLE 3/3: Combine codes [${this.code1} - ${this.code2}] ➔ Tap 'UNLOCK DOOR' to Escape!`);
          } else {
            this.incorrectCount++;
            this.currentStreak = 0;
            if (window.soundEngine) window.soundEngine.playWrong();
          }
        }
      }
    } else if (this.stage === 3) {
      // Escape Door Button
      if (x >= 180 && x <= 420 && y >= 250 && y <= 320) {
        this.correctCount++;
        this.currentStreak++;
        this.longestStreak = Math.max(this.longestStreak, this.currentStreak);
        this.score += 400;
        this.hub.scoreEl.textContent = this.score;

        if (window.soundEngine) window.soundEngine.playLevelUp();
        if (window.helpers) {
          window.helpers.spawnConfetti(90);
          window.helpers.spawnAuraFloatingText(`🏆 ESCAPED ${roomTitle.toUpperCase()}!`, undefined, undefined, true);
        }

        this.room++;
        if (this.room <= this.maxRooms) {
          this.initPuzzles();
        } else {
          this.endGame();
        }
      }
    }
  }

  endGame() {
    const total = this.correctCount + this.incorrectCount;
    const acc = total > 0 ? Math.round((this.correctCount / total) * 100) : 0;
    this.hub.showGameSummary({
      gameName: "Equation Escape Room",
      score: this.score,
      accuracy: acc,
      correct: this.correctCount,
      incorrect: this.incorrectCount,
      longestStreak: this.longestStreak,
      missedSkills: []
    });
  }

  update() {}

  render(ctx) {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const roomTitle = this.roomNames[this.room - 1] || `Room ${this.room}`;

    // Header
    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 16px "Space Grotesk"';
    ctx.textAlign = 'center';
    ctx.fillText(`🔐 ESCAPE ROOM: ${roomTitle.toUpperCase()} (ROOM ${Math.min(this.room, this.maxRooms)}/3)`, 300, 30);

    // Chamber Wall
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 50, 520, 330);

    if (this.stage === 1) {
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 20px "Space Grotesk"';
      ctx.textAlign = 'center';
      
      let eqText = `🔒 Digital Safe: 4 × x = ${4 * this.code1}`;
      if (this.room === 2) eqText = `🔒 Terminal: 3x + 5 = ${3 * this.code1 + 5}`;
      if (this.room === 3) eqText = `🔒 Alchemist Cauldron: x ÷ 2 = ${this.code1}`;

      ctx.fillText(eqText, 300, 110);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '15px "Fredoka"';
      ctx.fillText('Tap the button with the correct value of x to crack Digit 1:', 300, 150);

      const choices = [this.code1, this.code1 + 2, Math.max(1, this.code1 - 2), this.code1 + 1];
      choices.forEach((c, idx) => {
        const btnX = 80 + idx * 120;
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(btnX, 260, 100, 50);
        ctx.strokeStyle = '#38bdf8';
        ctx.strokeRect(btnX, 260, 100, 50);
        ctx.fillStyle = '#fde047';
        ctx.font = 'bold 18px "Space Grotesk"';
        ctx.fillText(`x = ${c}`, btnX + 50, 292);
      });
    } else if (this.stage === 2) {
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 20px "Space Grotesk"';
      ctx.textAlign = 'center';

      let patText = `🕰️ Clock Pattern: 3 ➔ 6 ➔ 12 ➔ 24 ➔ ?`;
      if (this.room === 2) patText = `⚡ Cyber Pattern: 1 ➔ 3 ➔ 9 ➔ 27 ➔ ?`;
      if (this.room === 3) patText = `🔮 Rune Pattern: 4 ➔ 8 ➔ 16 ➔ 32 ➔ ?`;

      ctx.fillText(patText, 300, 110);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '15px "Fredoka"';
      ctx.fillText('Identify the multiplication sequence rule and tap the missing number:', 300, 150);

      const choices = [this.code2, this.code2 - 12, this.code2 + 10, this.code2 - 6];
      choices.forEach((c, idx) => {
        const btnX = 80 + idx * 120;
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(btnX, 260, 100, 50);
        ctx.strokeStyle = '#a855f7';
        ctx.strokeRect(btnX, 260, 100, 50);
        ctx.fillStyle = '#fde047';
        ctx.font = 'bold 18px "Space Grotesk"';
        ctx.fillText(`${c}`, btnX + 50, 292);
      });
    } else if (this.stage === 3) {
      ctx.fillStyle = '#ffd500';
      ctx.font = 'bold 22px "Space Grotesk"';
      ctx.textAlign = 'center';
      ctx.fillText(`🎉 ESCAPE KEY CODE: [${this.code1} - ${this.code2}]`, 300, 120);

      ctx.fillStyle = '#58cc02';
      ctx.fillRect(180, 250, 240, 60);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 18px "Space Grotesk"';
      ctx.fillText('🚪 UNLOCK DOOR ➔', 300, 286);
    }
  }
}

// ==========================================================================
// 12. GAME 12: MATH DEFENSE (10-Wave Castle Defense & Boss Golem)
// ==========================================================================
class MathDefenseGame {
  constructor(hub) {
    this.hub = hub;
    this.wave = 1;
    this.maxWaves = 10;
    this.castleHP = 100;
    this.maxCastleHP = 100;
    this.waveTarget = 4;
    this.waveProgress = 0;
    this.enemies = [];
    this.cannonballs = [];
    this.currentQ = null;
    this.score = 0;
    this.combo = 1;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.longestStreak = 0;
    this.currentStreak = 0;
    this.towerType = "Standard Cannon";
  }

  start() {
    this.wave = 1;
    this.castleHP = 100;
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.currentStreak = 0;
    this.waveProgress = 0;
    this.hub.setLevel(`WAVE ${this.wave}/${this.maxWaves}`);
    this.generateWave();
  }

  generateWave() {
    this.waveProgress++;
    let prompt = "";
    let ans = 0;
    let isBossWave = (this.wave === 5 || this.wave === 10);

    if (this.wave <= 2) {
      // Wave 1-2: Core multiplication
      const a = Math.floor(Math.random() * 8) + 2;
      const b = Math.floor(Math.random() * 8) + 2;
      ans = a * b;
      prompt = `${a} × ${b} = ?`;
    } else if (this.wave === 3) {
      // Wave 3: Division fluency
      const div = Math.floor(Math.random() * 8) + 2;
      ans = Math.floor(Math.random() * 9) + 2;
      const dividend = div * ans;
      prompt = `${dividend} ÷ ${div} = ?`;
    } else if (this.wave === 4) {
      // Wave 4: Missing factors
      const factor = Math.floor(Math.random() * 8) + 2;
      ans = Math.floor(Math.random() * 9) + 2;
      prompt = `${factor} × ▢ = ${factor * ans}`;
    } else if (this.wave === 5) {
      // Wave 5: BOSS GOLEM
      const a = 12;
      const b = Math.floor(Math.random() * 7) + 3;
      ans = a * b;
      prompt = `👑 BOSS GOLEM: 12 × ${b} = ?`;
    } else {
      // Wave 6+: Multi-step and advanced arithmetic
      const a = Math.floor(Math.random() * 11) + 2;
      const b = Math.floor(Math.random() * 11) + 2;
      ans = a * b;
      prompt = `${a} × ${b} = ?`;
    }

    this.currentQ = { prompt: prompt, ans: ans, isBoss: isBossWave };
    this.hub.setLevel(`WAVE ${this.wave} (${this.waveProgress}/${this.waveTarget})`);
    this.hub.setPrompt(`🏰 CASTLE DEFENSE: ${prompt}`);

    // Generate 4 enemy targets
    const dist1 = ans + (Math.random() > 0.5 ? 4 : 6);
    const dist2 = Math.max(2, ans - (Math.random() > 0.5 ? 6 : 8));
    const dist3 = ans + (Math.random() > 0.5 ? 10 : 12);

    const values = [ans, dist1, dist2, dist3].sort(() => Math.random() - 0.5);

    const speed = 0.45 + (this.wave * 0.05);

    this.enemies = values.map((val, idx) => ({
      x: 520,
      y: 75 + idx * 75,
      val: val,
      isCorrect: val === ans,
      speed: isBossWave ? speed * 0.75 : speed,
      r: isBossWave ? 30 : 22
    }));
  }

  handlePointer(x, y, type) {
    if (type !== 'down') return;
    this.enemies.forEach(en => {
      if (Math.hypot(x - en.x, y - en.y) <= en.r + 12) {
        // Fire cannon towards enemy
        this.cannonballs.push({ x: 90, y: 210, tx: en.x, ty: en.y, target: en });
        if (window.soundEngine) window.soundEngine.playTap();
      }
    });
  }

  update() {
    this.enemies.forEach(en => {
      en.x -= en.speed;
      if (en.x < 90) {
        // Enemy breached wall -> damage castle
        en.x = 520;
        this.castleHP = Math.max(0, this.castleHP - 15);
        if (window.soundEngine) window.soundEngine.playWrong();
        if (window.helpers) window.helpers.spawnAuraFloatingText("Castle Under Attack! -15 HP 💔", undefined, undefined, false);

        if (this.castleHP <= 0 && !this.hub.isPracticeMode) {
          this.endGame();
        }
      }
    });

    for (let i = this.cannonballs.length - 1; i >= 0; i--) {
      const c = this.cannonballs[i];
      c.x += (c.tx - c.x) * 0.22;
      c.y += (c.ty - c.y) * 0.22;

      if (Math.hypot(c.x - c.tx, c.y - c.ty) < 18) {
        const en = c.target;
        this.cannonballs.splice(i, 1);

        if (en.isCorrect) {
          this.correctCount++;
          this.currentStreak++;
          this.longestStreak = Math.max(this.longestStreak, this.currentStreak);
          this.combo = Math.min(6, 1 + Math.floor(this.currentStreak / 3));

          const pts = 150 * this.combo;
          this.score += pts;
          this.hub.scoreEl.textContent = this.score;
          this.hub.comboTag.textContent = `${this.combo}x COMBO`;

          if (window.soundEngine) window.soundEngine.playBossHit();
          if (window.helpers) window.helpers.spawnAuraFloatingText(`DIRECT HIT! +${pts} Aura 💥`, undefined, undefined, true);

          if (this.waveProgress >= this.waveTarget) {
            // Wave cleared!
            this.wave++;
            this.waveProgress = 0;
            this.castleHP = Math.min(this.maxCastleHP, this.castleHP + 20); // Repair bonus
            this.score += 500;

            if (window.soundEngine) window.soundEngine.playLevelUp();
            if (window.helpers) {
              window.helpers.spawnConfetti(90);
              window.helpers.spawnAuraFloatingText(`🎉 WAVE CLEARED! +500 Bonus Aura`, undefined, undefined, true);
            }

            if (this.wave <= this.maxWaves) {
              this.generateWave();
            } else {
              this.endGame();
            }
          } else {
            this.generateWave();
          }
        } else {
          this.incorrectCount++;
          this.currentStreak = 0;
          this.combo = 1;
          this.hub.comboTag.textContent = '1x COMBO';
          if (window.soundEngine) window.soundEngine.playWrong();
        }
      }
    }
  }

  endGame() {
    const total = this.correctCount + this.incorrectCount;
    const acc = total > 0 ? Math.round((this.correctCount / total) * 100) : 0;
    this.hub.showGameSummary({
      gameName: "Math Defense",
      score: this.score,
      accuracy: acc,
      correct: this.correctCount,
      incorrect: this.incorrectCount,
      longestStreak: this.longestStreak,
      missedSkills: []
    });
  }

  render(ctx) {
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Castle Tower
    ctx.fillStyle = '#334155';
    ctx.fillRect(10, 60, 80, 300);
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 60, 80, 300);

    // Castle HP Bar
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(15, 70, 70, 10);
    const hpPct = this.castleHP / this.maxCastleHP;
    ctx.fillStyle = hpPct > 0.5 ? '#22c55e' : (hpPct > 0.25 ? '#eab308' : '#ef4444');
    ctx.fillRect(15, 70, 70 * hpPct, 10);

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px "Space Grotesk"';
    ctx.textAlign = 'center';
    ctx.fillText(`${this.castleHP} HP`, 50, 95);

    ctx.fillStyle = '#ffd500';
    ctx.font = '36px serif';
    ctx.fillText('🏰', 50, 210);

    // Top Wave Header
    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 16px "Space Grotesk"';
    ctx.textAlign = 'center';
    ctx.fillText(`🛡️ CASTLE DEFENSE • WAVE ${Math.min(this.wave, this.maxWaves)}/10`, 300, 30);

    // Cannonballs
    this.cannonballs.forEach(c => {
      ctx.fillStyle = '#ffd500';
      ctx.beginPath();
      ctx.arc(c.x, c.y, 8, 0, Math.PI * 2);
      ctx.fill();
    });

    // Enemies
    this.enemies.forEach(en => {
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(en.x, en.y, en.r, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 15px "Space Grotesk"';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(en.val, en.x, en.y);
    });
  }
}

// ==========================================================================
// 13. GAME 13: POTION LAB (Liquid Fraction Measurements)
// ==========================================================================
class PotionLabGame {
  constructor(hub) {
    this.hub = hub;
    this.potionNum = 1;
    this.maxPotions = 5;
    this.currentLiquidLevel = 0; // in 1/4 cups (0 to 4)
    this.targetLevel = 3;
    this.targetName = "Dragon Elixir";
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.longestStreak = 0;
    this.currentStreak = 0;
  }

  start() {
    this.potionNum = 1;
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.currentStreak = 0;
    this.generateRecipe();
  }

  generateRecipe() {
    this.currentLiquidLevel = 0;
    const recipes = [
      { name: "Frog Hopper Brew", req: 2, label: "2/4 (1/2) Cup" },
      { name: "Dragon Flame Elixir", req: 3, label: "3/4 Cup" },
      { name: "Phoenix Rebirth Draught", req: 4, label: "4/4 (1 Whole) Cup" },
      { name: "Goblin Invisibility Potion", req: 1, label: "1/4 Cup" },
      { name: "Cosmic Aura Tonic", req: 3, label: "3/4 Cup" }
    ];

    const rec = recipes[Math.min(recipes.length - 1, this.potionNum - 1)];
    this.targetLevel = rec.req;
    this.targetName = rec.name;

    this.hub.setLevel(`POTION ${this.potionNum}/${this.maxPotions}: ${rec.name}`);
    this.hub.setPrompt(`🧪 BREW [${rec.name}]: Fill beaker to ${rec.label}! (Tap '+1/4' or '-1/4')`);
  }

  handlePointer(x, y, type) {
    if (type !== 'down') return;
    // Add +1/4
    if (x >= 120 && x <= 220 && y >= 340 && y <= 390) {
      this.currentLiquidLevel = Math.min(4, this.currentLiquidLevel + 1);
      if (window.soundEngine) window.soundEngine.playTap();
    }
    // Remove -1/4
    else if (x >= 240 && x <= 340 && y >= 340 && y <= 390) {
      this.currentLiquidLevel = Math.max(0, this.currentLiquidLevel - 1);
      if (window.soundEngine) window.soundEngine.playTap();
    }
    // Brew Potion
    else if (x >= 360 && x <= 480 && y >= 340 && y <= 390) {
      if (this.currentLiquidLevel === this.targetLevel) {
        this.correctCount++;
        this.currentStreak++;
        this.longestStreak = Math.max(this.longestStreak, this.currentStreak);

        const pts = 250 * this.potionNum;
        this.score += pts;
        this.hub.scoreEl.textContent = this.score;

        if (window.soundEngine) window.soundEngine.playLevelUp();
        if (window.helpers) {
          window.helpers.spawnConfetti(80);
          window.helpers.spawnAuraFloatingText(`✨ ${this.targetName.toUpperCase()} BREWED! +${pts} Aura`, undefined, undefined, true);
        }

        this.potionNum++;
        if (this.potionNum <= this.maxPotions) {
          this.generateRecipe();
        } else {
          this.endGame();
        }
      } else {
        this.incorrectCount++;
        this.currentStreak = 0;
        if (window.soundEngine) window.soundEngine.playWrong();
        if (window.helpers) window.helpers.spawnAuraFloatingText(`You have ${this.currentLiquidLevel}/4 cup, recipe calls for ${this.targetLevel}/4!`, undefined, undefined, false);
      }
    }
  }

  update() {}

  render(ctx) {
    ctx.fillStyle = '#1e1b4b';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Header
    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 16px "Space Grotesk"';
    ctx.textAlign = 'center';
    ctx.fillText(`🧪 ALCHEMY LAB • POTION ${Math.min(this.potionNum, this.maxPotions)}/5: ${this.targetName}`, 300, 35);

    // Beaker Outline
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4;
    ctx.strokeRect(220, 80, 160, 220);

    // Graduation Lines: 1/4, 2/4 (1/2), 3/4, 1 cup
    for (let i = 1; i <= 4; i++) {
      const lineY = 300 - (i * 55);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.beginPath();
      ctx.moveTo(220, lineY);
      ctx.lineTo(260, lineY);
      ctx.stroke();

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px "Space Grotesk"';
      ctx.fillText(`${i}/4 cup`, 175, lineY + 4);
    }

    // Liquid Fill
    if (this.currentLiquidLevel > 0) {
      const fillH = this.currentLiquidLevel * 55;
      ctx.fillStyle = 'rgba(168, 85, 247, 0.75)';
      ctx.fillRect(222, 300 - fillH, 156, fillH);
    }

    // Buttons
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(120, 340, 100, 44);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 15px "Space Grotesk"';
    ctx.textAlign = 'center';
    ctx.fillText('+ 1/4 Cup', 170, 367);

    ctx.fillStyle = '#ef4444';
    ctx.fillRect(240, 340, 100, 44);
    ctx.fillStyle = '#fff';
    ctx.fillText('- 1/4 Cup', 290, 367);

    ctx.fillStyle = '#58cc02';
    ctx.fillRect(360, 340, 120, 44);
    ctx.fillStyle = '#fff';
    ctx.fillText('BREW ✨', 420, 367);
  }

  endGame() {
    const total = this.correctCount + this.incorrectCount;
    const acc = total > 0 ? Math.round((this.correctCount / total) * 100) : 0;
    this.hub.showGameSummary({
      gameName: "Potion Lab",
      score: this.score,
      accuracy: acc,
      correct: this.correctCount,
      incorrect: this.incorrectCount,
      longestStreak: this.longestStreak,
      missedSkills: []
    });
  }
}

// ==========================================================================
// 14. GAME 14: MATH KART CUP (Adaptive Grand Prix Racing)
// ==========================================================================
class MathKartGame {
  constructor(hub) {
    this.hub = hub;
    this.kartLane = 1; // 0, 1, 2
    this.gates = [];
    this.currentQ = null;
    this.score = 0;
    this.lap = 1;
    this.maxLaps = 3;
    this.gateCount = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.longestStreak = 0;
    this.currentStreak = 0;
  }

  start() {
    this.lap = 1;
    this.gateCount = 0;
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.currentStreak = 0;
    this.hub.setLevel(`LAP ${this.lap}/${this.maxLaps}`);
    this.generateGates();
  }

  generateGates() {
    this.gateCount++;
    if (this.gateCount > 4 && this.lap < this.maxLaps) {
      this.lap++;
      this.gateCount = 1;
      if (window.soundEngine) window.soundEngine.playLevelUp();
      if (window.helpers) window.helpers.spawnAuraFloatingText(`🏁 LAP ${this.lap} BEGUN! SPEED BOOST!`, undefined, undefined, true);
    }

    this.hub.setLevel(`LAP ${this.lap}/${this.maxLaps} (GATE ${this.gateCount}/4)`);

    const a = Math.floor(Math.random() * 8) + 3;
    const b = Math.floor(Math.random() * 8) + 3;
    const ans = a * b;
    this.currentQ = { prompt: `${a} × ${b} = ?`, ans: ans };
    this.hub.setPrompt(`🏎️ LAP ${this.lap}: ${this.currentQ.prompt}`);

    const values = [ans, ans + 4, Math.max(2, ans - 6)].sort(() => Math.random() - 0.5);

    this.gates = values.map((val, idx) => ({
      lane: idx,
      x: 160 + idx * 140,
      y: -40,
      val: val,
      isCorrect: val === ans
    }));
  }

  handleInput(code) {
    if ((code === 'ArrowLeft' || code === 'KeyA') && this.kartLane > 0) {
      this.kartLane--;
      if (window.soundEngine) window.soundEngine.playTap();
    } else if ((code === 'ArrowRight' || code === 'KeyD') && this.kartLane < 2) {
      this.kartLane++;
      if (window.soundEngine) window.soundEngine.playTap();
    }
  }

  update() {
    if (this.gates.length === 0) return;

    // Advance all gates in row
    this.gates.forEach(g => { g.y += 1.6 + (this.lap * 0.2); });

    const gateY = this.gates[0].y;

    // Check hit when gate crosses kart position (y=340 to 365)
    if (gateY >= 340 && gateY <= 365) {
      const chosenGate = this.gates.find(g => g.lane === this.kartLane);
      if (chosenGate) {
        if (chosenGate.isCorrect) {
          this.correctCount++;
          this.currentStreak++;
          this.longestStreak = Math.max(this.longestStreak, this.currentStreak);

          const pts = 200 * this.lap;
          this.score += pts;
          this.hub.scoreEl.textContent = this.score;

          if (window.soundEngine) window.soundEngine.playLevelUp();
          if (window.helpers) window.helpers.spawnAuraFloatingText("TURBO BOOST! 🏎️💨", undefined, undefined, true);

          if (this.lap >= this.maxLaps && this.gateCount >= 4 && !this.hub.isPracticeMode) {
            this.endGame();
          } else {
            this.generateGates();
          }
        } else {
          this.incorrectCount++;
          this.currentStreak = 0;
          if (window.soundEngine) window.soundEngine.playWrong();
          this.generateGates();
        }
      }
    } else if (gateY > 430) {
      // Missed all gates
      this.incorrectCount++;
      this.currentStreak = 0;
      this.generateGates();
    }
  }

  render(ctx) {
    ctx.fillStyle = '#022c22';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Track
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(100, 0, 400, 420);

    // Lane Lines
    ctx.strokeStyle = '#ffd500';
    ctx.lineWidth = 3;
    ctx.setLineDash([20, 20]);
    ctx.beginPath();
    ctx.moveTo(230, 0); ctx.lineTo(230, 420);
    ctx.moveTo(370, 0); ctx.lineTo(370, 420);
    ctx.stroke();
    ctx.setLineDash([]);

    // Overhead Road Banner with Math Question (Direct in eye-line)
    ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
    ctx.fillRect(110, 8, 380, 36);
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2;
    ctx.strokeRect(110, 8, 380, 36);
    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 18px "Space Grotesk"';
    ctx.textAlign = 'center';
    ctx.fillText(`🏎️ LAP ${this.lap}: ${this.currentQ.prompt}`, 300, 32);

    // Gate arches
    this.gates.forEach(g => {
      ctx.fillStyle = '#047857';
      ctx.fillRect(g.x - 45, g.y - 15, 90, 30);
      ctx.strokeStyle = '#10b981';
      ctx.strokeRect(g.x - 45, g.y - 15, 90, 30);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 16px "Space Grotesk"';
      ctx.textAlign = 'center';
      ctx.fillText(g.val, g.x, g.y + 6);
    });

    // Kart
    const kartX = 160 + this.kartLane * 140;
    ctx.font = '36px serif';
    ctx.textAlign = 'center';
    ctx.fillText('🏎️', kartX, 360);
  }

  endGame() {
    const total = this.correctCount + this.incorrectCount;
    const acc = total > 0 ? Math.round((this.correctCount / total) * 100) : 0;

    this.hub.showGameSummary({
      gameName: "Math Kart Cup",
      score: this.score,
      accuracy: acc,
      correct: this.correctCount,
      incorrect: this.incorrectCount,
      longestStreak: this.longestStreak,
      missedSkills: []
    });
  }
}

// ==========================================================================
// 15. GAME 15: SPACE COORDINATES (Grid Plotting & Reflections)
// ==========================================================================
class SpaceCoordinatesGame {
  constructor(hub) {
    this.hub = hub;
    this.sector = 1;
    this.maxSectors = 5;
    this.targetX = 4;
    this.targetY = 3;
    this.planetName = "Mars Outpost";
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.longestStreak = 0;
    this.currentStreak = 0;
  }

  start() {
    this.sector = 1;
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.currentStreak = 0;
    this.generateMission();
  }

  generateMission() {
    const planets = [
      { name: "Mars Outpost", x: 3, y: 2 },
      { name: "Jupiter Station", x: 5, y: 4 },
      { name: "Saturn Rings", x: 6, y: 1 },
      { name: "Neptune Void", x: 2, y: 5 },
      { name: "Galaxy Core Portal", x: 7, y: 3 }
    ];

    const p = planets[Math.min(planets.length - 1, this.sector - 1)];
    this.targetX = p.x;
    this.targetY = p.y;
    this.planetName = p.name;

    this.hub.setLevel(`SECTOR ${this.sector}/${this.maxSectors}: ${p.name}`);
    this.hub.setPrompt(`🌌 [SECTOR ${this.sector}]: Fly starship to (${this.targetX}, ${this.targetY})!`);
  }

  handlePointer(x, y, type) {
    if (type !== 'down') return;
    const originX = 140;
    const originY = 320;
    const gridStep = 45;

    const clickedGridX = Math.round((x - originX) / gridStep);
    const clickedGridY = Math.round((originY - y) / gridStep);

    if (clickedGridX === this.targetX && clickedGridY === this.targetY) {
      this.correctCount++;
      this.currentStreak++;
      this.longestStreak = Math.max(this.longestStreak, this.currentStreak);

      const pts = 250 * this.sector;
      this.score += pts;
      this.hub.scoreEl.textContent = this.score;

      if (window.soundEngine) window.soundEngine.playLevelUp();
      if (window.helpers) {
        window.helpers.spawnConfetti(90);
        window.helpers.spawnAuraFloatingText(`🪐 ${this.planetName.toUpperCase()} DISCOVERED! +${pts} Aura`, undefined, undefined, true);
      }

      this.sector++;
      if (this.sector <= this.maxSectors) {
        this.generateMission();
      } else {
        this.endGame();
      }
    } else {
      this.incorrectCount++;
      this.currentStreak = 0;
      if (window.soundEngine) window.soundEngine.playWrong();
      if (window.helpers) window.helpers.spawnAuraFloatingText(`Tapped (${clickedGridX}, ${clickedGridY}), target was (${this.targetX}, ${this.targetY})!`, undefined, undefined, false);
    }
  }

  update() {}

  render(ctx) {
    ctx.fillStyle = '#050212';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Header
    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 16px "Space Grotesk"';
    ctx.textAlign = 'center';
    ctx.fillText(`🌌 GALAXY SECTOR ${Math.min(this.sector, this.maxSectors)}/5: ${this.planetName}`, 300, 30);

    const originX = 140;
    const originY = 320;
    const gridStep = 45;

    // Grid lines
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
    ctx.lineWidth = 1;
    for (let gx = 0; gx <= 7; gx++) {
      ctx.beginPath();
      ctx.moveTo(originX + gx * gridStep, 60);
      ctx.lineTo(originX + gx * gridStep, originY);
      ctx.stroke();
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px "Space Grotesk"';
      ctx.fillText(gx, originX + gx * gridStep, originY + 16);
    }
    for (let gy = 0; gy <= 5; gy++) {
      ctx.beginPath();
      ctx.moveTo(originX, originY - gy * gridStep);
      ctx.lineTo(originX + 7 * gridStep, originY - gy * gridStep);
      ctx.stroke();
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(gy, originX - 16, originY - gy * gridStep + 4);
    }

    // Axes
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(originX, 50); ctx.lineTo(originX, originY); ctx.lineTo(originX + 330, originY);
    ctx.stroke();

    ctx.fillStyle = '#ffd500';
    ctx.fillText('X Axis ➔', originX + 280, originY + 32);
    ctx.fillText('Y Axis ▲', originX - 40, 70);
  }

  endGame() {
    const total = this.correctCount + this.incorrectCount;
    const acc = total > 0 ? Math.round((this.correctCount / total) * 100) : 0;
    this.hub.showGameSummary({
      gameName: "Space Coordinates",
      score: this.score,
      accuracy: acc,
      correct: this.correctCount,
      incorrect: this.incorrectCount,
      longestStreak: this.longestStreak,
      missedSkills: []
    });
  }
}

// ==========================================================================
// 16. GAME 16: MATH DETECTIVE (Episodic Case Files & Deduction)
// ==========================================================================
class MathDetectiveGame {
  constructor(hub) {
    this.hub = hub;
    this.caseId = 1;
    this.maxCases = 2;
    this.clueStep = 1; // 1: Locker Code, 2: Room Mystery, 3: Footprints, 4: Suspect Lineup
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.longestStreak = 0;
    this.currentStreak = 0;
    this.currentCase = null;
    this.eliminatedSuspects = new Set();
  }

  start() {
    this.caseId = 1;
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.currentStreak = 0;
    this.loadCase();
  }

  loadCase() {
    this.clueStep = 1;
    this.eliminatedSuspects.clear();

    if (this.caseId === 1) {
      this.currentCase = {
        title: "The Missing Trophy",
        clue1: { prompt: "The thief's locker number is: 6 × 7 = ?", ans: 42, options: [28, 35, 42, 56] },
        clue2: { prompt: "Inside Locker 42 is a note: 'Add 8 to my secret number to get 21 (x + 8 = 21).'", ans: 13, options: [11, 12, 13, 14], label: "Room" },
        clue3: { prompt: "In Room 13, the thief stepped on the footprint equal to 3/4:", ans: 0.75, options: [0.60, 0.75, 0.50, 0.80] },
        clue4: {
          prompt: "The thief's locker number is divisible by both 7 and 6:",
          suspects: [
            { name: "Ava", locker: 28, alibi: "Was at library" },
            { name: "Ben", locker: 35, alibi: "Was at cafeteria" },
            { name: "Chris", locker: 42, alibi: "Seen near trophy case" },
            { name: "Maya", locker: 56, alibi: "Was in art studio" }
          ],
          culprit: "Chris"
        }
      };
    } else {
      this.currentCase = {
        title: "The Museum Diamond Heist",
        clue1: { prompt: "The laser vault keypad code is: 8 × 9 = ?", ans: 72, options: [54, 64, 72, 81] },
        clue2: { prompt: "Inside Vault 72 is a note: 'Subtract 14 from secret number to get 36 (x - 14 = 36).'", ans: 50, options: [40, 45, 50, 55], label: "Sector" },
        clue3: { prompt: "In Sector 50, the suspect stepped on the footprint equal to 4/5:", ans: 0.80, options: [0.45, 0.70, 0.80, 0.95] },
        clue4: {
          prompt: "The thief's security ID is divisible by both 8 and 9:",
          suspects: [
            { name: "Liam", locker: 54, alibi: "Security guard on break" },
            { name: "Noah", locker: 64, alibi: "Curator in office" },
            { name: "Victor", locker: 72, alibi: "Janitor seen in vault" },
            { name: "Emma", locker: 81, alibi: "Tour guide at lobby" }
          ],
          culprit: "Victor"
        }
      };
    }

    this.updateHUDPrompt();
  }

  updateHUDPrompt() {
    this.hub.setLevel(`CASE ${this.caseId}: ${this.currentCase.title} (CLUE ${this.clueStep}/4)`);
    if (this.clueStep === 1) this.hub.setPrompt(`🕵️ CLUE 1/4: ${this.currentCase.clue1.prompt}`);
    else if (this.clueStep === 2) this.hub.setPrompt(`🕵️ CLUE 2/4: ${this.currentCase.clue2.prompt}`);
    else if (this.clueStep === 3) this.hub.setPrompt(`🕵️ CLUE 3/4: ${this.currentCase.clue3.prompt}`);
    else if (this.clueStep === 4) this.hub.setPrompt(`🕵️ CLUE 4/4: ${this.currentCase.clue4.prompt}`);
  }

  handlePointer(x, y, type) {
    if (type !== 'down') return;

    if (this.clueStep === 1) {
      const c = this.currentCase.clue1;
      const clicked = this.getOptionClicked(x, y, c.options.length);
      if (clicked !== -1) {
        if (c.options[clicked] === c.ans) {
          this.advanceClue(`Locker ${c.ans} Unlocked! 🔓`);
        } else {
          this.triggerMistake(`Locker ${c.options[clicked]} is empty!`);
        }
      }
    } else if (this.clueStep === 2) {
      const c = this.currentCase.clue2;
      const clicked = this.getOptionClicked(x, y, c.options.length);
      if (clicked !== -1) {
        if (c.options[clicked] === c.ans) {
          this.advanceClue(`${c.label} ${c.ans} Located! 🚪`);
        } else {
          this.triggerMistake(`Wrong ${c.label}! Need x = ${c.ans}`);
        }
      }
    } else if (this.clueStep === 3) {
      const c = this.currentCase.clue3;
      const clicked = this.getOptionClicked(x, y, c.options.length);
      if (clicked !== -1) {
        if (c.options[clicked] === c.ans) {
          this.advanceClue(`Footprint Evidence Matched (${c.ans})! 👣✨`);
        } else {
          this.triggerMistake(`Incorrect footprint value!`);
        }
      }
    } else if (this.clueStep === 4) {
      const c = this.currentCase.clue4;
      const clicked = this.getOptionClicked(x, y, c.suspects.length);
      if (clicked !== -1) {
        const chosen = c.suspects[clicked];
        if (chosen.name === c.culprit) {
          // Solved case!
          this.correctCount++;
          this.currentStreak++;
          this.longestStreak = Math.max(this.longestStreak, this.currentStreak);
          this.score += 500;
          this.hub.scoreEl.textContent = this.score;

          if (window.soundEngine) window.soundEngine.playLevelUp();
          if (window.helpers) {
            window.helpers.spawnConfetti(110);
            window.helpers.spawnAuraFloatingText(`🏆 CASE SOLVED! ${c.culprit} APPREHENDED!`, undefined, undefined, true);
          }

          this.caseId++;
          if (this.caseId <= this.maxCases) {
            this.loadCase();
          } else {
            this.endGame();
          }
        } else {
          this.eliminatedSuspects.add(chosen.name);
          this.triggerMistake(`${chosen.name} eliminated: ${chosen.locker} is not divisible by both!`);
        }
      }
    }
  }

  getOptionClicked(x, y, count) {
    if (y >= 260 && y <= 330) {
      for (let i = 0; i < count; i++) {
        const btnX = 60 + i * 130;
        if (x >= btnX && x <= btnX + 115) return i;
      }
    }
    return -1;
  }

  advanceClue(msg) {
    this.correctCount++;
    this.currentStreak++;
    this.longestStreak = Math.max(this.longestStreak, this.currentStreak);
    this.score += 250;
    this.hub.scoreEl.textContent = this.score;

    if (window.soundEngine) window.soundEngine.playCorrect();
    if (window.helpers) {
      window.helpers.spawnConfetti(60);
      window.helpers.spawnAuraFloatingText(msg, undefined, undefined, true);
    }

    this.clueStep++;
    this.updateHUDPrompt();
  }

  triggerMistake(msg) {
    this.incorrectCount++;
    this.currentStreak = 0;
    if (window.soundEngine) window.soundEngine.playWrong();
    if (window.helpers) window.helpers.spawnAuraFloatingText(msg, undefined, undefined, false);
  }

  update() {}

  render(ctx) {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Detective Notebook Dossier Frame
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(30, 20, 540, 370);
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 20, 540, 370);

    // Case Header
    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 18px "Space Grotesk"';
    ctx.textAlign = 'center';
    ctx.fillText(`🕵️ CASE FILE: ${this.currentCase.title.toUpperCase()}`, 300, 52);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '13px "Space Grotesk"';
    ctx.fillText(`Evidence Dossier • Clue Step ${this.clueStep}/4`, 300, 74);

    if (this.clueStep === 1) {
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 18px "Space Grotesk"';
      ctx.fillText(this.currentCase.clue1.prompt, 300, 140);
      ctx.fillStyle = '#38bdf8';
      ctx.font = '14px "Fredoka"';
      ctx.fillText('Tap the locker with the correct multiplication product:', 300, 180);

      this.currentCase.clue1.options.forEach((opt, idx) => {
        const btnX = 60 + idx * 130;
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(btnX, 260, 115, 65);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.strokeRect(btnX, 260, 115, 65);

        ctx.fillStyle = '#ffd500';
        ctx.font = 'bold 18px "Space Grotesk"';
        ctx.fillText(`🚪 #${opt}`, btnX + 57, 298);
      });
    } else if (this.clueStep === 2) {
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 18px "Space Grotesk"';
      ctx.fillText(this.currentCase.clue2.prompt, 300, 130);
      ctx.fillStyle = '#38bdf8';
      ctx.font = '14px "Fredoka"';
      ctx.fillText(`Solve for the missing variable to find the correct ${this.currentCase.clue2.label}:`, 300, 180);

      this.currentCase.clue2.options.forEach((opt, idx) => {
        const btnX = 60 + idx * 130;
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(btnX, 260, 115, 65);
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 2;
        ctx.strokeRect(btnX, 260, 115, 65);

        ctx.fillStyle = '#ffd500';
        ctx.font = 'bold 17px "Space Grotesk"';
        ctx.fillText(`${this.currentCase.clue2.label} ${opt}`, btnX + 57, 298);
      });
    } else if (this.clueStep === 3) {
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 18px "Space Grotesk"';
      ctx.fillText(this.currentCase.clue3.prompt, 300, 140);
      ctx.fillStyle = '#38bdf8';
      ctx.font = '14px "Fredoka"';
      ctx.fillText('Tap the matching decimal footprint to collect physical evidence:', 300, 180);

      this.currentCase.clue3.options.forEach((opt, idx) => {
        const btnX = 60 + idx * 130;
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(btnX, 260, 115, 65);
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 2;
        ctx.strokeRect(btnX, 260, 115, 65);

        ctx.fillStyle = '#ffd500';
        ctx.font = 'bold 18px "Space Grotesk"';
        ctx.fillText(`👣 ${opt}`, btnX + 57, 298);
      });
    } else if (this.clueStep === 4) {
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 16px "Space Grotesk"';
      ctx.fillText(this.currentCase.clue4.prompt, 300, 120);
      ctx.fillStyle = '#fde047';
      ctx.font = '13px "Fredoka"';
      ctx.fillText('Tap the guilty suspect to arrest the culprit and solve the case!', 300, 150);

      this.currentCase.clue4.suspects.forEach((s, idx) => {
        const btnX = 60 + idx * 130;
        const isEliminated = this.eliminatedSuspects.has(s.name);

        ctx.fillStyle = isEliminated ? '#334155' : '#0f172a';
        ctx.fillRect(btnX, 230, 115, 110);
        ctx.strokeStyle = isEliminated ? '#ef4444' : '#eab308';
        ctx.lineWidth = 2;
        ctx.strokeRect(btnX, 230, 115, 110);

        ctx.fillStyle = isEliminated ? '#94a3b8' : '#fff';
        ctx.font = 'bold 16px "Space Grotesk"';
        ctx.fillText(isEliminated ? `❌ ${s.name}` : `👤 ${s.name}`, btnX + 57, 260);

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 13px "Space Grotesk"';
        ctx.fillText(`Locker: ${s.locker}`, btnX + 57, 285);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px "Space Grotesk"';
        ctx.fillText(s.alibi, btnX + 57, 312);
      });
    }
  }

  endGame() {
    const total = this.correctCount + this.incorrectCount;
    const acc = total > 0 ? Math.round((this.correctCount / total) * 100) : 0;
    this.hub.showGameSummary({
      gameName: "Math Detective",
      score: this.score,
      accuracy: acc,
      correct: this.correctCount,
      incorrect: this.incorrectCount,
      longestStreak: this.longestStreak,
      missedSkills: []
    });
  }
}

// ==========================================================================
// 17. GAME 17: MATH GRID JIGSAW (Snap-To-Grid Math Picture Puzzle)
// ==========================================================================
class MathGridJigsawGame {
  constructor(hub) {
    this.hub = hub;
    this.puzzleLevel = 1;
    this.maxPuzzles = 3;
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.longestStreak = 0;
    this.currentStreak = 0;
    this.selectedTileIdx = null;
    this.gridNumbers = [];
    this.trayTiles = [];
    this.placedTiles = new Map(); // gridIdx -> tile
    this.puzzleName = "Diamond Sword";
  }

  start() {
    this.puzzleLevel = 1;
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.currentStreak = 0;
    this.loadPuzzle();
  }

  loadPuzzle() {
    this.placedTiles.clear();
    this.selectedTileIdx = null;

    if (this.puzzleLevel === 1) {
      this.puzzleName = "Diamond Sword";
      this.gridNumbers = [9, 12, 16, 24, 36, 42, 48, 54, 72];
      this.trayTiles = [
        { id: 0, eq: "72 ÷ 8", ans: 9, icon: "💎" },
        { id: 1, eq: "48 ÷ 4", ans: 12, icon: "⚔️" },
        { id: 2, eq: "4 × 4", ans: 16, icon: "✨" },
        { id: 3, eq: "4 × 6", ans: 24, icon: "🛡️" },
        { id: 4, eq: "6 × 6", ans: 36, icon: "💎" },
        { id: 5, eq: "6 × 7", ans: 42, icon: "⚔️" },
        { id: 6, eq: "8 × 6", ans: 48, icon: "✨" },
        { id: 7, eq: "6 × 9", ans: 54, icon: "🗡️" },
        { id: 8, eq: "9 × 8", ans: 72, icon: "👑" }
      ].sort(() => Math.random() - 0.5);
    } else if (this.puzzleLevel === 2) {
      this.puzzleName = "Phonk Drift Racecar";
      this.gridNumbers = [8, 14, 18, 25, 30, 45, 60, 63, 81];
      this.trayTiles = [
        { id: 0, eq: "56 ÷ 7", ans: 8, icon: "🏎️" },
        { id: 1, eq: "2 × 7", ans: 14, icon: "⚡" },
        { id: 2, eq: "3 × 6", ans: 18, icon: "🔥" },
        { id: 3, eq: "5 × 5", ans: 25, icon: "🏁" },
        { id: 4, eq: "6 × 5", ans: 30, icon: "🏎️" },
        { id: 5, eq: "9 × 5", ans: 45, icon: "⚡" },
        { id: 6, eq: "12 × 5", ans: 60, icon: "🔥" },
        { id: 7, eq: "7 × 9", ans: 63, icon: "💨" },
        { id: 8, eq: "9 × 9", ans: 81, icon: "🏆" }
      ].sort(() => Math.random() - 0.5);
    } else {
      this.puzzleName = "Ender Dragon";
      this.gridNumbers = [7, 15, 21, 28, 32, 49, 56, 64, 96];
      this.trayTiles = [
        { id: 0, eq: "49 ÷ 7", ans: 7, icon: "🐉" },
        { id: 1, eq: "3 × 5", ans: 15, icon: "🔮" },
        { id: 2, eq: "3 × 7", ans: 21, icon: "🌌" },
        { id: 3, eq: "4 × 7", ans: 28, icon: "👁️" },
        { id: 4, eq: "8 × 4", ans: 32, icon: "🐉" },
        { id: 5, eq: "7 × 7", ans: 49, icon: "🔮" },
        { id: 6, eq: "8 × 7", ans: 56, icon: "🌌" },
        { id: 7, eq: "8 × 8", ans: 64, icon: "🔥" },
        { id: 8, eq: "12 × 8", ans: 96, icon: "👑" }
      ].sort(() => Math.random() - 0.5);
    }

    this.hub.setLevel(`PUZZLE ${this.puzzleLevel}/${this.maxPuzzles}: ${this.puzzleName}`);
    this.hub.setPrompt(`🧩 JIGSAW [${this.puzzleName}]: Tap a math tile on right, then tap its matching grid coordinate!`);
  }

  handlePointer(x, y, type) {
    if (type !== 'down') return;

    // Check click on Right Tray Tiles (x: 350 to 570, y: 70 to 360)
    for (let i = 0; i < this.trayTiles.length; i++) {
      const tile = this.trayTiles[i];
      if (Array.from(this.placedTiles.values()).includes(tile)) continue;

      const col = i % 3;
      const row = Math.floor(i / 3);
      const tx = 350 + col * 75;
      const ty = 90 + row * 90;

      if (x >= tx && x <= tx + 65 && y >= ty && y <= ty + 75) {
        this.selectedTileIdx = i;
        if (window.soundEngine) window.soundEngine.playTap();
        return;
      }
    }

    // Check click on Left 3x3 Grid Cells (x: 40 to 300, y: 80 to 360)
    if (this.selectedTileIdx !== null) {
      const selectedTile = this.trayTiles[this.selectedTileIdx];

      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          const gridIdx = r * 3 + c;
          const targetNum = this.gridNumbers[gridIdx];
          const gx = 45 + c * 85;
          const gy = 90 + r * 85;

          if (x >= gx && x <= gx + 75 && y >= gy && y <= gy + 75) {
            if (this.placedTiles.has(gridIdx)) {
              if (window.helpers) window.helpers.spawnAuraFloatingText("Cell already filled!", undefined, undefined, false);
              return;
            }

            if (selectedTile.ans === targetNum) {
              // Correct snap!
              this.placedTiles.set(gridIdx, selectedTile);
              this.selectedTileIdx = null;
              this.correctCount++;
              this.currentStreak++;
              this.longestStreak = Math.max(this.longestStreak, this.currentStreak);

              const pts = 150 * this.puzzleLevel;
              this.score += pts;
              this.hub.scoreEl.textContent = this.score;

              if (window.soundEngine) window.soundEngine.playLevelUp();
              if (window.helpers) {
                window.helpers.spawnConfetti(50);
                window.helpers.spawnAuraFloatingText(`PIECE SNAPPED! ${selectedTile.eq} = ${targetNum} 🧩✨`, undefined, undefined, true);
              }

              // Check if entire jigsaw complete
              if (this.placedTiles.size === 9) {
                this.score += 500;
                if (window.soundEngine) window.soundEngine.playLevelUp();
                if (window.helpers) {
                  window.helpers.spawnConfetti(120);
                  window.helpers.spawnAuraFloatingText(`🎉 ${this.puzzleName.toUpperCase()} FULLY ASSEMBLED! +500 Bonus Aura`, undefined, undefined, true);
                }

                this.puzzleLevel++;
                if (this.puzzleLevel <= this.maxPuzzles) {
                  this.loadPuzzle();
                } else {
                  this.endGame();
                }
              }
            } else {
              this.incorrectCount++;
              this.currentStreak = 0;
              if (window.soundEngine) window.soundEngine.playWrong();
              if (window.helpers) window.helpers.spawnAuraFloatingText(`${selectedTile.eq} = ${selectedTile.ans}, not ${targetNum}!`, undefined, undefined, false);
            }
            return;
          }
        }
      }
    }
  }

  update() {}

  render(ctx) {
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Header
    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 16px "Space Grotesk"';
    ctx.textAlign = 'center';
    ctx.fillText(`🧩 MATH GRID JIGSAW • ${this.puzzleName.toUpperCase()} (${this.placedTiles.size}/9 TILES)`, 300, 32);

    // Left Grid Board
    ctx.fillStyle = '#1e1b4b';
    ctx.fillRect(35, 75, 275, 275);
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 3;
    ctx.strokeRect(35, 75, 275, 275);

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const gridIdx = r * 3 + c;
        const targetNum = this.gridNumbers[gridIdx];
        const gx = 45 + c * 85;
        const gy = 85 + r * 85;

        if (this.placedTiles.has(gridIdx)) {
          const placed = this.placedTiles.get(gridIdx);
          ctx.fillStyle = '#059669';
          ctx.fillRect(gx, gy, 75, 75);
          ctx.strokeStyle = '#34d399';
          ctx.lineWidth = 2;
          ctx.strokeRect(gx, gy, 75, 75);

          ctx.font = '28px serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(placed.icon, gx + 37, gy + 37);
        } else {
          ctx.fillStyle = '#312e81';
          ctx.fillRect(gx, gy, 75, 75);
          ctx.strokeStyle = '#4338ca';
          ctx.lineWidth = 2;
          ctx.strokeRect(gx, gy, 75, 75);

          ctx.fillStyle = '#ffd500';
          ctx.font = 'bold 20px "Space Grotesk"';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(targetNum, gx + 37, gy + 37);
        }
      }
    }

    // Right Tray
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(335, 75, 240, 275);
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.strokeRect(335, 75, 240, 275);

    ctx.fillStyle = '#a5b4fc';
    ctx.font = 'bold 12px "Space Grotesk"';
    ctx.fillText('PUZZLE PIECES TRAY', 455, 65);

    for (let i = 0; i < this.trayTiles.length; i++) {
      const tile = this.trayTiles[i];
      const isPlaced = Array.from(this.placedTiles.values()).includes(tile);
      const isSelected = this.selectedTileIdx === i;

      const col = i % 3;
      const row = Math.floor(i / 3);
      const tx = 345 + col * 75;
      const ty = 85 + row * 85;

      if (isPlaced) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fillRect(tx, ty, 68, 75);
      } else {
        ctx.fillStyle = isSelected ? '#ec4899' : '#334155';
        ctx.fillRect(tx, ty, 68, 75);
        ctx.strokeStyle = isSelected ? '#fff' : '#64748b';
        ctx.lineWidth = isSelected ? 3 : 1;
        ctx.strokeRect(tx, ty, 68, 75);

        ctx.font = '20px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(tile.icon, tx + 34, ty + 24);

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px "Space Grotesk"';
        ctx.fillText(tile.eq, tx + 34, ty + 54);
      }
    }

    // Bottom Hint
    ctx.fillStyle = '#94a3b8';
    ctx.font = '13px "Fredoka"';
    ctx.textAlign = 'center';
    ctx.fillText('Match each equation to its solution on the grid to assemble the full artwork!', 300, 390);
  }

  endGame() {
    const total = this.correctCount + this.incorrectCount;
    const acc = total > 0 ? Math.round((this.correctCount / total) * 100) : 0;
    this.hub.showGameSummary({
      gameName: "Math Grid Jigsaw",
      score: this.score,
      accuracy: acc,
      correct: this.correctCount,
      incorrect: this.incorrectCount,
      longestStreak: this.longestStreak,
      missedSkills: []
    });
  }
}

// ==========================================================================
// 18. GAME 18: CODE BREAKER (Patterns, Function Machines & Deduction)
// ==========================================================================
class CodeBreakerGame {
  constructor(hub) {
    this.hub = hub;
    this.stage = 1; // 1: Number Patterns, 2: Function Machines, 3: Mastermind Secret Code
    this.maxStages = 3;
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.currentStreak = 0;
    this.longestStreak = 0;
    this.feedbackMsg = "";
    this.feedbackColor = "#ffd500";
    this.vaultState = "locked"; // "locked", "opening", "opened"
    this.vaultAngle = 0;
    this.particles = [];
    this.activeQuestion = null;

    // Mastermind State
    this.mastermindSecret = [];
    this.currentGuess = [0, 0, 0];
    this.guessSlot = 0;
    this.mastermindHistory = []; // { guess: [4,7,2], exact: 1, partial: 1 }
    this.maxAttempts = 6;
  }

  start() {
    this.stage = 1;
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.currentStreak = 0;
    this.longestStreak = 0;
    this.vaultState = "locked";
    this.vaultAngle = 0;
    this.particles = [];
    this.nextChallenge();
  }

  nextChallenge() {
    this.vaultState = "locked";
    this.feedbackMsg = "";

    if (this.stage === 1) {
      // Geometric & Arithmetic Sequences
      this.hub.setLevel("STAGE 1: PATTERNS");
      const patterns = [
        { seq: [2, 4, 8, 16, "?"], ans: 32, rule: "Multiply by 2 (×2)", opts: [24, 30, 32, 64] },
        { seq: [3, 9, 27, "?"], ans: 81, rule: "Multiply by 3 (×3)", opts: [54, 81, 72, 90] },
        { seq: [5, 11, 17, 23, "?"], ans: 29, rule: "Add 6 (+6)", opts: [27, 29, 31, 35] },
        { seq: [1, 4, 9, 16, 25, "?"], ans: 36, rule: "Perfect Squares (n²)", opts: [30, 35, 36, 49] },
        { seq: [100, 85, 70, 55, "?"], ans: 40, rule: "Subtract 15 (-15)", opts: [45, 40, 35, 30] },
        { seq: [2, 6, 18, 54, "?"], ans: 162, rule: "Multiply by 3 (×3)", opts: [108, 150, 162, 180] }
      ];
      this.activeQuestion = patterns[Math.floor(Math.random() * patterns.length)];
      this.hub.setPrompt(`PATTERN: ${this.activeQuestion.seq.join("   ")} ➔ Enter Next Number`);
    } else if (this.stage === 2) {
      // Function Machine (x -> f(x))
      this.hub.setLevel("STAGE 2: FUNCTION MACHINE");
      const funcs = [
        { in1: 3, out1: 12, in2: 5, out2: 20, in3: 7, out3: 28, queryIn: 9, ans: 36, rule: "Rule: Output = Input × 4", opts: [27, 32, 36, 45] },
        { in1: 2, out1: 7, in2: 4, out2: 13, in3: 6, out3: 19, queryIn: 8, ans: 25, rule: "Rule: Output = (Input × 3) + 1", opts: [21, 24, 25, 27] },
        { in1: 12, out1: 6, in2: 20, out2: 10, in3: 32, out3: 16, queryIn: 48, ans: 24, rule: "Rule: Output = Input ÷ 2", opts: [18, 20, 24, 28] },
        { in1: 4, out1: 17, in2: 5, out2: 26, in3: 6, out3: 37, queryIn: 7, ans: 50, rule: "Rule: Output = (Input × Input) + 1", opts: [42, 48, 50, 56] }
      ];
      this.activeQuestion = funcs[Math.floor(Math.random() * funcs.length)];
      this.hub.setPrompt(`FUNCTION: [ ${this.activeQuestion.in1}➔${this.activeQuestion.out1} | ${this.activeQuestion.in2}➔${this.activeQuestion.out2} ] What is [ ${this.activeQuestion.queryIn} ➔ ? ]`);
    } else {
      // Mastermind Code Cracker
      this.hub.setLevel("STAGE 3: MASTERMIND VAULT");
      const d1 = Math.floor(Math.random() * 8) + 1;
      let d2 = Math.floor(Math.random() * 8) + 1;
      while (d2 === d1) d2 = Math.floor(Math.random() * 8) + 1;
      let d3 = Math.floor(Math.random() * 8) + 1;
      while (d3 === d1 || d3 === d2) d3 = Math.floor(Math.random() * 8) + 1;
      this.mastermindSecret = [d1, d2, d3];
      this.currentGuess = [1, 2, 3];
      this.guessSlot = 0;
      this.mastermindHistory = [];
      this.hub.setPrompt(`MASTERMIND: Crack the 3-Digit Vault Code! (🟢 Exact | 🟡 Partial | ⚫ Miss)`);
    }
  }

  handlePointer(x, y, type) {
    if (type !== 'down') return;

    if (this.vaultState === 'opened') {
      if (this.stage < this.maxStages) {
        this.stage++;
        this.nextChallenge();
      } else {
        this.endGame();
      }
      return;
    }

    if (this.stage === 1 || this.stage === 2) {
      // Option Buttons (x: 100, 220, 340, 460, y: 340, w: 100, h: 48)
      const opts = this.activeQuestion.opts || [];
      for (let i = 0; i < opts.length; i++) {
        const bx = 65 + i * 125;
        const by = 330;
        if (x >= bx && x <= bx + 110 && y >= by && y <= by + 50) {
          this.submitOption(opts[i]);
          return;
        }
      }
    } else if (this.stage === 3) {
      // Mastermind Interactive Slots & Keypad
      // Slot increment/decrement buttons
      for (let s = 0; s < 3; s++) {
        const sx = 210 + s * 70;
        // Up arrow (y: 200..230)
        if (x >= sx && x <= sx + 50 && y >= 195 && y <= 225) {
          this.currentGuess[s] = (this.currentGuess[s] % 9) + 1;
          if (window.soundEngine) window.soundEngine.playTap();
          return;
        }
        // Down arrow (y: 285..315)
        if (x >= sx && x <= sx + 50 && y >= 285 && y <= 315) {
          this.currentGuess[s] = this.currentGuess[s] <= 1 ? 9 : this.currentGuess[s] - 1;
          if (window.soundEngine) window.soundEngine.playTap();
          return;
        }
      }

      // Submit Guess Button (x: 440..560, y: 230..280)
      if (x >= 440 && x <= 560 && y >= 230 && y <= 280) {
        this.submitMastermindGuess();
        return;
      }
    }
  }

  handleInput(code) {
    if (this.vaultState === 'opened') {
      if (code === 'Space' || code === 'Enter') {
        if (this.stage < this.maxStages) {
          this.stage++;
          this.nextChallenge();
        } else {
          this.endGame();
        }
      }
      return;
    }

    if (this.stage === 1 || this.stage === 2) {
      const opts = this.activeQuestion.opts || [];
      if (code === 'Digit1' || code === 'KeyA') this.submitOption(opts[0]);
      if (code === 'Digit2' || code === 'KeyB') this.submitOption(opts[1]);
      if (code === 'Digit3' || code === 'KeyC') this.submitOption(opts[2]);
      if (code === 'Digit4' || code === 'KeyD') this.submitOption(opts[3]);
    } else if (this.stage === 3) {
      if (code === 'Enter' || code === 'Space') this.submitMastermindGuess();
      if (code === 'ArrowLeft') this.guessSlot = Math.max(0, this.guessSlot - 1);
      if (code === 'ArrowRight') this.guessSlot = Math.min(2, this.guessSlot + 1);
      if (code === 'ArrowUp') this.currentGuess[this.guessSlot] = (this.currentGuess[this.guessSlot] % 9) + 1;
      if (code === 'ArrowDown') this.currentGuess[this.guessSlot] = this.currentGuess[this.guessSlot] <= 1 ? 9 : this.currentGuess[this.guessSlot] - 1;
    }
  }

  submitOption(selectedVal) {
    if (selectedVal === this.activeQuestion.ans) {
      this.correctCount++;
      this.currentStreak++;
      if (this.currentStreak > this.longestStreak) this.longestStreak = this.currentStreak;
      this.score += 250 * this.currentStreak;
      this.hub.scoreEl.textContent = this.score.toLocaleString();
      this.hub.comboTag.textContent = `${this.currentStreak}x COMBO`;

      this.feedbackMsg = `VAULT CRACKED! ${this.activeQuestion.rule} ✨`;
      this.feedbackColor = "#34d399";
      this.triggerVaultUnlock();
    } else {
      this.incorrectCount++;
      this.currentStreak = 0;
      this.hub.comboTag.textContent = `1x COMBO`;
      this.feedbackMsg = window.adaptiveEngine ? window.adaptiveEngine.getEncouragingFeedback('code') : "Incorrect code tumbler! Try again.";
      this.feedbackColor = "#f87171";
      if (window.soundEngine) window.soundEngine.playWrong();
    }
  }

  submitMastermindGuess() {
    let exact = 0;
    let partial = 0;
    const secret = [...this.mastermindSecret];
    const guess = [...this.currentGuess];

    for (let i = 0; i < 3; i++) {
      if (guess[i] === secret[i]) {
        exact++;
        secret[i] = null;
        guess[i] = -1;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (guess[i] !== -1) {
        const foundIdx = secret.indexOf(guess[i]);
        if (foundIdx !== -1) {
          partial++;
          secret[foundIdx] = null;
        }
      }
    }

    this.mastermindHistory.push({
      guess: [...this.currentGuess],
      exact,
      partial
    });

    if (exact === 3) {
      this.correctCount++;
      this.currentStreak++;
      if (this.currentStreak > this.longestStreak) this.longestStreak = this.currentStreak;
      this.score += 500;
      this.hub.scoreEl.textContent = this.score.toLocaleString();
      this.feedbackMsg = `VAULT CRACKED! Mastermind Code: [ ${this.mastermindSecret.join(" ")} ] 💎`;
      this.feedbackColor = "#34d399";
      this.triggerVaultUnlock();
    } else {
      if (window.soundEngine) window.soundEngine.playTap();
      this.feedbackMsg = `Attempt ${this.mastermindHistory.length}/${this.maxAttempts}: ${exact} Exact (🟢), ${partial} Partial (🟡)`;
      this.feedbackColor = "#fde047";

      if (this.mastermindHistory.length >= this.maxAttempts) {
        this.incorrectCount++;
        this.feedbackMsg = `Vault lock reset! The code was [ ${this.mastermindSecret.join(" ")} ].`;
        this.feedbackColor = "#f87171";
        setTimeout(() => this.nextChallenge(), 2000);
      }
    }
  }

  triggerVaultUnlock() {
    this.vaultState = 'opening';
    if (window.soundEngine) {
      window.soundEngine.playLevelUp();
      window.soundEngine.playChestOpen();
    }
    if (window.gameState) {
      window.gameState.addXP(100);
      window.gameState.addGems(25);
      window.gameState.addAura(500);
    }
    // Spawn vault particles
    for (let i = 0; i < 40; i++) {
      this.particles.push({
        x: 300,
        y: 180,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10 - 2,
        color: ['#fde047', '#38bdf8', '#a855f7', '#34d399'][Math.floor(Math.random() * 4)],
        size: Math.random() * 6 + 3,
        alpha: 1
      });
    }
  }

  update() {
    if (this.vaultState === 'opening') {
      this.vaultAngle += 0.08;
      if (this.vaultAngle >= Math.PI / 2) {
        this.vaultState = 'opened';
      }
    }

    // Update Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.02;
      if (p.alpha <= 0) this.particles.splice(i, 1);
    }
  }

  render(ctx) {
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, 600, 420);

    // Grid Floor Perspective
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= 600; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 420); ctx.stroke();
    }
    for (let y = 0; y <= 420; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(600, y); ctx.stroke();
    }

    // Vault Container Safe Graphic
    ctx.save();
    ctx.translate(300, 160);

    // Outer Safe Door Frame
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(-140, -110, 280, 220, 20);
    ctx.fill();
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Rivets
    ctx.fillStyle = '#94a3b8';
    [-125, 125].forEach(rx => {
      [-95, 0, 95].forEach(ry => {
        ctx.beginPath(); ctx.arc(rx, ry, 5, 0, Math.PI * 2); ctx.fill();
      });
    });

    if (this.vaultState === 'opened') {
      // Golden Treasure Glow Burst
      const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, 120);
      grad.addColorStop(0, 'rgba(253, 224, 71, 0.9)');
      grad.addColorStop(0.6, 'rgba(245, 158, 11, 0.5)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(0, 0, 120, 0, Math.PI * 2); ctx.fill();

      ctx.font = '50px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('💎🏆✨', 0, 0);

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 16px "Fredoka"';
      ctx.fillText('+500 AURA • +100 XP • +25 GEMS', 0, 65);
      ctx.fillStyle = '#34d399';
      ctx.fillText('TAP ANYWHERE TO ADVANCE ➔', 0, 90);
    } else {
      // Rotating Tumbler Dial
      ctx.rotate(this.vaultAngle);
      ctx.fillStyle = '#334155';
      ctx.beginPath(); ctx.arc(0, 0, 65, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 6;
      ctx.stroke();

      // Dial Spokes
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 4;
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * 20, Math.sin(a) * 20);
        ctx.lineTo(Math.cos(a) * 55, Math.sin(a) * 55);
        ctx.stroke();
      }

      ctx.fillStyle = '#fde047';
      ctx.font = 'bold 24px "Space Grotesk"';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🔐', 0, 0);
    }
    ctx.restore();

    // Stage Specific Content
    if (this.stage === 1 && this.vaultState !== 'opened') {
      // Sequence Display
      ctx.fillStyle = '#0f172a';
      ctx.beginPath(); ctx.roundRect(80, 20, 440, 50, 12); ctx.fill();
      ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2; ctx.stroke();

      ctx.fillStyle = '#fde047';
      ctx.font = 'bold 22px "Space Grotesk"';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.activeQuestion.seq.join('   '), 300, 45);

      // 4 Option Buttons
      const opts = this.activeQuestion.opts || [];
      for (let i = 0; i < opts.length; i++) {
        const bx = 65 + i * 125;
        const by = 330;
        ctx.fillStyle = '#1e293b';
        ctx.beginPath(); ctx.roundRect(bx, by, 110, 50, 12); ctx.fill();
        ctx.strokeStyle = '#6366f1'; ctx.lineWidth = 2; ctx.stroke();

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 20px "Space Grotesk"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(opts[i], bx + 55, by + 25);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px "Space Grotesk"';
        ctx.fillText(`[${i + 1}]`, bx + 55, by + 42);
      }
    } else if (this.stage === 2 && this.vaultState !== 'opened') {
      // Function Machine Table
      ctx.fillStyle = '#0f172a';
      ctx.beginPath(); ctx.roundRect(50, 15, 500, 60, 12); ctx.fill();
      ctx.strokeStyle = '#10b981'; ctx.lineWidth = 2; ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 16px "Space Grotesk"';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`FUNCTION MACHINE [In ➔ Out]:  ${this.activeQuestion.in1}➔${this.activeQuestion.out1}  |  ${this.activeQuestion.in2}➔${this.activeQuestion.out2}  |  ${this.activeQuestion.in3}➔${this.activeQuestion.out3}`, 300, 35);

      ctx.fillStyle = '#fde047';
      ctx.font = 'bold 18px "Space Grotesk"';
      ctx.fillText(`What is the output for:  Input [ ${this.activeQuestion.queryIn} ] ➔ [ ? ]`, 300, 58);

      // Options
      const opts = this.activeQuestion.opts || [];
      for (let i = 0; i < opts.length; i++) {
        const bx = 65 + i * 125;
        const by = 330;
        ctx.fillStyle = '#1e293b';
        ctx.beginPath(); ctx.roundRect(bx, by, 110, 50, 12); ctx.fill();
        ctx.strokeStyle = '#10b981'; ctx.lineWidth = 2; ctx.stroke();

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 20px "Space Grotesk"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(opts[i], bx + 55, by + 25);
      }
    } else if (this.stage === 3 && this.vaultState !== 'opened') {
      // Mastermind Guess Slots
      for (let s = 0; s < 3; s++) {
        const sx = 210 + s * 70;
        const isSelected = this.guessSlot === s;

        // Slot Box
        ctx.fillStyle = isSelected ? '#312e81' : '#1e293b';
        ctx.beginPath(); ctx.roundRect(sx, 225, 50, 55, 10); ctx.fill();
        ctx.strokeStyle = isSelected ? '#fde047' : '#475569';
        ctx.lineWidth = isSelected ? 3 : 1;
        ctx.stroke();

        ctx.fillStyle = '#ffd500';
        ctx.font = 'bold 28px "Space Grotesk"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.currentGuess[s], sx + 25, 252);

        // Arrows
        ctx.fillStyle = '#38bdf8';
        ctx.font = '16px monospace';
        ctx.fillText('▲', sx + 25, 210);
        ctx.fillText('▼', sx + 25, 298);
      }

      // Enter Button
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath(); ctx.roundRect(440, 230, 120, 50, 12); ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 15px "Space Grotesk"';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('ENTER ➔', 500, 255);

      // History Deduction List on Left
      ctx.fillStyle = '#0f172a';
      ctx.beginPath(); ctx.roundRect(30, 200, 160, 110, 10); ctx.fill();
      ctx.strokeStyle = '#334155'; ctx.lineWidth = 1; ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 11px "Space Grotesk"';
      ctx.textAlign = 'left';
      ctx.fillText('DEDUCTION LOG:', 40, 218);

      const recent = this.mastermindHistory.slice(-3);
      recent.forEach((h, idx) => {
        ctx.fillStyle = '#e2e8f0';
        ctx.font = '12px monospace';
        ctx.fillText(`[${h.guess.join('')}] 🟢${h.exact} 🟡${h.partial}`, 40, 238 + idx * 22);
      });
    }

    // Feedback Banner
    if (this.feedbackMsg) {
      ctx.fillStyle = this.feedbackColor;
      ctx.font = 'bold 14px "Fredoka"';
      ctx.textAlign = 'center';
      ctx.fillText(this.feedbackMsg, 300, 398);
    }

    // Render Particles
    this.particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    });
  }

  endGame() {
    const total = this.correctCount + this.incorrectCount;
    const acc = total > 0 ? Math.round((this.correctCount / total) * 100) : 0;
    this.hub.showGameSummary({
      gameName: "Code Breaker",
      score: this.score,
      accuracy: acc,
      correct: this.correctCount,
      incorrect: this.incorrectCount,
      longestStreak: this.longestStreak,
      missedSkills: []
    });
  }
}

// ==========================================================================
// 19. GAME 19: ANGLE CANNON (Geometry, Angles & Ballistics Physics)
// ==========================================================================
class AngleCannonGame {
  constructor(hub) {
    this.hub = hub;
    this.stage = 1; // 1: Guide, 2: Major Marks, 3: Estimation, 4: Acute/Obtuse, 5: Multi-Drone
    this.maxStages = 5;
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.longestStreak = 0;
    this.currentStreak = 0;

    this.cannonX = 70;
    this.cannonY = 360;
    this.angleDeg = 45; // 0 to 90 degrees
    this.power = 16;
    this.isAiming = false;

    this.targets = [];
    this.activeProjectile = null;
    this.particles = [];
    this.missionText = "";
    this.targetAngleReq = 45;
  }

  start() {
    this.stage = 1;
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.currentStreak = 0;
    this.longestStreak = 0;
    this.activeProjectile = null;
    this.particles = [];
    this.setupStage();
  }

  setupStage() {
    this.activeProjectile = null;
    this.targets = [];

    if (this.stage === 1) {
      this.hub.setLevel("STAGE 1: PROTRACTOR GUIDE");
      this.targetAngleReq = 45;
      this.missionText = "Align the Cannon to exactly 45° and Fire!";
      this.targets.push({ x: 420, y: 150, radius: 32, hit: false, angleHint: 45 });
    } else if (this.stage === 2) {
      this.hub.setLevel("STAGE 2: MAJOR ANGLES");
      this.targetAngleReq = 60;
      this.missionText = "Elevate to 60° (Major Marking) to hit the high target!";
      this.targets.push({ x: 300, y: 100, radius: 30, hit: false, angleHint: 60 });
    } else if (this.stage === 3) {
      this.hub.setLevel("STAGE 3: ANGLE ESTIMATION");
      this.targetAngleReq = 35;
      this.missionText = "Estimate the angle needed to hit the floating balloon!";
      this.targets.push({ x: 480, y: 220, radius: 28, hit: false, angleHint: 35 });
    } else if (this.stage === 4) {
      this.hub.setLevel("STAGE 4: ACUTE & RIGHT ANGLES");
      this.targetAngleReq = 75;
      this.missionText = "Fire an ACUTE angle (< 90°) to destroy the bunker drone!";
      this.targets.push({ x: 350, y: 80, radius: 28, hit: false, angleHint: 75 });
    } else {
      this.hub.setLevel("STAGE 5: MULTI-DRONE DEFENSE");
      this.missionText = "Destroy both floating drones with precision angles!";
      this.targets.push({ x: 380, y: 140, radius: 26, hit: false, angleHint: 50 });
      this.targets.push({ x: 500, y: 260, radius: 26, hit: false, angleHint: 25 });
    }

    this.hub.setPrompt(this.missionText);
  }

  handlePointer(x, y, type) {
    // Touch controls on bottom bar
    // [ -5° ] (x: 20..75, y: 375..410)
    // [ -1° ] (x: 85..135, y: 375..410)
    // [ +1° ] (x: 145..195, y: 375..410)
    // [ +5° ] (x: 205..260, y: 375..410)
    // [ FIRE 🚀 ] (x: 480..580, y: 365..410)
    if (type === 'down') {
      if (x >= 20 && x <= 75 && y >= 370 && y <= 415) { this.adjustAngle(-5); return; }
      if (x >= 85 && x <= 135 && y >= 370 && y <= 415) { this.adjustAngle(-1); return; }
      if (x >= 145 && x <= 195 && y >= 370 && y <= 415) { this.adjustAngle(1); return; }
      if (x >= 205 && x <= 260 && y >= 370 && y <= 415) { this.adjustAngle(5); return; }
      if (x >= 480 && x <= 580 && y >= 365 && y <= 415) { this.fire(); return; }

      // Aim by dragging directly toward pointer
      if (x > this.cannonX && y < this.cannonY) {
        this.isAiming = true;
        this.aimToward(x, y);
      }
    } else if (type === 'move' && this.isAiming) {
      this.aimToward(x, y);
    } else if (type === 'up') {
      this.isAiming = false;
    }
  }

  handleInput(code) {
    if (code === 'ArrowUp' || code === 'ArrowLeft') this.adjustAngle(2);
    if (code === 'ArrowDown' || code === 'ArrowRight') this.adjustAngle(-2);
    if (code === 'Space' || code === 'Enter') this.fire();
  }

  aimToward(x, y) {
    const dx = x - this.cannonX;
    const dy = this.cannonY - y;
    const rad = Math.atan2(dy, dx);
    const deg = Math.round(rad * (180 / Math.PI));
    this.angleDeg = Math.max(5, Math.min(88, deg));
  }

  adjustAngle(delta) {
    this.angleDeg = Math.max(5, Math.min(88, this.angleDeg + delta));
    if (window.soundEngine) window.soundEngine.playTap();
  }

  fire() {
    if (this.activeProjectile) return;

    const rad = this.angleDeg * (Math.PI / 180);
    this.activeProjectile = {
      x: this.cannonX + Math.cos(rad) * 45,
      y: this.cannonY - Math.sin(rad) * 45,
      vx: Math.cos(rad) * this.power,
      vy: -Math.sin(rad) * this.power,
      trail: []
    };

    if (window.soundEngine) window.soundEngine.playCorrect();

    // Spawn muzzle flash particles
    for (let i = 0; i < 15; i++) {
      this.particles.push({
        x: this.cannonX + Math.cos(rad) * 45,
        y: this.cannonY - Math.sin(rad) * 45,
        vx: (Math.random() - 0.5) * 6 + Math.cos(rad) * 4,
        vy: (Math.random() - 0.5) * 6 - Math.sin(rad) * 4,
        color: '#fbbf24',
        size: Math.random() * 4 + 2,
        alpha: 1
      });
    }
  }

  update() {
    // Projectile Ballistics Simulation
    if (this.activeProjectile) {
      const p = this.activeProjectile;
      p.trail.push({ x: p.x, y: p.y });
      if (p.trail.length > 25) p.trail.shift();

      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // Gravity acceleration

      // Check Target Collisions
      for (let t of this.targets) {
        if (!t.hit) {
          const dist = Math.hypot(p.x - t.x, p.y - t.y);
          if (dist <= t.radius + 8) {
            t.hit = true;
            this.handleTargetHit(t);
            this.activeProjectile = null;
            return;
          }
        }
      }

      // Check Bounds / Ground Hit
      if (p.y >= 370 || p.x > 600 || p.x < 0) {
        this.handleMiss();
        this.activeProjectile = null;
      }
    }

    // Update Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const pt = this.particles[i];
      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.alpha -= 0.03;
      if (pt.alpha <= 0) this.particles.splice(i, 1);
    }
  }

  handleTargetHit(target) {
    this.correctCount++;
    this.currentStreak++;
    if (this.currentStreak > this.longestStreak) this.longestStreak = this.currentStreak;

    const angleDiff = Math.abs(this.angleDeg - target.angleHint);
    let pts = 100;
    let label = "DIRECT HIT!";

    if (angleDiff <= 3) {
      pts = 200;
      label = "PERFECT BULLSEYE! 🎯";
      if (window.helpers) window.helpers.spawnAuraFloatingText("PERFECT 🎯 +200", this.cannonX, this.cannonY - 60, true);
    } else {
      if (window.helpers) window.helpers.spawnAuraFloatingText("DIRECT HIT ⭐ +100", this.cannonX, this.cannonY - 60, true);
    }

    this.score += pts * this.currentStreak;
    this.hub.scoreEl.textContent = this.score.toLocaleString();
    this.hub.comboTag.textContent = `${this.currentStreak}x COMBO`;

    if (window.soundEngine) window.soundEngine.playLevelUp();

    // Explosion Particles
    for (let i = 0; i < 30; i++) {
      this.particles.push({
        x: target.x,
        y: target.y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        color: ['#ef4444', '#f59e0b', '#38bdf8', '#fff'][Math.floor(Math.random() * 4)],
        size: Math.random() * 5 + 3,
        alpha: 1
      });
    }

    const allHit = this.targets.every(t => t.hit);
    if (allHit) {
      setTimeout(() => {
        if (this.stage < this.maxStages) {
          this.stage++;
          this.setupStage();
        } else {
          this.endGame();
        }
      }, 1200);
    }
  }

  handleMiss() {
    this.incorrectCount++;
    this.currentStreak = 0;
    this.hub.comboTag.textContent = `1x COMBO`;
    if (window.soundEngine) window.soundEngine.playWrong();
    if (window.helpers) {
      const tip = window.adaptiveEngine ? window.adaptiveEngine.getEncouragingFeedback('angle') : "Adjust your angle and try again!";
      window.helpers.spawnAuraFloatingText(tip, 300, 200, false);
    }
  }

  render(ctx) {
    // Sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, 370);
    skyGrad.addColorStop(0, '#0c1322');
    skyGrad.addColorStop(1, '#1e293b');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, 600, 370);

    // Ground Platform
    ctx.fillStyle = '#334155';
    ctx.fillRect(0, 370, 600, 50);
    ctx.fillStyle = '#475569';
    ctx.fillRect(0, 370, 600, 4);

    // Protractor Arc Guide (centered at cannon base)
    const rad = this.angleDeg * (Math.PI / 180);
    ctx.save();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(this.cannonX, this.cannonY, 80, -Math.PI / 2, 0);
    ctx.stroke();

    // Protractor Markings
    if (this.stage <= 2) {
      const marks = this.stage === 1 ? [15, 30, 45, 60, 75, 90] : [30, 45, 60, 90];
      marks.forEach(deg => {
        const a = deg * (Math.PI / 180);
        const mx1 = this.cannonX + Math.cos(-a) * 70;
        const my1 = this.cannonY + Math.sin(-a) * 70;
        const mx2 = this.cannonX + Math.cos(-a) * 85;
        const my2 = this.cannonY + Math.sin(-a) * 85;

        ctx.strokeStyle = deg === this.targetAngleReq ? '#fde047' : 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = deg === this.targetAngleReq ? 3 : 1;
        ctx.beginPath(); ctx.moveTo(mx1, my1); ctx.lineTo(mx2, my2); ctx.stroke();

        ctx.fillStyle = deg === this.targetAngleReq ? '#fde047' : '#94a3b8';
        ctx.font = 'bold 10px "Space Grotesk"';
        ctx.fillText(`${deg}°`, mx2 + Math.cos(-a) * 12, my2 + Math.sin(-a) * 12);
      });
    }

    // Active Aiming Line
    ctx.strokeStyle = '#38bdf8';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(this.cannonX, this.cannonY);
    ctx.lineTo(this.cannonX + Math.cos(rad) * 120, this.cannonY - Math.sin(rad) * 120);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // Render Targets (Drones / Balloons)
    this.targets.forEach(t => {
      if (!t.hit) {
        ctx.save();
        ctx.fillStyle = '#ef4444';
        ctx.beginPath(); ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.arc(t.x, t.y, t.radius * 0.65, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ef4444';
        ctx.beginPath(); ctx.arc(t.x, t.y, t.radius * 0.35, 0, Math.PI * 2); ctx.fill();

        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = '22px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🎯', t.x, t.y);
        ctx.restore();
      }
    });

    // Render Projectile & Smoke Trail
    if (this.activeProjectile) {
      const p = this.activeProjectile;
      p.trail.forEach((pos, idx) => {
        ctx.fillStyle = `rgba(251, 191, 36, ${idx / p.trail.length * 0.6})`;
        ctx.beginPath(); ctx.arc(pos.x, pos.y, (idx / p.trail.length) * 5 + 2, 0, Math.PI * 2); ctx.fill();
      });

      ctx.fillStyle = '#fbbf24';
      ctx.beginPath(); ctx.arc(p.x, p.y, 7, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
    }

    // Render Cannon Base & Rotated Barrel
    ctx.save();
    ctx.translate(this.cannonX, this.cannonY);
    ctx.rotate(-rad);

    // Barrel
    ctx.fillStyle = '#475569';
    ctx.fillRect(0, -12, 50, 24);
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.strokeRect(0, -12, 50, 24);

    // Muzzle Band
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(44, -14, 8, 28);
    ctx.restore();

    // Wheel Base
    ctx.fillStyle = '#1e293b';
    ctx.beginPath(); ctx.arc(this.cannonX, this.cannonY, 20, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 3; ctx.stroke();

    // Angle Display HUD Overlay
    ctx.fillStyle = '#0f172a';
    ctx.beginPath(); ctx.roundRect(15, 15, 140, 45, 10); ctx.fill();
    ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2; ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = '10px "Space Grotesk"';
    ctx.fillText('CANNON ANGLE', 85, 28);
    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 20px "Space Grotesk"';
    ctx.fillText(`${this.angleDeg}°`, 85, 48);

    // Touch Angle Adjust Buttons & Fire Button Bar
    const btns = [
      { label: '-5°', x: 20, w: 55 },
      { label: '-1°', x: 85, w: 50 },
      { label: '+1°', x: 145, w: 50 },
      { label: '+5°', x: 205, w: 55 }
    ];
    btns.forEach(b => {
      ctx.fillStyle = '#1e293b';
      ctx.beginPath(); ctx.roundRect(b.x, 375, b.w, 35, 8); ctx.fill();
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 1; ctx.stroke();

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 13px "Space Grotesk"';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(b.label, b.x + b.w / 2, 392);
    });

    // Fire Button
    ctx.fillStyle = this.activeProjectile ? '#64748b' : '#ef4444';
    ctx.beginPath(); ctx.roundRect(480, 372, 100, 40, 10); ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 15px "Space Grotesk"';
    ctx.fillText('🚀 FIRE', 530, 392);

    // Render Particles
    this.particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    });
  }

  endGame() {
    const total = this.correctCount + this.incorrectCount;
    const acc = total > 0 ? Math.round((this.correctCount / total) * 100) : 0;
    this.hub.showGameSummary({
      gameName: "Angle Cannon",
      score: this.score,
      accuracy: acc,
      correct: this.correctCount,
      incorrect: this.incorrectCount,
      longestStreak: this.longestStreak,
      missedSkills: []
    });
  }
}

// ==========================================================================
// 20. GAME 20: ROVER RESCUE (Algorithms, Sequencing & Mars Grid)
// ==========================================================================
class RoverRescueGame {
  constructor(hub) {
    this.hub = hub;
    this.stage = 1; // 1 to 6
    this.maxStages = 6;
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.longestStreak = 0;
    this.currentStreak = 0;

    this.gridCols = 8;
    this.gridRows = 5;
    this.cellSize = 48;
    this.gridStartX = 30;
    this.gridStartY = 60;

    this.rover = { x: 0, y: 0, dir: 1 }; // dir: 0=Up, 1=Right, 2=Down, 3=Left
    this.initialRover = { x: 0, y: 0, dir: 1 };
    this.astronaut = { x: 7, y: 4 };
    this.samples = []; // array of { x, y, collected }
    this.obstacles = []; // array of { x, y, type: 'rock' | 'crater' }

    this.commandQueue = []; // array of 'FWD', 'LEFT', 'RIGHT', 'REPEAT2'
    this.isRunning = false;
    this.executingStep = -1;
    this.pathTrail = [];
    this.statusMsg = "";
    this.statusColor = "#38bdf8";
  }

  start() {
    this.stage = 1;
    this.score = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.currentStreak = 0;
    this.longestStreak = 0;
    this.loadLevel();
  }

  loadLevel() {
    this.commandQueue = [];
    this.isRunning = false;
    this.executingStep = -1;
    this.pathTrail = [];
    this.statusMsg = "Program your command sequence and press RUN!";
    this.statusColor = "#38bdf8";

    this.hub.setLevel(`SECTOR ${this.stage}: MARS BASIN`);

    if (this.stage === 1) {
      // Direct Straight line
      this.rover = { x: 1, y: 2, dir: 1 };
      this.astronaut = { x: 6, y: 2 };
      this.obstacles = [];
      this.samples = [{ x: 3, y: 2, collected: false }];
      this.hub.setPrompt("Mission: Move Forward 5 times to rescue the astronaut! Collect the science crystal!");
    } else if (this.stage === 2) {
      // 1 Turn
      this.rover = { x: 1, y: 1, dir: 1 };
      this.astronaut = { x: 5, y: 4 };
      this.obstacles = [{ x: 5, y: 1, type: 'rock' }, { x: 5, y: 2, type: 'crater' }];
      this.samples = [{ x: 3, y: 1, collected: false }];
      this.hub.setPrompt("Mission: Navigate around the crater: Forward ➔ Turn Right ➔ Forward!");
    } else if (this.stage === 3) {
      // Maze with multiple turns & Repeat Loop
      this.rover = { x: 0, y: 4, dir: 0 };
      this.astronaut = { x: 7, y: 0 };
      this.obstacles = [
        { x: 2, y: 4, type: 'rock' }, { x: 2, y: 3, type: 'rock' },
        { x: 4, y: 1, type: 'crater' }, { x: 4, y: 2, type: 'rock' }
      ];
      this.samples = [{ x: 0, y: 1, collected: false }, { x: 4, y: 0, collected: false }];
      this.hub.setPrompt("Mission: Use Turn Left/Right and Forward blocks to navigate the maze!");
    } else {
      // Advanced Multi-Sample Route
      this.rover = { x: 0, y: 0, dir: 1 };
      this.astronaut = { x: 7, y: 4 };
      this.obstacles = [
        { x: 3, y: 1, type: 'rock' }, { x: 3, y: 2, type: 'crater' },
        { x: 5, y: 3, type: 'rock' }, { x: 5, y: 4, type: 'crater' }
      ];
      this.samples = [
        { x: 2, y: 0, collected: false },
        { x: 4, y: 2, collected: false },
        { x: 6, y: 3, collected: false }
      ];
      this.hub.setPrompt("Advanced Mission: Collect all 3 Martian samples and reach the stranded astronaut!");
    }

    this.initialRover = { ...this.rover };
  }

  handlePointer(x, y, type) {
    if (type !== 'down' || this.isRunning) return;

    // Palette Command Buttons (y: 310..350)
    // [ ⬆️ FWD ] (x: 25..95)
    // [ ↶ LEFT ] (x: 105..175)
    // [ ↷ RIGHT ] (x: 185..255)
    // [ 🔁 2x ] (x: 265..325)
    // [ ⌫ DEL ] (x: 335..385)
    // [ 🗑️ CLR ] (x: 395..445)
    // [ 🚀 RUN ] (x: 465..575, y: 310..355)
    if (y >= 310 && y <= 355) {
      if (x >= 25 && x <= 95) { this.addCommand('FWD'); return; }
      if (x >= 105 && x <= 175) { this.addCommand('LEFT'); return; }
      if (x >= 185 && x <= 255) { this.addCommand('RIGHT'); return; }
      if (x >= 265 && x <= 325) { this.addCommand('REPEAT2'); return; }
      if (x >= 335 && x <= 385) { this.deleteCommand(); return; }
      if (x >= 395 && x <= 445) { this.clearCommands(); return; }
      if (x >= 465 && x <= 575) { this.runProgram(); return; }
    }
  }

  handleInput(code) {
    if (this.isRunning) return;
    if (code === 'ArrowUp') this.addCommand('FWD');
    if (code === 'ArrowLeft') this.addCommand('LEFT');
    if (code === 'ArrowRight') this.addCommand('RIGHT');
    if (code === 'KeyR') this.addCommand('REPEAT2');
    if (code === 'Backspace') this.deleteCommand();
    if (code === 'Enter' || code === 'Space') this.runProgram();
  }

  addCommand(cmd) {
    if (this.commandQueue.length < 16) {
      this.commandQueue.push(cmd);
      if (window.soundEngine) window.soundEngine.playTap();
    }
  }

  deleteCommand() {
    if (this.commandQueue.length > 0) {
      this.commandQueue.pop();
      if (window.soundEngine) window.soundEngine.playTap();
    }
  }

  clearCommands() {
    this.commandQueue = [];
    this.rover = { ...this.initialRover };
    this.pathTrail = [];
    if (window.soundEngine) window.soundEngine.playTap();
  }

  runProgram() {
    if (this.commandQueue.length === 0 || this.isRunning) return;

    this.isRunning = true;
    this.rover = { ...this.initialRover };
    this.pathTrail = [{ x: this.rover.x, y: this.rover.y }];
    this.executingStep = 0;
    this.statusMsg = "Executing autonomous program...";
    this.statusColor = "#ffd500";

    // Expand repeat commands into execution queue
    const expandedQueue = [];
    for (let i = 0; i < this.commandQueue.length; i++) {
      const c = this.commandQueue[i];
      if (c === 'REPEAT2' && i + 1 < this.commandQueue.length) {
        expandedQueue.push(this.commandQueue[i + 1]);
        expandedQueue.push(this.commandQueue[i + 1]);
        i++; // skip next since it's repeated
      } else {
        expandedQueue.push(c);
      }
    }

    this.executeStepLoop(expandedQueue, 0);
  }

  executeStepLoop(queue, index) {
    if (index >= queue.length) {
      this.isRunning = false;
      this.checkMissionResult();
      return;
    }

    this.executingStep = index;
    const cmd = queue[index];

    // Execute single command
    if (cmd === 'FWD') {
      const dx = [0, 1, 0, -1][this.rover.dir];
      const dy = [-1, 0, 1, 0][this.rover.dir];
      const nx = this.rover.x + dx;
      const ny = this.rover.y + dy;

      // Obstacle & Boundary Check
      const isBlocked = this.obstacles.some(o => o.x === nx && o.y === ny) || nx < 0 || nx >= this.gridCols || ny < 0 || ny >= this.gridRows;

      if (isBlocked) {
        this.isRunning = false;
        this.incorrectCount++;
        this.currentStreak = 0;
        this.hub.comboTag.textContent = `1x COMBO`;
        this.statusMsg = window.adaptiveEngine ? window.adaptiveEngine.getEncouragingFeedback('rover') : "Rover hit an obstacle! Debug your command queue.";
        this.statusColor = "#f87171";
        if (window.soundEngine) window.soundEngine.playWrong();
        return;
      }

      this.rover.x = nx;
      this.rover.y = ny;
      this.pathTrail.push({ x: nx, y: ny });

      // Collect sample if present
      this.samples.forEach(s => {
        if (s.x === nx && s.y === ny && !s.collected) {
          s.collected = true;
          this.score += 150;
          this.hub.scoreEl.textContent = this.score.toLocaleString();
          if (window.soundEngine) window.soundEngine.playLevelUp();
          if (window.helpers) window.helpers.spawnAuraFloatingText("SAMPLE COLLECTED! 🧪✨", undefined, undefined, true);
        }
      });
    } else if (cmd === 'LEFT') {
      this.rover.dir = (this.rover.dir + 3) % 4;
    } else if (cmd === 'RIGHT') {
      this.rover.dir = (this.rover.dir + 1) % 4;
    }

    if (window.soundEngine) window.soundEngine.playTap();

    setTimeout(() => {
      this.executeStepLoop(queue, index + 1);
    }, 400);
  }

  checkMissionResult() {
    if (this.rover.x === this.astronaut.x && this.rover.y === this.astronaut.y) {
      this.correctCount++;
      this.currentStreak++;
      if (this.currentStreak > this.longestStreak) this.longestStreak = this.currentStreak;
      this.score += 500 * this.currentStreak;
      this.hub.scoreEl.textContent = this.score.toLocaleString();
      this.hub.comboTag.textContent = `${this.currentStreak}x COMBO`;

      this.statusMsg = "ASTRONAUT RESCUED! Mission Accomplished! 👨‍🚀🚀";
      this.statusColor = "#34d399";

      if (window.soundEngine) window.soundEngine.playLevelUp();
      if (window.helpers) window.helpers.spawnAuraFloatingText("RESCUE SUCCESSFUL! ⭐ +500", undefined, undefined, true);

      setTimeout(() => {
        if (this.stage < this.maxStages) {
          this.stage++;
          this.loadLevel();
        } else {
          this.endGame();
        }
      }, 1500);
    } else {
      this.statusMsg = "Rover stopped short of the astronaut. Add more Forward commands!";
      this.statusColor = "#fde047";
    }
  }

  update() {}

  render(ctx) {
    // Martian Red Terrain Background
    ctx.fillStyle = '#1c0d0d';
    ctx.fillRect(0, 0, 600, 420);

    // Mars Grid Canvas
    for (let r = 0; r < this.gridRows; r++) {
      for (let c = 0; c < this.gridCols; c++) {
        const gx = this.gridStartX + c * (this.cellSize + 15);
        const gy = this.gridStartY + r * (this.cellSize + 10);

        ctx.fillStyle = '#2d1515';
        ctx.beginPath(); ctx.roundRect(gx, gy, this.cellSize, this.cellSize, 8); ctx.fill();
        ctx.strokeStyle = '#4a2525'; ctx.lineWidth = 1; ctx.stroke();
      }
    }

    // Render Path Trail
    if (this.pathTrail.length > 1) {
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      this.pathTrail.forEach((p, idx) => {
        const px = this.gridStartX + p.x * (this.cellSize + 15) + this.cellSize / 2;
        const py = this.gridStartY + p.y * (this.cellSize + 10) + this.cellSize / 2;
        if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      });
      ctx.stroke();
    }

    // Render Obstacles (Rocks & Craters)
    this.obstacles.forEach(o => {
      const ox = this.gridStartX + o.x * (this.cellSize + 15) + this.cellSize / 2;
      const oy = this.gridStartY + o.y * (this.cellSize + 10) + this.cellSize / 2;
      ctx.font = '24px serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(o.type === 'rock' ? '🪨' : '🕳️', ox, oy);
    });

    // Render Samples
    this.samples.forEach(s => {
      if (!s.collected) {
        const sx = this.gridStartX + s.x * (this.cellSize + 15) + this.cellSize / 2;
        const sy = this.gridStartY + s.y * (this.cellSize + 10) + this.cellSize / 2;
        ctx.font = '22px serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('🧪', sx, sy);
      }
    });

    // Render Astronaut
    const ax = this.gridStartX + this.astronaut.x * (this.cellSize + 15) + this.cellSize / 2;
    const ay = this.gridStartY + this.astronaut.y * (this.cellSize + 10) + this.cellSize / 2;
    ctx.font = '26px serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('👨‍🚀', ax, ay);

    // Render Rover
    const rx = this.gridStartX + this.rover.x * (this.cellSize + 15) + this.cellSize / 2;
    const ry = this.gridStartY + this.rover.y * (this.cellSize + 10) + this.cellSize / 2;

    ctx.save();
    ctx.translate(rx, ry);
    const rots = [-Math.PI / 2, 0, Math.PI / 2, Math.PI];
    ctx.rotate(rots[this.rover.dir]);

    ctx.fillStyle = '#38bdf8';
    ctx.beginPath(); ctx.roundRect(-16, -14, 32, 28, 6); ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();

    // Rover Solar Panels
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-18, -16, 8, 32);
    ctx.fillRect(10, -16, 8, 32);

    // Headlight Beam
    ctx.fillStyle = 'rgba(253, 224, 71, 0.4)';
    ctx.beginPath();
    ctx.moveTo(16, -6); ctx.lineTo(35, -15); ctx.lineTo(35, 15); ctx.lineTo(16, 6);
    ctx.fill();

    ctx.restore();

    // Command Queue Bar
    ctx.fillStyle = '#0f172a';
    ctx.beginPath(); ctx.roundRect(20, 260, 560, 42, 8); ctx.fill();
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 1; ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 11px "Space Grotesk"';
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText('PROGRAM:', 30, 281);

    if (this.commandQueue.length === 0) {
      ctx.fillStyle = '#64748b';
      ctx.font = '12px "Fredoka"';
      ctx.fillText('Tap command blocks below to build algorithm sequence...', 100, 281);
    } else {
      this.commandQueue.forEach((cmd, idx) => {
        const isCurrent = this.executingStep === idx;
        const qx = 100 + idx * 28;
        ctx.fillStyle = isCurrent ? '#fde047' : '#1e293b';
        ctx.beginPath(); ctx.roundRect(qx, 266, 24, 30, 5); ctx.fill();
        ctx.strokeStyle = isCurrent ? '#fff' : '#64748b'; ctx.lineWidth = 1; ctx.stroke();

        ctx.fillStyle = isCurrent ? '#0f172a' : '#38bdf8';
        ctx.font = 'bold 12px "Space Grotesk"';
        ctx.textAlign = 'center';
        const labels = { FWD: '⬆️', LEFT: '↶', RIGHT: '↷', REPEAT2: '2x' };
        ctx.fillText(labels[cmd] || cmd, qx + 12, 281);
      });
    }

    // Command Blocks Palette
    const palette = [
      { label: '⬆️ FWD', x: 25, w: 70, color: '#0284c7' },
      { label: '↶ LEFT', x: 105, w: 70, color: '#6366f1' },
      { label: '↷ RIGHT', x: 185, w: 70, color: '#6366f1' },
      { label: '🔁 2x', x: 265, w: 60, color: '#a855f7' },
      { label: '⌫ DEL', x: 335, w: 50, color: '#e11d48' },
      { label: '🗑️ CLR', x: 395, w: 50, color: '#475569' }
    ];

    palette.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.beginPath(); ctx.roundRect(p.x, 312, p.w, 40, 8); ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; ctx.stroke();

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px "Space Grotesk"';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(p.label, p.x + p.w / 2, 332);
    });

    // Run Button
    ctx.fillStyle = this.isRunning ? '#64748b' : '#10b981';
    ctx.beginPath(); ctx.roundRect(465, 312, 110, 40, 10); ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px "Space Grotesk"';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('🚀 RUN', 520, 332);

    // Status Message Bottom Bar
    ctx.fillStyle = this.statusColor;
    ctx.font = 'bold 13px "Fredoka"';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(this.statusMsg, 300, 395);
  }

  endGame() {
    const total = this.correctCount + this.incorrectCount;
    const acc = total > 0 ? Math.round((this.correctCount / total) * 100) : 0;
    this.hub.showGameSummary({
      gameName: "Rover Rescue",
      score: this.score,
      accuracy: acc,
      correct: this.correctCount,
      incorrect: this.incorrectCount,
      longestStreak: this.longestStreak,
      missedSkills: []
    });
  }
}

window.ArcadeHub = ArcadeHub;



