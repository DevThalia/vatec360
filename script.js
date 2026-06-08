// Esperamos a que la página esté cargada del todo
document.addEventListener("DOMContentLoaded", function () {
  // Buscamos el formulario en el HTML
  const formulario = document.querySelector(".contacto-form");

  // Cuando alguien envíe el formulario...
  formulario.addEventListener("submit", function (e) {
    // Evitamos que la página se recargue
    e.preventDefault();

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
        <a href="#contacto" class="btn-primary">Enviar otro mensaje</a>
    </div>
`;
      })
      .catch(function () {
        // Si hay algún error, avisamos
        alert("Ha habido un error, inténtalo de nuevo.");
      });
  });
});
