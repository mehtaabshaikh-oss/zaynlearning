/**
 * SCIENCE LAB DATA & REGISTRIES
 * Core data models for Zayn Science Lab:
 * - Scientist Progression Ranks
 * - Periodic Table Elements & Atom Viewer Specs
 * - Human Skeletal Anatomy & Joints
 * - States of Matter Physics Rules
 * - Foundational Scientific Terminology & Journal Catalog
 */

const SCIENTIST_RANKS = [
  { level: 1, title: "Curious Explorer", icon: "🔬", minXP: 0 },
  { level: 2, title: "Lab Assistant", icon: "🧪", minXP: 200 },
  { level: 3, title: "Junior Scientist", icon: "🥼", minXP: 500 },
  { level: 4, title: "Staff Scientist", icon: "🔭", minXP: 1000 },
  { level: 5, title: "Senior Scientist", icon: "🧬", minXP: 1800 },
  { level: 6, title: "Master Scientist", icon: "⚛️", minXP: 3000 },
  { level: 7, title: "Science Legend", icon: "🌟", minXP: 5000 }
];

const PERIODIC_ELEMENTS = [
  { num: 1, sym: "H", name: "Hydrogen", mass: 1.008, group: "nonmetal", family: "Reactive Nonmetal", protons: 1, electrons: 1, shells: [1], uses: "Rocket fuel & water molecules (H2O)", fact: "Hydrogen is the most abundant element in the entire universe!" },
  { num: 2, sym: "He", name: "Helium", mass: 4.003, group: "noble", family: "Noble Gas", protons: 2, electrons: 2, shells: [2], uses: "Floating balloons & cooling MRI magnets", fact: "Helium never reacts with other elements because its outer electron shell is full." },
  { num: 3, sym: "Li", name: "Lithium", mass: 6.94, group: "alkali", family: "Alkali Metal", protons: 3, electrons: 3, shells: [2, 1], uses: "Rechargeable phone & EV batteries", fact: "Lithium is so light that it can actually float on water!" },
  { num: 4, sym: "Be", name: "Beryllium", mass: 9.012, group: "alkaline", family: "Alkaline Earth", protons: 4, electrons: 4, shells: [2, 2], uses: "James Webb Space Telescope mirrors", fact: "Emerald gemstones get their crystal structure with help from Beryllium." },
  { num: 5, sym: "B", name: "Boron", mass: 10.81, group: "metalloid", family: "Metalloid", protons: 5, electrons: 5, shells: [2, 3], uses: "Heat-resistant Pyrex glassware & silly putty", fact: "Boron can behave like both a metal and a nonmetal." },
  { num: 6, sym: "C", name: "Carbon", mass: 12.011, group: "nonmetal", family: "Reactive Nonmetal", protons: 6, electrons: 6, shells: [2, 4], uses: "Diamonds, graphite pencils & all living organisms", fact: "Every living creature on Earth is built with carbon chemistry!" },
  { num: 7, sym: "N", name: "Nitrogen", mass: 14.007, group: "nonmetal", family: "Reactive Nonmetal", protons: 7, electrons: 7, shells: [2, 5], uses: "Plant fertilizer & freezing liquid nitrogen", fact: "Nitrogen makes up 78% of the air you are breathing right now." },
  { num: 8, sym: "O", name: "Oxygen", mass: 15.999, group: "nonmetal", family: "Reactive Nonmetal", protons: 8, electrons: 8, shells: [2, 6], uses: "Respiration for animals & rocket oxidizers", fact: "Oxygen atoms bond in pairs (O2) for the air we breathe and triples (O3) to form the ozone layer." },
  { num: 9, sym: "F", name: "Fluorine", mass: 18.998, group: "halogen", family: "Halogen", protons: 9, electrons: 9, shells: [2, 7], uses: "Toothpaste cavity protection & Teflon coating", fact: "Fluorine is the most chemically reactive nonmetal in existence." },
  { num: 10, sym: "Ne", name: "Neon", mass: 20.18, group: "noble", family: "Noble Gas", protons: 10, electrons: 10, shells: [2, 8], uses: "Glowing neon city signs & high-voltage indicators", fact: "Neon glows with a brilliant reddish-orange light when electricity passes through it." },
  { num: 11, sym: "Na", name: "Sodium", mass: 22.99, group: "alkali", family: "Alkali Metal", protons: 11, electrons: 11, shells: [2, 8, 1], uses: "Table salt (NaCl) & street lamps", fact: "Pure sodium is so soft you can cut it with a butter knife, but it fizzes violently in water!" },
  { num: 12, sym: "Mg", name: "Magnesium", mass: 24.305, group: "alkaline", family: "Alkaline Earth", protons: 12, electrons: 12, shells: [2, 8, 2], uses: "Fireworks flares & lightweight racecar alloys", fact: "Magnesium burns with an intense blinding white light." },
  { num: 13, sym: "Al", name: "Aluminum", mass: 26.982, group: "post_transition", family: "Post-Transition Metal", protons: 13, electrons: 13, shells: [2, 8, 3], uses: "Soda cans, airplanes & kitchen foil", fact: "Aluminum is 100% infinitely recyclable without losing its strength." },
  { num: 14, sym: "Si", name: "Silicon", mass: 28.085, group: "metalloid", family: "Metalloid", protons: 14, electrons: 14, shells: [2, 8, 4], uses: "Computer microchips, solar panels & glass sand", fact: "Silicon powers every computer, iPad, and smartphone on Earth!" },
  { num: 15, sym: "P", name: "Phosphorus", mass: 30.974, group: "nonmetal", family: "Reactive Nonmetal", protons: 15, electrons: 15, shells: [2, 8, 5], uses: "Match heads, DNA backbone & bone mineral", fact: "White phosphorus was the first element discovered since ancient times." },
  { num: 16, sym: "S", name: "Sulfur", mass: 32.06, group: "nonmetal", family: "Reactive Nonmetal", protons: 16, electrons: 16, shells: [2, 8, 6], uses: "Gunpowder, vulcanized rubber tires & matches", fact: "Sulfur creates the yellow crystals and smell found around active volcanoes." },
  { num: 17, sym: "Cl", name: "Chlorine", mass: 35.45, group: "halogen", family: "Halogen", protons: 17, electrons: 17, shells: [2, 8, 7], uses: "Purifying drinking water & swimming pool sanitizers", fact: "When deadly chlorine gas bonds with reactive sodium metal, it makes tasty table salt!" },
  { num: 18, sym: "Ar", name: "Argon", mass: 39.948, group: "noble", family: "Noble Gas", protons: 18, electrons: 18, shells: [2, 8, 8], uses: "Double-pane insulated windows & incandescent bulbs", fact: "Argon's name comes from the Greek word for 'lazy' because it doesn't react." },
  { num: 19, sym: "K", name: "Potassium", mass: 39.098, group: "alkali", family: "Alkali Metal", protons: 19, electrons: 19, shells: [2, 8, 8, 1], uses: "Bananas, nerve impulses & plant fertilizers", fact: "Potassium is essential for your heartbeat and muscular reflexes." },
  { num: 20, sym: "Ca", name: "Calcium", mass: 40.078, group: "alkaline", family: "Alkaline Earth", protons: 20, electrons: 20, shells: [2, 8, 8, 2], uses: "Strong bones, teeth, concrete & chalk", fact: "99% of all calcium in the human body is stored in your bones and teeth." },
  { num: 26, sym: "Fe", name: "Iron", mass: 55.845, group: "transition", family: "Transition Metal", protons: 26, electrons: 26, shells: [2, 8, 14, 2], uses: "Steel skyscrapers, bridges & red blood hemoglobin", fact: "Iron in your red blood cells is what carries oxygen to your muscles!" },
  { num: 29, sym: "Cu", name: "Copper", mass: 63.546, group: "transition", family: "Transition Metal", protons: 29, electrons: 29, shells: [2, 8, 18, 1], uses: "Electrical wiring, plumbing pipes & brass instruments", fact: "Copper was the very first metal ever smelted and worked by humans." },
  { num: 30, sym: "Zn", name: "Zinc", mass: 65.38, group: "transition", family: "Transition Metal", protons: 30, electrons: 30, shells: [2, 8, 18, 2], uses: "Galvanizing steel against rust & sunscreen", fact: "Zinc boosts your immune system and helps wounds heal faster." },
  { num: 47, sym: "Ag", name: "Silver", mass: 107.87, group: "transition", family: "Transition Metal", protons: 47, electrons: 47, shells: [2, 8, 18, 18, 1], uses: "Mirrors, jewelry & the best electrical conductor", fact: "Silver has the highest electrical and thermal conductivity of all known metals." },
  { num: 79, sym: "Au", name: "Gold", mass: 196.97, group: "transition", family: "Transition Metal", protons: 79, electrons: 79, shells: [2, 8, 18, 32, 18, 1], uses: "Astronaut helmet visors, electronics & jewelry", fact: "Gold never rusts or tarnishes, even after thousands of years buried underwater!" }
];

const SKELETON_BONES = [
  { 
    id: "skull", 
    name: "Skull (Cranium)", 
    category: "Head", 
    targetX: 200, 
    targetY: 50, 
    width: 60, 
    height: 60, 
    boneType: "skull",
    desc: "The hard bony helmet that protects your brain, eyes, and inner ears.", 
    fact: "Your skull is actually made of 22 interlocking cranial and facial bones!", 
    joint: "Fixed (Fibrous Sutures)" 
  },
  { 
    id: "spine", 
    name: "Spine (Vertebrae)", 
    category: "Torso", 
    targetX: 200, 
    targetY: 140, 
    width: 30, 
    height: 90, 
    boneType: "spine",
    desc: "The flexible central column that supports your body and protects the spinal cord.", 
    fact: "You have 33 vertebrae in your spine that act like shock absorbers.", 
    joint: "Cartilaginous (Slightly Movable)" 
  },
  { 
    id: "ribs", 
    name: "Rib Cage & Sternum", 
    category: "Torso", 
    targetX: 200, 
    targetY: 120, 
    width: 80, 
    height: 70, 
    boneType: "ribs",
    desc: "The protective cage of 12 pairs of curved bones shielding your heart and lungs.", 
    fact: "Your ribs expand and contract every time you breathe in oxygen.", 
    joint: "Cartilage Joints" 
  },
  { 
    id: "pelvis", 
    name: "Pelvis (Hip Girdle)", 
    category: "Hips", 
    targetX: 200, 
    targetY: 195, 
    width: 80, 
    height: 50, 
    boneType: "pelvis",
    desc: "The basin-shaped bone connecting your spine to your legs and supporting internal organs.", 
    fact: "The pelvis absorbs the impact forces when you run, jump, or land.", 
    joint: "Ball-and-Socket (Hip Joint)" 
  },
  { 
    id: "humerus_l", 
    name: "Left Humerus (Upper Arm)", 
    category: "Arm", 
    targetX: 140, 
    targetY: 125, 
    width: 25, 
    height: 55, 
    boneType: "humerus",
    side: "left",
    desc: "The strong upper arm bone connecting your shoulder blade to your elbow joint.", 
    fact: "It's called the humerus, which is why hitting your elbow nerve is the 'funny bone'!", 
    joint: "Ball-and-Socket (Shoulder) / Hinge (Elbow)" 
  },
  { 
    id: "humerus_r", 
    name: "Right Humerus (Upper Arm)", 
    category: "Arm", 
    targetX: 260, 
    targetY: 125, 
    width: 25, 
    height: 55, 
    boneType: "humerus",
    side: "right",
    desc: "The upper arm bone connecting the right shoulder to the elbow.", 
    fact: "Works together with the biceps and triceps muscles to lift heavy objects.", 
    joint: "Ball-and-Socket (Shoulder) / Hinge (Elbow)" 
  },
  { 
    id: "forearm_l", 
    name: "Left Radius & Ulna", 
    category: "Arm", 
    targetX: 125, 
    targetY: 185, 
    width: 25, 
    height: 55, 
    boneType: "forearm",
    side: "left",
    desc: "The two parallel forearm bones that twist over each other when you rotate your hand.", 
    fact: "The radius is on the thumb side; the ulna is on the pinky side.", 
    joint: "Pivot Joint (Allows 180° wrist rotation)" 
  },
  { 
    id: "forearm_r", 
    name: "Right Radius & Ulna", 
    category: "Arm", 
    targetX: 275, 
    targetY: 185, 
    width: 25, 
    height: 55, 
    boneType: "forearm",
    side: "right",
    desc: "The parallel forearm bones that allow you to flip your right palm over.", 
    fact: "Pivot joint allows complete 180-degree palm flipping without moving your shoulder.", 
    joint: "Pivot Joint (Forearm Rotation)" 
  },
  { 
    id: "femur_l", 
    name: "Left Femur (Thigh Bone)", 
    category: "Leg", 
    targetX: 175, 
    targetY: 260, 
    width: 30, 
    height: 70, 
    boneType: "femur",
    side: "left",
    desc: "The longest, heaviest, and strongest bone in the entire human body!", 
    fact: "The femur can support up to 30 times the weight of an adult human body.", 
    joint: "Ball-and-Socket (Hip) / Hinge (Knee)" 
  },
  { 
    id: "femur_r", 
    name: "Right Femur (Thigh Bone)", 
    category: "Leg", 
    targetX: 225, 
    targetY: 260, 
    width: 30, 
    height: 70, 
    boneType: "femur",
    side: "right",
    desc: "Connects the right hip socket to the right knee joint.", 
    fact: "Carries tremendous force with every stride when running or jumping.", 
    joint: "Ball-and-Socket (Hip) / Hinge (Knee)" 
  },
  { 
    id: "tibia_l", 
    name: "Left Tibia & Fibula", 
    category: "Leg", 
    targetX: 175, 
    targetY: 340, 
    width: 30, 
    height: 70, 
    boneType: "tibia",
    side: "left",
    desc: "The thick tibia (shinbone) bears body weight while the slender fibula stabilizes the ankle.", 
    fact: "The tibia is the second longest bone in the body after the femur.", 
    joint: "Hinge (Knee) / Gliding (Ankle)" 
  },
  { 
    id: "tibia_r", 
    name: "Right Tibia & Fibula", 
    category: "Leg", 
    targetX: 225, 
    targetY: 340, 
    width: 30, 
    height: 70, 
    boneType: "tibia",
    side: "right",
    desc: "The lower leg shin & calf bone assembly connecting knee to ankle.", 
    fact: "Provides the primary anchor leverage for calf jumping muscles.", 
    joint: "Hinge (Knee) / Gliding (Ankle)" 
  }
];

const STATES_OF_MATTER_DATA = {
  solid: {
    name: "Solid (Ice)",
    icon: "🧊",
    tempRange: [-50, 0],
    particleSpeed: 0.4,
    spacing: 24,
    vibration: true,
    desc: "Molecules are locked in an organized crystalline lattice. They vibrate in place but cannot flow past each other."
  },
  liquid: {
    name: "Liquid (Water)",
    icon: "💧",
    tempRange: [0, 100],
    particleSpeed: 2.2,
    spacing: 32,
    vibration: false,
    desc: "Molecules have enough kinetic energy to break free of fixed positions and slide smoothly over each other."
  },
  gas: {
    name: "Gas (Water Vapor)",
    icon: "☁️",
    tempRange: [100, 150],
    particleSpeed: 5.5,
    spacing: 65,
    vibration: false,
    desc: "Molecules move at high speed, bouncing vigorously off walls and flying far apart into empty space."
  },
  transitions: [
    { from: "solid", to: "liquid", name: "Melting", temp: 0, desc: "Heat energy breaks crystalline bonds, turning solid ice into fluid liquid water." },
    { from: "liquid", to: "solid", name: "Freezing", temp: 0, desc: "Removing heat slows particles down until they lock into fixed solid crystals." },
    { from: "liquid", to: "gas", name: "Evaporation / Boiling", temp: 100, desc: "High heat gives surface molecules enough energy to escape into the air as gas." },
    { from: "gas", to: "liquid", name: "Condensation", temp: 100, desc: "Cooling vapor particles down causes them to clump together back into water droplets." }
  ]
};

const SCIENCE_TERMINOLOGY_CATALOG = [
  { id: "term_evaporation", name: "Evaporation", category: "Physics", icon: "♨️", simpleDef: "When liquid water heats up and changes into invisible gas (water vapor).", whyItHappens: "Thermal heat increases the kinetic energy of water molecules until they escape into the air.", fact: "Puddles dry up on sunny days because solar heat drives evaporation!" },
  { id: "term_condensation", name: "Condensation", category: "Physics", icon: "💧", simpleDef: "When gas cools down and turns back into liquid droplets.", whyItHappens: "Cooling air removes kinetic energy, making water vapor molecules clump together.", fact: "Dew on morning grass and water droplets on a cold soda can are caused by condensation!" },
  { id: "term_melting", name: "Melting", category: "Physics", icon: "🧊", simpleDef: "When a solid absorbs heat and turns into a liquid.", whyItHappens: "Heat energy overcomes the rigid bonds holding solid crystals in place.", fact: "Pure water ice melts at exactly 0°C (32°F) under normal atmospheric pressure." },
  { id: "term_freezing", name: "Freezing", category: "Physics", icon: "❄️", simpleDef: "When liquid cools down and turns into a solid.", whyItHappens: "Particles slow down as heat is lost until molecular forces lock them in position.", fact: "Water is one of the only liquids that actually expands when it freezes!" },
  { id: "term_femur", name: "Femur", category: "Biology", icon: "🦴", simpleDef: "The strong thigh bone connecting your hip to your knee.", whyItHappens: "Built with dense cortical bone matrix to bear the entire weight of your body while walking.", fact: "The femur is the longest, heaviest, and strongest bone in the human body!" },
  { id: "term_cranium", name: "Skull (Cranium)", category: "Biology", icon: "💀", simpleDef: "The protective bone helmet encasing your brain.", whyItHappens: "Interlocking bone plates absorb impact shocks to protect delicate brain tissue.", fact: "Your skull has 22 bones held together by fixed joints called sutures." },
  { id: "term_atom", name: "Atom", category: "Chemistry", icon: "⚛️", simpleDef: "The microscopic building block that makes up all matter in the universe.", whyItHappens: "Composed of a central nucleus of protons and neutrons orbited by electrons.", fact: "Over 5 million hydrogen atoms could fit across the period at the end of this sentence!" },
  { id: "term_proton", name: "Proton", category: "Chemistry", icon: "➕", simpleDef: "A positively charged subatomic particle in the nucleus of an atom.", whyItHappens: "The number of protons (atomic number) defines exactly which chemical element it is.", fact: "If an atom loses or gains a proton, it transforms into a completely different element!" },
  { id: "term_electron", name: "Electron", category: "Chemistry", icon: "⚡", simpleDef: "A tiny negatively charged particle that orbits the nucleus in energy shells.", whyItHappens: "Electrons form chemical bonds by being shared or transferred between atoms.", fact: "Electrons orbit the nucleus at nearly the speed of light!" },
  { id: "term_noble_gas", name: "Noble Gas", category: "Chemistry", icon: "🎈", simpleDef: "Elements with completely full outer electron shells that rarely react with other atoms.", whyItHappens: "Because their electron shells are full, they are chemically stable and unreactive.", fact: "Helium, Neon, Argon, Krypton, Xenon, and Radon are all Noble Gases!" },
  { id: "term_photosynthesis", name: "Photosynthesis", category: "Biology", icon: "🌱", simpleDef: "The process plants use to convert sunlight, water, and CO2 into sugar and oxygen.", whyItHappens: "Chlorophyll in chloroplasts absorbs light energy to power chemical synthesis.", fact: "Photosynthesis in green plants produces the oxygen in our atmosphere!" },
  { id: "term_density", name: "Density", category: "Physics", icon: "⚖️", simpleDef: "How tightly packed matter is inside a given space (Mass ÷ Volume).", whyItHappens: "Heavy molecules closely packed produce high density; loose molecules produce low density.", fact: "An object floats in water if its density is less than 1.0 gram per milliliter!" }
];

window.SCIENTIST_RANKS = SCIENTIST_RANKS;
window.PERIODIC_ELEMENTS = PERIODIC_ELEMENTS;
window.SKELETON_BONES = SKELETON_BONES;
window.STATES_OF_MATTER_DATA = STATES_OF_MATTER_DATA;
window.SCIENCE_TERMINOLOGY_CATALOG = SCIENCE_TERMINOLOGY_CATALOG;
