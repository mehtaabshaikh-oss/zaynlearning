/**
 * ZAYN SCIENCE LAB - ENGINE & INTERACTIVE WORKBENCHES
 * Implements:
 * 1. Science Lab Home Hub & 5 Science Worlds
 * 2. Science Journal & Terminology Engine
 * 3. States of Matter Lab (Particle Physics Simulation & Temperature)
 * 4. Skeleton Builder Lab (Anatomy Construction & Joint Mechanics)
 * 5. Element Lab & Bohr Atom Viewer (Periodic Table & Atomic Structure)
 * 6. Discovery System & Scientist Ranks (+50 Discovery XP)
 */

class ScienceLabEngine {
  constructor() {
    this.currentView = 'hub'; // 'hub', 'matter', 'skeleton', 'elements'
    this.activeElemIndex = 5; // Default: Carbon (Atomic #6)
    this.matterTemp = 20; // Default: 20°C (Liquid)
    this.matterAnimationId = null;
    this.atomAnimationId = null;
    this.skeletonState = {
      placedBones: new Set(),
      selectedBoneId: null,
      tier: 'explorer' // 'explorer', 'adventurer', 'expert', 'master'
    };

    this.particles = [];
    this.atomAngle = 0;

    this.initDOM();
  }

  initDOM() {
    // Quick Nav Button in Top Header
    const quickBtn = document.getElementById('quick-science-btn');
    if (quickBtn) {
      quickBtn.addEventListener('click', () => {
        if (window.app) window.app.showView('view-science-lab');
        this.renderLabHub();
      });
    }

    // Modal Close Listeners
    document.addEventListener('click', (e) => {
      if (e.target.id === 'close-science-journal-btn' || e.target.closest('#close-science-journal-btn')) {
        const modal = document.getElementById('science-journal-modal');
        if (modal) modal.classList.add('hidden');
      }
      if (e.target.id === 'close-science-discovery-btn' || e.target.closest('#close-science-discovery-btn')) {
        const modal = document.getElementById('science-discovery-modal');
        if (modal) modal.classList.add('hidden');
      }
    });
  }

  // ==========================================================================
  // 1. SCIENCE LAB HOME HUB
  // ==========================================================================
  renderLabHub() {
    this.currentView = 'hub';
    this.stopSimulations();

    const container = document.getElementById('science-lab-container');
    if (!container) return;

    const rank = window.gameState ? window.gameState.getScientistRank() : { title: "Curious Explorer", icon: "🔬" };
    const discXP = window.gameState?.data?.scienceState?.discoveryXP || 0;
    const discCount = Object.keys(window.gameState?.data?.scienceState?.discoveries || {}).length;
    const expCount = window.gameState?.data?.scienceState?.experimentsCount || 0;

    container.innerHTML = `
      <div class="science-header-banner">
        <div class="science-title-wrap">
          <div class="science-agency-badge">🔬 ZAYN SCIENCE LAB</div>
          <h1 class="science-main-title">Experiment. Discover. Understand.</h1>
          <p class="science-main-desc">Manipulate real scientific phenomena, test predictions, uncover the laws of nature, and master scientific principles!</p>
        </div>

        <div class="science-stats-row">
          <div class="science-stat-badge">
            <span>${rank.icon}</span>
            <span>${rank.title}</span>
          </div>
          <div class="science-stat-badge">
            <span>⭐</span>
            <span>${discXP} Discovery XP</span>
          </div>
          <div class="science-stat-badge">
            <span>🧪</span>
            <span>${expCount} Experiments</span>
          </div>
          <button class="science-journal-quick-btn" id="open-journal-hub-btn">
            <span>📖 Science Journal (${discCount})</span>
          </button>
        </div>
      </div>

      <div class="science-worlds-grid">
        <!-- 1. Chemistry Lab -->
        <div class="science-world-card" data-lab="elements">
          <div class="science-world-header">
            <div class="science-world-icon">⚛️</div>
            <div>
              <h3 class="science-world-title">Element Lab & Atom Viewer</h3>
              <span class="science-world-tag">CHEMISTRY LAB</span>
            </div>
          </div>
          <p class="science-world-desc">Explore the interactive Periodic Table! Zoom inside atoms to see protons, neutrons, and orbital electron energy rings.</p>
          <div class="science-world-topics">
            <span class="science-topic-pill">Periodic Table</span>
            <span class="science-topic-pill">Protons & Electrons</span>
            <span class="science-topic-pill">Bohr Model</span>
            <span class="science-topic-pill">Noble Gases</span>
          </div>
          <button class="science-enter-btn">ENTER ELEMENT LAB ➔</button>
        </div>

        <!-- 2. States of Matter -->
        <div class="science-world-card" data-lab="matter">
          <div class="science-world-header">
            <div class="science-world-icon">🧊</div>
            <div>
              <h3 class="science-world-title">States of Matter Lab</h3>
              <span class="science-world-tag">PHYSICS & CHEMISTRY</span>
            </div>
          </div>
          <p class="science-world-desc">Control thermal heat! Watch solid ice crystals melt into fluid water, then boil into energetic gas particles.</p>
          <div class="science-world-topics">
            <span class="science-topic-pill">Solids, Liquids, Gases</span>
            <span class="science-topic-pill">Melting & Freezing</span>
            <span class="science-topic-pill">Evaporation</span>
            <span class="science-topic-pill">Condensation</span>
          </div>
          <button class="science-enter-btn">ENTER MATTER LAB ➔</button>
        </div>

        <!-- 3. Biology Lab: Skeleton Builder -->
        <div class="science-world-card" data-lab="skeleton">
          <div class="science-world-header">
            <div class="science-world-icon">🦴</div>
            <div>
              <h3 class="science-world-title">Skeleton Builder</h3>
              <span class="science-world-tag">HUMAN BIOLOGY LAB</span>
            </div>
          </div>
          <p class="science-world-desc">Construct the human skeletal frame bone by bone! Discover how the femur, skull, ribs, and pivot joints protect and move your body.</p>
          <div class="science-world-topics">
            <span class="science-topic-pill">Femur & Cranium</span>
            <span class="science-topic-pill">Ball-and-Socket Joints</span>
            <span class="science-topic-pill">Hinge Joints</span>
            <span class="science-topic-pill">Organ Protection</span>
          </div>
          <button class="science-enter-btn">BUILD SKELETON ➔</button>
        </div>

        <!-- 4. Biology: Cell & Microscope (Preview) -->
        <div class="science-world-card" style="opacity: 0.9;" data-lab="cell_preview">
          <div class="science-world-header">
            <div class="science-world-icon">🧬</div>
            <div>
              <h3 class="science-world-title">Build a Cell & Microscope</h3>
              <span class="science-world-tag">CELL BIOLOGY</span>
            </div>
          </div>
          <p class="science-world-desc">Examine onion cells under virtual magnification! Assemble cell membranes, mitochondria powerhouses, and plant chloroplasts.</p>
          <div class="science-world-topics">
            <span class="science-topic-pill">Microscopy</span>
            <span class="science-topic-pill">Mitochondria</span>
            <span class="science-topic-pill">Plant vs Animal</span>
          </div>
          <button class="science-enter-btn">COMING SOON (PHASE 2) ➔</button>
        </div>

        <!-- 5. Earth & Solar System (Preview) -->
        <div class="science-world-card" style="opacity: 0.9;" data-lab="space_preview">
          <div class="science-world-header">
            <div class="science-world-icon">🌎</div>
            <div>
              <h3 class="science-world-title">Earth & Solar System</h3>
              <span class="science-world-tag">EARTH & SPACE</span>
            </div>
          </div>
          <p class="science-world-desc">Drill deep into Earth's crust, mantle, and molten core! Race planetary orbits around the Sun and test gravity on Mars and Jupiter.</p>
          <div class="science-world-topics">
            <span class="science-topic-pill">Earth Layers</span>
            <span class="science-topic-pill">Planetary Gravity</span>
            <span class="science-topic-pill">Orbital Periods</span>
          </div>
          <button class="science-enter-btn">COMING SOON (PHASE 4) ➔</button>
        </div>
      </div>
    `;

    document.getElementById('open-journal-hub-btn').addEventListener('click', () => this.openScienceJournal());

    const cards = container.querySelectorAll('.science-world-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const lab = card.dataset.lab;
        if (lab === 'elements' || lab === 'matter' || lab === 'skeleton') {
          this.launchLab(lab);
        } else {
          if (window.helpers) window.helpers.spawnAuraFloatingText("Unlocked in upcoming Science Lab expansion! 🚀", undefined, undefined, true);
        }
      });
    });
  }

  launchLab(labType) {
    this.currentView = labType;
    this.stopSimulations();
    const panel = document.getElementById('view-science-lab');
    if (panel) panel.scrollTop = 0;

    if (labType === 'matter') {
      this.renderStatesOfMatterLab();
    } else if (labType === 'skeleton') {
      this.renderSkeletonBuilderLab();
    } else if (labType === 'elements') {
      this.renderElementLab();
    }
  }

  stopSimulations() {
    if (this.matterAnimationId) {
      cancelAnimationFrame(this.matterAnimationId);
      this.matterAnimationId = null;
    }
    if (this.atomAnimationId) {
      cancelAnimationFrame(this.atomAnimationId);
      this.atomAnimationId = null;
    }
  }

  // ==========================================================================
  // 2. STATES OF MATTER LAB (Thermal Physics Simulation)
  // ==========================================================================
  renderStatesOfMatterLab() {
    const container = document.getElementById('science-lab-container');
    if (!container) return;

    container.innerHTML = `
      <div class="science-workbench">
        <div class="science-workbench-header">
          <div class="science-workbench-title-box">
            <h2 class="science-workbench-title">🧊 States of Matter Lab</h2>
            <p class="science-workbench-subtitle">Adjust thermal temperature to observe molecular kinetic energy and phase changes!</p>
          </div>
          <button class="science-back-btn" id="science-back-to-hub-btn">◀ Science Lab</button>
        </div>

        <div class="matter-stage-layout">
          <!-- Particle Simulation Stage -->
          <div class="matter-canvas-container">
            <canvas id="matter-particle-canvas" width="600" height="360"></canvas>
          </div>

          <!-- Thermal Temperature & Phase Controls -->
          <div class="matter-controls-sidebar">
            <div class="matter-temp-card">
              <span style="font-size:0.8rem; color:#94a3b8; font-weight:700;">THERMAL TEMPERATURE</span>
              <div class="matter-temp-gauge" id="matter-temp-val">${this.matterTemp}°C</div>
              
              <input type="range" class="matter-slider" id="matter-temp-slider" min="-50" max="150" value="${this.matterTemp}">

              <div class="matter-state-badge" id="matter-state-badge">💧 LIQUID WATER</div>

              <div style="display:flex; gap:0.5rem; justify-content:center; margin-top:0.5rem;">
                <button class="science-enter-btn" id="matter-cool-btn" style="flex:1; padding:0.4rem;">❄️ Freeze (0°C)</button>
                <button class="science-enter-btn" id="matter-heat-btn" style="flex:1; padding:0.4rem; background:#dc2626;">🔥 Boil (100°C)</button>
              </div>
            </div>

            <div class="matter-explanation-box" id="matter-explanation-text">
              <strong>💧 Liquid State:</strong> Water molecules have enough kinetic energy to slide past each other, taking the shape of their container.
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('science-back-to-hub-btn').addEventListener('click', () => this.renderLabHub());

    const slider = document.getElementById('matter-temp-slider');
    slider.addEventListener('input', (e) => {
      this.setMatterTemp(parseInt(e.target.value, 10));
    });

    document.getElementById('matter-cool-btn').addEventListener('click', () => {
      this.setMatterTemp(-15);
      slider.value = -15;
    });

    document.getElementById('matter-heat-btn').addEventListener('click', () => {
      this.setMatterTemp(110);
      slider.value = 110;
    });

    this.initMatterParticles();
    this.startMatterSimulation();
  }

  setMatterTemp(temp) {
    this.matterTemp = temp;
    const tempValEl = document.getElementById('matter-temp-val');
    const badgeEl = document.getElementById('matter-state-badge');
    const expEl = document.getElementById('matter-explanation-text');

    if (tempValEl) tempValEl.textContent = `${temp}°C`;

    if (temp <= 0) {
      if (badgeEl) {
        badgeEl.textContent = "🧊 SOLID (ICE)";
        badgeEl.style.color = "#38bdf8";
        badgeEl.style.borderColor = "#38bdf8";
      }
      if (expEl) {
        expEl.innerHTML = `<strong>🧊 Solid State:</strong> Thermal energy is low. Water molecules lock into an organized crystalline lattice, vibrating in place.`;
      }
      this.checkMatterDiscovery('term_freezing');
    } else if (temp < 100) {
      if (badgeEl) {
        badgeEl.textContent = "💧 LIQUID WATER";
        badgeEl.style.color = "#34d399";
        badgeEl.style.borderColor = "#34d399";
      }
      if (expEl) {
        expEl.innerHTML = `<strong>💧 Liquid State:</strong> Heat energy breaks the rigid ice bonds. Molecules flow smoothly and slide past each other.`;
      }
      if (temp > 0 && temp < 30) this.checkMatterDiscovery('term_melting');
    } else {
      if (badgeEl) {
        badgeEl.textContent = "☁️ GAS (WATER VAPOR)";
        badgeEl.style.color = "#f59e0b";
        badgeEl.style.borderColor = "#f59e0b";
      }
      if (expEl) {
        expEl.innerHTML = `<strong>☁️ Gas State:</strong> High heat provides high kinetic energy. Molecules bounce rapidly off container walls and fly far apart!`;
      }
      this.checkMatterDiscovery('term_evaporation');
    }
  }

  checkMatterDiscovery(termId) {
    if (window.gameState) {
      const isNew = window.gameState.unlockDiscovery(termId);
      if (isNew) {
        this.showDiscoveryAlert(termId);
      }
    }
  }

  initMatterParticles() {
    this.particles = [];
    const count = 48;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: 100 + (i % 8) * 45 + Math.random() * 5,
        y: 80 + Math.floor(i / 8) * 40 + Math.random() * 5,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        baseX: 100 + (i % 8) * 45,
        baseY: 80 + Math.floor(i / 8) * 40
      });
    }
  }

  startMatterSimulation() {
    const canvas = document.getElementById('matter-particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const loop = () => {
      if (this.currentView !== 'matter') return;
      this.updateAndRenderMatter(ctx, canvas);
      this.matterAnimationId = requestAnimationFrame(loop);
    };
    this.matterAnimationId = requestAnimationFrame(loop);
  }

  updateAndRenderMatter(ctx, canvas) {
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Beaker Container Outline
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(70, 40);
    ctx.lineTo(70, 310);
    ctx.lineTo(530, 310);
    ctx.lineTo(530, 40);
    ctx.stroke();

    // Burner Heat Glow under Beaker if temp > 50
    if (this.matterTemp > 50) {
      const flameAlpha = Math.min(1, (this.matterTemp - 50) / 100);
      ctx.fillStyle = `rgba(239, 68, 68, ${flameAlpha * 0.5})`;
      ctx.beginPath();
      ctx.arc(300, 340, 60, 0, Math.PI * 2);
      ctx.fill();
    }

    const temp = this.matterTemp;
    const speedMult = temp <= 0 ? 0.3 : (temp < 100 ? (temp / 40) + 1 : (temp / 15) + 3);

    for (let p of this.particles) {
      if (temp <= 0) {
        // Solid Lattice Vibration
        p.x = p.baseX + (Math.random() - 0.5) * 2.5;
        p.y = p.baseY + (Math.random() - 0.5) * 2.5;
      } else if (temp < 100) {
        // Liquid translation bounded by gravity & beaker
        p.x += p.vx * speedMult * 0.4;
        p.y += p.vy * speedMult * 0.4 + 0.3; // gentle gravity pull

        if (p.x < 85) { p.x = 85; p.vx *= -1; }
        if (p.x > 515) { p.x = 515; p.vx *= -1; }
        if (p.y < 120) { p.y = 120; p.vy *= -1; }
        if (p.y > 295) { p.y = 295; p.vy *= -0.8; }
      } else {
        // Gas high-speed dispersion
        p.x += p.vx * speedMult * 0.6;
        p.y += p.vy * speedMult * 0.6 - 0.5; // thermal lift

        if (p.x < 85) { p.x = 85; p.vx *= -1; }
        if (p.x > 515) { p.x = 515; p.vx *= -1; }
        if (p.y < 30) { p.y = 30; p.vy *= -1; }
        if (p.y > 295) { p.y = 295; p.vy *= -1; }
      }

      // Draw H2O Molecule: Oxygen (Red) + 2 Hydrogen (White/Cyan)
      ctx.fillStyle = temp <= 0 ? '#38bdf8' : (temp < 100 ? '#3b82f6' : '#f59e0b');
      ctx.beginPath();
      ctx.arc(p.x, p.y, 9, 0, Math.PI * 2);
      ctx.fill();

      // Hydrogen ears
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(p.x - 7, p.y - 7, 5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(p.x + 7, p.y - 7, 5, 0, Math.PI * 2); ctx.fill();
    }
  }

  // ==========================================================================
  // 3. SKELETON BUILDER LAB (Human Skeletal Anatomy)
  // ==========================================================================
  renderSkeletonBuilderLab() {
    const container = document.getElementById('science-lab-container');
    if (!container) return;

    const bones = window.SKELETON_BONES || [];
    const placedCount = this.skeletonState.placedBones.size;

    container.innerHTML = `
      <div class="science-workbench">
        <div class="science-workbench-header">
          <div class="science-workbench-title-box">
            <h2 class="science-workbench-title">🦴 Skeleton Builder Lab</h2>
            <p class="science-workbench-subtitle">Assemble the human skeletal system and discover how authentic bones and joints function!</p>
          </div>
          <div style="display:flex; gap:0.8rem; align-items:center;">
            <div class="science-stat-badge">🦴 ${placedCount} / ${bones.length} Bones Assembled</div>
            <button class="science-back-btn" id="science-back-to-hub-btn">◀ Science Lab</button>
          </div>
        </div>

        <div class="skeleton-layout">
          <!-- Anatomical Silhouette Stage -->
          <div class="skeleton-silhouette-stage">
            <canvas id="skeleton-canvas" width="400" height="440"></canvas>
          </div>

          <!-- Bone Inventory Tray -->
          <div class="skeleton-inventory-panel">
            <h4 style="font-family:var(--font-mono); font-size:0.9rem; color:#fde047; margin:0;">BONE INVENTORY TRAY</h4>
            <p style="font-size:0.8rem; color:#94a3b8; margin:0;">Tap a bone flashcard, then tap its target on the x-ray silhouette!</p>

            <div class="skeleton-bones-grid" id="skeleton-bones-grid">
              ${bones.map(b => `
                <button class="bone-token-btn ${this.skeletonState.placedBones.has(b.id) ? 'placed' : ''} ${this.skeletonState.selectedBoneId === b.id ? 'selected' : ''}" data-bone="${b.id}">
                  <div class="bone-token-svg-wrap">${this.getBoneTokenSVG(b.boneType, b.side)}</div>
                  <span class="bone-token-name">${b.name}</span>
                  <span class="bone-token-joint">${b.joint.split('(')[0]}</span>
                </button>
              `).join('')}
            </div>

            <div class="matter-explanation-box" id="skeleton-bone-info-box">
              💡 Select a bone from the tray to inspect its anatomical function and joint type!
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('science-back-to-hub-btn').addEventListener('click', () => this.renderLabHub());

    // Bind Bone Selection
    const boneBtns = container.querySelectorAll('.bone-token-btn');
    boneBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const boneId = btn.dataset.bone;
        this.selectBone(boneId);
      });
    });

    // Canvas click handling for target placement
    const canvas = document.getElementById('skeleton-canvas');
    if (canvas) {
      canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        this.handleSkeletonCanvasClick(x, y);
      });
    }

    this.renderSkeletonCanvas();
  }

  getBoneTokenSVG(boneType, side) {
    const fill = "#f1f5f9";
    const stroke = "#cbd5e1";

    if (boneType === "skull") {
      return `
        <svg viewBox="0 0 40 40" class="bone-mini-svg">
          <ellipse cx="20" cy="18" rx="13" ry="14" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>
          <path d="M 12 25 L 14 34 L 26 34 L 28 25 Z" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>
          <ellipse cx="16" cy="18" rx="3.5" ry="4" fill="#0f172a"/>
          <ellipse cx="24" cy="18" rx="3.5" ry="4" fill="#0f172a"/>
          <polygon points="20,22 18,26 22,26" fill="#0f172a"/>
          <line x1="16" y1="30" x2="24" y2="30" stroke="#0f172a" stroke-width="1"/>
        </svg>
      `;
    }

    if (boneType === "spine") {
      return `
        <svg viewBox="0 0 24 40" class="bone-mini-svg">
          <rect x="9" y="3" width="6" height="34" rx="3" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>
          <line x1="5" y1="8" x2="19" y2="8" stroke="${fill}" stroke-width="2" stroke-linecap="round"/>
          <line x1="5" y1="16" x2="19" y2="16" stroke="${fill}" stroke-width="2" stroke-linecap="round"/>
          <line x1="5" y1="24" x2="19" y2="24" stroke="${fill}" stroke-width="2" stroke-linecap="round"/>
          <line x1="5" y1="32" x2="19" y2="32" stroke="${fill}" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;
    }

    if (boneType === "ribs") {
      return `
        <svg viewBox="0 0 40 40" class="bone-mini-svg">
          <rect x="18" y="5" width="4" height="28" rx="2" fill="${fill}"/>
          <path d="M 8 10 Q 20 6 32 10" fill="none" stroke="${fill}" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M 6 16 Q 20 12 34 16" fill="none" stroke="${fill}" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M 6 22 Q 20 18 34 22" fill="none" stroke="${fill}" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M 8 28 Q 20 25 32 28" fill="none" stroke="${fill}" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
      `;
    }

    if (boneType === "pelvis") {
      return `
        <svg viewBox="0 0 40 32" class="bone-mini-svg">
          <path d="M 5 6 C 5 20, 14 26, 20 26 C 26 26, 35 20, 35 6 C 30 10, 26 8, 20 12 C 14 8, 10 10, 5 6 Z" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>
          <ellipse cx="13" cy="18" rx="4" ry="5" fill="#0f172a"/>
          <ellipse cx="27" cy="18" rx="4" ry="5" fill="#0f172a"/>
        </svg>
      `;
    }

    if (boneType === "humerus" || boneType === "femur") {
      return `
        <svg viewBox="0 0 24 40" class="bone-mini-svg">
          <circle cx="8" cy="7" r="4" fill="${fill}"/>
          <circle cx="16" cy="7" r="4" fill="${fill}"/>
          <rect x="9" y="8" width="6" height="24" rx="2" fill="${fill}"/>
          <circle cx="8" cy="33" r="4" fill="${fill}"/>
          <circle cx="16" cy="33" r="4" fill="${fill}"/>
        </svg>
      `;
    }

    // Forearm & Tibia (paired long bones)
    return `
      <svg viewBox="0 0 24 40" class="bone-mini-svg">
        <line x1="8" y1="5" x2="8" y2="35" stroke="${fill}" stroke-width="4" stroke-linecap="round"/>
        <line x1="16" y1="8" x2="16" y2="32" stroke="${fill}" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="8" cy="5" r="3.5" fill="${fill}"/>
        <circle cx="8" cy="35" r="3.5" fill="${fill}"/>
      </svg>
    `;
  }

  selectBone(boneId) {
    this.skeletonState.selectedBoneId = boneId;
    const b = (window.SKELETON_BONES || []).find(x => x.id === boneId);
    const infoBox = document.getElementById('skeleton-bone-info-box');

    if (b && infoBox) {
      infoBox.innerHTML = `
        <strong style="color:#fde047; font-size:1rem;">${b.name}</strong><br>
        <span style="color:#38bdf8; font-size:0.8rem; font-weight:700;">Joint Type: ${b.joint}</span><br>
        <span style="font-size:0.85rem; line-height:1.4; color:#f8fafc; display:block; margin:0.3rem 0;">${b.desc}</span>
        <em style="color:#cbd5e1; font-size:0.8rem; display:block;">✨ ${b.fact}</em>
      `;
    }

    // Refresh button selection styles
    const boneBtns = document.querySelectorAll('.bone-token-btn');
    boneBtns.forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.bone === boneId);
    });

    if (window.soundEngine) window.soundEngine.playTap();
    this.renderSkeletonCanvas();
  }

  handleSkeletonCanvasClick(x, y) {
    if (!this.skeletonState.selectedBoneId) return;

    const b = (window.SKELETON_BONES || []).find(item => item.id === this.skeletonState.selectedBoneId);
    if (!b) return;

    const dist = Math.hypot(x - b.targetX, y - b.targetY);
    if (dist < 45) {
      // Correct anatomical placement!
      this.skeletonState.placedBones.add(b.id);
      this.skeletonState.selectedBoneId = null;

      if (window.soundEngine) window.soundEngine.playLevelUp();
      if (window.helpers) window.helpers.spawnAuraFloatingText(`${b.name.split('(')[0]} PLACED! 🦴✨`, x, y, true);

      // Unlock term in Science Journal
      if (b.id.includes('femur')) this.checkMatterDiscovery('term_femur');
      if (b.id.includes('skull')) this.checkMatterDiscovery('term_cranium');

      this.renderSkeletonBuilderLab();
    } else {
      if (window.soundEngine) window.soundEngine.playWrong();
      if (window.helpers) window.helpers.spawnAuraFloatingText("Check anatomical position!", x, y, false);
    }
  }

  renderSkeletonCanvas() {
    const canvas = document.getElementById('skeleton-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Deep X-Ray Lab Background
    ctx.fillStyle = '#060913';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle Medical X-Ray Grid
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 20; x < canvas.width; x += 30) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 20; y < canvas.height; y += 30) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    // Human Body Silhouette Outline (Subtle Cyan Glow)
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    // Head & Neck
    ctx.arc(200, 50, 32, 0, Math.PI * 2);
    // Torso & Shoulders
    ctx.moveTo(135, 100); ctx.lineTo(265, 100); // Shoulders
    ctx.moveTo(140, 100); ctx.lineTo(120, 230); // Left Arm Contour
    ctx.moveTo(260, 100); ctx.lineTo(280, 230); // Right Arm Contour
    ctx.moveTo(150, 195); ctx.lineTo(250, 195); // Waist
    ctx.moveTo(175, 200); ctx.lineTo(165, 395); // Left Leg Contour
    ctx.moveTo(225, 200); ctx.lineTo(235, 395); // Right Leg Contour
    ctx.stroke();

    const bones = window.SKELETON_BONES || [];
    bones.forEach(b => {
      const isPlaced = this.skeletonState.placedBones.has(b.id);
      const isSelected = this.skeletonState.selectedBoneId === b.id;

      if (isPlaced) {
        this.drawAnatomicalBone(ctx, b);
      } else {
        // Glowing X-Ray Target Snapping Socket
        ctx.save();
        ctx.strokeStyle = isSelected ? '#fde047' : 'rgba(56, 189, 248, 0.4)';
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = isSelected ? 2.5 : 1.5;
        
        ctx.beginPath();
        ctx.roundRect(b.targetX - b.width / 2, b.targetY - b.height / 2, b.width, b.height, 10);
        ctx.stroke();
        ctx.setLineDash([]);

        if (isSelected) {
          ctx.fillStyle = 'rgba(253, 224, 71, 0.15)';
          ctx.fill();
        }

        // Draw bone blueprint ghost outline inside socket
        this.drawAnatomicalBoneBlueprint(ctx, b, isSelected);
        ctx.restore();
      }
    });
  }

  drawAnatomicalBone(ctx, b) {
    ctx.save();
    const x = b.targetX;
    const y = b.targetY;

    // Bone Ivory Gradient Fill
    const boneGrad = ctx.createLinearGradient(x - 20, y - 20, x + 20, y + 20);
    boneGrad.addColorStop(0, '#ffffff');
    boneGrad.addColorStop(0.7, '#e2e8f0');
    boneGrad.addColorStop(1, '#cbd5e1');

    ctx.fillStyle = boneGrad;
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;

    if (b.boneType === 'skull') {
      // Cranium dome
      ctx.beginPath();
      ctx.ellipse(x, y - 5, 24, 25, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Facial / Jaw structure
      ctx.beginPath();
      ctx.moveTo(x - 14, y + 10);
      ctx.lineTo(x - 10, y + 22);
      ctx.lineTo(x + 10, y + 22);
      ctx.lineTo(x + 14, y + 10);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Eye Sockets (Orbits)
      ctx.fillStyle = '#0f172a';
      ctx.beginPath(); ctx.ellipse(x - 8, y - 2, 5, 6, -0.1, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(x + 8, y - 2, 5, 6, 0.1, 0, Math.PI * 2); ctx.fill();

      // Nasal Cavity
      ctx.beginPath();
      ctx.moveTo(x, y + 4); ctx.lineTo(x - 2.5, y + 10); ctx.lineTo(x + 2.5, y + 10);
      ctx.closePath(); ctx.fill();

      // Teeth row
      ctx.strokeStyle = '#64748b';
      ctx.beginPath();
      ctx.moveTo(x - 8, y + 17); ctx.lineTo(x + 8, y + 17);
      ctx.moveTo(x - 4, y + 14); ctx.lineTo(x - 4, y + 20);
      ctx.moveTo(x, y + 14); ctx.lineTo(x, y + 20);
      ctx.moveTo(x + 4, y + 14); ctx.lineTo(x + 4, y + 20);
      ctx.stroke();
    } else if (b.boneType === 'spine') {
      // Vertebral Column Segments
      for (let i = -35; i <= 35; i += 10) {
        ctx.beginPath();
        ctx.roundRect(x - 7, y + i - 3, 14, 7, 3);
        ctx.fill(); ctx.stroke();
        // Transverse processes (side wings)
        ctx.beginPath();
        ctx.moveTo(x - 11, y + i); ctx.lineTo(x - 7, y + i);
        ctx.moveTo(x + 7, y + i); ctx.lineTo(x + 11, y + i);
        ctx.stroke();
      }
    } else if (b.boneType === 'ribs') {
      // Sternum Center Plate
      ctx.beginPath();
      ctx.roundRect(x - 4, y - 25, 8, 48, 3);
      ctx.fill(); ctx.stroke();

      // Curved Bilateral Rib Arches
      ctx.lineWidth = 2.5;
      const ribOffsets = [-18, -9, 0, 9, 18];
      ribOffsets.forEach((ro, idx) => {
        const spread = 28 - idx * 2;
        ctx.beginPath();
        ctx.arc(x - 4, y + ro, spread, -Math.PI * 0.1, Math.PI * 0.45, false);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x + 4, y + ro, spread, Math.PI * 1.1, Math.PI * 0.55, true);
        ctx.stroke();
      });

      // Clavicles (Collarbones)
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x - 30, y - 28); ctx.quadraticCurveTo(x - 15, y - 32, x - 4, y - 26);
      ctx.moveTo(x + 30, y - 28); ctx.quadraticCurveTo(x + 15, y - 32, x + 4, y - 26);
      ctx.stroke();
    } else if (b.boneType === 'pelvis') {
      // Flared Iliac Wings & Pelvic Basin
      ctx.beginPath();
      ctx.moveTo(x - 35, y - 18);
      ctx.bezierCurveTo(x - 38, y + 8, x - 18, y + 20, x, y + 16);
      ctx.bezierCurveTo(x + 18, y + 20, x + 38, y + 8, x + 35, y - 18);
      ctx.quadraticCurveTo(x, y - 8, x - 35, y - 18);
      ctx.fill(); ctx.stroke();

      // Obturator Foramen Cavities
      ctx.fillStyle = '#060913';
      ctx.beginPath(); ctx.ellipse(x - 14, y + 8, 7, 6, 0.2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(x + 14, y + 8, 7, 6, -0.2, 0, Math.PI * 2); ctx.fill();

      // Sacrum Center
      ctx.fillStyle = '#cbd5e1';
      ctx.beginPath();
      ctx.moveTo(x - 7, y - 14); ctx.lineTo(x + 7, y - 14); ctx.lineTo(x, y + 2);
      ctx.closePath(); ctx.fill();
    } else if (b.boneType === 'humerus') {
      // Upper arm bone
      const isLeft = b.side === 'left';
      const angle = isLeft ? -0.15 : 0.15;
      ctx.translate(x, y);
      ctx.rotate(angle);

      // Spherical Ball Joint (Head)
      ctx.beginPath(); ctx.arc(0, -22, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      // Shaft
      ctx.beginPath(); ctx.roundRect(-4, -18, 8, 36, 3); ctx.fill(); ctx.stroke();
      // Distal Condyles (Elbow)
      ctx.beginPath(); ctx.arc(-4, 20, 4, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.arc(4, 20, 4, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    } else if (b.boneType === 'forearm') {
      // Radius & Ulna paired bones + Skeletal Hand
      const isLeft = b.side === 'left';
      ctx.translate(x, y);
      ctx.rotate(isLeft ? -0.1 : 0.1);

      // Radius Bone (lateral)
      ctx.beginPath(); ctx.roundRect(-7, -22, 4.5, 38, 2); ctx.fill(); ctx.stroke();
      // Ulna Bone (medial)
      ctx.beginPath(); ctx.roundRect(2, -22, 4.5, 38, 2); ctx.fill(); ctx.stroke();

      // Skeletal Hand (Carpals & Phalanges)
      ctx.fillStyle = '#cbd5e1';
      ctx.beginPath(); ctx.ellipse(0, 20, 5, 3, 0, 0, Math.PI * 2); ctx.fill(); // Carpals wrist
      // 5 Finger Rays
      ctx.lineWidth = 1.2;
      for (let f = -4; f <= 4; f += 2) {
        ctx.beginPath();
        ctx.moveTo(f, 22); ctx.lineTo(f * 1.5, 29);
        ctx.stroke();
      }
    } else if (b.boneType === 'femur') {
      // Thigh Bone
      const isLeft = b.side === 'left';
      ctx.translate(x, y);
      ctx.rotate(isLeft ? 0.05 : -0.05);

      // Femoral Head (Ball Socket)
      ctx.beginPath(); ctx.arc(isLeft ? 6 : -6, -28, 7, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      // Strong Femoral Shaft
      ctx.beginPath(); ctx.roundRect(-5, -24, 10, 48, 4); ctx.fill(); ctx.stroke();
      // Knee Condyles
      ctx.beginPath(); ctx.arc(-5, 26, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.arc(5, 26, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    } else if (b.boneType === 'tibia') {
      // Lower Leg: Thick Tibia + Slender Fibula + Skeletal Foot
      const isLeft = b.side === 'left';
      ctx.translate(x, y);

      // Broad Tibial Plateau (Knee base)
      ctx.beginPath(); ctx.roundRect(-4, -28, 9, 50, 3); ctx.fill(); ctx.stroke();
      // Slender Fibula Strut
      ctx.beginPath(); ctx.roundRect(isLeft ? -9 : 6, -24, 3, 44, 1.5); ctx.fill(); ctx.stroke();

      // Skeletal Foot (Tarsals, Metatarsals, Phalanges)
      ctx.fillStyle = '#cbd5e1';
      ctx.beginPath(); ctx.ellipse(0, 26, 6, 4, 0, 0, Math.PI * 2); ctx.fill(); // Heel
      // 5 Toe Rays
      ctx.lineWidth = 1.2;
      for (let t = -4; t <= 4; t += 2) {
        ctx.beginPath();
        ctx.moveTo(t, 28); ctx.lineTo(t * 1.6 + (isLeft ? -2 : 2), 34);
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  drawAnatomicalBoneBlueprint(ctx, b, isSelected) {
    ctx.save();
    ctx.strokeStyle = isSelected ? '#fde047' : 'rgba(56, 189, 248, 0.35)';
    ctx.fillStyle = isSelected ? 'rgba(253, 224, 71, 0.1)' : 'rgba(56, 189, 248, 0.05)';
    ctx.lineWidth = 1;

    const x = b.targetX;
    const y = b.targetY;

    if (b.boneType === 'skull') {
      ctx.beginPath(); ctx.ellipse(x, y - 5, 20, 20, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(x - 7, y - 2, 4, 5, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(x + 7, y - 2, 4, 5, 0, 0, Math.PI * 2); ctx.stroke();
    } else if (b.boneType === 'spine') {
      ctx.beginPath(); ctx.roundRect(x - 5, y - 35, 10, 70, 4); ctx.fill(); ctx.stroke();
    } else if (b.boneType === 'ribs') {
      ctx.beginPath(); ctx.roundRect(x - 3, y - 20, 6, 40, 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(x - 4, y - 5, 22, -0.3, 0.7, false); ctx.stroke();
      ctx.beginPath(); ctx.arc(x + 4, y - 5, 22, Math.PI * 1.3, Math.PI * 0.3, true); ctx.stroke();
    } else if (b.boneType === 'pelvis') {
      ctx.beginPath(); ctx.arc(x, y, 22, Math.PI * 0.8, Math.PI * 0.2, true); ctx.stroke();
    } else {
      // Long bone silhouette
      ctx.beginPath(); ctx.roundRect(x - 4, y - 22, 8, 44, 3); ctx.fill(); ctx.stroke();
    }

    ctx.restore();
  }

  // ==========================================================================
  // 4. ELEMENT LAB & BOHR ATOM VIEWER (Periodic Table)
  // ==========================================================================
  renderElementLab() {
    const container = document.getElementById('science-lab-container');
    if (!container) return;

    const elements = window.PERIODIC_ELEMENTS || [];
    const activeElem = elements[this.activeElemIndex] || elements[0];

    container.innerHTML = `
      <div class="science-workbench">
        <div class="science-workbench-header">
          <div class="science-workbench-title-box">
            <h2 class="science-workbench-title">⚛️ Element Lab & Atom Viewer</h2>
            <p class="science-workbench-subtitle">Explore the elements of the universe! Inspect protons, neutrons, and orbital electron shells.</p>
          </div>
          <div style="display:flex; gap:0.5rem; align-items:center;">
            <button class="science-quiz-launch-btn" id="element-quiz-header-btn">🧪 Take Pop Quiz (+100 Aura)</button>
            <button class="science-back-btn" id="science-back-to-hub-btn">◀ Science Lab</button>
          </div>
        </div>

        <div class="element-lab-layout">
          <!-- Family Filter Bar -->
          <div class="element-filter-bar" id="element-filter-bar">
            <button class="elem-cat-btn active" data-family="all">ALL ELEMENTS</button>
            <button class="elem-cat-btn" data-family="nonmetal">NONMETALS</button>
            <button class="elem-cat-btn" data-family="noble">NOBLE GASES</button>
            <button class="elem-cat-btn" data-family="alkali">ALKALI METALS</button>
            <button class="elem-cat-btn" data-family="transition">TRANSITION METALS</button>
            <button class="elem-cat-btn" data-family="metalloid">METALLOIDS</button>
          </div>

          <!-- Periodic Table Grid -->
          <div class="periodic-table-grid" id="periodic-table-grid">
            ${elements.map((el, idx) => `
              <div class="elem-tile ${idx === this.activeElemIndex ? 'selected' : ''}" data-idx="${idx}" data-group="${el.group}">
                <span class="elem-tile-num">${el.num}</span>
                <span class="elem-tile-sym">${el.sym}</span>
                <span class="elem-tile-name">${el.name}</span>
              </div>
            `).join('')}
          </div>

          <!-- Atom Viewer & Element Detail Card -->
          <div class="atom-inspector-box">
            <div class="atom-canvas-wrap">
              <canvas id="atom-viewer-canvas" width="260" height="260"></canvas>
            </div>

            <div class="atom-info-details">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <h3 class="atom-info-title">${activeElem.name} (${activeElem.sym})</h3>
                <span class="science-topic-pill" style="background:#0284c7; color:#fff;">${activeElem.family}</span>
              </div>

              <div class="atom-particles-row">
                <div class="atom-part-badge">🔴 Protons: ${activeElem.protons}</div>
                <div class="atom-part-badge">⚪ Neutrons: ${Math.round(activeElem.mass - activeElem.protons)}</div>
                <div class="atom-part-badge">⚡ Electrons: ${activeElem.electrons}</div>
                <div class="atom-part-badge">⚖️ Mass: ${activeElem.mass} u</div>
              </div>

              <p style="color:#e2e8f0; font-size:0.95rem; line-height:1.5;">
                <strong>Common Uses:</strong> ${activeElem.uses}
              </p>

              <div class="matter-explanation-box" style="background:#0f172a;">
                <strong>💡 Fun Fact:</strong> ${activeElem.fact}
              </div>
            </div>
          </div>

          <!-- Bottom Quiz CTA Banner -->
          <div class="element-quiz-cta-banner">
            <div>
              <h4>🎯 Test Your Real-World Element Knowledge!</h4>
              <p>Ready for a quick 5-question pop quiz on balloons, fireworks, store lights, diamonds & metals?</p>
            </div>
            <button class="science-quiz-launch-btn" id="element-quiz-bottom-btn">Start Element Quiz ➔</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('science-back-to-hub-btn').addEventListener('click', () => this.renderLabHub());

    // Bind Quiz Launch Buttons
    const startQuiz = () => this.openElementQuizModal();
    const qHeaderBtn = document.getElementById('element-quiz-header-btn');
    if (qHeaderBtn) qHeaderBtn.addEventListener('click', startQuiz);
    const qBottomBtn = document.getElementById('element-quiz-bottom-btn');
    if (qBottomBtn) qBottomBtn.addEventListener('click', startQuiz);

    // Filter Buttons
    const filterBtns = container.querySelectorAll('.elem-cat-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const family = btn.dataset.family;
        const tiles = container.querySelectorAll('.elem-tile');
        tiles.forEach(t => {
          if (family === 'all' || t.dataset.group === family) {
            t.style.display = 'flex';
          } else {
            t.style.display = 'none';
          }
        });
      });
    });

    // Element Tile Clicks
    const tiles = container.querySelectorAll('.elem-tile');
    tiles.forEach(t => {
      t.addEventListener('click', () => {
        this.activeElemIndex = parseInt(t.dataset.idx, 10);
        if (window.soundEngine) window.soundEngine.playTap();
        this.checkMatterDiscovery('term_atom');
        this.renderElementLab();
      });
    });

    this.startAtomViewer();
  }

  // ==========================================================================
  // REAL-WORLD ELEMENT POP QUIZ ENGINE
  // ==========================================================================
  openElementQuizModal() {
    let modal = document.getElementById('element-quiz-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'element-quiz-modal';
      modal.className = 'element-quiz-modal';
      document.body.appendChild(modal);
    }

    const quizQuestions = [
      {
        topic: "🎈 PARTY BALLOONS",
        question: "Which light, non-flammable gas is used to make party balloons float high in the air?",
        options: ["Helium (He)", "Nitrogen (N)", "Carbon (C)", "Iron (Fe)"],
        correct: 0,
        fact: "Helium is much lighter than regular air, so it lifts balloons up effortlessly and never catches fire!"
      },
      {
        topic: "🎆 FIREWORKS SPARKS",
        question: "Which metallic element is added to fireworks and flares to create an intense, blinding white spark?",
        options: ["Magnesium (Mg)", "Helium (He)", "Gold (Au)", "Fluorine (F)"],
        correct: 0,
        fact: "Magnesium burns at over 3,000°C producing brilliant white light seen across city fireworks shows!"
      },
      {
        topic: "🏬 STOREFRONT LIGHTS",
        question: "Which noble gas is used in bright glowing signs outside stores and restaurants to shine reddish-orange?",
        options: ["Neon (Ne)", "Calcium (Ca)", "Sodium (Na)", "Aluminum (Al)"],
        correct: 0,
        fact: "When electrical current passes through Neon gas in a glass tube, its electrons get excited and glow bright reddish-orange!"
      },
      {
        topic: "💎 DIAMONDS & GEMS",
        question: "How are sparkling diamonds formed deep under the Earth?",
        options: [
          "Carbon atoms compressed under extreme heat and pressure",
          "Helium gas frozen into ice crystals",
          "Gold metal melted in volcano lava",
          "Silicon sand baked under sunlight"
        ],
        correct: 0,
        fact: "Both soft black pencil graphite and super-hard sparkling diamonds are made of pure Carbon atoms arranged differently!"
      },
      {
        topic: "👑 PRECIOUS METALS",
        question: "Which highly valuable precious metal never rusts or tarnishes, even after thousands of years buried underwater?",
        options: ["Gold (Au)", "Iron (Fe)", "Sodium (Na)", "Potassium (K)"],
        correct: 0,
        fact: "Gold is chemically unreactive, which is why ancient Egyptian gold treasures still shine like brand new today!"
      },
      {
        topic: "💻 COMPUTER CHIPS",
        question: "Which metalloid element found in beach sand is purified to manufacture computer processors, iPads, and smartphones?",
        options: ["Silicon (Si)", "Calcium (Ca)", "Chlorine (Cl)", "Hydrogen (H)"],
        correct: 0,
        fact: "Silicon is a semiconductor that controls electrical logic gates inside every computer and smartphone chip!"
      },
      {
        topic: "🧂 KITCHEN SCIENCE",
        question: "When soft reactive Sodium metal (Na) bonds with poisonous Chlorine gas (Cl), what everyday kitchen food item is made?",
        options: ["Table Salt (NaCl)", "White Sugar", "Baking Soda", "Black Pepper"],
        correct: 0,
        fact: "Two dangerous raw elements chemically bond into delicious, essential table salt (Sodium Chloride)!"
      },
      {
        topic: "🦴 STRONG BONES & TEETH",
        question: "Which essential mineral element makes up 99% of human bones and teeth?",
        options: ["Calcium (Ca)", "Copper (Cu)", "Helium (He)", "Sulfur (S)"],
        correct: 0,
        fact: "Calcium forms the strong mineral scaffolding of your skeleton, keeping bones tough and teeth resilient!"
      },
      {
        topic: "🔋 RECHARGEABLE BATTERIES",
        question: "Which ultra-lightweight metal powers the rechargeable batteries inside iPhones, iPads, and Tesla electric cars?",
        options: ["Lithium (Li)", "Lead (Pb)", "Silver (Ag)", "Boron (B)"],
        correct: 0,
        fact: "Lithium is so light it floats on water, and easily transports electrons back and forth during charging!"
      }
    ];

    // Pick 5 random questions
    const selected = quizQuestions.sort(() => Math.random() - 0.5).slice(0, 5);
    let currentQIdx = 0;
    let score = 0;
    let answered = false;

    const renderCurrentQuestion = () => {
      if (currentQIdx >= selected.length) {
        // Quiz Complete Screen
        if (window.soundEngine) window.soundEngine.playLevelUp();
        if (window.helpers) {
          window.helpers.spawnConfetti(80);
          window.helpers.spawnAuraFloatingText("🎉 QUIZ COMPLETED! +100 Aura • +50 XP", undefined, undefined, true);
        }
        if (window.gameState) {
          window.gameState.addAura(100);
          window.gameState.addXP(50);
          window.gameState.addGems(15);
        }

        modal.innerHTML = `
          <div class="element-quiz-card">
            <div class="element-quiz-summary">
              <div class="element-quiz-summary-trophy">🏆✨</div>
              <h3 class="element-quiz-summary-title">Element Quiz Complete!</h3>
              <p class="element-quiz-summary-score">You scored <strong>${score} / ${selected.length}</strong> correct!</p>
              
              <div class="element-quiz-rewards-row">
                <span class="element-quiz-reward-pill">✨ +100 Aura</span>
                <span class="element-quiz-reward-pill">⭐ +50 XP</span>
                <span class="element-quiz-reward-pill">💎 +15 Gems</span>
              </div>

              <div style="display:flex; gap:0.75rem; justify-content:center;">
                <button class="element-quiz-next-btn" id="quiz-retry-btn" style="background:#1e293b; border:1px solid #475569; max-width:200px;">🔄 Try Again</button>
                <button class="element-quiz-next-btn" id="quiz-close-btn" style="max-width:220px;">⚛️ Back to Element Lab</button>
              </div>
            </div>
          </div>
        `;

        document.getElementById('quiz-retry-btn').addEventListener('click', () => this.openElementQuizModal());
        document.getElementById('quiz-close-btn').addEventListener('click', () => {
          modal.classList.add('hidden');
        });
        return;
      }

      const q = selected[currentQIdx];
      answered = false;

      modal.innerHTML = `
        <div class="element-quiz-card">
          <div class="element-quiz-header">
            <span class="element-quiz-topic-badge">${q.topic}</span>
            <span class="element-quiz-counter">Question ${currentQIdx + 1} of ${selected.length}</span>
          </div>

          <div class="element-quiz-question-box">
            <h3 class="element-quiz-question">${q.question}</h3>
          </div>

          <div class="element-quiz-options-grid" id="quiz-options-grid">
            ${q.options.map((opt, optIdx) => `
              <button class="element-quiz-opt-btn" data-opt="${optIdx}">
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>

          <div id="quiz-feedback-slot"></div>
        </div>
      `;

      modal.classList.remove('hidden');
      if (window.soundEngine) window.soundEngine.playTap();

      const optBtns = modal.querySelectorAll('.element-quiz-opt-btn');
      optBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          if (answered) return;
          answered = true;
          const chosenIdx = parseInt(btn.dataset.opt, 10);
          const isCorrect = chosenIdx === q.correct;

          optBtns.forEach((b, idx) => {
            b.disabled = true;
            if (idx === q.correct) b.classList.add('correct');
            else if (idx === chosenIdx) b.classList.add('wrong');
          });

          if (isCorrect) {
            score++;
            if (window.soundEngine) window.soundEngine.playLevelUp();
            if (window.helpers) window.helpers.spawnConfetti(30);
          } else {
            if (window.soundEngine) window.soundEngine.playWrong();
          }

          const slot = document.getElementById('quiz-feedback-slot');
          slot.innerHTML = `
            <div class="element-quiz-feedback ${isCorrect ? 'correct' : 'wrong'}">
              <div class="element-quiz-feedback-title">${isCorrect ? '✅ Spot On! That\'s Right!' : '💡 Scientific Fact:'}</div>
              <div class="element-quiz-feedback-text">${q.fact}</div>
            </div>
            <button class="element-quiz-next-btn" id="quiz-next-btn">
              ${currentQIdx + 1 < selected.length ? 'NEXT QUESTION ➔' : 'SEE FINAL RESULTS 🏆'}
            </button>
          `;

          document.getElementById('quiz-next-btn').addEventListener('click', () => {
            currentQIdx++;
            renderCurrentQuestion();
          });
        });
      });
    };

    renderCurrentQuestion();
  }

  startAtomViewer() {
    const canvas = document.getElementById('atom-viewer-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const loop = () => {
      if (this.currentView !== 'elements') return;
      this.updateAndRenderAtom(ctx, canvas);
      this.atomAnimationId = requestAnimationFrame(loop);
    };
    this.atomAnimationId = requestAnimationFrame(loop);
  }

  updateAndRenderAtom(ctx, canvas) {
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const elements = window.PERIODIC_ELEMENTS || [];
    const el = elements[this.activeElemIndex] || elements[0];
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    this.atomAngle += 0.03;

    // Draw Electron Orbital Energy Shells
    const shells = el.shells || [1];
    shells.forEach((electronCount, shellIdx) => {
      const radius = 42 + shellIdx * 28;

      // Orbit Track
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Orbiting Electrons
      for (let i = 0; i < electronCount; i++) {
        const offset = (i / electronCount) * Math.PI * 2;
        const speedDir = shellIdx % 2 === 0 ? 1 : -1;
        const eAngle = this.atomAngle * speedDir + offset;
        const ex = cx + Math.cos(eAngle) * radius;
        const ey = cy + Math.sin(eAngle) * radius;

        ctx.fillStyle = '#00f0ff';
        ctx.beginPath();
        ctx.arc(ex, ey, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    // Draw Central Nucleus (Protons & Neutrons Cluster)
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(cx, cy, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px "Space Grotesk"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${el.sym}`, cx, cy);
  }

  // ==========================================================================
  // 5. SCIENCE JOURNAL & TERMINOLOGY ENGINE
  // ==========================================================================
  openScienceJournal(filterCategory = 'all') {
    const modal = document.getElementById('science-journal-modal');
    if (!modal) return;

    const catalog = window.SCIENCE_TERMINOLOGY_CATALOG || [];
    const discoveries = window.gameState?.data?.scienceState?.discoveries || {};

    const list = document.getElementById('science-journal-cards-container');
    if (list) {
      list.innerHTML = catalog
        .filter(term => filterCategory === 'all' || term.category.toLowerCase() === filterCategory.toLowerCase())
        .map(term => {
          const isUnlocked = !!discoveries[term.id];
          return `
            <div class="journal-entry-card" style="${isUnlocked ? 'border-color: #38bdf8;' : 'opacity: 0.5;'}">
              <div class="journal-entry-header">
                <span class="journal-entry-icon">${isUnlocked ? term.icon : '🔒'}</span>
                <div>
                  <h4 class="journal-entry-name">${isUnlocked ? term.name : 'Unknown Concept'}</h4>
                  <span style="font-size:0.75rem; color:#38bdf8; font-family:var(--font-mono);">${term.category}</span>
                </div>
              </div>
              <p class="journal-entry-def">${isUnlocked ? term.simpleDef : 'Conduct experiments in Science Lab to discover this scientific concept!'}</p>
              ${isUnlocked ? `<div class="journal-entry-why"><strong>Why it happens:</strong> ${term.whyItHappens}</div>` : ''}
            </div>
          `;
        }).join('');
    }

    modal.classList.remove('hidden');
    if (window.soundEngine) window.soundEngine.playTap();

    // Bind category tabs inside journal
    const tabs = modal.querySelectorAll('.journal-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.openScienceJournal(tab.dataset.cat);
      });
    });
  }

  // ==========================================================================
  // 6. DISCOVERY POPUP NOTIFICATION BANNER (+50 Discovery XP)
  // ==========================================================================
  showDiscoveryAlert(termId) {
    const term = (window.SCIENCE_TERMINOLOGY_CATALOG || []).find(t => t.id === termId);
    if (!term) return;

    const modal = document.getElementById('science-discovery-modal');
    const iconEl = document.getElementById('discovery-modal-icon');
    const titleEl = document.getElementById('discovery-modal-title');
    const descEl = document.getElementById('discovery-modal-desc');

    if (modal && iconEl && titleEl && descEl) {
      iconEl.textContent = term.icon;
      titleEl.textContent = `NEW DISCOVERY: ${term.name.toUpperCase()}!`;
      descEl.innerHTML = `<strong>${term.simpleDef}</strong><br><br>${term.whyItHappens}`;
      modal.classList.remove('hidden');
    }

    if (window.soundEngine) {
      if (window.soundEngine.playLevelUp) window.soundEngine.playLevelUp();
      if (window.soundEngine.playChest) window.soundEngine.playChest();
    }
    if (window.helpers) {
      window.helpers.spawnConfetti(100);
      window.helpers.spawnAuraFloatingText(`+50 Discovery XP 🔬✨`, undefined, undefined, true);
    }
  }
}

window.ScienceLabEngine = ScienceLabEngine;
