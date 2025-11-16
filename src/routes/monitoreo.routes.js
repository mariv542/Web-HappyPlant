const { Router } = require("express");
const router = Router();
const { listarMonitoreo, ObetenerSensores } = require("../db/controller/monitoreoController");
const { crearHistorial } = require("../db/controller/historialController");
const Sensores = require("../utils/Sensores"); // <-- INSTANCIA REAL

// ================================
//  RUTA PRINCIPAL: /monitoreo
// ================================
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

// ===============================================
//  🔥 RUTA QUE ACTIVARÁ EL CAMBIO LENTO
//  /monitoreo/forzar
// ===============================================
router.post("/forzar", (req, res) => {
  try {
    const result = Sensores.forzarCambio(); // <-- MISMA INSTANCIA DEL SIMULADOR

    console.log("🔥 forzarCambio ejecutado:", result);

    res.json({
      ok: true,
      mensaje: "Alteración de sensores activada.",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
});

module.exports = router;
