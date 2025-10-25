const mongoose = require("mongoose");

const configuracionSchema = new mongoose.Schema({
  frecuenciaRegistro: String,
  unidadTemperatura: String,
});

const Configuracion = mongoose.model("Configuracion", configuracionSchema);

const obtenerConfiguracion = async (req, res) => {
  try {
    const cfg = await Configuracion.findOne();
    res.json(cfg);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const actualizarConfiguracion = async (req, res) => {
  try {
    const cfg = await Configuracion.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(cfg);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { obtenerConfiguracion, actualizarConfiguracion };
