const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review cannot be empty!']
  },
  comments: {
    type: String,
    required: '{PATH} is required!'
  },
  rating: {
    type: Number,
    min: [1, 'Rating cannot be below 1.0'],
    max: [5, 'Rating cannot be above 5.0']
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must have an author']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema)