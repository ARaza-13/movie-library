class Movie {
    constructor(title, year, runtime, rating, poster) {
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

    removeMovie(title) {
        this.movies = this.movies.filter((movie) => movie.title != title);
    }

    getMovie(title) {
        return this.movies.find((movie) => movie.title === title);
    }

    renderMovies() {
        resetMovieList();
        for (let movie of this.movies) {
            createMovieCard(movie);
        } 
    }
}

const library = new Library();

const movieList = document.getElementById('movie-list');

// display the newly added movie object into the screen
const createMovieCard = (movie) =>  {
    const movieCard = document.createElement('div');
    const poster = document.createElement('img');
    const movieInfo = document.createElement('div');
    const title = document.createElement('div');
    const year = document.createElement('div');
    const runtime = document.createElement('div');
    const rating = document.createElement('div');
    const removeBtn = document.createElement('button');
    const removeImg = document.createElement('img');
    const editBtn = document.createElement('button');
    const editImg = document.createElement('img');

    movieCard.classList.add('card');
    poster.classList.add('poster');
    movieInfo.classList.add('info');
    title.classList.add('title');
    year.classList.add('year');
    runtime.classList.add('runtime');
    rating.classList.add('rating');
    removeBtn.classList.add('remove');
    removeBtn.classList.add('img-btn');
    removeBtn.onclick = removeMovie;
    editBtn.classList.add('edit');
    editBtn.classList.add('img-btn');
    // editBtn.addEventListener("click", displayForm);
    // editBtn.addEventListener("click", editMovie);

    title.textContent = `${movie.title}`;
    year.textContent = `${movie.year}`;
    runtime.textContent = `${movie.runtime} mins`;
    rating.textContent = `${movie.rating} stars`;

    // poster.src = checkPoster(movie.poster);
    poster.src = `${movie.poster}`;
    poster.alt = "poster";
    removeImg.src = "images/close-thick.svg";
    removeImg.alt = "close";
    editImg.src = "images/movie-edit-outline.svg";
    editImg.alt = "edit";

    // getRating(rating, movie);

    movieInfo.appendChild(title);
    movieInfo.appendChild(year);
    movieInfo.appendChild(runtime);
    movieInfo.appendChild(rating);

    removeBtn.appendChild(removeImg);
    editBtn.appendChild(editImg);

    movieCard.appendChild(poster);
    movieCard.appendChild(movieInfo);
    movieCard.appendChild(removeBtn);
    movieCard.appendChild(editBtn);

    movieList.appendChild(movieCard); 
}

const addMovieForm = document.getElementById('add-movie-form');
const addMovieModal = document.getElementById('add-movie-modal');
const addMovieBtn = document.getElementById('add-movie-btn');
const closeBtn = document.getElementById('close-btn');

const openAddMovieModal = () => {
    addMovieForm.reset();
    addMovieModal.classList.add('active');
}

const closeAddMovieModal = () => {
    addMovieModal.classList.remove('active');
}

const resetMovieList = () => {
    movieList.innerHTML = '';
}

const getMovieInput = () => {
    const title = document.getElementById('add-title').value.trim();
    const year = document.getElementById('add-year').value;
    const runtime = document.getElementById('add-runtime').value;
    const rating = document.getElementById('add-rating').value;
    const poster = document.getElementById('add-poster').value;
    return new Movie(title, year, runtime, rating, poster);
}

const addMovie = (e) => {
    e.preventDefault();
    const newMovie = getMovieInput();

    library.addMovie(newMovie);
    library.renderMovies();
    console.log(library.movies);

    addMovieForm.reset();
    closeAddMovieModal();
}

const removeMovie = (e) => {
    const title = e.target.parentNode.querySelector('.title').textContent;

    library.removeMovie(title);
    library.renderMovies();
    console.log(library.movies);
}

addMovieBtn.onclick = openAddMovieModal;
closeBtn.onclick = closeAddMovieModal;
addMovieForm.onsubmit = addMovie;
const movie = new Movie("The Dark Knight", "2008", "152", "5", "");
library.addMovie(movie);
library.renderMovies();
console.log(library.movies);

// const addformWrap = document.querySelector('.add-movie');
// const editformWrap = document.querySelector('.edit-movie');
// const addMovieForm = document.getElementById('add-movie');
// const editMovieForm = document.getElementById('edit-movie');
// const openMovieForm = document.querySelector('.add');
// const closeMovieForm = document.querySelectorAll('.cancel');
// const errorMsg = document.querySelector('.error-msg');
// const maxYear = document.getElementById('add-year');

// let currentYear = new Date().getFullYear();
// maxYear.max = currentYear;
// // library array to store all our movie objects
// let myLibrary = [];

// addMovieForm.onsubmit = addMovie;
// // add and close button to hide/show movie form
// openMovieForm.onclick = displayForm;
// closeMovieForm.forEach(close => close.onclick = closeForm);

// function displayForm(e) {
//     if (e.target.classList.contains('add')) {
//         addformWrap.classList.add('active');
//     } else {
//         editformWrap.classList.add('active');
//     }
// }

// function closeForm() {
//     addformWrap.classList.remove('active');
//     addMovieForm.reset();
//     editformWrap.classList.remove('active');
//     // editMovieForm.reset();
//     errorMsg.classList.remove('active');
//     errorMsg.textContent = '';
// }

// // create movie object
// function Movie(title, year, runtime, rating, poster) {
//     this.title = title;
//     this.year = year;
//     this.runtime = runtime;
//     this.rating = rating;
//     this.poster = poster;
// }

// // create a new movie object based on user input 
// function getMovieInput() {
//     const title = document.getElementById('add-title').value;
//     const year = document.getElementById('add-year').value;
//     const runtime = document.getElementById('add-runtime').value;
//     const rating = document.getElementById('add-rating').value;
//     const poster = document.getElementById('add-poster').value;
//     return new Movie(title, year, runtime, rating, poster);
// }

// function getEditedMovie() {
//     const editTitle = document.getElementById('edit-title').value;
//     const editYear = document.getElementById('edit-year').value;
//     const editRuntime = document.getElementById('edit-runtime').value;
//     const editRating = document.getElementById('edit-rating').value;
//     const editPoster = document.getElementById('edit-poster').value;
//     return new Movie(editTitle, editYear, editRuntime, editRating, editPoster);
// }

// // check if movie is already in library
// function validateInput(input) {
//     if (myLibrary.some(movie => movie.title === input.title)) {
//         errorMsg.textContent = "This movie is already in your library";
//         errorMsg.classList.add('active');
//         return;
//     }
//     return true;
// }

// // validate if the URL movie image being added is a valid image URL 
// function checkPoster(poster) {
//     let validImg = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(poster);
//     if (validImg) {
//         return poster;
//     } else {
//         return "images/placeholder.jpg";
//     }
// }

// // add the new movie object (acquired from input) into our library array
// function addMovie(e) {
//     e.preventDefault();
//     const newMovie = getMovieInput();
//     if (validateInput(newMovie)) {
//         myLibrary.push(newMovie);
//         console.log(myLibrary);
//         closeForm();
//         updateMovieGrid();
//     }
// }

// // remove the movie object from our library array and from the webpage display
// function removeMovie(e) {
//     const movie = getMovie(e.target);
//     console.log(myLibrary);
//     const index = myLibrary.indexOf(movie);
//     myLibrary.splice(index, 1);
//     updateMovieGrid();
//     console.log(myLibrary);
// }

// // edit the movie object from library array and display it on webpage
// function editMovie(e) {
//     const editTitle = document.getElementById('edit-title');
//     const editYear = document.getElementById('edit-year');
//     const editRuntime = document.getElementById('edit-runtime');
//     const editRating = document.getElementById('edit-rating');
//     const editPoster = document.getElementById('edit-poster');

//     const movie = getMovie(e.target);
//     const index = myLibrary.indexOf(movie);
//     console.log(movie);

//     editTitle.value = movie.title;
//     editYear.value = movie.year;
//     editRuntime.value = movie.runtime;
//     editRating.value = movie.rating;
//     editPoster.value = movie.poster;

//     editMovieForm.onsubmit = (e) => updateMovie(e, index);
// }

// function updateMovie(e, index) {
//     e.preventDefault();
//     const newMovie = getEditedMovie();
//     console.log(newMovie);
//     myLibrary.splice(index, 1, newMovie);
//     console.log(myLibrary);
//     closeForm();
//     updateMovieGrid();
// }

// function getMovie(current) {
//     const title = current.parentNode.querySelector('.title').textContent;
//     return myLibrary.find(movie => movie.title === title);

// }

// function getRating(rating, movie) {
//     for (let i = 0; i < Math.floor(movie.rating); i++) {
//         let star = document.createElement('img');
//         star.src = "images/star.svg"
//         rating.appendChild(star);
//     }
 
//      if (movie.rating % 1 !== 0) {
//         let halfStar = document.createElement('img');
//         halfStar.src = "images/star-half.svg"
//         rating.appendChild(halfStar);
//     }
// }
