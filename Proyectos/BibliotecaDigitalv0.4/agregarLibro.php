<?php
session_start();
header('Content-Type: application/json');
if (!isset($_SESSION['usuario'])) {
    echo json_encode(['success' => false, 'error' => 'No autenticado']);
    exit;
}

// Recibir datos JSON
$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['titulo'], $input['autor'], $input['sinopsis'], $input['genero'], $input['año'])) {
    echo json_encode(['success' => false, 'error' => 'Datos incompletos']);
    exit;
}

// Leer libros existentes
$librosFile = 'libros.json';
$libros = file_exists($librosFile) ? json_decode(file_get_contents($librosFile), true) : [];

// Crear nuevo libro
$nuevoLibro = [
    'titulo' => $input['titulo'],
    'autor' => $input['autor'],
    'genero' => $input['genero'],
    'año' => (int)$input['año'],
    'imagen' => !empty($input['imagen']) ? $input['imagen'] : 'imgs/default.jpg',
    'resumen' => !empty($input['resumen']) ? $input['resumen'] : '',
    'sinopsis' => $input['sinopsis'],
    'cita' => !empty($input['cita']) ? $input['cita'] : ''
];

$libros[] = $nuevoLibro;

// Guardar
if (file_put_contents($librosFile, json_encode($libros, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'No se pudo guardar el libro']);
}