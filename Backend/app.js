const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Importar rutas
const clienteRoutes = require('./routes/clienteRoutes');
const estilistaRoutes = require('./routes/estilistaRoutes');
const servicioRoutes = require('./routes/servicioRoutes');
const citaRoutes = require('./routes/citaRoutes');
const notificacionRoutes = require('./routes/notificacionRoutes');
const reporteRoutes = require('./routes/reporteRoutes');
const administradorRoutes = require('./routes/administradorRoutes');


// Conectar rutas
app.use('/api/clientes', clienteRoutes);
app.use('/api/estilistas', estilistaRoutes);
app.use('/api/servicios', servicioRoutes);
app.use('/api/citas', citaRoutes);
app.use('/api/notificaciones', notificacionRoutes);
app.use('/api/reportes', reporteRoutes);
app.use('/api/administradores', administradorRoutes);


// Ruta inicial
app.get('/', (req, res) => {
    res.send("API de Peluquería Rizos de Oro funcionando correctamente ✔️");
});




// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
