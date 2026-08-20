/**
 * Unit Test Suite for Cyber Logic Gate Runner Engine
 */

const { LOGIC_GATE_DATA } = require('./js/data/logicGateData.js');
const { LogicGateEngine } = require('./js/components/logicGateEngine.js');

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

console.log('⚡ ====================================================');
console.log('⚡ TESTING CYBER LOGIC GATE RUNNER ENGINE & LEVELS');
console.log('⚡ ====================================================\n');

// 1. Primitive Gate Evaluations
console.log('--- 1. Primitive Boolean Gate Evaluators ---');
assert(LOGIC_GATE_DATA.evaluateGate('AND', [1, 1]) === 1, 'AND(1, 1) = 1');
assert(LOGIC_GATE_DATA.evaluateGate('AND', [1, 0]) === 0, 'AND(1, 0) = 0');
assert(LOGIC_GATE_DATA.evaluateGate('OR', [0, 1]) === 1, 'OR(0, 1) = 1');
assert(LOGIC_GATE_DATA.evaluateGate('OR', [0, 0]) === 0, 'OR(0, 0) = 0');
assert(LOGIC_GATE_DATA.evaluateGate('NOT', [1]) === 0, 'NOT(1) = 0');
assert(LOGIC_GATE_DATA.evaluateGate('NOT', [0]) === 1, 'NOT(0) = 1');
assert(LOGIC_GATE_DATA.evaluateGate('XOR', [1, 0]) === 1, 'XOR(1, 0) = 1');
assert(LOGIC_GATE_DATA.evaluateGate('XOR', [1, 1]) === 0, 'XOR(1, 1) = 0');
assert(LOGIC_GATE_DATA.evaluateGate('NAND', [1, 1]) === 0, 'NAND(1, 1) = 0');
assert(LOGIC_GATE_DATA.evaluateGate('NAND', [1, 0]) === 1, 'NAND(1, 0) = 1');
assert(LOGIC_GATE_DATA.evaluateGate('NOR', [0, 0]) === 1, 'NOR(0, 0) = 1');
assert(LOGIC_GATE_DATA.evaluateGate('XNOR', [1, 1]) === 1, 'XNOR(1, 1) = 1');
assert(LOGIC_GATE_DATA.evaluateGate('XNOR', [1, 0]) === 0, 'XNOR(1, 0) = 0');

// 2. Levels Solvability & Integrity
console.log('\n--- 2. All 20 Circuit Levels Solvability Verification ---');
assert(LOGIC_GATE_DATA.levels.length === 20, 'Engine has exactly 20 progressive circuit levels');

const engine = new LogicGateEngine(LOGIC_GATE_DATA);

LOGIC_GATE_DATA.levels.forEach((lvl, idx) => {
  engine.loadLevel(idx);
  assert(lvl.inputs.length >= 1, `Level ${lvl.id} has ${lvl.inputs.length} inputs`);
  assert(lvl.gates.length >= 1, `Level ${lvl.id} has ${lvl.gates.length} gates`);
  assert(lvl.targets.length >= 1, `Level ${lvl.id} has ${lvl.targets.length} target terminals`);

  // Test solver: Find at least one valid input combination that satisfies the level
  const nonFixedInputs = lvl.inputs.filter(i => !i.fixed);
  const totalCombos = 1 << nonFixedInputs.length;
  let solved = false;

  for (let c = 0; c < totalCombos; c++) {
    // Set combination
    nonFixedInputs.forEach((inp, bitIdx) => {
      engine.inputStates[inp.id] = (c >> bitIdx) & 1;
    });
    engine.propagateSignals();

    // Check if targets satisfied
    let win = true;
    lvl.targets.forEach(tgt => {
      if (engine.wireSignals[tgt.id] !== tgt.targetVal) win = false;
    });

    if (win) {
      solved = true;
      break;
    }
  }

  assert(solved === true, `Level ${lvl.id} ("${lvl.title}") has at least one valid satisfying truth assignment`);
});

console.log(`\n======================================================`);
console.log(`🎉 ALL ${passedTests}/${totalTests} LOGIC GATE TESTS PASSED!`);
console.log(`======================================================\n`);
