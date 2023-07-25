const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

const { handleServerError } = require('./errorHandlers'); // Importar el errorHandler

app.use(express.json());
app.use(cors()); // Habilitar CORS para todas las rutas

const tipoDocumentoRoutes = require('./routes/tipoDocumentoRoutes');
const ciudadRoutes = require('./routes/ciudadRoutes');
const personaRoutes = require('./routes/personaRoutes');

const errorHandler = (err, req, res, next) => {
  handleServerError(res, err); // Utilizar la función handleServerError
};

app.use('/api/tipos-documento', tipoDocumentoRoutes);
app.use('/api/ciudades', ciudadRoutes);
app.use('/api/personas', personaRoutes);

// Middleware de manejo de errores generales
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});