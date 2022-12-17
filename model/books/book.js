const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  bookName: {
    type: String,
    required: '{PATH} is required!',
    unique: true
  },
  title: {
    type: String,
    required: '{PATH} is required!'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: '{PATH} is required!'
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Review'
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);