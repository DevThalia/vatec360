// Cargar feed de Instagram
async function cargarInstagramFeed() {
    const grid = document.getElementById('instagram-grid');

    try {
        // Intenta conectar con el endpoint de Netlify (configurar después)
        // const response = await fetch('/.netlify/functions/instagram-feed');
        // const data = await response.json();

        // Por ahora, mostrar mensaje de configuración
        mostrarConfiguracion();
    } catch (error) {
        console.error('Error cargando Instagram feed:', error);
        mostrarError();
    }
}

function mostrarConfiguracion() {
    const grid = document.getElementById('instagram-grid');
    grid.innerHTML = `
        <div class="instagram-vacio">
            <p>📷 Instagram Feed</p>
            <p style="font-size: 14px; margin-bottom: 20px;">Para mostrar tus publicaciones de Instagram aquí, necesitamos conectar tu cuenta.</p>
            <p style="font-size: 12px; color: var(--text-secondary);">Información para configurar:</p>
            <ul style="text-align: left; display: inline-block; font-size: 12px; color: var(--text-secondary); line-height: 1.8;">
                <li>✓ Instagram Business Account</li>
                <li>✓ Access Token</li>
                <li>✓ Instagram Business Account ID</li>
            </ul>
            <p style="margin-top: 20px; font-size: 14px;">
                <a href="https://developers.instagram.com/" target="_blank" class="btn-main" style="display: inline-block;">
                    Configurar Instagram API <span>↗</span>
                </a>
            </p>
        </div>
    `;
}

function mostrarError() {
    const grid = document.getElementById('instagram-grid');
    grid.innerHTML = `
        <div class="instagram-vacio">
            <p>Ha habido un error cargando el feed de Instagram.</p>
            <p style="font-size: 12px; margin-top: 12px;">
                <a href="https://instagram.com" target="_blank">Visita nuestro Instagram →</a>
            </p>
        </div>
    `;
}

// Función para renderizar posts (cuando esté conectado)
function renderizarPosts(posts) {
    const grid = document.getElementById('instagram-grid');

    const html = posts.map(post => `
        <a href="${post.permalink}" target="_blank" class="instagram-post aparecer">
            <div class="instagram-post-img">
                ${post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL' ?
                    `<img src="${post.media_url}" alt="${post.caption || 'Post'}" />` :
                    `<video src="${post.media_url}" controls></video>`
                }
            </div>
            <div class="instagram-post-content">
                <p class="instagram-post-caption">${post.caption || ''}</p>
                <div class="instagram-post-meta">
                    <span>❤️ ${post.like_count || 0}</span>
                    <span>💬 ${post.comments_count || 0}</span>
                </div>
            </div>
        </a>
    `).join('');

    grid.innerHTML = html;

    // Animar elementos
    document.querySelectorAll('.aparecer').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 100);
    });
}

// Ejecutar cuando DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cargarInstagramFeed);
} else {
    cargarInstagramFeed();
}
