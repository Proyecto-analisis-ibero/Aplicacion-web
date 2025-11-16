const express = require('express');
const router = express.Router();
const controller = require('../controllers/estilistaController');

router.get('/', controller.getAllEstilistas);
router.get('/:id', controller.getEstilistaById);
router.post('/', controller.createEstilista);
router.put('/:id', controller.updateEstilista);
router.delete('/:id', controller.deleteEstilista);

module.exports = router;
