const { body, validationResult } = require('express-validator');

const validateCiudad = [
  body('nombre')
    .notEmpty().withMessage('El nombre es requerido')
    .isString().withMessage('El nombre debe ser una cadena de caracteres'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateCiudad, handleValidationErrors };