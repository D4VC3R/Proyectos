function validarActualizacion(req, res, next) {
    const {
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
    } = req.body;

    if (titulo !== undefined && (typeof titulo !== 'string' || titulo.trim().length < 2)) {
        return res.status(400).json({ error: 'Por favor, ingresa un título válido (mínimo 2 letras).' });
    }

    if (desarrollador !== undefined && (typeof desarrollador !== 'string' || desarrollador.trim() === '')) {
        return res.status(400).json({ error: 'Por favor, indica el nombre del desarrollador.' });
    }

    if (publisher !== undefined && (typeof publisher !== 'string' || publisher.trim() === '')) {
        return res.status(400).json({ error: 'Por favor, indica el nombre del publisher.' });
    }

    if (fechaLanzamiento !== undefined && isNaN(Date.parse(fechaLanzamiento))) {
        return res.status(400).json({ error: 'Por favor, ingresa una fecha de lanzamiento válida.' });
    }

    if (plataformas !== undefined && (!Array.isArray(plataformas) || plataformas.length === 0 || !plataformas.every(p => typeof p === 'string' && p.trim() !== ''))) {
        return res.status(400).json({ error: 'Por favor, indica al menos una plataforma disponible para el videojuego.' });
    }

    if (genero !== undefined && (typeof genero !== 'string' || genero.trim() === '')) {
        return res.status(400).json({ error: 'Por favor, indica el género del videojuego.' });
    }

    if (duracion !== undefined && (typeof duracion !== 'number' || duracion < 0)) {
        return res.status(400).json({ error: 'La duración debe ser un número mayor o igual a cero.' });
    }

    if (calificacion !== undefined && (typeof calificacion !== 'number' || calificacion < 0 || calificacion > 100)) {
        return res.status(400).json({ error: 'La calificación debe estar entre 0 y 100.' });
    }

    if (descripcion !== undefined && (typeof descripcion !== 'string')) {
        return res.status(400).json({ error: 'Por favor, ingresa una descripción válida.' });
    }

    if (imagen !== undefined && (typeof imagen !== 'string')) {
        return res.status(400).json({ error: 'Por favor, ingresa una URL de imagen válida.' });
    }

    next();
}

module.exports = validarActualizacion;