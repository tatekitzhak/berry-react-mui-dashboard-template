import { format } from 'date-fns';
import { v4 as uuid } from "uuid";
import fs, { promises as fsPromises } from 'fs';
import path from 'path';

export const logEvents = async (message, logName) => {

    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log('logItem:', logItem);

    try {
        if (!fs.existsSync(path.join(path.resolve(), 'logs'))) {
            await fsPromises.mkdir(path.join(path.resolve(), 'logs'));
        }

        await fsPromises.appendFile(path.join(path.resolve(), 'logs', logName), logItem);

    } catch (error) {
        console.log('error logEvents:', error)
    }
}


