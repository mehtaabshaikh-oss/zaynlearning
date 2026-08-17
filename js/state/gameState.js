/**
 * GameState - Persistent LocalStorage Manager
 * Stores all XP, gems, aura points, streaks, shields, inventory, and completed nodes.
 */

const STORAGE_KEY = 'zayn_learning_v2_cloud';

class GameState {
  constructor() {
    this.data = this.loadState();
    this.ensureDefaults();
    this.checkDailyStreak();
  }

  getDefaults() {
    return {
      name: "Zayn",
      xp: 0,
      level: 1,
      aura: 0,
      gems: 0,
      streak: 1,
      streakShields: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      currentWorldId: 1,
      completedNodes: {}, // e.g. { "w1-n1": { completed: true, stars: 3 } }
      inventory: ["head_default", "outfit_default", "pet_pixel_bot"],
      equipped: {
        heads: "head_default",
        outfits: "outfit_default",
        accessories: null,
        pets: "pet_pixel_bot"
      },
      audioSettings: {
        mode: 'phonk',
        volume: 0.7
      },
      dailyMissions: [
        { id: "m1", text: "Complete 1 Lesson", completed: false, xp: 50 },
        { id: "m2", text: "Score in Phonk Drift", completed: false, xp: 50 },
        { id: "m3", text: "Answer 1 Logic Question", completed: false, xp: 50 }
      ],
      highScores: {
        phonkDrift: 0,
        logicClubTier: "90%"
      },
      scienceState: {
        discoveryXP: 0,
        discoveries: {}, // { [termId]: { id, name, category, firstDiscovered, mastery: 'new' | 'learning' | 'understood' | 'mastered' } }
        experimentsCount: 0,
        labProgress: {
          matter: { completed: false, bestScore: 0 },
          skeleton: { completed: false, bestScore: 0 },
          elements: { completed: false, bestScore: 0 }
        }
      },
      classroomProgress: {
        concepts: {},
        parentPriorities: {}
      },
      odysseyProgress: {
        completedQuests: [],
        passportStamps: []
      }
    };
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Could not load from localStorage", e);
    }
    return this.getDefaults();
  }

  save(skipSync = false) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
    this.notifyListeners();
    if (!skipSync && window.cloudAuth && window.cloudAuth.triggerAutoSync) {
      window.cloudAuth.triggerAutoSync();
    }
  }

  ensureDefaults() {
    const defaults = this.getDefaults();
    for (let key in defaults) {
      if (this.data[key] === undefined) {
        this.data[key] = defaults[key];
      }
    }
  }

  checkDailyStreak() {
    const d = new Date();
    const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const lastActive = this.data.lastActiveDate;

    if (!lastActive) {
      this.data.lastActiveDate = today;
      this.data.streak = 1;
      this.save();
      return;
    }

    if (lastActive !== today) {
      const lastDate = new Date(lastActive);
      const currentDate = new Date(today);
      const diffTime = Math.abs(currentDate - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Logged in next day -> streak increases!
        this.data.streak += 1;
      } else if (diffDays > 1) {
        // Missed days -> use shield or reset
        if (this.data.streakShields > 0) {
          this.data.streakShields -= 1;
          console.log("Shield consumed! Streak protected.");
        } else {
          this.data.streak = 1;
        }
      }
      this.data.lastActiveDate = today;
      this.save();
    }
  }

  addXP(amount) {
    this.data.xp += amount;
    let leveledUp = false;
    while (this.data.xp >= this.data.level * 350) {
      this.data.level += 1;
      this.data.gems += 25;
      leveledUp = true;
    }
    if (leveledUp) {
      if (window.soundEngine) window.soundEngine.playLevelUp();
      if (window.helpers) window.helpers.spawnLevelUpCelebration(this.data.level);
    }
    this.save();
  }

  addAura(amount) {
    this.data.aura = Math.max(0, this.data.aura + amount);
    this.save();
    if (window.app && window.app.updateTopBarHUD) {
      window.app.updateTopBarHUD();
    }
  }

  deductAura(amount = 25) {
    this.data.aura = Math.max(0, (this.data.aura || 0) - amount);
    this.save();
    if (window.app && window.app.updateTopBarHUD) {
      window.app.updateTopBarHUD();
    }
  }

  penalizeMistake(reason = "Incorrect Answer", x, y) {
    const penalty = 25;
    this.deductAura(penalty);
    if (window.helpers) {
      window.helpers.spawnAuraFloatingText(`-25 Aura 📉`, x, y, false);
    }
  }

  addGems(amount) {
    this.data.gems += amount;
    this.save();
    if (window.app && window.app.updateTopBarHUD) {
      window.app.updateTopBarHUD();
    }
  }

  completeNode(nodeId, stars = 3) {
    if (!this.data.completedNodes[nodeId]) {
      this.data.completedNodes[nodeId] = { completed: true, stars: stars };
    } else {
      this.data.completedNodes[nodeId].stars = Math.max(
        this.data.completedNodes[nodeId].stars || 0,
        stars
      );
    }
    this.save();
  }

  isNodeCompleted(nodeId) {
    return !!(this.data.completedNodes[nodeId] && this.data.completedNodes[nodeId].completed);
  }

  getNodeStars(nodeId) {
    return this.data.completedNodes[nodeId]?.stars || 0;
  }

  equipItem(category, itemId) {
    if (!this.data.inventory.includes(itemId) && itemId !== null) {
      return false;
    }
    this.data.equipped[category] = itemId;
    this.save();
    return true;
  }

  buyItem(itemId, price) {
    if (this.data.gems < price) return false;
    this.data.gems -= price;
    if (!this.data.inventory.includes(itemId)) {
      this.data.inventory.push(itemId);
    }
    this.save();
    return true;
  }

  getAuraRank() {
    const aura = this.data.aura;
    let rank = AURA_RANKS[0];
    for (let r of AURA_RANKS) {
      if (aura >= r.minAura) {
        rank = r;
      }
    }
    return rank;
  }

  // --- Zayn Science Lab Methods ---
  getScientistRank() {
    const xp = this.data.scienceState?.discoveryXP || 0;
    const ranks = window.SCIENTIST_RANKS || [
      { level: 1, title: "Curious Explorer", icon: "🔬", minXP: 0 }
    ];
    let current = ranks[0];
    for (let r of ranks) {
      if (xp >= r.minXP) {
        current = r;
      }
    }
    return current;
  }

  addDiscoveryXP(amount) {
    if (!this.data.scienceState) this.data.scienceState = this.getDefaults().scienceState;
    this.data.scienceState.discoveryXP += amount;
    this.addXP(amount); // also contribute to overall level
    this.save();
  }

  unlockDiscovery(termId) {
    if (!this.data.scienceState) this.data.scienceState = this.getDefaults().scienceState;
    const isNew = !this.data.scienceState.discoveries[termId];
    if (isNew) {
      this.data.scienceState.discoveries[termId] = {
        id: termId,
        firstDiscovered: Date.now(),
        mastery: 'understood'
      };
      this.addDiscoveryXP(50);
      this.addGems(15);
      this.addAura(250);
      this.save();
    }
    return isNew;
  }

  recordExperiment() {
    if (!this.data.scienceState) this.data.scienceState = this.getDefaults().scienceState;
    this.data.scienceState.experimentsCount = (this.data.scienceState.experimentsCount || 0) + 1;
    this.save();
  }

  notifyListeners() {
    if (window.updateTopBarHUD) {
      window.updateTopBarHUD();
    }
  }
}

window.gameState = new GameState();
