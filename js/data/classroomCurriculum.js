/**
 * ClassroomCurriculum - Teacher-aligned elementary curriculum database
 * 
 * SCIENCE UNITS:
 * 1. Habitats of the World (Forest, Desert, Ocean, Grassland, Mountain, Arctic, Rainforest, Wetland, Coral Reef)
 * 2. Adaptations (Structural vs. Behavioral)
 * 3. Behavioral Traits & Survival
 * 4. Migration
 * 5. Fossils & Extinction (Impressions, tracks, bones)
 * 6. Endangered & Invasive Species (Florida Burmese Python, Lionfish)
 * 7. Conservation & Conservationists
 * 8. Ecosystems (Living vs. Nonliving Sorter)
 * 9. Climate vs. Weather
 * 
 * MATH UNITS:
 * 1. Multiplication Basics (Factors, Product, Equal Groups)
 * 2. Array Rotation & Commutative Property (90° Rotation, a×b = b×a)
 * 3. Parentheses & Grouping
 * 4. Division Basics (Sharing vs. Grouping)
 * 5. Quotients
 * 6. Analog Clock & Time (Hour/Minute hands, 5-min intervals, AM/PM)
 * 7. Elapsed Time Scenarios
 * 8. 2D Shapes & Polygons (Sides, Vertices, Rhombus vs. Diamond)
 * 9. 3D Shapes & Polyhedra (Faces, Edges, Vertices, Curved Surfaces)
 * 10. 3D Real-World Matching
 */

const CLASSROOM_CURRICULUM = {
  science: [
    {
      id: "sci_habitats",
      title: "Habitats Around the World",
      category: "science",
      icon: "🌎",
      tag: "ECOSYSTEMS & HOMES",
      estimatedMins: 5,
      achievementId: "ach_habitat_hero",
      didYouKnow: "A habitat is more than just a place to live! It must provide five essential things for an organism to survive: Food, Water, Shelter, Space, and the right Environmental Conditions.",
      definition: "A habitat is the natural home or environment where an organism lives and gets everything it needs to survive.",
      examples: [
        { name: "Forest 🌲", text: "Home to bears, owls, and deer among trees and forest floor layers." },
        { name: "Desert 🌵", text: "Dry habitat with little rain where camels and fennec foxes conserve water." },
        { name: "Ocean 🌊", text: "Vast saltwater ecosystem with different depths for whales, turtles, and sharks." },
        { name: "Arctic ❄️", text: "Freezing polar ice where polar bears and walruses live. (No wild penguins here!)" },
        { name: "Rainforest 🌴", text: "Warm, wet forest teeming with toucans, jaguars, and high canopy layers." },
        { name: "Wetland 🐸", text: "Land covered by shallow water like marshes and swamps, filtering clean water." },
        { name: "Coral Reef 🪸", text: "Vibrant marine ecosystems built by tiny coral animals (corals are animals, not plants!)." }
      ],
      interactiveType: "habitats_explorer",
      goDeeper: "Forests and rainforests have distinct vertical layers of life: the Forest Floor (dark and rich), Understory (shrubs), Canopy (leafy ceiling where most animals live), and the Emergent Layer (giant trees poking above the rest)!",
      questions: [
        { q: "What is a habitat?", options: ["The natural place where an organism lives and gets food, water, and shelter", "A place where only plants can grow", "A type of weather that lasts one day", "A cage in a zoo"], answer: 0, explanation: "A habitat is an organism's natural home providing food, water, shelter, space, and conditions to survive." },
        { q: "A camel lives in a hot, dry environment with very little rainfall. Which habitat is this?", options: ["Desert", "Wetland", "Coral Reef", "Arctic"], answer: 0, explanation: "Deserts are defined by extreme dryness and very low annual precipitation." },
        { q: "Which animal naturally lives in the icy Arctic habitat?", options: ["Polar Bear", "Penguin", "Toucan", "Camel"], answer: 0, explanation: "Polar bears live in the Arctic (North Pole). Penguins naturally live in the Southern Hemisphere (Antarctica)!" },
        { q: "True or False: Corals in a coral reef are colorful rocks or marine plants.", options: ["False — Corals are living marine animals!", "True — They are underwater plants"], answer: 0, explanation: "Corals are actually colonies of tiny invertebrate animals called polyps!" },
        { q: "A frog lives in a marsh with shallow water, cattail reeds, dragonflies, and fish. What habitat is this?", options: ["Wetland", "Desert", "Mountain", "Arctic"], answer: 0, explanation: "Wetlands (marshes and swamps) are areas of land saturated with water for most of the year." },
        { q: "Which habitat is characterized by wide open spaces dominated by grasses with few large trees?", options: ["Grassland", "Rainforest", "Ocean", "Coral Reef"], answer: 0, explanation: "Grasslands have rich soil and grasses, supporting grazers like bison and zebras." },
        { q: "Why do mountain goats have specialized hooves?", options: ["To climb steep, rocky cliffs in high-elevation mountain habitats", "To swim deep underwater", "To fly through the trees", "To dig underground sand tunnels"], answer: 0, explanation: "Mountain goats have rubbery, split hooves tailored for high rocky mountain terrain." },
        { q: "Which of the following is NOT one of the 5 essential things a habitat must provide?", options: ["Video games", "Food", "Water", "Shelter"], answer: 0, explanation: "All habitats must provide Food, Water, Shelter, Space, and the right conditions to survive." },
        { q: "What is the topmost layer of a lush tropical rainforest called?", options: ["Emergent Layer", "Understory", "Forest Floor", "Basement"], answer: 0, explanation: "The tallest trees that rise above the leafy canopy form the emergent layer." },
        { q: "If you see a picture with a Polar Bear and a Penguin standing together on ice, what is scientifically incorrect?", options: ["Polar bears live in the Arctic (North) while penguins live in Antarctica (South) — they never meet in the wild!", "Polar bears are vegetarians", "Penguins can fly faster than jets", "Nothing, they are best friends in nature"], answer: 0, explanation: "Polar bears are native to the Arctic (Northern Hemisphere), while penguins live in the Southern Hemisphere." }
      ]
    },
    {
      id: "sci_adaptations",
      title: "Adaptations: Body & Behavior",
      category: "science",
      icon: "🐾",
      tag: "SURVIVAL TRAITS",
      estimatedMins: 5,
      achievementId: "ach_survival_scientist",
      didYouKnow: "Did you know that a chameleon's eyes can swivel and focus on two completely different objects at the same time? That is an incredible structural adaptation!",
      definition: "An adaptation is a special body structure or behavior that helps an organism survive and thrive in its environment.",
      examples: [
        { name: "Structural Adaptation 🦴", text: "Physical body features: thick polar bear blubber, duck webbed feet, sharp eagle talons, or cactus spines." },
        { name: "Behavioral Adaptation 🏃", text: "Actions organisms do: geese migrating south for winter, bears hibernating, or owls hunting at night." }
      ],
      interactiveType: "adaptation_sorter",
      goDeeper: "Adaptations develop over many generations as traits that help organisms survive are passed down to offspring.",
      questions: [
        { q: "What is an adaptation?", options: ["A body feature or behavior that helps an organism survive", "A trick taught to pet dogs", "A change in the weather during the afternoon", "A type of fossil rock"], answer: 0, explanation: "Adaptations are traits that give organisms an advantage in their environment." },
        { q: "Which of the following is a STRUCTURAL adaptation?", options: ["Duck's webbed feet for swimming", "A bear sleeping through winter (hibernation)", "Birds flying south for winter (migration)", "A wolf howling to communicate"], answer: 0, explanation: "Webbed feet are a physical body structure." },
        { q: "Which of the following is a BEHAVIORAL adaptation?", options: ["Monarch butterflies migrating to warmer climates", "Cactus having sharp spines", "A polar bear having thick white fur", "A shark having razor-sharp teeth"], answer: 0, explanation: "Migration is an action/behavior that animals perform to survive harsh seasons." },
        { q: "How do spines on a desert cactus help it survive?", options: ["They reduce water loss and protect the plant from thirsty animals", "They help the cactus absorb more snow", "They make sweet fruit for birds", "They help the cactus walk to new soil"], answer: 0, explanation: "Cactus spines are modified leaves that minimize evaporation and deter herbivores." },
        { q: "Why might an Arctic mammal have a thick layer of blubber (fat)?", options: ["It provides thermal insulation to trap body heat in freezing temperatures", "It helps the animal jump higher", "It turns the animal invisible", "It helps the animal breathe underwater"], answer: 0, explanation: "Blubber acts as an insulator, reducing heat loss into freezing water or air." }
      ]
    },
    {
      id: "sci_migration",
      title: "Migration & Animal Journeys",
      category: "science",
      icon: "🦅",
      tag: "SEASONAL JOURNEYS",
      estimatedMins: 4,
      achievementId: "ach_survival_scientist",
      didYouKnow: "The Arctic Tern flies up to 44,000 miles every single year—migrating from the Arctic to Antarctica and back! That is the longest journey of any animal on Earth.",
      definition: "Migration is the regular, seasonal movement of animals from one region or habitat to another to find food, warmer weather, or safe places to raise young.",
      examples: [
        { name: "Bird Migration 🪶", text: "Songbirds and geese fly south before freezing winter snow covers their food supply." },
        { name: "Ocean Migration 🐋", text: "Humpback whales travel thousands of miles to warm tropical waters to give birth." },
        { name: "Land Migration 🦓", text: "Over one million wildebeest and zebras march across the Serengeti following fresh rain and green grass." }
      ],
      interactiveType: "migration_map",
      goDeeper: "Animals navigate during migration using the sun, stars, Earth's magnetic field, and even smell memory!",
      questions: [
        { q: "What is animal migration?", options: ["Regular, seasonal travel between habitats to find food, warmth, or breeding grounds", "When an animal sleeps all winter", "When an animal grows new fur", "When a pet goes to the vet"], answer: 0, explanation: "Migration is the periodic journey animals make between seasons." },
        { q: "Which is a primary reason why birds migrate before winter arrives?", options: ["Food becomes scarce and temperatures drop", "They want to go on vacation", "They get tired of trees", "They lose their feathers in winter"], answer: 0, explanation: "Freezing temperatures kill insects and freeze lakes, forcing animals to travel where food is abundant." },
        { q: "Which animal makes a famous annual 3,000-mile journey from Canada and the US to forests in Mexico?", options: ["Monarch Butterfly", "Honeybee", "Grasshopper", "Ladybug"], answer: 0, explanation: "Monarch butterflies undertake an incredible multi-generational migration to Mexico." },
        { q: "How does migration help an animal species survive?", options: ["It ensures access to food and favorable climate throughout the year", "It makes them run faster than cheetahs", "It helps them change their color", "It prevents predators from ever hunting them"], answer: 0, explanation: "Moving with the seasons ensures reliable food and safe breeding conditions." },
        { q: "True or False: Migration is a behavioral adaptation.", options: ["True — Migration is an action or instinctual behavior animals perform", "False — Migration is a bone inside an animal"], answer: 0, explanation: "Behaviors like migration and hibernation are behavioral adaptations." }
      ]
    },
    {
      id: "sci_fossils_extinction",
      title: "Fossils & Extinction",
      category: "science",
      icon: "🦖",
      tag: "EARTH HISTORY",
      estimatedMins: 5,
      achievementId: "ach_fossil_finder",
      didYouKnow: "Not all fossils are bones! Ancient footprints, leaf impressions, dinosaur nests, and even fossilized animal poop (coprolites) are fossils that teach us how ancient organisms lived.",
      definition: "A fossil is the preserved remain, impression, track, or trace of an ancient organism that lived long ago. A species is extinct when no living members remain anywhere on Earth.",
      examples: [
        { name: "Body Fossils 🦴", text: "Mineralized bones, teeth, and shells preserved in sedimentary rock." },
        { name: "Trace Fossils 🐾", text: "Preserved footprints, trackways, burrows, and leaf impressions." },
        { name: "Extinct Organisms 🦕", text: "Non-avian dinosaurs, the Dodo bird, Passenger Pigeon, and Woolly Mammoth." }
      ],
      interactiveType: "fossil_excavator",
      goDeeper: "Paleontologists use the depth of rock layers (stratigraphy) to determine the relative age of fossils—deeper layers are usually older!",
      questions: [
        { q: "What is a fossil?", options: ["Preserved remains, impressions, or traces of organisms from the ancient past", "A shiny new rock made in a factory", "A living plant growing in the forest", "A type of dinosaur egg you can buy at the store"], answer: 0, explanation: "Fossils are physical records of past life preserved in geological materials." },
        { q: "Which of the following is a TRACE fossil rather than a body fossil?", options: ["A dinosaur footprint preserved in hardened mud", "A T-Rex tooth", "A mammoth bone", "A fossilized clam shell"], answer: 0, explanation: "Footprints, tracks, and impressions are trace fossils showing evidence of organism activity." },
        { q: "What does it mean when a species is EXTINCT?", options: ["No living members of that species remain anywhere on Earth", "The species is taking a nap for the winter", "The species has moved to a new forest", "The species is very hungry"], answer: 0, explanation: "Extinction is the permanent loss of an entire species across the globe." },
        { q: "Which of the following organisms is extinct?", options: ["Dodo bird", "Bald Eagle", "African Elephant", "Bottlenose Dolphin"], answer: 0, explanation: "The flightless Dodo bird became extinct in the late 17th century." },
        { q: "Why are fossils important to modern scientists?", options: ["They provide evidence of how life, climates, and environments changed over millions of years", "They make electricity for houses", "They tell us the weather for tomorrow", "They can be used to make new animals overnight"], answer: 0, explanation: "Fossils help scientists reconstruct Earth's biological and evolutionary history." }
      ]
    },
    {
      id: "sci_endangered_invasive",
      title: "Endangered & Invasive Species",
      category: "science",
      icon: "🦁",
      tag: "WILDLIFE CONSERVATION",
      estimatedMins: 5,
      achievementId: "ach_wildlife_protector",
      didYouKnow: "In the Florida Everglades, Burmese pythons from Asia became an invasive species. Because they have no natural predators in Florida, they disrupted local mammal populations!",
      definition: "An endangered species faces a very high risk of extinction. An invasive species is a non-native organism that spreads aggressively and causes ecological or economic harm.",
      examples: [
        { name: "Endangered Species 🐆", text: "Florida Panther, Sea Turtles, and Blue Whales whose populations are declining." },
        { name: "Invasive Species 🐍", text: "Burmese Python and Lionfish in Florida waters that outcompete native wildlife." },
        { name: "Non-Native vs. Invasive 🌱", text: "Not all non-native plants are invasive—only those that spread out of control and harm native ecosystems." }
      ],
      interactiveType: "species_guardian",
      goDeeper: "Conservationists build wildlife corridors—underpasses beneath highways—so endangered panthers can safely cross roads!",
      questions: [
        { q: "What is an ENDANGERED species?", options: ["A species facing a very high risk of extinction in the wild", "An animal that is dangerous to touch", "A species that lives only in zoos", "An animal that has too many babies"], answer: 0, explanation: "Endangered species have populations so low that extinction is a serious danger without protection." },
        { q: "What is an INVASIVE species?", options: ["A non-native organism that spreads and harms native wildlife and ecosystems", "An animal native to the local forest", "Any animal that eats plants", "A pet cat or dog"], answer: 0, explanation: "Invasive species are introduced by humans and outcompete or prey upon native species." },
        { q: "Which of the following is a famous invasive predator in the Florida Everglades?", options: ["Burmese Python", "American Alligator", "Florida Panther", "Manatee"], answer: 0, explanation: "Burmese pythons are native to Southeast Asia but have invaded the Florida Everglades." },
        { q: "True or False: Every single plant or animal brought from another country is invasive.", options: ["False — Only non-native species that spread aggressively and cause harm are classified as invasive", "True — All foreign plants are dangerous"], answer: 0, explanation: "Many non-native plants (like garden tomatoes) do not harm natural ecosystems and are not invasive." },
        { q: "How do invasive Lionfish harm Florida and Caribbean coral reefs?", options: ["They eat huge numbers of young native fish and have venomous spines so few local predators can eat them", "They build giant mud nests that crush corals", "They turn the water into ice", "They pull boats underwater"], answer: 0, explanation: "Lionfish voraciously consume small reef fish and lack natural predators in the Atlantic." }
      ]
    },
    {
      id: "sci_ecosystems",
      title: "Ecosystems: Living & Nonliving",
      category: "science",
      icon: "🌱",
      tag: "BIOTIC & ABIOTIC",
      estimatedMins: 5,
      achievementId: "ach_ecosystem_expert",
      didYouKnow: "A single teaspoon of healthy forest soil can contain over one billion living microorganisms working together with nonliving minerals and moisture!",
      definition: "An ecosystem is a community of living organisms (biotic) interacting with each other and with the nonliving parts (abiotic) of their environment.",
      examples: [
        { name: "Living (Biotic) Parts 🌿", text: "Plants, trees, insects, animals, mushrooms (fungi), and microscopic bacteria." },
        { name: "Nonliving (Abiotic) Parts ☀️", text: "Sunlight, fresh water, oxygen/air, soil minerals, rocks, and temperature." },
        { name: "Interaction Example 🐟", text: "Fish (living) breathe oxygen dissolved in water (nonliving) and hide in rock crevices (nonliving)." }
      ],
      interactiveType: "ecosystem_sorter",
      goDeeper: "Sunlight is the primary source of energy for almost all ecosystems on Earth, powering plant photosynthesis!",
      questions: [
        { q: "What is an ecosystem?", options: ["A community of living organisms interacting with each other and their nonliving environment", "A collection of only rocks and dirt", "A building where scientists work", "A forecast of tomorrow's rain"], answer: 0, explanation: "Ecosystems combine all the biological (living) and physical (nonliving) components of an area." },
        { q: "Which of the following is a NONLIVING (abiotic) part of a pond ecosystem?", options: ["Sunlight and Water", "Bullfrog and Dragonfly", "Water Lily plant", "Pond snail"], answer: 0, explanation: "Sunlight, water, temperature, air, and rocks are nonliving abiotic elements." },
        { q: "Which of the following is a LIVING (biotic) component of a forest?", options: ["Oak tree and Owl", "Soil minerals and Gravel", "Rainwater droplets", "Sunlight filtering through branches"], answer: 0, explanation: "Plants, trees, animals, and fungi are all living biotic organisms." },
        { q: "How do plants (living) depend on nonliving parts of their ecosystem?", options: ["They use sunlight, water, carbon dioxide from air, and soil nutrients to make food", "They use rocks to talk to each other", "They only need living animals to grow", "They do not need anything nonliving"], answer: 0, explanation: "Photosynthesis requires nonliving sunlight, carbon dioxide, and water." },
        { q: "What would happen to an aquatic ecosystem if the water (nonliving) became heavily polluted with chemicals?", options: ["The fish, plants, and amphibians (living) could become sick or die, disrupting the entire community", "The living animals would turn into trees", "Nothing would change at all", "The fish would learn to live on dry land"], answer: 0, explanation: "Changes to nonliving factors directly impact the survival of living organisms." }
      ]
    },
    {
      id: "sci_climate_weather",
      title: "Climate vs. Weather",
      category: "science",
      icon: "🌦️",
      tag: "ATMOSPHERE & PATTERNS",
      estimatedMins: 4,
      achievementId: "ach_ecosystem_expert",
      didYouKnow: "Weather is what you wear today (a raincoat or t-shirt); Climate is the entire wardrobe of clothes in your closet suited for your region across the whole year!",
      definition: "Weather is the day-to-day conditions of the atmosphere in a specific place. Climate is the long-term average pattern of weather in a region over 30 or more years.",
      examples: [
        { name: "Weather (Short-term) ☔", text: "'It is 72°F and raining in Miami this Tuesday afternoon.'" },
        { name: "Climate (Long-term) ☀️", text: "'South Florida has a tropical climate characterized by hot, humid summers and mild winters.'" },
        { name: "Key Distinction 🏜️", text: "It can rain today in the Sahara Desert! That is weather—it does not mean the Sahara has a rainy climate." }
      ],
      interactiveType: "climate_weather_quiz",
      goDeeper: "Scientists measure climate over 30-year periods to distinguish natural seasonal variations from long-term climate trends.",
      questions: [
        { q: "What is the difference between WEATHER and CLIMATE?", options: ["Weather is day-to-day atmospheric conditions; Climate is the long-term pattern over many years", "Weather is for oceans; Climate is for mountains", "Weather lasts 100 years; Climate lasts 10 minutes", "They mean the exact same thing"], answer: 0, explanation: "Weather describes current short-term conditions; climate is the historical long-term average." },
        { q: "'It snowed 4 inches in Atlanta yesterday.' Is this statement describing weather or climate?", options: ["Weather — it describes a specific event on a specific day", "Climate — it describes a 100-year pattern"], answer: 0, explanation: "A single day's precipitation is a weather observation." },
        { q: "If it rains in a desert on Wednesday, does that mean the desert has a wet climate?", options: ["No — a single rainy day is weather; the desert climate remains dry over decades", "Yes — the desert climate is now tropical forever"], answer: 0, explanation: "Weather fluctuates daily, but climate is the 30+ year average condition." },
        { q: "Which statement describes CLIMATE?", options: ["Antarctica is the coldest, driest, and windiest continent on Earth on average", "Today's high temperature was 68°F with a light breeze", "A thunderstorm rolled in at 3:00 PM today", "There is a rainbow outside right now"], answer: 0, explanation: "The long-term average conditions of Antarctica define its polar climate." },
        { q: "Which tool do meteorologists use to measure atmospheric air temperature?", options: ["Thermometer", "Barometer", "Rain gauge", "Anemometer"], answer: 0, explanation: "Thermometers measure temperature in degrees Fahrenheit or Celsius." }
      ]
    }
  ],

  math: [
    {
      id: "math_multiplication_terms",
      title: "Factors, Products & Equal Groups",
      category: "math",
      icon: "✖️",
      tag: "MULTIPLICATION BASICS",
      estimatedMins: 5,
      achievementId: "ach_multiplication_master",
      didYouKnow: "Multiplication is simply fast repeated addition! 4 × 3 means 4 groups of 3 (3 + 3 + 3 + 3 = 12).",
      definition: "In multiplication, the numbers you multiply together are called FACTORS. The answer you get is called the PRODUCT.",
      examples: [
        { name: "3 × 4 = 12", text: "3 and 4 are the FACTORS. 12 is the PRODUCT." },
        { name: "Visualizing Groups 🧺", text: "5 baskets with 4 apples in each basket: 5 × 4 = 20 apples total." },
        { name: "Arrays ⬛", text: "3 rows of 6 tiles = 3 × 6 = 18 total tiles." }
      ],
      interactiveType: "array_builder",
      goDeeper: "Any number multiplied by 0 always equals 0 (Zero Property). Any number multiplied by 1 equals itself (Identity Property)!",
      questions: [
        { q: "In the equation 6 × 7 = 42, what are the numbers 6 and 7 called?", options: ["Factors", "Products", "Quotients", "Remainders"], answer: 0, explanation: "The numbers being multiplied together are called factors." },
        { q: "In the equation 8 × 5 = 40, what is the number 40 called?", options: ["Product", "Factor", "Divisor", "Sum"], answer: 0, explanation: "The result or answer of a multiplication problem is the product." },
        { q: "What does the expression 4 × 6 represent in terms of equal groups?", options: ["4 groups containing 6 items each", "4 plus 6 items", "6 items split into 4 pieces", "4 items minus 6"], answer: 0, explanation: "4 × 6 means 4 equal groups of 6." },
        { q: "If a baker places cookies in an array of 5 rows with 6 cookies in each row, how many cookies are there?", options: ["30 cookies (5 × 6)", "11 cookies (5 + 6)", "25 cookies", "35 cookies"], answer: 0, explanation: "5 rows × 6 columns = 30 cookies in total." },
        { q: "What is the product of 9 × 8?", options: ["72", "64", "81", "74"], answer: 0, explanation: "9 groups of 8 = 72." }
      ]
    },
    {
      id: "math_array_commutative",
      title: "Array Rotation & Commutative Property",
      category: "math",
      icon: "🔄",
      tag: "ROTATE 90° PROPERTY",
      estimatedMins: 5,
      achievementId: "ach_multiplication_master",
      didYouKnow: "When you rotate a 3 × 4 grid of tiles by 90 degrees, it turns into 4 × 3. The total number of tiles (12) never changes! This is the Commutative Property.",
      definition: "The Commutative Property of Multiplication states that changing the order of the factors does NOT change the product: a × b = b × a.",
      examples: [
        { name: "3 × 7 = 7 × 3 = 21", text: "3 rows of 7 dots has the exact same total as 7 rows of 3 dots." },
        { name: "Array Rotation 🔄", text: "Turn a chocolate bar sideways—it still has the exact same number of chocolate squares!" }
      ],
      interactiveType: "array_rotator",
      goDeeper: "'Commutative' comes from the word 'commute', which means to move around or travel. The numbers can move around without changing the outcome!",
      questions: [
        { q: "What does the Commutative Property of Multiplication state?", options: ["Changing the order of the factors does not change the product (a × b = b × a)", "Multiplying by zero always makes zero", "You must always multiply the largest number first", "Multiplication is the same as subtraction"], answer: 0, explanation: "The order of factors does not alter the product (e.g. 4 × 5 = 5 × 4 = 20)." },
        { q: "If you know that 8 × 6 = 48, what is 6 × 8?", options: ["48", "42", "54", "36"], answer: 0, explanation: "By the commutative property, 6 × 8 has the exact same product: 48." },
        { q: "A student has an array with 4 rows and 7 columns (4 × 7). If she rotates the array 90°, what is the new configuration?", options: ["7 rows and 4 columns (7 × 4)", "4 rows and 4 columns", "7 rows and 7 columns", "11 rows and 1 column"], answer: 0, explanation: "Rotating 90° swaps the rows and columns into 7 rows of 4." },
        { q: "Which equation proves the Commutative Property of Multiplication?", options: ["9 × 4 = 4 × 9", "9 + 4 = 13", "9 × 1 = 9", "9 × 0 = 0"], answer: 0, explanation: "9 × 4 = 4 × 9 directly demonstrates the factor order invariance." },
        { q: "Why is the commutative property helpful when doing mental math?", options: ["If one multiplication fact is tricky, you can flip the factors to one you know easily!", "It makes numbers smaller", "It lets you skip math homework", "It changes multiplication into addition"], answer: 0, explanation: "Flipping tricky factors (like thinking 4 × 8 instead of 8 × 4) speeds up mental calculation." }
      ]
    },
    {
      id: "math_parentheses_grouping",
      title: "Parentheses & Grouping",
      category: "math",
      icon: "🧱",
      tag: "ORDER OF OPERATIONS",
      estimatedMins: 4,
      achievementId: "ach_multiplication_master",
      didYouKnow: "Parentheses ( ) act like a VIP velvet rope in math—they tell you: 'Calculate me first before doing anything else!'",
      definition: "Parentheses ( ) are grouping symbols. Always solve the operation inside the parentheses first before doing the rest of the problem.",
      examples: [
        { name: "3 × (5 + 1)", text: "Step 1: Solve inside (5 + 1 = 6). Step 2: Multiply 3 × 6 = 18." },
        { name: "(4 × 2) + 10", text: "Step 1: Solve inside (4 × 2 = 8). Step 2: Add 8 + 10 = 18." }
      ],
      interactiveType: "parentheses_solver",
      goDeeper: "Without parentheses, 3 × 5 + 1 would mean (3 × 5) + 1 = 16. Parentheses give you the power to change which part gets grouped first!",
      questions: [
        { q: "What should you always calculate first in a math expression containing parentheses?", options: ["The part inside the parentheses ( )", "The largest number", "The leftmost addition", "The subtraction"], answer: 0, explanation: "Parentheses have top priority in mathematics operations." },
        { q: "What is the value of 4 × (2 + 3)?", options: ["20 (since 2 + 3 = 5, and 4 × 5 = 20)", "11", "14", "24"], answer: 0, explanation: "Inside first: 2 + 3 = 5. Then: 4 × 5 = 20." },
        { q: "What is the value of (10 - 4) × 5?", options: ["30 (since 10 - 4 = 6, and 6 × 5 = 30)", "16", "50", "20"], answer: 0, explanation: "Inside first: 10 - 4 = 6. Then: 6 × 5 = 30." },
        { q: "Solve: 2 × (3 × 3)", options: ["18 (since 3 × 3 = 9, and 2 × 9 = 18)", "12", "15", "24"], answer: 0, explanation: "Inside first: 3 × 3 = 9. Then: 2 × 9 = 18." },
        { q: "Which expression equals 24?", options: ["3 × (4 + 4)", "3 × (4 + 2)", "(3 + 4) × 4", "2 × (5 + 5)"], answer: 0, explanation: "4 + 4 = 8, and 3 × 8 = 24." }
      ]
    },
    {
      id: "math_division_quotients",
      title: "Division & Quotients (Sharing vs. Grouping)",
      category: "math",
      icon: "➗",
      tag: "SHARING & QUOTIENTS",
      estimatedMins: 5,
      achievementId: "ach_division_master",
      didYouKnow: "Division is the opposite (inverse) of multiplication! If 4 × 7 = 28, then 28 ÷ 4 = 7 and 28 ÷ 7 = 4.",
      definition: "Division splits a total into equal parts. The result or answer of a division problem is called the QUOTIENT.",
      examples: [
        { name: "Sharing Interpretation 🍰", text: "15 cookies shared equally among 3 friends = 5 cookies each (15 ÷ 3 = 5)." },
        { name: "Grouping Interpretation 📦", text: "15 cookies packed into boxes of 3 = 5 boxes total (15 ÷ 3 = 5)." },
        { name: "28 ÷ 4 = 7", text: "28 is the dividend, 4 is the divisor, and 7 is the QUOTIENT." }
      ],
      interactiveType: "division_tray",
      goDeeper: "You can never divide any number by zero in math—it is undefined because you cannot make groups of 0!",
      questions: [
        { q: "What is the result or answer of a division problem called?", options: ["Quotient", "Product", "Factor", "Sum"], answer: 0, explanation: "The answer in division is called the quotient." },
        { q: "In the division problem 36 ÷ 9 = 4, what is the quotient?", options: ["4", "36", "9", "45"], answer: 0, explanation: "4 is the quotient (the answer)." },
        { q: "Zayn has 24 stickers and wants to share them equally among 4 friends. How many stickers does each friend get?", options: ["6 stickers (24 ÷ 4 = 6)", "8 stickers", "5 stickers", "20 stickers"], answer: 0, explanation: "24 stickers shared equally among 4 people = 6 stickers per person." },
        { q: "A teacher has 35 pencils and puts them in cups with 7 pencils in each cup. How many cups does she need?", options: ["5 cups (35 ÷ 7 = 5)", "6 cups", "4 cups", "28 cups"], answer: 0, explanation: "35 divided into equal groups of 7 = 5 groups/cups." },
        { q: "Which multiplication equation can help you solve 48 ÷ 6 = ?", options: ["6 × ? = 48 (Answer: 8)", "6 + 48 = 54", "48 - 6 = 42", "6 × 6 = 36"], answer: 0, explanation: "Since division is the inverse of multiplication, 6 × 8 = 48 gives the quotient 8." }
      ]
    },
    {
      id: "math_analog_clock",
      title: "Interactive Analog Clock & Time",
      category: "math",
      icon: "🕐",
      tag: "TELL TIME TO 5 MINS",
      estimatedMins: 5,
      achievementId: "ach_time_keeper",
      didYouKnow: "An analog clock is a circular number line from 1 to 12! Every jump from one big number to the next is exactly 5 minutes.",
      definition: "An analog clock uses hands to show time. The SHORT hand points to the HOUR. The LONG hand points to the MINUTES. 60 minutes = 1 full hour.",
      examples: [
        { name: "Short Hand 🔴", text: "Hour Hand: Moves slowly from one number to the next over 60 minutes." },
        { name: "Long Hand 🔵", text: "Minute Hand: Count by 5s around the dial (:05, :10, :15, :20, :25, :30, :35, :40, :45, :50, :55, :00)." },
        { name: "AM vs. PM ☀️🌙", text: "AM is from midnight to before noon (breakfast at 7:30 AM). PM is from noon to midnight (dinner at 6:30 PM)." }
      ],
      interactiveType: "interactive_clock",
      goDeeper: "Quarter past means 15 minutes past the hour (:15). Half past means 30 minutes (:30). Quarter to means 15 minutes before the next hour (:45)!",
      questions: [
        { q: "On an analog clock, which hand shows the HOUR?", options: ["The shorter hand", "The longer hand", "The tiny red second hand", "The clock frame"], answer: 0, explanation: "The short hand points to the hour, while the long hand points to the minute." },
        { q: "If the minute hand points directly at the number 6, how many minutes past the hour is it?", options: ["30 minutes (:30 / Half Past)", "6 minutes", "60 minutes", "15 minutes"], answer: 0, explanation: "Counting by 5s: 1=5, 2=10, 3=15, 4=20, 5=25, 6=30 minutes." },
        { q: "If the short hand is between 3 and 4, and the long hand points to 9, what time is it?", options: ["3:45 (Quarter to 4)", "4:45", "9:15", "3:09"], answer: 0, explanation: "The hour is 3, and 9 on the minute dial represents 45 minutes (9 × 5 = 45)." },
        { q: "Zayn eats breakfast at 7:30 before leaving for school. Is this 7:30 AM or 7:30 PM?", options: ["7:30 AM (Morning)", "7:30 PM (Evening)"], answer: 0, explanation: "AM designates morning hours from midnight to 11:59 AM." },
        { q: "A science movie starts at 4:15 PM and lasts 45 minutes. What time does the movie end?", options: ["5:00 PM", "4:45 PM", "5:15 PM", "4:60 PM"], answer: 0, explanation: "4:15 + 45 minutes = 4:60, which rolls over to 5:00 PM!" }
      ]
    },
    {
      id: "math_2d_shapes",
      title: "2D Shapes, Polygons & Quadrilaterals",
      category: "math",
      icon: "🔷",
      tag: "GEOMETRY SIDES & VERTICES",
      estimatedMins: 5,
      achievementId: "ach_shape_spotter",
      didYouKnow: "A shape often called a 'diamond' is geometrically called a RHOMBUS when all 4 sides are equal in length!",
      definition: "2D shapes are flat plane figures. A polygon is a closed shape made of straight line segments. Points where two sides meet are called VERTICES (corners).",
      examples: [
        { name: "Triangle 🔺", text: "3 straight sides, 3 vertices." },
        { name: "Quadrilaterals 🔲", text: "4 sides, 4 vertices: Square, Rectangle, Rhombus, Trapezoid, Parallelogram." },
        { name: "Pentagon ⬠", text: "5 straight sides, 5 vertices." },
        { name: "Hexagon ⬡", text: "6 straight sides, 6 vertices." },
        { name: "Octagon 🛑", text: "8 straight sides, 8 vertices (like a Stop Sign)." }
      ],
      interactiveType: "shape_sorter_2d",
      goDeeper: "Shapes with curved edges (like circles and ovals) are 2D shapes, but they are NOT polygons because polygons must have only straight sides!",
      questions: [
        { q: "What is a vertex in geometry?", options: ["A corner point where two straight sides meet", "The color of the shape", "The space inside a circle", "A curved line"], answer: 0, explanation: "A vertex (plural: vertices) is the corner point where edges or sides intersect." },
        { q: "How many sides and vertices does a HEXAGON have?", options: ["6 sides and 6 vertices", "5 sides and 5 vertices", "8 sides and 8 vertices", "4 sides and 4 vertices"], answer: 0, explanation: "A hexagon always has 6 straight sides and 6 vertices." },
        { q: "Which of the following is a QUADRILATERAL (4-sided polygon)?", options: ["Trapezoid", "Triangle", "Pentagon", "Hexagon"], answer: 0, explanation: "Trapezoids, rectangles, squares, and rhombuses all have 4 sides (quadrilaterals)." },
        { q: "What is the precise geometric name for a 4-sided shape with equal sides that is often casually called a 'diamond'?", options: ["Rhombus", "Sphere", "Octagon", "Cylinder"], answer: 0, explanation: "A rhombus is a quadrilateral with 4 equal-length sides." },
        { q: "How many sides does a standard red STOP SIGN have?", options: ["8 sides (Octagon)", "6 sides (Hexagon)", "5 sides (Pentagon)", "10 sides (Decagon)"], answer: 0, explanation: "Stop signs are 8-sided octagons." }
      ]
    },
    {
      id: "math_3d_shapes",
      title: "3D Shapes: Faces, Edges & Vertices",
      category: "math",
      icon: "🧊",
      tag: "SOLIDS & SURFACES",
      estimatedMins: 5,
      achievementId: "ach_3d_master",
      didYouKnow: "A basketball is a Sphere with 0 flat faces and 0 vertices, while a playing die is a Cube with 6 flat square faces, 12 straight edges, and 8 sharp corner vertices!",
      definition: "3D shapes are solid objects with length, width, and height. They have flat FACES, straight EDGES where faces meet, sharp corner VERTICES, or CURVED surfaces.",
      examples: [
        { name: "Cube 🎲", text: "6 flat square faces, 12 straight edges, 8 vertices." },
        { name: "Sphere ⚽", text: "1 continuous curved surface, 0 flat faces, 0 edges, 0 vertices." },
        { name: "Cylinder 🥫", text: "2 flat circular faces, 1 curved surface, 0 vertices." },
        { name: "Cone 🍦", text: "1 flat circular base, 1 curved surface, 1 sharp apex vertex." },
        { name: "Triangular Prism ⛺", text: "2 triangular bases, 3 rectangular faces, 9 edges, 6 vertices." }
      ],
      interactiveType: "shape_inspector_3d",
      goDeeper: "Real-world matching: Soup can = Cylinder, Basketball = Sphere, Dice = Cube, Ice cream cone = Cone, Camping tent = Triangular prism!",
      questions: [
        { q: "How many flat faces, edges, and vertices does a CUBE have?", options: ["6 faces, 12 edges, 8 vertices", "4 faces, 8 edges, 4 vertices", "8 faces, 6 edges, 12 vertices", "0 faces, 0 edges, 0 vertices"], answer: 0, explanation: "A cube has 6 congruent square faces, 12 straight edges, and 8 vertices." },
        { q: "Which 3D shape describes a common soup can or soda can?", options: ["Cylinder (2 flat circular faces, 1 curved surface)", "Cube", "Cone", "Pyramid"], answer: 0, explanation: "Cylinders have two parallel circular bases connected by a curved surface." },
        { q: "What 3D shape has 1 circular base and 1 vertex at the top tip?", options: ["Cone", "Sphere", "Cylinder", "Cube"], answer: 0, explanation: "A cone has one flat circular face and tapers to a top vertex." },
        { q: "How many vertices (corners) does a SPHERE have?", options: ["0 vertices", "1 vertex", "4 vertices", "8 vertices"], answer: 0, explanation: "A sphere is perfectly round with 0 vertices, 0 edges, and 0 flat faces." },
        { q: "A camping tent with two triangular ends and three rectangular sides is which 3D shape?", options: ["Triangular Prism", "Cylinder", "Cube", "Sphere"], answer: 0, explanation: "A triangular prism has 2 triangular bases and 3 rectangular faces." }
      ]
    }
  ]
};

// Daily School Words List (Rotates daily)
const DAILY_SCHOOL_WORDS = [
  { term: "ECOSYSTEM", category: "Science", definition: "A community of living organisms interacting with nonliving things in their environment.", example: "A pond with fish, algae, water, and sunlight forms an ecosystem.", question: "What is an ecosystem?", options: ["Living and nonliving things interacting in an environment", "Only rocks and water", "A single animal in a zoo"], answer: 0 },
  { term: "PRODUCT", category: "Math", definition: "The answer or result obtained by multiplying two or more factors.", example: "In 6 × 8 = 48, 48 is the product.", question: "In 7 × 5 = 35, what is 35 called?", options: ["Product", "Factor", "Quotient"], answer: 0 },
  { term: "HABITAT", category: "Science", definition: "The natural home of an animal or plant that provides food, water, shelter, and space.", example: "The arctic tundra is the natural habitat of the polar bear.", question: "What must a habitat provide?", options: ["Food, water, shelter, and space", "Only a roof", "Candy and toys"], answer: 0 },
  { term: "QUOTIENT", category: "Math", definition: "The result or answer of a division problem.", example: "In 40 ÷ 5 = 8, 8 is the quotient.", question: "What is the answer to a division problem called?", options: ["Quotient", "Product", "Factor"], answer: 0 },
  { term: "ADAPTATION", category: "Science", definition: "A body structure or behavior that helps an organism survive in its environment.", example: "A duck's webbed feet are a structural adaptation for paddling in water.", question: "What is a duck's webbed feet an example of?", options: ["Structural adaptation", "Weather change", "Extinction"], answer: 0 },
  { term: "COMMUTATIVE", category: "Math", definition: "The rule that changing the order of factors does not change the product (a × b = b × a).", example: "3 × 9 = 27 and 9 × 3 = 27.", question: "Which equation shows the commutative property?", options: ["4 × 6 = 6 × 4", "4 + 6 = 10", "4 × 1 = 4"], answer: 0 },
  { term: "FOSSIL", category: "Science", definition: "Preserved remains, impressions, or traces of organisms from the ancient past.", example: "A preserved footprint of a T-Rex is a trace fossil.", question: "Can a preserved dinosaur footprint be a fossil?", options: ["Yes, it is a trace fossil", "No, only bones are fossils"], answer: 0 }
];

window.CLASSROOM_CURRICULUM = CLASSROOM_CURRICULUM;
window.DAILY_SCHOOL_WORDS = DAILY_SCHOOL_WORDS;
