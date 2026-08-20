/**
 * Cyber Logic Gate Runner Engine
 * Simulates real-time digital logic propagation across AND, OR, NOT, XOR, NAND, NOR, and XNOR gates
 */

class LogicGateEngine {
  constructor(customData) {
    if (customData) {
      this.data = customData;
    } else if (typeof window !== 'undefined' && window.LOGIC_GATE_DATA) {
      this.data = window.LOGIC_GATE_DATA;
    } else if (typeof LOGIC_GATE_DATA !== 'undefined') {
      this.data = LOGIC_GATE_DATA;
    } else {
      try {
        this.data = require('../data/logicGateData.js').LOGIC_GATE_DATA;
      } catch (e) {
        this.data = null;
      }
    }

    this.currentLevelIndex = 0;
    this.inputStates = {};
    this.wireSignals = {};
    this.isLevelWon = false;
    this.audioCtx = null;

    if (typeof document !== 'undefined') {
      this.initDOM();
    }
  }

  initDOM() {
    this.levelBadge = document.getElementById('logic-level-badge');
    this.levelTitle = document.getElementById('logic-level-title');
    this.levelDesc = document.getElementById('logic-level-desc');
    this.circuitBoard = document.getElementById('logic-circuit-board');
    this.truthTableBtn = document.getElementById('logic-truth-table-btn');
    this.levelSelectBtn = document.getElementById('logic-level-select-btn');
    this.restartBtn = document.getElementById('logic-restart-btn');
    this.exitBtn = document.getElementById('exit-logic-btn');

    // Modals
    this.winModal = document.getElementById('logic-win-modal');
    this.nextLevelBtn = document.getElementById('logic-next-level-btn');
    this.truthTableModal = document.getElementById('logic-truth-modal');
    this.truthTableCloseBtn = document.getElementById('logic-truth-close-btn');
    this.levelSelectModal = document.getElementById('logic-level-modal');
    this.levelGrid = document.getElementById('logic-level-grid');
    this.levelModalCloseBtn = document.getElementById('logic-level-close-btn');

    this.bindEvents();
    this.loadLevel(0);
  }

  bindEvents() {
    if (this.exitBtn) {
      this.exitBtn.addEventListener('click', () => {
        if (window.app) window.app.showView('view-arcade-hub');
      });
    }

    if (this.restartBtn) {
      this.restartBtn.addEventListener('click', () => this.loadLevel(this.currentLevelIndex));
    }

    if (this.truthTableBtn) {
      this.truthTableBtn.addEventListener('click', () => {
        if (this.truthTableModal) this.truthTableModal.classList.remove('hidden');
      });
    }

    if (this.truthTableCloseBtn) {
      this.truthTableCloseBtn.addEventListener('click', () => {
        if (this.truthTableModal) this.truthTableModal.classList.add('hidden');
      });
    }

    if (this.levelSelectBtn) {
      this.levelSelectBtn.addEventListener('click', () => this.openLevelSelect());
    }

    if (this.levelModalCloseBtn) {
      this.levelModalCloseBtn.addEventListener('click', () => {
        if (this.levelSelectModal) this.levelSelectModal.classList.add('hidden');
      });
    }

    if (this.nextLevelBtn) {
      this.nextLevelBtn.addEventListener('click', () => {
        if (this.winModal) this.winModal.classList.add('hidden');
        if (this.currentLevelIndex + 1 < this.data.levels.length) {
          this.loadLevel(this.currentLevelIndex + 1);
        } else {
          this.loadLevel(0);
        }
      });
    }
  }

  loadLevel(levelIndex) {
    if (!this.data || !this.data.levels[levelIndex]) return;

    this.currentLevelIndex = levelIndex;
    const lvl = this.data.levels[levelIndex];
    this.isLevelWon = false;

    // Reset input states
    this.inputStates = {};
    lvl.inputs.forEach(inp => {
      this.inputStates[inp.id] = inp.val;
    });

    if (this.levelBadge) this.levelBadge.textContent = `LEVEL ${lvl.id} • TIER ${lvl.tier}`;
    if (this.levelTitle) this.levelTitle.textContent = lvl.title;
    if (this.levelDesc) this.levelDesc.textContent = lvl.desc;
    if (this.winModal) this.winModal.classList.add('hidden');

    this.propagateSignals();
    this.renderCircuit();
  }

  propagateSignals() {
    const lvl = this.data.levels[this.currentLevelIndex];
    if (!lvl) return;

    this.wireSignals = { ...this.inputStates };

    // Multi-pass propagation to ensure dependencies are fully solved
    let changed = true;
    let passes = 0;
    while (changed && passes < 10) {
      changed = false;
      passes++;

      lvl.gates.forEach(gate => {
        const inputVals = gate.in.map(inId => (this.wireSignals[inId] !== undefined ? this.wireSignals[inId] : 0));
        const outVal = this.data.evaluateGate(gate.type, inputVals);

        if (this.wireSignals[gate.out] !== outVal) {
          this.wireSignals[gate.out] = outVal;
          changed = true;
        }
      });
    }

    this.checkVictory();
  }

  toggleInput(inputId) {
    const lvl = this.data.levels[this.currentLevelIndex];
    if (!lvl || this.isLevelWon) return;

    const inp = lvl.inputs.find(i => i.id === inputId);
    if (!inp || inp.fixed) return;

    this.inputStates[inputId] = this.inputStates[inputId] === 1 ? 0 : 1;
    this.playTone(this.inputStates[inputId] === 1 ? 660 : 330, 'square', 0.08);

    this.propagateSignals();
    this.renderCircuit();
  }

  checkVictory() {
    const lvl = this.data.levels[this.currentLevelIndex];
    if (!lvl || this.isLevelWon) return;

    let allTargetsMet = true;
    lvl.targets.forEach(tgt => {
      const currentVal = this.wireSignals[tgt.id];
      if (currentVal !== tgt.targetVal) {
        allTargetsMet = false;
      }
    });

    if (allTargetsMet) {
      this.isLevelWon = true;
      this.playFanfare();
      if (typeof window !== 'undefined' && window.gameState) {
        window.gameState.addXP(40);
        window.gameState.addAura(20);
      }
      setTimeout(() => {
        if (this.winModal) this.winModal.classList.remove('hidden');
      }, 500);
    }
  }

  renderCircuit() {
    if (!this.circuitBoard) return;
    const lvl = this.data.levels[this.currentLevelIndex];
    if (!lvl) return;

    this.circuitBoard.innerHTML = '';

    // Main 3-column layout: Inputs Column -> Gates Grid Column -> Targets Column
    const container = document.createElement('div');
    container.className = 'logic-board-layout';

    // 1. Inputs Column
    const inputsCol = document.createElement('div');
    inputsCol.className = 'logic-col inputs-col';
    inputsCol.innerHTML = '<div class="logic-col-header">INPUT SWITCHES</div>';

    lvl.inputs.forEach(inp => {
      const currentVal = this.inputStates[inp.id];
      const switchEl = document.createElement('div');
      switchEl.className = `logic-switch-card ${currentVal === 1 ? 'on' : 'off'} ${inp.fixed ? 'fixed' : ''}`;
      switchEl.innerHTML = `
        <div class="switch-label">${inp.label}</div>
        <div class="switch-toggle-pill ${currentVal === 1 ? 'active' : ''}">
          <span class="switch-state-text">${currentVal === 1 ? '1 (HIGH)' : '0 (LOW)'}</span>
        </div>
        ${inp.fixed ? '<span class="switch-locked-badge">🔒 LOCKED</span>' : ''}
      `;

      if (!inp.fixed) {
        switchEl.addEventListener('click', () => this.toggleInput(inp.id));
      }
      inputsCol.appendChild(switchEl);
    });

    // 2. Gates Column
    const gatesCol = document.createElement('div');
    gatesCol.className = 'logic-col gates-col';
    gatesCol.innerHTML = '<div class="logic-col-header">LOGIC GATES</div>';

    lvl.gates.forEach(gate => {
      const outVal = this.wireSignals[gate.out];
      const gateCard = document.createElement('div');
      gateCard.className = `logic-gate-card type-${gate.type.toLowerCase()} ${outVal === 1 ? 'active' : 'inactive'}`;

      const inVals = gate.in.map(inId => `${inId}: ${this.wireSignals[inId] || 0}`).join(' | ');
      gateCard.innerHTML = `
        <div class="gate-type-badge">${gate.type}</div>
        <div class="gate-symbol">${this.getGateSymbol(gate.type)}</div>
        <div class="gate-io-status">
          <span class="gate-in-text">${inVals}</span>
          <span class="gate-arrow">➔</span>
          <span class="gate-out-text ${outVal === 1 ? 'high' : 'low'}">${outVal === 1 ? '1' : '0'}</span>
        </div>
      `;
      gatesCol.appendChild(gateCard);
    });

    // 3. Targets Column
    const targetsCol = document.createElement('div');
    targetsCol.className = 'logic-col targets-col';
    targetsCol.innerHTML = '<div class="logic-col-header">TARGET TERMINALS</div>';

    lvl.targets.forEach(tgt => {
      const currentVal = this.wireSignals[tgt.id];
      const isTargetMet = (currentVal === tgt.targetVal);

      const targetEl = document.createElement('div');
      targetEl.className = `logic-target-card ${isTargetMet ? 'satisfied' : 'pending'}`;
      targetEl.innerHTML = `
        <div class="target-title">${tgt.label}</div>
        <div class="target-status-row">
          <div class="target-val-box ${currentVal === 1 ? 'high' : 'low'}">Current: ${currentVal !== undefined ? currentVal : 0}</div>
          <div class="target-goal-box">Required: ${tgt.targetVal}</div>
        </div>
        <div class="target-indicator ${isTargetMet ? 'active' : ''}">
          ${isTargetMet ? '✅ ACTIVE & POWERED' : '⏳ SIGNAL MISMATCH'}
        </div>
      `;
      targetsCol.appendChild(targetEl);
    });

    container.appendChild(inputsCol);
    container.appendChild(gatesCol);
    container.appendChild(targetsCol);

    this.circuitBoard.appendChild(container);
  }

  getGateSymbol(type) {
    switch (type.toUpperCase()) {
      case 'AND': return '⩓ [AND]';
      case 'OR': return '⩔ [OR]';
      case 'NOT': return '¬ [NOT]';
      case 'XOR': return '⊕ [XOR]';
      case 'NAND': return '⊼ [NAND]';
      case 'NOR': return '⊽ [NOR]';
      case 'XNOR': return '⊙ [XNOR]';
      default: return '⚡';
    }
  }

  openLevelSelect() {
    if (!this.levelSelectModal || !this.levelGrid || !this.data) return;

    this.levelGrid.innerHTML = '';
    this.data.levels.forEach((lvl, idx) => {
      const btn = document.createElement('button');
      btn.className = `logic-lvl-grid-btn ${idx === this.currentLevelIndex ? 'current' : ''}`;
      btn.innerHTML = `
        <span class="grid-btn-num">${lvl.id}</span>
        <span class="grid-btn-title">${lvl.title}</span>
        <span class="grid-btn-tier">Tier ${lvl.tier}</span>
      `;
      btn.addEventListener('click', () => {
        this.levelSelectModal.classList.add('hidden');
        this.loadLevel(idx);
      });
      this.levelGrid.appendChild(btn);
    });

    this.levelSelectModal.classList.remove('hidden');
  }

  startNewGame() {
    this.loadLevel(0);
  }

  // Audio helpers
  getAudioContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) this.audioCtx = new AudioContext();
    }
    return this.audioCtx;
  }

  playTone(freq, type = 'sine', duration = 0.1) {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  }

  playFanfare() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      [440, 554.37, 659.25, 880].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.15, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.3);
      });
    } catch (e) {}
  }
}

// Export for Node.js unit tests & Browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LogicGateEngine };
}
if (typeof window !== 'undefined') {
  window.LogicGateEngine = LogicGateEngine;
}
