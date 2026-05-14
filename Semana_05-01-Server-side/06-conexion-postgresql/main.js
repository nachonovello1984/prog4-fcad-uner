import { Client } from 'pg';

const main = async () => {
    const client = new Client({
        host: process.env.PGHOST || 'localhost',
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || '',
        database: process.env.PGDATABASE || 'fcad_cursos',
    });

    try {
        await client.connect();
        const result = await client.query('SELECT * FROM public.cursos');
        result.rows.forEach(row => {
            console.log(row);
        });
    } catch (err) {
        console.error('Error consultando PostgreSQL:', err);
        process.exitCode = 1;
    } finally {
        try {
            await client.end();
        } catch {

        }
    }
}

main();

