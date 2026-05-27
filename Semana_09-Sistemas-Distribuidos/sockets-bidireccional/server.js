import net from 'net';
import automoviles from './automoviles.js';

const HOST = process.env.HOST ?? '127.0.0.1';
const PORT = Number(process.env.PORT ?? 4000);

function sendJsonLine(socket, obj) {
  socket.write(`${JSON.stringify(obj)}\n`);
}

const server = net.createServer((socket) => {
  socket.setEncoding('utf8');

  let buffer = '';

  socket.on('data', (chunk) => {
    buffer += chunk;

    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      let req;
      try {
        req = JSON.parse(trimmed);
      } catch {
        sendJsonLine(socket, {
          ok: false,
          error: 'INVALID_JSON',
          message: 'El request debe ser JSON válido y terminar con \"\\n\"',
          timestamp: new Date().toISOString(),
        });
        continue;
      }

      if (req?.action === 'list') {
        sendJsonLine(socket, {
          ok: true,
          data: automoviles,
          count: Array.isArray(automoviles) ? automoviles.length : undefined,
          timestamp: new Date().toISOString(),
        });
        continue;
      }

      if (req?.action === 'getById') {
        const id = Number(req?.id);
        const found = Array.isArray(automoviles)
          ? automoviles.find((a) => Number(a?.id) === id)
          : undefined;

        if (!Number.isFinite(id)) {
          sendJsonLine(socket, {
            ok: false,
            error: 'INVALID_ID',
            message: 'El campo id debe ser numérico',
            timestamp: new Date().toISOString(),
          });
          continue;
        }

        if (!found) {
          sendJsonLine(socket, {
            ok: false,
            error: 'NOT_FOUND',
            message: `No existe automóvil con id ${id}`,
            timestamp: new Date().toISOString(),
          });
          continue;
        }

        sendJsonLine(socket, {
          ok: true,
          data: found,
          timestamp: new Date().toISOString(),
        });
        continue;
      }

      sendJsonLine(socket, {
        ok: false,
        error: 'UNKNOWN_ACTION',
        message: 'Acción no soportada. Usar: list | getById',
        timestamp: new Date().toISOString(),
      });
    }
  });

  socket.on('error', (err) => {
    console.error('Socket error:', err.message);
  });
});

server.on('error', (err) => {
  console.error('Server error:', err.message);
  process.exitCode = 1;
});

server.listen(PORT, HOST, () => {
  console.log(`TCP socket server listening on ${HOST}:${PORT}`);
});
