const express = require('express');
const router = express.Router();
const ciudadController = require('../controllers/ciudadController');
const { validateCiudad } = require('../middlewares/ciudadValidation');

router.get('/', ciudadController.getAllCiudades);
router.get('/:id', ciudadController.getCiudadById);
router.post('/', validateCiudad, ciudadController.createCiudad);
router.put('/:id', validateCiudad, ciudadController.updateCiudad);
router.delete('/:id', ciudadController.deleteCiudad);

module.exports = router;