const { Router } = require("express");
const router = Router();
const { listarNotificaciones } = require("../db/controller/notificacionControllers");

router.get("/", async (req, res) => {
  try {
    const notificaciones = await listarNotificaciones();
    res.render("notificaciones", { title: "Notificaciones", notificaciones });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;