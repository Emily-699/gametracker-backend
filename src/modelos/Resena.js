const mongoose = require('mongoose');

const resenaSchema = new mongoose.Schema({
  juegoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Juego',
    required: [true, 'El ID del juego es obligatorio']
  },
  puntuacion: {
    type: Number,
    required: [true, 'La puntuación es obligatoria'],
    min: [1, 'La puntuación mínima es 1'],
    max: [5, 'La puntuación máxima es 5']
  },
  textoResena: {
    type: String,
    required: [true, 'El texto de la reseña es obligatorio'],
    minlength: [10, 'La reseña debe tener al menos 10 caracteres'],
    maxlength: [2000, 'La reseña no puede superar los 2000 caracteres']
  },
  horasJugadas: {
    type: Number,
    min: [0, 'Las horas no pueden ser negativas'],
    default: 0
  },
  dificultad: {
    type: String,
    enum: ['Facil', 'Normal', 'Dificil'],
    default: 'Normal'
  },
  recomendaria: {
    type: Boolean,
    default: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Middleware para actualizar fechaActualizacion
resenaSchema.pre('save', function(next) {
  this.fechaActualizacion = Date.now();
  next();
});

module.exports = mongoose.model('Resena', resenaSchema);