// Sistema de carrito de compras

class Carrito {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('carrito')) || [];
        this.enPaginaCarrito = !!document.getElementById('carrito-page');
    }

    agregarProducto(id, nombre, precio) {
        const existente = this.items.find(i => i.id === id);
        if (existente) {
            existente.cantidad += 1;
        } else {
            this.items.push({ id, nombre, precio, cantidad: 1 });
        }
        this.guardar();
        this.actualizarUI();
        if (!this.enPaginaCarrito) {
            this.mostrarToast(nombre);
            this.abrirPanel();
        }
    }

    removerProducto(id) {
        this.items = this.items.filter(i => i.id !== id);
        this.guardar();
        this.actualizarUI();
    }

    modificarCantidad(id, cantidad) {
        const item = this.items.find(i => i.id === id);
        if (!item) return;
        if (cantidad <= 0) {
            this.removerProducto(id);
        } else {
            item.cantidad = cantidad;
            this.guardar();
            this.actualizarUI();
        }
    }

    limpiar() {
        this.items = [];
        this.guardar();
        this.actualizarUI();
    }

    obtenerTotal() {
        return this.items.reduce((t, i) => t + i.precio * i.cantidad, 0);
    }

    obtenerCantidadTotal() {
        return this.items.reduce((t, i) => t + i.cantidad, 0);
    }

    guardar() {
        localStorage.setItem('carrito', JSON.stringify(this.items));
    }

    actualizarUI() {
        this.actualizarContador();
        if (this.enPaginaCarrito) {
            this.renderizarPagina();
        } else {
            this.renderizarDrawer();
        }
    }

    actualizarContador() {
        const contador = document.querySelector('.carrito-contador');
        if (!contador) return;
        const total = this.obtenerCantidadTotal();
        contador.textContent = total;
        contador.style.display = total > 0 ? 'flex' : 'none';
    }

    // ——— MODO PÁGINA (carrito.html) ———

    renderizarPagina() {
        const layout = document.getElementById('pedido-layout');
        const vacio = document.getElementById('pedido-vacio');
        const itemsEl = document.getElementById('pedido-items');
        const resumenEl = document.getElementById('pedido-resumen');

        if (!layout || !vacio) return;

        if (this.items.length === 0) {
            layout.style.display = 'none';
            vacio.style.display = 'flex';
            return;
        }

        layout.style.display = 'grid';
        vacio.style.display = 'none';

        if (itemsEl) {
            itemsEl.innerHTML = this.items.map(item => `
                <div class="pedido-item">
                    <div class="pedido-item-info">
                        <div class="pedido-item-color pedido-color-${item.id}"></div>
                        <div>
                            <h3>${item.nombre}</h3>
                            <span class="pedido-item-precio">${item.precio}€ / unidad</span>
                        </div>
                    </div>
                    <div class="pedido-item-qty">
                        <button class="qty-btn" data-id="${item.id}" data-delta="-1">−</button>
                        <span class="qty-val">${item.cantidad}</span>
                        <button class="qty-btn" data-id="${item.id}" data-delta="1">+</button>
                    </div>
                    <div class="pedido-item-total">
                        <span>${(item.precio * item.cantidad).toFixed(2)}€</span>
                        <button class="pedido-item-remover" data-id="${item.id}" aria-label="Eliminar">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `).join('');

            itemsEl.querySelectorAll('.qty-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.dataset.id;
                    const item = this.items.find(i => i.id === id);
                    if (item) this.modificarCantidad(id, item.cantidad + parseInt(btn.dataset.delta));
                });
            });

            itemsEl.querySelectorAll('.pedido-item-remover').forEach(btn => {
                btn.addEventListener('click', () => this.removerProducto(btn.dataset.id));
            });
        }

        if (resumenEl) {
            const total = this.obtenerTotal();
            resumenEl.innerHTML = `
                <div class="resumen-linea">
                    <span>Subtotal (${this.obtenerCantidadTotal()} producto${this.obtenerCantidadTotal() !== 1 ? 's' : ''})</span>
                    <span>${total.toFixed(2)}€</span>
                </div>
                <div class="resumen-linea">
                    <span>Envío digital</span>
                    <span class="resumen-gratis">Gratis</span>
                </div>
                <div class="resumen-linea resumen-total">
                    <span>Total</span>
                    <span>${total.toFixed(2)}€</span>
                </div>
                <button class="btn-main resumen-btn-pago">Proceder al pago <span>↗</span></button>
                <a href="./index.html" class="resumen-link-volver">Seguir comprando</a>
            `;
        }
    }

    // ——— MODO DRAWER (tienda/index.html, otras páginas) ———

    renderizarDrawer() {
        const contenido = document.getElementById('carrito-contenido');
        const resumen = document.getElementById('carrito-resumen');
        if (!contenido) return;

        if (this.items.length === 0) {
            contenido.innerHTML = `
                <div class="carrito-vacio">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                        <line x1="3" y1="6" x2="21" y2="6"/>
                        <path d="M16 10a4 4 0 01-8 0"/>
                    </svg>
                    <p>Carrito vacío</p>
                </div>
            `;
            if (resumen) resumen.innerHTML = '';
            return;
        }

        contenido.innerHTML = `<div class="carrito-items">` +
            this.items.map(item => `
                <div class="carrito-item">
                    <div class="item-info">
                        <h3>${item.nombre}</h3>
                        <p>${item.precio}€ &times;
                            <input type="number" min="1" value="${item.cantidad}" class="item-cantidad" data-id="${item.id}">
                        </p>
                    </div>
                    <div class="item-total">
                        <p>${(item.precio * item.cantidad).toFixed(2)}€</p>
                        <button class="btn-remover" data-id="${item.id}">✕</button>
                    </div>
                </div>
            `).join('') +
        `</div>`;

        contenido.querySelectorAll('.item-cantidad').forEach(input => {
            input.addEventListener('change', e => {
                this.modificarCantidad(e.target.dataset.id, parseInt(e.target.value));
            });
        });
        contenido.querySelectorAll('.btn-remover').forEach(btn => {
            btn.addEventListener('click', () => this.removerProducto(btn.dataset.id));
        });

        if (resumen) {
            resumen.innerHTML = `
                <div class="resumen-row"><span>Subtotal</span><span>${this.obtenerTotal().toFixed(2)}€</span></div>
                <div class="resumen-row"><span>Envío</span><span>Gratis</span></div>
                <div class="resumen-row total"><span>Total</span><span>${this.obtenerTotal().toFixed(2)}€</span></div>
                <a href="carrito.html" class="btn-main btn-pago">Ver pedido <span>↗</span></a>
            `;
        }
    }

    initPanel() {
        if (this.enPaginaCarrito) return; // no drawer en la página de carrito

        const overlay = document.createElement('div');
        overlay.className = 'carrito-overlay';
        overlay.id = 'carrito-overlay';
        overlay.addEventListener('click', () => this.cerrarPanel());
        document.body.appendChild(overlay);

        const drawer = document.createElement('div');
        drawer.className = 'carrito-drawer';
        drawer.id = 'carrito-drawer';
        drawer.innerHTML = `
            <div class="carrito-drawer-header">
                <h3>Carrito</h3>
                <button class="carrito-cerrar" id="carrito-cerrar">✕</button>
            </div>
            <div class="carrito-contenido" id="carrito-contenido"></div>
            <div class="carrito-resumen" id="carrito-resumen"></div>
        `;
        document.body.appendChild(drawer);

        document.getElementById('carrito-cerrar').addEventListener('click', () => this.cerrarPanel());

        const navBtn = document.getElementById('nav-carrito');
        if (navBtn) navBtn.addEventListener('click', () => this.abrirPanel());
    }

    abrirPanel() {
        document.getElementById('carrito-overlay')?.classList.add('activo');
        document.getElementById('carrito-drawer')?.classList.add('activo');
        document.body.style.overflow = 'hidden';
    }

    cerrarPanel() {
        document.getElementById('carrito-overlay')?.classList.remove('activo');
        document.getElementById('carrito-drawer')?.classList.remove('activo');
        document.body.style.overflow = '';
    }

    mostrarToast(nombre) {
        document.querySelector('.carrito-toast')?.remove();
        const toast = document.createElement('div');
        toast.className = 'carrito-toast';
        toast.innerHTML = `
            <div class="toast-check">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <span><strong>${nombre}</strong> añadido</span>
        `;
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('visible'));
        setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => toast.remove(), 350);
        }, 2400);
    }
}

const carrito = new Carrito();

function initTiendaButtons() {
    const productos = [
        { id: 'template',  nombre: 'Template Web Lista para Usar',  precio: 89 },
        { id: 'guia-seo',  nombre: 'Guía SEO Básica',               precio: 39 }
    ];
    productos.forEach(p => {
        const btn = document.querySelector(`#btn-${p.id}`);
        if (btn) {
            btn.addEventListener('click', e => {
                e.preventDefault();
                carrito.agregarProducto(p.id, p.nombre, p.precio);
            });
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        carrito.initPanel();
        carrito.actualizarUI();
        initTiendaButtons();
    });
} else {
    carrito.initPanel();
    carrito.actualizarUI();
    initTiendaButtons();
}
