// db/controller/notificacionController.js
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

// Devuelve las notificaciones (sin usar res)
const listarNotificaciones = async () => {
  try {
    const notificaciones = await Notificacion.find();
    return notificaciones;
  } catch (error) {
    throw new Error(error.message);
  }
};

const crearNotificacion = async (dato) => {
  try {
    const nueva = new Notificacion(dato);
    await nueva.save();
    return nueva;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { listarNotificaciones, crearNotificacion };
