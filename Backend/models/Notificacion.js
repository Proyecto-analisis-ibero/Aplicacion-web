const db = require('../config/db');

const Notificacion = {
    getAll: (callback) => {
        db.query('SELECT * FROM Notificacion', callback);
    },

    getById: (id, callback) => {
        db.query('SELECT * FROM Notificacion WHERE id_notificacion = ?', [id], callback);
    },

    create: (notificacion, callback) => {
        db.query(
            'INSERT INTO Notificacion (tipo, mensaje, id_cita) VALUES (?, ?, ?)',
            [notificacion.tipo, notificacion.mensaje, notificacion.id_cita],
            callback
        );
    },

    update: (id, notificacion, callback) => {
        db.query(
            `UPDATE Notificacion 
            SET tipo = ?, mensaje = ?, id_cita = ?
            WHERE id_notificacion = ?`,
            [notificacion.tipo, notificacion.mensaje, notificacion.id_cita, id],
            callback
        );
    },

    delete: (id, callback) => {
        db.query('DELETE FROM Notificacion WHERE id_notificacion = ?', [id], callback);
    }
};

module.exports = Notificacion;
