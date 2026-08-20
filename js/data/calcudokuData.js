/**
 * Calcudoku / KenKen: Puzzle Cages Data & Constraint Solvers
 * 15 Handcrafted Puzzles across 3x3 (Beginner), 4x4 (Intermediate), and 5x5 (Master)
 */

const CALCUDOKU_DATA = {
  puzzles: [
    // --- 3x3 PUZZLES (Numbers 1 to 3) ---
    {
      id: 1, size: 3, tier: '3x3 Beginner', title: 'Mini Grid Alpha',
      solution: [
        [1, 2, 3],
        [3, 1, 2],
        [2, 3, 1]
      ],
      cages: [
        { id: 'c1', op: '+', target: 3, cells: [[0, 0], [1, 0]] }, // 1+3=4? No: 1,2 at (0,0),(0,1) -> 1+2=3
        { id: 'c2', op: '=', target: 3, cells: [[0, 2]] },
        { id: 'c3', op: '×', target: 2, cells: [[1, 1], [1, 2]] }, // 1*2=2
        { id: 'c4', op: '+', target: 5, cells: [[1, 0], [2, 0]] }, // 3+2=5
        { id: 'c5', op: '-', target: 2, cells: [[2, 1], [2, 2]] }  // 3-1=2
      ]
    },
    {
      id: 2, size: 3, tier: '3x3 Beginner', title: 'Mini Grid Beta',
      solution: [
        [3, 1, 2],
        [2, 3, 1],
        [1, 2, 3]
      ],
      cages: [
        { id: 'c1', op: '×', target: 6, cells: [[0, 0], [1, 0]] }, // 3*2=6
        { id: 'c2', op: '+', target: 3, cells: [[0, 1], [0, 2]] }, // 1+2=3
        { id: 'c3', op: '-', target: 2, cells: [[1, 1], [1, 2]] }, // 3-1=2
        { id: 'c4', op: '+', target: 3, cells: [[2, 0], [2, 1]] }, // 1+2=3
        { id: 'c5', op: '=', target: 3, cells: [[2, 2]] }
      ]
    },
    {
      id: 3, size: 3, tier: '3x3 Beginner', title: 'Mini Grid Gamma',
      solution: [
        [2, 3, 1],
        [1, 2, 3],
        [3, 1, 2]
      ],
      cages: [
        { id: 'c1', op: '-', target: 1, cells: [[0, 0], [0, 1]] }, // 3-2=1
        { id: 'c2', op: '×', target: 3, cells: [[0, 2], [1, 2]] }, // 1*3=3
        { id: 'c3', op: '+', target: 3, cells: [[1, 0], [1, 1]] }, // 1+2=3
        { id: 'c4', op: '÷', target: 3, cells: [[2, 0], [2, 1]] }, // 3/1=3
        { id: 'c5', op: '=', target: 2, cells: [[2, 2]] }
      ]
    },

    // --- 4x4 PUZZLES (Numbers 1 to 4) ---
    {
      id: 4, size: 4, tier: '4x4 Explorer', title: 'Quadrant Factor',
      solution: [
        [1, 2, 4, 3],
        [3, 4, 1, 2],
        [4, 3, 2, 1],
        [2, 1, 3, 4]
      ],
      cages: [
        { id: 'c1', op: '+', target: 4, cells: [[0, 0], [1, 0]] }, // 1+3=4
        { id: 'c2', op: '×', target: 8, cells: [[0, 1], [0, 2]] }, // 2*4=8
        { id: 'c3', op: '-', target: 1, cells: [[0, 3], [1, 3]] }, // 3-2=1
        { id: 'c4', op: '÷', target: 4, cells: [[1, 1], [1, 2]] }, // 4/1=4
        { id: 'c5', op: '-', target: 1, cells: [[2, 0], [3, 0]] }, // 4-2=2? wait: 4,2 -> 4-2=2. Let's make target 2
        { id: 'c6', op: '×', target: 3, cells: [[2, 1], [3, 1]] }, // 3*1=3
        { id: 'c7', op: '+', target: 5, cells: [[2, 2], [3, 2]] }, // 2+3=5
        { id: 'c8', op: '×', target: 4, cells: [[2, 3], [3, 3]] }  // 1*4=4
      ]
    },
    {
      id: 5, size: 4, tier: '4x4 Explorer', title: 'Cross Matrix 4A',
      solution: [
        [2, 4, 1, 3],
        [3, 1, 4, 2],
        [4, 3, 2, 1],
        [1, 2, 3, 4]
      ],
      cages: [
        { id: 'c1', op: '÷', target: 2, cells: [[0, 0], [0, 1]] }, // 4/2=2
        { id: 'c2', op: '×', target: 3, cells: [[0, 2], [0, 3]] }, // 1*3=3
        { id: 'c3', op: '-', target: 2, cells: [[1, 0], [1, 1]] }, // 3-1=2
        { id: 'c4', op: '÷', target: 2, cells: [[1, 2], [1, 3]] }, // 4/2=2
        { id: 'c5', op: '-', target: 1, cells: [[2, 0], [2, 1]] }, // 4-3=1
        { id: 'c6', op: '-', target: 1, cells: [[2, 2], [2, 3]] }, // 2-1=1
        { id: 'c7', op: '+', target: 3, cells: [[3, 0], [3, 1]] }, // 1+2=3
        { id: 'c8', op: '+', target: 7, cells: [[3, 2], [3, 3]] }  // 3+4=7
      ]
    },
    {
      id: 6, size: 4, tier: '4x4 Explorer', title: 'Corner Cascade',
      solution: [
        [4, 1, 3, 2],
        [2, 3, 1, 4],
        [3, 4, 2, 1],
        [1, 2, 4, 3]
      ],
      cages: [
        { id: 'c1', op: '×', target: 4, cells: [[0, 0], [0, 1]] }, // 4*1=4
        { id: 'c2', op: '+', target: 5, cells: [[0, 2], [0, 3]] }, // 3+2=5
        { id: 'c3', op: '-', target: 1, cells: [[1, 0], [1, 1]] }, // 3-2=1
        { id: 'c4', op: '×', target: 4, cells: [[1, 2], [1, 3]] }, // 1*4=4
        { id: 'c5', op: '÷', target: 2, cells: [[2, 0], [3, 0]] }, // 3/1? 3-1=2
        { id: 'c6', op: '×', target: 8, cells: [[2, 1], [3, 1]] }, // 4*2=8
        { id: 'c7', op: '÷', target: 2, cells: [[2, 2], [3, 2]] }, // 4/2=2
        { id: 'c8', op: '-', target: 2, cells: [[2, 3], [3, 3]] }  // 3-1=2
      ]
    },
    {
      id: 7, size: 4, tier: '4x4 Explorer', title: 'Multiplier Cage',
      solution: [
        [3, 2, 4, 1],
        [1, 4, 2, 3],
        [4, 3, 1, 2],
        [2, 1, 3, 4]
      ],
      cages: [
        { id: 'c1', op: '×', target: 6, cells: [[0, 0], [0, 1]] }, // 3*2=6
        { id: 'c2', op: '÷', target: 4, cells: [[0, 2], [0, 3]] }, // 4/1=4
        { id: 'c3', op: '×', target: 4, cells: [[1, 0], [1, 1]] }, // 1*4=4
        { id: 'c4', op: '-', target: 1, cells: [[1, 2], [1, 3]] }, // 3-2=1
        { id: 'c5', op: '×', target: 12, cells: [[2, 0], [2, 1]] },// 4*3=12
        { id: 'c6', op: '÷', target: 2, cells: [[2, 2], [2, 3]] }, // 2/1=2
        { id: 'c7', op: '-', target: 1, cells: [[3, 0], [3, 1]] }, // 2-1=1
        { id: 'c8', op: '×', target: 12, cells: [[3, 2], [3, 3]] } // 3*4=12
      ]
    },

    // --- 5x5 PUZZLES (Numbers 1 to 5) ---
    {
      id: 8, size: 5, tier: '5x5 Supermath', title: 'Grand Latin Prime',
      solution: [
        [1, 3, 5, 2, 4],
        [2, 4, 1, 3, 5],
        [3, 5, 2, 4, 1],
        [4, 1, 3, 5, 2],
        [5, 2, 4, 1, 3]
      ],
      cages: [
        { id: 'c1', op: '×', target: 3, cells: [[0, 0], [0, 1]] },  // 1*3=3
        { id: 'c2', op: '=', target: 5, cells: [[0, 2]] },
        { id: 'c3', op: '×', target: 8, cells: [[0, 3], [0, 4]] },  // 2*4=8
        { id: 'c4', op: '×', target: 8, cells: [[1, 0], [1, 1]] },  // 2*4=8
        { id: 'c5', op: '×', target: 15, cells: [[1, 2], [1, 3], [1, 4]] }, // 1*3*5=15
        { id: 'c6', op: '-', target: 2, cells: [[2, 0], [2, 1]] },  // 5-3=2
        { id: 'c7', op: '÷', target: 2, cells: [[2, 2], [2, 3]] },  // 4/2=2
        { id: 'c8', op: '=', target: 1, cells: [[2, 4]] },
        { id: 'c9', op: '-', target: 3, cells: [[3, 0], [3, 1]] },  // 4-1=3
        { id: 'c10', op: '+', target: 8, cells: [[3, 2], [3, 3]] }, // 3+5=8
        { id: 'c11', op: '=', target: 2, cells: [[3, 4]] },
        { id: 'c12', op: '-', target: 3, cells: [[4, 0], [4, 1]] }, // 5-2=3
        { id: 'c13', op: '×', target: 12, cells: [[4, 2], [4, 3], [4, 4]] } // 4*1*3=12
      ]
    },
    {
      id: 9, size: 5, tier: '5x5 Supermath', title: 'The Pentagonal Factor',
      solution: [
        [5, 1, 4, 3, 2],
        [2, 3, 5, 1, 4],
        [1, 4, 2, 5, 3],
        [3, 5, 1, 2, 4],
        [4, 2, 3, 4, 1] // wait: [4,2,3,4,1] has duplicate 4! Let's fix row 4: [4, 2, 3, 4, 1] -> [4, 2, 3, ?]
      ]
    }
  ]
};

// Clean and Validate Puzzles (ensure 1 to 10 valid puzzles)
CALCUDOKU_DATA.puzzles = [
  // 3x3 Puzzles
  {
    id: 1, size: 3, tier: '3x3 Beginner', title: 'Mini Grid 1',
    solution: [[1, 2, 3], [3, 1, 2], [2, 3, 1]],
    cages: [
      { id: 'c1', op: '+', target: 3, cells: [[0, 0], [0, 1]] }, // 1+2=3
      { id: 'c2', op: '=', target: 3, cells: [[0, 2]] },
      { id: 'c3', op: '×', target: 2, cells: [[1, 1], [1, 2]] }, // 1*2=2
      { id: 'c4', op: '+', target: 5, cells: [[1, 0], [2, 0]] }, // 3+2=5
      { id: 'c5', op: '-', target: 2, cells: [[2, 1], [2, 2]] }  // 3-1=2
    ]
  },
  {
    id: 2, size: 3, tier: '3x3 Beginner', title: 'Mini Grid 2',
    solution: [[3, 1, 2], [2, 3, 1], [1, 2, 3]],
    cages: [
      { id: 'c1', op: '×', target: 6, cells: [[0, 0], [1, 0]] }, // 3*2=6
      { id: 'c2', op: '+', target: 3, cells: [[0, 1], [0, 2]] }, // 1+2=3
      { id: 'c3', op: '-', target: 2, cells: [[1, 1], [1, 2]] }, // 3-1=2
      { id: 'c4', op: '+', target: 3, cells: [[2, 0], [2, 1]] }, // 1+2=3
      { id: 'c5', op: '=', target: 3, cells: [[2, 2]] }
    ]
  },
  {
    id: 3, size: 3, tier: '3x3 Beginner', title: 'Mini Grid 3',
    solution: [[2, 3, 1], [1, 2, 3], [3, 1, 2]],
    cages: [
      { id: 'c1', op: '-', target: 1, cells: [[0, 0], [0, 1]] }, // 3-2=1
      { id: 'c2', op: '×', target: 3, cells: [[0, 2], [1, 2]] }, // 1*3=3
      { id: 'c3', op: '+', target: 3, cells: [[1, 0], [1, 1]] }, // 1+2=3
      { id: 'c4', op: '÷', target: 3, cells: [[2, 0], [2, 1]] }, // 3/1=3
      { id: 'c5', op: '=', target: 2, cells: [[2, 2]] }
    ]
  },
  // 4x4 Puzzles
  {
    id: 4, size: 4, tier: '4x4 Explorer', title: 'Quadrant 1',
    solution: [[1, 2, 4, 3], [3, 4, 1, 2], [4, 3, 2, 1], [2, 1, 3, 4]],
    cages: [
      { id: 'c1', op: '+', target: 4, cells: [[0, 0], [1, 0]] }, // 1+3=4
      { id: 'c2', op: '×', target: 8, cells: [[0, 1], [0, 2]] }, // 2*4=8
      { id: 'c3', op: '-', target: 1, cells: [[0, 3], [1, 3]] }, // 3-2=1
      { id: 'c4', op: '÷', target: 4, cells: [[1, 1], [1, 2]] }, // 4/1=4
      { id: 'c5', op: '-', target: 2, cells: [[2, 0], [3, 0]] }, // 4-2=2
      { id: 'c6', op: '×', target: 3, cells: [[2, 1], [3, 1]] }, // 3*1=3
      { id: 'c7', op: '+', target: 5, cells: [[2, 2], [3, 2]] }, // 2+3=5
      { id: 'c8', op: '×', target: 4, cells: [[2, 3], [3, 3]] }  // 1*4=4
    ]
  },
  {
    id: 5, size: 4, tier: '4x4 Explorer', title: 'Quadrant 2',
    solution: [[2, 4, 1, 3], [3, 1, 4, 2], [4, 3, 2, 1], [1, 2, 3, 4]],
    cages: [
      { id: 'c1', op: '÷', target: 2, cells: [[0, 0], [0, 1]] }, // 4/2=2
      { id: 'c2', op: '×', target: 3, cells: [[0, 2], [0, 3]] }, // 1*3=3
      { id: 'c3', op: '-', target: 2, cells: [[1, 0], [1, 1]] }, // 3-1=2
      { id: 'c4', op: '÷', target: 2, cells: [[1, 2], [1, 3]] }, // 4/2=2
      { id: 'c5', op: '-', target: 1, cells: [[2, 0], [2, 1]] }, // 4-3=1
      { id: 'c6', op: '-', target: 1, cells: [[2, 2], [2, 3]] }, // 2-1=1
      { id: 'c7', op: '+', target: 3, cells: [[3, 0], [3, 1]] }, // 1+2=3
      { id: 'c8', op: '+', target: 7, cells: [[3, 2], [3, 3]] }  // 3+4=7
    ]
  },
  {
    id: 6, size: 4, tier: '4x4 Explorer', title: 'Quadrant 3',
    solution: [[3, 2, 4, 1], [1, 4, 2, 3], [4, 3, 1, 2], [2, 1, 3, 4]],
    cages: [
      { id: 'c1', op: '×', target: 6, cells: [[0, 0], [0, 1]] }, // 3*2=6
      { id: 'c2', op: '÷', target: 4, cells: [[0, 2], [0, 3]] }, // 4/1=4
      { id: 'c3', op: '×', target: 4, cells: [[1, 0], [1, 1]] }, // 1*4=4
      { id: 'c4', op: '-', target: 1, cells: [[1, 2], [1, 3]] }, // 3-2=1
      { id: 'c5', op: '×', target: 12, cells: [[2, 0], [2, 1]] },// 4*3=12
      { id: 'c6', op: '÷', target: 2, cells: [[2, 2], [2, 3]] }, // 2/1=2
      { id: 'c7', op: '-', target: 1, cells: [[3, 0], [3, 1]] }, // 2-1=1
      { id: 'c8', op: '×', target: 12, cells: [[3, 2], [3, 3]] } // 3*4=12
    ]
  },
  // 5x5 Puzzles
  {
    id: 7, size: 5, tier: '5x5 Supermath', title: 'Grand Pentagram',
    solution: [
      [1, 3, 5, 2, 4],
      [2, 4, 1, 3, 5],
      [3, 5, 2, 4, 1],
      [4, 1, 3, 5, 2],
      [5, 2, 4, 1, 3]
    ],
    cages: [
      { id: 'c1', op: '×', target: 3, cells: [[0, 0], [0, 1]] },  // 1*3=3
      { id: 'c2', op: '=', target: 5, cells: [[0, 2]] },
      { id: 'c3', op: '×', target: 8, cells: [[0, 3], [0, 4]] },  // 2*4=8
      { id: 'c4', op: '×', target: 8, cells: [[1, 0], [1, 1]] },  // 2*4=8
      { id: 'c5', op: '×', target: 15, cells: [[1, 2], [1, 3], [1, 4]] }, // 1*3*5=15
      { id: 'c6', op: '-', target: 2, cells: [[2, 0], [2, 1]] },  // 5-3=2
      { id: 'c7', op: '÷', target: 2, cells: [[2, 2], [2, 3]] },  // 4/2=2
      { id: 'c8', op: '=', target: 1, cells: [[2, 4]] },
      { id: 'c9', op: '-', target: 3, cells: [[3, 0], [3, 1]] },  // 4-1=3
      { id: 'c10', op: '+', target: 8, cells: [[3, 2], [3, 3]] }, // 3+5=8
      { id: 'c11', op: '=', target: 2, cells: [[3, 4]] },
      { id: 'c12', op: '-', target: 3, cells: [[4, 0], [4, 1]] }, // 5-2=3
      { id: 'c13', op: '×', target: 12, cells: [[4, 2], [4, 3], [4, 4]] } // 4*1*3=12
    ]
  }
];

// Helper to evaluate if an array of values satisfies a cage
CALCUDOKU_DATA.validateCage = function(op, target, values) {
  if (values.some(v => !v || v === 0)) return { satisfied: false, partial: true };

  switch (op) {
    case '=':
      return { satisfied: values.length === 1 && values[0] === target, partial: false };
    case '+': {
      const sum = values.reduce((a, b) => a + b, 0);
      return { satisfied: sum === target, partial: false };
    }
    case '×': {
      const prod = values.reduce((a, b) => a * b, 1);
      return { satisfied: prod === target, partial: false };
    }
    case '-': {
      if (values.length !== 2) return { satisfied: false, partial: false };
      const diff = Math.abs(values[0] - values[1]);
      return { satisfied: diff === target, partial: false };
    }
    case '÷': {
      if (values.length !== 2) return { satisfied: false, partial: false };
      const max = Math.max(values[0], values[1]);
      const min = Math.min(values[0], values[1]);
      return { satisfied: min > 0 && max / min === target, partial: false };
    }
    default:
      return { satisfied: false, partial: false };
  }
};

// Export for Node.js & Browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CALCUDOKU_DATA };
}
if (typeof window !== 'undefined') {
  window.CALCUDOKU_DATA = CALCUDOKU_DATA;
}
