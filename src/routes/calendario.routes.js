const { Router } = require("express");
const router = Router();
const { listarCalendario } = require("../db/controller/calendarioController");

router.get("/", async (req, res) => {
  try {
    const calendario = await listarCalendario(); // Trae los datos de MongoDB
    res.render("calendario", { title: "Calendario de Riego", calendario });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    await crearCalendario(req.body);
    res.redirect("/calendario");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
