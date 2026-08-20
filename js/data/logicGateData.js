/**
 * Cyber Logic Gate Runner: Data & Digital Logic Circuit Levels
 * Contains Gate Logic Evaluators and 20 Progressive Puzzle Levels across 4 Tiers
 */

const LOGIC_GATE_DATA = {
  // Primitive Boolean Gate Evaluators
  evaluateGate: function(gateType, inputs) {
    const [a, b] = inputs;
    switch (gateType.toUpperCase()) {
      case 'AND': return (a === 1 && b === 1) ? 1 : 0;
      case 'OR':  return (a === 1 || b === 1) ? 1 : 0;
      case 'NOT': return (a === 1) ? 0 : 1;
      case 'XOR': return (a !== b) ? 1 : 0;
      case 'NAND': return !(a === 1 && b === 1) ? 1 : 0;
      case 'NOR':  return !(a === 1 || b === 1) ? 1 : 0;
      case 'XNOR': return (a === b) ? 1 : 0;
      case 'BUFFER': return a === 1 ? 1 : 0;
      default: return 0;
    }
  },

  // 20 Progressive Circuit Levels
  levels: [
    // --- TIER 1: POWER STATION (Single Basic Gates) ---
    {
      id: 1, tier: 1, title: 'Power Grid Boot', desc: 'Flip the switch to activate the AND gate and power the Robot Eye.',
      inputs: [{ id: 'in_A', label: 'Switch A', val: 0, fixed: false }, { id: 'in_B', label: 'Switch B', val: 1, fixed: true }],
      gates: [{ id: 'gate_1', type: 'AND', in: ['in_A', 'in_B'], out: 'out_1' }],
      targets: [{ id: 'out_1', label: 'Robot Eye', targetVal: 1 }]
    },
    {
      id: 2, tier: 1, title: 'Laser Deflector', desc: 'Activate either switch to power the OR gate deflector shield.',
      inputs: [{ id: 'in_A', label: 'Switch A', val: 0, fixed: false }, { id: 'in_B', label: 'Switch B', val: 0, fixed: false }],
      gates: [{ id: 'gate_1', type: 'OR', in: ['in_A', 'in_B'], out: 'out_1' }],
      targets: [{ id: 'out_1', label: 'Deflector Shield', targetVal: 1 }]
    },
    {
      id: 3, tier: 1, title: 'Signal Inverter', desc: 'The NOT gate inverts the signal. Turn OFF the defense alarm by setting output to 0.',
      inputs: [{ id: 'in_A', label: 'Input A', val: 0, fixed: false }],
      gates: [{ id: 'gate_1', type: 'NOT', in: ['in_A'], out: 'out_1' }],
      targets: [{ id: 'out_1', label: 'Defense Alarm', targetVal: 0 }]
    },
    {
      id: 4, tier: 1, title: 'Balanced Alternator', desc: 'The XOR gate outputs 1 only when inputs are DIFFERENT. Power the Turbine!',
      inputs: [{ id: 'in_A', label: 'Switch A', val: 1, fixed: false }, { id: 'in_B', label: 'Switch B', val: 1, fixed: false }],
      gates: [{ id: 'gate_1', type: 'XOR', in: ['in_A', 'in_B'], out: 'out_1' }],
      targets: [{ id: 'out_1', label: 'Turbine Engine', targetVal: 1 }]
    },
    {
      id: 5, tier: 1, title: 'NAND Safeguard', desc: 'The NAND gate outputs 0 ONLY when both inputs are 1. Prevent Overheat (Target: 1).',
      inputs: [{ id: 'in_A', label: 'Sensor A', val: 1, fixed: false }, { id: 'in_B', label: 'Sensor B', val: 1, fixed: false }],
      gates: [{ id: 'gate_1', type: 'NAND', in: ['in_A', 'in_B'], out: 'out_1' }],
      targets: [{ id: 'out_1', label: 'Cooling Core', targetVal: 1 }]
    },

    // --- TIER 2: ROBOT SYSTEMS (2-3 Gate Networks) ---
    {
      id: 6, tier: 2, title: 'Bionic Arm Actuator', desc: 'Pass power through the AND and OR cascade to extend the robotic arm.',
      inputs: [{ id: 'in_A', label: 'A', val: 0, fixed: false }, { id: 'in_B', label: 'B', val: 1, fixed: true }, { id: 'in_C', label: 'C', val: 0, fixed: false }],
      gates: [
        { id: 'gate_1', type: 'AND', in: ['in_A', 'in_B'], out: 'wire_1' },
        { id: 'gate_2', type: 'OR', in: ['wire_1', 'in_C'], out: 'out_1' }
      ],
      targets: [{ id: 'out_1', label: 'Bionic Arm', targetVal: 1 }]
    },
    {
      id: 7, tier: 2, title: 'Dual Thruster Stabilizer', desc: 'Balance the inputs so that Thruster 1 is ON (1) and Thruster 2 is OFF (0).',
      inputs: [{ id: 'in_A', label: 'A', val: 0, fixed: false }, { id: 'in_B', label: 'B', val: 0, fixed: false }],
      gates: [
        { id: 'gate_1', type: 'XOR', in: ['in_A', 'in_B'], out: 'out_1' },
        { id: 'gate_2', type: 'AND', in: ['in_A', 'in_B'], out: 'out_2' }
      ],
      targets: [
        { id: 'out_1', label: 'Thruster 1', targetVal: 1 },
        { id: 'out_2', label: 'Thruster 2', targetVal: 0 }
      ]
    },
    {
      id: 8, tier: 2, title: 'Inverted Matrix', desc: 'Route signals through NOT and NOR gates to unlock the Space Station Door.',
      inputs: [{ id: 'in_A', label: 'A', val: 1, fixed: false }, { id: 'in_B', label: 'B', val: 0, fixed: false }],
      gates: [
        { id: 'gate_1', type: 'NOT', in: ['in_A'], out: 'wire_1' },
        { id: 'gate_2', type: 'NOR', in: ['wire_1', 'in_B'], out: 'out_1' }
      ],
      targets: [{ id: 'out_1', label: 'Station Door', targetVal: 1 }]
    },
    {
      id: 9, tier: 2, title: 'Cyber Security Protocol', desc: 'Configure 3 inputs so both Security Lights flash GREEN (1).',
      inputs: [{ id: 'in_A', label: 'A', val: 0, fixed: false }, { id: 'in_B', label: 'B', val: 0, fixed: false }, { id: 'in_C', label: 'C', val: 0, fixed: false }],
      gates: [
        { id: 'gate_1', type: 'OR', in: ['in_A', 'in_B'], out: 'out_1' },
        { id: 'gate_2', type: 'XOR', in: ['in_B', 'in_C'], out: 'out_2' }
      ],
      targets: [
        { id: 'out_1', label: 'Security Light 1', targetVal: 1 },
        { id: 'out_2', label: 'Security Light 2', targetVal: 1 }
      ]
    },
    {
      id: 10, tier: 2, title: 'Antimatter Containment', desc: 'Harmonize inputs to activate the Containment Field (1) while Vent is Closed (0).',
      inputs: [{ id: 'in_A', label: 'A', val: 0, fixed: false }, { id: 'in_B', label: 'B', val: 1, fixed: true }, { id: 'in_C', label: 'C', val: 0, fixed: false }],
      gates: [
        { id: 'gate_1', type: 'NAND', in: ['in_A', 'in_B'], out: 'out_1' },
        { id: 'gate_2', type: 'AND', in: ['in_B', 'in_C'], out: 'out_2' }
      ],
      targets: [
        { id: 'out_1', label: 'Containment Field', targetVal: 1 },
        { id: 'out_2', label: 'Exhaust Vent', targetVal: 0 }
      ]
    },

    // --- TIER 3: BINARY ARITHMETIC & ADDERS (Half/Full Adders & Decoders) ---
    {
      id: 11, tier: 3, title: 'The Binary Half-Adder', desc: 'A real 1-bit Half Adder! Calculate 1 + 0 = 1 (Sum: 1, Carry: 0).',
      inputs: [{ id: 'in_A', label: 'Bit A', val: 0, fixed: false }, { id: 'in_B', label: 'Bit B', val: 0, fixed: false }],
      gates: [
        { id: 'gate_sum', type: 'XOR', in: ['in_A', 'in_B'], out: 'out_sum' },
        { id: 'gate_carry', type: 'AND', in: ['in_A', 'in_B'], out: 'out_carry' }
      ],
      targets: [
        { id: 'out_sum', label: 'Sum Bit (S)', targetVal: 1 },
        { id: 'out_carry', label: 'Carry Bit (C)', targetVal: 0 }
      ]
    },
    {
      id: 12, tier: 3, title: 'Half-Adder Overflow', desc: 'Calculate 1 + 1 = 2 in binary (Sum: 0, Carry: 1)!',
      inputs: [{ id: 'in_A', label: 'Bit A', val: 0, fixed: false }, { id: 'in_B', label: 'Bit B', val: 0, fixed: false }],
      gates: [
        { id: 'gate_sum', type: 'XOR', in: ['in_A', 'in_B'], out: 'out_sum' },
        { id: 'gate_carry', type: 'AND', in: ['in_A', 'in_B'], out: 'out_carry' }
      ],
      targets: [
        { id: 'out_sum', label: 'Sum Bit (S)', targetVal: 0 },
        { id: 'out_carry', label: 'Carry Bit (C)', targetVal: 1 }
      ]
    },
    {
      id: 13, tier: 3, title: '2-to-1 Multiplexer', desc: 'Use the Select line to route the desired data signal to the main processor.',
      inputs: [
        { id: 'in_D0', label: 'Data 0', val: 1, fixed: true },
        { id: 'in_D1', label: 'Data 1', val: 0, fixed: true },
        { id: 'in_SEL', label: 'Select Line', val: 1, fixed: false }
      ],
      gates: [
        { id: 'gate_not', type: 'NOT', in: ['in_SEL'], out: 'wire_nsel' },
        { id: 'gate_and0', type: 'AND', in: ['in_D0', 'wire_nsel'], out: 'wire_and0' },
        { id: 'gate_and1', type: 'AND', in: ['in_D1', 'in_SEL'], out: 'wire_and1' },
        { id: 'gate_or', type: 'OR', in: ['wire_and0', 'wire_and1'], out: 'out_mux' }
      ],
      targets: [{ id: 'out_mux', label: 'Multiplexer Output', targetVal: 1 }]
    },
    {
      id: 14, tier: 3, title: 'Majority Voter Circuit', desc: 'Output becomes 1 if at least 2 out of 3 sensors agree.',
      inputs: [{ id: 'in_A', label: 'Sensor A', val: 0, fixed: false }, { id: 'in_B', label: 'Sensor B', val: 0, fixed: false }, { id: 'in_C', label: 'Sensor C', val: 0, fixed: false }],
      gates: [
        { id: 'gate_ab', type: 'AND', in: ['in_A', 'in_B'], out: 'wire_ab' },
        { id: 'gate_bc', type: 'AND', in: ['in_B', 'in_C'], out: 'wire_bc' },
        { id: 'gate_ac', type: 'AND', in: ['in_A', 'in_C'], out: 'wire_ac' },
        { id: 'gate_or1', type: 'OR', in: ['wire_ab', 'wire_bc'], out: 'wire_or1' },
        { id: 'gate_or2', type: 'OR', in: ['wire_or1', 'wire_ac'], out: 'out_majority' }
      ],
      targets: [{ id: 'out_majority', label: 'Majority Consensus', targetVal: 1 }]
    },
    {
      id: 15, tier: 3, title: 'Equality Comparator', desc: 'The XNOR gate acts as an equality checker. Align all bits to confirm equivalence.',
      inputs: [{ id: 'in_A', label: 'Bit A', val: 0, fixed: false }, { id: 'in_B', label: 'Bit B', val: 1, fixed: false }, { id: 'in_C', label: 'Bit C', val: 0, fixed: false }],
      gates: [
        { id: 'gate_eq1', type: 'XNOR', in: ['in_A', 'in_B'], out: 'wire_eq1' },
        { id: 'gate_eq2', type: 'XNOR', in: ['in_B', 'in_C'], out: 'wire_eq2' },
        { id: 'gate_final', type: 'AND', in: ['wire_eq1', 'wire_eq2'], out: 'out_match' }
      ],
      targets: [{ id: 'out_match', label: 'All Bits Equal', targetVal: 1 }]
    },

    // --- TIER 4: CYBER CORE DEFENSE (Complex Multilevel Networks) ---
    {
      id: 16, tier: 4, title: 'Quantum Reactor Lock', desc: 'Solve the 4-input logic mesh to stabilize the quantum reactor core.',
      inputs: [
        { id: 'in_A', label: 'A', val: 0, fixed: false },
        { id: 'in_B', label: 'B', val: 0, fixed: false },
        { id: 'in_C', label: 'C', val: 0, fixed: false },
        { id: 'in_D', label: 'D', val: 0, fixed: false }
      ],
      gates: [
        { id: 'gate_1', type: 'XOR', in: ['in_A', 'in_B'], out: 'wire_1' },
        { id: 'gate_2', type: 'NAND', in: ['in_C', 'in_D'], out: 'wire_2' },
        { id: 'gate_3', type: 'AND', in: ['wire_1', 'wire_2'], out: 'out_1' }
      ],
      targets: [{ id: 'out_1', label: 'Reactor Core', targetVal: 1 }]
    },
    {
      id: 17, tier: 4, title: 'AI Hypervisor Guard', desc: 'Satisfy dual conflicting constraints to override the rogue AI defense grid.',
      inputs: [
        { id: 'in_A', label: 'Alpha', val: 0, fixed: false },
        { id: 'in_B', label: 'Beta', val: 0, fixed: false },
        { id: 'in_C', label: 'Gamma', val: 0, fixed: false }
      ],
      gates: [
        { id: 'gate_1', type: 'AND', in: ['in_A', 'in_B'], out: 'wire_1' },
        { id: 'gate_2', type: 'OR', in: ['in_B', 'in_C'], out: 'wire_2' },
        { id: 'gate_3', type: 'XOR', in: ['wire_1', 'wire_2'], out: 'out_1' }
      ],
      targets: [{ id: 'out_1', label: 'AI Override', targetVal: 1 }]
    },
    {
      id: 18, tier: 4, title: 'Hyperdrive Warp Gate', desc: 'Configure all 4 warp relays to align Phase A and Phase B simultaneously.',
      inputs: [
        { id: 'in_1', label: 'Relay 1', val: 0, fixed: false },
        { id: 'in_2', label: 'Relay 2', val: 0, fixed: false },
        { id: 'in_3', label: 'Relay 3', val: 0, fixed: false },
        { id: 'in_4', label: 'Relay 4', val: 0, fixed: false }
      ],
      gates: [
        { id: 'gate_a', type: 'NOR', in: ['in_1', 'in_2'], out: 'out_phaseA' },
        { id: 'gate_b', type: 'XNOR', in: ['in_3', 'in_4'], out: 'out_phaseB' }
      ],
      targets: [
        { id: 'out_phaseA', label: 'Phase A Synchronized', targetVal: 1 },
        { id: 'out_phaseB', label: 'Phase B Synchronized', targetVal: 1 }
      ]
    },
    {
      id: 19, tier: 4, title: 'Neural Synapse Network', desc: 'Activate the synthetic neural network by routing through cascading XOR gates.',
      inputs: [
        { id: 'in_A', label: 'Synapse 1', val: 0, fixed: false },
        { id: 'in_B', label: 'Synapse 2', val: 0, fixed: false },
        { id: 'in_C', label: 'Synapse 3', val: 0, fixed: false },
        { id: 'in_D', label: 'Synapse 4', val: 0, fixed: false }
      ],
      gates: [
        { id: 'gate_1', type: 'XOR', in: ['in_A', 'in_B'], out: 'wire_1' },
        { id: 'gate_2', type: 'XOR', in: ['wire_1', 'in_C'], out: 'wire_2' },
        { id: 'gate_3', type: 'XOR', in: ['wire_2', 'in_D'], out: 'out_1' }
      ],
      targets: [{ id: 'out_1', label: 'Neural Core Active', targetVal: 1 }]
    },
    {
      id: 20, tier: 4, title: 'Supercomputer Master Core', desc: 'The Ultimate Master Circuit! Balance 4 inputs to achieve triple output harmony.',
      inputs: [
        { id: 'in_1', label: 'Bus 1', val: 0, fixed: false },
        { id: 'in_2', label: 'Bus 2', val: 0, fixed: false },
        { id: 'in_3', label: 'Bus 3', val: 0, fixed: false },
        { id: 'in_4', label: 'Bus 4', val: 0, fixed: false }
      ],
      gates: [
        { id: 'gate_1', type: 'AND', in: ['in_1', 'in_2'], out: 'out_1' },
        { id: 'gate_2', type: 'XOR', in: ['in_2', 'in_3'], out: 'out_2' },
        { id: 'gate_3', type: 'OR', in: ['in_3', 'in_4'], out: 'out_3' }
      ],
      targets: [
        { id: 'out_1', label: 'Core Processor', targetVal: 1 },
        { id: 'out_2', label: 'Data Bus', targetVal: 1 },
        { id: 'out_3', label: 'Cooling Unit', targetVal: 1 }
      ]
    }
  ]
};

// Truth Table Reference
LOGIC_GATE_DATA.truthTables = {
  AND: [{ a: 0, b: 0, out: 0 }, { a: 0, b: 1, out: 0 }, { a: 1, b: 0, out: 0 }, { a: 1, b: 1, out: 1 }],
  OR:  [{ a: 0, b: 0, out: 0 }, { a: 0, b: 1, out: 1 }, { a: 1, b: 0, out: 1 }, { a: 1, b: 1, out: 1 }],
  NOT: [{ a: 0, out: 1 }, { a: 1, out: 0 }],
  XOR: [{ a: 0, b: 0, out: 0 }, { a: 0, b: 1, out: 1 }, { a: 1, b: 0, out: 1 }, { a: 1, b: 1, out: 0 }],
  NAND:[{ a: 0, b: 0, out: 1 }, { a: 0, b: 1, out: 1 }, { a: 1, b: 0, out: 1 }, { a: 1, b: 1, out: 0 }],
  NOR: [{ a: 0, b: 0, out: 1 }, { a: 0, b: 1, out: 0 }, { a: 1, b: 0, out: 0 }, { a: 1, b: 1, out: 0 }],
  XNOR:[{ a: 0, b: 0, out: 1 }, { a: 0, b: 1, out: 0 }, { a: 1, b: 0, out: 0 }, { a: 1, b: 1, out: 1 }]
};

// Export for Node.js & Browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LOGIC_GATE_DATA };
}
if (typeof window !== 'undefined') {
  window.LOGIC_GATE_DATA = LOGIC_GATE_DATA;
}
