<?php
session_start();



$usersFile = __DIR__ . '/users.json';
$mensaje = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = trim($_POST['usuario'] ?? '');
    $password = $_POST['password'] ?? '';
    $usuarios = file_exists($usersFile) ? json_decode(file_get_contents($usersFile), true) : [];

    if ($usuario === '' || $password === '') {
        $mensaje = 'Usuario y contraseña son obligatorios.';
    } elseif (!isset($usuarios[$usuario])) {
        $mensaje = 'Usuario no encontrado.';
    } elseif (!password_verify($password, $usuarios[$usuario])) {
        $mensaje = 'Contraseña incorrecta.';
    } else {
        $_SESSION['usuario'] = $usuario;
        header('Location: index.php');
        exit;
    }
}
// Mostrar mensaje de éxito si viene de registro
if (isset($_GET['registro']) && $_GET['registro'] === 'exito') {
    $mensaje = 'Registrado con éxito, ya puedes iniciar sesión';
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Iniciar Sesión</title>
    <link rel="stylesheet" href="styles/login.css">
    <link rel="stylesheet" href="styles/biblioteca.css">
    <script src="js/biblioteca.js"></script>
</head>
<body>
    <?php include 'cabecera.inc'; ?>
    <div id = "login-form">
        <h2>Iniciar Sesión</h2>
        <?php if ($mensaje) echo '<p>' . $mensaje . '</p>'; ?>
        <form method="post" autocomplete="off">
            <label for="usuario">Usuario:</label>
            <input type="text" name="usuario" id="usuario" required autocomplete="username">
            <br>
            <label for="password">Contraseña:</label>
            <input type="password" name="password" id="password" required autocomplete="current-password">
            <br>
            <button type="submit" id="login">Iniciar Sesión</button>
        </form>
        <p>¿No tienes cuenta? <a href="registro.php">Regístrate aquí</a>.</p>
    </div>
</body>
</html>
