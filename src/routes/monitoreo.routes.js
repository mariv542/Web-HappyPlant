const { Router } = require("express");
const router = Router();
const { listarMonitoreo } = require("../db/controller/monitoreoController");

router.get("/", async (req, res) => {
  try {
    const sensores = await listarMonitoreo(); // obtiene los datos
    res.render("sensores", { title: "Monitoreo de Sensores", sensores }); // maneja la respuesta
  } catch (error) {
    res.status(500).send(error.message); // manejo correcto de errores
  }
});

module.exports = router;