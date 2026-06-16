// Sistema de tema oscuro/claro
const html = document.documentElement;
const tema = localStorage.getItem('tema') || 'light';

// Aplicar tema guardado
if (tema === 'dark') {
    html.classList.add('dark-mode');
}

// Crear botón de toggle en el navbar
function initTemaToggle() {
    const navLinks = document.getElementById('nav-links');
    if (!navLinks) return;

    // Crear el item del toggle
    const temaToggleItem = document.createElement('li');
    temaToggleItem.className = 'tema-toggle-item';
    temaToggleItem.innerHTML = `
        <button class="tema-toggle" id="tema-toggle" aria-label="Cambiar tema">
            <span class="tema-icon">☀️</span>
        </button>
    `;

    navLinks.appendChild(temaToggleItem);

    // Agregar listeners
    const toggleBtn = document.getElementById('tema-toggle');
    updateTemaToggleIcon();

    toggleBtn.addEventListener('click', function() {
        if (html.classList.contains('dark-mode')) {
            html.classList.remove('dark-mode');
            localStorage.setItem('tema', 'light');
        } else {
            html.classList.add('dark-mode');
            localStorage.setItem('tema', 'dark');
        }
        updateTemaToggleIcon();
    });
}

function updateTemaToggleIcon() {
    const toggleBtn = document.getElementById('tema-toggle');
    if (!toggleBtn) return;

    const icon = toggleBtn.querySelector('.tema-icon');
    if (html.classList.contains('dark-mode')) {
        icon.textContent = '🌙';
    } else {
        icon.textContent = '☀️';
    }
}

// Ejecutar cuando DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTemaToggle);
} else {
    initTemaToggle();
}
