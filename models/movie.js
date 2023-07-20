var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const User = require('./user');
const Rule = require('./rule')

const token = process.env.API_KEY;
const rootURL = `https://api.themoviedb.org/3/person/2963/movie_credits?api_key=${token}&language=en-US`;


var ratingSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  quality: {
    type: Number,
    min: 0,
    max: 5
  },
  drinkability: {
    type: Number,
    min: 0,
    max: 5
  },
}, {
  timestamps: true
})

var movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  posterPath: {
    type: String,
    required: true,
  },
  starring: {
    type: Boolean,
    required: true,
    default: false
  },
  genres: [String],
  overview: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 10
  },
  rules: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Rule', 
  }],
  userRatings: [ratingSchema],
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

movieSchema.virtual('rulesCount').get(function() {
  return this.rules.length;
})

movieSchema.statics.getAll = async function() {
  movies = await this.model('Movie').find({}).sort({title: 1})
  return movies.reduce((acc, movie) => [...acc, {
    title: movie.title,
    movieId: movie.movieId,
    posterPath: movie.posterPath,
    starring: movie.starring,
    releaseDate: movie.releaseDate,
    starring: movie.starring,
    rating: movie.rating,
    rulesCount: movie.rulesCount,
  }], [])
}


movieSchema.statics.getOut = async function(key = 'title') {
  movies = await this.model('Movie').find({releaseDate: {$lt: new Date()}}).sort({[key]: 1})
  return movies.reduce(
    (acc, movie) => [
      ...acc,
      {
        title: movie.title,
        movieId: movie.movieId,
        posterPath: movie.posterPath,
        starring: movie.starring,
        releaseDate: movie.releaseDate,
        starring: movie.starring,
        rating: movie.rating,
        rulesCount: movie.rulesCount,
      },
    ],
    []
  );
}

movieSchema.statics.getOne = async function(id) {
  movie = await this.model('Movie').findOne({movieId: id})
  return {
    movieId: movie.movieId,
    title: movie.title,
    posterPath: movie.posterPath,
    starring: movie.starring,
    genres: movie.genres,
    overview: movie.overview,
    releaseDate: movie.releaseDate,
    rating: movie.rating,
    rules: movie.rules,
    rulesCount: movie.rulesCount,
  }
}

movieSchema.statics.addRule = async function(id, rule) {
  movie = await this.model('Movie').findOne({movieId: id})
  let newRule = await Rule.create(rule)
  movie.rules.push(newRule)
  await movie.save()
  return movie
}



module.exports = mongoose.model('Movie', movieSchema);