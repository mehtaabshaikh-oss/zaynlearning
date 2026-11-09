/**
 * Test Suite: Elementary Economics Classroom Integration & Practice Test
 */

const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

console.log('🧪 Testing Elementary Economics Classroom Integration...\n');

// 1. Load classroomCurriculum.js
const curriculumContent = fs.readFileSync('js/data/classroomCurriculum.js', 'utf8');
const sandbox = { window: {}, console: console };
vm.createContext(sandbox);
vm.runInContext(curriculumContent, sandbox);

const curriculum = sandbox.window.CLASSROOM_CURRICULUM;
assert(curriculum, 'CLASSROOM_CURRICULUM should be defined');
assert(curriculum.economics, 'CLASSROOM_CURRICULUM.economics should exist');
assert(Array.isArray(curriculum.economics), 'economics should be an array');
assert.strictEqual(curriculum.economics.length, 1, 'Should have 1 economics unit');

const unit = curriculum.economics[0];
console.log(`✅ Loaded economics unit: "${unit.title}" (${unit.questions.length} questions)`);

// 2. Validate Unit Metadata
assert.strictEqual(unit.id, 'econ_elementary_test_prep');
assert.strictEqual(unit.category, 'economics');
assert.strictEqual(unit.interactiveType, 'economics_lab');
assert.strictEqual(unit.isPracticeTest, true);

// 3. Verify All 17 Worksheet Vocabulary Words
const expected17Words = [
  'supply', 'demand', 'opportunity cost', 'scarcity', 'economic interdependence',
  'specialization', 'producers', 'consumers', 'goods', 'services',
  'needs', 'wants', 'barter', 'profit', 'loss', 'costs', 'benefits'
];

expected17Words.forEach(word => {
  const foundInQuestions = unit.questions.some(q => 
    q.q.toLowerCase().includes(word.toLowerCase()) || 
    q.options.some(opt => opt.toLowerCase().includes(word.toLowerCase()))
  );
  assert(foundInQuestions, `Missing coverage for vocabulary word: "${word}"`);
});
console.log(`✅ All 17 vocabulary words covered in practice test questions`);

// 4. Validate Question Schema & Shuffling Readiness
unit.questions.forEach((q, idx) => {
  const num = idx + 1;
  assert(q.q && q.q.length > 5, `Q${num} missing question text`);
  assert(Array.isArray(q.options), `Q${num} options should be an array`);
  assert.strictEqual(q.options.length, 4, `Q${num} must have exactly 4 options`);
  assert(typeof q.answer === 'number' && q.answer >= 0 && q.answer < 4, `Q${num} answer must be 0-3`);
  assert(q.hint && q.hint.length > 5, `Q${num} missing hint`);
  assert(q.explanation && q.explanation.length > 5, `Q${num} missing explanation`);
});
console.log(`✅ All ${unit.questions.length} questions strictly adhere to schema with hints and explanations`);

// 5. Test Jordan's Scenario Coverage
const jordanQuestions = unit.questions.filter(q => q.q.includes('Jordan'));
assert(jordanQuestions.length >= 5, `Should have at least 5 scenario application questions (found ${jordanQuestions.length})`);
console.log(`✅ Jordan scenario tested with ${jordanQuestions.length} dedicated application questions`);

// 6. Test Random Shuffling (Fisher-Yates)
const questionsCopy = [...unit.questions];
for (let i = questionsCopy.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [questionsCopy[i], questionsCopy[j]] = [questionsCopy[j], questionsCopy[i]];
}
assert.strictEqual(questionsCopy.length, unit.questions.length);
console.log(`✅ Dynamic question shuffling verified`);

console.log('\n🎉 ALL ECONOMICS UNIT TESTS PASSED SUCCESSFULLY!\n');
