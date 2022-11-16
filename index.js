//https://www.youtube.com/watch?v=AZDTM0DiLG8&list=PLYQSCk-qyTW2ewJ05f_GKHtTIzjynDgjK&index=4&ab_channel=ZachGollwitzer
import express from "express";
const app = express();

function middlweare1(req, res, next) {
    console.log('1st middlweare');
    const errobj = new Error('I am an error');
    next(errobj);
}
function middlweare(req, res, next) {
    console.log('1nd middlweare: ');
    req.customProperty = 100;
    next();
}
function middlweare2(req, res, next) {
    console.log(`2nd middlweare ${req.customProperty}`);
    req.customProperty = 500;
    next();
}
// app.use(middlweare1, middlweare2);
// app.use(errorHandlingMiddlewareFunction);

const users = [
    {
        id: 1,
        firstName: 'Ran',
        lastName: 'Itzhak'
    },
    {
        id: 2,
        firstName: 'Maayan',
        lastName: 'Itzhak'
    },
    {
        id: 3,
        firstName: 'Rachale',
        lastName: 'Itzhak'
    },
];

function loadUser(req, res, next) {

    if (req.params.id) {
        const user = users.filter(user => user.id == req.params.id);

        if (!user.length) {
            next(new Error("Couldn't find user: "));
            return;
        }
        req.userData = user;
        next();
    } else {
        next(new Error("Couldn't find user: "));
    }
    next();
}

function errorHandlingMiddlewareFunction(error, request, res, next) {

    if (error) {
        
        res.send({ errorMessage: error })
    }

    next();
}

function logOriginalUrl (req, res, next) {
    console.log('Request URL:', req.originalUrl)
    next()
  } 
  
  function logMethod(req, res, next) {
    console.log('Request Type:', req.method)
    next()
  }
  
  var logStuff = [logOriginalUrl, logMethod];
  
  app.get('/user/:id', logStuff, function (req, res, next) {
    res.send('User Info')
  })

app.listen(3700, (error) => {
    console.log(`Server is listening on port: http://loclalhost:3700`)
});
app.use(errorHandlingMiddlewareFunction)
