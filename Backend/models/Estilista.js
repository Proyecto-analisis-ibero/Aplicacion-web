const db = require('../config/db');

const Estilista = {
    getAll: (callback) => {
        db.query('SELECT * FROM Estilista', callback);
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM Estilista WHERE id_estilista = ?', [id], callback);
    },
    create: (estilista, callback) => {
        db.query('INSERT INTO Estilista (nombre, correo, telefono, disponibilidad) VALUES (?, ?, ?, ?)',
        [estilista.nombre, estilista.correo, estilista.telefono, estilista.disponibilidad], callback);
    },
    update: (id, estilista, callback) => {
        db.query('UPDATE Estilista SET nombre=?, correo=?, telefono=?, disponibilidad=? WHERE id_estilista=?',
        [estilista.nombre, estilista.correo, estilista.telefono, estilista.disponibilidad, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM Estilista WHERE id_estilista=?', [id], callback);
    }
};

module.exports = Estilista;
