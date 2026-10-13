import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    max: 10,
    idleTimeoutMillis: 30000,
});

export default class BdUtils {
    // Consulta simple: el pool toma y libera la conexión solo.
    static async query(sql, params) {
        return pool.query(sql, params);
    }

    // Solo para transacciones (BEGIN/COMMIT): quien la use debe hacer client.release().
    static async createConnection() {
        return await pool.connect();
    }
}
