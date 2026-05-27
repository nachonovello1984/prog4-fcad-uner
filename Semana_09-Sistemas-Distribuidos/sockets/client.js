import net from 'net';

const HOST = process.env.HOST || '127.0.0.1';
const PORT = Number(process.env.PORT || 4000);

const client = net.createConnection({ host: HOST, port: PORT }, () => {
  console.log(`Conectado a ${HOST}:${PORT}`);
  client.write('hola servidor\n');
});

let buffer = '';
client.on('data', (chunk) => {
  buffer += chunk.toString('utf8');

  let idx;
  while ((idx = buffer.indexOf('\n')) !== -1) {
    const line = buffer.slice(0, idx).trim();
    buffer = buffer.slice(idx + 1);

    if (line.length === 0) continue;

    try {
      const msg = JSON.parse(line);
      console.log('Mensaje recibido (JSON):');
      console.dir(msg, { depth: null });
    } catch {
      console.log('Mensaje recibido (texto):', line);
    }
  }
});

client.on('close', () => {
  console.log('Conexión cerrada');
});

client.on('error', (err) => {
  console.error('Error del cliente:', err.message);
});
