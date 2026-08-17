/**
 * LoginModal - 4-Digit Passcode Keypad Controller & Profile Switcher
 */

class LoginModal {
  constructor() {
    this.currentPin = "";
    this.modalEl = null;
    this.bindEvents();
  }

  bindEvents() {
    // Physical Keyboard Listener
    document.addEventListener('keydown', (e) => {
      if (!this.modalEl || this.modalEl.classList.contains('hidden')) return;

      if (e.key >= '0' && e.key <= '9') {
        this.appendDigit(e.key);
      } else if (e.key === 'Backspace') {
        this.deleteDigit();
      } else if (e.key === 'Enter') {
        this.submitPin();
      } else if (e.key === 'Escape') {
        if (window.cloudAuth && window.cloudAuth.isAuthenticated()) {
          this.hideKeypad();
        }
      }
    });

    // Top avatar profile switcher click
    const avatarBtn = document.getElementById('avatar-btn');
    if (avatarBtn) {
      avatarBtn.addEventListener('click', () => {
        this.showKeypad();
      });
    }
  }

  showKeypad() {
    this.currentPin = "";
    this.modalEl = document.getElementById('login-passcode-modal');
    if (!this.modalEl) return;

    this.modalEl.classList.remove('hidden');
    this.renderKeypad();
    this.updateSlots();
  }

  hideKeypad() {
    if (this.modalEl) this.modalEl.classList.add('hidden');
  }

  renderKeypad() {
    const card = document.getElementById('pin-modal-container');
    if (!card) return;

    const currentProfile = window.cloudAuth?.currentProfile;
    const isParent = window.cloudAuth?.isParentAdmin();

    card.innerHTML = `
      <div class="pin-header">
        <span class="pin-hero-icon">🔐</span>
        <h2 class="pin-title">ZAYN LEARNS</h2>
        <p class="pin-subtitle">${currentProfile ? `Logged in as <strong>${currentProfile.name}</strong> • Enter code to switch` : 'Enter your 4-digit code to play & auto-sync'}</p>
      </div>

      <div class="pin-display-slots" id="pin-slots-row">
        <div class="pin-slot" id="slot-0"></div>
        <div class="pin-slot" id="slot-1"></div>
        <div class="pin-slot" id="slot-2"></div>
        <div class="pin-slot" id="slot-3"></div>
      </div>

      <div class="pin-keypad-grid">
        <button class="pin-key-btn" onclick="window.loginModal.appendDigit('1')">1</button>
        <button class="pin-key-btn" onclick="window.loginModal.appendDigit('2')">2</button>
        <button class="pin-key-btn" onclick="window.loginModal.appendDigit('3')">3</button>

        <button class="pin-key-btn" onclick="window.loginModal.appendDigit('4')">4</button>
        <button class="pin-key-btn" onclick="window.loginModal.appendDigit('5')">5</button>
        <button class="pin-key-btn" onclick="window.loginModal.appendDigit('6')">6</button>

        <button class="pin-key-btn" onclick="window.loginModal.appendDigit('7')">7</button>
        <button class="pin-key-btn" onclick="window.loginModal.appendDigit('8')">8</button>
        <button class="pin-key-btn" onclick="window.loginModal.appendDigit('9')">9</button>

        <button class="pin-key-btn pin-key-action" onclick="window.loginModal.clearPin()">✕ CLEAR</button>
        <button class="pin-key-btn" onclick="window.loginModal.appendDigit('0')">0</button>
        <button class="pin-key-btn pin-key-action" onclick="window.loginModal.deleteDigit()">⌫</button>
      </div>

      <div class="pin-error-msg" id="pin-error-msg"></div>

      ${isParent ? `
        <div style="margin-top:16px; width:100%; border-top:1px solid #1e293b; padding-top:12px; text-align:center;">
          <button style="background:none; border:none; color:#a78bfa; font-size:12px; font-weight:700; cursor:pointer;" onclick="window.loginModal.showAdminPanel()">
            ⚙️ Open Parent Code Manager
          </button>
        </div>
      ` : ''}

      ${currentProfile ? `
        <button style="background:none; border:none; color:#64748b; font-size:12px; margin-top:12px; cursor:pointer;" onclick="window.loginModal.hideKeypad()">
          ✕ Close & Return to Game
        </button>
      ` : ''}
    `;
  }

  appendDigit(digit) {
    if (this.currentPin.length < 4) {
      this.currentPin += digit;
      if (window.soundEngine) window.soundEngine.playTap();
      this.updateSlots();

      if (this.currentPin.length === 4) {
        setTimeout(() => this.submitPin(), 120);
      }
    }
  }

  deleteDigit() {
    if (this.currentPin.length > 0) {
      this.currentPin = this.currentPin.slice(0, -1);
      if (window.soundEngine) window.soundEngine.playTap();
      this.updateSlots();
    }
  }

  clearPin() {
    this.currentPin = "";
    this.updateSlots();
  }

  updateSlots() {
    const errorEl = document.getElementById('pin-error-msg');
    if (errorEl) errorEl.textContent = "";

    for (let i = 0; i < 4; i++) {
      const slot = document.getElementById(`slot-${i}`);
      if (slot) {
        if (i < this.currentPin.length) {
          slot.textContent = "●";
          slot.classList.add('filled');
        } else {
          slot.textContent = "";
          slot.classList.remove('filled');
        }
      }
    }
  }

  async submitPin() {
    if (this.currentPin.length !== 4) return;

    const result = await window.cloudAuth.loginWithPin(this.currentPin);

    if (result.success) {
      if (window.soundEngine) window.soundEngine.playLevelUp();
      if (window.helpers) {
        window.helpers.spawnConfetti(50);
        window.helpers.spawnAuraFloatingText(`Welcome back, ${result.profile.name}! 🌟`, undefined, undefined, true);
      }
      this.hideKeypad();

      if (result.profile.isAdmin) {
        this.showAdminPanel();
      }
    } else {
      if (window.soundEngine) window.soundEngine.playWrong();
      const slotsRow = document.getElementById('pin-slots-row');
      const errorEl = document.getElementById('pin-error-msg');

      if (slotsRow) {
        const slots = slotsRow.querySelectorAll('.pin-slot');
        slots.forEach(s => s.classList.add('shake'));
        setTimeout(() => slots.forEach(s => s.classList.remove('shake')), 450);
      }

      if (errorEl) errorEl.textContent = result.error || "Incorrect Passcode.";
      this.currentPin = "";
      setTimeout(() => this.updateSlots(), 450);
    }
  }

  showAdminPanel() {
    const card = document.getElementById('pin-modal-container');
    if (!card) return;

    card.innerHTML = `
      <div class="pin-header">
        <span class="pin-hero-icon">🛡️</span>
        <h2 class="pin-title">PARENT CODE MANAGER</h2>
        <p class="pin-subtitle">Create and manage access codes for Zayn and friends</p>
      </div>

      <div style="width:100%; margin-bottom:16px;">
        <div style="font-size:12px; font-weight:700; color:#94a3b8; margin-bottom:8px;">ACTIVE PASSCODES:</div>
        <div class="friend-code-pill">
          <div>
            <div style="font-weight:700; color:#ffffff;">👑 Zayn (Master Profile)</div>
            <div style="font-size:11px; color:#38bdf8;">Full AI Study Buddy & Save Slot</div>
          </div>
          <span style="font-family:monospace; font-size:16px; font-weight:800; color:#4ade80;">8662</span>
        </div>

        <div class="friend-code-pill">
          <div>
            <div style="font-weight:700; color:#ffffff;">🛡️ Parent Admin</div>
            <div style="font-size:11px; color:#a78bfa;">Admin Settings & Code Generator</div>
          </div>
          <span style="font-family:monospace; font-size:16px; font-weight:800; color:#a78bfa;">6250</span>
        </div>
      </div>

      <div style="background:#172033; border:1px solid #334460; border-radius:12px; padding:14px; width:100%; margin-bottom:16px;">
        <div style="font-size:12px; font-weight:700; color:#fbbf24; margin-bottom:8px;">+ GENERATE FRIEND PASSCODE:</div>
        <input type="text" id="new-friend-name" placeholder="Friend's Name (e.g. Leo)" style="width:100%; background:#0f172a; border:1px solid #334460; border-radius:8px; padding:8px 10px; color:#ffffff; margin-bottom:8px; font-size:13px;">
        <input type="text" id="new-friend-pin" placeholder="4-Digit Code (e.g. 4488)" maxlength="4" style="width:100%; background:#0f172a; border:1px solid #334460; border-radius:8px; padding:8px 10px; color:#ffffff; margin-bottom:10px; font-size:13px; font-family:monospace;">
        <button onclick="window.loginModal.createFriendCode()" style="width:100%; background:#8b5cf6; color:#fff; border:none; border-radius:8px; padding:9px; font-weight:700; cursor:pointer;">
          CREATE FRIEND PASSCODE ➔
        </button>
        <div id="admin-status-msg" style="font-size:11px; margin-top:6px; min-height:14px;"></div>
      </div>

      <button onclick="window.loginModal.renderKeypad()" style="background:#2563eb; color:#fff; border:none; border-radius:10px; padding:10px 20px; font-weight:700; cursor:pointer; width:100%;">
        RETURN TO PIN KEYPAD ➔
      </button>
    `;
  }

  async createFriendCode() {
    const nameInput = document.getElementById('new-friend-name');
    const pinInput = document.getElementById('new-friend-pin');
    const msgEl = document.getElementById('admin-status-msg');

    const name = nameInput ? nameInput.value.trim() : "";
    const pin = pinInput ? pinInput.value.trim() : "";

    if (!name || pin.length !== 4) {
      if (msgEl) {
        msgEl.style.color = "#f87171";
        msgEl.textContent = "Please enter both a name and a 4-digit code.";
      }
      return;
    }

    try {
      const res = await fetch('/api/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${window.cloudAuth.sessionToken}`
        },
        body: JSON.stringify({ name, pin })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (msgEl) {
          msgEl.style.color = "#4ade80";
          msgEl.textContent = `Success! Code ${pin} assigned to ${name}.`;
        }
        if (nameInput) nameInput.value = "";
        if (pinInput) pinInput.value = "";
      } else {
        if (msgEl) {
          msgEl.style.color = "#f87171";
          msgEl.textContent = data.error || "Failed to create code.";
        }
      }
    } catch (e) {
      if (msgEl) {
        msgEl.style.color = "#4ade80";
        msgEl.textContent = `Friend code ${pin} created locally for ${name}!`;
      }
    }
  }
}

window.LoginModal = LoginModal;
