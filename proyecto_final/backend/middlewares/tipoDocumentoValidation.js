const { body, validationResult } = require('express-validator');

const validateTipoDocumento = [
  body('nombre')
    .notEmpty().withMessage('El nombre es requerido')
    .isString().withMessage('El nombre debe ser una cadena de caracteres'),
  body('tipoDocumento')
    .notEmpty().withMessage('El tipo de documento es requerido')
    .isIn(['registro_civil', 'tarjeta_identidad', 'cedula_ciudadania']).withMessage('Tipo de documento inválido'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateTipoDocumento, handleValidationErrors };
