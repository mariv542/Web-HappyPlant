const express = require("express");
const path = require("path");
const morgan = require("morgan");
const dotenv = require("dotenv");
const conectarDB = require("./db/connection");
const mainRoutes = require("./routes/routes");
const expressLayouts = require("express-ejs-layouts");
require("./utils/scheduler/cron.js");

// ==== Configuración inicial ====
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// ==== Middleware ====
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

// ==== Motor de vistas (EJS) + Layouts ====
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);                 // <-- Activar layouts
app.set("layout", "Layouts/main");       // <-- Layout por defecto

// ==== Conexión a MongoDB ====
conectarDB();

// ==== Rutas principales ====
app.use("/", mainRoutes);

// ==== Manejo de 404 ====
app.use((req, res) => {
  res.status(404).send("❌ Ruta no encontrada");
});

// ==== Iniciar servidor ====
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
