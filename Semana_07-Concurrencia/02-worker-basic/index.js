console.log('Hola estoy en index.js');
const worker = new Worker('worker.js');
worker.onmessage = (msg) => {
    console.log('Mensaje recibido desde worker.js: ', msg.data);
};
worker.postMessage('Mensaje enviado a worker.js');
console.log('Fin de index.js');