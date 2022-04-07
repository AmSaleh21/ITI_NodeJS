import { myLogger, MyStream } from './event-module.js';

const logger = new myLogger();
logger.on('data', data => console.log('Received data: ' + data));
logger.emit('data', 'with ES2015');

const stream = new MyStream();

stream.on('data', data => console.log(`Received data: "${data}"`));
stream.emit('data', 'with ES6');
