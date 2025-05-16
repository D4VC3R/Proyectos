// Este archivo no forma parte del proyecto, es solo para probar que la API funciona actualizando la calificacion de los videojuegos.
const axios = require('axios'); // Importar la librería axios para hacer peticiones HTTP

const calificacionesJuegos = require('./calificaciones.json'); // Cargar el archivo con las calificaciones

actualizarCalificaciones = async () => {
    try {
        const {data: videojuegos} = await axios.get('http://localhost:3000/videojuegos'); // Obtener todos los videojuegos de la api

        for (const juego of calificacionesJuegos) {
            const juegoEnBD = videojuegos.find(v => v.titulo === juego.titulo); // Buscar el videojuego en la base de datos por su título
            if (!juegoEnBD) {
                console.log(`No se encontró el videojuego ${juego.titulo} en la base de datos.`);
                continue; // Salta al siguiente videojuego si no se encuentra el actual
            }

            await axios.put(`http://localhost:3000/videojuegos/${juegoEnBD._id}`, { // Actaulizar el juego que coincide con el id del juego encontrado
                calificacion: juego.calificacion
            });
            console.log(`Calificación actualizada para ${juego.titulo}: ${juego.calificacion}`);

        } 
    } catch (error) {
        console.error('Error al actualizar:', error.response ? error.response.data : error.message);
    }
}

actualizarCalificaciones();