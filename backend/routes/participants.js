const express = require('express');
const router = express.Router();
const Participant = require('../models/Participant');

// GET /api/participants - listar todos los participantes
router.get('/', async (req, res) => {
  try {
    const participantes = await Participant.find();
    res.json(participantes);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener participantes' });
  }
});

// POST /api/participants - agregar un nuevo participante
router.post('/', async (req, res) => {
  const { nombre, foto_url, bombo } = req.body;
  try {
    const nuevo = new Participant({ nombre, foto_url, bombo });
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: 'Error al guardar participante' });
  }
});

module.exports = router;
