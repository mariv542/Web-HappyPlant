// calendarioController.js
const mongoose = require("mongoose");
const path = require("path");
const ejs = require("ejs");
const { enviarCorreo } = require("../../utils/mailer/mailer"); // Ajusta la ruta según tu proyecto
const { Router } = require("express");

// ===== Esquema y modelo =====
const calendarioSchema = new mongoose.Schema({
  nombre: { type: String },       // opcional, nombre del cliente o planta
  plantaId: { type: String },     // opcional, id de la planta
  dia: { type: String, required: true },  // yyyy-mm-dd
  hora: { type: String, required: true }, // hh:mm
  email: { type: String }          // correo del cliente
});

const Calendario = mongoose.model("Calendario", calendarioSchema);

// ===== Funciones del controlador =====

// Listar todos los riegos
const listarCalendario = async () => {
  try {
    const eventos = await Calendario.find().sort({ dia: 1, hora: 1 });
    return eventos;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Crear un nuevo riego y enviar correo
const crearCalendario = async (dato) => {
  try {
    const nuevo = new Calendario(dato);
    await nuevo.save();

    if (dato.email) {
      const templatePath = path.join(__dirname, "../../views/partials/correoRecordatorio.ejs");
      const mensajeHtml = await ejs.renderFile(templatePath, {
        nombre: dato.nombre,
        plantaId: dato.plantaId,
        dia: dato.dia,
        hora: dato.hora
      });

      await enviarCorreo(dato.email, "🌱 Recordatorio de riego creado", mensajeHtml);
    }

    return nuevo;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Eliminar un riego por ID
const eliminarCalendario = async (id) => {
  try {
    await Calendario.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Editar un riego por ID
const editarCalendario = async (id, nuevosDatos) => {
  try {
    await Calendario.findByIdAndUpdate(id, nuevosDatos);
  } catch (error) {
    throw new Error(error.message);
  }
};

// ===== Router =====
const router = Router();

// Mostrar calendario
router.get("/", async (req, res) => {
  try {
    const calendario = await listarCalendario();
    res.render("calendario", { title: "Calendario de Riego", calendario });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Crear riego
router.post("/", async (req, res) => {
  try {
    await crearCalendario(req.body);
    res.redirect("/calendario");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Eliminar riego
router.post("/eliminar/:id", async (req, res) => {
  try {
    await eliminarCalendario(req.params.id);
    res.redirect("/calendario");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Editar riego
router.post("/editar/:id", async (req, res) => {
  try {
    await editarCalendario(req.params.id, req.body);
    res.redirect("/calendario");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = {
  router,              // tu router de Express
  listarCalendario,
  crearCalendario,
  eliminarCalendario,
  editarCalendario
};
