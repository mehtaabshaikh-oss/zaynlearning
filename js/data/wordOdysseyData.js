/**
 * Word Odyssey - Thematic Wordle Adventure Dataset for Kids
 * 5 Rich Categories with 4, 5, and 6-letter words & Educational Fact Cards
 */

const WORD_ODYSSEY_CATEGORIES = {
  countries: {
    id: "countries",
    name: "Countries",
    icon: "🌍",
    desc: "Nations and flags across our incredible world!",
    words: [
      { word: "PERU", len: 4, clue: "Home to the ancient stone city of Machu Picchu!", fact: "Peru is home to the mysterious Machu Picchu and over 3,000 kinds of potatoes!" },
      { word: "CUBA", len: 4, clue: "Caribbean island known for colorful classic cars.", fact: "Cuba is the largest island in the Caribbean and is shaped like a crocodile!" },
      { word: "FIJI", len: 4, clue: "Tropical South Pacific island nation with coral reefs.", fact: "Fiji is made up of over 300 volcanic islands with crystal clear lagoons!" },
      { word: "IRAN", len: 4, clue: "Ancient Persian empire land with historic architecture.", fact: "Iran is home to the world's oldest continuous major civilizations!" },
      { word: "OMAN", len: 4, clue: "Arabian Peninsula nation with majestic desert dunes.", fact: "Oman has protected frankincense trees that have grown for thousands of years!" },
      { word: "CHAD", len: 4, clue: "Central African nation named after a giant lake.", fact: "Lake Chad gives this country its name and is a crucial oasis for migratory birds!" },
      { word: "MALI", len: 4, clue: "West African nation once home to the ancient city of Timbuktu.", fact: "Mali was home to Mansa Musa, historically one of the wealthiest rulers ever!" },
      { word: "TOGO", len: 4, clue: "Slender country in West Africa with palm-lined beaches.", fact: "Togo is famous for its colorful batiks and rich biodiversity!" },
      { word: "LAOS", len: 4, clue: "Southeast Asian nation known as the Land of a Million Elephants.", fact: "Laos has thousands of ancient giant stone jars scattered across its plains!" },
      { word: "JAPAN", len: 5, clue: "Island country famous for bullet trains, anime, and cherry blossoms.", fact: "Japan is made up of over 6,800 islands and has the world's most punctual bullet trains!" },
      { word: "CHILE", len: 5, clue: "Long, narrow South American country stretching to Antarctica.", fact: "Chile has the Atacama Desert, the driest non-polar desert in the entire world!" },
      { word: "EGYPT", len: 5, clue: "Ancient land of the Great Pyramids and the Nile River.", fact: "Ancient Egyptians built the Great Pyramid of Giza with over 2 million stone blocks!" },
      { word: "SPAIN", len: 5, clue: "European nation famous for castles, flamenco, and sunny coasts.", fact: "Spain produces nearly half of the world's total olive oil supply!" },
      { word: "ITALY", len: 5, clue: "Boot-shaped country famous for pizza, gelato, and Rome.", fact: "Italy has more UNESCO World Heritage cultural sites than any other country on Earth!" },
      { word: "KENYA", len: 5, clue: "East African country famous for safaris and Mount Kenya.", fact: "Kenya's Great Rift Valley is one of the best places on Earth to see wild lions and zebras!" },
      { word: "INDIA", len: 5, clue: "South Asian country home to the Taj Mahal and royal Bengal tigers.", fact: "India is the birthplace of chess, zero in mathematics, and yoga!" },
      { word: "CHINA", len: 5, clue: "Home to the Great Wall, giant pandas, and dragon festivals.", fact: "China's Great Wall is over 13,000 miles long and took centuries to construct!" },
      { word: "NEPAL", len: 5, clue: "Himalayan nation home to Mount Everest, the highest peak.", fact: "Nepal is home to Mount Everest, soaring 29,032 feet above sea level!" },
      { word: "BRAZIL", len: 6, clue: "Largest South American country, home to the Amazon Rainforest.", fact: "Brazil contains 60% of the Amazon Rainforest, the largest jungle on Earth!" },
      { word: "NORWAY", len: 6, clue: "Scandinavian land of majestic fjords and the Northern Lights.", fact: "Norway is called the 'Land of the Midnight Sun' because the sun never sets in summer!" },
      { word: "CANADA", len: 6, clue: "Second largest country by area, famous for maple syrup.", fact: "Canada has more natural lakes than all the rest of the world's lakes combined!" },
      { word: "FRANCE", len: 6, clue: "European nation famous for the Eiffel Tower and Louvre museum.", fact: "The Eiffel Tower in Paris grows up to 6 inches taller during the heat of summer!" },
      { word: "MEXICO", len: 6, clue: "North American nation with ancient Mayan and Aztec pyramids.", fact: "Chocolate was first discovered and brewed into delicious drinks in ancient Mexico!" },
      { word: "GREECE", len: 6, clue: "Birthplace of the Olympic Games and ancient mythology.", fact: "The first Olympic Games were held in ancient Greece in 776 BC!" },
      { word: "SWEDEN", len: 6, clue: "Nordic country famous for inventions, forests, and moose.", fact: "Sweden recycles nearly 99% of its household waste using modern clean energy!" }
    ]
  },

  capitals: {
    id: "capitals",
    name: "World Capitals",
    icon: "🏛️",
    desc: "Legendary capital cities across all continents!",
    words: [
      { word: "ROME", len: 4, clue: "Capital of Italy with the ancient Colosseum.", fact: "Rome is over 2,700 years old and is called the 'Eternal City'!" },
      { word: "BERN", len: 4, clue: "Historic capital of Switzerland surrounded by the Aare River.", fact: "Bern's historic old town has 4 miles of covered sandstone arcades!" },
      { word: "LIMA", len: 4, clue: "Coastal capital of Peru overlooking the Pacific Ocean.", fact: "Lima is built in a coastal desert that almost never experiences heavy rain!" },
      { word: "SUVA", len: 4, clue: "Lush island capital of Fiji in the South Pacific.", fact: "Suva is the largest South Pacific city outside of Australia and New Zealand!" },
      { word: "OSLO", len: 4, clue: "Fjord-side capital of Norway and home of the Nobel Peace Prize.", fact: "Oslo is one of the greenest cities on Earth, with two-thirds covered by forests and water!" },
      { word: "PARIS", len: 5, clue: "Capital of France, the City of Light.", fact: "Paris has only one single 'Stop' traffic sign in the entire city!" },
      { word: "TOKYO", len: 5, clue: "Ultra-modern capital of Japan, largest metro area on Earth.", fact: "Tokyo is the world's most populous metropolis with over 37 million residents!" },
      { word: "CAIRO", len: 5, clue: "Capital of Egypt on the banks of the mighty Nile.", fact: "Cairo is right next to the Giza plateau where the Great Sphinx stands guard!" },
      { word: "SEOUL", len: 5, clue: "High-tech capital of South Korea with royal palaces.", fact: "Seoul has some of the fastest internet speeds in the world and 600-year-old palaces!" },
      { word: "HANOI", len: 5, clue: "Centuries-old capital of Vietnam known for lakes and pagodas.", fact: "Hanoi is famous for its Old Quarter with 36 historic guild streets!" },
      { word: "MADRID", len: 6, clue: "Sun-drenched capital of Spain in the heart of the country.", fact: "Madrid is home to the world's oldest continuously operating restaurant, founded in 1725!" },
      { word: "OTTAWA", len: 6, clue: "Capital of Canada with the historic Rideau Canal.", fact: "During winter, Ottawa's Rideau Canal becomes the world's largest natural ice skating rink!" },
      { word: "BERLIN", len: 6, clue: "Dynamic capital of Germany known for the Brandenburg Gate.", fact: "Berlin has more bridges than Venice, Italy—over 1,700 bridges in total!" },
      { word: "DUBLIN", len: 6, clue: "Friendly capital of Ireland on the River Liffey.", fact: "Dublin's Trinity College Library houses the 1,200-year-old illuminated Book of Kells!" },
      { word: "ATHENS", len: 6, clue: "Capital of Greece with the hilltop Parthenon temple.", fact: "Athens has been continuously inhabited for over 3,400 years!" },
      { word: "VIENNA", len: 6, clue: "Musical capital of Austria on the Danube River.", fact: "Vienna was home to legendary classical composers Mozart, Beethoven, and Brahms!" },
      { word: "HAVANA", len: 6, clue: "Vibrant capital of Cuba with historic pastel architecture.", fact: "Havana's historic core is protected as a UNESCO World Heritage treasure!" },
      { word: "LISBON", len: 6, clue: "Sunny coastal capital of Portugal with iconic yellow trams.", fact: "Lisbon is one of the oldest cities in Western Europe, predating London and Paris!" },
      { word: "ANKARA", len: 6, clue: "Modern capital of Turkey located in central Anatolia.", fact: "Ankara has been a key trade crossroads since the Bronze Age!" },
      { word: "RIYADH", len: 6, clue: "Rapidly growing capital of Saudi Arabia with iconic skyscrapers.", fact: "Riyadh means 'The Gardens' in Arabic, referencing its historic desert oasis roots!" },
      { word: "MANILA", len: 6, clue: "Bustling bayside capital of the Philippines.", fact: "Manila's historic walled city 'Intramuros' was built with volcanic stone in 1571!" },
      { word: "BOGOTA", len: 6, clue: "High-altitude Andean capital of Colombia.", fact: "Bogota sits over 8,600 feet high in the Andes Mountains with cool mountain air!" },
      { word: "PRAGUE", len: 6, clue: "City of a Hundred Spires, capital of the Czech Republic.", fact: "Prague Castle is the largest ancient castle complex in the world!" },
      { word: "LONDON", len: 6, clue: "Capital of the UK with Big Ben and the Tower Bridge.", fact: "London has over 170 museums and Big Ben's clock tower has ticked since 1859!" },
      { word: "WARSAW", len: 6, clue: "Historic capital of Poland on the Vistula River.", fact: "Warsaw was painstakingly rebuilt after WWII and is famous for its colorful market square!" },
      { word: "TAIPEI", len: 6, clue: "Bustling capital of Taiwan with the famous Taipei 101 skyscraper.", fact: "Taipei 101 features a giant 660-ton pendulum tuned damper ball that protects it from earthquakes!" }
    ]
  },

  space: {
    id: "space",
    name: "Space & Planets",
    icon: "🚀",
    desc: "Cosmic bodies, starships, and interstellar marvels!",
    words: [
      { word: "MARS", len: 4, clue: "The Red Planet with giant volcanoes and rovers.", fact: "Mars is home to Olympus Mons, a volcano three times taller than Mount Everest!" },
      { word: "MOON", len: 4, clue: "Earth's only natural satellite that controls ocean tides.", fact: "Footprints left by Apollo astronauts on the Moon will stay there for millions of years!" },
      { word: "STAR", len: 4, clue: "A giant ball of hot, glowing gas like our Sun.", fact: "The Sun makes up 99.8% of all the mass in our entire Solar System!" },
      { word: "APEX", len: 4, clue: "The highest point in a rocket's orbital launch arc.", fact: "Rocket trajectories calculate apex altitudes to slip cleanly into orbit!" },
      { word: "COMET", len: 5, clue: "An icy space snowball that grows a glowing tail near the Sun.", fact: "A comet's glowing tail of dust and gas can stretch for millions of miles!" },
      { word: "ORBIT", len: 5, clue: "The curved path of a spacecraft or planet around a star.", fact: "The International Space Station orbits Earth every 90 minutes at 17,500 mph!" },
      { word: "PLUTO", len: 5, clue: "Famous dwarf planet with a giant heart-shaped ice glacier.", fact: "Pluto's heart-shaped glacier is made of frozen nitrogen ice!" },
      { word: "VENUS", len: 5, clue: "Hottest planet in our solar system with thick yellow clouds.", fact: "Venus spins backwards compared to most other planets, so the Sun rises in the west!" },
      { word: "SOLAR", len: 5, clue: "Relating to the Sun and its powerful energy radiation.", fact: "Light from the Sun takes about 8 minutes and 20 seconds to reach Earth!" },
      { word: "LUNAR", len: 5, clue: "Relating to the Moon and its cratered surface.", fact: "A full lunar cycle from new moon to new moon takes about 29.5 days!" },
      { word: "TITAN", len: 5, clue: "Saturn's giant moon with rivers of liquid methane.", fact: "Titan is the only moon in our solar system with a thick atmosphere and liquid lakes!" },
      { word: "RADAR", len: 5, clue: "Radio wave tech used to map planets and track asteroids.", fact: "Space radar can bounce signals off asteroids millions of miles away to calculate their orbits!" },
      { word: "SATURN", len: 6, clue: "The majestic ringed planet with over 100 moons.", fact: "Saturn's dazzling rings are made of billions of chunks of ice and rock!" },
      { word: "ROCKET", len: 6, clue: "Powerful engine vehicle that shoots spacecraft into orbit.", fact: "Modern rockets burn super-chilled liquid oxygen and hydrogen for maximum thrust!" },
      { word: "GALAXY", len: 6, clue: "A massive system of billions of stars, dust, and dark matter.", fact: "Our home galaxy, the Milky Way, contains between 100 to 400 billion stars!" },
      { word: "METEOR", len: 6, clue: "A shooting star burning brightly in Earth's upper atmosphere.", fact: "Most meteors are smaller than a pebble when they streak across the night sky!" },
      { word: "NEBULA", len: 6, clue: "A giant cosmic cloud of gas and dust where new stars are born.", fact: "The Orion Nebula is a stellar nursery 1,300 light-years away where thousands of baby stars form!" },
      { word: "COSMOS", len: 6, clue: "The universe seen as an orderly and harmonious whole.", fact: "The observable cosmos spans over 93 billion light-years across!" },
      { word: "CRATER", len: 6, clue: "A bowl-shaped cavity caused by a meteorite impact.", fact: "The Moon has millions of impact craters because it has no wind or rain to erode them!" },
      { word: "PULSAR", len: 6, clue: "A spinning neutron star that beams lighthouse pulses of radio waves.", fact: "Some pulsars can spin hundreds of times every single second!" },
      { word: "AURORA", len: 6, clue: "Glowing green and purple light ribbons in polar skies.", fact: "Auroras are created when solar wind particles collide with gases in Earth's atmosphere!" },
      { word: "ZENITH", len: 6, clue: "The imaginary point directly overhead in the celestial sphere.", fact: "Telescopes point straight up to the zenith to look through the thinnest layer of atmosphere!" },
      { word: "VORTEX", len: 6, clue: "A whirling mass of space gas or planetary storm.", fact: "Jupiter's Great Red Spot is a giant vortex storm that has raged for over 300 years!" },
      { word: "SPHERE", len: 6, clue: "The round shape assumed by planets under gravity.", fact: "Gravity pulls large planets into round spheres equally in all directions!" },
      { word: "VACUUM", len: 6, clue: "A space entirely devoid of matter like deep outer space.", fact: "Outer space is a near-perfect vacuum where sound cannot travel at all!" }
    ]
  },

  animals: {
    id: "animals",
    name: "Wild Animals",
    icon: "🐾",
    desc: "Fascinating creatures from the savanna, jungle, and ocean depths!",
    words: [
      { word: "LION", len: 4, clue: "King of the jungle that lives in family prides.", fact: "A lion's mighty roar can be heard from over 5 miles away!" },
      { word: "BEAR", len: 4, clue: "Strong mammal known for hibernating through winter.", fact: "Grizzly bears have an extraordinary sense of smell that is 7 times stronger than a bloodhound's!" },
      { word: "WOLF", len: 4, clue: "Wild canine that communicates by howling in packs.", fact: "Wolves howl to assemble their pack, defend territory, and communicate across miles!" },
      { word: "DEER", len: 4, clue: "Graceful forest herbivore with velvet antlers.", fact: "Male deer regrow a brand new set of antlers every single spring!" },
      { word: "HARE", len: 4, clue: "Fast runner with long ears related to rabbits.", fact: "Arctic hares can reach sprinting speeds of up to 40 miles per hour!" },
      { word: "EAGLE", len: 5, clue: "Majestic bird of prey with razor-sharp eyesight.", fact: "Eagles can spot a tiny rabbit from over 2 miles away in mid-flight!" },
      { word: "PANDA", len: 5, clue: "Gentle black-and-white bear that munches on bamboo.", fact: "Giant pandas spend up to 14 hours a day eating over 25 pounds of bamboo!" },
      { word: "TIGER", len: 5, clue: "Largest wild cat on Earth with distinct orange and black stripes.", fact: "No two tigers have the exact same stripe pattern—their stripes are as unique as human fingerprints!" },
      { word: "SHARK", len: 5, clue: "Ocean predator that has lived on Earth longer than dinosaurs.", fact: "Sharks have skeletons made entirely of flexible cartilage instead of bone!" },
      { word: "OTTER", len: 5, clue: "Playful aquatic mammal that uses rocks as tools to crack shells.", fact: "Sea otters hold paws while sleeping so they don't drift away in ocean currents!" },
      { word: "KOALA", len: 5, clue: "Australian marsupial that sleeps up to 20 hours a day in eucalyptus trees.", fact: "Koalas have unique fingerprints that are nearly indistinguishable from human fingerprints!" },
      { word: "ZEBRA", len: 5, clue: "African herbivore known for dazzling black-and-white stripes.", fact: "Zebra stripes help confuse biting insects and act as a natural optical cooling system!" },
      { word: "SLOTH", len: 5, clue: "Tree-dwelling mammal famous for super slow motion.", fact: "Sloths are so slow that harmless green algae actually grows on their fur to camouflage them!" },
      { word: "CAMEL", len: 5, clue: "Desert traveler with water-conserving humps.", fact: "A camel's hump stores nutrient-rich fat, allowing it to go weeks without food!" },
      { word: "TOUCAN", len: 6, clue: "Tropical bird with a colorful, oversized lightweight bill.", fact: "A toucan's massive bill acts like a natural radiator to regulate its body temperature!" },
      { word: "TURTLE", len: 6, clue: "Ancient reptile with a protective shell that navigates ocean currents.", fact: "Sea turtles have built-in magnetic compasses that guide them across thousands of miles of ocean!" },
      { word: "MONKEY", len: 6, clue: "Clever primate with nimble hands and expressive faces.", fact: "Some monkeys use prehensile tails like a fifth hand to swing through jungle canopies!" },
      { word: "FALCON", len: 6, clue: "Fastest animal on Earth during its high-speed hunting dives.", fact: "The peregrine falcon can dive through the sky at speeds over 240 miles per hour!" },
      { word: "PARROT", len: 6, clue: "Colorful bird capable of mimicking human speech and sounds.", fact: "Some African grey parrots have been proven to understand math concepts and word meanings!" },
      { word: "JAGUAR", len: 6, clue: "Spotted big cat of the Americas that loves swimming.", fact: "Jaguars have the strongest bite of any big cat, capable of piercing tough turtle shells!" },
      { word: "WALRUS", len: 6, clue: "Arctic giant with long ivory tusks and thick whiskers.", fact: "A walrus's sensitive whiskers can detect tiny clams buried deep in ocean mud!" },
      { word: "BEAVER", len: 6, clue: "Nature's engineer that builds dams and wooden lodges.", fact: "Beavers have orange teeth with iron in their enamel that never stop growing!" },
      { word: "BADGER", len: 6, clue: "Fierce digging mammal with distinctive striped face.", fact: "Honey badgers have thick rubbery skin that protects them from bee stings and predator bites!" }
    ]
  },

  science: {
    id: "science",
    name: "Science & Nature",
    icon: "🔬",
    desc: "Physics, chemistry, biology, and scientific inventions!",
    words: [
      { word: "ATOM", len: 4, clue: "The fundamental building block of all matter in the universe.", fact: "Over 99.99% of an atom is empty space, with a tiny nucleus at its center!" },
      { word: "CELL", len: 4, clue: "The smallest structural and functional unit of living organisms.", fact: "The human body is made up of roughly 37 trillion cooperating living cells!" },
      { word: "GENE", len: 4, clue: "A unit of heredity passed down from parents to offspring.", fact: "Humans share about 99.9% of the exact same genetic DNA code with each other!" },
      { word: "WAVE", len: 4, clue: "An oscillation that transfers energy through space or matter.", fact: "Light travels in waves at 186,282 miles per second—the cosmic speed limit!" },
      { word: "VOLT", len: 4, clue: "The unit of electric potential and electrical force.", fact: "A single bolt of lightning can deliver over 100 million volts of electric power!" },
      { word: "HEAT", len: 4, clue: "Thermal energy transferred between systems at different temperatures.", fact: "Heat causes molecules in substances to jiggle and move faster!" },
      { word: "LENS", len: 4, clue: "A curved piece of glass that refracts and focuses light rays.", fact: "Eyeball lenses naturally flip incoming images upside down; your brain flips them right side up!" },
      { word: "LASER", len: 5, clue: "A concentrated, coherent beam of amplified light.", fact: "LASER stands for 'Light Amplification by Stimulated Emission of Radiation'!" },
      { word: "PRISM", len: 5, clue: "A transparent glass block that splits white light into a rainbow spectrum.", fact: "Sir Isaac Newton proved that white sunlight is composed of all rainbow colors combined!" },
      { word: "ROBOT", len: 5, clue: "A programmable automated machine that carries out complex tasks.", fact: "The word 'robot' was first introduced in a 1920 science fiction play!" },
      { word: "SOUND", len: 5, clue: "Vibrations traveling through air or water heard by ears.", fact: "Sound travels 4 times faster through water than through open air!" },
      { word: "LIGHT", len: 5, clue: "Electromagnetic radiation visible to the human eye.", fact: "Sunlight is composed of billions of photon energy packets traveling across space!" },
      { word: "FORCE", len: 5, clue: "A push or pull upon an object resulting from its interaction with another.", fact: "Newton's laws of motion explain how forces govern everything from rocket launches to soccer kicks!" },
      { word: "MAGMA", len: 5, clue: "Molten liquid rock beneath Earth's outer solid crust.", fact: "When underground magma erupts onto the surface of a volcano, it is called lava!" },
      { word: "QUARK", len: 5, clue: "An elementary subatomic particle that makes up protons and neutrons.", fact: "Quarks come in six fun 'flavors': up, down, charm, strange, top, and bottom!" },
      { word: "FOSSIL", len: 6, clue: "Preserved ancient remains or impressions of prehistoric organisms.", fact: "Fossils teach scientists what dinosaurs, ancient ferns, and trilobites looked like millions of years ago!" },
      { word: "PLANET", len: 6, clue: "A celestial body orbiting a star that has cleared its orbital path.", fact: "Astronomers have discovered over 5,000 exoplanets orbiting distant stars beyond our solar system!" },
      { word: "MAGNET", len: 6, clue: "An object that produces a magnetic field attracting iron and steel.", fact: "Earth itself is a giant magnet with a liquid iron-nickel core generating a protective magnetic shield!" },
      { word: "ENERGY", len: 6, clue: "The capacity to do work, found in kinetic, potential, and thermal forms.", fact: "The law of conservation of energy states that energy cannot be created or destroyed, only transformed!" },
      { word: "PROTON", len: 6, clue: "Positively charged subatomic particle inside the nucleus.", fact: "The number of protons in an atom determines which chemical element it is!" },
      { word: "NEURON", len: 6, clue: "Specialized nerve cell that transmits electrical signals through the brain.", fact: "The human brain contains roughly 86 billion interconnected neurons!" },
      { word: "OXYGEN", len: 6, clue: "Essential gas element that animals breathe and plants produce.", fact: "Ocean phytoplankton produce over 50% of the oxygen in Earth's atmosphere!" },
      { word: "CARBON", len: 6, clue: "The versatile chemical element that forms the basis of all organic life.", fact: "Diamonds and pencil graphite are both made of 100% pure carbon atoms arranged differently!" },
      { word: "MOTION", len: 6, clue: "The change in position of an object over time.", fact: "Galileo proved that in a vacuum with no air resistance, a feather and a bowling ball fall at the exact same rate!" }
    ]
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { WORD_ODYSSEY_CATEGORIES };
}
