<?php
session_start();
header('Content-Type: application/json');
if (!isset($_SESSION['usuario'])) {
    echo json_encode(['success' => false, 'error' => 'No autenticado']);
    exit;
}

if (!isset($_FILES['imagen'])) {
    echo json_encode(['success' => false, 'error' => 'No se recibió ningún archivo']);
    exit;
}

$archivo = $_FILES['imagen'];
$permitidos = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
if (!in_array($archivo['type'], $permitidos)) {
    echo json_encode(['success' => false, 'error' => 'Tipo de archivo no permitido']);
    exit;
}

$ext = pathinfo($archivo['name'], PATHINFO_EXTENSION);
$nombreSeguro = uniqid('libro_', true) . '.' . $ext;
$rutaDestino = 'imgs/' . $nombreSeguro;

if (move_uploaded_file($archivo['tmp_name'], $rutaDestino)) {
    echo json_encode(['success' => true, 'url' => $rutaDestino]);
} else {
    echo json_encode(['success' => false, 'error' => 'No se pudo guardar la imagen']);
}
