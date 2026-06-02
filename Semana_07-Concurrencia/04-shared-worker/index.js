const clientId = 'Cliente-' + Math.random().toString(36).substr(2, 9);
document.getElementById('clientId').textContent = clientId;

const worker = new SharedWorker('shared-worker.js');
const messagesDiv = document.getElementById('messages');

function addMessage(text, type = 'received') {
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}`;
    const timestamp = new Date().toLocaleTimeString();
    messageEl.textContent = `[${timestamp}] ${text}`;
    messagesDiv.insertBefore(messageEl, messagesDiv.firstChild);
}

worker.port.onmessage = function(e) {
    const data = e.data;
    
    console.log('Mensaje del worker:', data);
    
    if (data.type === 'connected') {
        addMessage(`✅ Conectado al Shared Worker. Conexiones: ${data.connections}, Mensajes: ${data.messageCount}`);
        document.getElementById('connections').textContent = data.connections;
        document.getElementById('messageCount').textContent = data.messageCount;
    } else if (data.type === 'count') {
        const fromText = data.from === clientId ? '(tú)' : `(${data.from})`;
        addMessage(`📊 Contador actualizado ${fromText}: ${data.count} mensajes, ${data.connections} conexiones`);
        document.getElementById('connections').textContent = data.connections;
        document.getElementById('messageCount').textContent = data.count;
    } else if (data.type === 'status') {
        addMessage(`ℹ️ Estado: ${data.messageCount} mensajes, ${data.connections} conexiones`);
        document.getElementById('connections').textContent = data.connections;
        document.getElementById('messageCount').textContent = data.messageCount;
    }
};

document.getElementById('incrementBtn').addEventListener('click', () => {
    worker.port.postMessage({
        type: 'increment',
        clientId: clientId
    });
    addMessage(`📤 Enviado: incrementar contador`, 'sent');
});

document.getElementById('statusBtn').addEventListener('click', () => {
    worker.port.postMessage({
        type: 'getStatus',
        clientId: clientId
    });
    addMessage(`📤 Enviado: solicitud de estado`, 'sent');
});

worker.port.start();

addMessage(`🚀 Cliente ${clientId} iniciado`);
