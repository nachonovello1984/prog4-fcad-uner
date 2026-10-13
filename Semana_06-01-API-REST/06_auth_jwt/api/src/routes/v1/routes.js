import express from "express";

import authenticate from "../../middlewares/authenticate.js";
import v1AuthRouter from "./auth.routes.js";
import v1EstudiantesRouter from "./estudiantes.routes.js";
import v1CursosRouter from "./cursos.routes.js";

const router = express.Router();

router.use(v1AuthRouter);
router.use(v1EstudiantesRouter);
router.use(authenticate, v1CursosRouter);

export default router;
