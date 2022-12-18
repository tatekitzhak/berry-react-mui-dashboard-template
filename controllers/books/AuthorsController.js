const { Author, Book } = require('../../model/index');

module.exports = {
    async findAll(req, res, next) {

        try {

            const authors = await Author.find().populate({
                path: 'books',
                populate: {
                    path: 'reviews',
                    populate:{
                        path: 'user'
                    }
                }
            });

            if (!authors.length) {
                res.status(404).json({ status: 404, message: 'Data is empty' });

            } else {
                res.status(200).json({ authors: authors });
            }

        } catch (error) {
            console.log('error:\n', error);
            next(error)
        }
    },
    async findById(req, res) {
        try {

            const author = await Author.findById(req.params.id).populate('books');
            console.log('AuthorsController findById:\n', author);
            if (!author) {
                res.status(404).json({ status: 404, message: author });

            } else {
                res.status(200).json({ author: author });
            }

        } catch (error) {
            console.log('error:\n', error);
        }
    },
    async createAuthors(req, res, next) {
        const authors = req.body;
        try {

            for (author of authors) {
                let newAuthor = new Author(author);
                await newAuthor.save();
            }

            const author_saved = await Author.find();

            res.status(200).json({ author_saved });

        } catch (error) {
            console.log('error:\n', error);
            next(error)
        }
    }
};