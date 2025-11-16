const Cita = require('../models/Cita');
const { success, error, validateRequiredFields } = require('../helpers/helpers');

exports.getAllCitas = (req, res) => {
    Cita.getAll((err, results) => {
        if (err) return error(res, "Error al obtener citas", 500, err);
        return success(res, "Lista de citas", results);
    });
};

exports.getCitaById = (req, res) => {
    const { id } = req.params;

    Cita.getById(id, (err, results) => {
        if (err) return error(res, "Error al obtener cita", 500, err);

        if (results.length === 0)
            return error(res, "Cita no encontrada", 404);

        return success(res, "Cita encontrada", results[0]);
    });
};

exports.createCita = (req, res) => {
    const required = ["fecha", "hora", "estado", "observaciones", "id_cliente", "id_estilista", "id_servicio"];
    const validationError = validateRequiredFields(required, req.body);
    if (validationError) return error(res, validationError, 400);

    Cita.create(req.body, (err, results) => {
        if (err) return error(res, "Error al crear cita", 500, err);

        return success(res, "Cita creada", { id: results.insertId }, 201);
    });
};

exports.updateCita = (req, res) => {
    const { id } = req.params;

    Cita.update(id, req.body, (err, results) => {
        if (err) return error(res, "Error al actualizar cita", 500, err);

        if (results.affectedRows === 0)
            return error(res, "Cita no encontrada", 404);

        return success(res, "Cita actualizada correctamente");
    });
};

exports.deleteCita = (req, res) => {
    const { id } = req.params;

    Cita.delete(id, (err, results) => {
        if (err) return error(res, "Error al eliminar cita", 500, err);

        if (results.affectedRows === 0)
            return error(res, "Cita no encontrada", 404);

        return success(res, "Cita eliminada correctamente");
    });
};
