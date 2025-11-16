const express = require('express');
const router = express.Router();
const controller = require('../controllers/notificacionController');

router.get('/', controller.getAllNotificaciones);
router.get('/:id', controller.getNotificacionById);
router.post('/', controller.createNotificacion);
router.put('/:id', controller.updateNotificacion);
router.delete('/:id', controller.deleteNotificacion);

module.exports = router;
