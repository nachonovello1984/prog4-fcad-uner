import { parentPort } from 'worker_threads';

console.log('Hola desde worker.js');

parentPort.on('message', (msg) => {
    console.log('Mensaje recibido desde index.js: ', msg);
    parentPort.postMessage('Mensaje enviado a index.js');
});
