const mongoose = require("mongoose");

const plantaSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  nombre: String,
  ubicacion: String,
  parametros: {
    temperatura: { min: Number, max: Number },
    humedadAmbiental: { min: Number, max: Number },
  },
});

module.exports = mongoose.model("Planta", plantaSchema);
