const mongoose = require("mongoose");

const historialSchema = new mongoose.Schema({
  id: String,
  plantaId: String,
  tipo: String,
  detalle: Object,
  fechaHora: String,
});

const Historial = mongoose.model("Historial", historialSchema);

const listarHistorial = async (req, res) => {
  try {
    const historial = await Historial.find();
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const crearHistorial = async (req, res) => {
  try {
    const h = new Historial(req.body);
    await h.save();
    res.status(201).json(h);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { listarHistorial, crearHistorial };
