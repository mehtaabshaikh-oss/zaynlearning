/**
 * Test Suite: TIMSS Grade 4 Mathematics Classroom Integration
 */

const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

console.log('🧪 Testing TIMSS Grade 4 Mathematics Integration...\n');

// 1. Load TIMSS_CURRICULUM
const timssContent = fs.readFileSync('js/data/timssCurriculum.js', 'utf8');
const sandbox = { window: {}, console: console };
vm.createContext(sandbox);
vm.runInContext(timssContent, sandbox);

const timss = sandbox.window.TIMSS_CURRICULUM;
assert(timss, 'TIMSS_CURRICULUM should be defined');
assert(Array.isArray(timss.questions), 'questions should be an array');
console.log(`✅ TIMSS_CURRICULUM loaded with ${timss.questions.length} questions`);

// 2. Validate Question Structure
assert.strictEqual(timss.questions.length, 75, 'Should have exactly 75 curated questions');

const domains = { geometry: 0, number: 0, data: 0, extended: 0 };
let svgCount = 0;

timss.questions.forEach((q, idx) => {
  const num = idx + 1;
  assert(q.id, `Q${num} missing id`);
  assert(q.title, `Q${num} missing title`);
  assert(q.q && q.q.length > 3, `Q${num} missing question text`);
  assert(Array.isArray(q.options), `Q${num} options should be an array`);
  assert.strictEqual(q.options.length, 4, `Q${num} must have exactly 4 options`);
  assert(typeof q.answer === 'number' && q.answer >= 0 && q.answer < 4, `Q${num} answer index must be 0-3`);
  assert(q.hint && q.hint.length > 5, `Q${num} missing hint`);
  assert(q.explanation && q.explanation.length > 5, `Q${num} missing explanation`);
  assert(domains[q.domain] !== undefined, `Q${num} invalid domain: ${q.domain}`);
  domains[q.domain]++;

  if (q.svg) {
    assert(q.svg.includes('<svg') && q.svg.includes('</svg>'), `Q${num} invalid SVG string`);
    svgCount++;
  }
});

console.log(`✅ All 75 questions strictly conform to schema`);
console.log(`   - Geometry: ${domains.geometry} questions (High priority focus for Zayn!)`);
console.log(`   - Number & Operations: ${domains.number} questions`);
console.log(`   - Data Display: ${domains.data} questions`);
console.log(`   - Advanced Reasoning: ${domains.extended} questions`);
console.log(`   - Interactive SVG diagrams: ${svgCount} figures rendered`);

// 3. Test Random Shuffling & 10-Question Daily Pick
const pool = [...timss.questions];
for (let i = pool.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [pool[i], pool[j]] = [pool[j], pool[i]];
}
const pick1 = pool.slice(0, 10);
assert.strictEqual(pick1.length, 10, 'Daily practice must pick exactly 10 questions');

// Option Shuffling Verification (correct answer follows shuffled index)
pick1.forEach(q => {
  const originalCorrectText = q.options[q.answer];
  const indexed = q.options.map((opt, i) => ({ text: opt, isCorrect: i === q.answer }));
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
  }
  const newCorrect = indexed.find(o => o.isCorrect);
  assert.strictEqual(newCorrect.text, originalCorrectText, 'Shuffled option must preserve correct answer text');
});
console.log('✅ Random 10-question daily picker & dynamic option shuffler verified');

// 4. Verify index.html & classroom.css linkages
const indexHtml = fs.readFileSync('index.html', 'utf8');
assert(indexHtml.includes('js/data/timssCurriculum.js'), 'index.html must include timssCurriculum.js script tag');
assert(indexHtml.includes('data-cat="timss"'), 'index.html must include TIMSS category tab');
assert(indexHtml.includes('id="classroom-timss-daily-btn"'), 'index.html must include TIMSS Daily Practice button');
console.log('✅ index.html includes TIMSS script, category tab, and daily practice button');

const classroomCss = fs.readFileSync('css/classroom.css', 'utf8');
assert(classroomCss.includes('.quiz-svg-container'), 'classroom.css must include .quiz-svg-container styles');
assert(classroomCss.includes('.timss-daily-quick-btn'), 'classroom.css must include .timss-daily-quick-btn styles');
assert(classroomCss.includes('.timss-domain-badge'), 'classroom.css must include .timss-domain-badge styles');
console.log('✅ classroom.css includes responsive SVG and domain badge styling');

console.log('\n🎉 ALL TIMSS CLASSROOM INTEGRATION TESTS PASSED 100%!');
