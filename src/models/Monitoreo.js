const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema({
  id: String,
  tipo: String,
  conexion: String,
  activo: Boolean,
  ultimoDato: { valor: Number, fechaHora: String },
  rangoOptimo: { min: Number, max: Number },
});

const monitoreoSchema = new mongoose.Schema({
  plantaId: String,
  sensores: [sensorSchema],
});

module.exports = mongoose.model("Monitoreo", monitoreoSchema);
