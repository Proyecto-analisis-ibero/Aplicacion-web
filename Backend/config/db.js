const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // contraseña
    database: 'peluqueria_rizos_de_oro',
    port: 3306
});

db.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Error al conectar a MySQL:", err);
        return;
    }
    console.log("✔️ Conexión exitosa a MySQL");
    connection.release();
});

module.exports = db;