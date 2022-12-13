const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const authorSchema = new Schema({
  firstName: {
    type: String,
    required: '{PATH} cannot be empty!',
    unique: true
  },
  lastName: {
    type: String,
    required: [true, '{PATH} cannot be empty!'],
    unique: true
  },
  bio: {
    type: String
  },
  website: {
    type: String,
    unique: true
  },
  books: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Author', authorSchema);