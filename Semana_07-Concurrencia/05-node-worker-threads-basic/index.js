import { Worker } from 'worker_threads';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Hola estoy en index.js');

const worker = new Worker(join(__dirname, 'worker.js'));

worker.on('message', (msg) => {
    console.log('Mensaje recibido desde worker.js: ', msg);
});

worker.postMessage('Mensaje enviado a worker.js');

console.log('Fin de index.js');
