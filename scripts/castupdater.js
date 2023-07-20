const mongoose = require("mongoose");
require("dotenv").config();
require("../config/database");
const Movie = require("../models/movie");
const token = process.env.API_KEY;
const errors = [];


console.log('Waiting for DB connection...');
mongoose.connection.on('connected', function () {
  update()
});

async function cast() {
  console.log("grabbing movies from db...");
  let moviesDB = await Movie.find({});
  console.log(`Found ${moviesDB.length} movies in DB`)
  let curIdx = 0;
  let timer = 500
  let intID = setInterval(async () => {
    timer = 500
    if (curIdx === moviesDB.length) {
      console.log("Done!");
      clearInterval(intID);
      console.log(errors)
      return process.exit()
    } else {
      let movie = moviesDB[curIdx];
      console.log(`Fetching cast for ${movie.title}...`);
      try {
        let cast = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.movieId}/credits?api_key=${token}`
        ).then((res) => res.json());
        cast = cast.cast.slice(0, 4);
        cast = cast.reduce((acc, cur) => [...acc, cur.name], []);
        delete movie.starring
        movie.starring = cast.includes("Nicolas Cage");
        await movie.save();
        console.log(`Done saving movie:`, movie)
      } catch(err) {
        console.log(`Error saving movie:`, movie)
        errors.push(err);
      }
      curIdx++;
    }
  }, timer);
}

async function update() {
  console.log("grabbing movies from db...");
  let moviesDB = await Movie.find({});
  console.log(`Found ${moviesDB.length} movies in DB`);
  let curIdx = 0;
  let timer = 500;
  let intID = setInterval(async () => {
    timer = 500;
    if (curIdx === moviesDB.length) {
      console.log("Done!");
      clearInterval(intID);
      console.log(errors);
      return process.exit();
    } else {
      let movie = moviesDB[curIdx];
      console.log(`Fetching details for ${movie.title}...`);
      try {
        let details = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.movieId}?api_key=${token}`
        ).then((res) => res.json());
        movie.genres = details.genres.reduce((acc, cur) => [...acc, cur.name], []);
        movie.overview = details.overview;
        movie.releaseDate = details.release_date;
        movie.rating = Math.round(details.vote_average * 10) /10;
        await movie.save();
        console.log(`Done saving movie:`, movie);
      } catch (err) {
        console.log(`Error saving movie:`, movie);
        errors.push({error: err, movie: movie.title});
      }
      curIdx++;
    }
  }, timer);
}