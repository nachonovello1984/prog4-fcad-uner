const estudiantesFindAllTransform = (req, res, next) => {
    req.limit = req.query.limit ? Number(req.query.limit) : 0;
    req.offset = req.query.offset ? Number(req.query.offset) : 0;

    const filterObj = {};
    const orderObj = {idEstudiante : "ASC"};

    const { documento, apellido, nombres, email, order } = req.query;

    if (documento) filterObj.documento = documento;
    if (apellido) filterObj.apellido = apellido;
    if (nombres) filterObj.nombres = nombres;
    if (email) filterObj.email = email;
    if (order) orderObj[order] = req.query.asc === "true" ? "ASC" : "DESC";

    req.filter = filterObj;
    req.order = orderObj;

    next();
};

export default estudiantesFindAllTransform;
