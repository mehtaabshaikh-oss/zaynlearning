/**
 * ClassroomEngine - Interactive School Curriculum Reinforcement
 * 
 * Manages Classroom Power-Ups:
 * - 5-Step Pedagogy: LEARN -> SEE -> TRY -> POP QUIZ -> MASTER
 * - Interactive widgets: Analog Clock, Array Rotator (90°), Ecosystem Sorter, Arctic Detective
 * - Daily School Word (+25 XP / +50 XP)
 * - Quick School Quiz (10 mixed questions)
 * - Multi-session mastery tracking
 */

class ClassroomEngine {
  constructor() {
    this.currentCategory = 'science'; // 'science' | 'math'
    this.activeTopic = null;
    this.currentStep = 1; // 1: Did You Know, 2: Explain, 3: Explore, 4: Pop Quiz, 5: Results
    
    // Pop Quiz state
    this.quizQuestions = [];
    this.currentQuizIdx = 0;
    this.quizScore = 0;
    this.quizMistakes = [];
    
    // Interactive clock state
    this.clockHours = 3;
    this.clockMinutes = 0;
    this.clockTarget = null;
    
    // Array rotator state
    this.arrayRows = 3;
    this.arrayCols = 4;
    this.arrayRotated = false;

    // TIMSS Grade 4 state
    this.isTimssMode = false;
    this.timssDomain = null;

    this.bindDOM();
  }

  bindDOM() {
    // Top Navbar button
    const navBtn = document.getElementById('quick-classroom-btn');
    if (navBtn) {
      navBtn.addEventListener('click', () => {
        window.app.showView('view-classroom-hub');
        this.renderHub();
      });
    }

    // Category Tabs
    document.querySelectorAll('.classroom-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.classroom-cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentCategory = btn.dataset.cat;
        this.renderTopicsGrid();
      });
    });

    // Quick Tools: Daily Word & Quick Quiz & TIMSS Daily Practice
    const timssDailyBtn = document.getElementById('classroom-timss-daily-btn');
    if (timssDailyBtn) {
      timssDailyBtn.addEventListener('click', () => this.launchTimssDailyPractice());
    }
    const dailyWordBtn = document.getElementById('classroom-daily-word-btn');
    if (dailyWordBtn) {
      dailyWordBtn.addEventListener('click', () => this.launchDailySchoolWord());
    }

    const quickQuizBtn = document.getElementById('classroom-quick-quiz-btn');
    if (quickQuizBtn) {
      quickQuizBtn.addEventListener('click', () => this.launchQuickSchoolQuiz());
    }

    const dykFeedBtn = document.getElementById('classroom-dyk-feed-btn');
    if (dykFeedBtn) {
      dykFeedBtn.addEventListener('click', () => this.launchDidYouKnowFeed());
    }
  }

  // ==========================================================================
  // HUB VIEW & STATS
  // ==========================================================================
  renderHub() {
    this.updateStats();
    this.renderDailyWordBanner();
    this.renderTopicsGrid();
  }

  updateStats() {
    const progress = window.gameState.data.classroomProgress || { concepts: {} };
    const concepts = progress.concepts || {};
    
    let learnedCount = 0;
    let masteredCount = 0;

    for (let id in concepts) {
      const st = concepts[id].state;
      if (st && st !== 'NEW') learnedCount++;
      if (st === 'MASTERED') masteredCount++;
    }

    const learnedEl = document.getElementById('classroom-stat-learned');
    const masteredEl = document.getElementById('classroom-stat-mastered');
    const streakEl = document.getElementById('classroom-stat-streak');

    if (learnedEl) learnedEl.textContent = learnedCount;
    if (masteredEl) masteredEl.textContent = masteredCount;
    if (streakEl) streakEl.textContent = `${window.gameState.data.streak || 1} 🔥`;
  }

  renderDailyWordBanner() {
    const dayIdx = new Date().getDate() % DAILY_SCHOOL_WORDS.length;
    const word = DAILY_SCHOOL_WORDS[dayIdx];
    
    const termEl = document.getElementById('daily-word-term-text');
    const descEl = document.getElementById('daily-word-desc-text');
    if (termEl) termEl.textContent = `${word.term} (${word.category})`;
    if (descEl) descEl.textContent = word.definition;
  }

  renderTopicsGrid() {
    const container = document.getElementById('classroom-topics-container');
    if (!container) return;

    container.innerHTML = '';

    // Specialized TIMSS Grade 4 Mathematics Category
    if (this.currentCategory === 'timss') {
      const timssModules = [
        {
          id: 'timss_all',
          domain: null,
          title: '🎯 Daily 10-Question Random Blitz',
          tag: 'MIXED REASONING • ALL DOMAINS',
          icon: '🎯',
          badge: 'RECOMMENDED',
          badgeClass: 'badge-strong',
          desc: 'A fresh, randomized 10-question set pulled from all 75 TIMSS questions. Ideal for everyday warm-up with zero grading stress!',
          count: '75 Qs in Pool',
          time: '5 min'
        },
        {
          id: 'timss_geo',
          domain: 'geometry',
          title: '📐 Geometry, Angles & 3D Shapes',
          tag: 'SPATIAL REASONING • HIGH PRIORITY',
          icon: '📐',
          badge: '25 QUESTIONS',
          badgeClass: 'badge-learning',
          desc: 'Protractors, missing angles, parallel/perpendicular lines, symmetry, 3D shape nets, and coordinate grids.',
          count: '25 Questions',
          time: '6 min'
        },
        {
          id: 'timss_num',
          domain: 'number',
          title: '🔢 Number Sense, Fractions & Decimals',
          tag: 'ARITHMETIC & FRACTIONS',
          icon: '🔢',
          badge: '29 QUESTIONS',
          badgeClass: 'badge-practicing',
          desc: 'Place value composition, multi-digit operations, fractions on number lines, adding decimals, and number rules.',
          count: '29 Questions',
          time: '6 min'
        },
        {
          id: 'timss_data',
          domain: 'data',
          title: '📊 Data Display & Visual Graphs',
          tag: 'DATA & INTERPRETATION',
          icon: '📊',
          badge: '11 QUESTIONS',
          badgeClass: 'badge-new',
          desc: 'Line plots with fractional data, two-dataset bar graphs, frequency tables, and circle graphs (pie charts).',
          count: '11 Questions',
          time: '4 min'
        },
        {
          id: 'timss_ext',
          domain: 'extended',
          title: '🚀 TIMSS Grandmaster Reasoning',
          tag: 'NON-ROUTINE LOGIC • 625+ LEVEL',
          icon: '🚀',
          badge: '10 QUESTIONS',
          badgeClass: 'badge-mastered',
          desc: 'Challenging multi-step constraint puzzles, balancing mystery equations, and composite geometry problems.',
          count: '10 Questions',
          time: '7 min'
        }
      ];

      timssModules.forEach(mod => {
        const card = document.createElement('div');
        card.className = 'classroom-topic-card';
        card.innerHTML = `
          <div class="topic-card-top">
            <div class="topic-card-icon">${mod.icon}</div>
            <span class="topic-card-badge ${mod.badgeClass}">${mod.badge}</span>
          </div>
          <div class="topic-card-tag">${mod.tag}</div>
          <div class="topic-card-title">${mod.title}</div>
          <div class="topic-card-desc">${mod.desc}</div>
          <div class="topic-card-footer">
            <span class="topic-card-time">⏱️ ~${mod.time}</span>
            <button class="topic-start-btn">START PRACTICE ➔</button>
          </div>
        `;
        card.addEventListener('click', () => this.launchTimssDailyPractice(mod.domain));
        container.appendChild(card);
      });
      return;
    }

    const list = CLASSROOM_CURRICULUM[this.currentCategory] || [];
    const progress = window.gameState.data.classroomProgress?.concepts || {};

    list.forEach(topic => {
      const topicProg = progress[topic.id] || { state: 'NEW', sessions: [] };
      const card = document.createElement('div');
      card.className = 'classroom-topic-card';

      let badgeClass = 'badge-new';
      if (topicProg.state === 'LEARNING') badgeClass = 'badge-learning';
      if (topicProg.state === 'PRACTICING') badgeClass = 'badge-practicing';
      if (topicProg.state === 'STRONG') badgeClass = 'badge-strong';
      if (topicProg.state === 'MASTERED') badgeClass = 'badge-mastered';

      card.innerHTML = `
        <div class="topic-card-top">
          <div class="topic-card-icon">${topic.icon}</div>
          <span class="topic-card-badge ${badgeClass}">${topicProg.state || 'NEW'}</span>
        </div>
        <div class="topic-card-tag">${topic.tag}</div>
        <div class="topic-card-title">${topic.title}</div>
        <div class="topic-card-desc">${topic.definition}</div>
        <div class="topic-card-footer">
          <span class="topic-card-time">⏱️ ~${topic.estimatedMins} min</span>
          <button class="topic-start-btn">START POWER-UP ➔</button>
        </div>
      `;

      card.addEventListener('click', () => this.startLesson(topic));
      container.appendChild(card);
    });
  }

  // ==========================================================================
  // LESSON RUNNER (5 STEPS)
  // ==========================================================================
  startLesson(topic) {
    this.activeTopic = topic;
    this.currentStep = 1;
    this.quizMistakes = [];
    this.isPracticeMode = !!topic.isPracticeTest;
    
    if (this.isPracticeMode) {
      // Practice test: load ALL questions and thoroughly shuffle them with each run
      const allQs = [...topic.questions];
      for (let i = allQs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allQs[i], allQs[j]] = [allQs[j], allQs[i]];
      }
      this.quizQuestions = allQs;
    } else {
      // Standard lesson: pick 5 randomized questions
      const allQs = [...topic.questions];
      for (let i = allQs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allQs[i], allQs[j]] = [allQs[j], allQs[i]];
      }
      this.quizQuestions = allQs.slice(0, 5);
    }
    this.currentQuizIdx = 0;
    this.quizScore = 0;

    const modal = document.getElementById('classroom-lesson-modal');
    if (modal) modal.classList.remove('hidden');
    
    if (window.soundEngine) window.soundEngine.playTap();
    this.renderCurrentStep();
  }

  closeLesson() {
    const modal = document.getElementById('classroom-lesson-modal');
    if (modal) modal.classList.add('hidden');
    this.isTimssMode = false;
    this.timssDomain = null;
    this.renderHub();
  }

  renderCurrentStep() {
    const body = document.getElementById('lesson-modal-content');
    const stepInd = document.getElementById('lesson-step-ind');
    const footer = document.getElementById('lesson-modal-footer-btns');
    if (!body || !this.activeTopic) return;

    if (this.currentStep === 1) {
      // Step 1: Did You Know?
      if (stepInd) stepInd.textContent = `STEP 1 / 5 • 💡 DID YOU KNOW?`;
      body.innerHTML = `
        <div class="did-you-know-card">
          <div class="did-you-know-icon">💡</div>
          <div class="did-you-know-text">
            <h3 style="color:#fde047; font-family:'Space Grotesk', sans-serif; margin-bottom:8px;">Did You Know?</h3>
            <p>${this.activeTopic.didYouKnow}</p>
          </div>
        </div>
      `;
      footer.innerHTML = `
        <div></div>
        <button class="lesson-nav-btn" onclick="window.classroomEngine.nextStep()">CONTINUE ➔</button>
      `;
    } else if (this.currentStep === 2) {
      // Step 2: What Does It Mean? (Explain)
      if (stepInd) stepInd.textContent = `STEP 2 / 5 • 📖 WHAT DOES IT MEAN?`;
      
      const examplesHTML = this.activeTopic.examples.map(ex => `
        <div class="concept-example-pill">
          <div class="concept-example-name">${ex.name}</div>
          <div class="concept-example-desc">${ex.text}</div>
        </div>
      `).join('');

      body.innerHTML = `
        <div class="concept-def-box">
          <div class="concept-def-title">${this.activeTopic.tag}</div>
          <div class="concept-def-main">${this.activeTopic.definition}</div>
          <h4 style="font-size:13px; color:#94a3b8; text-transform:uppercase; margin-bottom:10px;">Visual Examples</h4>
          <div class="concept-examples-grid">${examplesHTML}</div>
        </div>
      `;
      footer.innerHTML = `
        <button class="lesson-nav-btn" style="background:#334155;" onclick="window.classroomEngine.prevStep()">⬅ BACK</button>
        <button class="lesson-nav-btn" onclick="window.classroomEngine.nextStep()">TRY IT OUT ➔</button>
      `;
    } else if (this.currentStep === 3) {
      // Step 3: Interactive Explore / Try It
      if (stepInd) stepInd.textContent = `STEP 3 / 5 • 🔬 EXPLORE & TRY IT`;
      body.innerHTML = `
        <div class="classroom-interactive-sandbox" id="interactive-widget-mount">
          <!-- Widget mounts here -->
        </div>
      `;
      const nextBtnText = this.isPracticeMode
        ? `START PRACTICE TEST (${this.quizQuestions.length} Qs) ➔`
        : `POP QUIZ (5 Qs) ➔`;
      footer.innerHTML = `
        <button class="lesson-nav-btn" style="background:#334155;" onclick="window.classroomEngine.prevStep()">⬅ BACK</button>
        <button class="lesson-nav-btn" onclick="window.classroomEngine.nextStep()">${nextBtnText}</button>
      `;
      this.mountInteractiveWidget();
    } else if (this.currentStep === 4) {
      // Step 4: Pop Quiz or Practice Test
      if (stepInd) {
        if (this.isPracticeMode) {
          stepInd.textContent = `PRACTICE TEST • Question ${this.currentQuizIdx + 1} of ${this.quizQuestions.length} • 🛡️ Untimed Practice`;
        } else {
          stepInd.textContent = `STEP 4 / 5 • ⚡ POP QUIZ (Question ${this.currentQuizIdx + 1} of 5)`;
        }
      }
      this.renderQuizQuestion();
    } else if (this.currentStep === 5) {
      // Step 5: Results & Mastery
      if (stepInd) {
        stepInd.textContent = this.isPracticeMode ? `STEP 5 / 5 • 🏆 PRACTICE COMPLETE!` : `STEP 5 / 5 • 🏆 POWER-UP COMPLETE!`;
      }
      this.renderLessonResults();
    }
  }

  nextStep() {
    this.currentStep++;
    if (window.soundEngine) window.soundEngine.playTap();
    this.renderCurrentStep();
  }

  prevStep() {
    this.currentStep--;
    if (window.soundEngine) window.soundEngine.playTap();
    this.renderCurrentStep();
  }

  // ==========================================================================
  // INTERACTIVE WIDGET MOUNTING
  // ==========================================================================
  mountInteractiveWidget() {
    const mount = document.getElementById('interactive-widget-mount');
    if (!mount || !this.activeTopic) return;

    const type = this.activeTopic.interactiveType;

    if (type === 'interactive_clock') {
      mount.innerHTML = `
        <div class="clock-widget-wrap">
          <canvas id="clock-canvas" width="200" height="200"></canvas>
          <div class="clock-digital-readout" id="clock-digital-display">3:00</div>
          <div class="clock-control-btns">
            <button class="clock-preset-btn" onclick="window.classroomEngine.setClock(3, 0)">3:00</button>
            <button class="clock-preset-btn" onclick="window.classroomEngine.setClock(2, 15)">2:15</button>
            <button class="clock-preset-btn" onclick="window.classroomEngine.setClock(11, 30)">11:30</button>
            <button class="clock-preset-btn" onclick="window.classroomEngine.setClock(3, 45)">3:45</button>
            <button class="clock-preset-btn" onclick="window.classroomEngine.advanceClock(15)">+15 Mins</button>
          </div>
        </div>
      `;
      this.drawClock();
    } else if (type === 'array_rotator' || type === 'array_builder') {
      this.arrayRows = 3;
      this.arrayCols = 4;
      this.arrayRotated = false;
      this.renderArrayRotator();
    } else if (type === 'ecosystem_sorter') {
      this.renderEcosystemSorter();
    } else if (type === 'economics_lab') {
      this.renderEconomicsLab();
    } else if (type === 'civics_branches_sorter') {
      this.renderCivicsBranchesSorter();
    } else {
      // Default Visual Concept Card
      mount.innerHTML = `
        <div style="text-align:center; max-width:500px;">
          <div style="font-size:48px; margin-bottom:12px;">${this.activeTopic.icon}</div>
          <h3 style="color:#f8fafc; font-family:'Space Grotesk', sans-serif; margin-bottom:8px;">${this.activeTopic.title}</h3>
          <p style="color:#94a3b8; font-size:14px; line-height:1.5;">${this.activeTopic.didYouKnow}</p>
          <div style="margin-top:16px; font-weight:800; color:#38bdf8;">Ready to test your knowledge in the 5-question Pop Quiz?</div>
        </div>
      `;
    }
  }

  // --- Clock Widget Methods ---
  setClock(h, m) {
    this.clockHours = h;
    this.clockMinutes = m;
    this.drawClock();
    if (window.soundEngine) window.soundEngine.playTap();
  }

  advanceClock(mins) {
    this.clockMinutes += mins;
    while (this.clockMinutes >= 60) {
      this.clockMinutes -= 60;
      this.clockHours = (this.clockHours % 12) + 1;
    }
    this.drawClock();
    if (window.soundEngine) window.soundEngine.playTap();
  }

  drawClock() {
    const canvas = document.getElementById('clock-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const radius = canvas.width / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Clock Face
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 6, 0, 2 * Math.PI);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Hour Numbers
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 14px "Space Grotesk"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let num = 1; num <= 12; num++) {
      const ang = (num * Math.PI) / 6;
      const x = radius + Math.sin(ang) * (radius - 22);
      const y = radius - Math.cos(ang) * (radius - 22);
      ctx.fillText(num.toString(), x, y);
    }

    // Minute Hand (Blue, Long)
    const minAngle = (this.clockMinutes * Math.PI) / 30;
    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.lineTo(radius + Math.sin(minAngle) * (radius - 30), radius - Math.cos(minAngle) * (radius - 30));
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Hour Hand (Red/Gold, Short)
    const hourAngle = ((this.clockHours % 12) * Math.PI) / 6 + (this.clockMinutes * Math.PI) / 360;
    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.lineTo(radius + Math.sin(hourAngle) * (radius - 50), radius - Math.cos(hourAngle) * (radius - 50));
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Center pin
    ctx.beginPath();
    ctx.arc(radius, radius, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#fde047';
    ctx.fill();

    // Digital readout
    const dig = document.getElementById('clock-digital-display');
    if (dig) {
      const mm = String(this.clockMinutes).padStart(2, '0');
      dig.textContent = `${this.clockHours}:${mm}`;
    }
  }

  // --- Array Rotator Widget ---
  renderArrayRotator() {
    const mount = document.getElementById('interactive-widget-mount');
    if (!mount) return;

    const r = this.arrayRotated ? this.arrayCols : this.arrayRows;
    const c = this.arrayRotated ? this.arrayRows : this.arrayCols;

    let dotsHTML = '';
    for (let i = 0; i < r * c; i++) {
      dotsHTML += `<div class="array-dot"></div>`;
    }

    mount.innerHTML = `
      <div class="array-rotator-wrap">
        <div class="array-grid-display" style="grid-template-columns: repeat(${c}, 22px);">
          ${dotsHTML}
        </div>
        <div class="array-equation-readout">
          ${r} rows × ${c} columns = ${r * c} total tiles
        </div>
        <button class="array-rotate-action-btn" onclick="window.classroomEngine.toggleRotateArray()">
          🔄 ROTATE ARRAY 90° (${r}×${c} ➔ ${c}×${r})
        </button>
        <p style="font-size:12px; color:#94a3b8; max-width:400px; text-align:center;">
          Notice that rotating the array does not change the total number of tiles! ${r} × ${c} = ${c} × ${r} = ${r * c}.
        </p>
      </div>
    `;
  }

  toggleRotateArray() {
    this.arrayRotated = !this.arrayRotated;
    if (window.soundEngine) window.soundEngine.playTap();
    this.renderArrayRotator();
  }

  // --- Ecosystem Living vs Nonliving Sorter ---
  renderEcosystemSorter() {
    const mount = document.getElementById('interactive-widget-mount');
    if (!mount) return;

    mount.innerHTML = `
      <div class="sorter-widget-wrap">
        <div style="font-size:13px; color:#cbd5e1; text-align:center; font-weight:700;">
          Tap an item below to categorize it into Living (Biotic) or Nonliving (Abiotic):
        </div>
        <div class="sorter-buckets-row">
          <div class="sorter-bucket" id="bucket-living">
            <div class="sorter-bucket-title">🌿 LIVING (Biotic)</div>
          </div>
          <div class="sorter-bucket" id="bucket-nonliving">
            <div class="sorter-bucket-title">☀️ NONLIVING (Abiotic)</div>
          </div>
        </div>
        <div class="sorter-items-pool" id="sorter-pool">
          <button class="sorter-item-chip" onclick="window.classroomEngine.sortItem(this, 'living')">🐸 Frog</button>
          <button class="sorter-item-chip" onclick="window.classroomEngine.sortItem(this, 'nonliving')">☀️ Sunlight</button>
          <button class="sorter-item-chip" onclick="window.classroomEngine.sortItem(this, 'nonliving')">💧 Clean Water</button>
          <button class="sorter-item-chip" onclick="window.classroomEngine.sortItem(this, 'living')">🌳 Oak Tree</button>
          <button class="sorter-item-chip" onclick="window.classroomEngine.sortItem(this, 'nonliving')">🪨 Soil & Rocks</button>
          <button class="sorter-item-chip" onclick="window.classroomEngine.sortItem(this, 'living')">🍄 Mushroom (Fungi)</button>
        </div>
      </div>
    `;
  }

  sortItem(btn, category) {
    const bucket = document.getElementById(`bucket-${category}`);
    if (bucket && btn.parentElement) {
      btn.onclick = null;
      btn.style.cursor = 'default';
      bucket.appendChild(btn);
      if (window.soundEngine) window.soundEngine.playCorrect();
    }
  }

  // ==========================================================================
  // ECONOMICS INTERACTIVE SUITE (Match Pairs, Fill in Blanks, Jordan's Scenario)
  // ==========================================================================
  renderEconomicsLab() {
    const mount = document.getElementById('interactive-widget-mount');
    if (!mount) return;

    if (!this.econActiveTab) this.econActiveTab = 'match';
    if (this.econMatchRound === undefined) this.econMatchRound = 0;
    if (this.econBlankIdx === undefined) this.econBlankIdx = 0;
    if (this.econScenarioChoice === undefined) this.econScenarioChoice = 'cookies';
    if (this.econScenarioLossMode === undefined) this.econScenarioLossMode = false;
    if (!this.econScenarioAnswers) this.econScenarioAnswers = {};

    // 17 Vocabulary Pairs grouped into 3 rounds
    this.econMasterPairs = [
      // Round 1 (6 pairs)
      { id: 'p1', term: 'Supply 📦', def: 'The amount of a product or service that sellers are willing and able to offer.' },
      { id: 'p2', term: 'Demand 🛒', def: 'The amount of a product or service that buyers are willing and able to buy.' },
      { id: 'p3', term: 'Opportunity Cost ⚖️', def: 'The value of the next-best choice given up when a decision is made.' },
      { id: 'p4', term: 'Scarcity ⏳', def: 'The condition in which limited resources cannot satisfy all people\'s wants.' },
      { id: 'p5', term: 'Economic Interdependence 🤝', def: 'Depending on one another to get goods and services.' },
      { id: 'p6', term: 'Specialization 🎯', def: 'Focusing on a particular task or type of work.' },
      // Round 2 (6 pairs)
      { id: 'p7', term: 'Producers 🏭', def: 'People or groups that make or provide products and services.' },
      { id: 'p8', term: 'Consumers 🛍️', def: 'People or groups that buy or use goods and services.' },
      { id: 'p9', term: 'Goods 🍞', def: 'Items people can touch, own, or use.' },
      { id: 'p10', term: 'Services ✂️', def: 'Work done for someone, rather than a physical item.' },
      { id: 'p11', term: 'Needs 🍎', def: 'Important things people must have to live, such as food, water, and shelter.' },
      { id: 'p12', term: 'Wants 🎮', def: 'Things people would like to have but can live without.' },
      // Round 3 (5 pairs)
      { id: 'p13', term: 'Barter 🔄', def: 'Trading goods or services directly without using money.' },
      { id: 'p14', term: 'Profit 💵', def: 'The money left after the costs of making or selling something are paid.' },
      { id: 'p15', term: 'Loss 📉', def: 'A situation in which costs are greater than the money earned from a sale.' },
      { id: 'p16', term: 'Costs 🏷️', def: 'The time, money, or resources used to make or get something.' },
      { id: 'p17', term: 'Benefits ⭐', def: 'The good results or advantages of a choice.' }
    ];

    // 8 Worksheet Fill in the Blanks
    this.econBlanksList = [
      {
        id: 'b1',
        sentence: 'People who buy or use products are called',
        after: '.',
        answer: 'consumers',
        hint: 'Think about who buys and uses items!'
      },
      {
        id: 'b2',
        sentence: 'A bicycle and a loaf of bread are examples of',
        after: '.',
        answer: 'goods',
        hint: 'Physical items you can touch, own, or use!'
      },
      {
        id: 'b3',
        sentence: 'A haircut is one example of a',
        after: '.',
        answer: 'service',
        hint: 'Work done for someone rather than a physical item!'
      },
      {
        id: 'b4',
        sentence: 'Food, water, and shelter are examples of',
        after: '.',
        answer: 'needs',
        hint: 'Essential things people must have to live!'
      },
      {
        id: 'b5',
        sentence: 'A new video game may be something a person',
        after: 'but does not need.',
        answer: 'wants',
        hint: 'Things people would like to have, but can survive without!'
      },
      {
        id: 'b6',
        sentence: 'Trading a drawing for a book directly, without money, is called',
        after: '.',
        answer: 'barter',
        hint: 'Direct trade of goods/services without using cash!'
      },
      {
        id: 'b7',
        sentence: 'The money and materials used to make a product are its',
        after: '.',
        answer: 'costs',
        hint: 'The time, money, or resources used to make something!'
      },
      {
        id: 'b8',
        sentence: 'The helpful results of a choice are its',
        after: '.',
        answer: 'benefits',
        hint: 'The positive advantages or good results of a choice!'
      }
    ];

    mount.innerHTML = `
      <div class="econ-suite-container">
        <div class="econ-nav-tabs">
          <button class="econ-nav-pill ${this.econActiveTab === 'match' ? 'active' : ''}" onclick="window.classroomEngine.switchEconTab('match')">
            🧩 Match Definitions (17 Words)
          </button>
          <button class="econ-nav-pill ${this.econActiveTab === 'blanks' ? 'active' : ''}" onclick="window.classroomEngine.switchEconTab('blanks')">
            ✍️ Fill in the Blanks (8 Sentences)
          </button>
          <button class="econ-nav-pill ${this.econActiveTab === 'scenario' ? 'active' : ''}" onclick="window.classroomEngine.switchEconTab('scenario')">
            🍪 Jordan's Scenario & Profit Lab
          </button>
        </div>
        <div class="econ-view-panel" id="econ-panel-mount"></div>
      </div>
    `;

    this.renderEconActiveTab();
  }

  switchEconTab(tab) {
    this.econActiveTab = tab;
    if (window.soundEngine) window.soundEngine.playTap();
    this.renderEconomicsLab();
  }

  renderEconActiveTab() {
    if (this.econActiveTab === 'match') {
      this.renderEconMatch();
    } else if (this.econActiveTab === 'blanks') {
      this.renderEconBlanks();
    } else {
      this.renderEconScenario();
    }
  }

  // --- 1. Match Definitions Drill ---
  renderEconMatch() {
    const mount = document.getElementById('econ-panel-mount');
    if (!mount) return;

    // Determine round slice
    const roundRanges = [
      { start: 0, end: 6, label: 'Round 1 of 3 • Core Principles (6 Pairs)' },
      { start: 6, end: 12, label: 'Round 2 of 3 • Producers, Consumers & Goods (6 Pairs)' },
      { start: 12, end: 17, label: 'Round 3 of 3 • Money, Trade & Profit (5 Pairs)' }
    ];
    const range = roundRanges[this.econMatchRound] || roundRanges[0];
    const currentPairs = this.econMasterPairs.slice(range.start, range.end);

    // Initialize round state if needed
    if (!this.econShuffledDefs || this.econShuffledDefsRound !== this.econMatchRound) {
      this.econShuffledDefs = [...currentPairs];
      for (let i = this.econShuffledDefs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.econShuffledDefs[i], this.econShuffledDefs[j]] = [this.econShuffledDefs[j], this.econShuffledDefs[i]];
      }
      this.econShuffledDefsRound = this.econMatchRound;
      this.econMatchedInRound = new Set();
      this.selectedEconWord = null;
    }

    const isRoundDone = this.econMatchedInRound.size === currentPairs.length;
    const isAllDone = isRoundDone && this.econMatchRound === 2;

    const wordsHTML = currentPairs.map(p => {
      const isMatched = this.econMatchedInRound.has(p.id);
      const isSelected = this.selectedEconWord === p.id;
      return `
        <div class="econ-card econ-word-card ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''}" 
             onclick="window.classroomEngine.selectEconMatchWord('${p.id}')">
          <span>${p.term}</span>
          ${isMatched ? '<span>✅</span>' : ''}
        </div>
      `;
    }).join('');

    const defsHTML = this.econShuffledDefs.map(p => {
      const isMatched = this.econMatchedInRound.has(p.id);
      return `
        <div class="econ-card econ-def-card ${isMatched ? 'matched' : ''}" 
             onclick="window.classroomEngine.selectEconMatchDef('${p.id}')">
          <span>${isMatched ? '✅ ' : ''}${p.def}</span>
        </div>
      `;
    }).join('');

    let footerBanner = '';
    if (isAllDone) {
      footerBanner = `
        <div style="background:rgba(16,185,129,0.15); border:1px solid #10b981; border-radius:10px; padding:12px; text-align:center;">
          <div style="font-weight:800; color:#34d399; font-size:15px;">🏆 Outstanding! Zayn, you mastered all 17 Economics Vocabulary words!</div>
          <div style="font-size:12px; color:#cbd5e1; margin-top:4px;">You are fully ready for Friday's matching section!</div>
          <button class="lesson-nav-btn" style="margin-top:10px;" onclick="window.classroomEngine.resetEconMatch()">🔄 Play Match Again</button>
        </div>
      `;
    } else if (isRoundDone) {
      footerBanner = `
        <div style="background:rgba(56,189,248,0.15); border:1px solid #38bdf8; border-radius:10px; padding:12px; text-align:center;">
          <div style="font-weight:800; color:#38bdf8; font-size:15px;">🎉 Round Complete! All pairs matched!</div>
          <button class="lesson-nav-btn" style="margin-top:10px;" onclick="window.classroomEngine.advanceEconMatchRound()">
            NEXT ROUND (${this.econMatchRound + 2} of 3) ➔
          </button>
        </div>
      `;
    } else {
      const activeWordObj = currentPairs.find(p => p.id === this.selectedEconWord);
      footerBanner = `
        <div id="econ-match-instructions" style="text-align:center; font-size:13px; color:#94a3b8; font-weight:600;">
          ${activeWordObj ? `👉 Now tap the definition on the right that matches: <strong style="color:#60a5fa;">"${activeWordObj.term}"</strong>` : `👉 Tap a vocabulary word on the left to begin:`}
        </div>
      `;
    }

    mount.innerHTML = `
      <div class="econ-match-header">
        <span class="econ-round-badge">${range.label}</span>
        <span>Matched: <strong style="color:#34d399;">${this.econMatchedInRound.size} / ${currentPairs.length}</strong></span>
      </div>
      <div class="econ-match-grid">
        <div class="econ-match-col">${wordsHTML}</div>
        <div class="econ-match-col">${defsHTML}</div>
      </div>
      ${footerBanner}
    `;
  }

  selectEconMatchWord(wordId) {
    if (this.econMatchedInRound.has(wordId)) return;
    this.selectedEconWord = wordId;
    if (window.soundEngine) window.soundEngine.playTap();
    this.renderEconMatch();
  }

  selectEconMatchDef(defId) {
    if (this.econMatchedInRound.has(defId)) return;
    if (!this.selectedEconWord) {
      const instr = document.getElementById('econ-match-instructions');
      if (instr) instr.innerHTML = `<span style="color:#f59e0b;">⚠️ Please tap a vocabulary word on the left first!</span>`;
      if (window.soundEngine) window.soundEngine.playTap();
      return;
    }

    if (this.selectedEconWord === defId) {
      // Correct match!
      this.econMatchedInRound.add(defId);
      this.selectedEconWord = null;
      if (window.soundEngine) window.soundEngine.playCorrect();

      const rangeStart = [0, 6, 12][this.econMatchRound];
      const rangeCount = [6, 6, 5][this.econMatchRound];
      if (this.econMatchedInRound.size === rangeCount) {
        if (this.econMatchRound === 2) {
          if (window.soundEngine) window.soundEngine.playLevelUp();
          if (window.helpers) window.helpers.spawnConfetti(40);
        } else {
          if (window.soundEngine) window.soundEngine.playLevelUp();
          if (window.helpers) window.helpers.spawnConfetti(20);
        }
      }
      this.renderEconMatch();
    } else {
      // Incorrect match
      if (window.soundEngine) window.soundEngine.playTap();
      const instr = document.getElementById('econ-match-instructions');
      if (instr) {
        instr.innerHTML = `<span style="color:#ef4444;">🤔 Not quite! Read that definition carefully and try another card.</span>`;
      }
    }
  }

  advanceEconMatchRound() {
    if (this.econMatchRound < 2) {
      this.econMatchRound++;
      this.econShuffledDefs = null;
      if (window.soundEngine) window.soundEngine.playTap();
      this.renderEconMatch();
    }
  }

  resetEconMatch() {
    this.econMatchRound = 0;
    this.econShuffledDefs = null;
    this.econMatchedInRound = new Set();
    this.selectedEconWord = null;
    if (window.soundEngine) window.soundEngine.playTap();
    this.renderEconMatch();
  }

  // --- 2. Fill in the Blanks Drill ---
  renderEconBlanks() {
    const mount = document.getElementById('econ-panel-mount');
    if (!mount) return;

    const item = this.econBlanksList[this.econBlankIdx] || this.econBlanksList[0];
    const isSolved = (this.econBlankSolvedIdx === this.econBlankIdx);
    const isLast = this.econBlankIdx === this.econBlanksList.length - 1;

    // Word Bank from worksheet Section 2
    const wordBank = ['consumers', 'goods', 'service', 'needs', 'wants', 'barter', 'costs', 'benefits'];

    const wordBankHTML = wordBank.map(w => {
      const isCurrentAnswer = isSolved && (w.toLowerCase() === item.answer.toLowerCase());
      return `
        <button class="econ-word-chip ${isCurrentAnswer ? 'used' : ''}" onclick="window.classroomEngine.selectEconBlankWord('${w}')">
          ${w}
        </button>
      `;
    }).join('');

    mount.innerHTML = `
      <div class="econ-blank-card">
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px; color:#94a3b8; font-weight:700;">
          <span>WORKSHEET SECTION 2 • FILL IN THE BLANKS</span>
          <span class="econ-round-badge">Question ${this.econBlankIdx + 1} of ${this.econBlanksList.length}</span>
        </div>

        <div class="econ-sentence-display">
          ${item.sentence} 
          <span class="econ-blank-slot ${isSolved ? 'filled' : ''}">
            ${isSolved ? item.answer.toUpperCase() : '_______'}
          </span> 
          ${item.after}
        </div>

        <div style="font-size:12px; color:#94a3b8; text-transform:uppercase; font-weight:800; letter-spacing:0.5px;">
          👉 Choose the best word from the Word Bank:
        </div>

        <div class="econ-wordbank-pool">${wordBankHTML}</div>

        <div id="econ-blank-feedback" style="min-height:36px; display:flex; align-items:center; justify-content:center;">
          ${isSolved ? `
            <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap; justify-content:center;">
              <span style="color:#34d399; font-weight:800; font-size:14px;">✅ Correct! "${item.answer}" fits the sentence perfectly!</span>
              <button class="lesson-nav-btn" onclick="window.classroomEngine.advanceEconBlank()">
                ${isLast ? '🎉 FINISH BLANKS REVIEW' : 'NEXT SENTENCE ➔'}
              </button>
            </div>
          ` : `
            <span style="color:#64748b; font-size:13px;">💡 <strong>Hint:</strong> ${item.hint}</span>
          `}
        </div>
      </div>
    `;
  }

  selectEconBlankWord(word) {
    const item = this.econBlanksList[this.econBlankIdx];
    if (!item) return;

    if (word.toLowerCase() === item.answer.toLowerCase()) {
      this.econBlankSolvedIdx = this.econBlankIdx;
      if (window.soundEngine) window.soundEngine.playCorrect();
      if (this.econBlankIdx === this.econBlanksList.length - 1) {
        if (window.soundEngine) window.soundEngine.playLevelUp();
        if (window.helpers) window.helpers.spawnConfetti(35);
      }
      this.renderEconBlanks();
    } else {
      if (window.soundEngine) window.soundEngine.playTap();
      const fb = document.getElementById('econ-blank-feedback');
      if (fb) {
        fb.innerHTML = `<span style="color:#ef4444; font-weight:700; font-size:13px;">🤔 Not quite! "${word}" doesn't fit. ${item.hint}</span>`;
      }
    }
  }

  advanceEconBlank() {
    if (this.econBlankIdx < this.econBlanksList.length - 1) {
      this.econBlankIdx++;
      this.econBlankSolvedIdx = null;
    } else {
      this.econBlankIdx = 0;
      this.econBlankSolvedIdx = null;
    }
    if (window.soundEngine) window.soundEngine.playTap();
    this.renderEconBlanks();
  }

  // --- 3. Jordan's Everyday Economics Lab ---
  renderEconScenario() {
    const mount = document.getElementById('econ-panel-mount');
    if (!mount) return;

    const isCookies = this.econScenarioChoice === 'cookies';
    const isLoss = this.econScenarioLossMode;

    const sales = 15;
    const costs = isLoss ? 20 : 5;
    const net = sales - costs;

    mount.innerHTML = `
      <div class="econ-scenario-container">
        <div class="econ-scenario-story">
          📖 <strong>Worksheet Scenario (Section 3):</strong><br>
          "Jordan has one afternoon free and can either <strong>bake cookies to sell at a neighborhood table</strong> or <strong>help a neighbor walk a dog for a fee</strong>. Jordan has enough ingredients for a small batch of cookies, and the neighbor needs help. Jordan decides to bake and sell them, then uses some of the money to buy a snack."
        </div>

        <div style="font-size:12px; color:#94a3b8; font-weight:800; text-transform:uppercase;">
          👉 Tap a Choice to see what happens to Opportunity Cost & Profit:
        </div>

        <div class="econ-choice-cards">
          <div class="econ-choice-card ${isCookies ? 'active-choice' : ''}" onclick="window.classroomEngine.selectEconScenarioChoice('cookies')">
            <div style="font-size:32px; margin-bottom:6px;">🍪</div>
            <div style="font-weight:800; color:#f8fafc; font-size:14px;">Bake & Sell Cookies</div>
            <div style="font-size:12px; color:#94a3b8; margin-top:4px;">Jordan is a <strong>PRODUCER</strong> of <strong>GOODS</strong>!</div>
            ${isCookies ? '<div style="margin-top:6px; color:#34d399; font-weight:800; font-size:11px;">⭐ SELECTED CHOICE</div>' : ''}
          </div>

          <div class="econ-choice-card ${!isCookies ? 'active-choice' : ''}" onclick="window.classroomEngine.selectEconScenarioChoice('dog')">
            <div style="font-size:32px; margin-bottom:6px;">🐕</div>
            <div style="font-weight:800; color:#f8fafc; font-size:14px;">Walk Neighbor's Dog</div>
            <div style="font-size:12px; color:#94a3b8; margin-top:4px;">Providing a <strong>SERVICE</strong> for a fee!</div>
            ${!isCookies ? '<div style="margin-top:6px; color:#34d399; font-weight:800; font-size:11px;">⭐ SELECTED CHOICE</div>' : ''}
          </div>
        </div>

        <div style="background:#0f172a; border:1px solid #1e293b; border-radius:10px; padding:12px;">
          <div style="font-weight:800; color:#f59e0b; font-size:13px; margin-bottom:6px;">
            ⚖️ OPPORTUNITY COST VISUALIZER:
          </div>
          <div style="font-size:13px; color:#cbd5e1; line-height:1.5;">
            ${isCookies 
              ? 'Because Jordan chose to bake cookies, the <strong>OPPORTUNITY COST</strong> is: <span style="color:#60a5fa; font-weight:700;">Walking the neighbor\'s dog for a fee</span> (the next-best choice given up!).'
              : 'If Jordan had chosen to walk the dog, the <strong>OPPORTUNITY COST</strong> would be: <span style="color:#60a5fa; font-weight:700;">Baking and selling fresh cookies</span>.'}
          </div>
        </div>

        <!-- Profit vs Loss Calculator Bar -->
        <div class="econ-math-display">
          <div class="econ-math-item">
            <div class="econ-math-label">Sales Earned</div>
            <div class="econ-math-value" style="color:#38bdf8;">$${sales}.00</div>
          </div>
          <div style="font-size:18px; font-weight:800; color:#64748b;">-</div>
          <div class="econ-math-item">
            <div class="econ-math-label">Costs (Flour & Sugar)</div>
            <div class="econ-math-value" style="color:#f87171;">$${costs}.00</div>
          </div>
          <div style="font-size:18px; font-weight:800; color:#64748b;">=</div>
          <div class="econ-math-item">
            <div class="econ-math-label">${net >= 0 ? 'Net Profit 💵' : 'Net Loss 📉'}</div>
            <div class="econ-math-value" style="color:${net >= 0 ? '#4ade80' : '#ef4444'};">
              ${net >= 0 ? `+$${net}.00 PROFIT` : `-$${Math.abs(net)}.00 LOSS`}
            </div>
          </div>
          <button class="econ-mini-btn" style="border-color:#eab308; color:#fde047;" onclick="window.classroomEngine.toggleEconLossMode()">
            ${isLoss ? '🔄 Reset to Normal ($5 Costs)' : '⚡ Test Loss Scenario ($20 Costs)'}
          </button>
        </div>

        <!-- 3 Quick Concept Drills -->
        <div class="econ-scenario-quizzes">
          <div style="font-size:12px; color:#94a3b8; font-weight:800; text-transform:uppercase;">
            🎯 Quick Application Checkers:
          </div>

          <div class="econ-mini-quiz-card">
            <span style="font-size:12px; color:#e2e8f0; font-weight:600;">1. In baking cookies to sell, Jordan acts as a:</span>
            <div style="display:flex; gap:8px;">
              <button class="econ-mini-btn ${this.econScenarioAnswers['q1'] === 'producer' ? 'correct' : ''}" 
                      onclick="window.classroomEngine.answerEconScenarioQuiz('q1', 'producer', true)">
                Producer 🏭
              </button>
              <button class="econ-mini-btn ${this.econScenarioAnswers['q1'] === 'consumer' ? 'wrong' : ''}" 
                      onclick="window.classroomEngine.answerEconScenarioQuiz('q1', 'consumer', false)">
                Consumer 🛒
              </button>
            </div>
          </div>

          <div class="econ-mini-quiz-card">
            <span style="font-size:12px; color:#e2e8f0; font-weight:600;">2. Walking the neighbor's dog is an example of a:</span>
            <div style="display:flex; gap:8px;">
              <button class="econ-mini-btn ${this.econScenarioAnswers['q2'] === 'good' ? 'wrong' : ''}" 
                      onclick="window.classroomEngine.answerEconScenarioQuiz('q2', 'good', false)">
                Good 📦
              </button>
              <button class="econ-mini-btn ${this.econScenarioAnswers['q2'] === 'service' ? 'correct' : ''}" 
                      onclick="window.classroomEngine.answerEconScenarioQuiz('q2', 'service', true)">
                Service 🐕
              </button>
            </div>
          </div>

          <div class="econ-mini-quiz-card">
            <span style="font-size:12px; color:#e2e8f0; font-weight:600;">3. When Jordan buys a snack with cookie money, Jordan is a:</span>
            <div style="display:flex; gap:8px;">
              <button class="econ-mini-btn ${this.econScenarioAnswers['q3'] === 'producer' ? 'wrong' : ''}" 
                      onclick="window.classroomEngine.answerEconScenarioQuiz('q3', 'producer', false)">
                Producer 🏭
              </button>
              <button class="econ-mini-btn ${this.econScenarioAnswers['q3'] === 'consumer' ? 'correct' : ''}" 
                      onclick="window.classroomEngine.answerEconScenarioQuiz('q3', 'consumer', true)">
                Consumer 🛒
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  selectEconScenarioChoice(choiceKey) {
    this.econScenarioChoice = choiceKey;
    if (window.soundEngine) window.soundEngine.playTap();
    this.renderEconScenario();
  }

  toggleEconLossMode() {
    this.econScenarioLossMode = !this.econScenarioLossMode;
    if (window.soundEngine) window.soundEngine.playTap();
    this.renderEconScenario();
  }

  answerEconScenarioQuiz(key, val, isCorrect) {
    this.econScenarioAnswers[key] = val;
    if (isCorrect) {
      if (window.soundEngine) window.soundEngine.playCorrect();
      if (Object.keys(this.econScenarioAnswers).length >= 3) {
        if (window.soundEngine) window.soundEngine.playLevelUp();
        if (window.helpers) window.helpers.spawnConfetti(25);
      }
    } else {
      if (window.soundEngine) window.soundEngine.playTap();
    }
    this.renderEconScenario();
  }

  // --- Civics 3 Branches Sorter ---
  renderCivicsBranchesSorter() {
    const mount = document.getElementById('interactive-widget-mount');
    if (!mount) return;

    this.civicsSorterData = [
      { id: 'c1', text: 'Makes the Laws 📜', branch: 'legislative', branchName: 'Legislative Branch' },
      { id: 'c2', text: 'U.S. Capitol Building 🏛️', branch: 'legislative', branchName: 'Legislative Branch' },
      { id: 'c3', text: 'Senate & House of Reps 👥', branch: 'legislative', branchName: 'Legislative Branch' },
      { id: 'c4', text: 'Enforces the Laws 👮', branch: 'executive', branchName: 'Executive Branch' },
      { id: 'c5', text: 'The President 🇺🇸', branch: 'executive', branchName: 'Executive Branch' },
      { id: 'c6', text: 'The White House 🏡', branch: 'executive', branchName: 'Executive Branch' },
      { id: 'c7', text: 'Interprets the Laws ⚖️', branch: 'judicial', branchName: 'Judicial Branch' },
      { id: 'c8', text: 'The Supreme Court 🏛️', branch: 'judicial', branchName: 'Judicial Branch' },
      { id: 'c9', text: 'Federal Judges 🧑‍⚖️', branch: 'judicial', branchName: 'Judicial Branch' }
    ];
    this.selectedCivicsChip = null;
    this.civicsSortedCount = 0;

    mount.innerHTML = `
      <div class="civics-sorter-wrap">
        <div style="font-size:13px; color:#cbd5e1; text-align:center; font-weight:700;">
          🏛️ <strong>3 Branches Sorting Drill</strong>: Tap a card below, then tap the branch where it belongs!
        </div>

        <div class="civics-buckets-row">
          <div class="civics-bucket" id="bucket-legislative" onclick="window.classroomEngine.handleCivicsBucketClick('legislative')">
            <div class="civics-bucket-title" style="color:#60a5fa;">🏛️ LEGISLATIVE<br><small style="font-size:10px; color:#94a3b8; font-weight:600;">Congress • Capitol</small></div>
            <div class="civics-bucket-items" id="items-legislative"></div>
          </div>
          <div class="civics-bucket" id="bucket-executive" onclick="window.classroomEngine.handleCivicsBucketClick('executive')">
            <div class="civics-bucket-title" style="color:#f59e0b;">🦅 EXECUTIVE<br><small style="font-size:10px; color:#94a3b8; font-weight:600;">President • White House</small></div>
            <div class="civics-bucket-items" id="items-executive"></div>
          </div>
          <div class="civics-bucket" id="bucket-judicial" onclick="window.classroomEngine.handleCivicsBucketClick('judicial')">
            <div class="civics-bucket-title" style="color:#a855f7;">⚖️ JUDICIAL<br><small style="font-size:10px; color:#94a3b8; font-weight:600;">Supreme Court • Judges</small></div>
            <div class="civics-bucket-items" id="items-judicial"></div>
          </div>
        </div>

        <div style="font-size:12px; color:#94a3b8; text-align:center;" id="civics-sorter-instruction">
          👉 Tap a card below to select it:
        </div>

        <div class="civics-pool" id="civics-sorter-pool">
          ${this.civicsSorterData.map(item => `
            <button class="civics-chip" id="chip-${item.id}" onclick="window.classroomEngine.selectCivicsChip('${item.id}')">
              ${item.text}
            </button>
          `).join('')}
        </div>
        <div id="civics-sorter-congrats" style="display:none; text-align:center; font-weight:800; color:#4ade80; font-size:14px;">
          🎉 All 9 cards sorted into the 3 branches! Outstanding job, Zayn!
        </div>
      </div>
    `;
  }

  selectCivicsChip(itemId) {
    const item = this.civicsSorterData.find(d => d.id === itemId);
    if (!item) return;

    document.querySelectorAll('.civics-chip').forEach(c => c.classList.remove('selected'));
    const chipEl = document.getElementById(`chip-${itemId}`);
    if (chipEl) chipEl.classList.add('selected');
    this.selectedCivicsChip = item;

    const instr = document.getElementById('civics-sorter-instruction');
    if (instr) {
      instr.innerHTML = `Now tap the branch bucket for: <strong>"${item.text}"</strong>`;
    }
    if (window.soundEngine) window.soundEngine.playTap();
  }

  handleCivicsBucketClick(branch) {
    if (!this.selectedCivicsChip) return;
    const item = this.selectedCivicsChip;
    const isCorrect = (item.branch === branch);

    if (isCorrect) {
      const chipEl = document.getElementById(`chip-${item.id}`);
      const targetItems = document.getElementById(`items-${branch}`);
      if (chipEl && targetItems) {
        chipEl.classList.remove('selected');
        chipEl.classList.add('sorted');
        chipEl.onclick = null;
        targetItems.appendChild(chipEl);
      }
      this.selectedCivicsChip = null;
      this.civicsSortedCount++;
      if (window.soundEngine) window.soundEngine.playCorrect();

      const instr = document.getElementById('civics-sorter-instruction');
      if (instr) instr.textContent = `✅ That's right! "${item.text}" belongs to the ${item.branchName}. Pick your next card:`;

      if (this.civicsSortedCount >= this.civicsSorterData.length) {
        const congrats = document.getElementById('civics-sorter-congrats');
        if (congrats) congrats.style.display = 'block';
        if (instr) instr.style.display = 'none';
        if (window.soundEngine) window.soundEngine.playLevelUp();
        if (window.helpers) window.helpers.spawnConfetti(30);
      }
    } else {
      if (window.soundEngine) window.soundEngine.playTap();
      const instr = document.getElementById('civics-sorter-instruction');
      if (instr) {
        instr.innerHTML = `🤔 Not quite! "${item.text}" doesn't belong in ${branch.toUpperCase()}. Try one of the other 2 branches!`;
      }
    }
  }

  // ==========================================================================
  // POP QUIZ / PRACTICE TEST RUNNER
  // ==========================================================================
  renderQuizQuestion() {
    const body = document.getElementById('lesson-modal-content');
    const footer = document.getElementById('lesson-modal-footer-btns');
    const stepInd = document.getElementById('lesson-step-ind');
    if (!body || this.currentQuizIdx >= this.quizQuestions.length) return;

    if (stepInd) {
      if (this.isTimssMode) {
        stepInd.textContent = `🌍 TIMSS GRADE 4 • Question ${this.currentQuizIdx + 1} of ${this.quizQuestions.length} • 🛡️ Untimed Practice`;
      } else if (this.isPracticeMode) {
        const testName = this.activeTopic?.category === 'economics' ? '💰 ECONOMICS' : '🏛️ CIVICS';
        stepInd.textContent = `${testName} PRACTICE TEST • Question ${this.currentQuizIdx + 1} of ${this.quizQuestions.length} • 🛡️ Untimed Practice`;
      } else {
        stepInd.textContent = `STEP 4 / 5 • ⚡ POP QUIZ (Question ${this.currentQuizIdx + 1} of 5)`;
      }
    }

    const qData = this.quizQuestions[this.currentQuizIdx];

    // Dynamic Option Shuffling (so the correct answer is randomized across A, B, C, D)
    const indexedOpts = qData.options.map((opt, i) => ({ text: opt, isCorrect: i === qData.answer }));
    for (let i = indexedOpts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indexedOpts[i], indexedOpts[j]] = [indexedOpts[j], indexedOpts[i]];
    }
    this.currentShuffledQuizOpts = indexedOpts;
    this.currentCorrectQuizIdx = indexedOpts.findIndex(o => o.isCorrect);

    const optionsHTML = indexedOpts.map((optObj, i) => `
      <button class="quiz-opt-btn" id="quiz-opt-btn-${i}" onclick="window.classroomEngine.handleQuizChoice(${i})">
        <span style="opacity:0.6; font-family:'Space Grotesk'; font-weight:800;">${String.fromCharCode(65 + i)}.</span>
        <span>${optObj.text}</span>
      </button>
    `).join('');

    const hintButtonHTML = (this.isPracticeMode && qData.hint) ? `
      <div style="margin-bottom: 6px;">
        <button class="quiz-hint-btn" id="quiz-hint-toggle-btn" onclick="window.classroomEngine.toggleHint()">
          💡 Need a Hint / Memory Tip?
        </button>
        <div class="quiz-hint-box" id="quiz-hint-box" style="display:none; margin-top:8px;">
          <strong>Memory Tip:</strong> ${qData.hint}
        </div>
      </div>
    ` : '';

    const svgHTML = qData.svg ? `<div class="quiz-svg-container">${qData.svg}</div>` : '';
    const badgeHTML = qData.domain ? `
      <div class="timss-domain-badge timss-domain-${qData.domain}">
        ${qData.domLabel || qData.domain} • ${qData.cognitive || 'TIMSS G4'}
      </div>
    ` : '';

    body.innerHTML = `
      <div class="classroom-quiz-container">
        ${badgeHTML}
        <div class="quiz-question-box">${qData.q}</div>
        ${svgHTML}
        ${hintButtonHTML}
        <div class="quiz-options-grid" id="quiz-opts-grid">${optionsHTML}</div>
        <div id="quiz-feedback-mount"></div>
      </div>
    `;

    if (this.isPracticeMode) {
      footer.innerHTML = `
        <div style="font-size:12px; color:#38bdf8; font-weight:700;">
          🛡️ Practice Mode: Try as many times as you like! No penalties.
        </div>
        <button class="lesson-nav-btn" id="quiz-next-btn" style="display:none;" onclick="window.classroomEngine.advanceQuiz()">NEXT QUESTION ➔</button>
      `;
    } else {
      footer.innerHTML = `
        <div style="font-size:12px; color:#94a3b8; font-weight:700;">Score: ${this.quizScore} / 5</div>
        <button class="lesson-nav-btn" id="quiz-next-btn" style="display:none;" onclick="window.classroomEngine.advanceQuiz()">NEXT QUESTION ➔</button>
      `;
    }
  }

  toggleHint() {
    const box = document.getElementById('quiz-hint-box');
    const btn = document.getElementById('quiz-hint-toggle-btn');
    if (!box) return;
    if (box.style.display === 'none') {
      box.style.display = 'block';
      if (btn) btn.textContent = '💡 Hide Hint';
      if (window.soundEngine) window.soundEngine.playTap();
    } else {
      box.style.display = 'none';
      if (btn) btn.textContent = '💡 Need a Hint / Memory Tip?';
    }
  }

  handleQuizChoice(choiceIdx) {
    const qData = this.quizQuestions[this.currentQuizIdx];
    const isCorrect = (choiceIdx === this.currentCorrectQuizIdx);
    const feedbackMount = document.getElementById('quiz-feedback-mount');
    const nextBtn = document.getElementById('quiz-next-btn');

    if (this.isPracticeMode) {
      const clickedBtn = document.getElementById(`quiz-opt-btn-${choiceIdx}`);
      if (isCorrect) {
        const opts = document.querySelectorAll('.quiz-opt-btn');
        opts.forEach(b => b.disabled = true);
        if (clickedBtn) clickedBtn.classList.add('correct');
        if (window.soundEngine) window.soundEngine.playCorrect();

        if (feedbackMount) {
          feedbackMount.innerHTML = `
            <div class="quiz-explanation-banner" style="border-left-color: #22c55e;">
              🌟 <strong>Spot on!</strong> ${qData.explanation}
              ${qData.hint ? `<div style="margin-top:6px; color:#cbd5e1; font-size:12px;">💡 <em>Remember: ${qData.hint}</em></div>` : ''}
            </div>
          `;
        }
        if (nextBtn) nextBtn.style.display = 'block';
      } else {
        if (clickedBtn) {
          clickedBtn.classList.add('retry');
          clickedBtn.disabled = true;
        }
        if (window.soundEngine) window.soundEngine.playTap();

        if (feedbackMount) {
          feedbackMount.innerHTML = `
            <div class="quiz-explanation-banner" style="border-left-color: #f59e0b; background:#1c1917;">
              🤔 <strong>Not quite!</strong> That's okay, give another option a try — you've got this!
              ${qData.hint ? `<div style="margin-top:4px; color:#fef3c7; font-size:12px;">💡 <strong>Hint:</strong> ${qData.hint}</div>` : ''}
            </div>
          `;
        }
      }
    } else {
      const opts = document.querySelectorAll('.quiz-opt-btn');
      opts.forEach(b => b.disabled = true);

      if (isCorrect) {
        this.quizScore++;
        opts[choiceIdx].classList.add('correct');
        if (window.soundEngine) window.soundEngine.playCorrect();
      } else {
        opts[choiceIdx].classList.add('wrong');
        opts[this.currentCorrectQuizIdx].classList.add('correct');
        this.quizMistakes.push({ q: qData.q, correct: this.currentShuffledQuizOpts[this.currentCorrectQuizIdx].text });
        if (window.soundEngine) window.soundEngine.playWrong();
      }

      if (feedbackMount) {
        feedbackMount.innerHTML = `
          <div class="quiz-explanation-banner">
            ${isCorrect ? '✅ <strong>Correct!</strong> ' : '💡 <strong>Explanation:</strong> '}
            ${qData.explanation}
          </div>
        `;
      }

      if (nextBtn) nextBtn.style.display = 'block';
    }
  }

  advanceQuiz() {
    this.currentQuizIdx++;
    if (this.currentQuizIdx < this.quizQuestions.length) {
      this.renderQuizQuestion();
    } else {
      this.currentStep = 5;
      this.renderLessonResults();
    }
  }

  // ==========================================================================
  // RESULTS & MASTERY UPDATE
  // ==========================================================================
  renderLessonResults() {
    const body = document.getElementById('lesson-modal-content');
    const footer = document.getElementById('lesson-modal-footer-btns');
    const stepInd = document.getElementById('lesson-step-ind');
    if (!body || !this.activeTopic) return;

    // TIMSS Grade 4 Daily Practice Completion
    if (this.isTimssMode) {
      if (stepInd) stepInd.textContent = `STEP 5 / 5 • 🏆 TIMSS PRACTICE COMPLETE!`;

      const xpEarned = 120;
      window.gameState.addXP(xpEarned);
      window.gameState.addAura(60);
      if (window.gameState.addGems) window.gameState.addGems(25);

      if (!window.gameState.data.classroomProgress) {
        window.gameState.data.classroomProgress = { concepts: {} };
      }
      const d = new Date();
      const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      if (!window.gameState.data.classroomProgress.timssDaily) {
        window.gameState.data.classroomProgress.timssDaily = [];
      }
      window.gameState.data.classroomProgress.timssDaily.push({
        date: today,
        domain: this.timssDomain || 'all',
        total: this.quizQuestions.length,
        timestamp: Date.now()
      });
      window.gameState.save();

      if (window.soundEngine) window.soundEngine.playLevelUp();
      if (window.helpers) window.helpers.spawnConfetti(70);

      const domainTitle = this.timssDomain
        ? (window.TIMSS_CURRICULUM?.domains?.[this.timssDomain]?.name || 'Grade 4 Math')
        : 'All Grade 4 Math Domains';

      body.innerHTML = `
        <div style="text-align:center; padding:10px 0;">
          <div style="font-size:52px; margin-bottom:10px;">🌍 ⭐ 📐</div>
          <h2 style="font-size:24px; font-weight:900; font-family:'Space Grotesk', sans-serif; color:#f8fafc; margin-bottom:6px;">
            TIMSS Daily Practice Complete!
          </h2>
          <p style="color:#94a3b8; font-size:14px; margin-bottom:20px;">
            Outstanding work, Zayn! You completed <strong>${this.quizQuestions.length} Grade 4 International Math questions</strong> in <strong>${domainTitle}</strong> with untimed mastery!
          </p>

          <div style="display:flex; justify-content:center; gap:16px; margin-bottom:24px; flex-wrap:wrap;">
            <div style="background:#131d38; border:1px solid #1e293b; border-radius:12px; padding:12px 24px;">
              <div style="font-size:22px; font-weight:800; color:#38bdf8;">${this.quizQuestions.length} / ${this.quizQuestions.length}</div>
              <div style="font-size:11px; color:#94a3b8; font-weight:700; text-transform:uppercase;">Questions Solved</div>
            </div>
            <div style="background:#131d38; border:1px solid #1e293b; border-radius:12px; padding:12px 24px;">
              <div style="font-size:22px; font-weight:800; color:#fde047;">+${xpEarned} XP</div>
              <div style="font-size:11px; color:#94a3b8; font-weight:700; text-transform:uppercase;">XP Earned</div>
            </div>
            <div style="background:#131d38; border:1px solid #1e293b; border-radius:12px; padding:12px 24px;">
              <div style="font-size:22px; font-weight:800; color:#a855f7;">+60 🔮</div>
              <div style="font-size:11px; color:#94a3b8; font-weight:700; text-transform:uppercase;">Aura Bonus</div>
            </div>
            <div style="background:#131d38; border:1px solid #1e293b; border-radius:12px; padding:12px 24px;">
              <div style="font-size:22px; font-weight:800; color:#34d399;">+25 💎</div>
              <div style="font-size:11px; color:#94a3b8; font-weight:700; text-transform:uppercase;">Gems Earned</div>
            </div>
          </div>

          <div style="background:#0f172a; border:1px solid #334155; border-radius:14px; padding:16px; text-align:left; margin-bottom:16px;">
            <div style="font-size:13px; font-weight:800; color:#38bdf8; text-transform:uppercase; margin-bottom:6px;">
              💡 Daily Practice Habit
            </div>
            <p style="font-size:13px; color:#cbd5e1; line-height:1.5; margin:0;">
              Every session pulls fresh random questions from the 75-question Grade 4 pool. Come back tomorrow for another quick 5-minute set to keep your geometry and reasoning skills super sharp!
            </p>
          </div>
        </div>
      `;

      const domainArg = this.timssDomain ? `'${this.timssDomain}'` : '';
      footer.innerHTML = `
        <button class="lesson-nav-btn" style="background:#334155;" onclick="window.classroomEngine.launchTimssDailyPractice(${domainArg})">🔄 10 NEW QUESTIONS</button>
        <button class="lesson-nav-btn" onclick="window.classroomEngine.closeLesson()">RETURN TO HUB ➔</button>
      `;
      return;
    }

    if (stepInd) {
      stepInd.textContent = this.isPracticeMode
        ? `STEP 5 / 5 • 🏆 PRACTICE COMPLETE!`
        : `STEP 5 / 5 • 🏆 POWER-UP COMPLETE!`;
    }

    if (this.isPracticeMode) {
      // Unscored practice test celebration & memory table
      const xpEarned = 100;
      window.gameState.addXP(xpEarned);
      window.gameState.addAura(50);

      if (!window.gameState.data.classroomProgress) {
        window.gameState.data.classroomProgress = { concepts: {} };
      }
      const concepts = window.gameState.data.classroomProgress.concepts;
      const current = concepts[this.activeTopic.id] || { state: 'NEW', sessions: [] };
      const d = new Date();
      const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      current.sessions.push({ date: today, score: 15, acc: 100, mode: 'practice' });
      current.lastPracticed = today;
      current.state = 'PRACTICED';
      if (this.activeTopic.achievementId && window.gameState.unlockAchievement) {
        window.gameState.unlockAchievement(this.activeTopic.achievementId);
      }
      concepts[this.activeTopic.id] = current;
      window.gameState.save();

      if (window.soundEngine) window.soundEngine.playLevelUp();
      if (window.helpers) window.helpers.spawnConfetti(60);

      body.innerHTML = `
        <div style="text-align:center; padding:10px 0;">
          <div style="font-size:52px; margin-bottom:10px;">🏛️ ⭐ 🇺🇸</div>
          <h2 style="font-size:24px; font-weight:900; font-family:'Space Grotesk', sans-serif; color:#f8fafc; margin-bottom:6px;">
            Practice Test Completed!
          </h2>
          <p style="color:#94a3b8; font-size:14px; margin-bottom:20px;">
            Awesome job, Zayn! You completed all 15 review questions from your school slides with <strong>zero grading pressure</strong>. You're building great muscle memory for Friday!
          </p>

          <div style="display:flex; justify-content:center; gap:16px; margin-bottom:24px;">
            <div style="background:#131d38; border:1px solid #1e293b; border-radius:12px; padding:12px 24px;">
              <div style="font-size:22px; font-weight:800; color:#38bdf8;">15 / 15</div>
              <div style="font-size:11px; color:#94a3b8; font-weight:700; text-transform:uppercase;">Questions Practiced</div>
            </div>
            <div style="background:#131d38; border:1px solid #1e293b; border-radius:12px; padding:12px 24px;">
              <div style="font-size:22px; font-weight:800; color:#fde047;">+${xpEarned} XP</div>
              <div style="font-size:11px; color:#94a3b8; font-weight:700; text-transform:uppercase;">XP Earned</div>
            </div>
            <div style="background:#131d38; border:1px solid #1e293b; border-radius:12px; padding:12px 24px;">
              <div style="font-size:22px; font-weight:800; color:#a855f7;">+50 🔮</div>
              <div style="font-size:11px; color:#94a3b8; font-weight:700; text-transform:uppercase;">Aura Bonus</div>
            </div>
          </div>

          <!-- 60-Second Civics Study Table -->
          <div style="background:#0f172a; border:1px solid #334155; border-radius:14px; padding:18px; text-align:left; margin-bottom:16px;">
            <div style="font-size:13px; font-weight:800; color:#fde047; text-transform:uppercase; margin-bottom:12px; display:flex; align-items:center; gap:6px;">
              <span>🧠</span> ZAYN'S 60-SECOND CIVICS TEST CHEAT SHEET
            </div>

            <div style="overflow-x:auto;">
              <table style="width:100%; border-collapse:collapse; font-size:12px; color:#e2e8f0; margin-bottom:14px;">
                <thead>
                  <tr style="border-bottom:1px solid #334155; text-align:left; color:#94a3b8;">
                    <th style="padding:6px 8px;">Branch</th>
                    <th style="padding:6px 8px;">Who / Building</th>
                    <th style="padding:6px 8px;">Main Job</th>
                    <th style="padding:6px 8px;">Memory Hook</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom:1px solid #1e293b;">
                    <td style="padding:8px; font-weight:700; color:#60a5fa;">🏛️ Legislative</td>
                    <td style="padding:8px;">Congress (Capitol)</td>
                    <td style="padding:8px;">Makes the Laws</td>
                    <td style="padding:8px; color:#fde047;"><strong>L</strong>egislative = <strong>L</strong>aws</td>
                  </tr>
                  <tr style="border-bottom:1px solid #1e293b;">
                    <td style="padding:8px; font-weight:700; color:#f59e0b;">🦅 Executive</td>
                    <td style="padding:8px;">President (White House)</td>
                    <td style="padding:8px;">Enforces the Laws</td>
                    <td style="padding:8px; color:#fde047;"><strong>E</strong>xecutive = <strong>E</strong>nforces</td>
                  </tr>
                  <tr>
                    <td style="padding:8px; font-weight:700; color:#c084fc;">⚖️ Judicial</td>
                    <td style="padding:8px;">Judges (Supreme Court)</td>
                    <td style="padding:8px;">Interprets the Laws</td>
                    <td style="padding:8px; color:#fde047;"><strong>J</strong>udicial = <strong>J</strong>udges</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px; font-size:12px; color:#cbd5e1; border-top:1px solid #1e293b; padding-top:12px;">
              <div><strong>🌴 3 Levels Ladder:</strong> Local (Mayor) ➔ State (Governor) ➔ National (President)</div>
              <div><strong>🗳️ Our Government:</strong> A <em>Democracy</em> where citizens pick leaders by <em>Voting</em></div>
              <div><strong>🏛️ Congress Split:</strong> Senate & House of Representatives</div>
              <div><strong>🇺🇸 President Titles:</strong> Head of State & Commander in Chief (VP succeeds)</div>
            </div>
          </div>
        </div>
      `;

      footer.innerHTML = `
        <button class="lesson-nav-btn" style="background:#334155;" onclick="window.classroomEngine.startLesson(window.classroomEngine.activeTopic)">RETRY PRACTICE TEST 🔄</button>
        <button class="lesson-nav-btn" onclick="window.classroomEngine.closeLesson()">RETURN TO CLASSROOM HUB ➔</button>
      `;
      return;
    }

    // Standard scored lesson results
    const acc = Math.round((this.quizScore / 5) * 100);
    const xpEarned = 50 + (this.quizScore * 10);
    window.gameState.addXP(xpEarned);
    window.gameState.addAura(30);

    // Update Classroom Progress
    if (!window.gameState.data.classroomProgress) {
      window.gameState.data.classroomProgress = { concepts: {} };
    }
    const concepts = window.gameState.data.classroomProgress.concepts;
    const current = concepts[this.activeTopic.id] || { state: 'NEW', sessions: [] };
    
    const d = new Date();
    const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    
    current.sessions.push({ date: today, score: this.quizScore, acc });
    current.lastPracticed = today;
    
    const uniqueDays = new Set(current.sessions.filter(s => s.acc >= 80).map(s => s.date));
    
    if (uniqueDays.size >= 2) {
      current.state = 'MASTERED';
      if (this.activeTopic.achievementId && window.gameState.unlockAchievement) {
        window.gameState.unlockAchievement(this.activeTopic.achievementId);
      }
    } else if (acc >= 80) {
      current.state = 'STRONG';
    } else if (acc >= 60) {
      current.state = 'PRACTICING';
    } else {
      current.state = 'LEARNING';
    }

    concepts[this.activeTopic.id] = current;
    window.gameState.save();

    if (window.soundEngine) window.soundEngine.playLevelUp();
    if (window.helpers) window.helpers.spawnConfetti(50);

    body.innerHTML = `
      <div style="text-align:center; padding:10px 0;">
        <div style="font-size:52px; margin-bottom:12px;">🎉</div>
        <h2 style="font-size:24px; font-weight:900; font-family:'Space Grotesk', sans-serif; color:#f8fafc; margin-bottom:6px;">
          Science Power-Up Complete!
        </h2>
        <p style="color:#94a3b8; font-size:14px; margin-bottom:20px;">
          You reinforced <strong>${this.activeTopic.title}</strong>!
        </p>

        <div style="display:flex; justify-content:center; gap:16px; margin-bottom:24px;">
          <div style="background:#131d38; border:1px solid #1e293b; border-radius:12px; padding:12px 24px;">
            <div style="font-size:22px; font-weight:800; color:#38bdf8;">${acc}%</div>
            <div style="font-size:11px; color:#94a3b8; font-weight:700; text-transform:uppercase;">Accuracy</div>
          </div>
          <div style="background:#131d38; border:1px solid #1e293b; border-radius:12px; padding:12px 24px;">
            <div style="font-size:22px; font-weight:800; color:#fde047;">+${xpEarned} XP</div>
            <div style="font-size:11px; color:#94a3b8; font-weight:700; text-transform:uppercase;">XP Earned</div>
          </div>
          <div style="background:#131d38; border:1px solid #1e293b; border-radius:12px; padding:12px 24px;">
            <div style="font-size:22px; font-weight:800; color:#86efac;">${current.state}</div>
            <div style="font-size:11px; color:#94a3b8; font-weight:700; text-transform:uppercase;">Status</div>
          </div>
        </div>

        ${this.activeTopic.goDeeper ? `
          <div style="background:#1e1b4b; border:1px solid #4338ca; border-radius:12px; padding:16px; text-align:left;">
            <div style="font-size:12px; font-weight:800; color:#fde047; text-transform:uppercase; margin-bottom:4px;">🧠 GO DEEPER</div>
            <div style="font-size:13px; color:#e0e7ff; line-height:1.4;">${this.activeTopic.goDeeper}</div>
          </div>
        ` : ''}
      </div>
    `;

    footer.innerHTML = `
      <div></div>
      <button class="lesson-nav-btn" onclick="window.classroomEngine.closeLesson()">RETURN TO CLASSROOM HUB ➔</button>
    `;
  }

  // ==========================================================================
  // TIMSS GRADE 4 INTERACTIVE MCQ ENGINE (RANDOM ORDER & DAILY PRACTICE)
  // ==========================================================================
  launchTimssDailyPractice(domain = null) {
    if (!window.TIMSS_CURRICULUM || !window.TIMSS_CURRICULUM.questions) {
      console.warn('TIMSS_CURRICULUM not loaded');
      return;
    }

    let pool = [...window.TIMSS_CURRICULUM.questions];
    if (domain) {
      pool = pool.filter(q => q.domain === domain);
    }

    // Fisher-Yates shuffle questions for randomized daily practice
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    // Pick 10 questions (or all if pool has fewer)
    const count = Math.min(10, pool.length);
    const selected = pool.slice(0, count);

    this.isPracticeMode = true;
    this.isTimssMode = true;
    this.timssDomain = domain;
    this.activeTopic = {
      id: domain ? `timss_${domain}` : 'timss_daily',
      title: domain ? `TIMSS Math: ${window.TIMSS_CURRICULUM.domains[domain]?.name || 'Domain Practice'}` : "TIMSS Grade 4 Daily Practice",
      tag: "IEA TIMSS 2027 INTERNATIONAL BENCHMARK",
      icon: domain ? (window.TIMSS_CURRICULUM.domains[domain]?.icon || '🌍') : "🎯",
      questions: selected,
      estimatedMins: 5
    };
    this.quizQuestions = selected;
    this.currentQuizIdx = 0;
    this.quizScore = 0;
    this.quizMistakes = [];
    this.currentStep = 4; // Jump directly to interactive quiz

    const modal = document.getElementById('classroom-lesson-modal');
    if (modal) modal.classList.remove('hidden');

    if (window.soundEngine) window.soundEngine.playTap();
    this.renderCurrentStep();
  }

  // ==========================================================================
  // QUICK TOOLS: DAILY SCHOOL WORD & QUICK SCHOOL QUIZ
  // ==========================================================================
  launchDailySchoolWord() {
    const dayIdx = new Date().getDate() % DAILY_SCHOOL_WORDS.length;
    const w = DAILY_SCHOOL_WORDS[dayIdx];

    const modal = document.getElementById('classroom-lesson-modal');
    const body = document.getElementById('lesson-modal-content');
    const stepInd = document.getElementById('lesson-step-ind');
    const footer = document.getElementById('lesson-modal-footer-btns');
    if (!modal || !body) return;

    modal.classList.remove('hidden');
    if (stepInd) stepInd.textContent = `📚 TODAY'S SCHOOL WORD`;

    body.innerHTML = `
      <div style="text-align:center; padding:10px 0; font-family:'Space Grotesk', -apple-system, sans-serif;">
        <span style="font-size:11px; font-weight:700; color:#a5b4fc; letter-spacing:1px; text-transform:uppercase;">${w.category} VOCABULARY</span>
        <h2 style="font-size:32px; font-weight:800; font-family:'Space Grotesk', sans-serif; color:#fde047; margin:8px 0; letter-spacing:-0.5px;">${w.term}</h2>
        <div style="background:#131d38; border:1px solid #1e293b; border-radius:14px; padding:22px; text-align:left; margin-bottom:16px;">
          <div style="font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:6px;">Definition</div>
          <div style="font-size:17px; font-weight:500; color:#ffffff; margin-bottom:16px; line-height:1.55; letter-spacing:-0.1px;">${w.definition}</div>
          <div style="font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:6px;">Example in Action</div>
          <div style="font-size:14px; font-weight:400; color:#cbd5e1; line-height:1.5;">${w.example}</div>
        </div>
      </div>
    `;

    footer.innerHTML = `
      <div></div>
      <button class="lesson-nav-btn" onclick="window.classroomEngine.claimDailyWordReward()">CLAIM +25 XP & PRACTICE ➔</button>
    `;
  }

  claimDailyWordReward() {
    window.gameState.addXP(25);
    if (window.helpers) window.helpers.spawnAuraFloatingText("+25 XP 📚", undefined, undefined, true);
    this.closeLesson();
  }

  launchQuickSchoolQuiz() {
    // Generate 10 mixed questions from all topics
    const allQs = [];
    CLASSROOM_CURRICULUM.science.forEach(t => allQs.push(...t.questions));
    CLASSROOM_CURRICULUM.math.forEach(t => allQs.push(...t.questions));
    allQs.sort(() => Math.random() - 0.5);

    this.activeTopic = {
      title: "Quick School Quiz",
      tag: "10-QUESTION MIXED REVIEW",
      icon: "⚡",
      questions: allQs.slice(0, 10),
      estimatedMins: 4
    };

    this.startLesson(this.activeTopic);
    this.currentStep = 4; // Jump directly to quiz
    this.quizQuestions = allQs.slice(0, 10);
    this.renderCurrentStep();
  }

  launchDidYouKnowFeed() {
    const facts = [];
    CLASSROOM_CURRICULUM.science.forEach(t => facts.push({ icon: t.icon, title: t.title, text: t.didYouKnow }));
    CLASSROOM_CURRICULUM.math.forEach(t => facts.push({ icon: t.icon, title: t.title, text: t.didYouKnow }));
    facts.sort(() => Math.random() - 0.5);

    const factHTML = facts.slice(0, 4).map(f => `
      <div class="did-you-know-card" style="margin-bottom:12px;">
        <div class="did-you-know-icon">${f.icon}</div>
        <div class="did-you-know-text">
          <strong style="color:#fde047; font-family:'Space Grotesk';">${f.title}</strong>
          <p style="margin-top:4px;">${f.text}</p>
        </div>
      </div>
    `).join('');

    const modal = document.getElementById('classroom-lesson-modal');
    const body = document.getElementById('lesson-modal-content');
    const stepInd = document.getElementById('lesson-step-ind');
    const footer = document.getElementById('lesson-modal-footer-btns');
    if (!modal || !body) return;

    modal.classList.remove('hidden');
    if (stepInd) stepInd.textContent = `💡 DID YOU KNOW FEED`;

    body.innerHTML = `
      <div>
        <h3 style="font-size:20px; font-weight:800; font-family:'Space Grotesk', sans-serif; color:#f8fafc; margin-bottom:16px;">
          Curiosity & Science Fact Stream
        </h3>
        ${factHTML}
      </div>
    `;

    footer.innerHTML = `
      <div></div>
      <button class="lesson-nav-btn" onclick="window.classroomEngine.closeLesson()">DONE ➔</button>
    `;
  }
}

window.ClassroomEngine = ClassroomEngine;
