import CursosService from "../services/cursos.service.js";

class CursosController {
    constructor() {
        this.service = new CursosService();
    }

    findAll = async (req, res) => {
        try {
            const order = req.query.order || "idCurso";
            const asc = req.query.asc === "false" ? false : true;

            const data = await this.service.findAll(order, asc);

            res.send(data);
        } catch (error) {
            res.status(error?.status || 500).send({ status: "Fallo", data: { error: error?.message || error } });
        }
    };

}

export default CursosController;
