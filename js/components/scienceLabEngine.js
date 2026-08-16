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
            <p class="science-workbench-subtitle">Assemble the human skeletal system and discover how bones and joints function!</p>
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
            <p style="font-size:0.8rem; color:#94a3b8; margin:0;">Tap a bone below, then tap its target on the silhouette!</p>

            <div class="skeleton-bones-grid" id="skeleton-bones-grid">
              ${bones.map(b => `
                <button class="bone-token-btn ${this.skeletonState.placedBones.has(b.id) ? 'placed' : ''} ${this.skeletonState.selectedBoneId === b.id ? 'selected' : ''}" data-bone="${b.id}">
                  <span class="bone-token-icon">${b.icon}</span>
                  <span class="bone-token-name">${b.name.split('(')[0]}</span>
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

  selectBone(boneId) {
    this.skeletonState.selectedBoneId = boneId;
    const b = (window.SKELETON_BONES || []).find(x => x.id === boneId);
    const infoBox = document.getElementById('skeleton-bone-info-box');

    if (b && infoBox) {
      infoBox.innerHTML = `
        <strong style="color:#fde047;">${b.name}</strong><br>
        <span style="color:#38bdf8; font-size:0.8rem;">Joint Type: ${b.joint}</span><br>
        <span style="font-size:0.85rem; line-height:1.4;">${b.desc}</span><br>
        <em style="color:#cbd5e1; font-size:0.8rem; display:block; margin-top:0.3rem;">✨ ${b.fact}</em>
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

    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Human Body Silhouette Outline
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(200, 45, 28, 0, Math.PI * 2); // Head
    ctx.moveTo(200, 75); ctx.lineTo(200, 200); // Torso line
    ctx.moveTo(140, 100); ctx.lineTo(260, 100); // Shoulders
    ctx.moveTo(140, 100); ctx.lineTo(130, 220); // Left Arm
    ctx.moveTo(260, 100); ctx.lineTo(270, 220); // Right Arm
    ctx.moveTo(175, 200); ctx.lineTo(170, 380); // Left Leg
    ctx.moveTo(225, 200); ctx.lineTo(230, 380); // Right Leg
    ctx.stroke();

    const bones = window.SKELETON_BONES || [];
    bones.forEach(b => {
      const isPlaced = this.skeletonState.placedBones.has(b.id);
      const isSelected = this.skeletonState.selectedBoneId === b.id;

      if (isPlaced) {
        // Placed bone graphic
        ctx.fillStyle = '#e2e8f0';
        ctx.beginPath();
        ctx.roundRect(b.targetX - b.width / 2, b.targetY - b.height / 2, b.width, b.height, 8);
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = '18px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(b.icon, b.targetX, b.targetY);
      } else {
        // Target Snapping Socket
        ctx.strokeStyle = isSelected ? '#fde047' : 'rgba(255, 255, 255, 0.2)';
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = isSelected ? 2 : 1;
        ctx.strokeRect(b.targetX - b.width / 2, b.targetY - b.height / 2, b.width, b.height);
        ctx.setLineDash([]);

        if (isSelected) {
          ctx.fillStyle = 'rgba(253, 224, 71, 0.15)';
          ctx.fillRect(b.targetX - b.width / 2, b.targetY - b.height / 2, b.width, b.height);
        }
      }
    });
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
          <button class="science-back-btn" id="science-back-to-hub-btn">◀ Science Lab</button>
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
        </div>
      </div>
    `;

    document.getElementById('science-back-to-hub-btn').addEventListener('click', () => this.renderLabHub());

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
