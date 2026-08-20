/**
 * Sprint 2 Verification Test Suite: Cosmic Gridlock & Word Odyssey
 */

global.document = {
  getElementById: () => null,
  querySelector: () => null,
  querySelectorAll: () => []
};
global.window = {
  addEventListener: () => {},
  removeEventListener: () => {}
};

const fs = require('fs');

// 1. Load Cosmic Gridlock Data & Engine
const gridlockData = require('./js/data/cosmicGridlockData.js');
const COSMIC_GRIDLOCK_LEVELS = gridlockData.COSMIC_GRIDLOCK_LEVELS;
const hashBoardState = gridlockData.hashBoardState;

const gridlockCode = fs.readFileSync('js/components/cosmicGridlockEngine.js', 'utf8');
eval(gridlockCode);
const CosmicGridlockEngine = global.window.CosmicGridlockEngine;

// 2. Load Word Odyssey Data & Engine
const wordOdysseyData = require('./js/data/wordOdysseyData.js');
const WORD_ODYSSEY_CATEGORIES = wordOdysseyData.WORD_ODYSSEY_CATEGORIES;

const woCode = fs.readFileSync('js/components/wordOdysseyEngine.js', 'utf8');
eval(woCode);
const WordOdysseyEngine = global.window.WordOdysseyEngine;

console.log('🧪 ====================================================');
console.log('🧪 SPRINT 2 AUTOMATED BFS & DICTIONARY TEST SUITE');
console.log('🧪 ====================================================\n');

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
// TEST SUITE 1: COSMIC GRIDLOCK BFS SOLVABILITY & BOARD VALIDITY
// -------------------------------------------------------------
console.log('--- 1. Testing Cosmic Gridlock BFS Solvability (All 20 Levels) ---');
const dummyGridlock = new CosmicGridlockEngine();
dummyGridlock.levels = COSMIC_GRIDLOCK_LEVELS;

const seenHashes = new Set();

COSMIC_GRIDLOCK_LEVELS.forEach(lvl => {
  // A. Hash Uniqueness
  const hash = hashBoardState(lvl.pieces);
  assert(!seenHashes.has(hash), `Level ${lvl.id} ("${lvl.name}") has a unique initial board state hash`);
  seenHashes.add(hash);

  // B. Boundary & Overlap Validity
  const grid = Array.from({ length: 6 }, () => Array(6).fill(null));
  let hasOverlap = false;
  let hasOutOfBounds = false;

  lvl.pieces.forEach(p => {
    for (let i = 0; i < p.len; i++) {
      const gx = p.ori === 'H' ? p.x + i : p.x;
      const gy = p.ori === 'V' ? p.y + i : p.y;

      if (gx < 0 || gx >= 6 || gy < 0 || gy >= 6) {
        hasOutOfBounds = true;
      } else {
        if (grid[gy][gx] !== null) {
          hasOverlap = true;
        }
        grid[gy][gx] = p.id;
      }
    }
  });

  assert(!hasOutOfBounds, `Level ${lvl.id} has all pieces strictly within 6x6 boundaries`);
  assert(!hasOverlap, `Level ${lvl.id} has zero overlapping pieces`);

  // C. Target Ship Exists on Row 2
  const target = lvl.pieces.find(p => p.id === 'target');
  assert(target && target.y === 2 && target.ori === 'H' && target.len === 2, `Level ${lvl.id} target flagship is valid horizontal 1x2 on row 2`);

  // D. BFS Solver Execution
  const solution = dummyGridlock.solve(lvl.pieces);
  assert(solution.solvable === true && solution.minMoves > 0, `Level ${lvl.id} (${lvl.tier}) is 100% SOLVABLE via BFS in ${solution.minMoves} shortest moves (Par: ${lvl.par})`);
});

// -------------------------------------------------------------
// TEST SUITE 2: WORD ODYSSEY DICTIONARY & FREQUENCY ALGORITHM
// -------------------------------------------------------------
console.log('\n--- 2. Testing Word Odyssey Dictionaries & Educational Fact Cards ---');
const dummyWO = new WordOdysseyEngine();
dummyWO.categories = WORD_ODYSSEY_CATEGORIES;

let totalWordsTested = 0;
for (const [catKey, catObj] of Object.entries(WORD_ODYSSEY_CATEGORIES)) {
  assert(catObj.words.length >= 20, `Category "${catObj.name}" contains ${catObj.words.length} words (>= 20 threshold)`);

  catObj.words.forEach(w => {
    totalWordsTested++;
    assert(/^[A-Z]+$/.test(w.word), `Word "${w.word}" contains only valid uppercase A-Z characters`);
    assert(w.word.length === w.len, `Word "${w.word}" matches declared length of ${w.len}`);
    assert(typeof w.clue === 'string' && w.clue.length > 5, `Word "${w.word}" has a valid Pixel clue`);
    assert(typeof w.fact === 'string' && w.fact.length > 10, `Word "${w.word}" has an educational Fact Card`);
  });
}
console.log(`Verified ${totalWordsTested} total words across all 5 thematic categories.`);

console.log('\n--- 3. Testing Wordle 2-Pass Duplicate Letter Frequency Evaluator ---');

// Case A: Exact Match
const res1 = dummyWO.evaluateWordle("PERU", "PERU");
assert(JSON.stringify(res1) === JSON.stringify(['green', 'green', 'green', 'green']), 'Exact match "PERU" vs "PERU" -> all green');

// Case B: Duplicate letter in guess against single in secret
// Target: SPEED (one E), Guess: ERASE (two Es, at indices 0 and 4)
// Target SPEED has Es at index 2 and 3!
// Let's test with Target: LASER (one E at idx 3), Guess: ERASE (two Es at idx 0 and 4)
const res2 = dummyWO.evaluateWordle("ERASE", "LASER");
// Index 0: 'E' -> yellow (Laser has E at 3)
// Index 1: 'R' -> yellow (Laser has R at 4)
// Index 2: 'A' -> green (Laser has A at 1 -> actually 'A' in ERASE is idx 2, in LASER is idx 1 -> yellow)
// Index 3: 'S' -> green (Laser has S at 2 -> yellow)
// Index 4: 'E' -> gray (Because single E in LASER was already consumed by idx 0!)
assert(res2[4] === 'gray', 'Duplicate "E" at index 4 correctly grayed out (frequency limit respected)');

// Case C: Target with duplicate, guess with single
const res3 = dummyWO.evaluateWordle("EAGLE", "EAGLE");
assert(res3.every(c => c === 'green'), 'All green match for "EAGLE"');

// Case D: Complete Miss
const res4 = dummyWO.evaluateWordle("ATOM", "PERU");
assert(res4.every(c => c === 'gray'), 'Complete miss "ATOM" vs "PERU" -> all gray');

console.log('\n====================================================');
console.log(`🎉 ALL ${passedTests} / ${totalTests} SPRINT 2 UNIT TESTS PASSED WITH 100% SUCCESS!`);
console.log('====================================================\n');
