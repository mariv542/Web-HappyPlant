const mongoose = require("mongoose");

const configuracionSchema = new mongoose.Schema({
  frecuenciaRegistro: String,
  unidadTemperatura: String,
});

module.exports = mongoose.model("Configuracion", configuracionSchema);
