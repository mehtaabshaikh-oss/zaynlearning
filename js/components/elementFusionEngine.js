/**
 * Element Fusion Lab: Interactive Science Craft & Alchemy Engine
 * Supports iPad Pointer/Touch Drag & Drop, Tap-to-Merge, Discovery Celebration, and Scientific Fact Cards
 */

class ElementFusionEngine {
  constructor(customData) {
    if (customData) {
      this.data = customData;
    } else if (typeof window !== 'undefined' && window.ELEMENT_FUSION_DATA) {
      this.data = window.ELEMENT_FUSION_DATA;
    } else if (typeof ELEMENT_FUSION_DATA !== 'undefined') {
      this.data = ELEMENT_FUSION_DATA;
    } else {
      try {
        this.data = require('../data/elementFusionData.js').ELEMENT_FUSION_DATA;
      } catch (e) {
        this.data = null;
      }
    }
    this.storageKey = 'zayn_element_fusion_unlocked_v1';
    this.unlockedIds = new Set(['water', 'fire', 'earth', 'air']);
    this.activeCategory = 'all';
    this.searchTerm = '';
    this.workbench = []; // Array of { uid, id, x, y }
    this.nextUid = 1;
    this.selectedWorkbenchUid = null;
    this.audioCtx = null;

    this.loadSave();
    if (typeof document !== 'undefined') {
      this.initDOM();
    }
  }

  loadSave() {
    try {
      if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            parsed.forEach(id => this.unlockedIds.add(id));
          }
        }
      }
    } catch (e) {
      console.warn('Could not load Element Fusion save:', e);
    }
    // Always ensure the 4 base elements are present
    this.unlockedIds.add('water');
    this.unlockedIds.add('fire');
    this.unlockedIds.add('earth');
    this.unlockedIds.add('air');
  }

  saveProgress() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.storageKey, JSON.stringify(Array.from(this.unlockedIds)));
      }
    } catch (e) {
      console.warn('Could not save Element Fusion progress:', e);
    }
  }

  initDOM() {
    this.libraryGrid = document.getElementById('fusion-library-grid');
    this.workbenchArea = document.getElementById('fusion-workbench-area');
    this.categoryTabs = document.getElementById('fusion-category-tabs');
    this.searchInput = document.getElementById('fusion-search-input');
    this.progressCount = document.getElementById('fusion-progress-count');
    this.progressFill = document.getElementById('fusion-progress-fill');
    this.clearBtn = document.getElementById('fusion-clear-btn');
    this.hintBtn = document.getElementById('fusion-hint-btn');
    this.exitBtn = document.getElementById('exit-fusion-btn');

    // Discovery Modal Elements
    this.discoveryModal = document.getElementById('fusion-discovery-modal');
    this.modalEmoji = document.getElementById('fusion-modal-emoji');
    this.modalTitle = document.getElementById('fusion-modal-title');
    this.modalDesc = document.getElementById('fusion-modal-desc');
    this.modalFact = document.getElementById('fusion-modal-fact');
    this.modalCloseBtn = document.getElementById('fusion-modal-close-btn');

    // Hint Modal Elements
    this.hintModal = document.getElementById('fusion-hint-modal');
    this.hintContent = document.getElementById('fusion-hint-content');
    this.hintCloseBtn = document.getElementById('fusion-hint-close-btn');

    this.bindEvents();
    this.renderCategories();
    this.renderLibrary();
    this.updateProgress();
  }

  bindEvents() {
    if (this.exitBtn) {
      this.exitBtn.addEventListener('click', () => {
        if (window.app) window.app.showView('view-arcade-hub');
      });
    }

    if (this.clearBtn) {
      this.clearBtn.addEventListener('click', () => this.clearWorkbench());
    }

    if (this.hintBtn) {
      this.hintBtn.addEventListener('click', () => this.showHint());
    }

    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener('click', () => {
        if (this.discoveryModal) this.discoveryModal.classList.add('hidden');
      });
    }

    if (this.hintCloseBtn) {
      this.hintCloseBtn.addEventListener('click', () => {
        if (this.hintModal) this.hintModal.classList.add('hidden');
      });
    }

    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchTerm = e.target.value.toLowerCase().trim();
        this.renderLibrary();
      });
    }

    // Workbench Pointer / Touch Drop Handling
    if (this.workbenchArea) {
      this.workbenchArea.addEventListener('dragover', (e) => e.preventDefault());
      this.workbenchArea.addEventListener('drop', (e) => {
        e.preventDefault();
        const elementId = e.dataTransfer.getData('text/plain');
        if (elementId) {
          const rect = this.workbenchArea.getBoundingClientRect();
          const x = Math.max(30, Math.min(rect.width - 80, e.clientX - rect.left - 35));
          const y = Math.max(30, Math.min(rect.height - 80, e.clientY - rect.top - 35));
          this.addToWorkbench(elementId, x, y);
        }
      });

      // Tap workbench empty area to deselect
      this.workbenchArea.addEventListener('click', (e) => {
        if (e.target === this.workbenchArea) {
          this.selectedWorkbenchUid = null;
          this.renderWorkbench();
        }
      });
    }
  }

  renderCategories() {
    if (!this.categoryTabs || !this.data) return;
    this.categoryTabs.innerHTML = '';
    this.data.categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `fusion-cat-btn ${cat.id === this.activeCategory ? 'active' : ''}`;
      btn.innerHTML = `${cat.icon} ${cat.name}`;
      btn.addEventListener('click', () => {
        this.activeCategory = cat.id;
        document.querySelectorAll('.fusion-cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.renderLibrary();
      });
      this.categoryTabs.appendChild(btn);
    });
  }

  renderLibrary() {
    if (!this.libraryGrid || !this.data) return;
    this.libraryGrid.innerHTML = '';

    const elementsToRender = this.data.elements.filter(elem => {
      // Must be unlocked
      if (!this.unlockedIds.has(elem.id)) return false;
      // Category filter
      if (this.activeCategory !== 'all' && elem.category !== this.activeCategory) return false;
      // Search query filter
      if (this.searchTerm && !elem.name.toLowerCase().includes(this.searchTerm)) return false;
      return true;
    });

    if (elementsToRender.length === 0) {
      this.libraryGrid.innerHTML = `<div class="fusion-empty-hint">No elements found</div>`;
      return;
    }

    elementsToRender.forEach(elem => {
      const card = document.createElement('div');
      card.className = 'fusion-library-card';
      card.setAttribute('draggable', 'true');
      card.dataset.elementId = elem.id;
      card.innerHTML = `
        <span class="fusion-card-emoji">${elem.emoji}</span>
        <span class="fusion-card-name">${elem.name}</span>
      `;

      // Drag listener for desktop & trackpad
      card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', elem.id);
      });

      // Tap / Click to spawn directly into the workbench
      card.addEventListener('click', () => {
        this.spawnOntoWorkbench(elem.id);
      });

      this.libraryGrid.appendChild(card);
    });
  }

  spawnOntoWorkbench(elementId) {
    if (!this.workbenchArea) return;
    const rect = this.workbenchArea.getBoundingClientRect();
    const padding = 60;
    const width = (rect.width > 120) ? rect.width - padding * 2 : 200;
    const height = (rect.height > 120) ? rect.height - padding * 2 : 200;
    const x = padding + Math.random() * width;
    const y = padding + Math.random() * height;

    this.addToWorkbench(elementId, x, y);
    this.playTone(320, 'triangle', 0.08);
  }

  addToWorkbench(elementId, x, y) {
    const uid = this.nextUid++;
    const item = { uid, id: elementId, x, y };
    this.workbench.push(item);
    this.renderWorkbench();

    // Check if spawning directly on top of another item triggers immediate fusion
    this.checkCollisions(item);
  }

  renderWorkbench() {
    if (!this.workbenchArea || !this.data) return;
    this.workbenchArea.innerHTML = '';

    if (this.workbench.length === 0) {
      const hint = document.createElement('div');
      hint.className = 'fusion-workbench-empty-label';
      hint.innerHTML = '🧪 Drag or tap elements here from the library to combine them!';
      this.workbenchArea.appendChild(hint);
      return;
    }

    this.workbench.forEach(item => {
      const elemData = this.data.elementLookup[item.id];
      if (!elemData) return;

      const el = document.createElement('div');
      el.className = `fusion-workbench-item ${item.uid === this.selectedWorkbenchUid ? 'selected' : ''}`;
      el.style.left = `${item.x}px`;
      el.style.top = `${item.y}px`;
      el.dataset.uid = item.uid;
      el.innerHTML = `
        <span class="workbench-item-emoji">${elemData.emoji}</span>
        <span class="workbench-item-name">${elemData.name}</span>
        <button class="workbench-item-remove" title="Remove">✕</button>
      `;

      // Remove single element button
      const removeBtn = el.querySelector('.workbench-item-remove');
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.removeFromWorkbench(item.uid);
      });

      // Tap-to-Select / Merge (Especially intuitive for iPad touchscreen)
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleWorkbenchItemTap(item);
      });

      // Pointer drag handlers for workbench items
      this.attachPointerDrag(el, item);

      this.workbenchArea.appendChild(el);
    });
  }

  attachPointerDrag(domEl, item) {
    let isDragging = false;
    let startX = 0, startY = 0;
    let initialX = 0, initialY = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      initialX = item.x;
      initialY = item.y;
      domEl.setPointerCapture(e.pointerId);
      domEl.classList.add('dragging');
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      item.x = Math.max(10, Math.min(this.workbenchArea.clientWidth - 80, initialX + dx));
      item.y = Math.max(10, Math.min(this.workbenchArea.clientHeight - 80, initialY + dy));
      domEl.style.left = `${item.x}px`;
      domEl.style.top = `${item.y}px`;
    };

    const onPointerUp = (e) => {
      if (!isDragging) return;
      isDragging = false;
      domEl.releasePointerCapture(e.pointerId);
      domEl.classList.remove('dragging');
      this.checkCollisions(item);
    };

    domEl.addEventListener('pointerdown', onPointerDown);
    domEl.addEventListener('pointermove', onPointerMove);
    domEl.addEventListener('pointerup', onPointerUp);
  }

  handleWorkbenchItemTap(targetItem) {
    if (this.selectedWorkbenchUid === null) {
      // First item selected
      this.selectedWorkbenchUid = targetItem.uid;
      this.renderWorkbench();
      this.playTone(440, 'sine', 0.05);
    } else if (this.selectedWorkbenchUid === targetItem.uid) {
      // Tapped same item -> Deselect
      this.selectedWorkbenchUid = null;
      this.renderWorkbench();
    } else {
      // Second item tapped -> Fuse with selected item!
      const firstItem = this.workbench.find(it => it.uid === this.selectedWorkbenchUid);
      if (firstItem) {
        this.fuseElements(firstItem, targetItem);
      }
      this.selectedWorkbenchUid = null;
    }
  }

  checkCollisions(draggedItem) {
    const threshold = 55; // pixels distance to trigger fusion
    for (let i = 0; i < this.workbench.length; i++) {
      const other = this.workbench[i];
      if (other.uid === draggedItem.uid) continue;

      const dist = Math.hypot(draggedItem.x - other.x, draggedItem.y - other.y);
      if (dist < threshold) {
        this.fuseElements(draggedItem, other);
        return;
      }
    }
  }

  fuseElements(itemA, itemB) {
    const pairKey = `${itemA.id}+${itemB.id}`;
    const resultId = this.data.recipesMap[pairKey];

    const posX = (itemA.x + itemB.x) / 2;
    const posY = (itemA.y + itemB.y) / 2;

    // Remove the two parent items
    this.workbench = this.workbench.filter(it => it.uid !== itemA.uid && it.uid !== itemB.uid);

    if (resultId) {
      // Valid Fusion!
      const isNewDiscovery = !this.unlockedIds.has(resultId);
      this.unlockedIds.add(resultId);
      this.saveProgress();

      // Add resulting element to workbench
      this.workbench.push({
        uid: this.nextUid++,
        id: resultId,
        x: posX,
        y: posY
      });

      this.renderWorkbench();
      this.renderLibrary();
      this.updateProgress();

      if (isNewDiscovery) {
        this.playFanfare();
        this.showDiscoveryModal(resultId);
        if (typeof window !== 'undefined' && window.gameState) {
          window.gameState.addXP(50);
          window.gameState.addAura(25);
          window.gameState.addGems(1);
        }
      } else {
        this.playTone(587.33, 'triangle', 0.15); // D5 chime
      }
    } else {
      // Invalid combination: Spawn both back with bounce
      this.workbench.push(itemA, itemB);
      this.renderWorkbench();
      this.playTone(180, 'sawtooth', 0.12); // Buzz tone
    }
  }

  showDiscoveryModal(elementId) {
    const elem = this.data.elementLookup[elementId];
    if (!elem || !this.discoveryModal) return;

    if (this.modalEmoji) this.modalEmoji.textContent = elem.emoji;
    if (this.modalTitle) this.modalTitle.textContent = elem.name.toUpperCase();
    if (this.modalDesc) this.modalDesc.textContent = elem.description;
    if (this.modalFact) this.modalFact.textContent = `💡 Fact: ${elem.funFact}`;

    this.discoveryModal.classList.remove('hidden');
  }

  showHint() {
    if (!this.hintModal || !this.hintContent || !this.data) return;

    // Find locked elements that can be crafted from currently unlocked elements
    const possibleNewDiscoveries = [];
    this.data.elements.forEach(elem => {
      if (!this.unlockedIds.has(elem.id) && elem.recipe && elem.recipe.length === 2) {
        const [a, b] = elem.recipe;
        if (this.unlockedIds.has(a) && this.unlockedIds.has(b)) {
          possibleNewDiscoveries.push(elem);
        }
      }
    });

    if (possibleNewDiscoveries.length > 0) {
      // Pick one random craftable hint
      const target = possibleNewDiscoveries[Math.floor(Math.random() * possibleNewDiscoveries.length)];
      const ing1 = this.data.elementLookup[target.recipe[0]];
      const ing2 = this.data.elementLookup[target.recipe[1]];

      this.hintContent.innerHTML = `
        <div class="fusion-hint-card">
          <div class="hint-header">✨ CRAFTABLE DISCOVERY FOUND! ✨</div>
          <div class="hint-recipe">
            <span class="hint-elem">${ing1.emoji} ${ing1.name}</span>
            <span class="hint-plus">+</span>
            <span class="hint-elem">${ing2.emoji} ${ing2.name}</span>
            <span class="hint-arrow">➔</span>
            <span class="hint-mystery">❓ [${target.category.toUpperCase()}]</span>
          </div>
          <p class="hint-clue">Clue: "${target.description}"</p>
        </div>
      `;
    } else {
      this.hintContent.innerHTML = `
        <div class="fusion-hint-card">
          <div class="hint-header">🎉 CONGRATULATIONS! 🎉</div>
          <p>You have unlocked all currently available combinations from your unlocked elements!</p>
        </div>
      `;
    }

    this.hintModal.classList.remove('hidden');
  }

  removeFromWorkbench(uid) {
    this.workbench = this.workbench.filter(it => it.uid !== uid);
    this.renderWorkbench();
  }

  clearWorkbench() {
    this.workbench = [];
    this.selectedWorkbenchUid = null;
    this.renderWorkbench();
    this.playTone(260, 'sine', 0.08);
  }

  updateProgress() {
    if (!this.data) return;
    const total = this.data.elements.length;
    const unlocked = this.unlockedIds.size;
    const percent = Math.round((unlocked / total) * 100);

    if (this.progressCount) {
      this.progressCount.textContent = `${unlocked} / ${total} (${percent}%)`;
    }
    if (this.progressFill) {
      this.progressFill.style.width = `${percent}%`;
    }
  }

  startNewGame() {
    this.workbench = [];
    this.selectedWorkbenchUid = null;
    this.renderLibrary();
    this.renderWorkbench();
    this.updateProgress();
  }

  // =========================================================================
  // AUDIO SYNTHESIS
  // =========================================================================
  getAudioContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) this.audioCtx = new AudioContext();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
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
    } catch (e) {
      // Audio fallback
    }
  }

  playFanfare() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
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
  module.exports = { ElementFusionEngine };
}
if (typeof window !== 'undefined') {
  window.ElementFusionEngine = ElementFusionEngine;
}
