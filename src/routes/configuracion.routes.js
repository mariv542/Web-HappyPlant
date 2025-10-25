const { Router } = require("express");
const router = Router();
const { obtenerConfiguracion, actualizarConfiguracion } = require("../db/controller/configuracionController");

router.get("/", async (req, res) => {
  try {
    const config = await obtenerConfiguracion(); // Trae configuración de la DB
    res.render("configuraciones", { title: "Configuración", config });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/", actualizarConfiguracion);

module.exports = router;
