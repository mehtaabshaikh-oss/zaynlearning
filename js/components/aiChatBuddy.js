/**
 * AIChatBuddy - "Nova" Educational AI Science & Math Companion
 * Exclusive to Zayn's Master Profile (8662) and Parent Admin (6250)
 */

class AIChatBuddy {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.isTyping = false;
    this.init();
  }

  init() {
    this.renderTrigger();
    this.renderChatModal();
    this.bindEvents();
    this.updateVisibility();
  }

  updateVisibility() {
    const trigger = document.getElementById('ai-floating-trigger');
    const modal = document.getElementById('ai-chat-modal');
    const hasAccess = window.cloudAuth && (window.cloudAuth.isMasterZayn() || window.cloudAuth.isParentAdmin());

    if (trigger) {
      trigger.style.display = hasAccess ? 'flex' : 'none';
    }
    if (!hasAccess && modal) {
      modal.classList.add('hidden');
      this.isOpen = false;
    }
  }

  renderTrigger() {
    if (document.getElementById('ai-floating-trigger')) return;

    const btn = document.createElement('div');
    btn.id = 'ai-floating-trigger';
    btn.className = 'ai-floating-trigger';
    btn.innerHTML = `
      <span class="ai-orb-icon">🤖</span>
      <span>ASK NOVA</span>
      <span class="ai-orb-badge"></span>
    `;
    btn.addEventListener('click', () => this.toggleChat());
    document.body.appendChild(btn);
  }

  renderChatModal() {
    if (document.getElementById('ai-chat-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'ai-chat-modal';
    modal.className = 'ai-chat-modal hidden';

    modal.innerHTML = `
      <div class="ai-chat-header">
        <div class="ai-header-profile">
          <div class="ai-avatar-icon">🚀</div>
          <div>
            <div class="ai-header-name">NOVA <span style="font-size:12px; color:#22c55e;">●</span></div>
            <div class="ai-header-tagline">Zayn's Science & Math Co-Pilot</div>
          </div>
        </div>
        <div class="ai-header-actions">
          <button class="ai-header-btn" title="Clear Chat" onclick="window.aiChatBuddy.clearHistory()">🗑️</button>
          <button class="ai-header-btn" title="Close" onclick="window.aiChatBuddy.toggleChat()">✕</button>
        </div>
      </div>

      <div class="ai-chips-bar" id="ai-chips-container">
        <button class="ai-prompt-chip" onclick="window.aiChatBuddy.sendPrompt('Why is space completely silent? 🌌')">🌌 Silent Space?</button>
        <button class="ai-prompt-chip" onclick="window.aiChatBuddy.sendPrompt('Teach me a cool trick for 8× multiplication! ⚡')">⚡ 8× Math Trick</button>
        <button class="ai-prompt-chip" onclick="window.aiChatBuddy.sendPrompt('How do airplanes stay up in the air? ✈️')">✈️ How Planes Fly</button>
        <button class="ai-prompt-chip" onclick="window.aiChatBuddy.sendPrompt('Why did dinosaurs go extinct? 🦖')">🦖 Dino Extinction</button>
        <button class="ai-prompt-chip" onclick="window.aiChatBuddy.sendPrompt('Explain fractions using pizza slices! 🍕')">🍕 Pizza Fractions</button>
      </div>

      <div class="ai-messages-stream" id="ai-messages-stream">
        <!-- Messages rendered here -->
      </div>

      <div class="ai-chat-input-bar">
        <input type="text" id="ai-input-box" class="ai-input-field" placeholder="Ask Nova any science or math question..." autocomplete="off">
        <button id="ai-send-btn" class="ai-send-btn" onclick="window.aiChatBuddy.handleUserSubmit()">➔</button>
      </div>
    `;

    document.body.appendChild(modal);

    // Initial greeting if stream is empty
    if (this.messages.length === 0) {
      this.messages.push({
        role: 'assistant',
        text: `Hey Zayn! 🚀 I'm **Nova**, your science, space & math co-pilot!\n\nAsk me anything you're curious about, or tap one of the ideas above!`
      });
    }
  }

  bindEvents() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const input = document.getElementById('ai-input-box');
        if (input && document.activeElement === input) {
          this.handleUserSubmit();
        }
      }
    });
  }

  toggleChat() {
    const modal = document.getElementById('ai-chat-modal');
    if (!modal) return;

    this.isOpen = !this.isOpen;
    modal.classList.toggle('hidden', !this.isOpen);

    if (this.isOpen) {
      if (window.soundEngine) window.soundEngine.playTap();
      this.renderMessages();
      const input = document.getElementById('ai-input-box');
      if (input) setTimeout(() => input.focus(), 150);
    }
  }

  renderMessages() {
    const stream = document.getElementById('ai-messages-stream');
    if (!stream) return;

    stream.innerHTML = this.messages.map((m, idx) => {
      const isUser = (m.role === 'user');
      const formattedText = this.formatMarkdown(m.text);

      return `
        <div class="ai-msg-row ${isUser ? 'user' : 'bot'}">
          <div class="ai-msg-bubble">
            ${formattedText}
          </div>
          ${!isUser ? `
            <div class="ai-msg-actions">
              <button class="ai-listen-btn" onclick="window.aiChatBuddy.speakText(${idx})">🔊 Listen</button>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    if (this.isTyping) {
      const typingEl = document.createElement('div');
      typingEl.className = 'ai-typing-indicator';
      typingEl.innerHTML = `
        <div class="ai-typing-dot"></div>
        <div class="ai-typing-dot"></div>
        <div class="ai-typing-dot"></div>
      `;
      stream.appendChild(typingEl);
    }

    stream.scrollTop = stream.scrollHeight;
  }

  formatMarkdown(text) {
    if (!text) return '';
    let escaped = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Bold **text**
    escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic *text*
    escaped = escaped.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Newlines to <p> or <br>
    escaped = escaped.split('\n\n').map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');

    return escaped;
  }

  async sendPrompt(text) {
    const input = document.getElementById('ai-input-box');
    if (input) input.value = text;
    this.handleUserSubmit();
  }

  async handleUserSubmit() {
    const input = document.getElementById('ai-input-box');
    const sendBtn = document.getElementById('ai-send-btn');
    if (!input || this.isTyping) return;

    const userText = input.value.trim();
    if (!userText) return;

    input.value = "";
    this.messages.push({ role: 'user', text: userText });
    this.isTyping = true;
    if (sendBtn) sendBtn.disabled = true;

    if (window.soundEngine) window.soundEngine.playTap();
    this.renderMessages();

    try {
      const token = window.cloudAuth ? window.cloudAuth.sessionToken : "";
      const historyPayload = this.messages.slice(-6);

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: userText, history: historyPayload })
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        this.messages.push({ role: 'assistant', text: data.reply });
        if (window.soundEngine) window.soundEngine.playLevelUp();
      } else {
        this.messages.push({
          role: 'assistant',
          text: data.error || "I lost my satellite connection for a second! Could you try asking that again? 🚀"
        });
      }
    } catch (e) {
      this.messages.push({
        role: 'assistant',
        text: "⚡ **Nova Co-Pilot Ready!** To start our live chats, make sure `GEMINI_API_KEY` is added to your Vercel Environment Variables!"
      });
    } finally {
      this.isTyping = false;
      if (sendBtn) sendBtn.disabled = false;
      this.renderMessages();
    }
  }

  speakText(msgIdx) {
    const msg = this.messages[msgIdx];
    if (!msg || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const cleanText = msg.text.replace(/[*_#`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.1; // Friendly slightly higher pitch for kid persona
    window.speechSynthesis.speak(utterance);
  }

  clearHistory() {
    this.messages = [{
      role: 'assistant',
      text: `Chat cleared! Ready for our next science or math mystery, Zayn! 🚀`
    }];
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    this.renderMessages();
  }
}

window.AIChatBuddy = AIChatBuddy;
