# Zayn Math Adventure

## Product and Build Specification

### 1. Product Vision

Build a fun, colorful, game-like math learning web app designed primarily for an 8-year-old student who is comfortable working above grade level.

The app should teach math concepts, demonstrate examples visually, provide guided practice, quiz the student, adapt to strengths and weaknesses, and reward consistent learning.

The experience should feel closer to an adventure game than an online worksheet.

Primary device: iPad
Secondary device: Mac/desktop
Orientation: Landscape and portrait supported
Distribution: Private web application installed on the iPad using Add to Home Screen
Initial hosting: Free static hosting such as Cloudflare Pages
Initial authentication: None required
Initial data storage: Local browser storage or IndexedDB
Architecture should allow cloud synchronization to be added later.

The app name is:

Zayn Math Adventure

---

# 2. Core Design Principles

## Fun First

Use animation, characters, maps, badges, celebrations, sound effects, progress bars, treasure chests, stars and challenges.

Avoid making the application look like school software.

## Teach Before Testing

Every new skill should have:

Learn
See an example
Try together
Practice
Quiz
Mastery check

Never simply present unexplained questions for a concept the student has not learned.

## Short Sessions

Most activities should take approximately 5 to 10 minutes.

## Positive Mistakes

Wrong answers should trigger teaching, not punishment.

Never display harsh messages.

Use responses such as:

Almost!
Good try!
Let us look at this another way.
You are close.
Here is a trick that can help.

## Adaptive Difficulty

Difficulty should increase or decrease based on performance.

The student should not manually select Grade 3, Grade 4, etc.

The system should determine the appropriate difficulty for each individual skill.

---

# 3. Visual Theme

Create a colorful math adventure universe.

The visual style should appeal to an 8-year-old without looking like a preschool application.

Use:

Large touch targets
Rounded cards
Bright illustrations
Animated progress
Friendly characters
Treasure maps
Worlds
Stars
Gems
Trophies
Badges
Confetti
Simple sound effects

Avoid excessive text.

Use visual explanations whenever possible.

---

# 4. Main Character

Create a friendly guide character.

Temporary name:

Pixel

Pixel is a small adventurous robot who loves solving puzzles.

Pixel appears during:

Lessons
Hints
Correct answers
Mistakes
Level ups
Boss battles
Daily missions

Examples:

Pixel:
Nice! You figured that out!

Pixel:
Hmm... that one was tricky. Want to see a shortcut?

Pixel should occasionally be funny.

Do not make Pixel talk after every question.

---

# 5. Home Screen

Display:

Zayn Math Adventure

Student avatar

Current Level

XP progress bar

Current daily streak

Gem balance

Today’s Mission

Continue Learning

Math Worlds

Challenge Me

Awards

Progress

Parent Zone

Example:

Zayn
Level 12

2,450 / 3,000 XP

🔥 8 Day Streak

💎 340 Gems

TODAY'S MISSION

□ Complete one lesson
□ Answer 10 questions
□ Practice one weak skill
□ Complete today's challenge

Reward:
150 XP + Treasure Chest

---

# 6. Math Worlds

Create separate themed worlds.

## Number Kingdom

Topics:

Place value
Comparing numbers
Rounding
Addition
Subtraction
Mental math
Number patterns

## Times Table Arena

Topics:

2 through 12 multiplication tables
Multiplication strategies
Missing factors
Multi-digit multiplication
Speed rounds
Mixed multiplication

## Division Dungeon

Topics:

Understanding division
Equal groups
Fact families
Division using multiplication
Single-digit division
Remainders
Multi-digit division
Long division
Division word problems

## Fraction Factory

Topics:

Understanding fractions
Numerator and denominator
Fractions on number lines
Equivalent fractions
Comparing fractions
Simplifying fractions
Adding fractions
Subtracting fractions
Improper fractions
Mixed numbers
Fraction word problems

## Decimal City

Topics:

Decimal place value
Tenths
Hundredths
Thousandths when appropriate
Comparing decimals
Ordering decimals
Fractions to decimals
Decimals to fractions
Adding decimals
Subtracting decimals
Money problems

## Algebra Lab

Initially introduce algebra as Mystery Numbers.

Topics:

Missing numbers
Patterns
Unknown values
Balance concept
Variables
One-step equations
Two-step equations when ready
Function patterns

Example progression:

□ + 7 = 15

Then:

x + 7 = 15

The student should discover that algebra is something he already understands.

## Geometry Galaxy

Topics:

2D shapes
3D shapes
Lines
Angles
Triangles
Quadrilaterals
Symmetry
Perimeter
Area
Volume
Coordinate grids
Transformations

Geometry should be highly interactive.

Allow shapes to be dragged, rotated and resized whenever practical.

## Problem Solver Island

Mixed real-world problems involving:

Money
Time
Distance
Food
Sports
Shopping
Travel
Games
Measurements

Word problems should use fun scenarios rather than repetitive textbook language.

---

# 7. Lesson Structure

Every skill follows this structure.

### Step 1: Discover

Introduce the idea visually.

Example for fractions:

Show a pizza.

Shade 1/2.

Cut the same pizza into four pieces.

Show that:

1/2 = 2/4

### Step 2: Explain

Use short explanations.

Never show large paragraphs.

### Step 3: Watch One

Demonstrate a worked example step by step.

### Step 4: Try Together

Student participates while the app provides guidance.

### Step 5: Practice

3 to 5 independent questions.

### Step 6: Challenge

2 harder questions.

### Step 7: Mini Quiz

Approximately 5 questions.

### Step 8: Results

Display:

Accuracy
XP earned
Stars earned
Mastery progress
New records
Rewards

---

# 8. Question Types

Do not rely only on multiple choice.

Support:

Multiple choice
Number entry
Drag and drop
Tap the correct object
Arrange numbers
Match pairs
Number line placement
Build the answer
True or false
Missing number
Visual fraction selection
Shape manipulation
Timed questions
Word problems

---

# 9. Scoring System

Base question scoring:

Correct first attempt:
100 points

Correct after hint:
70 points

Correct second attempt:
50 points

Incorrect:
0 points

Difficulty multiplier:

Easy ×1.0
Medium ×1.25
Hard ×1.5
Expert ×2.0

Speed bonus should exist only in activities where speed is educationally appropriate.

Do not reward rushing during concept-learning lessons.

---

# 10. XP System

XP determines the student's overall adventure level.

Example:

Lesson completed:
100 XP

Perfect quiz:
+100 XP

Daily mission:
+150 XP

Boss battle:
+250 XP

New skill mastered:
+200 XP

Seven-day streak:
+300 XP

Levels should initially require approximately:

Level 1: 0 XP
Level 2: 500 XP
Level 3: 1,100 XP
Level 4: 1,800 XP

Increase requirements gradually.

Do not make later levels unreasonably difficult to reach.

---

# 11. Stars

Every lesson can earn three stars.

⭐
Completed

⭐⭐
80% or better

⭐⭐⭐
90% or better with limited hint usage

Allow lessons to be replayed to improve the star rating.

---

# 12. Gems

Gems are virtual currency.

Earn gems through:

Lessons
Quizzes
Streaks
Boss battles
Daily missions
Achievements

Gems cannot be purchased with real money.

There should never be advertisements or microtransactions.

Use gems to unlock cosmetic rewards.

Examples:

Avatar clothing
Robot accessories
Backgrounds
Spaceships
Treasure room items
Math world themes
Celebration animations

---

# 13. Streak System

Track consecutive learning days.

Display prominently:

🔥 8 Day Streak

Milestones:

3 days
7 days
14 days
30 days
50 days
100 days

Do not completely destroy a long streak because of one missed day.

Introduce:

Streak Shield

The student can earn shields through learning.

One shield automatically protects one missed day.

---

# 14. Achievements and Badges

Examples:

🏆 Times Table Rookie
Complete first multiplication lesson.

🏆 Times Table Master
Master tables 2 through 12.

🏆 Division Ninja
Master basic division.

🏆 Fraction Explorer
Complete five fraction lessons.

🏆 Fraction Master
Master the main fraction pathway.

🏆 Decimal Detective
Master decimal comparison.

🏆 Geometry Explorer
Complete ten geometry lessons.

🏆 Algebra Detective
Solve 50 mystery-number equations.

🏆 Perfect Ten
Answer ten questions correctly in a row.

🏆 Unstoppable
Answer 25 correctly in a row.

🏆 Century Club
Answer 100 total questions correctly.

🏆 Math Machine
Answer 1,000 questions correctly.

🏆 Comeback Kid
Correctly solve a problem after previously getting a similar problem wrong.

Achievements should sometimes appear unexpectedly.

---

# 15. Boss Battles

Each world contains boss battles.

Boss battles combine several skills from that world.

Example:

Fraction Factory Boss

Question 1:
Identify a fraction.

Question 2:
Equivalent fraction.

Question 3:
Compare fractions.

Question 4:
Fraction number line.

Question 5:
Add fractions.

Question 6:
Word problem.

Boss health decreases as questions are answered correctly.

Correct answer:

Boss loses health.

Incorrect answer:

Do not remove student health.

Instead, boss remains alive and Pixel provides assistance.

Defeating the boss unlocks:

XP
Gems
Badge
Next area

---

# 16. Times Table Arena

Make multiplication especially game-like.

Modes:

Practice
Speed Round
Beat Your Record
Mixed Tables
Target Table
Boss Battle

Speed Round:

60 seconds.

Show one question at a time.

Track:

Correct
Incorrect
Accuracy
Average response time
Personal record

Track mastery independently for:

2
3
4
5
6
7
8
9
10
11
12

The adaptive engine should identify weak multiplication facts.

Example:

If 7 × 8 is repeatedly missed, show it more frequently in future practice.

Do not simply repeat the exact same question immediately.

---

# 17. Daily Challenge

Generate one short daily challenge.

Examples:

Solve five multiplication questions without a mistake.

Beat yesterday's division score.

Solve three fraction puzzles.

Complete a mixed math challenge.

Rewards:

XP
Gems
Occasional treasure chest

---

# 18. Challenge Me Mode

Create an adaptive mixed quiz.

Default:

10 questions.

Pull questions from learned skills.

Suggested distribution:

40% weak skills
30% recently learned skills
20% established skills
10% stretch questions

Never include completely untaught concepts.

At completion show:

Score
Accuracy
XP
Skills improved
Personal records
Suggested next lesson

---

# 19. Adaptive Learning Engine

Track performance at the individual skill level.

Each skill should maintain:

Questions attempted
Questions correct
First-attempt accuracy
Hint usage
Recent accuracy
Average response time
Last practiced
Current difficulty
Mastery score

Mastery states:

Not Started
Learning
Practicing
Strong
Mastered

Suggested mastery calculation should heavily weight recent performance.

Mastered should generally require:

At least 10 meaningful attempts
High recent accuracy
Success across multiple sessions
Limited hint dependency

A single perfect quiz should not automatically create mastery.

---

# 20. Mistake Memory

Store concepts and question patterns that cause difficulty.

Example:

Student repeatedly struggles with:

7 × 8
Comparing 3/4 and 5/8
0.6 versus 0.56

The adaptive system should reintroduce related questions later.

Do not repeatedly show identical questions.

Generate variations that test the same underlying concept.

---

# 21. Hint System

Every meaningful problem should support hints.

Hints should progress.

Hint 1:
Small clue.

Hint 2:
Explain the strategy.

Hint 3:
Walk through most of the solution.

Example:

84 ÷ 7

Hint 1:
Think about your 7 times table.

Hint 2:
What number multiplied by 7 gives 84?

Hint 3:
7 × 12 = 84, so 84 ÷ 7 = ?

---

# 22. Error Teaching

When an answer is wrong, identify likely misconceptions where possible.

Example:

3/4 + 2/4 = 5/8

The system recognizes that both numerator and denominator were added.

Explain visually:

The pieces are still fourths.

Only the number of pieces changed.

Then demonstrate.

Follow with a related easier question.

---

# 23. Parent Dashboard

Protect Parent Zone with a simple PIN.

Do not display the PIN to the student.

Dashboard sections:

Overview
Skills
Activity
Weak Areas
Achievements
Settings

Overview:

Current level
Total XP
Current streak
Longest streak
Questions answered
Overall accuracy
Lessons completed
Skills mastered

---

# 24. Skill Dashboard

Display every skill.

Example:

Multiplication
██████████ 94%
Mastered

Division
████████░░ 82%
Strong

Fractions
███████░░░ 74%
Practicing

Decimals
██████░░░░ 63%
Practicing

Algebra
█████░░░░░ 51%
Learning

Allow parent to drill into each category.

---

# 25. Parent Insights

Automatically surface:

Strongest Skills

Skills Needing Practice

Recently Improved

Frequently Missed Concepts

Example:

Needs Attention

7 × 8 family
Comparing decimals
Fraction denominators

Improving

Long division
Equivalent fractions

Strong

Multiplication by 5
Area
Place value

---

# 26. Parent Controls

Allow parent to:

Enable/disable topics
Reset a lesson
Reset progress
Adjust daily goal
Turn sounds on/off
Set challenge difficulty
View question history
View incorrect answers
Manually assign practice
Unlock content if desired

---

# 27. Learning History

Record each session.

Store:

Date
Duration
Topics practiced
Questions attempted
Correct answers
Accuracy
XP earned
Skills improved
Achievements earned

Parent dashboard should display weekly activity.

---

# 28. Rewards Screen

Create a trophy room.

Sections:

Badges
Trophies
Treasure
Avatar items
World collectibles

Locked achievements should show silhouettes when appropriate.

Example:

???

Solve 100 questions to discover this award.

---

# 29. Treasure Chests

Occasionally award treasure chests.

Chest types:

Wood
Silver
Gold
Diamond

Possible contents:

Gems
Avatar item
Badge
Background
Celebration effect

Treasure should never affect mathematical difficulty.

---

# 30. Celebration System

Use celebrations sparingly so they remain meaningful.

Small correct answer:

Quick animation.

Five-answer streak:

Small celebration.

Perfect quiz:

Confetti.

Skill mastered:

Larger celebration.

Level up:

Full-screen animation.

Boss defeated:

Major celebration.

New personal record:

Special animation.

---

# 31. Sound

Optional sounds:

Correct
Achievement
Level up
Treasure chest
Boss defeated

Include a mute control.

Do not use annoying repetitive audio.

---

# 32. Accessibility and iPad UX

All interactive controls must be comfortable for touch.

Minimum target approximately 44 × 44 points.

Support:

Landscape
Portrait
Keyboard when available
Touch
Reduced motion
Mute
Readable fonts
High contrast

Avoid tiny controls.

---

# 33. Offline Capability

Build as a Progressive Web App.

The application should continue working when internet access is unavailable after initial installation.

Cache:

Application assets
Lessons
Question generators
Images required for core lessons

Save progress locally.

---

# 34. PWA Requirements

Provide:

Web app manifest
App icons
Service worker
Offline caching
Standalone display mode
iPad Home Screen compatibility

When launched from the iPad Home Screen, the app should look and feel like an application rather than a normal website.

---

# 35. Technology Stack

Preferred:

React
TypeScript
Vite

Styling:

Tailwind CSS or clean CSS architecture

Animations:

Framer Motion

Storage:

IndexedDB

Suggested library:

Dexie.js

PWA:

Vite PWA plugin or equivalent

Testing:

Vitest
React Testing Library
Playwright for major flows

Avoid unnecessary backend services in Version 1.

---

# 36. Application Architecture

Suggested structure:

src/

components/
game/
learning/
questions/
rewards/
charts/
layout/

pages/
Home
World
Lesson
Practice
Quiz
Challenge
BossBattle
Awards
Progress
ParentDashboard
Settings

data/
skills
lessons
achievements
worlds

engine/
questionGenerator
scoringEngine
masteryEngine
adaptiveEngine
rewardEngine
streakEngine

storage/
database
repositories
migrations

types/

utils/

---

# 37. Content Architecture

Do not hardcode lesson content directly into UI components.

Lessons should be data-driven.

Each skill should contain:

skillId
worldId
name
description
prerequisites
difficulty
lessonSteps
questionGenerators
masteryRules

This allows hundreds of lessons to be added without rewriting the interface.

---

# 38. Question Generation

Prefer generated questions over static question lists.

Example:

Multiplication generator accepts:

table
minimum multiplier
maximum multiplier
difficulty

Fraction generator accepts:

denominator range
equivalent fraction mode
comparison mode
operation
difficulty

Every generated question must store enough metadata to reproduce and analyze it.

---

# 39. Data Model

StudentProfile

id
name
avatar
level
xp
gems
currentStreak
longestStreak
lastActivityDate
streakShields
createdAt

SkillProgress

skillId
status
masteryScore
attempts
correct
firstTryCorrect
hintsUsed
recentResults
lastPracticed
difficulty

QuestionAttempt

id
timestamp
skillId
questionType
difficulty
questionData
studentAnswer
correctAnswer
correct
attemptNumber
hintsUsed
responseTime

LessonProgress

lessonId
completed
bestScore
stars
attempts
lastCompleted

AchievementProgress

achievementId
unlocked
unlockedAt
progress

Inventory

itemId
unlocked
equipped

Session

id
startTime
endTime
questionsAttempted
questionsCorrect
xpEarned
skillsPracticed

---

# 40. Save Strategy

Save immediately after:

Every question
Lesson completion
Reward
Achievement
Settings change

Never rely solely on saving at the end of a session.

Provide export functionality from Parent Zone.

Export progress as JSON.

Also provide Import Progress.

This protects against losing browser data or replacing the iPad.

---

# 41. Initial Curriculum

Version 1 should include meaningful content for:

Multiplication
Division
Fractions
Decimals
Mystery Number / introductory algebra
Geometry

Do not attempt to build the entire mathematics curriculum before launching Version 1.

Start with approximately 5 to 10 skills per world.

---

# 42. Initial Multiplication Skills

Understanding multiplication
Arrays
Repeated addition
Tables 2 through 5
Tables 6 through 9
Tables 10 through 12
Missing factors
Mixed multiplication
Two-digit × one-digit
Multiplication word problems

---

# 43. Initial Division Skills

Understanding division
Equal groups
Relationship with multiplication
Division facts
Missing divisor
Remainders
Two-digit ÷ one-digit
Long division introduction
Division word problems

---

# 44. Initial Fraction Skills

Parts of a whole
Numerator and denominator
Fractions on a number line
Equivalent fractions
Comparing fractions
Simplifying fractions
Adding like denominators
Subtracting like denominators
Mixed numbers introduction
Fraction word problems

---

# 45. Initial Decimal Skills

Tenths
Hundredths
Decimal place value
Comparing decimals
Ordering decimals
Fractions and decimals
Money
Adding decimals
Subtracting decimals
Decimal word problems

---

# 46. Initial Algebra Skills

Mystery numbers
Missing addend
Missing factor
Number patterns
Input/output patterns
Variables
One-step addition equations
One-step subtraction equations
One-step multiplication equations
One-step division equations

---

# 47. Initial Geometry Skills

Shape identification
Triangle types
Quadrilaterals
Angles
Lines
Symmetry
Perimeter
Area
Coordinate grid
3D shapes

---

# 48. Difficulty System

Each skill supports approximately four difficulty levels:

Explorer
Adventurer
Expert
Master

Do not show school grade numbers prominently.

Difficulty should adapt independently for each skill.

A student could simultaneously be:

Master in multiplication

Expert in fractions

Adventurer in decimals

Explorer in algebra

This is intentional.

---

# 49. First-Time Experience

On first launch:

Welcome to Zayn Math Adventure!

Meet Pixel.

Allow avatar selection.

Then offer:

Start My Adventure

Begin with a short, friendly Math Explorer Challenge.

Approximately 10 to 15 questions across major areas.

Do not call this a placement test.

Use the results only to establish starting difficulty.

Do not lock content based solely on this assessment.

---

# 50. Navigation

Bottom navigation on iPad:

🏠 Home
🗺️ Worlds
⚔️ Challenge
🏆 Awards
📊 Progress

Parent Zone should be accessed through a small parent/settings control rather than being prominent in the child's navigation.

---

# 51. Safety and Privacy

No advertising.

No social network.

No public profiles.

No chat with strangers.

No external links accessible from child-facing screens.

No real-money purchases.

No collection of unnecessary personal information.

No analytics or tracking services in Version 1.

---

# 52. AI

Do not make the initial version dependent on Claude, OpenAI or another AI API.

Core mathematics must work deterministically.

Question generation should initially use tested algorithms.

Correct answers must be calculated programmatically.

AI may be added later for:

Alternative explanations
Custom word problems
Parent summaries
Additional lesson variations

Never use an AI model as the sole authority for whether a mathematical answer is correct.

---

# 53. Testing Requirements

Automated tests are especially important for question generators.

Every generator should be tested with hundreds or thousands of generated examples.

Verify:

Answer is correct
Question is solvable
Difficulty constraints are respected
No divide-by-zero
Fractions are valid
Decimal precision is controlled
No impossible geometry questions
No ambiguous multiple-choice answers

Test scoring separately.

Test XP separately.

Test mastery calculations separately.

Test streak calculations separately.

---

# 54. Version 1 Definition of Done

Version 1 is complete when Zayn can:

Open the app from his iPad Home Screen.

Select a math world.

Learn a concept.

Complete interactive examples.

Practice questions.

Use hints.

Take quizzes.

Earn stars.

Earn XP.

Earn gems.

Level up.

Maintain a streak.

Unlock achievements.

Complete daily missions.

Complete Challenge Me sessions.

Fight at least one boss per world.

Close the application.

Return later without losing progress.

And the parent can:

View progress.

Identify strong and weak skills.

Review mistakes.

Assign practice.

Export progress.

Import progress.

---

# 55. Development Phases

## Phase 1: Foundation

Build:

React/TypeScript project
PWA
Navigation
IndexedDB
Student profile
Home screen
World map
Core data architecture

## Phase 2: Learning Engine

Build:

Lesson engine
Question engine
Hints
Scoring
Mastery
Adaptive difficulty
Mistake tracking

## Phase 3: First Worlds

Build:

Times Table Arena
Division Dungeon
Fraction Factory

Fully finish these before expanding.

## Phase 4: Game Systems

Build:

XP
Levels
Stars
Gems
Streaks
Achievements
Treasure
Daily missions
Boss battles

## Phase 5: More Worlds

Build:

Decimal City
Algebra Lab
Geometry Galaxy

## Phase 6: Parent Experience

Build:

Dashboard
Skill reports
Weak-area analysis
Question history
Assignments
Export/import

## Phase 7: Polish

Animations
Sound
Avatar customization
Better illustrations
Accessibility
Offline testing
iPad UX testing

---

# 56. Important Development Rule

Do not build the entire specification at once.

Implement one phase at a time.

After each phase:

Run automated tests.
Run the application.
Fix TypeScript errors.
Fix console errors.
Test on iPad-sized viewport.
Commit working code.

Do not proceed while the previous phase is broken.

---

# 57. Claude and Codex Workflow

Use Claude primarily for:

Product interpretation
UI ideas
Lesson content
Educational explanations
Brainstorming
Reviewing UX
Generating initial component concepts

Use Codex primarily for:

Repository work
Architecture
Implementation
Refactoring
Automated tests
Debugging
Code review
Running the application
Fixing build errors

Both agents must follow this specification.

Keep this document in the repository as:

PRODUCT_SPEC.md

Agents should read PRODUCT_SPEC.md before making significant product changes.

---

# 58. First Development Instruction

Do not begin by implementing all math worlds.

First:

1. Create the React + TypeScript + Vite application.
2. Configure PWA support.
3. Establish the folder architecture.
4. Implement IndexedDB persistence.
5. Create the StudentProfile data model.
6. Create the SkillProgress data model.
7. Build the main responsive iPad shell.
8. Build the Home screen.
9. Build a basic Math Worlds screen.
10. Add placeholder cards for all worlds.
11. Add the XP, level, gems and streak header.
12. Add automated tests for persistence.
13. Verify the application works offline.
14. Verify progress survives browser refresh.
15. Stop and request review before implementing the learning engine.

The first milestone should produce a polished navigable shell, not a partially implemented full application.
