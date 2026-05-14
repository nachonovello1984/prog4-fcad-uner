# Ejemplo FindAll de Estudiantes

Este es un ejemplo funcional completo de la implementación del endpoint `GET /estudiantes` con toda la arquitectura en capas.

## Estructura del Proyecto

```
ejemplo/
├── routes.js                                    # Rutas de Express
├── controllers/
│   └── estudiantes.controller.js               # Controlador
├── services/
│   ├── estudiantes.service.js                  # Lógica de negocio
│   └── base.services.js                        # Servicio base con utilidades
├── repositories/
│   ├── estudiantes.repository.js               # Acceso a datos
│   └── database.js                             # Configuración de BD
├── dtos/
│   └── estudiante.response.dto.js              # DTO de respuesta
├── validators/
│   └── estudiantesFindAll.validation.js        # Validaciones
└── transforms/
    └── estudiantesFindAll.transform.js         # Transformaciones
```

## Flujo de Ejecución

1. **Ruta** (`routes.js`): Define el endpoint GET /estudiantes
2. **Middleware de Validación** (`estudiantesFindAll.validation.js`): Valida query params
3. **Middleware de Transformación** (`estudiantesFindAll.transform.js`): Transforma datos de entrada
4. **Controlador** (`estudiantes.controller.js`): Recibe la petición
5. **Servicio** (`estudiantes.service.js`): Procesa la lógica de negocio
6. **Repositorio** (`estudiantes.repository.js`): Consulta la base de datos
7. **DTO** (`estudiante.response.dto.js`): Formatea la respuesta

## Query Parameters Soportados

- `documento`: Filtro por documento (string)
- `apellido`: Filtro por apellido (string)
- `nombres`: Filtro por nombres (string)
- `email`: Filtro por email (string)
- `limit`: Cantidad de registros (integer)
- `offset`: Desplazamiento para paginación (integer)
- `order`: Campo para ordenar (documento, apellido, nombres, email)
- `asc`: Orden ascendente (true) o descendente (false)

## Ejemplo de Uso

```
GET /estudiantes?apellido=Garcia&limit=10&offset=0&order=apellido&asc=true
```

## Dependencias

- express
- express-validator
- pg (PostgreSQL)
