/**
 * TriviaFactsData - 100+ Mind-Blowing Random Facts & Trivia Bank
 * Categories: Geography, Earth & Oceans, Space, Animals & Nature, Science & Engineering
 */

const TRIVIA_FACTS_BANK = [
  // --- GEOGRAPHY & WORLD RECORDS ---
  {
    category: "Geography 🌍",
    fact: "Russia spans 11 time zones across Europe and Asia—when it is morning in Moscow, it is already night in Vladivostok!",
    q: "How many time zones does Russia span across its vast territory?",
    options: ["11 time zones", "3 time zones", "24 time zones", "5 time zones"],
    answer: 0,
    explanation: "Russia spans 11 standard time zones from Kaliningrad in the west to Kamchatka in the east!"
  },
  {
    category: "World Records 🏙️",
    fact: "The Burj Khalifa in Dubai is the tallest building on Earth, soaring 828 meters (2,717 feet) high into the sky—over half a mile tall!",
    q: "What is the tallest human-made building in the world?",
    options: ["Burj Khalifa in Dubai", "Empire State Building in New York", "Eiffel Tower in Paris", "Shanghai Tower"],
    answer: 0,
    explanation: "The Burj Khalifa in Dubai holds the world record at 828 meters (2,717 ft) with 163 floors."
  },
  {
    category: "Geography 🌍",
    fact: "South Africa is the only country on Earth with three official capital cities: Pretoria (Executive), Cape Town (Legislative), and Bloemfontein (Judicial)!",
    q: "Which country has THREE official capital cities?",
    options: ["South Africa", "Brazil", "Australia", "Canada"],
    answer: 0,
    explanation: "South Africa divides its government across Pretoria, Cape Town, and Bloemfontein."
  },
  {
    category: "Geography 🌍",
    fact: "Canada has over 2 million lakes—more than all the other countries in the world combined!",
    q: "Which country contains more lakes than the rest of the entire world combined?",
    options: ["Canada", "Russia", "United States", "Norway"],
    answer: 0,
    explanation: "Canada holds over 60% of all natural lakes on Earth!"
  },
  {
    category: "World Records 🏛️",
    fact: "Vatican City in Rome is the smallest independent country in the world, covering just 0.19 square miles (about 100 football fields)!",
    q: "What is the smallest country on Earth by both area and population?",
    options: ["Vatican City", "Monaco", "Iceland", "San Marino"],
    answer: 0,
    explanation: "Vatican City has an area of only 49 hectares (121 acres) and fewer than 1,000 residents."
  },
  {
    category: "Geography 🌊",
    fact: "The Amazon River in South America discharges more water than the next seven largest rivers on Earth combined!",
    q: "Which river carries the largest volume of water into the ocean?",
    options: ["Amazon River", "Nile River", "Mississippi River", "Yangtze River"],
    answer: 0,
    explanation: "The Amazon River accounts for roughly 20% of all river water entering the world's oceans!"
  },

  // --- EARTH & OCEANS ---
  {
    category: "Earth & Oceans 🌊",
    fact: "The Mariana Trench's Challenger Deep in the Pacific Ocean is nearly 36,000 feet (11,000 meters) deep—if Mount Everest was dropped in, its peak would still be 7,000 feet underwater!",
    q: "What is the deepest known point in Earth's oceans?",
    options: ["Mariana Trench (Challenger Deep)", "Bermuda Triangle", "Grand Canyon", "Puerto Rico Trench"],
    answer: 0,
    explanation: "The Challenger Deep plunges down nearly 11 kilometers (36,070 ft) into perpetual darkness."
  },
  {
    category: "Earth & Oceans ❄️",
    fact: "Antarctica is technically the largest desert on Earth because it receives less than 2 inches of precipitation each year, yet it holds 90% of Earth's ice and 70% of its fresh water!",
    q: "What is the largest desert on planet Earth?",
    options: ["Antarctic Polar Desert", "Sahara Desert", "Gobi Desert", "Mojave Desert"],
    answer: 0,
    explanation: "Deserts are defined by precipitation, not temperature—Antarctica receives almost no snow, making it a polar desert!"
  },
  {
    category: "Earth & Oceans ⚡",
    fact: "Lightning strikes somewhere on Earth approximately 100 times every single second—that's over 8 million lightning bolts every day!",
    q: "About how many times does lightning strike planet Earth each second?",
    options: ["100 times per second", "1 time per hour", "10 times per minute", "500 times per second"],
    answer: 0,
    explanation: "Global lightning detectors record approximately 100 cloud-to-ground strikes per second."
  },
  {
    category: "Earth & Oceans 🏔️",
    fact: "The Dead Sea, bordered by Jordan and Israel, sits at 1,410 feet (430 meters) below sea level, making its shores the lowest dry land on Earth!",
    q: "Where is the lowest dry land elevation on Earth's surface?",
    options: ["The shores of the Dead Sea", "Death Valley, California", "The Sahara Desert", "The Netherlands"],
    answer: 0,
    explanation: "The Dead Sea shoreline is over 430 meters below global sea level."
  },
  {
    category: "Earth & Oceans 🌊",
    fact: "Over 80% of Earth's oceans remain completely unmapped and unexplored by humans!",
    q: "Approximately how much of the world's oceans remain unexplored?",
    options: ["Over 80%", "Less than 10%", "Exactly 50%", "All oceans are fully explored"],
    answer: 0,
    explanation: "We have better maps of the surface of the Moon and Mars than of the ocean floor!"
  },

  // --- SPACE & SOLAR SYSTEM ---
  {
    category: "Space & Solar System 🪐",
    fact: "Venus is the hottest planet in the solar system (over 867°F / 464°C)—even hotter than Mercury—because its dense carbon dioxide atmosphere traps intense heat in a runaway greenhouse effect!",
    q: "Which planet in our solar system has the hottest surface temperature?",
    options: ["Venus", "Mercury", "Mars", "Jupiter"],
    answer: 0,
    explanation: "Although Mercury is closer to the Sun, Venus's thick atmosphere traps heat, reaching 867°F (464°C)!"
  },
  {
    category: "Space & Solar System 🚀",
    fact: "Olympus Mons on Mars is the largest volcano in the solar system—it stands 13.6 miles (22 km) high, nearly three times taller than Mount Everest!",
    q: "What is the tallest volcano known in our solar system?",
    options: ["Olympus Mons on Mars", "Mount Everest on Earth", "Mauna Kea in Hawaii", "Mount Fuji in Japan"],
    answer: 0,
    explanation: "Olympus Mons is a colossal shield volcano on Mars spanning the size of Arizona and towering 22 km high."
  },
  {
    category: "Space & Solar System 🌪️",
    fact: "Jupiter's Great Red Spot is a gargantuan spinning storm so massive that Earth could fit entirely inside it, and it has been raging for over 300 years!",
    q: "What is the famous Great Red Spot on Jupiter?",
    options: ["A giant hurricane-like storm larger than Earth", "A giant red volcano", "A crater from an asteroid impact", "A mountain of red dust"],
    answer: 0,
    explanation: "The Great Red Spot is a high-pressure anticyclonic storm that has swirled for centuries."
  },
  {
    category: "Space & Solar System 🌟",
    fact: "Neutron stars are so dense that a single teaspoon of neutron star material would weigh about 6 billion tons on Earth—as much as Mount Everest!",
    q: "Why are neutron stars famous in astronomy?",
    options: ["They are so incredibly dense that a teaspoon weighs billions of tons", "They are made of pure ice", "They are colder than ice cream", "They are shaped like triangles"],
    answer: 0,
    explanation: "When massive stars collapse into neutron stars, atoms are crushed together with extreme density."
  },
  {
    category: "Space & Solar System 🌙",
    fact: "The Moon is slowly drifting away from Earth at a rate of about 1.5 inches (3.8 centimeters) every year!",
    q: "Is the Moon getting closer to or farther from Earth over time?",
    options: ["Farther away (~1.5 inches per year)", "Closer to Earth", "Staying at the exact same millimeter", "Orbiting backwards"],
    answer: 0,
    explanation: "Tidal friction between Earth's oceans and the Moon transfers energy, pushing the Moon outward by 3.8 cm annually."
  },
  {
    category: "Space & Solar System ☀️",
    fact: "One million Earths could fit inside the Sun! The Sun contains 99.86% of all the mass in the entire solar system.",
    q: "How many planet Earths could fit inside the Sun?",
    options: ["About 1,000,000 (One Million)", "About 100", "About 5,000", "About 50,000"],
    answer: 0,
    explanation: "The Sun has a volume roughly 1.3 million times greater than Earth."
  },

  // --- ANIMALS & NATURE ---
  {
    category: "Animals & Nature 🐋",
    fact: "A Blue Whale's heart is as big as a bumper car (weighing 400 pounds), and a human could swim through its main aorta artery!",
    q: "How large is the heart of a Blue Whale, the largest animal on Earth?",
    options: ["About the size of a small car / bumper car", "The size of an apple", "The size of a basketball", "The size of a football"],
    answer: 0,
    explanation: "Blue whale hearts weigh over 400 lbs (180 kg) to pump blood through their 100-foot bodies!"
  },
  {
    category: "Animals & Nature 🐙",
    fact: "Octopuses have THREE hearts, NINE brains (one in the head and one in each of its 8 arms), and their blood is colored BLUE because it uses copper to carry oxygen!",
    q: "How many hearts and brains does an octopus have?",
    options: ["3 hearts and 9 brains (with blue blood!)", "1 heart and 1 brain", "2 hearts and 4 brains", "8 hearts and 1 brain"],
    answer: 0,
    explanation: "Two hearts pump blood to the gills while one pumps to the body, and its nervous system distributes mini-brains to all 8 arms!"
  },
  {
    category: "Animals & Nature 🐆",
    fact: "Cheetahs are the fastest land mammals on Earth, able to accelerate from 0 to 60 mph in just 3 seconds—faster than most luxury sports cars!",
    q: "What is the fastest running mammal on land?",
    options: ["Cheetah (reaches up to 70 mph)", "Lion", "Greyhound dog", "Gazelle"],
    answer: 0,
    explanation: "Cheetahs can sprint at speeds up to 70 mph (112 km/h) in short bursts to catch prey."
  },
  {
    category: "Animals & Nature 🍯",
    fact: "Pure natural honey never spoils! Archaeologists have excavated 3,000-year-old pots of honey from ancient Egyptian pharaoh tombs that is still completely edible.",
    q: "Why is honey unique among all natural foods?",
    options: ["It never spoils or expires due to low moisture and natural acidity", "It is made of pure gold", "It can only be eaten once every 100 years", "It turns into candy in sunlight"],
    answer: 0,
    explanation: "Honey's low moisture content and hydrogen peroxide make it inhospitable for bacteria or mold to grow."
  },
  {
    category: "Animals & Nature 🦩",
    fact: "Flamingos are born with light gray feathers—they only turn pink because their diet consists of algae and brine shrimp rich in natural carotenoid pigments!",
    q: "Why are adult flamingos pink?",
    options: ["Their diet of shrimp and algae contains pink pigments (carotenoids)", "They spend all day in the sun", "They are born bright pink", "They paint their feathers with mud"],
    answer: 0,
    explanation: "Digesting beta-carotene in their seafood diet turns flamingo feathers their iconic pink/orange hue."
  },
  {
    category: "Animals & Nature 🌲",
    fact: "Trees in a forest communicate and share nutrients through an underground fungal network called mycorrhizae—nicknamed the 'Wood Wide Web'!",
    q: "How do trees in a healthy forest share nutrients with neighboring trees?",
    options: ["Through underground fungal networks (mycorrhizae)", "By waving their branches", "Through bird songs", "They cannot share nutrients"],
    answer: 0,
    explanation: "Mycorrhizal fungal threads connect tree roots, creating an underground nutrient-sharing highway."
  },

  // --- SCIENCE & ENGINEERING ---
  {
    category: "Science & Body 💡",
    fact: "Your brain generates about 20 watts of electrical power when you are awake—enough electricity to light up a small LED lightbulb!",
    q: "About how much electrical power does an active human brain generate?",
    options: ["About 20 watts (enough for an LED bulb)", "1,000,000 volts", "0 watts", "100 horsepower"],
    answer: 0,
    explanation: "Billions of firing neurons produce measurable electrical activity totaling roughly 12-25 watts."
  },
  {
    category: "Science & Physics ❄️",
    fact: "Water is one of the only substances that expands when it freezes! Because ice is less dense than liquid water, ice floats on top of lakes, insulating the fish underneath from freezing.",
    q: "Why does ice float on top of liquid water?",
    options: ["Water expands as it freezes, making ice less dense than water", "Ice is filled with helium gas", "Ice is heavier than water", "Cold water pushes ice upward with magnetic force"],
    answer: 0,
    explanation: "Water forms open crystalline hexagonal structures as it freezes, reducing its density so it floats."
  },
  {
    category: "Engineering & History 🚢",
    fact: "The Panama Canal uses no water pumps—it operates entirely on natural gravity! Massive water locks lift giant cargo ships 85 feet up over mountain ridges between the Atlantic and Pacific oceans.",
    q: "How do the locks in the Panama Canal lift giant ships over mountains?",
    options: ["Natural gravity feeds water from higher lakes into the lock chambers", "Giant diesel water pumps", "Helicopters lift the ships", "Nuclear magnets"],
    answer: 0,
    explanation: "Water flows downhill from Gatun Lake into the lock chambers purely by gravitational force."
  },
  {
    category: "Science & Materials 💎",
    fact: "Both graphite in a pencil and sparkling diamonds are made of pure Carbon! Extreme heat and pressure deep inside Earth crush carbon atoms into the hardest natural mineral known: diamond.",
    q: "What element forms both soft pencil graphite and ultra-hard diamonds?",
    options: ["Carbon (C)", "Gold (Au)", "Iron (Fe)", "Silicon (Si)"],
    answer: 0,
    explanation: "Carbon atoms arranged in a tetrahedral crystal lattice form diamond, the hardest natural mineral."
  },
  {
    category: "Engineering & Space 🛰️",
    fact: "The International Space Station (ISS) orbits Earth at 17,500 miles per hour (28,000 km/h)—astronauts aboard witness 16 sunrises and 16 sunsets every single day!",
    q: "How many sunrises and sunsets do astronauts on the Space Station see in 24 hours?",
    options: ["16 sunrises and 16 sunsets (orbiting Earth every 90 minutes)", "Only 1 sunrise", "365 sunrises", "0 sunrises"],
    answer: 0,
    explanation: "Traveling at 5 miles per second, the ISS completes a full orbit of planet Earth every 90 minutes."
  }
];

window.TRIVIA_FACTS_BANK = TRIVIA_FACTS_BANK;
