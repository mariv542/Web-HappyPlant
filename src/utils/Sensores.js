// src/utils/Sensores.js
const { crearHistorial } = require("../db/controller/historialController");

module.exports = function(io) {
  let tempActual = 22;
  let humActual = 75;

  function generarValores() {
    let tempAnterior = tempActual;
    let humAnterior = humActual;

    tempActual += Math.random() * 0.6 - 0.3;
    humActual += Math.random() * 2 - 1;

    tempActual = Math.min(Math.max(tempActual, 18), 26);
    humActual = Math.min(Math.max(humActual, 60), 90);

    // Guardar en BD
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

    // Emitir datos en tiempo real
    if (io) {
      io.emit("actualizarSensores", {
        temperatura: tempActual.toFixed(1),
        tempAnterior: tempAnterior.toFixed(1),
        humedad: humActual.toFixed(1),
        humAnterior: humAnterior.toFixed(1),
      });
    }
  }

  // Ejecutar cada 10 segundos
  setInterval(generarValores, 10000);
};
