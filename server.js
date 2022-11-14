import http from 'http';
import fs, { promises as fsPromises } from 'fs';
import path from 'path';
import EventEmitter from 'events';
// Log Events
import { logEvents } from './logEvents.js';

// Build log events instance
class Emitter extends EventEmitter { };
const appEmitter = new Emitter();

// Add listener for the log event 
appEmitter.on('log', (msg) => logEvents(msg))
setTimeout(() => {
    appEmitter.emit('log', 'Log event emitted.')
}, 2000);

const PORT = 3500;

const server = http.createServer((req, res) => {
    console.log('http:', req.url, req.method);
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`)
});