<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buscar Libros</title>
    <link rel="stylesheet" href="styles/biblioteca.css">
    <script src="js/biblioteca.js"></script>
</head>
<body>
<?php include 'cabecera.inc'; ?>
<main>
    <section id ="form-busqueda">
        
        <h2>Formulario de Búsqueda</h2>
        <form action="resultados_busqueda.php" method ="get">
            <label for="titulo">Título</label>
            <input type="text" id="titulo" name="titulo" placeholder="Introduce el título">

            <label for="autor">Autor</label>
            <input type="text" id="autor" name="autor" placeholder="Introduce el autor">

            <label for="genero">Género</label>
            <select id="genero" name="genero">
                <option value="">Cualquier Género</option>
                <option value="Novela">Novela</option>
                <option value="Ficción">Ficción</option>
                <option value="Biografía">Biografía</option>
                <option value="Poesía">Poesía</option>
                <option value="Policíaca">Policíaca</option>
                <option value="Ensayo">Ensayo</option>
                <option value="Infantil">Infantil</option>
                <option value="Fantasía">Fantasía</option>
            </select>

            <label for="anio">Año de Publicación</label>
            <input type="number" id="anio" name="anio" placeholder="Introduce el año">

            <button type="submit">Buscar</button>
        </form>
    </section>
</main>
<footer>
    <p>Biblioteca Digital. David Cerdán 1ºDAW.</p>
</footer>
</body>
</html>