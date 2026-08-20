/**
 * Unit Test Suite for Global Geo-Explorer (Worldle & Flagle Engine)
 */

const { GEO_EXPLORER_DATA } = require('./js/data/geoExplorerData.js');
const { GeoExplorerEngine } = require('./js/components/geoExplorerEngine.js');

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
}

console.log('🗺️ ====================================================');
console.log('🗺️ TESTING GEO-EXPLORER CARTOGRAPHY DATA & ENGINE');
console.log('🗺️ ====================================================\n');

// 1. Data Integrity Tests
console.log('--- 1. Countries Dataset Integrity ---');
assert(GEO_EXPLORER_DATA.countries.length >= 30, `Contains comprehensive countries dataset (${GEO_EXPLORER_DATA.countries.length} total)`);

const usa = GEO_EXPLORER_DATA.countryLookup['USA'];
assert(usa && usa.capital === 'Washington, D.C.', 'USA country record correctly loaded');

const jpn = GEO_EXPLORER_DATA.countryLookup['JPN'];
assert(jpn && jpn.flag === '🇯🇵', 'Japan country record correctly loaded');

// 2. Haversine Distance & Bearing Calculations
console.log('\n--- 2. Haversine Distance & Bearing Math ---');
// London (55.3781, -3.4360) to Paris (46.2276, 2.2137) is approx 1,080 km
const distUKtoFR = GEO_EXPLORER_DATA.calculateDistance(55.3781, -3.4360, 46.2276, 2.2137);
assert(distUKtoFR >= 900 && distUKtoFR <= 1200, `UK to France distance calculated at ${distUKtoFR} km`);

// Same country distance = 0 km
const distZero = GEO_EXPLORER_DATA.calculateDistance(usa.lat, usa.lon, usa.lat, usa.lon);
assert(distZero === 0, 'Distance to same country is exactly 0 km');

// Bearing test: North to South should return South
const bearingSouth = GEO_EXPLORER_DATA.calculateBearing(50, 0, 10, 0);
assert(bearingSouth.emoji.includes('S'), `Bearing from (50,0) to (10,0) evaluates to South (got ${bearingSouth.emoji})`);

// Proximity Percentage
assert(GEO_EXPLORER_DATA.calculateProximity(0) === 100, '0 km gives 100% proximity');
assert(GEO_EXPLORER_DATA.calculateProximity(20000) === 0, '20,000 km gives 0% proximity');

// 3. Engine Simulation Tests
console.log('\n--- 3. Geo-Explorer Engine Simulation ---');
const engine = new GeoExplorerEngine(GEO_EXPLORER_DATA);
engine.targetCountry = usa; // Fixed target for predictable testing
engine.guesses = [];
engine.isGameOver = false;

// Incorrect Guess: Canada
engine.makeGuess(GEO_EXPLORER_DATA.countryLookup['CAN']);
assert(engine.guesses.length === 1, 'First guess recorded');
assert(engine.guesses[0].isCorrect === false, 'Canada is not USA (incorrect guess)');
assert(engine.guesses[0].distance > 0, `Distance recorded (${engine.guesses[0].distance} km)`);
assert(engine.isGameOver === false, 'Game continues after 1 incorrect guess');

// Correct Guess: USA
engine.makeGuess(usa);
assert(engine.guesses.length === 2, 'Second guess recorded');
assert(engine.guesses[1].isCorrect === true, 'USA matches target country');
assert(engine.isGameOver === true && engine.isWon === true, 'Game marked as won on exact match');

console.log(`\n======================================================`);
console.log(`🎉 ALL ${passedTests}/${totalTests} GEO-EXPLORER TESTS PASSED!`);
console.log(`======================================================\n`);
