function validarNuevoVideojuego(req, res, next) {
    const {
        titulo,
        desarrollador,
        publisher,
        fechaLanzamiento,
        plataformas,
        genero
    } = req.body;

    if (!titulo || typeof titulo !== 'string' || titulo.trim().length < 2) {
        return res.status(400).json({ error: 'El título es obligatorio y debe tener al menos 2 caracteres.' });
    }

    if (!desarrollador || typeof desarrollador !== 'string' || desarrollador.trim() === '') {
        return res.status(400).json({ error: 'El desarrollador es obligatorio.' });
    }

    if (!publisher || typeof publisher !== 'string' || publisher.trim() === '') {
        return res.status(400).json({ error: 'El publisher es obligatorio.' });
    }

    if (!fechaLanzamiento || isNaN(Date.parse(fechaLanzamiento))) {
        return res.status(400).json({ error: 'La fecha de lanzamiento es obligatoria.' });
    }

    if (!plataformas || !Array.isArray(plataformas) || plataformas.length === 0 || !plataformas.every(p => typeof p === 'string' && p.trim() !== '')) {
        return res.status(400).json({ error: 'Debes introducir al menos una plataforma.' });
    }

    if (!genero || typeof genero !== 'string' || genero.trim() === '') {
        return res.status(400).json({ error: 'El género es obligatorio.' });
    }

    next();
}

module.exports = validarNuevoVideojuego;