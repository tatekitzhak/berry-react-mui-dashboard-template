const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const { Category, Book } = require('../../models/index')

module.exports = {
    async getAllCategory(req, res, next) {
        try {
            const item = await Category.find(); //.populate('Automotive and Transport');
            res.send(item);
        } catch (err) {
            next(err);
        }
    },
    async createCategory(req, res, next) {
        try {
            const categoryItem = req.body;
            console.log('categoryItem:\n', categoryItem);

            for (item of categoryItem) {
                var newCategory = new Category(item);
                await newCategory.save();
            }

            const a = await Category.find();
            console.log('Category: ', a);
            
            res.status(200).json({ Category: a});

        } catch (error) {
            console.log('error:\n', error);
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