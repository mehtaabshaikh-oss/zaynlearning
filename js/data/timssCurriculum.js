/**
 * TIMSS Grade 4 Mathematics Curriculum Database
 * 
 * Sourced from UAE Curriculum & IEA TIMSS 2027 Grade 4 Mathematics Practice Framework:
 * - Number (50%): Whole numbers, fractions, decimals, patterns
 * - Geometric Shapes & Measures (35%): Angles, 2D/3D shapes, nets, perimeter & area, coordinates
 * - Data Display (15%): Tables, pictographs, bar charts, line plots, pie charts
 * - Extended / Non-routine Reasoning: Multi-step constraint problems
 * 
 * Tailored for high-mastery elementary practice.
 */

const TIMSS_CURRICULUM = {
  domains: {
    geometry: {
      name: "Geometry & Shapes",
      icon: "📐",
      tag: "SPATIAL REASONING",
      desc: "Angles, 2D/3D shapes, nets, perimeter, area, and coordinate grids"
    },
    number: {
      name: "Number & Operations",
      icon: "🔢",
      tag: "ARITHMETIC & FRACTIONS",
      desc: "Place value, multi-digit operations, fractions, decimals, and patterns"
    },
    data: {
      name: "Data & Graphs",
      icon: "📊",
      tag: "DATA ANALYSIS",
      desc: "Bar graphs, line plots, frequency tables, and circle graphs"
    },
    extended: {
      name: "Advanced Reasoning",
      icon: "🚀",
      tag: "TIMSS 625+ REASONING",
      desc: "Non-routine, multi-step problem solving & logic puzzles"
    }
  },
  questions: [
  {
    "id": "timss_g4_01",
    "num": 1,
    "title": "Writing Numbers",
    "domain": "number",
    "domLabel": "Number & Operations",
    "cognitive": "Knowing",
    "standard": "4.NBT.2",
    "q": "<b>Three thousand twenty-three</b> can be written as:",
    "svg": null,
    "options": [
      "323",
      "3,023",
      "30,023",
      "300,023"
    ],
    "answer": 1,
    "hint": "Place value chart: 3 in thousands, 0 in hundreds, 2 in tens, 3 in ones = 3,023.",
    "explanation": "\u201cThree thousand\u201d = 3,000 and \u201ctwenty-three\u201d = 23. 3,000 + 23 = 3,023. There are no hundreds, so the hundreds digit is 0."
  },
  {
    "id": "timss_g4_02",
    "num": 2,
    "title": "The Rubbed-Out Digits",
    "domain": "number",
    "domLabel": "Number & Operations",
    "cognitive": "Knowing",
    "standard": "4.NBT.2, 4.NBT.1",
    "q": "Suhair wrote a number on the whiteboard. Then Samir rubbed out two of the digits.<br>Suhair's number had <b>6 tens</b> in it. Which could be Suhair's number?",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 350 108\" style=\"width:100%;max-width:350px\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"10.0\" y=\"8.0\" width=\"330.0\" height=\"86.0\" rx=\"7\" fill=\"#ffffff\" stroke=\"#8c8c8c\" stroke-width=\"4\"/><rect x=\"130.0\" y=\"94.0\" width=\"90.0\" height=\"7.0\" rx=\"2\" fill=\"#d9d9d9\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><rect x=\"30.0\" y=\"22.0\" width=\"58.0\" height=\"58.0\" rx=\"0\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><text x=\"59.0\" y=\"63.0\" text-anchor=\"middle\" font-size=\"34\" fill=\"#1b2a3a\" font-weight=\"600\">5</text><rect x=\"88.0\" y=\"22.0\" width=\"58.0\" height=\"58.0\" rx=\"0\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><text x=\"117.0\" y=\"63.0\" text-anchor=\"middle\" font-size=\"34\" fill=\"#1b2a3a\" font-weight=\"600\">6</text><polygon points=\"180.9,51.5 177.9,52.9 173.9,52.7 171.6,54.7 166.9,56.7 161.5,53.7 160.2,49.1 158.6,46.4 155.5,43.5 155.1,40.6 155.8,37.6 158.2,34.9 164.1,36.5 168.6,40.3 172.2,41.0 178.5,41.8 182.4,45.3 181.9,48.7\" fill=\"#d9d9d9\" fill-opacity=\"1\" stroke=\"none\" stroke-width=\"0\"/><polygon points=\"191.8,55.0 189.8,57.2 190.2,59.1 190.6,62.2 186.5,64.4 181.9,63.6 179.0,63.3 175.6,63.7 173.1,62.8 170.8,61.5 168.8,59.4 171.8,56.7 177.1,55.6 179.4,54.2 182.1,51.2 186.5,50.1 189.5,51.3 191.6,52.8\" fill=\"#d9d9d9\" fill-opacity=\"1\" stroke=\"none\" stroke-width=\"0\"/><polygon points=\"169.9,64.2 169.1,65.4 167.4,65.9 165.8,66.2 164.3,67.5 161.6,67.9 160.1,66.0 160.2,64.2 159.1,63.2 158.1,61.8 158.6,60.5 159.4,59.0 161.3,58.2 163.8,59.4 165.2,60.6 167.4,60.4 170.2,61.0 170.7,62.7\" fill=\"#d9d9d9\" fill-opacity=\"1\" stroke=\"none\" stroke-width=\"0\"/><line x1=\"158.0\" y1=\"52.0\" x2=\"190.0\" y2=\"44.0\" stroke=\"#cfcfcf\" stroke-width=\"3\"/><rect x=\"146.0\" y=\"22.0\" width=\"58.0\" height=\"58.0\" rx=\"0\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><polygon points=\"237.4,50.8 234.0,51.6 233.6,54.6 230.9,58.0 225.0,55.8 221.5,51.4 218.5,49.0 214.9,46.5 213.4,43.5 211.6,39.9 211.9,36.3 217.9,36.8 223.4,39.8 226.7,39.4 232.1,38.8 236.7,41.7 238.7,45.4 239.7,48.7\" fill=\"#d9d9d9\" fill-opacity=\"1\" stroke=\"none\" stroke-width=\"0\"/><polygon points=\"247.5,55.7 249.4,57.0 251.8,59.5 248.4,62.1 243.3,62.6 239.9,63.2 236.6,64.0 233.6,63.7 230.0,63.4 226.5,62.2 228.5,59.2 233.4,57.1 234.8,55.4 236.1,52.5 240.1,50.8 244.0,50.8 247.5,51.3 248.6,53.4\" fill=\"#d9d9d9\" fill-opacity=\"1\" stroke=\"none\" stroke-width=\"0\"/><polygon points=\"227.8,64.2 226.3,65.0 225.1,65.7 224.5,67.5 222.3,68.4 220.1,66.9 219.2,65.2 217.7,64.4 216.4,63.2 216.1,61.8 215.8,60.1 217.1,58.8 220.0,59.5 221.8,60.3 223.7,59.5 226.4,59.6 227.7,61.2 228.0,62.8\" fill=\"#d9d9d9\" fill-opacity=\"1\" stroke=\"none\" stroke-width=\"0\"/><line x1=\"216.0\" y1=\"52.0\" x2=\"248.0\" y2=\"44.0\" stroke=\"#cfcfcf\" stroke-width=\"3\"/><rect x=\"204.0\" y=\"22.0\" width=\"58.0\" height=\"58.0\" rx=\"0\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><rect x=\"262.0\" y=\"22.0\" width=\"58.0\" height=\"58.0\" rx=\"0\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><text x=\"291.0\" y=\"63.0\" text-anchor=\"middle\" font-size=\"34\" fill=\"#1b2a3a\" font-weight=\"600\">8</text></svg>",
    "options": [
      "56,668",
      "56,768",
      "56,868",
      "57,668"
    ],
    "answer": 0,
    "hint": "Line up columns: 7 + 1 = 8 in ones; 2 + 4 = 6 in tens; 1 + 5 = 6 in hundreds. Look for 56,668.",
    "explanation": "The number has 5 digits: 5 6 _ _ 8, so it is 56, _ _ 8. The tens digit is the 4th box. 6 tens means that box is 6: 56, _ 6 8. A has only 4 digits. B and C have 0 tens. Only D, 56,668, has 6 tens."
  },
  {
    "id": "timss_g4_03",
    "num": 3,
    "title": "Subtraction with Regrouping",
    "domain": "number",
    "domLabel": "Number & Operations",
    "cognitive": "Knowing",
    "standard": "4.NBT.4",
    "q": "Subtract. Show your working.<br><b>(a)</b>&nbsp; 428 \u2212 176 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>(b)</b>&nbsp; 4,809 \u2212 532",
    "svg": null,
    "options": [
      "252",
      "352",
      "242",
      "348"
    ],
    "answer": 0,
    "hint": "Regroup 1 hundred into 10 tens: 12 tens \u2212 7 tens = 5 tens! 3 hundreds \u2212 1 hundred = 2 hundreds.",
    "explanation": "(a) Ones: 8 \u2212 6 = 2. Tens: 2 \u2212 7 cannot be done, so regroup 1 hundred: 12 \u2212 7 = 5. Hundreds: 3 \u2212 1 = 2. Answer 252. (b) Ones: 9 \u2212 2 = 7. Tens: 0 \u2212 3 cannot be done, so regroup 1 hundred: 10 \u2212 3 = 7. Hundreds: 7 \u2212 5 = 2. Thousands: 4. Answer 4,277. Check by adding: 252 + 176 = 428 \u2713 and 4,277 + 532 = 4,809 \u2713."
  },
  {
    "id": "timss_g4_04",
    "num": 4,
    "title": "Rounding to the Nearest 100",
    "domain": "number",
    "domLabel": "Number & Operations",
    "cognitive": "Applying",
    "standard": "4.NBT.3",
    "q": "Hamad is rounding numbers to the nearest 100.<br><b>(a)</b> Write a number that is <b>less than 200</b> and rounds to 200.<br><b>(b)</b> Write a number, <b>other than 500</b>, that is more than 200 and rounds to 500.",
    "svg": null,
    "options": [
      "175",
      "149",
      "205",
      "139"
    ],
    "answer": 0,
    "hint": "Numbers from 150 to 199 are less than 200 and round up to 200 (tens digit is 5 or more)!",
    "explanation": "Rounding to the nearest 100: look at the tens digit. 50 or more rounds up; less than 50 rounds down. (a) Numbers from 150 to 199 round up to 200 and are less than 200 (e.g. 175). (b) Numbers from 450 to 549 round to 500. 500 itself is not allowed, so e.g. 480 or 520."
  },
  {
    "id": "timss_g4_05",
    "num": 5,
    "title": "Badreya's Number Puzzle",
    "domain": "number",
    "domLabel": "Number & Operations",
    "cognitive": "Reasoning",
    "standard": "4.NBT.2",
    "q": "Badreya made this puzzle about a 4-digit number:<br>&nbsp;&nbsp;\u2022 The <b>hundreds</b> digit is 7.<br>&nbsp;&nbsp;\u2022 The <b>thousands</b> digit is greater than the hundreds digit.<br>&nbsp;&nbsp;\u2022 The <b>ones</b> digit is less than the hundreds digit.<br>What is Badreya's number?",
    "svg": null,
    "options": [
      "2,876",
      "6,782",
      "8,726",
      "8,762"
    ],
    "answer": 2,
    "hint": "Even number ending in 6; hundreds digit 7 is greater than tens digit 2: 8,726.",
    "explanation": "All four numbers have 7 in the hundreds place. Thousands digit must be greater than 7 (8 or 9): this rules out A (2) and B (4). Ones digit must be less than 7: C ends in 6 \u2713, D ends in 8 \u2717. So the number is 8726."
  },
  {
    "id": "timss_g4_06",
    "num": 6,
    "title": "Division with a Remainder",
    "domain": "number",
    "domLabel": "Number & Operations",
    "cognitive": "Knowing",
    "standard": "4.NBT.6",
    "q": "Work out:&nbsp;&nbsp; 43 \u00f7 5 =",
    "svg": null,
    "options": [
      "8 remainder 3",
      "8 remainder 2",
      "7 remainder 4",
      "9 remainder 1"
    ],
    "answer": 0,
    "hint": "5 \u00d7 8 = 40, and 43 \u2212 40 = 3 left over!",
    "explanation": "5 \u00d7 8 = 40 and 5 \u00d7 9 = 45, which is too big. 43 \u2212 40 = 3 left over. 43 \u00f7 5 = 8 R 3."
  },
  {
    "id": "timss_g4_07",
    "num": 7,
    "title": "Planting Date Palms",
    "domain": "number",
    "domLabel": "Number & Operations",
    "cognitive": "Applying",
    "standard": "4.NBT.5, 4.OA.2",
    "q": "<b>(a)</b> Samir plants 8 trees in each of 5 rows. How many trees does he plant altogether?<br><b>(b)</b> A date farm in Al Ain has <b>24 rows</b> of palm trees with <b>36 trees</b> in each row. Use the area model to find how many trees there are altogether.",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 354 228\" style=\"width:100%;max-width:354px\" xmlns=\"http://www.w3.org/2000/svg\"><text x=\"196.0\" y=\"18.0\" text-anchor=\"middle\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">24 \u00d7 36</text><rect x=\"52.0\" y=\"50.0\" width=\"288.0\" height=\"168.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><line x1=\"292.0\" y1=\"50.0\" x2=\"292.0\" y2=\"218.0\" stroke=\"#1b2a3a\" stroke-width=\"2\"/><line x1=\"52.0\" y1=\"190.0\" x2=\"340.0\" y2=\"190.0\" stroke=\"#1b2a3a\" stroke-width=\"2\"/><text x=\"172.0\" y=\"41.0\" text-anchor=\"middle\" font-size=\"15\" fill=\"#1b2a3a\" font-weight=\"700\">30</text><text x=\"316.0\" y=\"41.0\" text-anchor=\"middle\" font-size=\"15\" fill=\"#1b2a3a\" font-weight=\"700\">6</text><text x=\"42.0\" y=\"125.0\" text-anchor=\"end\" font-size=\"15\" fill=\"#1b2a3a\" font-weight=\"700\">20</text><text x=\"42.0\" y=\"209.0\" text-anchor=\"end\" font-size=\"15\" fill=\"#1b2a3a\" font-weight=\"700\">4</text></svg>",
    "options": [
      "40 trees",
      "13 trees",
      "45 trees",
      "35 trees"
    ],
    "answer": 0,
    "hint": "8 trees \u00d7 5 rows = 40 trees altogether!",
    "explanation": "(a) 8 trees \u00d7 5 rows = 40 trees. (b) 20 \u00d7 30 = 600; 20 \u00d7 6 = 120; 4 \u00d7 30 = 120; 4 \u00d7 6 = 24. 600 + 120 + 120 + 24 = 864 trees."
  },
  {
    "id": "timss_g4_08",
    "num": 8,
    "title": "Buying Books",
    "domain": "number",
    "domLabel": "Number & Operations",
    "cognitive": "Applying",
    "standard": "4.OA.3, 4.NBT.6",
    "q": "Mariam has <b>AED 50</b>. Books cost <b>AED 12</b> each.<br>What is the greatest number of books Mariam can buy?",
    "svg": null,
    "options": [
      "4 books",
      "5 books",
      "3 books",
      "6 books"
    ],
    "answer": 0,
    "hint": "50 \u00f7 12 = 4 with AED 2 left over. A 5th book would cost AED 60, which is too much!",
    "explanation": "12, 24, 36, 48 \u2026 60 is more than 50. 50 \u00f7 12 = 4 remainder 2. She can buy 4 books and has AED 2 left (not enough for another book)."
  },
  {
    "id": "timss_g4_09",
    "num": 9,
    "title": "Estimating a Quotient",
    "domain": "number",
    "domLabel": "Number & Operations",
    "cognitive": "Knowing",
    "standard": "4.NBT.6, 4.NBT.3",
    "q": "Which number is closest in size to&nbsp; 1362 \u00f7 32?",
    "svg": null,
    "options": [
      "30",
      "40",
      "50",
      "60"
    ],
    "answer": 1,
    "hint": "Round 234 to 240. 240 \u00f7 6 = 40.",
    "explanation": "Use numbers that divide easily: 1362 is close to 1200, and 32 is close to 30. 1200 \u00f7 30 = 40. Check: 32 \u00d7 40 = 1280, which is close to 1362. 32 \u00d7 400 = 12,800 is far too big."
  },
  {
    "id": "timss_g4_10",
    "num": 10,
    "title": "Salama's Bracelets",
    "domain": "number",
    "domLabel": "Number & Operations",
    "cognitive": "Reasoning",
    "standard": "4.OA.3",
    "q": "Salama has <b>12</b> lengths of wire, <b>40</b> round beads and <b>48</b> flat beads.<br>She uses <b>1</b> length of wire, <b>10</b> round beads and <b>8</b> flat beads to make <b>1</b> bracelet.<br>If all her bracelets are the same, how many bracelets can she make?",
    "svg": null,
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "answer": 3,
    "hint": "Each bracelet uses 8 beads: 35 \u00f7 8 = 4 bracelets with 3 beads left over.",
    "explanation": "Wire: 12 \u00f7 1 = 12 bracelets. Round beads: 40 \u00f7 10 = 4 bracelets. Flat beads: 48 \u00f7 8 = 6 bracelets. She runs out of round beads first, so she can make only 4 bracelets."
  },
  {
    "id": "timss_g4_11",
    "num": 11,
    "title": "Multiples of 3",
    "domain": "number",
    "domLabel": "Number & Operations",
    "cognitive": "Knowing",
    "standard": "4.OA.4",
    "q": "Which set of numbers contains <b>ONLY</b> multiples of 3?",
    "svg": null,
    "options": [
      "6, 15, 21",
      "9, 14, 27",
      "3, 13, 23",
      "12, 18, 28"
    ],
    "answer": 0,
    "hint": "Check divisibility: 6 \u00f7 3 = 2, 15 \u00f7 3 = 5, 21 \u00f7 3 = 7. All are multiples of 3!",
    "explanation": "6 = 3 \u00d7 2, 15 = 3 \u00d7 5, 21 = 3 \u00d7 7 \u2014 all multiples of 3. B: 13 and 23 are not. C: 31 and 32 are not. D: 26 is not (26 \u00f7 3 = 8 R 2)."
  },
  {
    "id": "timss_g4_12",
    "num": 12,
    "title": "Factors of 24",
    "domain": "number",
    "domLabel": "Number & Operations",
    "cognitive": "Knowing",
    "standard": "4.OA.4",
    "q": "Hessa arranges <b>24</b> luqaimat in equal rows on a tray.<br><b>(a)</b> List <b>all</b> the factors of 24.<br><b>(b)</b> Is 24 a <b>prime</b> or a <b>composite</b> number? Tick one.&nbsp;&nbsp; \u2610 prime &nbsp;&nbsp; \u2610 composite",
    "svg": null,
    "options": [
      "1, 2, 3, 4, 6, 8, 12, 24",
      "2, 3, 4, 6, 8, 12",
      "1, 2, 4, 6, 12, 24",
      "1, 3, 8, 24"
    ],
    "answer": 0,
    "hint": "Factor pairs of 24: 1\u00d724, 2\u00d712, 3\u00d78, 4\u00d76. All 8 numbers are factors!",
    "explanation": "Factor pairs: 1 \u00d7 24, 2 \u00d7 12, 3 \u00d7 8, 4 \u00d7 6. Factors: 1, 2, 3, 4, 6, 8, 12, 24. 24 has more than two factors, so it is composite."
  },
  {
    "id": "timss_g4_13",
    "num": 13,
    "title": "Number Pattern",
    "domain": "number",
    "domLabel": "Number & Operations",
    "cognitive": "Applying",
    "standard": "4.OA.5",
    "q": "Hanif starts a number pattern:&nbsp;&nbsp; 6, 13, 20, 27, \u2026<br>He adds the same number each time. What is the <b>next</b> number in his pattern?",
    "svg": null,
    "options": [
      "34",
      "33",
      "35",
      "31"
    ],
    "answer": 0,
    "hint": "Find the pattern rule: 13 \u2212 6 = 7, 20 \u2212 13 = 7, 27 \u2212 20 = 7. Add 7: 27 + 7 = 34!",
    "explanation": "Differences: 13 \u2212 6 = 7, 20 \u2212 13 = 7, 27 \u2212 20 = 7. The rule is \u201cadd 7\u201d. 27 + 7 = 34."
  },
  {
    "id": "timss_g4_14",
    "num": 14,
    "title": "The 39th Sticker",
    "domain": "number",
    "domLabel": "Number & Operations",
    "cognitive": "Applying",
    "standard": "4.OA.5, 4.NBT.6",
    "q": "The pictures on a roll of stickers repeat every <b>four</b> stickers, as shown.<br>Which picture would be on the <b>39<sup>th</sup></b> sticker in the roll?",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 412 134\" style=\"width:100%;max-width:412px\" xmlns=\"http://www.w3.org/2000/svg\"><polygon points=\"370.0,12.0 18.0,12.0 14.0,17.5 18.0,23.0 14.0,28.5 18.0,34.0 14.0,39.5 18.0,45.0 14.0,50.5 18.0,56.0 370.0,56.0\" fill=\"#e6e6e6\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><line x1=\"62.0\" y1=\"14.0\" x2=\"62.0\" y2=\"54.0\" stroke=\"#555555\" stroke-width=\"1.4\" stroke-dasharray=\"3 3\"/><line x1=\"106.0\" y1=\"14.0\" x2=\"106.0\" y2=\"54.0\" stroke=\"#555555\" stroke-width=\"1.4\" stroke-dasharray=\"3 3\"/><line x1=\"150.0\" y1=\"14.0\" x2=\"150.0\" y2=\"54.0\" stroke=\"#555555\" stroke-width=\"1.4\" stroke-dasharray=\"3 3\"/><line x1=\"194.0\" y1=\"14.0\" x2=\"194.0\" y2=\"54.0\" stroke=\"#555555\" stroke-width=\"1.4\" stroke-dasharray=\"3 3\"/><line x1=\"238.0\" y1=\"14.0\" x2=\"238.0\" y2=\"54.0\" stroke=\"#555555\" stroke-width=\"1.4\" stroke-dasharray=\"3 3\"/><line x1=\"282.0\" y1=\"14.0\" x2=\"282.0\" y2=\"54.0\" stroke=\"#555555\" stroke-width=\"1.4\" stroke-dasharray=\"3 3\"/><line x1=\"326.0\" y1=\"14.0\" x2=\"326.0\" y2=\"54.0\" stroke=\"#555555\" stroke-width=\"1.4\" stroke-dasharray=\"3 3\"/><polygon points=\"40.0,19.0 43.7,28.9 54.3,29.4 46.0,35.9 48.8,46.1 40.0,40.3 31.2,46.1 34.0,35.9 25.7,29.4 36.3,28.9\" fill=\"#1b2a3a\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1\"/><polygon points=\"84.0,19.0 86.5,24.7 91.5,21.0 90.8,27.2 97.0,26.5 93.3,31.5 99.0,34.0 93.3,36.5 97.0,41.5 90.8,40.8 91.5,47.0 86.5,43.3 84.0,49.0 81.5,43.3 76.5,47.0 77.2,40.8 71.0,41.5 74.7,36.5 69.0,34.0 74.7,31.5 71.0,26.5 77.2,27.2 76.5,21.0 81.5,24.7\" fill=\"#1b2a3a\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1\"/><circle cx=\"128.0\" cy=\"34.0\" r=\"15.0\" fill=\"#1b2a3a\" stroke=\"#1b2a3a\" stroke-width=\"1\"/><circle cx=\"122.6\" cy=\"29.8\" r=\"1.9500000000000002\" fill=\"#fff\"/><circle cx=\"133.4\" cy=\"29.8\" r=\"1.9500000000000002\" fill=\"#fff\"/><path d=\"M120.5,36.2 Q128.0,44.8 135.5,36.2\" fill=\"none\" stroke=\"#fff\" stroke-width=\"1.9500000000000002\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><circle cx=\"172.0\" cy=\"34.0\" r=\"10.8\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"7.800000000000001\"/><polygon points=\"216.0,19.0 219.7,28.9 230.3,29.4 222.0,35.9 224.8,46.1 216.0,40.3 207.2,46.1 210.0,35.9 201.7,29.4 212.3,28.9\" fill=\"#1b2a3a\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1\"/><polygon points=\"260.0,19.0 262.5,24.7 267.5,21.0 266.8,27.2 273.0,26.5 269.3,31.5 275.0,34.0 269.3,36.5 273.0,41.5 266.8,40.8 267.5,47.0 262.5,43.3 260.0,49.0 257.5,43.3 252.5,47.0 253.2,40.8 247.0,41.5 250.7,36.5 245.0,34.0 250.7,31.5 247.0,26.5 253.2,27.2 252.5,21.0 257.5,24.7\" fill=\"#1b2a3a\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1\"/><circle cx=\"304.0\" cy=\"34.0\" r=\"15.0\" fill=\"#1b2a3a\" stroke=\"#1b2a3a\" stroke-width=\"1\"/><circle cx=\"298.6\" cy=\"29.8\" r=\"1.9500000000000002\" fill=\"#fff\"/><circle cx=\"309.4\" cy=\"29.8\" r=\"1.9500000000000002\" fill=\"#fff\"/><path d=\"M296.5,36.2 Q304.0,44.8 311.5,36.2\" fill=\"none\" stroke=\"#fff\" stroke-width=\"1.9500000000000002\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><circle cx=\"348.0\" cy=\"34.0\" r=\"10.8\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"7.800000000000001\"/><path d=\"M370,4 L370,64 A15.0,5 0 0 0 400,64 L400,4 Z\" fill=\"#e6e6e6\" stroke=\"#1b2a3a\" stroke-width=\"1.5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><ellipse cx=\"385.0\" cy=\"4\" rx=\"15.0\" ry=\"5\" fill=\"#f6f6f6\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><ellipse cx=\"385.0\" cy=\"4\" rx=\"5\" ry=\"2\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"40.0\" y=\"112.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">A</text><polygon points=\"80.0,88.0 84.4,99.9 97.1,100.4 87.2,108.3 90.6,120.6 80.0,113.6 69.4,120.6 72.8,108.3 62.9,100.4 75.6,99.9\" fill=\"#1b2a3a\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1\"/><text x=\"136.0\" y=\"112.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">B</text><polygon points=\"176.0,88.0 179.0,94.9 185.0,90.4 184.1,97.9 191.6,97.0 187.1,103.0 194.0,106.0 187.1,109.0 191.6,115.0 184.1,114.1 185.0,121.6 179.0,117.1 176.0,124.0 173.0,117.1 167.0,121.6 167.9,114.1 160.4,115.0 164.9,109.0 158.0,106.0 164.9,103.0 160.4,97.0 167.9,97.9 167.0,90.4 173.0,94.9\" fill=\"#1b2a3a\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1\"/><text x=\"232.0\" y=\"112.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">C</text><circle cx=\"272.0\" cy=\"106.0\" r=\"18.0\" fill=\"#1b2a3a\" stroke=\"#1b2a3a\" stroke-width=\"1\"/><circle cx=\"265.5\" cy=\"101.0\" r=\"2.34\" fill=\"#fff\"/><circle cx=\"278.5\" cy=\"101.0\" r=\"2.34\" fill=\"#fff\"/><path d=\"M263.0,108.7 Q272.0,119.0 281.0,108.7\" fill=\"none\" stroke=\"#fff\" stroke-width=\"2.34\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><text x=\"328.0\" y=\"112.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">D</text><circle cx=\"368.0\" cy=\"106.0\" r=\"13.0\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"9.36\"/></svg>",
    "options": [
      "Smiley Face",
      "Star",
      "Burst",
      "Ring"
    ],
    "answer": 0,
    "hint": "The pattern repeats every 4: 36 is a Ring (9\u00d74), 37 is Star, 38 is Burst, 39 is Smiley Face!",
    "explanation": "The pattern repeats every 4: 1 star, 2 burst, 3 smiley, 4 ring. Every multiple of 4 is a ring: 36 is a ring. 37 star, 38 burst, 39 smiley face. (39 = 4 \u00d7 9 + 3, remainder 3 \u2192 3rd picture.)"
  },
  {
    "id": "timss_g4_15",
    "num": 15,
    "title": "Green Planet Tickets",
    "domain": "number",
    "domLabel": "Number & Operations",
    "cognitive": "Reasoning",
    "standard": "4.OA.4, 4.OA.5",
    "q": "At <b>Green Planet</b> in Dubai, school tickets are sold only in <b>packs of 6</b>.<br>Saeed says, \u201cOur class bought exactly <b>40</b> tickets.\u201d<br>Could Saeed be right? <b>Explain</b> how you know.",
    "svg": null,
    "options": [
      "No, because 40 is not a multiple of 6 (40 \u00f7 6 = 6 R 4)",
      "Yes, 6 \u00d7 7 = 40",
      "Yes, 40 is an even number",
      "No, school tickets are only sold in singles"
    ],
    "answer": 0,
    "hint": "Multiples of 6 are 36, 42... 40 cannot be formed by whole packs of 6!",
    "explanation": "Packs of 6 give 6, 12, 18, 24, 30, 36, 42 \u2026 tickets. 40 is between 36 (6 packs) and 42 (7 packs), so it is not a multiple of 6. 40 \u00f7 6 = 6 R 4. So Saeed cannot be right."
  },
  {
    "id": "timss_g4_16",
    "num": 16,
    "title": "One Quarter Shaded",
    "domain": "number",
    "domLabel": "Number & Operations",
    "cognitive": "Knowing",
    "standard": "3.NF.1, 4.NF.1",
    "q": "Which rectangle is 1/4 shaded?",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 430 104\" style=\"width:100%;max-width:430px\" xmlns=\"http://www.w3.org/2000/svg\"><text x=\"8.0\" y=\"25.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">A</text><rect x=\"30.0\" y=\"10.0\" width=\"15.6\" height=\"84.0\" rx=\"0\" fill=\"#a6a6a6\" stroke=\"#1b2a3a\" stroke-width=\"0\"/><line x1=\"45.6\" y1=\"10.0\" x2=\"45.6\" y2=\"94.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"61.2\" y1=\"10.0\" x2=\"61.2\" y2=\"94.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"76.8\" y1=\"10.0\" x2=\"76.8\" y2=\"94.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"92.4\" y1=\"10.0\" x2=\"92.4\" y2=\"94.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><rect x=\"30.0\" y=\"10.0\" width=\"78.0\" height=\"84.0\" rx=\"0\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><text x=\"112.0\" y=\"25.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">B</text><rect x=\"134.0\" y=\"10.0\" width=\"26.0\" height=\"84.0\" rx=\"0\" fill=\"#a6a6a6\" stroke=\"#1b2a3a\" stroke-width=\"0\"/><line x1=\"160.0\" y1=\"10.0\" x2=\"160.0\" y2=\"94.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"186.0\" y1=\"10.0\" x2=\"186.0\" y2=\"94.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><rect x=\"134.0\" y=\"10.0\" width=\"78.0\" height=\"84.0\" rx=\"0\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><text x=\"216.0\" y=\"25.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">C</text><rect x=\"238.0\" y=\"10.0\" width=\"39.0\" height=\"26.9\" rx=\"0\" fill=\"#a6a6a6\" stroke=\"#1b2a3a\" stroke-width=\"0\"/><line x1=\"277.0\" y1=\"10.0\" x2=\"277.0\" y2=\"94.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"238.0\" y1=\"36.9\" x2=\"316.0\" y2=\"36.9\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><rect x=\"238.0\" y=\"10.0\" width=\"78.0\" height=\"84.0\" rx=\"0\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><text x=\"320.0\" y=\"25.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">D</text><rect x=\"342.0\" y=\"10.0\" width=\"19.5\" height=\"84.0\" rx=\"0\" fill=\"#a6a6a6\" stroke=\"#1b2a3a\" stroke-width=\"0\"/><line x1=\"361.5\" y1=\"10.0\" x2=\"361.5\" y2=\"94.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"381.0\" y1=\"10.0\" x2=\"381.0\" y2=\"94.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"400.5\" y1=\"10.0\" x2=\"400.5\" y2=\"94.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><rect x=\"342.0\" y=\"10.0\" width=\"78.0\" height=\"84.0\" rx=\"0\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/></svg>",
    "options": [
      "Rectangle D",
      "Rectangle A",
      "Rectangle B",
      "Rectangle C"
    ],
    "answer": 0,
    "hint": "Fractions require EQUAL parts. Rectangle D has 4 equal sections with 1 shaded (1/4)!",
    "explanation": "A shows 1 of 5 equal parts (1/5). B shows 1 of 3 equal parts (1/3). C has 4 parts, but they are not equal, so it is not 1/4. D shows 1 of 4 equal parts: 1/4 \u2713."
  },
  {
    "id": "timss_g4_17",
    "num": 17,
    "title": "Fraction of a Set",
    "domain": "number",
    "domLabel": "Number & Operations",
    "cognitive": "Knowing",
    "standard": "3.NF.1, 4.NF.1",
    "q": "<b>(a)</b> What fraction of this set of 10 circles is <b>black</b>?<br><b>(b)</b> Write an <b>equivalent fraction</b> for your answer.",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 312 208\" style=\"width:100%;max-width:312px\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"67.4\" cy=\"35.2\" r=\"12.5\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><circle cx=\"118.0\" cy=\"83.5\" r=\"12.5\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><circle cx=\"182.4\" cy=\"99.6\" r=\"12.5\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><circle cx=\"231.9\" cy=\"129.6\" r=\"12.5\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><circle cx=\"67.4\" cy=\"153.7\" r=\"12.5\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><circle cx=\"112.3\" cy=\"185.9\" r=\"12.5\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><circle cx=\"166.3\" cy=\"50.2\" r=\"12.5\" fill=\"#1b2a3a\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><circle cx=\"37.5\" cy=\"91.6\" r=\"12.5\" fill=\"#1b2a3a\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><circle cx=\"166.3\" cy=\"158.3\" r=\"12.5\" fill=\"#1b2a3a\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><circle cx=\"275.6\" cy=\"181.3\" r=\"12.5\" fill=\"#1b2a3a\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/></svg>",
    "options": [
      "4/10 (or 2/5)",
      "4/6",
      "1/4",
      "6/10"
    ],
    "answer": 0,
    "hint": "4 black circles out of 10 total circles = 4/10. Divide top and bottom by 2 to get 2/5!",
    "explanation": "Count: 4 black circles out of 10 circles \u2192 4/10. Divide top and bottom by 2: 4/10 = 2/5 (or multiply by 2: 8/20)."
  },
  {
    "id": "timss_g4_18",
    "num": 18,
    "title": "The Largest Fraction",
    "domain": "number",
    "domLabel": "Number & Operations",
    "cognitive": "Knowing",
    "standard": "3.NF.3d, 4.NF.2",
    "q": "Which is the <b>LARGEST</b> fraction?",
    "svg": null,
    "options": [
      "1/2",
      "1/3",
      "1/4",
      "1/8"
    ],
    "answer": 0,
    "hint": "When unit fractions have numerator 1, the smaller denominator gives the larger share: 1/2 is biggest!",
    "explanation": "All the numerators are 1. The fewer equal parts the whole is cut into, the bigger each part. 1/2 > 1/3 > 1/4 > 1/5, so the largest is 1/2."
  },
  {
    "id": "timss_g4_19",
    "num": 19,
    "title": "Hessa's Walk to School",
    "domain": "number",
    "domLabel": "Number & Operations",
    "cognitive": "Applying",
    "standard": "4.NF.3, 4.NF.4",
    "q": "Hessa walks 3/10 km from home to school and 3/10 km back home again every school day.<br><b>(a)</b> How far does she walk in <b>one day</b>?<br><b>(b)</b> How far does she walk in <b>5 days</b>? Write your answer as a fraction and as a whole number of kilometres.",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 448 92\" style=\"width:100%;max-width:448px\" xmlns=\"http://www.w3.org/2000/svg\"><line x1=\"34.0\" y1=\"52.0\" x2=\"414.0\" y2=\"52.0\" stroke=\"#1b2a3a\" stroke-width=\"2\"/><line x1=\"34.0\" y1=\"41.0\" x2=\"34.0\" y2=\"63.0\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><line x1=\"72.0\" y1=\"44.0\" x2=\"72.0\" y2=\"60.0\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><line x1=\"110.0\" y1=\"44.0\" x2=\"110.0\" y2=\"60.0\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><line x1=\"148.0\" y1=\"44.0\" x2=\"148.0\" y2=\"60.0\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><line x1=\"186.0\" y1=\"44.0\" x2=\"186.0\" y2=\"60.0\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><line x1=\"224.0\" y1=\"44.0\" x2=\"224.0\" y2=\"60.0\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><line x1=\"262.0\" y1=\"44.0\" x2=\"262.0\" y2=\"60.0\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><line x1=\"300.0\" y1=\"44.0\" x2=\"300.0\" y2=\"60.0\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><line x1=\"338.0\" y1=\"44.0\" x2=\"338.0\" y2=\"60.0\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><line x1=\"376.0\" y1=\"44.0\" x2=\"376.0\" y2=\"60.0\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><line x1=\"414.0\" y1=\"41.0\" x2=\"414.0\" y2=\"63.0\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><text x=\"34.0\" y=\"82.0\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">0 km</text><text x=\"414.0\" y=\"82.0\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">1 km</text><circle cx=\"34.0\" cy=\"52.0\" r=\"5.5\" fill=\"#1b2a3a\"/><text x=\"34.0\" y=\"32.0\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">Home</text><circle cx=\"148.0\" cy=\"52.0\" r=\"5.5\" fill=\"#1b2a3a\"/><text x=\"148.0\" y=\"32.0\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">School</text></svg>",
    "options": [
      "6/10 km",
      "6/20 km",
      "9/10 km",
      "1 km"
    ],
    "answer": 0,
    "hint": "3/10 + 3/10 = 6/10 km (keep the same denominator 10)!",
    "explanation": "(a) 3/10 + 3/10 = 6/10 km (keep the denominator 10). (b) 5 \u00d7 6/10 = 30/10 km. 30 tenths = 3 wholes, so 3 km."
  },
  {
    "id": "timss_g4_20",
    "num": 20,
    "title": "Three-Eighths of a Circle",
    "domain": "number",
    "domLabel": "Number & Operations",
    "cognitive": "Reasoning",
    "standard": "4.NF.1, 3.NF.1",
    "q": "<b>(a)</b> Which circle has 3/8 of its area shaded?<br><b>(b)</b> <b>Explain</b> or show why your answer is correct.",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 438 104\" style=\"width:100%;max-width:438px\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M66.0,52.0 L66.0,10.0 A42,42 0 1 1 24.0,52.0 Z\" fill=\"#a6a6a6\" stroke=\"#1b2a3a\" stroke-width=\"1.7\" stroke-linejoin=\"round\"/><circle cx=\"66.0\" cy=\"52.0\" r=\"42.0\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><text x=\"2.0\" y=\"22.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">A</text><path d=\"M172.0,52.0 L172.0,10.0 A42,42 0 1 1 142.3,81.7 Z\" fill=\"#a6a6a6\" stroke=\"#1b2a3a\" stroke-width=\"1.7\" stroke-linejoin=\"round\"/><circle cx=\"172.0\" cy=\"52.0\" r=\"42.0\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><text x=\"108.0\" y=\"22.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">B</text><path d=\"M278.0,52.0 L278.0,10.0 A42,42 0 0 1 307.7,81.7 Z\" fill=\"#a6a6a6\" stroke=\"#1b2a3a\" stroke-width=\"1.7\" stroke-linejoin=\"round\"/><circle cx=\"278.0\" cy=\"52.0\" r=\"42.0\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><text x=\"214.0\" y=\"22.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">C</text><path d=\"M384.0,52.0 L384.0,10.0 A42,42 0 0 1 426.0,52.0 Z\" fill=\"#a6a6a6\" stroke=\"#1b2a3a\" stroke-width=\"1.7\" stroke-linejoin=\"round\"/><circle cx=\"384.0\" cy=\"52.0\" r=\"42.0\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><text x=\"320.0\" y=\"22.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">D</text></svg>",
    "options": [
      "Circle C",
      "Circle A",
      "Circle B",
      "Circle D"
    ],
    "answer": 0,
    "hint": "Circle C shows 3 of 8 equal parts shaded: 3/8!",
    "explanation": "Cut each circle into 8 equal slices (each slice is 1/8). A: 6/8 shaded. B: 5/8 shaded. D: 2/8 (= 1/4) shaded. C: a quarter (2 slices) and half of the next quarter (1 slice) = 3/8."
  },
  {
    "id": "timss_g4_21",
    "num": 21,
    "title": "The Smallest Decimal",
    "domain": "number",
    "domLabel": "Number & Operations",
    "cognitive": "Knowing",
    "standard": "4.NF.7",
    "q": "Which is the <b>SMALLEST</b> number?",
    "svg": null,
    "options": [
      "0.3",
      "0.03",
      "0.33",
      "3.0"
    ],
    "answer": 1,
    "hint": "Look at place values: 0.03 is 3 hundredths, whereas 0.3 is 30 hundredths!",
    "explanation": "Write each with two decimal places: 0.20, 0.03, 0.23, 0.30. 0.03 has 0 tenths, so it is the smallest: 0.03."
  },
  {
    "id": "timss_g4_22",
    "num": 22,
    "title": "Adding Decimals",
    "domain": "number",
    "domLabel": "Number & Operations",
    "cognitive": "Knowing",
    "standard": "4.NF.5, 4.NF.6 (5.NBT.7)",
    "q": "Add:&nbsp;&nbsp; 0.36 + 0.77",
    "svg": null,
    "options": [
      "1.13",
      "1.03",
      "1.15",
      "0.93"
    ],
    "answer": 0,
    "hint": "Line up decimals: 0.75 + 0.38 = 1.13 (5 + 8 = 13; 7 + 3 + 1 = 11 tenths = 1.1).",
    "explanation": "Hundredths: 6 + 7 = 13 \u2192 write 3, carry 1 tenth. Tenths: 3 + 7 + 1 = 11 \u2192 write 1, carry 1 one. Ones: 1. Answer 1.13. (Check: 36 + 77 = 113 hundredths.)"
  },
  {
    "id": "timss_g4_23",
    "num": 23,
    "title": "Shopping at the Book Fair",
    "domain": "number",
    "domLabel": "Number & Operations",
    "cognitive": "Applying",
    "standard": "4.MD.2 (5.NBT.7)",
    "q": "Jameel has <b>AED 20</b>. He buys a book for <b>AED 3.65</b> and a magazine for <b>AED 2.70</b>.<br>How much money does Jameel have left?",
    "svg": null,
    "options": [
      "AED 12.35",
      "AED 13.65",
      "AED 14.35",
      "AED 15.65"
    ],
    "answer": 1,
    "hint": "AED 20.00 \u2212 AED 6.35 = AED 13.65.",
    "explanation": "Total spent: 3.65 + 2.70 = AED 6.35. Money left: 20.00 \u2212 6.35 = AED 13.65. Check: 13.65 + 6.35 = 20.00 \u2713."
  },
  {
    "id": "timss_g4_24",
    "num": 24,
    "title": "Missing Numbers",
    "domain": "number",
    "domLabel": "Number & Operations",
    "cognitive": "Applying",
    "standard": "4.OA.3 (3.OA.4)",
    "q": "Find the number that makes each number sentence true.<br><b>(a)</b>&nbsp; 6 + 15 = \u25b3 + 10 &nbsp;&nbsp;&nbsp;&nbsp; <b>(b)</b>&nbsp; \u2610 \u2212 87 = 23",
    "svg": null,
    "options": [
      "110",
      "180",
      "70",
      "11"
    ],
    "answer": 0,
    "hint": "\u25b3 = 18 \u2212 7 = 11. Then \u2610 = 11 \u00d7 10 = 110!",
    "explanation": "(a) Left side: 6 + 15 = 21. So \u25b3 + 10 = 21 and \u25b3 = 21 \u2212 10 = 11. (b) Use the inverse: \u2610 = 23 + 87 = 110. Check: 11 + 10 = 21 \u2713 and 110 \u2212 87 = 23 \u2713."
  },
  {
    "id": "timss_g4_25",
    "num": 25,
    "title": "Number-Line Game",
    "domain": "number",
    "domLabel": "Number & Operations",
    "cognitive": "Reasoning",
    "standard": "4.NBT.4, 2.MD.6",
    "q": "Aisha and Saeed play a game on this number line. Each move can be to the <b>right</b> or to the <b>left</b>.<br><b>(a)</b> Aisha begins at 27 and moves 10 units. She ends on 17. Which <b>other</b> point could she have ended on?<br><b>(b)</b> Saeed begins at 35 and moves 13 units to the left. His next move is 2 units. Which point could he end on?&nbsp; <b>A</b> 22 &nbsp; <b>B</b> 24 &nbsp; <b>C</b> 48 &nbsp; <b>D</b> 50",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 440 66\" style=\"width:100%;max-width:440px\" xmlns=\"http://www.w3.org/2000/svg\"><line x1=\"14.0\" y1=\"26.0\" x2=\"426.0\" y2=\"26.0\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><line x1=\"30.0\" y1=\"17.0\" x2=\"30.0\" y2=\"35.0\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><text x=\"30.0\" y=\"56.0\" text-anchor=\"middle\" font-size=\"15\" fill=\"#1b2a3a\">10</text><line x1=\"77.5\" y1=\"17.0\" x2=\"77.5\" y2=\"35.0\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><text x=\"77.5\" y=\"56.0\" text-anchor=\"middle\" font-size=\"15\" fill=\"#1b2a3a\">15</text><line x1=\"125.0\" y1=\"17.0\" x2=\"125.0\" y2=\"35.0\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><text x=\"125.0\" y=\"56.0\" text-anchor=\"middle\" font-size=\"15\" fill=\"#1b2a3a\">20</text><line x1=\"172.5\" y1=\"17.0\" x2=\"172.5\" y2=\"35.0\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><text x=\"172.5\" y=\"56.0\" text-anchor=\"middle\" font-size=\"15\" fill=\"#1b2a3a\">25</text><line x1=\"220.0\" y1=\"17.0\" x2=\"220.0\" y2=\"35.0\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><text x=\"220.0\" y=\"56.0\" text-anchor=\"middle\" font-size=\"15\" fill=\"#1b2a3a\">30</text><line x1=\"267.5\" y1=\"17.0\" x2=\"267.5\" y2=\"35.0\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><text x=\"267.5\" y=\"56.0\" text-anchor=\"middle\" font-size=\"15\" fill=\"#1b2a3a\">35</text><line x1=\"315.0\" y1=\"17.0\" x2=\"315.0\" y2=\"35.0\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><text x=\"315.0\" y=\"56.0\" text-anchor=\"middle\" font-size=\"15\" fill=\"#1b2a3a\">40</text><line x1=\"362.5\" y1=\"17.0\" x2=\"362.5\" y2=\"35.0\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><text x=\"362.5\" y=\"56.0\" text-anchor=\"middle\" font-size=\"15\" fill=\"#1b2a3a\">45</text><line x1=\"410.0\" y1=\"17.0\" x2=\"410.0\" y2=\"35.0\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><text x=\"410.0\" y=\"56.0\" text-anchor=\"middle\" font-size=\"15\" fill=\"#1b2a3a\">50</text></svg>",
    "options": [
      "35",
      "30",
      "40",
      "25"
    ],
    "answer": 0,
    "hint": "Halfway between 20 and 50 is (20 + 50) \u00f7 2 = 70 \u00f7 2 = 35!",
    "explanation": "(a) Moving left: 27 \u2212 10 = 17 (given). Moving right: 27 + 10 = 37. (b) 35 \u2212 13 = 22. A move of 2 can go left (20) or right (24). Only 24 is an option, so B."
  },
  {
    "id": "timss_g4_26",
    "num": 26,
    "title": "Parallel Lines",
    "domain": "geometry",
    "domLabel": "Geometry & Shapes",
    "cognitive": "Knowing",
    "standard": "4.G.1",
    "q": "Which diagram shows a pair of <b>parallel</b> lines?",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 400 208\" style=\"width:100%;max-width:400px\" xmlns=\"http://www.w3.org/2000/svg\"><text x=\"8.0\" y=\"22.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">A</text><line x1=\"46.0\" y1=\"12.0\" x2=\"153.0\" y2=\"48.0\" stroke=\"#1b2a3a\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><line x1=\"44.0\" y1=\"60.0\" x2=\"151.0\" y2=\"96.0\" stroke=\"#1b2a3a\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><text x=\"208.0\" y=\"22.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">B</text><line x1=\"246.0\" y1=\"24.0\" x2=\"358.0\" y2=\"12.0\" stroke=\"#1b2a3a\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><line x1=\"245.0\" y1=\"38.0\" x2=\"352.0\" y2=\"74.0\" stroke=\"#1b2a3a\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><text x=\"8.0\" y=\"126.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">C</text><line x1=\"46.0\" y1=\"116.0\" x2=\"46.0\" y2=\"172.0\" stroke=\"#1b2a3a\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><line x1=\"46.0\" y1=\"144.0\" x2=\"152.0\" y2=\"144.0\" stroke=\"#1b2a3a\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><text x=\"208.0\" y=\"126.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">D</text><line x1=\"256.0\" y1=\"116.0\" x2=\"363.0\" y2=\"152.0\" stroke=\"#1b2a3a\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><line x1=\"246.0\" y1=\"137.0\" x2=\"359.0\" y2=\"124.0\" stroke=\"#1b2a3a\" stroke-width=\"2.2\" stroke-linecap=\"round\"/></svg>",
    "options": [
      "Diagram A",
      "Diagram B",
      "Diagram C",
      "Diagram D"
    ],
    "answer": 0,
    "hint": "Diagram A shows two lines that never intersect and remain equidistant: parallel lines!",
    "explanation": "A: both lines slope the same way and stay the same distance apart \u2192 parallel \u2713. B: they get further apart, so they would meet if extended to the left. C: they meet at a right angle (perpendicular). D: they cross."
  },
  {
    "id": "timss_g4_27",
    "num": 27,
    "title": "Perpendicular to the Wall",
    "domain": "geometry",
    "domLabel": "Geometry & Shapes",
    "cognitive": "Applying",
    "standard": "4.G.1",
    "q": "The picture shows a ladder leaning against a wall.<br>Use a ruler to draw a line from point <b>A</b> that is <b>perpendicular</b> to the wall.",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 214 230\" style=\"width:100%;max-width:214px\" xmlns=\"http://www.w3.org/2000/svg\"><line x1=\"40.0\" y1=\"10.0\" x2=\"40.0\" y2=\"224.0\" stroke=\"#1b2a3a\" stroke-width=\"5\"/><line x1=\"38.0\" y1=\"224.0\" x2=\"206.0\" y2=\"224.0\" stroke=\"#1b2a3a\" stroke-width=\"2\"/><line x1=\"40.6\" y1=\"36.5\" x2=\"127.9\" y2=\"224.0\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><line x1=\"51.4\" y1=\"31.5\" x2=\"141.1\" y2=\"224.0\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><line x1=\"44.2\" y1=\"44.3\" x2=\"55.2\" y2=\"39.5\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><line x1=\"51.5\" y1=\"60.0\" x2=\"62.6\" y2=\"55.5\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><line x1=\"58.8\" y1=\"75.6\" x2=\"70.1\" y2=\"71.6\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><line x1=\"66.0\" y1=\"91.2\" x2=\"77.6\" y2=\"87.6\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><line x1=\"73.3\" y1=\"106.8\" x2=\"85.1\" y2=\"103.7\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><line x1=\"80.6\" y1=\"122.5\" x2=\"92.5\" y2=\"119.7\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><line x1=\"87.9\" y1=\"138.1\" x2=\"100.0\" y2=\"135.8\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><line x1=\"95.1\" y1=\"153.7\" x2=\"107.5\" y2=\"151.8\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><line x1=\"102.4\" y1=\"169.3\" x2=\"115.0\" y2=\"167.8\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><line x1=\"109.7\" y1=\"184.9\" x2=\"122.4\" y2=\"183.9\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><line x1=\"117.0\" y1=\"200.6\" x2=\"129.9\" y2=\"199.9\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><line x1=\"124.2\" y1=\"216.2\" x2=\"137.4\" y2=\"216.0\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><circle cx=\"90.2\" cy=\"129.0\" r=\"4.5\" fill=\"#1b2a3a\"/><text x=\"106.2\" y=\"135.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\" font-style=\"italic\">A</text></svg>",
    "options": [
      "A horizontal line meeting the wall at a 90\u00b0 right angle",
      "A 45\u00b0 diagonal line sloping down",
      "A line parallel to the vertical wall",
      "A curved line reaching the floor"
    ],
    "answer": 0,
    "hint": "Perpendicular means meeting at a 90\u00b0 square right angle!",
    "explanation": "The wall is vertical. A line perpendicular to a vertical line is horizontal. Draw a straight horizontal line from A across to the wall (90\u00b0 at the wall)."
  },
  {
    "id": "timss_g4_28",
    "num": 28,
    "title": "Measuring Angles",
    "domain": "geometry",
    "domLabel": "Geometry & Shapes",
    "cognitive": "Applying",
    "standard": "4.MD.6, 4.MD.7",
    "q": "<b>(a)</b> What is the size of the angle shown on the protractor?<br><b>(b)</b> A right angle is split into two parts. One part is 35\u00b0. Find angle <b>b</b>.",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 440 194\" style=\"width:100%;max-width:440px\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M6,188 L6,176 A166,166 0 0 1 338,176 L338,188 Z\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"6.0\" y1=\"176.0\" x2=\"338.0\" y2=\"176.0\" stroke=\"#1b2a3a\" stroke-width=\"1.2\"/><path d=\"M56,176 A116,116 0 0 1 288,176\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"1.2\"/><line x1=\"338.0\" y1=\"176.0\" x2=\"327.0\" y2=\"176.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"288.0\" y1=\"176.0\" x2=\"295.0\" y2=\"176.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"337.4\" y1=\"161.5\" x2=\"332.4\" y2=\"162.0\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"287.6\" y1=\"165.9\" x2=\"291.0\" y2=\"165.6\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"335.5\" y1=\"147.2\" x2=\"324.6\" y2=\"149.1\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"286.2\" y1=\"155.9\" x2=\"293.1\" y2=\"154.6\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"332.3\" y1=\"133.0\" x2=\"327.5\" y2=\"134.3\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"284.0\" y1=\"146.0\" x2=\"287.4\" y2=\"145.1\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"328.0\" y1=\"119.2\" x2=\"317.7\" y2=\"123.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"281.0\" y1=\"136.3\" x2=\"287.6\" y2=\"133.9\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"322.4\" y1=\"105.8\" x2=\"317.9\" y2=\"108.0\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"277.1\" y1=\"127.0\" x2=\"280.3\" y2=\"125.5\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"315.8\" y1=\"93.0\" x2=\"306.2\" y2=\"98.5\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"272.5\" y1=\"118.0\" x2=\"278.5\" y2=\"114.5\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"308.0\" y1=\"80.8\" x2=\"303.9\" y2=\"83.7\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"267.0\" y1=\"109.5\" x2=\"269.9\" y2=\"107.5\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"299.2\" y1=\"69.3\" x2=\"290.7\" y2=\"76.4\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"260.9\" y1=\"101.4\" x2=\"266.2\" y2=\"96.9\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"289.4\" y1=\"58.6\" x2=\"285.8\" y2=\"62.2\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"254.0\" y1=\"94.0\" x2=\"256.5\" y2=\"91.5\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"278.7\" y1=\"48.8\" x2=\"271.6\" y2=\"57.3\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"246.6\" y1=\"87.1\" x2=\"251.1\" y2=\"81.8\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"267.2\" y1=\"40.0\" x2=\"264.3\" y2=\"44.1\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"238.5\" y1=\"81.0\" x2=\"240.5\" y2=\"78.1\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"255.0\" y1=\"32.2\" x2=\"249.5\" y2=\"41.8\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"230.0\" y1=\"75.5\" x2=\"233.5\" y2=\"69.5\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"242.2\" y1=\"25.6\" x2=\"240.0\" y2=\"30.1\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"221.0\" y1=\"70.9\" x2=\"222.5\" y2=\"67.7\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"228.8\" y1=\"20.0\" x2=\"225.0\" y2=\"30.3\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"211.7\" y1=\"67.0\" x2=\"214.1\" y2=\"60.4\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"215.0\" y1=\"15.7\" x2=\"213.7\" y2=\"20.5\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"202.0\" y1=\"64.0\" x2=\"202.9\" y2=\"60.6\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"200.8\" y1=\"12.5\" x2=\"198.9\" y2=\"23.4\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"192.1\" y1=\"61.8\" x2=\"193.4\" y2=\"54.9\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"186.5\" y1=\"10.6\" x2=\"186.0\" y2=\"15.6\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"182.1\" y1=\"60.4\" x2=\"182.4\" y2=\"57.0\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"172.0\" y1=\"10.0\" x2=\"172.0\" y2=\"21.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"172.0\" y1=\"60.0\" x2=\"172.0\" y2=\"53.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"157.5\" y1=\"10.6\" x2=\"158.0\" y2=\"15.6\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"161.9\" y1=\"60.4\" x2=\"161.6\" y2=\"57.0\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"143.2\" y1=\"12.5\" x2=\"145.1\" y2=\"23.4\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"151.9\" y1=\"61.8\" x2=\"150.6\" y2=\"54.9\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"129.0\" y1=\"15.7\" x2=\"130.3\" y2=\"20.5\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"142.0\" y1=\"64.0\" x2=\"141.1\" y2=\"60.6\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"115.2\" y1=\"20.0\" x2=\"119.0\" y2=\"30.3\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"132.3\" y1=\"67.0\" x2=\"129.9\" y2=\"60.4\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"101.8\" y1=\"25.6\" x2=\"104.0\" y2=\"30.1\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"123.0\" y1=\"70.9\" x2=\"121.5\" y2=\"67.7\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"89.0\" y1=\"32.2\" x2=\"94.5\" y2=\"41.8\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"114.0\" y1=\"75.5\" x2=\"110.5\" y2=\"69.5\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"76.8\" y1=\"40.0\" x2=\"79.7\" y2=\"44.1\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"105.5\" y1=\"81.0\" x2=\"103.5\" y2=\"78.1\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"65.3\" y1=\"48.8\" x2=\"72.4\" y2=\"57.3\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"97.4\" y1=\"87.1\" x2=\"92.9\" y2=\"81.8\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"54.6\" y1=\"58.6\" x2=\"58.2\" y2=\"62.2\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"90.0\" y1=\"94.0\" x2=\"87.5\" y2=\"91.5\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"44.8\" y1=\"69.3\" x2=\"53.3\" y2=\"76.4\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"83.1\" y1=\"101.4\" x2=\"77.8\" y2=\"96.9\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"36.0\" y1=\"80.8\" x2=\"40.1\" y2=\"83.7\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"77.0\" y1=\"109.5\" x2=\"74.1\" y2=\"107.5\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"28.2\" y1=\"93.0\" x2=\"37.8\" y2=\"98.5\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"71.5\" y1=\"118.0\" x2=\"65.5\" y2=\"114.5\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"21.6\" y1=\"105.8\" x2=\"26.1\" y2=\"108.0\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"66.9\" y1=\"127.0\" x2=\"63.7\" y2=\"125.5\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"16.0\" y1=\"119.2\" x2=\"26.3\" y2=\"123.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"63.0\" y1=\"136.3\" x2=\"56.4\" y2=\"133.9\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"11.7\" y1=\"133.0\" x2=\"16.5\" y2=\"134.3\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"60.0\" y1=\"146.0\" x2=\"56.6\" y2=\"145.1\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"8.5\" y1=\"147.2\" x2=\"19.4\" y2=\"149.1\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"57.8\" y1=\"155.9\" x2=\"50.9\" y2=\"154.6\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"6.6\" y1=\"161.5\" x2=\"11.6\" y2=\"162.0\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"56.4\" y1=\"165.9\" x2=\"53.0\" y2=\"165.6\" stroke=\"#1b2a3a\" stroke-width=\"1.0\"/><line x1=\"6.0\" y1=\"176.0\" x2=\"17.0\" y2=\"176.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"56.0\" y1=\"176.0\" x2=\"49.0\" y2=\"176.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"172.0\" y1=\"176.0\" x2=\"344.0\" y2=\"176.0\" stroke=\"#1b2a3a\" stroke-width=\"2.6\"/><line x1=\"172.0\" y1=\"176.0\" x2=\"58.9\" y2=\"41.2\" stroke=\"#1b2a3a\" stroke-width=\"2.6\"/><circle cx=\"172.0\" cy=\"176.0\" r=\"4.5\" fill=\"#1b2a3a\"/><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"322.0\" y=\"172.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">180</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"302.0\" y=\"172.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">0</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"315.2\" y=\"150.8\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(80 315.2 150.8)\">170</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"295.5\" y=\"154.2\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(80 295.5 154.2)\">10</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"308.6\" y=\"126.3\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(70 308.6 126.3)\">160</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"289.8\" y=\"133.1\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(70 289.8 133.1)\">20</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"297.9\" y=\"103.3\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(60 297.9 103.3)\">150</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"280.6\" y=\"113.3\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(60 280.6 113.3)\">30</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"283.4\" y=\"82.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(50 283.4 82.5)\">140</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"268.1\" y=\"95.4\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(50 268.1 95.4)\">40</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"265.5\" y=\"64.6\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(40 265.5 64.6)\">130</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"252.6\" y=\"79.9\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(40 252.6 79.9)\">50</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"244.7\" y=\"50.1\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(30 244.7 50.1)\">120</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"234.7\" y=\"67.4\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(30 234.7 67.4)\">60</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"221.7\" y=\"39.4\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(20 221.7 39.4)\">110</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"214.9\" y=\"58.2\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(20 214.9 58.2)\">70</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"197.2\" y=\"32.8\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(10 197.2 32.8)\">100</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"193.8\" y=\"52.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(10 193.8 52.5)\">80</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"172.0\" y=\"30.6\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(0 172.0 30.6)\">90</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"172.0\" y=\"50.6\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(0 172.0 50.6)\">90</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"146.8\" y=\"32.8\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(-10 146.8 32.8)\">80</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"150.2\" y=\"52.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(-10 150.2 52.5)\">100</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"122.3\" y=\"39.4\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(-20 122.3 39.4)\">70</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"129.1\" y=\"58.2\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(-20 129.1 58.2)\">110</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"99.3\" y=\"50.1\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(-30 99.3 50.1)\">60</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"109.3\" y=\"67.4\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(-30 109.3 67.4)\">120</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"78.5\" y=\"64.6\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(-40 78.5 64.6)\">50</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"91.4\" y=\"79.9\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(-40 91.4 79.9)\">130</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"60.6\" y=\"82.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(-50 60.6 82.5)\">40</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"75.9\" y=\"95.4\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(-50 75.9 95.4)\">140</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"46.1\" y=\"103.3\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(-60 46.1 103.3)\">30</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"63.4\" y=\"113.3\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(-60 63.4 113.3)\">150</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"35.4\" y=\"126.3\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(-70 35.4 126.3)\">20</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"54.2\" y=\"133.1\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(-70 54.2 133.1)\">160</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"28.8\" y=\"150.8\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(-80 28.8 150.8)\">10</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"48.5\" y=\"154.2\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" transform=\"rotate(-80 48.5 154.2)\">170</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"22.0\" y=\"172.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">0</text><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"42.0\" y=\"172.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">180</text><text x=\"8.0\" y=\"18.0\" text-anchor=\"start\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">(a)</text><text x=\"360.0\" y=\"18.0\" text-anchor=\"start\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">(b)</text><line x1=\"366.0\" y1=\"188.0\" x2=\"436.0\" y2=\"188.0\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><line x1=\"366.0\" y1=\"188.0\" x2=\"366.0\" y2=\"40.0\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><line x1=\"366.0\" y1=\"188.0\" x2=\"434.8\" y2=\"139.8\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><polyline points=\"375.0,188.0 375.0,179.0 366.0,179.0\" fill=\"none\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.2\"/><path d=\"M397.1,166.2 A38,38 0 0 1 404.0,188.0\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"418.5\" y=\"176.1\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" font-weight=\"700\">35\u00b0</text><path d=\"M366.0,162.0 A26,26 0 0 1 387.3,173.1\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"387.2\" y=\"152.2\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\" font-style=\"italic\">b\u00b0</text></svg>",
    "options": [
      "130\u00b0",
      "50\u00b0",
      "120\u00b0",
      "140\u00b0"
    ],
    "answer": 0,
    "hint": "The angle opens from 0\u00b0 on the right baseline past 90\u00b0 to 130\u00b0 (an obtuse angle)!",
    "explanation": "(a) One ray is on 0\u00b0, so read the scale that starts at 0. The other ray points to 130\u00b0 (obtuse, more than 90\u00b0). (b) The two parts make a right angle: 35\u00b0 + b = 90\u00b0. b = 90\u00b0 \u2212 35\u00b0 = 55\u00b0."
  },
  {
    "id": "timss_g4_29",
    "num": 29,
    "title": "Is It True for a Rectangle?",
    "domain": "geometry",
    "domLabel": "Geometry & Shapes",
    "cognitive": "Knowing",
    "standard": "4.G.2",
    "q": "Here are some statements about a <b>rectangle</b>. Put an \u2717 in <b>one</b> box in each row.<br><table class=\"dtable tf\"><tr><th></th><th>Statement</th><th>True</th><th>False</th></tr><tr><td>A.</td><td>It has 4 sides.</td><td>\u2610</td><td>\u2610</td></tr><tr><td>B.</td><td>All the sides must be the same length.</td><td>\u2610</td><td>\u2610</td></tr><tr><td>C.</td><td>All the angles are right angles.</td><td>\u2610</td><td>\u2610</td></tr><tr><td>D.</td><td>There are two pairs of parallel sides.</td><td>\u2610</td><td>\u2610</td></tr></table>",
    "svg": null,
    "options": [
      "All four sides must be equal in length",
      "It has 4 right angles (90\u00b0)",
      "Opposite sides are parallel",
      "Opposite sides are equal in length"
    ],
    "answer": 0,
    "hint": "A rectangle does NOT require all 4 sides to be equal\u2014only opposite sides must be equal!",
    "explanation": "A: a rectangle has 4 sides \u2014 True. B: only opposite sides must be equal (a square has all sides equal) \u2014 False. C: it has four right angles \u2014 True. D: opposite sides are parallel \u2014 True."
  },
  {
    "id": "timss_g4_30",
    "num": 30,
    "title": "Is a Square a Rectangle?",
    "domain": "geometry",
    "domLabel": "Geometry & Shapes",
    "cognitive": "Reasoning",
    "standard": "4.G.2",
    "q": "Shamma says, <i>\u201cA square is <b>not</b> a rectangle, because a rectangle has two long sides and two short sides.\u201d</i><br>Do you agree with Shamma? <b>Explain</b> using the properties of a rectangle.",
    "svg": null,
    "options": [
      "No, a square IS a special rectangle (4 right angles and 4 equal sides)",
      "Yes, a square can never be a rectangle",
      "Yes, rectangles must always have unequal sides",
      "No, a square is actually a triangle"
    ],
    "answer": 0,
    "hint": "Any 4-sided shape with 4 right angles is a rectangle. A square is a rectangle with 4 equal sides!",
    "explanation": "A rectangle has 4 sides, 4 right angles and opposite sides that are equal and parallel. A square has all of these properties too. A rectangle does not need two long and two short sides, so a square is a (special) rectangle."
  },
  {
    "id": "timss_g4_31",
    "num": 31,
    "title": "Mirror Images",
    "domain": "geometry",
    "domLabel": "Geometry & Shapes",
    "cognitive": "Knowing",
    "standard": "4.G.3",
    "q": "Which does <b>NOT</b> show a shape and its reflection (mirror image)?",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 396 188\" style=\"width:100%;max-width:396px\" xmlns=\"http://www.w3.org/2000/svg\"><text x=\"6.0\" y=\"22.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">A</text><line x1=\"110.0\" y1=\"6.0\" x2=\"110.0\" y2=\"84.0\" stroke=\"#1b2a3a\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><polygon points=\"44.0,72.0 98.0,72.0 98.0,18.0\" fill=\"#e3eef9\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><polygon points=\"122.0,72.0 176.0,72.0 176.0,18.0\" fill=\"#e3eef9\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><text x=\"204.0\" y=\"22.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">B</text><line x1=\"308.0\" y1=\"6.0\" x2=\"308.0\" y2=\"84.0\" stroke=\"#1b2a3a\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><polygon points=\"281.7,14.0 241.4,41.9 296.0,76.0\" fill=\"#e3eef9\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><polygon points=\"334.3,14.0 374.6,41.9 320.0,76.0\" fill=\"#e3eef9\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><text x=\"6.0\" y=\"116.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">C</text><line x1=\"110.0\" y1=\"100.0\" x2=\"110.0\" y2=\"178.0\" stroke=\"#1b2a3a\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><polygon points=\"42.0,168.0 78.0,168.0 98.0,110.0 62.0,110.0\" fill=\"#e3eef9\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><polygon points=\"178.0,168.0 142.0,168.0 122.0,110.0 158.0,110.0\" fill=\"#e3eef9\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><text x=\"204.0\" y=\"116.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">D</text><line x1=\"308.0\" y1=\"100.0\" x2=\"308.0\" y2=\"178.0\" stroke=\"#1b2a3a\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><path d=\"M244.0,110.0 L296.0,110.0 L296.0,162.0 L244.0,162.0 Q260.0,136.0 244.0,110.0 Z\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"1.8\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M372.0,110.0 L320.0,110.0 L320.0,162.0 L372.0,162.0 Q356.0,136.0 372.0,110.0 Z\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"1.8\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>",
    "options": [
      "Diagram A",
      "Diagram B",
      "Diagram C",
      "Diagram D"
    ],
    "answer": 0,
    "hint": "Diagram A shows a slide (translation), not a mirror flip (reflection)!",
    "explanation": "In a reflection, each point is the same distance from the mirror line on the other side, so the shape is flipped. B, C and D are flipped. In A the triangle has only been slid across (not flipped), so A is not a reflection."
  },
  {
    "id": "timss_g4_32",
    "num": 32,
    "title": "Lines of Symmetry",
    "domain": "geometry",
    "domLabel": "Geometry & Shapes",
    "cognitive": "Applying",
    "standard": "4.G.3",
    "q": "Draw <b>ALL</b> the lines of symmetry on this shape.",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 228 228\" style=\"width:100%;max-width:228px\" xmlns=\"http://www.w3.org/2000/svg\"><line x1=\"12.0\" y1=\"12.0\" x2=\"12.0\" y2=\"216.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"46.0\" y1=\"12.0\" x2=\"46.0\" y2=\"216.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"80.0\" y1=\"12.0\" x2=\"80.0\" y2=\"216.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"114.0\" y1=\"12.0\" x2=\"114.0\" y2=\"216.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"148.0\" y1=\"12.0\" x2=\"148.0\" y2=\"216.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"182.0\" y1=\"12.0\" x2=\"182.0\" y2=\"216.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"216.0\" y1=\"12.0\" x2=\"216.0\" y2=\"216.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"12.0\" y1=\"12.0\" x2=\"216.0\" y2=\"12.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"12.0\" y1=\"46.0\" x2=\"216.0\" y2=\"46.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"12.0\" y1=\"80.0\" x2=\"216.0\" y2=\"80.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"12.0\" y1=\"114.0\" x2=\"216.0\" y2=\"114.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"12.0\" y1=\"148.0\" x2=\"216.0\" y2=\"148.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"12.0\" y1=\"182.0\" x2=\"216.0\" y2=\"182.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"12.0\" y1=\"216.0\" x2=\"216.0\" y2=\"216.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><rect x=\"12.0\" y=\"12.0\" width=\"204.0\" height=\"204.0\" rx=\"0\" fill=\"none\" stroke=\"#8795a3\" stroke-width=\"1.2\"/><polygon points=\"114.0,12.0 148.0,80.0 216.0,114.0 148.0,148.0 114.0,216.0 80.0,148.0 12.0,114.0 80.0,80.0\" fill=\"#e3eef9\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"2.8\"/></svg>",
    "options": [
      "4 lines of symmetry",
      "2 lines of symmetry",
      "8 lines of symmetry",
      "1 line of symmetry"
    ],
    "answer": 0,
    "hint": "A square has 4 lines of symmetry: 1 vertical, 1 horizontal, and 2 diagonals!",
    "explanation": "Vertical line through the top and bottom points. Horizontal line through the left and right points. Two diagonal lines through the inner corners (corner to corner of the grid). Total 4."
  },
  {
    "id": "timss_g4_33",
    "num": 33,
    "title": "Faces, Edges and Vertices",
    "domain": "geometry",
    "domLabel": "Geometry & Shapes",
    "cognitive": "Knowing",
    "standard": "TIMSS 3D shapes (2.G.1)",
    "q": "<b>(a)</b> How many <b>edges</b> does a cube have?<br><b>(b)</b> Complete the table for these 3D shapes.<table class=\"dtable fev\"><tr><th>Shape</th><th>Flat faces</th><th>Edges</th><th>Vertices</th><th>Curved surface?</th></tr><tr><td>Cube</td><td>6</td><td></td><td>8</td><td>No</td></tr><tr><td>Rectangular prism</td><td></td><td>12</td><td></td><td>No</td></tr><tr><td>Cylinder</td><td></td><td>\u2014</td><td>0</td><td>Yes</td></tr><tr><td>Cone</td><td>1</td><td>\u2014</td><td></td><td></td></tr><tr><td>Sphere</td><td></td><td>\u2014</td><td>0</td><td>Yes</td></tr></table>",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 440 152\" style=\"width:100%;max-width:440px\" xmlns=\"http://www.w3.org/2000/svg\"><polygon points=\"17.0,60.0 33.0,47.0 79.0,47.0 79.0,93.0 63.0,106.0 17.0,106.0\" fill=\"#e3eef9\" fill-opacity=\"1\" stroke=\"none\" stroke-width=\"0\"/><polygon points=\"17.0,60.0 63.0,60.0 63.0,106.0 17.0,106.0\" fill=\"none\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><line x1=\"33.0\" y1=\"47.0\" x2=\"79.0\" y2=\"47.0\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><line x1=\"79.0\" y1=\"47.0\" x2=\"79.0\" y2=\"93.0\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><line x1=\"17.0\" y1=\"60.0\" x2=\"33.0\" y2=\"47.0\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><line x1=\"63.0\" y1=\"60.0\" x2=\"79.0\" y2=\"47.0\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><line x1=\"63.0\" y1=\"106.0\" x2=\"79.0\" y2=\"93.0\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><line x1=\"33.0\" y1=\"47.0\" x2=\"33.0\" y2=\"93.0\" stroke=\"#1b2a3a\" stroke-width=\"1.5\" stroke-dasharray=\"5 4\"/><line x1=\"33.0\" y1=\"93.0\" x2=\"79.0\" y2=\"93.0\" stroke=\"#1b2a3a\" stroke-width=\"1.5\" stroke-dasharray=\"5 4\"/><line x1=\"17.0\" y1=\"106.0\" x2=\"33.0\" y2=\"93.0\" stroke=\"#1b2a3a\" stroke-width=\"1.5\" stroke-dasharray=\"5 4\"/><polygon points=\"97.0,70.0 113.0,57.0 171.0,57.0 171.0,93.0 155.0,106.0 97.0,106.0\" fill=\"#e3eef9\" fill-opacity=\"1\" stroke=\"none\" stroke-width=\"0\"/><polygon points=\"97.0,70.0 155.0,70.0 155.0,106.0 97.0,106.0\" fill=\"none\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><line x1=\"113.0\" y1=\"57.0\" x2=\"171.0\" y2=\"57.0\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><line x1=\"171.0\" y1=\"57.0\" x2=\"171.0\" y2=\"93.0\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><line x1=\"97.0\" y1=\"70.0\" x2=\"113.0\" y2=\"57.0\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><line x1=\"155.0\" y1=\"70.0\" x2=\"171.0\" y2=\"57.0\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><line x1=\"155.0\" y1=\"106.0\" x2=\"171.0\" y2=\"93.0\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><line x1=\"113.0\" y1=\"57.0\" x2=\"113.0\" y2=\"93.0\" stroke=\"#1b2a3a\" stroke-width=\"1.5\" stroke-dasharray=\"5 4\"/><line x1=\"113.0\" y1=\"93.0\" x2=\"171.0\" y2=\"93.0\" stroke=\"#1b2a3a\" stroke-width=\"1.5\" stroke-dasharray=\"5 4\"/><line x1=\"97.0\" y1=\"106.0\" x2=\"113.0\" y2=\"93.0\" stroke=\"#1b2a3a\" stroke-width=\"1.5\" stroke-dasharray=\"5 4\"/><path d=\"M194,34 L194,98 A26,8 0 0 0 246,98 L246,34 Z\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"1.9\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><ellipse cx=\"220\" cy=\"34\" rx=\"26\" ry=\"8\" fill=\"#f3f7fb\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><path d=\"M194,98 A26,8 0 0 1 246,98\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"1.5\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M306,24 L278,98 A28,8 0 0 0 334,98 Z\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"1.9\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M278,98 A28,8 0 0 1 334,98\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"1.5\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><circle cx=\"392.0\" cy=\"68.0\" r=\"36.0\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"1.9\"/><path d=\"M356,68 A36,9 0 0 0 428,68\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"1.6\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M356,68 A36,9 0 0 1 428,68\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"1.4\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><text x=\"48.0\" y=\"128.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" font-weight=\"700\">cube</text><text x=\"134.0\" y=\"128.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" font-weight=\"700\">rectangular</text><text x=\"220.0\" y=\"128.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" font-weight=\"700\">cylinder</text><text x=\"306.0\" y=\"128.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" font-weight=\"700\">cone</text><text x=\"392.0\" y=\"128.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" font-weight=\"700\">sphere</text><text x=\"134.0\" y=\"144.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" font-weight=\"700\">prism</text></svg>",
    "options": [
      "12 edges",
      "6 edges",
      "8 edges",
      "16 edges"
    ],
    "answer": 0,
    "hint": "A cube has 12 edges: 4 top edges, 4 bottom edges, and 4 vertical pillars!",
    "explanation": "(a) A cube: 4 edges on top + 4 on the bottom + 4 going up = 12. Count the dashed (hidden) edges too. (b) Cube: 12 edges. Rectangular prism: 6 flat faces, 8 vertices. Cylinder: 2 flat faces (top and bottom). Cone: 1 vertex (the tip) and a curved surface. Sphere: 0 flat faces. Note: some books also count curved surfaces as faces; this table asks for flat faces only."
  },
  {
    "id": "timss_g4_34",
    "num": 34,
    "title": "Which Net Makes a Cube?",
    "domain": "geometry",
    "domLabel": "Geometry & Shapes",
    "cognitive": "Applying",
    "standard": "TIMSS nets (6.G.4)",
    "q": "Which shape makes a <b>cube</b> when it is folded?",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 310 226\" style=\"width:100%;max-width:310px\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"58.0\" y=\"10.0\" width=\"24.0\" height=\"24.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><rect x=\"34.0\" y=\"34.0\" width=\"24.0\" height=\"24.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><rect x=\"58.0\" y=\"34.0\" width=\"24.0\" height=\"24.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><rect x=\"82.0\" y=\"34.0\" width=\"24.0\" height=\"24.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><rect x=\"106.0\" y=\"34.0\" width=\"24.0\" height=\"24.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><rect x=\"130.0\" y=\"34.0\" width=\"24.0\" height=\"24.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><text x=\"10.0\" y=\"25.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">A</text><rect x=\"224.0\" y=\"10.0\" width=\"24.0\" height=\"24.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><rect x=\"224.0\" y=\"34.0\" width=\"24.0\" height=\"24.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><rect x=\"224.0\" y=\"58.0\" width=\"24.0\" height=\"24.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><rect x=\"224.0\" y=\"82.0\" width=\"24.0\" height=\"24.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><rect x=\"248.0\" y=\"34.0\" width=\"24.0\" height=\"24.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><rect x=\"248.0\" y=\"58.0\" width=\"24.0\" height=\"24.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><text x=\"200.0\" y=\"25.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">B</text><rect x=\"58.0\" y=\"122.0\" width=\"24.0\" height=\"24.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><rect x=\"58.0\" y=\"146.0\" width=\"24.0\" height=\"24.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><rect x=\"58.0\" y=\"170.0\" width=\"24.0\" height=\"24.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><rect x=\"58.0\" y=\"194.0\" width=\"24.0\" height=\"24.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><rect x=\"34.0\" y=\"146.0\" width=\"24.0\" height=\"24.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><rect x=\"82.0\" y=\"146.0\" width=\"24.0\" height=\"24.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><text x=\"10.0\" y=\"137.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">C</text><rect x=\"224.0\" y=\"122.0\" width=\"24.0\" height=\"24.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><rect x=\"224.0\" y=\"146.0\" width=\"24.0\" height=\"24.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><rect x=\"248.0\" y=\"146.0\" width=\"24.0\" height=\"24.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><rect x=\"272.0\" y=\"146.0\" width=\"24.0\" height=\"24.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><rect x=\"272.0\" y=\"170.0\" width=\"24.0\" height=\"24.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><rect x=\"272.0\" y=\"194.0\" width=\"24.0\" height=\"24.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><text x=\"200.0\" y=\"137.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">D</text></svg>",
    "options": [
      "Net C",
      "Net A",
      "Net B",
      "Net D"
    ],
    "answer": 0,
    "hint": "Net C folds neatly into a 6-faced cube without any overlapping faces!",
    "explanation": "C: the column of 4 squares wraps round to make front, bottom, back and top; the 2 side squares fold up as left and right \u2192 a cube \u2713. A: 5 squares in a row \u2014 the 5th overlaps the 1st. B: the 2 \u00d7 2 block makes 2 squares overlap. D: the last square lands on the same face as the first."
  },
  {
    "id": "timss_g4_35",
    "num": 35,
    "title": "Mystery 3D Shape",
    "domain": "geometry",
    "domLabel": "Geometry & Shapes",
    "cognitive": "Reasoning",
    "standard": "TIMSS 3D shapes",
    "q": "Khalid is thinking of a 3D shape.<br>&nbsp;&nbsp;\u2022 It has <b>5 faces</b>.&nbsp;&nbsp; \u2022 One face is a <b>square</b>; the other faces are <b>triangles</b>.&nbsp;&nbsp; \u2022 It has <b>5 vertices</b>.<br><b>(a)</b> Name the shape. &nbsp;&nbsp;<b>(b)</b> How many edges does it have? <b>Explain</b> how you found the number.",
    "svg": null,
    "options": [
      "Square-based pyramid",
      "Triangular prism",
      "Cube",
      "Cone"
    ],
    "answer": 0,
    "hint": "A square base with 4 triangular faces meeting at the top vertex is a square pyramid!",
    "explanation": "A square face with triangles meeting at one point is a square-based pyramid (like the pyramids in Egypt). Edges: 4 around the square base. Plus 4 from each base corner up to the top vertex: 4 + 4 = 8."
  },
  {
    "id": "timss_g4_36",
    "num": 36,
    "title": "Perimeter of a Square Shape",
    "domain": "geometry",
    "domLabel": "Geometry & Shapes",
    "cognitive": "Applying",
    "standard": "4.MD.3 (3.MD.8)",
    "q": "This shape is made of squares. Each square has sides <b>2 cm</b> long.<br>What is the <b>perimeter</b> of the shape?",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 222 198\" style=\"width:100%;max-width:222px\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"74.0\" y=\"10.0\" width=\"44.0\" height=\"44.0\" rx=\"0\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><rect x=\"118.0\" y=\"10.0\" width=\"44.0\" height=\"44.0\" rx=\"0\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><rect x=\"74.0\" y=\"54.0\" width=\"44.0\" height=\"44.0\" rx=\"0\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><rect x=\"118.0\" y=\"54.0\" width=\"44.0\" height=\"44.0\" rx=\"0\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><rect x=\"162.0\" y=\"54.0\" width=\"44.0\" height=\"44.0\" rx=\"0\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><rect x=\"118.0\" y=\"98.0\" width=\"44.0\" height=\"44.0\" rx=\"0\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><rect x=\"162.0\" y=\"98.0\" width=\"44.0\" height=\"44.0\" rx=\"0\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><rect x=\"118.0\" y=\"142.0\" width=\"44.0\" height=\"44.0\" rx=\"0\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><rect x=\"162.0\" y=\"142.0\" width=\"44.0\" height=\"44.0\" rx=\"0\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"1.8\"/><line x1=\"62.0\" y1=\"10.0\" x2=\"62.0\" y2=\"54.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"57.0\" y1=\"10.0\" x2=\"67.0\" y2=\"10.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"57.0\" y1=\"54.0\" x2=\"67.0\" y2=\"54.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><text x=\"53.0\" y=\"37.0\" text-anchor=\"end\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">2 cm</text></svg>",
    "options": [
      "14 cm",
      "21 cm",
      "28 cm",
      "49 cm"
    ],
    "answer": 2,
    "hint": "Count the outer edge segments: 4 segments \u00d7 7 cm = 28 cm perimeter!",
    "explanation": "Count the outside edges of the small squares: 14 edges. Each edge is 2 cm: 14 \u00d7 2 = 28 cm."
  },
  {
    "id": "timss_g4_37",
    "num": 37,
    "title": "Triangles on a Grid",
    "domain": "geometry",
    "domLabel": "Geometry & Shapes",
    "cognitive": "Applying",
    "standard": "4.MD.3 (3.MD.7)",
    "q": "Each triangle is on a centimetre grid. Find the <b>area</b> of each triangle.",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 220 212\" style=\"width:100%;max-width:220px\" xmlns=\"http://www.w3.org/2000/svg\"><line x1=\"14.0\" y1=\"12.0\" x2=\"14.0\" y2=\"172.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"46.0\" y1=\"12.0\" x2=\"46.0\" y2=\"172.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"78.0\" y1=\"12.0\" x2=\"78.0\" y2=\"172.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"110.0\" y1=\"12.0\" x2=\"110.0\" y2=\"172.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"142.0\" y1=\"12.0\" x2=\"142.0\" y2=\"172.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"174.0\" y1=\"12.0\" x2=\"174.0\" y2=\"172.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"206.0\" y1=\"12.0\" x2=\"206.0\" y2=\"172.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"14.0\" y1=\"12.0\" x2=\"206.0\" y2=\"12.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"14.0\" y1=\"44.0\" x2=\"206.0\" y2=\"44.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"14.0\" y1=\"76.0\" x2=\"206.0\" y2=\"76.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"14.0\" y1=\"108.0\" x2=\"206.0\" y2=\"108.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"14.0\" y1=\"140.0\" x2=\"206.0\" y2=\"140.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"14.0\" y1=\"172.0\" x2=\"206.0\" y2=\"172.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><rect x=\"14.0\" y=\"12.0\" width=\"192.0\" height=\"160.0\" rx=\"0\" fill=\"none\" stroke=\"#8795a3\" stroke-width=\"1.2\"/><polygon points=\"46.0,140.0 174.0,140.0 110.0,12.0\" fill=\"#e3eef9\" fill-opacity=\"0.85\" stroke=\"#1b2a3a\" stroke-width=\"2.6\"/><line x1=\"174.0\" y1=\"184.0\" x2=\"206.0\" y2=\"184.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"174.0\" y1=\"178.0\" x2=\"174.0\" y2=\"190.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"206.0\" y1=\"178.0\" x2=\"206.0\" y2=\"190.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><text x=\"190.0\" y=\"204.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" font-weight=\"700\">1 cm</text></svg><svg class=\"fig\" viewBox=\"0 0 198 222\" style=\"width:100%;max-width:198px\" xmlns=\"http://www.w3.org/2000/svg\"><line x1=\"14.0\" y1=\"12.0\" x2=\"14.0\" y2=\"182.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"48.0\" y1=\"12.0\" x2=\"48.0\" y2=\"182.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"82.0\" y1=\"12.0\" x2=\"82.0\" y2=\"182.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"116.0\" y1=\"12.0\" x2=\"116.0\" y2=\"182.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"150.0\" y1=\"12.0\" x2=\"150.0\" y2=\"182.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"184.0\" y1=\"12.0\" x2=\"184.0\" y2=\"182.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"14.0\" y1=\"12.0\" x2=\"184.0\" y2=\"12.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"14.0\" y1=\"46.0\" x2=\"184.0\" y2=\"46.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"14.0\" y1=\"80.0\" x2=\"184.0\" y2=\"80.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"14.0\" y1=\"114.0\" x2=\"184.0\" y2=\"114.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"14.0\" y1=\"148.0\" x2=\"184.0\" y2=\"148.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><line x1=\"14.0\" y1=\"182.0\" x2=\"184.0\" y2=\"182.0\" stroke=\"#a9b4bf\" stroke-width=\"1.1\"/><rect x=\"14.0\" y=\"12.0\" width=\"170.0\" height=\"170.0\" rx=\"0\" fill=\"none\" stroke=\"#8795a3\" stroke-width=\"1.2\"/><polygon points=\"48.0,148.0 48.0,46.0 150.0,148.0\" fill=\"#e3eef9\" fill-opacity=\"0.85\" stroke=\"#1b2a3a\" stroke-width=\"2.6\"/><line x1=\"150.0\" y1=\"194.0\" x2=\"184.0\" y2=\"194.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"150.0\" y1=\"188.0\" x2=\"150.0\" y2=\"200.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"184.0\" y1=\"188.0\" x2=\"184.0\" y2=\"200.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><text x=\"167.0\" y=\"214.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" font-weight=\"700\">1 cm</text></svg>",
    "options": [
      "8 cm\u00b2",
      "16 cm\u00b2",
      "12 cm\u00b2",
      "4 cm\u00b2"
    ],
    "answer": 0,
    "hint": "Area of triangle = (base \u00d7 height) \u00f7 2 = (4 \u00d7 4) \u00f7 2 = 16 \u00f7 2 = 8 cm\u00b2!",
    "explanation": "Triangle 1 fits in a 4 \u00d7 4 rectangle (16 cm\u00b2) and fills exactly half: 16 \u00f7 2 = 8 cm\u00b2. Triangle 2 is half of a 3 \u00d7 3 square (9 cm\u00b2): 9 \u00f7 2 = 4.5 cm\u00b2. Check by counting: 3 whole squares + 3 half squares = 4.5."
  },
  {
    "id": "timss_g4_38",
    "num": 38,
    "title": "Cubes in a Box",
    "domain": "geometry",
    "domLabel": "Geometry & Shapes",
    "cognitive": "Applying",
    "standard": "TIMSS volume (5.MD.3)",
    "q": "This box is full of cubes. How many cubes are in the box?",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 136 211\" style=\"width:100%;max-width:136px\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"14.0\" y=\"47.0\" width=\"30.0\" height=\"30.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><rect x=\"14.0\" y=\"77.0\" width=\"30.0\" height=\"30.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><rect x=\"14.0\" y=\"107.0\" width=\"30.0\" height=\"30.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><rect x=\"14.0\" y=\"137.0\" width=\"30.0\" height=\"30.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><rect x=\"14.0\" y=\"167.0\" width=\"30.0\" height=\"30.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><rect x=\"44.0\" y=\"47.0\" width=\"30.0\" height=\"30.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><rect x=\"44.0\" y=\"77.0\" width=\"30.0\" height=\"30.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><rect x=\"44.0\" y=\"107.0\" width=\"30.0\" height=\"30.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><rect x=\"44.0\" y=\"137.0\" width=\"30.0\" height=\"30.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><rect x=\"44.0\" y=\"167.0\" width=\"30.0\" height=\"30.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><polygon points=\"74.0,47.0 90.0,36.0 90.0,66.0 74.0,77.0\" fill=\"#ececec\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><polygon points=\"74.0,77.0 90.0,66.0 90.0,96.0 74.0,107.0\" fill=\"#ececec\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><polygon points=\"74.0,107.0 90.0,96.0 90.0,126.0 74.0,137.0\" fill=\"#ececec\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><polygon points=\"74.0,137.0 90.0,126.0 90.0,156.0 74.0,167.0\" fill=\"#ececec\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><polygon points=\"74.0,167.0 90.0,156.0 90.0,186.0 74.0,197.0\" fill=\"#ececec\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><polygon points=\"90.0,36.0 106.0,25.0 106.0,55.0 90.0,66.0\" fill=\"#ececec\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><polygon points=\"90.0,66.0 106.0,55.0 106.0,85.0 90.0,96.0\" fill=\"#ececec\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><polygon points=\"90.0,96.0 106.0,85.0 106.0,115.0 90.0,126.0\" fill=\"#ececec\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><polygon points=\"90.0,126.0 106.0,115.0 106.0,145.0 90.0,156.0\" fill=\"#ececec\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><polygon points=\"90.0,156.0 106.0,145.0 106.0,175.0 90.0,186.0\" fill=\"#ececec\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><polygon points=\"106.0,25.0 122.0,14.0 122.0,44.0 106.0,55.0\" fill=\"#ececec\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><polygon points=\"106.0,55.0 122.0,44.0 122.0,74.0 106.0,85.0\" fill=\"#ececec\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><polygon points=\"106.0,85.0 122.0,74.0 122.0,104.0 106.0,115.0\" fill=\"#ececec\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><polygon points=\"106.0,115.0 122.0,104.0 122.0,134.0 106.0,145.0\" fill=\"#ececec\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><polygon points=\"106.0,145.0 122.0,134.0 122.0,164.0 106.0,175.0\" fill=\"#ececec\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><polygon points=\"14.0,47.0 44.0,47.0 60.0,36.0 30.0,36.0\" fill=\"#f6f6f6\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><polygon points=\"30.0,36.0 60.0,36.0 76.0,25.0 46.0,25.0\" fill=\"#f6f6f6\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><polygon points=\"46.0,25.0 76.0,25.0 92.0,14.0 62.0,14.0\" fill=\"#f6f6f6\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><polygon points=\"44.0,47.0 74.0,47.0 90.0,36.0 60.0,36.0\" fill=\"#f6f6f6\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><polygon points=\"60.0,36.0 90.0,36.0 106.0,25.0 76.0,25.0\" fill=\"#f6f6f6\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><polygon points=\"76.0,25.0 106.0,25.0 122.0,14.0 92.0,14.0\" fill=\"#f6f6f6\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><polygon points=\"17.2,50.2 70.8,50.2 70.8,193.8 17.2,193.8\" fill=\"none\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.1\"/><polygon points=\"77.2,48.7 118.8,20.1 118.8,162.3 77.2,190.9\" fill=\"none\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.1\"/><polygon points=\"24.3,43.8 73.0,43.8 111.7,17.2 63.0,17.2\" fill=\"none\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.1\"/><polygon points=\"14.0,197.0 14.0,47.0 62.0,14.0 122.0,14.0 122.0,164.0 74.0,197.0\" fill=\"none\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"3.2\"/><line x1=\"14.0\" y1=\"47.0\" x2=\"74.0\" y2=\"47.0\" stroke=\"#1b2a3a\" stroke-width=\"3.2\"/><line x1=\"74.0\" y1=\"47.0\" x2=\"74.0\" y2=\"197.0\" stroke=\"#1b2a3a\" stroke-width=\"3.2\"/><line x1=\"74.0\" y1=\"47.0\" x2=\"122.0\" y2=\"14.0\" stroke=\"#1b2a3a\" stroke-width=\"3.2\"/></svg>",
    "options": [
      "12",
      "24",
      "30",
      "36"
    ],
    "answer": 2,
    "hint": "Layer of cubes: 5 along length, 3 along width = 15 cubes per layer. 2 layers = 30 cubes!",
    "explanation": "The top shows one layer: 2 \u00d7 3 = 6 cubes. There are 5 layers (look at the front). 6 \u00d7 5 = 30 cubes."
  },
  {
    "id": "timss_g4_39",
    "num": 39,
    "title": "Green Planet Map",
    "domain": "geometry",
    "domLabel": "Geometry & Shapes",
    "cognitive": "Applying",
    "standard": "TIMSS coordinate grid (5.G.1)",
    "q": "This map of <b>Green Planet</b> is drawn on a grid.<br><b>(a)</b> Write the coordinates of the <b>Aquarium</b>.<br><b>(b)</b> The Gift Shop is at <b>(4, 3)</b>. Mark it on the grid with a dot and label it <b>G</b>.<br><b>(c)</b> Which place is at <b>(3, 6)</b>?",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 252 228\" style=\"width:100%;max-width:252px\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ar\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto-start-reverse\"><path d=\"M0,0 L10,5 L0,10 z\" fill=\"#1b2a3a\"/></marker></defs><text x=\"136.0\" y=\"17.0\" text-anchor=\"middle\" font-size=\"15\" fill=\"#1b2a3a\" font-weight=\"700\">Green Planet map</text><line x1=\"40.0\" y1=\"34.0\" x2=\"40.0\" y2=\"202.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"61.0\" y1=\"34.0\" x2=\"61.0\" y2=\"202.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"82.0\" y1=\"34.0\" x2=\"82.0\" y2=\"202.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"103.0\" y1=\"34.0\" x2=\"103.0\" y2=\"202.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"124.0\" y1=\"34.0\" x2=\"124.0\" y2=\"202.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"145.0\" y1=\"34.0\" x2=\"145.0\" y2=\"202.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"166.0\" y1=\"34.0\" x2=\"166.0\" y2=\"202.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"187.0\" y1=\"34.0\" x2=\"187.0\" y2=\"202.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"208.0\" y1=\"34.0\" x2=\"208.0\" y2=\"202.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"40.0\" y1=\"34.0\" x2=\"208.0\" y2=\"34.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"40.0\" y1=\"55.0\" x2=\"208.0\" y2=\"55.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"40.0\" y1=\"76.0\" x2=\"208.0\" y2=\"76.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"40.0\" y1=\"97.0\" x2=\"208.0\" y2=\"97.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"40.0\" y1=\"118.0\" x2=\"208.0\" y2=\"118.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"40.0\" y1=\"139.0\" x2=\"208.0\" y2=\"139.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"40.0\" y1=\"160.0\" x2=\"208.0\" y2=\"160.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"40.0\" y1=\"181.0\" x2=\"208.0\" y2=\"181.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"40.0\" y1=\"202.0\" x2=\"208.0\" y2=\"202.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"40\" y1=\"202\" x2=\"222\" y2=\"202\" stroke=\"#1b2a3a\" stroke-width=\"1.8\" marker-end=\"url(#ar)\"/><line x1=\"40\" y1=\"202\" x2=\"40\" y2=\"20\" stroke=\"#1b2a3a\" stroke-width=\"1.8\" marker-end=\"url(#ar)\"/><text x=\"40.0\" y=\"220.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">0</text><text x=\"61.0\" y=\"220.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">1</text><text x=\"32.0\" y=\"185.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">1</text><text x=\"82.0\" y=\"220.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">2</text><text x=\"32.0\" y=\"164.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">2</text><text x=\"103.0\" y=\"220.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">3</text><text x=\"32.0\" y=\"143.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">3</text><text x=\"124.0\" y=\"220.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">4</text><text x=\"32.0\" y=\"122.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">4</text><text x=\"145.0\" y=\"220.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">5</text><text x=\"32.0\" y=\"101.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">5</text><text x=\"166.0\" y=\"220.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">6</text><text x=\"32.0\" y=\"80.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">6</text><text x=\"187.0\" y=\"220.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">7</text><text x=\"32.0\" y=\"59.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">7</text><text x=\"208.0\" y=\"220.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">8</text><text x=\"32.0\" y=\"38.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">8</text><text x=\"228.0\" y=\"207.0\" text-anchor=\"start\" font-size=\"15\" fill=\"#1b2a3a\" font-style=\"italic\">x</text><text x=\"28.0\" y=\"26.0\" text-anchor=\"middle\" font-size=\"15\" fill=\"#1b2a3a\" font-style=\"italic\">y</text><circle cx=\"61.0\" cy=\"160.0\" r=\"4.5\" fill=\"#1b2a3a\"/><text stroke=\"#fff\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"68.0\" y=\"153.0\" text-anchor=\"start\" font-size=\"13\" fill=\"#1b2a3a\" font-weight=\"700\">Entrance</text><circle cx=\"103.0\" cy=\"76.0\" r=\"4.5\" fill=\"#1b2a3a\"/><text stroke=\"#fff\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"110.0\" y=\"69.0\" text-anchor=\"start\" font-size=\"13\" fill=\"#1b2a3a\" font-weight=\"700\">Rainforest</text><circle cx=\"166.0\" cy=\"97.0\" r=\"4.5\" fill=\"#1b2a3a\"/><text stroke=\"#fff\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"173.0\" y=\"90.0\" text-anchor=\"start\" font-size=\"13\" fill=\"#1b2a3a\" font-weight=\"700\">Aquarium</text><circle cx=\"187.0\" cy=\"181.0\" r=\"4.5\" fill=\"#1b2a3a\"/><text stroke=\"#fff\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"194.0\" y=\"174.0\" text-anchor=\"start\" font-size=\"13\" fill=\"#1b2a3a\" font-weight=\"700\">Caf\u00e9</text></svg>",
    "options": [
      "(6, 5)",
      "(5, 6)",
      "(6, 0)",
      "(5, 5)"
    ],
    "answer": 0,
    "hint": "Coordinates are always (x, y): 6 units across east, 5 units up north = (6, 5)!",
    "explanation": "(a) The Aquarium is 6 across and 5 up: (6, 5). (b) Start at 0, go 4 across, then 3 up, and mark G. (c) 3 across, 6 up is the Rainforest."
  },
  {
    "id": "timss_g4_40",
    "num": 40,
    "title": "Two Date-Palm Plots",
    "domain": "geometry",
    "domLabel": "Geometry & Shapes",
    "cognitive": "Reasoning",
    "standard": "4.MD.3",
    "q": "A farmer in Al Ain has two rectangular plots for date palms. Each square on the grid is 1 m by 1 m.<br>Rashid says, <i>\u201cThe two plots have the same area, so they must have the same perimeter.\u201d</i><br>Is Rashid right? <b>Explain</b> using the area and perimeter of each plot.",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 427 162\" style=\"width:100%;max-width:427px\" xmlns=\"http://www.w3.org/2000/svg\"><line x1=\"14.0\" y1=\"8.0\" x2=\"14.0\" y2=\"134.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"35.0\" y1=\"8.0\" x2=\"35.0\" y2=\"134.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"56.0\" y1=\"8.0\" x2=\"56.0\" y2=\"134.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"77.0\" y1=\"8.0\" x2=\"77.0\" y2=\"134.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"98.0\" y1=\"8.0\" x2=\"98.0\" y2=\"134.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"119.0\" y1=\"8.0\" x2=\"119.0\" y2=\"134.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"140.0\" y1=\"8.0\" x2=\"140.0\" y2=\"134.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"161.0\" y1=\"8.0\" x2=\"161.0\" y2=\"134.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"182.0\" y1=\"8.0\" x2=\"182.0\" y2=\"134.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"203.0\" y1=\"8.0\" x2=\"203.0\" y2=\"134.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"224.0\" y1=\"8.0\" x2=\"224.0\" y2=\"134.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"245.0\" y1=\"8.0\" x2=\"245.0\" y2=\"134.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"266.0\" y1=\"8.0\" x2=\"266.0\" y2=\"134.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"287.0\" y1=\"8.0\" x2=\"287.0\" y2=\"134.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"308.0\" y1=\"8.0\" x2=\"308.0\" y2=\"134.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"329.0\" y1=\"8.0\" x2=\"329.0\" y2=\"134.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"350.0\" y1=\"8.0\" x2=\"350.0\" y2=\"134.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"371.0\" y1=\"8.0\" x2=\"371.0\" y2=\"134.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"392.0\" y1=\"8.0\" x2=\"392.0\" y2=\"134.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"413.0\" y1=\"8.0\" x2=\"413.0\" y2=\"134.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"14.0\" y1=\"8.0\" x2=\"413.0\" y2=\"8.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"14.0\" y1=\"29.0\" x2=\"413.0\" y2=\"29.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"14.0\" y1=\"50.0\" x2=\"413.0\" y2=\"50.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"14.0\" y1=\"71.0\" x2=\"413.0\" y2=\"71.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"14.0\" y1=\"92.0\" x2=\"413.0\" y2=\"92.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"14.0\" y1=\"113.0\" x2=\"413.0\" y2=\"113.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"14.0\" y1=\"134.0\" x2=\"413.0\" y2=\"134.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><rect x=\"35.0\" y=\"29.0\" width=\"126.0\" height=\"84.0\" rx=\"0\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><text stroke=\"#e3eef9\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"98.0\" y=\"76.0\" text-anchor=\"middle\" font-size=\"15\" fill=\"#1b2a3a\" font-weight=\"700\">Plot A</text><text stroke=\"#fff\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"98.0\" y=\"23.0\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">6 m</text><text stroke=\"#fff\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"30.0\" y=\"76.0\" text-anchor=\"end\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">4 m</text><rect x=\"224.0\" y=\"50.0\" width=\"168.0\" height=\"63.0\" rx=\"0\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><text stroke=\"#f6ead2\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"308.0\" y=\"86.5\" text-anchor=\"middle\" font-size=\"15\" fill=\"#1b2a3a\" font-weight=\"700\">Plot B</text><text stroke=\"#fff\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"308.0\" y=\"44.0\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">8 m</text><text stroke=\"#fff\" stroke-width=\"3.5\" paint-order=\"stroke\" x=\"219.0\" y=\"86.5\" text-anchor=\"end\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">3 m</text><text x=\"14.0\" y=\"154.0\" text-anchor=\"start\" font-size=\"13\" fill=\"#1b2a3a\" font-weight=\"700\">1 square = 1 m</text></svg>",
    "options": [
      "No: Plot A perimeter is 20 m, while Plot B perimeter is 22 m",
      "Yes: both perimeters are 24 m",
      "Yes: shapes with equal area always have equal perimeter",
      "No: Plot A perimeter is 24 m and Plot B is 28 m"
    ],
    "answer": 0,
    "hint": "Plot A perimeter = 6+4+6+4 = 20 m. Plot B perimeter = 8+3+8+3 = 22 m. Areas match, but perimeters differ!",
    "explanation": "Plot A: area 6 \u00d7 4 = 24 m\u00b2; perimeter 6 + 4 + 6 + 4 = 20 m. Plot B: area 8 \u00d7 3 = 24 m\u00b2; perimeter 8 + 3 + 8 + 3 = 22 m. Same area, different perimeters, so Rashid is not right."
  },
  {
    "id": "timss_g4_41",
    "num": 41,
    "title": "Metric Conversions",
    "domain": "geometry",
    "domLabel": "Geometry & Shapes",
    "cognitive": "Knowing",
    "standard": "4.MD.1",
    "q": "Complete each sentence.<br><b>(a)</b> Dubai to Sharjah is about 30 km. &nbsp;30 km = ________ m<br><b>(b)</b> Grandma buys 2 kg of dates. &nbsp;2 kg = ________ g<br><b>(c)</b> A bottle holds 1 L 250 mL of water. &nbsp;1 L 250 mL = ________ mL",
    "svg": null,
    "options": [
      "30 km = 30,000 m",
      "2 kg = 200 g",
      "1.25 L = 125 mL",
      "50 cm = 5 m"
    ],
    "answer": 0,
    "hint": "1 km = 1,000 m, so 30 km = 30 \u00d7 1,000 = 30,000 m!",
    "explanation": "(a) 30 \u00d7 1,000 = 30,000 m. (b) 2 \u00d7 1,000 = 2,000 g. (c) 1 L = 1,000 mL, so 1,000 + 250 = 1,250 mL."
  },
  {
    "id": "timss_g4_42",
    "num": 42,
    "title": "Train to Al Ain",
    "domain": "geometry",
    "domLabel": "Geometry & Shapes",
    "cognitive": "Applying",
    "standard": "4.MD.2",
    "q": "A train leaves <b>Dubai</b> at <b>7:52 a.m.</b> and arrives in <b>Al Ain</b> at <b>11:06 a.m.</b> on the same day. How long does the trip take? (model timetable)",
    "svg": null,
    "options": [
      "3 hours and 14 minutes",
      "3 hours and 29 minutes",
      "2 hours and 14 minutes",
      "4 hours and 14 minutes"
    ],
    "answer": 0,
    "hint": "From 9:15 to 12:15 is 3 hours. From 12:15 to 12:29 is 14 minutes = 3 hr 14 min!",
    "explanation": "7:52 \u2192 8:00 = 8 minutes. 8:00 \u2192 11:00 = 3 hours. 11:00 \u2192 11:06 = 6 minutes. Total: 3 hours and 8 + 6 = 14 minutes."
  },
  {
    "id": "timss_g4_43",
    "num": 43,
    "title": "Biscuit Boxes Sold",
    "domain": "data",
    "domLabel": "Data & Graphs",
    "cognitive": "Knowing",
    "standard": "3.MD.3",
    "q": "Students in Mohammed's class sold boxes of biscuits for a charity day. The table shows how many boxes each student sold.<table class=\"dtable\"><tr><th>Name</th><th>Boxes of Biscuits Sold</th></tr><tr><td>Mohammed</td><td>12</td></tr><tr><td>Anis</td><td>7</td></tr><tr><td>Abdulla</td><td>8</td></tr><tr><td>Fawaz</td><td>11</td></tr><tr><td>Tariq</td><td>13</td></tr><tr><td>Adel</td><td>9</td></tr><tr><td>Nasser</td><td>12</td></tr></table><b>HOW MANY</b> students sold <b>more than 10</b> boxes of biscuits?",
    "svg": null,
    "options": [
      "4 students",
      "6 students",
      "2 students",
      "8 students"
    ],
    "answer": 0,
    "hint": "Count bars taller than the 5-box line on the graph: 4 students sold 6 or 8 boxes!",
    "explanation": "More than 10: Mohammed 12, Fawaz 11, Tariq 13, Nasser 12. That is 4 students. (Anis 7, Abdulla 8 and Adel 9 sold fewer.)"
  },
  {
    "id": "timss_g4_44",
    "num": 44,
    "title": "Line Plot of Date Lengths",
    "domain": "data",
    "domLabel": "Data & Graphs",
    "cognitive": "Knowing",
    "standard": "4.MD.4",
    "q": "Moza measured some dates from her family's farm. She made this line plot. Each \u2717 is one date.<br><b>(a)</b> How many dates were 3\u00bd cm long?&nbsp;&nbsp; <b>(b)</b> How many dates did Moza measure altogether?<br><b>(c)</b> What is the difference between the longest and the shortest date?",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 440 202\" style=\"width:100%;max-width:440px\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ar\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto-start-reverse\"><path d=\"M0,0 L10,5 L0,10 z\" fill=\"#1b2a3a\"/></marker></defs><text x=\"220.0\" y=\"18.0\" text-anchor=\"middle\" font-size=\"15\" fill=\"#1b2a3a\" font-weight=\"700\">Lengths of Dates (cm)</text><line x1=\"20\" y1=\"168\" x2=\"420\" y2=\"168\" stroke=\"#1b2a3a\" stroke-width=\"1.8\" marker-start=\"url(#ar)\" marker-end=\"url(#ar)\"/><line x1=\"46.0\" y1=\"161.0\" x2=\"46.0\" y2=\"175.0\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><text x=\"46.0\" y=\"194.0\" text-anchor=\"middle\" font-size=\"15\" fill=\"#1b2a3a\">3</text><line x1=\"39.5\" y1=\"141.5\" x2=\"52.5\" y2=\"154.5\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><line x1=\"39.5\" y1=\"154.5\" x2=\"52.5\" y2=\"141.5\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><line x1=\"104.0\" y1=\"161.0\" x2=\"104.0\" y2=\"175.0\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><text x=\"104.0\" y=\"194.0\" text-anchor=\"middle\" font-size=\"15\" fill=\"#1b2a3a\">3\u00bc</text><line x1=\"97.5\" y1=\"141.5\" x2=\"110.5\" y2=\"154.5\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><line x1=\"97.5\" y1=\"154.5\" x2=\"110.5\" y2=\"141.5\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><line x1=\"97.5\" y1=\"119.5\" x2=\"110.5\" y2=\"132.5\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><line x1=\"97.5\" y1=\"132.5\" x2=\"110.5\" y2=\"119.5\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><line x1=\"97.5\" y1=\"97.5\" x2=\"110.5\" y2=\"110.5\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><line x1=\"97.5\" y1=\"110.5\" x2=\"110.5\" y2=\"97.5\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><line x1=\"162.0\" y1=\"161.0\" x2=\"162.0\" y2=\"175.0\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><text x=\"162.0\" y=\"194.0\" text-anchor=\"middle\" font-size=\"15\" fill=\"#1b2a3a\">3\u00bd</text><line x1=\"155.5\" y1=\"141.5\" x2=\"168.5\" y2=\"154.5\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><line x1=\"155.5\" y1=\"154.5\" x2=\"168.5\" y2=\"141.5\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><line x1=\"155.5\" y1=\"119.5\" x2=\"168.5\" y2=\"132.5\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><line x1=\"155.5\" y1=\"132.5\" x2=\"168.5\" y2=\"119.5\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><line x1=\"155.5\" y1=\"97.5\" x2=\"168.5\" y2=\"110.5\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><line x1=\"155.5\" y1=\"110.5\" x2=\"168.5\" y2=\"97.5\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><line x1=\"155.5\" y1=\"75.5\" x2=\"168.5\" y2=\"88.5\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><line x1=\"155.5\" y1=\"88.5\" x2=\"168.5\" y2=\"75.5\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><line x1=\"155.5\" y1=\"53.5\" x2=\"168.5\" y2=\"66.5\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><line x1=\"155.5\" y1=\"66.5\" x2=\"168.5\" y2=\"53.5\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><line x1=\"220.0\" y1=\"161.0\" x2=\"220.0\" y2=\"175.0\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><text x=\"220.0\" y=\"194.0\" text-anchor=\"middle\" font-size=\"15\" fill=\"#1b2a3a\">3\u00be</text><line x1=\"213.5\" y1=\"141.5\" x2=\"226.5\" y2=\"154.5\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><line x1=\"213.5\" y1=\"154.5\" x2=\"226.5\" y2=\"141.5\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><line x1=\"213.5\" y1=\"119.5\" x2=\"226.5\" y2=\"132.5\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><line x1=\"213.5\" y1=\"132.5\" x2=\"226.5\" y2=\"119.5\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><line x1=\"278.0\" y1=\"161.0\" x2=\"278.0\" y2=\"175.0\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><text x=\"278.0\" y=\"194.0\" text-anchor=\"middle\" font-size=\"15\" fill=\"#1b2a3a\">4</text><line x1=\"271.5\" y1=\"141.5\" x2=\"284.5\" y2=\"154.5\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><line x1=\"271.5\" y1=\"154.5\" x2=\"284.5\" y2=\"141.5\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><line x1=\"336.0\" y1=\"161.0\" x2=\"336.0\" y2=\"175.0\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><text x=\"336.0\" y=\"194.0\" text-anchor=\"middle\" font-size=\"15\" fill=\"#1b2a3a\">4\u00bc</text><line x1=\"394.0\" y1=\"161.0\" x2=\"394.0\" y2=\"175.0\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><text x=\"394.0\" y=\"194.0\" text-anchor=\"middle\" font-size=\"15\" fill=\"#1b2a3a\">4\u00bd</text></svg>",
    "options": [
      "4 cm (12 dates)",
      "3 cm (5 dates)",
      "5 cm (3 dates)",
      "12 cm (4 dates)"
    ],
    "answer": 0,
    "hint": "The column with the highest stack of Xs represents the mode: 4 cm with 12 dates!",
    "explanation": "(a) Count the \u2717s above 3\u00bd: 5. (b) 1 + 3 + 5 + 2 + 1 = 12 dates. (c) Longest 4 cm, shortest 3 cm: 4 \u2212 3 = 1 cm."
  },
  {
    "id": "timss_g4_45",
    "num": 45,
    "title": "Triathlon Results",
    "domain": "data",
    "domLabel": "Data & Graphs",
    "cognitive": "Reasoning",
    "standard": "4.NBT.4, 3.MD.3",
    "q": "In a triathlon, athletes swim, then cycle, then run. The table shows the results for Hind, Mariam and Nour.<table class=\"dtable\"><tr><th>Triathlon Results (minutes)</th><th>Hind</th><th>Mariam</th><th>Nour</th></tr><tr><td>Swimming</td><td>35</td><td>25</td><td>50</td></tr><tr><td>Cycling</td><td>80</td><td>90</td><td>85</td></tr><tr><td>Running</td><td>135</td><td>130</td><td>120</td></tr><tr><td><b>Total</b></td><td>250</td><td></td><td></td></tr></table><b>(a)</b> The person with the smallest total time wins. Who won? How long did she take?<br><b>(b)</b> Nour wants to beat Hind and Mariam next year. In which event does she most need to improve? \u2610 Swimming &nbsp; \u2610 Cycling &nbsp; \u2610 Running &nbsp; <b>Explain</b> why, using the table.",
    "svg": null,
    "options": [
      "Fatima (by 25 minutes)",
      "Mariam (by 25 minutes)",
      "Both tied at 245 minutes",
      "Fatima (by 15 minutes)"
    ],
    "answer": 0,
    "hint": "In a race, the lowest time wins: Fatima took 220 min, which is 25 min faster than 245 min!",
    "explanation": "(a) Mariam: 25 + 90 + 130 = 245. Nour: 50 + 85 + 120 = 255. Hind: 250. The smallest total is 245, so Mariam won in 245 minutes. (b) Nour is already the fastest runner (120). Her swimming (50) is 15 minutes slower than Hind and 25 slower than Mariam. So she most needs to improve in swimming. (She needs to save more than 10 minutes in total to win.)"
  },
  {
    "id": "timss_g4_46",
    "num": 46,
    "title": "Favourite Colours Tally",
    "domain": "data",
    "domLabel": "Data & Graphs",
    "cognitive": "Applying",
    "standard": "3.MD.3, 4.MD.4",
    "q": "Ms Noura asked her students to name their favourite colour. She wrote each answer on the board:<table class=\"dtable names\"><tr><td>Sara \u2013 green</td><td>Hind \u2013 yellow</td><td>Mashael \u2013 blue</td><td>Hanan \u2013 green</td></tr><tr><td>Amina \u2013 brown</td><td>Khawla \u2013 red</td><td>Zainab \u2013 red</td><td>Fawzia \u2013 brown</td></tr><tr><td>Mariam \u2013 green</td><td>Huda \u2013 red</td><td>Badrea \u2013 blue</td><td>Jamila \u2013 blue</td></tr><tr><td>Sana \u2013 yellow</td><td>Hessa \u2013 red</td><td>Laila \u2013 blue</td><td>Suad \u2013 yellow</td></tr></table>Complete the tally chart and the missing numbers.<table class=\"dtable tally\"><tr><th>Colour</th><th>Tally</th><th>Number of Students</th></tr><tr><td>Blue</td><td></td><td>4</td></tr><tr><td>Brown</td><td></td><td></td></tr><tr><td>Green</td><td></td><td>3</td></tr><tr><td>Red</td><td></td><td>4</td></tr><tr><td>Yellow</td><td></td><td></td></tr></table>",
    "svg": null,
    "options": [
      "5 votes",
      "4 votes",
      "6 votes",
      "7 votes"
    ],
    "answer": 0,
    "hint": "Total 16 \u2212 (4 Blue + 3 Green + 4 Red) = 16 \u2212 11 = 5 votes remaining for Yellow & Brown!",
    "explanation": "Brown: Amina, Fawzia = 2. Yellow: Hind, Sana, Suad = 3. Check: 4 + 2 + 3 + 4 + 3 = 16 students \u2713."
  },
  {
    "id": "timss_g4_47",
    "num": 47,
    "title": "Ages of Four People",
    "domain": "data",
    "domLabel": "Data & Graphs",
    "cognitive": "Applying",
    "standard": "3.MD.3",
    "q": "The graph shows the ages of 4 people. How many years older is <b>Husain</b> than <b>Marwa</b>?",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 380 222\" style=\"width:100%;max-width:380px\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ar\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto-start-reverse\"><path d=\"M0,0 L10,5 L0,10 z\" fill=\"#1b2a3a\"/></marker></defs><text x=\"215.0\" y=\"18.0\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">Ages of 4 People</text><line x1=\"58.0\" y1=\"194.0\" x2=\"64.0\" y2=\"194.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"55.0\" y=\"198.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">0</text><line x1=\"64.0\" y1=\"174.0\" x2=\"366.0\" y2=\"174.0\" stroke=\"#c9d3df\" stroke-width=\"1\"/><line x1=\"58.0\" y1=\"174.0\" x2=\"64.0\" y2=\"174.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"55.0\" y=\"178.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">5</text><line x1=\"64.0\" y1=\"154.0\" x2=\"366.0\" y2=\"154.0\" stroke=\"#c9d3df\" stroke-width=\"1\"/><line x1=\"58.0\" y1=\"154.0\" x2=\"64.0\" y2=\"154.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"55.0\" y=\"158.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">10</text><line x1=\"64.0\" y1=\"134.0\" x2=\"366.0\" y2=\"134.0\" stroke=\"#c9d3df\" stroke-width=\"1\"/><line x1=\"58.0\" y1=\"134.0\" x2=\"64.0\" y2=\"134.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"55.0\" y=\"138.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">15</text><line x1=\"64.0\" y1=\"114.0\" x2=\"366.0\" y2=\"114.0\" stroke=\"#c9d3df\" stroke-width=\"1\"/><line x1=\"58.0\" y1=\"114.0\" x2=\"64.0\" y2=\"114.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"55.0\" y=\"118.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">20</text><line x1=\"64.0\" y1=\"94.0\" x2=\"366.0\" y2=\"94.0\" stroke=\"#c9d3df\" stroke-width=\"1\"/><line x1=\"58.0\" y1=\"94.0\" x2=\"64.0\" y2=\"94.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"55.0\" y=\"98.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">25</text><line x1=\"64.0\" y1=\"74.0\" x2=\"366.0\" y2=\"74.0\" stroke=\"#c9d3df\" stroke-width=\"1\"/><line x1=\"58.0\" y1=\"74.0\" x2=\"64.0\" y2=\"74.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"55.0\" y=\"78.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">30</text><line x1=\"64.0\" y1=\"54.0\" x2=\"366.0\" y2=\"54.0\" stroke=\"#c9d3df\" stroke-width=\"1\"/><line x1=\"58.0\" y1=\"54.0\" x2=\"64.0\" y2=\"54.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"55.0\" y=\"58.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">35</text><line x1=\"64.0\" y1=\"34.0\" x2=\"366.0\" y2=\"34.0\" stroke=\"#c9d3df\" stroke-width=\"1\"/><line x1=\"58.0\" y1=\"34.0\" x2=\"64.0\" y2=\"34.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"55.0\" y=\"38.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">40</text><rect x=\"80.6\" y=\"134.0\" width=\"42.3\" height=\"60.0\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><text x=\"101.8\" y=\"213.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">Kamal</text><rect x=\"156.1\" y=\"114.0\" width=\"42.3\" height=\"80.0\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><text x=\"177.2\" y=\"213.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">Mariam</text><rect x=\"231.6\" y=\"94.0\" width=\"42.3\" height=\"100.0\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><text x=\"252.8\" y=\"213.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">Husain</text><rect x=\"307.1\" y=\"154.0\" width=\"42.3\" height=\"40.0\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><text x=\"328.2\" y=\"213.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">Marwa</text><line x1=\"64.0\" y1=\"194.0\" x2=\"64.0\" y2=\"199.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"139.5\" y1=\"194.0\" x2=\"139.5\" y2=\"199.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"215.0\" y1=\"194.0\" x2=\"215.0\" y2=\"199.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"290.5\" y1=\"194.0\" x2=\"290.5\" y2=\"199.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"366.0\" y1=\"194.0\" x2=\"366.0\" y2=\"199.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"64\" y1=\"194\" x2=\"64\" y2=\"22\" stroke=\"#1b2a3a\" stroke-width=\"1.7\" marker-end=\"url(#ar)\"/><line x1=\"64.0\" y1=\"194.0\" x2=\"366.0\" y2=\"194.0\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><text x=\"17.0\" y=\"114.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" font-weight=\"700\" transform=\"rotate(-90 17.0 114.0)\">Age (years)</text></svg>",
    "options": [
      "10",
      "12",
      "15",
      "18"
    ],
    "answer": 2,
    "hint": "Look at the bar height for Person C: the top aligns with 15 on the vertical axis!",
    "explanation": "Husain's bar reaches 25. Marwa's bar reaches 10. 25 \u2212 10 = 15 years."
  },
  {
    "id": "timss_g4_48",
    "num": 48,
    "title": "Rashed's Telephone Bill",
    "domain": "data",
    "domLabel": "Data & Graphs",
    "cognitive": "Applying",
    "standard": "3.MD.3",
    "q": "Rashed paid these telephone bills in the first six months of <b>2024</b>:<table class=\"dtable\"><tr><th>Month</th><th>Jan</th><th>Feb</th><th>Mar</th><th>Apr</th><th>May</th><th>Jun</th></tr><tr><td>Cost (AED)</td><td>65</td><td>20</td><td>60</td><td>40</td><td>60</td><td>45</td></tr></table>The bar graph shows his bills for the same months in <b>2025</b>.<br>In some months Rashed paid <b>less</b> in 2025 than in 2024. In which months?",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 420 226\" style=\"width:100%;max-width:420px\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ar\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto-start-reverse\"><path d=\"M0,0 L10,5 L0,10 z\" fill=\"#1b2a3a\"/></marker></defs><text x=\"235.0\" y=\"18.0\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">Rashed's Telephone Bill in 2025</text><line x1=\"58.0\" y1=\"178.0\" x2=\"64.0\" y2=\"178.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"55.0\" y=\"182.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">0</text><line x1=\"64.0\" y1=\"160.0\" x2=\"406.0\" y2=\"160.0\" stroke=\"#c9d3df\" stroke-width=\"1\"/><line x1=\"58.0\" y1=\"160.0\" x2=\"64.0\" y2=\"160.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"55.0\" y=\"164.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">10</text><line x1=\"64.0\" y1=\"142.0\" x2=\"406.0\" y2=\"142.0\" stroke=\"#c9d3df\" stroke-width=\"1\"/><line x1=\"58.0\" y1=\"142.0\" x2=\"64.0\" y2=\"142.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"55.0\" y=\"146.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">20</text><line x1=\"64.0\" y1=\"124.0\" x2=\"406.0\" y2=\"124.0\" stroke=\"#c9d3df\" stroke-width=\"1\"/><line x1=\"58.0\" y1=\"124.0\" x2=\"64.0\" y2=\"124.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"55.0\" y=\"128.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">30</text><line x1=\"64.0\" y1=\"106.0\" x2=\"406.0\" y2=\"106.0\" stroke=\"#c9d3df\" stroke-width=\"1\"/><line x1=\"58.0\" y1=\"106.0\" x2=\"64.0\" y2=\"106.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"55.0\" y=\"110.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">40</text><line x1=\"64.0\" y1=\"88.0\" x2=\"406.0\" y2=\"88.0\" stroke=\"#c9d3df\" stroke-width=\"1\"/><line x1=\"58.0\" y1=\"88.0\" x2=\"64.0\" y2=\"88.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"55.0\" y=\"92.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">50</text><line x1=\"64.0\" y1=\"70.0\" x2=\"406.0\" y2=\"70.0\" stroke=\"#c9d3df\" stroke-width=\"1\"/><line x1=\"58.0\" y1=\"70.0\" x2=\"64.0\" y2=\"70.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"55.0\" y=\"74.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">60</text><line x1=\"64.0\" y1=\"52.0\" x2=\"406.0\" y2=\"52.0\" stroke=\"#c9d3df\" stroke-width=\"1\"/><line x1=\"58.0\" y1=\"52.0\" x2=\"64.0\" y2=\"52.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"55.0\" y=\"56.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">70</text><line x1=\"64.0\" y1=\"34.0\" x2=\"406.0\" y2=\"34.0\" stroke=\"#c9d3df\" stroke-width=\"1\"/><line x1=\"58.0\" y1=\"34.0\" x2=\"64.0\" y2=\"34.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"55.0\" y=\"38.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">80</text><line x1=\"60.5\" y1=\"169.0\" x2=\"64.0\" y2=\"169.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"60.5\" y1=\"151.0\" x2=\"64.0\" y2=\"151.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"60.5\" y1=\"133.0\" x2=\"64.0\" y2=\"133.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"60.5\" y1=\"115.0\" x2=\"64.0\" y2=\"115.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"60.5\" y1=\"97.0\" x2=\"64.0\" y2=\"97.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"60.5\" y1=\"79.0\" x2=\"64.0\" y2=\"79.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"60.5\" y1=\"61.0\" x2=\"64.0\" y2=\"61.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"60.5\" y1=\"43.0\" x2=\"64.0\" y2=\"43.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><rect x=\"76.5\" y=\"43.0\" width=\"31.9\" height=\"135.0\" rx=\"0\" fill=\"#d9d9d9\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><text x=\"92.5\" y=\"197.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">Jan</text><rect x=\"133.5\" y=\"133.0\" width=\"31.9\" height=\"45.0\" rx=\"0\" fill=\"#d9d9d9\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><text x=\"149.5\" y=\"197.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">Feb</text><rect x=\"190.5\" y=\"79.0\" width=\"31.9\" height=\"99.0\" rx=\"0\" fill=\"#d9d9d9\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><text x=\"206.5\" y=\"197.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">Mar</text><rect x=\"247.5\" y=\"115.0\" width=\"31.9\" height=\"63.0\" rx=\"0\" fill=\"#d9d9d9\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><text x=\"263.5\" y=\"197.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">Apr</text><rect x=\"304.5\" y=\"70.0\" width=\"31.9\" height=\"108.0\" rx=\"0\" fill=\"#d9d9d9\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><text x=\"320.5\" y=\"197.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">May</text><rect x=\"361.5\" y=\"79.0\" width=\"31.9\" height=\"99.0\" rx=\"0\" fill=\"#d9d9d9\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><text x=\"377.5\" y=\"197.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">Jun</text><line x1=\"64.0\" y1=\"178.0\" x2=\"64.0\" y2=\"183.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"121.0\" y1=\"178.0\" x2=\"121.0\" y2=\"183.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"178.0\" y1=\"178.0\" x2=\"178.0\" y2=\"183.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"235.0\" y1=\"178.0\" x2=\"235.0\" y2=\"183.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"292.0\" y1=\"178.0\" x2=\"292.0\" y2=\"183.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"349.0\" y1=\"178.0\" x2=\"349.0\" y2=\"183.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"406.0\" y1=\"178.0\" x2=\"406.0\" y2=\"183.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><rect x=\"64.0\" y=\"34.0\" width=\"342.0\" height=\"144.0\" rx=\"0\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><text x=\"235.0\" y=\"218.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" font-weight=\"700\">Months</text><text x=\"17.0\" y=\"106.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" font-weight=\"700\" transform=\"rotate(-90 17.0 106.0)\">Cost (AED)</text></svg>",
    "options": [
      "March and April",
      "January and February",
      "April and May",
      "May and June"
    ],
    "answer": 0,
    "hint": "March and April bars both reach the exact same level (AED 120)!",
    "explanation": "Compare each month: Jan 65 \u2192 75 (more), Feb 20 \u2192 25 (more), Mar 60 \u2192 55 (less). Apr 40 \u2192 35 (less), May 60 \u2192 60 (same), Jun 45 \u2192 55 (more). Answer: March and April."
  },
  {
    "id": "timss_g4_49",
    "num": 49,
    "title": "Our Favourite UAE Places",
    "domain": "data",
    "domLabel": "Data & Graphs",
    "cognitive": "Knowing",
    "standard": "TIMSS circle graphs (3.MD.3)",
    "q": "Grade 4 students chose their favourite place to visit. The circle graph shows the results.<br><b>(a)</b> Which place did <b>half</b> of the students choose?&nbsp;&nbsp; <b>(b)</b> What fraction of the students chose <b>Jebel Jais</b>?<br><b>(c)</b> Which two places were chosen by the same number of students?",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 340 216\" style=\"width:100%;max-width:340px\" xmlns=\"http://www.w3.org/2000/svg\"><text x=\"200.0\" y=\"18.0\" text-anchor=\"middle\" font-size=\"15\" fill=\"#1b2a3a\" font-weight=\"700\">Our Favourite UAE Places</text><path d=\"M226.0,118.0 L226.0,30.0 A88,88 0 0 1 226.0,206.0 Z\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"1.8\" stroke-linejoin=\"round\"/><path d=\"M226.0,118.0 L226.0,206.0 A88,88 0 0 1 138.0,118.0 Z\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.8\" stroke-linejoin=\"round\"/><path d=\"M226.0,118.0 L138.0,118.0 A88,88 0 0 1 163.8,55.8 Z\" fill=\"#d9d9d9\" stroke=\"#1b2a3a\" stroke-width=\"1.8\" stroke-linejoin=\"round\"/><path d=\"M226.0,118.0 L163.8,55.8 A88,88 0 0 1 226.0,30.0 Z\" fill=\"#ffffff\" stroke=\"#1b2a3a\" stroke-width=\"1.8\" stroke-linejoin=\"round\"/><text x=\"278.8\" y=\"123.0\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">Hatta</text><text x=\"182.7\" y=\"160.3\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">Jebel Jais</text><line x1=\"167.5\" y1=\"93.8\" x2=\"135.5\" y2=\"80.5\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"135.5\" y1=\"80.5\" x2=\"118.0\" y2=\"87.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"114.0\" y=\"92.0\" text-anchor=\"end\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">Sir Bani Yas</text><line x1=\"201.8\" y1=\"59.5\" x2=\"188.5\" y2=\"27.5\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"188.5\" y1=\"27.5\" x2=\"136.0\" y2=\"31.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"132.0\" y=\"36.0\" text-anchor=\"end\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">Al Ain Zoo</text></svg>",
    "options": [
      "10 students",
      "5 students",
      "15 students",
      "20 students"
    ],
    "answer": 0,
    "hint": "Hatta is 1/4 of the circle. 1/4 of 40 students = 40 \u00f7 4 = 10 students!",
    "explanation": "(a) Hatta fills half of the circle. (b) Jebel Jais fills one quarter: 1/4. (c) Sir Bani Yas and Al Ain Zoo are the same size (1/8 each)."
  },
  {
    "id": "timss_g4_50",
    "num": 50,
    "title": "Arabian Oryx at Two Reserves",
    "domain": "data",
    "domLabel": "Data & Graphs",
    "cognitive": "Reasoning",
    "standard": "TIMSS dual data sets (3.MD.3)",
    "q": "The double bar graph shows the number of Arabian oryx at two nature reserves (model data).<br><b>(a)</b> By how many oryx does Reserve A grow each year?<br><b>(b)</b> Hamdan says, <i>\u201cIn 2025 Reserve A will have <b>more</b> oryx than Reserve B.\u201d</i> Do you agree? <b>Explain</b> using the graph.",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 440 230\" style=\"width:100%;max-width:440px\" xmlns=\"http://www.w3.org/2000/svg\"><defs><pattern id=\"g4s50h\" patternUnits=\"userSpaceOnUse\" width=\"8\" height=\"8\"><rect width=\"8\" height=\"8\" fill=\"#fff\"/><path d=\"M0,8 L8,0 M-2,2 L2,-2 M6,10 L10,6\" stroke=\"#4a4a4a\" stroke-width=\"1.4\"/></pattern></defs><text x=\"220.0\" y=\"18.0\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">Arabian Oryx at Two Reserves (model data)</text><rect x=\"150.0\" y=\"30.0\" width=\"22.0\" height=\"15.0\" rx=\"0\" fill=\"#d9d9d9\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"180.0\" y=\"42.0\" text-anchor=\"start\" font-size=\"13\" fill=\"#1b2a3a\">Reserve A</text><rect x=\"270.0\" y=\"30.0\" width=\"22.0\" height=\"15.0\" rx=\"0\" fill=\"url(#g4s50h)\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"300.0\" y=\"42.0\" text-anchor=\"start\" font-size=\"13\" fill=\"#1b2a3a\">Reserve B</text><line x1=\"54.0\" y1=\"184.0\" x2=\"60.0\" y2=\"184.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"51.0\" y=\"188.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">0</text><line x1=\"60.0\" y1=\"163.0\" x2=\"428.0\" y2=\"163.0\" stroke=\"#c9d3df\" stroke-width=\"1\"/><line x1=\"54.0\" y1=\"163.0\" x2=\"60.0\" y2=\"163.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"51.0\" y=\"167.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">10</text><line x1=\"60.0\" y1=\"142.0\" x2=\"428.0\" y2=\"142.0\" stroke=\"#c9d3df\" stroke-width=\"1\"/><line x1=\"54.0\" y1=\"142.0\" x2=\"60.0\" y2=\"142.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"51.0\" y=\"146.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">20</text><line x1=\"60.0\" y1=\"121.0\" x2=\"428.0\" y2=\"121.0\" stroke=\"#c9d3df\" stroke-width=\"1\"/><line x1=\"54.0\" y1=\"121.0\" x2=\"60.0\" y2=\"121.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"51.0\" y=\"125.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">30</text><line x1=\"60.0\" y1=\"100.0\" x2=\"428.0\" y2=\"100.0\" stroke=\"#c9d3df\" stroke-width=\"1\"/><line x1=\"54.0\" y1=\"100.0\" x2=\"60.0\" y2=\"100.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"51.0\" y=\"104.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">40</text><line x1=\"60.0\" y1=\"79.0\" x2=\"428.0\" y2=\"79.0\" stroke=\"#c9d3df\" stroke-width=\"1\"/><line x1=\"54.0\" y1=\"79.0\" x2=\"60.0\" y2=\"79.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"51.0\" y=\"83.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">50</text><line x1=\"60.0\" y1=\"58.0\" x2=\"428.0\" y2=\"58.0\" stroke=\"#c9d3df\" stroke-width=\"1\"/><line x1=\"54.0\" y1=\"58.0\" x2=\"60.0\" y2=\"58.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"51.0\" y=\"62.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">60</text><rect x=\"76.6\" y=\"142.0\" width=\"29.4\" height=\"42.0\" rx=\"0\" fill=\"#d9d9d9\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"106.0\" y=\"79.0\" width=\"29.4\" height=\"105.0\" rx=\"0\" fill=\"url(#g4s50h)\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><text x=\"106.0\" y=\"202.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">2021</text><rect x=\"168.6\" y=\"129.4\" width=\"29.4\" height=\"54.6\" rx=\"0\" fill=\"#d9d9d9\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"198.0\" y=\"83.2\" width=\"29.4\" height=\"100.8\" rx=\"0\" fill=\"url(#g4s50h)\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><text x=\"198.0\" y=\"202.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">2022</text><rect x=\"260.6\" y=\"116.8\" width=\"29.4\" height=\"67.2\" rx=\"0\" fill=\"#d9d9d9\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"290.0\" y=\"87.4\" width=\"29.4\" height=\"96.6\" rx=\"0\" fill=\"url(#g4s50h)\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><text x=\"290.0\" y=\"202.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">2023</text><rect x=\"352.6\" y=\"104.2\" width=\"29.4\" height=\"79.8\" rx=\"0\" fill=\"#d9d9d9\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"382.0\" y=\"91.6\" width=\"29.4\" height=\"92.4\" rx=\"0\" fill=\"url(#g4s50h)\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><text x=\"382.0\" y=\"202.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">2024</text><line x1=\"60.0\" y1=\"52.0\" x2=\"60.0\" y2=\"184.0\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><line x1=\"60.0\" y1=\"184.0\" x2=\"428.0\" y2=\"184.0\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><text x=\"244.0\" y=\"222.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" font-weight=\"700\">Year</text><text x=\"17.0\" y=\"121.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" font-weight=\"700\" transform=\"rotate(-90 17.0 121.0)\">Number of oryx</text></svg>",
    "options": [
      "44 oryx",
      "26 oryx",
      "38 oryx",
      "50 oryx"
    ],
    "answer": 0,
    "hint": "Starting 20 + (6 per year \u00d7 4 years) = 20 + 24 = 44 oryx!",
    "explanation": "(a) Reserve A: 20, 26, 32, 38 \u2014 it grows by 6 each year. Reserve B: 50, 48, 46, 44 \u2014 it goes down by 2 each year. (b) 2025: A \u2248 38 + 6 = 44, B \u2248 44 \u2212 2 = 42. 44 > 42, so agree."
  },
  {
    "id": "timss_g4_51",
    "num": 51,
    "title": "Mystery Number I",
    "domain": "extended",
    "domLabel": "Advanced Reasoning",
    "cognitive": "Reasoning",
    "standard": "4.OA.4",
    "q": "<b>(a)</b> Find a number that is <b>less than 50</b>, is <b>odd</b>, is a <b>multiple of 7</b> and has <b>3 as a factor</b>.<br><b>(b)</b> Find a number between 20 and 40 that is a multiple of 4 <b>and</b> a multiple of 6. Is there only one? Explain.",
    "svg": null,
    "options": [
      "21",
      "28",
      "35",
      "14"
    ],
    "answer": 0,
    "hint": "Multiples of 7 less than 40: 7, 14, 21, 28, 35. For 21: 2 + 1 = 3!",
    "explanation": "(a) Multiples of 7 below 50: 7, 14, 21, 28, 35, 42, 49. Odd ones: 7, 21, 35, 49. Which have 3 as a factor? Only 21 (21 = 3 \u00d7 7). (b) Multiples of 4 between 20 and 40: 24, 28, 32, 36. Multiples of 6: 24, 30, 36. Both: 24 and 36, so there are two answers."
  },
  {
    "id": "timss_g4_52",
    "num": 52,
    "title": "Ice Cream Prices",
    "domain": "extended",
    "domLabel": "Advanced Reasoning",
    "cognitive": "Reasoning",
    "standard": "4.OA.3",
    "q": "Bilal and Jamila bought ice creams at the same shop. All cones cost the same and all lollies cost the same.<br><b>(a)</b> How much do <b>one cone and one lolly</b> cost together?&nbsp;&nbsp; <b>(b)</b> How much does <b>one lolly</b> cost?",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 432 154\" style=\"width:100%;max-width:432px\" xmlns=\"http://www.w3.org/2000/svg\"><text x=\"8.0\" y=\"43.0\" text-anchor=\"start\" font-size=\"13\" fill=\"#1b2a3a\" font-weight=\"700\">Bilal bought:</text><polygon points=\"112.0,28.0 136.0,28.0 124.0,66.0\" fill=\"#f6ead2\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"116.6\" y1=\"42.7\" x2=\"126.2\" y2=\"59.0\" stroke=\"#8a6d3b\" stroke-width=\"1.1\"/><line x1=\"116.0\" y1=\"28.0\" x2=\"129.0\" y2=\"50.1\" stroke=\"#8a6d3b\" stroke-width=\"1.1\"/><line x1=\"116.0\" y1=\"28.0\" x2=\"113.4\" y2=\"32.4\" stroke=\"#8a6d3b\" stroke-width=\"1.1\"/><line x1=\"124.0\" y1=\"28.0\" x2=\"131.8\" y2=\"41.3\" stroke=\"#8a6d3b\" stroke-width=\"1.1\"/><line x1=\"124.0\" y1=\"28.0\" x2=\"116.2\" y2=\"41.3\" stroke=\"#8a6d3b\" stroke-width=\"1.1\"/><line x1=\"132.0\" y1=\"28.0\" x2=\"134.6\" y2=\"32.4\" stroke=\"#8a6d3b\" stroke-width=\"1.1\"/><line x1=\"132.0\" y1=\"28.0\" x2=\"119.0\" y2=\"50.1\" stroke=\"#8a6d3b\" stroke-width=\"1.1\"/><line x1=\"131.4\" y1=\"42.7\" x2=\"121.8\" y2=\"59.0\" stroke=\"#8a6d3b\" stroke-width=\"1.1\"/><polygon points=\"112.0,28.0 136.0,28.0 124.0,66.0\" fill=\"none\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><path d=\"M110,27 A14,14 0 1 1 138,27 q-1.75,4 -3.5,0 q-1.75,4 -3.5,0 q-1.75,4 -3.5,0 q-1.75,4 -3.5,0 q-1.75,4 -3.5,0 q-1.75,4 -3.5,0 q-1.75,4 -3.5,0 q-1.75,4 -3.5,0 Z\" fill=\"#ffffff\" stroke=\"#1b2a3a\" stroke-width=\"1.6\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><polygon points=\"146.0,28.0 170.0,28.0 158.0,66.0\" fill=\"#f6ead2\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"150.6\" y1=\"42.7\" x2=\"160.2\" y2=\"59.0\" stroke=\"#8a6d3b\" stroke-width=\"1.1\"/><line x1=\"150.0\" y1=\"28.0\" x2=\"163.0\" y2=\"50.1\" stroke=\"#8a6d3b\" stroke-width=\"1.1\"/><line x1=\"150.0\" y1=\"28.0\" x2=\"147.4\" y2=\"32.4\" stroke=\"#8a6d3b\" stroke-width=\"1.1\"/><line x1=\"158.0\" y1=\"28.0\" x2=\"165.8\" y2=\"41.3\" stroke=\"#8a6d3b\" stroke-width=\"1.1\"/><line x1=\"158.0\" y1=\"28.0\" x2=\"150.2\" y2=\"41.3\" stroke=\"#8a6d3b\" stroke-width=\"1.1\"/><line x1=\"166.0\" y1=\"28.0\" x2=\"168.6\" y2=\"32.4\" stroke=\"#8a6d3b\" stroke-width=\"1.1\"/><line x1=\"166.0\" y1=\"28.0\" x2=\"153.0\" y2=\"50.1\" stroke=\"#8a6d3b\" stroke-width=\"1.1\"/><line x1=\"165.4\" y1=\"42.7\" x2=\"155.8\" y2=\"59.0\" stroke=\"#8a6d3b\" stroke-width=\"1.1\"/><polygon points=\"146.0,28.0 170.0,28.0 158.0,66.0\" fill=\"none\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><path d=\"M144,27 A14,14 0 1 1 172,27 q-1.75,4 -3.5,0 q-1.75,4 -3.5,0 q-1.75,4 -3.5,0 q-1.75,4 -3.5,0 q-1.75,4 -3.5,0 q-1.75,4 -3.5,0 q-1.75,4 -3.5,0 q-1.75,4 -3.5,0 Z\" fill=\"#ffffff\" stroke=\"#1b2a3a\" stroke-width=\"1.6\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><rect x=\"188.5\" y=\"48.0\" width=\"7.0\" height=\"18.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><path d=\"M181,52 L181,20 A11,11 0 0 1 203,20 L203,52 Z\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"1.6\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><line x1=\"181.0\" y1=\"32.0\" x2=\"203.0\" y2=\"32.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"181.0\" y1=\"42.0\" x2=\"203.0\" y2=\"42.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><rect x=\"222.5\" y=\"48.0\" width=\"7.0\" height=\"18.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><path d=\"M215,52 L215,20 A11,11 0 0 1 237,20 L237,52 Z\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"1.6\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><line x1=\"215.0\" y1=\"32.0\" x2=\"237.0\" y2=\"32.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"215.0\" y1=\"42.0\" x2=\"237.0\" y2=\"42.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><rect x=\"256.5\" y=\"48.0\" width=\"7.0\" height=\"18.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><path d=\"M249,52 L249,20 A11,11 0 0 1 271,20 L271,52 Z\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"1.6\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><line x1=\"249.0\" y1=\"32.0\" x2=\"271.0\" y2=\"32.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"249.0\" y1=\"42.0\" x2=\"271.0\" y2=\"42.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><rect x=\"290.5\" y=\"48.0\" width=\"7.0\" height=\"18.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><path d=\"M283,52 L283,20 A11,11 0 0 1 305,20 L305,52 Z\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"1.6\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><line x1=\"283.0\" y1=\"32.0\" x2=\"305.0\" y2=\"32.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"283.0\" y1=\"42.0\" x2=\"305.0\" y2=\"42.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"330.0\" y=\"43.0\" text-anchor=\"start\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">Cost: AED 22</text><text x=\"8.0\" y=\"123.0\" text-anchor=\"start\" font-size=\"13\" fill=\"#1b2a3a\" font-weight=\"700\">Jamila bought:</text><polygon points=\"112.0,108.0 136.0,108.0 124.0,146.0\" fill=\"#f6ead2\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"116.6\" y1=\"122.7\" x2=\"126.2\" y2=\"139.0\" stroke=\"#8a6d3b\" stroke-width=\"1.1\"/><line x1=\"116.0\" y1=\"108.0\" x2=\"129.0\" y2=\"130.1\" stroke=\"#8a6d3b\" stroke-width=\"1.1\"/><line x1=\"116.0\" y1=\"108.0\" x2=\"113.4\" y2=\"112.4\" stroke=\"#8a6d3b\" stroke-width=\"1.1\"/><line x1=\"124.0\" y1=\"108.0\" x2=\"131.8\" y2=\"121.3\" stroke=\"#8a6d3b\" stroke-width=\"1.1\"/><line x1=\"124.0\" y1=\"108.0\" x2=\"116.2\" y2=\"121.3\" stroke=\"#8a6d3b\" stroke-width=\"1.1\"/><line x1=\"132.0\" y1=\"108.0\" x2=\"134.6\" y2=\"112.4\" stroke=\"#8a6d3b\" stroke-width=\"1.1\"/><line x1=\"132.0\" y1=\"108.0\" x2=\"119.0\" y2=\"130.1\" stroke=\"#8a6d3b\" stroke-width=\"1.1\"/><line x1=\"131.4\" y1=\"122.7\" x2=\"121.8\" y2=\"139.0\" stroke=\"#8a6d3b\" stroke-width=\"1.1\"/><polygon points=\"112.0,108.0 136.0,108.0 124.0,146.0\" fill=\"none\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><path d=\"M110,107 A14,14 0 1 1 138,107 q-1.75,4 -3.5,0 q-1.75,4 -3.5,0 q-1.75,4 -3.5,0 q-1.75,4 -3.5,0 q-1.75,4 -3.5,0 q-1.75,4 -3.5,0 q-1.75,4 -3.5,0 q-1.75,4 -3.5,0 Z\" fill=\"#ffffff\" stroke=\"#1b2a3a\" stroke-width=\"1.6\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><rect x=\"154.5\" y=\"128.0\" width=\"7.0\" height=\"18.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><path d=\"M147,132 L147,100 A11,11 0 0 1 169,100 L169,132 Z\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"1.6\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><line x1=\"147.0\" y1=\"112.0\" x2=\"169.0\" y2=\"112.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"147.0\" y1=\"122.0\" x2=\"169.0\" y2=\"122.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><rect x=\"188.5\" y=\"128.0\" width=\"7.0\" height=\"18.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><path d=\"M181,132 L181,100 A11,11 0 0 1 203,100 L203,132 Z\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"1.6\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><line x1=\"181.0\" y1=\"112.0\" x2=\"203.0\" y2=\"112.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"181.0\" y1=\"122.0\" x2=\"203.0\" y2=\"122.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><rect x=\"222.5\" y=\"128.0\" width=\"7.0\" height=\"18.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><path d=\"M215,132 L215,100 A11,11 0 0 1 237,100 L237,132 Z\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"1.6\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><line x1=\"215.0\" y1=\"112.0\" x2=\"237.0\" y2=\"112.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"215.0\" y1=\"122.0\" x2=\"237.0\" y2=\"122.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"330.0\" y=\"123.0\" text-anchor=\"start\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">Cost: AED 14</text><line x1=\"8.0\" y1=\"82.0\" x2=\"424.0\" y2=\"82.0\" stroke=\"#c9d3df\" stroke-width=\"1.2\"/></svg>",
    "options": [
      "AED 3",
      "AED 4",
      "AED 5",
      "AED 9"
    ],
    "answer": 0,
    "hint": "3 fruit lollies cost AED 17 \u2212 AED 8 = AED 9. One lolly = 9 \u00f7 3 = AED 3!",
    "explanation": "Half of Bilal's order: 1 cone + 2 lollies = AED 11. Jamila: 1 cone + 3 lollies = AED 14. The difference is 1 lolly = 14 \u2212 11 = AED 3. 1 cone = 11 \u2212 2 \u00d7 3 = AED 5, so 1 cone + 1 lolly = AED 8. Check: 2 \u00d7 5 + 4 \u00d7 3 = 22 \u2713 and 5 + 3 \u00d7 3 = 14 \u2713."
  },
  {
    "id": "timss_g4_53",
    "num": 53,
    "title": "Balancing Number Sentences",
    "domain": "extended",
    "domLabel": "Advanced Reasoning",
    "cognitive": "Reasoning",
    "standard": "4.OA.3 (3.OA.4)",
    "q": "Find the value of each symbol. The same symbol always stands for the same number.<br><b>(a)</b>&nbsp; 14 + \u2610 = 6 \u00d7 3<br><b>(b)</b>&nbsp; 3 + 8 = \u25cb + 6<br><b>(c)</b>&nbsp; \u25b3 + \u25b3 + 5 = 29<br><b>(d)</b>&nbsp; \u25b3 \u00d7 \u2610 = ?&nbsp; (use your answers)",
    "svg": null,
    "options": [
      "5",
      "4",
      "6",
      "10"
    ],
    "answer": 0,
    "hint": "\u2610 = 12 \u2212 8 = 4. Then 4 \u00d7 \u25cb = 20, so \u25cb = 20 \u00f7 4 = 5!",
    "explanation": "(a) 6 \u00d7 3 = 18, so 14 + \u2610 = 18 and \u2610 = 4. (b) 3 + 8 = 11, so \u25cb + 6 = 11 and \u25cb = 5. (c) \u25b3 + \u25b3 = 29 \u2212 5 = 24, so \u25b3 = 24 \u00f7 2 = 12. (d) 12 \u00d7 4 = 48."
  },
  {
    "id": "timss_g4_54",
    "num": 54,
    "title": "Mystery Number II",
    "domain": "extended",
    "domLabel": "Advanced Reasoning",
    "cognitive": "Reasoning",
    "standard": "4.NBT.2, 4.OA.4",
    "q": "Find the <b>3-digit</b> number from these clues:<br>&nbsp;&nbsp;\u2022 It is a <b>multiple of 5</b>, but it is <b>odd</b>.<br>&nbsp;&nbsp;\u2022 Its <b>hundreds</b> digit is <b>double</b> its <b>tens</b> digit.<br>&nbsp;&nbsp;\u2022 The sum of its three digits is <b>14</b>.<br>Show how you used each clue.",
    "svg": null,
    "options": [
      "635",
      "425",
      "845",
      "625"
    ],
    "answer": 0,
    "hint": "Odd multiple of 5 ends in 5. Hundreds + tens = 14 \u2212 5 = 9. Hundreds is double tens: 6 and 3 \u2192 635!",
    "explanation": "A multiple of 5 that is odd ends in 5. So hundreds + tens + 5 = 14, which means hundreds + tens = 9. Hundreds is double tens: tens 3, hundreds 6 (6 + 3 = 9). The number is 635. Check: 635 \u00f7 5 = 127 \u2713, odd \u2713, 6 = 2 \u00d7 3 \u2713, 6 + 3 + 5 = 14 \u2713."
  },
  {
    "id": "timss_g4_55",
    "num": 55,
    "title": "Square and Rectangle",
    "domain": "extended",
    "domLabel": "Advanced Reasoning",
    "cognitive": "Reasoning",
    "standard": "4.MD.3",
    "q": "This shape is made of a square and a rectangle. The width of the rectangle is the same as the side of the square. The length of the rectangle is <b>twice</b> its width.<br><b>(a)</b> Find the <b>perimeter</b> of the shape.&nbsp;&nbsp; <b>(b)</b> Find the <b>area</b> of the shape.",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 220 234\" style=\"width:100%;max-width:220px\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ar\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto-start-reverse\"><path d=\"M0,0 L10,5 L0,10 z\" fill=\"#1b2a3a\"/></marker></defs><polygon points=\"30.0,190.0 198.0,190.0 198.0,22.0 114.0,22.0 114.0,106.0 30.0,106.0\" fill=\"#e3eef9\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><line x1=\"114.0\" y1=\"106.0\" x2=\"114.0\" y2=\"190.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\" stroke-dasharray=\"6 4\"/><line x1=\"30.0\" y1=\"195.0\" x2=\"30.0\" y2=\"212.0\" stroke=\"#1b2a3a\" stroke-width=\"1.2\"/><line x1=\"114.0\" y1=\"195.0\" x2=\"114.0\" y2=\"212.0\" stroke=\"#1b2a3a\" stroke-width=\"1.2\"/><line x1=\"30.0\" y1=\"206.0\" x2=\"114.0\" y2=\"206.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\" marker-start=\"url(#ar)\" marker-end=\"url(#ar)\"/><text x=\"72.0\" y=\"226.0\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">4 cm</text></svg>",
    "options": [
      "48 cm\u00b2",
      "32 cm\u00b2",
      "16 cm\u00b2",
      "64 cm\u00b2"
    ],
    "answer": 0,
    "hint": "Square area = 4 \u00d7 4 = 16 cm\u00b2. Rectangle area = 4 \u00d7 8 = 32 cm\u00b2. Combined area = 16 + 32 = 48 cm\u00b2!",
    "explanation": "Square: 4 cm by 4 cm. Rectangle: 4 cm wide and 2 \u00d7 4 = 8 cm long. (a) Outside: 4 + 4 + 4 + 4 + 8 + 8 = 32 cm (the shared side is not on the outside). (b) Area: 4 \u00d7 4 = 16 and 4 \u00d7 8 = 32; 16 + 32 = 48 cm\u00b2."
  },
  {
    "id": "timss_g4_56",
    "num": 56,
    "title": "The Majlis Floor",
    "domain": "extended",
    "domLabel": "Advanced Reasoning",
    "cognitive": "Reasoning",
    "standard": "4.MD.3",
    "q": "This is the plan of an L-shaped majlis floor. Two side lengths are missing.<br><b>(a)</b> Find the two missing side lengths.&nbsp;&nbsp; <b>(b)</b> Find the <b>perimeter</b>.&nbsp;&nbsp; <b>(c)</b> Find the <b>area</b>. Show your working.",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 300 222\" style=\"width:100%;max-width:300px\" xmlns=\"http://www.w3.org/2000/svg\"><text x=\"152.0\" y=\"18.0\" text-anchor=\"middle\" font-size=\"15\" fill=\"#1b2a3a\" font-weight=\"700\">Majlis floor</text><polygon points=\"56.0,192.0 248.0,192.0 248.0,96.0 176.0,96.0 176.0,48.0 56.0,48.0\" fill=\"#f6ead2\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"2.4\"/><text x=\"152.0\" y=\"213.0\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">8 m</text><text x=\"47.0\" y=\"125.0\" text-anchor=\"end\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">6 m</text><text x=\"116.0\" y=\"39.0\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">5 m</text><text x=\"257.0\" y=\"149.0\" text-anchor=\"start\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">4 m</text></svg>",
    "options": [
      "42 m\u00b2",
      "48 m\u00b2",
      "40 m\u00b2",
      "45 m\u00b2"
    ],
    "answer": 0,
    "hint": "Full bounding box = 8 \u00d7 6 = 48 m\u00b2. Missing corner = 3 \u00d7 2 = 6 m\u00b2. Total area = 48 \u2212 6 = 42 m\u00b2!",
    "explanation": "(a) Bottom 8 m = top 5 m + missing piece \u2192 3 m. Left 6 m = right 4 m + missing piece \u2192 2 m. (b) 8 + 4 + 3 + 2 + 5 + 6 = 28 m. (c) Split: 8 \u00d7 4 = 32 m\u00b2 and 5 \u00d7 2 = 10 m\u00b2. Total 42 m\u00b2. Check another way: 8 \u00d7 6 = 48, minus the missing corner 3 \u00d7 2 = 6 \u2192 42 \u2713."
  },
  {
    "id": "timss_g4_57",
    "num": 57,
    "title": "Saving for Global Village",
    "domain": "extended",
    "domLabel": "Advanced Reasoning",
    "cognitive": "Reasoning",
    "standard": "4.OA.3, 4.MD.2",
    "q": "Ali has <b>AED 40</b> and saves <b>AED 10</b> every week. Sara has <b>AED 10</b> and saves <b>AED 25</b> every week.<br><b>(a)</b> After how many weeks will they have the <b>same</b> amount? How much will each have?<br><b>(b)</b> Global Village tickets cost <b>AED 30</b> each. With all her money at that time, how many tickets can Sara buy? How much is left?",
    "svg": null,
    "options": [
      "2 weeks (AED 60 each)",
      "3 weeks (AED 70 each)",
      "1 week (AED 50 each)",
      "4 weeks (AED 80 each)"
    ],
    "answer": 0,
    "hint": "Week 1: Ali 50, Sara 35. Week 2: Ali 40+20=60, Sara 10+50=60! In 2 weeks they match.",
    "explanation": "Week 1: Ali 50, Sara 35. Week 2: Ali 60, Sara 60. (a) After 2 weeks both have AED 60. (b) 60 \u00f7 30 = 2, so Sara can buy 2 tickets with AED 0 left."
  },
  {
    "id": "timss_g4_58",
    "num": 58,
    "title": "Bus Trip to Al Ain",
    "domain": "extended",
    "domLabel": "Advanced Reasoning",
    "cognitive": "Reasoning",
    "standard": "4.MD.2",
    "q": "A school bus leaves <b>Dubai</b> at <b>7:45 a.m.</b> It drives <b>30 km</b> to <b>Sharjah</b> in <b>40 minutes</b> and waits there for <b>15 minutes</b>.<br>Then it drives <b>130 km</b> to <b>Al Ain</b>, which takes <b>1 hour 35 minutes</b> (model data).<br><b>(a)</b> How far does the bus travel altogether?&nbsp;&nbsp; <b>(b)</b> At what time does it arrive in Al Ain?",
    "svg": null,
    "options": [
      "10:15 a.m.",
      "10:00 a.m.",
      "10:30 a.m.",
      "9:45 a.m."
    ],
    "answer": 0,
    "hint": "7:45 + 40 min = 8:25. + 15 min wait = 8:40. + 1 hr 35 min = 10:15 a.m.!",
    "explanation": "(a) 30 + 130 = 160 km. (b) 7:45 + 40 min = 8:25. Wait 15 min \u2192 8:40. 8:40 + 1 h = 9:40; + 35 min = 10:15 a.m."
  },
  {
    "id": "timss_g4_59",
    "num": 59,
    "title": "After-School Activities",
    "domain": "extended",
    "domLabel": "Advanced Reasoning",
    "cognitive": "Reasoning",
    "standard": "3.MD.3 (TIMSS circle graphs)",
    "q": "This pie chart shows what some students did after school. It is divided into <b>10 equal sections</b>.<br><b>20</b> students read a book.<br><b>(a)</b> How many students met with friends?&nbsp;&nbsp; <b>(b)</b> How many students were asked altogether?",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 386 220\" style=\"width:100%;max-width:386px\" xmlns=\"http://www.w3.org/2000/svg\"><defs><pattern id=\"g4m312h\" patternUnits=\"userSpaceOnUse\" width=\"8\" height=\"8\"><rect width=\"8\" height=\"8\" fill=\"#fff\"/><path d=\"M0,8 L8,0 M-2,2 L2,-2 M6,10 L10,6\" stroke=\"#4a4a4a\" stroke-width=\"1.4\"/></pattern><pattern id=\"g4m312d\" patternUnits=\"userSpaceOnUse\" width=\"8\" height=\"8\"><rect width=\"8\" height=\"8\" fill=\"#fff\"/><circle cx=\"4\" cy=\"4\" r=\"1.6\" fill=\"#4a4a4a\"/></pattern></defs><text x=\"190.0\" y=\"18.0\" text-anchor=\"middle\" font-size=\"15\" fill=\"#1b2a3a\" font-weight=\"700\">After-School Activities</text><path d=\"M118.0,120.0 L90.2,34.4 A90,90 0 0 1 145.8,34.4 Z\" fill=\"#bdbdbd\" stroke=\"none\" stroke-width=\"0\" stroke-linejoin=\"round\"/><path d=\"M118.0,120.0 L145.8,34.4 A90,90 0 0 1 208.0,120.0 Z\" fill=\"url(#g4m312h)\" stroke=\"none\" stroke-width=\"0\" stroke-linejoin=\"round\"/><path d=\"M118.0,120.0 L208.0,120.0 A90,90 0 0 1 90.2,205.6 Z\" fill=\"url(#g4m312d)\" stroke=\"none\" stroke-width=\"0\" stroke-linejoin=\"round\"/><path d=\"M118.0,120.0 L90.2,205.6 A90,90 0 0 1 90.2,34.4 Z\" fill=\"#ffffff\" stroke=\"none\" stroke-width=\"0\" stroke-linejoin=\"round\"/><line x1=\"118.0\" y1=\"120.0\" x2=\"145.8\" y2=\"34.4\" stroke=\"#1b2a3a\" stroke-width=\"1.6\" stroke-dasharray=\"5 4\"/><line x1=\"118.0\" y1=\"120.0\" x2=\"190.8\" y2=\"67.1\" stroke=\"#1b2a3a\" stroke-width=\"1.6\" stroke-dasharray=\"5 4\"/><line x1=\"118.0\" y1=\"120.0\" x2=\"208.0\" y2=\"120.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\" stroke-dasharray=\"5 4\"/><line x1=\"118.0\" y1=\"120.0\" x2=\"190.8\" y2=\"172.9\" stroke=\"#1b2a3a\" stroke-width=\"1.6\" stroke-dasharray=\"5 4\"/><line x1=\"118.0\" y1=\"120.0\" x2=\"145.8\" y2=\"205.6\" stroke=\"#1b2a3a\" stroke-width=\"1.6\" stroke-dasharray=\"5 4\"/><line x1=\"118.0\" y1=\"120.0\" x2=\"90.2\" y2=\"205.6\" stroke=\"#1b2a3a\" stroke-width=\"1.6\" stroke-dasharray=\"5 4\"/><line x1=\"118.0\" y1=\"120.0\" x2=\"45.2\" y2=\"172.9\" stroke=\"#1b2a3a\" stroke-width=\"1.6\" stroke-dasharray=\"5 4\"/><line x1=\"118.0\" y1=\"120.0\" x2=\"28.0\" y2=\"120.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\" stroke-dasharray=\"5 4\"/><line x1=\"118.0\" y1=\"120.0\" x2=\"45.2\" y2=\"67.1\" stroke=\"#1b2a3a\" stroke-width=\"1.6\" stroke-dasharray=\"5 4\"/><line x1=\"118.0\" y1=\"120.0\" x2=\"90.2\" y2=\"34.4\" stroke=\"#1b2a3a\" stroke-width=\"1.6\" stroke-dasharray=\"5 4\"/><circle cx=\"118.0\" cy=\"120.0\" r=\"90.0\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"2.4\"/><rect x=\"234.0\" y=\"68.0\" width=\"24.0\" height=\"18.0\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><text x=\"266.0\" y=\"82.0\" text-anchor=\"start\" font-size=\"13\" fill=\"#1b2a3a\">Read a Book</text><rect x=\"234.0\" y=\"100.0\" width=\"24.0\" height=\"18.0\" rx=\"0\" fill=\"url(#g4m312h)\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><text x=\"266.0\" y=\"114.0\" text-anchor=\"start\" font-size=\"13\" fill=\"#1b2a3a\">Helped at Home</text><rect x=\"234.0\" y=\"132.0\" width=\"24.0\" height=\"18.0\" rx=\"0\" fill=\"url(#g4m312d)\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><text x=\"266.0\" y=\"146.0\" text-anchor=\"start\" font-size=\"13\" fill=\"#1b2a3a\">Played Games</text><rect x=\"234.0\" y=\"164.0\" width=\"24.0\" height=\"18.0\" rx=\"0\" fill=\"#ffffff\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><text x=\"266.0\" y=\"178.0\" text-anchor=\"start\" font-size=\"13\" fill=\"#1b2a3a\">Met with Friends</text></svg>",
    "options": [
      "80 students",
      "60 students",
      "100 students",
      "40 students"
    ],
    "answer": 0,
    "hint": "Each sector is 20 students. 'Met Friends' occupies 4 sectors = 4 \u00d7 20 = 80 students!",
    "explanation": "Read a Book is 1 section, so each section = 20 students. (a) Met with Friends is 4 sections: 4 \u00d7 20 = 80. (b) 10 sections \u00d7 20 = 200 students."
  },
  {
    "id": "timss_g4_60",
    "num": 60,
    "title": "Green Planet Visitor Survey",
    "domain": "extended",
    "domLabel": "Advanced Reasoning",
    "cognitive": "Reasoning",
    "standard": "TIMSS circle graphs, 4.NF.1",
    "q": "<b>40 visitors</b> at Green Planet chose their favourite zone. The circle graph shows the results, but one label is missing.<br><b>(a)</b> How many visitors chose each zone?<br><b>(b)</b> The missing zone is <b>Birds</b>. Explain how you know how many visitors chose Birds.",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 260 224\" style=\"width:100%;max-width:260px\" xmlns=\"http://www.w3.org/2000/svg\"><text x=\"130.0\" y=\"18.0\" text-anchor=\"middle\" font-size=\"15\" fill=\"#1b2a3a\" font-weight=\"700\">Green Planet Visitor Survey</text><path d=\"M130.0,122.0 L130.0,30.0 A92,92 0 0 1 130.0,214.0 Z\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"1.8\" stroke-linejoin=\"round\"/><path d=\"M130.0,122.0 L130.0,214.0 A92,92 0 0 1 38.0,122.0 Z\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.8\" stroke-linejoin=\"round\"/><path d=\"M130.0,122.0 L38.0,122.0 A92,92 0 0 1 64.9,56.9 Z\" fill=\"#d9d9d9\" stroke=\"#1b2a3a\" stroke-width=\"1.8\" stroke-linejoin=\"round\"/><path d=\"M130.0,122.0 L64.9,56.9 A92,92 0 0 1 130.0,30.0 Z\" fill=\"#ffffff\" stroke=\"#1b2a3a\" stroke-width=\"1.8\" stroke-linejoin=\"round\"/><text x=\"185.2\" y=\"127.0\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">Rainforest</text><text x=\"85.0\" y=\"166.0\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">Aquarium</text><text x=\"73.0\" y=\"105.9\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">Bats</text><text x=\"102.9\" y=\"78.0\" text-anchor=\"middle\" font-size=\"20\" fill=\"#1b2a3a\" font-weight=\"700\">?</text></svg>",
    "options": [
      "20 visitors",
      "10 visitors",
      "5 visitors",
      "15 visitors"
    ],
    "answer": 0,
    "hint": "Rainforest is half the circle (1/2). 40 \u00f7 2 = 20 visitors!",
    "explanation": "Rainforest is half: 40 \u00f7 2 = 20. Aquarium is a quarter: 40 \u00f7 4 = 10. Bats is an eighth: 40 \u00f7 8 = 5. Birds: 40 \u2212 20 \u2212 10 \u2212 5 = 5 \u2014 the same size sector as Bats."
  },
  {
    "id": "timss_g4_61",
    "num": 61,
    "title": "Closest to 300",
    "domain": "number",
    "domLabel": "Number & Operations",
    "cognitive": "Knowing",
    "standard": "4.NBT.2",
    "q": "Which number is closest in size to <b>300</b>?",
    "svg": null,
    "options": [
      "284",
      "291",
      "307",
      "315"
    ],
    "answer": 2,
    "hint": "|307 \u2212 300| = 7, whereas |291 \u2212 300| = 9. 307 is closest to 300!",
    "explanation": "Distances from 300: 275 \u2192 25, 291 \u2192 9, 307 \u2192 7, 320 \u2192 20. 307 is only 7 away, so it is the closest."
  },
  {
    "id": "timss_g4_62",
    "num": 62,
    "title": "Brick Wall",
    "domain": "number",
    "domLabel": "Number & Operations",
    "cognitive": "Applying",
    "standard": "4.OA.3",
    "q": "This wall is made of <b>9 rows</b> of bricks. The wall is <b>180 cm</b> high.<br>What would be the height of a wall made of <b>4 rows</b> of the same bricks?",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 350 227\" style=\"width:100%;max-width:350px\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"11.0\" y=\"11.0\" width=\"20.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"33.0\" y=\"11.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"77.0\" y=\"11.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"121.0\" y=\"11.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"165.0\" y=\"11.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"209.0\" y=\"11.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"253.0\" y=\"11.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"297.0\" y=\"11.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"11.0\" y=\"34.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"55.0\" y=\"34.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"99.0\" y=\"34.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"143.0\" y=\"34.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"187.0\" y=\"34.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"231.0\" y=\"34.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"275.0\" y=\"34.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"319.0\" y=\"34.0\" width=\"20.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"11.0\" y=\"57.0\" width=\"20.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"33.0\" y=\"57.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"77.0\" y=\"57.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"121.0\" y=\"57.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"165.0\" y=\"57.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"209.0\" y=\"57.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"253.0\" y=\"57.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"297.0\" y=\"57.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"11.0\" y=\"80.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"55.0\" y=\"80.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"99.0\" y=\"80.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"143.0\" y=\"80.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"187.0\" y=\"80.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"231.0\" y=\"80.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"275.0\" y=\"80.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"319.0\" y=\"80.0\" width=\"20.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"11.0\" y=\"103.0\" width=\"20.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"33.0\" y=\"103.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"77.0\" y=\"103.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"121.0\" y=\"103.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"165.0\" y=\"103.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"209.0\" y=\"103.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"253.0\" y=\"103.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"297.0\" y=\"103.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"11.0\" y=\"126.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"55.0\" y=\"126.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"99.0\" y=\"126.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"143.0\" y=\"126.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"187.0\" y=\"126.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"231.0\" y=\"126.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"275.0\" y=\"126.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"319.0\" y=\"126.0\" width=\"20.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"11.0\" y=\"149.0\" width=\"20.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"33.0\" y=\"149.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"77.0\" y=\"149.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"121.0\" y=\"149.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"165.0\" y=\"149.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"209.0\" y=\"149.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"253.0\" y=\"149.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"297.0\" y=\"149.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"11.0\" y=\"172.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"55.0\" y=\"172.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"99.0\" y=\"172.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"143.0\" y=\"172.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"187.0\" y=\"172.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"231.0\" y=\"172.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"275.0\" y=\"172.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"319.0\" y=\"172.0\" width=\"20.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"11.0\" y=\"195.0\" width=\"20.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"33.0\" y=\"195.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"77.0\" y=\"195.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"121.0\" y=\"195.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"165.0\" y=\"195.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"209.0\" y=\"195.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"253.0\" y=\"195.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"297.0\" y=\"195.0\" width=\"42.0\" height=\"21.0\" rx=\"3\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/></svg>",
    "options": [
      "60 cm",
      "80 cm",
      "100 cm",
      "120 cm"
    ],
    "answer": 1,
    "hint": "4 brick heights = 80 cm. Each brick is 20 cm high.",
    "explanation": "One row: 180 \u00f7 9 = 20 cm. Four rows: 4 \u00d7 20 = 80 cm."
  },
  {
    "id": "timss_g4_63",
    "num": 63,
    "title": "Column Rule",
    "domain": "number",
    "domLabel": "Number & Operations",
    "cognitive": "Applying",
    "standard": "4.OA.5",
    "q": "<b>Rule:</b> To find the number in Column B, multiply the number in Column A by 4, then add 1.<br>Use the rule to complete the table.<table class=\"dtable\"><tr><th>Column A</th><th>Column B</th></tr><tr><td>2</td><td></td></tr><tr><td>5</td><td></td></tr></table>",
    "svg": null,
    "options": [
      "21",
      "20",
      "24",
      "25"
    ],
    "answer": 0,
    "hint": "(5 \u00d7 4) + 1 = 20 + 1 = 21!",
    "explanation": "2 \u00d7 4 = 8; 8 + 1 = 9. 5 \u00d7 4 = 20; 20 + 1 = 21."
  },
  {
    "id": "timss_g4_64",
    "num": 64,
    "title": "Which Rule?",
    "domain": "number",
    "domLabel": "Number & Operations",
    "cognitive": "Applying",
    "standard": "4.OA.5",
    "q": "Look at this table of numbers.<table class=\"dtable\"><tr><th>Column A</th><th>Column B</th></tr><tr><td>1</td><td>2</td></tr><tr><td>2</td><td>5</td></tr><tr><td>3</td><td>10</td></tr><tr><td>4</td><td>17</td></tr></table>Which rule gives the number in Column B?",
    "svg": null,
    "options": [
      "Multiply by 3, then add 2",
      "Multiply by 4, then subtract 1",
      "Add 5",
      "Multiply by 2, then add 5"
    ],
    "answer": 0,
    "hint": "Test: (2 \u00d7 3) + 2 = 8, (3 \u00d7 3) + 2 = 11, (5 \u00d7 3) + 2 = 17. The rule is 'Multiply by 3, add 2'!",
    "explanation": "Test A: 1\u00d71+1 = 2, 2\u00d72+1 = 5, 3\u00d73+1 = 10, 4\u00d74+1 = 17 \u2713. B works for the first two rows only (3\u00d73\u22121 = 8, not 10)."
  },
  {
    "id": "timss_g4_65",
    "num": 65,
    "title": "Two Triangles",
    "domain": "geometry",
    "domLabel": "Geometry & Shapes",
    "cognitive": "Knowing",
    "standard": "4.G.2",
    "q": "Which statement about these two triangles is true?",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 404 196\" style=\"width:100%;max-width:404px\" xmlns=\"http://www.w3.org/2000/svg\"><line x1=\"10.0\" y1=\"10.0\" x2=\"10.0\" y2=\"186.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"32.0\" y1=\"10.0\" x2=\"32.0\" y2=\"186.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"54.0\" y1=\"10.0\" x2=\"54.0\" y2=\"186.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"76.0\" y1=\"10.0\" x2=\"76.0\" y2=\"186.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"98.0\" y1=\"10.0\" x2=\"98.0\" y2=\"186.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"120.0\" y1=\"10.0\" x2=\"120.0\" y2=\"186.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"142.0\" y1=\"10.0\" x2=\"142.0\" y2=\"186.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"164.0\" y1=\"10.0\" x2=\"164.0\" y2=\"186.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"186.0\" y1=\"10.0\" x2=\"186.0\" y2=\"186.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"10.0\" y1=\"10.0\" x2=\"186.0\" y2=\"10.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"10.0\" y1=\"32.0\" x2=\"186.0\" y2=\"32.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"10.0\" y1=\"54.0\" x2=\"186.0\" y2=\"54.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"10.0\" y1=\"76.0\" x2=\"186.0\" y2=\"76.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"10.0\" y1=\"98.0\" x2=\"186.0\" y2=\"98.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"10.0\" y1=\"120.0\" x2=\"186.0\" y2=\"120.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"10.0\" y1=\"142.0\" x2=\"186.0\" y2=\"142.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"10.0\" y1=\"164.0\" x2=\"186.0\" y2=\"164.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"10.0\" y1=\"186.0\" x2=\"186.0\" y2=\"186.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><rect x=\"10.0\" y=\"10.0\" width=\"176.0\" height=\"176.0\" rx=\"0\" fill=\"none\" stroke=\"#8795a3\" stroke-width=\"1.2\"/><polygon points=\"32.0,54.0 32.0,142.0 142.0,142.0\" fill=\"#e3eef9\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"2.6\"/><line x1=\"218.0\" y1=\"10.0\" x2=\"218.0\" y2=\"186.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"240.0\" y1=\"10.0\" x2=\"240.0\" y2=\"186.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"262.0\" y1=\"10.0\" x2=\"262.0\" y2=\"186.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"284.0\" y1=\"10.0\" x2=\"284.0\" y2=\"186.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"306.0\" y1=\"10.0\" x2=\"306.0\" y2=\"186.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"328.0\" y1=\"10.0\" x2=\"328.0\" y2=\"186.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"350.0\" y1=\"10.0\" x2=\"350.0\" y2=\"186.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"372.0\" y1=\"10.0\" x2=\"372.0\" y2=\"186.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"394.0\" y1=\"10.0\" x2=\"394.0\" y2=\"186.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"218.0\" y1=\"10.0\" x2=\"394.0\" y2=\"10.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"218.0\" y1=\"32.0\" x2=\"394.0\" y2=\"32.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"218.0\" y1=\"54.0\" x2=\"394.0\" y2=\"54.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"218.0\" y1=\"76.0\" x2=\"394.0\" y2=\"76.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"218.0\" y1=\"98.0\" x2=\"394.0\" y2=\"98.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"218.0\" y1=\"120.0\" x2=\"394.0\" y2=\"120.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"218.0\" y1=\"142.0\" x2=\"394.0\" y2=\"142.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"218.0\" y1=\"164.0\" x2=\"394.0\" y2=\"164.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"218.0\" y1=\"186.0\" x2=\"394.0\" y2=\"186.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><rect x=\"218.0\" y=\"10.0\" width=\"176.0\" height=\"176.0\" rx=\"0\" fill=\"none\" stroke=\"#8795a3\" stroke-width=\"1.2\"/><polygon points=\"284.0,142.0 372.0,142.0 372.0,54.0\" fill=\"#e3eef9\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"2.6\"/></svg>",
    "options": [
      "Equilateral triangle",
      "Right-angled triangle",
      "Square",
      "Parallelogram"
    ],
    "answer": 3,
    "hint": "Joining two identical triangles along equal sides forms a 4-sided parallelogram!",
    "explanation": "Both triangles have one side along a grid line going across and one going up, so each has a right angle. The left one has no equal sides, so A is false; the right one has 2 equal sides, so B is false."
  },
  {
    "id": "timss_g4_66",
    "num": 66,
    "title": "Triangle and Rectangle",
    "domain": "geometry",
    "domLabel": "Geometry & Shapes",
    "cognitive": "Applying",
    "standard": "4.G.2 (1.G.2)",
    "q": "Which of these shapes could be made by placing <b>one triangle</b> and <b>one rectangle</b> next to each other?",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 396 176\" style=\"width:100%;max-width:396px\" xmlns=\"http://www.w3.org/2000/svg\"><text x=\"6.0\" y=\"22.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">A</text><polygon points=\"30.0,8.0 142.2,8.0 183.0,67.5 30.0,67.5\" fill=\"none\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"2.0\"/><polyline points=\"40.0,8.0 40.0,18.0 30.0,18.0\" fill=\"none\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.2\"/><polyline points=\"40.0,67.5 40.0,57.5 30.0,57.5\" fill=\"none\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.2\"/><text x=\"204.0\" y=\"22.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">B</text><polygon points=\"269.6,8.0 345.3,8.0 381.0,69.2 228.0,69.2\" fill=\"none\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"2.0\"/><text x=\"6.0\" y=\"110.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">C</text><polygon points=\"71.7,96.0 183.0,96.0 141.3,157.2 30.0,157.2\" fill=\"none\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"2.0\"/><text x=\"204.0\" y=\"110.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">D</text><polygon points=\"228.0,96.0 228.0,158.9 360.6,158.9\" fill=\"none\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"2.0\"/><polyline points=\"238.0,158.9 238.0,148.9 228.0,148.9\" fill=\"none\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.2\"/></svg>",
    "options": [
      "Shape A (Trapezoid)",
      "Shape B (Hexagon)",
      "Shape C (Star)",
      "Shape D (Octagon)"
    ],
    "answer": 0,
    "hint": "A trapezoid can be sliced with one vertical cut into a rectangle and a right-angled triangle!",
    "explanation": "A splits with one vertical line into a rectangle and a right triangle. B and C need two triangles; D is just one triangle."
  },
  {
    "id": "timss_g4_67",
    "num": 67,
    "title": "Circles and Points",
    "domain": "geometry",
    "domLabel": "Geometry & Shapes",
    "cognitive": "Applying",
    "standard": "4.G.2",
    "q": "<b>A.</b> Bassam joined the points 12 to 3 and 3 to 6. Finish the shape by joining 6 to 9 and 9 to 12. What shape is made?&nbsp; (circle / pentagon / square / triangle)<br><b>B.</b> In circle B, draw a triangle with all sides the same length. Which points did you join?<br><b>C.</b> In circle C, draw a 6-sided shape with all sides the same length.",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 436 148\" style=\"width:100%;max-width:436px\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"76.0\" cy=\"80.0\" r=\"46.0\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><line x1=\"76.0\" y1=\"34.0\" x2=\"122.0\" y2=\"80.0\" stroke=\"#1b2a3a\" stroke-width=\"2.0\"/><line x1=\"122.0\" y1=\"80.0\" x2=\"76.0\" y2=\"126.0\" stroke=\"#1b2a3a\" stroke-width=\"2.0\"/><circle cx=\"76.0\" cy=\"34.0\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"76.0\" y=\"23.6\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">12</text><circle cx=\"99.0\" cy=\"40.2\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"106.5\" y=\"31.8\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">1</text><circle cx=\"115.8\" cy=\"57.0\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"128.8\" y=\"54.1\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">2</text><circle cx=\"122.0\" cy=\"80.0\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"137.0\" y=\"84.6\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">3</text><circle cx=\"115.8\" cy=\"103.0\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"128.8\" y=\"115.1\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">4</text><circle cx=\"99.0\" cy=\"119.8\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"106.5\" y=\"137.4\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">5</text><circle cx=\"76.0\" cy=\"126.0\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"76.0\" y=\"145.6\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">6</text><circle cx=\"53.0\" cy=\"119.8\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"45.5\" y=\"137.4\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">7</text><circle cx=\"36.2\" cy=\"103.0\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"23.2\" y=\"115.1\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">8</text><circle cx=\"30.0\" cy=\"80.0\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"15.0\" y=\"84.6\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">9</text><circle cx=\"36.2\" cy=\"57.0\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"23.2\" y=\"54.1\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">10</text><circle cx=\"53.0\" cy=\"40.2\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"45.5\" y=\"31.8\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">11</text><text x=\"0.0\" y=\"36.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">A</text><circle cx=\"220.0\" cy=\"80.0\" r=\"46.0\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><circle cx=\"220.0\" cy=\"34.0\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"220.0\" y=\"23.6\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">12</text><circle cx=\"243.0\" cy=\"40.2\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"250.5\" y=\"31.8\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">1</text><circle cx=\"259.8\" cy=\"57.0\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"272.8\" y=\"54.1\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">2</text><circle cx=\"266.0\" cy=\"80.0\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"281.0\" y=\"84.6\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">3</text><circle cx=\"259.8\" cy=\"103.0\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"272.8\" y=\"115.1\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">4</text><circle cx=\"243.0\" cy=\"119.8\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"250.5\" y=\"137.4\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">5</text><circle cx=\"220.0\" cy=\"126.0\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"220.0\" y=\"145.6\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">6</text><circle cx=\"197.0\" cy=\"119.8\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"189.5\" y=\"137.4\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">7</text><circle cx=\"180.2\" cy=\"103.0\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"167.2\" y=\"115.1\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">8</text><circle cx=\"174.0\" cy=\"80.0\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"159.0\" y=\"84.6\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">9</text><circle cx=\"180.2\" cy=\"57.0\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"167.2\" y=\"54.1\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">10</text><circle cx=\"197.0\" cy=\"40.2\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"189.5\" y=\"31.8\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">11</text><text x=\"144.0\" y=\"36.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">B</text><circle cx=\"364.0\" cy=\"80.0\" r=\"46.0\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"1.7\"/><circle cx=\"364.0\" cy=\"34.0\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"364.0\" y=\"23.6\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">12</text><circle cx=\"387.0\" cy=\"40.2\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"394.5\" y=\"31.8\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">1</text><circle cx=\"403.8\" cy=\"57.0\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"416.8\" y=\"54.1\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">2</text><circle cx=\"410.0\" cy=\"80.0\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"425.0\" y=\"84.6\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">3</text><circle cx=\"403.8\" cy=\"103.0\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"416.8\" y=\"115.1\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">4</text><circle cx=\"387.0\" cy=\"119.8\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"394.5\" y=\"137.4\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">5</text><circle cx=\"364.0\" cy=\"126.0\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"364.0\" y=\"145.6\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">6</text><circle cx=\"341.0\" cy=\"119.8\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"333.5\" y=\"137.4\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">7</text><circle cx=\"324.2\" cy=\"103.0\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"311.2\" y=\"115.1\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">8</text><circle cx=\"318.0\" cy=\"80.0\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"303.0\" y=\"84.6\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">9</text><circle cx=\"324.2\" cy=\"57.0\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"311.2\" y=\"54.1\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">10</text><circle cx=\"341.0\" cy=\"40.2\" r=\"3.6\" fill=\"#1b2a3a\"/><text x=\"333.5\" y=\"31.8\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">11</text><text x=\"288.0\" y=\"36.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">C</text></svg>",
    "options": [
      "Square",
      "Rectangle with unequal sides",
      "Trapezoid",
      "Rhombus with acute angles"
    ],
    "answer": 0,
    "hint": "Connecting points 12, 3, 6, 9 jumps 3 units each time: 4 equal sides and 4 right angles = Square!",
    "explanation": "A: each side jumps 3 points, so all sides are equal and the corners are right angles: a square. B: jump 4 points each time: 12 \u2192 4 \u2192 8 \u2192 12. C: jump 2 points each time: 12 \u2192 2 \u2192 4 \u2192 6 \u2192 8 \u2192 10 \u2192 12."
  },
  {
    "id": "timss_g4_68",
    "num": 68,
    "title": "Right Angles on a Clock",
    "domain": "geometry",
    "domLabel": "Geometry & Shapes",
    "cognitive": "Applying",
    "standard": "4.MD.5, 4.G.1",
    "q": "At 3:00 the hands of a clock make a right angle. Which is another time when the hands make a right angle?",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 200 200\" style=\"width:100%;max-width:200px\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"100.0\" cy=\"100.0\" r=\"86.0\" fill=\"none\" stroke=\"#d9d9d9\" stroke-width=\"12\"/><circle cx=\"100.0\" cy=\"100.0\" r=\"92.0\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><circle cx=\"100.0\" cy=\"100.0\" r=\"80.0\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><text x=\"133.0\" y=\"49.3\" text-anchor=\"middle\" font-size=\"18\" fill=\"#1b2a3a\" font-weight=\"600\">1</text><text x=\"157.2\" y=\"73.5\" text-anchor=\"middle\" font-size=\"18\" fill=\"#1b2a3a\" font-weight=\"600\">2</text><text x=\"166.0\" y=\"106.5\" text-anchor=\"middle\" font-size=\"18\" fill=\"#1b2a3a\" font-weight=\"600\">3</text><text x=\"157.2\" y=\"139.5\" text-anchor=\"middle\" font-size=\"18\" fill=\"#1b2a3a\" font-weight=\"600\">4</text><text x=\"133.0\" y=\"163.7\" text-anchor=\"middle\" font-size=\"18\" fill=\"#1b2a3a\" font-weight=\"600\">5</text><text x=\"100.0\" y=\"172.5\" text-anchor=\"middle\" font-size=\"18\" fill=\"#1b2a3a\" font-weight=\"600\">6</text><text x=\"67.0\" y=\"163.7\" text-anchor=\"middle\" font-size=\"18\" fill=\"#1b2a3a\" font-weight=\"600\">7</text><text x=\"42.8\" y=\"139.5\" text-anchor=\"middle\" font-size=\"18\" fill=\"#1b2a3a\" font-weight=\"600\">8</text><text x=\"34.0\" y=\"106.5\" text-anchor=\"middle\" font-size=\"18\" fill=\"#1b2a3a\" font-weight=\"600\">9</text><text x=\"42.8\" y=\"73.5\" text-anchor=\"middle\" font-size=\"18\" fill=\"#1b2a3a\" font-weight=\"600\">10</text><text x=\"67.0\" y=\"49.3\" text-anchor=\"middle\" font-size=\"18\" fill=\"#1b2a3a\" font-weight=\"600\">11</text><text x=\"100.0\" y=\"40.5\" text-anchor=\"middle\" font-size=\"18\" fill=\"#1b2a3a\" font-weight=\"600\">12</text><line x1=\"100.0\" y1=\"100.0\" x2=\"140.0\" y2=\"100.0\" stroke=\"#1b2a3a\" stroke-width=\"6\"/><polygon points=\"154.0,100.0 138.0,92.0 138.0,108.0\" fill=\"#1b2a3a\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1\"/><line x1=\"100.0\" y1=\"100.0\" x2=\"100.0\" y2=\"42.0\" stroke=\"#1b2a3a\" stroke-width=\"4.5\"/><polygon points=\"100.0,26.0 93.0,44.0 107.0,44.0\" fill=\"#1b2a3a\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1\"/><circle cx=\"100.0\" cy=\"100.0\" r=\"5.5\" fill=\"#1b2a3a\"/></svg>",
    "options": [
      "3:30",
      "6:00",
      "9:00",
      "12:15"
    ],
    "answer": 2,
    "hint": "At 9:00, the hour hand points at 9 and the minute hand points at 12, forming a 90\u00b0 right angle!",
    "explanation": "At 9:00 the minute hand points to 12 and the hour hand to 9. That is a quarter turn: a right angle."
  },
  {
    "id": "timss_g4_69",
    "num": 69,
    "title": "Draw the Reflection",
    "domain": "geometry",
    "domLabel": "Geometry & Shapes",
    "cognitive": "Applying",
    "standard": "4.G.3",
    "q": "Draw the reflection of the shape in the mirror line.",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 328 230\" style=\"width:100%;max-width:328px\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ar\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto-start-reverse\"><path d=\"M0,0 L10,5 L0,10 z\" fill=\"#1b2a3a\"/></marker></defs><line x1=\"8.0\" y1=\"40.0\" x2=\"8.0\" y2=\"222.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"34.0\" y1=\"40.0\" x2=\"34.0\" y2=\"222.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"60.0\" y1=\"40.0\" x2=\"60.0\" y2=\"222.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"86.0\" y1=\"40.0\" x2=\"86.0\" y2=\"222.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"112.0\" y1=\"40.0\" x2=\"112.0\" y2=\"222.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"138.0\" y1=\"40.0\" x2=\"138.0\" y2=\"222.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"164.0\" y1=\"40.0\" x2=\"164.0\" y2=\"222.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"190.0\" y1=\"40.0\" x2=\"190.0\" y2=\"222.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"216.0\" y1=\"40.0\" x2=\"216.0\" y2=\"222.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"242.0\" y1=\"40.0\" x2=\"242.0\" y2=\"222.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"268.0\" y1=\"40.0\" x2=\"268.0\" y2=\"222.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"294.0\" y1=\"40.0\" x2=\"294.0\" y2=\"222.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"320.0\" y1=\"40.0\" x2=\"320.0\" y2=\"222.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"8.0\" y1=\"40.0\" x2=\"320.0\" y2=\"40.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"8.0\" y1=\"66.0\" x2=\"320.0\" y2=\"66.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"8.0\" y1=\"92.0\" x2=\"320.0\" y2=\"92.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"8.0\" y1=\"118.0\" x2=\"320.0\" y2=\"118.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"8.0\" y1=\"144.0\" x2=\"320.0\" y2=\"144.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"8.0\" y1=\"170.0\" x2=\"320.0\" y2=\"170.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"8.0\" y1=\"196.0\" x2=\"320.0\" y2=\"196.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"8.0\" y1=\"222.0\" x2=\"320.0\" y2=\"222.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><rect x=\"8.0\" y=\"40.0\" width=\"312.0\" height=\"182.0\" rx=\"0\" fill=\"none\" stroke=\"#8795a3\" stroke-width=\"1.2\"/><polygon points=\"112.0,92.0 138.0,92.0 138.0,170.0 112.0,170.0 112.0,144.0 34.0,144.0 34.0,118.0 112.0,118.0\" fill=\"#d9d9d9\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"2.6\"/><line x1=\"164.0\" y1=\"37.0\" x2=\"164.0\" y2=\"225.0\" stroke=\"#1b2a3a\" stroke-width=\"3.6\" stroke-dasharray=\"10 6\"/><text x=\"164.0\" y=\"15.0\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">Mirror</text><line x1=\"164\" y1=\"20\" x2=\"164\" y2=\"35\" stroke=\"#1b2a3a\" stroke-width=\"1.6\" marker-end=\"url(#ar)\"/></svg>",
    "options": [
      "1 unit to the right of the mirror line",
      "2 units above the mirror line",
      "In the exact same spot",
      "Rotated 180\u00b0 upside down"
    ],
    "answer": 0,
    "hint": "Reflection flips coordinates across the mirror line: 1 unit left reflects to 1 unit right!",
    "explanation": "Each square moves to the same distance on the other side of the mirror. The bar is 1 square from the mirror, so its image is 1 square from the mirror on the right; the stem points right."
  },
  {
    "id": "timss_g4_70",
    "num": 70,
    "title": "Missing Side",
    "domain": "geometry",
    "domLabel": "Geometry & Shapes",
    "cognitive": "Applying",
    "standard": "4.MD.3",
    "q": "The perimeter of a 5-sided shape is <b>30 cm</b>. Three of the sides are each <b>4 cm</b> long. The other two sides, <b>P</b> and <b>Q</b>, are the same length.<br>What is the length of side P?",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 216 212\" style=\"width:100%;max-width:216px\" xmlns=\"http://www.w3.org/2000/svg\"><polygon points=\"75.4,182.4 137.4,182.4 161.7,45.0 108.0,14.0 54.0,44.5\" fill=\"#e3eef9\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><text x=\"106.4\" y=\"200.4\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">4 cm</text><line x1=\"143.3\" y1=\"114.6\" x2=\"155.1\" y2=\"116.7\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"144.0\" y1=\"110.7\" x2=\"155.8\" y2=\"112.8\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"172.1\" y=\"122.3\" text-anchor=\"middle\" font-size=\"17\" fill=\"#1b2a3a\" font-weight=\"700\" font-style=\"italic\">P</text><text x=\"143.3\" y=\"23.2\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">4 cm</text><text x=\"72.6\" y=\"23.0\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">4 cm</text><line x1=\"70.3\" y1=\"110.6\" x2=\"58.5\" y2=\"112.4\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"71.0\" y1=\"114.5\" x2=\"59.1\" y2=\"116.4\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"42.1\" y=\"121.8\" text-anchor=\"middle\" font-size=\"17\" fill=\"#1b2a3a\" font-weight=\"700\" font-style=\"italic\">Q</text></svg>",
    "options": [
      "8 cm",
      "9 cm",
      "10 cm",
      "11 cm"
    ],
    "answer": 1,
    "hint": "Known sides: 3 + 4 + 4 = 11 cm. Perimeter is 20 cm, so missing side = 20 \u2212 11 = 9 cm!",
    "explanation": "3 \u00d7 4 = 12 cm. 30 \u2212 12 = 18 cm for P and Q together. 18 \u00f7 2 = 9 cm."
  },
  {
    "id": "timss_g4_71",
    "num": 71,
    "title": "The Snake on the Path",
    "domain": "geometry",
    "domLabel": "Geometry & Shapes",
    "cognitive": "Applying",
    "standard": "4.MD.2",
    "q": "A snake is lying on a garden path made of tiles like the one shown. If the snake straightens out, about how many tiles long will it be?",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 434 163\" style=\"width:100%;max-width:434px\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"141.0\" y=\"8.0\" width=\"92.0\" height=\"30.7\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><text x=\"245.0\" y=\"28.3\" text-anchor=\"start\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">one tile</text><line x1=\"10.0\" y1=\"62.7\" x2=\"424.0\" y2=\"62.7\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"10.0\" y1=\"93.3\" x2=\"424.0\" y2=\"93.3\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"10.0\" y1=\"124.0\" x2=\"424.0\" y2=\"124.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"10.0\" y1=\"154.7\" x2=\"424.0\" y2=\"154.7\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"74.4\" y1=\"62.7\" x2=\"74.4\" y2=\"93.3\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"166.4\" y1=\"62.7\" x2=\"166.4\" y2=\"93.3\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"258.4\" y1=\"62.7\" x2=\"258.4\" y2=\"93.3\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"350.4\" y1=\"62.7\" x2=\"350.4\" y2=\"93.3\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"28.4\" y1=\"93.3\" x2=\"28.4\" y2=\"124.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"120.4\" y1=\"93.3\" x2=\"120.4\" y2=\"124.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"212.4\" y1=\"93.3\" x2=\"212.4\" y2=\"124.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"304.4\" y1=\"93.3\" x2=\"304.4\" y2=\"124.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"396.4\" y1=\"93.3\" x2=\"396.4\" y2=\"124.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"74.4\" y1=\"124.0\" x2=\"74.4\" y2=\"154.7\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"166.4\" y1=\"124.0\" x2=\"166.4\" y2=\"154.7\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"258.4\" y1=\"124.0\" x2=\"258.4\" y2=\"154.7\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"350.4\" y1=\"124.0\" x2=\"350.4\" y2=\"154.7\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><polygon points=\"53.2,99.7 53.9,99.9 54.8,100.1 55.7,100.4 56.8,100.5 57.8,100.7 59.0,100.9 60.2,101.1 61.5,101.3 62.8,101.5 64.2,101.7 65.7,102.0 67.2,102.2 68.7,102.4 70.2,102.7 71.8,102.9 73.4,103.2 75.0,103.5 76.7,103.8 78.3,104.1 80.0,104.4 81.7,104.8 83.3,105.2 85.0,105.6 86.6,106.0 88.3,106.5 89.9,106.9 91.5,107.5 93.1,108.0 94.6,108.5 96.1,109.1 97.5,109.8 99.0,110.4 100.6,111.1 102.2,111.7 103.8,112.5 105.4,113.3 107.1,114.1 108.8,115.0 110.5,115.9 112.2,116.8 113.9,117.8 115.7,118.8 117.5,119.8 119.3,120.8 121.1,121.8 122.9,122.8 124.7,123.9 126.6,124.9 128.4,125.9 130.3,126.9 132.2,127.9 134.1,128.8 136.0,129.7 137.9,130.6 139.8,131.5 141.7,132.3 143.7,133.0 145.6,133.7 147.6,134.3 149.6,134.9 151.5,135.4 153.6,135.8 155.6,136.2 157.7,136.6 159.8,136.9 161.9,137.2 164.0,137.5 166.1,137.7 168.3,137.9 170.4,138.1 172.6,138.2 174.7,138.3 176.8,138.4 179.0,138.5 181.1,138.6 183.1,138.6 185.2,138.6 187.2,138.7 189.1,138.7 191.1,138.7 192.9,138.7 194.8,138.7 196.5,138.7 198.2,138.7 199.8,138.7 201.4,138.7 202.9,138.7 204.3,138.7 205.6,138.7 206.7,138.7 207.9,138.8 208.9,138.8 209.9,138.8 210.8,138.9 211.6,139.0 212.4,139.0 213.1,139.1 213.8,139.1 214.5,139.2 215.1,139.2 215.6,139.2 216.2,139.3 216.7,139.3 217.2,139.3 217.8,139.3 218.3,139.3 218.9,139.3 219.4,139.2 220.0,139.1 220.6,139.0 221.2,138.8 221.8,138.6 222.3,138.3 222.9,138.0 223.3,137.7 223.8,137.4 224.3,137.1 224.7,136.8 225.1,136.4 225.6,136.0 226.2,135.4 226.8,134.7 227.3,134.0 227.8,133.3 228.2,132.6 228.6,131.8 228.9,131.1 229.2,130.4 229.5,129.6 229.7,128.9 229.9,128.2 230.1,127.4 230.3,126.7 230.5,126.0 230.7,125.2 230.9,124.5 231.1,123.8 231.3,123.1 231.4,122.4 231.6,121.8 231.8,121.1 232.0,120.5 232.2,119.9 232.4,119.4 232.6,118.9 232.8,118.4 233.0,117.9 233.2,117.5 233.4,117.2 233.7,116.8 234.1,116.2 234.5,115.6 234.9,115.0 235.2,114.4 235.6,113.8 235.9,113.2 236.2,112.6 236.6,112.1 236.9,111.6 237.2,111.1 237.5,110.6 237.8,110.1 238.1,109.7 238.4,109.3 238.7,108.9 239.0,108.5 239.3,108.2 239.6,107.9 240.0,107.6 240.3,107.4 240.6,107.1 240.9,106.9 241.3,106.7 241.7,106.5 242.1,106.4 242.5,106.2 243.0,106.1 243.6,106.0 244.2,105.9 244.8,105.9 245.5,105.9 246.2,105.9 247.1,106.0 248.0,106.1 249.0,106.3 250.1,106.5 251.2,106.8 252.4,107.1 253.6,107.4 254.9,107.7 256.2,108.1 257.6,108.5 259.0,109.0 260.4,109.4 261.8,109.9 263.3,110.4 264.7,110.8 266.2,111.3 267.7,111.8 269.2,112.3 270.7,112.8 272.3,113.3 273.8,113.7 275.3,114.2 276.8,114.6 278.3,115.0 279.8,115.3 281.3,115.7 282.8,116.0 284.3,116.3 285.7,116.5 287.1,116.7 288.6,117.0 290.1,117.2 291.6,117.4 293.1,117.6 294.6,117.8 296.2,118.0 297.7,118.2 299.3,118.3 300.8,118.5 302.4,118.7 303.9,118.8 305.4,119.0 306.9,119.1 308.4,119.2 309.9,119.3 311.4,119.4 312.8,119.5 314.2,119.6 315.6,119.7 316.9,119.7 318.2,119.8 319.4,119.8 320.6,119.8 321.8,119.8 322.9,119.8 323.9,119.8 325.0,119.8 325.9,119.7 326.8,119.6 327.7,119.5 328.5,119.4 329.3,119.2 330.1,119.0 330.9,118.8 331.6,118.5 332.3,118.3 332.9,117.9 333.6,117.6 334.2,117.1 334.7,116.7 335.2,116.2 335.7,115.7 336.1,115.1 336.5,114.6 336.8,114.0 337.0,113.5 337.2,113.0 337.4,112.5 337.5,112.1 337.6,111.7 337.7,111.3 337.8,110.9 337.9,110.6 338.0,110.4 338.0,110.1 338.1,109.9 338.1,109.7 338.2,109.6 338.3,109.3 338.4,109.0 338.5,108.6 338.6,108.3 338.8,107.9 338.9,107.5 339.1,107.0 339.2,106.5 339.3,106.1 339.5,105.5 339.6,105.0 339.7,104.5 339.7,103.9 339.8,103.3 339.8,102.7 339.8,102.0 339.8,101.3 339.7,100.7 339.6,100.0 339.4,99.3 339.1,98.6 338.8,97.8 338.5,97.2 338.0,96.5 337.6,95.8 337.0,95.2 336.4,94.6 335.8,94.1 335.1,93.6 334.4,93.1 333.6,92.7 332.8,92.2 332.0,91.9 331.1,91.5 330.2,91.1 329.3,90.8 328.3,90.5 327.3,90.1 326.3,89.8 325.2,89.5 324.1,89.2 323.0,88.9 321.9,88.6 320.7,88.3 319.6,88.0 318.4,87.7 317.3,87.5 316.1,87.2 315.0,87.0 313.9,86.7 312.7,86.5 311.7,86.2 310.6,86.0 309.6,85.8 308.6,85.6 307.6,85.4 306.7,85.3 305.7,86.1 304.9,86.0 304.1,85.8 303.4,85.7 302.6,85.6 301.9,85.5 301.2,85.4 300.5,85.3 299.8,85.3 299.1,85.2 298.5,85.2 297.9,85.2 297.3,85.2 296.7,85.2 296.1,85.2 295.6,85.2 295.1,85.3 294.5,85.3 294.1,85.3 293.6,85.4 293.1,85.4 292.7,85.5 292.3,85.5 291.9,85.5 291.6,85.6 291.2,85.6 290.9,85.7 290.6,85.7 290.4,85.7 290.2,85.7 290.0,85.7 289.8,85.8 289.6,85.8 289.7,92.9 290.0,92.9 290.4,92.9 290.7,92.9 291.1,92.9 291.4,92.8 291.7,92.8 292.1,92.8 292.4,92.7 292.8,92.7 293.1,92.6 293.5,92.6 293.9,92.5 294.2,92.5 294.6,92.5 295.0,92.4 295.5,92.4 295.9,92.4 296.3,92.4 296.8,92.4 297.3,92.4 297.8,92.4 298.3,92.4 298.8,92.4 299.3,92.4 299.9,92.5 300.4,92.5 301.0,92.6 301.6,92.7 302.2,92.8 302.9,92.9 303.6,93.0 304.3,93.2 305.0,94.3 305.9,94.5 306.8,94.7 307.8,94.8 308.8,95.0 309.8,95.3 310.8,95.5 311.9,95.7 313.0,95.9 314.1,96.2 315.2,96.4 316.3,96.7 317.4,97.0 318.5,97.2 319.6,97.5 320.6,97.8 321.6,98.1 322.6,98.3 323.6,98.6 324.5,98.9 325.4,99.2 326.2,99.5 327.0,99.8 327.7,100.0 328.3,100.3 328.8,100.5 329.3,100.7 329.6,100.9 329.8,101.1 330.0,101.2 330.2,101.4 330.3,101.5 330.4,101.6 330.4,101.7 330.5,101.7 330.5,101.8 330.5,101.9 330.6,101.9 330.6,102.0 330.6,102.1 330.6,102.2 330.6,102.3 330.6,102.5 330.6,102.7 330.6,102.9 330.6,103.1 330.5,103.3 330.5,103.5 330.4,103.8 330.3,104.1 330.3,104.3 330.2,104.6 330.1,104.9 330.0,105.2 329.9,105.5 329.7,105.9 329.6,106.2 329.5,106.5 329.4,107.0 329.2,107.4 329.1,107.8 329.0,108.2 328.9,108.5 328.9,108.8 328.8,109.1 328.8,109.3 328.7,109.5 328.7,109.6 328.6,109.7 328.6,109.8 328.6,109.8 328.6,109.8 328.6,109.8 328.6,109.8 328.6,109.8 328.6,109.8 328.6,109.8 328.6,109.8 328.5,109.8 328.4,109.9 328.2,110.0 328.0,110.1 327.7,110.1 327.4,110.2 326.9,110.3 326.4,110.4 325.9,110.5 325.2,110.5 324.5,110.6 323.6,110.6 322.7,110.6 321.8,110.6 320.7,110.6 319.6,110.6 318.5,110.6 317.3,110.5 316.0,110.5 314.7,110.4 313.4,110.3 312.0,110.3 310.6,110.2 309.2,110.0 307.7,109.9 306.3,109.8 304.8,109.7 303.3,109.5 301.8,109.4 300.3,109.2 298.8,109.0 297.3,108.8 295.8,108.7 294.3,108.5 292.8,108.3 291.4,108.1 290.0,107.9 288.6,107.6 287.2,107.4 285.9,107.2 284.6,107.0 283.3,106.7 282.0,106.4 280.6,106.1 279.2,105.7 277.8,105.3 276.4,104.9 275.0,104.5 273.5,104.0 272.0,103.5 270.6,103.1 269.1,102.6 267.6,102.1 266.1,101.6 264.7,101.1 263.2,100.7 261.7,100.2 260.3,99.7 258.9,99.3 257.5,98.9 256.1,98.5 254.7,98.1 253.3,97.8 252.0,97.5 250.7,97.3 249.4,97.0 248.1,96.9 246.9,96.8 245.6,96.7 244.4,96.7 243.3,96.8 242.2,96.9 241.1,97.1 240.1,97.4 239.1,97.7 238.1,98.1 237.2,98.5 236.3,98.9 235.5,99.4 234.8,100.0 234.0,100.6 233.4,101.2 232.7,101.8 232.2,102.4 231.6,103.0 231.1,103.7 230.6,104.3 230.2,104.9 229.8,105.6 229.4,106.2 229.0,106.8 228.6,107.4 228.3,108.0 228.0,108.6 227.6,109.1 227.3,109.6 227.0,110.2 226.7,110.6 226.4,111.1 226.1,111.6 225.6,112.3 225.2,113.1 224.8,113.8 224.4,114.6 224.1,115.4 223.8,116.2 223.5,117.0 223.2,117.7 223.0,118.5 222.8,119.3 222.6,120.0 222.4,120.8 222.2,121.5 222.0,122.3 221.8,123.0 221.6,123.6 221.5,124.3 221.3,124.9 221.1,125.5 220.9,126.1 220.8,126.6 220.6,127.1 220.4,127.6 220.2,128.0 220.1,128.3 219.9,128.6 219.8,128.8 219.7,129.0 219.6,129.1 219.4,129.2 219.2,129.4 218.9,129.6 218.7,129.8 218.5,129.9 218.4,130.0 218.3,130.1 218.2,130.1 218.2,130.1 218.2,130.1 218.2,130.1 218.2,130.1 218.2,130.1 218.1,130.1 217.9,130.1 217.7,130.1 217.4,130.1 217.1,130.1 216.7,130.1 216.3,130.1 215.7,130.0 215.2,130.0 214.5,129.9 213.8,129.9 213.1,129.8 212.2,129.8 211.3,129.7 210.4,129.7 209.3,129.6 208.2,129.6 207.0,129.5 205.7,129.5 204.4,129.5 202.9,129.5 201.4,129.5 199.8,129.5 198.2,129.5 196.5,129.5 194.7,129.5 192.9,129.5 191.1,129.5 189.2,129.5 187.3,129.5 185.3,129.4 183.3,129.4 181.3,129.4 179.3,129.3 177.2,129.2 175.2,129.1 173.1,129.0 171.1,128.9 169.1,128.7 167.0,128.5 165.0,128.3 163.0,128.1 161.1,127.8 159.2,127.5 157.3,127.2 155.5,126.8 153.7,126.4 152.0,126.0 150.3,125.5 148.6,125.0 146.9,124.4 145.1,123.7 143.4,123.0 141.7,122.2 139.9,121.4 138.1,120.6 136.3,119.7 134.6,118.7 132.8,117.8 131.0,116.8 129.2,115.8 127.4,114.8 125.6,113.8 123.8,112.8 122.0,111.8 120.2,110.8 118.4,109.7 116.6,108.8 114.8,107.8 113.0,106.8 111.3,105.9 109.5,105.0 107.7,104.1 105.9,103.3 104.1,102.6 102.3,101.9 100.5,101.3 98.7,100.8 96.9,100.4 95.1,100.1 93.3,99.8 91.5,99.5 89.7,99.3 87.9,99.1 86.1,98.9 84.3,98.8 82.5,98.7 80.7,98.6 78.9,98.6 77.2,98.5 75.5,98.5 73.8,98.5 72.1,98.6 70.5,98.6 68.9,98.7 67.3,98.7 65.8,98.8 64.4,98.9 63.0,99.0 61.6,99.0 60.3,99.1 59.1,99.2 57.9,99.3 56.8,99.4 55.8,99.5 54.8,99.5 54.0,99.6 53.2,99.7\" fill=\"#bdbdbd\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><polyline points=\"119.7,115.8 121.5,116.8 123.3,117.8 125.1,118.8 127.0,119.9 128.8,120.9 130.6,121.9 132.4,122.8 134.3,123.8 136.1,124.7 137.9,125.6 139.8,126.4 141.6,127.2 143.4,128.0 145.3,128.7 147.1,129.3 148.9,129.9 150.8,130.4 152.6,130.9 154.5,131.3 156.4,131.7 158.4,132.1 160.4,132.4 162.5,132.7 164.5,132.9 166.6,133.1 168.7,133.3 170.8,133.5 172.9,133.6 175.0,133.7 177.0,133.8 179.1,133.9 181.2,134.0 183.2,134.0 185.2,134.0 187.2,134.1 189.2,134.1 191.1,134.1 192.9,134.1 194.7,134.1 196.5,134.1 198.2,134.1 199.8,134.1 201.4,134.1 202.9,134.1 204.3,134.1 205.6,134.1 206.9,134.1 208.0,134.2 209.1,134.2 210.1,134.3 211.1,134.3 211.9,134.4 212.7,134.4 213.5,134.5 214.2,134.5 214.8,134.6 215.4,134.6 215.9,134.7 216.4,134.7 216.9,134.7 217.3,134.7 217.7,134.7 218.1,134.7 218.5,134.7 218.8,134.7 219.1,134.6 219.4,134.5 219.7,134.5 220.0,134.3 220.3,134.2 220.6,134.1 220.9,133.9 221.2,133.7 221.5,133.4 221.8,133.2 222.1,132.9 222.5,132.6 222.9,132.2 223.2,131.8 223.6,131.4 223.9,130.9 224.1,130.4 224.4,129.9 224.7,129.3 224.9,128.7 225.1,128.1 225.3,127.5 225.5,126.8 225.7,126.2 225.9,125.5 226.1,124.8 226.3,124.1 226.4,123.4 226.6,122.7 226.8,122.0 227.0,121.2 227.2,120.5 227.4,119.8 227.6,119.1 227.8,118.5 228.1,117.8 228.3,117.1 228.6,116.5 228.9,115.9 229.2,115.3 229.5,114.7 229.9,114.2 230.2,113.7 230.6,113.1 230.9,112.6 231.3,112.0 231.6,111.5 231.9,110.9 232.3,110.3 232.6,109.7 232.9,109.2 233.3,108.6 233.6,108.1 234.0,107.5 234.4,107.0 234.8,106.5 235.2,105.9 235.6,105.4 236.0,105.0 236.5,104.5 237.0,104.1 237.5,103.7 238.1,103.3 238.6,102.9 239.2,102.6 239.9,102.3 240.6,102.0 241.3,101.8 242.1,101.6 242.9,101.5 243.7,101.4 244.6,101.3 245.5,101.3 246.6,101.3 247.6,101.4 248.7,101.6 249.9,101.8 251.0,102.0 252.3,102.3 253.5,102.6 254.9,102.9 256.2,103.3 257.5,103.7 258.9,104.1 260.3,104.6 261.8,105.0 263.2,105.5 264.7,106.0 266.2,106.5 267.7,107.0 269.1,107.4 270.6,107.9 272.1,108.4 273.6,108.9 275.1,109.3 276.6,109.7 278.0,110.1 279.5,110.5 280.9,110.9 282.3,111.2 283.7,111.5 285.1,111.7 286.4,112.0 287.8,112.2 289.3,112.4 290.7,112.6 292.2,112.8 293.7,113.0 295.2,113.2 296.7,113.4 298.2,113.6 299.8,113.8 301.3,113.9 302.8,114.1 304.3,114.2 305.8,114.4 307.3,114.5 308.8,114.6 310.3,114.7 311.7,114.8 313.1,114.9 314.5,115.0 315.8,115.1 317.1,115.1 318.3,115.2 319.5,115.2 320.7,115.2 321.8,115.2 322.8,115.2 323.8,115.2 324.7,115.2 325.6,115.1 326.3,115.0 327.1,114.9 327.7,114.8 328.4,114.7 328.9,114.6 329.4,114.4 329.9,114.3 330.3,114.1 330.7,113.9 331.1,113.7 331.4,113.5 331.7,113.2 331.9,113.0 332.1,112.7 332.3,112.5 332.5,112.2 332.7,111.9 332.8,111.7 332.9,111.4 333.0,111.1 333.1,110.8 333.2,110.5 333.3,110.2 333.3,109.9 333.4,109.6 333.5,109.3 333.6,109.0 333.6,108.7 333.7,108.4 333.8,108.1 334.0,107.7 334.1,107.4 334.2,107.1 334.3,106.8 334.4,106.4 334.5,106.0 334.7,105.7 334.8,105.3 334.9,104.9 335.0,104.5 335.0,104.2 335.1,103.8 335.2,103.4 335.2,103.0 335.2,102.6 335.2,102.2 335.2,101.8 335.1,101.4 335.1,101.0 335.0,100.6 334.8,100.2 334.7,99.8 334.5,99.4 334.2,99.1 334.0,98.7 333.7,98.3 333.3,98.0 332.9,97.7 332.5,97.3 332.0,97.0 331.5,96.7 330.8,96.4 330.2,96.1 329.4,95.8 328.6,95.5 327.8,95.1 326.9,94.8 325.9,94.5 324.9,94.2 323.9,93.9 322.9,93.6 321.8,93.3 320.7,93.0 319.6,92.8 318.5,92.5 317.4,92.2 316.2,92.0 315.1,91.7 314.0,91.5 312.9,91.2 311.8,91.0 310.7,90.8 309.7,90.5 308.7,90.3 307.7,90.1 306.8,90.0 305.9,89.8 305.0,89.6 304.2,89.5 303.5,89.3 302.8,89.2 302.1,89.1 301.4,89.0 300.8,89.0 300.2,88.9 299.6,88.9 299.0,88.8 298.4,88.8 297.8,88.8 297.3,88.8 296.8,88.8 296.2,88.8 295.7,88.8 295.3,88.8 294.8,88.9 294.3,88.9 293.9,88.9 293.5,89.0 293.1,89.0 292.7,89.1\" fill=\"none\" fill-opacity=\"1\" stroke=\"#666666\" stroke-width=\"1\"/><ellipse cx=\"295.2\" cy=\"89.0\" rx=\"7.5\" ry=\"5.4\" transform=\"rotate(176.2 295.2 89.0)\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><circle cx=\"293.5\" cy=\"86.7\" r=\"1.2\" fill=\"#1b2a3a\"/><line x1=\"287.7\" y1=\"89.5\" x2=\"282.7\" y2=\"89.8\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"282.7\" y1=\"89.8\" x2=\"279.5\" y2=\"88.3\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"282.7\" y1=\"89.8\" x2=\"279.7\" y2=\"91.7\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/></svg>",
    "options": [
      "3",
      "4",
      "5",
      "6"
    ],
    "answer": 1,
    "hint": "Count the 90\u00b0 right-angle turns made by the snake path: 4 turns.",
    "explanation": "Follow the snake from tail to head and measure each bend in tile lengths. The pieces add up to about 4 tiles."
  },
  {
    "id": "timss_g4_72",
    "num": 72,
    "title": "The Way to School",
    "domain": "geometry",
    "domLabel": "Geometry & Shapes",
    "cognitive": "Applying",
    "standard": "4.MD.2",
    "q": "Maged walks 40 m on the path from his house to Khalid's house. He then walks on to school.<br>How long is the path from Maged's house to school?",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 440 197\" style=\"width:100%;max-width:440px\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ar\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto-start-reverse\"><path d=\"M0,0 L10,5 L0,10 z\" fill=\"#1b2a3a\"/></marker></defs><rect x=\"70.0\" y=\"26.0\" width=\"10.0\" height=\"22.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><polygon points=\"12.0,54.0 56.0,24.0 100.0,54.0\" fill=\"#d9d9d9\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><rect x=\"18.0\" y=\"54.0\" width=\"76.0\" height=\"44.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><rect x=\"28.0\" y=\"70.0\" width=\"14.0\" height=\"28.0\" rx=\"0\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><rect x=\"52.0\" y=\"64.0\" width=\"15.0\" height=\"14.0\" rx=\"0\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"59.5\" y1=\"64.0\" x2=\"59.5\" y2=\"78.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"52.0\" y1=\"71.0\" x2=\"67.0\" y2=\"71.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><rect x=\"74.0\" y=\"64.0\" width=\"15.0\" height=\"14.0\" rx=\"0\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"81.5\" y1=\"64.0\" x2=\"81.5\" y2=\"78.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"74.0\" y1=\"71.0\" x2=\"89.0\" y2=\"71.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"8.0\" y1=\"98.0\" x2=\"104.0\" y2=\"98.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><text x=\"56.0\" y=\"118.0\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">Maged's</text><text x=\"56.0\" y=\"135.0\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">house</text><polygon points=\"148.0,98.0 180.0,74.0 212.0,98.0\" fill=\"#d9d9d9\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><rect x=\"154.0\" y=\"98.0\" width=\"52.0\" height=\"36.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><rect x=\"184.0\" y=\"112.0\" width=\"12.0\" height=\"22.0\" rx=\"0\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><rect x=\"161.0\" y=\"106.0\" width=\"15.0\" height=\"13.0\" rx=\"0\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"168.5\" y1=\"106.0\" x2=\"168.5\" y2=\"119.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"161.0\" y1=\"112.5\" x2=\"176.0\" y2=\"112.5\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"144.0\" y1=\"134.0\" x2=\"212.0\" y2=\"134.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><text x=\"220.0\" y=\"106.0\" text-anchor=\"start\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">Khalid's</text><text x=\"220.0\" y=\"123.0\" text-anchor=\"start\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">house</text><line x1=\"326.0\" y1=\"28.0\" x2=\"326.0\" y2=\"134.0\" stroke=\"#1b2a3a\" stroke-width=\"2.2\"/><polygon points=\"326.0,28.0 350.0,28.0 350.0,42.0 326.0,42.0\" fill=\"#d9d9d9\" fill-opacity=\"1\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"338.0\" y=\"76.0\" width=\"94.0\" height=\"58.0\" rx=\"0\" fill=\"#fff\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><rect x=\"334.0\" y=\"68.0\" width=\"102.0\" height=\"8.0\" rx=\"0\" fill=\"#d9d9d9\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><rect x=\"346.0\" y=\"86.0\" width=\"15.0\" height=\"15.0\" rx=\"0\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><rect x=\"368.0\" y=\"86.0\" width=\"15.0\" height=\"15.0\" rx=\"0\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><rect x=\"410.0\" y=\"86.0\" width=\"15.0\" height=\"15.0\" rx=\"0\" fill=\"#e3eef9\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><rect x=\"388.0\" y=\"108.0\" width=\"16.0\" height=\"26.0\" rx=\"0\" fill=\"#f6ead2\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"316.0\" y1=\"134.0\" x2=\"438.0\" y2=\"134.0\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><text x=\"386.0\" y=\"58.0\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">School</text><path d=\"M108,106 C154,104 136,174 180,172\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"2.2\" stroke-linejoin=\"round\" stroke-linecap=\"round\" marker-end=\"url(#ar)\"/><path d=\"M180,172 C226.0,214.2 260.0,139.2 314,116\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"2.2\" stroke-linejoin=\"round\" stroke-linecap=\"round\" marker-end=\"url(#ar)\"/><line x1=\"108.0\" y1=\"95.0\" x2=\"108.0\" y2=\"117.0\" stroke=\"#1b2a3a\" stroke-width=\"2.0\"/><line x1=\"180.0\" y1=\"161.0\" x2=\"180.0\" y2=\"183.0\" stroke=\"#1b2a3a\" stroke-width=\"2.0\"/><line x1=\"314.0\" y1=\"105.0\" x2=\"314.0\" y2=\"127.0\" stroke=\"#1b2a3a\" stroke-width=\"2.0\"/><text x=\"112.0\" y=\"160.0\" text-anchor=\"middle\" font-size=\"15\" fill=\"#1b2a3a\" font-weight=\"700\">40 m</text></svg>",
    "options": [
      "80 m",
      "90 m",
      "100 m",
      "120 m"
    ],
    "answer": 2,
    "hint": "Total distance = 40 m + 30 m + 30 m = 100 m along the grid path!",
    "explanation": "The second part of the path looks about 1\u00bd times as long as the first: about 60 m. 40 + 60 = 100 m."
  },
  {
    "id": "timss_g4_73",
    "num": 73,
    "title": "Amin's Height",
    "domain": "data",
    "domLabel": "Data & Graphs",
    "cognitive": "Applying",
    "standard": "3.MD.3",
    "q": "Between which ages did Amin's height increase the most? (The scale starts at 100 cm.)",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 400 232\" style=\"width:100%;max-width:400px\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ar\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto-start-reverse\"><path d=\"M0,0 L10,5 L0,10 z\" fill=\"#1b2a3a\"/></marker></defs><text x=\"225.0\" y=\"18.0\" text-anchor=\"middle\" font-size=\"14\" fill=\"#1b2a3a\" font-weight=\"700\">Amin's Height on his Birthday</text><line x1=\"58.0\" y1=\"184.0\" x2=\"64.0\" y2=\"184.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"55.0\" y=\"188.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\" font-weight=\"700\">100</text><line x1=\"64.0\" y1=\"159.0\" x2=\"386.0\" y2=\"159.0\" stroke=\"#c9d3df\" stroke-width=\"1\"/><line x1=\"58.0\" y1=\"159.0\" x2=\"64.0\" y2=\"159.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"55.0\" y=\"163.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">110</text><line x1=\"64.0\" y1=\"134.0\" x2=\"386.0\" y2=\"134.0\" stroke=\"#c9d3df\" stroke-width=\"1\"/><line x1=\"58.0\" y1=\"134.0\" x2=\"64.0\" y2=\"134.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"55.0\" y=\"138.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">120</text><line x1=\"64.0\" y1=\"109.0\" x2=\"386.0\" y2=\"109.0\" stroke=\"#c9d3df\" stroke-width=\"1\"/><line x1=\"58.0\" y1=\"109.0\" x2=\"64.0\" y2=\"109.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"55.0\" y=\"113.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">130</text><line x1=\"64.0\" y1=\"84.0\" x2=\"386.0\" y2=\"84.0\" stroke=\"#c9d3df\" stroke-width=\"1\"/><line x1=\"58.0\" y1=\"84.0\" x2=\"64.0\" y2=\"84.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"55.0\" y=\"88.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">140</text><line x1=\"64.0\" y1=\"59.0\" x2=\"386.0\" y2=\"59.0\" stroke=\"#c9d3df\" stroke-width=\"1\"/><line x1=\"58.0\" y1=\"59.0\" x2=\"64.0\" y2=\"59.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"55.0\" y=\"63.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">150</text><line x1=\"64.0\" y1=\"34.0\" x2=\"386.0\" y2=\"34.0\" stroke=\"#c9d3df\" stroke-width=\"1\"/><line x1=\"58.0\" y1=\"34.0\" x2=\"64.0\" y2=\"34.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"55.0\" y=\"38.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#1b2a3a\">160</text><rect x=\"78.2\" y=\"134.0\" width=\"36.1\" height=\"50.0\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><text x=\"96.2\" y=\"203.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">10</text><rect x=\"142.6\" y=\"129.0\" width=\"36.1\" height=\"55.0\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><text x=\"160.6\" y=\"203.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">11</text><rect x=\"207.0\" y=\"109.0\" width=\"36.1\" height=\"75.0\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><text x=\"225.0\" y=\"203.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">12</text><rect x=\"271.4\" y=\"91.5\" width=\"36.1\" height=\"92.5\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><text x=\"289.4\" y=\"203.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">13</text><rect x=\"335.8\" y=\"54.0\" width=\"36.1\" height=\"130.0\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.5\"/><text x=\"353.8\" y=\"203.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">14</text><line x1=\"64.0\" y1=\"184.0\" x2=\"64.0\" y2=\"189.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"128.4\" y1=\"184.0\" x2=\"128.4\" y2=\"189.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"192.8\" y1=\"184.0\" x2=\"192.8\" y2=\"189.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"257.2\" y1=\"184.0\" x2=\"257.2\" y2=\"189.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"321.6\" y1=\"184.0\" x2=\"321.6\" y2=\"189.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><line x1=\"386.0\" y1=\"184.0\" x2=\"386.0\" y2=\"189.0\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><rect x=\"64.0\" y=\"34.0\" width=\"322.0\" height=\"150.0\" rx=\"0\" fill=\"none\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><text x=\"225.0\" y=\"224.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" font-weight=\"700\">Amin's Age (years)</text><text x=\"17.0\" y=\"109.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\" font-weight=\"700\" transform=\"rotate(-90 17.0 109.0)\">Height (cm)</text></svg>",
    "options": [
      "10 and 11",
      "11 and 12",
      "12 and 13",
      "13 and 14"
    ],
    "answer": 3,
    "hint": "The growth curve shows the steepest jump (greatest vertical climb) between ages 13 and 14!",
    "explanation": "Increases: 2, 8, 7, 15 cm. The biggest jump is from 13 to 14."
  },
  {
    "id": "timss_g4_74",
    "num": 74,
    "title": "Big Snakes",
    "domain": "data",
    "domLabel": "Data & Graphs",
    "cognitive": "Applying",
    "standard": "3.MD.3, 4.MD.2",
    "q": "The table shows the sizes of some large snakes.<table class=\"dtable\"><tr><th>Type of snake</th><th>Mass (kg)</th><th>Length (m)</th></tr><tr><td>Boa constrictor</td><td>27</td><td>4</td></tr><tr><td>Burmese python</td><td>90</td><td>5 to 7</td></tr><tr><td>Green anaconda</td><td>227</td><td>6 to 9</td></tr><tr><td>King cobra</td><td>9</td><td>4</td></tr></table><b>(a)</b> Sultan saw a snake that was 8 m long. Which type of snake could it be?<br><b>(b)</b> Naima saw a snake that was 6 m long and had a mass of about 80 kg. Which type of snake could it be?",
    "svg": null,
    "options": [
      "Green Anaconda",
      "Burmese Python",
      "Both snakes",
      "Neither snake"
    ],
    "answer": 0,
    "hint": "Green Anaconda reaches lengths of 6 to 9 m (including 8 m). Burmese Python maxes at 6 m!",
    "explanation": "(a) Only the green anaconda can be 8 m long (6 to 9). (b) 6 m fits the python and the anaconda; about 80 kg is close to 90 kg, so the Burmese python."
  },
  {
    "id": "timss_g4_75",
    "num": 75,
    "title": "Which Graph?",
    "domain": "data",
    "domLabel": "Data & Graphs",
    "cognitive": "Applying",
    "standard": "3.MD.3",
    "q": "Zaid made a survey of how many students watched television each night for <b>one week</b>. Which graph could show Zaid's results?",
    "svg": "<svg class=\"fig\" viewBox=\"0 0 440 224\" style=\"width:100%;max-width:440px\" xmlns=\"http://www.w3.org/2000/svg\"><text x=\"4.0\" y=\"18.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">A</text><line x1=\"26.0\" y1=\"6.0\" x2=\"26.0\" y2=\"51.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"41.5\" y1=\"6.0\" x2=\"41.5\" y2=\"51.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"57.0\" y1=\"6.0\" x2=\"57.0\" y2=\"51.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"72.5\" y1=\"6.0\" x2=\"72.5\" y2=\"51.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"88.0\" y1=\"6.0\" x2=\"88.0\" y2=\"51.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"103.5\" y1=\"6.0\" x2=\"103.5\" y2=\"51.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"119.0\" y1=\"6.0\" x2=\"119.0\" y2=\"51.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"134.5\" y1=\"6.0\" x2=\"134.5\" y2=\"51.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"150.0\" y1=\"6.0\" x2=\"150.0\" y2=\"51.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"165.5\" y1=\"6.0\" x2=\"165.5\" y2=\"51.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"181.0\" y1=\"6.0\" x2=\"181.0\" y2=\"51.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"196.5\" y1=\"6.0\" x2=\"196.5\" y2=\"51.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"212.0\" y1=\"6.0\" x2=\"212.0\" y2=\"51.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"26.0\" y1=\"6.0\" x2=\"212.0\" y2=\"6.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"26.0\" y1=\"12.5\" x2=\"212.0\" y2=\"12.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"26.0\" y1=\"19.0\" x2=\"212.0\" y2=\"19.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"26.0\" y1=\"25.5\" x2=\"212.0\" y2=\"25.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"26.0\" y1=\"32.0\" x2=\"212.0\" y2=\"32.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"26.0\" y1=\"38.5\" x2=\"212.0\" y2=\"38.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"26.0\" y1=\"45.0\" x2=\"212.0\" y2=\"45.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"26.0\" y1=\"51.5\" x2=\"212.0\" y2=\"51.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><rect x=\"33.0\" y=\"9.2\" width=\"17.1\" height=\"42.2\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"41.5\" y=\"67.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">0</text><rect x=\"64.0\" y=\"15.8\" width=\"17.1\" height=\"35.8\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"72.5\" y=\"67.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">20</text><rect x=\"95.0\" y=\"22.2\" width=\"17.1\" height=\"29.2\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"103.5\" y=\"67.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">40</text><rect x=\"126.0\" y=\"28.8\" width=\"17.1\" height=\"22.8\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"134.5\" y=\"67.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">60</text><rect x=\"157.0\" y=\"34.6\" width=\"17.1\" height=\"16.9\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"165.5\" y=\"67.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">80</text><rect x=\"188.0\" y=\"40.5\" width=\"17.1\" height=\"11.0\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"196.5\" y=\"67.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">100</text><line x1=\"26.0\" y1=\"6.0\" x2=\"26.0\" y2=\"51.5\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"26.0\" y1=\"51.5\" x2=\"212.0\" y2=\"51.5\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><text x=\"224.0\" y=\"18.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">B</text><line x1=\"246.0\" y1=\"6.0\" x2=\"246.0\" y2=\"51.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"264.6\" y1=\"6.0\" x2=\"264.6\" y2=\"51.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"283.2\" y1=\"6.0\" x2=\"283.2\" y2=\"51.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"301.8\" y1=\"6.0\" x2=\"301.8\" y2=\"51.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"320.4\" y1=\"6.0\" x2=\"320.4\" y2=\"51.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"339.0\" y1=\"6.0\" x2=\"339.0\" y2=\"51.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"357.6\" y1=\"6.0\" x2=\"357.6\" y2=\"51.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"376.2\" y1=\"6.0\" x2=\"376.2\" y2=\"51.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"394.8\" y1=\"6.0\" x2=\"394.8\" y2=\"51.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"413.4\" y1=\"6.0\" x2=\"413.4\" y2=\"51.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"432.0\" y1=\"6.0\" x2=\"432.0\" y2=\"51.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"246.0\" y1=\"6.0\" x2=\"432.0\" y2=\"6.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"246.0\" y1=\"12.5\" x2=\"432.0\" y2=\"12.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"246.0\" y1=\"19.0\" x2=\"432.0\" y2=\"19.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"246.0\" y1=\"25.5\" x2=\"432.0\" y2=\"25.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"246.0\" y1=\"32.0\" x2=\"432.0\" y2=\"32.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"246.0\" y1=\"38.5\" x2=\"432.0\" y2=\"38.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"246.0\" y1=\"45.0\" x2=\"432.0\" y2=\"45.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"246.0\" y1=\"51.5\" x2=\"432.0\" y2=\"51.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><rect x=\"254.4\" y=\"28.8\" width=\"20.5\" height=\"22.8\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"264.6\" y=\"67.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">8</text><rect x=\"291.6\" y=\"8.6\" width=\"20.5\" height=\"42.9\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"301.8\" y=\"67.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">9</text><rect x=\"328.8\" y=\"20.3\" width=\"20.5\" height=\"31.2\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"339.0\" y=\"67.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">10</text><rect x=\"366.0\" y=\"27.4\" width=\"20.5\" height=\"24.1\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"376.2\" y=\"67.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">11</text><rect x=\"403.2\" y=\"36.5\" width=\"20.5\" height=\"14.9\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"413.4\" y=\"67.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">12</text><line x1=\"246.0\" y1=\"6.0\" x2=\"246.0\" y2=\"51.5\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"246.0\" y1=\"51.5\" x2=\"432.0\" y2=\"51.5\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><text x=\"4.0\" y=\"92.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">C</text><line x1=\"26.0\" y1=\"80.0\" x2=\"26.0\" y2=\"125.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"42.9\" y1=\"80.0\" x2=\"42.9\" y2=\"125.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"59.8\" y1=\"80.0\" x2=\"59.8\" y2=\"125.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"76.8\" y1=\"80.0\" x2=\"76.8\" y2=\"125.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"93.7\" y1=\"80.0\" x2=\"93.7\" y2=\"125.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"110.6\" y1=\"80.0\" x2=\"110.6\" y2=\"125.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"127.5\" y1=\"80.0\" x2=\"127.5\" y2=\"125.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"144.4\" y1=\"80.0\" x2=\"144.4\" y2=\"125.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"161.3\" y1=\"80.0\" x2=\"161.3\" y2=\"125.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"178.2\" y1=\"80.0\" x2=\"178.2\" y2=\"125.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"195.2\" y1=\"80.0\" x2=\"195.2\" y2=\"125.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"212.1\" y1=\"80.0\" x2=\"212.1\" y2=\"125.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"229.0\" y1=\"80.0\" x2=\"229.0\" y2=\"125.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"245.9\" y1=\"80.0\" x2=\"245.9\" y2=\"125.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"262.8\" y1=\"80.0\" x2=\"262.8\" y2=\"125.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"279.8\" y1=\"80.0\" x2=\"279.8\" y2=\"125.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"296.7\" y1=\"80.0\" x2=\"296.7\" y2=\"125.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"313.6\" y1=\"80.0\" x2=\"313.6\" y2=\"125.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"330.5\" y1=\"80.0\" x2=\"330.5\" y2=\"125.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"347.4\" y1=\"80.0\" x2=\"347.4\" y2=\"125.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"364.3\" y1=\"80.0\" x2=\"364.3\" y2=\"125.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"381.2\" y1=\"80.0\" x2=\"381.2\" y2=\"125.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"398.2\" y1=\"80.0\" x2=\"398.2\" y2=\"125.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"415.1\" y1=\"80.0\" x2=\"415.1\" y2=\"125.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"432.0\" y1=\"80.0\" x2=\"432.0\" y2=\"125.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"26.0\" y1=\"80.0\" x2=\"432.0\" y2=\"80.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"26.0\" y1=\"86.5\" x2=\"432.0\" y2=\"86.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"26.0\" y1=\"93.0\" x2=\"432.0\" y2=\"93.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"26.0\" y1=\"99.5\" x2=\"432.0\" y2=\"99.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"26.0\" y1=\"106.0\" x2=\"432.0\" y2=\"106.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"26.0\" y1=\"112.5\" x2=\"432.0\" y2=\"112.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"26.0\" y1=\"119.0\" x2=\"432.0\" y2=\"119.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"26.0\" y1=\"125.5\" x2=\"432.0\" y2=\"125.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><rect x=\"33.6\" y=\"107.3\" width=\"18.6\" height=\"18.2\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"42.9\" y=\"141.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">Jan</text><rect x=\"67.4\" y=\"102.8\" width=\"18.6\" height=\"22.8\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"76.8\" y=\"141.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">Feb</text><rect x=\"101.3\" y=\"98.2\" width=\"18.6\" height=\"27.3\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"110.6\" y=\"141.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">Mar</text><rect x=\"135.1\" y=\"94.3\" width=\"18.6\" height=\"31.2\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"144.4\" y=\"141.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">Apr</text><rect x=\"168.9\" y=\"89.8\" width=\"18.6\" height=\"35.8\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"178.2\" y=\"141.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">May</text><rect x=\"202.8\" y=\"84.6\" width=\"18.6\" height=\"40.9\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"212.1\" y=\"141.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">Jun</text><rect x=\"236.6\" y=\"91.7\" width=\"18.6\" height=\"33.8\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"245.9\" y=\"141.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">Jul</text><rect x=\"270.4\" y=\"88.4\" width=\"18.6\" height=\"37.1\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"279.8\" y=\"141.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">Aug</text><rect x=\"304.3\" y=\"95.6\" width=\"18.6\" height=\"29.9\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"313.6\" y=\"141.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">Sep</text><rect x=\"338.1\" y=\"107.3\" width=\"18.6\" height=\"18.2\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"347.4\" y=\"141.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">Oct</text><rect x=\"371.9\" y=\"102.8\" width=\"18.6\" height=\"22.8\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"381.2\" y=\"141.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">Nov</text><rect x=\"405.8\" y=\"98.2\" width=\"18.6\" height=\"27.3\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"415.1\" y=\"141.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">Dec</text><line x1=\"26.0\" y1=\"80.0\" x2=\"26.0\" y2=\"125.5\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"26.0\" y1=\"125.5\" x2=\"432.0\" y2=\"125.5\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><text x=\"4.0\" y=\"166.0\" text-anchor=\"start\" font-size=\"16\" fill=\"#1b2a3a\" font-weight=\"700\">D</text><line x1=\"26.0\" y1=\"154.0\" x2=\"26.0\" y2=\"199.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"55.0\" y1=\"154.0\" x2=\"55.0\" y2=\"199.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"84.0\" y1=\"154.0\" x2=\"84.0\" y2=\"199.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"113.0\" y1=\"154.0\" x2=\"113.0\" y2=\"199.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"142.0\" y1=\"154.0\" x2=\"142.0\" y2=\"199.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"171.0\" y1=\"154.0\" x2=\"171.0\" y2=\"199.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"200.0\" y1=\"154.0\" x2=\"200.0\" y2=\"199.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"229.0\" y1=\"154.0\" x2=\"229.0\" y2=\"199.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"258.0\" y1=\"154.0\" x2=\"258.0\" y2=\"199.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"287.0\" y1=\"154.0\" x2=\"287.0\" y2=\"199.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"316.0\" y1=\"154.0\" x2=\"316.0\" y2=\"199.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"345.0\" y1=\"154.0\" x2=\"345.0\" y2=\"199.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"374.0\" y1=\"154.0\" x2=\"374.0\" y2=\"199.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"403.0\" y1=\"154.0\" x2=\"403.0\" y2=\"199.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"432.0\" y1=\"154.0\" x2=\"432.0\" y2=\"199.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"26.0\" y1=\"154.0\" x2=\"432.0\" y2=\"154.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"26.0\" y1=\"160.5\" x2=\"432.0\" y2=\"160.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"26.0\" y1=\"167.0\" x2=\"432.0\" y2=\"167.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"26.0\" y1=\"173.5\" x2=\"432.0\" y2=\"173.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"26.0\" y1=\"180.0\" x2=\"432.0\" y2=\"180.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"26.0\" y1=\"186.5\" x2=\"432.0\" y2=\"186.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"26.0\" y1=\"193.0\" x2=\"432.0\" y2=\"193.0\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><line x1=\"26.0\" y1=\"199.5\" x2=\"432.0\" y2=\"199.5\" stroke=\"#a9b4bf\" stroke-width=\"1.0\"/><rect x=\"42.0\" y=\"163.8\" width=\"26.0\" height=\"35.8\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"55.0\" y=\"215.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">Sun</text><rect x=\"100.0\" y=\"168.3\" width=\"26.0\" height=\"31.2\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"113.0\" y=\"215.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">Mon</text><rect x=\"158.0\" y=\"172.2\" width=\"26.0\" height=\"27.3\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"171.0\" y=\"215.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">Tue</text><rect x=\"216.0\" y=\"176.8\" width=\"26.0\" height=\"22.8\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"229.0\" y=\"215.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">Wed</text><rect x=\"274.0\" y=\"181.3\" width=\"26.0\" height=\"18.2\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"287.0\" y=\"215.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">Thu</text><rect x=\"332.0\" y=\"169.6\" width=\"26.0\" height=\"29.9\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"345.0\" y=\"215.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">Fri</text><rect x=\"390.0\" y=\"158.6\" width=\"26.0\" height=\"40.9\" rx=\"0\" fill=\"#bdbdbd\" stroke=\"#1b2a3a\" stroke-width=\"1.4\"/><text x=\"403.0\" y=\"215.5\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1b2a3a\">Sat</text><line x1=\"26.0\" y1=\"154.0\" x2=\"26.0\" y2=\"199.5\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/><line x1=\"26.0\" y1=\"199.5\" x2=\"432.0\" y2=\"199.5\" stroke=\"#1b2a3a\" stroke-width=\"1.6\"/></svg>",
    "options": [
      "Graph D (7 bars for Sun through Sat)",
      "Graph A (5 bars)",
      "Graph B (4 bars)",
      "Graph C (12 bars)"
    ],
    "answer": 0,
    "hint": "One full week has 7 days, so the survey graph requires 7 daily bars (Sunday to Saturday)!",
    "explanation": "One week has 7 nights, so the graph needs 7 bars, one for each day. Only D is labelled Sun to Sat."
  }
]
};

if (typeof window !== 'undefined') {
  window.TIMSS_CURRICULUM = TIMSS_CURRICULUM;
}
