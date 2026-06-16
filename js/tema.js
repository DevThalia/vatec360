// Sistema de tema oscuro/claro
const html = document.documentElement;
const temaGuardado = localStorage.getItem('tema') || 'light';

if (temaGuardado === 'dark') {
    html.classList.add('dark-mode');
}

function initTemaToggle() {
    const navLinks = document.getElementById('nav-links');
    if (!navLinks) return;

    const li = document.createElement('li');
    li.className = 'tema-toggle-item';
    li.innerHTML = `
        <label class="tema-switch" aria-label="Cambiar tema oscuro/claro">
            <input type="checkbox" class="tema-check" id="tema-check" ${html.classList.contains('dark-mode') ? 'checked' : ''}>
            <div class="tema-track">
                <span class="tema-track-icon tema-track-sun">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                        <circle cx="12" cy="12" r="4"/>
                        <line x1="12" y1="2" x2="12" y2="5"/>
                        <line x1="12" y1="19" x2="12" y2="22"/>
                        <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/>
                        <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
                        <line x1="2" y1="12" x2="5" y2="12"/>
                        <line x1="19" y1="12" x2="22" y2="12"/>
                        <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
                        <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
                    </svg>
                </span>
                <div class="tema-thumb"></div>
                <span class="tema-track-icon tema-track-moon">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                    </svg>
                </span>
            </div>
        </label>
    `;
    navLinks.appendChild(li);

    document.getElementById('tema-check').addEventListener('change', function() {
        if (this.checked) {
            html.classList.add('dark-mode');
            localStorage.setItem('tema', 'dark');
        } else {
            html.classList.remove('dark-mode');
            localStorage.setItem('tema', 'light');
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTemaToggle);
} else {
    initTemaToggle();
}
