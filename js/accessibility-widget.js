(function() {
    class AccessibilityWidget {
        constructor() {
            this.settings = this.loadSettings();
            this.init();
        }

        init() {
            this.createWidget();
            this.attachEventListeners();
            this.applySettings();
        }

        createWidget() {
            const widget = document.createElement('div');
            widget.className = 'accessibility-widget';
            widget.innerHTML = `
                <button class="accessibility-toggle" aria-label="Otvori postavke pristupačnosti" title="Pristupačnost">♿</button>
                <div class="accessibility-panel" style="display: none;">
                    <div class="accessibility-header">
                        <h2>Pristupačnost</h2>
                        <button class="accessibility-close" aria-label="Zatvori" title="Zatvori">✕</button>
                    </div>
                    <div class="accessibility-content">
                        
                        <!-- Veličina fonta -->
                        <div class="accessibility-section">
                            <h3>👁️ Veličina fonta</h3>
                            <div class="accessibility-item">
                                <div class="slider-container">
                                    <button class="size-btn" id="font-decrease" title="Manji font">−</button>
                                    <input type="range" class="accessibility-slider" id="font-size-slider" min="80" max="200" value="100" step="10">
                                    <span id="font-size-display">100%</span>
                                </div>
                            </div>
                        </div>

                        <!-- Kontrast -->
                        <div class="accessibility-section">
                            <h3>🌓 Kontrast</h3>
                            <div class="accessibility-item">
                                <label>
                                    <input type="checkbox" class="accessibility-checkbox" id="high-contrast" aria-label="Visoki kontrast">
                                    Visoki kontrast
                                </label>
                                <small>Povećava razliku između boja</small>
                            </div>
                        </div>

                        <!-- Animacije -->
                        <div class="accessibility-section">
                            <h3>⏸️ Animacije</h3>
                            <div class="accessibility-item">
                                <label>
                                    <input type="checkbox" class="accessibility-checkbox" id="no-animations" aria-label="Onemogući animacije">
                                    Onemogući animacije
                                </label>
                                <small>Smanjuje smetnje od pokreta</small>
                            </div>
                        </div>

                        <!-- Razmak između redaka -->
                        <div class="accessibility-section">
                            <h3>📏 Razmak između redaka</h3>
                            <div class="accessibility-item">
                                <label>
                                    <input type="checkbox" class="accessibility-checkbox" id="wide-line-spacing" aria-label="Povećani razmak između redaka">
                                    Povećani razmak
                                </label>
                                <small>Olakšava čitanje</small>
                            </div>
                        </div>

                        <!-- Razmak između znakova -->
                        <div class="accessibility-section">
                            <h3>🔤 Razmak između znakova</h3>
                            <div class="accessibility-item">
                                <label>
                                    <input type="checkbox" class="accessibility-checkbox" id="wide-letter-spacing" aria-label="Povećani razmak između znakova">
                                    Povećani razmak
                                </label>
                                <small>Poboljšava čitljivost</small>
                            </div>
                        </div>

                        <!-- Font za disleksiju -->
                        <div class="accessibility-section">
                            <h3>📖 Font za disleksiju</h3>
                            <div class="accessibility-item">
                                <label>
                                    <input type="checkbox" class="accessibility-checkbox" id="dyslexia-font" aria-label="OpenDyslexic font">
                                    OpenDyslexic font
                                </label>
                                <small>Font prilagođen za disleksiju</small>
                            </div>
                        </div>

                        <!-- Desaturacija -->
                        <div class="accessibility-section">
                            <h3>🎨 Boje</h3>
                            <div class="accessibility-item">
                                <label>
                                    <input type="checkbox" class="accessibility-checkbox" id="desaturated" aria-label="Greyscale mode">
                                    Greyscale mode
                                </label>
                                <small>Uklanja sve boje</small>
                            </div>
                        </div>

                        <!-- Podvlačenje linkova -->
                        <div class="accessibility-section">
                            <h3>🔗 Linkovi</h3>
                            <div class="accessibility-item">
                                <label>
                                    <input type="checkbox" class="accessibility-checkbox" id="underline-links" aria-label="Podvuci sve linkove">
                                    Podvuci sve linkove
                                </label>
                                <small>Jasnije označava klikljive elemente</small>
                            </div>
                            <div class="accessibility-item">
                                <label>
                                    <input type="checkbox" class="accessibility-checkbox" id="highlight-links" aria-label="Istakni sve linkove">
                                    Istakni sve linkove
                                </label>
                                <small>Žuto označava sve linkove</small>
                            </div>
                        </div>

                        <!-- Naslovi -->
                        <div class="accessibility-section">
                            <h3>📋 Naslovi</h3>
                            <div class="accessibility-item">
                                <label>
                                    <input type="checkbox" class="accessibility-checkbox" id="highlight-headings" aria-label="Istakni sve naslove">
                                    Istakni sve naslove
                                </label>
                                <small>Žuto označava sve naslove</small>
                            </div>
                        </div>

                        <!-- Fokus -->
                        <div class="accessibility-section">
                            <h3>⭐ Fokus</h3>
                            <div class="accessibility-item">
                                <label>
                                    <input type="checkbox" class="accessibility-checkbox" id="enhanced-focus" aria-label="Pojačani fokus indikator">
                                    Pojačani fokus indikator
                                </label>
                                <small>Teži indikator za fokusirane elemente</small>
                            </div>
                        </div>

                        <!-- Kursor -->
                        <div class="accessibility-section">
                            <h3>🖱️ Kursor</h3>
                            <div class="accessibility-item">
                                <label>
                                    <input type="checkbox" class="accessibility-checkbox" id="large-cursor" aria-label="Veliki kursor">
                                    Veliki kursor
                                </label>
                                <small>Povećava vidljivost kursora</small>
                            </div>
                        </div>

                        <!-- Teme -->
                        <div class="accessibility-section">
                            <h3>🎭 Teme</h3>
                            <div class="theme-buttons">
                                <button class="theme-btn active" data-theme="default" aria-label="Zadana tema">Zadana</button>
                                <button class="theme-btn" data-theme="dark-theme" aria-label="Tamna tema">Tamna</button>
                                <button class="theme-btn" data-theme="blue-theme" aria-label="Plava tema">Plava</button>
                                <button class="theme-btn" data-theme="yellow-theme" aria-label="Žuta tema">Žuta</button>
                            </div>
                        </div>

                        <!-- Reset -->
                        <div class="accessibility-section">
                            <button id="reset-accessibility" style="width: 100%; padding: 0.8rem; background: #0088ff; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                                🔄 Resetiraj sve postavke
                            </button>
                        </div>

                    </div>
                </div>
            `;

            document.body.appendChild(widget);
        }

        attachEventListeners() {
            const toggle = document.querySelector('.accessibility-toggle');
            const closeBtn = document.querySelector('.accessibility-close');
            const panel = document.querySelector('.accessibility-panel');

            // Otvaranje/zatvaranje panela
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const isHidden = panel.style.display === 'none';
                panel.style.display = isHidden ? 'block' : 'none';
            });

            closeBtn.addEventListener('click', () => {
                panel.style.display = 'none';
            });

            // Zatvaranje panela pri kliku vani
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.accessibility-widget')) {
                    panel.style.display = 'none';
                }
            });

            // Veličina fonta
            const fontSlider = document.getElementById('font-size-slider');
            const fontDisplay = document.getElementById('font-size-display');
            const fontDecrease = document.getElementById('font-decrease');

            fontSlider.addEventListener('input', (e) => {
                this.setFontSize(e.target.value);
                fontDisplay.textContent = e.target.value + '%';
            });

            fontDecrease.addEventListener('click', () => {
                let currentValue = parseInt(fontSlider.value);
                if (currentValue > 80) {
                    fontSlider.value = currentValue - 10;
                    fontSlider.dispatchEvent(new Event('input'));
                }
            });

            // Checkboxes za pristupačnost
            const checkboxes = document.querySelectorAll('.accessibility-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', (e) => {
                    this.handleCheckboxChange(e.target.id, e.target.checked);
                });
            });

            // Teme
            const themeButtons = document.querySelectorAll('.theme-btn');
            themeButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    themeButtons.forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    this.setTheme(e.target.dataset.theme);
                });
            });

            // Reset
            document.getElementById('reset-accessibility').addEventListener('click', () => {
                this.resetAllSettings();
            });
        }

        handleCheckboxChange(id, isChecked) {
            const body = document.body;
            
            const classMap = {
                'high-contrast': 'high-contrast',
                'no-animations': 'no-animations',
                'wide-line-spacing': 'wide-line-spacing',
                'wide-letter-spacing': 'wide-letter-spacing',
                'dyslexia-font': 'dyslexia-font',
                'desaturated': 'desaturated',
                'underline-links': 'underline-links',
                'highlight-links': 'highlight-links',
                'highlight-headings': 'highlight-headings',
                'enhanced-focus': 'enhanced-focus',
                'large-cursor': 'large-cursor'
            };

            if (classMap[id]) {
                if (isChecked) {
                    body.classList.add(classMap[id]);
                } else {
                    body.classList.remove(classMap[id]);
                }
            }

            this.settings[id] = isChecked;
            this.saveSettings();
        }

        setFontSize(percent) {
            document.documentElement.style.fontSize = (16 * percent / 100) + 'px';
            this.settings.fontSize = percent;
            this.saveSettings();
        }

        setTheme(theme) {
            // Uklanja sve teme
            document.body.classList.remove('dark-theme', 'blue-theme', 'yellow-theme');
            
            // Dodaj novu temu ako nije zadana
            if (theme !== 'default') {
                document.body.classList.add(theme);
            }

            this.settings.theme = theme;
            this.saveSettings();
        }

        applySettings() {
            // Primijeni veličinu fonta
            if (this.settings.fontSize) {
                this.setFontSize(this.settings.fontSize);
                document.getElementById('font-size-slider').value = this.settings.fontSize;
                document.getElementById('font-size-display').textContent = this.settings.fontSize + '%';
            }

            // Primijeni checkboxes
            const checkboxIds = [
                'high-contrast', 'no-animations', 'wide-line-spacing', 
                'wide-letter-spacing', 'dyslexia-font', 'desaturated',
                'underline-links', 'highlight-links', 'highlight-headings',
                'enhanced-focus', 'large-cursor'
            ];

            checkboxIds.forEach(id => {
                const checkbox = document.getElementById(id);
                if (checkbox && this.settings[id]) {
                    checkbox.checked = true;
                    this.handleCheckboxChange(id, true);
                }
            });

            // Primijeni temu
            if (this.settings.theme && this.settings.theme !== 'default') {
                document.body.classList.add(this.settings.theme);
                const themeBtn = document.querySelector(`[data-theme="${this.settings.theme}"]`);
                if (themeBtn) {
                    document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
                    themeBtn.classList.add('active');
                }
            }
        }

        loadSettings() {
            const saved = localStorage.getItem('a11ySettings');
            return saved ? JSON.parse(saved) : {};
        }

        saveSettings() {
            localStorage.setItem('a11ySettings', JSON.stringify(this.settings));
        }

        resetAllSettings() {
            // Uklanja sve klase
            document.body.classList.remove(
                'high-contrast', 'no-animations', 'wide-line-spacing',
                'wide-letter-spacing', 'dyslexia-font', 'desaturated',
                'underline-links', 'highlight-links', 'highlight-headings',
                'enhanced-focus', 'large-cursor', 'dark-theme', 'blue-theme', 'yellow-theme'
            );

            // Resetira font size
            document.documentElement.style.fontSize = '16px';

            // Resetira sve checkboxe
            document.querySelectorAll('.accessibility-checkbox').forEach(cb => {
                cb.checked = false;
            });

            // Resetira temu
            document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelector('[data-theme="default"]').classList.add('active');

            // Resetira slider
            document.getElementById('font-size-slider').value = '100';
            document.getElementById('font-size-display').textContent = '100%';

            // Obriši od local storage
            this.settings = {};
            this.saveSettings();
        }
    }

    // Inicijalizacija kada se DOM učita
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new AccessibilityWidget();
        });
    } else {
        new AccessibilityWidget();
    }
})();
