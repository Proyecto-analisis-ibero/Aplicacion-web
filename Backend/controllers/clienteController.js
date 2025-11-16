const Cliente = require('../models/Cliente');
const { success, error, validateRequiredFields } = require('../helpers/helpers');


// =========================
// OBTENER TODOS
// =========================
exports.getAllCliente = (req, res) => {
    Cliente.getAll((err, results) => {
        if (err) return error(res, "Error al obtener clientes", 500, err);
        return success(res, "Lista de clientes", results);
    });
};

// =========================
// OBTENER POR ID
// =========================
exports.getClienteById = (req, res) => {
    const { id } = req.params;

    Cliente.getById(id, (err, results) => {
        if (err) return error(res, "Error al obtener cliente", 500, err);

        if (results.length === 0) {
            return error(res, "Cliente no encontrado", 404);
        }

        return success(res, "Cliente encontrado", results[0]);
    });
};

// =========================
// CREAR CLIENTE
// =========================
exports.createCliente = (req, res) => {

    // Validar campos requeridos
    const required = ["nombre", "correo", "telefono", "clave"];
    const validationError = validateRequiredFields(required, req.body);
    if (validationError) return error(res, validationError, 400);

    Cliente.create(req.body, (err, results) => {
        if (err) return error(res, "Error al crear cliente", 500, err);

        return success(res, "Cliente creado correctamente", {
            id: results.insertId
        }, 201);
    });
};

// =========================
// ACTUALIZAR CLIENTE
// =========================
exports.updateCliente = (req, res) => {
    const { id } = req.params;

    Cliente.update(id, req.body, (err, results) => {
        if (err) return error(res, "Error al actualizar cliente", 500, err);

        if (results.affectedRows === 0) {
            return error(res, "Cliente no encontrado", 404);
        }

        return success(res, "Cliente actualizado correctamente");
    });
};

// =========================
// ELIMINAR CLIENTE
// =========================
exports.deleteCliente = (req, res) => {
    const { id } = req.params;

    Cliente.delete(id, (err, results) => {
        if (err) return error(res, "Error al eliminar cliente", 500, err);

        if (results.affectedRows === 0) {
            return error(res, "Cliente no encontrado", 404);
        }

        return success(res, "Cliente eliminado correctamente");
    });
};
