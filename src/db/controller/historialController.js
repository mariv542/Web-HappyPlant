const mongoose = require("mongoose");

const historialSchema = new mongoose.Schema({
  plantaId: String,
  tipo: String,
  detalle: Object,
  fechaHora: String,
});

const Historial = mongoose.model("Historial", historialSchema);

const listarHistorial = async () => {
  try {
    return await Historial.find().sort({ _id: -1 }); // más recientes primero
  } catch (error) {
    throw new Error(error.message);
  }
};

const crearHistorial = async (dato) => {
  try {
    const nuevo = new Historial(dato);
    await nuevo.save();
    return nuevo;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { listarHistorial, crearHistorial };
