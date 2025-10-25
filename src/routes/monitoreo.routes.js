const { Router } = require("express");
const router = Router();
const { listarMonitoreo } = require("../db/controller/monitoreoController");

router.get("/", async (req, res) => {
  try {
    const sensores = await listarMonitoreo();
    res.render("sensores/sensores", { title: "Monitoreo de Sensores", sensores });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
