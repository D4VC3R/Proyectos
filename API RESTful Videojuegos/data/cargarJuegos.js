// Este archivo no forma parte del proyecto, es solo para cargar datos y probar la API.
// Es un script para cargar el archivo data.json pasando por la API.
const axios = require('axios');

const API_URL = 'http://localhost:3000/videojuegos';

const videojuegos = require('./data.json'); 
const cargarJuegos = async () => {
    for (const juegos of videojuegos) {
        try {
            const response = await axios.post(API_URL, juegos);
            console.log(`Añadido: ${response.data.titulo}`);
        } catch (error) {
            console.error(`Error al añadir ${juegos.titulo}:`, error.response ? error.response.data : error.message);
        }
    }
}

cargarJuegos();