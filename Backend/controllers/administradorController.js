const Administrador = require('../models/Administrador');
const { success, error, validateRequiredFields } = require('../helpers/helpers');

// =========================
// OBTENER TODOS
// =========================
exports.getAllAdministrador = (req, res) => {
    Administrador.getAll((err, results) => {
        if (err) return error(res, "Error al obtener administradores", 500, err);
        return success(res, "Lista de administradores", results);
    });
};

// =========================
// OBTENER POR ID
// =========================
exports.getAdministradorById = (req, res) => {
    const { id } = req.params;

    Administrador.getById(id, (err, results) => {
        if (err) return error(res, "Error al obtener administrador", 500, err);

        if (results.length === 0) {
            return error(res, "Administrador no encontrado", 404);
        }

        return success(res, "Administrador encontrado", results[0]);
    });
};

// =========================
// CREAR ADMINISTRADOR
// =========================
exports.createAdministrador = (req, res) => {

    // Validar campos requeridos
    const required = ["nombre", "correo", "telefono", "rol", "clave"];
    const validationError = validateRequiredFields(required, req.body);
    if (validationError) return error(res, validationError, 400);

    Administrador.create(req.body, (err, results) => {
        if (err) return error(res, "Error al crear administrador", 500, err);

        return success(res, "Administrador creado correctamente", {
            id: results.insertId
        }, 201);
    });
};

// =========================
// ACTUALIZAR ADMINISTRADOR
// =========================
exports.updateAdministrador = (req, res) => {
    const { id } = req.params;

    Administrador.update(id, req.body, (err, results) => {
        if (err) return error(res, "Error al actualizar administrador", 500, err);

        if (results.affectedRows === 0) {
            return error(res, "Administrador no encontrado", 404);
        }

        return success(res, "Administrador actualizado correctamente");
    });
};

// =========================
// ELIMINAR ADMINISTRADOR
// =========================
exports.deleteAdministrador = (req, res) => {
    const { id } = req.params;

    Administrador.delete(id, (err, results) => {
        if (err) return error(res, "Error al eliminar administrador", 500, err);

        if (results.affectedRows === 0) {
            return error(res, "Administrador no encontrado", 404);
        }

        return success(res, "Administrador eliminado correctamente");
    });
};
