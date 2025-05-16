<?php
$libros = json_decode(file_get_contents('libros.json'), true);

// Obtener filtros no vacíos
$filtros = array_filter([
    'titulo' => $_GET['titulo'] ?? '',
    'autor' => $_GET['autor'] ?? '',
    'genero' => $_GET['genero'] ?? '',
    'anio' => $_GET['anio'] ?? ''
]);

// Función que compara filtros con datos del libro
function coincide($libro, $filtros) {
    foreach ($filtros as $campo => $valor) {
        if (stripos((string)$libro[$campo], $valor) === false) {
            return false;
        }
    }
    return true;
}

// Si no hay filtros, no mostramos resultados
$resultados = [];
if (!empty($filtros)) {
    $resultados = array_filter($libros, fn($libro) => coincide($libro, $filtros));
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultados de la Búsqueda</title>
    <link rel="stylesheet" href="styles/biblioteca.css">
    <script src="js/biblioteca.js"></script>
    
</head>
<body>
<?php include 'cabecera.inc'; ?>
    <main>
        <h1>Resultados de búsqueda</h1>

        <?php if (empty($filtros)): ?>
    <p>No ingresaste ningún criterio de búsqueda.</p>
        <?php elseif (empty($resultados)): ?>
            <p>No se encontraron libros que coincidan con los criterios.</p>
        <?php else: ?>
            <ul class="lista-resultados-libros">
            <?php foreach ($resultados as $libro): ?>
                <li class="item-resultado-libro">
                    <a href="detalle_libro.php?titulo=<?= urlencode($libro['titulo']) ?>&autor=<?= urlencode($libro['autor']) ?>">
                        <img class="miniatura-resultado" src="<?= htmlspecialchars($libro['imagen']) ?>" alt="Portada de <?= htmlspecialchars($libro['titulo']) ?>">
                        <span class="info-resultado">
                            <span class="titulo-resultado"><?= htmlspecialchars($libro['titulo']) ?></span>
                            <span class="autor-resultado">— <?= htmlspecialchars($libro['autor']) ?></span>
                        </span>
                    </a>
                </li>
            <?php endforeach; ?>
            </ul>
        <?php endif; ?>
</main>
<footer>
    <p>Biblioteca Digital. David Cerdán 1ºDAW.</p>
</footer>
</body>
</html>