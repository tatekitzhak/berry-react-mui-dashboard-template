const express = require('express');
const CategoryController = require('../../controllers/product/categoryController');

const router = express.Router();

router.route('/category')
    .get(CategoryController.getAllCategory)
    .post(CategoryController.createCategory);



module.exports = router;