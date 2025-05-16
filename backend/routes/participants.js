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
    const { nickname, user_tiktok, foto_url, bombo } = req.body;
  try {
       const nuevo = new Participant({ nickname, user_tiktok, foto_url, bombo });
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: 'Error al guardar participante' });
  }
});


// const { sortearDelBombo, asignarAParticipante } = require('../logic/sorteo');

// // GET /api/participants/sortear/1
// router.get('/sortear/:bombo', async (req, res) => {
//   try {
//     const bombo = parseInt(req.params.bombo);
//     const jugadores = await sortearDelBombo(bombo);
//     res.json(jugadores);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // POST /api/participants/asignar
// router.post('/asignar', async (req, res) => {
//   const { participantId, equipo } = req.body;

//   try {
//     const actualizado = await asignarAParticipante(participantId, equipo);
//     res.json(actualizado);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

module.exports = router;