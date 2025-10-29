const mongoose = require("mongoose");

const calendarioSchema = new mongoose.Schema({
  id: String,
  plantaId: String,
  dia: { type: String, required: true },       // yyyy-mm-dd
  hora: { type: String, required: true },      // hh:mm
  duracionMin: Number,
  nombre: { type: String, required: false },   // nombre del usuario
  email: { type: String, required: false },    // correo del usuario
  enviado: { type: Boolean, default: false }   // indica si ya se envio el recordatorio
});

module.exports = mongoose.model("CalendarioRiego", calendarioSchema);
