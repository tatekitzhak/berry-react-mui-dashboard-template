const { Author, Book, User } = require('../../model/index');

module.exports = {
    async findAllUsers(req, res, next) {

        try {

            const user = await User.find();

            if (!user.length) {
                return res.status(404).json({ status: 404, message: 'Data is empty' });

            } else {
                return res.status(200).json({ user });
            }

        } catch (error) {
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
    async createUser(req, res, next) {
        const users = req.body;
        console.log("user:\n", users)
        try {

            for (user of users) {
                let new_user = new User(user);
                await new_user.save();
            }

            const user_saved = await User.find();

            res.status(200).json({ user_saved });

        } catch (error) {
            console.log('error:\n', error);
            next(error)
        }
    }
};