const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  foto_url: { type: String, required: true },
  bombo: { type: Number, required: true },
  equipo: { type: String, default: null }
});

module.exports = mongoose.model('Participant', participantSchema);
