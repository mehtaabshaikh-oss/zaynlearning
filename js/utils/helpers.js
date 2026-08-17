/**
 * Helpers - Canvas Confetti Particle System, Floating Aura Numbers & Audio Alerts
 */

class Helpers {
  constructor() {
    this.canvas = document.getElementById('effects-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.floatingTexts = [];
    this.animationRunning = false;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  spawnConfetti(count = 60) {
    if (!this.ctx) return;
    const colors = ['#ffd500', '#58cc02', '#38bdf8', '#ff007f', '#a855f7', '#ffffff'];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
        y: window.innerHeight / 2 - 50,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 1) * 12 - 4,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
        life: 1
      });
    }
    if (!this.animationRunning) {
      this.animationRunning = true;
      this.loopEffects();
    }
  }

  spawnAuraFloatingText(text, x, y, isPositive = true) {
    if (!this.ctx) return;
    const clientX = x !== undefined ? x : window.innerWidth / 2;
    const clientY = y !== undefined ? y : window.innerHeight / 2;

    let displayText = text;
    if (!isPositive) {
      const isPractice = window.arcadeHub && window.arcadeHub.isPracticeMode;
      if (!isPractice) {
        if (!displayText.includes('Aura') && !displayText.includes('-')) {
          displayText = `${displayText} (-25 Aura 📉)`;
        }
        // Deduct -25 Aura when wrong answer occurs in ranked mode
        if (window.gameState && window.gameState.deductAura) {
          window.gameState.deductAura(25);
        }
      } else {
        // Practice mode: gentle learning feedback with no penalty
        if (displayText.includes('(-25 Aura 📉)')) {
          displayText = displayText.replace('(-25 Aura 📉)', '(Practice Safe 🛡️)');
        }
      }
    }

    this.floatingTexts.push({
      text: displayText,
      x: clientX,
      y: clientY,
      vy: isPositive ? -2.5 : 1.8,
      opacity: 1,
      color: isPositive ? '#ffd500' : '#f87171',
      fontSize: 24,
      life: 1
    });

    if (!this.animationRunning) {
      this.animationRunning = true;
      this.loopEffects();
    }
  }

  spawnLevelUpCelebration(level) {
    this.spawnConfetti(100);
    this.spawnAuraFloatingText(`🎉 LEVEL UP: LV ${level}!`, window.innerWidth / 2, window.innerHeight / 3, true);
  }

  loopEffects() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update & Draw Confetti Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // Gravity
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.015;

      if (p.opacity <= 0 || p.y > window.innerHeight) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      this.ctx.restore();
    }

    // Update & Draw Floating Texts
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.y += ft.vy;
      ft.opacity -= 0.02;

      if (ft.opacity <= 0) {
        this.floatingTexts.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = ft.opacity;
      this.ctx.font = `bold ${ft.fontSize}px 'Space Grotesk', cursive, sans-serif`;
      this.ctx.fillStyle = ft.color;
      this.ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      this.ctx.shadowBlur = 8;
      this.ctx.textAlign = 'center';
      this.ctx.fillText(ft.text, ft.x, ft.y);
      this.ctx.restore();
    }

    if (this.particles.length > 0 || this.floatingTexts.length > 0) {
      requestAnimationFrame(() => this.loopEffects());
    } else {
      this.animationRunning = false;
    }
  }
}

window.helpers = new Helpers();
