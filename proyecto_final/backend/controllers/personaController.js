const { validationResult } = require('express-validator');
const moment = require('moment'); // Add this line to import the moment library
const pool = require('../db');
const { handleServerError, handleValidationErrors } = require('../middlewares/errorHandlers');

// Middleware de validación para createPersona y updatePersona
const validatePersona = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleValidationErrors(res, errors);
  }
  next();
};

exports.getAllPersonas = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Persona');
    res.json(rows);
  } catch (error) {
    handleServerError(res, error);
  }
};

exports.getPersonaById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Persona WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }
    res.json(rows[0]);
  } catch (error) {
    handleServerError(res, error);
  }
};

exports.createPersona = [
  // Agregar el middleware de validación
  validatePersona,
  async (req, res) => {
    try {
      const personaData = req.body;
      const [result] = await pool.query('INSERT INTO Persona SET ?', personaData);
      const nuevaPersona = { ...personaData, id: result.insertId };
      res.json(nuevaPersona);
    } catch (error) {
      handleServerError(res, error);
    }
  }
];

exports.updatePersona = async (req, res) => {
  try {
    const personaData = req.body;

    // Validate the input date format using moment.js
    const fechaNacimientoMoment = moment(personaData.fechaNacimiento, 'YYYY-MM-DD');
    if (!fechaNacimientoMoment.isValid()) {
      return res.status(400).json({ error: 'Fecha de nacimiento inválida' });
    }

    // Convert the validated date back to the desired format
    personaData.fechaNacimiento = fechaNacimientoMoment.format('YYYY-MM-DD HH:mm:ss');

    const [result] = await pool.query('UPDATE Persona SET ? WHERE id = ?', [personaData, req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }

    res.json({ ...personaData, id: req.params.id });
  } catch (error) {
    handleServerError(res, error);
  }
};

exports.deletePersona = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Persona WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }
    res.json({ message: 'Persona eliminada correctamente' });
  } catch (error) {
    handleServerError(res, error);
  }
};