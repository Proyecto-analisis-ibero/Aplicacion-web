const Estilista = require('../models/Estilista');
const { success, error, validateRequiredFields } = require('../helpers/helpers');

exports.getAllEstilistas = (req, res) => {
    Estilista.getAll((err, results) => {
        if (err) return error(res, "Error al obtener estilistas", 500, err);
        return success(res, "Lista de estilistas", results);
    });
};

exports.getEstilistaById = (req, res) => {
    const { id } = req.params;

    Estilista.getById(id, (err, results) => {
        if (err) return error(res, "Error al obtener estilista", 500, err);

        if (results.length === 0)
            return error(res, "Estilista no encontrado", 404);

        return success(res, "Estilista encontrado", results[0]);
    });
};

exports.createEstilista = (req, res) => {
    const required = ["nombre", "correo", "telefono", "disponibilidad"];
    const validationError = validateRequiredFields(required, req.body);
    if (validationError) return error(res, validationError, 400);

    Estilista.create(req.body, (err, results) => {
        if (err) return error(res, "Error al crear estilista", 500, err);

        return success(res, "Estilista creado", { id: results.insertId }, 201);
    });
};

exports.updateEstilista = (req, res) => {
    const { id } = req.params;

    Estilista.update(id, req.body, (err, results) => {
        if (err) return error(res, "Error al actualizar estilista", 500, err);

        if (results.affectedRows === 0)
            return error(res, "Estilista no encontrado", 404);

        return success(res, "Estilista actualizado");
    });
};

exports.deleteEstilista = (req, res) => {
    const { id } = req.params;

    Estilista.delete(id, (err, results) => {
        if (err) return error(res, "Error al eliminar estilista", 500, err);

        if (results.affectedRows === 0)
            return error(res, "Estilista no encontrado", 404);

        return success(res, "Estilista eliminado");
    });
};
