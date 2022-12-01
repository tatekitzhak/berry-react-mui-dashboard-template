const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define Schema
const blogPostSchema = new Schema({
    title: String,
    content: String,
    comments: {
      type: Schema.Types.ObjectId,
      ref: 'comment'
    }
  })
  
  // compile schema to model and export
  module.exports = mongoose.model('BlogPost', blogPostSchema)