const mongoose = require('mongoose');
const { Author, Book } = require('../model/index');

const AuthorsController = {
    async findAll(req, res) {

        try {
            
            const authors = await Author.find().populate('books');
            console.log('AuthorsController findAll:\n', authors);

            if (!authors.length) {
                res.status(404).json({ status: 404, message: 'Find All data is empty ' });
                
              } else {
                res.status(200).json({ authors: authors });
              }

        } catch (error) {
            console.log('error:\n', error);
        }
    },
    async findById(req, res){
        try {
            
            const author = await Author.findById(req.params.id).populate('books');
            console.log('AuthorsController findById:\n', author);
            if (!author) {
                res.status(404).json({ status: 404, message: author});
                
              } else {
                res.status(200).json({ author: 'author' });
              }

        } catch (error) {
            console.log('error:\n', error);
        }
    }, 
    async createAuthors(req, res){
        try {
            
            
            console.log('AuthorsController createAuthors:\n', req.body);
            res.status(200).json({ author: req.body });

        } catch (error) {
            console.log('error:\n', error);
        }
    }
};

module.exports = AuthorsController;