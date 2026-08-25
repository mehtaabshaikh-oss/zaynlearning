/**
 * Word Odyssey - Thematic Wordle Adventure Dataset for Kids
 * 5 Rich Categories with 4, 5, and 6-letter words & Educational Fact Cards
 * All clues are strictly spoiler-free, exciting, and educational!
 */

const WORD_ODYSSEY_CATEGORIES = {
  countries: {
    id: "countries",
    name: "Countries",
    icon: "🌍",
    desc: "Nations and flags across our incredible world!",
    words: [
      { word: "PERU", len: 4, clue: "Home to the ancient mountain stone citadel of Machu Picchu!", fact: "Peru is home to the mysterious Machu Picchu and over 3,000 kinds of potatoes!" },
      { word: "CUBA", len: 4, clue: "Caribbean island nation famous for vintage classic cars and colorful architecture.", fact: "Cuba is the largest island in the Caribbean and is shaped like a crocodile!" },
      { word: "FIJI", len: 4, clue: "Tropical South Pacific island archipelago with stunning coral reefs.", fact: "Fiji is made up of over 300 volcanic islands with crystal clear lagoons!" },
      { word: "IRAN", len: 4, clue: "Ancient land of Persepolis and historic Persian architecture.", fact: "Iran is home to the world's oldest continuous major civilizations!" },
      { word: "OMAN", len: 4, clue: "Arabian Peninsula land with majestic desert dunes and frankincense trees.", fact: "Oman has protected frankincense trees that have grown for thousands of years!" },
      { word: "CHAD", len: 4, clue: "Central African nation named after a massive Sahara oasis lake.", fact: "Lake Chad gives this country its name and is a crucial oasis for migratory birds!" },
      { word: "MALI", len: 4, clue: "West African nation once home to the ancient golden trading city of Timbuktu.", fact: "Mali was home to Mansa Musa, historically one of the wealthiest rulers ever!" },
      { word: "TOGO", len: 4, clue: "Slender country in West Africa with palm-lined Atlantic beaches.", fact: "Togo is famous for its colorful batiks and rich biodiversity!" },
      { word: "LAOS", len: 4, clue: "Southeast Asian nation historically known as the Land of a Million Elephants.", fact: "Laos has thousands of ancient giant stone jars scattered across its plains!" },
      { word: "JAPAN", len: 5, clue: "East Asian archipelago famous for bullet trains, anime, and cherry blossoms.", fact: "Japan is made up of over 6,800 islands and has the world's most punctual bullet trains!" },
      { word: "CHILE", len: 5, clue: "Long, slender South American country stretching all the way toward Antarctica.", fact: "Chile has the Atacama Desert, the driest non-polar desert in the entire world!" },
      { word: "EGYPT", len: 5, clue: "Ancient land of the Pharaohs, Great Pyramids, and the mighty Nile River.", fact: "Ancient Egyptians built the Great Pyramid of Giza with over 2 million stone blocks!" },
      { word: "SPAIN", len: 5, clue: "European nation famous for historic castles, flamenco dance, and sunny coasts.", fact: "Spain produces nearly half of the world's total olive oil supply!" },
      { word: "ITALY", len: 5, clue: "Boot-shaped Mediterranean nation famous for pizza, pasta, and the Colosseum.", fact: "Italy has more UNESCO World Heritage cultural sites than any other country on Earth!" },
      { word: "KENYA", len: 5, clue: "East African nation famous for thrilling wildlife safaris and the Great Rift Valley.", fact: "Kenya's Great Rift Valley is one of the best places on Earth to see wild lions and zebras!" },
      { word: "INDIA", len: 5, clue: "South Asian country home to the Taj Mahal, spices, and royal Bengal tigers.", fact: "India is the birthplace of chess, zero in mathematics, and yoga!" },
      { word: "CHINA", len: 5, clue: "East Asian giant home to the Forbidden City, giant pandas, and dragon festivals.", fact: "China's Great Wall is over 13,000 miles long and took centuries to construct!" },
      { word: "NEPAL", len: 5, clue: "Himalayan nation home to Mount Everest, the tallest mountain on Earth.", fact: "Nepal is home to Mount Everest, soaring 29,032 feet above sea level!" },
      { word: "BRAZIL", len: 6, clue: "Largest South American country, home to the vast Amazon Rainforest.", fact: "Brazil contains 60% of the Amazon Rainforest, the largest jungle on Earth!" },
      { word: "NORWAY", len: 6, clue: "Scandinavian land of deep ocean fjords and the glowing Northern Lights.", fact: "Norway is called the 'Land of the Midnight Sun' because the sun never sets in summer!" },
      { word: "CANADA", len: 6, clue: "Second largest country by land area, famous for ice hockey and maple syrup.", fact: "Canada has more natural lakes than all the rest of the world's lakes combined!" },
      { word: "FRANCE", len: 6, clue: "European nation famous for the Eiffel Tower, fine bakeries, and the Louvre.", fact: "The Eiffel Tower in Paris grows up to 6 inches taller during the heat of summer!" },
      { word: "MEXICO", len: 6, clue: "North American nation with ancient Mayan step pyramids and delicious tacos.", fact: "Chocolate was first discovered and brewed into delicious drinks in ancient Mexico!" },
      { word: "GREECE", len: 6, clue: "Mediterranean birthplace of the Olympic Games, philosophy, and ancient mythology.", fact: "The first Olympic Games were held in ancient Greece in 776 BC!" },
      { word: "SWEDEN", len: 6, clue: "Nordic country famous for inventors, vast pine forests, and the Nobel Prizes.", fact: "Sweden recycles nearly 99% of its household waste using modern clean energy!" }
    ]
  },

  capitals: {
    id: "capitals",
    name: "World Capitals",
    icon: "🏛️",
    desc: "Legendary capital cities across all continents!",
    words: [
      { word: "ROME", len: 4, clue: "Ancient 'Eternal City' where gladiators once fought in the Colosseum.", fact: "Rome is over 2,700 years old and is called the 'Eternal City'!" },
      { word: "BERN", len: 4, clue: "Historic Swiss seat of government nestled in a dramatic loop of the Aare River.", fact: "Bern's historic old town has 4 miles of covered sandstone arcades!" },
      { word: "LIMA", len: 4, clue: "Pacific coastal metropolis and culinary capital of the ancient Incan homeland.", fact: "Lima is built in a coastal desert that almost never experiences heavy rain!" },
      { word: "SUVA", len: 4, clue: "Lush harbor town and primary seat of government in the South Pacific island chain.", fact: "Suva is the largest South Pacific city outside of Australia and New Zealand!" },
      { word: "OSLO", len: 4, clue: "Fjord-side Nordic city where the Nobel Peace Prize ceremony takes place every year.", fact: "Oslo is one of the greenest cities on Earth, with two-thirds covered by forests and water!" },
      { word: "PARIS", len: 5, clue: "The iconic 'City of Light' on the Seine River, home to the Louvre and Arc de Triomphe.", fact: "Paris has only one single 'Stop' traffic sign in the entire city!" },
      { word: "TOKYO", len: 5, clue: "Bustling metropolis with neon skyscrapers, bullet trains, and Shibuya Crossing.", fact: "Tokyo is the world's most populous metropolis with over 37 million residents!" },
      { word: "CAIRO", len: 5, clue: "Historic city on the Nile River right next to the Great Sphinx.", fact: "Cairo is right next to the Giza plateau where the Great Sphinx stands guard!" },
      { word: "SEOUL", len: 5, clue: "High-tech Asian metropolis where 600-year-old royal palaces meet futuristic towers.", fact: "Seoul has some of the fastest internet speeds in the world and 600-year-old palaces!" },
      { word: "HANOI", len: 5, clue: "Centuries-old Southeast Asian city known for its scenic Hoan Kiem Lake and Old Quarter.", fact: "Hanoi is famous for its Old Quarter with 36 historic guild streets!" },
      { word: "MADRID", len: 6, clue: "Sun-drenched European metropolis home to the royal palace and the Prado Museum.", fact: "Madrid is home to the world's oldest continuously operating restaurant, founded in 1725!" },
      { word: "OTTAWA", len: 6, clue: "Seat of Canadian government located where the Rideau Canal meets the river.", fact: "During winter, Ottawa's Rideau Canal becomes the world's largest natural ice skating rink!" },
      { word: "BERLIN", len: 6, clue: "Dynamic European metropolis famous for the historic Brandenburg Gate and historic wall.", fact: "Berlin has more bridges than Venice, Italy—over 1,700 bridges in total!" },
      { word: "DUBLIN", len: 6, clue: "Friendly coastal city on the River Liffey home to the ancient Book of Kells.", fact: "Dublin's Trinity College Library houses the 1,200-year-old illuminated Book of Kells!" },
      { word: "ATHENS", len: 6, clue: "Ancient cradle of democracy topped by the hilltop Parthenon temple.", fact: "Athens has been continuously inhabited for over 3,400 years!" },
      { word: "VIENNA", len: 6, clue: "Musical city on the Danube River where Mozart and Beethoven composed symphonies.", fact: "Vienna was home to legendary classical composers Mozart, Beethoven, and Brahms!" },
      { word: "HAVANA", len: 6, clue: "Vibrant Caribbean city known for colorful vintage classic cars and historic forts.", fact: "Havana's historic core is protected as a UNESCO World Heritage treasure!" },
      { word: "LISBON", len: 6, clue: "Coastal European city famous for historic yellow trams clattering over seven hills.", fact: "Lisbon is one of the oldest cities in Western Europe, predating London and Paris!" },
      { word: "ANKARA", len: 6, clue: "Ancient crossroads fortress city and government seat of the Anatolian peninsula.", fact: "Ankara has been a key trade crossroads since the Bronze Age!" },
      { word: "RIYADH", len: 6, clue: "Rapidly growing desert metropolis known for the Kingdom Centre skyscraper.", fact: "Riyadh means 'The Gardens' in Arabic, referencing its historic desert oasis roots!" },
      { word: "MANILA", len: 6, clue: "Bustling bayside Asian metropolis with the historic stone-walled city of Intramuros.", fact: "Manila's historic walled city 'Intramuros' was built with volcanic stone in 1571!" },
      { word: "BOGOTA", len: 6, clue: "High-altitude city perched over 8,600 feet up in the Andes Mountains.", fact: "Bogota sits over 8,600 feet high in the Andes Mountains with cool mountain air!" },
      { word: "PRAGUE", len: 6, clue: "The 'City of a Hundred Spires' with a fairy-tale stone bridge and giant hilltop castle.", fact: "Prague Castle is the largest ancient castle complex in the world!" },
      { word: "LONDON", len: 6, clue: "Historic city on the River Thames with Big Ben's clock tower and Tower Bridge.", fact: "London has over 170 museums and Big Ben's clock tower has ticked since 1859!" },
      { word: "WARSAW", len: 6, clue: "Historic city on the Vistula River with a meticulously reconstructed Old Town.", fact: "Warsaw was painstakingly rebuilt after WWII and is famous for its colorful market square!" },
      { word: "TAIPEI", len: 6, clue: "Bustling island metropolis famous for its giant bamboo-shaped 101-story skyscraper.", fact: "Taipei 101 features a giant 660-ton pendulum tuned damper ball that protects it from earthquakes!" }
    ]
  },

  space: {
    id: "space",
    name: "Space & Planets",
    icon: "🚀",
    desc: "Cosmic bodies, starships, and interstellar marvels!",
    words: [
      { word: "MARS", len: 4, clue: "The Red Planet with giant canyon systems, polar ice caps, and exploring rovers.", fact: "Mars is home to Olympus Mons, a volcano three times taller than Mount Everest!" },
      { word: "MOON", len: 4, clue: "Earth's natural celestial companion that lights up the night and drives ocean tides.", fact: "Footprints left by Apollo astronauts on the Moon will stay there for millions of years!" },
      { word: "STAR", len: 4, clue: "A massive glowing ball of super-hot plasma powered by nuclear fusion in its core.", fact: "The Sun makes up 99.8% of all the mass in our entire Solar System!" },
      { word: "APEX", len: 4, clue: "The highest point reached in a rocket's trajectory arc before entering orbit.", fact: "Rocket trajectories calculate apex altitudes to slip cleanly into orbit!" },
      { word: "COMET", len: 5, clue: "A frozen cosmic snowball of ice and dust that sprouts a glowing tail near the Sun.", fact: "A comet's glowing tail of dust and gas can stretch for millions of miles!" },
      { word: "ORBIT", len: 5, clue: "The curved elliptical path followed by a planet or satellite around a celestial body.", fact: "The International Space Station orbits Earth every 90 minutes at 17,500 mph!" },
      { word: "PLUTO", len: 5, clue: "Dwarf planet on the outer edge of our Solar System with a giant heart-shaped ice plain.", fact: "Pluto's heart-shaped glacier is made of frozen nitrogen ice!" },
      { word: "VENUS", len: 5, clue: "Hottest planet in our Solar System, blanketed by thick yellow clouds of sulfuric acid.", fact: "Venus spins backwards compared to most other planets, so the Sun rises in the west!" },
      { word: "SOLAR", len: 5, clue: "Relating to the powerful energy and radiant light coming from our home star.", fact: "Light from the Sun takes about 8 minutes and 20 seconds to reach Earth!" },
      { word: "LUNAR", len: 5, clue: "Relating to Earth's cratered nighttime companion.", fact: "A full lunar cycle from new moon to new moon takes about 29.5 days!" },
      { word: "TITAN", len: 5, clue: "Giant ringed-planet moon featuring a dense atmosphere and lakes of liquid methane.", fact: "Titan is the only moon in our solar system with a thick atmosphere and liquid lakes!" },
      { word: "RADAR", len: 5, clue: "Radio wave technology used to map planetary surfaces and track approaching asteroids.", fact: "Space radar can bounce signals off asteroids millions of miles away to calculate their orbits!" },
      { word: "SATURN", len: 6, clue: "The dazzling sixth planet famous for its majestic system of icy orbiting rings.", fact: "Saturn's dazzling rings are made of billions of chunks of ice and rock!" },
      { word: "ROCKET", len: 6, clue: "Powerful space vehicle burning cryogenic fuels to generate immense liftoff thrust.", fact: "Modern rockets burn super-chilled liquid oxygen and hydrogen for maximum thrust!" },
      { word: "GALAXY", len: 6, clue: "A colossal swirling system composed of hundreds of billions of stars, dust, and dark matter.", fact: "Our home galaxy, the Milky Way, contains between 100 to 400 billion stars!" },
      { word: "METEOR", len: 6, clue: "A space rock that streaks brilliantly across the night sky as a 'shooting star'.", fact: "Most meteors are smaller than a pebble when they streak across the night sky!" },
      { word: "NEBULA", len: 6, clue: "A giant glowing cosmic cloud of interstellar gas and dust where infant stars are born.", fact: "The Orion Nebula is a stellar nursery 1,300 light-years away where thousands of baby stars form!" },
      { word: "COSMOS", len: 6, clue: "The entire universe viewed as a grand, orderly, and beautifully harmonious system.", fact: "The observable cosmos spans over 93 billion light-years across!" },
      { word: "CRATER", len: 6, clue: "A bowl-shaped depression left on a planetary surface by a high-speed asteroid impact.", fact: "The Moon has millions of impact craters because it has no wind or rain to erode them!" },
      { word: "PULSAR", len: 6, clue: "A rapidly spinning neutron star that flashes rhythmic beams of radio waves like a cosmic lighthouse.", fact: "Some pulsars can spin hundreds of times every single second!" },
      { word: "AURORA", len: 6, clue: "Spectacular shimmering curtains of green and purple light dancing in polar night skies.", fact: "Auroras are created when solar wind particles collide with gases in Earth's atmosphere!" },
      { word: "ZENITH", len: 6, clue: "The imaginary celestial point located directly overhead in the night sky.", fact: "Telescopes point straight up to the zenith to look through the thinnest layer of atmosphere!" },
      { word: "VORTEX", len: 6, clue: "A giant swirling storm of spinning atmosphere, like Jupiter's Great Red Spot.", fact: "Jupiter's Great Red Spot is a giant vortex storm that has raged for over 300 years!" },
      { word: "SPHERE", len: 6, clue: "The perfectly symmetrical round geometric shape formed by planets under gravity.", fact: "Gravity pulls large planets into round spheres equally in all directions!" },
      { word: "VACUUM", len: 6, clue: "A completely empty expanse devoid of all matter, sound, and atmospheric pressure.", fact: "Outer space is a near-perfect vacuum where sound cannot travel at all!" }
    ]
  },

  animals: {
    id: "animals",
    name: "Wild Animals",
    icon: "🐾",
    desc: "Fascinating creatures from the savanna, jungle, and ocean depths!",
    words: [
      { word: "LION", len: 4, clue: "Majestic predator known as the King of Beasts that hunts in family prides.", fact: "A lion's mighty roar can be heard from over 5 miles away!" },
      { word: "BEAR", len: 4, clue: "Powerful omnivore with thick fur that sleeps in dens through freezing winters.", fact: "Grizzly bears have an extraordinary sense of smell that is 7 times stronger than a bloodhound's!" },
      { word: "WOLF", len: 4, clue: "Keen pack hunter that communicates with vocal chorus calls across wilderness forests.", fact: "Wolves howl to assemble their pack, defend territory, and communicate across miles!" },
      { word: "DEER", len: 4, clue: "Graceful herbivore whose males regrow large branched velvet antlers each spring.", fact: "Male deer regrow a brand new set of antlers every single spring!" },
      { word: "HARE", len: 4, clue: "Swift long-eared grassland runner capable of zigzagging at 40 miles per hour.", fact: "Arctic hares can reach sprinting speeds of up to 40 miles per hour!" },
      { word: "EAGLE", len: 5, clue: "Fierce bird of prey with razor-sharp talons and telescope-quality eyesight.", fact: "Eagles can spot a tiny rabbit from over 2 miles away in mid-flight!" },
      { word: "PANDA", len: 5, clue: "Gentle black-and-white bear native to mountain bamboo forests in East Asia.", fact: "Giant pandas spend up to 14 hours a day eating over 25 pounds of bamboo!" },
      { word: "TIGER", len: 5, clue: "Largest wild feline on Earth, stealthily camouflaged by vivid striped fur.", fact: "No two tigers have the exact same stripe pattern—their stripes are as unique as human fingerprints!" },
      { word: "SHARK", len: 5, clue: "Ocean predator with a flexible skeleton made of cartilage that has roamed seas for 400 million years.", fact: "Sharks have skeletons made entirely of flexible cartilage instead of bone!" },
      { word: "OTTER", len: 5, clue: "Playful river or sea creature that floats on its back using flat stones to crack shells.", fact: "Sea otters hold paws while sleeping so they don't drift away in ocean currents!" },
      { word: "KOALA", len: 5, clue: "Furry Australian marsupial that spends its days munching eucalyptus leaves high in trees.", fact: "Koalas have unique fingerprints that are nearly indistinguishable from human fingerprints!" },
      { word: "ZEBRA", len: 5, clue: "Striped African grazer whose optical patterns confuse biting flies and predators.", fact: "Zebra stripes help confuse biting insects and act as a natural optical cooling system!" },
      { word: "SLOTH", len: 5, clue: "Slowest tree-dwelling mammal on Earth, moving so gently that green moss grows on its coat.", fact: "Sloths are so slow that harmless green algae actually grows on their fur to camouflage them!" },
      { word: "CAMEL", len: 5, clue: "Tough desert wanderer equipped with fat-storing back mounds and sand-blocking eyelashes.", fact: "A camel's hump stores nutrient-rich fat, allowing it to go weeks without food!" },
      { word: "TOUCAN", len: 6, clue: "Tropical rainforest bird equipped with an enormous, brightly colored lightweight beak.", fact: "A toucan's massive bill acts like a natural radiator to regulate its body temperature!" },
      { word: "TURTLE", len: 6, clue: "Ancient armored reptile that glides through ocean currents or hides in a protective shell.", fact: "Sea turtles have built-in magnetic compasses that guide them across thousands of miles of ocean!" },
      { word: "MONKEY", len: 6, clue: "Agile primate with nimble fingers that leaps through jungle canopies.", fact: "Some monkeys use prehensile tails like a fifth hand to swing through jungle canopies!" },
      { word: "FALCON", len: 6, clue: "Aerial hunter that holds the world speed record by diving through skies at over 240 mph.", fact: "The peregrine falcon can dive through the sky at speeds over 240 miles per hour!" },
      { word: "PARROT", len: 6, clue: "Brilliantly feathered tropical bird known for high intelligence and mimicking vocal sounds.", fact: "Some African grey parrots have been proven to understand math concepts and word meanings!" },
      { word: "JAGUAR", len: 6, clue: "Spotted big cat of the rainforests that loves swimming and has the strongest jaws of all felines.", fact: "Jaguars have the strongest bite of any big cat, capable of piercing tough turtle shells!" },
      { word: "WALRUS", len: 6, clue: "Chubby Arctic mammal boasting long ivory fangs and whiskers that probe icy seafloors.", fact: "A walrus's sensitive whiskers can detect tiny clams buried deep in ocean mud!" },
      { word: "BEAVER", len: 6, clue: "Aquatic rodent with chisel-like orange teeth that constructs wooden lodges and river dams.", fact: "Beavers have orange teeth with iron in their enamel that never stop growing!" },
      { word: "BADGER", len: 6, clue: "Fearless burrower with black-and-white facial stripes and tough protective skin.", fact: "Honey badgers have thick rubbery skin that protects them from bee stings and predator bites!" }
    ]
  },

  science: {
    id: "science",
    name: "Science & Nature",
    icon: "🔬",
    desc: "Physics, chemistry, biology, and scientific inventions!",
    words: [
      { word: "ATOM", len: 4, clue: "The fundamental building block of all physical matter in the universe.", fact: "Over 99.99% of an atom is empty space, with a tiny nucleus at its center!" },
      { word: "CELL", len: 4, clue: "The microscopic basic unit of all living organisms on Earth.", fact: "The human body is made up of roughly 37 trillion cooperating living cells!" },
      { word: "GENE", len: 4, clue: "A segment of DNA that carries inherited instructions from parents to children.", fact: "Humans share about 99.9% of the exact same genetic DNA code with each other!" },
      { word: "WAVE", len: 4, clue: "A rhythmic repeating disturbance that transfers energy through space, water, or air.", fact: "Light travels in waves at 186,282 miles per second—the cosmic speed limit!" },
      { word: "VOLT", len: 4, clue: "The standard scientific unit measuring electrical force and potential difference.", fact: "A single bolt of lightning can deliver over 100 million volts of electric power!" },
      { word: "HEAT", len: 4, clue: "Thermal energy that flows from warmer substances to cooler ones.", fact: "Heat causes molecules in substances to jiggle and move faster!" },
      { word: "LENS", len: 4, clue: "A polished piece of curved transparent glass that bends and focuses incoming light rays.", fact: "Eyeball lenses naturally flip incoming images upside down; your brain flips them right side up!" },
      { word: "LASER", len: 5, clue: "A narrow, intensely focused beam of single-color synchronized light.", fact: "LASER stands for 'Light Amplification by Stimulated Emission of Radiation'!" },
      { word: "PRISM", len: 5, clue: "A geometric glass block that refracts white sunlight into a rainbow spectrum.", fact: "Sir Isaac Newton proved that white sunlight is composed of all rainbow colors combined!" },
      { word: "ROBOT", len: 5, clue: "An automated programmable machine capable of carrying out complex physical actions.", fact: "The word 'robot' was first introduced in a 1920 science fiction play!" },
      { word: "SOUND", len: 5, clue: "Acoustic pressure vibrations that travel through air and are detected by our eardrums.", fact: "Sound travels 4 times faster through water than through open air!" },
      { word: "LIGHT", len: 5, clue: "The visible part of the electromagnetic spectrum that illuminates our world.", fact: "Sunlight is composed of billions of photon energy packets traveling across space!" },
      { word: "FORCE", len: 5, clue: "Any push or pull applied to an object that causes it to accelerate or change direction.", fact: "Newton's laws of motion explain how forces govern everything from rocket launches to soccer kicks!" },
      { word: "MAGMA", len: 5, clue: "Extremely hot molten liquid rock trapped deep beneath Earth's solid crust.", fact: "When underground magma erupts onto the surface of a volcano, it is called lava!" },
      { word: "QUARK", len: 5, clue: "A fundamental subatomic particle that binds together to form protons and neutrons.", fact: "Quarks come in six fun 'flavors': up, down, charm, strange, top, and bottom!" },
      { word: "FOSSIL", len: 6, clue: "The ancient petrified remains or imprints of creatures preserved in sedimentary rock.", fact: "Fossils teach scientists what dinosaurs, ancient ferns, and trilobites looked like millions of years ago!" },
      { word: "PLANET", len: 6, clue: "A massive celestial body in hydrostatic equilibrium orbiting a central star.", fact: "Astronomers have discovered over 5,000 exoplanets orbiting distant stars beyond our solar system!" },
      { word: "MAGNET", len: 6, clue: "An object producing an invisible polarity field that attracts iron, nickel, and steel.", fact: "Earth itself is a giant magnet with a liquid iron-nickel core generating a protective magnetic shield!" },
      { word: "ENERGY", len: 6, clue: "The fundamental capacity to perform work, found in kinetic, potential, and thermal forms.", fact: "The law of conservation of energy states that energy cannot be created or destroyed, only transformed!" },
      { word: "PROTON", len: 6, clue: "A positively charged subatomic particle residing in the nucleus of an element.", fact: "The number of protons in an atom determines which chemical element it is!" },
      { word: "NEURON", len: 6, clue: "A specialized nerve cell in the brain that transmits rapid bio-electrical impulses.", fact: "The human brain contains roughly 86 billion interconnected neurons!" },
      { word: "OXYGEN", len: 6, clue: "The vital atmospheric element gas that animals inhale to power cellular respiration.", fact: "Ocean phytoplankton produce over 50% of the oxygen in Earth's atmosphere!" },
      { word: "CARBON", len: 6, clue: "The versatile element of life that can form both soft pencil graphite and hard sparkling diamonds.", fact: "Diamonds and pencil graphite are both made of 100% pure carbon atoms arranged differently!" },
      { word: "MOTION", len: 6, clue: "The physical phenomenon in which an object changes its spatial position over time.", fact: "Galileo proved that in a vacuum with no air resistance, a feather and a bowling ball fall at the exact same rate!" }
    ]
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { WORD_ODYSSEY_CATEGORIES };
}
