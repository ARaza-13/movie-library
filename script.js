const library = document.querySelector('.library');

let myLibrary = [];

function Movie(title, runtime, year, rating) {
    this.title = title;
    this.runtime = runtime;
    this.year = year;
    this.rating = rating;
}

function addMovietoLibrary(movie) {
    myLibrary.push(movie);
    return myLibrary;
}

function displayMovie() {
    for (const movie of myLibrary) {
        let card = document.createElement('div');
        card.classList.add('card');
        let title = document.createElement('div');
        title.classList.add('title');
        let runtime = document.createElement('div');
        runtime.classList.add('runtime');
        let year = document.createElement('div');
        year.classList.add('year');
        let rating = document.createElement('div');
        rating.classList.add('rating');

        title.textContent = `${movie.title}`;
        runtime.textContent = `${movie.runtime}`;
        year.textContent = `${movie.year}`;
        rating.textContent = `${movie.rating}`;

        card.appendChild(title);
        card.appendChild(runtime);
        card.appendChild(year);
        card.appendChild(rating);
        library.appendChild(card);
    }
}

const movie1 = new Movie('The Dark Knight', '152 mins', '2008', 5);
const movie2 = new Movie('Spider-Man: Into The Spider-Verse', '117 mins', '2018', 5);
const movie3 = new Movie('The Batman', '177 mins', '2022', 5);

addMovietoLibrary(movie1);
addMovietoLibrary(movie2);
addMovietoLibrary(movie3);

console.log(myLibrary);
displayMovie();