<?php
session_start();

// Ruta al archivo de usuarios
$usersFile = __DIR__ . '/users.json';

// Si el archivo no existe, lo creamos vacío
if (!file_exists($usersFile)) {
    file_put_contents($usersFile, json_encode([]));
}

$mensaje = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = trim($_POST['usuario'] ?? '');
    $password = $_POST['password'] ?? '';
    
    if ($usuario === '' || $password === '') {
        $mensaje = 'Usuario y contraseña son obligatorios.';
    } else {
        $usuarios = json_decode(file_get_contents($usersFile), true);
        if (isset($usuarios[$usuario])) {
            $mensaje = 'El usuario ya existe.';
        } else {
            // Guardar usuario con contraseña hasheada
            $usuarios[$usuario] = password_hash($password, PASSWORD_DEFAULT);
            file_put_contents($usersFile, json_encode($usuarios));
            // Redirigir a login.php con mensaje de éxito
            header('Location: login.php?registro=exito');
            exit();
        }
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro de Usuario</title>
    <link rel="stylesheet" href="styles/login.css">
    <link rel="stylesheet" href="styles/biblioteca.css">
    <script src="js/biblioteca.js"></script>
</head>
<body>
    <?php include 'cabecera.inc'; ?>
    <div id = "login-form">
        <h2>Registro de Usuario</h2>
        <?php if ($mensaje) echo '<p>' . $mensaje . '</p>'; ?>
        <form method="post" autocomplete="off">
            <label for="usuario">Usuario:</label>
            <input type="text" name="usuario" id="usuario" required autocomplete="username">
            <br>
            <label for="password">Contraseña:</label>
            <input type="password" name="password" id="password" required autocomplete="current-password">
            <br>
            <button type="submit" id="registro">Registrarse</button>
        </form>
        <p>¿Ya tienes cuenta? <a href="login.php">Inicia sesión aquí</a>.</p>
    </div>
    
</body>
</html>
