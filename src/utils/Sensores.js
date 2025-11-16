// src/utils/Sensores.js
const { crearHistorial } = require("../db/controller/historialController");

let ioRef = null;
let intervalId = null;

let tempActual = 22;
let humActual = 40;

let objetivoTemp = null;
let objetivoHum = null;

let modo = "normal"; // normal | alteracion | regresando

const objetivoTempBase = 22;
const objetivoHumBase = 40;

function generarValores() {
  let tempAnterior = tempActual;
  let humAnterior = humActual;

  console.log("\n==============================");
  console.log("📡 GENERANDO NUEVA LECTURA...");
  console.log("Modo:", modo);
  console.log("Temp actual:", tempActual.toFixed(1), "°C");
  console.log("Hum actual:", humActual.toFixed(1), "%");
  console.log("Objetivo Temp:", objetivoTemp);
  console.log("Objetivo Hum:", objetivoHum);

  // ======================================================
  // 🔥 MODO ALTERACIÓN
  // ======================================================
  if (modo === "alteracion") {
    console.log("⚠ MODO ALTERACIÓN ACTIVADO");

    // SUPER LENTO → 0.05
    if (objetivoTemp !== null) {
      const before = tempActual;
      tempActual += (objetivoTemp - tempActual) * 0.05;
      console.log(`   🌡 Temp avanza: ${before.toFixed(2)} → ${tempActual.toFixed(2)}`);

      if (Math.abs(tempActual - objetivoTemp) < 0.05) {
        tempActual = objetivoTemp;
        objetivoTemp = null;
        console.log("   ✔ Temp alcanzó objetivo FINAL");
      }
    }

    if (objetivoHum !== null) {
      const before = humActual;
      humActual += (objetivoHum - humActual) * 0.05;
      console.log(`   💧 Hum avanza: ${before.toFixed(2)} → ${humActual.toFixed(2)}`);

      if (Math.abs(humActual - objetivoHum) < 0.2) {
        humActual = objetivoHum;
        objetivoHum = null;
        console.log("   ✔ Humedad alcanzó objetivo FINAL");
      }
    }

    // Pasar a modo regreso
    if (objetivoTemp === null && objetivoHum === null) {
      console.log("✨ Alteración terminada → comenzando regreso a valores base...");
      modo = "regresando";

      objetivoTemp = objetivoTempBase;
      objetivoHum = objetivoHumBase;
    }
  }

  // ======================================================
  // 🔄 MODO REGRESO SUPER LENTO
  // ======================================================
  else if (modo === "regresando") {
    console.log("🔄 VOLVIENDO A VALORES NORMALES...");

    // SUPER LENTO → 0.02
    if (objetivoTemp !== null) {
      const before = tempActual;
      tempActual += (objetivoTemp - tempActual) * 0.02;
      console.log(`   🌡 Temp vuelve: ${before.toFixed(2)} → ${tempActual.toFixed(2)}`);

      if (Math.abs(tempActual - objetivoTemp) < 0.05) {
        tempActual = objetivoTemp;
        objetivoTemp = null;
      }
    }

    if (objetivoHum !== null) {
      const before = humActual;
      humActual += (objetivoHum - humActual) * 0.02;
      console.log(`   💧 Hum vuelve: ${before.toFixed(2)} → ${humActual.toFixed(2)}`);

      if (Math.abs(humActual - objetivoHum) < 0.2) {
        humActual = objetivoHum;
        objetivoHum = null;
      }
    }

    if (objetivoTemp === null && objetivoHum === null) {
      console.log("✅ Sensores regresaron completamente a valores normales.");
      modo = "normal";
    }
  }

  // ======================================================
  // 🟢 MODO NORMAL
  // ======================================================
  else {
    console.log("🟢 MODO NORMAL (sin alteración)");
    tempActual += Math.random() * 0.4 - 0.2;
    humActual += Math.random() * 1.0 - 0.5;
  }

  // Límites
  tempActual = Math.min(Math.max(tempActual, -5), 50);
  humActual = Math.min(Math.max(humActual, 0), 100);

  console.log("➡ RESULTADO FINAL ESTA RONDA:");
  console.log("   🌡 Temp:", tempActual.toFixed(1), "°C");
  console.log("   💧 Hum :", humActual.toFixed(1), "%");

  // Guardar
  crearHistorial({
    plantaId: "1",
    tipo: "temperatura",
    detalle: { valor: tempActual.toFixed(1) },
    fechaHora: new Date().toLocaleString(),
  });

  crearHistorial({
    plantaId: "1",
    tipo: "humedad",
    detalle: { valor: humActual.toFixed(1) },
    fechaHora: new Date().toLocaleString(),
  });

  // Emitir
  if (ioRef) {
    console.log("📤 Emitiendo a clientes...");
    ioRef.emit("actualizarSensores", {
      temperatura: tempActual.toFixed(1),
      tempAnterior: tempAnterior.toFixed(1),
      humedad: humActual.toFixed(1),
      humAnterior: humAnterior.toFixed(1),
    });
  }

  console.log("==============================\n");
}


// ==============================
//   INICIALIZAR SIMULADOR
// ==============================
function init(io, intervaloMs = 1000) {
  ioRef = io;

  console.log("🚀 Simulador iniciado");
  console.log("Valores iniciales → Temp: 22°C | Hum: 40%");

  tempActual = 22;
  humActual = 40;
  modo = "normal";

  objetivoTemp = null;
  objetivoHum = null;

  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(generarValores, intervaloMs);

  ioRef.on("connection", (socket) => {
    console.log("🟢 Cliente conectado, enviando estado inicial...");
    socket.emit("actualizarSensores", {
      temperatura: tempActual.toFixed(1),
      tempAnterior: tempActual.toFixed(1),
      humedad: humActual.toFixed(1),
      humAnterior: humActual.toFixed(1),
    });
  });
}


// ==============================
//   ACTIVAR CAMBIO LENTO
// ==============================
function forzarCambio() {
  console.log("\n🔥 forzarCambio() llamado");

  modo = "alteracion";

  objetivoTemp = tempActual - 4;
  objetivoHum = 70 + Math.random() * 10;

  console.log("➡ NUEVOS OBJETIVOS:");
  console.log("   🌡 Temp objetivo:", objetivoTemp);
  console.log("   💧 Hum objetivo :", objetivoHum);
  console.log("====================================\n");

  return { objetivoTemp, objetivoHum };
}


// ==============================
//   RESET A VALORES INICIALES
// ==============================
function resetearValores() {
  console.log("\n🔄 Reset sensores...");

  tempActual = 22;
  humActual = 40;
  modo = "normal";

  objetivoTemp = null;
  objetivoHum = null;

  if (ioRef) {
    ioRef.emit("actualizarSensores", {
      temperatura: tempActual.toFixed(1),
      tempAnterior: tempActual.toFixed(1),
      humedad: humActual.toFixed(1),
      humAnterior: humAnterior.toFixed(1),
    });
  }
}

module.exports = { init, forzarCambio, resetearValores };
