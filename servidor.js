const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 🔹 Conectar a MongoDB Atlas directamente
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado correctamente a MongoDB Atlas'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err.message));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({ 
    mensaje: '🎮 Bienvenido a la API de GameTracker',
    version: '1.0.0',
    endpoints: {
      juegos: '/api/juegos',
      resenas: '/api/resenas'
    }
  });
});

// Rutas de la API
app.use('/api/juegos', require('./src/rutas/juegos'));
app.use('/api/resenas', require('./src/rutas/resenas'));

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    mensaje: 'Ruta no encontrada'
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    mensaje: 'Error interno del servidor',
    error: err.message
  });
});

// Puerto y servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
