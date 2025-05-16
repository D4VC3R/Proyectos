<!--
Hola Gaspar, te dejo un resumen de lo que he añadido en esta última entrega:

- Proyecto migrado de HTML a PHP
- Ahora la informacion de los libros no está en el código sino en libros.json para dejar el codigo mas legible.
- Mejoradas las páginas donde se visualizan los detalles de cada libro, ahora muestran toda la información además de la imagen de portada.
- Añadidas páginas de registro de usuario y login (los usuarios se almacenan en users.json)
- Estar logeado sirve para poder acceder al formulario de añadir libro.
- Ahora el formulario añadir libro funciona de verdad, añade la informacion a libros.json y se puede consultar en busquedas en la pagina
- Se pueden añadir imagenes al agregar un libro tanto con drag and drop como seleccionando un archivo.
- El modo noche ahora se guarda en localStorage por lo que no se pierde al recargar la pagina o ir a una pagina nueva.
- Arreglados los fallos en buscarLibros que provocaban que mostrase resultados incluso sin especificar nada en la búsqueda.
- Se puede acceder a la ficha de cada libro desde los resultados de la búsqueda
- Archivo cabecera.inc con el estado de la sesión y la cabecera de la pagina
-->
<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Biblioteca Digital</title>
    <link rel="stylesheet" href="styles/biblioteca.css">
    <script src="js/biblioteca.js"></script>
</head>
<body>
<?php include 'cabecera.inc'; ?>


    <main>
        <!--Sección de búsqueda-->
        <section id="buscar">
            <h2 class="tituloSeccion">Buscar Libros</h2>
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


        <!-- Sección de destacados de la semana, ahora es más interactiva. 
        Admite click en sinopsis y en el título de cada libro. -->

        <section id="destacados">
            <h2 class="tituloSeccion">Libros Destacados de la Semana</h2>
            <article class="gridLibros">
            <?php
                $libros = json_decode(file_get_contents('libros.json'), true);
                $libros = array_slice($libros, 0, 7); // Limitar a 7 libros
                foreach ($libros as $libro):
            ?>
                <div class="tarjetaLibros">
                    <img src="<?php echo htmlspecialchars($libro['imagen']); ?>" alt="<?php echo htmlspecialchars($libro['titulo']); ?>">
                    <a href="detalle_libro.php?titulo=<?php echo urlencode($libro['titulo']); ?>&autor=<?php echo urlencode($libro['autor']); ?>">
                        <h3><?php echo htmlspecialchars($libro['titulo']); ?></h3>
                    </a>
                    <p><strong>Autor<?php echo (strtolower(substr($libro['autor'], -1)) == 'a') ? 'a' : ''; ?>:</strong> <?php echo htmlspecialchars($libro['autor']); ?></p>
                    <div class="sinopsis" style="display: none;">
                        <blockquote>
                            <?php echo htmlspecialchars($libro['sinopsis']); ?>
                        </blockquote>
                    </div>
                    <p onclick="toggleSinopsis(this)"><strong>Sinopsis</strong></p>
                    <p><strong>Calificación:</strong> 4/5</p>
                </div>
            <?php endforeach; ?>
            </article>
        </section>

        <!-- Sección de ficha de libros, ahora he creado un div nuevo llamado resumen con el objetivo de en la 
        próxima entrega añadir esa información a la pagina individual de cada libro con una función. -->
        <section id="detalles">
            <h2 class="tituloSeccion">Ficha detallada del Libro</h2>
            <?php
            $libros = json_decode(file_get_contents('libros.json'), true);
            $primera = true;
            foreach ($libros as $libro): ?>
            <article class="ficha<?php if ($primera) { echo ' active'; $primera = false; } ?>">
                <h3><?php echo htmlspecialchars($libro['titulo']); ?></h3>
                <p><strong>Autor:</strong> <?php echo htmlspecialchars($libro['autor']); ?></p>
                <p><strong>Género:</strong> <?php echo htmlspecialchars($libro['genero']); ?></p>
                <p><strong>Año de Publicación:</strong> <?php echo htmlspecialchars($libro['año']); ?></p>
                <div class="resumen">
                    <p><strong>Resumen:</strong> <?php echo $libro['resumen']; ?></p>
                    <h4>Capítulos Destacados</h4>
                    <ul>
                        <li>Capítulo 1: Introducción</li>
                        <li>Capítulo 2: Desarrollo</li>
                    </ul>
                    <h4>Citas Memorables</h4>
                    <blockquote>
                        <?php echo htmlspecialchars($libro['cita']); ?>
                    </blockquote>
                    <h4>Biografía del Autor</h4>
                    <p><!-- Aquí permanece la biografía fija o puedes personalizarla por libro si lo deseas -->
                        <?php if ($libro['autor'] === 'Joyce Carol Oates'): ?>
                            Narradora norteamericana, nacida en Lockport (Nueva York) en 1938. Célebre por las generosas dosis de violencia que ha volcado en sus cuentos y novelas, está considerada como una de las más destacadas seguidoras de la corriente narrativa inaugurada por William Faulkner.
                        <?php elseif ($libro['autor'] === 'Michael McDowell'): ?>
                            Michael McDowell fue un escritor y guionista estadounidense. Nació el 1 de junio de 1950 en Enterprise y falleció el 27 de diciembre de 1999 en Boston. McDowell escribió novelas de terror góticas y fue elogiado por Stephen King como "el escritor más refinado de los Estados Unidos".
                        <?php elseif ($libro['autor'] === 'George Orwell'): ?>
                            Eric Arthur Blair Motihari, Raj Británico, 25 de junio de 1903-Londres, Reino Unido, 21 de enero de 1950, conocido por su seudónimo de George Orwell, fue un novelista, periodista, ensayista y crítico británico nacido en la India, autor entre otras obras de las novelas distópicas Rebelión en la granja (1945) y 1984 (1949).
                        <?php elseif ($libro['autor'] === 'Stephen King'): ?>
                            Stephen Edwin King (Portland, Maine, 21 de septiembre de 1947), más conocido como Stephen King y ocasionalmente por su pseudónimo Richard Bachman, es un escritor estadounidense de novelas de terror, ficción sobrenatural, misterio, ciencia ficción y literatura fantástica. Sus libros han vendido más de 500 millones de ejemplares, y en su mayoría han sido adaptados al cine y a la televisión.
                        <?php elseif ($libro['autor'] === 'Mario Puzo'): ?>
                            Mario Francis Puzo (Manhattan, Nueva York, 15 de octubre de 1920-West Bay Shore, Nueva York, 2 de julio de 1999) fue un prolífico escritor y guionista estadounidense descendiente de italianos, dejó una huella imborrable como el literato de la mafia, especialmente por su obra maestra, El padrino (1969), con sus relatos apasionantes de crimen, poder y familia.
                        <?php else: ?>
                            Biografía no disponible.
                        <?php endif; ?>
                    </p>
                </div>
            </article>
            <?php endforeach; ?>
        </section>
    </main>

    <footer>
        <p>Biblioteca Digital. David Cerdán 1ºDAW.</p>
    </footer>
</body>
</html>