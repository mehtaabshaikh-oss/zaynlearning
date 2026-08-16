/**
 * STEM DETECTIVE AGENCY - GAME ENGINE
 * Lead Investigator: Zayn
 * Integrates Math, Observation, Scientific Experiments, Physical Reasoning, and Logic Deduction.
 */

class STEMDetectiveEngine {
  constructor() {
    this.currentCaseId = 'moon_rock';
    this.currentStep = 1;
    this.notebook = {
      notes: [],
      evidence: [],
      redHerrings: [],
      suspects: []
    };
    this.inspectedHotspots = new Set();
    this.cases = this.getCaseRegistry();

    this.initDOM();
  }

  getCaseRegistry() {
    return {
      moon_rock: {
        id: 'moon_rock',
        title: 'The Missing Moon Rock',
        icon: '🪨',
        topics: ['Multiplication', 'Magnets', 'LCM Time Sync', 'Rates of Change', 'Density (m/V)', 'Logic Matrix'],
        desc: 'The Apollo Moon Rock has vanished from the Science Museum Lunar Vault! Search the crime scene, test mystery materials, decode security clocks, calculate footprint distances, and deduce the culprit!',
        sceneName: 'Lunar Science Vault & Security Corridor',
        suspects: [
          { name: 'Alex', role: 'Night Guard', access: true, stride: 24, time: '8:00 PM', material: 'Titanium (Non-Magnetic)', alibi: 'Patrolling ground floor' },
          { name: 'Maya', role: 'Astrophysicist Curator', access: true, stride: 18, time: '8:30 PM', material: 'Acrylic Glass', alibi: 'Writing journal in office' },
          { name: 'Leo', role: 'Maintenance Tech', access: false, stride: 18, time: '8:12 PM', material: 'Brass (Non-Magnetic)', alibi: 'Fixing pipes in basement' },
          { name: 'Sam', role: 'Robotics Engineer', access: true, stride: 18, time: '8:12 PM', material: 'Iron Alloy (Magnetic)', alibi: 'Calibrating rover arm' }
        ],
        hotspots: [
          { id: 'footprints', icon: '👣', title: 'Muddy Stride Tracks', tag: 'Math: 7 × 18" Stride' },
          { id: 'materials', icon: '🧲', title: 'Unknown Metal Scrap', tag: 'Science: Magnetism Test' },
          { id: 'cameras', icon: '📹', title: 'Camera Timestamps', tag: 'Math: LCM Time Sync' },
          { id: 'temp_log', icon: '🌡️', title: 'Cryo-Vault Log', tag: 'Science: +4°F Rate Analysis' },
          { id: 'density_lab', icon: '⚖️', title: 'Decoy Rock Density', tag: 'Physics: Density = m ÷ V' },
          { id: 'flashlight', icon: '🔦', title: 'Broken Flashlight', tag: 'Physical Evidence (Inspect)', isRedHerring: true }
        ],
        matrixColumns: ['Suspect', 'Keycard Access', '18" Stride', '8:12 PM Sync', 'Magnetic Gear', 'Action'],
        matrixRows: [
          { name: 'Alex (Guard)', c1: true, c2: false, c3: false, c4: false, c2t: '✗ NO (24")', c3t: '✗ NO (8:00)', c4t: '✗ NO (Titanium)' },
          { name: 'Maya (Curator)', c1: true, c2: true, c3: false, c4: false, c2t: '✓ YES', c3t: '✗ NO (8:30)', c4t: '✗ NO (Glass)' },
          { name: 'Leo (Technician)', c1: false, c2: true, c3: true, c4: false, c1t: '✗ NO', c2t: '✓ YES', c3t: '✓ YES', c4t: '✗ NO (Brass)' },
          { name: 'Sam (Robotics)', c1: true, c2: true, c3: true, c4: true, c1t: '✓ YES', c2t: '✓ YES', c3t: '✓ YES', c4t: '✓ YES (Iron)' }
        ],
        solution: 'Sam (Robotics)',
        reconstruction: 'Sam used his robotic rover with an electromagnet arm to crack the cryo-vault at 8:12 PM, swapping the Apollo Moon Rock with a 2.0 g/mL resin fake while the cameras synced!'
      },

      greenhouse: {
        id: 'greenhouse',
        title: 'Who Destroyed the Greenhouse?',
        icon: '🌱',
        topics: ['Photosynthesis Spectrum', 'pH Acidity Test', 'Transpiration Rate', 'Volume Calculation', 'Deduction'],
        desc: 'Rare bio-luminescent orchids withered overnight in the Botanical Dome! Test soil acidity, analyze LED light absorption spectrums, and uncover the saboteur.',
        sceneName: 'Botanical Research Dome & Hydroponics Lab',
        suspects: [
          { name: 'Chloe', role: 'Botanist', access: true, phSoil: 4.5, spectrum: 'Blue 450nm', time: '9:15 PM' },
          { name: 'Marcus', role: 'Fertilizer Rep', access: false, phSoil: 7.0, spectrum: 'Red 660nm', time: '9:45 PM' },
          { name: 'Elena', role: 'Greenhouse Intern', access: true, phSoil: 4.5, spectrum: 'Green 530nm', time: '9:15 PM' },
          { name: 'David', role: 'HVAC Engineer', access: true, phSoil: 8.0, spectrum: 'Blue 450nm', time: '10:30 PM' }
        ],
        hotspots: [
          { id: 'soil_ph', icon: '🧪', title: 'Soil Acidity Testing', tag: 'Chemistry: pH Paper Test' },
          { id: 'light_spectrum', icon: '💡', title: 'Smart LED Spectrum', tag: 'Biology: Light Absorption' },
          { id: 'transpiration', icon: '📊', title: 'Water Tank Leak Rate', tag: 'Math: Rate 250 mL/hr' },
          { id: 'dropped_glove', icon: '🧤', title: 'Dropped Garden Glove', tag: 'Physical Clue (Inspect)', isRedHerring: true }
        ],
        matrixColumns: ['Suspect', 'Dome Access', 'pH 4.5 Acid', '9:15 PM Time', 'Green 530nm LED', 'Action'],
        matrixRows: [
          { name: 'Chloe (Botanist)', c1: true, c2: true, c3: true, c4: false, c4t: '✗ NO (Blue)' },
          { name: 'Marcus (Rep)', c1: false, c2: false, c3: false, c4: false, c1t: '✗ NO' },
          { name: 'Elena (Intern)', c1: true, c2: true, c3: true, c4: true, c1t: '✓ YES', c2t: '✓ YES (pH 4.5)', c3t: '✓ YES (9:15)', c4t: '✓ YES (Green 530nm)' },
          { name: 'David (HVAC)', c1: true, c2: false, c3: false, c4: false, c2t: '✗ NO (pH 8.0)' }
        ],
        solution: 'Elena (Intern)',
        reconstruction: 'Elena set the LED lights to green 530nm (which chlorophyll reflects without absorbing) and poured pH 4.5 acid to harvest the rare glowing orchid enzymes!'
      },

      power_outage: {
        id: 'power_outage',
        title: 'The Great Power Outage',
        icon: '⚡',
        topics: ['Electric Circuits', 'Ohm’s Law (V=IR)', 'Series vs Parallel', 'Logic Switches'],
        desc: 'A blackout crippled the city robotics lab during an AI tournament! Calculate branch currents, locate blown fuses, and find who triggered the surge.',
        sceneName: 'City Power Substation & Relay Grid',
        suspects: [
          { name: 'Jax', role: 'Grid Operator', access: true, currentOverload: 60, circuitType: 'Parallel Branch', time: '11:20 PM' },
          { name: 'Tara', role: 'Solar Specialist', access: false, currentOverload: 15, circuitType: 'Series Loop', time: '11:00 PM' },
          { name: 'Victor', role: 'Robotics Competitor', access: true, currentOverload: 60, circuitType: 'Parallel Branch', time: '11:20 PM' },
          { name: 'Nora', role: 'Inspector', access: true, currentOverload: 30, circuitType: 'Series Loop', time: '11:45 PM' }
        ],
        hotspots: [
          { id: 'multimeter_ohm', icon: '🔌', title: 'Ohm’s Law Meter', tag: 'Physics: V = I × R' },
          { id: 'fuse_relay', icon: '⚡', title: 'Blown Relay Breaker', tag: 'Math: Parallel Surge' },
          { id: 'time_log', icon: '🕒', title: 'Breaker Trip Clock', tag: 'Timeline: 11:20 PM' },
          { id: 'wire_stripper', icon: '🔧', title: 'Dropped Tool', tag: 'Physical Clue (Inspect)', isRedHerring: true }
        ],
        matrixColumns: ['Suspect', 'Substation Access', '60A Parallel Surge', '11:20 PM Timeline', 'Sabotage Motive', 'Action'],
        matrixRows: [
          { name: 'Jax (Operator)', c1: true, c2: true, c3: true, c4: false, c4t: '✗ NO Motive' },
          { name: 'Tara (Solar)', c1: false, c2: false, c3: false, c4: false, c1t: '✗ NO Access' },
          { name: 'Victor (Rival)', c1: true, c2: true, c3: true, c4: true, c1t: '✓ YES', c2t: '✓ YES (60A)', c3t: '✓ YES (11:20)', c4t: '✓ YES (Rival Competitor)' },
          { name: 'Nora (Inspector)', c1: true, c2: false, c3: false, c4: false, c2t: '✗ NO (30A)' }
        ],
        solution: 'Victor (Rival)',
        reconstruction: 'Victor intentionally wired a 60A short-circuit into rival team power banks at 11:20 PM using 2Ω resistance to blow the main transformer fuse!'
      },

      racecar_sabotage: {
        id: 'racecar_sabotage',
        title: 'The Sabotaged Race Car',
        icon: '🏎️',
        topics: ['Friction Forces', 'Speed = Dist ÷ Time', 'Gear Ratios', 'Track Geometry'],
        desc: 'The championship drift car spun out on Turn 4 during time trials! Inspect tire friction marks, calculate telemetry velocities, and uncover who tampered with the gearbox.',
        sceneName: 'Speedway Pit Lane & Turn 4 Asphalt',
        suspects: [
          { name: 'Kurt', role: 'Rival Driver', access: true, gearRatio: '3:1', frictionCoeff: 0.15, time: '7:40 AM' },
          { name: 'Zoe', role: 'Tire Specialist', access: true, gearRatio: '4:1', frictionCoeff: 0.85, time: '7:15 AM' },
          { name: 'Axel', role: 'Lead Mechanic', access: true, gearRatio: '3:1', frictionCoeff: 0.15, time: '7:40 AM' },
          { name: 'Brooke', role: 'Telemetry Engineer', access: false, gearRatio: '4:1', frictionCoeff: 0.85, time: '8:00 AM' }
        ],
        hotspots: [
          { id: 'skid_friction', icon: '🛞', title: 'Tire Friction Test', tag: 'Physics: Friction Coeff μ' },
          { id: 'speed_telemetry', icon: '⏱️', title: 'Speed Telemetry', tag: 'Math: v = d ÷ t' },
          { id: 'gearbox_ratio', icon: '⚙️', title: 'Differential Gear Ratio', tag: 'Mechanical: 3:1 vs 4:1' },
          { id: 'pit_pass', icon: '🎫', title: 'Dropped VIP Pass', tag: 'Physical Clue (Inspect)', isRedHerring: true }
        ],
        matrixColumns: ['Suspect', 'Garage Access', 'Friction μ = 0.15', '7:40 AM Time', 'Tampered 3:1 Ratio', 'Action'],
        matrixRows: [
          { name: 'Kurt (Rival)', c1: true, c2: true, c3: true, c4: true, c1t: '✓ YES', c2t: '✓ YES (μ=0.15)', c3t: '✓ YES (7:40)', c4t: '✓ YES (3:1 Ratio)' },
          { name: 'Zoe (Tires)', c1: true, c2: false, c3: false, c4: false, c2t: '✗ NO (μ=0.85)' },
          { name: 'Axel (Mechanic)', c1: true, c2: true, c3: true, c4: false, c4t: '✗ NO (Used 4:1)' },
          { name: 'Brooke (Telemetry)', c1: false, c2: false, c3: false, c4: false, c1t: '✗ NO Access' }
        ],
        solution: 'Kurt (Rival)',
        reconstruction: 'Kurt sneaked into the pit garage at 7:40 AM, greased the differential gears (dropping friction to 0.15), and swapped the 4:1 drive ratio to cause a spinout on Turn 4!'
      }
    };
  }

  initDOM() {
    const quickBtn = document.getElementById('quick-detective-btn');
    if (quickBtn) {
      quickBtn.addEventListener('click', () => {
        if (window.app) window.app.showView('view-stem-detective');
        this.renderCaseRoster();
      });
    }

    document.addEventListener('click', (e) => {
      if (e.target.id === 'close-stem-notebook-btn' || e.target.closest('#close-stem-notebook-btn')) {
        const modal = document.getElementById('stem-notebook-modal');
        if (modal) modal.classList.add('hidden');
      }
      if (e.target.id === 'close-stem-solved-btn' || e.target.closest('#close-stem-solved-btn')) {
        const modal = document.getElementById('stem-solved-modal');
        if (modal) modal.classList.add('hidden');
        this.renderCaseRoster();
      }
    });
  }

  openNotebook() {
    const modal = document.getElementById('stem-notebook-modal');
    if (!modal) return;

    const list = document.getElementById('stem-evidence-list');
    list.innerHTML = '';

    if (this.notebook.evidence.length === 0 && this.notebook.redHerrings.length === 0) {
      list.innerHTML = '<li class="stem-evidence-item" style="background: rgba(255,255,255,0.4); color: #78350f;">No clues collected yet! Inspect the crime scene hotspots.</li>';
    } else {
      this.notebook.evidence.forEach(ev => {
        const li = document.createElement('li');
        li.className = 'stem-evidence-item';
        li.innerHTML = `<strong>🔍 VERIFIED EVIDENCE:</strong> ${ev}`;
        list.appendChild(li);
      });

      this.notebook.redHerrings.forEach(rh => {
        const li = document.createElement('li');
        li.className = 'stem-evidence-item red-herring';
        li.innerHTML = `<strong>❌ RED HERRING (DISCARDED):</strong> ${rh}`;
        list.appendChild(li);
      });
    }

    modal.classList.remove('hidden');
    if (window.soundEngine) window.soundEngine.playTap();
  }

  renderCaseRoster() {
    const container = document.getElementById('stem-detective-container');
    if (!container) return;

    container.innerHTML = `
      <div class="stem-header-banner">
        <div class="stem-title-wrap">
          <div class="stem-agency-badge">🔎 STEM DETECTIVE AGENCY</div>
          <h1 class="stem-main-title">Lead Investigator Zayn's Case Files</h1>
          <p class="stem-main-desc">Combine Math, Observation, Scientific Experiments, and Logic Deduction to solve real mysteries!</p>
        </div>
        <div class="stem-top-controls">
          <button class="stem-notebook-btn" id="open-stem-notebook-btn">📓 Open Notebook</button>
        </div>
      </div>

      <div class="stem-cases-grid" id="stem-cases-grid">
        ${Object.values(this.cases).map(c => `
          <div class="stem-case-card" data-case="${c.id}">
            <div class="stem-case-icon-box">${c.icon}</div>
            <h3 class="stem-case-title">${c.title}</h3>
            <div class="stem-case-stem-topics">
              ${c.topics.map(t => `<span class="stem-topic-pill">${t}</span>`).join('')}
            </div>
            <p class="stem-case-desc">${c.desc}</p>
            <button class="stem-case-start-btn" data-caseid="${c.id}">
              <span>INVESTIGATE CRIME SCENE ➔</span>
            </button>
          </div>
        `).join('')}
      </div>
    `;

    document.getElementById('open-stem-notebook-btn').addEventListener('click', () => this.openNotebook());

    // Bind click handlers cleanly on all start buttons and cards
    const buttons = container.querySelectorAll('.stem-case-start-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const caseId = btn.dataset.caseid;
        this.startCase(caseId);
      });
    });

    const cards = container.querySelectorAll('.stem-case-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const caseId = card.dataset.case;
        this.startCase(caseId);
      });
    });
  }

  startCase(caseId) {
    if (!this.cases[caseId]) return;
    this.currentCaseId = caseId;
    this.currentStep = 1;
    this.inspectedHotspots.clear();
    this.notebook = {
      notes: [],
      evidence: [],
      redHerrings: [],
      suspects: this.cases[caseId].suspects
    };

    if (window.soundEngine) window.soundEngine.playCorrect();
    this.renderCrimeScene();
  }

  renderCrimeScene() {
    const c = this.cases[this.currentCaseId];
    const container = document.getElementById('stem-detective-container');
    if (!container) return;

    container.innerHTML = `
      <div class="stem-header-banner">
        <div class="stem-title-wrap">
          <div class="stem-agency-badge">🔎 ACTIVE CASE FILE: ${c.title.toUpperCase()}</div>
          <h1 class="stem-main-title">${c.icon} ${c.title}</h1>
          <p class="stem-main-desc">Location: ${c.sceneName} • Lead Sleuth: Zayn</p>
        </div>
        <div class="stem-top-controls">
          <button class="stem-back-btn" id="stem-back-to-roster-btn">◀ Case Files</button>
          <button class="stem-notebook-btn" id="open-stem-notebook-btn">📓 Notebook (${this.notebook.evidence.length} Evidence)</button>
        </div>
      </div>

      <div class="stem-progress-bar-card">
        <div class="stem-clue-stepper">
          ${(c.hotspots || []).map((h, idx) => `
            <div class="stem-step-node ${this.inspectedHotspots.has(h.id) ? 'completed' : (idx === 0 ? 'current' : '')}">
              <span>${h.icon} ${idx + 1}. ${h.title}</span>
            </div>
          `).join('')}
        </div>
        <button class="action-pill-btn" id="stem-open-matrix-btn" style="background:#f59e0b; color:#0f172a; font-weight:800;">
          📋 SOLVE LOGIC BOARD ➔
        </button>
      </div>

      <div class="stem-scene-board">
        <div class="stem-scene-header">
          <div class="stem-scene-location">📍 ${c.sceneName}</div>
          <span style="font-size:0.85rem; color:#94a3b8; font-weight:700;">Tap objects to inspect & run experiments</span>
        </div>

        <div class="stem-scene-content" id="stem-active-scene-area">
          <div class="stem-hotspots-grid">
            ${(c.hotspots || []).map(h => `
              <div class="stem-hotspot-card ${this.inspectedHotspots.has(h.id) ? 'inspected' : ''}" data-hotspot="${h.id}">
                <div class="stem-hotspot-icon">${h.icon}</div>
                <div class="stem-hotspot-title">${h.title}</div>
                <span class="stem-hotspot-tag">${this.inspectedHotspots.has(h.id) ? '✓ Inspected' : h.tag}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    document.getElementById('open-stem-notebook-btn').addEventListener('click', () => this.openNotebook());
    document.getElementById('stem-back-to-roster-btn').addEventListener('click', () => this.renderCaseRoster());
    document.getElementById('stem-open-matrix-btn').addEventListener('click', () => this.openDeductionMatrix());

    const hotspotCards = container.querySelectorAll('.stem-hotspot-card');
    hotspotCards.forEach(card => {
      card.addEventListener('click', () => {
        const hid = card.dataset.hotspot;
        this.inspectHotspot(hid);
      });
    });
  }

  inspectHotspot(hotspotId) {
    const area = document.getElementById('stem-active-scene-area');
    if (!area) return;

    // CASE 1: MOON ROCK
    if (this.currentCaseId === 'moon_rock') {
      if (hotspotId === 'footprints') {
        area.innerHTML = `
          <div class="stem-experiment-bench">
            <h2 class="stem-experiment-title">👣 Forensic Footprint Stride Measurement</h2>
            <p style="color:#cbd5e1; font-size:1rem; line-height:1.5;">
              The culprit ran across the corridor leaving <strong>7 muddy footprints</strong>.<br>
              Using your laser tape measure, you find the distance between each consecutive footprint is exactly <strong>18 inches</strong>.
            </p>

            <div style="background:#0f172a; border:2px solid #38bdf8; border-radius:14px; padding:1.25rem; display:flex; flex-direction:column; gap:0.8rem;">
              <div style="font-weight:800; color:#fde047;">📐 INVESTIGATOR CALCULATION:</div>
              <div style="font-size:1.1rem; color:#fff;">Total Travel Distance = 7 footprints × 18 inches = <strong>? inches</strong></div>
              <div style="font-size:0.95rem; color:#94a3b8;">(12 inches = 1 foot. Convert 126 inches into feet: 126 ÷ 12 = 10.5 ft)</div>
              
              <div style="display:flex; gap:0.8rem; margin-top:0.5rem; flex-wrap:wrap;">
                <button class="stem-case-start-btn" style="padding:0.6rem 1.2rem;" onclick="window.stemDetectiveEngine.submitStrideMath(108, false)">108 inches (9 ft)</button>
                <button class="stem-case-start-btn" style="padding:0.6rem 1.2rem;" onclick="window.stemDetectiveEngine.submitStrideMath(126, true)">126 inches (10.5 ft) ✓</button>
                <button class="stem-case-start-btn" style="padding:0.6rem 1.2rem;" onclick="window.stemDetectiveEngine.submitStrideMath(144, false)">144 inches (12 ft)</button>
              </div>
            </div>
          </div>
        `;
      } else if (hotspotId === 'materials') {
        area.innerHTML = `
          <div class="stem-experiment-bench">
            <h2 class="stem-experiment-title">🧲 Virtual Science Lab: Magnetism & Matter Test</h2>
            <p style="color:#cbd5e1; font-size:1rem; line-height:1.5;">
              You gathered 3 material fragments dropped near the vault door. Test each sample with the powerful neodymium magnet to identify which one came from the culprit's gear!
            </p>

            <div class="stem-experiment-tools-row">
              <div class="stem-sample-flask" id="sample-wood" onclick="window.stemDetectiveEngine.testMaterial('wood')">
                <span style="font-size:2.5rem;">🪵</span>
                <span style="font-weight:800; color:#cbd5e1;">Sample A (Wood)</span>
                <span style="font-size:0.75rem; color:#94a3b8;">Tap to Test Magnet</span>
              </div>

              <div class="stem-sample-flask" id="sample-plastic" onclick="window.stemDetectiveEngine.testMaterial('plastic')">
                <span style="font-size:2.5rem;">🧪</span>
                <span style="font-weight:800; color:#cbd5e1;">Sample B (Plastic)</span>
                <span style="font-size:0.75rem; color:#94a3b8;">Tap to Test Magnet</span>
              </div>

              <div class="stem-sample-flask" id="sample-iron" onclick="window.stemDetectiveEngine.testMaterial('iron')">
                <span style="font-size:2.5rem;">⚙️</span>
                <span style="font-weight:800; color:#fde047;">Sample C (Iron Alloy)</span>
                <span style="font-size:0.75rem; color:#94a3b8;">Tap to Test Magnet</span>
              </div>
            </div>

            <div class="stem-test-result-box" id="stem-material-test-result">
              💡 Select a sample above to apply the magnetic force test!
            </div>
          </div>
        `;
      } else if (hotspotId === 'cameras') {
        area.innerHTML = `
          <div class="stem-experiment-bench">
            <h2 class="stem-experiment-title">📹 Security Console: LCM Camera Synchronization</h2>
            <p style="color:#cbd5e1; font-size:1rem; line-height:1.5;">
              The museum has two security camera feeds covering the vault corridor:<br>
              • <strong>Camera A</strong> records snapshots every <strong>4 minutes</strong>.<br>
              • <strong>Camera B</strong> records snapshots every <strong>6 minutes</strong>.<br>
              Both cameras took a synchronized photo together at <strong>8:00 PM</strong>.
            </p>

            <div style="background:#0f172a; border:2px solid #6366f1; border-radius:14px; padding:1.25rem; display:flex; flex-direction:column; gap:0.8rem;">
              <div style="font-weight:800; color:#fde047;">🧠 LEAST COMMON MULTIPLE (LCM) DEDUCTION:</div>
              <div style="color:#e2e8f0;">Find LCM(4, 6) to know the exact minute both cameras recorded simultaneously:</div>
              <div style="color:#94a3b8; font-size:0.9rem;">Multiples of 4: 4, 8, <strong>12</strong>, 16... | Multiples of 6: 6, <strong>12</strong>, 18...</div>

              <div style="display:flex; gap:0.8rem; margin-top:0.5rem; flex-wrap:wrap;">
                <button class="stem-case-start-btn" style="padding:0.6rem 1.2rem;" onclick="window.stemDetectiveEngine.submitLCM(8, false)">8:08 PM (LCM = 8?)</button>
                <button class="stem-case-start-btn" style="padding:0.6rem 1.2rem;" onclick="window.stemDetectiveEngine.submitLCM(12, true)">8:12 PM (LCM = 12) ✓</button>
                <button class="stem-case-start-btn" style="padding:0.6rem 1.2rem;" onclick="window.stemDetectiveEngine.submitLCM(24, false)">8:24 PM (LCM = 24?)</button>
              </div>
            </div>
          </div>
        `;
      } else if (hotspotId === 'temp_log') {
        area.innerHTML = `
          <div class="stem-experiment-bench">
            <h2 class="stem-experiment-title">🌡️ Cryo-Vault Log: Rate of Temperature Change</h2>
            <p style="color:#cbd5e1; font-size:1rem; line-height:1.5;">
              The lunar specimen freezer normally holds at a constant <strong>32°F</strong>.<br>
              The automated diagnostic log recorded these temperatures overnight:
            </p>

            <div style="background:#0f172a; border:2px solid #10b981; border-radius:14px; padding:1.25rem; display:flex; flex-direction:column; gap:0.8rem;">
              <div style="font-family:monospace; font-size:1rem; color:#38bdf8;">
                8:00 PM ➔ 32°F<br>
                8:15 PM ➔ 36°F (+4°F)<br>
                8:30 PM ➔ 40°F (+4°F)<br>
                8:45 PM ➔ 44°F (+4°F)
              </div>
              <div style="font-weight:800; color:#fde047;">📈 DATA INTERPRETATION QUESTION:</div>
              <div style="color:#e2e8f0;">The temperature rises at a steady rate of <strong>+4°F every 15 minutes</strong>. When was the seal breached?</div>

              <div style="display:flex; gap:0.8rem; margin-top:0.5rem; flex-wrap:wrap;">
                <button class="stem-case-start-btn" style="padding:0.6rem 1.2rem;" onclick="window.stemDetectiveEngine.submitTempPattern('8:05 PM', true)">Between 8:00 PM and 8:15 PM ✓</button>
                <button class="stem-case-start-btn" style="padding:0.6rem 1.2rem;" onclick="window.stemDetectiveEngine.submitTempPattern('9:00 PM', false)">After 8:45 PM</button>
              </div>
            </div>
          </div>
        `;
      } else if (hotspotId === 'density_lab') {
        area.innerHTML = `
          <div class="stem-experiment-bench">
            <h2 class="stem-experiment-title">⚖️ Physical Density Experiment: Real vs Decoy Rock</h2>
            <p style="color:#cbd5e1; font-size:1rem; line-height:1.5;">
              The real Apollo Moon Rock has a known basalt density of <strong>3.3 g/mL</strong>.<br>
              You place the suspect rock left on the display stand onto the balance scale and submerge it in water to measure displacement:
            </p>

            <div style="background:#0f172a; border:2px solid #a855f7; border-radius:14px; padding:1.25rem; display:flex; flex-direction:column; gap:0.8rem;">
              <div style="font-size:1.1rem; color:#fff;">
                • Scale Mass (m) = <strong>40 grams</strong><br>
                • Water Volume Displaced (V) = <strong>20 mL</strong>
              </div>
              <div style="font-weight:800; color:#fde047;">🧪 DENSITY FORMULA: Density = Mass ÷ Volume (D = m ÷ V)</div>
              <div style="color:#e2e8f0;">Calculate the density: 40 g ÷ 20 mL = <strong>? g/mL</strong></div>

              <div style="display:flex; gap:0.8rem; margin-top:0.5rem; flex-wrap:wrap;">
                <button class="stem-case-start-btn" style="padding:0.6rem 1.2rem;" onclick="window.stemDetectiveEngine.submitDensity(2.0, true)">2.0 g/mL (FAKE RESIN DECOY!) ✓</button>
                <button class="stem-case-start-btn" style="padding:0.6rem 1.2rem;" onclick="window.stemDetectiveEngine.submitDensity(3.3, false)">3.3 g/mL (Real Rock)</button>
                <button class="stem-case-start-btn" style="padding:0.6rem 1.2rem;" onclick="window.stemDetectiveEngine.submitDensity(0.5, false)">0.5 g/mL</button>
              </div>
            </div>
          </div>
        `;
      } else if (hotspotId === 'flashlight') {
        area.innerHTML = `
          <div class="stem-experiment-bench">
            <h2 class="stem-experiment-title">🔦 Broken Flashlight (Evidence Check)</h2>
            <p style="color:#cbd5e1; font-size:1rem; line-height:1.5;">
              You find a dropped flashlight with a cracked bulb. You scan its barcode into the museum inventory system.
            </p>

            <div style="background:#450a0a; border:2px solid #ef4444; border-radius:14px; padding:1.25rem; display:flex; flex-direction:column; gap:0.8rem;">
              <div style="font-weight:800; color:#fca5a5;">⚠️ INVENTORY LOG RESULT:</div>
              <div style="color:#fecaca;">
                "Flashlight #409 logged as lost by day cleaning staff 2 days ago."<br>
                <strong>Conclusion:</strong> This item is unrelated to last night's heist!
              </div>
              <button class="stem-case-start-btn" style="background:#dc2626; width:fit-content;" onclick="window.stemDetectiveEngine.recordRedHerring('Broken flashlight was dropped 2 days ago by day janitor (Red Herring).')">
                RECORD AS RED HERRING IN NOTEBOOK ➔
              </button>
            </div>
          </div>
        `;
      }
    }

    // CASE 2: GREENHOUSE
    else if (this.currentCaseId === 'greenhouse') {
      if (hotspotId === 'soil_ph') {
        area.innerHTML = `
          <div class="stem-experiment-bench">
            <h2 class="stem-experiment-title">🧪 Soil Acidity & pH Chemistry Test</h2>
            <p style="color:#cbd5e1; font-size:1rem; line-height:1.5;">
              You dip litmus pH paper into the orchid soil bed. The paper turns bright red-orange indicating high acidity.<br>
              Normal orchid water has a neutral pH of 7.0. The test reveals a contaminated <strong>pH level of 4.5</strong>!
            </p>
            <div style="background:#0f172a; border:2px solid #10b981; border-radius:14px; padding:1.25rem; display:flex; flex-direction:column; gap:0.8rem;">
              <div style="font-weight:800; color:#fde047;">🔬 CHEMISTRY OBSERVATION:</div>
              <div style="color:#fff;">Contaminant matched: <strong>pH 4.5 Acidic Hydro-fertilizer</strong> (matches Elena & Chloe).</div>
              <button class="stem-case-start-btn" style="width:fit-content; background:#10b981;" onclick="window.stemDetectiveEngine.recordGenericEvidence('soil_ph', 'Orchid soil contaminated with pH 4.5 acidic solution (Matches Elena & Chloe).')">
                RECORD IN NOTEBOOK ➔
              </button>
            </div>
          </div>
        `;
      } else if (hotspotId === 'light_spectrum') {
        area.innerHTML = `
          <div class="stem-experiment-bench">
            <h2 class="stem-experiment-title">💡 Smart LED Spectrum Analysis</h2>
            <p style="color:#cbd5e1; font-size:1rem; line-height:1.5;">
              Plants absorb red (660nm) and blue (450nm) light for photosynthesis. They reflect green light (530nm), absorbing 0% energy.<br>
              The smart lighting controller was maliciously switched to <strong>Green 530nm</strong>!
            </p>
            <div style="background:#0f172a; border:2px solid #38bdf8; border-radius:14px; padding:1.25rem; display:flex; flex-direction:column; gap:0.8rem;">
              <div style="font-weight:800; color:#fde047;">🌱 PHOTOSYNTHESIS DEDUCTION:</div>
              <div style="color:#fff;">Green 530nm prevented all photosynthesis, starving the orchids! Only Elena had Green LED overrides.</div>
              <button class="stem-case-start-btn" style="width:fit-content; background:#38bdf8;" onclick="window.stemDetectiveEngine.recordGenericEvidence('light_spectrum', 'Grow lights altered to Green 530nm zero-absorption spectrum (Matches Elena).')">
                RECORD IN NOTEBOOK ➔
              </button>
            </div>
          </div>
        `;
      } else if (hotspotId === 'transpiration') {
        area.innerHTML = `
          <div class="stem-experiment-bench">
            <h2 class="stem-experiment-title">📊 Water Reservoir Flow Rate</h2>
            <p style="color:#cbd5e1; font-size:1rem; line-height:1.5;">
              The nutrient tank drained <strong>1,000 mL</strong> in <strong>4 hours</strong>.<br>
              Calculate flow rate: 1000 mL ÷ 4 hr = <strong>250 mL/hour</strong>.
            </p>
            <button class="stem-case-start-btn" style="width:fit-content; background:#f59e0b; color:#0f172a;" onclick="window.stemDetectiveEngine.recordGenericEvidence('transpiration', 'Hydroponic flow rate was 250 mL/hr between 9:00 PM and 10:00 PM (Matches 9:15 PM saboteur timeline).')">
              RECORD FLOW RATE IN NOTEBOOK ➔
            </button>
          </div>
        `;
      } else if (hotspotId === 'dropped_glove') {
        area.innerHTML = `
          <div class="stem-experiment-bench">
            <h2 class="stem-experiment-title">🧤 Dropped Garden Glove</h2>
            <p style="color:#cbd5e1; font-size:1rem;">Found near the tool rack. Tagged with initials "HG" (Head Gardener who was on vacation).</p>
            <button class="stem-case-start-btn" style="background:#dc2626; width:fit-content;" onclick="window.stemDetectiveEngine.recordRedHerring('Garden glove belongs to vacationing Head Gardener (Red Herring).')">
              RECORD AS RED HERRING ➔
            </button>
          </div>
        `;
      }
    }

    // CASE 3: POWER OUTAGE
    else if (this.currentCaseId === 'power_outage') {
      if (hotspotId === 'multimeter_ohm') {
        area.innerHTML = `
          <div class="stem-experiment-bench">
            <h2 class="stem-experiment-title">🔌 Ohm’s Law Circuit Voltage & Current</h2>
            <p style="color:#cbd5e1; font-size:1rem; line-height:1.5;">
              Voltage $V = 120\\text{ Volts}$, Sabotaged Resistance $R = 2\\ \\Omega$.<br>
              Ohm's Law: $I = V \\div R = 120 \\div 2 = \\mathbf{60\\text{ Amperes}}$ overload current!
            </p>
            <button class="stem-case-start-btn" style="width:fit-content; background:#10b981;" onclick="window.stemDetectiveEngine.recordGenericEvidence('multimeter_ohm', '60 Amp current surge calculated via Ohm’s Law I = 120V / 2Ω (Matches Victor & Jax).')">
              RECORD CURRENT IN NOTEBOOK ➔
            </button>
          </div>
        `;
      } else if (hotspotId === 'fuse_relay') {
        area.innerHTML = `
          <div class="stem-experiment-bench">
            <h2 class="stem-experiment-title">⚡ Blown Relay Fuse Box</h2>
            <p style="color:#cbd5e1; font-size:1rem;">Parallel branch #4 tripped at exactly 11:20 PM by competitor Victor.</p>
            <button class="stem-case-start-btn" style="width:fit-content; background:#38bdf8;" onclick="window.stemDetectiveEngine.recordGenericEvidence('fuse_relay', 'Parallel branch #4 blown at 11:20 PM by rival competitor.')">
              RECORD IN NOTEBOOK ➔
            </button>
          </div>
        `;
      } else if (hotspotId === 'time_log') {
        area.innerHTML = `
          <div class="stem-experiment-bench">
            <h2 class="stem-experiment-title">🕒 Substation Breaker Clock</h2>
            <p style="color:#cbd5e1; font-size:1rem;">Digital clock froze at 11:20:14 PM when the main transformer popped.</p>
            <button class="stem-case-start-btn" style="width:fit-content; background:#f59e0b; color:#0f172a;" onclick="window.stemDetectiveEngine.recordGenericEvidence('time_log', 'Blackout occurred precisely at 11:20 PM.')">
              RECORD TIMELINE ➔
            </button>
          </div>
        `;
      } else if (hotspotId === 'wire_stripper') {
        area.innerHTML = `
          <div class="stem-experiment-bench">
            <h2 class="stem-experiment-title">🔧 Dropped Wire Stripper</h2>
            <p style="color:#cbd5e1; font-size:1rem;">Belongs to the regular city utility contractor from last week's maintenance.</p>
            <button class="stem-case-start-btn" style="background:#dc2626; width:fit-content;" onclick="window.stemDetectiveEngine.recordRedHerring('Wire stripper was left by utility contractor last week (Red Herring).')">
              RECORD AS RED HERRING ➔
            </button>
          </div>
        `;
      }
    }

    // CASE 4: RACECAR SABOTAGE
    else if (this.currentCaseId === 'racecar_sabotage') {
      if (hotspotId === 'skid_friction') {
        area.innerHTML = `
          <div class="stem-experiment-bench">
            <h2 class="stem-experiment-title">🛞 Turn 4 Friction Coefficient Test</h2>
            <p style="color:#cbd5e1; font-size:1rem; line-height:1.5;">
              Normal dry asphalt has friction coefficient $\\mu = 0.85$.<br>
              The oil slick measured $\\mu = 0.15$, causing complete loss of grip on Turn 4!
            </p>
            <button class="stem-case-start-btn" style="width:fit-content; background:#10b981;" onclick="window.stemDetectiveEngine.recordGenericEvidence('skid_friction', 'Friction dropped to μ = 0.15 due to synthetic differential oil tamper (Matches Kurt & Axel).')">
              RECORD FRICTION DATA ➔
            </button>
          </div>
        `;
      } else if (hotspotId === 'speed_telemetry') {
        area.innerHTML = `
          <div class="stem-experiment-bench">
            <h2 class="stem-experiment-title">⏱️ Telemetry Speed Velocity Formula</h2>
            <p style="color:#cbd5e1; font-size:1rem;">Car traveled 300 meters in 5 seconds before spinout: $v = 300 \\div 5 = 60\\text{ m/s}$ ($216\\text{ km/h}$).</p>
            <button class="stem-case-start-btn" style="width:fit-content; background:#38bdf8;" onclick="window.stemDetectiveEngine.recordGenericEvidence('speed_telemetry', 'Entry velocity was 60 m/s at 7:40 AM.')">
              RECORD VELOCITY ➔
            </button>
          </div>
        `;
      } else if (hotspotId === 'gearbox_ratio') {
        area.innerHTML = `
          <div class="stem-experiment-bench">
            <h2 class="stem-experiment-title">⚙️ Differential Gear Ratio Inspection</h2>
            <p style="color:#cbd5e1; font-size:1rem;">Drive ratio was altered from standard 4:1 to an aggressive 3:1 gear set by rival driver Kurt.</p>
            <button class="stem-case-start-btn" style="width:fit-content; background:#f59e0b; color:#0f172a;" onclick="window.stemDetectiveEngine.recordGenericEvidence('gearbox_ratio', 'Gearbox altered to 3:1 ratio (Matches Kurt).')">
              RECORD GEAR RATIO ➔
            </button>
          </div>
        `;
      } else if (hotspotId === 'pit_pass') {
        area.innerHTML = `
          <div class="stem-experiment-bench">
            <h2 class="stem-experiment-title">🎫 Dropped VIP Pass</h2>
            <p style="color:#cbd5e1; font-size:1rem;">Belongs to a spectator who dropped it in the grandstand seating area.</p>
            <button class="stem-case-start-btn" style="background:#dc2626; width:fit-content;" onclick="window.stemDetectiveEngine.recordRedHerring('VIP pass dropped by grandstand spectator (Red Herring).')">
              RECORD AS RED HERRING ➔
            </button>
          </div>
        `;
      }
    }
  }

  submitStrideMath(val, isCorrect) {
    if (isCorrect) {
      this.inspectedHotspots.add('footprints');
      this.notebook.evidence.push("Thief stride distance is 18 inches (Total 126 in / 10.5 ft). Matches Maya, Leo, and Sam (Alex eliminated due to 24 in stride).");
      if (window.soundEngine) window.soundEngine.playLevelUp();
      if (window.helpers) window.helpers.spawnAuraFloatingText("STRIDE EVIDENCE RECORDED! +200 Aura 👣", undefined, undefined, true);
      this.renderCrimeScene();
    } else {
      if (window.soundEngine) window.soundEngine.playWrong();
      if (window.helpers) window.helpers.spawnAuraFloatingText("Recalculate: 7 × 18 = 126!", undefined, undefined, false);
    }
  }

  testMaterial(mat) {
    const resBox = document.getElementById('stem-material-test-result');
    if (!resBox) return;

    if (mat === 'iron') {
      resBox.innerHTML = `
        <div style="color:#4ade80; font-weight:800; font-size:1.1rem;">⚡ STRONG MAGNETIC ATTRACTION!</div>
        <div style="color:#e2e8f0; margin-top:0.3rem;">
          Sample C is made of <strong>Ferromagnetic Iron Alloy</strong>! The culprit's equipment left magnetic iron residue at the crime scene.
        </div>
        <button class="stem-case-start-btn" style="margin-top:0.8rem; background:#10b981;" onclick="window.stemDetectiveEngine.recordIronEvidence()">
          RECORD IN DETECTIVE NOTEBOOK ➔
        </button>
      `;
      if (window.soundEngine) window.soundEngine.playLevelUp();
    } else {
      resBox.innerHTML = `
        <div style="color:#94a3b8; font-weight:700;">❌ No magnetic attraction observed on this non-ferrous sample.</div>
      `;
      if (window.soundEngine) window.soundEngine.playTap();
    }
  }

  recordIronEvidence() {
    this.inspectedHotspots.add('materials');
    this.notebook.evidence.push("Equipment scrap is Ferromagnetic Iron Alloy. Matches Sam's robotics gear (Alex uses Titanium, Maya uses Glass, Leo uses Brass).");
    if (window.helpers) window.helpers.spawnAuraFloatingText("MAGNETIC EVIDENCE LOGGED! 🧲✨", undefined, undefined, true);
    this.renderCrimeScene();
  }

  submitLCM(val, isCorrect) {
    if (isCorrect) {
      this.inspectedHotspots.add('cameras');
      this.notebook.evidence.push("Cameras synchronized at 8:12 PM (LCM of 4 & 6 min). Footage captured shadowy silhouette entering vault at exactly 8:12 PM.");
      if (window.soundEngine) window.soundEngine.playLevelUp();
      if (window.helpers) window.helpers.spawnAuraFloatingText("TIMELINE DECRYPTED AT 8:12 PM! 📹✨", undefined, undefined, true);
      this.renderCrimeScene();
    } else {
      if (window.soundEngine) window.soundEngine.playWrong();
      if (window.helpers) window.helpers.spawnAuraFloatingText("Check multiples: LCM(4,6) = 12!", undefined, undefined, false);
    }
  }

  submitTempPattern(ans, isCorrect) {
    if (isCorrect) {
      this.inspectedHotspots.add('temp_log');
      this.notebook.evidence.push("Freezer warmed from 32°F to 36°F between 8:00 PM and 8:15 PM (+4°F rate), confirming vault door was opened around 8:12 PM!");
      if (window.soundEngine) window.soundEngine.playLevelUp();
      if (window.helpers) window.helpers.spawnAuraFloatingText("THERMAL DATA CONFIRMED! 🌡️📈", undefined, undefined, true);
      this.renderCrimeScene();
    } else {
      if (window.soundEngine) window.soundEngine.playWrong();
    }
  }

  submitDensity(val, isCorrect) {
    if (isCorrect) {
      this.inspectedHotspots.add('density_lab');
      this.notebook.evidence.push("Display rock density is 2.0 g/mL (40g ÷ 20mL). Real Moon Rock is 3.3 g/mL — proving the Moon Rock was stolen and replaced with a resin fake!");
      if (window.soundEngine) window.soundEngine.playLevelUp();
      if (window.helpers) window.helpers.spawnAuraFloatingText("DENSITY CALCULATED: FAKE DECOY! ⚖️🧪", undefined, undefined, true);
      this.renderCrimeScene();
    } else {
      if (window.soundEngine) window.soundEngine.playWrong();
      if (window.helpers) window.helpers.spawnAuraFloatingText("Density = 40 ÷ 20 = 2.0 g/mL", undefined, undefined, false);
    }
  }

  recordGenericEvidence(hotspotId, text) {
    this.inspectedHotspots.add(hotspotId);
    this.notebook.evidence.push(text);
    if (window.soundEngine) window.soundEngine.playLevelUp();
    if (window.helpers) window.helpers.spawnAuraFloatingText("EVIDENCE LOGGED IN NOTEBOOK! ✨", undefined, undefined, true);
    this.renderCrimeScene();
  }

  recordRedHerring(text) {
    this.notebook.redHerrings.push(text);
    if (window.soundEngine) window.soundEngine.playTap();
    if (window.helpers) window.helpers.spawnAuraFloatingText("Red Herring Logged! ❌", undefined, undefined, false);
    this.renderCrimeScene();
  }

  openDeductionMatrix() {
    const c = this.cases[this.currentCaseId];
    const area = document.getElementById('stem-active-scene-area');
    if (!area) return;

    const cols = c.matrixColumns || ['Suspect', 'Criterion 1', 'Criterion 2', 'Criterion 3', 'Criterion 4', 'Action'];
    const rows = c.matrixRows || [];

    area.innerHTML = `
      <div class="stem-deduction-board">
        <h2 style="font-family:'Fredoka', cursive; font-size:1.6rem; color:#fde047; margin:0;">
          📋 Suspect Elimination Matrix (${c.title})
        </h2>
        <p style="color:#cbd5e1; font-size:0.95rem; margin:0;">
          Cross-reference every piece of STEM evidence discovered during your investigation. Select the only suspect who matches all criteria!
        </p>

        <table class="stem-matrix-table">
          <thead>
            <tr>
              ${cols.map(col => `<th>${col}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${rows.map(r => {
              const isMatch = r.c1 && r.c2 && r.c3 && r.c4;
              return `
                <tr style="${isMatch ? 'background: rgba(99, 102, 241, 0.25); border: 2px solid #818cf8;' : ''}">
                  <td style="color:#fde047; font-weight:bold;">${r.name}</td>
                  <td class="${r.c1 ? 'stem-matrix-match' : 'stem-matrix-mismatch'}">${r.c1t || (r.c1 ? '✓ YES' : '✗ NO')}</td>
                  <td class="${r.c2 ? 'stem-matrix-match' : 'stem-matrix-mismatch'}">${r.c2t || (r.c2 ? '✓ YES' : '✗ NO')}</td>
                  <td class="${r.c3 ? 'stem-matrix-match' : 'stem-matrix-mismatch'}">${r.c3t || (r.c3 ? '✓ YES' : '✗ NO')}</td>
                  <td class="${r.c4 ? 'stem-matrix-match' : 'stem-matrix-mismatch'}">${r.c4t || (r.c4 ? '✓ YES' : '✗ NO')}</td>
                  <td>
                    <button class="stem-suspect-pick-btn" style="${isMatch ? 'background:#f59e0b; color:#0f172a;' : ''}" onclick="window.stemDetectiveEngine.accuse('${r.name}')">
                      ${isMatch ? 'APPREHEND ➔' : 'Accuse'}
                    </button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  accuse(suspectName) {
    const c = this.cases[this.currentCaseId];
    if (suspectName.includes(c.solution) || c.solution.includes(suspectName)) {
      // VICTORY!
      if (window.soundEngine) window.soundEngine.playLevelUp();
      if (window.helpers) window.helpers.spawnConfetti(150);

      if (window.gameState) {
        window.gameState.addXP(500);
        window.gameState.addGems(100);
        window.gameState.addAura(2500);
      }

      const modal = document.getElementById('stem-solved-modal');
      const title = document.getElementById('stem-solved-title');
      const text = document.getElementById('stem-solved-text');
      const badge = document.getElementById('stem-solved-badge-name');

      if (modal && title && text && badge) {
        title.textContent = `CASE SOLVED: ${c.title.toUpperCase()}!`;
        text.textContent = c.reconstruction;
        badge.textContent = `MASTER STEM DETECTIVE 🔎`;
        modal.classList.remove('hidden');
      }
    } else {
      if (window.soundEngine) window.soundEngine.playWrong();
      if (window.helpers) window.helpers.spawnAuraFloatingText(`${suspectName} does not match all the physical evidence! Check the matrix.`, undefined, undefined, false);
    }
  }
}

window.STEMDetectiveEngine = STEMDetectiveEngine;
