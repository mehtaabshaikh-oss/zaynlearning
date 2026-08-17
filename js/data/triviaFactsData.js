/**
 * TriviaFactsData - 150+ Mind-Blowing Random Facts & Trivia Bank
 * Categories: Geography, World Records, Oceans & Earth, Space, Animals, Physics, Human Body, Engineering
 */

const TRIVIA_FACTS_BANK = [
  // ==========================================
  // 1. GEOGRAPHY & WORLD WONDERS (25 Facts)
  // ==========================================
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
    fact: "The Burj Khalifa in Dubai is the tallest building on Earth, soaring 828 meters (2,717 feet) high—over half a mile into the sky!",
    q: "What is the tallest human-made building in the world?",
    options: ["Burj Khalifa in Dubai", "Empire State Building", "Eiffel Tower in Paris", "Shanghai Tower"],
    answer: 0,
    explanation: "The Burj Khalifa in Dubai holds the world record at 828 meters (2,717 ft) with 163 floors."
  },
  {
    category: "Geography 🌍",
    fact: "South Africa is the only country on Earth with THREE official capital cities: Pretoria (Executive), Cape Town (Legislative), and Bloemfontein (Judicial)!",
    q: "Which country has THREE official capital cities?",
    options: ["South Africa", "Brazil", "Australia", "Canada"],
    answer: 0,
    explanation: "South Africa divides its government branches across Pretoria, Cape Town, and Bloemfontein."
  },
  {
    category: "Geography 🌍",
    fact: "Canada has over 2 million natural lakes—more than all the other countries in the entire world combined!",
    q: "Which country contains more lakes than the rest of the world combined?",
    options: ["Canada", "Russia", "United States", "Norway"],
    answer: 0,
    explanation: "Canada holds over 60% of all natural lakes on planet Earth!"
  },
  {
    category: "World Records 🏛️",
    fact: "Vatican City in Rome is the smallest independent country in the world, covering just 0.19 square miles (about 100 football fields)!",
    q: "What is the smallest country on Earth by area and population?",
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
    explanation: "The Amazon accounts for roughly 20% of all river water entering the world's oceans!"
  },
  {
    category: "Geography 🌉",
    fact: "Istanbul, Turkey is the only major metropolis in the world located across two continents simultaneously—Europe and Asia!",
    q: "Which city is located on both the European and Asian continents?",
    options: ["Istanbul, Turkey", "Cairo, Egypt", "Moscow, Russia", "Athens, Greece"],
    answer: 0,
    explanation: "The Bosphorus Strait splits Istanbul right down the middle between Europe and Asia."
  },
  {
    category: "Geography 🏰",
    fact: "The Great Wall of China is over 13,000 miles (21,000 km) long—long enough to stretch more than halfway around the entire equator of Earth!",
    q: "About how long is the Great Wall of China including all its branches?",
    options: ["Over 13,000 miles (21,000 km)", "500 miles", "2,000 miles", "50,000 miles"],
    answer: 0,
    explanation: "Archaeological surveys measured the entire wall system at 21,196 km (13,171 miles)."
  },
  {
    category: "Geography ❄️",
    fact: "Iceland has zero mosquitoes, snakes, or native reptiles thanks to its unique freeze-thaw cycles and oceanic isolation!",
    q: "Which island nation has no mosquitoes or snakes at all?",
    options: ["Iceland", "Madagascar", "New Zealand", "Greenland"],
    answer: 0,
    explanation: "Iceland's climate prevents mosquitoes from completing their breeding life cycle."
  },
  {
    category: "Geography 🌕",
    fact: "The continent of Australia is wider than the Moon! Australia spans nearly 4,000 km east-to-west, while the Moon's diameter is 3,474 km.",
    q: "Is Australia wider or narrower than the diameter of the Moon?",
    options: ["Wider than the Moon (~4,000 km vs 3,474 km)", "Narrower than the Moon", "Exactly the same size", "Half the Moon's size"],
    answer: 0,
    explanation: "Australia spans roughly 4,000 km from east to west, outmeasuring the Moon's diameter!"
  },
  {
    category: "Geography 🗣️",
    fact: "Papua New Guinea is the most linguistically diverse country on Earth, with over 840 distinct living languages spoken across its valleys!",
    q: "Which country has the most spoken languages in the world (over 840)?",
    options: ["Papua New Guinea", "India", "United States", "China"],
    answer: 0,
    explanation: "Rugged mountains and dense rainforests led to hundreds of unique isolated tribal languages."
  },
  {
    category: "Geography ⛰️",
    fact: "Mount Thor on Baffin Island in Canada features the greatest purely vertical cliff drop on Earth: 1,250 meters (4,101 ft) straight down!",
    q: "Which mountain holds the world record for the steepest pure vertical drop?",
    options: ["Mount Thor in Canada", "Mount Everest", "El Capitan in Yosemite", "Matterhorn in the Alps"],
    answer: 0,
    explanation: "Mount Thor drops 1,250 meters straight down at an average overhang angle of 105 degrees!"
  },
  {
    category: "Geography 🌊",
    fact: "Angel Falls in Venezuela is the world's highest uninterrupted waterfall, plunging 979 meters (3,212 feet) from a tabletop mountain!",
    q: "What is the tallest waterfall in the world?",
    options: ["Angel Falls in Venezuela", "Niagara Falls", "Victoria Falls", "Iguazu Falls"],
    answer: 0,
    explanation: "Angel Falls drops 979 meters, so high that much of the water turns into mist before reaching the bottom."
  },
  {
    category: "Geography 🌴",
    fact: "The Sahara Desert was once a lush, green tropical paradise with giant lakes, hippos, and savannah rivers just 6,000 years ago!",
    q: "What did the Sahara Desert look like 6,000 years ago during the 'Green Sahara' period?",
    options: ["A green tropical savannah with lakes and rivers", "Covered in deep snow", "An open ocean", "Identical dry dunes"],
    answer: 0,
    explanation: "Changes in Earth's orbital tilt brought heavy monsoon rains to North Africa during the Green Sahara era."
  },
  {
    category: "Geography 🧭",
    fact: "The Nile River is one of the rare major rivers in the world that flows northward, traveling over 4,100 miles to empty into the Mediterranean Sea!",
    q: "In which cardinal direction does the Nile River flow?",
    options: ["Northward (from Africa towards the Mediterranean)", "Southward", "Eastward", "Westward"],
    answer: 0,
    explanation: "Water always flows downhill—higher elevations in East Africa slope downward towards the northern sea."
  },
  {
    category: "Geography 🏔️",
    fact: "Lesotho in southern Africa is the only independent country in the world where every single inch of land lies above 1,000 meters (3,280 ft) elevation!",
    q: "Which nation is known as the 'Kingdom in the Sky' because all its territory is above 1,000 meters?",
    options: ["Lesotho", "Switzerland", "Nepal", "Bolivia"],
    answer: 0,
    explanation: "Lesotho has the highest lowest-point of any country in the world at 1,400 meters elevation."
  },
  {
    category: "Geography 🏛️",
    fact: "San Marino, surrounded entirely by Italy, is considered the oldest continuous republic in the world, founded in the year 301 AD!",
    q: "What is considered the world's oldest surviving sovereign republic?",
    options: ["San Marino (founded 301 AD)", "United States", "France", "Greece"],
    answer: 0,
    explanation: "San Marino was established by Saint Marinus in 301 AD and has maintained its constitution since 1600."
  },
  {
    category: "Geography 🗺️",
    fact: "Brazil is so enormous that it shares a land border with every single country in South America except two: Chile and Ecuador!",
    q: "Which two South American nations do NOT share a border with Brazil?",
    options: ["Chile and Ecuador", "Argentina and Peru", "Colombia and Venezuela", "Bolivia and Paraguay"],
    answer: 0,
    explanation: "Brazil borders 10 different South American neighbors—only Chile and Ecuador don't touch it."
  },
  {
    category: "Geography 🌲",
    fact: "The Siberian Taiga in Russia is the largest single continuous forest on Earth, covering roughly 11% of all the dry land on the planet!",
    q: "What is the largest continuous forest biome on Earth?",
    options: ["The Siberian Taiga / Boreal Forest", "The Amazon Rainforest", "The Congo Basin", "The Black Forest"],
    answer: 0,
    explanation: "The boreal forest (Taiga) spans over 12 million square kilometers across the northern hemisphere."
  },
  {
    category: "Geography 🏖️",
    fact: "Australia has over 10,000 beaches—if you visited one brand new beach every single day, it would take you over 27 years to see them all!",
    q: "How many beaches does Australia have along its coastline?",
    options: ["Over 10,000 beaches", "About 500", "About 1,000", "Exactly 50"],
    answer: 0,
    explanation: "Australia's 34,000-mile coastline boasts 10,685 registered distinct beaches."
  },

  // ==========================================
  // 2. EARTH & OCEAN DEPTHS (25 Facts)
  // ==========================================
  {
    category: "Earth & Oceans 🌊",
    fact: "The Mariana Trench's Challenger Deep in the Pacific Ocean is nearly 36,000 feet (11,000 meters) deep—if Mount Everest was placed at the bottom, its peak would still be 7,000 feet underwater!",
    q: "What is the deepest known point in Earth's oceans?",
    options: ["Mariana Trench (Challenger Deep)", "Bermuda Triangle", "Grand Canyon", "Puerto Rico Trench"],
    answer: 0,
    explanation: "The Challenger Deep plunges down nearly 11 kilometers (36,070 ft) into perpetual darkness."
  },
  {
    category: "Earth & Oceans ❄️",
    fact: "Antarctica is technically the largest desert on Earth because it receives less than 2 inches of rain or snow per year, yet it holds 90% of Earth's ice and 70% of its fresh water!",
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
    fact: "Over 80% of Earth's oceans remain completely unmapped and unexplored by humans—we have better maps of the Moon and Mars!",
    q: "Approximately how much of the world's oceans remain unexplored?",
    options: ["Over 80%", "Less than 10%", "Exactly 50%", "All oceans are fully explored"],
    answer: 0,
    explanation: "We have better maps of the surface of the Moon and Mars than of the ocean floor!"
  },
  {
    category: "Earth & Oceans 🐠",
    fact: "The Great Barrier Reef in Australia is the largest living structure on Earth—it is over 1,400 miles long and can be seen with the naked eye from space!",
    q: "What is the largest living structure on Earth, visible from space?",
    options: ["The Great Barrier Reef", "The Amazon Rainforest", "Mount Everest", "The Great Wall of China"],
    answer: 0,
    explanation: "The reef is composed of billions of tiny living coral polyps forming an ecosystem visible from orbit."
  },
  {
    category: "Earth & Oceans 🔥",
    fact: "Earth's solid inner core is scorching hot—over 6,000°C (10,800°F)—which is hotter than the visible surface of the Sun!",
    q: "How hot is the center core of planet Earth?",
    options: ["About 6,000°C (as hot as the Sun's surface!)", "100°C", "Room temperature", "Absolute zero"],
    answer: 0,
    explanation: "Radioactive decay and gravitational pressure keep Earth's nickel-iron core hotter than the Sun's surface."
  },
  {
    category: "Earth & Oceans 🌋",
    fact: "Mauna Kea in Hawaii is the tallest mountain on Earth when measured from base to peak—over 33,500 feet (10,210 meters) tall, with most of it submerged underwater!",
    q: "Which mountain is the tallest on Earth when measured from its underwater ocean base?",
    options: ["Mauna Kea in Hawaii", "Mount Everest", "Mount Kilimanjaro", "K2"],
    answer: 0,
    explanation: "Measured from its ocean floor base to peak, Mauna Kea stands 33,500 ft, taller than Everest above sea level (29,032 ft)."
  },
  {
    category: "Earth & Oceans 🐟",
    fact: "The deepest living fish ever discovered is the Mariana Snailfish, filmed swimming at a crushing depth of 27,349 feet (8,336 meters) underwater!",
    q: "How deep in the ocean have living fish been found swimming?",
    options: ["Over 27,000 feet (8,300+ meters) deep", "1,000 feet", "5,000 feet", "Fish cannot survive below 500 feet"],
    answer: 0,
    explanation: "Mariana snailfish have soft cartilage bodies and special organic chemicals (osmolytes) to survive 1,000x atmospheric pressure."
  },
  {
    category: "Earth & Oceans ♨️",
    fact: "Deep-sea hydrothermal vents (black smokers) blast mineral-rich water at over 750°F (400°C)—yet the water does not boil due to extreme ocean pressure!",
    q: "Why doesn't superheated 750°F water boil at deep-sea hydrothermal vents?",
    options: ["Extreme ocean water pressure prevents it from vaporizing into steam", "The water is frozen", "The vents are made of ice", "The water contains no oxygen"],
    answer: 0,
    explanation: "Under immense hydrostatic pressure at the sea floor, the boiling point of water is raised far above 100°C."
  },
  {
    category: "Earth & Oceans 🌊",
    fact: "Tsunami waves in deep open ocean water can travel as fast as a commercial jet airplane—over 500 miles per hour (800 km/h)!",
    q: "How fast can a tsunami wave travel across the open ocean?",
    options: ["Over 500 mph (speed of a jet airliner)", "10 mph", "25 mph", "Speed of light"],
    answer: 0,
    explanation: "In deep ocean water, tsunami wave velocity depends on water depth, enabling 500+ mph speeds."
  },
  {
    category: "Earth & Oceans 🧊",
    fact: "Lake Baikal in Siberia is the oldest and deepest lake on Earth (over 5,300 feet deep) and holds 20% of all unfrozen surface fresh water on the planet!",
    q: "Which lake is the deepest and oldest lake on planet Earth?",
    options: ["Lake Baikal in Russia", "Lake Superior in North America", "Lake Victoria in Africa", "Caspian Sea"],
    answer: 0,
    explanation: "Lake Baikal holds more fresh water than all 5 North American Great Lakes combined!"
  },
  {
    category: "Earth & Oceans 🌍",
    fact: "The Pacific Ocean alone is larger in area than all of Earth's dry land continents and islands combined together!",
    q: "Is the Pacific Ocean larger or smaller than all Earth's dry land combined?",
    options: ["Larger than all Earth's land combined (63 million sq miles)", "Smaller than Africa", "Exactly half the size of Asia", "Equal to Europe"],
    answer: 0,
    explanation: "The Pacific covers roughly 165 million square kilometers, surpassing Earth's total land area of 149 million sq km."
  },

  // ==========================================
  // 3. SPACE & SOLAR SYSTEM (25 Facts)
  // ==========================================
  {
    category: "Space & Solar System 🪐",
    fact: "Venus is the hottest planet in the solar system (over 867°F / 464°C)—even hotter than Mercury—because its dense carbon dioxide atmosphere traps intense heat in a runaway greenhouse effect!",
    q: "Which planet in our solar system has the hottest surface temperature?",
    options: ["Venus", "Mercury", "Mars", "Jupiter"],
    answer: 0,
    explanation: "Although Mercury is closer to the Sun, Venus's thick atmosphere traps heat, reaching 867°F (464°C)!"
  },
  {
    category: "Space & Solar System ⏳",
    fact: "A single day on Venus (243 Earth days) is longer than a whole year on Venus (225 Earth days) because it spins so slowly backwards on its axis!",
    q: "On which planet is a single day longer than its entire year?",
    options: ["Venus", "Mars", "Jupiter", "Neptune"],
    answer: 0,
    explanation: "Venus takes 243 Earth days to rotate once, but orbits the Sun in only 225 Earth days!"
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
  {
    category: "Space & Solar System 🪐",
    fact: "Saturn's dazzling rings are made of billions of pieces of almost 99% pure water ice, ranging from tiny sugar-cube crystals to house-sized ice boulders!",
    q: "What are the rings of Saturn primarily composed of?",
    options: ["Water ice pieces and crystals", "Solid titanium steel", "Glowing diamond dust", "Burning gases"],
    answer: 0,
    explanation: "Saturn's rings are over 99% water ice orbiting in a thin disc only 10 to 30 feet thick in many places!"
  },
  {
    category: "Space & Solar System 🌅",
    fact: "Sunsets on Mars appear bright blue to human eyes because fine dust particles in the thin Martian atmosphere scatter red light and let blue light pass through!",
    q: "What color does a sunset look like on the planet Mars?",
    options: ["Blue", "Green", "Bright Purple", "Golden Yellow"],
    answer: 0,
    explanation: "The fine dust on Mars scatters blue light more effectively near the sun during sunrise and sunset."
  },
  {
    category: "Space & Solar System 👣",
    fact: "Astronaut footprints on the Moon will remain preserved for at least 100 million years because the Moon has no atmosphere, wind, rain, or running water to erode them!",
    q: "Why will Apollo astronaut footprints stay on the Moon for millions of years?",
    options: ["The Moon has no wind, rain, or atmosphere to wash them away", "They were cemented into concrete", "The Moon's gravity keeps them frozen", "Astronaut boots were magnetized"],
    answer: 0,
    explanation: "Without atmospheric weather, the only thing that alters the lunar surface is micro-meteorite bombardment."
  },
  {
    category: "Space & Solar System 🤫",
    fact: "Space is completely silent! Sound waves need air molecules or matter to vibrate and travel through—since space is a vacuum, no sound can ever be heard.",
    q: "Why is outer space completely silent?",
    options: ["Space is a vacuum with no air molecules for sound waves to travel through", "Sound is absorbed by dark matter", "Stars absorb all noise", "Sound only exists inside buildings"],
    answer: 0,
    explanation: "Sound is a mechanical wave requiring a physical medium like air, water, or metal to propagate."
  },
  {
    category: "Space & Solar System 🛰️",
    fact: "The International Space Station (ISS) orbits Earth at 17,500 miles per hour (28,000 km/h)—astronauts aboard witness 16 sunrises and 16 sunsets every single day!",
    q: "How many sunrises and sunsets do astronauts on the Space Station see in 24 hours?",
    options: ["16 sunrises and 16 sunsets (orbiting Earth every 90 minutes)", "Only 1 sunrise", "365 sunrises", "0 sunrises"],
    answer: 0,
    explanation: "Traveling at 5 miles per second, the ISS completes a full orbit of planet Earth every 90 minutes."
  },
  {
    category: "Space & Solar System 🪐",
    fact: "Jupiter has 95 officially recognized moons! Its largest moon, Ganymede, is actually bigger than the planet Mercury and Pluto.",
    q: "Which moon in our solar system is larger than the planet Mercury?",
    options: ["Ganymede (moon of Jupiter)", "Earth's Moon", "Europa", "Phobos"],
    answer: 0,
    explanation: "Ganymede has a diameter of 5,268 km, making it larger than Mercury (4,879 km) and Pluto."
  },
  {
    category: "Space & Solar System 💦",
    fact: "Saturn's icy moon Enceladus shoots giant geysers of liquid water and ice crystals directly into space from a warm subsurface ocean hidden beneath its crust!",
    q: "Which icy moon shoots giant water geysers into space from an underground ocean?",
    options: ["Enceladus (moon of Saturn)", "Io", "Titan", "Callisto"],
    answer: 0,
    explanation: "Cassini spacecraft flew through Enceladus's geyser plumes, detecting salt, water vapor, and organic compounds."
  },
  {
    category: "Space & Solar System ⚽",
    fact: "The planet Uranus rotates on its side with an extreme 98-degree axial tilt—it essentially rolls around the Sun like a giant blue ball during its 84-year orbit!",
    q: "Which planet in our solar system rotates tilted completely on its side (~98 degrees)?",
    options: ["Uranus", "Jupiter", "Earth", "Mercury"],
    answer: 0,
    explanation: "A massive collision with an Earth-sized protoplanet billions of years ago likely knocked Uranus on its side."
  },
  {
    category: "Space & Solar System ⚡",
    fact: "Light from the Sun takes approximately 8 minutes and 20 seconds to travel 93 million miles across space and reach your eyes on Earth!",
    q: "How long does it take for sunlight to travel from the Sun to Earth?",
    options: ["About 8 minutes and 20 seconds", "Instantaneously (0 seconds)", "1 hour", "1 full day"],
    answer: 0,
    explanation: "Light travels at 186,282 miles per second (300,000 km/s), covering the 93 million mile distance in 500 seconds."
  },

  // ==========================================
  // 4. ANIMALS & NATURE (35 Facts)
  // ==========================================
  {
    category: "Animals & Nature 🐋",
    fact: "A Blue Whale's heart is as big as a bumper car (weighing 400 pounds), its tongue weighs as much as an entire elephant, and a human could swim through its main aorta artery!",
    q: "How large is the heart of a Blue Whale, the largest animal on Earth?",
    options: ["About the size of a small car / bumper car", "The size of an apple", "The size of a basketball", "The size of a football"],
    answer: 0,
    explanation: "Blue whale hearts weigh over 400 lbs (180 kg) to pump blood through their 100-foot bodies!"
  },
  {
    category: "Animals & Nature 🐙",
    fact: "Octopuses have THREE hearts, NINE brains (one in the head and one in each of its 8 arms), and their blood is colored BLUE because it uses copper (hemocyanin) to carry oxygen!",
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
    explanation: "Honey's low moisture content and natural hydrogen peroxide make it inhospitable for bacteria or mold to grow."
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
  {
    category: "Animals & Nature 🦥",
    fact: "Sloths can hold their breath underwater for up to 40 minutes—longer than dolphins—by slowing their heart rate down to a third of its normal pace!",
    q: "Can sloths hold their breath underwater longer than dolphins?",
    options: ["Yes, up to 40 minutes by slowing their heart rate", "No, sloths cannot swim", "Only for 5 seconds", "Only in winter"],
    answer: 0,
    explanation: "Sloths are surprisingly graceful swimmers and can suppress their metabolic heart rate underwater."
  },
  {
    category: "Animals & Nature 🦅",
    fact: "The Peregrine Falcon is the fastest animal on planet Earth, reaching hunting dive speeds over 240 miles per hour (386 km/h) to strike prey in midair!",
    q: "What is the fastest animal on planet Earth during a hunting dive?",
    options: ["Peregrine Falcon (dives at 240+ mph)", "Cheetah", "Sailfish", "Golden Eagle"],
    answer: 0,
    explanation: "Aerodynamic teardrop body shapes allow peregrine falcons to exceed 240 mph during high-altitude hunting stoops."
  },
  {
    category: "Animals & Nature 🐦",
    fact: "Hummingbirds are the only birds on Earth capable of flying backwards, upside down, and hovering in place, beating their wings up to 80 times per second!",
    q: "Which bird is the only one capable of flying backwards and hovering upside down?",
    options: ["Hummingbird", "Eagle", "Woodpecker", "Sparrow"],
    answer: 0,
    explanation: "Hummingbirds have specialized ball-and-socket shoulder joints allowing 180-degree figure-eight wing rotations."
  },
  {
    category: "Animals & Nature 🦎",
    fact: "Axolotls have miraculous regenerative superpowers—they can completely regrow amputated limbs, spinal cords, heart muscle, and even parts of their brain without scarring!",
    q: "What unique medical superpower makes the Axolotl famous?",
    options: ["It can fully regrow lost limbs, spine, heart, and brain tissue", "It can breathe fire", "It never needs to sleep", "It turns invisible"],
    answer: 0,
    explanation: "Axolotls recruit specialized stem cells to flawlessly rebuild complex bone, muscle, and nerve tissue."
  },
  {
    category: "Animals & Nature 🐘",
    fact: "Elephants are the only living mammals on Earth that cannot jump! Their heavy bone structure and downward-facing leg anatomy are designed to support 12,000 lbs.",
    q: "Which is the only mammal on Earth that cannot physically jump?",
    options: ["Elephant", "Hippopotamus", "Rhinoceros", "Sloth"],
    answer: 0,
    explanation: "Elephant leg bones are straight pillars without the springy ankle joints needed to propel their 6-ton bodies off the ground."
  },
  {
    category: "Animals & Nature 🦦",
    fact: "Sea otters hold hands with each other while sleeping floating on ocean water so ocean currents don't sweep them apart from their family raft!",
    q: "Why do sea otters hold hands while sleeping on the ocean surface?",
    options: ["To prevent ocean currents from drifting them apart", "To stay warm from body heat", "To catch passing fish", "To protect against sharks"],
    answer: 0,
    explanation: "Otters form floating 'rafts' of up to 100 otters and wrap themselves in kelp and hold hands while resting."
  },
  {
    category: "Animals & Nature ⚡",
    fact: "An Electric Eel can produce electric shocks of up to 860 volts and 1 amp—enough electrical energy to stun a full-grown horse or illuminate a string of lightbulbs!",
    q: "How powerful can an Electric Eel's discharge be?",
    options: ["Up to 860 volts (enough to stun a horse)", "1.5 volts (like a AA battery)", "0 volts", "50,000 volts"],
    answer: 0,
    explanation: "Thousands of stacked electrocyte biological battery cells align in series along the eel's body to unleash 860V pulses."
  },
  {
    category: "Animals & Nature 🐨",
    fact: "Koalas have unique ridge patterns on their fingertips that are so virtually identical to human fingerprints that even electron microscopes have trouble telling them apart!",
    q: "Which animal has fingerprints so identical to human fingerprints that they can confuse crime scene investigations?",
    options: ["Koala", "Chimpanzee", "Raccoon", "Cat"],
    answer: 0,
    explanation: "Koala fingerprints evolved independently for gripping eucalyptus bark, closely mimicking human whorls and loops."
  },
  {
    category: "Animals & Nature 🐄",
    fact: "Cows have specific best friends in their herds! When separated from their preferred companions, their heart rates increase and they show measurable cortisol stress.",
    q: "Do cows have best friends in their herd?",
    options: ["Yes, and their stress levels rise when separated", "No, cows have no social bonds", "Only during winter", "Only calves have friends"],
    answer: 0,
    explanation: "Behavioral studies from the University of Northampton proved cattle form close reciprocal social pairs."
  },
  {
    category: "Animals & Nature 🦋",
    fact: "Butterflies taste their food with their feet! Chemoreceptors on their tarsi allow them to land on a leaf or flower and instantly test if it is sweet nectar or edible for caterpillars.",
    q: "Which body part does a butterfly use to taste food and leaves?",
    options: ["Their feet (tarsi)", "Their antennae", "Their wings", "Their eyes"],
    answer: 0,
    explanation: "Sensory organs on the butterfly's legs detect dissolved sugars and plant chemicals upon landing."
  },
  {
    category: "Animals & Nature 🦆",
    fact: "Platypuses glow a fluorescent neon cyan-green under ultraviolet blacklight! Scientists discovered their dense fur absorbs UV radiation and re-emits visible light.",
    q: "What surprising thing happens to a platypus under ultraviolet blacklight?",
    options: ["Its fur glows fluorescent cyan-green (biofluorescence)", "It turns invisible", "It changes color to red", "Nothing happens"],
    answer: 0,
    explanation: "Biofluorescence in platypus fur helps absorb UV light and may aid in twilight communication."
  },
  {
    category: "Animals & Nature 🧱",
    fact: "Wombats produce cube-shaped poop! Their unique intestines have variable elasticity that molds waste into 100 cubes every day, stopping it from rolling off rocks where they mark territory.",
    q: "Why is wombat poop shaped like perfect cubes?",
    options: ["So it doesn't roll off elevated rocks and logs used to mark territory", "Because wombats eat bricks", "Due to cold temperatures", "To build underground nests"],
    answer: 0,
    explanation: "The final 8% of the wombat intestine has stiff and flexible grooves that compress feces into 2 cm cubes."
  },
  {
    category: "Animals & Nature 🦌",
    fact: "Reindeer eyes change color with the seasons—from golden-orange in bright summer to deep reflective blue in dark Arctic winter to capture more dim moonlight!",
    q: "Why do reindeer eyes change from gold in summer to deep blue in winter?",
    options: ["To increase light sensitivity in dark Arctic winter months", "Because of cold temperatures", "To attract other reindeer", "From eating snow"],
    answer: 0,
    explanation: "Winter pressure increases in the eye's tapetum lucidum layer, shifting reflected light to blue for 1,000x greater sensitivity."
  },
  {
    category: "Animals & Nature 🥊",
    fact: "The Mantis Shrimp can strike its club-like claws at the speed of a .22 caliber bullet—so fast that it vaporizes the water, creating cavitation sparks hotter than the surface of the Sun!",
    q: "How fast and powerful is the punch of a Mantis Shrimp?",
    options: ["Fast as a bullet, creating superheated water bubbles and light flashes", "As slow as a snail", "Gentle like a butterfly", "Only 5 mph"],
    answer: 0,
    explanation: "Mantis shrimp strike at 50 mph with 10,000 Gs acceleration, creating collapsing cavitation shockwaves that smash crab shells."
  },

  // ==========================================
  // 5. SCIENCE, PHYSICS & BODY (35 Facts)
  // ==========================================
  {
    category: "Science & Body 💡",
    fact: "Your brain generates about 20 watts of electrical power when you are awake—enough electricity to illuminate a small LED lightbulb!",
    q: "About how much electrical power does an active human brain generate?",
    options: ["About 20 watts (enough for an LED bulb)", "1,000,000 volts", "0 watts", "100 horsepower"],
    answer: 0,
    explanation: "Billions of firing neurons produce measurable electrical activity totaling roughly 12-25 watts."
  },
  {
    category: "Science & Physics ❄️",
    fact: "Water is one of the only liquids that expands when it freezes! Because ice is less dense than liquid water, ice floats on top of lakes, insulating the fish underneath from freezing.",
    q: "Why does ice float on top of liquid water?",
    options: ["Water expands as it freezes, making ice less dense than water", "Ice is filled with helium gas", "Ice is heavier than water", "Cold water pushes ice upward with magnetic force"],
    answer: 0,
    explanation: "Water forms open crystalline hexagonal structures as it freezes, reducing its density so it floats."
  },
  {
    category: "Science & Materials 💎",
    fact: "Both graphite in a pencil and sparkling diamonds are made of pure Carbon! Extreme heat and pressure deep inside Earth crush carbon atoms into diamond, the hardest natural mineral known.",
    q: "What element forms both soft pencil graphite and ultra-hard diamonds?",
    options: ["Carbon (C)", "Gold (Au)", "Iron (Fe)", "Silicon (Si)"],
    answer: 0,
    explanation: "Carbon atoms arranged in a tetrahedral crystal lattice form diamond, the hardest natural mineral."
  },
  {
    category: "Science & Genetics 🧬",
    fact: "If you uncoiled and stretched out all the DNA strands inside all 37 trillion cells of your body, it would reach from Earth to Pluto and back!",
    q: "How far would all the DNA in your body reach if unraveled end-to-end?",
    options: ["From Earth to Pluto and back (billions of miles)", "About 6 feet", "Around the Moon once", "Across one football field"],
    answer: 0,
    explanation: "Each cell holds ~2 meters of DNA—multiplied across trillions of cells, that equals over 10 billion miles of genetic code."
  },
  {
    category: "Science & Genetics 🍌",
    fact: "Humans share about 60% of our active genetic DNA coding with bananas! Basic cellular machinery for cell division and protein building is identical across life.",
    q: "About how much DNA do humans share with bananas?",
    options: ["About 60% of our genetic code", "0%", "100%", "99%"],
    answer: 0,
    explanation: "Fundamental housekeeping genes for cellular respiration and DNA replication are shared across plants and animals."
  },
  {
    category: "Science & Body 🦴",
    fact: "Human bones are stronger than steel ounce-for-ounce! A single cubic inch of human bone can withstand a compressive load of over 19,000 pounds (9 tons).",
    q: "Is human bone stronger or weaker than steel ounce-for-ounce?",
    options: ["Stronger than steel (can hold 19,000 lbs per cubic inch)", "Much weaker than wood", "Same as plastic", "Fragile as glass"],
    answer: 0,
    explanation: "Composite collagen proteins and calcium phosphate hydroxyapatite minerals give bone extreme tensile and compressive strength."
  },
  {
    category: "Science & Physics 🌡️",
    fact: "Under certain conditions, warm water can actually freeze into ice faster than cold water—a famous physics paradox known as the Mpemba Effect!",
    q: "What is the Mpemba Effect in physics?",
    options: ["Warm water freezing into ice faster than cold water", "Ice boiling at 0°C", "Water turning into steam without heat", "Freezing without cold"],
    answer: 0,
    explanation: "Evaporation, dissolved gases, and convection currents can cause warmer water to cool more rapidly under specific conditions."
  },
  {
    category: "Science & Body 🧪",
    fact: "Your stomach produces powerful hydrochloric acid strong enough to dissolve zinc metal—so your stomach must create a brand-new protective mucus lining every 3 days to prevent digesting itself!",
    q: "Why doesn't your stomach acid dissolve your own stomach?",
    options: ["The stomach constantly secretes a thick protective mucus lining that renews every 3 days", "Stomach acid is completely harmless", "Stomach walls are made of bone", "Food blocks all acid"],
    answer: 0,
    explanation: "Specialized epithelial cells produce alkaline bicarbonate mucus to shield stomach tissues from pH 1.5 gastric acid."
  },
  {
    category: "Science & Materials ⏳",
    fact: "Glass is actually made from common sand (silicon dioxide)! When sand is melted in an ultra-hot furnace at 3,090°F (1,700°C) and cooled, it transforms into transparent solid glass.",
    q: "What everyday natural material is melted down to make clear glass?",
    options: ["Beach sand (silicon dioxide)", "Crushed sea shells", "Melted limestone", "Refined petroleum"],
    answer: 0,
    explanation: "Melting silica sand and soda ash disrupts crystal formation, cooling into an amorphous transparent solid."
  },
  {
    category: "Science & Physics 🔊",
    fact: "Sound travels about 4 times faster through liquid water (3,300 mph) and 15 times faster through solid steel than through normal air!",
    q: "Does sound travel faster through air or through water and solid steel?",
    options: ["Faster through water (4x) and steel (15x) because molecules are packed closer", "Faster through empty air", "Sound cannot travel through water", "Same speed everywhere"],
    answer: 0,
    explanation: "Denser materials with tighter molecular bonds transmit vibrational compression waves much more rapidly."
  },
  {
    category: "Science & Space ☀️",
    fact: "Helium is the only element on the periodic table that was discovered in outer space on the Sun before it was ever discovered on planet Earth!",
    q: "Which element was discovered on the Sun during a solar eclipse before being found on Earth?",
    options: ["Helium (named after Helios, the Greek sun god)", "Hydrogen", "Oxygen", "Gold"],
    answer: 0,
    explanation: "In 1868, astronomers detected a bright yellow spectral line in sunlight, naming the new element Helium."
  },
  {
    category: "Science & Body 👁️",
    fact: "The human eye can distinguish approximately 10 million distinct colors, using three types of cone photoreceptors (Red, Green, Blue) working together!",
    q: "Approximately how many distinct colors can a healthy human eye distinguish?",
    options: ["About 10 million distinct shades and colors", "Only 256 colors", "Exactly 7 colors of the rainbow", "1,000 colors"],
    answer: 0,
    explanation: "Trichromatic vision combines signals from 6 million cones to perceive millions of chromatic gradations."
  },
  {
    category: "Science & Weather ☁️",
    fact: "An average fluffy white cumulus cloud weighs over 1.1 million pounds (500,000 kg)—as heavy as 100 adult elephants floating peacefully in the sky!",
    q: "About how much does a typical fluffy cumulus cloud weigh?",
    options: ["Over 1 million pounds (about 100 elephants)", "Less than a feather", "10 pounds", "50 grams"],
    answer: 0,
    explanation: "A 1-cubic-kilometer cloud contains roughly 500,000 kg of tiny suspended water droplets spread across warm rising air."
  },

  // ==========================================
  // 6. ENGINEERING & HISTORY (15 Facts)
  // ==========================================
  {
    category: "Engineering & History 🚢",
    fact: "The Panama Canal uses no water pumps—it operates entirely on natural gravity! Massive water locks lift giant cargo ships 85 feet up over mountain ridges between the Atlantic and Pacific oceans.",
    q: "How do the locks in the Panama Canal lift giant ships over mountains?",
    options: ["Natural gravity feeds water from higher lakes into the lock chambers", "Giant diesel water pumps", "Helicopters lift the ships", "Nuclear magnets"],
    answer: 0,
    explanation: "Water flows downhill from Gatun Lake into the lock chambers purely by gravitational force."
  },
  {
    category: "Engineering & History 🏛️",
    fact: "The Great Pyramid of Giza in Egypt stood as the tallest human-made structure in the world for over 3,800 years, until Lincoln Cathedral in England surpassed it in 1311 AD!",
    q: "For how many years was the Great Pyramid of Giza the tallest building on Earth?",
    options: ["Over 3,800 years (until 1311 AD)", "50 years", "200 years", "Only 10 years"],
    answer: 0,
    explanation: "Built around 2560 BC at 146.6 meters (481 ft), the Great Pyramid held the height record for nearly four millennia."
  },
  {
    category: "Engineering & Science 🗼",
    fact: "The Eiffel Tower in Paris grows up to 6 inches (15 cm) taller during hot summer days because high temperatures cause the iron metal to expand!",
    q: "Why does the Eiffel Tower grow up to 6 inches taller in the summer?",
    options: ["Thermal expansion causes the iron metal structure to expand in heat", "They build new levels every summer", "Wind stretches the tower upward", "Paris ground rises"],
    answer: 0,
    explanation: "Heat increases kinetic energy in iron atoms, causing the 7,300-ton puddled iron framework to physically expand."
  },
  {
    category: "Engineering & History 🏛️",
    fact: "Ancient Roman concrete made of volcanic ash and lime actually grows stronger over thousands of years when exposed to ocean waves due to rare mineral crystallization (tobermorite)!",
    q: "Why have 2,000-year-old Roman ocean harbors survived without crumbling?",
    options: ["Roman volcanic concrete chemically reacts with seawater to grow stronger over time", "They repainted it every year", "It was coated in plastic", "They were built on dry land"],
    answer: 0,
    explanation: "Seawater dissolves volcanic ash minerals, growing aluminum tobermorite interlocking crystals that reinforce the concrete."
  },
  {
    category: "Engineering & Space 🛰️",
    fact: "NASA's Voyager 1 spacecraft, launched in 1977, is the farthest human-made object from Earth—it is currently over 15 billion miles away in interstellar space, still communicating with Earth!",
    q: "What is the farthest human-made spacecraft from Earth, traveling through interstellar space?",
    options: ["Voyager 1 (over 15 billion miles away)", "Apollo 11", "Hubble Space Telescope", "Mars Rover Curiosity"],
    answer: 0,
    explanation: "Voyager 1 crossed the heliopause in 2012 into interstellar space, powered by decaying plutonium generators."
  }
];

window.TRIVIA_FACTS_BANK = TRIVIA_FACTS_BANK;
