export default class CursoResponseDTO {
    constructor(curso) {
        this.idCurso = curso.idCurso;
        this.nombre = curso.nombre;
        this.descripcion = curso.descripcion;
        this.fechaInicio = curso.fechaInicio;
        this.cantidadHoras = curso.cantidadHoras;
        this.inscriptosMax = curso.inscriptosMax;
        this.idCursoEstado = curso.idCursoEstado;
        this.estado = curso.estado;
    }
}
