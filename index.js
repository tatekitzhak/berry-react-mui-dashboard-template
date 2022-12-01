const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const mongooseConnect = require('./config/mongoose');
const { port } = require('./config/varsenv');
const rootRouter = require('./routes/root')
const topicsRouter = require('./routes/api/topics')
const todosRouter = require('./routes/api/todos');
const app = express();
const router = express.Router()

app.use(morgan('combined'));
app.use(helmet()); // secure apps by setting various HTTP headers
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// open mongoose connection
mongooseConnect();

router.use((req,res,next)=>{
    res.json({kay:'pp'})
    next()
})

app.use('/',rootRouter);
app.use('/topics', topicsRouter);
app.use('/todos', todosRouter);  


// listen to requests
app.listen(port, () => {
     console.log(`server started on http://localhost:${port} `) 
    });