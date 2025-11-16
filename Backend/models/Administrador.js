const db = require('../config/db');

const Administrador = {
    getAll: (callback) => {
        db.query('SELECT * FROM Administrador', callback);
    },

    getById: (id, callback) => {
        db.query('SELECT * FROM Administrador WHERE id_admin = ?', [id], callback);
    },

    create: (administrador, callback) => {
        db.query(
            'INSERT INTO Administrador (nombre, correo, telefono, rol, clave) VALUES (?, ?, ?, ?, ?)',
            [administrador.nombre, administrador.correo, administrador.telefono, administrador.rol, administrador.clave],
            callback
        );
    },

    update: (id, administrador, callback) => {
        db.query(
            'UPDATE Administrador SET nombre=?, correo=?, telefono=?, rol=?, clave=? WHERE id_admin=?',
            [administrador.nombre, administrador.correo, administrador.telefono, administrador.rol, administrador.clave, id],
            callback
        );
    },

    delete: (id, callback) => {
        db.query('DELETE FROM Administrador WHERE id_admin=?', [id], callback);
    }
};

module.exports = Administrador;

