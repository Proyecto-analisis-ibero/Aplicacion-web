const express = require('express');
const router = express.Router();
const controller = require('../controllers/servicioController');

router.get('/', controller.getAllServicios);
router.get('/:id', controller.getServicioById);
router.post('/', controller.createServicio);
router.put('/:id', controller.updateServicio);
router.delete('/:id', controller.deleteServicio);

module.exports = router;
