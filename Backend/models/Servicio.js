const db = require('../config/db');

const Servicio = {
    getAll: (callback) => {
        db.query('SELECT * FROM Servicio', callback);
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM Servicio WHERE id_servicio = ?', [id], callback);
    },
    create: (servicio, callback) => {
        db.query('INSERT INTO Servicio (nombre_servicio, duracion, precio, descripcion) VALUES (?, ?, ?, ?)',
        [servicio.nombre_servicio, servicio.duracion, servicio.precio, servicio.descripcion], callback);
    },
    update: (id, servicio, callback) => {
        db.query('UPDATE Servicio SET nombre_servicio=?, duracion=?, precio=?, descripcion=? WHERE id_servicio=?',
        [servicio.nombre_servicio, servicio.duracion, servicio.precio, servicio.descripcion, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM Servicio WHERE id_servicio=?', [id], callback);
    }
};

module.exports = Servicio;
