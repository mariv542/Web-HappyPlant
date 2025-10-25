const { Router } = require("express");
const router = Router();
const { listarHistorial } = require("../db/controller/historialController");

router.get("/", async (req, res) => {
  try {
    const historial = await listarHistorial(); // ✅ ahora devuelve datos
    res.render("historial", { title: "Historial", historial });
  } catch (error) {
    res.status(500).send(error.message); // ✅ Aquí usamos res
  }
});

module.exports = router;
