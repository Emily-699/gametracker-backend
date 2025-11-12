const Resena = require('../modelos/Resena');
const Juego = require('../modelos/Juego');

// Obtener todas las reseñas
exports.obtenerResenas = async (req, res) => {
  try {
    const resenas = await Resena.find()
      .populate('juegoId', 'titulo imagenPortada')
      .sort({ fechaCreacion: -1 });
    
    res.json({
      success: true,
      cantidad: resenas.length,
      data: resenas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener las reseñas',
      error: error.message
    });
  }
};

// Obtener reseñas de un juego específico
exports.obtenerResenasPorJuego = async (req, res) => {
  try {
    const resenas = await Resena.find({ juegoId: req.params.juegoId })
      .populate('juegoId', 'titulo imagenPortada')
      .sort({ fechaCreacion: -1 });
    
    res.json({
      success: true,
      cantidad: resenas.length,
      data: resenas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener las reseñas del juego',
      error: error.message
    });
  }
};

// Obtener una reseña por ID
exports.obtenerResenaPorId = async (req, res) => {
  try {
    const resena = await Resena.findById(req.params.id)
      .populate('juegoId', 'titulo imagenPortada');
    
    if (!resena) {
      return res.status(404).json({
        success: false,
        mensaje: 'Reseña no encontrada'
      });
    }
    
    res.json({
      success: true,
      data: resena
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener la reseña',
      error: error.message
    });
  }
};

// Crear una nueva reseña
exports.crearResena = async (req, res) => {
  try {
    // Verificar que el juego existe
    const juego = await Juego.findById(req.body.juegoId);
    if (!juego) {
      return res.status(404).json({
        success: false,
        mensaje: 'El juego no existe'
      });
    }
    
    const nuevaResena = new Resena(req.body);
    const resenaGuardada = await nuevaResena.save();
    
    // Poblar información del juego
    await resenaGuardada.populate('juegoId', 'titulo imagenPortada');
    
    res.status(201).json({
      success: true,
      mensaje: 'Reseña creada exitosamente',
      data: resenaGuardada
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      mensaje: 'Error al crear la reseña',
      error: error.message
    });
  }
};

// Actualizar una reseña
exports.actualizarResena = async (req, res) => {
  try {
    const resenaActualizada = await Resena.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('juegoId', 'titulo imagenPortada');
    
    if (!resenaActualizada) {
      return res.status(404).json({
        success: false,
        mensaje: 'Reseña no encontrada'
      });
    }
    
    res.json({
      success: true,
      mensaje: 'Reseña actualizada exitosamente',
      data: resenaActualizada
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      mensaje: 'Error al actualizar la reseña',
      error: error.message
    });
  }
};

// Eliminar una reseña
exports.eliminarResena = async (req, res) => {
  try {
    const resenaEliminada = await Resena.findByIdAndDelete(req.params.id);
    
    if (!resenaEliminada) {
      return res.status(404).json({
        success: false,
        mensaje: 'Reseña no encontrada'
      });
    }
    
    res.json({
      success: true,
      mensaje: 'Reseña eliminada exitosamente',
      data: resenaEliminada
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: 'Error al eliminar la reseña',
      error: error.message
    });
  }
};