const db = require('../config/db');

const Cita = {
    getAll: (callback) => {
        const sql = `
            SELECT Cita.*, 
                Cliente.nombre AS cliente, 
                Estilista.nombre AS estilista, 
                Servicio.nombre_servicio AS servicio
            FROM Cita
            INNER JOIN Cliente ON Cita.id_cliente = Cliente.id_cliente
            INNER JOIN Estilista ON Cita.id_estilista = Estilista.id_estilista
            INNER JOIN Servicio ON Cita.id_servicio = Servicio.id_servicio
        `;
        db.query(sql, (err, results) => callback(err, results));
    },

    getById: (id, callback) => {
        db.query(
            'SELECT * FROM Cita WHERE id_cita = ?',
            [id],
            (err, results) => callback(err, results)
        );
    },

    create: (cita, callback) => {
        db.query(
            `INSERT INTO Cita 
                (fecha, hora, estado, observaciones, id_cliente, id_estilista, id_servicio)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                cita.fecha,
                cita.hora,
                cita.estado || 'pendiente',
                cita.observaciones || '',
                cita.id_cliente,      
                cita.id_estilista,    
                cita.id_servicio      
            ],
            (err, results) => callback(err, results)
        );
    },

    update: (id, cita, callback) => {
        db.query(
            `UPDATE Cita SET 
                fecha=?, hora=?, estado=?, observaciones=?, 
                id_cliente=?, id_estilista=?, id_servicio=? 
                WHERE id_cita=?`,
            [
                cita.fecha,
                cita.hora,
                cita.estado,
                cita.observaciones,
                cita.id_cliente,     
                cita.id_estilista,   
                cita.id_servicio,    
                id
            ],
            (err, results) => callback(err, results)
        );
    },

    delete: (id, callback) => {
        db.query(
            'DELETE FROM Cita WHERE id_cita=?',
            [id],
            (err, results) => callback(err, results)
        );
    }
};

module.exports = Cita;
