const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
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
    async createBookAndReferenceToAuthorById(req, res, next) {
        try {
            const { subtitle, title, authorId } = req.body[0];
            console.log('createBook :\n', subtitle, title, authorId);

            if (!ObjectId.isValid(authorId)) {
                throw new Error('author object id not passed');
              }

            const author = await Author.findOne({ _id: authorId });
            console.log('author :\n', author);

            let book = new Book({ title: title, subtitle: subtitle, author: authorId});

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