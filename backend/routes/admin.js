// backend/routes/admin.js
const express = require('express');
const router = express.Router();
const Participant = require('../models/Participant');
const auth = require('../middlewares/auth');
const { upload } = require('../cloudinary');

// Middleware para verificar si el usuario es admin
router.post('/login', async (req, res) => {
  const { password } = req.body;
  if (password === process.env.CLAVE_ADMIN) {
    return res.status(200).json({ mensaje: 'Acceso concedido' });
  } else {
    return res.status(401).json({ error: 'Acceso denegado' });
  }
});

// Crear participante
router.post('/crear', auth, upload.single('foto'), async (req, res) => {
  const { nickname, user_tiktok, bombo } = req.body;

  if (![1, 2, 3, 4].includes(Number(bombo))) {
    return res.status(400).json({ error: 'Bombo inválido' });
  }

  const count = await Participant.countDocuments({ bombo: Number(bombo) });
  if (count >= 25) return res.status(400).json({ error: "Máximo 25 por bombo" });

  const nuevo = new Participant({
    nickname,
    user_tiktok,
    bombo: Number(bombo),
    foto_url: req.file.path
  });

  await nuevo.save();
  res.json({ mensaje: 'Participante guardado correctamente' });
});

// Ver todos
router.get('/listar', auth, async (req, res) => {
  const participantes = await Participant.find();
  res.json(participantes);
});

// Borrar
router.delete('/borrar/:id', auth, async (req, res) => {
  await Participant.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Participante eliminado' });
});

// Middleware simple para verificar clave admin
const verificarClave = (req, res, next) => {
  const clave = req.headers['x-clave-admin'];
  if (clave !== process.env.CLAVE_ADMIN) {
    return res.status(401).json({ error: 'Acceso denegado' });
  }
  next();
};

// ✅ Obtener todos los participantes
router.get('/listar', verificarClave, async (req, res) => {
  try {
    const participantes = await Participant.find();
    res.json(participantes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los participantes' });
  }
});

// ✅ Eliminar participante por ID
router.delete('/eliminar/:id', verificarClave, async (req, res) => {
  try {
    const eliminado = await Participant.findByIdAndDelete(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ error: 'Participante no encontrado' });
    }
    res.json({ mensaje: 'Participante eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el participante' });
  }
});

module.exports = router;