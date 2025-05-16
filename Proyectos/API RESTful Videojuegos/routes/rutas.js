const express = require('express');
const router = express.Router();

// Importar las funciones del controlador
const {
    getVideojuegos,
    getVideojuegoPorId,
    crearVideojuego,
    actualizarVideojuego,
    eliminarVideojuego
} = require('../controllers/videojuegosController.js');

// Importar el middleware para validar los campos
const validarNuevoJuego = require('../middlewares/validarNuevoVideojuego.js');
const validarActualizacion = require('../middlewares/validarActualizacion.js');

// Definir las rutas y asignar las funciones
router.get('/', getVideojuegos);
router.get('/:id', getVideojuegoPorId); // :id es un valor dinámico
router.post('/', validarNuevoJuego, crearVideojuego);
router.put('/:id', validarActualizacion, actualizarVideojuego);
router.delete('/:id', eliminarVideojuego);

module.exports = router;

