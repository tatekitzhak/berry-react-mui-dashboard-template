const express = require('express');
const { AuthorsController, BooksController, BooksReviewController, UsersController } = require('../controllers/index');

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

    router.route('/book-review/:userId?/:bookId?')
        .get(BooksReviewController.getAllBookReviews)
        .post(BooksReviewController.createBookReviewAndReferenceToUserAndBook);
    
    router.route('/user')
        .get(UsersController.findAllUsers)
        .post(UsersController.createUser);
module.exports = router;