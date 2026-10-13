import Curso from "../repositories/curso.repository.js";

class CursosService {
    constructor() {
        this.cursoDB = new Curso();
    }

    findAll = (order, asc) => {
        return this.cursoDB.findAll(order, asc);
    };

}

export default CursosService;
