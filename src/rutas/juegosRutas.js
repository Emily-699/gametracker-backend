const express = require('express');
const router = express.Router();
const juegoControlador = require('../controladores/juegoControladores');

// GET /api/juegos - Obtener todos los juegos
router.get('/', juegoControlador.obtenerJuegos);

// GET /api/juegos/:id - Obtener un juego por ID
router.get('/:id', juegoControlador.obtenerJuegoPorId);

// POST /api/juegos - Crear un nuevo juego
router.post('/', juegoControlador.crearJuego);

// PUT /api/juegos/:id - Actualizar un juego
router.put('/:id', juegoControlador.actualizarJuego);

// DELETE /api/juegos/:id - Eliminar un juego
router.delete('/:id', juegoControlador.eliminarJuego);

module.exports = router;