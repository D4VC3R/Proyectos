<?php
session_start();
if (!isset($_SESSION['usuario'])) {
    header('Location: login.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agregar Libro</title>
    <link rel="stylesheet" href="styles/biblioteca.css">
    <script src="js/biblioteca.js"></script>

</head>
<body>
<?php include 'cabecera.inc'; ?>
<main>
        <!-- Sección de agregar libros -->
    <section id="agregar">
        <h2 class="tituloSeccion">Agregar Libro</h2>
        <?php if (isset($_SESSION['usuario'])): ?>
            
        <form id="formAgregarLibro" onsubmit="agregarLibro(event)">
            <label for="tituloLibro">Título</label>
            <input type="text" id="tituloLibro" placeholder="Introduce el título">

            <label for="autorLibro">Autor</label>
            <input type="text" id="autorLibro" placeholder="Introduce el autor">

            <label for="sinopsisLibro">Sinopsis</label>
            <textarea id="sinopsisLibro" rows="4" placeholder="Escribe una breve sinopsis"></textarea>

            <label for="generoLibro">Género</label>
            <select id="generoLibro">
                <option value="novela">Novela</option>
                <option value="ficcion">Ficción</option>
                <option value="biografia">Biografía</option>
                <option value="poesia">Poesía</option>
                <option value="policiaca">Policíaca</option>
                <option value="ensayo">Ensayo</option>
                <option value="infantil">Infantil</option>
                <option value="fantasia">Fantasía</option>
            </select>

            <label for="añoLibro">Año de Publicación</label>
            <input type="number" id="añoLibro" placeholder="Introduce el año">

            <label for="imagenLibro">Imagen</label>
            <input type="file" id="imagenLibro" accept="image/*">
            <div id="dropImagen" style="border:2px dashed #aaa;padding:10px;text-align:center;margin-bottom:10px;cursor:pointer;">Arrastra aquí la imagen o haz clic para seleccionar</div>
            <input type="hidden" id="imagenLibroUrl">

            <label for="resumenLibro">Resumen</label>
            <textarea id="resumenLibro" rows="4" placeholder="Escribe un resumen"></textarea>

            <label for="citaLibro">Cita</label>
            <input type="text" id="citaLibro" placeholder="Cita memorable">

            <button type="submit">Agregar Libro</button>
        </form>
            <?php else: ?>
                <p>Debes <a href="login.php">iniciar sesión</a> para agregar libros.</p>
            <?php endif; ?>
        </section>
</main>
<footer>
    <p>Biblioteca Digital. David Cerdán 1ºDAW.</p>
</footer>
</body>
</html>