export default class EstudianteCreateDto {
    constructor(obj) {
        this.documento = obj.documento;
        this.apellido = obj.apellido;
        this.nombres = obj.nombres;
        this.email = obj.email;
        this.fechaNacimiento = obj.fechaNacimiento;
        this.activo = 1;
        this.idUsuarioModificacion = 1;       
    }
};