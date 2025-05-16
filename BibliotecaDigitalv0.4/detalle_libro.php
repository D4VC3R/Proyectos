<?php
$libros = json_decode(file_get_contents('libros.json'), true);

$titulo = $_GET['titulo'] ?? null;
$autor = $_GET['autor'] ?? null;

$libro = null;

if ($titulo && $autor) {
    foreach ($libros as $l) {
        if (
            strtolower($l['titulo']) === strtolower($titulo) &&
            strtolower($l['autor']) === strtolower($autor)
        ) {
            $libro = $l;
            break;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $libro ? htmlspecialchars($libro['titulo']) : 'Libro no encontrado' ?></title>
    <link rel="stylesheet" href="styles/biblioteca.css">
    <script src="js/biblioteca.js" defer></script>
</head>
<body>
<?php include 'cabecera.inc'; ?>
<main>
    <?php if (!$libro): ?>
        <p>Libro no encontrado.</p>
    <?php else: ?>
        <div class="detalle-libro-container">
            <div class="detalle-libro-grid">
                <div class="detalle-libro-info">
                    <h1 class="detalle-libro-titulo"><?= htmlspecialchars($libro['titulo']) ?></h1>
                    <h2 class="detalle-libro-autor"><?= htmlspecialchars($libro['autor']) ?></h2>
                    <div class="detalle-libro-genero-anyo-cita">
                        <p><strong>Género:</strong> <?= htmlspecialchars($libro['genero']) ?></p>
                        <p><strong>Año:</strong> <?= htmlspecialchars($libro['año']) ?></p>
                        <blockquote class="detalle-libro-cita">“<?= htmlspecialchars($libro['cita']) ?>”</blockquote>
                    </div>
                </div>
                <div class="detalle-libro-imagen">
                    <?php if (!empty($libro['imagen'])): ?>
                        <img src="<?= htmlspecialchars($libro['imagen']) ?>" alt="Portada de <?= htmlspecialchars($libro['titulo']) ?>" />
                    <?php endif; ?>
                </div>
            </div>
            <div class="detalle-libro-resumen">
                <h3>Resumen</h3>
                <p><?= nl2br(htmlspecialchars($libro['resumen'])) ?></p>
            </div>
        </div>
    <?php endif; ?>
</main>
<footer>
    <p>Biblioteca Digital. David Cerdán 1ºDAW.</p>
</footer>
</body>
</html>
