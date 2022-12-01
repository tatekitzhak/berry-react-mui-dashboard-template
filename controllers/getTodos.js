const Todo = require('../model/todo');

async function getTodos(req, res, next) {
    
      try {
        const todos = await Todo.find();
        console.log('todos:\n', todos)
        if (!todos) {
            res.status(404).json({ status: 404, message: err });
            
          } else {
            res.status(200).send({ status: 200, data: todos })
          }
        
    } catch (error) {
        console.log('error 3:\n',error)
        next(error)
    }
  };

  async function createTodo(req, res, next) {
    const todo = new Todo({
        description: req.body.description,
        completed: req.body.completed,
    });

    try {
        await todo.save( (err, todo)=> {
           
              if (err) {
                res.status(404).json({ status: 404, message: err });
                
              } else {
                res.status(200).send({ status: 200, data: todo })
              }
        });
        
    } catch (error) {
        console.log('error 3\n:',error)
        next(error)
    }
  }

  
  module.exports = {
    getTodos,
    createTodo
  };  