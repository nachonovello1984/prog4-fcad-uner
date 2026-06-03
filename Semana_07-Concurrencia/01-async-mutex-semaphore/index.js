import express from 'express';
import { Semaphore } from 'async-mutex';

const semaforo = new Semaphore(3);
const app = express();
const port = 3000;


app.get('/procesar', async (req, res) => {

    const [value, release] = await semaforo.acquire();

    try {

        console.log('Inicia proceso');

        await new Promise(resolve =>
            setTimeout(resolve, 5000)
        );

        res.json({
            mensaje: 'Proceso completado'
        });

    } finally {
        release();
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
