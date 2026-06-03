import express from 'express';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();
const app = express();
const port = 3000;

let contador = 0;

app.post('/incrementar', async function incrementar(req, res) {

    await mutex.runExclusive(async () => {

        const valorActual = contador;

        await new Promise(resolve =>
            setTimeout(resolve, 1000)
        );

        contador = valorActual + 1;
    });

    res.json({ contador });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
