// backend/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const adminRoutes = require('./routes/admin');

const app = express();

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error de conexión a MongoDB:", err));

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas protegidas
app.use('/admin', adminRoutes);

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../src')));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
