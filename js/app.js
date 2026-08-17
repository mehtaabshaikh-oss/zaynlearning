/**
 * Main Application Bootstrap Coordinator
 */

class App {
  constructor() {
    this.initHUD();
    this.initComponents();
    this.bindGlobalAudioEvents();
    this.renderDailyMissions();
  }

  initComponents() {
    window.syncManager = new SyncManager();
    window.mapRenderer = new MapRenderer();
    window.lessonEngine = new LessonEngine();
    window.phonkArena = new PhonkDriftArena();
    window.logicClub = new LogicClubEngine();
    window.logicBankAdminModal = new LogicBankAdminModal();
    window.bossEngine = new BossBattleEngine();
    window.lockerModal = new LockerModal();
    window.arcadeHub = new ArcadeHub();
    window.stemDetectiveEngine = new STEMDetectiveEngine();
    window.scienceLabEngine = new ScienceLabEngine();
    window.classroomEngine = new ClassroomEngine();
    window.quickSyncModal = new QuickSyncModal();

    this.showView('view-arcade-hub');
    this.updateTopBarHUD();
  }

  showView(viewId) {
    const views = document.querySelectorAll('.view-panel');
    views.forEach(v => {
      if (v.id === viewId) {
        v.classList.remove('hidden');
        v.classList.add('active');
        v.scrollTop = 0;
      } else {
        v.classList.add('hidden');
        v.classList.remove('active');
      }
    });

    // Update active state in Mobile Bottom Navigation
    const mobItems = document.querySelectorAll('.mobile-nav-item');
    mobItems.forEach(item => {
      item.classList.toggle('active', item.dataset.view === viewId);
    });

    // Clear and stop any background timers when leaving respective views
    if (viewId !== 'view-phonk-arena' && window.phonkArena) {
      window.phonkArena.clearIntervals();
    }
    if (viewId !== 'view-logic-club' && window.logicClub) {
      window.logicClub.clearTimer();
    }

    if (viewId === 'view-map' && window.mapRenderer) {
      window.mapRenderer.renderWorld(window.mapRenderer.currentWorldId);
    }
    if (viewId === 'view-science-lab' && window.scienceLabEngine) {
      window.scienceLabEngine.renderLabHub();
    }
    if (viewId === 'view-classroom-hub' && window.classroomEngine) {
      window.classroomEngine.renderHub();
    }
  }

  startNodeActivity(node) {
    if (node.type === 'lesson') {
      this.showView('view-lesson');
      window.lessonEngine.startLesson(node);
    } else if (node.type === 'minigame') {
      if (node.mode === 'drift') {
        this.showView('view-phonk-arena');
        window.phonkArena.startArena();
      } else if (node.mode === 'logic') {
        this.showView('view-logic-club');
        window.logicClub.startQuiz();
      }
    } else if (node.type === 'boss') {
      this.showView('view-boss-battle');
      window.bossEngine.startBattle(node);
    } else if (node.type === 'chest') {
      this.openChestNode(node);
    }
  }

  openChestNode(node) {
    if (window.soundEngine) window.soundEngine.playChest();
    if (window.helpers) window.helpers.spawnConfetti(80);

    const gems = node.gemReward || 50;
    const xp = node.xpReward || 100;

    window.gameState.completeNode(node.id, 3);
    window.gameState.addGems(gems);
    window.gameState.addXP(xp);

    if (node.itemUnlock && !window.gameState.data.inventory.includes(node.itemUnlock)) {
      window.gameState.data.inventory.push(node.itemUnlock);
      window.gameState.save();
    }

    document.getElementById('reward-title').textContent = "MYSTERY CHEST UNLOCKED!";
    document.getElementById('reward-sub').textContent = "You found rare loot and math crystals!";
    document.getElementById('reward-xp').textContent = `+${xp} XP`;
    document.getElementById('reward-gems').textContent = `+${gems} Gems`;
    document.getElementById('reward-aura').textContent = "+300 Aura";

    const starsRow = document.getElementById('reward-stars-row');
    starsRow.innerHTML = '🎁💎✨';

    const rewardModal = document.getElementById('reward-modal');
    rewardModal.classList.remove('hidden');

    document.getElementById('claim-reward-btn').onclick = () => {
      rewardModal.classList.add('hidden');
      if (window.mapRenderer) {
        window.mapRenderer.renderWorld(window.mapRenderer.currentWorldId);
      }
    };
  }

  initHUD() {
    window.updateTopBarHUD = () => this.updateTopBarHUD();

    // Mobile Bottom Navigation Clicks
    const mobItems = document.querySelectorAll('.mobile-nav-item');
    mobItems.forEach(item => {
      item.addEventListener('click', () => {
        const viewId = item.dataset.view;
        if (viewId) {
          this.showView(viewId);
          if (window.soundEngine) window.soundEngine.playTap();
        }
      });
    });
  }

  updateTopBarHUD() {
    const data = window.gameState.data;
    const rank = window.gameState.getAuraRank();

    document.getElementById('user-aura-rank').textContent = rank.title;
    document.getElementById('stat-aura').textContent = data.aura.toLocaleString();
    document.getElementById('stat-streak').textContent = data.streak;
    document.getElementById('streak-shield-count').textContent = `🛡️ ${data.streakShields}`;
    document.getElementById('stat-gems').textContent = data.gems;
    document.getElementById('stat-level').textContent = `Lv ${data.level}`;

    // Mini XP bar
    const currentLevelBaseXP = (data.level - 1) * 350;
    const nextLevelXP = data.level * 350;
    const levelProgress = Math.min(100, Math.max(0, ((data.xp - currentLevelBaseXP) / (nextLevelXP - currentLevelBaseXP)) * 100));
    document.getElementById('top-xp-fill').style.width = `${levelProgress}%`;

    // Avatar preview in top navbar
    document.getElementById('top-avatar-preview').innerHTML = AvatarBuilder.renderAvatarSVG(data.equipped, 40);
  }

  renderDailyMissions() {
    const container = document.getElementById('daily-missions-container');
    if (!container) return;

    container.innerHTML = '';
    const missions = window.gameState.data.dailyMissions;
    missions.forEach(m => {
      const item = document.createElement('div');
      item.className = `mission-item ${m.completed ? 'completed' : ''}`;
      item.innerHTML = `<span>${m.completed ? '✅' : '□'}</span> <span>${m.text}</span>`;
      container.appendChild(item);
    });
  }

  bindGlobalAudioEvents() {
    const audioBtn = document.getElementById('audio-toggle-btn');
    const dropdown = document.getElementById('audio-dropdown');
    const volumeSlider = document.getElementById('volume-slider');

    if (audioBtn && dropdown) {
      audioBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('hidden');
      });

      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && e.target !== audioBtn) {
          dropdown.classList.add('hidden');
        }
      });
    }

    const modeItems = document.querySelectorAll('.audio-option-item');
    modeItems.forEach(item => {
      item.addEventListener('click', () => {
        const mode = item.dataset.mode;
        modeItems.forEach(i => {
          i.classList.remove('active');
          const check = i.querySelector('.check-icon');
          if (check) check.remove();
        });
        item.classList.add('active');
        item.insertAdjacentHTML('beforeend', '<span class="check-icon">✓</span>');

        if (window.soundEngine) {
          window.soundEngine.setMode(mode);
        }

        const iconEl = document.getElementById('audio-status-icon');
        if (iconEl) {
          if (mode === 'phonk') iconEl.textContent = '🏎️';
          else if (mode === 'lofi') iconEl.textContent = '🌲';
          else if (mode === 'chiptune') iconEl.textContent = '🕹️';
          else iconEl.textContent = '🔇';
        }
      });
    });

    if (volumeSlider) {
      volumeSlider.addEventListener('input', (e) => {
        if (window.soundEngine) {
          window.soundEngine.setVolume(parseFloat(e.target.value));
        }
      });
    }
  }
}

// Bootstrap on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
