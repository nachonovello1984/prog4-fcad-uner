let connections = [];
let messageCount = 0;

self.onconnect = function(e) {
    const port = e.ports[0];
    connections.push(port);
    
    console.log('Nueva conexión establecida. Total de conexiones:', connections.length);
    
    port.onmessage = function(event) {
        messageCount++;
        const data = event.data;
        
        console.log('Mensaje recibido:', data);
        
        if (data.type === 'increment') {
            const response = {
                type: 'count',
                count: messageCount,
                connections: connections.length,
                from: data.clientId
            };
            
            connections.forEach(conn => {
                conn.postMessage(response);
            });
        } else if (data.type === 'getStatus') {
            port.postMessage({
                type: 'status',
                messageCount: messageCount,
                connections: connections.length
            });
        }
    };
    
    port.start();
    
    port.postMessage({
        type: 'connected',
        connections: connections.length,
        messageCount: messageCount
    });
};
