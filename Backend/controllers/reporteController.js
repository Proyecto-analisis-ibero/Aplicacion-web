const Reporte = require('../models/Reporte');
const { success, error, validateRequiredFields } = require('../helpers/helpers');

exports.getAllReportes = (req, res) => {
    Reporte.getAll((err, results) => {
        if (err) return error(res, "Error al obtener reportes", 500, err);
        return success(res, "Lista de reportes", results);
    });
};

exports.getReporteById = (req, res) => {
    const { id } = req.params;

    Reporte.getById(id, (err, results) => {
        if (err) return error(res, "Error al obtener reporte", 500, err);

        if (results.length === 0)
            return error(res, "Reporte no encontrado", 404);

        return success(res, "Reporte encontrado", results[0]);
    });
};

exports.createReporte = (req, res) => {
    const required = ["tipo_reporte", "datos", "id_estilista", "id_admin"];
    const validationError = validateRequiredFields(required, req.body);
    if (validationError) return error(res, validationError, 400);

    Reporte.create(req.body, (err, results) => {
        if (err) return error(res, "Error al crear reporte", 500, err);

        return success(res, "Reporte creado", { id: results.insertId }, 201);
    });
};

exports.updateReporte = (req, res) => {
    const { id } = req.params;

    Reporte.update(id, req.body, (err, results) => {
        if (err) return error(res, "Error al actualizar reporte", 500, err);

        if (results.affectedRows === 0)
            return error(res, "Reporte no encontrado", 404);

        return success(res, "Reporte actualizado");
    });
};

exports.deleteReporte = (req, res) => {
    const { id } = req.params;

    Reporte.delete(id, (err, results) => {
        if (err) return error(res, "Error al eliminar reporte", 500, err);

        if (results.affectedRows === 0)
            return error(res, "Reporte no encontrado", 404);

        return success(res, "Reporte eliminado");
    });
};
