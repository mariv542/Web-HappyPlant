const mongoose = require("mongoose");

const historialSchema = new mongoose.Schema({
  id: String,
  plantaId: String,
  tipo: String,
  detalle: Object,
  fechaHora: String,
});

module.exports = mongoose.model("Historial", historialSchema);
