const express = require('express');
const AuthorsController = require('../controllers/AuthorsController');
const BooksController = require('../controllers/BooksController');

const router = express.Router();

/* AuthorsRouter.route('/')
    .get(AuthorsController.findAll)
    .post(AuthorsController.createAuthors);

AuthorsRouter.route('/:id')
    .get(AuthorsController.findById);

BooksRouter.route('/')
    .get(BookssController.createBook);

    
module.exports = AuthorsRouter; */

router.route('/authors')
    .get(AuthorsController.findAll)
    .post(AuthorsController.createAuthors);

    router.route('/authors/:id')
    .get(AuthorsController.findById);

    router.route('/books')
      .get(BooksController.getAllBooks)
      .post(BooksController.createBook);

module.exports = router;