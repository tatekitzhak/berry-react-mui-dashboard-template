const express = require('express');
const { AuthorsController, BooksController } = require('../controllers/index');

const router = express.Router();

router.route('/authors')
    .get(AuthorsController.findAll)
    .post(AuthorsController.createAuthors);
/* 
    router.route('/authors/:id')
    .get(AuthorsController.findById);
 */
    router.route('/books/:id?')
      .get(BooksController.getAllBooks)
      .post(BooksController.createBookAndReferenceToAuthorById);

module.exports = router;