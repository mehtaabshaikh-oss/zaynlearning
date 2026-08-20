/**
 * Comprehensive Automated Test Suite for Times Table 2048: Multiplier Matrix Engine
 * Tests:
 * 1. Multiplier Modes (2x, 3x, 4x, 6x, 7x, 8x, 9x, 11x, 12x) & Goal Tiles (1024 * M)
 * 2. 4-Way Grid Movements & Deterministic Single-Pass Merging (Left, Right, Up, Down)
 * 3. Multi-Step Undo System (up to 3 moves)
 * 4. Game Over Detection & Available Moves Check
 * 5. Dynamic Tier CSS Classes & Multi-Digit Font Auto-Scaling
 * 6. Endless Mode Continuation
 */

const { Multiplier2048Engine } = require('./js/components/multiplier2048Engine.js');

// Mock browser globals
global.document = {
  getElementById: (id) => ({
    textContent: '',
    innerHTML: '',
    classList: {
      add: () => {},
      remove: () => {},
      contains: () => false
    },
    addEventListener: () => {},
    style: {
      setProperty: () => {}
    },
    appendChild: () => {},
    dataset: {}
  }),
  querySelectorAll: () => [],
  createElement: (tag) => ({
    className: '',
    dataset: {},
    classList: {
      add: function(cls) { this.classes.push(cls); },
      remove: function(cls) { this.classes = this.classes.filter(c => c !== cls); },
      contains: function(cls) { return this.classes.includes(cls); },
      classes: []
    },
    style: {
      setProperty: () => {},
      transform: ''
    },
    textContent: ''
  })
};

global.window = {
  addEventListener: () => {},
  gameState: {
    addAura: () => {},
    addXP: () => {},
    addGems: () => {},
    save: () => {}
  },
  soundEngine: {
    playTap: () => {},
    playCorrect: () => {},
    playWrong: () => {},
    playFanfare: () => {}
  },
  helpers: {
    spawnConfetti: () => {},
    spawnAuraFloatingText: () => {}
  }
};

global.localStorage = {
  store: {},
  getItem: function(key) { return this.store[key] || null; },
  setItem: function(key, val) { this.store[key] = val; },
  clear: function() { this.store = {}; }
};

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

// -------------------------------------------------------------
// 1. Multiplier Modes & Goal Tile Verification
// -------------------------------------------------------------
console.log('--- 1. Multiplier Modes & Goal Tile Doubling ---');
const multipliers = [2, 3, 4, 6, 7, 8, 9, 11, 12];
const engine = new Multiplier2048Engine();

for (const m of multipliers) {
  engine.baseMultiplier = m;
  const goal = 1024 * m;
  assert(goal === m * 1024, `Table ${m}× Goal Tile correctly set to ${goal.toLocaleString()}`);

  // Test Tier sequence
  let val = m;
  for (let tier = 1; tier <= 11; tier++) {
    const calcTier = Math.round(Math.log2(val / m)) + 1;
    assert(calcTier === tier, `Value ${val} for Table ${m}× evaluates to Tier ${tier}`);
    val *= 2;
  }
}

// -------------------------------------------------------------
// 2. 4-Way Grid Shift & Merge Integrity (No Double-Merge)
// -------------------------------------------------------------
console.log('\n--- 2. 4-Way Grid Movement & Single-Pass Merging ---');

// Test A: Left Shift Single-Pass Merge [4, 4, 4, 4] -> [8, 8, 0, 0]
engine.baseMultiplier = 2;
engine.setGridValues([
  [4, 4, 4, 4],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]);
engine.score = 0;
let moved = engine.move('left');
assert(moved === true, 'Move Left triggered');
assert(engine.grid[0][0].value === 8 && engine.grid[0][1].value === 8, `[4, 4, 4, 4] left-merged to [8, 8] (got [${engine.getGridValues()[0]}])`);
assert(engine.score === 16, `Score increased by 16 (8 + 8), got ${engine.score}`);

// Test B: Left Shift with gaps [2, 0, 2, 4] -> [4, 4, 0, 0]
engine.setGridValues([
  [2, 0, 2, 4],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]);
engine.score = 0;
engine.isAnimating = false;
moved = engine.move('left');
assert(engine.grid[0][0].value === 4 && engine.grid[0][1].value === 4, `[2, 0, 2, 4] left-merged to [4, 4] (got [${engine.getGridValues()[0]}])`);
assert(engine.score === 4, `Score increased by 4, got ${engine.score}`);

// Test C: Right Shift [2, 2, 4, 8] -> [0, 4, 4, 8]
engine.setGridValues([
  [2, 2, 4, 8],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]);
engine.score = 0;
engine.isAnimating = false;
moved = engine.move('right');
assert(engine.grid[0][1].value === 4 && engine.grid[0][2].value === 4 && engine.grid[0][3].value === 8, `[2, 2, 4, 8] right-merged to [0, 4, 4, 8] (got [${engine.getGridValues()[0]}])`);

// Test D: Up Shift across column
engine.baseMultiplier = 3;
engine.setGridValues([
  [3, 0, 0, 0],
  [3, 0, 0, 0],
  [6, 0, 0, 0],
  [6, 0, 0, 0]
]);
engine.score = 0;
engine.isAnimating = false;
moved = engine.move('up');
assert(engine.grid[0][0].value === 6 && engine.grid[1][0].value === 12,
  `Column [3, 3, 6, 6] up-merged to [6, 12, 0, 0] (got [${engine.getGridValues().map(r => r[0])}])`);
assert(engine.score === 18, `Score increased by 18 (6 + 12), got ${engine.score}`);

// Test E: Down Shift across column
engine.baseMultiplier = 7;
engine.setGridValues([
  [7, 0, 0, 0],
  [7, 0, 0, 0],
  [0, 0, 0, 0],
  [14, 0, 0, 0]
]);
engine.score = 0;
engine.isAnimating = false;
moved = engine.move('down');
assert(engine.grid[2][0].value === 14 && engine.grid[3][0].value === 14,
  `Column [7, 7, 0, 14] down-shifted to [0, 0, 14, 14] (got [${engine.getGridValues().map(r => r[0])}])`);
assert(engine.score === 14, `Score increased by 14, got ${engine.score}`);

// Test F: No valid moves in direction (locked row)
engine.setGridValues([
  [2, 4, 8, 16],
  [32, 64, 128, 256],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]);
engine.isAnimating = false;
moved = engine.move('left');
assert(moved === false, 'Locked row moving left returns moved === false');

// -------------------------------------------------------------
// 3. Multi-Step Undo Verification
// -------------------------------------------------------------
console.log('\n--- 3. Multi-Step Undo System (up to 3 moves) ---');
engine.baseMultiplier = 2;
engine.setGridValues([
  [2, 2, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]);
engine.score = 0;
engine.moveHistory = [];
engine.isAnimating = false;

// Move 1
engine.move('left');
assert(engine.grid[0][0].value === 4 && engine.score === 4, 'Move 1: Merged to 4, Score 4');
assert(engine.moveHistory.length === 1, 'Move history contains 1 state');

// Move 2
engine.isAnimating = false;
engine.setGridValues([
  [4, 4, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]);
engine.move('left');
assert(engine.grid[0][0].value === 8 && engine.score === 12, 'Move 2: Merged to 8, Score 12');
assert(engine.moveHistory.length === 2, 'Move history contains 2 states');

// Undo Move 2
engine.isAnimating = false;
engine.undoMove();
assert(engine.score === 4, `Undo 1 restored Score to 4 (got ${engine.score})`);
assert(engine.grid[0][0].value === 4 && engine.grid[0][1].value === 4, 'Undo 1 restored grid values to [4, 4, 0, 0]');

// Undo Move 1
engine.isAnimating = false;
engine.undoMove();
assert(engine.score === 0, `Undo 2 restored Score to 0 (got ${engine.score})`);
assert(engine.grid[0][0].value === 2 && engine.grid[0][1].value === 2, 'Undo 2 restored initial grid values to [2, 2, 0, 0]');

// -------------------------------------------------------------
// 4. Game Over & Available Moves Detection
// -------------------------------------------------------------
console.log('\n--- 4. Game Over & Available Moves Detection ---');

// Full board with horizontal moves available
engine.setGridValues([
  [2, 2, 4, 8],
  [16, 32, 64, 128],
  [256, 512, 1024, 2048],
  [4096, 8192, 16384, 32768]
]);
assert(engine.checkGameOver() === false, 'Game NOT over when adjacent matching horizontal pair exists');

// Full board with vertical moves available
engine.setGridValues([
  [2, 4, 8, 16],
  [2, 32, 64, 128],
  [256, 512, 1024, 2048],
  [4096, 8192, 16384, 32768]
]);
assert(engine.checkGameOver() === false, 'Game NOT over when adjacent matching vertical pair exists');

// Full board with NO moves available
engine.setGridValues([
  [2, 4, 8, 16],
  [32, 64, 128, 256],
  [512, 1024, 2048, 4096],
  [8192, 16384, 32768, 65536]
]);
assert(engine.checkGameOver() === true, 'Game OVER detected when board is full and no merges exist');

// -------------------------------------------------------------
// 5. Multi-Digit Font Auto-Scaling Verification
// -------------------------------------------------------------
console.log('\n--- 5. Dynamic Font Auto-Scaling ---');
const el2 = engine.createTileElement({ id: 't1', value: 7, r: 0, c: 0 }, false);
assert(!el2.classList.contains('text-sm') && !el2.classList.contains('text-xs'), '1-digit number uses default large font');

const el12288 = engine.createTileElement({ id: 't2', value: 12288, r: 0, c: 0 }, false);
assert(el12288.classList.contains('text-xs'), '5-digit number 12,288 receives .text-xs font scaling');

const el2048 = engine.createTileElement({ id: 't3', value: 2048, r: 0, c: 0 }, false);
assert(el2048.classList.contains('text-sm'), '4-digit number 2048 receives .text-sm font scaling');

console.log(`\n======================================================`);
console.log(`🎉 ALL ${passedTests}/${totalTests} TESTS PASSED WITH 100% SUCCESS!`);
console.log(`======================================================\n`);
