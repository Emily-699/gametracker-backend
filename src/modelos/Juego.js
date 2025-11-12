const mongoose = require('mongoose');

const juegoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true
  },
  genero: {
    type: String,
    required: [true, 'El género es obligatorio'],
    enum: ['Acción', 'RPG', 'Aventura', 'Deportes', 'Estrategia', 'Puzzle', 'Simulación', 'Terror', 'Carreras', 'Plataformas', 'Shooter', 'Otro']
  },
  plataforma: {
    type: String,
    required: [true, 'La plataforma es obligatoria'],
    enum: ['PC', 'PlayStation 4', 'PlayStation 5', 'Xbox One', 'Xbox Series X/S', 'Nintendo Switch', 'Mobile', 'Otra']
  },
  añoLanzamiento: {
    type: Number,
    min: [1970, 'El año debe ser mayor a 1970'],
    max: [new Date().getFullYear(), 'El año no puede ser futuro']
  },
  desarrollador: {
    type: String,
    trim: true
  },
  imagenPortada: {
    type: String,
  default: 'https://via.placeholder.com/300x400?text=Sin+Portada'
  },
  descripcion: {
    type: String,
    maxlength: [1000, 'La descripción no puede superar los 1000 caracteres']
  },
  completado: {
    type: Boolean,
    default: false
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Juego', juegoSchema);