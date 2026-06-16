// Sistema de carrito de compras

class Carrito {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('carrito')) || [];
    }

    agregarProducto(id, nombre, precio) {
        const itemExistente = this.items.find(item => item.id === id);

        if (itemExistente) {
            itemExistente.cantidad += 1;
        } else {
            this.items.push({
                id,
                nombre,
                precio,
                cantidad: 1
            });
        }

        this.guardar();
        this.actualizarUI();
    }

    removerProducto(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.guardar();
        this.actualizarUI();
    }

    modificarCantidad(id, cantidad) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.cantidad = Math.max(1, cantidad);
            if (item.cantidad === 0) {
                this.removerProducto(id);
            } else {
                this.guardar();
                this.actualizarUI();
            }
        }
    }

    limpiar() {
        this.items = [];
        this.guardar();
        this.actualizarUI();
    }

    obtenerTotal() {
        return this.items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    }

    obtenerCantidadTotal() {
        return this.items.reduce((total, item) => total + item.cantidad, 0);
    }

    guardar() {
        localStorage.setItem('carrito', JSON.stringify(this.items));
    }

    actualizarUI() {
        this.actualizarContador();
        this.renderizarCarrito();
    }

    actualizarContador() {
        const contador = document.querySelector('.carrito-contador');
        if (contador) {
            const total = this.obtenerCantidadTotal();
            contador.textContent = total;
            contador.style.display = total > 0 ? 'block' : 'none';
        }
    }

    renderizarCarrito() {
        const carritoContent = document.querySelector('.carrito-contenido');
        if (!carritoContent) return;

        if (this.items.length === 0) {
            carritoContent.innerHTML = `
                <div class="carrito-vacio">
                    <p>🛒 Tu carrito está vacío</p>
                    <a href="./" class="btn-main" style="margin-top: 20px;">Ver productos <span>↗</span></a>
                </div>
            `;
            return;
        }

        let html = '<div class="carrito-items">';

        this.items.forEach(item => {
            html += `
                <div class="carrito-item">
                    <div class="item-info">
                        <h3>${item.nombre}</h3>
                        <p>${item.precio}€ × <input type="number" min="1" value="${item.cantidad}" class="item-cantidad" data-id="${item.id}"></p>
                    </div>
                    <div class="item-total">
                        <p>${(item.precio * item.cantidad).toFixed(2)}€</p>
                        <button class="btn-remover" data-id="${item.id}">✕</button>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        html += `
            <div class="carrito-resumen">
                <div class="resumen-row">
                    <span>Subtotal:</span>
                    <span>${this.obtenerTotal().toFixed(2)}€</span>
                </div>
                <div class="resumen-row">
                    <span>Envío:</span>
                    <span>Gratis</span>
                </div>
                <div class="resumen-row total">
                    <span>Total:</span>
                    <span>${this.obtenerTotal().toFixed(2)}€</span>
                </div>
                <button class="btn-main" style="width: 100%; margin-top: 20px;">Proceder al pago <span>↗</span></button>
                <a href="./" class="btn-ghost" style="width: 100%; margin-top: 10px; text-align: center;">Seguir comprando</a>
            </div>
        `;

        carritoContent.innerHTML = html;

        // Event listeners
        document.querySelectorAll('.item-cantidad').forEach(input => {
            input.addEventListener('change', (e) => {
                const id = e.target.dataset.id;
                this.modificarCantidad(id, parseInt(e.target.value));
            });
        });

        document.querySelectorAll('.btn-remover').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                this.removerProducto(id);
            });
        });
    }
}

// Inicializar carrito global
const carrito = new Carrito();

// Configurar botones de agregar al carrito en la tienda
function initTiendaButtons() {
    const productos = [
        { id: 'consultoria', nombre: 'Consultoría Web Profesional', precio: 199 },
        { id: 'template', nombre: 'Template Web Lista para Usar', precio: 89 },
        { id: 'guia-seo', nombre: 'Guía SEO Básica', precio: 39 }
    ];

    productos.forEach(producto => {
        const btn = document.querySelector(`#btn-${producto.id}`);
        if (btn && btn.getAttribute('href') === '#') {
            btn.textContent = 'Agregar al carrito ';
            btn.innerHTML += '<span>↗</span>';
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                carrito.agregarProducto(producto.id, producto.nombre, producto.precio);
                alert(`${producto.nombre} agregado al carrito`);
            });
        }
    });
}

// Ejecutar cuando DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initTiendaButtons();
        carrito.actualizarContador();
    });
} else {
    initTiendaButtons();
    carrito.actualizarContador();
}
