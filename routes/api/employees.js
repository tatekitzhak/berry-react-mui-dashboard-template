import express from 'express';
import  * as employeesController from '../../controllers/employeesController.js';
import  * as topicsController from '../../controllers/topics.js';

const employeesRouter = express.Router();

employeesRouter.route('/')
    .get(topicsController.getAllTopics)
    .post(employeesController.createNewEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee);

employeesRouter.route('/:id')
    .get(employeesController.getEmployee);

export { employeesRouter };