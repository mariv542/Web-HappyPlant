const { Router } = require('express');
const ruta = Router();

const calendario = require('./calendario.routes');
const notificaciones = require('./notificaciones.routes');
const monitoreo = require('./monitoreo.routes');
const configuracion = require('./configuracion.routes');
const historial = require('./historial.routes');

const { listarPlantas } = require('../db/controller/plantaController'); // <- Importa el controlador

ruta.use('/calendario', calendario);
ruta.use('/notificaciones', notificaciones); 
ruta.use('/monitoreo', monitoreo);
ruta.use('/configuracion', configuracion);
ruta.use('/historial', historial);

// Ruta principal con datos de plantas
ruta.get('/', async (req, res) => {
    try {
        const plantas = await listarPlantas(); // Trae las plantas de MongoDB
        res.render('index', { title: "Inicio", plantas }); // Pasamos las plantas a la vista
    } catch (error) {
        res.status(500).send(error.message);
    }
});

ruta.get('/alternativa', (req, res) => {
    res.send('ruta alternativa');
});

module.exports = ruta;
