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
}

const library = document.querySelector('.library');
const addformWrap = document.querySelector('.add-movie');
const editformWrap = document.querySelector('.edit-movie');
const addMovieForm = document.getElementById('add-movie');
const editMovieForm = document.getElementById('edit-movie');
const openMovieForm = document.querySelector('.add');
const closeMovieForm = document.querySelectorAll('.cancel');
const errorMsg = document.querySelector('.error-msg');
const maxYear = document.getElementById('add-year');

let currentYear = new Date().getFullYear();
maxYear.max = currentYear;
// library array to store all our movie objects
let myLibrary = [];

addMovieForm.onsubmit = addMovie;
// add and close button to hide/show movie form
openMovieForm.onclick = displayForm;
closeMovieForm.forEach(close => close.onclick = closeForm);

function displayForm(e) {
    if (e.target.classList.contains('add')) {
        addformWrap.classList.add('active');
    } else {
        editformWrap.classList.add('active');
    }
}

function closeForm() {
    addformWrap.classList.remove('active');
    addMovieForm.reset();
    editformWrap.classList.remove('active');
    // editMovieForm.reset();
    errorMsg.classList.remove('active');
    errorMsg.textContent = '';
}

// create movie object
function Movie(title, year, runtime, rating, poster) {
    this.title = title;
    this.year = year;
    this.runtime = runtime;
    this.rating = rating;
    this.poster = poster;
}

// create a new movie object based on user input 
function getMovieInput() {
    const title = document.getElementById('add-title').value;
    const year = document.getElementById('add-year').value;
    const runtime = document.getElementById('add-runtime').value;
    const rating = document.getElementById('add-rating').value;
    const poster = document.getElementById('add-poster').value;
    return new Movie(title, year, runtime, rating, poster);
}

function getEditedMovie() {
    const editTitle = document.getElementById('edit-title').value;
    const editYear = document.getElementById('edit-year').value;
    const editRuntime = document.getElementById('edit-runtime').value;
    const editRating = document.getElementById('edit-rating').value;
    const editPoster = document.getElementById('edit-poster').value;
    return new Movie(editTitle, editYear, editRuntime, editRating, editPoster);
}

// check if movie is already in library
function validateInput(input) {
    if (myLibrary.some(movie => movie.title === input.title)) {
        errorMsg.textContent = "This movie is already in your library";
        errorMsg.classList.add('active');
        return;
    }
    return true;
}

// validate if the URL movie image being added is a valid image URL 
function checkPoster(poster) {
    let validImg = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(poster);
    if (validImg) {
        return poster;
    } else {
        return "images/placeholder.jpg";
    }
}

// add the new movie object (acquired from input) into our library array
function addMovie(e) {
    e.preventDefault();
    const newMovie = getMovieInput();
    if (validateInput(newMovie)) {
        myLibrary.push(newMovie);
        console.log(myLibrary);
        closeForm();
        updateMovieGrid();
    }
}

// remove the movie object from our library array and from the webpage display
function removeMovie(e) {
    const movie = getMovie(e.target);
    console.log(myLibrary);
    const index = myLibrary.indexOf(movie);
    myLibrary.splice(index, 1);
    updateMovieGrid();
    console.log(myLibrary);
}

// edit the movie object from library array and display it on webpage
function editMovie(e) {
    const editTitle = document.getElementById('edit-title');
    const editYear = document.getElementById('edit-year');
    const editRuntime = document.getElementById('edit-runtime');
    const editRating = document.getElementById('edit-rating');
    const editPoster = document.getElementById('edit-poster');

    const movie = getMovie(e.target);
    const index = myLibrary.indexOf(movie);
    console.log(movie);

    editTitle.value = movie.title;
    editYear.value = movie.year;
    editRuntime.value = movie.runtime;
    editRating.value = movie.rating;
    editPoster.value = movie.poster;

    editMovieForm.onsubmit = (e) => updateMovie(e, index);
}

function updateMovie(e, index) {
    e.preventDefault();
    const newMovie = getEditedMovie();
    console.log(newMovie);
    myLibrary.splice(index, 1, newMovie);
    console.log(myLibrary);
    closeForm();
    updateMovieGrid();
}

function getMovie(current) {
    const title = current.parentNode.querySelector('.title').textContent;
    return myLibrary.find(movie => movie.title === title);

}

function getRating(rating, movie) {
    for (let i = 0; i < Math.floor(movie.rating); i++) {
        let star = document.createElement('img');
        star.src = "images/star.svg"
        rating.appendChild(star);
    }
 
     if (movie.rating % 1 !== 0) {
        let halfStar = document.createElement('img');
        halfStar.src = "images/star-half.svg"
        rating.appendChild(halfStar);
    }
}

function updateMovieGrid() {
    resetMovieGrid();
    for (let movie of myLibrary) {
        createMovieCard(movie);
    }
} 

function resetMovieGrid() {
    library.innerHTML = '';
}

// display the newly added movie object into the screen
function createMovieCard(movie) {
    let movieCard = document.createElement('div');
    let poster = document.createElement('img');
    let title = document.createElement('div');
    let year = document.createElement('div');
    let runtime = document.createElement('div');
    let rating = document.createElement('div');
    let removeBtn = document.createElement('button');
    let removeImg = document.createElement('img');
    let editBtn = document.createElement('button');
    let editImg = document.createElement('img');

    movieCard.classList.add('card');
    poster.classList.add('poster');
    title.classList.add('title');
    year.classList.add('year');
    runtime.classList.add('runtime');
    rating.classList.add('rating');
    removeBtn.classList.add('remove');
    removeBtn.classList.add('img-btn');
    removeBtn.onclick = removeMovie;
    editBtn.classList.add('edit');
    editBtn.classList.add('img-btn');
    editBtn.addEventListener("click", displayForm);
    editBtn.addEventListener("click", editMovie);

    title.textContent = `${movie.title}`;
    year.textContent = `${movie.year}`;
    runtime.textContent = `${movie.runtime} mins`;

    poster.src = checkPoster(movie.poster);
    poster.alt = "poster";
    removeImg.src = "images/close-thick.svg";
    removeImg.alt = "close";
    editImg.src = "images/movie-edit-outline.svg";
    editImg.alt = "edit";

    getRating(rating, movie);

    movieCard.appendChild(poster);
    movieCard.appendChild(title);
    movieCard.appendChild(year);
    movieCard.appendChild(runtime);
    movieCard.appendChild(rating);
    removeBtn.appendChild(removeImg);
    movieCard.appendChild(removeBtn);
    editBtn.appendChild(editImg);
    movieCard.appendChild(editBtn);
    library.appendChild(movieCard); 
}