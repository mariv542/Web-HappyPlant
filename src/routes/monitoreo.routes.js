const { Router } = require("express");
const router = Router();
const { listarMonitoreo, ObetenerSensores } = require("../db/controller/monitoreoController");
const { crearHistorial } = require("../db/controller/historialController");

// Ruta principal
router.get("/", async (req, res) => {
  try {
    const sensoresBD = await listarMonitoreo();
    const sensoresOb = ObetenerSensores();
    const sensores = sensoresBD.length
      ? [...sensoresBD, ...sensoresOb]
      : sensoresOb;

    res.render("sensores", { title: "Monitoreo de Sensores", sensores });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ✅ Ruta para guardar datos simulados en MongoDB
router.post("/guardar", async (req, res) => {
  try {
    const { tipo, valor } = req.body;

    const nuevoHistorial = await crearHistorial({
      plantaId: "1",
      tipo,
      detalle: { valor },
      fechaHora: new Date().toLocaleString(),
    });

    res.status(200).json({ ok: true, historial: nuevoHistorial });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
});

module.exports = router;
