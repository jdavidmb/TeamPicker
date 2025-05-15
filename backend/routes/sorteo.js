const express = require('express');
const router = express.Router();
const {
  sortearDelBombo,
  asignarAParticipante,
  obtenerEquipos,
  reiniciarEquipos
} = require('../logic/sorteo');

// Rutas estáticas primero
// Obtener todos los equipos formados
router.get('/equipo', async (req, res) => {
  try {
    const equipos = await obtenerEquipos();
    res.json(equipos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener equipo de un líder por su nickname
router.get('/equipo/:nickname', async (req, res) => {
  const nickname = req.params.nickname;
  const equipo = `Equipo de ${nickname}`;

  try {
    const integrantes = await Participant.find({ equipo });
    res.json(integrantes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rutas dinámicas al final
// Sorteo de participantes por bombo
router.get('/:bombo', async (req, res) => {
  const bombo = parseInt(req.params.bombo);

  try {
    const jugadores = await sortearDelBombo(bombo);
    res.json(jugadores);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Asignar participante a un equipo
router.post('/asignar', async (req, res) => {
  const { participantId, equipo } = req.body;

  if (!participantId || !equipo) {
    return res.status(400).json({ error: 'Faltan datos: participantId o equipo.' });
  }

  try {
    const asignado = await asignarAParticipante(participantId, equipo);
    res.json(asignado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Reiniciar asignaciones
router.post('/reiniciar', async (req, res) => {
  try {
    const cantidad = await reiniciarEquipos();
    res.json({ mensaje: `Se reiniciaron ${cantidad} participantes.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
