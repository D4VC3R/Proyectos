require('dotenv').config(); // Importar dotenv para leer las variables de entorno
const mongoose = require('mongoose'); // Importar mongoose para conectarse a la base de datos
const express = require('express'); // Importar express, el nombre de la constante es por convención. require('express') le dice a Node que busque la carpeta express y la importe
const app = express(); // Crear una instancia de una aplicacion express

mongoose.connect(process.env.MONGODB_URI, { // Conectar a la base de datos MongoDB Atlas, process.env.MONGODB_URI es la variable de entorno que contiene la URI de conexión a la base de datos
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch(error => console.error('❌ Error al conectar a MongoDB:', error));

const PORT = process.env.PORT || 3000; // Definir el puerto (Variable de entrada o 3000 por defecto)

app.use(express.json()); // Herramienta intermedia que lee el cuerpo de las peticiones en formato JSON y lo convierte en objeto

// Importar y usar las rutas
const rutaVideojuegos = require ('./routes/rutas');
app.use('/videojuegos', rutaVideojuegos);

// Importar y usar el manejador de errores
const manejadorErrores = require('./middlewares/manejadorErrores'); // Definir el manejador de errores que vamos a utilizar
app.use(manejadorErrores);


// Iniciar el servidor y decirle a express que escuche en el puerto 3000 (o el que indique la variable PORT) todas las peticiones que lleguenp
app.listen(PORT, ()=>{
    console.log(`Escuchando el servidor en http://localhost:${PORT}`);
});