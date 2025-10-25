const { Router } = require("express");
const router = Router();
const { obtenerConfiguracion, actualizarConfiguracion } = require("../db/controller/configuracionController");

router.get("/", async (req, res) => {
  try {
    const config = await obtenerConfiguracion();
    res.render("configuracion", { title: "Configuración", configuracion: config });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Cambiado a POST para que funcione con el formulario
router.post("/", actualizarConfiguracion);

module.exports = router;