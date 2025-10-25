const mongoose = require("mongoose");

const notificacionSchema = new mongoose.Schema({
  id: String,
  mensaje: String,
  plantaId: String,
  fechaHora: String,
  estado: String,
  leido: Boolean,
});

const Notificacion = mongoose.model("Notificacion", notificacionSchema);

const listarNotificaciones = async (req, res) => {
  try {
    const notificaciones = await Notificacion.find();
    res.json(notificaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerNotificacion = async (req, res) => {
  try {
    const n = await Notificacion.findOne({ id: req.params.id });
    if (!n) return res.status(404).json({ msg: "No encontrada" });
    res.json(n);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const crearNotificacion = async (req, res) => {
  try {
    const nueva = new Notificacion(req.body);
    await nueva.save();
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { listarNotificaciones, obtenerNotificacion, crearNotificacion };
