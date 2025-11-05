const { Router } = require("express");
const router = Router();
const { listarMonitoreo } = require("../db/controller/monitoreoController");

// ✅ Sensores simulados con SOLO nombre
function generarSensoresSimulados() {
  return [
    { tipo: "Temperatura", activo: true },
    { tipo: "Humedad", activo: true },
  ];
}

// Ruta principal
router.get("/", async (req, res) => {
  try {
    const sensoresBD = await listarMonitoreo();
    const sensoresSimulados = generarSensoresSimulados();

    // Combinar sensores reales + simulados
    const sensores = sensoresBD.length
      ? [...sensoresBD, ...sensoresSimulados]
      : sensoresSimulados;

    res.render("sensores", { title: "Monitoreo de Sensores", sensores });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
