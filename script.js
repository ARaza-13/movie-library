const library = document.querySelector('.library');
const movieForm = document.getElementById('submitMovie');

movieForm.onsubmit = addMovie;

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
    // const movieInfo = Array.from(document.querySelectorAll('#submitMovie input')).reduce((acc, input) => ({
    //      ...acc, [input.id]: input.value 
    // }), {});
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
    runtime.textContent = `Runtime: ${movie.runtime}`;
    year.textContent = `Year: ${movie.year}`;
    rating.textContent = `Rating: ${movie.rating}`;

    movieCard.appendChild(title);
    movieCard.appendChild(runtime);
    movieCard.appendChild(year);
    movieCard.appendChild(rating);
    library.appendChild(movieCard); 
}