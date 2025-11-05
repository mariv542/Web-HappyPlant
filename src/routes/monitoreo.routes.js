const { Router } = require("express");
const router = Router();
const { listarMonitoreo, ObetenerSensores } = require("../db/controller/monitoreoController");


// Ruta principal
router.get("/", async (req, res) => {
  try {
    const sensoresBD = await listarMonitoreo();
    const sensoresOb = ObetenerSensores();

    // Combinar sensores reales 
    const sensores = sensoresBD.length
      ? [...sensoresBD, ...sensoresOb]
      : sensoresOb;

    res.render("sensores", { title: "Monitoreo de Sensores", sensores });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
