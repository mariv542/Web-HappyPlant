const path = require("path");
const cron = require("node-cron");
const { enviarCorreo } = require("../mailer/mailer");
const ejs = require("ejs");

// RUTA ABSOLUTA al modelo
const CalendarioRiego = require("../../models/Calendario.js");

const templatePath = path.resolve(__dirname, "../../views/partials/correoRecordatorio.ejs");


cron.schedule("* * * * *", async () => {
  const ahora = new Date();
  const hoy = ahora.toISOString().split("T")[0];
  const hora = ahora.toTimeString().slice(0, 5);

  const eventosPendientes = await CalendarioRiego.find({
    dia: hoy,
    hora: hora,
    enviado: false,
    email: { $exists: true, $ne: "" }
  });

  for (const evento of eventosPendientes) {
    const mensajeHtml = await ejs.renderFile(templatePath, {
      nombre: evento.nombre,
      plantaId: evento.plantaId,
      dia: evento.dia,
      hora: evento.hora
    });

    await enviarCorreo(evento.email, "💧 ¡Hora de regar tu planta!", mensajeHtml);

    evento.enviado = true;
    await evento.save();

    console.log(`📨 Recordatorio enviado a ${evento.email}`);
  }
});
