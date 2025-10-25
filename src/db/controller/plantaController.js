const mongoose = require("mongoose");

// Esquema de Planta
const plantaSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  nombre: String,
  ubicacion: String,
  parametros: {
    temperatura: { min: Number, max: Number },
    humedadAmbiental: { min: Number, max: Number },
  },
});

const Planta = mongoose.model("Planta", plantaSchema);

// ===== Funciones del controlador =====

// Listar todas las plantas
const listarPlantas = async () => {
  try {
    const plantas = await Planta.find();
    return plantas; // devuelve los datos, no usa res
  } catch (error) {
    throw error; // el error se maneja en routes.js
  }
};

// Obtener planta por id
const obtenerPlanta = async (req, res) => {
  try {
    const planta = await Planta.findOne({ id: req.params.id });
    if (!planta) return res.status(404).json({ msg: "Planta no encontrada" });
    res.json(planta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear nueva planta
const crearPlanta = async (req, res) => {
  try {
    const nuevaPlanta = new Planta(req.body);
    await nuevaPlanta.save();
    res.status(201).json(nuevaPlanta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar planta
const actualizarPlanta = async (req, res) => {
  try {
    const planta = await Planta.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!planta) return res.status(404).json({ msg: "Planta no encontrada" });
    res.json(planta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar planta
const eliminarPlanta = async (req, res) => {
  try {
    const planta = await Planta.findOneAndDelete({ id: req.params.id });
    if (!planta) return res.status(404).json({ msg: "Planta no encontrada" });
    res.json({ msg: "Planta eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listarPlantas,
  obtenerPlanta,
  crearPlanta,
  actualizarPlanta,
  eliminarPlanta,
};
