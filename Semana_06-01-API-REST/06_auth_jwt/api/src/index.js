import express from "express";
import cors from "cors";
import morgan from 'morgan';

import v1Router from "./routes/v1/routes.js";

const app = express();

app.use(morgan('combined'));
app.use(express.json());

const corsOptions = {
    origin: ['http://localhost:5173'], // Dominio permitido
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/api/v1", v1Router);

app.listen(process.env.PORT, () => console.log(`Servidor iniciado en el puerto ${process.env.PORT}`))