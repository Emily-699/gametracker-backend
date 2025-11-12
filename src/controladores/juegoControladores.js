const Juego = require('../modelos/Juego');
const Resena = require('../modelos/Resena');

// Middleware para validar ObjectId
const validarObjectId = (id) => {
  return id.match(/^[0-9a-fA-F]{24}$/);
};

// Obtener todos los juegos
exports.obtenerJuegos = async (req, res) => {
  try {
    const { genero, plataforma, completado, buscar } = req.query;
    let filtros = {};
    
    // Aplicar filtros si existen
    if (genero) filtros.genero = genero;
    if (plataforma) filtros.plataforma = plataforma;
    if (completado !== undefined) filtros.completado = completado === 'true';
    if (buscar) {
      filtros.$or = [
        { titulo: { $regex: buscar, $options: 'i' } },
        { desarrollador: { $regex: buscar, $options: 'i' } }
      ];
    }
    
    const juegos = await Juego.find(filtros).sort({ fechaCreacion: -1 });
    
    res.json({
      success: true,
      cantidad: juegos.length,
      data: juegos
    });
  } catch (error) {
    console.error('Error en obtenerJuegos:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener los juegos',
      error: error.message
    });
  }
};

// Obtener un juego por ID
exports.obtenerJuegoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validar formato de ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        mensaje: 'ID de juego inválido'
      });
    }
    
    const juego = await Juego.findById(id);
    
    if (!juego) {
      return res.status(404).json({
        success: false,
        mensaje: 'Juego no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: juego
    });
  } catch (error) {
    console.error('Error en obtenerJuegoPorId:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener el juego',
      error: error.message
    });
  }
};

// Crear un nuevo juego
exports.crearJuego = async (req, res) => {
  try {
    const { titulo, genero, plataforma } = req.body;
    
    // Validaciones básicas
    if (!titulo || !genero || !plataforma) {
      return res.status(400).json({
        success: false,
        mensaje: 'Título, género y plataforma son obligatorios'
      });
    }
    
    // Verificar si ya existe un juego con el mismo título
    const juegoExistente = await Juego.findOne({ 
      titulo: { $regex: new RegExp(`^${titulo}$`, 'i') } 
    });
    
    if (juegoExistente) {
      return res.status(409).json({
        success: false,
        mensaje: 'Ya existe un juego con ese título'
      });
    }
    
    const nuevoJuego = new Juego(req.body);
    const juegoGuardado = await nuevoJuego.save();
    
    console.log('Juego creado:', juegoGuardado.titulo);
    
    res.status(201).json({
      success: true,
      mensaje: 'Juego creado exitosamente',
      data: juegoGuardado
    });
  } catch (error) {
    console.error('Error en crearJuego:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        mensaje: 'Error de validación',
        errors
      });
    }
    
    res.status(500).json({
      success: false,
      mensaje: 'Error interno al crear el juego',
      error: error.message
    });
  }
};

// Actualizar un juego
exports.actualizarJuego = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validar formato de ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        mensaje: 'ID de juego inválido'
      });
    }
    
    const juegoActualizado = await Juego.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!juegoActualizado) {
      return res.status(404).json({
        success: false,
        mensaje: 'Juego no encontrado'
      });
    }
    
    console.log('Juego actualizado:', juegoActualizado.titulo);
    
    res.json({
      success: true,
      mensaje: 'Juego actualizado exitosamente',
      data: juegoActualizado
    });
  } catch (error) {
    console.error('Error en actualizarJuego:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        mensaje: 'Error de validación',
        errors
      });
    }
    
    res.status(500).json({
      success: false,
      mensaje: 'Error interno al actualizar el juego',
      error: error.message
    });
  }
};

// Eliminar un juego
exports.eliminarJuego = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validar formato de ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        mensaje: 'ID de juego inválido'
      });
    }
    
    const juegoEliminado = await Juego.findByIdAndDelete(id);
    
    if (!juegoEliminado) {
      return res.status(404).json({
        success: false,
        mensaje: 'Juego no encontrado'
      });
    }
    
    console.log('Juego eliminado:', juegoEliminado.titulo);
    
    res.json({
      success: true,
      mensaje: 'Juego eliminado exitosamente',
      data: juegoEliminado
    });
  } catch (error) {
    console.error('Error en eliminarJuego:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error interno al eliminar el juego',
      error: error.message
    });
  }
};
