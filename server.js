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
appEmitter.on('log', (msg, fileName) => logEvents(msg, fileName))

const PORT = 3500;

const serveFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fsPromises.readFile(
            filePath,
            !contentType.includes('image') ? 'utf8' : ''
        );
        const data = contentType === 'application/json'
            ? JSON.parse(rawData) : rawData;
        response.writeHead(
            filePath.includes('404.html') ? 404 : 200,
            { 'Content-Type': contentType }
        );
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );
    } catch (error) {
        appEmitter.emit('log', `${error.name}: ${error.message}`, 'errLog.txt');
        console.log('error:', error);
        response.statusCode = 500;
        response.end();
    }
}

const server = http.createServer((req, res) => {
    console.log('req.url:', req.url, 'req.method:', req.method);
    appEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');
    const extension = path.extname(req.url);

    let contentType;
    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }

    console.log('contentType:', contentType)

    let filePath =
        contentType === 'text/html' && req.url === '/'
            ? path.join(path.resolve(), 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(path.resolve(), 'views', req.url, 'index.html')
                : contentType === 'text/html'
                    ? path.join(path.resolve(), 'views', req.url)
                    : path.join(path.resolve(), req.url);

    // makes .html extension not required in the browser
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';
    console.log('path :', filePath)
    const fileExists = fs.existsSync(filePath);
    if (fileExists) {
        serveFile(filePath, contentType, res);
    } else {
        switch (path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, { 'Location': '/new-page.html' });
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, { 'Location': '/' });
                res.end();
                break;
            default:
                serveFile(path.join(path.resolve(), 'views', '404.html'), 'text/html', res);
        }
        console.log('path parse:', path.parse(filePath))
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});