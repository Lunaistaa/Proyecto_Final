const express = require('express');
const router = express.Router();
const personaController = require('../controllers/personaController');
const { validatePersona } = require('../middlewares/personaValidation');

router.get('/', personaController.getAllPersonas);
router.get('/:id', personaController.getPersonaById);
router.post('/', validatePersona, personaController.createPersona);
router.put('/:id', validatePersona, personaController.updatePersona);
router.delete('/:id', personaController.deletePersona);

module.exports = router;
