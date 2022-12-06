const mongoose = require('mongoose');
const { Author, Book } = require('../model/index')

module.exports = {
    async getAllBooks(req, res, next) {
        try {
            const books = await Book.find().populate('author');
            res.send(books);
        } catch (err) {
            next(err);
        }
    },
    async createBookAndReferenceToAuthor(req, res, next) {
        try {
            const books = req.body;

            const book_author = books[0].author;
            const book_title = books[0].title;
            console.log('createBook :\n', book_author, book_title);

            const author = await Author.findOne({ name: book_author });

            let book = new Book({ title: book_title, author: author._id });

            const book_saved = await book.save();

            author.books.push(book);

            const author_saved = await author.save();

            res.status(200).send({
                book_: book_saved,
                author_: author_saved
            });

        } catch (error) {
            console.log('createBook error:\n', error);
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