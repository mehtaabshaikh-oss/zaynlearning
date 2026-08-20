/**
 * Sprint 1 Games Verification & Solvability Unit Test Suite
 */

global.document = {
  getElementById: () => null,
  querySelectorAll: () => []
};
global.window = {};

const fs = require('fs');

// Load Supernova 24
const s24Code = fs.readFileSync('js/components/supernova24Engine.js', 'utf8');
eval(s24Code);
const Supernova24Engine = global.window.Supernova24Engine;

// Load Codebreaker
const cbCode = fs.readFileSync('js/components/codebreakerEngine.js', 'utf8');
eval(cbCode);
const CodebreakerEngine = global.window.CodebreakerEngine;

console.log('🧪 ==========================================');
console.log('🧪 SPRINT 1 LOCAL UNIT & SOLVABILITY TESTS');
console.log('🧪 ==========================================\n');

let passedTests = 0;
let totalTests = 0;

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

// -------------------------------------------------------------
// TEST 1: Supernova 24 Solver Verification
// -------------------------------------------------------------
console.log('--- 1. Testing Supernova 24 Solver & Solvability Engine ---');
const dummyS24 = new Supernova24Engine();

const knownSolvableDecks = [
  { deck: [6, 4, 1, 1], expected: true },
  { deck: [8, 3, 4, 2], expected: true },
  { deck: [3, 8, 3, 2], expected: true },
  { deck: [7, 5, 3, 1], expected: true },
  { deck: [9, 5, 3, 2], expected: true },
  { deck: [3, 3, 8, 8], expected: true },
  { deck: [5, 5, 5, 1], expected: true },
  { deck: [1, 1, 1, 1], expected: false }
];

for (const item of knownSolvableDecks) {
  const sol = dummyS24.solve24(item.deck);
  if (item.expected) {
    assert(sol !== null && sol.equation.length > 0, `Deck [${item.deck.join(', ')}] solved -> ${sol ? sol.equation : 'none'}`);
  } else {
    assert(sol === null, `Impossible deck [${item.deck.join(', ')}] correctly identified as unsolvable`);
  }
}

// Test Variable Target Solving across different dynamic goals
console.log('\n--- Testing Variable Target Goals (12, 18, 30, 36, 40, 48) ---');
const variableTargetTests = [
  { target: 12, deck: [3, 4, 1, 1], expected: true },
  { target: 18, deck: [9, 2, 1, 1], expected: true },
  { target: 30, deck: [6, 5, 2, 2], expected: true },
  { target: 36, deck: [6, 6, 1, 1], expected: true },
  { target: 40, deck: [8, 5, 2, 2], expected: true },
  { target: 48, deck: [8, 6, 2, 2], expected: true }
];

for (const t of variableTargetTests) {
  const sol = dummyS24.solve24(t.deck, t.target);
  assert(sol !== null && sol.equation.length > 0, `Variable Target ${t.target} with [${t.deck.join(', ')}] solved -> ${sol ? sol.equation : 'none'}`);
}

// Test Procedural Generation produces 100% solvable puzzles across 100 iterations (Variable Targets)
console.log('\n--- Testing 100 Procedural Variable Target Deals for 100% Solvability ---');
for (let i = 0; i < 100; i++) {
  const tier = (i % 3 === 0) ? 'easy' : (i % 3 === 1) ? 'medium' : 'hard';
  dummyS24.targetMode = (i % 3 === 0) ? 'variable' : (i % 3 === 1) ? 'big' : 'fixed24';
  const puzzle = dummyS24.generateSolvablePuzzle(tier);
  assert(puzzle && puzzle.numbers.length === 4 && puzzle.solution !== null, `Procedural deal #${i + 1} (${tier}, Target: ${dummyS24.targetGoal}) guaranteed solvable: [${puzzle.numbers.join(', ')}]`);
}

// -------------------------------------------------------------
// TEST 2: Cryptic Codebreaker 2-Pass Evaluator Tests
// -------------------------------------------------------------
console.log('\n--- 2. Testing Cryptic Codebreaker Mastermind Evaluator ---');
const dummyCB = new CodebreakerEngine();

// Case A: All Exact Match
let resA = dummyCB.evaluateGuess(['red', 'yellow', 'green', 'blue'], ['red', 'yellow', 'green', 'blue']);
assert(resA.exact === 4 && resA.partial === 0, 'All exact match -> 4 exact, 0 partial');

// Case B: All Partial Match (shuffled order)
let resB = dummyCB.evaluateGuess(['blue', 'red', 'yellow', 'green'], ['red', 'yellow', 'green', 'blue']);
assert(resB.exact === 0 && resB.partial === 4, 'All partial match -> 0 exact, 4 partial');

// Case C: Duplicate colors in guess vs single in secret
let resC = dummyCB.evaluateGuess(['red', 'red', 'red', 'red'], ['red', 'yellow', 'green', 'blue']);
assert(resC.exact === 1 && resC.partial === 0, 'Duplicate guess against single in secret -> 1 exact, 0 partial (no ghost duplicates)');

// Case D: Duplicate colors in secret vs single in guess
let resD = dummyCB.evaluateGuess(['red', 'yellow', 'purple', 'orange'], ['red', 'red', 'green', 'blue']);
assert(resD.exact === 1 && resD.partial === 0, 'Single guess against duplicate secret -> 1 exact, 0 partial');

// Case E: Mixed exact and partial with duplicates
let resE = dummyCB.evaluateGuess(['yellow', 'red', 'red', 'green'], ['red', 'yellow', 'red', 'blue']);
assert(resE.exact === 1 && resE.partial === 2, 'Complex duplicate case -> 1 exact, 2 partial');

// Case F: Tier 3 (5 Slots)
dummyCB.codeLength = 5;
let resF = dummyCB.evaluateGuess(['red', 'yellow', 'green', 'blue', 'purple'], ['red', 'yellow', 'green', 'purple', 'blue']);
assert(resF.exact === 3 && resF.partial === 2, '5-slot Tier 3 evaluation -> 3 exact, 2 partial');

console.log('\n==========================================');
console.log(`🎉 ALL ${passedTests} / ${totalTests} UNIT TESTS PASSED WITH 100% SUCCESS!`);
console.log('==========================================\n');
