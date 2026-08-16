/**
 * MapRenderer - Duolingo-style Sinuous Biome Path Generator
 * Computes bezier paths connecting nodes with responsive coordinates.
 */

class MapRenderer {
  constructor() {
    this.currentWorldId = 1;
    this.container = document.getElementById('nodes-container');
    this.svg = document.getElementById('path-svg');
    this.canvasWrap = document.getElementById('path-canvas-wrap');
    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.renderWorld(this.currentWorldId);
    });

    const tabs = document.querySelectorAll('.world-tab-btn');
    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        const worldId = parseInt(btn.dataset.world, 10);
        this.selectWorld(worldId);
      });
    });

    const bossBtn = document.getElementById('world-boss-shortcut');
    if (bossBtn) {
      bossBtn.addEventListener('click', () => {
        const world = CURRICULUM_DATA.worlds.find(w => w.id === this.currentWorldId);
        const bossNode = world.nodes.find(n => n.type === 'boss');
        if (bossNode) {
          window.app.startNodeActivity(bossNode);
        }
      });
    }
  }

  selectWorld(worldId) {
    this.currentWorldId = worldId;
    document.querySelectorAll('.world-tab-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.world, 10) === worldId);
    });

    const world = CURRICULUM_DATA.worlds.find(w => w.id === worldId);
    if (world) {
      document.getElementById('world-badge-tag').textContent = world.badge;
      document.getElementById('world-title').textContent = world.name;
      document.getElementById('world-desc').textContent = world.description;
    }

    this.renderWorld(worldId);
  }

  renderWorld(worldId) {
    const world = CURRICULUM_DATA.worlds.find(w => w.id === worldId);
    if (!world) return;

    this.container.innerHTML = '';
    this.svg.innerHTML = '';

    const wrapWidth = this.canvasWrap.clientWidth || 480;
    const wrapHeight = 780;
    this.canvasWrap.style.height = `${wrapHeight}px`;

    const points = [];

    world.nodes.forEach((node, index) => {
      const isCompleted = window.gameState.isNodeCompleted(node.id);
      const isCurrent = !isCompleted && (index === 0 || window.gameState.isNodeCompleted(world.nodes[index - 1]?.id));
      const isLocked = !isCompleted && !isCurrent;
      const stars = window.gameState.getNodeStars(node.id);

      const posX = (node.xPercent / 100) * wrapWidth;
      const posY = (node.yPercent / 100) * wrapHeight;
      points.push({ x: posX, y: posY });

      // Create Node Element
      const nodeEl = document.createElement('div');
      nodeEl.className = `map-node ${node.type}`;
      if (isCompleted) nodeEl.classList.add('unlocked');
      if (isCurrent) nodeEl.classList.add('current');
      if (isLocked) nodeEl.classList.add('locked');

      nodeEl.style.left = `${posX}px`;
      nodeEl.style.top = `${posY}px`;

      // Icon Display
      let icon = node.icon || '⭐';
      if (node.type === 'boss') icon = '👑';
      if (node.type === 'chest') icon = isCompleted ? '📭' : '🎁';

      nodeEl.innerHTML = `
        <div class="node-circle-btn">
          <span class="node-icon-display">${icon}</span>
        </div>
        <div class="node-title-tag">${node.title}</div>
        <div class="node-stars-row">
          <span class="node-star ${stars >= 1 ? 'active' : ''}">⭐</span>
          <span class="node-star ${stars >= 2 ? 'active' : ''}">⭐</span>
          <span class="node-star ${stars >= 3 ? 'active' : ''}">⭐</span>
        </div>
      `;

      nodeEl.addEventListener('click', () => {
        if (isLocked) {
          if (window.soundEngine) window.soundEngine.playWrong();
          if (window.helpers) window.helpers.spawnAuraFloatingText("🔒 Complete previous node first!", posX, posY, false);
          return;
        }
        if (window.soundEngine) window.soundEngine.playTap();
        window.app.startNodeActivity(node);
      });

      this.container.appendChild(nodeEl);
    });

    // Draw Smooth Connecting SVG Path
    if (points.length > 1) {
      let pathD = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const midY = (prev.y + curr.y) / 2;
        pathD += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
      }

      // Background Track Line
      const pathBg = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathBg.setAttribute("d", pathD);
      pathBg.setAttribute("stroke", "rgba(255, 255, 255, 0.15)");
      pathBg.setAttribute("stroke-width", "12");
      pathBg.setAttribute("fill", "none");
      pathBg.setAttribute("stroke-linecap", "round");
      this.svg.appendChild(pathBg);

      // Dash Active Track Line
      const pathLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathLine.setAttribute("d", pathD);
      pathLine.setAttribute("stroke", "#58cc02");
      pathLine.setAttribute("stroke-width", "6");
      pathLine.setAttribute("fill", "none");
      pathLine.setAttribute("stroke-linecap", "round");
      pathLine.setAttribute("stroke-dasharray", "8,8");
      this.svg.appendChild(pathLine);
    }
  }
}

window.MapRenderer = MapRenderer;
