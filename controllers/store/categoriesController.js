const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const { Categorie, Book } = require('../../models/index')

module.exports = {
    async getAllCategories(req, res, next) {
        try {
            const item = await Categorie.find(); //.populate('Automotive and Transport');
            res.send(item);
        } catch (err) {
            next(err);
        }
    },
    async createCategorie(req, res, next) {
        try {
            const newCategories = req.body;
            console.log('CategorieItem:\n', newCategories);

            for (newItem of newCategories) {
                var item = new Categorie(newItem);
                await item.save();
            }

            const a = await Categorie.find();
            console.log('Categorie: ', a);
            
            res.status(200).json({ Categorie: a});

        } catch (error) {
            console.log('error:\n', error);
            next(error)
        }
    },
    async addSubcategories(req, res, next) {
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