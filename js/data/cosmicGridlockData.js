/**
 * Cosmic Gridlock (Rush Hour / Unblock Me) Level Dataset
 * 20 Guaranteed BFS-Verified Solvable Levels with Exact Par Moves
 */

const COSMIC_GRIDLOCK_LEVELS = [
  {
    "id": 1,
    "name": "Nebula Gate 01",
    "tier": "Cadet",
    "par": 2,
    "pieces": [
      {
        "id": "target",
        "x": 0,
        "y": 2,
        "len": 2,
        "ori": "H",
        "type": "target"
      },
      {
        "id": "o1",
        "x": 2,
        "y": 2,
        "len": 2,
        "ori": "V",
        "type": "scout"
      },
      {
        "id": "o2",
        "x": 2,
        "y": 1,
        "len": 3,
        "ori": "H",
        "type": "cruiser"
      },
      {
        "id": "o3",
        "x": 4,
        "y": 3,
        "len": 2,
        "ori": "V",
        "type": "scout"
      }
    ]
  },
  {
    "id": 2,
    "name": "Asteroid Alley",
    "tier": "Cadet",
    "par": 2,
    "pieces": [
      {
        "id": "target",
        "x": 0,
        "y": 2,
        "len": 2,
        "ori": "H",
        "type": "target"
      },
      {
        "id": "o1",
        "x": 0,
        "y": 0,
        "len": 2,
        "ori": "V",
        "type": "scout"
      },
      {
        "id": "o2",
        "x": 1,
        "y": 3,
        "len": 2,
        "ori": "V",
        "type": "scout"
      },
      {
        "id": "o3",
        "x": 3,
        "y": 1,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      }
    ]
  },
  {
    "id": 3,
    "name": "Ion Streamway",
    "tier": "Cadet",
    "par": 3,
    "pieces": [
      {
        "id": "target",
        "x": 0,
        "y": 2,
        "len": 2,
        "ori": "H",
        "type": "target"
      },
      {
        "id": "o1",
        "x": 2,
        "y": 2,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      },
      {
        "id": "o2",
        "x": 2,
        "y": 0,
        "len": 3,
        "ori": "H",
        "type": "cruiser"
      },
      {
        "id": "o3",
        "x": 2,
        "y": 5,
        "len": 2,
        "ori": "H",
        "type": "scout"
      }
    ]
  },
  {
    "id": 4,
    "name": "Solar Flare Pass",
    "tier": "Cadet",
    "par": 3,
    "pieces": [
      {
        "id": "target",
        "x": 2,
        "y": 2,
        "len": 2,
        "ori": "H",
        "type": "target"
      },
      {
        "id": "o1",
        "x": 3,
        "y": 4,
        "len": 2,
        "ori": "H",
        "type": "scout"
      },
      {
        "id": "o2",
        "x": 2,
        "y": 0,
        "len": 2,
        "ori": "V",
        "type": "scout"
      },
      {
        "id": "o3",
        "x": 4,
        "y": 1,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      }
    ]
  },
  {
    "id": 5,
    "name": "Plasma Corridor",
    "tier": "Cadet",
    "par": 4,
    "pieces": [
      {
        "id": "target",
        "x": 0,
        "y": 2,
        "len": 2,
        "ori": "H",
        "type": "target"
      },
      {
        "id": "o1",
        "x": 4,
        "y": 0,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      },
      {
        "id": "o2",
        "x": 3,
        "y": 1,
        "len": 2,
        "ori": "V",
        "type": "scout"
      },
      {
        "id": "o3",
        "x": 0,
        "y": 5,
        "len": 2,
        "ori": "H",
        "type": "scout"
      },
      {
        "id": "o4",
        "x": 4,
        "y": 3,
        "len": 2,
        "ori": "H",
        "type": "scout"
      }
    ]
  },
  {
    "id": 6,
    "name": "Quantum Jam",
    "tier": "Explorer",
    "par": 4,
    "pieces": [
      {
        "id": "target",
        "x": 0,
        "y": 2,
        "len": 2,
        "ori": "H",
        "type": "target"
      },
      {
        "id": "o1",
        "x": 2,
        "y": 1,
        "len": 2,
        "ori": "V",
        "type": "scout"
      },
      {
        "id": "o2",
        "x": 5,
        "y": 0,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      },
      {
        "id": "o3",
        "x": 3,
        "y": 2,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      },
      {
        "id": "o4",
        "x": 1,
        "y": 0,
        "len": 2,
        "ori": "V",
        "type": "scout"
      }
    ]
  },
  {
    "id": 7,
    "name": "Hyperdrive Choke",
    "tier": "Explorer",
    "par": 4,
    "pieces": [
      {
        "id": "target",
        "x": 0,
        "y": 2,
        "len": 2,
        "ori": "H",
        "type": "target"
      },
      {
        "id": "o1",
        "x": 1,
        "y": 3,
        "len": 2,
        "ori": "V",
        "type": "scout"
      },
      {
        "id": "o2",
        "x": 2,
        "y": 2,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      },
      {
        "id": "o3",
        "x": 4,
        "y": 1,
        "len": 2,
        "ori": "V",
        "type": "scout"
      },
      {
        "id": "o4",
        "x": 1,
        "y": 5,
        "len": 3,
        "ori": "H",
        "type": "cruiser"
      }
    ]
  },
  {
    "id": 8,
    "name": "Orbital Vortex",
    "tier": "Explorer",
    "par": 6,
    "pieces": [
      {
        "id": "target",
        "x": 0,
        "y": 2,
        "len": 2,
        "ori": "H",
        "type": "target"
      },
      {
        "id": "o1",
        "x": 0,
        "y": 3,
        "len": 3,
        "ori": "H",
        "type": "cruiser"
      },
      {
        "id": "o2",
        "x": 4,
        "y": 5,
        "len": 2,
        "ori": "H",
        "type": "scout"
      },
      {
        "id": "o3",
        "x": 3,
        "y": 3,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      },
      {
        "id": "o4",
        "x": 5,
        "y": 0,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      },
      {
        "id": "o5",
        "x": 4,
        "y": 1,
        "len": 2,
        "ori": "V",
        "type": "scout"
      }
    ]
  },
  {
    "id": 9,
    "name": "Pulsar Maze",
    "tier": "Explorer",
    "par": 7,
    "pieces": [
      {
        "id": "target",
        "x": 0,
        "y": 2,
        "len": 2,
        "ori": "H",
        "type": "target"
      },
      {
        "id": "o1",
        "x": 5,
        "y": 1,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      },
      {
        "id": "o2",
        "x": 4,
        "y": 0,
        "len": 2,
        "ori": "H",
        "type": "scout"
      },
      {
        "id": "o3",
        "x": 2,
        "y": 2,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      },
      {
        "id": "o4",
        "x": 2,
        "y": 0,
        "len": 2,
        "ori": "V",
        "type": "scout"
      },
      {
        "id": "o5",
        "x": 0,
        "y": 5,
        "len": 3,
        "ori": "H",
        "type": "cruiser"
      }
    ]
  },
  {
    "id": 10,
    "name": "Cosmic Crossroad",
    "tier": "Explorer",
    "par": 5,
    "pieces": [
      {
        "id": "target",
        "x": 0,
        "y": 2,
        "len": 2,
        "ori": "H",
        "type": "target"
      },
      {
        "id": "o1",
        "x": 3,
        "y": 0,
        "len": 2,
        "ori": "H",
        "type": "scout"
      },
      {
        "id": "o2",
        "x": 5,
        "y": 1,
        "len": 2,
        "ori": "V",
        "type": "scout"
      },
      {
        "id": "o3",
        "x": 4,
        "y": 1,
        "len": 2,
        "ori": "V",
        "type": "scout"
      },
      {
        "id": "o4",
        "x": 4,
        "y": 4,
        "len": 2,
        "ori": "H",
        "type": "scout"
      },
      {
        "id": "o5",
        "x": 3,
        "y": 1,
        "len": 2,
        "ori": "V",
        "type": "scout"
      }
    ]
  },
  {
    "id": 11,
    "name": "Singularity Lock",
    "tier": "Commander",
    "par": 6,
    "pieces": [
      {
        "id": "target",
        "x": 1,
        "y": 2,
        "len": 2,
        "ori": "H",
        "type": "target"
      },
      {
        "id": "o1",
        "x": 3,
        "y": 0,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      },
      {
        "id": "o2",
        "x": 3,
        "y": 4,
        "len": 3,
        "ori": "H",
        "type": "cruiser"
      },
      {
        "id": "o3",
        "x": 3,
        "y": 3,
        "len": 2,
        "ori": "H",
        "type": "scout"
      },
      {
        "id": "o4",
        "x": 0,
        "y": 1,
        "len": 2,
        "ori": "V",
        "type": "scout"
      },
      {
        "id": "o5",
        "x": 4,
        "y": 1,
        "len": 2,
        "ori": "V",
        "type": "scout"
      },
      {
        "id": "o6",
        "x": 5,
        "y": 1,
        "len": 2,
        "ori": "V",
        "type": "scout"
      }
    ]
  },
  {
    "id": 12,
    "name": "Dark Matter Grid",
    "tier": "Commander",
    "par": 6,
    "pieces": [
      {
        "id": "target",
        "x": 0,
        "y": 2,
        "len": 2,
        "ori": "H",
        "type": "target"
      },
      {
        "id": "o1",
        "x": 1,
        "y": 4,
        "len": 3,
        "ori": "H",
        "type": "cruiser"
      },
      {
        "id": "o2",
        "x": 4,
        "y": 2,
        "len": 2,
        "ori": "V",
        "type": "scout"
      },
      {
        "id": "o3",
        "x": 1,
        "y": 0,
        "len": 3,
        "ori": "H",
        "type": "cruiser"
      },
      {
        "id": "o4",
        "x": 5,
        "y": 1,
        "len": 2,
        "ori": "V",
        "type": "scout"
      },
      {
        "id": "o5",
        "x": 3,
        "y": 1,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      },
      {
        "id": "o6",
        "x": 3,
        "y": 5,
        "len": 2,
        "ori": "H",
        "type": "scout"
      }
    ]
  },
  {
    "id": 13,
    "name": "Superluminal Drift",
    "tier": "Commander",
    "par": 6,
    "pieces": [
      {
        "id": "target",
        "x": 1,
        "y": 2,
        "len": 2,
        "ori": "H",
        "type": "target"
      },
      {
        "id": "o1",
        "x": 4,
        "y": 0,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      },
      {
        "id": "o2",
        "x": 4,
        "y": 5,
        "len": 2,
        "ori": "H",
        "type": "scout"
      },
      {
        "id": "o3",
        "x": 2,
        "y": 1,
        "len": 2,
        "ori": "H",
        "type": "scout"
      },
      {
        "id": "o4",
        "x": 3,
        "y": 3,
        "len": 2,
        "ori": "H",
        "type": "scout"
      },
      {
        "id": "o5",
        "x": 5,
        "y": 2,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      },
      {
        "id": "o6",
        "x": 1,
        "y": 3,
        "len": 2,
        "ori": "H",
        "type": "scout"
      }
    ]
  },
  {
    "id": 14,
    "name": "Event Horizon Clamp",
    "tier": "Commander",
    "par": 8,
    "pieces": [
      {
        "id": "target",
        "x": 0,
        "y": 2,
        "len": 2,
        "ori": "H",
        "type": "target"
      },
      {
        "id": "o1",
        "x": 2,
        "y": 0,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      },
      {
        "id": "o2",
        "x": 2,
        "y": 5,
        "len": 3,
        "ori": "H",
        "type": "cruiser"
      },
      {
        "id": "o3",
        "x": 5,
        "y": 0,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      },
      {
        "id": "o4",
        "x": 1,
        "y": 3,
        "len": 2,
        "ori": "H",
        "type": "scout"
      },
      {
        "id": "o5",
        "x": 1,
        "y": 4,
        "len": 2,
        "ori": "V",
        "type": "scout"
      },
      {
        "id": "o6",
        "x": 0,
        "y": 3,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      }
    ]
  },
  {
    "id": 15,
    "name": "Titanium Nebula",
    "tier": "Commander",
    "par": 11,
    "pieces": [
      {
        "id": "target",
        "x": 1,
        "y": 2,
        "len": 2,
        "ori": "H",
        "type": "target"
      },
      {
        "id": "o1",
        "x": 0,
        "y": 0,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      },
      {
        "id": "o2",
        "x": 0,
        "y": 3,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      },
      {
        "id": "o3",
        "x": 2,
        "y": 4,
        "len": 2,
        "ori": "H",
        "type": "scout"
      },
      {
        "id": "o4",
        "x": 3,
        "y": 1,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      },
      {
        "id": "o5",
        "x": 4,
        "y": 0,
        "len": 2,
        "ori": "H",
        "type": "scout"
      },
      {
        "id": "o6",
        "x": 1,
        "y": 4,
        "len": 2,
        "ori": "V",
        "type": "scout"
      },
      {
        "id": "o7",
        "x": 5,
        "y": 3,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      }
    ]
  },
  {
    "id": 16,
    "name": "Chronos Paradox",
    "tier": "Supernova",
    "par": 8,
    "pieces": [
      {
        "id": "target",
        "x": 0,
        "y": 2,
        "len": 2,
        "ori": "H",
        "type": "target"
      },
      {
        "id": "o1",
        "x": 4,
        "y": 3,
        "len": 2,
        "ori": "H",
        "type": "scout"
      },
      {
        "id": "o2",
        "x": 0,
        "y": 3,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      },
      {
        "id": "o3",
        "x": 3,
        "y": 0,
        "len": 2,
        "ori": "V",
        "type": "scout"
      },
      {
        "id": "o4",
        "x": 0,
        "y": 0,
        "len": 3,
        "ori": "H",
        "type": "cruiser"
      },
      {
        "id": "o5",
        "x": 2,
        "y": 2,
        "len": 2,
        "ori": "V",
        "type": "scout"
      },
      {
        "id": "o6",
        "x": 5,
        "y": 0,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      },
      {
        "id": "o7",
        "x": 1,
        "y": 4,
        "len": 3,
        "ori": "H",
        "type": "cruiser"
      }
    ]
  },
  {
    "id": 17,
    "name": "Tachyon Labyrinth",
    "tier": "Supernova",
    "par": 7,
    "pieces": [
      {
        "id": "target",
        "x": 1,
        "y": 2,
        "len": 2,
        "ori": "H",
        "type": "target"
      },
      {
        "id": "o1",
        "x": 1,
        "y": 3,
        "len": 2,
        "ori": "V",
        "type": "scout"
      },
      {
        "id": "o2",
        "x": 3,
        "y": 1,
        "len": 2,
        "ori": "V",
        "type": "scout"
      },
      {
        "id": "o3",
        "x": 0,
        "y": 3,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      },
      {
        "id": "o4",
        "x": 3,
        "y": 4,
        "len": 3,
        "ori": "H",
        "type": "cruiser"
      },
      {
        "id": "o5",
        "x": 2,
        "y": 3,
        "len": 2,
        "ori": "V",
        "type": "scout"
      },
      {
        "id": "o6",
        "x": 2,
        "y": 0,
        "len": 3,
        "ori": "H",
        "type": "cruiser"
      },
      {
        "id": "o7",
        "x": 5,
        "y": 1,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      }
    ]
  },
  {
    "id": 18,
    "name": "Galactic Keystone",
    "tier": "Supernova",
    "par": 9,
    "pieces": [
      {
        "id": "target",
        "x": 2,
        "y": 2,
        "len": 2,
        "ori": "H",
        "type": "target"
      },
      {
        "id": "o1",
        "x": 3,
        "y": 3,
        "len": 3,
        "ori": "H",
        "type": "cruiser"
      },
      {
        "id": "o2",
        "x": 3,
        "y": 0,
        "len": 2,
        "ori": "H",
        "type": "scout"
      },
      {
        "id": "o3",
        "x": 4,
        "y": 5,
        "len": 2,
        "ori": "H",
        "type": "scout"
      },
      {
        "id": "o4",
        "x": 2,
        "y": 3,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      },
      {
        "id": "o5",
        "x": 5,
        "y": 0,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      },
      {
        "id": "o6",
        "x": 0,
        "y": 5,
        "len": 2,
        "ori": "H",
        "type": "scout"
      },
      {
        "id": "o7",
        "x": 3,
        "y": 4,
        "len": 2,
        "ori": "V",
        "type": "scout"
      },
      {
        "id": "o8",
        "x": 4,
        "y": 1,
        "len": 2,
        "ori": "V",
        "type": "scout"
      }
    ]
  },
  {
    "id": 19,
    "name": "Infinity Core",
    "tier": "Supernova",
    "par": 9,
    "pieces": [
      {
        "id": "target",
        "x": 1,
        "y": 2,
        "len": 2,
        "ori": "H",
        "type": "target"
      },
      {
        "id": "o1",
        "x": 4,
        "y": 4,
        "len": 2,
        "ori": "H",
        "type": "scout"
      },
      {
        "id": "o2",
        "x": 3,
        "y": 5,
        "len": 3,
        "ori": "H",
        "type": "cruiser"
      },
      {
        "id": "o3",
        "x": 0,
        "y": 3,
        "len": 2,
        "ori": "V",
        "type": "scout"
      },
      {
        "id": "o4",
        "x": 3,
        "y": 1,
        "len": 2,
        "ori": "V",
        "type": "scout"
      },
      {
        "id": "o5",
        "x": 1,
        "y": 1,
        "len": 2,
        "ori": "H",
        "type": "scout"
      },
      {
        "id": "o6",
        "x": 2,
        "y": 4,
        "len": 2,
        "ori": "V",
        "type": "scout"
      },
      {
        "id": "o7",
        "x": 4,
        "y": 1,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      },
      {
        "id": "o8",
        "x": 1,
        "y": 4,
        "len": 2,
        "ori": "V",
        "type": "scout"
      }
    ]
  },
  {
    "id": 20,
    "name": "The Cosmic Singularity",
    "tier": "Supernova",
    "par": 9,
    "pieces": [
      {
        "id": "target",
        "x": 0,
        "y": 2,
        "len": 2,
        "ori": "H",
        "type": "target"
      },
      {
        "id": "o1",
        "x": 4,
        "y": 1,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      },
      {
        "id": "o2",
        "x": 0,
        "y": 0,
        "len": 2,
        "ori": "V",
        "type": "scout"
      },
      {
        "id": "o3",
        "x": 1,
        "y": 4,
        "len": 3,
        "ori": "H",
        "type": "cruiser"
      },
      {
        "id": "o4",
        "x": 3,
        "y": 1,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      },
      {
        "id": "o5",
        "x": 1,
        "y": 5,
        "len": 3,
        "ori": "H",
        "type": "cruiser"
      },
      {
        "id": "o6",
        "x": 0,
        "y": 3,
        "len": 2,
        "ori": "H",
        "type": "scout"
      },
      {
        "id": "o7",
        "x": 0,
        "y": 4,
        "len": 2,
        "ori": "V",
        "type": "scout"
      },
      {
        "id": "o8",
        "x": 5,
        "y": 0,
        "len": 3,
        "ori": "V",
        "type": "cruiser"
      }
    ]
  }
];

function hashBoardState(pieces) {
  return pieces
    .slice()
    .sort((a, b) => a.id.localeCompare(b.id))
    .map(p => `${p.id}:${p.x},${p.y}`)
    .join('|');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { COSMIC_GRIDLOCK_LEVELS, hashBoardState };
}
