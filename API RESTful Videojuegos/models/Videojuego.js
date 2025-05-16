const mongoose = require('mongoose');

// Definir el esquema de los videojuegos
const videojuegoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true,
        unique: true // Asegura que el título sea único
    },
    desarrollador: {
        type: String,
        required: true,
        trim: true
    },
    publisher: {
        type: String,
        required: true,
        trim: true
    },
    fechaLanzamiento: {
        type: Date,
        required: true
    },
    plataformas: {
        type: [String],
        required: true
    },
    genero: {
        type: String,
        required: true,
        trim: true
    },
    duracion: {
        type: Number,
        required: false
    },
    calificacion: {
        type: Number,
        required: false,
        min: 0,
        max: 100
    },
    descripcion: {
        type: String,
        required: false,
        trim: true 
    },
    imagen: {
        type: String, // URL de la imagen
        required: false,
        trim: true 
    }
});

const Videojuego = mongoose.model('Videojuego', videojuegoSchema);

module.exports = Videojuego;