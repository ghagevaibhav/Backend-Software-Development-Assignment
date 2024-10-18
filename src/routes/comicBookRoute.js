
const express = require('express');
const router = express.Router();
const comicBookController = require('../controllers/comicBookController');

// route for creating a new comic book
router
.route('/createComicBook')
.post(comicBookController.createComicBook)

// route for getting all comic books
router
.route('/getAllComicBooks')
.get(comicBookController.getAllComicBooks)

// route for getting a specific comic book by id
router
.route('/getComicBook/:id') 
.get(comicBookController.getComicBook)

// route for updating a specific comic book
router
.route('/updateComicBook/:id')
.patch(comicBookController.updateComicBook)

// route for deleting a specific comic book by id
router
.route('/deleteComicBook/:id')
.delete(comicBookController.deleteComicBook)

module.exports = router; // exporting router