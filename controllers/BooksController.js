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
    async createBook(req, res, next) {
        try {
            const books = req.body;
            console.log('createBook :\n', books[0], books[1]);
            const title_harry_potter = books[0].title;
            const title_awakenGiant = books[1].title;

            const jkRowling = await Author.findOne({ name: 'JK Rowling' });
            const tonyRobbins = await Author.findOne({ name: 'Tony Robbins' });

            let harryPotter = new Book({ title: title_harry_potter, author: jkRowling._id });
            let awakenGiant = new Book({ title: title_awakenGiant, author: tonyRobbins._id });

            await harryPotter.save();
            await awakenGiant.save();

            jkRowling.books.push(harryPotter);
            tonyRobbins.books.push(awakenGiant);

            await jkRowling.save();
            await tonyRobbins.save();

            res.status(200).send({
                JK_Rowling: jkRowling,
                Tony_Robbins: tonyRobbins
            });

        } catch (error) {
            console.log('createBook error:\n', error);
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