const express = require('express');
const router = express.Router();
const apiMoviesCtrl = require('../controllers/movies');
const verifyUser = require('../config/verifyUser')

router.get('/movies', apiMoviesCtrl.index);
router.get('/movies/:id', apiMoviesCtrl.show);
router.post('/movies/:id/watched', verifyUser, apiMoviesCtrl.addToWatched);
router.post('/movies/:id/rules', verifyUser, apiMoviesCtrl.addRule);
router.get('/movies/:id/rules', apiMoviesCtrl.getRules);
router.put('/rule/:id/toast', verifyUser, apiMoviesCtrl.toastRule);


module.exports = router;