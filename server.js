import express from 'express';
import fs from 'fs';
import EventEmitter from 'events';
import morgan from 'morgan';
import helmet from "helmet";
import path from 'path';
import cors from 'cors';
import * as dotenv from 'dotenv';
import mongooseConnect from './model/db/mongoose.js';

import { corsOptions } from './config/corsOptions.js';
import { logger } from './middleware/logEvents.js';
import { errorHandler } from './middleware/errorHandler.js';
import { rootRouter } from './routes/root.js';
import { employeesRouter } from './routes/api/employees.js';
import { topicsRouter } from './routes/api/topics.js';

const app = express();

// custom middleware logger
app.use(logger);
//app.use(helmet());
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

mongooseConnect()

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

class MyEmitter extends EventEmitter {
    any_data = {
        key: 'vale'
    };
    counter = 0;
    appStart() {
        this.counter++
        this.emit('start', this.any_data, this.counter);
    }
}

const myEmitter = new MyEmitter();

myEmitter.once('start', (any_data, couter) => {
    const PORT = 3700;
    console.log('myEmitter:',any_data, couter);
    app.listen(PORT, () => {
        // console.log(process.env)
        console.log(`Server running on port ${PORT}`)
    });
});

myEmitter.appStart();	// Yay it works!

