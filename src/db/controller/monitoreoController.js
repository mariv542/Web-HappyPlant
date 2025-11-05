const mongoose = require("mongoose");

// Definición del esquema de sensores
const sensorSchema = new mongoose.Schema({
  id: String,
  tipo: String,
  conexion: String,
  activo: Boolean,
  ultimoDato: { valor: Number, fechaHora: String },
  rangoOptimo: { min: Number, max: Number },
});

// Definición del esquema de monitoreo
const monitoreoSchema = new mongoose.Schema({
  plantaId: String,
  sensores: [sensorSchema],
});

// ✅ Aquí defines el modelo Monitoreo
const Monitoreo = mongoose.model("Monitoreo", monitoreoSchema);

// ===== Funciones del controlador (sin usar res) =====
const listarMonitoreo = async () => {
  try {
    const lista = await Monitoreo.find();
    return lista;
  } catch (error) {
    throw new Error(error.message);
  }
};

const obtenerMonitoreo = async (plantaId) => {
  try {
    const item = await Monitoreo.findOne({ plantaId });
    if (!item) throw new Error("No encontrado");
    return item;
  } catch (error) {
    throw new Error(error.message);
  }
};

const crearMonitoreo = async (dato) => {
  try {
    const nuevo = new Monitoreo(dato);
    await nuevo.save();
    return nuevo;
  } catch (error) {
    throw new Error(error.message);
  }
};

function ObetenerSensores() {
  return [
    { tipo: "Temperatura", activo: true },
    { tipo: "Humedad", activo: true },
  ];
}

module.exports = { listarMonitoreo, obtenerMonitoreo, crearMonitoreo, ObetenerSensores };
