import EstudiantesService from "../services/estudiantes.service.js";

export default class EstudiantesController {
    constructor() {
        this.service = new EstudiantesService();
    }

    async getAll(req, res) {
        try {

            const { filter, limit, offset, order} = req;
            const estudiantes = await this.service.getAll(filter, limit, offset, order);
            res.json(estudiantes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener los estudiantes' });
        }
    }
}
