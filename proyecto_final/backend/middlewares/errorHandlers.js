const handleServerError = (res, error) => {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  };
  
  const handleValidationErrors = (res, errors) => {
    res.status(400).json({ errors: errors.array() });
  };
  
  module.exports = { handleServerError, handleValidationErrors };
  