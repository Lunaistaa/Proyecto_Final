const mysql = require('mysql2/promise');

const config = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'Lunaista1116',
  database: 'registro_personas',
  dialect: 'mysql',
};

// Eliminar las opciones no válidas para la creación del pool
delete config.dialect;

// Crear una conexión pool
const pool = mysql.createPool(config);

module.exports = pool;