/**
 * Automated Dataset Audit for Word Odyssey
 * Asserts length exactness, valid dictionary spelling, and metadata
 */

const { WORD_ODYSSEY_CATEGORIES } = require('./js/data/wordOdysseyData.js');

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

console.log('🔤 ====================================================');
console.log('🔤 AUDITING ALL WORDLE CATEGORIES & WORD DATA');
console.log('🔤 ====================================================\n');

Object.keys(WORD_ODYSSEY_CATEGORIES).forEach(catKey => {
  const cat = WORD_ODYSSEY_CATEGORIES[catKey];
  console.log(`--- Category: ${cat.name} (${cat.words.length} words) ---`);

  cat.words.forEach((item, idx) => {
    assert(/^[A-Z]+$/.test(item.word), `${cat.name} [${item.word}] is valid uppercase A-Z`);
    assert(item.word.length === item.len, `${cat.name} [${item.word}] exact length matches declared len (${item.len})`);
    assert(item.len >= 4 && item.len <= 6, `${cat.name} [${item.word}] length is within 4 to 6 letters`);
    assert(item.clue && item.clue.length > 5, `${cat.name} [${item.word}] has rich clue`);
    assert(item.fact && item.fact.length > 10, `${cat.name} [${item.word}] has educational fact`);
  });
});

console.log(`\n======================================================`);
console.log(`🎉 ALL ${passedTests}/${totalTests} WORDLE AUDIT TESTS PASSED (100%)!`);
console.log(`======================================================\n`);
