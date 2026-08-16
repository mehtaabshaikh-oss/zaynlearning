/**
 * Interactive Widgets for Hands-On Visual Math
 * Includes Lego Stud Arrays, Minecraft Crafting Grids, Balance Scales & Geometry Blueprints.
 */

class InteractiveWidgets {
  // 1. LEGO STUD ARRAY BUILDER
  static renderLegoArray(container, config = { rows: 6, cols: 7, color: '#e3000b' }) {
    container.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'lego-array-widget';

    const plate = document.createElement('div');
    plate.className = 'lego-brick-plate';
    plate.style.gridTemplateColumns = `repeat(${config.cols}, 36px)`;
    plate.style.background = config.color || '#e3000b';

    let count = 0;
    for (let r = 0; r < config.rows; r++) {
      for (let c = 0; c < config.cols; c++) {
        count++;
        const stud = document.createElement('div');
        stud.className = 'lego-stud';
        stud.dataset.index = count;
        stud.title = `Stud #${count} (Row ${r+1}, Col ${c+1})`;

        stud.addEventListener('mouseenter', () => {
          stud.classList.add('active');
          if (window.soundEngine) window.soundEngine.playTap();
        });

        plate.appendChild(stud);
      }
    }

    const caption = document.createElement('div');
    caption.style.fontFamily = "var(--font-mono)";
    caption.style.fontSize = "16px";
    caption.style.fontWeight = "700";
    caption.style.color = "#ffd500";
    caption.textContent = `${config.rows} rows × ${config.cols} columns = ${config.rows * config.cols} studs`;

    wrapper.appendChild(plate);
    wrapper.appendChild(caption);
    container.appendChild(wrapper);
  }

  // 2. MINECRAFT CRAFTING GRID
  static renderMinecraftCrafting(container, config = { item: 'pickaxe', qty: 5 }) {
    container.innerHTML = '';
    const box = document.createElement('div');
    box.className = 'minecraft-crafting-box';

    const grid = document.createElement('div');
    grid.className = 'minecraft-grid-3x3';

    // 3x3 crafting grid layout for pickaxe:
    // [💎][💎][💎]
    // [  ][🪵][  ]
    // [  ][🪵][  ]
    const slots = [
      '💎', '💎', '💎',
      '',   '🪵', '',
      '',   '🪵', ''
    ];

    slots.forEach((icon) => {
      const slot = document.createElement('div');
      slot.className = 'mc-slot';
      slot.textContent = icon;
      grid.appendChild(slot);
    });

    const arrow = document.createElement('div');
    arrow.className = 'mc-arrow';
    arrow.textContent = '➔';

    const result = document.createElement('div');
    result.className = 'mc-result-slot';
    result.textContent = '⛏️';

    box.appendChild(grid);
    box.appendChild(arrow);
    box.appendChild(result);
    container.appendChild(box);
  }

  // 3. ALGEBRA BALANCE SCALE
  static renderBalanceScale(container, config = { leftMystery: 1, leftWeights: 5, rightWeights: 12 }) {
    container.innerHTML = '';
    const scale = document.createElement('div');
    scale.className = 'balance-scale-widget';

    scale.innerHTML = `
      <div class="scale-beam-container">
        <div class="scale-beam" id="active-beam"></div>
        <div class="scale-fulcrum"></div>
        
        <!-- Left Pan -->
        <div class="scale-pan" id="left-pan">
          <div class="mystery-block" title="Mystery Value [x]">x</div>
          ${Array(config.leftWeights).fill(0).map((_, i) => `<div class="weight-token" title="1 Coin">1</div>`).join('')}
        </div>

        <!-- Right Pan -->
        <div class="scale-pan" id="right-pan">
          ${Array(config.rightWeights).fill(0).map((_, i) => `<div class="weight-token" title="1 Coin">1</div>`).join('')}
        </div>
      </div>
      <div style="font-family: var(--font-mono); font-weight: 700; color: #38bdf8; margin-top: 8px;">
        Equation: x + ${config.leftWeights} = ${config.rightWeights}
      </div>
    `;

    container.appendChild(scale);
  }

  // 4. FRACTION SLICE VISUALIZER
  static renderFractionVisual(container, config = { numerator: 2, denominator: 4 }) {
    container.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.style.display = 'flex';
    wrap.style.flexDirection = 'column';
    wrap.style.alignItems = 'center';
    wrap.style.gap = '14px';

    const bar = document.createElement('div');
    bar.style.display = 'flex';
    bar.style.width = '280px';
    bar.style.height = '50px';
    bar.style.border = '3px solid #38bdf8';
    bar.style.borderRadius = '8px';
    bar.style.overflow = 'hidden';

    for (let i = 0; i < config.denominator; i++) {
      const seg = document.createElement('div');
      seg.style.flex = '1';
      seg.style.borderRight = i < config.denominator - 1 ? '2px solid rgba(255,255,255,0.3)' : 'none';
      seg.style.background = i < config.numerator ? 'linear-gradient(135deg, #58cc02, #46a302)' : 'rgba(255,255,255,0.08)';
      seg.style.display = 'flex';
      seg.style.alignItems = 'center';
      seg.style.justifyContent = 'center';
      seg.style.fontWeight = '700';
      seg.style.fontFamily = 'var(--font-mono)';
      seg.textContent = `1/${config.denominator}`;
      bar.appendChild(seg);
    }

    const caption = document.createElement('div');
    caption.style.fontFamily = 'var(--font-mono)';
    caption.style.color = '#a3e635';
    caption.style.fontWeight = '700';
    caption.textContent = `Shaded: ${config.numerator}/${config.denominator} = 1/2`;

    wrap.appendChild(bar);
    wrap.appendChild(caption);
    container.appendChild(wrap);
  }

  // 5. GEOMETRY RECTANGLE BLUEPRINT
  static renderGeometryRect(container, config = { width: 6, height: 4 }) {
    container.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.style.display = 'flex';
    wrap.style.flexDirection = 'column';
    wrap.style.alignItems = 'center';
    wrap.style.gap = '12px';

    wrap.innerHTML = `
      <div style="width: 220px; height: 140px; border: 4px dashed #5b8731; background: rgba(91, 135, 49, 0.25); border-radius: 8px; position: relative; display: flex; align-items: center; justify-content: center;">
        <span style="font-family: var(--font-mono); font-weight: 800; color: #a3e635; font-size: 18px;">Area = 6 × 4 = 24</span>
        <span style="position: absolute; top: -24px; font-family: var(--font-mono); font-size: 13px; color: #fcd34d;">Length = 6 blocks</span>
        <span style="position: absolute; right: -70px; font-family: var(--font-mono); font-size: 13px; color: #fcd34d;">Width = 4 blocks</span>
      </div>
      <div style="font-family: var(--font-mono); color: #94a3b8; font-size: 14px; margin-top: 10px;">
        Perimeter = 6 + 4 + 6 + 4 = <strong>20 blocks of fence</strong>
      </div>
    `;

    container.appendChild(wrap);
  }
}

window.InteractiveWidgets = InteractiveWidgets;
