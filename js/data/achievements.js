/**
 * Aura Ranks, Milestones and Trophies
 */

const AURA_RANKS = [
  { minAura: 0, title: "Ohio Math Rookie", icon: "🌱" },
  { minAura: 500, title: "Skibidi Calculator", icon: "📱" },
  { minAura: 1500, title: "Lego Master Builder", icon: "🧱" },
  { minAura: 3000, title: "Netherite Math Miner", icon: "⛏️" },
  { minAura: 5000, title: "Mewing Math Prodigy", icon: "🗿" },
  { minAura: 8000, title: "Drift Phonk Speedster", icon: "🏎️" },
  { minAura: 12000, title: "100k Aura Sigma Master", icon: "⚡" },
  { minAura: 20000, title: "Top 1% Grandmaster GigaChad", icon: "👑" },
  { minAura: 35000, title: "Absolute Math Cinema", icon: "🎬" }
];

const ACHIEVEMENTS_DATA = [
  {
    id: "first_blood",
    name: "First Calculation",
    desc: "Complete your first lesson node",
    icon: "🎯",
    unlocked: false,
    xpReward: 50
  },
  {
    id: "phonk_drifter",
    name: "Speed Demon",
    desc: "Score over 1,500 Aura in Phonk Drift 60s Mode",
    icon: "🏎️",
    unlocked: false,
    xpReward: 150
  },
  {
    id: "logic_master",
    name: "The 1% Club Finisher",
    desc: "Solve the legendary 1% logic riddle",
    icon: "🧠",
    unlocked: false,
    xpReward: 300
  },
  {
    id: "boss_slayer",
    name: "Boss Conqueror",
    desc: "Defeat your first world boss",
    icon: "⚔️",
    unlocked: false,
    xpReward: 200
  },
  {
    id: "fashion_sigma",
    name: "Drip Sigma",
    desc: "Equip 3 custom accessories in the Locker",
    icon: "🕶️",
    unlocked: false,
    xpReward: 100
  },
  {
    id: "code_cracker",
    name: "Code Cracker",
    desc: "Crack open 5 secure vaults in Code Breaker",
    icon: "🔐",
    unlocked: false,
    xpReward: 250
  },
  {
    id: "angle_ace",
    name: "Angle Ace",
    desc: "Hit 10 targets within 3 degrees in Angle Cannon",
    icon: "🎯",
    unlocked: false,
    xpReward: 250
  },
  {
    id: "rover_commander",
    name: "Rover Commander",
    desc: "Program 5 autonomous rover rescue missions",
    icon: "🛰️",
    unlocked: false,
    xpReward: 300
  },
  {
    id: "magnetic_master",
    name: "Magnetic Master",
    desc: "Collect and classify 10 magnetic materials",
    icon: "🧲",
    unlocked: false,
    xpReward: 200
  },
  {
    id: "circuit_wizard",
    name: "Circuit Wizard",
    desc: "Build and troubleshoot 10 working circuits",
    icon: "⚡",
    unlocked: false,
    xpReward: 250
  },
  {
    id: "space_pilot",
    name: "Space Pilot",
    desc: "Land spacecraft on 3 planets with variable gravity",
    icon: "🚀",
    unlocked: false,
    xpReward: 300
  },
  {
    id: "junior_engineer",
    name: "Junior Engineer",
    desc: "Build a stable bridge supporting heavy vehicle loads",
    icon: "🏗️",
    unlocked: false,
    xpReward: 250
  },
  {
    id: "gear_genius",
    name: "Gear Genius",
    desc: "Synchronize gear ratios to repair the factory",
    icon: "⚙️",
    unlocked: false,
    xpReward: 250
  }
];
