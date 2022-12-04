const mongoose = require('mongoose');
/**
 *  https://www.mongodb.com/community/forums/t/duplicate-data-getting-added-into-collection/150331/2
 */
const Schema = mongoose.Schema;

var blogPostSchema = new Schema({
    title: {
        type: String, required: true,
        unique: true
    },
    content: {
        type: String, required: true,
        unique: true
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
},
    { collection: 'BlogPost' });

module.exports = mongoose.model('BlogPost', blogPostSchema);