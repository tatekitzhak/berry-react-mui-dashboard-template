const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  review: {
    type: String,
    required: [true, '{PATH} cannot be empty!']
  },
  comments: {
    type: String
  },
  rating: {
    type: Number,
    min: [1, '{PATH} cannot be below 1.0'],
    max: [5, '{PATH} cannot be above 5.0']
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: '{PATH} cannot be empty!'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, '{PATH} must have an author']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema)