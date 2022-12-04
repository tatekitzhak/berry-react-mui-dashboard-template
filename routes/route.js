const express = require('express');
const AuthorsController = require('../controllers/AuthorsController');

const AuthorsRouter = express.Router();

AuthorsRouter.route('/')
    .get(AuthorsController.findAll);
/* 
AuthorsRouter.route('/')
    .get(topicsController.getAllTopics)
    .post(employeesController.createNewEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee);
 */
AuthorsRouter.route('/:id')
    .get(AuthorsController.findById);

module.exports = AuthorsRouter;