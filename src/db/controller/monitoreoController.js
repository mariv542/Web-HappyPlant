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

const Monitoreo = mongoose.model("Monitoreo", monitoreoSchema);

// ===== Funciones =====
const listarMonitoreo = async (req, res) => {
  try {
    const lista = await Monitoreo.find();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerMonitoreo = async (req, res) => {
  try {
    const item = await Monitoreo.findOne({ plantaId: req.params.plantaId });
    if (!item) return res.status(404).json({ msg: "No encontrado" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const crearMonitoreo = async (req, res) => {
  try {
    const nuevo = new Monitoreo(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listarMonitoreo,
  obtenerMonitoreo,
  crearMonitoreo,
};
