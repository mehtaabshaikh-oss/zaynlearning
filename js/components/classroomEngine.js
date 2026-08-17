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

    // Quick Tools: Daily Word & Quick Quiz
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
    
    // Pick 5 randomized questions
    const allQs = [...topic.questions];
    allQs.sort(() => Math.random() - 0.5);
    this.quizQuestions = allQs.slice(0, 5);
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
      footer.innerHTML = `
        <button class="lesson-nav-btn" style="background:#334155;" onclick="window.classroomEngine.prevStep()">⬅ BACK</button>
        <button class="lesson-nav-btn" onclick="window.classroomEngine.nextStep()">POP QUIZ (5 Qs) ➔</button>
      `;
      this.mountInteractiveWidget();
    } else if (this.currentStep === 4) {
      // Step 4: Pop Quiz
      if (stepInd) stepInd.textContent = `STEP 4 / 5 • ⚡ POP QUIZ (Question ${this.currentQuizIdx + 1} of 5)`;
      this.renderQuizQuestion();
    } else if (this.currentStep === 5) {
      // Step 5: Results & Mastery
      if (stepInd) stepInd.textContent = `STEP 5 / 5 • 🏆 POWER-UP COMPLETE!`;
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
  // POP QUIZ RUNNER
  // ==========================================================================
  renderQuizQuestion() {
    const body = document.getElementById('lesson-modal-content');
    const footer = document.getElementById('lesson-modal-footer-btns');
    if (!body || this.currentQuizIdx >= this.quizQuestions.length) return;

    const qData = this.quizQuestions[this.currentQuizIdx];

    const optionsHTML = qData.options.map((opt, i) => `
      <button class="quiz-opt-btn" onclick="window.classroomEngine.handleQuizChoice(${i})">
        <span style="opacity:0.6; font-family:'Space Grotesk'; font-weight:800;">${String.fromCharCode(65 + i)}.</span>
        <span>${opt}</span>
      </button>
    `).join('');

    body.innerHTML = `
      <div class="classroom-quiz-container">
        <div class="quiz-question-box">${qData.q}</div>
        <div class="quiz-options-grid" id="quiz-opts-grid">${optionsHTML}</div>
        <div id="quiz-feedback-mount"></div>
      </div>
    `;

    footer.innerHTML = `
      <div style="font-size:12px; color:#94a3b8; font-weight:700;">Score: ${this.quizScore} / 5</div>
      <button class="lesson-nav-btn" id="quiz-next-btn" style="display:none;" onclick="window.classroomEngine.advanceQuiz()">NEXT QUESTION ➔</button>
    `;
  }

  handleQuizChoice(choiceIdx) {
    const qData = this.quizQuestions[this.currentQuizIdx];
    const opts = document.querySelectorAll('.quiz-opt-btn');
    opts.forEach(b => b.disabled = true);

    const isCorrect = (choiceIdx === qData.answer);
    if (isCorrect) {
      this.quizScore++;
      opts[choiceIdx].classList.add('correct');
      if (window.soundEngine) window.soundEngine.playCorrect();
    } else {
      opts[choiceIdx].classList.add('wrong');
      opts[qData.answer].classList.add('correct');
      this.quizMistakes.push({ q: qData.q, correct: qData.options[qData.answer] });
      if (window.soundEngine) window.soundEngine.playWrong();
    }

    const feedbackMount = document.getElementById('quiz-feedback-mount');
    if (feedbackMount) {
      feedbackMount.innerHTML = `
        <div class="quiz-explanation-banner">
          ${isCorrect ? '✅ <strong>Correct!</strong> ' : '💡 <strong>Explanation:</strong> '}
          ${qData.explanation}
        </div>
      `;
    }

    const nextBtn = document.getElementById('quiz-next-btn');
    if (nextBtn) nextBtn.style.display = 'block';
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
    if (!body || !this.activeTopic) return;

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
    
    // Multi-session Mastery progression logic:
    // 1 session high score -> PRACTICING / STRONG
    // 2 sessions on different days with >= 80% -> MASTERED!
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
      <div style="text-align:center; padding:10px 0;">
        <span style="font-size:11px; font-weight:800; color:#a5b4fc; letter-spacing:1px; text-transform:uppercase;">${w.category} VOCABULARY</span>
        <h2 style="font-size:32px; font-weight:900; font-family:'Space Grotesk', sans-serif; color:#fde047; margin:8px 0;">${w.term}</h2>
        <div style="background:#131d38; border:1px solid #1e293b; border-radius:14px; padding:20px; text-align:left; margin-bottom:16px;">
          <div style="font-size:12px; font-weight:800; color:#94a3b8; text-transform:uppercase; margin-bottom:4px;">Definition</div>
          <div style="font-size:16px; font-weight:700; color:#f8fafc; margin-bottom:12px; line-height:1.4;">${w.definition}</div>
          <div style="font-size:12px; font-weight:800; color:#94a3b8; text-transform:uppercase; margin-bottom:4px;">Example in Action</div>
          <div style="font-size:14px; color:#cbd5e1; line-height:1.4;">${w.example}</div>
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
