/**
 * LogicBankAdminModal - Parent & Admin Question Bank Inspector
 * Allows filtering by tier/category, live search, live SVG preview, accuracy metrics, and enable/disable toggling.
 */

class LogicBankAdminModal {
  constructor() {
    this.modalEl = null;
    this.currentTierFilter = 'ALL';
    this.currentCategoryFilter = 'ALL';
    this.searchQuery = '';
    this.selectedQuestion = null;

    this.initDOM();
  }

  initDOM() {
    if (document.getElementById('logic-bank-admin-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'logic-bank-admin-modal';
    modal.className = 'modal-overlay hidden';
    modal.innerHTML = `
      <div class="logic-admin-card">
        <!-- Header -->
        <div class="logic-admin-header">
          <div class="admin-title-wrap">
            <span class="admin-badge">PARENT PORTAL</span>
            <h2>🧠 1% Club Question Bank Inspector</h2>
          </div>
          <button id="close-logic-admin-btn" class="modal-close-pill">✕</button>
        </div>

        <!-- Filter Controls Bar -->
        <div class="logic-admin-filters">
          <div class="filter-group">
            <label>Tier:</label>
            <select id="admin-tier-select" class="admin-select">
              <option value="ALL">All Tiers (11 Tiers)</option>
              <option value="90%">90% Tier</option>
              <option value="80%">80% Tier</option>
              <option value="70%">70% Tier</option>
              <option value="60%">60% Tier</option>
              <option value="50%">50% Tier</option>
              <option value="40%">40% Tier</option>
              <option value="30%">30% Tier</option>
              <option value="20%">20% Tier</option>
              <option value="10%">10% Tier</option>
              <option value="5%">5% Tier</option>
              <option value="1%">1% Tier</option>
            </select>
          </div>

          <div class="filter-group">
            <label>Category:</label>
            <select id="admin-cat-select" class="admin-select">
              <option value="ALL">All Categories</option>
              <option value="NUMBER_PATTERN">Number Patterns (30%)</option>
              <option value="VISUAL_PATTERN">Visual Patterns (20%)</option>
              <option value="SPATIAL_REASONING">Spatial & Rotations (10%)</option>
              <option value="STATES_GEOGRAPHY">US States & Geography (10%)</option>
              <option value="CODE_BREAKING">Code & Ciphers (10%)</option>
              <option value="DEDUCTION">Deduction & Ordering (10%)</option>
              <option value="LATERAL_THINKING">Lateral & Puzzles (5%)</option>
              <option value="MATH_LOGIC">Math Logic</option>
              <option value="ODD_ONE_OUT">Odd One Out</option>
            </select>
          </div>

          <div class="filter-group search-group">
            <input type="text" id="admin-search-input" class="admin-search" placeholder="🔍 Search question or ID...">
          </div>
        </div>

        <!-- Main 2-Column Split: Question List & Live Preview -->
        <div class="logic-admin-split">
          <!-- Question List Table -->
          <div class="logic-admin-list-pane">
            <div class="list-summary-bar" id="admin-list-summary">Showing 725 Questions</div>
            <div class="admin-questions-list" id="admin-questions-scroll"></div>
          </div>

          <!-- Live Preview Pane -->
          <div class="logic-admin-preview-pane" id="admin-preview-pane">
            <div class="preview-empty">Select any question to inspect live preview, SVG visuals, and accuracy stats.</div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.modalEl = modal;

    this.bindEvents();
  }

  bindEvents() {
    document.getElementById('close-logic-admin-btn').addEventListener('click', () => this.close());

    document.getElementById('admin-tier-select').addEventListener('change', (e) => {
      this.currentTierFilter = e.target.value;
      this.renderList();
    });

    document.getElementById('admin-cat-select').addEventListener('change', (e) => {
      this.currentCategoryFilter = e.target.value;
      this.renderList();
    });

    document.getElementById('admin-search-input').addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.renderList();
    });
  }

  open() {
    this.modalEl.classList.remove('hidden');
    this.renderList();
  }

  close() {
    this.modalEl.classList.add('hidden');
  }

  getFilteredQuestions() {
    const bank = window.LogicClubData?.masterBank || [];
    return bank.filter(q => {
      if (this.currentTierFilter !== 'ALL' && q.tier !== this.currentTierFilter) return false;
      if (this.currentCategoryFilter !== 'ALL' && q.category !== this.currentCategoryFilter) return false;
      if (this.searchQuery) {
        const text = (q.question + ' ' + q.id + ' ' + (q.explanation || '')).toLowerCase();
        if (!text.includes(this.searchQuery)) return false;
      }
      return true;
    });
  }

  renderList() {
    const list = this.getFilteredQuestions();
    const scrollEl = document.getElementById('admin-questions-scroll');
    const summaryEl = document.getElementById('admin-list-summary');

    summaryEl.textContent = `Showing ${list.length} Question${list.length !== 1 ? 's' : ''}`;
    scrollEl.innerHTML = '';

    const history = window.logicClub?.history?.seenQuestionIds || {};

    list.slice(0, 100).forEach(q => {
      const stats = history[q.id] || { timesShown: 0, timesCorrect: 0 };
      const acc = stats.timesShown > 0 ? Math.round((stats.timesCorrect / stats.timesShown) * 100) : '--';

      const item = document.createElement('div');
      item.className = `admin-q-item ${this.selectedQuestion?.id === q.id ? 'active' : ''}`;
      item.innerHTML = `
        <div class="q-item-top">
          <span class="q-tier-tag">${q.tier}</span>
          <span class="q-cat-tag">${q.category}</span>
          <span class="q-acc-stat">Acc: ${acc}%</span>
        </div>
        <div class="q-item-prompt">${q.question.replace(/\n/g, ' ')}</div>
      `;

      item.addEventListener('click', () => {
        this.selectedQuestion = q;
        this.renderList();
        this.renderPreview(q);
      });

      scrollEl.appendChild(item);
    });

    if (list.length > 0 && !this.selectedQuestion) {
      this.selectedQuestion = list[0];
      this.renderPreview(list[0]);
    }
  }

  renderPreview(q) {
    const pane = document.getElementById('admin-preview-pane');
    const stats = (window.logicClub?.history?.seenQuestionIds || {})[q.id] || { timesShown: 0, timesCorrect: 0 };
    const acc = stats.timesShown > 0 ? Math.round((stats.timesCorrect / stats.timesShown) * 100) : '--';

    let visualSVG = '';
    if (window.logicClub && window.logicClub.renderVisualPuzzle) {
      visualSVG = window.logicClub.renderVisualPuzzle(q);
    }

    pane.innerHTML = `
      <div class="admin-preview-card">
        <div class="preview-header">
          <span class="preview-tier-badge">${q.tier} TIER</span>
          <span class="preview-id-badge">ID: ${q.id}</span>
          <span class="preview-status ${q.enabled !== false ? 'enabled' : 'disabled'}">
            ${q.enabled !== false ? '● ACTIVE' : '○ DISABLED'}
          </span>
        </div>

        <div class="preview-stats-row">
          <div class="stat-pill">Times Shown: <strong>${stats.timesShown}</strong></div>
          <div class="stat-pill">Accuracy: <strong>${acc}%</strong></div>
          <div class="stat-pill">Visual: <strong>${q.visualType || 'none'}</strong></div>
        </div>

        <div class="preview-question-box">
          <h3>Question Prompt:</h3>
          <p>${q.question.replace(/\n/g, '<br>')}</p>
          ${visualSVG ? `<div class="preview-svg-box">${visualSVG}</div>` : ''}
        </div>

        <div class="preview-choices-box">
          <h4>Options & Answer:</h4>
          <div class="preview-options-grid">
            ${(q.choices || []).map(c => `
              <div class="preview-opt ${String(c).trim().toLowerCase() === String(q.answer).trim().toLowerCase() ? 'correct-opt' : ''}">
                ${c} ${String(c).trim().toLowerCase() === String(q.answer).trim().toLowerCase() ? '✓ (Correct)' : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <div class="preview-expl-box">
          <h4>💡 Explanation:</h4>
          <p>${q.explanation || 'No explanation provided.'}</p>
        </div>

        <div class="preview-actions">
          <button id="toggle-q-enable-btn" class="admin-action-btn ${q.enabled !== false ? 'btn-disable' : 'btn-enable'}">
            ${q.enabled !== false ? 'Disable Question' : 'Enable Question'}
          </button>
        </div>
      </div>
    `;

    document.getElementById('toggle-q-enable-btn').addEventListener('click', () => {
      q.enabled = q.enabled === false ? true : false;
      this.renderPreview(q);
      this.renderList();
    });
  }
}

window.LogicBankAdminModal = LogicBankAdminModal;
