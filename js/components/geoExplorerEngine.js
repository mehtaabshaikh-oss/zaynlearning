/**
 * Geo-Explorer Engine: Worldle (Country Silhouette & Compass) & Flagle (Flag Mosaic)
 * Features Haversine Distance, Compass Bearing, 6-Guess History, and Educational Fact Cards
 */

class GeoExplorerEngine {
  constructor(customData) {
    if (customData) {
      this.data = customData;
    } else if (typeof window !== 'undefined' && window.GEO_EXPLORER_DATA) {
      this.data = window.GEO_EXPLORER_DATA;
    } else if (typeof GEO_EXPLORER_DATA !== 'undefined') {
      this.data = GEO_EXPLORER_DATA;
    } else {
      try {
        this.data = require('../data/geoExplorerData.js').GEO_EXPLORER_DATA;
      } catch (e) {
        this.data = null;
      }
    }

    this.mode = 'worldle'; // 'worldle' or 'flagle'
    this.targetCountry = null;
    this.guesses = [];
    this.maxGuesses = 6;
    this.isGameOver = false;
    this.isWon = false;
    this.audioCtx = null;

    if (typeof document !== 'undefined') {
      this.initDOM();
    }
  }

  initDOM() {
    this.modeWorldleBtn = document.getElementById('geo-mode-worldle-btn');
    this.modeFlagleBtn = document.getElementById('geo-mode-flagle-btn');
    this.silhouetteSvg = document.getElementById('geo-silhouette-svg');
    this.flagMosaicGrid = document.getElementById('geo-flag-mosaic');
    this.flagEmojiLarge = document.getElementById('geo-flag-emoji-large');
    this.searchInput = document.getElementById('geo-country-search');
    this.searchDropdown = document.getElementById('geo-search-dropdown');
    this.submitBtn = document.getElementById('geo-submit-btn');
    this.guessesContainer = document.getElementById('geo-guesses-list');
    this.attemptsCounter = document.getElementById('geo-attempts-counter');
    this.exitBtn = document.getElementById('exit-geo-btn');
    this.restartBtn = document.getElementById('geo-restart-btn');

    // Victory/Defeat Modal Elements
    this.modal = document.getElementById('geo-result-modal');
    this.modalIcon = document.getElementById('geo-modal-icon');
    this.modalTitle = document.getElementById('geo-modal-title');
    this.modalCountry = document.getElementById('geo-modal-country');
    this.modalCapital = document.getElementById('geo-modal-capital');
    this.modalContinent = document.getElementById('geo-modal-continent');
    this.modalPop = document.getElementById('geo-modal-pop');
    this.modalFact = document.getElementById('geo-modal-fact');
    this.modalNextBtn = document.getElementById('geo-modal-next-btn');

    this.bindEvents();
    this.startNewGame();
  }

  bindEvents() {
    if (this.exitBtn) {
      this.exitBtn.addEventListener('click', () => {
        if (window.app) window.app.showView('view-arcade-hub');
      });
    }

    if (this.restartBtn) {
      this.restartBtn.addEventListener('click', () => this.startNewGame());
    }

    if (this.modeWorldleBtn) {
      this.modeWorldleBtn.addEventListener('click', () => this.switchMode('worldle'));
    }

    if (this.modeFlagleBtn) {
      this.modeFlagleBtn.addEventListener('click', () => this.switchMode('flagle'));
    }

    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => this.handleSearchInput(e.target.value));
      this.searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const firstOpt = this.searchDropdown ? this.searchDropdown.querySelector('.geo-search-option') : null;
          if (firstOpt) {
            this.selectCountry(firstOpt.dataset.countryId);
          }
        }
      });
    }

    if (this.modalNextBtn) {
      this.modalNextBtn.addEventListener('click', () => {
        if (this.modal) this.modal.classList.add('hidden');
        this.startNewGame();
      });
    }

    // Close dropdown on outside click
    if (typeof document !== 'undefined') {
      document.addEventListener('click', (e) => {
        if (this.searchDropdown && e.target !== this.searchInput && !this.searchDropdown.contains(e.target)) {
          this.searchDropdown.classList.add('hidden');
        }
      });
    }
  }

  switchMode(newMode) {
    this.mode = newMode;
    if (this.modeWorldleBtn && this.modeFlagleBtn) {
      this.modeWorldleBtn.classList.toggle('active', newMode === 'worldle');
      this.modeFlagleBtn.classList.toggle('active', newMode === 'flagle');
    }
    this.startNewGame();
  }

  startNewGame() {
    if (!this.data || !this.data.countries || this.data.countries.length === 0) return;

    // Pick random target country
    const list = this.data.countries;
    this.targetCountry = list[Math.floor(Math.random() * list.length)];
    this.guesses = [];
    this.isGameOver = false;
    this.isWon = false;

    if (this.searchInput) {
      this.searchInput.value = '';
      this.searchInput.disabled = false;
    }
    if (this.searchDropdown) {
      this.searchDropdown.classList.add('hidden');
    }
    if (this.modal) {
      this.modal.classList.add('hidden');
    }

    this.renderStage();
    this.renderGuesses();
    this.updateAttempts();
  }

  renderStage() {
    if (!this.targetCountry) return;

    if (this.mode === 'worldle') {
      // Show Silhouette, Hide Flag Mosaic
      if (this.silhouetteSvg) {
        this.silhouetteSvg.classList.remove('hidden');

        // Dynamic glow color based on closest guess
        let glowColor = 'rgba(56, 189, 248, 0.7)';
        let fillColor = '#38bdf8';
        if (this.guesses.length > 0) {
          const closest = Math.min(...this.guesses.map(g => g.distance));
          if (closest === 0) {
            glowColor = 'rgba(16, 185, 129, 0.9)';
            fillColor = '#34d399';
          } else if (closest < 2500) {
            glowColor = 'rgba(234, 179, 8, 0.8)';
            fillColor = '#facc15';
          }
        }

        let clueText = '';
        if (this.guesses.length >= 2) {
          clueText = `🌐 Continent: ${this.targetCountry.continent}`;
        }
        if (this.guesses.length >= 4) {
          clueText += ` • 🏛️ Capital starts with "${this.targetCountry.capital.slice(0, 1)}..."`;
        }

        this.silhouetteSvg.innerHTML = `
          <path d="${this.targetCountry.path}" fill="${fillColor}" filter="drop-shadow(0 0 16px ${glowColor})" />
          ${clueText ? `<text x="50" y="96" text-anchor="middle" fill="#94a3b8" font-size="3.8" font-weight="700">${clueText}</text>` : ''}
        `;
      }
      if (this.flagMosaicGrid) {
        this.flagMosaicGrid.classList.add('hidden');
      }
    } else {
      // Flagle Mode: Show 6-tile mosaic overlay
      if (this.silhouetteSvg) {
        this.silhouetteSvg.classList.add('hidden');
      }
      if (this.flagMosaicGrid) {
        this.flagMosaicGrid.classList.remove('hidden');
        this.renderFlagMosaic();
      }
    }
  }

  renderFlagMosaic() {
    if (!this.flagMosaicGrid || !this.targetCountry) return;

    const revealedTilesCount = Math.min(6, this.isWon ? 6 : this.guesses.length + 1);
    this.flagMosaicGrid.innerHTML = `
      <div class="geo-flag-backdrop">${this.targetCountry.flag}</div>
      <div class="geo-mosaic-tiles-overlay">
        ${[0, 1, 2, 3, 4, 5].map(idx => `
          <div class="geo-mosaic-tile ${idx < revealedTilesCount ? 'revealed' : 'covered'}">
            ${idx >= revealedTilesCount ? '❓' : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  handleSearchInput(query) {
    if (!this.searchDropdown || !this.data) return;
    const q = query.trim().toLowerCase();

    if (!q) {
      this.searchDropdown.classList.add('hidden');
      return;
    }

    const alreadyGuessed = new Set(this.guesses.map(g => g.country.id));
    const matches = this.data.countries.filter(c => {
      if (alreadyGuessed.has(c.id)) return false;
      return c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.capital.toLowerCase().includes(q);
    }).slice(0, 6);

    if (matches.length === 0) {
      this.searchDropdown.innerHTML = `<div class="geo-dropdown-empty">No matching countries</div>`;
      this.searchDropdown.classList.remove('hidden');
      return;
    }

    this.searchDropdown.innerHTML = matches.map(c => `
      <div class="geo-search-option" data-country-id="${c.id}">
        <span class="geo-opt-flag">${c.flag}</span>
        <span class="geo-opt-name">${c.name}</span>
        <span class="geo-opt-cont">${c.continent}</span>
      </div>
    `).join('');

    this.searchDropdown.querySelectorAll('.geo-search-option').forEach(opt => {
      opt.addEventListener('click', () => {
        this.selectCountry(opt.dataset.countryId);
      });
    });

    this.searchDropdown.classList.remove('hidden');
  }

  selectCountry(countryId) {
    const country = this.data.countryLookup[countryId.toUpperCase()];
    if (!country || this.isGameOver) return;

    if (this.searchInput) this.searchInput.value = '';
    if (this.searchDropdown) this.searchDropdown.classList.add('hidden');

    this.makeGuess(country);
  }

  makeGuess(guessCountry) {
    if (this.isGameOver) return;

    const dist = this.data.calculateDistance(guessCountry.lat, guessCountry.lon, this.targetCountry.lat, this.targetCountry.lon);
    const bearing = this.data.calculateBearing(guessCountry.lat, guessCountry.lon, this.targetCountry.lat, this.targetCountry.lon);
    const proximity = this.data.calculateProximity(dist);
    const isCorrect = (guessCountry.id === this.targetCountry.id);

    const guessRecord = {
      country: guessCountry,
      distance: dist,
      bearing: isCorrect ? { label: 'Exact', emoji: '🎯' } : bearing,
      proximity: isCorrect ? 100 : proximity,
      isCorrect
    };

    this.guesses.push(guessRecord);
    this.renderGuesses();
    this.updateAttempts();

    if (this.mode === 'flagle') {
      this.renderFlagMosaic();
    }

    if (isCorrect) {
      this.isGameOver = true;
      this.isWon = true;
      this.playTone(784, 'triangle', 0.25);
      if (typeof window !== 'undefined' && window.gameState) {
        window.gameState.addXP(60);
        window.gameState.addAura(30);
        window.gameState.addGems(1);
      }
      setTimeout(() => this.showResultModal(true), 600);
    } else if (this.guesses.length >= this.maxGuesses) {
      this.isGameOver = true;
      this.isWon = false;
      this.playTone(220, 'sawtooth', 0.2);
      setTimeout(() => this.showResultModal(false), 600);
    } else {
      this.playTone(440, 'sine', 0.08);
    }
  }

  renderGuesses() {
    if (!this.guessesContainer) return;

    this.guessesContainer.innerHTML = '';
    for (let i = 0; i < this.maxGuesses; i++) {
      const g = this.guesses[i];
      const row = document.createElement('div');
      row.className = `geo-guess-row ${g ? (g.isCorrect ? 'correct' : 'guessed') : 'empty'}`;

      if (g) {
        row.innerHTML = `
          <div class="geo-guess-country">
            <span class="guess-flag">${g.country.flag}</span>
            <span class="guess-name">${g.country.name}</span>
          </div>
          <div class="geo-guess-dist">${g.isCorrect ? '0 km' : `${g.distance.toLocaleString()} km`}</div>
          <div class="geo-guess-bearing">${g.bearing.emoji}</div>
          <div class="geo-guess-prox-wrap">
            <div class="geo-guess-prox-bar" style="width: ${g.proximity}%;"></div>
            <span class="geo-guess-prox-text">${g.proximity}%</span>
          </div>
        `;
      } else {
        row.innerHTML = `
          <div class="geo-guess-placeholder">Guess ${i + 1}</div>
        `;
      }
      this.guessesContainer.appendChild(row);
    }
  }

  updateAttempts() {
    if (this.attemptsCounter) {
      this.attemptsCounter.textContent = `Attempt ${this.guesses.length} / ${this.maxGuesses}`;
    }
  }

  showResultModal(won) {
    if (!this.modal || !this.targetCountry) return;

    if (this.modalIcon) this.modalIcon.textContent = won ? '🎉🌍✨' : '🧭🗺️';
    if (this.modalTitle) {
      this.modalTitle.textContent = won ? 'TERRITORY DISCOVERED!' : 'EXPEDITION COMPLETE!';
      this.modalTitle.style.color = won ? '#10b981' : '#ef4444';
    }
    if (this.modalCountry) this.modalCountry.textContent = `${this.targetCountry.flag} ${this.targetCountry.name}`;
    if (this.modalCapital) this.modalCapital.textContent = `🏛️ Capital: ${this.targetCountry.capital}`;
    if (this.modalContinent) this.modalContinent.textContent = `🌐 Continent: ${this.targetCountry.continent}`;
    if (this.modalPop) this.modalPop.textContent = `👥 Population: ${this.targetCountry.population} • Currency: ${this.targetCountry.currency}`;
    if (this.modalFact) this.modalFact.textContent = `💡 Fact: ${this.targetCountry.fact}`;

    this.modal.classList.remove('hidden');
  }

  // Audio helper
  getAudioContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) this.audioCtx = new AudioContext();
    }
    return this.audioCtx;
  }

  playTone(freq, type = 'sine', duration = 0.1) {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  }
}

// Export for Node.js unit tests & Browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GeoExplorerEngine };
}
if (typeof window !== 'undefined') {
  window.GeoExplorerEngine = GeoExplorerEngine;
}
