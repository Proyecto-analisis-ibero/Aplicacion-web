const express = require('express');
const router = express.Router();
const controller = require('../controllers/reporteController');

router.get('/', controller.getAllReportes);
router.get('/:id', controller.getReporteById);
router.post('/', controller.createReporte);
router.put('/:id', controller.updateReporte);
router.delete('/:id', controller.deleteReporte);

module.exports = router;
