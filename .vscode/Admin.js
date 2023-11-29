// Admin.js

document.addEventListener("DOMContentLoaded", cargarInicio);

function cargarInicio() {
  // Llama a la función para cargar las películas desde la API en la página de inicio (cartelera.html)
  cargarCartelera();
}

function cargarCartelera() {
  const apiKey = 'd12ff3ed24aecda89677ccbd2f8346da';
  const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-Es&page=1`;

  // Llamada a la API de películas populares
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => mostrarPeliculasEnTabla(data.results))
    .catch(error => console.error('Error al obtener datos de la API:', error));
}

function mostrarPeliculasEnTabla(peliculas) {
  const movieTableBody = document.getElementById("movie-table-body");

  peliculas.forEach(pelicula => {
    const newRow = movieTableBody.insertRow();

    // Crear celdas con la información de la película
    const titleCell = newRow.insertCell(0);
    titleCell.textContent = pelicula.title;

    const genreCell = newRow.insertCell(1);
    genreCell.textContent = pelicula.genres ? pelicula.genres.map(genre => genre.name).join(", ") : "Género no disponible";

    const synopsisCell = newRow.insertCell(2);
    synopsisCell.textContent = pelicula.overview || "Sinopsis no disponible";

    const posterCell = newRow.insertCell(3);
    posterCell.innerHTML = pelicula.poster_path
      ? `<img src="https://image.tmdb.org/t/p/w200${pelicula.poster_path}" alt="${pelicula.title}">`
      : "Imagen no disponible";

    // Otras propiedades
    const formatCell = newRow.insertCell(4);
    formatCell.textContent = pelicula.adult ? '3D' : '2D';

    const durationCell = newRow.insertCell(5);
    durationCell.textContent = pelicula.runtime ? `${pelicula.runtime} minutos` : 'Duración no disponible';

    // Agregamos la columna de Valor de la boleta
    const ticketValueCell = newRow.insertCell(6);
    ticketValueCell.textContent = pelicula.vote_average ? `$${pelicula.vote_average * 2}` : 'Valor de boleta no disponible';

    // Eliminamos el botón de detalles y agregamos el evento directamente a la fila
    newRow.addEventListener("click", () => mostrarDetallesPeliculaEnTabla(pelicula));
  });
}

function mostrarDetallesPeliculaEnTabla(pelicula) {
  // Actualiza el contenido del contenedor con los detalles de la película
  const detallesContainer = document.getElementById('movie-details-container');
  detallesContainer.innerHTML = `
    <h1>${pelicula.title}</h1>
    <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${pelicula.title}">
    <p>Género: ${pelicula.genres ? pelicula.genres.map(genre => genre.name).join(', ') : 'Género no disponible'}</p>
    <p>Sinopsis: ${pelicula.overview || 'Sinopsis no disponible'}</p>
    <p>Formato: ${pelicula.adult ? '3D' : '2D'}</p>
    <p>Duración: ${pelicula.runtime ? `${pelicula.runtime} minutos` : 'Duración no disponible'}</p>
    <label for="horarios">Horarios disponibles:</label>
    <select id="horarios">
      <option value="12pm">12pm</option>
      <option value="3pm">3pm</option>
      <option value="6pm">6pm</option>
      <option value="9pm">9pm</option>
    </select>
    <!-- Agregamos la línea de Valor de la boleta -->
    <p>Valor de la boleta: ${pelicula.vote_average ? `$${pelicula.vote_average * 2}` : 'Valor de boleta no disponible'}</p>
    <button onclick="mostrarVistaSillas()">Reservar</button>
    <button onclick="regresarAcartelera()">Regresar a Cartelera</button>
  `;
}

function regresarAcartelera() {
  // Redirigir al usuario a la página de cartelera original
  window.location.href = 'cartelera.html';
}
