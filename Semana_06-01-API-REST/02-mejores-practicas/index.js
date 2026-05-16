import express from 'express';
import cors from 'cors';
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import routerV2 from './routes/v2/routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

const corsOptions = {
    origin: ['http://localhost:5500'], // Dominio permitido
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Mejores prácticas',
            version: '1.0.0',
            description: 'Mejores prácticas: DTO, Paginación, Filtrado y Ordenación',
        },
        servers: [ { url: `http://localhost:${process.env.PORT || 3000}` } ],
    },
    apis: ['./routes/v2/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api', routerV2);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});