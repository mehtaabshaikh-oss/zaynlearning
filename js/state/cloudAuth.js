/**
 * CloudAuth - Manages 4-Digit Passcode Authentication, Session Tokens & Cloud Auto-Sync
 */

class CloudAuth {
  constructor() {
    this.sessionToken = localStorage.getItem('zayn_auth_token') || null;
    this.currentProfile = JSON.parse(localStorage.getItem('zayn_current_profile') || 'null');
    this.syncTimeout = null;
    this.isSyncing = false;
    this.lastSyncTime = null;

    // Hardcoded fallback PIN registry for local/offline execution
    this.offlinePins = {
      "8662": { id: "zayn", name: "Zayn", role: "master", aiAccess: true, isAdmin: false },
      "6250": { id: "parent", name: "Parent Admin", role: "admin", aiAccess: true, isAdmin: true }
    };
  }

  isAuthenticated() {
    return !!this.currentProfile;
  }

  isMasterZayn() {
    return this.currentProfile && this.currentProfile.id === 'zayn';
  }

  isParentAdmin() {
    return this.currentProfile && (this.currentProfile.isAdmin || this.currentProfile.role === 'admin');
  }

  async loginWithPin(pin) {
    if (!pin || pin.length !== 4) {
      return { success: false, error: "Please enter a 4-digit code." };
    }

    try {
      // Try backend /api/auth endpoint
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        this.setSession(data.token, data.profile);
        await this.loadCloudSave();
        return { success: true, profile: data.profile };
      } else {
        // Fallback to offline PIN registry if server returns error or running locally
        if (this.offlinePins[pin]) {
          const fallbackProfile = this.offlinePins[pin];
          const mockToken = btoa(JSON.stringify({ profileId: fallbackProfile.id, ...fallbackProfile, timestamp: Date.now() }));
          this.setSession(mockToken, fallbackProfile);
          return { success: true, profile: fallbackProfile };
        }
        return { success: false, error: data.error || "Incorrect Passcode." };
      }
    } catch (netErr) {
      // Offline fallback
      if (this.offlinePins[pin]) {
        const fallbackProfile = this.offlinePins[pin];
        const mockToken = btoa(JSON.stringify({ profileId: fallbackProfile.id, ...fallbackProfile, timestamp: Date.now() }));
        this.setSession(mockToken, fallbackProfile);
        return { success: true, profile: fallbackProfile };
      }
      return { success: false, error: "Incorrect Passcode." };
    }
  }

  setSession(token, profile) {
    this.sessionToken = token;
    this.currentProfile = profile;
    localStorage.setItem('zayn_auth_token', token);
    localStorage.setItem('zayn_current_profile', JSON.stringify(profile));
    this.updateUI();
  }

  logout() {
    this.sessionToken = null;
    this.currentProfile = null;
    localStorage.removeItem('zayn_auth_token');
    localStorage.removeItem('zayn_current_profile');
    if (window.loginModal) window.loginModal.showKeypad();
    this.updateUI();
  }

  updateUI() {
    const userLabel = document.querySelector('.top-nav .user-name');
    if (userLabel) {
      userLabel.textContent = this.currentProfile ? this.currentProfile.name.toUpperCase() : "LOG IN";
    }

    const rankLabel = document.getElementById('user-aura-rank');
    if (rankLabel && this.currentProfile) {
      if (this.currentProfile.role === 'admin') {
        rankLabel.textContent = "Parent Admin 🛡️";
      }
    }

    if (window.aiChatBuddy && window.aiChatBuddy.updateVisibility) {
      window.aiChatBuddy.updateVisibility();
    }
  }

  async loadCloudSave() {
    if (!this.sessionToken || !this.currentProfile) return;

    try {
      const res = await fetch('/api/sync', {
        headers: { 'Authorization': `Bearer ${this.sessionToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.cloudData && data.cloudData.gameState) {
          // Merge cloud data with gameState
          if (window.gameState) {
            window.gameState.data = data.cloudData.gameState;
            window.gameState.save(true); // save locally without triggering sync loop
            if (window.app) window.app.updateTopBarHUD();
          }
        }
      }
    } catch (e) {
      console.warn("Cloud save load fallback to local storage:", e);
    }
  }

  triggerAutoSync() {
    if (!this.sessionToken || !this.currentProfile || !window.gameState) return;

    // Debounce sync requests by 2 seconds
    clearTimeout(this.syncTimeout);
    this.syncTimeout = setTimeout(async () => {
      try {
        this.isSyncing = true;
        const payload = { gameState: window.gameState.data };
        const res = await fetch('/api/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.sessionToken}`
          },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          this.lastSyncTime = new Date();
        }
      } catch (err) {
        console.warn("Background auto-sync deferred (offline):", err);
      } finally {
        this.isSyncing = false;
      }
    }, 2000);
  }
}

window.CloudAuth = CloudAuth;
