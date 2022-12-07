const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
/**
 *  https://www.mongodb.com/community/forums/t/duplicate-data-getting-added-into-collection/150331/2
 */
const Schema = mongoose.Schema;

var commentSchema = new Schema({
  comments: {
    type: String, required: true,
    unique: true
  },
},
  { collection: 'Comment' });

module.exports = mongoose.model('Comment', commentSchema);