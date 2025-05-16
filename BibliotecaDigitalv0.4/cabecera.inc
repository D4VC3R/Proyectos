<?php
// cabecera.inc
if (session_status() === PHP_SESSION_NONE) session_start();
?>
<header>
    <h1 style="cursor:pointer" onclick="window.location.href='index.php'">La Biblioteca Digital de David</h1>
    <nav>
        <div class="nav-links">
            <a href="index.php">Inicio</a> |
            <a href="buscarLibros.php">Buscar Libros</a> |
            <a href="formAgregarLibro.php">Agregar Libro</a> |
            <a href="index.php#detalles">Fichas Dinámicas</a>
        </div>
        <div class="nav-session">
            <?php if (isset($_SESSION['usuario'])): ?>
                <span>Bienvenido, <?php echo htmlspecialchars($_SESSION['usuario']); ?></span>
                <a href="logout.php">Cerrar sesión</a>
            <?php else: ?>
                <a href="login.php">Iniciar sesión</a>
                <a href="registro.php">Registrarse</a>
            <?php endif; ?>
            <button id="modoOscuroBtn" onclick="toggleModoOscuro()">🌙</button>
        </div>
    </nav>
</header>
