// Esperamos a que la página esté cargada del todo
document.addEventListener("DOMContentLoaded", function () {
  // Buscamos el formulario en el HTML
  const formulario = document.querySelector(".contacto-form");

  // MENÚ HAMBURGUESA
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");

  menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("abierto");
  });

  // Cerrar menú al pulsar un enlace
  navLinks.querySelectorAll("a").forEach(function (enlace) {
    enlace.addEventListener("click", function () {
      navLinks.classList.remove("abierto");
    });
  });

  // Cuando alguien envíe el formulario...
  formulario.addEventListener("submit", function (e) {
    // Evitamos que la página se recargue
    e.preventDefault();

    // VALIDACIÓN
    let valido = true;

    // Limpiar errores anteriores
    formulario
      .querySelectorAll(".error")
      .forEach((el) => el.classList.remove("error"));
    formulario.querySelectorAll(".mensaje-error").forEach((el) => el.remove());

    // Función para mostrar error
    function mostrarError(campo, mensaje) {
      campo.classList.add("error");
      const msg = document.createElement("p");
      msg.classList.add("mensaje-error");
      msg.textContent = mensaje;
      campo.parentNode.appendChild(msg);
      valido = false;
    }

    // Nombre — solo letras y espacios, mínimo 3 caracteres
    const nombre = formulario.querySelector('input[placeholder="Tu nombre"]');
    if (nombre.value.trim() === "") {
      mostrarError(nombre, "El nombre es obligatorio");
    } else if (nombre.value.trim().length < 3) {
      mostrarError(nombre, "El nombre debe tener al menos 3 caracteres");
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre.value.trim())) {
      mostrarError(nombre, "El nombre solo puede contener letras");
    }

    // Teléfono — solo números, mínimo 9 dígitos
    const telefono = formulario.querySelector('input[placeholder="+34 ..."]');
    if (telefono.value.trim() === "") {
      mostrarError(telefono, "El teléfono es obligatorio");
    } else if (!/^[+\d\s]{9,15}$/.test(telefono.value.trim())) {
      mostrarError(telefono, "Introduce un teléfono válido");
    }

    // Email — formato correcto
    const email = formulario.querySelector('input[type="email"]');
    if (email.value.trim() === "") {
      mostrarError(email, "El email es obligatorio");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      mostrarError(email, "Introduce un email válido");
    }

    // Textarea — mínimo 10 caracteres
    const textarea = formulario.querySelector("textarea");
    if (textarea.value.trim() === "") {
      mostrarError(textarea, "Cuéntame algo sobre tu negocio");
    } else if (textarea.value.trim().length < 10) {
      mostrarError(textarea, "Escribe al menos 10 caracteres");
    }

    // Si hay errores, parar aquí
    if (!valido) return;

    // Enviamos los datos a Netlify
    const datos = new FormData(formulario);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(datos).toString(),
    })
      .then(function () {
        formulario.innerHTML = `
                <div class="exito">
                    <div class="exito-icono">✉️</div>
                    <h3>¡Mensaje recibido!</h3>
                    <p>Gracias por contactar con Vatec360.<br>Te respondo en menos de 24 horas.</p>
                    <a href="https://vatec360.netlify.app" class="btn-primary">Volver al inicio</a>
                </div>
            `;
      })
      .catch(function () {
        alert("Ha habido un error, inténtalo de nuevo.");
      });
  });

  // ANIMACIONES AL HACER SCROLL
  const elementos = document.querySelectorAll(
    ".servicio-card, .portfolio-item, .seccion-header",
  );

  const observador = new IntersectionObserver(
    function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 },
  );

  elementos.forEach(function (el) {
    el.classList.add("aparecer");
    observador.observe(el);
  });
});
