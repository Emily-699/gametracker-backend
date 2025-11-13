const express = require('express');
const router = express.Router();
const resenaControlador = require('../controladores/resenaControladores');

// GET /api/resenas - Obtener todas las reseñas
router.get('/', resenaControlador.obtenerResenas);

// GET /api/resenas/juego/:juegoId - Obtener reseñas de un juego específico
router.get('/juego/:juegoId', resenaControlador.obtenerResenasPorJuego);

// GET /api/resenas/:id - Obtener una reseña por ID
router.get('/:id', resenaControlador.obtenerResenaPorId);

// POST /api/resenas - Crear una nueva reseña
router.post('/', resenaControlador.crearResena);

// PUT /api/resenas/:id - Actualizar una reseña
router.put('/:id', resenaControlador.actualizarResena);

// DELETE /api/resenas/:id - Eliminar una reseña
router.delete('/:id', resenaControlador.eliminarResena);

module.exports = router;