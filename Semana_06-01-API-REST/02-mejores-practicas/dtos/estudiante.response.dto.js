export default class EstudianteResponseDTO {
    constructor(estudiante) {
        this.idEstudiante = estudiante.id_estudiante;
        this.documento = estudiante.documento;
        this.apellido = estudiante.apellido;
        this.nombres = estudiante.nombres;
        this.email = estudiante.email;
        this.fechaNacimiento = estudiante.fecha_nacimiento;
        this.activo = estudiante.activo;
        this.idUsuarioModificacion = estudiante.id_usuario_modificacion;
        this.fechaHoraModificacion = estudiante.fecha_hora_modificacion;
    }
}
