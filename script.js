document.addEventListener("DOMContentLoaded", function () {
  // ================================
  // CURSOR PERSONALIZADO
  // ================================
  const cursor = document.querySelector(".cursor");
  const follower = document.querySelector(".cursor-follower");

  if (cursor && follower) {
    document.addEventListener("mousemove", function (e) {
      cursor.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
      follower.style.transform = `translate(${e.clientX - 18}px, ${e.clientY - 18}px)`;
    });

    document
      .querySelectorAll("a, button, .servicio-card")
      .forEach(function (el) {
        el.addEventListener("mouseenter", function () {
          cursor.style.transform += " scale(1.5)";
          follower.style.width = "56px";
          follower.style.height = "56px";
          follower.style.opacity = "0.3";
        });
        el.addEventListener("mouseleave", function () {
          follower.style.width = "36px";
          follower.style.height = "36px";
          follower.style.opacity = "0.5";
        });
      });
  }

  // ================================
  // NAVBAR SCROLL
  // ================================
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // ================================
  // MENÚ HAMBURGUESA
  // ================================
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");

  menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("abierto");
  });

  navLinks.querySelectorAll("a").forEach(function (enlace) {
    enlace.addEventListener("click", function () {
      navLinks.classList.remove("abierto");
    });
  });

  // ================================
  // FORMULARIO
  // ================================
  const formulario = document.querySelector(".contacto-form");

  if (formulario) {
    formulario.addEventListener("submit", function (e) {
      e.preventDefault();

      let valido = true;

      formulario
        .querySelectorAll(".error")
        .forEach((el) => el.classList.remove("error"));
      formulario
        .querySelectorAll(".mensaje-error")
        .forEach((el) => el.remove());

      function mostrarError(campo, mensaje) {
        campo.classList.add("error");
        const msg = document.createElement("p");
        msg.classList.add("mensaje-error");
        msg.textContent = mensaje;
        campo.parentNode.appendChild(msg);
        valido = false;
      }

      const nombre = formulario.querySelector('input[name="nombre"]');
      if (nombre.value.trim() === "") {
        mostrarError(nombre, "El nombre es obligatorio");
      } else if (nombre.value.trim().length < 3) {
        mostrarError(nombre, "El nombre debe tener al menos 3 caracteres");
      } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre.value.trim())) {
        mostrarError(nombre, "El nombre solo puede contener letras");
      }

      const telefono = formulario.querySelector('input[name="telefono"]');
      if (telefono.value.trim() === "") {
        mostrarError(telefono, "El teléfono es obligatorio");
      } else if (!/^[+\d\s]{9,15}$/.test(telefono.value.trim())) {
        mostrarError(telefono, "Introduce un teléfono válido");
      }

      const email = formulario.querySelector('input[name="email"]');
      if (email.value.trim() === "") {
        mostrarError(email, "El email es obligatorio");
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        mostrarError(email, "Introduce un email válido");
      }

      const textarea = formulario.querySelector("textarea");
      if (textarea.value.trim() === "") {
        mostrarError(textarea, "Cuéntame algo sobre tu negocio");
      } else if (textarea.value.trim().length < 10) {
        mostrarError(textarea, "Escribe al menos 10 caracteres");
      }

      if (!valido) return;

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
              <a href="https://vatec360.netlify.app" class="btn-main">Volver al inicio <span>↗</span></a>
            </div>
          `;
        })
        .catch(function () {
          alert("Ha habido un error, inténtalo de nuevo.");
        });
    });
  }

  // ================================
  // ANIMACIONES SCROLL
  // ================================
  const elementos = document.querySelectorAll(".aparecer");

  const observador = new IntersectionObserver(
    function (entradas) {
      entradas.forEach(function (entrada, i) {
        if (entrada.isIntersecting) {
          setTimeout(function () {
            entrada.target.classList.add("visible");
          }, i * 100);
        }
      });
    },
    { threshold: 0.1 },
  );

  elementos.forEach(function (el) {
    observador.observe(el);
  });
});
