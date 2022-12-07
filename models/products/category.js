const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: { 
  	type: String, 
    required: '{PATH} is required!',
    unique: true
  },
  subtitle: {
  	type: String
  },
  website: {
  	type: String
  },
  subCategory: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }
  ],
  product: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('categorie', categorySchema);