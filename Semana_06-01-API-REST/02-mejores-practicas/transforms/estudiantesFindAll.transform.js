const estudiantesFindAllTransform = (req, res, next) => {
    const { documento, apellido, nombres, email, order, asc, limit, offset } = req.query;

    req.criteria = {
        documento,
        apellido,
        nombres,
        email,
        order,
        // Si no se indica, el orden es ascendente.
        asc: asc !== 'false',
        // Si no se indica limit no hay paginación (null = sin límite).
        limit: limit ? Number(limit) : null,
        offset: offset ? Number(offset) : 0
    };

    next();
};

export default estudiantesFindAllTransform;
