const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Cargar el archivo .env desde la carpeta /config
dotenv.config({ path: path.join(__dirname, "..", ".env") });

// URI desde el archivo .env o conexión local por defecto
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/orchid_monitor";

// Función para conectar a la base de datos
const conectarDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error de conexión a MongoDB:", error.message);
    process.exit(1); // Detiene la app si falla la conexión
  }
};

module.exports = conectarDB;