import BdUtils from "./database.js";

export default class EstudiantesRepository {

    static COLUMNS = `id_estudiante, documento, apellido, nombres, email,
                    fecha_nacimiento, activo, id_usuario_modificacion, fecha_hora_modificacion`;

    static ALLOWED_COLUMNS = ['id_estudiante', 'documento', 'apellido', 'nombres', 'email', 'fecha_nacimiento', 'activo', 'id_usuario_modificacion'];
    static ORDER_COLUMNS = {
        idEstudiante: 'id_estudiante',
        documento: 'documento',
        apellido: 'apellido',
        nombres: 'nombres',
        email: 'email'
    };

    // Lista los estudiantes activos. Los filtros no enviados se ignoran (ILIKE por texto contenido).
    // Los valores van como parámetros; la columna de orden sale de un mapa fijo. limit null = sin límite.
    async getAll({ documento, apellido, nombres, email, order = 'idEstudiante', asc = true, limit = null, offset = 0 }) {
        const column = EstudiantesRepository.ORDER_COLUMNS[order] ?? 'id_estudiante';
        const direction = asc ? 'ASC' : 'DESC';

        const { rows } = await BdUtils.query(`
            SELECT ${EstudiantesRepository.COLUMNS}
            FROM public.estudiantes
            WHERE activo = 1
              AND ($1::text IS NULL OR documento ILIKE '%' || $1 || '%')
              AND ($2::text IS NULL OR apellido  ILIKE '%' || $2 || '%')
              AND ($3::text IS NULL OR nombres   ILIKE '%' || $3 || '%')
              AND ($4::text IS NULL OR email     ILIKE '%' || $4 || '%')
            ORDER BY ${column} ${direction}
            LIMIT $5 OFFSET $6`,
            [documento ?? null, apellido ?? null, nombres ?? null, email ?? null, limit, offset]
        );
        return rows;
    }

    // Cantidad de estudiantes activos que cumplen los filtros (ignora orden y paginación).
    // Sin filtros devuelve el total general.
    async count({ documento, apellido, nombres, email } = {}) {
        const { rows } = await BdUtils.query(`
            SELECT COUNT(*) FROM public.estudiantes
            WHERE activo = 1
              AND ($1::text IS NULL OR documento ILIKE '%' || $1 || '%')
              AND ($2::text IS NULL OR apellido  ILIKE '%' || $2 || '%')
              AND ($3::text IS NULL OR nombres   ILIKE '%' || $3 || '%')
              AND ($4::text IS NULL OR email     ILIKE '%' || $4 || '%')`,
            [documento ?? null, apellido ?? null, nombres ?? null, email ?? null]
        );
        return Number(rows[0].count);
    }

    // Busca un estudiante activo por id. Devuelve null si no existe.
    async getById(id) {
        const { rows } = await BdUtils.query(
            `SELECT ${EstudiantesRepository.COLUMNS} FROM public.estudiantes WHERE id_estudiante = $1 AND activo = 1`,
            [id]
        );
        return rows[0] ?? null;
    }

    // Busca un estudiante activo por documento, opcionalmente excluyendo un id (para updates). Devuelve null si no existe.
    async getByDocumento(documento, excluirId = null) {
        const { rows } = await BdUtils.query(
            `SELECT ${EstudiantesRepository.COLUMNS} FROM public.estudiantes
             WHERE documento = $1 AND activo = 1 AND ($2::int IS NULL OR id_estudiante <> $2)`,
            [documento, excluirId]
        );
        return rows[0] ?? null;
    }

    // Inserta un estudiante activo (usuario de modificación fijo en 1) y devuelve el registro creado.
    async create(data) {
        const { rows } = await BdUtils.query(
            `INSERT INTO public.estudiantes
                (documento, apellido, nombres, email, fecha_nacimiento, activo, id_usuario_modificacion, fecha_hora_modificacion)
             VALUES ($1, $2, $3, $4, $5, 1, $6, NOW())
             RETURNING ${EstudiantesRepository.COLUMNS}`,
            [data.documento, data.apellido, data.nombres, data.email, data.fecha_nacimiento, 1]
        );
        return rows[0];
    }

    // Actualiza solo las columnas recibidas (sirve para PUT y PATCH). 
    // Devuelve null si no existe.
    async update(id, data) {
        const sets = [];
        const values = [];
        Object.entries(data).forEach(([column, value]) => {
            if (!EstudiantesRepository.ALLOWED_COLUMNS.includes(column)) {
                throw new Error(`Columna no permitida: ${column}`);
            }
            values.push(value);
            sets.push(`${column} = $${values.length}`);
        });
        sets.push('fecha_hora_modificacion = NOW()');
        values.push(id);

        const { rows } = await BdUtils.query(
            `UPDATE public.estudiantes
             SET ${sets.join(', ')}
             WHERE id_estudiante = $${values.length} AND activo = 1
             RETURNING ${EstudiantesRepository.COLUMNS}`,
            values
        );
        return rows[0] ?? null;
    }

    // Baja lógica. Devuelve true si se dió de baja algún registro.
    async destroy(id) {
        const { rowCount } = await BdUtils.query(
            `UPDATE public.estudiantes
             SET activo = 0, id_usuario_modificacion = $2, fecha_hora_modificacion = NOW()
             WHERE id_estudiante = $1 AND activo = 1`,
            [id, 1]
        );
        return rowCount > 0;
    }
}
