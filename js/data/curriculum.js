/**
 * Zayn Math Adventure - Master Curriculum Data
 * Tailored for an 8-year-old at 99th percentile (gifted, fast-paced, intuitive)
 */

const CURRICULUM_DATA = {
  worlds: [
    {
      id: 1,
      name: "Lego Times Table Speedway",
      theme: "lego",
      badge: "WORLD 1",
      description: "Master multiplication arrays, fact families, and unlock Phonk speed drift tracks!",
      bossName: "THE BRICK-BOT OVERLORD",
      bossSprite: "🤖🧱",
      nodes: [
        {
          id: "w1-n1",
          worldId: 1,
          type: "lesson",
          title: "Lego Stud Arrays (6s & 7s)",
          icon: "🧱",
          xPercent: 50,
          yPercent: 8,
          xpReward: 100,
          gemReward: 15,
          steps: [
            {
              type: "discover",
              badge: "DISCOVER",
              title: "Multiplication is Just Lego Studs!",
              explanation: "A standard 2×4 Lego brick has 2 rows of 4 studs = 8 studs. What about a 6×7 brick?",
              widget: "lego-array",
              widgetConfig: { rows: 6, cols: 7, color: "#e3000b" },
              sidekickReaction: "Bro is looking at 42 studs! 6 rows of 7 = 42. Pure geometry!"
            },
            {
              type: "watch",
              badge: "WATCH EXAMPLE",
              title: "The 7s Trick: Break It Down!",
              explanation: "If you forget 6 × 7, split it! 6 × 5 = 30, and 6 × 2 = 12. Add them up: 30 + 12 = 42!",
              widget: "lego-array",
              widgetConfig: { rows: 6, cols: 7, highlightSplit: true },
              sidekickReaction: "Splitting numbers is what 10,000 Aura math sigma players do."
            },
            {
              type: "practice",
              badge: "TRY TOGETHER",
              title: "Calculate the Studs!",
              prompt: "A giant baseplate has 7 rows and 8 studs per row. How many studs in total?",
              options: ["54", "56", "64", "48"],
              answer: "56",
              hint: "Remember: 5, 6, 7, 8 -> 56 = 7 × 8!",
              sidekickReaction: "56! The classic 7 × 8 riddle conquered!"
            },
            {
              type: "practice",
              badge: "PRACTICE",
              title: "Missing Factor Mystery",
              prompt: "You need 72 studs to build a Lego castle wall. The brick is 9 studs long. How many rows high?",
              options: ["6", "7", "8", "9"],
              answer: "8",
              hint: "9 × ? = 72. Think 9 × 8!",
              sidekickReaction: "72 divided by 9 is 8! Clean work!"
            },
            {
              type: "challenge",
              badge: "99% PERCENTILE CHALLENGE",
              title: "Mental Math Lightning",
              prompt: "What is 12 × 12 - 44?",
              options: ["100", "90", "110", "104"],
              answer: "100",
              hint: "12 × 12 = 144. Now subtract 44!",
              sidekickReaction: "144 - 44 = 100! Bro is COOKING with pure speed! 🔥"
            }
          ]
        },
        {
          id: "w1-n2",
          worldId: 1,
          type: "minigame",
          title: "Phonk Drift Speed Round",
          icon: "🏎️",
          xPercent: 30,
          yPercent: 24,
          xpReward: 150,
          gemReward: 25,
          mode: "drift"
        },
        {
          id: "w1-n3",
          worldId: 1,
          type: "lesson",
          title: "Division Fact Families",
          icon: "➗",
          xPercent: 70,
          yPercent: 40,
          xpReward: 120,
          gemReward: 20,
          steps: [
            {
              type: "discover",
              badge: "DISCOVER",
              title: "Division is Just Backwards Multiplication!",
              explanation: "If 8 × 9 = 72, then 72 ÷ 8 must equal 9, and 72 ÷ 9 must equal 8.",
              widget: "lego-array",
              widgetConfig: { rows: 8, cols: 9, color: "#0055bf" },
              sidekickReaction: "Fact families are like undo buttons in Minecraft!"
            },
            {
              type: "practice",
              badge: "PRACTICE",
              title: "Quick Division",
              prompt: "Solve: 84 ÷ 7 = ?",
              options: ["11", "12", "13", "14"],
              answer: "12",
              hint: "7 × 10 = 70. 84 - 70 = 14. 7 × 2 = 14. So 10 + 2 = 12!",
              sidekickReaction: "12 is correct! Fast division unlocked."
            },
            {
              type: "challenge",
              badge: "CHALLENGE",
              title: "Division with Remainders",
              prompt: "You have 50 Lego wheels to make 4-wheel sports cars. How many complete cars can you make?",
              options: ["12 cars (2 wheels left)", "11 cars (6 wheels left)", "13 cars (0 left)", "10 cars (10 left)"],
              answer: "12 cars (2 wheels left)",
              hint: "4 × 12 = 48. 50 - 48 = 2 wheels remainder!",
              sidekickReaction: "12 cars and 2 spare wheels for the pit stop! 🏎️"
            }
          ]
        },
        {
          id: "w1-n4",
          worldId: 1,
          type: "chest",
          title: "Mystery Loot Chest",
          icon: "🎁",
          xPercent: 40,
          yPercent: 58,
          gemReward: 50,
          xpReward: 100,
          itemUnlock: "capybara_shades"
        },
        {
          id: "w1-n5",
          worldId: 1,
          type: "boss",
          title: "Boss Battle: Brick-Bot",
          icon: "👑",
          xPercent: 50,
          yPercent: 78,
          xpReward: 300,
          gemReward: 60,
          bossData: {
            name: "THE BRICK-BOT OVERLORD",
            hp: 100,
            sprite: "🤖🧱",
            taunt: "No 8-year-old can crack my multiplication firewall!",
            questions: [
              { prompt: "Calculate: 9 × 8", options: ["72", "81", "64", "74"], answer: "72" },
              { prompt: "Calculate: 11 × 12", options: ["132", "122", "142", "121"], answer: "132" },
              { prompt: "Solve: 96 ÷ 8", options: ["12", "11", "14", "13"], answer: "12" },
              { prompt: "What is 7 × 7 + 1?", options: ["50", "49", "51", "52"], answer: "50" },
              { prompt: "A 6-sided die rolled 8 times. What is the maximum possible sum?", options: ["48", "42", "54", "40"], answer: "48" }
            ]
          }
        }
      ]
    },

    {
      id: 2,
      name: "Minecraft Fraction & Decimal Nether",
      theme: "minecraft",
      badge: "WORLD 2",
      description: "Visual fraction slicing, Netherite crafting ratios, and decimal comparisons!",
      bossName: "THE NETHER FRACTION DRAGON",
      bossSprite: "🐲🔥",
      nodes: [
        {
          id: "w2-n1",
          worldId: 2,
          type: "lesson",
          title: "Visual Fraction Crafting",
          icon: "⛏️",
          xPercent: 50,
          yPercent: 8,
          xpReward: 110,
          gemReward: 15,
          steps: [
            {
              type: "discover",
              badge: "DISCOVER",
              title: "Fractions are Slices of the Whole!",
              explanation: "Look at this obsidian block cut into 4 equal pieces. If you take 2 pieces, you have 2/4, which is the exact same as 1/2!",
              widget: "fraction-visual",
              widgetConfig: { numerator: 2, denominator: 4 },
              sidekickReaction: "Equivalent fractions make building portal frames easy!"
            },
            {
              type: "practice",
              badge: "PRACTICE",
              title: "Minecraft Crafting Ratio",
              prompt: "1 Diamond Pickaxe requires 3 Diamonds and 2 Sticks. How many Diamonds do you need to craft 5 Pickaxes for your squad?",
              widget: "minecraft-crafting",
              widgetConfig: { item: "pickaxe", qty: 5 },
              options: ["10 Diamonds", "15 Diamonds", "12 Diamonds", "18 Diamonds"],
              answer: "15 Diamonds",
              hint: "Multiply 3 diamonds × 5 pickaxes!",
              sidekickReaction: "15 Diamonds mined and ready to craft! 💎"
            },
            {
              type: "challenge",
              badge: "CHALLENGE",
              title: "Comparing Fractions",
              prompt: "Which potion bottle has more strength: 3/4 bottle or 5/8 bottle?",
              options: ["3/4 is larger", "5/8 is larger", "They are equal", "Cannot tell"],
              answer: "3/4 is larger",
              hint: "Convert 3/4 into eighths: 3/4 = 6/8. Since 6/8 > 5/8, 3/4 is bigger!",
              sidekickReaction: "6/8 beats 5/8! High IQ calculation."
            }
          ]
        },
        {
          id: "w2-n2",
          worldId: 2,
          type: "lesson",
          title: "Decimals & Money Math",
          icon: "💎",
          xPercent: 65,
          yPercent: 26,
          xpReward: 120,
          gemReward: 20,
          steps: [
            {
              type: "discover",
              badge: "DISCOVER",
              title: "Decimals are Tenths & Hundredths",
              explanation: "0.5 is 5/10 (half). 0.25 is 25/100 (one quarter). Don't get tricked: 0.6 is bigger than 0.59!",
              widget: "decimal-bar",
              widgetConfig: { val1: 0.6, val2: 0.59 },
              sidekickReaction: "0.60 > 0.59! Never judge a decimal just by its length!"
            },
            {
              type: "practice",
              badge: "PRACTICE",
              title: "Decimal Ordering",
              prompt: "Which number is the greatest: 0.7, 0.68, 0.09, 0.701?",
              options: ["0.701", "0.7", "0.68", "0.09"],
              answer: "0.701",
              hint: "Align them: 0.700 vs 0.701 vs 0.680 vs 0.090!",
              sidekickReaction: "0.701 takes first place! Spot on!"
            }
          ]
        },
        {
          id: "w2-n3",
          worldId: 2,
          type: "chest",
          title: "Netherite Treasure Chest",
          icon: "🎁",
          xPercent: 35,
          yPercent: 48,
          gemReward: 60,
          xpReward: 120,
          itemUnlock: "diamond_helmet"
        },
        {
          id: "w2-n4",
          worldId: 2,
          type: "boss",
          title: "Boss: Nether Fraction Dragon",
          icon: "👑",
          xPercent: 50,
          yPercent: 75,
          xpReward: 350,
          gemReward: 70,
          bossData: {
            name: "THE NETHER FRACTION DRAGON",
            hp: 100,
            sprite: "🐲🔥",
            taunt: "My fire breath incinerates improper fractions!",
            questions: [
              { prompt: "Simplify 6/8 to lowest terms:", options: ["3/4", "2/3", "1/2", "3/8"], answer: "3/4" },
              { prompt: "Calculate: 1/3 + 1/3 + 1/3 =", options: ["1", "3/9", "2/3", "3/6"], answer: "1" },
              { prompt: "What is 0.5 + 0.25?", options: ["0.75", "0.30", "0.70", "0.80"], answer: "0.75" },
              { prompt: "In Minecraft, 1 block in the Nether equals 8 blocks in the Overworld. If you travel 12 Nether blocks, how far is that in the Overworld?", options: ["96 blocks", "80 blocks", "108 blocks", "92 blocks"], answer: "96 blocks" },
              { prompt: "Convert 7/2 into a mixed number:", options: ["3 1/2", "3 1/4", "2 1/2", "4 1/2"], answer: "3 1/2" }
            ]
          }
        }
      ]
    },

    {
      id: 3,
      name: "Redstone Algebra Lab",
      theme: "redstone",
      badge: "WORLD 3",
      description: "Balance scales, mystery boxes (x), and two-step equation logic!",
      bossName: "THE GIGACHAD MECHA-GOLEM",
      bossSprite: "🗿⚡",
      nodes: [
        {
          id: "w3-n1",
          worldId: 3,
          type: "lesson",
          title: "Mystery Boxes & Balance Scales",
          icon: "⚖️",
          xPercent: 50,
          yPercent: 10,
          xpReward: 130,
          gemReward: 20,
          steps: [
            {
              type: "discover",
              badge: "DISCOVER",
              title: "Algebra is Just a Mystery Box!",
              explanation: "If you have a mystery box [x] and 5 coins on the left, and 12 coins on the right, and the scale is balanced: [x] + 5 = 12. What is inside [x]?",
              widget: "balance-scale",
              widgetConfig: { leftMystery: 1, leftWeights: 5, rightWeights: 12 },
              sidekickReaction: "Subtract 5 from both sides! x = 7. Clean logic!"
            },
            {
              type: "practice",
              badge: "PRACTICE",
              title: "Solve for X",
              prompt: "Solve: x + 18 = 45",
              options: ["27", "28", "37", "25"],
              answer: "27",
              hint: "45 - 18 = 27!",
              sidekickReaction: "27 is in the box! Locked in."
            },
            {
              type: "challenge",
              badge: "99% PERCENTILE CHALLENGE",
              title: "2-Step Redstone Equation",
              prompt: "2x + 6 = 26. What is the value of x?",
              options: ["10", "12", "8", "11"],
              answer: "10",
              hint: "First remove 6: 2x = 20. Then divide by 2: x = 10!",
              sidekickReaction: "2x = 20 -> x = 10! You're doing 7th grade algebra at 8 years old! 📈"
            }
          ]
        },
        {
          id: "w3-n2",
          worldId: 3,
          type: "minigame",
          title: "Logic Gate Circuit Challenge",
          icon: "🔋",
          xPercent: 35,
          yPercent: 35,
          xpReward: 160,
          gemReward: 30,
          mode: "logic"
        },
        {
          id: "w3-n3",
          worldId: 3,
          type: "boss",
          title: "Boss: Gigachad Mecha-Golem",
          icon: "👑",
          xPercent: 50,
          yPercent: 75,
          xpReward: 400,
          gemReward: 80,
          bossData: {
            name: "THE GIGACHAD MECHA-GOLEM",
            hp: 100,
            sprite: "🗿⚡",
            taunt: "Show me your maximum math aura!",
            questions: [
              { prompt: "Solve: 3x = 36", options: ["12", "11", "9", "13"], answer: "12" },
              { prompt: "Solve: x - 15 = 40", options: ["55", "50", "45", "65"], answer: "55" },
              { prompt: "Solve: 4x + 8 = 48", options: ["10", "12", "8", "9"], answer: "10" },
              { prompt: "If a + b = 20 and a = 12, what is b?", options: ["8", "7", "9", "6"], answer: "8" },
              { prompt: "Find the next number in pattern: 3, 7, 11, 15, __?", options: ["19", "18", "21", "20"], answer: "19" }
            ]
          }
        }
      ]
    },

    {
      id: 4,
      name: "Geometry Galaxy & Blueprints",
      theme: "geometry",
      badge: "WORLD 4",
      description: "Perimeter, Area, 3D Voxel Volume, Angles, and Coordinate navigation!",
      bossName: "THE MEWING GEOMETRY SPHINX",
      bossSprite: "📐✨",
      nodes: [
        {
          id: "w4-n1",
          worldId: 4,
          type: "lesson",
          title: "Perimeter vs Area Builder",
          icon: "📐",
          xPercent: 50,
          yPercent: 10,
          xpReward: 130,
          gemReward: 20,
          steps: [
            {
              type: "discover",
              badge: "DISCOVER",
              title: "Perimeter is Fence, Area is Grass!",
              explanation: "For a Minecraft yard that is 6 blocks wide and 4 blocks long: Perimeter = 6 + 4 + 6 + 4 = 20 blocks of fence. Area = 6 × 4 = 24 blocks of grass!",
              widget: "geometry-rect",
              widgetConfig: { width: 6, height: 4 },
              sidekickReaction: "Fence outside (Perimeter), grass inside (Area)! Simple and clean."
            },
            {
              type: "practice",
              badge: "PRACTICE",
              title: "Plot Perimeter",
              prompt: "A square castle plot has a side length of 9 meters. What is the total perimeter fence needed?",
              options: ["36 m", "81 m", "18 m", "45 m"],
              answer: "36 m",
              hint: "A square has 4 equal sides: 9 × 4 = 36!",
              sidekickReaction: "36 meters of fence! Fortress secured."
            },
            {
              type: "challenge",
              badge: "3D VOLUME CHALLENGE",
              title: "3D Voxel Storage Box",
              prompt: "A storage chest is 4 blocks long, 3 blocks wide, and 5 blocks high. What is its 3D volume in blocks?",
              options: ["60 blocks", "50 blocks", "72 blocks", "48 blocks"],
              answer: "60 blocks",
              hint: "Volume = Length × Width × Height = 4 × 3 × 5 = 12 × 5 = 60!",
              sidekickReaction: "60 blocks of pure storage capacity! 📦"
            }
          ]
        },
        {
          id: "w4-n2",
          worldId: 4,
          type: "boss",
          title: "Boss: Mewing Geometry Sphinx",
          icon: "👑",
          xPercent: 50,
          yPercent: 75,
          xpReward: 400,
          gemReward: 80,
          bossData: {
            name: "THE MEWING GEOMETRY SPHINX",
            hp: 100,
            sprite: "📐✨",
            taunt: "Can you calculate all angles of the cosmos?",
            questions: [
              { prompt: "How many degrees in a complete circle?", options: ["360°", "180°", "90°", "270°"], answer: "360°" },
              { prompt: "What do the three interior angles of any triangle always add up to?", options: ["180°", "360°", "90°", "270°"], answer: "180°" },
              { prompt: "What is the area of a right triangle with base 8 and height 6?", options: ["24", "48", "32", "14"], answer: "24" },
              { prompt: "How many faces does a 3D cube have?", options: ["6 faces", "8 faces", "12 faces", "4 faces"], answer: "6 faces" },
              { prompt: "An angle measuring 45° is called:", options: ["Acute", "Obtuse", "Right angle", "Reflex"], answer: "Acute" }
            ]
          }
        }
      ]
    },

    {
      id: 5,
      name: "The 1% Club Logic Vault",
      theme: "logic",
      badge: "WORLD 5",
      description: "Progressive lateral thinking & spatial riddles from 90% down to the 1% Question!",
      bossName: "THE 1% LOGIC MASTER GRANDMASTER",
      bossSprite: "🧠🏆",
      nodes: [
        {
          id: "w5-n1",
          worldId: 5,
          type: "minigame",
          title: "The 1% Club Full Gauntlet",
          icon: "🧠",
          xPercent: 50,
          yPercent: 15,
          xpReward: 500,
          gemReward: 100,
          mode: "logic"
        }
      ]
    }
  ],

  // 1% Club Progressive Logic Questions (Based on real lateral thinking show format)
  logicClubQuestions: [
    {
      tier: "90%",
      tierLabel: "90% QUESTION",
      subLabel: "90% of people can answer this question correctly",
      prompt: "Which of these words does NOT belong in the group?",
      clueText: "APPLE • BANANA • CARROT • GRAPE",
      options: ["CARROT", "APPLE", "BANANA", "GRAPE"],
      answer: "CARROT",
      explanation: "Carrot is a root vegetable; the other three grow as fruits with seeds!",
      auraGain: 200
    },
    {
      tier: "75%",
      tierLabel: "75% QUESTION",
      subLabel: "75% of people can answer this question correctly",
      prompt: "Look at the pattern: 2, 4, 8, 16, 32, __? What comes next?",
      clueText: "2 ➔ 4 ➔ 8 ➔ 16 ➔ 32 ➔ ?",
      options: ["64", "48", "52", "60"],
      answer: "64",
      explanation: "Each number doubles! 32 × 2 = 64.",
      auraGain: 350
    },
    {
      tier: "50%",
      tierLabel: "50% QUESTION",
      subLabel: "Half the country gets this wrong! Think laterally.",
      prompt: "If you look at a digital clock showing 12:21, the digits read the same backwards and forwards (a palindrome). What is the very NEXT time on a 12-hour clock that does this?",
      clueText: "12:21 ➔ 12:22? 01:10? 01:01?",
      options: ["01:10", "12:31", "01:01", "02:20"],
      answer: "01:10",
      explanation: "After 12:59, the clock turns to 1:00. The next palindrome is 1:10 (01:10 reads 01:10 backwards)!",
      auraGain: 500
    },
    {
      tier: "25%",
      tierLabel: "25% QUESTION",
      subLabel: "Only 1 in 4 people solve this logic trap!",
      prompt: "I am an odd number. Take away one letter, and I become even. What number am I?",
      clueText: "S - E - V - E - N",
      options: ["SEVEN", "ELEVEN", "NINE", "THREE"],
      answer: "SEVEN",
      explanation: "Wordplay logic! The word 'SEVEN' without the letter 'S' spells 'EVEN'!",
      auraGain: 800
    },
    {
      tier: "10%",
      tierLabel: "10% QUESTION",
      subLabel: "Top 10% Math & Logic Brain Tier!",
      prompt: "A bat and a ball cost $1.10 in total. The bat costs $1.00 MORE than the ball. How much does the ball cost?",
      clueText: "Bat + Ball = $1.10 • Bat = Ball + $1.00",
      options: ["5 cents ($0.05)", "10 cents ($0.10)", "1 cent ($0.01)", "15 cents ($0.15)"],
      answer: "5 cents ($0.05)",
      explanation: "If the ball is $0.05, the bat is $1.05 ($1.00 more), and together $1.05 + $0.05 = $1.10!",
      auraGain: 1500
    },
    {
      tier: "5%",
      tierLabel: "5% QUESTION",
      subLabel: "Only 5% of players have the mental sharpness for this!",
      prompt: "What is the missing letter in this sequence?\n\nM, T, W, T, F, S, __?",
      clueText: "M • T • W • T • F • S • [ ? ]",
      options: ["S", "M", "T", "F"],
      answer: "S",
      explanation: "The initials of the days of the week: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, SUNDAY (S)!",
      auraGain: 2500
    },
    {
      tier: "1%",
      tierLabel: "THE 1% QUESTION (TOP 1% GRANDMASTER)",
      subLabel: "Only 1 in 100 people can solve this ultimate lateral riddle!",
      prompt: "Which letter comes next in this series?\n\nO, T, T, F, F, S, S, E, N, __?",
      clueText: "O • T • T • F • F • S • S • E • N • [ ? ]",
      options: ["T", "E", "N", "O"],
      answer: "T",
      explanation: "The first letters of the counting numbers! One, Two, Three, Four, Five, Six, Seven, Eight, Nine, TEN (T)! Absolute Grandmaster logic! 🏆",
      auraGain: 5000
    }
  ]
};
