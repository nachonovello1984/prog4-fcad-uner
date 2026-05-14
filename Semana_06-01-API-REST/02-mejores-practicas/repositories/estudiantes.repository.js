import BdUtils from "./database.js";

export default class EstudiantesRepository {

    async getAll(filter, limit, offset, order) {
        const client = await BdUtils.createConnection();

        let strWhere = ''
        let strOrder = ''
        let strLimit = ''
        let strOffset = ''

        if (filter && Object.keys(filter).length > 0) {
            Object.entries(filter).forEach(([key, value]) => {
                if (typeof value === 'string') {
                    strWhere += `AND ${key} LIKE '%${value}%'`
                } else {
                    strWhere += `AND ${key} = ${value}`
                }
            });
        }

        if (order && Object.keys(order).length > 0) {
            Object.entries(order).forEach(([key, value]) => {
                strOrder += `${key} ${value}, `
            });
            strOrder = `ORDER BY ${strOrder.slice(0, -2)} `
        }

        if (limit) {
            strLimit = `LIMIT ${limit} `
        }

        if (offset) {
            strOffset = `OFFSET ${offset} `
        }

        const { rows } = await client.query(`
            SELECT  id_estudiante, 
                    documento, 
                    apellido, 
                    nombres, 
                    email, 
                    fecha_nacimiento, 
                    activo, 
                    id_usuario_modificacion, 
                    fecha_hora_modificacion 
            FROM public.estudiantes
            WHERE activo = 1
            ${strWhere}
            ${strOrder}
            ${strLimit}
            ${strOffset};
        `);
        client.release();
        return rows;
    }
}
