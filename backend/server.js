const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Crear la app
const app = express();
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',   // React local
  'http://localhost:5000',   // Servidor local de páginas HTML (ej. live-server)
  'https://team-picker.onrender.com'
];

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // Permitir peticiones sin origen (Postman, curl)
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `El CORS para ${origin} no está permitido.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));            // Permite peticiones del frontend
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


