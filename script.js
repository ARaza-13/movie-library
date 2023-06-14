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
function Movie(title, year, runtime, rating) {
    this.title = title;
    this.year = year;
    this.runtime = runtime;
    this.rating = rating;
}

// create a new movie object based on user input 
function getMovieInput() {
    const title = document.getElementById('title').value;
    const year = document.getElementById('year').value;
    const runtime = document.getElementById('runtime').value;
    const rating = document.getElementById('rating').value;
    return new Movie(title, year, runtime, rating);
}

// check if movie is already in library
function validateInput(input) {
    if (myLibrary.some(movie => movie.title === input.title)) {
        errorMsg.textContent = "This movie is already in your library"
        errorMsg.classList.add('active');
        return;
    }
    return true;
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
    let title = document.createElement('div');
    let year = document.createElement('div');
    let runtime = document.createElement('div');
    let rating = document.createElement('div');
    let removeBtn = document.createElement('button');

    movieCard.classList.add('card');
    title.classList.add('title');
    year.classList.add('year');
    runtime.classList.add('runtime');
    rating.classList.add('rating');
    removeBtn.classList.add('remove');

    title.textContent = `${movie.title}`;
    year.textContent = `${movie.year}`;
    runtime.textContent = `${movie.runtime} mins`;
    rating.textContent = `${movie.rating} stars`;
    removeBtn.textContent = 'Remove';

    movieCard.appendChild(title);
    movieCard.appendChild(year);
    movieCard.appendChild(runtime);
    movieCard.appendChild(rating);
    movieCard.appendChild(removeBtn);
    library.appendChild(movieCard); 

    // remove the movie object from our library array and from the webpage display
    removeBtn.onclick = () => {
        myLibrary = myLibrary.filter(obj => obj.title != movie.title);
        library.removeChild(movieCard);
        console.log(myLibrary);
    }
}