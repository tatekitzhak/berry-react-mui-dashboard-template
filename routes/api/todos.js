const express = require('express');

const { getTodos, createTodo } = require('../../controllers/getTodos');

const todosRouter = express.Router()


todosRouter.route('/')
.get(getTodos)
.post(createTodo);


module.exports = todosRouter ;
