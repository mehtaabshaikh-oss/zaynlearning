/**
 * QuickSyncModal - Cross-device backup, export, and instant profile restoration.
 * Encodes complete GameState (streaks, aura, gems, XP, mistakes, labs) into a portable key/link.
 */

class QuickSyncModal {
  constructor() {
    this.modal = document.getElementById('quick-sync-modal');
    this.initListeners();
    this.checkURLSyncParam();
  }

  initListeners() {
    const syncBtn = document.getElementById('quick-sync-btn');
    if (syncBtn) {
      syncBtn.addEventListener('click', () => this.openModal());
    }

    const closeBtn = document.getElementById('close-quick-sync-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }

    // Tab switching
    const tabExport = document.getElementById('tab-export-sync');
    const tabImport = document.getElementById('tab-import-sync');
    const panelExport = document.getElementById('panel-export-sync');
    const panelImport = document.getElementById('panel-import-sync');

    if (tabExport && tabImport) {
      tabExport.addEventListener('click', () => {
        tabExport.classList.add('active');
        tabImport.classList.remove('active');
        panelExport.classList.remove('hidden');
        panelImport.classList.add('hidden');
      });

      tabImport.addEventListener('click', () => {
        tabImport.classList.add('active');
        tabExport.classList.remove('active');
        panelImport.classList.remove('hidden');
        panelExport.classList.add('hidden');
      });
    }

    // Copy Code Button
    const copyCodeBtn = document.getElementById('copy-sync-code-btn');
    if (copyCodeBtn) {
      copyCodeBtn.addEventListener('click', () => {
        const input = document.getElementById('sync-code-input');
        if (input && input.value) {
          navigator.clipboard.writeText(input.value).then(() => {
            this.showToast('✅ Sync Code copied to clipboard!');
          }).catch(() => {
            input.select();
            document.execCommand('copy');
            this.showToast('✅ Sync Code copied!');
          });
        }
      });
    }

    // Copy 1-Tap Link
    const copyLinkBtn = document.getElementById('copy-sync-link-btn');
    if (copyLinkBtn) {
      copyLinkBtn.addEventListener('click', () => {
        const key = this.generateSyncKey();
        const base = window.location.href.split('?')[0];
        const syncUrl = `${base}?sync=${encodeURIComponent(key)}`;
        navigator.clipboard.writeText(syncUrl).then(() => {
          this.showToast('🔗 1-Tap Sync Link copied! Open on your other device.');
        }).catch(() => {
          this.showToast('🔗 Link generated!');
        });
      });
    }

    // Download JSON Save File
    const downloadBtn = document.getElementById('download-backup-btn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(window.gameState.data, null, 2));
        const dlAnchor = document.createElement('a');
        dlAnchor.setAttribute("href", dataStr);
        const dateStr = new Date().toISOString().split('T')[0];
        dlAnchor.setAttribute("download", `Zayn_Learns_Save_${dateStr}.json`);
        document.body.appendChild(dlAnchor);
        dlAnchor.click();
        dlAnchor.remove();
        this.showToast('💾 Save file downloaded successfully!');
      });
    }

    // Restore from input key
    const restoreBtn = document.getElementById('restore-sync-code-btn');
    if (restoreBtn) {
      restoreBtn.addEventListener('click', () => {
        const input = document.getElementById('restore-code-input');
        if (input) {
          const raw = input.value.trim();
          if (!raw) {
            this.showStatus('Please enter or paste a valid Sync Key.', false);
            return;
          }
          this.restoreFromKey(raw);
        }
      });
    }

    // File upload
    const uploadBtn = document.getElementById('upload-backup-btn');
    const fileInput = document.getElementById('restore-file-input');
    if (uploadBtn && fileInput) {
      uploadBtn.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const parsed = JSON.parse(event.target.result);
            this.applyStatePayload(parsed);
          } catch (err) {
            this.showStatus('Invalid backup file format.', false);
          }
        };
        reader.readAsText(file);
      });
    }
  }

  generateSyncKey() {
    try {
      const payload = JSON.stringify(window.gameState.data);
      return 'ZAYN-V1-' + btoa(unescape(encodeURIComponent(payload)));
    } catch (e) {
      return 'ZAYN-V1-' + btoa(JSON.stringify(window.gameState.data));
    }
  }

  openModal() {
    if (!this.modal) return;
    this.modal.classList.remove('hidden');

    // Update live stats snapshot
    const d = window.gameState.data;
    const streakEl = document.getElementById('sync-stat-streak');
    const auraEl = document.getElementById('sync-stat-aura');
    const gemsEl = document.getElementById('sync-stat-gems');
    const levelEl = document.getElementById('sync-stat-level');

    if (streakEl) streakEl.textContent = `${d.streak || 1} Day${(d.streak || 1) === 1 ? '' : 's'}`;
    if (auraEl) auraEl.textContent = (d.aura || 0).toLocaleString();
    if (gemsEl) gemsEl.textContent = (d.gems || 0).toLocaleString();
    if (levelEl) levelEl.textContent = `Lv ${d.level || 1}`;

    // Populate sync code input
    const codeInput = document.getElementById('sync-code-input');
    if (codeInput) {
      codeInput.value = this.generateSyncKey();
    }

    if (window.soundEngine) window.soundEngine.playTap();
  }

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.add('hidden');
  }

  showToast(msg) {
    const toast = document.getElementById('sync-toast');
    if (toast) {
      toast.textContent = msg;
      toast.classList.remove('hidden');
      setTimeout(() => toast.classList.add('hidden'), 3500);
    }
  }

  showStatus(msg, isSuccess) {
    const el = document.getElementById('restore-status-msg');
    if (el) {
      el.textContent = msg;
      el.className = `sync-status-msg ${isSuccess ? 'success' : 'error'}`;
      el.classList.remove('hidden');
    }
  }

  restoreFromKey(rawKey) {
    try {
      let cleanKey = rawKey;
      if (cleanKey.includes('?sync=')) {
        cleanKey = decodeURIComponent(cleanKey.split('?sync=')[1]);
      }
      if (cleanKey.startsWith('ZAYN-V1-')) {
        cleanKey = cleanKey.substring(8);
      }

      const jsonStr = decodeURIComponent(escape(atob(cleanKey)));
      const parsed = JSON.parse(jsonStr);
      this.applyStatePayload(parsed);
    } catch (e) {
      try {
        const jsonStr = atob(rawKey.replace('ZAYN-V1-', ''));
        const parsed = JSON.parse(jsonStr);
        this.applyStatePayload(parsed);
      } catch (err) {
        this.showStatus('Invalid Sync Key. Please check the code and try again.', false);
      }
    }
  }

  applyStatePayload(data) {
    if (!data || typeof data !== 'object') {
      this.showStatus('Invalid data format in save payload.', false);
      return;
    }

    // Merge into GameState
    window.gameState.data = {
      ...window.gameState.getDefaults(),
      ...data
    };
    window.gameState.save();

    // Trigger HUD & audio updates
    if (window.app && window.app.updateTopBarHUD) {
      window.app.updateTopBarHUD();
    }
    if (window.soundEngine) window.soundEngine.playFanfare();
    if (window.helpers) window.helpers.spawnConfetti(80);

    this.showStatus('🎉 Profile Synced Successfully! All streaks, Aura, and gear restored!', true);

    setTimeout(() => {
      this.closeModal();
      window.location.reload();
    }, 1800);
  }

  checkURLSyncParam() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const syncKey = urlParams.get('sync');
      if (syncKey) {
        setTimeout(() => {
          const confirmSync = confirm("⚡ Quick Sync Found: Do you want to load Zayn's profile and progress on this device?");
          if (confirmSync) {
            this.restoreFromKey(syncKey);
          }
        }, 500);
      }
    } catch (e) {}
  }
}

window.QuickSyncModal = QuickSyncModal;
