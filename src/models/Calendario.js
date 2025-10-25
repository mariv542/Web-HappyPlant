const mongoose = require("mongoose");

const calendarioSchema = new mongoose.Schema({
  id: String,
  plantaId: String,
  dia: String,
  hora: String,
  duracionMin: Number,
});

module.exports = mongoose.model("CalendarioRiego", calendarioSchema);
