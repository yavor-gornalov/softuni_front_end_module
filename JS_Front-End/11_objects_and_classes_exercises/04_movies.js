// https://judge.softuni.org/Contests/Compete/Index/3792#3

function movies(moviesData) {
    let movies = [];

    for (const iterator of moviesData) {
        let newMovie = {};

        if (iterator.includes("addMovie")) {
            let movieName = iterator.replace("addMovie", "").trim();
            newMovie.name = movieName;
            movies.push(newMovie);
        } else if (iterator.includes("directedBy")) {
            let tokens = iterator.replace("directedBy", "|");
            let [movieName, movieDirector] = tokens.split(" | ");

            let movie = movies.find((el) => el.name === movieName);

            if (movie) movie.director = movieDirector;
        } else if (iterator.includes("onDate")) {
            let tokens = iterator.replace("onDate", "|");
            let [movieName, movieDate] = tokens.split(" | ");

            let movie = movies.find((el) => el.name === movieName);

            if (movie) movie.date = movieDate;
        }
    }

    movies.forEach((movie) => {
        if (movie.name && movie.director && movie.date) {
            console.log(JSON.stringify(movie));
        }
    });
}

// TESTS:
// movies([
//     "addMovie Fast and Furious",
//     "addMovie Godfather",
//     "Inception directedBy Christopher Nolan",
//     "Godfather directedBy Francis Ford Coppola",
//     "Godfather onDate 29.07.2018",
//     "Fast and Furious onDate 30.07.2018",
//     "Batman onDate 01.08.2018",
//     "Fast and Furious directedBy Rob Cohen",
// ]);

movies([
    "addMovie The Avengers",
    "addMovie Superman",
    "The Avengers directedBy Anthony Russo",
    "The Avengers onDate 30.07.2010",
    "Captain America onDate 30.07.2010",
    "Captain America directedBy Joe Russo",
]);
