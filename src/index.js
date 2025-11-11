const express = require("express");
const path = require("path");
const morgan = require("morgan");
const dotenv = require("dotenv");
const conectarDB = require("./db/connection");
const expressLayouts = require("express-ejs-layouts");
const http = require("http");
const { Server } = require("socket.io");

// ==== Configuración inicial ====
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

// ==== Middleware ====
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

// ==== Motor de vistas (EJS) + Layouts ====
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "Layouts/main");

// ==== Conexión a MongoDB ====
conectarDB();

// ==== Importar simulación de sensores ====
require("./utils/Sensores")(io); // <-- pasamos io para emitir datos en tiempo real

// ==== Rutas principales ====
const mainRoutes = require("./routes/routes");
app.use("/", mainRoutes);

// ==== Manejo de 404 ====
app.use((req, res) => {
  res.status(404).send("❌ Ruta no encontrada");
});

// ==== Iniciar servidor ====
server.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
