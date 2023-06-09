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

const movie1 = new Movie('The Dark Knight', '152 mins', '2008', 5);
const movie2 = new Movie('Spider-Man: Into The Spider-Verse', '117 mins', '2018', 5);
const movie3 = new Movie('The Batman', '177 mins', '2022', 5);

addMovietoLibrary(movie1);
addMovietoLibrary(movie2);
addMovietoLibrary(movie3);

console.log(myLibrary);