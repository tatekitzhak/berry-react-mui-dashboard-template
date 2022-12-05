const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
  name: { 
  	type: String, 
  	required: '{PATH} is required!'
  },
  bio: {
  	type: String
  },
  website: {
  	type: String
  },
  books: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Author', authorSchema);