/**
 * Unit Test Suite for Element Fusion Lab (Science Craft Engine)
 */

const { ELEMENT_FUSION_DATA } = require('./js/data/elementFusionData.js');
const { ElementFusionEngine } = require('./js/components/elementFusionEngine.js');

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

console.log('🧪 ====================================================');
console.log('🧪 TESTING ELEMENT FUSION LAB DATA & CRAFT ENGINE');
console.log('🧪 ====================================================\n');

// 1. Data Integrity Tests
console.log('--- 1. Data Integrity & Base Elements ---');
assert(ELEMENT_FUSION_DATA.baseElements.length === 4, 'Has 4 primordial base elements');
assert(ELEMENT_FUSION_DATA.elements.length >= 75, `Contains comprehensive elements (${ELEMENT_FUSION_DATA.elements.length} total)`);

const water = ELEMENT_FUSION_DATA.elementLookup['water'];
assert(water && water.emoji === '💧', 'Water element correctly defined');

// 2. Recipe Symmetrical Lookup Map
console.log('\n--- 2. Recipe Bidirectional Symmetry ---');
assert(ELEMENT_FUSION_DATA.recipesMap['water+fire'] === 'steam', 'Water + Fire produces Steam');
assert(ELEMENT_FUSION_DATA.recipesMap['fire+water'] === 'steam', 'Fire + Water produces Steam (Symmetry)');
assert(ELEMENT_FUSION_DATA.recipesMap['earth+fire'] === 'lava', 'Earth + Fire produces Lava');
assert(ELEMENT_FUSION_DATA.recipesMap['lava+air'] === 'stone', 'Lava + Air produces Stone');
assert(ELEMENT_FUSION_DATA.recipesMap['sand+fire'] === 'glass', 'Sand + Fire produces Glass');

// 3. Engine Simulation Tests
console.log('\n--- 3. Engine Mechanics & Fusion Pipeline ---');
const engine = new ElementFusionEngine();
engine.unlockedIds = new Set(['water', 'fire', 'earth', 'air']);
engine.workbench = [];

// Add Water and Fire
engine.addToWorkbench('water', 100, 100);
engine.addToWorkbench('fire', 110, 105); // Close enough to collide (<55px)

assert(engine.workbench.length === 1, 'Water and Fire merged into 1 item on workbench');
assert(engine.workbench[0].id === 'steam', 'Resulting item is Steam');
assert(engine.unlockedIds.has('steam'), 'Steam is added to unlocked elements Set');

// Test Invalid Combo
engine.addToWorkbench('water', 100, 100);
engine.addToWorkbench('water', 300, 300); // Ocean is water+water, but far away
assert(engine.workbench.length === 3, 'Items far apart do not merge automatically');

console.log(`\n======================================================`);
console.log(`🎉 ALL ${passedTests}/${totalTests} ELEMENT FUSION TESTS PASSED!`);
console.log(`======================================================\n`);
