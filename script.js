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

  // ================================
  // SELECTOR DE IDIOMA
  // ================================
  const traducciones = {
    es: {
      navServicios: "Servicios",
      navPortfolio: "Portfolio",
      navContacto: "Contacto",
      navCta: "Hablemos →",
      heroTag: "Diseño web · Barcelona",
      heroLinea1: "Diseñamos.",
      heroLinea2: "Creamos.",
      heroLinea3: "Lanzamos.",
      heroSub:
        "Webs que convierten visitas en clientes.<br>Para pequeños comercios con grandes ambiciones.",
      heroBtnMain: "Quiero mi web <span>↗</span>",
      heroBtnGhost: "Ver trabajos",
      serviciosLabel: "Servicios",
      serviciosH2: "¿Qué puedo hacer<br><em>por tu negocio?</em>",
      serviciosP:
        "Me adapto a lo que necesitas,<br>desde una web sencilla hasta tu tienda online.",
      card1H: "Web corporativa",
      card1P:
        "Presencia online profesional para tu negocio desde el primer día.",
      card2H: "Tienda online",
      card2P:
        "Vende tus productos por internet con una tienda fácil de gestionar.",
      card3H: "Diseño a medida",
      card3P: "Diseño único que refleja la personalidad de tu marca.",
      card4H: "Móvil primero",
      card4P:
        "Todas las webs funcionan perfectamente en cualquier dispositivo.",
      stat1: "Webs responsive",
      stat2: "Tiempo de respuesta",
      stat3: "Soporte incluido",
      portfolioLabel: "Portfolio",
      portfolioH2: "Algunos <em>trabajos</em>",
      portfolioP: "Ejemplos de webs creadas para clientes reales.",
      contactoLabel: "Contacto",
      contactoH2: "¿Hablamos?<br><em>Sin compromiso.</em>",
      contactoP:
        "Cuéntame qué necesitas y te preparo un presupuesto personalizado en menos de 24 horas.",
      formNombre: "Nombre",
      formTelefono: "Teléfono",
      formEmail: "Email",
      formServicio: "¿Qué necesitas?",
      formMensaje: "Cuéntame más",
      formBtn: "Enviar mensaje <span>↗</span>",
      footerClaim: "El latido digital de tu negocio",
    },
    en: {
      navServicios: "Services",
      navPortfolio: "Portfolio",
      navContacto: "Contact",
      navCta: "Let's talk →",
      heroTag: "Web design · Around the world",
      heroLinea1: "We design.",
      heroLinea2: "We create.",
      heroLinea3: "We launch.",
      heroSub:
        "Websites that turn visits into clients.<br>For small businesses with big ambitions.",
      heroBtnMain: "I want my website <span>↗</span>",
      heroBtnGhost: "See our work",
      serviciosLabel: "Services",
      serviciosH2: "What can I do<br><em>for your business?</em>",
      serviciosP:
        "I adapt to what you need,<br>from a simple website to your online store.",
      card1H: "Corporate website",
      card1P: "Professional online presence for your business from day one.",
      card2H: "Online store",
      card2P: "Sell your products online with an easy-to-manage store.",
      card3H: "Custom design",
      card3P: "Unique design that reflects your brand's personality.",
      card4H: "Mobile first",
      card4P: "All websites work perfectly on any device.",
      stat1: "Responsive websites",
      stat2: "Response time",
      stat3: "Support included",
      portfolioLabel: "Portfolio",
      portfolioH2: "Some <em>projects</em>",
      portfolioP: "Examples of websites created for real clients.",
      contactoLabel: "Contact",
      contactoH2: "Let's talk?<br><em>No strings attached.</em>",
      contactoP:
        "Tell me what you need and I'll prepare a personalised quote in less than 24 hours.",
      formNombre: "Name",
      formTelefono: "Phone",
      formEmail: "Email",
      formServicio: "What do you need?",
      formMensaje: "Tell me more",
      formBtn: "Send message <span>↗</span>",
      footerClaim: "The digital heartbeat of your business",
    },
    fr: {
      navServicios: "Services",
      navPortfolio: "Portfolio",
      navContacto: "Contact",
      navCta: "Parlons-en →",
      heroTag: "Création web · Barcelone",
      heroLinea1: "On conçoit.",
      heroLinea2: "On crée.",
      heroLinea3: "On lance.",
      heroSub:
        "Des sites qui transforment les visites en clients.<br>Pour les petits commerces avec de grandes ambitions.",
      heroBtnMain: "Je veux mon site <span>↗</span>",
      heroBtnGhost: "Voir nos projets",
      serviciosLabel: "Services",
      serviciosH2: "Que puis-je faire<br><em>pour votre entreprise?</em>",
      serviciosP:
        "Je m'adapte à vos besoins,<br>d'un site simple à votre boutique en ligne.",
      card1H: "Site vitrine",
      card1P:
        "Présence en ligne professionnelle pour votre entreprise dès le premier jour.",
      card2H: "Boutique en ligne",
      card2P:
        "Vendez vos produits sur internet avec une boutique facile à gérer.",
      card3H: "Design sur mesure",
      card3P: "Design unique qui reflète la personnalité de votre marque.",
      card4H: "Mobile d'abord",
      card4P:
        "Tous les sites fonctionnent parfaitement sur tous les appareils.",
      stat1: "Sites responsive",
      stat2: "Temps de réponse",
      stat3: "Support inclus",
      portfolioLabel: "Portfolio",
      portfolioH2: "Quelques <em>projets</em>",
      portfolioP: "Exemples de sites créés pour de vrais clients.",
      contactoLabel: "Contact",
      contactoH2: "On en parle?<br><em>Sans engagement.</em>",
      contactoP:
        "Dites-moi ce dont vous avez besoin et je prépare un devis personnalisé en moins de 24 heures.",
      formNombre: "Nom",
      formTelefono: "Téléphone",
      formEmail: "Email",
      formServicio: "De quoi avez-vous besoin?",
      formMensaje: "Dites-m'en plus",
      formBtn: "Envoyer le message <span>↗</span>",
      footerClaim: "Le battement digital de votre entreprise",
    },
  };

  function aplicarIdioma(lang) {
    const t = traducciones[lang];
    const links = document.querySelectorAll("#nav-links li a:not(.nav-cta)");
    links[0].textContent = t.navServicios;
    links[1].textContent = t.navPortfolio;
    links[2].textContent = t.navContacto;
    document.querySelector(".nav-cta").innerHTML = t.navCta;
    document.querySelector(".hero-tag").innerHTML =
      `<span class="dot"></span> ${t.heroTag}`;
    const lines = document.querySelectorAll(".hero-title .line");
    lines[0].textContent = t.heroLinea1;
    lines[1].textContent = t.heroLinea2;
    lines[2].textContent = t.heroLinea3;
    document.querySelector(".hero-sub").innerHTML = t.heroSub;
    document.querySelector(".btn-main").innerHTML = t.heroBtnMain;
    document.querySelector(".btn-ghost").textContent = t.heroBtnGhost;
    const eyebrows = document.querySelectorAll(
      ".seccion-eyebrow span:last-child",
    );
    eyebrows[0].textContent = t.serviciosLabel;
    eyebrows[1].textContent = t.portfolioLabel;
    eyebrows[2].textContent = t.contactoLabel;
    const headers = document.querySelectorAll(
      ".servicios-header h2, .portfolio-title, .contacto-left h2",
    );
    headers[0].innerHTML = t.serviciosH2;
    headers[1].innerHTML = t.portfolioH2;
    headers[2].innerHTML = t.contactoH2;
    document.querySelector(".servicios-header p").innerHTML = t.serviciosP;
    document.querySelector(".contacto-left p").textContent = t.contactoP;
    const cards = document.querySelectorAll(".servicio-card");
    cards[0].querySelector("h3").textContent = t.card1H;
    cards[0].querySelector("p").textContent = t.card1P;
    cards[1].querySelector("h3").textContent = t.card2H;
    cards[1].querySelector("p").textContent = t.card2P;
    cards[2].querySelector("h3").textContent = t.card3H;
    cards[2].querySelector("p").textContent = t.card3P;
    cards[3].querySelector("h3").textContent = t.card4H;
    cards[3].querySelector("p").textContent = t.card4P;
    const statLabels = document.querySelectorAll(".stat-label");
    statLabels[0].textContent = t.stat1;
    statLabels[1].textContent = t.stat2;
    statLabels[2].textContent = t.stat3;
    const labels = document.querySelectorAll(".form-group label");
    labels[0].textContent = t.formNombre;
    labels[1].textContent = t.formTelefono;
    labels[2].textContent = t.formEmail;
    labels[3].textContent = t.formServicio;
    labels[4].textContent = t.formMensaje;
    document.querySelector(".contacto-right .btn-main").innerHTML = t.formBtn;
    document.querySelector(".footer-claim").textContent = t.footerClaim;
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
    localStorage.setItem("idioma", lang);
  }

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      aplicarIdioma(this.dataset.lang);
    });
  });

  const idiomaGuardado = localStorage.getItem("idioma") || "es";
  if (idiomaGuardado !== "es") aplicarIdioma(idiomaGuardado);
});
