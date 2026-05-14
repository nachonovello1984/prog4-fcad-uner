import express from 'express';
const app = express();
const port = 3004;


app.use(express.json());

const cursos = [
    {
        idCurso: 1,
        nombre: "Programación Web con React",
        descripcion: "Desarrollo de aplicaciones web modernas utilizando JavaScript, React y consumo de APIs REST.",
        fechaInicio: "2026-04-20T03:00:00.000Z",
        cantidadHoras: 60,
        inscriptosMax: 30,
        estado: "BORRADOR"
    },
    {
        idCurso: 2,
        nombre: "Introducción a la Inteligencia Artificial",
        descripcion: "Conceptos básicos de inteligencia artificial, machine learning y aplicaciones prácticas con Python.",
        fechaInicio: "2026-05-05T03:00:00.000Z",
        cantidadHoras: 50,
        inscriptosMax: 25,
        estado: "BORRADOR"
    },
    {
        idCurso: 3,
        nombre: "Seguridad Informática y Ethical Hacking",
        descripcion: "Fundamentos de ciberseguridad, análisis de vulnerabilidades y técnicas de hacking ético.",
        fechaInicio: "2026-05-10T03:00:00.000Z",
        cantidadHoras: 70,
        inscriptosMax: 20,
        estado: "BORRADOR"
    },
    {
        idCurso: 4,
        nombre: "Bases de Datos SQL y NoSQL",
        descripcion: "Diseño, consulta y optimización de bases de datos relacionales y no relacionales.",
        fechaInicio: "2026-04-25T03:00:00.000Z",
        cantidadHoras: 55,
        inscriptosMax: 35,
        estado: "BORRADOR"
    },
    {
        idCurso: 5,
        nombre: "Desarrollo Backend con Node.js y NestJS",
        descripcion: "Construcción de APIs robustas utilizando Node.js, NestJS y bases de datos SQL.",
        fechaInicio: "2026-05-15T03:00:00.000Z",
        cantidadHoras: 65,
        inscriptosMax: 30,
        estado: "BORRADOR",
    }
];

app.get('/', (req, res) => {
    res.json(cursos);
});

app.get('/cursos', (req, res) => {
    res.json(cursos);
});

app.get('/cursos/:id', (req, res) => {
    const idCurso = parseInt(req.params.id);
    const curso = cursos.find(c => c.idCurso === idCurso);
    if (curso) {
        res.json(curso);
    } else {
        res.status(404).json({ error: 'Curso no encontrado' });
    }
});

app.post('/cursos/', (req, res) => {
    const nuevoCurso = req.body;
    cursos.push(nuevoCurso);
    console.log('cursos:', cursos);
    res.status(201).json(nuevoCurso);
});

app.listen(port, () => console.log(`Servidor API Rest iniciado en http://localhost:${port}`));