const { validationResult } = require('express-validator');

const handleControllerValidationErrors = (res, errors) => {
  return res.status(400).json({ errors: errors.array() });
};

module.exports = { handleControllerValidationErrors };