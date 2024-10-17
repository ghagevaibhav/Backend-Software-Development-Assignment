
const express = require('express');
const router = express.Router();
const comicBookController = require('../controllers/comicBookController');

router
.route('/createComicBook')
.post(comicBookController.createComicBook)

router
.route('/getAllComicBooks')
.get(comicBookController.getAllComicBooks)

router
.route('/getComicBook/:id') 
.get(comicBookController.getComicBook)

router
.route('/updateComicBook/:id')
.patch(comicBookController.updateComicBook)

router
.route('/deleteComicBook/:id')
.delete(comicBookController.deleteComicBook)

module.exports = router;