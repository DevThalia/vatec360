async function cargarArticulos() {
  try {
    const response = await fetch("/.netlify/functions/notion-blog");
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      mostrarVacio();
      return;
    }

    renderArticulos(data.results);
  } catch (error) {
    console.error("Error cargando artículos:", error);
    mostrarError();
  }
}

function renderArticulos(articulos) {
  const grid = document.getElementById("blog-grid");

  const html = articulos
    .map((articulo) => {
      const props = articulo.properties;
      const titulo = props.Nombre?.title[0]?.plain_text || "Sin título";
      const extracto = props.Extracto?.rich_text[0]?.plain_text || "";
      const categoria = props.Categoría?.select?.name || "General";
      const emoji = props.Emogi?.rich_text[0]?.plain_text || "📝";
      const slug = props.Slug?.rich_text[0]?.plain_text || articulo.id;
      const fecha = props.Fecha?.date?.start
        ? new Date(props.Fecha.date.start).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : "";

      return `
        <a href="articulo.html?slug=${slug}&id=${articulo.id}" class="blog-card aparecer">
          <div class="blog-card-img">${emoji}</div>
          <div class="blog-card-body">
            <span class="blog-card-tag">${categoria}</span>
            <h2 class="blog-card-title">${titulo}</h2>
            <p class="blog-card-excerpt">${extracto}</p>
            <div class="blog-card-meta">
              <span>${fecha}</span>
              <span>Leer más →</span>
            </div>
          </div>
        </a>
      `;
    })
    .join("");

  grid.innerHTML = html;

  document.querySelectorAll(".aparecer").forEach((el) => {
    setTimeout(() => el.classList.add("visible"), 100);
  });
}

function mostrarVacio() {
  document.getElementById("blog-grid").innerHTML = `
    <div class="blog-loading">
      <p style="font-size:48px">✍️</p>
      <p>Próximamente artículos nuevos...</p>
    </div>
  `;
}

function mostrarError() {
  document.getElementById("blog-grid").innerHTML = `
    <div class="blog-loading">
      <p>Ha habido un error cargando los artículos.</p>
    </div>
  `;
}

cargarArticulos();
