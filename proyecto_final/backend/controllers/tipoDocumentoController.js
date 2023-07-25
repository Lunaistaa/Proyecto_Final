const { validationResult } = require('express-validator');
const pool = require('../db');
const { handleServerError, handleValidationErrors } = require('../middlewares/errorHandlers');

exports.getAllTiposDocumento = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM TipoDocumento');
    res.json(rows);
  } catch (error) {
    handleServerError(res, error);
  }
};

exports.getTipoDocumentoById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM TipoDocumento WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Tipo de documento no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    handleServerError(res, error);
  }
};

exports.createTipoDocumento = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleValidationErrors(res, errors);
  }

  // Validar el tipoDocumento antes de continuar
  if (!validateTipoDocumento(req.body.tipoDocumento)) {
    return res.status(422).json({ error: 'Tipo de documento no válido' });
  }

  try {
    const [result] = await pool.query('INSERT INTO TipoDocumento SET ?', req.body);
    const nuevoTipoDocumento = { ...req.body, id: result.insertId };
    res.json(nuevoTipoDocumento);
  } catch (error) {
    handleServerError(res, error);
  }
};

exports.updateTipoDocumento = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleValidationErrors(res, errors);
  }

  try {
    const [result] = await pool.query('UPDATE TipoDocumento SET ? WHERE id = ?', [req.body, req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Tipo de documento no encontrado' });
    }

    res.json({ ...req.body, id: req.params.id });
  } catch (error) {
    handleServerError(res, error);
  }
};

exports.deleteTipoDocumento = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM TipoDocumento WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Tipo de documento no encontrado' });
    }
    res.json({ message: 'Tipo de documento eliminado correctamente' });
  } catch (error) {
    handleServerError(res, error);
  }
};