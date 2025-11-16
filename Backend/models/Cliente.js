const db = require('../config/db');

const Cliente = {
    getAll: (callback) => {
        db.query('SELECT * FROM Cliente', callback);
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM Cliente WHERE id_cliente = ?', [id], callback);
    },
    create: (cliente, callback) => {
        db.query('INSERT INTO Cliente (nombre, correo, telefono, clave) VALUES (?, ?, ?, ?)',
            [cliente.nombre, cliente.correo, cliente.telefono, cliente.clave], callback);
    },
    update: (id, cliente, callback) => {
        db.query('UPDATE Cliente SET nombre=?, correo=?, telefono=?, clave=? WHERE id_cliente=?',
            [cliente.nombre, cliente.correo, cliente.telefono,cliente.clave, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM Cliente WHERE id_cliente=?', [id], callback);
    }
};

module.exports = Cliente;
