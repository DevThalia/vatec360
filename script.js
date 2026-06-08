// Esperamos a que la página esté cargada del todo
document.addEventListener("DOMContentLoaded", function () {
  // Buscamos el formulario en el HTML
  const formulario = document.querySelector(".contacto-form");

  // MENÚ HAMBURGUESA
    const menuBtn = document.getElementById('menu-btn')
    const navLinks = document.getElementById('nav-links')

    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('abierto')
    })

    // Cerrar menú al pulsar un enlace
    navLinks.querySelectorAll('a').forEach(function(enlace) {
        enlace.addEventListener('click', function() {
            navLinks.classList.remove('abierto')
        })
    })

  // Cuando alguien envíe el formulario...
  formulario.addEventListener("submit", function (e) {
    // Evitamos que la página se recargue
    e.preventDefault();

    // VALIDACIÓN
        let valido = true

        // Limpiar errores anteriores
        formulario.querySelectorAll('.error').forEach(el => el.classList.remove('error'))
        formulario.querySelectorAll('.mensaje-error').forEach(el => el.remove())

        // Comprobar campos vacíos
        formulario.querySelectorAll('input, textarea, select').forEach(function(campo) {
            if (campo.type === 'hidden') return
            if (campo.value.trim() === '') {
                campo.classList.add('error')
                const msg = document.createElement('p')
                msg.classList.add('mensaje-error')
                msg.textContent = 'Este campo es obligatorio'
                campo.parentNode.appendChild(msg)
                valido = false
            }
        })

        // Comprobar formato email
        const email = formulario.querySelector('input[type="email"]')
        if (email && email.value && !email.value.includes('@')) {
            email.classList.add('error')
            const msg = document.createElement('p')
            msg.classList.add('mensaje-error')
            msg.textContent = 'Introduce un email válido'
            email.parentNode.appendChild(msg)
            valido = false
        }

        // Si hay errores, parar aquí
        if (!valido) return

    // Enviamos los datos a Netlify manualmente
    const datos = new FormData(formulario);
    fetch("/", {
      method: "POST",
      body: datos,
    })
      .then(function () {
        // Si va bien, ocultamos el formulario
        formulario.innerHTML = `
    <div class="exito">
        <div class="exito-icono">✉️</div>
        <h3>¡Mensaje recibido!</h3>
        <p>Gracias por contactar con Vatec360.<br>Te respondo en menos de 24 horas.</p>
        <a href="#" class="btn-primary">Volver al inicio</a>
        <!-- <a href="https://vatec360.netlify.app" class="btn-primary">Volver al inicio</a> -->
    </div>
`;
      })
      .catch(function () {
        // Si hay algún error, avisamos
        alert("Ha habido un error, inténtalo de nuevo.");
      });
  });

  // ANIMACIONES AL HACER SCROLL
    const elementos = document.querySelectorAll('.servicio-card, .portfolio-item, .seccion-header')

    const observador = new IntersectionObserver(function(entradas) {
        entradas.forEach(function(entrada) {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visible')
            }
        })
    }, { threshold: 0.1 })

    elementos.forEach(function(el) {
        el.classList.add('aparecer')
        observador.observe(el)
    })
});
