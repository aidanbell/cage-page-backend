const mongoose = require("mongoose");
require("dotenv").config();
require("../config/database");
const Movie = require("../models/movie");
const token = process.env.API_KEY;
const rootURL = `https://api.themoviedb.org/3/person/2963/movie_credits?api_key=${token}&language=en-US`;

console.log('Waiting for DB connection...');
mongoose.connection.on('connected', function () {
  seed()
});

async function seed() {
  console.log("seeding...");
  await Movie.deleteMany({});
  fetch(rootURL)
    .then((response) => response.json())
    .then(async (list) => {
      let count = (total = list.cast.length);
      console.log(count);
      let movs = fixEmUp(list.cast);
      console.log(movs.length, " movies to write to DB");
      try {
        let result = await writeIt(movs);
        console.log(`Finished writing ${result.length} items to DB`);
        Movie.find({}).then((docs) => {
          console.log(`Total items in DB: ${docs.length}`)
          console.log("I have a hard time trusting that")
          console.log("Running a cautionary weed:")
          weed()
        });
      } catch (err) {
        console.log(err);
        return weed();
      }
  });
}

async function weed() {
  console.log("weeding...");
  let moviesDB = await Movie.find({});
  let moviesAPI = await fetch(rootURL).then((res) => res.json());
  let allMissing = moviesAPI.cast.filter(
    (o1) => !moviesDB.some((o2) => o1.title === o2.title)
  );
  allMissing = fixEmUp(allMissing);
  let result = await writeIt(allMissing);
  console.log(`Finished writing ${result.length} items to DB`);
  Movie.find({}).then((docs) =>
    console.log(`Total items in DB: ${docs.length}`)
  );
}

async function writeIt(it) {
  return Movie.create(it)
    .then((docs) => docs)
    .catch((err) => {
      console.log(err)
    });
}

let GENRES = {  
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
}

function fixEmUp(docs) {
  let valid = docs.filter((mov) => mov.poster_path);

  return valid.map((movie) => {
    movie.genre_ids = movie.genre_ids.map((id) => {
      if (GENRES[id]) return GENRES[id];
    })

    return {
      title: movie.title,
      movieId: parseInt(movie.id),
      posterPath: movie.poster_path,
      overview: movie.overview,
      releaseDate: movie.release_date,
      rating: movie.vote_average,
      genres: movie.genre_ids,
    }
  });
}
