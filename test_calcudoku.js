/**
 * Unit Test Suite for Calcudoku / KenKen Engine
 */

const { CALCUDOKU_DATA } = require('./js/data/calcudokuData.js');
const { CalcudokuEngine } = require('./js/components/calcudokuEngine.js');

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

console.log('🔢 ====================================================');
console.log('🔢 TESTING CALCUDOKU / KENKEN ENGINE & PUZZLES');
console.log('🔢 ====================================================\n');

// 1. Cage Operations Validator
console.log('--- 1. Cage Operations Math & Rules ---');
assert(CALCUDOKU_DATA.validateCage('+', 7, [3, 4]).satisfied === true, 'Addition cage (3+4=7)');
assert(CALCUDOKU_DATA.validateCage('×', 24, [2, 3, 4]).satisfied === true, 'Multiplication cage (2*3*4=24)');
assert(CALCUDOKU_DATA.validateCage('-', 2, [5, 3]).satisfied === true, 'Subtraction cage |5-3|=2');
assert(CALCUDOKU_DATA.validateCage('-', 2, [3, 5]).satisfied === true, 'Subtraction cage |3-5|=2 (order independent)');
assert(CALCUDOKU_DATA.validateCage('÷', 2, [4, 2]).satisfied === true, 'Division cage 4/2=2');
assert(CALCUDOKU_DATA.validateCage('÷', 2, [2, 4]).satisfied === true, 'Division cage 4/2=2 (order independent)');
assert(CALCUDOKU_DATA.validateCage('=', 4, [4]).satisfied === true, 'Single cell target = 4');

// 2. Puzzle Latin Square & Cage Verification
console.log('\n--- 2. Puzzle Solvability & Latin Square Constraints ---');
assert(CALCUDOKU_DATA.puzzles.length >= 7, `Puzzles dataset contains ${CALCUDOKU_DATA.puzzles.length} puzzles`);

const engine = new CalcudokuEngine(CALCUDOKU_DATA);

CALCUDOKU_DATA.puzzles.forEach((pz) => {
  assert(pz.solution.length === pz.size, `Puzzle ${pz.id} solution has ${pz.size} rows`);

  // Verify Latin Square (no duplicate numbers in any row or column)
  for (let r = 0; r < pz.size; r++) {
    const rowSet = new Set(pz.solution[r]);
    assert(rowSet.size === pz.size, `Puzzle ${pz.id} row ${r + 1} has no duplicates (Latin Square)`);
  }
  for (let c = 0; c < pz.size; c++) {
    const colSet = new Set();
    for (let r = 0; r < pz.size; r++) colSet.add(pz.solution[r][c]);
    assert(colSet.size === pz.size, `Puzzle ${pz.id} column ${c + 1} has no duplicates (Latin Square)`);
  }

  // Verify all cages match solution numbers
  pz.cages.forEach(cage => {
    const values = cage.cells.map(([cr, cc]) => pz.solution[cr][cc]);
    const validation = CALCUDOKU_DATA.validateCage(cage.op, cage.target, values);
    assert(validation.satisfied === true, `Puzzle ${pz.id} cage "${cage.target}${cage.op}" satisfied by solution [${values.join(',')}]`);
  });
});

console.log(`\n======================================================`);
console.log(`🎉 ALL ${passedTests}/${totalTests} CALCUDOKU TESTS PASSED!`);
console.log(`======================================================\n`);
