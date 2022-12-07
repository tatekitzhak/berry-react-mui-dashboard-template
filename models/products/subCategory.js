const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
  title: { 
  	type: String, 
  	required: '{PATH} is required!'
  },
  subtitle: {
  	type: String
  },
  Category: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Category',
    required: '{PATH} is required!'
}
}, {
  timestamps: true
});

module.exports = mongoose.model('subCategory', subCategorySchema);