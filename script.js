const library = document.querySelector('.library');
const form = document.querySelector('.form');
const movieInfo = document.getElementById('submitMovie');
const addBtn = document.querySelector('.add');
const closeBtn = document.querySelector('.cancel');

movieInfo.onsubmit = addMovie;
addBtn.onclick = () => form.style.display = "block";
closeBtn.onclick = () => form.style.display = "none";

let myLibrary = [];

function Movie(title, runtime, year, rating) {
    this.title = title;
    this.runtime = runtime;
    this.year = year;
    this.rating = rating;
}

function getMovieInput() {
    const title = document.getElementById('title').value;
    const runtime = document.getElementById('runtime').value;
    const year = document.getElementById('year').value;
    const rating = document.getElementById('rating').value;
    return new Movie(title, runtime, year, rating);
}

function addMovie(e) {
    e.preventDefault();
    const newMovie = getMovieInput();
    myLibrary.push(newMovie);
    console.log(myLibrary);
    displayMovie(newMovie);
}

function displayMovie(movie) {
    let movieCard = document.createElement('div');
    movieCard.classList.add('card');
    let title = document.createElement('div');
    title.classList.add('title');
    let runtime = document.createElement('div');
    runtime.classList.add('runtime');
    let year = document.createElement('div');
    year.classList.add('year');
    let rating = document.createElement('div');
    rating.classList.add('rating');

    title.textContent = `Title: ${movie.title}`;
    runtime.textContent = `Runtime: ${movie.runtime} mins`;
    year.textContent = `Year: ${movie.year}`;
    rating.textContent = `Rating: ${movie.rating}`;

    movieCard.appendChild(title);
    movieCard.appendChild(runtime);
    movieCard.appendChild(year);
    movieCard.appendChild(rating);
    library.appendChild(movieCard); 
}