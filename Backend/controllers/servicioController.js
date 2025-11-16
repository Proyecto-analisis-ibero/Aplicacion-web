const Servicio = require('../models/Servicio');
const { success, error, validateRequiredFields } = require('../helpers/helpers');

exports.getAllServicios = (req, res) => {
    Servicio.getAll((err, results) => {
        if (err) return error(res, "Error al obtener servicios", 500, err);
        return success(res, "Lista de servicios", results);
    });
};

exports.getServicioById = (req, res) => {
    const { id } = req.params;

    Servicio.getById(id, (err, results) => {
        if (err) return error(res, "Error al obtener servicio", 500, err);

        if (results.length === 0)
            return error(res, "Servicio no encontrado", 404);

        return success(res, "Servicio encontrado", results[0]);
    });
};

exports.createServicio = (req, res) => {
    const required = ["nombre_servicio", "duracion", "precio", "descripcion"];
    const validationError = validateRequiredFields(required, req.body);
    if (validationError) return error(res, validationError, 400);

    Servicio.create(req.body, (err, results) => {
        if (err) return error(res, "Error al crear servicio", 500, err);

        return success(res, "Servicio creado", { id: results.insertId }, 201);
    });
};

exports.updateServicio = (req, res) => {
    const { id } = req.params;

    Servicio.update(id, req.body, (err, results) => {
        if (err) return error(res, "Error al actualizar servicio", 500, err);

        if (results.affectedRows === 0)
            return error(res, "Servicio no encontrado", 404);

        return success(res, "Servicio actualizado");
    });
};

exports.deleteServicio = (req, res) => {
    const { id } = req.params;

    Servicio.delete(id, (err, results) => {
        if (err) return error(res, "Error al eliminar servicio", 500, err);

        if (results.affectedRows === 0)
            return error(res, "Servicio no encontrado", 404);

        return success(res, "Servicio eliminado");
    });
};

