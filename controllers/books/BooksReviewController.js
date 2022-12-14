const ObjectId = require('mongoose').Types.ObjectId;
const { Author, Book, BookReview, User } = require('../../model/index');

module.exports = {
    async getAllBookReviews(req, res, next) {
        try {
            const booReviews = await BookReview.find().populate('user').populate('book');
            res.status(200).json(booReviews);
        } catch (err) {
            next(err);
        }
    },
    async createBookReviewAndReferenceToUserAndBook(req, res, next) {

        const { review, comments, rating } = req.body[0];
        const { userId, bookId } = req.params;

        try {

            if (!ObjectId.isValid(userId) && !ObjectId.isValid(bookId)) {
                return next(new Error('ObjectIds is invalid!'))
            } else {
                const user = await User.findOne({ _id: userId });
                const book = await Book.findOne({ _id: bookId });

                let new_book_review = new BookReview({
                    review: review,
                    comments: comments,
                    rating: rating,
                    book: book,
                    user: user
                });

                const book_review = await new_book_review.save();
/* 
                book.reviews.push(book_review);

                const book_saved = await book.save();
 */
                res.status(200).send({
                    user,
                    book
                });
            }

        } catch (error) {
            console.log('error at createBookReviewAndReferenceToUserAndBook:\n', error);
            next(error)
        }
    },
    async AddTagToBook(req, res, next) {
        try {
            const { bookId, TagId } = req.params;
            const newBook = await Book.findByIdAndUpdate(
                bookId,
                { $push: { tags: TagId } },
                { new: true, useFindAndModify: false },
            );
            res.send(newBook);
        } catch (err) {
            next(err);
        }
    },
    async CreateBookAndAddToTag(req, res, next) {
        try {
            const { tagId } = req.params;
            const book = req.body;
            const newBook = await Book.create(book);
            const newTag = await Tag.findByIdAndUpdate(
                tagId,
                { $push: { books: newBook._id } },
                { new: true, useFindAndModify: false },
            );
            res.send(newTag);
        } catch (err) {
            next(err);
        }
    },
};