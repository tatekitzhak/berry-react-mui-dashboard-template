import express from 'express';

import * as tasksData from '../controllers/tasks.js';

const router = express.Router();

router.get('/', tasksData.getTasksList);
// this api end-point of an API returns JSON data array
router.get('/:id', tasksData.getTaskById);

// CREATE
// this api end-point add new task to tasks list
// that is add new task to `tasks` array
router.post('/', tasksData.addNewTask);

export default router;