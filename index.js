const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const mongooseConnection = require('./db/connection');
const { port } = require('./config/env');
const { AuthorsRouter, BooksRouter } = require('./routes/route')
const app = express();

app.use(morgan('combined'));
app.use(helmet()); // secure apps by setting various HTTP headers
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// open mongoose connection
mongooseConnection('index.js');


// app.use('/',(req,res,next)=>{
//     res.json({home_2:'home 2'})
//     next()
// });
app.use('/', require('./routes/route'));
// app.use('/books', todosRouter);  


/* Error handler middleware */

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.log('Error handler:\n',err.message, err.stack);
    res.status(statusCode).json({'message': err.message});
    
    return;
  });

app.listen(port, () => {
     console.log(`server started on http://localhost:${port} `) 
    });