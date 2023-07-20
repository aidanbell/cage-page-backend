const Movie = require('../models/movie');
const User = require('../models/user');
const Rule = require('../models/rule');
const user = require('../models/user');

module.exports = {
  index,
  show,
  addToWatched,
  addRule,
  getRules,
  toastRule
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
  try {
    const user = await User.addToWatched(req.params.id, req.user._id)
    let usrJSON = await user.toJSON()
    usrJSON.success = true
    res.json(usrJSON).status(200)
  } catch (err) {
    console.log(err)
    res.json(err).status(400)
  }
}

async function addRule(req, res) {
  const newRule = await Movie.addRule(req.params.id, req.body)
  newRule.success = true
  res.json(newRule).status(200)
}

async function getRules(req, res) {
  const rules = await Rule.find({movieId: req.params.id})
  res.json(rules).status(200)
}

async function toastRule(req, res) {
  const rule = await Rule.findById(req.params.id)
  if (rule.toasts.includes(req.user._id)) {
    rule.toasts = rule.toasts.filter(toast => toast !== req.user._id)
  } else {
    rule.toasts.push(req.user._id)
  }
  await rule.save()
  res.json(rule).status(200)
}