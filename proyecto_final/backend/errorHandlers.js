const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error: 'Error del servidor' });
};

module.exports = { handleServerError };