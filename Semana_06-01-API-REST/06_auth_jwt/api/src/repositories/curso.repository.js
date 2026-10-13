import BdUtils from "./database.js"

const ORDER_COLUMNS = {
    idCurso: 'id_curso',
    nombre: 'nombre',
    fechaInicio: 'fecha_inicio'
};

class Curso {

    findAll = async (order = "idCurso", asc = true) => {
        const column = ORDER_COLUMNS[order] ?? 'id_curso';
        const direction = asc ? 'ASC' : 'DESC';

        const strSql = `SELECT c.id_curso AS "idCurso", c.nombre, c.descripcion, c.fecha_inicio AS "fechaInicio",
                               c.cantidad_horas AS "cantidadHoras", c.inscriptos_max AS "inscriptosMax",
                               c.id_curso_estado AS "idCursoEstado", ce.descripcion AS estado
                        FROM public.cursos c
                        INNER JOIN public.cursos_estados ce ON ce.id_curso_estado = c.id_curso_estado
                        WHERE ce.es_activo = 1
                        ORDER BY c.${column} ${direction}`;

        const { rows } = await BdUtils.query(strSql);
        return rows;
    };
}

export default Curso;
