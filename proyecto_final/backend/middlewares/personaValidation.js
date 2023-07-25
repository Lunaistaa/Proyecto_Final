const { body, validationResult } = require('express-validator');

const validatePersona = [
  body('nombres')
    .notEmpty().withMessage('El campo Nombres es requerido')
    .isString().withMessage('El campo Nombres debe ser una cadena de caracteres'),

  body('apellidos')
    .notEmpty().withMessage('El campo Apellidos es requerido')
    .isString().withMessage('El campo Apellidos debe ser una cadena de caracteres'),

  body('tipoDocumento')
    .notEmpty().withMessage('El campo Tipo de Documento es requerido')
    .isString().withMessage('El campo Tipo de Documento debe ser una cadena de caracteres')
    .custom((value) => {
      const validTiposDocumento = ['registro_civil', 'tarjeta_identidad', 'cedula_ciudadania'];
      return validTiposDocumento.includes(value);
    }).withMessage('Tipo de documento inválido'),

  body('documento')
    .notEmpty().withMessage('El campo Documento es requerido')
    .isLength({ min: 10, max: 10 }).withMessage('El campo Documento debe tener 10 dígitos numéricos'),

  body('lugarNacimiento')
    .notEmpty().withMessage('El campo Lugar de Nacimiento es requerido')
    .isString().withMessage('El campo Lugar de Nacimiento debe ser una cadena de caracteres'),

    body('fechaNacimiento')
    .notEmpty().withMessage('El campo Fecha de Nacimiento es requerido')
    .isDate().withMessage('El campo Fecha de Nacimiento debe ser una fecha válida')
    .bail()
    .custom((value) => {
      const today = new Date();
      return new Date(value) <= today;
    })
    .withMessage('La Fecha de Nacimiento no puede ser en el futuro'),  

  body('email')
    .notEmpty().withMessage('El campo Email es requerido')
    .isEmail().withMessage('El campo Email debe ser una dirección de correo válida'),

    body('telefono')
    .notEmpty().withMessage('El campo Teléfono es requerido')
    .isLength({ min: 10, max: 10 }).withMessage('El campo Teléfono debe tener 10 dígitos numéricos'),

  body('usuario')
    .notEmpty().withMessage('El campo Usuario es requerido')
    .isString().withMessage('El campo Usuario debe ser una cadena de caracteres'),

  body('password').notEmpty().withMessage('El campo Contraseña es requerido'),

  body('confirmarPassword')
    .notEmpty().withMessage('El campo Confirmar Contraseña es requerido')
    .custom((value, { req }) => value === req.body.password).withMessage('Las contraseñas no coinciden'),

  body('lugarResidencia')
    .notEmpty().withMessage('El campo Lugar de Residencia es requerido')
    .isString().withMessage('El campo Lugar de Residencia debe ser una cadena de caracteres'),
];

const handleValidationErrors = (res, errors) => {
  res.status(400).json({ errors: errors.array() });
};

module.exports = { validatePersona, handleValidationErrors };