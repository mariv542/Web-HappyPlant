const mongoose = require("mongoose");

const historialSchema = new mongoose.Schema({
  id: String,
  plantaId: String,
  tipo: String,
  detalle: Object,
  fechaHora: String,
});

const Historial = mongoose.model("Historial", historialSchema);

// Solo devuelve los datos, no usa res
const listarHistorial = async () => {
  try {
    const historial = await Historial.find();
    return historial; // ✅ devuelve la lista
  } catch (error) {
    throw new Error(error.message);
  }
};

const crearHistorial = async (dato) => {
  try {
    const h = new Historial(dato);
    await h.save();
    return h;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { listarHistorial, crearHistorial };
