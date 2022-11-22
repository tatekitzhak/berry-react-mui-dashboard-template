import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import * as dotenv from 'dotenv';
import mongooseConnect from './model/db/mongoose.js';

import { corsOptions } from './config/corsOptions.js';
import { logger } from './middleware/logEvents.js';
import {errorHandler} from './middleware/errorHandler.js';
import { rootRouter } from './routes/root.js';
import { employeesRouter } from './routes/api/employees.js';
import { topicsRouter } from './routes/api/topics.js';

const app = express();

// custom middleware logger
app.use(logger);

// custom middleware morgan logger

// create a write stream (in append mode)

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// const streamMorganLogger = fs.createWriteStream(path.join(path.resolve(), 'access.log'), { flags: 'a' })

app.use('/', express.static(path.join(path.resolve(), '/public')));


var accessLogStream = fs.createWriteStream(path.join(path.resolve(), 'access.log'), { flags: 'a' })
app.use(morgan('combined', { 
    stream: accessLogStream 
}))
// routes
app.use('/', rootRouter);



app.use('/explore', topicsRouter);

mongooseConnect()

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.send({ "error": "404 Not Found" });
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

const PORT = 3700;
app.listen(PORT, () => {
    // console.log(process.env)
    console.log(`Server running on port ${PORT}`)
});