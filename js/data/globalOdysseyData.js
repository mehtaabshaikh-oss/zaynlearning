/**
 * Global Odyssey Scenario Quests Data
 * Multi-disciplinary adventures combining Geography, Science, Math, History, and World Culture.
 * Note: Option strings are kept clean and challenging without giveaways or parenthetical hints.
 */

const GLOBAL_ODYSSEY_QUESTS = [
  // =========================================================================
  // QUEST 1: THE STRANDED TRAVELER (Frankfurt -> Tokyo -> Home)
  // =========================================================================
  {
    id: "quest_frankfurt_tokyo",
    title: "The Stranded Traveler",
    subtitle: "From Frankfurt Airport to Tokyo & Home",
    icon: "✈️🇩🇪🇯🇵",
    tag: "GEOGRAPHY • SCIENCE • MATH • HISTORY",
    difficulty: "Medium",
    estimatedMins: 6,
    xpReward: 500,
    auraReward: 200,
    passportStamp: {
      country: "Germany & Japan",
      code: "FRA-HND",
      icon: "🏯✈️",
      dateUnlocked: null
    },
    cards: [
      {
        step: 1,
        location: "Frankfurt Airport Terminal 1",
        countryBadge: "🇩🇪 GERMANY",
        bgIcon: "🛫",
        narrative: "Zayn woke up in a row of airport seats after nodding off during a layover. He rushed to the gate, but the plane was gone! The giant departure board above flashes: 'WILLKOMMEN AM FLUGHAFEN FRANKFURT'.",
        dilemma: "Zayn needs to locate the nearest information desk to find out what country he is in!",
        question: "What European country is the city of Frankfurt located in?",
        options: ["Germany", "France", "Switzerland", "Austria"],
        answer: 0,
        explanation: "Frankfurt is a major financial hub and home to the busiest airport in Germany!",
        itemAwarded: "🥨 Frankfurt Warm Pretzel"
      },
      {
        step: 2,
        location: "International Re-Booking Desk",
        countryBadge: "🇯🇵 JAPAN BOUND",
        bgIcon: "💴",
        narrative: "The re-booking agent hands Zayn a standby ticket on a flight to Tokyo! After an 11-hour flight over Eurasia, Zayn lands at Haneda Airport. He is hungry and wants to buy a rice ball from the vending machine.",
        dilemma: "Zayn needs to insert the correct local currency into the ticket and vending machines.",
        question: "What is the official currency used in Japan?",
        options: ["Yen", "Euro", "Yuan", "Won"],
        answer: 0,
        explanation: "The official currency of Japan is the Japanese Yen (JPY / ¥)!",
        itemAwarded: "🎫 Japan Rail & Vending Pass"
      },
      {
        step: 3,
        location: "Tokyo Monorail Station",
        countryBadge: "🇯🇵 TOKYO, JAPAN",
        bgIcon: "🗣️",
        narrative: "A friendly train conductor bows politely and asks: 'Kore wa doko e ikimasu ka? Otasuke shimashou ka?' (これ は どこ へ 行きます か？). Zayn tries to decipher the language to use his translation device.",
        dilemma: "Zayn needs to set his digital translation communicator to the correct native language.",
        question: "What is the official language spoken natively in Japan?",
        options: ["Japanese", "Mandarin", "Tagalog", "Korean"],
        answer: 0,
        explanation: "Japanese (Nihongo) is the primary language spoken across Japan!",
        itemAwarded: "📱 Polyglot Translator Device"
      },
      {
        step: 4,
        location: "Captain's Hangar • Haneda Airport",
        countryBadge: "🚩 THE 5-KEY PILOT GAUNTLET",
        bgIcon: "👨‍✈️",
        narrative: "Zayn meets Captain Hiroshi, a cargo pilot preparing a direct charter flight home to India! The Captain smiles: 'I can fly you straight home right now, but my navigation computer is locked behind 5 security checkpoints! Let's solve them together!'",
        dilemma: "Checkpoint 1: Pilot displays a national flag on the flight screen featuring a green background, a yellow rhombus, and a starry blue globe.",
        question: "Which South American nation has this green, yellow, and starry blue flag?",
        options: ["Brazil", "Argentina", "Colombia", "Mexico"],
        answer: 0,
        explanation: "Brazil's flag features a green field with a yellow rhombus and 27 stars representing its states!",
        itemAwarded: "🔑 Navigation Key 1: Brazil Coordinates"
      },
      {
        step: 5,
        location: "Cockpit Navigation Terminal",
        countryBadge: "🧪 CHEMISTRY & ELEMENTS",
        bgIcon: "⚗️",
        narrative: "Captain Hiroshi punches in the Brazil coordinates. The cockpit warning buzzer sounds: 'Engine coolant requires pure atomic element with Periodic Table symbol Ag!'",
        dilemma: "Checkpoint 2: Identify the chemical element with the chemical symbol 'Ag'.",
        question: "Which shiny metallic element is represented by the symbol 'Ag' on the Periodic Table?",
        options: ["Silver", "Gold", "Aluminum", "Argon"],
        answer: 0,
        explanation: "Ag comes from the Latin word 'Argentum', which means Silver!",
        itemAwarded: "🔑 Navigation Key 2: Silver Coolant Capsule"
      },
      {
        step: 6,
        location: "Mid-Atlantic Route Plotter",
        countryBadge: "🏛️ WORLD CAPITALS",
        bgIcon: "🏝️",
        narrative: "The flight computer requires a navigational waypoint over an island nation in the Gulf of Guinea off the west coast of Central Africa: São Tomé and Príncipe.",
        dilemma: "Checkpoint 3: Enter the capital city of São Tomé and Príncipe into the autopilot.",
        question: "What is the capital city of the African island nation of São Tomé and Príncipe?",
        options: ["São Tomé", "Nairobi", "Praia", "Dakar"],
        answer: 0,
        explanation: "The capital and largest city of São Tomé and Príncipe is São Tomé!",
        itemAwarded: "🔑 Navigation Key 3: Island Waypoint"
      },
      {
        step: 7,
        location: "Altitude & Thrust Computer",
        countryBadge: "🔢 EXPONENTIAL MATH POWERS",
        bgIcon: "📐",
        narrative: "The turbojet thrust computer needs a numerical cube power calculation to calibrate the climb rate angle: 'Calculate 3 cubed (3³)'.",
        dilemma: "Checkpoint 4: Solve 3³ = 3 × 3 × 3.",
        question: "What is the value of 3 cubed (3³)?",
        options: ["27", "9", "18", "81"],
        answer: 0,
        explanation: "3 cubed means 3 × 3 × 3 = 9 × 3 = 27!",
        itemAwarded: "🔑 Navigation Key 4: Thrust Vector 27"
      },
      {
        step: 8,
        location: "Final Clearance Radar",
        countryBadge: "🦅 WORLD HISTORY & PRESIDENTS",
        bgIcon: "🏆",
        narrative: "Final Checkpoint! The transponder requires the code named after the 5th President of the United States, famous for his historic 1823 foreign policy doctrine.",
        dilemma: "Checkpoint 5: Identify the 5th President of the United States.",
        question: "Who was the 5th President of the United States?",
        options: ["James Monroe", "George Washington", "Thomas Jefferson", "Abraham Lincoln"],
        answer: 0,
        explanation: "James Monroe served as the 5th US President from 1817 to 1825 and authored the Monroe Doctrine!",
        itemAwarded: "🏆 Golden Compass & Home Landing Clearance"
      }
    ]
  },

  // =========================================================================
  // QUEST 2: THE NILE & PYRAMID EXPEDITION (Cairo -> Giza -> Tomb Vault)
  // =========================================================================
  {
    id: "quest_egyptian_pyramids",
    title: "The Nile & Pyramid Mystery",
    subtitle: "Ancient Wonders, Elements & Geometry",
    icon: "🐪🇪🇬🏺",
    tag: "HISTORY • GEOGRAPHY • MATH • SCIENCE",
    difficulty: "Medium",
    estimatedMins: 5,
    xpReward: 450,
    auraReward: 180,
    passportStamp: {
      country: "Egypt",
      code: "CAI-GZ",
      icon: "🏜️🗿",
      dateUnlocked: null
    },
    cards: [
      {
        step: 1,
        location: "Khan el-Khalili Bazaar • Cairo",
        countryBadge: "🇪🇬 EGYPT",
        bgIcon: "💱",
        narrative: "Zayn lands in Cairo to investigate ancient architectural secrets. At the bustling market near Al-Azhar, he needs to exchange money for a riverboat ticket up the Nile.",
        dilemma: "Zayn needs to identify the official currency of Egypt.",
        question: "What is the official currency of Egypt?",
        options: ["Egyptian Pound", "Euro", "Egyptian Dinar", "Rial"],
        answer: 0,
        explanation: "Egypt uses the Egyptian Pound (EGP / £E) as its national currency!",
        itemAwarded: "🏺 Ancient Papyrus Map"
      },
      {
        step: 2,
        location: "Nile River Felucca Boat",
        countryBadge: "🌊 WORLD RIVERS",
        bgIcon: "⛵",
        narrative: "Sailing southward against the gentle current, Zayn's boat captain points to the water: 'This river has sustained civilization for over 5,000 years!'",
        dilemma: "Identify the geographical record of the Nile River.",
        question: "Which river is widely recognized as the longest river in the world (over 4,100 miles)?",
        options: ["Nile River", "Amazon River", "Mississippi River", "Yangtze River"],
        answer: 0,
        explanation: "The Nile River stretches over 4,132 miles (6,650 km) through northeastern Africa!",
        itemAwarded: "🧭 Brass River Compass"
      },
      {
        step: 3,
        location: "The Great Pyramid of Giza",
        countryBadge: "📐 ANCIENT ARCHITECTURE",
        bgIcon: "🔺",
        narrative: "Zayn arrives at the foot of the Great Pyramid of Khufu. The stone entrance archway reveals a measurement inscription.",
        dilemma: "Decode how long the Great Pyramid remained the tallest building on Earth.",
        question: "For how many years was the Great Pyramid of Giza the tallest human-made structure in the world?",
        options: ["Over 3,800 years", "Only 50 years", "200 years", "10,000 years"],
        answer: 0,
        explanation: "Built around 2560 BC, the Great Pyramid remained the tallest building until Lincoln Cathedral was built in 1311 AD!",
        itemAwarded: "🔑 Scarab Stone Key"
      },
      {
        step: 4,
        location: "Alchemist's Chamber Inside Pyramid",
        countryBadge: "🧪 CHEMISTRY & METALLURGY",
        bgIcon: "⚗️",
        narrative: "Inside the chamber, an ancient inscription shows bronze tools made of copper mixed with tin. The copper vessel is marked with atomic symbol 'Cu'.",
        dilemma: "Identify the element represented by chemical symbol 'Cu'.",
        question: "What chemical element has the atomic symbol 'Cu' on the Periodic Table?",
        options: ["Copper", "Cobalt", "Calcium", "Curium"],
        answer: 0,
        explanation: "Cu stands for Copper (from Latin Cuprum), one of the earliest metals smelted and used by human civilizations!",
        itemAwarded: "✨ Pure Copper Chisel"
      },
      {
        step: 5,
        location: "Secret Pharaoh Vault Door",
        countryBadge: "🔢 EXPONENTIAL POWERS",
        bgIcon: "🏆",
        narrative: "The final stone door requires solving a cube number to open the locking counterweight: 'Calculate 4 cubed (4³)'.",
        dilemma: "Solve 4³ = 4 × 4 × 4.",
        question: "What is 4 cubed (4 × 4 × 4)?",
        options: ["64", "16", "32", "128"],
        answer: 0,
        explanation: "4 × 4 = 16, and 16 × 4 = 64!",
        itemAwarded: "🏆 Golden Ankh of Alexandria"
      }
    ]
  },

  // =========================================================================
  // QUEST 3: THE AMAZON RAINFOREST MYSTERY (Manaus -> Canopy -> Incan Temple)
  // =========================================================================
  {
    id: "quest_amazon_rainforest",
    title: "The Amazon Canopy Mystery",
    subtitle: "Ecosystems, Biology & South America",
    icon: "🦜🇧🇷🌿",
    tag: "BIOLOGY • GEOGRAPHY • MATH • HISTORY",
    difficulty: "Medium",
    estimatedMins: 6,
    xpReward: 480,
    auraReward: 190,
    passportStamp: {
      country: "Brazil",
      code: "BRA-MAO",
      icon: "🐆🌴",
      dateUnlocked: null
    },
    cards: [
      {
        step: 1,
        location: "Port of Manaus • Rio Negro",
        countryBadge: "🇧🇷 BRAZIL",
        bgIcon: "🚢",
        narrative: "Zayn lands in Manaus, the floating city in the heart of the Amazon basin. He buys fresh tropical açaí and supplies for an expedition into the jungle.",
        dilemma: "Identify the official currency of Brazil.",
        question: "What is the official currency used in Brazil?",
        options: ["Real", "Peso", "Euro", "Dollar"],
        answer: 0,
        explanation: "Brazil uses the Brazilian Real (BRL / R$) and its national language is Portuguese!",
        itemAwarded: "🥥 Fresh Amazon Coconut"
      },
      {
        step: 2,
        location: "The Meeting of the Waters",
        countryBadge: "🌊 HYDROLOGY & WATER",
        bgIcon: "🛶",
        narrative: "Zayn witnesses the dark Rio Negro and sandy Amazon River flow side-by-side without mixing for 4 miles due to differences in temperature and speed!",
        dilemma: "Recall how much of Earth's river water the Amazon River carries.",
        question: "Approximately what percentage of all river water entering Earth's oceans comes from the Amazon River?",
        options: ["About 20%", "Less than 1%", "About 50%", "About 5%"],
        answer: 0,
        explanation: "The mighty Amazon discharges over 200,000 cubic meters of water per second—roughly 20% of global river discharge!",
        itemAwarded: "🧭 Solar River Tracker"
      },
      {
        step: 3,
        location: "Canopy Tower Observatory",
        countryBadge: "🌿 RAINFOREST BIOLOGY",
        bgIcon: "🌳",
        narrative: "Zayn climbs 150 feet up to the rainforest canopy observatory. Giant Kapok trees poke high above the dense roof of the forest into full sunlight.",
        dilemma: "Identify the highest layer of a tropical rainforest.",
        question: "What is the highest layer of the rainforest, where giant trees tower above the canopy?",
        options: ["The Emergent Layer", "The Understory", "The Forest Floor", "The Canopy"],
        answer: 0,
        explanation: "The Emergent Layer rises up to 200 feet above the ground, home to harpy eagles and giant bats!",
        itemAwarded: "🔭 Canopy Field Binoculars"
      },
      {
        step: 4,
        location: "Bio-Botanical Research Lab",
        countryBadge: "🧪 PHOTOSYNTHESIS & SCIENCE",
        bgIcon: "🍃",
        narrative: "In the forest laboratory, scientists study how millions of rainforest trees produce oxygen for the planet using green light-absorbing pigments.",
        dilemma: "Identify the green pigment plant cells use to absorb solar energy for photosynthesis.",
        question: "What green pigment in plant leaves captures sunlight to perform photosynthesis?",
        options: ["Chlorophyll", "Hemoglobin", "Carotene", "Melanin"],
        answer: 0,
        explanation: "Chlorophyll molecules in chloroplasts absorb blue and red light to convert carbon dioxide and water into glucose!",
        itemAwarded: "🧪 Glowing Chlorophyll Vial"
      },
      {
        step: 5,
        location: "Ancient Stone Temple Gateway",
        countryBadge: "🔢 EXPONENTIAL MATH POWERS",
        bgIcon: "🏛️",
        narrative: "To unlock the mossy stone entrance to the ancient observatory, Zayn must calculate a 3-digit cube power number: 5³.",
        dilemma: "Calculate 5 cubed (5³ = 5 × 5 × 5).",
        question: "What is 5 cubed (5 × 5 × 5)?",
        options: ["125", "25", "75", "150"],
        answer: 0,
        explanation: "5 × 5 = 25, and 25 × 5 = 125!",
        itemAwarded: "🔑 Jade Sun Tablet"
      },
      {
        step: 6,
        location: "Historic Archives Chamber",
        countryBadge: "🦅 WORLD HISTORY & LEADERS",
        bgIcon: "🏆",
        narrative: "Final Checkpoint! The historical code honors the 16th US President who preserved the union and issued the Emancipation Proclamation during the Civil War.",
        dilemma: "Identify the 16th President of the United States.",
        question: "Who was the 16th President of the United States?",
        options: ["Abraham Lincoln", "George Washington", "Ulysses S. Grant", "Theodore Roosevelt"],
        answer: 0,
        explanation: "Abraham Lincoln served as the 16th US President from 1861 until 1865!",
        itemAwarded: "🏆 Golden Jaguar Compass"
      }
    ]
  },

  // =========================================================================
  // QUEST 4: THE ARCTIC SEED VAULT EXPEDITION (Tromsø -> Svalbard Vault)
  // =========================================================================
  {
    id: "quest_arctic_seed_vault",
    title: "The Arctic Seed Vault Expedition",
    subtitle: "Glaciers, Auroras & Cold Chemistry",
    icon: "❄️🇳🇴🌱",
    tag: "GEOGRAPHY • PHYSICS • MATH • SCIENCE",
    difficulty: "Hard",
    estimatedMins: 6,
    xpReward: 500,
    auraReward: 200,
    passportStamp: {
      country: "Svalbard, Norway",
      code: "NOR-LYR",
      icon: "🧊🏔️",
      dateUnlocked: null
    },
    cards: [
      {
        step: 1,
        location: "Port of Tromsø • Arctic Circle",
        countryBadge: "🇳🇴 NORWAY",
        bgIcon: "🚢",
        narrative: "Zayn boards an icebreaker ship in Tromsø, Norway bound for Longyearbyen in the Svalbard archipelago—the northernmost permanent settlement in the world!",
        dilemma: "Identify the official currency of Norway.",
        question: "What currency is used in Norway?",
        options: ["Krone", "Euro", "Krona", "Pound"],
        answer: 0,
        explanation: "Norway uses the Norwegian Krone (NOK / kr)!",
        itemAwarded: "🧤 Thermal Arctic Parka"
      },
      {
        step: 2,
        location: "Svalbard Frozen Fjord",
        countryBadge: "🌌 SPACE PHYSICS & AURORAS",
        bgIcon: "✨",
        narrative: "Night falls under the polar sky, and the heavens ignite with dancing ribbons of neon green and purple light: the Aurora Borealis!",
        dilemma: "Explain the physical cause of the Northern Lights.",
        question: "What causes the colorful glowing lights of the Aurora Borealis?",
        options: ["Solar wind particles colliding with Earth's magnetic field and atmosphere", "Sunlight reflecting off polar glaciers", "Space fireworks", "City lights bouncing off clouds"],
        answer: 0,
        explanation: "Solar energetic protons and electrons collide with oxygen (green/red) and nitrogen (blue/purple) atoms in the upper atmosphere!",
        itemAwarded: "🔭 Aurora Spectrometer"
      },
      {
        step: 3,
        location: "Entrance Tunnel • Global Seed Vault",
        countryBadge: "🌱 AGRICULTURAL SCIENCE",
        bgIcon: "🌾",
        narrative: "Deep inside Platåberget mountain, the Svalbard Global Seed Vault protects over 1.2 million crop seed varieties at a natural sub-zero -18°C (-0.4°F).",
        dilemma: "Identify the main purpose of the Svalbard Global Seed Vault.",
        question: "Why is the Svalbard Seed Vault nicknamed the 'Doomsday Vault'?",
        options: ["It stores backup duplicates of the world's crop seeds against disasters", "It stores gold bars", "It is an underground missile base", "It grows indoor vegetables"],
        answer: 0,
        explanation: "The vault provides a secure backup of Earth's plant biodiversity in case of disease, climate change, or catastrophe!",
        itemAwarded: "🌾 Preserved Arctic Wheat Sample"
      },
      {
        step: 4,
        location: "Cryogenic Vault Security Door",
        countryBadge: "🧪 MATERIALS & ELEMENTS",
        bgIcon: "🛡️",
        narrative: "The reinforced airlock door is forged from an ultra-lightweight, corrosion-resistant transition metal with atomic number 22 and symbol 'Ti'.",
        dilemma: "Identify the element with symbol 'Ti'.",
        question: "Which strong, lightweight element has the chemical symbol 'Ti' on the Periodic Table?",
        options: ["Titanium", "Tin", "Thallium", "Tungsten"],
        answer: 0,
        explanation: "Titanium (Ti) is as strong as steel but 45% lighter and immune to seawater and freeze corrosion!",
        itemAwarded: "🔑 Titanium Airlock Key"
      },
      {
        step: 5,
        location: "Deep Permafrost Terminal",
        countryBadge: "🔢 BINARY & EXPONENT MATH",
        bgIcon: "💻",
        narrative: "To sync the seed database backup, Zayn must solve 2 raised to the 5th power: 2⁵.",
        dilemma: "Calculate 2⁵ (2 × 2 × 2 × 2 × 2).",
        question: "What is the value of 2 to the 5th power (2⁵)?",
        options: ["32", "10", "16", "64"],
        answer: 0,
        explanation: "2 × 2 = 4, × 2 = 8, × 2 = 16, × 2 = 32!",
        itemAwarded: "💾 Cryo Data Core 32"
      },
      {
        step: 6,
        location: "Polar Research Observatory",
        countryBadge: "🦅 CONSERVATION HISTORY",
        bgIcon: "🏆",
        narrative: "The final mission clearance honors the 26th US President, a famous naturalist and explorer who created the US Forest Service and protected 230 million acres of public lands.",
        dilemma: "Identify the 26th President of the United States.",
        question: "Who was the 26th President of the United States (the great conservationist)?",
        options: ["Theodore Roosevelt", "Franklin D. Roosevelt", "Woodrow Wilson", "Dwight Eisenhower"],
        answer: 0,
        explanation: "Theodore 'Teddy' Roosevelt established 150 national forests, 51 federal bird reserves, and 5 national parks!",
        itemAwarded: "🏆 Northern Star Crystal Trophy"
      }
    ]
  },

  // =========================================================================
  // QUEST 5: AUSTRALIAN OUTBACK & REEF RESCUE (Sydney -> Barrier Reef -> Uluru)
  // =========================================================================
  {
    id: "quest_australian_outback",
    title: "The Great Barrier Reef & Outback",
    subtitle: "Marine Biology, Minerals & Down Under",
    icon: "🦘🇦🇺🪸",
    tag: "OCEANS • GEOGRAPHY • MATH • CHEMISTRY",
    difficulty: "Medium",
    estimatedMins: 5,
    xpReward: 460,
    auraReward: 190,
    passportStamp: {
      country: "Australia",
      code: "AUS-SYD",
      icon: "🪃🌊",
      dateUnlocked: null
    },
    cards: [
      {
        step: 1,
        location: "Sydney Harbour • Circular Quay",
        countryBadge: "🇦🇺 AUSTRALIA",
        bgIcon: "⛵",
        narrative: "Zayn lands in Sydney and prepares for a trans-continental expedition from the coast to the Great Barrier Reef and the red desert outback.",
        dilemma: "Identify the official currency of Australia.",
        question: "What is the official currency of Australia?",
        options: ["Australian Dollar", "British Pound", "Euro", "New Zealand Dollar"],
        answer: 0,
        explanation: "Australia uses the Australian Dollar (AUD / A$) with its famous colorful waterproof polymer banknotes!",
        itemAwarded: "🪃 Wooden Outback Boomerang"
      },
      {
        step: 2,
        location: "Cairns Marine Research Station",
        countryBadge: "🪸 MARINE ECOSYSTEMS",
        bgIcon: "🐠",
        narrative: "Snorkeling along the outer edge of the Great Barrier Reef, Zayn observes thousands of colorful coral heads providing shelter for clownfish and sea turtles.",
        dilemma: "Identify what biological organisms actually build coral reefs.",
        question: "What are corals biologically classified as?",
        options: ["Colonial marine animals that build limestone skeletons", "Underwater plants", "Colorful ocean rocks", "Fungus"],
        answer: 0,
        explanation: "Corals are tiny invertebrates related to jellyfish that secrete calcium carbonate limestone to build massive reefs!",
        itemAwarded: "🐚 Living Reef Sensor"
      },
      {
        step: 3,
        location: "Red Centre • Uluru Sandstone",
        countryBadge: "🪨 GEOLOGY & MINERALS",
        bgIcon: "🏜️",
        narrative: "Flying inland to the desert outback, Zayn sees the majestic sandstone monolith of Uluru glowing deep fiery red in the afternoon sun.",
        dilemma: "Explain why the sandstone of Uluru appears bright red-orange.",
        question: "Why is the rock and sand of Uluru bright red in color?",
        options: ["Iron minerals in the rock oxidized (rusted) over time", "It is made of red volcanic lava", "Red moss covers the rock", "Ancient red paint"],
        answer: 0,
        explanation: "Iron content in arkose sandstone chemically oxidizes (rusts) to form red-brown iron oxide on the surface!",
        itemAwarded: "🏺 Red Ochre Stone"
      },
      {
        step: 4,
        location: "Kalgoorlie Gold Mine Gate",
        countryBadge: "🧪 CHEMISTRY & ELEMENTS",
        bgIcon: "⛏️",
        narrative: "Australia is one of the world's largest producers of Gold. The entrance vault is stamped with its Latin atomic symbol.",
        dilemma: "Identify the chemical symbol for Gold on the Periodic Table.",
        question: "What is the chemical symbol for the element Gold on the Periodic Table?",
        options: ["Au", "Ag", "Gd", "Fe"],
        answer: 0,
        explanation: "Au comes from the Latin word 'Aurum', meaning 'shining dawn' or Gold!",
        itemAwarded: "✨ Pure Gold Nugget"
      },
      {
        step: 5,
        location: "Desert Flight Navigation Computer",
        countryBadge: "🔢 EXPONENTIAL MATH POWERS",
        bgIcon: "🏆",
        narrative: "To calculate the return flight distance across the Simpson Desert, Zayn must solve 6 cubed: 6³.",
        dilemma: "Calculate 6³ = 6 × 6 × 6.",
        question: "What is 6 cubed (6 × 6 × 6)?",
        options: ["216", "36", "180", "256"],
        answer: 0,
        explanation: "6 × 6 = 36, and 36 × 6 = 216!",
        itemAwarded: "🏆 Opal of the Southern Cross"
      }
    ]
  },

  // =========================================================================
  // QUEST 6: HIMALAYAN PASS & SPACE OBSERVATORY (Kathmandu -> Everest -> Sky)
  // =========================================================================
  {
    id: "quest_himalayan_observatory",
    title: "The Himalayan Pass & Sky Observatory",
    subtitle: "Plate Tectonics, Altitude & Astronomy",
    icon: "🏔️🇳🇵🔭",
    tag: "GEOLOGY • ASTRONOMY • MATH • HISTORY",
    difficulty: "Hard",
    estimatedMins: 6,
    xpReward: 520,
    auraReward: 210,
    passportStamp: {
      country: "Nepal",
      code: "NPL-KTM",
      icon: "🏔️🦅",
      dateUnlocked: null
    },
    cards: [
      {
        step: 1,
        location: "Kathmandu Durbar Square • Nepal",
        countryBadge: "🇳🇵 NEPAL",
        bgIcon: "🛕",
        narrative: "Zayn lands in the historic capital of Nepal surrounded by terraced foothills, preparing for a high-altitude trek toward the Himalayas.",
        dilemma: "Identify the capital city of Nepal.",
        question: "What is the capital city of Nepal?",
        options: ["Kathmandu", "Thimphu", "Dhaka", "Colombo"],
        answer: 0,
        explanation: "Kathmandu is the capital and largest metropolis in the mountain kingdom of Nepal!",
        itemAwarded: "🧣 Sherpa Woolen Scarf"
      },
      {
        step: 2,
        location: "Khumbu Valley • 14,000 Feet",
        countryBadge: "🌍 PLATE TECTONICS",
        bgIcon: "⛰️",
        narrative: "Hiking up the glacial valley, Zayn looks up at Mount Everest (8,848 meters / 29,032 feet). The mountain is actually still growing taller by ~4 millimeters every single year!",
        dilemma: "Explain how the Himalayan mountain range was created.",
        question: "What geological force formed Mount Everest and the Himalayan mountain range?",
        options: ["The collision of the Indian and Eurasian tectonic plates", "A giant volcanic eruption", "Glaciers carving out flat ground", "An asteroid impact"],
        answer: 0,
        explanation: "The collision of the Indian and Eurasian tectonic plates began 50 million years ago and continues to push the mountains upward today!",
        itemAwarded: "⛏️ High-Altitude Ice Axe"
      },
      {
        step: 3,
        location: "Everest High-Altitude Station",
        countryBadge: "💨 ATMOSPHERIC PHYSICS",
        bgIcon: "🌬️",
        narrative: "At 18,000 feet elevation, every breath feels thinner. Zayn checks his pulse oximeter and atmospheric barometer.",
        dilemma: "Explain why it is harder to breathe at high altitudes on mountains.",
        question: "Why is oxygen harder to absorb at high altitudes on Mount Everest?",
        options: ["Air pressure is lower, so air molecules are spread thinner per breath", "There is no oxygen on mountains", "Cold air destroys oxygen molecules", "Wind blows all air away"],
        answer: 0,
        explanation: "The percentage of oxygen is still 21%, but lower atmospheric pressure spreads air molecules much thinner.",
        itemAwarded: "🫁 Supplemental Oxygen Regulator"
      },
      {
        step: 4,
        location: "Himalayan Optical Observatory",
        countryBadge: "🪐 SOLAR SYSTEM ASTRONOMY",
        bgIcon: "🔭",
        narrative: "Above the cloud line in the crisp mountain night, the telescope focuses on the Red Planet: Mars. Zayn spots Olympus Mons, the largest volcano in the solar system.",
        dilemma: "Recall how Olympus Mons on Mars compares in height to Mount Everest.",
        question: "How tall is Olympus Mons on Mars compared to Mount Everest?",
        options: ["Nearly 3 times taller than Everest", "Half the size of Everest", "Exactly the same height", "Smaller than a house"],
        answer: 0,
        explanation: "Olympus Mons towers 22 kilometers (72,000 ft) high—nearly triple the height of Mount Everest!",
        itemAwarded: "🌟 Martian Star Chart"
      },
      {
        step: 5,
        location: "Observatory Calibration Computer",
        countryBadge: "🔢 ALGEBRA & POWERS",
        bgIcon: "📐",
        narrative: "To align the telescope motor, Zayn must solve: 7² + 10².",
        dilemma: "Calculate (7 × 7) + (10 × 10).",
        question: "What is 7² + 10² (49 + 100)?",
        options: ["149", "170", "135", "100"],
        answer: 0,
        explanation: "7² = 49 and 10² = 100. 49 + 100 = 149!",
        itemAwarded: "🔭 Laser Rangefinder 149"
      },
      {
        step: 6,
        location: "Global Summit Antenna",
        countryBadge: "🦅 WORLD HISTORY & LEADERS",
        bgIcon: "🏆",
        narrative: "Final Checkpoint! The international summit satellite link requires the name of the 3rd US President who drafted the Declaration of Independence in 1776.",
        dilemma: "Identify the 3rd President of the United States.",
        question: "Who was the 3rd President of the United States (primary author of the Declaration of Independence)?",
        options: ["Thomas Jefferson", "John Adams", "Benjamin Franklin", "James Madison"],
        answer: 0,
        explanation: "Thomas Jefferson served as the 3rd US President from 1801 to 1809!",
        itemAwarded: "🏆 Golden Everest Summit Flag"
      }
    ]
  }
];

window.GLOBAL_ODYSSEY_QUESTS = GLOBAL_ODYSSEY_QUESTS;
