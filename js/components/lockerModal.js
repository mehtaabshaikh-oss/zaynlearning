/**
 * LockerModal - Avatar Customization & Cosmetic Shop
 * Equips Lego parts, Minecraft armor, meme glasses, companions and buys new gear with gems.
 */

class LockerModal {
  constructor() {
    this.modal = document.getElementById('locker-modal');
    this.canvasHolder = document.getElementById('avatar-canvas-holder');
    this.itemsGrid = document.getElementById('locker-items-grid');
    this.gemsVal = document.getElementById('locker-gems-val');
    this.currentCategory = 'heads';

    this.bindEvents();
  }

  bindEvents() {
    document.getElementById('avatar-btn').addEventListener('click', () => {
      this.openModal();
    });

    document.getElementById('close-locker-btn').addEventListener('click', () => {
      this.closeModal();
    });

    const catBtns = document.querySelectorAll('.locker-tab-btn');
    catBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentCategory = btn.dataset.cat;
        this.renderItems();
      });
    });
  }

  openModal() {
    this.modal.classList.remove('hidden');
    this.updatePreview();
    this.renderItems();
    if (window.soundEngine) window.soundEngine.playTap();
  }

  closeModal() {
    this.modal.classList.add('hidden');
    if (window.updateTopBarHUD) window.updateTopBarHUD();
  }

  updatePreview() {
    this.gemsVal.textContent = window.gameState.data.gems;
    this.canvasHolder.innerHTML = AvatarBuilder.renderAvatarSVG(window.gameState.data.equipped, 150);
    const rank = window.gameState.getAuraRank();
    document.getElementById('avatar-display-rank').textContent = `${rank.icon} ${rank.title}`;
  }

  renderItems() {
    this.itemsGrid.innerHTML = '';
    const items = SHOP_ITEMS.filter(item => item.category === this.currentCategory);
    const equippedId = window.gameState.data.equipped[this.currentCategory];

    items.forEach(item => {
      const isOwned = window.gameState.data.inventory.includes(item.id) || item.price === 0;
      const isEquipped = equippedId === item.id;

      const card = document.createElement('div');
      card.className = `locker-item-card ${isEquipped ? 'equipped' : ''}`;

      card.innerHTML = `
        <div class="item-icon-frame">${item.icon}</div>
        <div class="item-name">${item.name}</div>
        ${!isOwned ? `<div style="font-size: 11px; color: var(--accent-gem); font-weight: 700;">💎 ${item.price}</div>` : ''}
        <button class="item-status-btn ${isEquipped ? 'btn-equipped' : (isOwned ? 'btn-owned' : 'btn-buy')}">
          ${isEquipped ? 'EQUIPPED' : (isOwned ? 'EQUIP' : `BUY 💎`)}
        </button>
      `;

      const btn = card.querySelector('button');
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isEquipped) return;

        if (isOwned) {
          window.gameState.equipItem(this.currentCategory, item.id);
          if (window.soundEngine) window.soundEngine.playTap();
          this.updatePreview();
          this.renderItems();
        } else {
          // Buy
          if (window.gameState.data.gems >= item.price) {
            window.gameState.buyItem(item.id, item.price);
            window.gameState.equipItem(this.currentCategory, item.id);
            if (window.soundEngine) window.soundEngine.playLevelUp();
            if (window.helpers) window.helpers.spawnConfetti(40);
            this.updatePreview();
            this.renderItems();
          } else {
            if (window.soundEngine) window.soundEngine.playTap();
            if (window.helpers) window.helpers.spawnAuraFloatingText("Need more gems! 💎", undefined, undefined, true);
          }
        }
      });

      this.itemsGrid.appendChild(card);
    });
  }
}

window.LockerModal = LockerModal;
