const Participant = require('../models/Participant');

/**
 * Sortea 3 participantes aleatorios de un bombo.
 * Solo incluye participantes que aún no tienen equipo.
 */
async function sortearDelBombo(bombo) {
  const disponibles = await Participant.find({ bombo, equipo: null });

    // Si hay menos de 3, devuelve todos los disponibles directamente
    if (disponibles.length <= 3) {
    return disponibles;
    }

    // Si hay más de 3, sortea 3 aleatorios únicos
    const seleccionados = [];

  while (seleccionados.length < 3) {
    const index = Math.floor(Math.random() * disponibles.length);
    const candidato = disponibles[index];

    // Evitar duplicados
    if (!seleccionados.find(p => p._id.equals(candidato._id))) {
      seleccionados.push(candidato);
    }
  }

  return seleccionados;
}


/**
 * Asigna un participante a un equipo (líder).
 */
async function asignarAParticipante(participantId, equipo) {
  const actualizado = await Participant.findOneAndUpdate(
    { _id: participantId, equipo: null }, // Solo si aún no está asignado
    { equipo },
    { new: true }
  );

  if (!actualizado) {
    throw new Error('El participante ya fue asignado o no existe.');
  }

  return actualizado;
}


/**
 * Agrupa los participantes por equipo (excluye los que aún no tienen equipo).
 */
async function obtenerEquipos() {
  const asignados = await Participant.find({ equipo: { $ne: null } });

  const equipos = {};

  asignados.forEach(part => {
    if (!equipos[part.equipo]) {
      equipos[part.equipo] = [];
    }
    equipos[part.equipo].push(part);
  });

  return equipos;
}

async function reiniciarEquipos() {
  const result = await Participant.updateMany(
    {},
    { $set: { equipo: null } }
  );
  return result.modifiedCount;
}


module.exports = {
  sortearDelBombo,
  asignarAParticipante,
  obtenerEquipos,
  reiniciarEquipos
};
