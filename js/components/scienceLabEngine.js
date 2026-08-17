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
    this.currentView = 'hub'; // 'hub', 'matter', 'skeleton', 'elements', 'cells', 'space'
    this.activeElemIndex = 5; // Default: Carbon (Atomic #6)
    this.matterTemp = 20; // Default: 20°C (Liquid)
    this.matterMaterial = 'water'; // 'water', 'co2', 'lava', 'plasma'
    this.matterAnimationId = null;
    this.atomAnimationId = null;
    this.cellAnimationId = null;
    this.spaceAnimationId = null;
    this.cellSpecimen = 'plant'; // 'plant', 'animal'
    this.cellZoom = 100; // 40, 100, 400
    this.cellActiveOrganelle = 'mitochondria';
    this.cellAngle = 0;
    this.spaceTimeSpeed = 1;
    this.spaceSelectedPlanet = 'earth';
    this.spaceAngle = 0;
    this.jumpY = 0;
    this.jumpVy = 0;
    this.isJumping = false;
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
              <h3 class="science-world-title">States of Matter & Phase Lab</h3>
              <span class="science-world-tag">THERMAL PHYSICS</span>
            </div>
          </div>
          <p class="science-world-desc">Control thermal heat! Watch ice melt into fluid water, dry ice sublimate into gas, and superheated plasma lightning!</p>
          <div class="science-world-topics">
            <span class="science-topic-pill">Solids & Liquids</span>
            <span class="science-topic-pill">Sublimation (CO₂)</span>
            <span class="science-topic-pill">Star Plasma (4th State)</span>
            <span class="science-topic-pill">Kinetic Heat Energy</span>
          </div>
          <button class="science-enter-btn">ENTER MATTER LAB ➔</button>
        </div>

        <!-- 3. Biology Lab: Skeleton Builder -->
        <div class="science-world-card" data-lab="skeleton">
          <div class="science-world-header">
            <div class="science-world-icon">🦴</div>
            <div>
              <h3 class="science-world-title">Skeleton Builder</h3>
              <span class="science-world-tag">ANATOMY & BIOLOGY</span>
            </div>
          </div>
          <p class="science-world-desc">Assemble all 206 bones of the human skeleton! Test ball-and-socket vs hinge joints and discover bone biomechanics.</p>
          <div class="science-world-topics">
            <span class="science-topic-pill">Human Skeleton</span>
            <span class="science-topic-pill">Bone Biomechanics</span>
            <span class="science-topic-pill">Hinge & Ball Joints</span>
          </div>
          <button class="science-enter-btn">BUILD SKELETON ➔</button>
        </div>

        <!-- 4. Biology: Cell & Microscope -->
        <div class="science-world-card" data-lab="cells">
          <div class="science-world-header">
            <div class="science-world-icon">🧬</div>
            <div>
              <h3 class="science-world-title">Cell Explorer & Virtual Microscope</h3>
              <span class="science-world-tag">CELL BIOLOGY</span>
            </div>
          </div>
          <p class="science-world-desc">Examine living plant and animal cells under 400x magnification! Watch mitochondria generate ATP power and chloroplasts harvest light.</p>
          <div class="science-world-topics">
            <span class="science-topic-pill">400x Microscope</span>
            <span class="science-topic-pill">Mitochondria Powerhouse</span>
            <span class="science-topic-pill">Chloroplasts</span>
            <span class="science-topic-pill">Plant vs Animal</span>
          </div>
          <button class="science-enter-btn">EXPLORE CELLS ➔</button>
        </div>

        <!-- 5. Earth & Solar System Orbit Simulator -->
        <div class="science-world-card" data-lab="space">
          <div class="science-world-header">
            <div class="science-world-icon">🌎</div>
            <div>
              <h3 class="science-world-title">Solar System & Gravity Simulator</h3>
              <span class="science-world-tag">ASTRONOMY & GRAVITY</span>
            </div>
          </div>
          <p class="science-world-desc">Simulate planetary orbits around the Sun! Test gravity on the Moon, Mars, and Jupiter with the interactive Astronaut Jump simulator.</p>
          <div class="science-world-topics">
            <span class="science-topic-pill">8 Planet Orbits</span>
            <span class="science-topic-pill">Time Speed (1x-100x)</span>
            <span class="science-topic-pill">Planetary Gravity (g)</span>
            <span class="science-topic-pill">Astronaut Jump Sim</span>
          </div>
          <button class="science-enter-btn">LAUNCH ORBITS ➔</button>
        </div>
      </div>
    `;

    document.getElementById('open-journal-hub-btn').addEventListener('click', () => this.openScienceJournal());

    const cards = container.querySelectorAll('.science-world-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const lab = card.dataset.lab;
        this.launchLab(lab);
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
    } else if (labType === 'cells') {
      this.renderCellLab();
    } else if (labType === 'space') {
      this.renderSpaceLab();
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
    if (this.cellAnimationId) {
      cancelAnimationFrame(this.cellAnimationId);
      this.cellAnimationId = null;
    }
    if (this.spaceAnimationId) {
      cancelAnimationFrame(this.spaceAnimationId);
      this.spaceAnimationId = null;
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
            <h2 class="science-workbench-title">🧊 States of Matter & Phase Lab</h2>
            <p class="science-workbench-subtitle">Adjust thermal temperature to observe molecular kinetic energy, phase changes, and the 4th state of matter!</p>
          </div>
          <div style="display:flex; gap:0.5rem; align-items:center;">
            <button class="science-quiz-launch-btn" id="matter-quiz-header-btn">🧪 Phase Quiz (+100 Aura)</button>
            <button class="science-back-btn" id="science-back-to-hub-btn">◀ Science Lab</button>
          </div>
        </div>

        <!-- Substance Switcher Bar -->
        <div class="matter-substance-bar" id="matter-substance-bar">
          <button class="substance-pill-btn ${this.matterMaterial === 'water' ? 'active' : ''}" data-mat="water">💧 Water (H₂O)</button>
          <button class="substance-pill-btn ${this.matterMaterial === 'co2' ? 'active' : ''}" data-mat="co2">💨 Dry Ice (CO₂) [Sublimation!]</button>
          <button class="substance-pill-btn ${this.matterMaterial === 'lava' ? 'active' : ''}" data-mat="lava">🌋 Magma / Lava Rock</button>
          <button class="substance-pill-btn ${this.matterMaterial === 'plasma' ? 'active' : ''}" data-mat="plasma">⚡ Star Plasma (4th State)</button>
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
              
              <input type="range" class="matter-slider" id="matter-temp-slider" min="-80" max="150" value="${this.matterTemp}">

              <div class="matter-state-badge" id="matter-state-badge">💧 LIQUID WATER</div>

              <div style="display:flex; gap:0.5rem; justify-content:center; margin-top:0.5rem;">
                <button class="science-enter-btn" id="matter-cool-btn" style="flex:1; padding:0.4rem;">❄️ Absolute Cold</button>
                <button class="science-enter-btn" id="matter-heat-btn" style="flex:1; padding:0.4rem; background:#dc2626;">🔥 Super Heat</button>
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
    document.getElementById('matter-quiz-header-btn').addEventListener('click', () => this.openMatterQuizModal());

    // Substance Selector Buttons
    const matBtns = container.querySelectorAll('.substance-pill-btn');
    matBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        matBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.matterMaterial = btn.dataset.mat;
        if (this.matterMaterial === 'plasma') this.matterTemp = 10000;
        else if (this.matterMaterial === 'lava') this.matterTemp = 800;
        else if (this.matterMaterial === 'co2') this.matterTemp = -50;
        else this.matterTemp = 20;

        const slider = document.getElementById('matter-temp-slider');
        if (this.matterMaterial === 'plasma') { slider.min = "1000"; slider.max = "20000"; slider.value = "10000"; }
        else if (this.matterMaterial === 'lava') { slider.min = "100"; slider.max = "1500"; slider.value = "800"; }
        else if (this.matterMaterial === 'co2') { slider.min = "-100"; slider.max = "60"; slider.value = "-50"; }
        else { slider.min = "-50"; slider.max = "150"; slider.value = "20"; }

        this.setMatterTemp(this.matterTemp);
        this.initMatterParticles();
      });
    });

    const slider = document.getElementById('matter-temp-slider');
    slider.addEventListener('input', (e) => {
      this.setMatterTemp(parseInt(e.target.value, 10));
    });

    document.getElementById('matter-cool-btn').addEventListener('click', () => {
      const minVal = parseInt(slider.min, 10);
      this.setMatterTemp(minVal);
      slider.value = minVal;
    });

    document.getElementById('matter-heat-btn').addEventListener('click', () => {
      const maxVal = parseInt(slider.max, 10);
      this.setMatterTemp(maxVal);
      slider.value = maxVal;
    });

    this.setMatterTemp(this.matterTemp);
    this.initMatterParticles();
    this.startMatterSimulation();
  }

  setMatterTemp(temp) {
    this.matterTemp = temp;
    const tempValEl = document.getElementById('matter-temp-val');
    const badgeEl = document.getElementById('matter-state-badge');
    const expEl = document.getElementById('matter-explanation-text');

    if (tempValEl) tempValEl.textContent = `${temp.toLocaleString()}°C`;

    if (this.matterMaterial === 'plasma') {
      if (badgeEl) {
        badgeEl.textContent = "⚡ 4TH STATE: IONIZED PLASMA";
        badgeEl.style.color = "#ec4899";
        badgeEl.style.borderColor = "#ec4899";
      }
      if (expEl) {
        expEl.innerHTML = `<strong>⚡ Plasma (4th State of Matter):</strong> At extreme temperatures over 10,000°C, electrons are ripped away from nuclei, creating a superheated sea of glowing ions that conducts electricity like lightning and the surface of stars!`;
      }
      return;
    }

    if (this.matterMaterial === 'co2') {
      if (temp <= -78.5) {
        if (badgeEl) {
          badgeEl.textContent = "🧊 SOLID DRY ICE (CO₂)";
          badgeEl.style.color = "#38bdf8";
          badgeEl.style.borderColor = "#38bdf8";
        }
        if (expEl) {
          expEl.innerHTML = `<strong>🧊 Solid Dry Ice:</strong> Below -78.5°C, Carbon Dioxide molecules lock into a solid frosty crystal.`;
        }
      } else {
        if (badgeEl) {
          badgeEl.textContent = "💨 SUBLIMATION: CO₂ GAS FOG";
          badgeEl.style.color = "#a855f7";
          badgeEl.style.borderColor = "#a855f7";
        }
        if (expEl) {
          expEl.innerHTML = `<strong>💨 Sublimation Phase:</strong> Dry Ice never turns into a liquid puddle at normal air pressure! It sublimates directly from solid ice into spooky, dense CO₂ gas fog!`;
        }
      }
      return;
    }

    if (this.matterMaterial === 'lava') {
      if (temp <= 700) {
        if (badgeEl) {
          badgeEl.textContent = "🪨 SOLID BASALT ROCK";
          badgeEl.style.color = "#94a3b8";
          badgeEl.style.borderColor = "#94a3b8";
        }
        if (expEl) {
          expEl.innerHTML = `<strong>🪨 Solid Igneous Rock:</strong> Silicate minerals are locked into cold, hardened volcanic rock.`;
        }
      } else {
        if (badgeEl) {
          badgeEl.textContent = "🌋 GLOWING MOLTEN MAGMA";
          badgeEl.style.color = "#f97316";
          badgeEl.style.borderColor = "#f97316";
        }
        if (expEl) {
          expEl.innerHTML = `<strong>🌋 Molten Lava:</strong> Intense planetary heat melts solid rocks into glowing orange-red liquid magma that flows like thick honey!`;
        }
      }
      return;
    }

    // Default: Water (H2O)
    if (temp <= 0) {
      if (badgeEl) {
        badgeEl.textContent = "🧊 SOLID (ICE CRYSTAL)";
        badgeEl.style.color = "#38bdf8";
        badgeEl.style.borderColor = "#38bdf8";
      }
      if (expEl) {
        expEl.innerHTML = `<strong>🧊 Solid State:</strong> Thermal kinetic energy is low. Water molecules lock into a rigid hexagon lattice, vibrating in place.`;
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
        baseY: 80 + Math.floor(i / 8) * 40,
        sparkTimer: Math.random() * 10
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

    // Burner Heat Glow under Beaker if temp is high
    if (this.matterTemp > 50) {
      const flameAlpha = Math.min(1, this.matterTemp / (this.matterMaterial === 'plasma' ? 10000 : 150));
      ctx.fillStyle = `rgba(239, 68, 68, ${flameAlpha * 0.5})`;
      ctx.beginPath();
      ctx.arc(300, 340, 60, 0, Math.PI * 2);
      ctx.fill();
    }

    const temp = this.matterTemp;
    const mat = this.matterMaterial;

    for (let p of this.particles) {
      if (mat === 'plasma') {
        // Plasma: Super energetic swirling particles with electric sparks
        p.x += p.vx * 4.5;
        p.y += p.vy * 4.5;
        if (p.x < 85) { p.x = 85; p.vx *= -1; }
        if (p.x > 515) { p.x = 515; p.vx *= -1; }
        if (p.y < 30) { p.y = 30; p.vy *= -1; }
        if (p.y > 295) { p.y = 295; p.vy *= -1; }

        // Glow
        ctx.fillStyle = '#ec4899';
        ctx.beginPath(); ctx.arc(p.x, p.y, 8, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath(); ctx.arc(p.x + 8 * Math.cos(p.sparkTimer), p.y + 8 * Math.sin(p.sparkTimer), 3, 0, Math.PI * 2); ctx.fill();
        p.sparkTimer += 0.2;
      } else if (mat === 'co2') {
        if (temp <= -78.5) {
          // Solid Dry Ice crystal
          p.x = p.baseX + (Math.random() - 0.5) * 1.5;
          p.y = p.baseY + (Math.random() - 0.5) * 1.5;
        } else {
          // Sublimation directly into rising white gas fog!
          p.x += p.vx * 2;
          p.y += p.vy * 2 - 1.2; // Rapid upward sublimation
          if (p.x < 85) { p.x = 85; p.vx *= -1; }
          if (p.x > 515) { p.x = 515; p.vx *= -1; }
          if (p.y < 30) { p.y = 290; p.x = 100 + Math.random() * 400; }
          if (p.y > 295) { p.y = 295; p.vy *= -1; }
        }

        ctx.fillStyle = temp <= -78.5 ? '#e2e8f0' : 'rgba(216, 180, 254, 0.8)';
        ctx.beginPath(); ctx.arc(p.x, p.y, 8, 0, Math.PI * 2); ctx.fill();
        // O=C=O linear molecule dots
        ctx.fillStyle = '#94a3b8';
        ctx.beginPath(); ctx.arc(p.x - 6, p.y, 4, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(p.x + 6, p.y, 4, 0, Math.PI * 2); ctx.fill();
      } else if (mat === 'lava') {
        if (temp <= 700) {
          p.x = p.baseX + (Math.random() - 0.5);
          p.y = p.baseY + (Math.random() - 0.5);
          ctx.fillStyle = '#64748b';
        } else {
          // Slow viscous lava flow
          p.x += p.vx * 0.4;
          p.y += p.vy * 0.4 + 0.4;
          if (p.x < 85) { p.x = 85; p.vx *= -1; }
          if (p.x > 515) { p.x = 515; p.vx *= -1; }
          if (p.y < 120) { p.y = 120; p.vy *= -1; }
          if (p.y > 295) { p.y = 295; p.vy *= -0.5; }
          ctx.fillStyle = '#f97316';
        }
        ctx.beginPath(); ctx.arc(p.x, p.y, 10, 0, Math.PI * 2); ctx.fill();
      } else {
        // Water H2O
        const speedMult = temp <= 0 ? 0.3 : (temp < 100 ? (temp / 40) + 1 : (temp / 15) + 3);
        if (temp <= 0) {
          p.x = p.baseX + (Math.random() - 0.5) * 2.5;
          p.y = p.baseY + (Math.random() - 0.5) * 2.5;
        } else if (temp < 100) {
          p.x += p.vx * speedMult * 0.4;
          p.y += p.vy * speedMult * 0.4 + 0.3;
          if (p.x < 85) { p.x = 85; p.vx *= -1; }
          if (p.x > 515) { p.x = 515; p.vx *= -1; }
          if (p.y < 120) { p.y = 120; p.vy *= -1; }
          if (p.y > 295) { p.y = 295; p.vy *= -0.8; }
        } else {
          p.x += p.vx * speedMult * 0.6;
          p.y += p.vy * speedMult * 0.6 - 0.5;
          if (p.x < 85) { p.x = 85; p.vx *= -1; }
          if (p.x > 515) { p.x = 515; p.vx *= -1; }
          if (p.y < 30) { p.y = 30; p.vy *= -1; }
          if (p.y > 295) { p.y = 295; p.vy *= -1; }
        }

        ctx.fillStyle = temp <= 0 ? '#38bdf8' : (temp < 100 ? '#3b82f6' : '#f59e0b');
        ctx.beginPath(); ctx.arc(p.x, p.y, 9, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.arc(p.x - 7, p.y - 7, 5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(p.x + 7, p.y - 7, 5, 0, Math.PI * 2); ctx.fill();
      }
    }
  }

  openMatterQuizModal() {
    this.openElementQuizModal();
  }

  // ==========================================================================
  // 4. CELL EXPLORER & VIRTUAL MICROSCOPE LAB
  // ==========================================================================
  renderCellLab() {
    const container = document.getElementById('science-lab-container');
    if (!container) return;

    const organelleInfo = {
      mitochondria: { name: "Mitochondria ⚡", role: "The Powerhouse of the Cell", desc: "Turns glucose sugar from your food into ATP chemical energy sparks that power every muscle and thought!" },
      chloroplast: { name: "Chloroplast 🌿", role: "Photosynthesis Solar Factory", desc: "Found exclusively in plant cells! Absorbs green sunlight to manufacture glucose food from water and carbon dioxide." },
      nucleus: { name: "Nucleus 🧠", role: "Cell Command Center", desc: "The brain of the cell that safely houses the double-helix DNA master blueprints for building proteins." },
      cellwall: { name: "Cell Wall & Membrane 🛡️", role: "Structural Armor & Security Gate", desc: "Plant cell walls are built of rigid cellulose fibers that keep giant trees standing tall against gravity!" },
      vacuole: { name: "Central Vacuole 💧", role: "Hydration Storage Tank", desc: "Stores water and nutrients. When filled with water, it creates turgor pressure so plant leaves don't wilt." }
    };

    const activeOrg = organelleInfo[this.cellActiveOrganelle] || organelleInfo.mitochondria;

    container.innerHTML = `
      <div class="science-workbench">
        <div class="science-workbench-header">
          <div class="science-workbench-title-box">
            <h2 class="science-workbench-title">🧬 Cell Explorer & Virtual Microscope</h2>
            <p class="science-workbench-subtitle">Zoom into living plant and animal cells under 400x magnification! Inspect organelle powerhouses and chloroplast factories.</p>
          </div>
          <div style="display:flex; gap:0.5rem; align-items:center;">
            <button class="science-quiz-launch-btn" id="cell-quiz-btn">🧪 Cell Quiz (+100 Aura)</button>
            <button class="science-back-btn" id="science-back-to-hub-btn">◀ Science Lab</button>
          </div>
        </div>

        <div class="cell-lab-layout">
          <!-- Microscope Canvas Stage -->
          <div class="cell-canvas-container">
            <canvas id="cell-microscope-canvas" width="560" height="380"></canvas>
          </div>

          <!-- Controls & Organelle Inspector -->
          <div class="matter-controls-sidebar">
            <div class="matter-temp-card">
              <span style="font-size:0.8rem; color:#94a3b8; font-weight:700;">SPECIMEN SLIDE</span>
              <div style="display:flex; gap:0.4rem; margin-top:0.4rem;">
                <button class="substance-pill-btn ${this.cellSpecimen === 'plant' ? 'active' : ''}" id="specimen-plant-btn" style="flex:1;">🧅 Plant Onion Cell</button>
                <button class="substance-pill-btn ${this.cellSpecimen === 'animal' ? 'active' : ''}" id="specimen-animal-btn" style="flex:1;">🐾 Animal Cheek Cell</button>
              </div>

              <div style="margin-top:0.75rem; display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:0.75rem; color:#94a3b8; font-weight:700;">MAGNIFICATION</span>
                <span style="font-family:var(--font-mono); color:#fde047; font-weight:700;">${this.cellZoom}x</span>
              </div>
              <input type="range" class="matter-slider" id="cell-zoom-slider" min="40" max="400" step="60" value="${this.cellZoom}">
            </div>

            <!-- Organelle Selectors -->
            <span style="font-size:0.8rem; color:#94a3b8; font-weight:700; margin-top:0.5rem; display:block;">CLICK ORGANELLE TO INSPECT:</span>
            <div class="organelle-card-grid">
              <button class="organelle-btn ${this.cellActiveOrganelle === 'mitochondria' ? 'selected' : ''}" data-org="mitochondria">⚡ Mitochondria</button>
              <button class="organelle-btn ${this.cellActiveOrganelle === 'nucleus' ? 'selected' : ''}" data-org="nucleus">🧠 Nucleus (DNA)</button>
              <button class="organelle-btn ${this.cellActiveOrganelle === 'chloroplast' ? 'selected' : ''}" data-org="chloroplast">🌿 Chloroplast</button>
              <button class="organelle-btn ${this.cellActiveOrganelle === 'cellwall' ? 'selected' : ''}" data-org="cellwall">🛡️ Cell Wall</button>
              <button class="organelle-btn ${this.cellActiveOrganelle === 'vacuole' ? 'selected' : ''}" data-org="vacuole">💧 Vacuole</button>
            </div>

            <div class="matter-explanation-box" id="organelle-detail-box" style="margin-top:0.75rem;">
              <h4 style="color:#fde047; margin-bottom:0.25rem;">${activeOrg.name}</h4>
              <p style="color:#38bdf8; font-weight:700; font-size:0.85rem; margin-bottom:0.25rem;">${activeOrg.role}</p>
              <p style="color:#cbd5e1; font-size:0.85rem; line-height:1.45;">${activeOrg.desc}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('science-back-to-hub-btn').addEventListener('click', () => this.renderLabHub());
    document.getElementById('cell-quiz-btn').addEventListener('click', () => this.openElementQuizModal());

    document.getElementById('specimen-plant-btn').addEventListener('click', () => {
      this.cellSpecimen = 'plant';
      this.renderCellLab();
    });

    document.getElementById('specimen-animal-btn').addEventListener('click', () => {
      this.cellSpecimen = 'animal';
      this.renderCellLab();
    });

    const zoomSlider = document.getElementById('cell-zoom-slider');
    zoomSlider.addEventListener('input', (e) => {
      this.cellZoom = parseInt(e.target.value, 10);
      this.renderCellLab();
    });

    const orgBtns = container.querySelectorAll('.organelle-btn');
    orgBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.cellActiveOrganelle = btn.dataset.org;
        if (window.soundEngine) window.soundEngine.playTap();
        this.renderCellLab();
      });
    });

    this.startCellMicroscopeSimulation();
  }

  startCellMicroscopeSimulation() {
    const canvas = document.getElementById('cell-microscope-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const loop = () => {
      if (this.currentView !== 'cells') return;
      this.updateAndRenderCell(ctx, canvas);
      this.cellAnimationId = requestAnimationFrame(loop);
    };
    this.cellAnimationId = requestAnimationFrame(loop);
  }

  updateAndRenderCell(ctx, canvas) {
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    this.cellAngle += 0.02;

    // Microscope Lens Circular Viewport
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, 160, 0, Math.PI * 2);
    ctx.clip();

    // Cytoplasm Background
    ctx.fillStyle = this.cellSpecimen === 'plant' ? '#064e3b' : '#1e1b4b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Zoom scale
    const scale = this.cellZoom / 100;
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);

    // Plant Cell Wall (Hexagonal / Rectangular) vs Animal Membrane (Rounded)
    if (this.cellSpecimen === 'plant') {
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 14;
      ctx.strokeRect(-120, -100, 240, 200);
      ctx.strokeStyle = '#059669';
      ctx.lineWidth = 4;
      ctx.strokeRect(-110, -90, 220, 180);
    } else {
      ctx.strokeStyle = '#818cf8';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.roundRect(-110, -90, 220, 180, 50);
      ctx.stroke();
    }

    // Central Nucleus with DNA
    ctx.fillStyle = this.cellActiveOrganelle === 'nucleus' ? '#f59e0b' : '#6366f1';
    ctx.beginPath();
    ctx.arc(0, 0, 36, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px "Space Grotesk"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('NUCLEUS', 0, 0);

    // Mitochondria (Oval with zigzag inner cristae)
    const mitoPositions = [[-65, -50], [65, 50], [-70, 45]];
    mitoPositions.forEach(([mx, my]) => {
      ctx.fillStyle = this.cellActiveOrganelle === 'mitochondria' ? '#ec4899' : '#f43f5e';
      ctx.beginPath();
      ctx.ellipse(mx, my, 22, 12, 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fde047';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // Chloroplasts (Only in Plant Cells!)
    if (this.cellSpecimen === 'plant') {
      const chloroPositions = [[-60, 0], [60, -45], [0, 65], [60, 0]];
      chloroPositions.forEach(([chx, chy]) => {
        ctx.fillStyle = this.cellActiveOrganelle === 'chloroplast' ? '#22c55e' : '#15803d';
        ctx.beginPath();
        ctx.ellipse(chx, chy, 18, 10, -0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#86efac';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
    }

    ctx.restore();

    // Microscope Lens Frame & Crosshairs
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, 160, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - 160, cy); ctx.lineTo(cx + 160, cy);
    ctx.moveTo(cx, cy - 160); ctx.lineTo(cx, cy + 160);
    ctx.stroke();
  }

  // ==========================================================================
  // 5. SOLAR SYSTEM ORBIT & GRAVITY SIMULATOR LAB
  // ==========================================================================
  renderSpaceLab() {
    const container = document.getElementById('science-lab-container');
    if (!container) return;

    const gravityData = {
      moon: { name: "The Moon 🌕", g: 0.16, jumpHeight: "6x Higher!", desc: "With 1/6th Earth gravity, an astronaut can leap over buildings with slow-motion floating hangtime!" },
      mars: { name: "Mars 🔴", g: 0.38, jumpHeight: "2.6x Higher!", desc: "Mars has 38% of Earth's gravity. You can easily dunk a basketball on a 25-foot rim!" },
      earth: { name: "Earth 🌍", g: 1.0, jumpHeight: "Standard 1x", desc: "Our home planet pulls downward at standard 1.0g (9.8 m/s²), keeping oceans and atmosphere in place." },
      jupiter: { name: "Jupiter 🪐", g: 2.5, jumpHeight: "Super Heavy!", desc: "The giant gas planet has 2.5x Earth gravity. Your body would weigh 250% heavier, making jumping nearly impossible!" }
    };

    const activeGrav = gravityData[this.spaceSelectedPlanet] || gravityData.earth;

    container.innerHTML = `
      <div class="science-workbench">
        <div class="science-workbench-header">
          <div class="science-workbench-title-box">
            <h2 class="science-workbench-title">🌎 Solar System Orbit & Gravity Simulator</h2>
            <p class="science-workbench-subtitle">Simulate planetary orbits around the Sun and test how gravity affects astronaut jumps on the Moon, Mars, and Jupiter!</p>
          </div>
          <div style="display:flex; gap:0.5rem; align-items:center;">
            <button class="science-quiz-launch-btn" id="space-quiz-btn">🧪 Space Quiz (+100 Aura)</button>
            <button class="science-back-btn" id="science-back-to-hub-btn">◀ Science Lab</button>
          </div>
        </div>

        <div class="space-lab-layout">
          <!-- Solar Orbit Canvas Stage -->
          <div class="space-canvas-container">
            <canvas id="space-orbit-canvas" width="560" height="380"></canvas>
          </div>

          <!-- Gravity Jump Controls -->
          <div class="matter-controls-sidebar">
            <div class="matter-temp-card">
              <span style="font-size:0.8rem; color:#94a3b8; font-weight:700;">ORBIT SPEED OF TIME</span>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.25rem;">
                <span style="font-size:0.75rem; color:#94a3b8;">TIME WARP</span>
                <span style="font-family:var(--font-mono); color:#fde047; font-weight:700;" id="space-speed-val">${this.spaceTimeSpeed}x</span>
              </div>
              <input type="range" class="matter-slider" id="space-time-slider" min="1" max="50" value="${this.spaceTimeSpeed}">
            </div>

            <!-- Planetary Gravity Selector -->
            <span style="font-size:0.8rem; color:#94a3b8; font-weight:700; margin-top:0.75rem; display:block;">TEST GRAVITY ON WORLD:</span>
            <div class="planet-jump-grid">
              <button class="planet-jump-btn ${this.spaceSelectedPlanet === 'moon' ? 'active' : ''}" data-planet="moon">🌕 Moon (0.16g)</button>
              <button class="planet-jump-btn ${this.spaceSelectedPlanet === 'mars' ? 'active' : ''}" data-planet="mars">🔴 Mars (0.38g)</button>
              <button class="planet-jump-btn ${this.spaceSelectedPlanet === 'earth' ? 'active' : ''}" data-planet="earth">🌍 Earth (1.0g)</button>
              <button class="planet-jump-btn ${this.spaceSelectedPlanet === 'jupiter' ? 'active' : ''}" data-planet="jupiter">🪐 Jupiter (2.5g)</button>
            </div>

            <div class="matter-explanation-box" style="margin-top:0.5rem;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <h4 style="color:#fde047;">${activeGrav.name}</h4>
                <span style="color:#38bdf8; font-weight:700; font-family:var(--font-mono);">${activeGrav.jumpHeight}</span>
              </div>
              <p style="color:#cbd5e1; font-size:0.85rem; line-height:1.4; margin-top:0.25rem;">${activeGrav.desc}</p>
            </div>

            <!-- Jump Trigger Button -->
            <button class="element-quiz-next-btn" id="space-astronaut-jump-btn" style="margin-top:0.75rem;">
              🚀 JUMP ON ${this.spaceSelectedPlanet.toUpperCase()}!
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('science-back-to-hub-btn').addEventListener('click', () => this.renderLabHub());
    document.getElementById('space-quiz-btn').addEventListener('click', () => this.openElementQuizModal());

    const timeSlider = document.getElementById('space-time-slider');
    timeSlider.addEventListener('input', (e) => {
      this.spaceTimeSpeed = parseInt(e.target.value, 10);
      const valEl = document.getElementById('space-speed-val');
      if (valEl) valEl.textContent = `${this.spaceTimeSpeed}x`;
    });

    const planetBtns = container.querySelectorAll('.planet-jump-btn');
    planetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.spaceSelectedPlanet = btn.dataset.planet;
        this.jumpY = 0;
        this.jumpVy = 0;
        this.isJumping = false;
        if (window.soundEngine) window.soundEngine.playTap();
        this.renderSpaceLab();
      });
    });

    document.getElementById('space-astronaut-jump-btn').addEventListener('click', () => {
      if (this.isJumping) return;
      this.isJumping = true;
      this.jumpVy = -12; // initial jump upward impulse
      if (window.soundEngine) window.soundEngine.playPowerup();
    });

    this.startSpaceOrbitSimulation();
  }

  startSpaceOrbitSimulation() {
    const canvas = document.getElementById('space-orbit-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const loop = () => {
      if (this.currentView !== 'space') return;
      this.updateAndRenderSpace(ctx, canvas);
      this.spaceAnimationId = requestAnimationFrame(loop);
    };
    this.spaceAnimationId = requestAnimationFrame(loop);
  }

  updateAndRenderSpace(ctx, canvas) {
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2 - 20;

    this.spaceAngle += 0.01 * this.spaceTimeSpeed;

    // Glowing Central Sun
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(cx, cy, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(251, 191, 36, 0.3)';
    ctx.beginPath();
    ctx.arc(cx, cy, 32, 0, Math.PI * 2);
    ctx.fill();

    // Planet Orbits: [name, radius, speedMultiplier, color, size]
    const planets = [
      ["Mercury", 42, 4.1, "#94a3b8", 4],
      ["Venus", 65, 1.6, "#fbbf24", 6],
      ["Earth", 92, 1.0, "#38bdf8", 7],
      ["Mars", 120, 0.53, "#ef4444", 5],
      ["Jupiter", 155, 0.08, "#f97316", 13],
      ["Saturn", 195, 0.03, "#fde047", 10]
    ];

    planets.forEach(([name, radius, speed, color, size]) => {
      // Orbit Ring
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Planet Position
      const pAngle = this.spaceAngle * speed;
      const px = cx + Math.cos(pAngle) * radius;
      const py = cy + Math.sin(pAngle) * radius;

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fill();

      // Saturn Rings
      if (name === "Saturn") {
        ctx.strokeStyle = 'rgba(253, 224, 71, 0.7)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(px, py, size + 6, size / 2, 0.3, 0, Math.PI * 2);
        ctx.stroke();
      }
    });

    // Draw Astronaut Jump Ground on Bottom Right Corner
    const gx = 80;
    const gy = 330;

    // Gravity Constant for Selected Planet
    const gMap = { moon: 0.15, mars: 0.38, earth: 1.0, jupiter: 2.5 };
    const gVal = gMap[this.spaceSelectedPlanet] || 1.0;

    if (this.isJumping) {
      this.jumpY += this.jumpVy;
      this.jumpVy += gVal * 0.45; // gravity pull down
      if (this.jumpY >= 0) {
        this.jumpY = 0;
        this.jumpVy = 0;
        this.isJumping = false;
      }
    }

    // Ground Platform
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(20, 340, 520, 30);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 340, 520, 30);

    // Astronaut Character
    const ax = 120;
    const ay = 320 + this.jumpY;

    ctx.font = '32px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText('👨‍🚀', ax, ay);

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px "Space Grotesk"';
    ctx.textAlign = 'left';
    ctx.fillText(`JUMP HEIGHT: ${Math.round(Math.abs(this.jumpY))} px (${this.spaceSelectedPlanet.toUpperCase()} GRAVITY: ${gVal}g)`, 155, 335);
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
        correctAnswer: "Helium (He)",
        fact: "Helium is much lighter than regular air, so it lifts balloons up effortlessly and never catches fire!"
      },
      {
        topic: "🎆 FIREWORKS SPARKS",
        question: "Which metallic element is added to fireworks and flares to create an intense, blinding white spark?",
        options: ["Magnesium (Mg)", "Helium (He)", "Gold (Au)", "Fluorine (F)"],
        correctAnswer: "Magnesium (Mg)",
        fact: "Magnesium burns at over 3,000°C producing brilliant white light seen across city fireworks shows!"
      },
      {
        topic: "🏬 STOREFRONT LIGHTS",
        question: "Which noble gas is used in bright glowing signs outside stores and restaurants to shine reddish-orange?",
        options: ["Neon (Ne)", "Calcium (Ca)", "Sodium (Na)", "Aluminum (Al)"],
        correctAnswer: "Neon (Ne)",
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
        correctAnswer: "Carbon atoms compressed under extreme heat and pressure",
        fact: "Both soft black pencil graphite and super-hard sparkling diamonds are made of pure Carbon atoms arranged differently!"
      },
      {
        topic: "👑 PRECIOUS METALS",
        question: "Which highly valuable precious metal never rusts or tarnishes, even after thousands of years buried underwater?",
        options: ["Gold (Au)", "Iron (Fe)", "Sodium (Na)", "Potassium (K)"],
        correctAnswer: "Gold (Au)",
        fact: "Gold is chemically unreactive, which is why ancient Egyptian gold treasures still shine like brand new today!"
      },
      {
        topic: "💻 COMPUTER CHIPS",
        question: "Which metalloid element found in beach sand is purified to manufacture computer processors, iPads, and smartphones?",
        options: ["Silicon (Si)", "Calcium (Ca)", "Chlorine (Cl)", "Hydrogen (H)"],
        correctAnswer: "Silicon (Si)",
        fact: "Silicon is a semiconductor that controls electrical logic gates inside every computer and smartphone chip!"
      },
      {
        topic: "🧂 KITCHEN SCIENCE",
        question: "When soft reactive Sodium metal (Na) bonds with poisonous Chlorine gas (Cl), what everyday kitchen food item is made?",
        options: ["Table Salt (NaCl)", "White Sugar", "Baking Soda", "Black Pepper"],
        correctAnswer: "Table Salt (NaCl)",
        fact: "Two dangerous raw elements chemically bond into delicious, essential table salt (Sodium Chloride)!"
      },
      {
        topic: "🦴 STRONG BONES & TEETH",
        question: "Which essential mineral element makes up 99% of human bones and teeth?",
        options: ["Calcium (Ca)", "Copper (Cu)", "Helium (He)", "Sulfur (S)"],
        correctAnswer: "Calcium (Ca)",
        fact: "Calcium forms the strong mineral scaffolding of your skeleton, keeping bones tough and teeth resilient!"
      },
      {
        topic: "🔋 RECHARGEABLE BATTERIES",
        question: "Which ultra-lightweight metal powers the rechargeable batteries inside iPhones, iPads, and Tesla electric cars?",
        options: ["Lithium (Li)", "Lead (Pb)", "Silver (Ag)", "Boron (B)"],
        correctAnswer: "Lithium (Li)",
        fact: "Lithium is so light it floats on water, and easily transports electrons back and forth during charging!"
      },
      {
        topic: "🚀 SPACE ROCKETS & JETS",
        question: "Which ultra-strong, lightweight metal that is resistant to extreme heat is used in fighter jets, space capsules, and prosthetic bones?",
        options: ["Titanium (Ti)", "Lead (Pb)", "Sodium (Na)", "Argon (Ar)"],
        correctAnswer: "Titanium (Ti)",
        fact: "Titanium is as strong as steel but 45% lighter, and it never corrodes even in salt water or rocket exhaust!"
      },
      {
        topic: "🫁 OXYGEN & BREATHING",
        question: "What percentage of the Earth's atmosphere is made of Oxygen (O) that humans and animals breathe?",
        options: ["About 21%", "About 90%", "About 5%", "About 50%"],
        correctAnswer: "About 21%",
        fact: "Our air is approximately 78% Nitrogen and 21% Oxygen — the exact perfect balance for living organisms to thrive!"
      },
      {
        topic: "🩸 RED BLOOD CELLS",
        question: "Which metal element sits at the center of hemoglobin in your red blood cells to carry oxygen throughout your body?",
        options: ["Iron (Fe)", "Gold (Au)", "Mercury (Hg)", "Neon (Ne)"],
        correctAnswer: "Iron (Fe)",
        fact: "Iron in your hemoglobin binds with oxygen in your lungs and gives human blood its distinct deep red color!"
      },
      {
        topic: "🗽 STATUE OF LIBERTY",
        question: "The Statue of Liberty was originally shiny reddish-brown when built in 1886. What metal is it made of that oxidized and turned green?",
        options: ["Copper (Cu)", "Silver (Ag)", "Aluminum (Al)", "Tin (Sn)"],
        correctAnswer: "Copper (Cu)",
        fact: "Copper reacts with oxygen and moisture in the air to create a protective green layer called patina (copper carbonate)!"
      },
      {
        topic: "🌡️ LIQUID METALS",
        question: "Which heavy, silvery element is the only metal that is completely liquid at room temperature?",
        options: ["Mercury (Hg)", "Lead (Pb)", "Iron (Fe)", "Zinc (Zn)"],
        correctAnswer: "Mercury (Hg)",
        fact: "Mercury (also called quicksilver) is so dense that heavy iron cannonballs will actually float right on top of liquid mercury!"
      },
      {
        topic: "🏊 CLEAN SWIMMING POOLS",
        question: "Which greenish-yellow halogen gas element is added to swimming pools and municipal tap water to kill germs and bacteria?",
        options: ["Chlorine (Cl)", "Krypton (Kr)", "Carbon (C)", "Magnesium (Mg)"],
        correctAnswer: "Chlorine (Cl)",
        fact: "Chlorine is a powerful disinfectant that breaks down the cell walls of harmful microbes within seconds!"
      },
      {
        topic: "⚡ BEST ELECTRICAL CONDUCTOR",
        question: "Which precious metal is the single best conductor of electricity and heat on the entire Periodic Table?",
        options: ["Silver (Ag)", "Iron (Fe)", "Nickel (Ni)", "Lead (Pb)"],
        correctAnswer: "Silver (Ag)",
        fact: "Silver conducts electricity even better than copper and gold, and is also used to coat the backs of crystal-clear mirrors!"
      },
      {
        topic: "🌌 STARS & THE UNIVERSE",
        question: "Which element is the simplest, lightest, and by far the most abundant element in the entire Universe?",
        options: ["Hydrogen (H)", "Oxygen (O)", "Iron (Fe)", "Uranium (U)"],
        correctAnswer: "Hydrogen (H)",
        fact: "Hydrogen makes up about 75% of all normal matter in the cosmos and fuels the nuclear fusion fires inside our Sun!"
      },
      {
        topic: "✈️ SODA CANS & AIRPLANES",
        question: "Which lightweight, abundant metal is 100% infinitely recyclable and used to build soda cans, airplane wings, and bike frames?",
        options: ["Aluminum (Al)", "Lead (Pb)", "Gold (Au)", "Mercury (Hg)"],
        correctAnswer: "Aluminum (Al)",
        fact: "Recycling an aluminum can takes 95% less energy than making a new one from raw bauxite ore!"
      },
      {
        topic: "❄️ FREEZING NITROGEN",
        question: "Which element makes up the vast majority (78%) of Earth's atmosphere and becomes a boiling cold liquid at -196°C (-320°F)?",
        options: ["Nitrogen (N)", "Hydrogen (H)", "Chlorine (Cl)", "Fluorine (F)"],
        correctAnswer: "Nitrogen (N)",
        fact: "Liquid nitrogen instantly freezes flowers and racquetballs so brittle they shatter like delicate glass!"
      },
      {
        topic: "☢️ NUCLEAR ENERGY",
        question: "Which dense, radioactive heavy element with 92 protons is used as fuel inside clean nuclear power generating stations?",
        options: ["Uranium (U)", "Lithium (Li)", "Silicon (Si)", "Helium (He)"],
        correctAnswer: "Uranium (U)",
        fact: "A single uranium fuel pellet the size of a fingertip produces as much energy as one ton of coal!"
      },
      {
        topic: "🛡️ X-RAY RADIATION SHIELDS",
        question: "When getting an X-ray at the dentist, why is the heavy protective apron you wear lined with Lead (Pb)?",
        options: [
          "Lead is extremely dense and blocks high-energy X-ray radiation",
          "Lead cools your body temperature down",
          "Lead makes you invisible to cameras",
          "Lead is magnetic and attracts the rays"
        ],
        correctAnswer: "Lead is extremely dense and blocks high-energy X-ray radiation",
        fact: "Lead's tightly packed atoms and high atomic number make it the ultimate shield against harmful radiation!"
      },
      {
        topic: "🔥 MATCHSTICK HEADS",
        question: "Which reactive non-metal element is used on the friction strips of safety matches to ignite a flame when struck?",
        options: ["Phosphorus (P)", "Helium (He)", "Argon (Ar)", "Gold (Au)"],
        correctAnswer: "Phosphorus (P)",
        fact: "Red phosphorus on the matchbox strike strip turns into a tiny burst of white phosphorus friction vapor that sparks the match head!"
      },
      {
        topic: "💡 VINTAGE LIGHTBULB FILAMENTS",
        question: "Which metal has the highest melting point of all elements (3,422°C / 6,192°F), allowing it to glow white-hot without melting in bulbs?",
        options: ["Tungsten (W)", "Aluminum (Al)", "Copper (Cu)", "Silver (Ag)"],
        correctAnswer: "Tungsten (W)",
        fact: "Tungsten stays solid at temperatures hotter than the surface of some stars!"
      },
      {
        topic: "🍌 BANANAS & MUSCLES",
        question: "Bananas are famous for being rich in which alkali metal that helps human muscles contract and prevents cramps?",
        options: ["Potassium (K)", "Iron (Fe)", "Gold (Au)", "Cobalt (Co)"],
        correctAnswer: "Potassium (K)",
        fact: "Potassium and sodium work together like a bio-electrical pump to fire nerve impulses across every muscle in your body!"
      },
      {
        topic: "🩹 ANTISEPTIC HEALING",
        question: "Which dark purple halogen element is applied to cuts and scrapes to kill infections and added to table salt to prevent goiter?",
        options: ["Iodine (I)", "Lithium (Li)", "Barium (Ba)", "Helium (He)"],
        correctAnswer: "Iodine (I)",
        fact: "Iodine is an essential micronutrient for the thyroid gland and creates purple stains that sanitize skin during surgeries!"
      },
      {
        topic: "🧴 SUNSCREEN & RUSTPROOFING",
        question: "Which metal compound (Zinc Oxide) sits on the surface of your skin to reflect harmful UV sunlight rays like a mirror?",
        options: ["Zinc (Zn)", "Lead (Pb)", "Arsenic (As)", "Radon (Rn)"],
        correctAnswer: "Zinc (Zn)",
        fact: "Zinc forms a physical mineral barrier against sunburn and is also coated onto steel nails (galvanizing) so they never rust!"
      },
      {
        topic: "🌋 VOLCANIC CRYSTALS",
        question: "Which bright yellow non-metal element is found around volcanic craters and hot springs with a distinctive smell?",
        options: ["Sulfur (S)", "Carbon (C)", "Calcium (Ca)", "Platinum (Pt)"],
        correctAnswer: "Sulfur (S)",
        fact: "Sulfur burns with a mysterious eerie blue flame in volcanic calderas and forms pure bright yellow crystals!"
      },
      {
        topic: "🪥 TOOTH ENAMEL DEFENSE",
        question: "Which halogen element is added in tiny safe amounts to toothpaste and tap water to strengthen tooth enamel against cavities?",
        options: ["Fluorine (F / Fluoride)", "Lead (Pb)", "Mercury (Hg)", "Neon (Ne)"],
        correctAnswer: "Fluorine (F / Fluoride)",
        fact: "Fluoride bonds with calcium in tooth enamel to form fluorapatite, a super-hard crystalline layer that resists acid!"
      },
      {
        topic: "💍 PLATINUM LUXURY",
        question: "Which extremely dense, hypoallergenic silvery-white precious metal is even rarer than gold and cleans car exhaust fumes?",
        options: ["Platinum (Pt)", "Tin (Sn)", "Copper (Cu)", "Zinc (Zn)"],
        correctAnswer: "Platinum (Pt)",
        fact: "All the platinum ever mined in human history would fit into an average family living room!"
      }
    ];

    // Fisher-Yates robust array shuffle
    const shuffleArray = (arr) => {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    };

    // Pick 5 unique random questions from the master question bank of 30+ items
    const selectedRaw = shuffleArray(quizQuestions).slice(0, 5);

    // For every selected question, shuffle the options and locate the new correct index
    const selected = selectedRaw.map(q => {
      const shuffledOptions = shuffleArray(q.options);
      const correctIdx = shuffledOptions.indexOf(q.correctAnswer);
      return {
        topic: q.topic,
        question: q.question,
        options: shuffledOptions,
        correct: correctIdx,
        fact: q.fact
      };
    });

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
