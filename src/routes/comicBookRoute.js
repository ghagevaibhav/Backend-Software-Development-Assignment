
const express = require('express');
const router = express.Router();
const comicBookController = require('../controllers/comicBookController');

router
.route('/getAllComicBooks')
.get(comicBookController.getAllComicBooks)

router
.route('/createComicBook')
.post(comicBookController.createComicBook)

router
.route('/:id')
.get(comicBookController.getComicBook)
.patch(comicBookController.updateComicBook)
.delete(comicBookController.deleteComicBook)

module.exports = router;