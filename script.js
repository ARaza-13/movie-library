class Movie {
    constructor(title, year, runtime, rating, poster) {
        this.title = title;
        this.year = year;
        this.runtime = runtime;
        this.rating = rating;
        this.poster = poster;
    }

    updateMovie(title, year, runtime, rating, poster) {
        this.title = title;
        this.year = year;
        this.runtime = runtime;
        this.rating = rating;
        this.poster = poster;
    }
}

class Library {
    constructor() {
        this.movies = [];
    }

    addMovie(newMovie) {
        this.movies.push(newMovie);
    }

    removeMovie(film) {
        this.movies = this.movies.filter((movie) => movie != film);
    }

    renderMovies() {
        const movieList = document.getElementById('movie-list');
        movieList.innerHTML = '';

        for (let movie of this.movies) {
            const movieCard = createMovieCard(movie);
            movieList.appendChild(movieCard); 
        } 
    }
}

const library = new Library();

// display the newly added movie object into the screen
const createMovieCard = (movie) =>  {
    const movieCard = document.createElement('div');
    movieCard.classList.add('card');

    const poster = document.createElement('img');
    poster.classList.add('poster');
    poster.src = checkPoster(movie.poster);
    poster.alt = "poster";

    const movieInfo = document.createElement('div');
    movieInfo.classList.add('info');

    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = `${movie.title}`;

    const year = document.createElement('div');
    year.classList.add('year');
    year.textContent = `${movie.year}`;

    const runtime = document.createElement('div');
    runtime.classList.add('runtime');
    runtime.textContent = `${movie.runtime} mins`;

    const rating = document.createElement('div');
    rating.classList.add('rating');
    getRating(rating, movie);

    movieInfo.appendChild(title);
    movieInfo.appendChild(year);
    movieInfo.appendChild(runtime);
    movieInfo.appendChild(rating);

    movieCard.appendChild(poster);
    movieCard.appendChild(movieInfo);

    const removeBtn = createRemoveBtn(movie);
    movieCard.appendChild(removeBtn);

    const editBtn = createEditButton(movie);
    movieCard.appendChild(editBtn);

    return movieCard;
}

// display stars for the rating input
const getRating = (rating, movie) => {
    for (let i = 0; i < Math.floor(movie.rating); i++) {
        const star = document.createElement('img');
        star.src = "images/star.svg"
        rating.appendChild(star);
    }
 
     if (movie.rating % 1 !== 0) {
        const halfStar = document.createElement('img');
        halfStar.src = "images/star-half.svg"
        rating.appendChild(halfStar);
    }
}

// validate if the URL movie image being added is a valid image URL 
const checkPoster = (poster) => {
    const validImg = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(poster);
    if (validImg) {
        return poster;
    } else {
        return "images/placeholder.jpg";
    }
}

const createRemoveBtn = (movie) => {
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove');
    removeBtn.classList.add('img-btn');
    removeBtn.onclick = () => removeMovie(movie);

    const removeImg = document.createElement('img');
    removeImg.src = "images/close-thick.svg";
    removeImg.alt = "close";

    removeBtn.appendChild(removeImg);
    return removeBtn;
}

const createEditButton = (movie) => {
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.classList.add('img-btn');
    editBtn.onclick = () => openEditMovieModal(movie);

    const editImg = document.createElement('img');
    editImg.src = "images/movie-edit-outline.svg";
    editImg.alt = "edit";

    editBtn.appendChild(editImg);
    return editBtn;
}

const overlay = document.getElementById('overlay');
const addMovieForm = document.getElementById('add-movie-form');
const addMovieModal = document.getElementById('add-movie-modal');
const editMovieForm = document.getElementById('edit-movie-form');
const editMovieModal = document.getElementById('edit-movie-modal');
const addMovieBtn = document.getElementById('add-movie-btn');
const closeBtn = document.querySelectorAll('.cancel');
const addMaxYear = document.getElementById('add-year');
const editMaxYear = document.getElementById('edit-year');

const openAddMovieModal = () => {
    addMovieForm.reset();
    addMovieModal.classList.add('active');
    overlay.classList.add('active');
}

const openEditMovieModal = (movie) => {
    editMovieModal.classList.add('active');
    overlay.classList.add('active');

    // populate the edit form with movie info
    const editInputs = getEditInputFields();
    editInputs.titleInput.value = movie.title;
    editInputs.yearInput.value = movie.year;
    editInputs.runtimeInput.value = movie.runtime;
    editInputs.ratingInput.value = movie.rating;
    editInputs.posterInput.value = movie.poster;

    editMovieForm.onsubmit = (e) => updateMovie(e, movie);
}

const closeModal = () => {
    addMovieModal.classList.remove('active');
    editMovieModal.classList.remove('active');
    overlay.classList.remove('active');
}

const getMovieInput = () => {
    const title = document.getElementById('add-title').value.trim();
    const year = document.getElementById('add-year').value;
    const runtime = document.getElementById('add-runtime').value;
    const rating = document.getElementById('add-rating').value;
    const poster = document.getElementById('add-poster').value;
    return new Movie(title, year, runtime, rating, poster);
}

const getEditInputFields = () => {
    return {
        titleInput: document.getElementById('edit-title'),
        yearInput: document.getElementById('edit-year'),
        runtimeInput: document.getElementById('edit-runtime'),
        ratingInput: document.getElementById('edit-rating'),
        posterInput: document.getElementById('edit-poster')
    };
}

const addMovie = (e) => {
    e.preventDefault();
    const newMovie = getMovieInput();

    library.addMovie(newMovie);
    library.renderMovies();
    console.log(library.movies);

    addMovieForm.reset();
    closeModal();
}

const removeMovie = (movie) => {
    library.removeMovie(movie);
    library.renderMovies();
    console.log(library.movies);
}

const updateMovie = (e, movie) => {
    e.preventDefault();
    const editInputs = getEditInputFields();
    const updatedTitle = editInputs.titleInput.value.trim();
    const updatedYear = editInputs.yearInput.value;
    const updatedRuntime = editInputs.runtimeInput.value;
    const updatedRating = editInputs.ratingInput.value;
    const updatedPoster = editInputs.posterInput.value;

    movie.updateMovie(updatedTitle, updatedYear, updatedRuntime, updatedRating, updatedPoster);

    closeModal();
    library.renderMovies();
    console.log(library.movies);
}

addMovieBtn.onclick = openAddMovieModal;
addMovieForm.onsubmit = addMovie;
closeBtn.forEach(modal => modal.onclick = closeModal);
const currentYear = new Date().getFullYear();
addMaxYear.max = currentYear;
editMaxYear.max = currentYear;
const movie = new Movie("The Dark Knight", "2008", "152", "5", "");
library.addMovie(movie);
library.renderMovies();
console.log(library.movies);