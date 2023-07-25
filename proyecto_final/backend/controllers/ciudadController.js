const { validationResult } = require('express-validator');
const pool = require('../db');
const { handleServerError, handleValidationErrors } = require('../middlewares/errorHandlers');

exports.getAllCiudades = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Ciudad');
    res.json(rows);
  } catch (error) {
    handleServerError(res, error);
  }
};

exports.getCiudadById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Ciudad WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Ciudad no encontrada' });
    }
    res.json(rows[0]);
  } catch (error) {
    handleServerError(res, error);
  }
};

exports.createCiudad = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleValidationErrors(res, errors);
  }

  try {
    const [result] = await pool.query('INSERT INTO Ciudad SET ?', req.body);
    const nuevaCiudad = { ...req.body, id: result.insertId };
    res.json(nuevaCiudad);
  } catch (error) {
    handleServerError(res, error);
  }
};

exports.updateCiudad = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleValidationErrors(res, errors);
  }

  try {
    const [result] = await pool.query('UPDATE Ciudad SET ? WHERE id = ?', [req.body, req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Ciudad no encontrada' });
    }

    res.json({ ...req.body, id: req.params.id });
  } catch (error) {
    handleServerError(res, error);
  }
};

exports.deleteCiudad = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Ciudad WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Ciudad no encontrada' });
    }
    res.json({ message: 'Ciudad eliminada correctamente' });
  } catch (error) {
    handleServerError(res, error);
  }
};