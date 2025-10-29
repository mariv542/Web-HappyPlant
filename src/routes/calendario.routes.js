const { Router } = require("express");
const router = Router();
const { listarCalendario, crearCalendario, eliminarCalendario, editarCalendario } = 
      require("../db/controller/calendarioController");

router.get("/", async (req, res) => {
  try {
    const calendario = await listarCalendario();
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

// Eliminar riego
router.post("/eliminar/:id", async (req, res) => {
  try {
    await eliminarCalendario(req.params.id);
    res.redirect("/calendario");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ✏️ Editar riego
router.post("/editar/:id", async (req, res) => {
  try {
    await editarCalendario(req.params.id, req.body);
    res.redirect("/calendario");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
