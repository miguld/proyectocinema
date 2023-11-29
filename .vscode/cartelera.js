document.addEventListener('DOMContentLoaded', cargarInicio);

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
    .then(data => mostrarPeliculas(data.results))
    .catch(error => console.error('Error al obtener datos de la API:', error));
}

function mostrarPeliculas(peliculas) {
  const peliculasContainer = document.getElementById('peliculas-container');

  peliculas.forEach(pelicula => {
    const peliculaDiv = document.createElement('div');
    peliculaDiv.classList.add('pelicula');
    peliculaDiv.setAttribute('id', `pelicula-${pelicula.id}`); // Agregar un ID único

    peliculaDiv.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${pelicula.title}">
      <h2>${pelicula.title}</h2>
    `;

    peliculaDiv.addEventListener('click', () => cargarDetallesPelicula(pelicula.id)); // Agregar evento de clic

    peliculasContainer.appendChild(peliculaDiv);
  });
}

function cargarDetallesPelicula(peliculaId) {
  const apiUrl = `https://api.themoviedb.org/3/movie/${peliculaId}?api_key=d12ff3ed24aecda89677ccbd2f8346da&language=es-Es`;

  // Llamada a la API para obtener detalles de la película
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => mostrarDetallesPelicula(data))
    .catch(error => console.error('Error al obtener detalles de la película:', error));
}

function mostrarDetallesPelicula(pelicula) {
  // Actualiza el contenido del contenedor con los detalles de la película
  const detallesContainer = document.getElementById('cartelera-container');
  detallesContainer.innerHTML = `
    <h1>${pelicula.title}</h1>
    <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${pelicula.title}">
    <p>Género: ${pelicula.genres.map(genre => genre.name).join(', ')}</p>
    <p>Sinopsis: ${pelicula.overview}</p>
    <p>Formato: ${pelicula.adult ? '3D' : '2D'}</p>
    <p>Duración: ${pelicula.runtime} minutos</p>
    <label for="horarios">Horarios disponibles:</label>
    <select id="horarios">
      <option value="12pm">12pm</option>
      <option value="3pm">3pm</option>
      <option value="6pm">6pm</option>
      <option value="9pm">9pm</option>
    </select>
    <p>Valor de la boleta: $10</p>
    <button onclick="mostrarVistaSillas()">Reservar</button>
    <button onclick="regresarAcartelera()">Regresar a Cartelera</button>
  `;
}

function regresarAcartelera() {
    // Redirigir al usuario a la página de cartelera original
    window.location.href = 'cartelera.html';
}

