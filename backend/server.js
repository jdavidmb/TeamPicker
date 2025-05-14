const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Crear la app
const app = express();

// Middleware
app.use(cors());              // Permite peticiones del frontend
app.use(express.json());      // Soporte para JSON en body

const participantRoutes = require('./routes/participants');
app.use('/api/participants', participantRoutes);

const sorteoRoutes = require('./routes/sorteo');
app.use('/api/sorteo', sorteoRoutes);


// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Backend activo');
});

// Arrancar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});


