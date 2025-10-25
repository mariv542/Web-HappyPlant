const mongoose = require("mongoose");

const configuracionSchema = new mongoose.Schema({
  frecuenciaRegistro: String,
  unidadTemperatura: String,
  humedadMin: Number,
  humedadMax: Number,
  tempMin: Number,
  tempMax: Number,
});

const Configuracion = mongoose.model("Configuracion", configuracionSchema);

const obtenerConfiguracion = async () => {
  try {
    const cfg = await Configuracion.findOne();
    return cfg;
  } catch (error) {
    throw new Error(error.message);
  }
};

const actualizarConfiguracion = async (req, res) => {
  try {
    const cfg = await Configuracion.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.redirect("/configuracion"); // redirige al GET para mostrar cambios
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { obtenerConfiguracion, actualizarConfiguracion };
