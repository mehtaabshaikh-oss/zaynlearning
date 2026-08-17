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
  },
  {
    id: "ach_habitat_hero",
    name: "Habitat Hero",
    desc: "Master all introductory world habitats",
    icon: "🌎",
    unlocked: false,
    xpReward: 200
  },
  {
    id: "ach_survival_scientist",
    name: "Survival Scientist",
    desc: "Master structural & behavioral adaptations",
    icon: "🐾",
    unlocked: false,
    xpReward: 200
  },
  {
    id: "ach_ecosystem_expert",
    name: "Ecosystem Expert",
    desc: "Master living & nonliving ecosystem interactions",
    icon: "🌱",
    unlocked: false,
    xpReward: 200
  },
  {
    id: "ach_fossil_finder",
    name: "Fossil Finder",
    desc: "Master fossils and extinction concepts",
    icon: "🦖",
    unlocked: false,
    xpReward: 200
  },
  {
    id: "ach_wildlife_protector",
    name: "Wildlife Protector",
    desc: "Master endangered & invasive species concepts",
    icon: "🦁",
    unlocked: false,
    xpReward: 200
  },
  {
    id: "ach_multiplication_master",
    name: "Multiplication Language Master",
    desc: "Master factors, products, and array rotation",
    icon: "✖️",
    unlocked: false,
    xpReward: 200
  },
  {
    id: "ach_division_master",
    name: "Division Master",
    desc: "Master division sharing vs grouping and quotients",
    icon: "➗",
    unlocked: false,
    xpReward: 200
  },
  {
    id: "ach_time_keeper",
    name: "Time Keeper",
    desc: "Master analog clock telling time to 5 minutes",
    icon: "🕐",
    unlocked: false,
    xpReward: 200
  },
  {
    id: "ach_shape_spotter",
    name: "Shape Spotter",
    desc: "Master 2D polygons, vertices, and rhombuses",
    icon: "🔷",
    unlocked: false,
    xpReward: 200
  },
  {
    id: "ach_3d_master",
    name: "3D Master",
    desc: "Master 3D polyhedra, faces, edges, and vertices",
    icon: "🧊",
    unlocked: false,
    xpReward: 200
  }
];
