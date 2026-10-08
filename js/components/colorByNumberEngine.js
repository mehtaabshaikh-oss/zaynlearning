/**
 * Color with Numbers Game Engine
 * Dual-Engine: Canvas (Pixel Art) + SVG (Organic Coloring Pages & Radial Mandalas)
 * Integrates directly with Zayn's Arcade Hub, Aura Points, XP, and Web Audio API.
 */

class ColorByNumberEngine {
  constructor() {
    this.artworks = (typeof window !== 'undefined' && window.COLOR_BY_NUMBER_ARTWORKS) 
      ? window.COLOR_BY_NUMBER_ARTWORKS 
      : (typeof window !== 'undefined' && window.ARTWORKS) ? window.ARTWORKS : [];
      
    this.currentArtworkIndex = 0;
    this.currentArtwork = this.artworks[0] || null;
    this.completedArtworks = this.loadCompleted();

    // Active state
    this.selectedColorNum = 1;
    this.userGrid = []; // [row][col] for pixel art
    this.userMandalaFills = {}; // { [regionId]: colorNum } for vector art
    this.magicSymmetry = false;
    this.streak = 0;
    this.activeFilter = 'all';
    this.highlightPulse = 0;
    this.animationFrameId = null;

    // Web Audio Synthesizer
    this.audioCtx = null;

    // Confetti particles
    this.confettiParticles = [];

    this.initDOM();
  }

  loadCompleted() {
    try {
      const saved = localStorage.getItem('zayn_completed_artworks');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  }

  saveCompleted(id) {
    this.completedArtworks[id] = true;
    try {
      localStorage.setItem('zayn_completed_artworks', JSON.stringify(this.completedArtworks));
    } catch (e) {
      console.warn(e);
    }
    this.updateArcadeCardStats();
  }

  updateArcadeCardStats() {
    const el = document.getElementById('stats-card-color-number');
    if (el) {
      const completedCount = Object.keys(this.completedArtworks).length;
      el.textContent = `Artworks: ${completedCount}/${this.artworks.length} ⭐ • Aura: +50`;
    }
  }

  initDOM() {
    // Stage elements
    this.canvas = document.getElementById('color-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.svg = document.getElementById('color-svg');
    this.confettiCanvas = document.getElementById('color-confetti-canvas');
    this.confettiCtx = this.confettiCanvas ? this.confettiCanvas.getContext('2d') : null;

    // HUD & Controls
    this.categoryBadge = document.getElementById('color-category-badge');
    this.artTitle = document.getElementById('color-art-title');
    this.exitBtn = document.getElementById('exit-color-btn');
    this.galleryBtn = document.getElementById('color-gallery-btn');
    this.magicBtn = document.getElementById('color-magic-btn');
    this.hintBtn = document.getElementById('color-hint-btn');
    this.restartBtn = document.getElementById('color-restart-btn');

    // Progress & Palette
    this.progressFill = document.getElementById('color-progress-fill');
    this.progressText = document.getElementById('color-progress-text');
    this.instructionBanner = document.getElementById('color-instruction-banner');
    this.paletteBar = document.getElementById('color-palette-bar');

    // Gallery Modal
    this.galleryModal = document.getElementById('color-gallery-modal');
    this.galleryCloseBtn = document.getElementById('color-gallery-close-btn');
    this.galleryGrid = document.getElementById('color-gallery-grid');
    this.catTabsContainer = document.getElementById('color-category-tabs');

    // Victory Modal
    this.winModal = document.getElementById('color-win-modal');
    this.winTitle = document.getElementById('color-win-title');
    this.winDownloadBtn = document.getElementById('color-win-download-btn');
    this.winNextBtn = document.getElementById('color-win-next-btn');
    this.winGalleryBtn = document.getElementById('color-win-gallery-btn');

    this.bindEvents();
    this.renderCategoryTabs();
    this.updateArcadeCardStats();
  }

  bindEvents() {
    if (this.exitBtn) {
      this.exitBtn.addEventListener('click', () => {
        if (window.app) window.app.showView('view-arcade-hub');
        this.updateArcadeCardStats();
      });
    }

    if (this.galleryBtn) {
      this.galleryBtn.addEventListener('click', () => this.openGallery());
    }

    if (this.galleryCloseBtn) {
      this.galleryCloseBtn.addEventListener('click', () => this.closeGallery());
    }

    if (this.magicBtn) {
      this.magicBtn.addEventListener('click', () => {
        this.magicSymmetry = !this.magicSymmetry;
        this.magicBtn.classList.toggle('active', this.magicSymmetry);
        this.playTone(480, 0.1, 'sine');
        if (window.helpers) {
          window.helpers.spawnAuraFloatingText(
            this.magicSymmetry ? "🪄 Magic Symmetry ON!" : "Magic Symmetry OFF",
            undefined, undefined, true
          );
        }
      });
    }

    if (this.hintBtn) {
      this.hintBtn.addEventListener('click', () => this.useHint());
    }

    if (this.restartBtn) {
      this.restartBtn.addEventListener('click', () => this.restartArtwork());
    }

    // Victory Modal actions
    if (this.winDownloadBtn) {
      this.winDownloadBtn.addEventListener('click', () => this.downloadArtworkPNG());
    }

    if (this.winNextBtn) {
      this.winNextBtn.addEventListener('click', () => {
        this.winModal.classList.add('hidden');
        this.nextArtwork();
      });
    }

    if (this.winGalleryBtn) {
      this.winGalleryBtn.addEventListener('click', () => {
        this.winModal.classList.add('hidden');
        this.openGallery();
      });
    }

    // Canvas Pointer Events
    if (this.canvas) {
      const handlePointer = (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        this.handlePixelClick(clientX - rect.left, clientY - rect.top);
      };

      this.canvas.addEventListener('click', handlePointer);
      this.canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handlePointer(e);
      }, { passive: false });
    }

    // Window resize handling
    window.addEventListener('resize', () => {
      this.resizeCanvas();
      if (this.currentArtwork && this.currentArtwork.type === 'pixel') {
        this.drawPixelCanvas();
      }
    });

    // Start subtle target pulse loop
    this.startPulseLoop();
  }

  startOrResume() {
    if (!this.currentArtwork && this.artworks.length > 0) {
      this.loadArtwork(0);
    } else if (this.currentArtwork) {
      this.loadArtwork(this.currentArtworkIndex);
    }
  }

  isVectorArt(art) {
    return art && (art.type === 'vector' || art.type === 'mandala');
  }

  // ==========================================
  // ARTWORK LOADING & INITIALIZATION
  // ==========================================
  loadArtwork(index) {
    if (index < 0 || index >= this.artworks.length) index = 0;
    this.currentArtworkIndex = index;
    this.currentArtwork = this.artworks[index];

    // Reset interaction state
    this.streak = 0;
    this.selectedColorNum = 1;

    // Update HUD
    if (this.artTitle) {
      this.artTitle.innerHTML = `<span>${this.currentArtwork.icon || '🎨'}</span> <span>${this.currentArtwork.title}</span>`;
    }
    if (this.categoryBadge) {
      this.categoryBadge.textContent = this.currentArtwork.categoryLabel || this.currentArtwork.category || 'Arcade';
    }

    // Show/Hide Magic Symmetry button (only relevant on radial mandalas)
    if (this.magicBtn) {
      this.magicBtn.style.display = (this.currentArtwork.type === 'mandala') ? 'inline-flex' : 'none';
    }

    if (this.isVectorArt(this.currentArtwork)) {
      // Vector Mode (SVG)
      if (this.canvas) this.canvas.style.display = 'none';
      if (this.svg) this.svg.style.display = 'block';
      this.userMandalaFills = {};
      this.setupVectorSVG();
    } else {
      // Pixel Mode (Canvas)
      if (this.svg) this.svg.style.display = 'none';
      if (this.canvas) this.canvas.style.display = 'block';

      this.userGrid = [];
      for (let r = 0; r < this.currentArtwork.height; r++) {
        this.userGrid[r] = new Array(this.currentArtwork.width).fill(0);
      }
      this.setupPixelCanvas();
    }

    this.updateProgress();
    this.renderPalette();
  }

  restartArtwork() {
    if (!this.currentArtwork) return;
    this.loadArtwork(this.currentArtworkIndex);
    this.playTone(320, 0.12, 'square');
  }

  nextArtwork() {
    const nextIdx = (this.currentArtworkIndex + 1) % this.artworks.length;
    this.loadArtwork(nextIdx);
  }

  // ==========================================
  // VECTOR ART ENGINE (SVG - COLORING BOOKS & MANDALAS)
  // ==========================================
  setupVectorSVG() {
    if (!this.svg || !this.currentArtwork || !this.currentArtwork.regions) return;
    this.svg.innerHTML = '';
    this.svg.setAttribute('viewBox', '0 0 500 500');

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
      <filter id="vector-shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.12)"/>
      </filter>
    `;
    this.svg.appendChild(defs);

    const regionsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    regionsGroup.setAttribute('id', 'svg-regions-group');

    this.currentArtwork.regions.forEach(reg => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.classList.add('mandala-region');
      g.setAttribute('data-id', reg.id);
      g.setAttribute('data-num', reg.num);

      // Path polygon / shape
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', reg.d);
      path.setAttribute('fill', '#ffffff');
      path.setAttribute('stroke', '#334155');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('stroke-linejoin', 'round');
      g.appendChild(path);

      // Centered Number Label
      if (reg.cx !== undefined && reg.cy !== undefined) {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', reg.cx);
        text.setAttribute('y', reg.cy);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'central');
        text.setAttribute('font-family', "'Fredoka', 'Quicksand', sans-serif");
        text.setAttribute('font-size', '15');
        text.setAttribute('font-weight', '700');
        text.setAttribute('fill', '#64748b');
        text.setAttribute('pointer-events', 'none');
        text.textContent = reg.num;
        g.appendChild(text);
      }

      g.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleVectorRegionClick(reg.id, reg.num);
      });

      regionsGroup.appendChild(g);
    });

    this.svg.appendChild(regionsGroup);
    this.updateVectorHighlights();
  }

  handleVectorRegionClick(regionId, targetNum) {
    if (!this.currentArtwork || !this.isVectorArt(this.currentArtwork)) return;
    if (this.userMandalaFills[regionId]) return; // Already colored

    if (targetNum === this.selectedColorNum) {
      // Correct color selected!
      this.streak++;
      this.playPopSound(this.streak);

      const colorObj = this.currentArtwork.palette.find(p => p.num === targetNum);
      const hex = colorObj ? colorObj.hex : '#ec4899';

      this.fillVectorRegion(regionId, hex);

      // Magic Symmetry autofill (for mandalas)
      if (this.magicSymmetry && this.currentArtwork.type === 'mandala') {
        const prefix = regionId.split('-').slice(0, -1).join('-');
        this.currentArtwork.regions.forEach(r => {
          if (r.id.startsWith(prefix) && r.num === targetNum && !this.userMandalaFills[r.id]) {
            this.fillVectorRegion(r.id, hex);
          }
        });
      }

      const remaining = this.getRemainingCounts();
      if (remaining[targetNum] === 0) {
        this.playColorCompletedSound();
        // IMPORTANT: No auto-select next number! Zayn chooses his next number manually!
      }

      this.updateProgress();
      this.renderPalette();
      this.updateVectorHighlights();
      this.checkVictory();
    } else {
      // Wrong number selected!
      this.streak = 0;
      this.playBoopSound();
      this.svg.classList.add('wobble');
      setTimeout(() => this.svg.classList.remove('wobble'), 280);
    }
  }

  fillVectorRegion(regionId, hex) {
    this.userMandalaFills[regionId] = this.selectedColorNum;
    const g = this.svg.querySelector(`[data-id="${regionId}"]`);
    if (g) {
      const path = g.querySelector('path');
      const text = g.querySelector('text');
      if (path) {
        path.setAttribute('fill', hex);
        path.setAttribute('stroke', 'rgba(0, 0, 0, 0.12)');
      }
      if (text) text.style.display = 'none';
      g.classList.remove('active-target');
    }
  }

  updateVectorHighlights() {
    if (!this.svg || !this.currentArtwork || !this.isVectorArt(this.currentArtwork)) return;
    const allGroups = this.svg.querySelectorAll('.mandala-region');
    allGroups.forEach(g => {
      const num = parseInt(g.getAttribute('data-num'), 10);
      const id = g.getAttribute('data-id');
      const isFilled = !!this.userMandalaFills[id];

      if (!isFilled && num === this.selectedColorNum) {
        g.classList.add('active-target');
      } else {
        g.classList.remove('active-target');
      }
    });
  }

  // ==========================================
  // PIXEL ART ENGINE (CANVAS)
  // ==========================================
  resizeCanvas() {
    if (!this.canvas || !this.currentArtwork || this.currentArtwork.type !== 'pixel') return;
    const wrapper = this.canvas.parentElement;
    if (!wrapper) return;

    const maxW = Math.min(wrapper.clientWidth - 16, 420);
    const maxH = Math.min(wrapper.clientHeight - 16, 420);
    const size = Math.max(Math.min(maxW, maxH), 220);

    const cols = this.currentArtwork.width || 12;
    const rows = this.currentArtwork.height || 12;

    this.cellSize = Math.floor(size / Math.max(cols, rows));
    this.canvas.width = cols * this.cellSize;
    this.canvas.height = rows * this.cellSize;
  }

  setupPixelCanvas() {
    this.resizeCanvas();
    this.drawPixelCanvas();
  }

  drawPixelCanvas(hideNumbers = false) {
    if (!this.ctx || !this.currentArtwork || this.currentArtwork.type !== 'pixel') return;
    const art = this.currentArtwork;
    const ctx = this.ctx;
    const cs = this.cellSize || 28;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let r = 0; r < art.height; r++) {
      for (let c = 0; c < art.width; c++) {
        const targetNum = art.grid[r][c];
        if (targetNum === 0) continue; // transparent background

        const isFilled = this.userGrid[r][c] === targetNum;
        const colorObj = art.palette.find(p => p.num === targetNum);
        const x = c * cs;
        const y = r * cs;

        if (isFilled && colorObj) {
          ctx.fillStyle = colorObj.hex;
          ctx.fillRect(x, y, cs, cs);

          if (!hideNumbers) {
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, cs, cs);
          }
        } else {
          const isTarget = (targetNum === this.selectedColorNum);

          if (isTarget) {
            const glow = Math.sin(this.highlightPulse) * 0.18 + 0.82;
            ctx.fillStyle = `rgba(255, 241, 118, ${0.45 * glow})`;
            ctx.fillRect(x, y, cs, cs);
            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 2;
            ctx.strokeRect(x + 1, y + 1, cs - 2, cs - 2);
          } else {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(x, y, cs, cs);
            ctx.strokeStyle = '#e2e8f0';
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, cs, cs);
          }

          if (!hideNumbers) {
            ctx.fillStyle = isTarget ? '#e65100' : '#64748b';
            ctx.font = `bold ${Math.max(12, Math.floor(cs * 0.44))}px 'Fredoka', 'Quicksand', sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(targetNum, x + cs / 2, y + cs / 2 + 1);
          }
        }
      }
    }
  }

  handlePixelClick(touchX, touchY) {
    if (!this.currentArtwork || this.currentArtwork.type !== 'pixel') return;
    const c = Math.floor(touchX / this.cellSize);
    const r = Math.floor(touchY / this.cellSize);

    if (r < 0 || r >= this.currentArtwork.height || c < 0 || c >= this.currentArtwork.width) {
      return;
    }

    const targetNum = this.currentArtwork.grid[r][c];
    if (targetNum === 0 || this.userGrid[r][c] === targetNum) return;

    if (targetNum === this.selectedColorNum) {
      // Correct pixel!
      this.userGrid[r][c] = targetNum;
      this.streak++;
      this.playPopSound(this.streak);

      const remaining = this.getRemainingCounts();
      if (remaining[targetNum] === 0) {
        this.playColorCompletedSound();
        // IMPORTANT: No auto-select next number! Zayn chooses next number manually!
      }

      this.updateProgress();
      this.renderPalette();
      this.drawPixelCanvas();
      this.checkVictory();
    } else {
      // Wrong number!
      this.streak = 0;
      this.playBoopSound();
      this.canvas.classList.add('wobble');
      setTimeout(() => this.canvas.classList.remove('wobble'), 280);
    }
  }

  // ==========================================
  // SHARED PROGRESS, PALETTE & VICTORY LOGIC
  // ==========================================
  getRemainingCounts() {
    const counts = {};
    if (!this.currentArtwork) return counts;

    this.currentArtwork.palette.forEach(p => {
      counts[p.num] = 0;
    });

    if (this.isVectorArt(this.currentArtwork)) {
      this.currentArtwork.regions.forEach(reg => {
        if (!this.userMandalaFills[reg.id]) {
          counts[reg.num] = (counts[reg.num] || 0) + 1;
        }
      });
    } else {
      for (let r = 0; r < this.currentArtwork.height; r++) {
        for (let c = 0; c < this.currentArtwork.width; c++) {
          const num = this.currentArtwork.grid[r][c];
          if (num > 0 && this.userGrid[r][c] !== num) {
            counts[num] = (counts[num] || 0) + 1;
          }
        }
      }
    }

    return counts;
  }

  updateProgress() {
    if (!this.currentArtwork) return;

    let total = 0;
    let filled = 0;

    if (this.isVectorArt(this.currentArtwork)) {
      total = this.currentArtwork.regions.length;
      filled = Object.keys(this.userMandalaFills).length;
    } else {
      for (let r = 0; r < this.currentArtwork.height; r++) {
        for (let c = 0; c < this.currentArtwork.width; c++) {
          if (this.currentArtwork.grid[r][c] > 0) {
            total++;
            if (this.userGrid[r][c] === this.currentArtwork.grid[r][c]) {
              filled++;
            }
          }
        }
      }
    }

    const pct = total > 0 ? Math.round((filled / total) * 100) : 0;
    if (this.progressFill) this.progressFill.style.width = `${pct}%`;
    if (this.progressText) this.progressText.textContent = `${pct}% (${filled}/${total})`;
  }

  renderPalette() {
    if (!this.paletteBar || !this.currentArtwork) return;
    this.paletteBar.innerHTML = '';

    const remainingCounts = this.getRemainingCounts();
    const currentRemaining = remainingCounts[this.selectedColorNum] || 0;

    // Update banner instruction
    if (this.instructionBanner) {
      if (currentRemaining === 0) {
        this.instructionBanner.className = 'color-instruction-banner complete-banner';
        this.instructionBanner.innerHTML = `🎉 <strong>Great job! All #${this.selectedColorNum}s are colored!</strong> Now pick your next number below 👇`;
      } else {
        this.instructionBanner.className = 'color-instruction-banner';
        this.instructionBanner.innerHTML = `Now coloring <strong>#${this.selectedColorNum}</strong> (${currentRemaining} left) — tap below to switch anytime:`;
      }
    }

    this.currentArtwork.palette.forEach(colorItem => {
      const count = remainingCounts[colorItem.num] || 0;
      const isDone = (count === 0);
      const isSelected = (this.selectedColorNum === colorItem.num);

      const btn = document.createElement('button');
      btn.className = `palette-chip ${isSelected ? 'active' : ''} ${isDone ? 'completed' : ''}`;

      const textColor = this.getContrastColor(colorItem.hex);

      btn.innerHTML = `
        <div class="chip-swatch" style="background-color: ${colorItem.hex}; color: ${textColor};">
          ${isDone ? '✓' : colorItem.num}
        </div>
        <div class="chip-meta">
          <span class="chip-num">#${colorItem.num}</span>
          <span class="chip-count">${isDone ? 'Done!' : `${count} left`}</span>
        </div>
      `;

      btn.addEventListener('click', () => {
        this.playTone(520, 0.08, 'triangle');
        this.selectedColorNum = colorItem.num;
        this.renderPalette();
        if (this.isVectorArt(this.currentArtwork)) {
          this.updateVectorHighlights();
        } else {
          this.drawPixelCanvas();
        }
      });

      this.paletteBar.appendChild(btn);
    });
  }

  getContrastColor(hex) {
    const c = hex.replace('#', '');
    const r = parseInt(c.substr(0, 2), 16);
    const g = parseInt(c.substr(2, 2), 16);
    const b = parseInt(c.substr(4, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.55 ? '#1e293b' : '#ffffff';
  }

  useHint() {
    if (!this.currentArtwork) return;

    if (this.isVectorArt(this.currentArtwork)) {
      // Find an uncolored region of selected color
      let target = this.currentArtwork.regions.find(r => r.num === this.selectedColorNum && !this.userMandalaFills[r.id]);
      if (!target) {
        target = this.currentArtwork.regions.find(r => !this.userMandalaFills[r.id]);
        if (target) {
          this.selectedColorNum = target.num;
          this.renderPalette();
        }
      }

      if (target) {
        const g = this.svg.querySelector(`[data-id="${target.id}"]`);
        if (g) {
          g.classList.add('hint-flash');
          this.playTone(700, 0.15, 'sine');
          setTimeout(() => g.classList.remove('hint-flash'), 1800);
        }
      }
    } else {
      // Find uncolored pixel
      let foundR = -1, foundC = -1;
      for (let r = 0; r < this.currentArtwork.height; r++) {
        for (let c = 0; c < this.currentArtwork.width; c++) {
          if (this.currentArtwork.grid[r][c] === this.selectedColorNum && this.userGrid[r][c] !== this.selectedColorNum) {
            foundR = r; foundC = c;
            break;
          }
        }
        if (foundR !== -1) break;
      }

      if (foundR !== -1) {
        this.playTone(700, 0.15, 'sine');
        // Flash on canvas
        const cs = this.cellSize;
        const x = foundC * cs;
        const y = foundR * cs;
        this.ctx.fillStyle = '#ff1744';
        this.ctx.fillRect(x, y, cs, cs);
        setTimeout(() => this.drawPixelCanvas(), 400);
      }
    }
  }

  checkVictory() {
    const remaining = this.getRemainingCounts();
    const hasRemaining = Object.values(remaining).some(cnt => cnt > 0);

    if (!hasRemaining) {
      // VICTORY!
      this.saveCompleted(this.currentArtwork.id);
      this.playVictoryFanfare();
      this.triggerConfetti();

      // Award Rewards to Zayn's profile!
      if (window.gameState) {
        window.gameState.addAura(50);
        window.gameState.addXP(25);
        window.gameState.addGems(5);
      }

      if (window.helpers) {
        window.helpers.spawnAuraFloatingText("+50 Aura 🎨✨", undefined, undefined, true);
      }

      if (this.winTitle) {
        this.winTitle.textContent = `${this.currentArtwork.title} COMPLETED!`;
      }

      if (this.winModal) {
        this.winModal.classList.remove('hidden');
      }
    }
  }

  // ==========================================
  // GALLERY MODAL (32 ARTWORKS CATALOG)
  // ==========================================
  renderCategoryTabs() {
    if (!this.catTabsContainer) return;
    const categories = [
      { id: 'all', label: 'All Pictures (32)' },
      { id: 'coloring-sheets', label: '🖍️ Coloring Books' },
      { id: 'mandalas', label: '🌸 Mandalas' },
      { id: 'minecraft', label: '🟩 Minecraft' },
      { id: 'cars', label: '🏎️ Cars & Trucks' },
      { id: 'dinosaurs', label: '🦖 Dinosaurs' },
      { id: 'space', label: '🚀 Space' },
      { id: 'animals', label: '🦁 Animals' },
      { id: 'characters', label: '⚡ Characters' }
    ];

    this.catTabsContainer.innerHTML = '';
    categories.forEach(cat => {
      const pill = document.createElement('button');
      pill.className = `color-cat-pill ${this.activeFilter === cat.id ? 'active' : ''}`;
      pill.textContent = cat.label;
      pill.addEventListener('click', () => {
        this.activeFilter = cat.id;
        this.renderCategoryTabs();
        this.renderGalleryGrid();
      });
      this.catTabsContainer.appendChild(pill);
    });
  }

  openGallery() {
    this.renderCategoryTabs();
    this.renderGalleryGrid();
    if (this.galleryModal) this.galleryModal.classList.remove('hidden');
  }

  closeGallery() {
    if (this.galleryModal) this.galleryModal.classList.add('hidden');
  }

  renderGalleryGrid() {
    if (!this.galleryGrid) return;
    this.galleryGrid.innerHTML = '';

    const filtered = this.artworks.filter(art => {
      if (this.activeFilter === 'all') return true;
      if (art.category === this.activeFilter) return true;
      if (art.categories && art.categories.includes(this.activeFilter)) return true;
      return false;
    });

    filtered.forEach(art => {
      const idx = this.artworks.findIndex(a => a.id === art.id);
      const isCompleted = !!this.completedArtworks[art.id];
      const isCurrent = (idx === this.currentArtworkIndex);

      const card = document.createElement('div');
      card.className = `color-art-card ${isCurrent ? 'active-art' : ''} ${isCompleted ? 'completed' : ''}`;

      card.innerHTML = `
        ${isCompleted ? '<span class="color-card-star">⭐</span>' : ''}
        <div class="color-card-icon">${art.icon || '🎨'}</div>
        <div class="color-card-title">${art.title}</div>
        <div class="color-card-badge">${art.difficulty || `${art.palette.length} Colors`}</div>
      `;

      card.addEventListener('click', () => {
        this.loadArtwork(idx);
        this.closeGallery();
      });

      this.galleryGrid.appendChild(card);
    });
  }

  // ==========================================
  // HIGH-RES PNG EXPORT / DOWNLOAD
  // ==========================================
  downloadArtworkPNG() {
    if (!this.currentArtwork) return;

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = 1000;
    exportCanvas.height = 1000;
    const eCtx = exportCanvas.getContext('2d');

    // Soft canvas background
    eCtx.fillStyle = '#ffffff';
    eCtx.fillRect(0, 0, 1000, 1000);

    if (this.isVectorArt(this.currentArtwork)) {
      // Serialize clean SVG to image
      const clone = this.svg.cloneNode(true);
      clone.setAttribute('width', '1000');
      clone.setAttribute('height', '1000');

      // Remove numbers & helper elements
      const texts = clone.querySelectorAll('text');
      texts.forEach(t => t.remove());

      const xml = new XMLSerializer().serializeToString(clone);
      const svg64 = btoa(unescape(encodeURIComponent(xml)));
      const image64 = 'data:image/svg+xml;base64,' + svg64;

      const img = new Image();
      img.onload = () => {
        eCtx.drawImage(img, 0, 0, 1000, 1000);
        this.saveCanvasToFile(exportCanvas);
      };
      img.src = image64;
    } else {
      // Pixel Art scale up cleanly to 1000px
      const art = this.currentArtwork;
      const cs = Math.floor(1000 / Math.max(art.width, art.height));
      const offsetX = Math.floor((1000 - art.width * cs) / 2);
      const offsetY = Math.floor((1000 - art.height * cs) / 2);

      for (let r = 0; r < art.height; r++) {
        for (let c = 0; c < art.width; c++) {
          const num = this.currentArtwork.grid[r][c];
          if (num > 0) {
            const colorObj = art.palette.find(p => p.num === num);
            if (colorObj) {
              eCtx.fillStyle = colorObj.hex;
              eCtx.fillRect(offsetX + c * cs, offsetY + r * cs, cs, cs);
            }
          }
        }
      }
      this.saveCanvasToFile(exportCanvas);
    }
  }

  saveCanvasToFile(canvas) {
    const link = document.createElement('a');
    link.download = `Zayn-Artwork-${(this.currentArtwork.title || 'Masterpiece').replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  // ==========================================
  // CONFETTI CELEBRATION ENGINE
  // ==========================================
  triggerConfetti() {
    if (!this.confettiCanvas) return;
    this.confettiCanvas.width = this.confettiCanvas.clientWidth || 500;
    this.confettiCanvas.height = this.confettiCanvas.clientHeight || 500;

    this.confettiParticles = [];
    const colors = ['#ec4899', '#fbbf24', '#38bdf8', '#10b981', '#a855f7', '#f43f5e'];

    for (let i = 0; i < 90; i++) {
      this.confettiParticles.push({
        x: this.confettiCanvas.width / 2,
        y: this.confettiCanvas.height / 2,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.7) * 14,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 10,
        alpha: 1
      });
    }

    const animateConfetti = () => {
      if (!this.confettiCtx) return;
      this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);

      let alive = false;
      this.confettiParticles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // Gravity
        p.rotation += p.rSpeed;
        p.alpha -= 0.012;

        if (p.alpha > 0) {
          alive = true;
          this.confettiCtx.save();
          this.confettiCtx.translate(p.x, p.y);
          this.confettiCtx.rotate((p.rotation * Math.PI) / 180);
          this.confettiCtx.fillStyle = p.color;
          this.confettiCtx.globalAlpha = Math.max(0, p.alpha);
          this.confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          this.confettiCtx.restore();
        }
      });

      if (alive) {
        requestAnimationFrame(animateConfetti);
      } else {
        this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
      }
    };

    requestAnimationFrame(animateConfetti);
  }

  // ==========================================
  // SYNTHESIZED WEB AUDIO API SOUNDS
  // ==========================================
  getAudioContext() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.audioCtx = new AudioCtx();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  playTone(freq, duration = 0.1, type = 'sine') {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio not permitted or suspended
    }
  }

  playPopSound(streak = 1) {
    const baseFreq = 440;
    const freq = baseFreq * Math.pow(1.05946, Math.min(streak, 16));
    this.playTone(freq, 0.09, 'sine');
  }

  playColorCompletedSound() {
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((f, idx) => {
      setTimeout(() => this.playTone(f, 0.18, 'triangle'), idx * 80);
    });
  }

  playVictoryFanfare() {
    const melody = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    melody.forEach((f, idx) => {
      setTimeout(() => this.playTone(f, 0.35, 'triangle'), idx * 120);
    });
  }

  playBoopSound() {
    this.playTone(180, 0.15, 'sawtooth');
  }

  startPulseLoop() {
    const loop = () => {
      this.highlightPulse += 0.06;
      if (this.currentArtwork && this.currentArtwork.type === 'pixel') {
        this.drawPixelCanvas();
      }
      this.animationFrameId = requestAnimationFrame(loop);
    };
    this.animationFrameId = requestAnimationFrame(loop);
  }
}

if (typeof window !== 'undefined') {
  window.ColorByNumberEngine = ColorByNumberEngine;
}
