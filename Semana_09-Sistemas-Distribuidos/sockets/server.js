import net from 'net';
import automoviles from './automoviles.js';

const HOST = process.env.HOST || '127.0.0.1';
const PORT = Number(process.env.PORT || 4000);

const server = net.createServer((socket) => {
  const remote = `${socket.remoteAddress}:${socket.remotePort}`;
  console.log(`Cliente conectado: ${remote}`);

  const payload = {
    ok: true,
    tipo: 'automoviles',
    data: automoviles,
    ts: new Date().toISOString(),
  };

  socket.write(`${JSON.stringify(payload)}\n`);

  socket.on('data', (chunk) => {
    const msg = chunk.toString('utf8').trim();
    if (msg.length > 0) {
      console.log(`Mensaje del cliente (${remote}): ${msg}`);
    }
  });

  socket.on('close', () => {
    console.log(`Cliente desconectado: ${remote}`);
  });

  socket.on('error', (err) => {
    console.error(`Error de socket (${remote}):`, err.message);
  });
});

server.on('error', (err) => {
  console.error('Error del servidor:', err.message);
  process.exitCode = 1;
});

server.listen(PORT, HOST, () => {
  console.log(`Servidor TCP escuchando en ${HOST}:${PORT}`);
});
