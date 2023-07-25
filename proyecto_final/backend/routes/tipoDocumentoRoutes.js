const express = require('express');
const router = express.Router();
const tipoDocumentoController = require('../controllers/tipoDocumentoController');
const { validateTipoDocumento, handleValidationErrors } = require('../middlewares/tipoDocumentoValidation');

router.get('/', tipoDocumentoController.getAllTiposDocumento);
router.get('/:id', tipoDocumentoController.getTipoDocumentoById);
router.post('/', validateTipoDocumento, tipoDocumentoController.createTipoDocumento);
router.put('/:id', validateTipoDocumento, tipoDocumentoController.updateTipoDocumento);
router.delete('/:id', tipoDocumentoController.deleteTipoDocumento);

// Middleware para manejo de errores de validación
router.use(handleValidationErrors);

module.exports = router;