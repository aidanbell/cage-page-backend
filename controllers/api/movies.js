const Movie = require('../../models/movie');
const User = require('../../models/user');
const Rule = require('../../models/rule');

module.exports = {
  index,
  show,
  addToWatched,
  addRule,
  getRules
}

async function index(req, res) {
  // will add this back in with fat models skinny controllers
  // const sortKey = req.query.sort || 'title';
  // const movies = await Movie.find({}).sort(sortKey);
  const movies = await Movie.getOut(req.query.sort);
  res.json(movies).status(200);
}

async function show(req, res) {
  const movie = await Movie.getOne(req.params.id)
  res.json(movie).status(200)
}

async function addToWatched(req, res) {
  const user = await User.addToWatched(req.params.id, req.user._id)
  res.json(user).status(200)
}

async function addRule(req, res) {
  const user = await Movie.addRule(req.params.id, req.body)
  res.json(user).status(200)
}

async function getRules(req, res) {
  const rules = await Rule.find({movieId: req.params.id})
  res.json(rules).status(200)
}