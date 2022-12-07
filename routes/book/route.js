const express = require('express');
const AuthorsController = require('../../controllers/AuthorsController');
const BooksController = require('../../controllers/BooksController');

const router = express.Router();

router.route('/authors')
    .get(AuthorsController.findAll)
    .post(AuthorsController.createAuthors);

router.route('/authors/:id')
    .get(AuthorsController.findById);

router.route('/books')
    .get(BooksController.getAllBooks)
    .post(BooksController.createBookAndReferenceToAuthorById);

module.exports = router;