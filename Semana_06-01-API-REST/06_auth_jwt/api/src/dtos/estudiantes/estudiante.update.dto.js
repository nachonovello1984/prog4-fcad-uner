export default class EstudianteUpdateDto {
    constructor(obj) {
        this.documento = obj.documento;
        this.apellido = obj.apellido;
        this.nombres = obj.nombres;
        this.email = obj.email;
        this.fechaNacimiento = obj.fechaNacimiento;
        this.activo = obj.activo;
        this.idUsuarioModificacion = obj.idUsuarioModificacion;       
    }
};