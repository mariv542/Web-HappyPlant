// src/db/controller/calendarioController.js
const mongoose = require("mongoose");

// Esquema del Calendario
const calendarioSchema = new mongoose.Schema({
  dia: { type: String, required: true },   // yyyy-mm-dd
  hora: { type: String, required: true },  // hh:mm
});

const Calendario = mongoose.model("Calendario", calendarioSchema);

// ===== Funciones del controlador =====

// Listar todos los riegos
const listarCalendario = async () => {
  try {
    const eventos = await Calendario.find().sort({ dia: 1, hora: 1 });
    return eventos; // devolvemos los datos para la vista
  } catch (error) {
    throw new Error(error.message);
  }
};

// Crear un nuevo riego
const crearCalendario = async (dato) => {
  try {
    const nuevo = new Calendario(dato);
    await nuevo.save();
    return nuevo;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Exportar funciones
module.exports = {
  listarCalendario,
  crearCalendario,
};
