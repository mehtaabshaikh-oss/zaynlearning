/**
 * Global Odyssey Scenario Quests Data
 * Multi-disciplinary adventures combining Geography, Science, Math, History, and World Culture.
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
        options: ["Japanese Yen (¥)", "Euro (€)", "Chinese Yuan (¥)", "Korean Won (₩)"],
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
        options: ["Japanese (Nihongo)", "Mandarin", "Tagalog", "Korean"],
        answer: 0,
        explanation: "Japanese (Nihongo) is the primary language spoken across the Japanese archipelago!",
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
        options: ["Brazil 🇧🇷", "Argentina 🇦🇷", "Colombia 🇨🇴", "Mexico 🇲🇽"],
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
        options: ["Silver (from Latin Argentum)", "Gold (Au)", "Aluminum (Al)", "Argon (Ar)"],
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
  // QUEST 2: THE NILE & PYRAMID EXPEDITION (Cairo -> Alexandria -> Oasis)
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
        options: ["Egyptian Pound (EGP)", "Euro (€)", "Egyptian Dinar", "Rial"],
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
        options: ["Over 3,800 years (until 1311 AD)", "Only 50 years", "200 years", "10,000 years"],
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
        question: "What chemical element has the atomic symbol 'Cu' (from Latin Cuprum)?",
        options: ["Copper", "Cobalt", "Calcium", "Curium"],
        answer: 0,
        explanation: "Cu stands for Copper, one of the earliest metals smelted and used by human civilizations!",
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
  }
];

window.GLOBAL_ODYSSEY_QUESTS = GLOBAL_ODYSSEY_QUESTS;
