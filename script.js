const library = document.querySelector('.library');
const formContainer = document.querySelector('.form');
const form = document.getElementById('submitMovie');
const openMovieForm = document.querySelector('.add');
const closeMovieForm = document.querySelector('.cancel');
const errorMsg = document.querySelector('.error-msg');
const maxYear = document.getElementById('year');

let currentYear = new Date().getFullYear();
maxYear.max = currentYear;
// library array to store all our movie objects
let myLibrary = [];

form.onsubmit = addMovie;
// add and close button to hide/show movie form
openMovieForm.onclick = displayForm;
closeMovieForm.onclick = closeForm;

function displayForm() {
    formContainer.classList.add('active');
}

function closeForm() {
    formContainer.classList.remove('active');
    form.reset();
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
    const title = document.getElementById('title').value;
    const year = document.getElementById('year').value;
    const runtime = document.getElementById('runtime').value;
    const rating = document.getElementById('rating').value;
    const poster = document.getElementById('poster').value;
    return new Movie(title, year, runtime, rating, poster);
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
        displayMovie(newMovie);
    }
}

// display the newly added movie object into the screen
function displayMovie(movie) {
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
    editBtn.classList.add('edit');
    editBtn.classList.add('img-btn');

    title.textContent = `${movie.title}`;
    year.textContent = `${movie.year}`;
    runtime.textContent = `${movie.runtime} mins`;

    poster.src = checkPoster(movie.poster);
    poster.alt = "poster";
    removeImg.src = "images/close-thick.svg";
    removeImg.alt = "close";
    editImg.src = "images/movie-edit-outline.svg";
    editImg.alt = "edit";


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

    // remove the movie object from our library array and from the webpage display
    removeBtn.onclick = () => {
        myLibrary = myLibrary.filter(obj => obj.title != movie.title);
        library.removeChild(movieCard);
        console.log(myLibrary);
    }
}