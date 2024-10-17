
const express = require('express');
const comicBookController = require('./controllers/comicBookController');
const router = express.Router();

router
.route('/')
.get(comicBookController.getAllComicBooks)
.post(comicBookController.createComicBook)

router
.route('/:id')
.get(comicBookController.getComicBook)
.patch(comicBookController.updateComicBook)
.delete(comicBookController.deleteComicBook)

module.exports = router;