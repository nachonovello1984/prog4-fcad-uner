import net from 'net';
import readline from 'node:readline';

const HOST = process.env.HOST ?? '127.0.0.1';
const PORT = Number(process.env.PORT ?? 4000);

const socket = net.createConnection({ host: HOST, port: PORT });

let buffer = '';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer));
  });
}

function sendRequest(obj) {
  socket.write(`${JSON.stringify(obj)}\n`);
}

async function menuLoop() {
  while (true) {
    const opt = (await ask('1) Listar automóviles\n2) Buscar por id\n0) Salir\n> ')).trim();

    if (opt === '0') {
      rl.close();
      socket.end();
      return;
    }

    if (opt === '1') {
      sendRequest({ action: 'list' });
      continue;
    }

    if (opt === '2') {
      const idStr = (await ask('Ingresá el id: ')).trim();
      const id = Number(idStr);
      sendRequest({ action: 'getById', id });
      continue;
    }

    console.log('Opción inválida.');
  }
}

socket.setEncoding('utf8');

socket.on('connect', () => {
  console.log(`Connected to ${HOST}:${PORT}`);
  menuLoop().catch((err) => {
    console.error('Menu error:', err.message);
    process.exitCode = 1;
    rl.close();
    socket.end();
  });
});

socket.on('data', (chunk) => {
  buffer += chunk;

  const lines = buffer.split('\n');
  buffer = lines.pop() ?? '';

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    try {
      const msg = JSON.parse(trimmed);
      console.log('Received message:');
      console.log(JSON.stringify(msg, null, 2));
    } catch {
      console.error('Could not parse JSON from server. Raw line:');
      console.error(trimmed);
    }
  }
});

socket.on('end', () => {
  rl.close();
  console.log('Disconnected from server.');
});

socket.on('error', (err) => {
  console.error('Client socket error:', err.message);
  process.exitCode = 1;
  rl.close();
});
