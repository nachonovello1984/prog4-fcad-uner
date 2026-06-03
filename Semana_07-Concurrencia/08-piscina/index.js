import Piscina from 'piscina';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const piscina = new Piscina({
    filename: join(__dirname, 'worker.js'),
    minThreads: 2,
    maxThreads: 4
});

async function ejecutar() {
    console.time('total');

    const tareas = [
        piscina.run({ n: 40 }),
        piscina.run({ n: 41 }),
        piscina.run({ n: 42 }),
        piscina.run({ n: 43 })
    ];

    const resultados = await Promise.all(tareas);

    console.log(resultados);

    console.timeEnd('total');
}

ejecutar();