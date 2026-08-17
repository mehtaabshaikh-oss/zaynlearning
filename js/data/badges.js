/**
 * Badges & Achievements Catalog for ZaynLearns
 * 30+ Unlockable Milestones with Aura, XP, and Title rewards
 */

const ZaynBadges = [
  // Consistency & Streaks
  {
    id: 'flame_keeper',
    title: 'Flame Keeper',
    icon: '🔥',
    category: 'STREAKS',
    description: 'Reach a 7-day learning streak',
    requirement: (state) => (state.streak || 0) >= 7,
    rewardAura: 500,
    rewardGems: 10
  },
  {
    id: 'iron_shield',
    title: 'Aegis Guardian',
    icon: '🛡️',
    category: 'STREAKS',
    description: 'Store 3/3 Streak Shields in reserve',
    requirement: (state) => (state.streakShields || 0) >= 3,
    rewardAura: 750,
    rewardGems: 15
  },
  {
    id: 'streak_titan',
    title: 'Streak Titan',
    icon: '⚡',
    category: 'STREAKS',
    description: 'Reach a 30-day legendary streak',
    requirement: (state) => (state.streak || 0) >= 30,
    rewardAura: 2500,
    rewardGems: 50
  },

  // Arcade & Speed
  {
    id: 'drift_king',
    title: 'Drift Legend',
    icon: '🏎️',
    category: 'ARCADE',
    description: 'Score 100+ correct answers in Drift 60s',
    requirement: (state) => (state.arcadeRecords?.drift?.highScore || 0) >= 100,
    rewardAura: 1000,
    rewardGems: 20
  },
  {
    id: 'perfect_aim',
    title: 'Sniper Physicist',
    icon: '🎯',
    category: 'ARCADE',
    description: 'Achieve 100% accuracy in Angle Cannon',
    requirement: (state) => (state.arcadeRecords?.cannon?.highAccuracy || 0) >= 100,
    rewardAura: 1200,
    rewardGems: 25
  },
  {
    id: 'vault_cracker',
    title: 'Master Codebreaker',
    icon: '🔐',
    category: 'ARCADE',
    description: 'Crack all 3 vault stages in Code Breaker',
    requirement: (state) => (state.arcadeRecords?.codebreaker?.highScore || 0) >= 3,
    rewardAura: 1500,
    rewardGems: 30
  },
  {
    id: 'castle_defender',
    title: 'Castle Champion',
    icon: '🏰',
    category: 'ARCADE',
    description: 'Defeat Wave 10 Boss in Math Defense',
    requirement: (state) => (state.arcadeRecords?.defense?.highScore || 0) >= 10,
    rewardAura: 2000,
    rewardGems: 40
  },

  // Logic & 1% Club
  {
    id: 'one_percent_club',
    title: '1% Grandmaster',
    icon: '👑',
    category: 'LOGIC',
    description: 'Conquer the 1% Tier Question in 1% Club',
    requirement: (state) => (state.conquered1Percent || false),
    rewardAura: 5000,
    rewardGems: 100
  },
  {
    id: 'cipher_sleuth',
    title: 'Cipher Sleuth',
    icon: '🕵️',
    category: 'LOGIC',
    description: 'Solve 10 Caesar cipher questions',
    requirement: (state) => (state.ciphersSolved || 0) >= 10,
    rewardAura: 800,
    rewardGems: 15
  },

  // Math & STEM Mastery
  {
    id: 'prime_pioneer',
    title: 'Prime Pioneer',
    icon: '🧱',
    category: 'MATH',
    description: 'Master Prime Numbers and Factor Trees',
    requirement: (state) => (state.primeMastery || false),
    rewardAura: 1000,
    rewardGems: 20
  },
  {
    id: 'fraction_ninja',
    title: 'Fraction Ninja',
    icon: '🍕',
    category: 'MATH',
    description: 'Complete all 5 Fraction Nether worlds',
    requirement: (state) => (state.world2Complete || false),
    rewardAura: 1500,
    rewardGems: 30
  },
  {
    id: 'science_curator',
    title: 'Science Curator',
    icon: '🔬',
    category: 'SCIENCE',
    description: 'Log 8 discoveries in the Science Journal',
    requirement: (state) => (state.journalEntries?.length || 0) >= 8,
    rewardAura: 1200,
    rewardGems: 25
  }
];

if (typeof window !== 'undefined') {
  window.ZaynBadges = ZaynBadges;
}
