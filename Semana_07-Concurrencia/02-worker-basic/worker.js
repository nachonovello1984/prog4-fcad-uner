console.log('Hola desde worker.js');
self.onmessage = (msg) => {
    console.log('Mensaje recibido desde index.js: ', msg.data);
    postMessage('Mensaje enviado a index.js');
}