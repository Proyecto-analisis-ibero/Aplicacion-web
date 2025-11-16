const db = require('../config/db');

const Reporte = {
    getAll: (callback) => {
        db.query('SELECT * FROM Reporte', callback);
    },

    getById: (id, callback) => {
        db.query('SELECT * FROM Reporte WHERE id_reporte = ?', [id], callback);
    },

    create: (reporte, callback) => {
        db.query(
            'INSERT INTO Reporte (tipo_reporte, datos, id_estilista, id_admin) VALUES (?, ?, ?, ?)',
            [reporte.tipo_reporte, reporte.datos, reporte.id_estilista, reporte.id_admin],
            callback
        );
    },

    update: (id, reporte, callback) => {
        db.query(
            `UPDATE Reporte 
            SET tipo_reporte = ?, datos = ?, id_estilista = ?, id_admin = ?
            WHERE id_reporte = ?`,
            [
                reporte.tipo_reporte,
                reporte.datos,
                reporte.id_estilista,
                reporte.id_admin,
                id
            ],
            callback
        );
    },

    delete: (id, callback) => {
        db.query(
            'DELETE FROM Reporte WHERE id_reporte = ?',
            [id],
            callback
        );
    }
};

module.exports = Reporte;

