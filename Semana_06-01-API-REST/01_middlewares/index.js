import express from "express";

//Middleware alternativa 1: Si el middleware detecta un error, responde directamente al cliente con un mensaje de error y no llama a next().
const middlewareControlNombre1 = (req, res, next) => {
  const nombre = req.query.nombre;
  if (!nombre) {
    res.status(400).json({ error: 'Falta el parámetro nombre' });
  } else {
    req.nombreProcesado = req.query.nombre.trim();
    next();
  }
};

//Middleware alternativa 2: Si el middleware detecta un error, llama a next() pasando un objeto de error. Esto hace que Express salte al siguiente middleware de manejo de errores definido en la aplicación.
const middlewareControlNombre2 = (req, res, next) => {
  const nombre = req.query.nombre;
  if (!nombre) {
    next(new Error('Falta el parámetro nombre'));
  } else {
    next();
  }
};

const app = express();

app.use((req, res, next) => {
  console.log(`Petición: ${req.method} ${req.url}`);
  next(); // sin esto, la petición no avanza
});

// Ruta
app.get('/', (_, res) => {
  res.json({ mensaje: `Hola mundo!` });
});


app.get('/saludar-con-middleware1', middlewareControlNombre1, (req, res) => {
  const nombre = req.query.nombre;
  res.json({ mensaje: `Hola ${nombre} pasó el filtro del middleware 1` });
});

app.get('/saludar-con-middleware2', middlewareControlNombre2, (req, res) => {
  const nombre = req.query.nombre;
  res.json({ mensaje: `Hola ${nombre} pasó el filtro del middleware 2` });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(process.env.PORT, () => console.log(`Servidor iniciado en el puerto ${process.env.PORT}`))

