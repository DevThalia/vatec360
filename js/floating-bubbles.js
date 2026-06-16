// Crear burbujas flotantes de contacto
function initFloatingBubbles() {
    const container = document.createElement('div');
    container.className = 'floating-bubbles';
    container.innerHTML = `
        <a href="https://wa.me/34614454587" target="_blank" class="floating-bubble whatsapp" aria-label="Contactar por WhatsApp" title="WhatsApp">
            <span>💬</span>
        </a>
        <a href="https://instagram.com" target="_blank" class="floating-bubble instagram" aria-label="Seguir en Instagram" title="Instagram">
            <span>📷</span>
        </a>
    `;

    document.body.appendChild(container);
}

// Ejecutar cuando DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFloatingBubbles);
} else {
    initFloatingBubbles();
}
