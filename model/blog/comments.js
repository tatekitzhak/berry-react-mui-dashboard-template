const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment: String,
    name: String,
    post: {
        type: Schema.Types.ObjectId,
        ref: 'BlogPost'
    }
  })
  
  module.exports = mongoose.model('comment', commentSchema)