const express = require('express');
const router = express.Router();
const apiMoviesCtrl = require('../controllers/api/movies');
const verifyUser = require('../config/verifyUser')

router.get('/movies', apiMoviesCtrl.index);
router.get('/movies/:id', apiMoviesCtrl.show);
router.post('/movies/:id/watched', verifyUser, apiMoviesCtrl.addToWatched);
router.post('/movies/:id/rules', verifyUser, apiMoviesCtrl.addRule);
router.get('/movies/:id/rules', apiMoviesCtrl.getRules);


module.exports = router;