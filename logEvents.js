import { format } from 'date-fns';
import { v4 as uuid } from "uuid";
import fs, { promises as fsPromises } from 'fs';
import path from 'path';

export const logEvents = async (message) => {
    let dateTime = `${format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')}`;
    let logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);

    try {
        if(!fs.existsSync(path.join(path.resolve(), 'logs')))
            await fsPromises.mkdir(path.join(path.resolve(), 'logs'))

        await fsPromises.appendFile(path.join(path.resolve(), 'logs', 'eventLog.txt'), logItem);
    } catch(err) {
        console.log(err)
    }
}


