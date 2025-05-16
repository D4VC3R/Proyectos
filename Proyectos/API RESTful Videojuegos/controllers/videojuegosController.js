const Videojuego = require('../models/Videojuego'); // Importar el modelo de videojuego

// Obtener todos los videojuegos
const getVideojuegos = async (req, res) => {
    try {
        const videojuegos = await Videojuego.find();
        res.json(videojuegos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los videojuegos', error });
    }
};

// Obtener los videojuegos por ID
const getVideojuegoPorId = async (req, res) => {
    const id = req.params.id; // Obtener el ID desde la URL

    try {
        const videojuego = await Videojuego.findById(id); // Buscar el videojuego por ID en la base de datos
        if (!videojuego) {
            return res.status(404).json({ message: 'Videojuego no encontrado' }); 
        }
        res.json(videojuego);  // Devuelve toda la informacion del videojuego
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el videojuego', error });
    }
};

// Añadir un nuevo videojuego a la API con funcion asincrona para usar await
const crearVideojuego = async (req, res) => {
    
    try {
        // En req.body se encuentra el contenido que el cliente manda en la peticion (debe ser JSON)
        const {titulo, desarrollador, publisher, fechaLanzamiento, plataformas, genero, duracion, calificacion, descripcion, imagen} = req.body;

        const nuevoVideojuego = new Videojuego({
            titulo,
            desarrollador,
            publisher,
            fechaLanzamiento,
            plataformas,
            genero,
            duracion,
            calificacion,
            descripcion,
            imagen
        });

        await nuevoVideojuego.save(); // Guardar el nuevo juego en la base de datos
        res.status(201).json(nuevoVideojuego); // La API responde con el nuevo videojuego creado y el codigo 201 que indica éxito en el proceso
    } catch (error) {
        res.status(500).json({mensaje: 'Error al crear el videojuego', error}); // Si hay un error responde con esto
    }
};

// Actualizar la información de un videojuego existente
const actualizarVideojuego = async (req, res) => {
    const { id } = req.params;  // Obtener el ID del videojuego a actualizar
    const { titulo, desarrollador, publisher, fechaLanzamiento, plataformas, genero, duracion, calificacion, descripcion, imagen } = req.body;

    try {
        // Buscar y actualizar el videojuego en la base de datos
        const videojuegoActualizado = await Videojuego.findByIdAndUpdate(
            id,
            {
                titulo,
                desarrollador,
                publisher,
                fechaLanzamiento,
                plataformas,
                genero,
                duracion,
                calificacion,
                descripcion,
                imagen
            },
            { new: true }  // Para que devuelva el documento actualizado
        );

        if (!videojuegoActualizado) {
            return res.status(404).json({ message: 'Videojuego no encontrado' });
        }

        res.json(videojuegoActualizado);  // Responde con el videojuego actualizado
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el videojuego', error });
    }
};

// Borrar un videojuego de la API
const eliminarVideojuego = async (req, res) => {
    const { id } = req.params;
    try {
        const videojuegoEliminado = await Videojuego.findByIdAndDelete(id); // Buscar y eliminar el videojuego por ID
        if (!videojuegoEliminado) {
            return res.status(404).json({ message: 'Videojuego no encontrado' });
        }
        res.json({ message: 'Videojuego eliminado' });  
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el videojuego', error });
    }
};

// Exportar las funciones
module.exports = {
    getVideojuegoPorId,
    getVideojuegos,
    crearVideojuego,
    actualizarVideojuego,
    eliminarVideojuego
};