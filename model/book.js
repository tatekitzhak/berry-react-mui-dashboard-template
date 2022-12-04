const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  title: { 
  	type: String, 
  	required: '{PATH} is required!'
  },
  subtitle: {
  	type: String
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Author' 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);