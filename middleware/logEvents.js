import { format } from 'date-fns';

import { v4 as uuid } from "uuid"; //const { v4: uuid } = require('uuid');

import fs, { promises as fsPromises } from 'fs';
import path from 'path';

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(path.resolve(), '..', 'logs'))) {
            await fsPromises.mkdir(path.join(path.resolve(), '..', 'logs'));
        }

        await fsPromises.appendFile(path.join(path.resolve(), '..', 'logs', logName), logItem);
    } catch (err) {
        console.log('logEvents err:',err);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log('logger:', req.method, req.path);
    next();
}

export { logger, logEvents }
