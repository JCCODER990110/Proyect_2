// JavaScript para sección de películas

class Movie {
    constructor(title, year, director, duration, genre, rate, poster) {
        this.title = title;
        this.year = year;
        this.director = director;
        this.duration = duration;
        this.genre = genre;
        this.rate = rate;
        this.poster = poster;
    }
}

class Repository {
    constructor() {
        this.movies = [];
    }

    loadMovies() {
        return $.get('https://students-api.up.railway.app/movies')
            .done(data => {
                this.movies = data.map(movie => new Movie(
                    movie.title,
                    movie.year,
                    movie.director,
                    movie.duration,
                    movie.genre,
                    movie.rate,
                    movie.poster
                ));
            })
            .fail(error => {
                console.error('Error al cargar las películas:', error);
            });
    }

    getAllMovies() {
        return this.movies;
    }
}

const repository = new Repository();

function init() {
    repository.loadMovies().done(() => {
        transform(repository);
    });
}

init(); // Carga las películas y luego llama a transform

// ------------------------------------------------------------------------------

function transform(repository) {
    const contenedor = document.getElementById('activityContainer');
    contenedor.innerHTML = '';  // Limpiar contenedor

    const moviesList = repository.getAllMovies();
    moviesList.forEach(movie => {
        const movieCard = addMovie(movie);
        contenedor.appendChild(movieCard);
    });
}

function addMovie(movieElement) {
    const {title, year, director, duration, genre, rate, poster } = movieElement;

    const card = document.createElement("div");
    card.classList.add("activity-card");

    // Contenedor interno de volteo
    const flipCardInner = document.createElement("div");
    flipCardInner.classList.add("flip-card-inner");

    // Crear la parte frontal de la tarjeta
    const flipCardFront = document.createElement("div");
    flipCardFront.classList.add("flip-card-front");

    // Crear y agregar imagen
    const img = document.createElement("img");
    img.src = poster;
    img.alt = `${title} Poster`;
    flipCardFront.appendChild(img);

    // Crear y agregar título
    const cardTitle = document.createElement("h3");
    cardTitle.textContent = title;
    flipCardFront.appendChild(cardTitle);

    // Crear la cara posterior de la tarjeta
    const flipCardBack = document.createElement("div");
    flipCardBack.classList.add("flip-card-back");

    // Establecer la imagen de fondo en la parte posterior
    flipCardBack.style.backgroundImage = `url(${poster})`;
    flipCardBack.style.backgroundSize = "cover"; // Asegura que la imagen cubra todo el fondo
    flipCardBack.style.backgroundPosition = "center"; // Centra la imagen en el fondo

    const backTitle = document.createElement("h3");
    backTitle.textContent = title;

    const cardYear = document.createElement("p");
    cardYear.textContent = `Año: ${year}`;

    const cardDirector = document.createElement("p");
    cardDirector.textContent = `Director: ${director}`;

    const cardDuration = document.createElement("p");
    cardDuration.textContent = `Duración: ${duration}`;

    const cardGenre = document.createElement("p");
    cardGenre.textContent = `Género: ${genre}`;

    const cardRate = document.createElement("p");
    cardRate.textContent = `Calificación: ${rate}`;

    // Agregar los elementos a la cara posterior
    flipCardBack.appendChild(backTitle);
    flipCardBack.appendChild(cardYear);
    flipCardBack.appendChild(cardDirector);
    flipCardBack.appendChild(cardDuration);
    flipCardBack.appendChild(cardGenre);
    flipCardBack.appendChild(cardRate);

    // Agregar las caras al contenedor de volteo
    flipCardInner.appendChild(flipCardFront);
    flipCardInner.appendChild(flipCardBack);

    // Agregar el contenedor de volteo a la tarjeta
    card.appendChild(flipCardInner);

    return card;
}