import { v4 as uuid } from "uuid";

const tasks = [
    { id: 1, title: 'Create a project',  order: 1, completed: true, createdOn: new Date() },
    { id: 2, title: 'Take a cofféé',     order: 2, completed: true, createdOn: new Date() },
    { id: 3, title: 'Write new article', order: 3, completed: true, createdOn: new Date() },
    { id: uuid(), title: 'Walk toward home', order: 4, completed: false, createdOn: new Date() },
    { id: uuid(), title: 'Have some dinner', order: 5, completed: false, createdOn: new Date() },
];


export function getTasksList(req, res) {
    res.status(200).json(tasks);
};

export function getTaskById(req, res) {

    let found = tasks.find( item => {
        return item.id === parseInt(req.params.id)
    })  

    if(found)
        res.status(200).json(found)
    else
        res.sendStatus(404);
};

export function addNewTask(req, res) {
    console.log('addNewTask:',req.body)

    // create an object of new Item
    let newItem = {
        id: uuid(), // generated in above step
        title: req.body.title, // value of `title` get from POST req
        order: req.body.order, // generated in above step
        completed: req.body.completed, // default value is set to false
        createdOn: new Date() // new date object
    };

    // push new item object to data array of items
    tasks.push(newItem);
    console.log('addNewTask:',newItem)
    res.status(201).json(newItem);
}