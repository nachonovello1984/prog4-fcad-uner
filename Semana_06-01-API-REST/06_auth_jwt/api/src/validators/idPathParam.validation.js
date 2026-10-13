const validateIdPathParam = (req, res, next) => {
    const id = req.params.id;
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }
    next();
}

export default validateIdPathParam;