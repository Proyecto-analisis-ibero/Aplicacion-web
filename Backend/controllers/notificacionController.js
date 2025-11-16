const Notificacion = require('../models/Notificacion');
const { success, error, validateRequiredFields } = require('../helpers/helpers');

exports.getAllNotificaciones = (req, res) => {
    Notificacion.getAll((err, results) => {
        if (err) return error(res, "Error al obtener notificaciones", 500, err);
        return success(res, "Lista de notificaciones", results);
    });
};

exports.getNotificacionById = (req, res) => {
    const { id } = req.params;

    Notificacion.getById(id, (err, results) => {
        if (err) return error(res, "Error al obtener notificación", 500, err);

        if (results.length === 0)
            return error(res, "Notificación no encontrada", 404);

        return success(res, "Notificación encontrada", results[0]);
    });
};

exports.createNotificacion = (req, res) => {
    const required = ["tipo", "mensaje", "id_cita"];
    const validationError = validateRequiredFields(required, req.body);
    if (validationError) return error(res, validationError, 400);

    Notificacion.create(req.body, (err, results) => {
        if (err) return error(res, "Error al crear notificación", 500, err);

        return success(res, "Notificación creada", { id: results.insertId }, 201);
    });
};

exports.updateNotificacion = (req, res) => {
    const { id } = req.params;

    Notificacion.update(id, req.body, (err, results) => {
        if (err) return error(res, "Error al actualizar notificación", 500, err);

        if (results.affectedRows === 0)
            return error(res, "Notificación no encontrada", 404); 

        return success(res, "Notificación actualizada");
    });
};

exports.deleteNotificacion = (req, res) => {
    const { id } = req.params;

    Notificacion.delete(id, (err, results) => {
        if (err) return error(res, "Error al eliminar notificación", 500, err);

        if (results.affectedRows === 0)
            return error(res, "Notificación no encontrada", 404);

        return success(res, "Notificación eliminada");
    });
};

