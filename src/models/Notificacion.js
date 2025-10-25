const mongoose = require("mongoose");

const notificacionSchema = new mongoose.Schema({
  id: String,
  mensaje: String,
  plantaId: String,
  fechaHora: String,
  estado: String,
  leido: Boolean,
});

module.exports = mongoose.model("Notificacion", notificacionSchema);
