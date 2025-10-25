const mongoose = require("mongoose");

const calendarioSchema = new mongoose.Schema({
  id: String,
  plantaId: String,
  dia: String,
  hora: String,
  duracionMin: Number,
});

const CalendarioRiego = mongoose.model("CalendarioRiego", calendarioSchema);

const listarCalendario = async (req, res) => {
  try {
    const lista = await CalendarioRiego.find();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const crearCalendario = async (req, res) => {
  try {
    const nuevo = new CalendarioRiego(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { listarCalendario, crearCalendario };
