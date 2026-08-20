/**
 * Element Fusion Lab: Data & Chemical Compound Recipes
 * 4 Primordial Elements -> 160+ Discoveries across 8 Categories
 */

const ELEMENT_FUSION_DATA = {
  categories: [
    { id: 'all', name: 'All Elements', icon: '✨' },
    { id: 'basic', name: 'Basic & Fluids', icon: '💧' },
    { id: 'space', name: 'Cosmos & Astronomy', icon: '🌌' },
    { id: 'geology', name: 'Geology & Minerals', icon: '🌋' },
    { id: 'nature', name: 'Nature & Life', icon: '🌿' },
    { id: 'tech', name: 'Tech & Machines', icon: '⚙️' },
    { id: 'energy', name: 'Energy & Physics', icon: '⚡' },
    { id: 'civilization', name: 'Civilization & Science', icon: '🏛️' },
    { id: 'cosmic', name: 'Mythic & Cosmic', icon: '🔮' }
  ],

  // Base 4 Primordial Elements unlocked by default
  baseElements: ['water', 'fire', 'earth', 'air'],

  // All 160+ Elements
  elements: [
    // --- 4 BASE ELEMENTS ---
    { id: 'water', name: 'Water', emoji: '💧', category: 'basic', recipe: [], description: 'The liquid of life, essential for all living creatures.', funFact: 'Water expands when it freezes, which is why ice floats!' },
    { id: 'fire', name: 'Fire', emoji: '🔥', category: 'basic', recipe: [], description: 'A rapid chemical reaction creating intense heat and light.', funFact: 'Fire has no mass because it is energy in the form of heat and light.' },
    { id: 'earth', name: 'Earth', emoji: '🌍', category: 'basic', recipe: [], description: 'Soil, rock, and the crust beneath our feet.', funFact: 'The Earth is over 4.5 billion years old.' },
    { id: 'air', name: 'Air', emoji: '💨', category: 'basic', recipe: [], description: 'The invisible mixture of gases we breathe (nitrogen and oxygen).', funFact: 'Air is mostly Nitrogen (78%) and Oxygen (21%).' },

    // --- BASIC & FLUIDS ---
    { id: 'steam', name: 'Steam', emoji: '♨️', category: 'basic', recipe: ['water', 'fire'], description: 'Water in gaseous vapor state.', funFact: 'Steam engines powered the Industrial Revolution!' },
    { id: 'mud', name: 'Mud', emoji: '🌱', category: 'basic', recipe: ['water', 'earth'], description: 'A soft, wet mixture of soil and water.', funFact: 'Mud acts as natural sunscreen for elephants and pigs.' },
    { id: 'rain', name: 'Rain', emoji: '🌧️', category: 'basic', recipe: ['water', 'air'], description: 'Condensed moisture falling in droplets.', funFact: 'Raindrops are shaped like hamburger buns, not teardrops!' },
    { id: 'smoke', name: 'Smoke', emoji: '💨', category: 'basic', recipe: ['fire', 'air'], description: 'A collection of airborne particulates from combustion.', funFact: 'Smoke particles can travel around the entire globe.' },
    { id: 'dust', name: 'Dust', emoji: '🌫️', category: 'basic', recipe: ['earth', 'air'], description: 'Fine particles of matter in the atmosphere.', funFact: 'Much of household dust comes from outdoor soil and star dust!' },
    { id: 'lava', name: 'Lava', emoji: '🌋', category: 'geology', recipe: ['earth', 'fire'], description: 'Molten rock expelled by a volcano.', funFact: 'Lava can reach blistering temperatures of over 1,200°C (2,200°F).' },
    { id: 'cloud', name: 'Cloud', emoji: '☁️', category: 'basic', recipe: ['rain', 'air'], description: 'Billions of tiny water droplets floating in the sky.', funFact: 'An average fluffy cumulus cloud weighs about 1.1 million pounds!' },
    { id: 'ice', name: 'Ice', emoji: '🧊', category: 'basic', recipe: ['water', 'cold'], description: 'Solid crystallized water below 0°C.', funFact: 'Glaciers store about 69% of the world\'s fresh water.' },
    { id: 'cold', name: 'Cold', emoji: '❄️', category: 'basic', recipe: ['air', 'rain'], description: 'The absence of thermal energy.', funFact: 'Absolute zero (-273.15°C) is the coldest possible temperature in the universe.' },
    { id: 'fog', name: 'Fog', emoji: '🌁', category: 'basic', recipe: ['cloud', 'earth'], description: 'A low cloud touching the ground.', funFact: 'Fog can condense and provide drinking water for desert plants.' },
    { id: 'ocean', name: 'Ocean', emoji: '🌊', category: 'basic', recipe: ['water', 'water'], description: 'Vast body of saltwater covering 71% of Earth.', funFact: 'More than 80% of our ocean remains unmapped and unexplored.' },
    { id: 'lake', name: 'Lake', emoji: '🏞️', category: 'basic', recipe: ['water', 'mud'], description: 'A large inland body of standing water.', funFact: 'Lake Baikal holds 20% of the world\'s unfrozen fresh surface water.' },
    { id: 'river', name: 'River', emoji: '🌊', category: 'basic', recipe: ['water', 'mountain'], description: 'Flowing freshwater stream heading toward the sea.', funFact: 'The Nile is the longest river in the world, stretching over 6,650 km.' },

    // --- GEOLOGY & MINERALS ---
    { id: 'stone', name: 'Stone', emoji: '🪨', category: 'geology', recipe: ['lava', 'air'], description: 'Solid mineral matter solidified from cooling rock.', funFact: 'The oldest known rock on Earth is 4.03 billion years old in Canada.' },
    { id: 'sand', name: 'Sand', emoji: '🏖️', category: 'geology', recipe: ['stone', 'water'], description: 'Fine granular rock eroded by wind and ocean waves.', funFact: 'Under a microscope, sand grains look like colorful miniature crystals.' },
    { id: 'glass', name: 'Glass', emoji: '🪟', category: 'civilization', recipe: ['sand', 'fire'], description: 'Amorphous transparent solid made by melting silica.', funFact: 'Lightning striking sand can create natural glass tubes called fulgurites.' },
    { id: 'clay', name: 'Clay', emoji: '🏺', category: 'geology', recipe: ['mud', 'sand'], description: 'Fine-grained natural soil material used in pottery.', funFact: 'Ancient Mesopotamians wrote the first books on baked clay tablets.' },
    { id: 'brick', name: 'Brick', emoji: '🧱', category: 'civilization', recipe: ['clay', 'fire'], description: 'Hardened block used for building walls.', funFact: 'Bricks have been used in construction for over 9,000 years.' },
    { id: 'metal', name: 'Metal', emoji: '⚙️', category: 'geology', recipe: ['stone', 'fire'], description: 'Dense, lustrous element that conducts heat and electricity.', funFact: 'Gold is so malleable that 1 gram can be pounded into a 1-square-meter sheet.' },
    { id: 'obsidian', name: 'Obsidian', emoji: '🖤', category: 'geology', recipe: ['lava', 'water'], description: 'Volcanic glass formed when felsic lava cools rapidly.', funFact: 'Obsidian blades can be sharper than high-grade surgical steel scalpels.' },
    { id: 'mountain', name: 'Mountain', emoji: '⛰️', category: 'geology', recipe: ['earth', 'earth'], description: 'Large landform elevated high above surrounding land.', funFact: 'Mount Everest grows about 4 millimeters taller every year!' },
    { id: 'volcano', name: 'Volcano', emoji: '🌋', category: 'geology', recipe: ['mountain', 'lava'], description: 'Rupture in Earth\'s crust allowing hot magma to escape.', funFact: 'Olympus Mons on Mars is the biggest volcano in our solar system (3x Everest).' },
    { id: 'island', name: 'Island', emoji: '🏝️', category: 'geology', recipe: ['volcano', 'ocean'], description: 'Sub-continental land surrounded completely by water.', funFact: 'The Hawaiian islands were formed entirely by undersea volcanoes.' },
    { id: 'fossil', name: 'Fossil', emoji: '🦴', category: 'geology', recipe: ['dinosaur', 'earth'], description: 'Preserved remains of ancient organisms in rock.', funFact: 'The study of fossils is called paleontology.' },
    { id: 'crystal', name: 'Crystal', emoji: '💎', category: 'geology', recipe: ['stone', 'time'], description: 'Solid material whose atoms form a periodic lattice.', funFact: 'Snowflakes are single ice crystals with unique 6-fold symmetry.' },
    { id: 'diamond', name: 'Diamond', emoji: '💠', category: 'geology', recipe: ['coal', 'pressure'], description: 'Allotrope of carbon formed under extreme subterranean pressure.', funFact: 'Diamond is the hardest naturally occurring substance on Earth.' },
    { id: 'coal', name: 'Coal', emoji: '⬛', category: 'geology', recipe: ['plant', 'pressure'], description: 'Combustible sedimentary rock formed from ancient vegetation.', funFact: 'Coal was formed over 300 million years ago during the Carboniferous period.' },
    { id: 'pressure', name: 'Pressure', emoji: '🗜️', category: 'energy', recipe: ['earth', 'earth'], description: 'Continuous physical force exerted on an object.', funFact: 'At Earth\'s core, pressure is over 3.6 million times atmospheric pressure!' },
    { id: 'time', name: 'Time', emoji: '⏳', category: 'energy', recipe: ['sand', 'glass'], description: 'The continuous progression of existence.', funFact: 'Atomic clocks are so precise they lose only 1 second every 300 million years.' },
    { id: 'geyser', name: 'Geyser', emoji: '♨️', category: 'geology', recipe: ['steam', 'earth'], description: 'Hot spring under pressure that periodically erupts.', funFact: 'Old Faithful in Yellowstone erupts every 44 to 125 minutes.' },

    // --- NATURE & LIFE ---
    { id: 'energy', name: 'Energy', emoji: '⚡', category: 'energy', recipe: ['fire', 'air'], description: 'The capacity of a system to perform work.', funFact: 'Energy cannot be created or destroyed, only transformed!' },
    { id: 'life', name: 'Life', emoji: '🧬', category: 'nature', recipe: ['energy', 'mud'], description: 'Self-sustaining biological process of growth and reproduction.', funFact: 'All living things on Earth share the same fundamental DNA code.' },
    { id: 'plant', name: 'Plant', emoji: '🌱', category: 'nature', recipe: ['life', 'earth'], description: 'Photosynthetic organism converting sunlight into nutrients.', funFact: 'Plants release oxygen during the day through photosynthesis.' },
    { id: 'tree', name: 'Tree', emoji: '🌳', category: 'nature', recipe: ['plant', 'time'], description: 'Perennial plant with an elongated stem or trunk.', funFact: 'Trees communicate and share nutrients through an underground fungal network.' },
    { id: 'forest', name: 'Forest', emoji: '🌲', category: 'nature', recipe: ['tree', 'tree'], description: 'Dense growth of trees and underbrush covering an area.', funFact: 'The Amazon rainforest produces roughly 20% of Earth\'s land-based oxygen.' },
    { id: 'flower', name: 'Flower', emoji: '🌸', category: 'nature', recipe: ['plant', 'sun'], description: 'The reproductive structure found in flowering plants.', funFact: 'Sunflowers track the sun across the sky in a process called heliotropism.' },
    { id: 'grass', name: 'Grass', emoji: '🌾', category: 'nature', recipe: ['plant', 'earth'], description: 'Narrow-leaved green vegetation.', funFact: 'Bamboo is the fastest growing type of grass in the world (up to 90 cm a day).' },
    { id: 'animal', name: 'Animal', emoji: '🐾', category: 'nature', recipe: ['life', 'forest'], description: 'Multicellular eukaryotic organism of kingdom Animalia.', funFact: 'Blue whales are the largest animals ever known to have lived on Earth.' },
    { id: 'bird', name: 'Bird', emoji: '🦅', category: 'nature', recipe: ['animal', 'air'], description: 'Feathered, winged, warm-blooded egg-laying vertebrate.', funFact: 'Peregrine falcons dive at speeds over 389 km/h (242 mph)!' },
    { id: 'fish', name: 'Fish', emoji: '🐟', category: 'nature', recipe: ['animal', 'water'], description: 'Gill-bearing aquatic craniate animal.', funFact: 'Some fish, like salmon, can navigate thousands of miles back to where they were born.' },
    { id: 'dinosaur', name: 'Dinosaur', emoji: '🦖', category: 'nature', recipe: ['animal', 'time'], description: 'Extinct clade of reptiles that dominated the Mesozoic era.', funFact: 'Modern birds are the direct living descendants of avian theropod dinosaurs.' },
    { id: 'human', name: 'Human', emoji: '🧑', category: 'civilization', recipe: ['animal', 'tool'], description: 'Intelligent bipedal primate of the genus Homo.', funFact: 'Human brains contain about 86 billion neurons communicating at light speed!' },
    { id: 'bacterium', name: 'Bacterium', emoji: '🦠', category: 'nature', recipe: ['life', 'water'], description: 'Microscopic single-celled organism.', funFact: 'There are more bacteria on your hand than people on planet Earth.' },
    { id: 'wood', name: 'Wood', emoji: '🪵', category: 'nature', recipe: ['tree', 'tool'], description: 'Fibrous structural tissue found in the trunks of trees.', funFact: 'Petrified wood is wood that turned into stone over millions of years.' },
    { id: 'seed', name: 'Seed', emoji: '🌰', category: 'nature', recipe: ['plant', 'flower'], description: 'Embryonic plant enclosed in a protective outer covering.', funFact: 'A 32,000-year-old Arctic flower seed was revived and successfully bloomed!' },
    { id: 'fruit', name: 'Fruit', emoji: '🍎', category: 'nature', recipe: ['tree', 'flower'], description: 'Seed-bearing structure formed from ovaries after flowering.', funFact: 'Apples float in water because they are 25% air!' },
    { id: 'cactus', name: 'Cactus', emoji: '🌵', category: 'nature', recipe: ['plant', 'sand'], description: 'Spiny desert plant adapted to arid climates.', funFact: 'Saguaro cacti can live over 150-200 years and store tons of water.' },
    { id: 'coral', name: 'Coral', emoji: '🪸', category: 'nature', recipe: ['ocean', 'stone'], description: 'Marine invertebrate building massive limestone reefs.', funFact: 'The Great Barrier Reef is the largest living structure on Earth, visible from space!' },

    // --- COSMOS & ASTRONOMY ---
    { id: 'sun', name: 'Sun', emoji: '☀️', category: 'space', recipe: ['fire', 'sky'], description: 'The G-type main-sequence star at the center of our Solar System.', funFact: 'Light from the Sun takes 8 minutes and 20 seconds to reach Earth.' },
    { id: 'sky', name: 'Sky', emoji: '🌌', category: 'space', recipe: ['air', 'cloud'], description: 'The apparent dome of atmosphere over the Earth.', funFact: 'The sky is blue because blue light scatters more in air molecules (Rayleigh scattering).' },
    { id: 'moon', name: 'Moon', emoji: '🌙', category: 'space', recipe: ['sky', 'stone'], description: 'Earth\'s only natural permanent satellite.', funFact: 'Footprints left by Apollo astronauts on the Moon will stay there for millions of years!' },
    { id: 'night', name: 'Night', emoji: '🌃', category: 'space', recipe: ['sky', 'moon'], description: 'The period of ambient darkness when the Sun is below the horizon.', funFact: 'In polar regions during winter, the sun does not rise for several months!' },
    { id: 'star', name: 'Star', emoji: '⭐', category: 'space', recipe: ['sun', 'night'], description: 'Luminous sphere of plasma held together by its own gravity.', funFact: 'There are more stars in the observable universe than grains of sand on all Earth\'s beaches.' },
    { id: 'planet', name: 'Planet', emoji: '🪐', category: 'space', recipe: ['star', 'earth'], description: 'Astronomical body orbiting a star, massive enough to be rounded by gravity.', funFact: 'Jupiter is so massive that all other planets in our solar system could fit inside it.' },
    { id: 'solar_system', name: 'Solar System', emoji: '🌌', category: 'space', recipe: ['sun', 'planet'], description: 'The gravitationally bound system of the Sun and objects orbiting it.', funFact: 'The solar system takes about 230 million years to orbit the Milky Way galaxy.' },
    { id: 'galaxy', name: 'Galaxy', emoji: '🌀', category: 'space', recipe: ['solar_system', 'star'], description: 'Massive gravitational system consisting of stars, stellar remnants, and dark matter.', funFact: 'Our Milky Way galaxy is spinning at 168 miles per second.' },
    { id: 'black_hole', name: 'Black Hole', emoji: '🕳️', category: 'space', recipe: ['star', 'pressure'], description: 'Region of spacetime where gravity is so strong that nothing, not even light, can escape.', funFact: 'Time slows down near a black hole due to extreme gravitational time dilation.' },
    { id: 'comet', name: 'Comet', emoji: '☄️', category: 'space', recipe: ['ice', 'star'], description: 'Icy small Solar System body that outgasses a glowing tail when passing near the Sun.', funFact: 'Comets are essentially giant dirty snowballs traveling across space.' },
    { id: 'meteor', name: 'Meteor', emoji: '🌠', category: 'space', recipe: ['stone', 'sky'], description: 'Streak of light produced when a meteoroid burns up in the atmosphere.', funFact: 'Millions of shooting stars occur every day in Earth\'s upper atmosphere.' },
    { id: 'eclipse', name: 'Eclipse', emoji: '🌑', category: 'space', recipe: ['sun', 'moon'], description: 'Obscuring of light from one celestial body by another.', funFact: 'Total solar eclipses are a cosmic coincidence because the Sun is 400x larger and 400x farther than the Moon.' },
    { id: 'supernova', name: 'Supernova', emoji: '💥', category: 'space', recipe: ['star', 'explosion'], description: 'Powerful, catastrophic explosion of a massive dying star.', funFact: 'All the gold and heavy elements on Earth were forged inside supernova explosions!' },
    { id: 'alien', name: 'Alien', emoji: '👽', category: 'space', recipe: ['life', 'planet'], description: 'Hypothetical extraterrestrial life from another world.', funFact: 'Astrobiologists search for life by looking for water and biosignatures on exoplanets.' },

    // --- ENERGY & PHYSICS ---
    { id: 'lightning', name: 'Lightning', emoji: '⚡', category: 'energy', recipe: ['cloud', 'energy'], description: 'Naturally occurring electrostatic discharge between clouds and ground.', funFact: 'A bolt of lightning can heat the air to 30,000°C (5x hotter than the sun\'s surface)!' },
    { id: 'electricity', name: 'Electricity', emoji: '💡', category: 'energy', recipe: ['lightning', 'metal'], description: 'Flow of electric charge via electrons.', funFact: 'Electric signals travel along copper wires at nearly 90% the speed of light.' },
    { id: 'sound', name: 'Sound', emoji: '🔊', category: 'energy', recipe: ['air', 'energy'], description: 'Vibrations traveling as acoustic waves through matter.', funFact: 'Sound travels 4 times faster through water than through air.' },
    { id: 'light', name: 'Light', emoji: '🔦', category: 'energy', recipe: ['sun', 'electricity'], description: 'Electromagnetic radiation visible to the human eye.', funFact: 'Light speed in a vacuum (300,000 km/s) is the universal cosmic speed limit.' },
    { id: 'laser', name: 'Laser', emoji: '🔴', category: 'energy', recipe: ['light', 'crystal'], description: 'Device emitting light through optical amplification based on stimulated emission.', funFact: 'LASER stands for Light Amplification by Stimulated Emission of Radiation.' },
    { id: 'plasma', name: 'Plasma', emoji: '🟣', category: 'energy', recipe: ['fire', 'electricity'], description: 'Fourth state of matter consisting of ionized gas.', funFact: '99% of the visible universe is composed of plasma!' },
    { id: 'magnet', name: 'Magnet', emoji: '🧲', category: 'energy', recipe: ['metal', 'electricity'], description: 'Material that produces a magnetic field attracting ferromagnetic metals.', funFact: 'Earth itself acts as a giant magnetic dipole protecting us from solar radiation.' },
    { id: 'explosion', name: 'Explosion', emoji: '💥', category: 'energy', recipe: ['fire', 'gas'], description: 'Rapid expansion in volume associated with extreme release of energy.', funFact: 'Shockwaves from explosions compress air into supersonic pressure fronts.' },
    { id: 'gas', name: 'Gas', emoji: '💨', category: 'energy', recipe: ['air', 'fire'], description: 'State of matter without fixed shape or volume.', funFact: 'Helium gas is so light it escapes Earth\'s gravity into outer space!' },
    { id: 'heat', name: 'Heat', emoji: '🔥', category: 'energy', recipe: ['fire', 'energy'], description: 'Thermal energy transferred between thermodynamic systems.', funFact: 'Heat always flows naturally from hotter objects to colder ones.' },
    { id: 'wave', name: 'Wave', emoji: '🌊', category: 'energy', recipe: ['ocean', 'wind'], description: 'Disturbance that transfers energy from one point to another.', funFact: 'Tsunami waves in deep water can travel as fast as commercial jet airliners (800 km/h)!' },
    { id: 'wind', name: 'Wind', emoji: '🌬️', category: 'energy', recipe: ['air', 'energy'], description: 'Natural movement of air caused by atmospheric pressure differences.', funFact: 'Neptune has the fastest recorded winds in the solar system, reaching 2,100 km/h!' },
    { id: 'nuclear', name: 'Nuclear Energy', emoji: '☢️', category: 'energy', recipe: ['sun', 'metal'], description: 'Energy released during nuclear fission or fusion.', funFact: 'One tiny uranium pellet provides as much energy as 1 ton of coal!' },

    // --- CIVILIZATION, TOOLS & SCIENCE ---
    { id: 'tool', name: 'Tool', emoji: '🔨', category: 'civilization', recipe: ['metal', 'wood'], description: 'Handheld device used to carry out a specific function.', funFact: 'Early humans used stone axes over 2.6 million years ago.' },
    { id: 'wheel', name: 'Wheel', emoji: '☸️', category: 'civilization', recipe: ['wood', 'tool'], description: 'Circular component rotating on an axle to move heavy loads.', funFact: 'The wheel was invented around 3500 BC, originally for pottery before transportation.' },
    { id: 'cart', name: 'Cart', emoji: '🛒', category: 'civilization', recipe: ['wheel', 'wood'], description: 'Vehicle with wheels pulled by animals or humans.', funFact: 'Carts enabled early civilizations to transport heavy stone and crops over long distances.' },
    { id: 'pottery', name: 'Pottery', emoji: '🏺', category: 'civilization', recipe: ['clay', 'wheel'], description: 'Ceramic pots and dishes crafted from clay.', funFact: 'Pottery shards are among the most durable archaeological artifacts.' },
    { id: 'paper', name: 'Paper', emoji: '📜', category: 'civilization', recipe: ['wood', 'water'], description: 'Thin sheet material produced by pressing moist cellulose fibers.', funFact: 'Paper was invented in China by Cai Lun around 105 AD.' },
    { id: 'book', name: 'Book', emoji: '📖', category: 'civilization', recipe: ['paper', 'human'], description: 'Written work consisting of pages bound together.', funFact: 'The Gutenberg printing press in 1440 made books accessible to the world!' },
    { id: 'library', name: 'Library', emoji: '📚', category: 'civilization', recipe: ['book', 'house'], description: 'Collection of books and sources of information.', funFact: 'The ancient Library of Alexandria was the intellectual capital of the ancient world.' },
    { id: 'house', name: 'House', emoji: '🏠', category: 'civilization', recipe: ['brick', 'wood'], description: 'Building serving as living quarters.', funFact: 'The oldest known wooden houses were built over 10,000 years ago.' },
    { id: 'village', name: 'Village', emoji: '🏘️', category: 'civilization', recipe: ['house', 'house'], description: 'Clustered human settlement larger than a hamlet.', funFact: 'Agriculture led hunter-gatherers to settle into the first permanent villages.' },
    { id: 'city', name: 'City', emoji: '🏙️', category: 'civilization', recipe: ['village', 'village'], description: 'Large human settlement with advanced infrastructure.', funFact: 'Uruk in ancient Sumer is considered the world\'s first true city.' },
    { id: 'castle', name: 'Castle', emoji: '🏰', category: 'civilization', recipe: ['house', 'stone'], description: 'Fortified residence built during the Middle Ages.', funFact: 'Spiral staircases in castles were built clockwise to favor defending swordsmen.' },
    { id: 'bridge', name: 'Bridge', emoji: '🌉', category: 'civilization', recipe: ['river', 'stone'], description: 'Structure spanning physical obstacles like rivers.', funFact: 'The Roman arched aqueducts and bridges used waterproof volcanic pozzolana concrete!' },
    { id: 'clock', name: 'Clock', emoji: '⏰', category: 'civilization', recipe: ['time', 'wheel'], description: 'Instrument to measure, keep, and indicate time.', funFact: 'Pendulum clocks invented by Christiaan Huygens in 1656 improved time accuracy 60-fold.' },
    { id: 'compass', name: 'Compass', emoji: '🧭', category: 'civilization', recipe: ['magnet', 'metal'], description: 'Navigational instrument showing cardinal directions.', funFact: 'The magnetic compass was invented in China during the Han Dynasty (206 BC).' },
    { id: 'map', name: 'Map', emoji: '🗺️', category: 'civilization', recipe: ['paper', 'earth'], description: 'Visual representation of an entire area or geography.', funFact: 'The study and practice of making maps is called cartography.' },
    { id: 'telescope', name: 'Telescope', emoji: '🔭', category: 'civilization', recipe: ['glass', 'metal'], description: 'Optical instrument that magnifies distant objects in space.', funFact: 'Galileo was the first person to use a telescope to discover the moons of Jupiter in 1610.' },
    { id: 'microscope', name: 'Microscope', emoji: '🔬', category: 'civilization', recipe: ['glass', 'tool'], description: 'Instrument to inspect objects too small to be seen by the naked eye.', funFact: 'Antonie van Leeuwenhoek discovered bacteria and microscopic life using hand-ground lenses.' },

    // --- TECH, MACHINES & COMPUTING ---
    { id: 'engine', name: 'Engine', emoji: '🚂', category: 'tech', recipe: ['steam', 'metal'], description: 'Machine with moving parts that converts power into motion.', funFact: 'Steam engines use the expansion of boiling water to push heavy pistons.' },
    { id: 'train', name: 'Train', emoji: '🚆', category: 'tech', recipe: ['engine', 'cart'], description: 'Series of connected vehicles traveling along a railway.', funFact: 'Bullet trains in Japan float on magnetic tracks at speeds over 500 km/h (Maglev)!' },
    { id: 'car', name: 'Car', emoji: '🚗', category: 'tech', recipe: ['cart', 'engine'], description: 'Four-wheeled motor vehicle used for transportation.', funFact: 'The world\'s first automobile was patented by Karl Benz in 1886.' },
    { id: 'airplane', name: 'Airplane', emoji: '✈️', category: 'tech', recipe: ['bird', 'metal'], description: 'Fixed-wing aircraft propelled by jet engines or propellers.', funFact: 'The Wright brothers\' first flight in 1903 lasted only 12 seconds!' },
    { id: 'rocket', name: 'Rocket', emoji: '🚀', category: 'tech', recipe: ['airplane', 'fire'], description: 'Vehicle propelled by ejecting exhaust mass at high velocity.', funFact: 'Saturn V rockets produced 7.5 million pounds of thrust to take astronauts to the Moon.' },
    { id: 'satellite', name: 'Satellite', emoji: '🛰️', category: 'tech', recipe: ['rocket', 'telescope'], description: 'Artificial object placed into orbit around a celestial body.', funFact: 'Sputnik 1 in 1957 was the first artificial satellite launched into space.' },
    { id: 'battery', name: 'Battery', emoji: '🔋', category: 'tech', recipe: ['electricity', 'metal'], description: 'Device that converts chemical energy directly into electrical energy.', funFact: 'Alessandro Volta invented the first electric battery (the voltaic pile) in 1800.' },
    { id: 'wire', name: 'Wire', emoji: '🔌', category: 'tech', recipe: ['metal', 'electricity'], description: 'Flexible strand of drawn metal used to conduct electricity.', funFact: 'Copper is used for wires because of its incredible electrical conductivity and ductility.' },
    { id: 'lightbulb', name: 'Lightbulb', emoji: '💡', category: 'tech', recipe: ['glass', 'electricity'], description: 'Electric light device with a wire filament heated until it glows.', funFact: 'Modern LED bulbs use 85% less energy than old incandescent bulbs.' },
    { id: 'computer', name: 'Computer', emoji: '💻', category: 'tech', recipe: ['electricity', 'silicon'], description: 'Electronic device for storing and processing data.', funFact: 'The smartphone in your pocket has millions of times more memory than NASA\'s Apollo 11 guidance computer.' },
    { id: 'silicon', name: 'Silicon', emoji: '🪨', category: 'tech', recipe: ['sand', 'electricity'], description: 'Chemical element semiconductor used in computer microchips.', funFact: 'Silicon is the second most abundant element in Earth\'s crust after oxygen.' },
    { id: 'internet', name: 'Internet', emoji: '🌐', category: 'tech', recipe: ['computer', 'computer'], description: 'Global system of interconnected computer networks.', funFact: 'The first message sent over ARPANET was "LO" (the system crashed before typing "LOGIN")!' },
    { id: 'robot', name: 'Robot', emoji: '🤖', category: 'tech', recipe: ['computer', 'metal'], description: 'Automated machine capable of carrying out complex actions.', funFact: 'NASA\'s Mars rovers (Curiosity and Perseverance) are autonomous robotic geologists.' },
    { id: 'ai', name: 'Artificial Intelligence', emoji: '🧠', category: 'tech', recipe: ['computer', 'human'], description: 'Simulation of human intelligence processes by machines.', funFact: 'AI models learn patterns by processing billions of data points through artificial neural networks.' },
    { id: 'submarine', name: 'Submarine', emoji: '🌊', category: 'tech', recipe: ['boat', 'metal'], description: 'Watercraft capable of independent operation underwater.', funFact: 'Submarines use active sonar (sound pulses) to map the seafloor in pitch darkness.' },
    { id: 'boat', name: 'Boat', emoji: '⛵', category: 'tech', recipe: ['wood', 'water'], description: 'Watercraft designed to float and navigate upon water.', funFact: 'Boats float because of Archimedes\' principle of buoyant displacement.' },
    { id: 'drone', name: 'Drone', emoji: '🚁', category: 'tech', recipe: ['airplane', 'robot'], description: 'Unmanned aerial vehicle controlled autonomously or remotely.', funFact: 'Drones use spinning quadcopter propellers with gyroscopic sensors to hover steadily in strong winds.' },
    { id: 'cyborg', name: 'Cyborg', emoji: '🦾', category: 'tech', recipe: ['human', 'robot'], description: 'Being with both organic and biomechatronic body parts.', funFact: 'Bionic prosthetic limbs can now read nerve impulses from the brain to move robotic fingers!' },

    // --- MYTHIC, COSMIC & EXPANDED DISCOVERIES ---
    { id: 'phoenix', name: 'Phoenix', emoji: '🦅', category: 'cosmic', recipe: ['bird', 'fire'], description: 'Immortal mythical bird that cyclically regenerates from ashes.', funFact: 'In Greek folklore, the Phoenix represents renewal and immortality.' },
    { id: 'dragon', name: 'Dragon', emoji: '🐉', category: 'cosmic', recipe: ['dinosaur', 'fire'], description: 'Legendary fire-breathing serpentine creature.', funFact: 'Stories of dragons probably arose when ancient people discovered giant dinosaur fossils!' },
    { id: 'golem', name: 'Golem', emoji: '🗿', category: 'cosmic', recipe: ['clay', 'life'], description: 'Mythical animated anthropomorphic being created from clay.', funFact: 'Golems in folklore are brought to life by writing truth on their forehead.' },
    { id: 'aurora', name: 'Aurora Borealis', emoji: '🌌', category: 'cosmic', recipe: ['sky', 'electricity'], description: 'Natural light display in Earth\'s sky caused by solar wind particles.', funFact: 'Auroras also occur on Jupiter and Saturn where magnetic fields are intensely powerful.' },
    { id: 'rainbow', name: 'Rainbow', emoji: '🌈', category: 'cosmic', recipe: ['rain', 'sun'], description: 'Meteorological optical illusion of multi-colored light arcs.', funFact: 'Every rainbow is actually a full 360-degree circle when viewed from an airplane!' },
    { id: 'tsunami', name: 'Tsunami', emoji: '🌊', category: 'cosmic', recipe: ['ocean', 'explosion'], description: 'Massive ocean wave triggered by undersea earthquakes or eruptions.', funFact: 'Tsunamis can cross the entire Pacific Ocean in less than a single day.' },
    { id: 'tornado', name: 'Tornado', emoji: '🌪️', category: 'cosmic', recipe: ['wind', 'storm'], description: 'Violently rotating column of air in contact with ground and cloud.', funFact: 'Winds inside the most violent tornadoes can exceed 480 km/h (300 mph)!' },
    { id: 'storm', name: 'Thunderstorm', emoji: '⛈️', category: 'cosmic', recipe: ['cloud', 'lightning'], description: 'Turbulent weather state with thunder and lightning.', funFact: 'At any given moment, there are roughly 2,000 active thunderstorms occurring worldwide.' },
    { id: 'blizzard', name: 'Blizzard', emoji: '🌨️', category: 'cosmic', recipe: ['cold', 'storm'], description: 'Severe snowstorm with high winds and low visibility.', funFact: 'A true blizzard must sustain winds over 35 mph with near-zero visibility for 3+ hours.' },
    { id: 'meteorite', name: 'Meteorite', emoji: '☄️', category: 'cosmic', recipe: ['meteor', 'earth'], description: 'Solid piece of debris from a meteor that lands on Earth.', funFact: 'Some meteorites contain stardust that is older than the solar system itself!' },
    { id: 'quasar', name: 'Quasar', emoji: '✨', category: 'cosmic', recipe: ['black_hole', 'star'], description: 'Extremely luminous active galactic nucleus powered by a supermassive black hole.', funFact: 'A single quasar can shine brighter than 1,000 Milky Way galaxies combined!' },
    { id: 'portal', name: 'Cosmic Portal', emoji: '🌀', category: 'cosmic', recipe: ['black_hole', 'energy'], description: 'Theoretical wormhole bridging distant points across spacetime.', funFact: 'Einstein and Rosen formulated the physics of wormholes (Einstein-Rosen bridges) in 1935.' }
  ]
};

// Generate fast recipe lookup map: { "ing1+ing2": "resultId", "ing2+ing1": "resultId" }
ELEMENT_FUSION_DATA.recipesMap = {};
ELEMENT_FUSION_DATA.elements.forEach(elem => {
  if (elem.recipe && elem.recipe.length === 2) {
    const [a, b] = elem.recipe;
    ELEMENT_FUSION_DATA.recipesMap[`${a}+${b}`] = elem.id;
    ELEMENT_FUSION_DATA.recipesMap[`${b}+${a}`] = elem.id;
  }
});

// Map element lookup by ID for O(1) retrieval
ELEMENT_FUSION_DATA.elementLookup = {};
ELEMENT_FUSION_DATA.elements.forEach(e => {
  ELEMENT_FUSION_DATA.elementLookup[e.id] = e;
});

// Export for Node.js unit tests & Browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ELEMENT_FUSION_DATA };
}
if (typeof window !== 'undefined') {
  window.ELEMENT_FUSION_DATA = ELEMENT_FUSION_DATA;
}
