const express = require('express');
const router = express.Router();
const {
  sortearDelBombo,
  asignarAParticipante,
  obtenerEquipos,
  reiniciarEquipos
} = require('../logic/sorteo');

// GET /api/sorteo/equipos
router.get('/equipos', async (req, res) => {
  try {
    const equipos = await obtenerEquipos();
    res.json(equipos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET /api/sorteo/:bombo
router.get('/:bombo', async (req, res) => {
  const bombo = parseInt(req.params.bombo);

  try {
    const jugadores = await sortearDelBombo(bombo);
    res.json(jugadores);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/sorteo/asignar
router.post('/asignar', async (req, res) => {
  const { _id, equipo } = req.body;

  if (!_id || !equipo) {
    return res.status(400).json({ error: 'Faltan datos: participantId o equipo.' });
  }

  try {
    const asignado = await asignarAParticipante(participantId, equipo);
    res.json(asignado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/sorteo/reiniciar
router.post('/reiniciar', async (req, res) => {
  try {
    const cantidad = await reiniciarEquipos();
    res.json({ mensaje: `Se reiniciaron ${cantidad} participantes.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
