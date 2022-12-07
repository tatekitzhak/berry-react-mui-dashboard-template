const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: '{PATH} is required!',
    unique: true
  },
  description: {
    type: String,
    required: '{PATH} is required!'
  },
  price: {
    type: Number,
    default: 0
  },
  Category: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Category',
    required: '{PATH} is required!'
  },
  SubCategory: {
    type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory',
    required: false
  },
  countInStock: {
    type: Number,
    required: '{PATH} is required!',
    min: 0,
    max: 255
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('product', productSchema);