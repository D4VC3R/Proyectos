// Selección de elementos DOM

const canvas = document.querySelector("canvas");
const contexto = canvas.getContext("2d");
const puntuacion = document.querySelector("#puntuacion");

// Constantes de configuración
// Fases, modos o estados del juego, como lo quieras llamar.
const MODOS = { 
    CAIDA: "caida",
    BALANCEO: "balanceo",
    GAMEOVER: "gameover",
};

// Propiedades de la caja inicial
const ANCHO_CAJA_INICIAL = 200;
const CAJA_INICIAL_Y = 600;
const ALTURA_CAJA = 50;
const VELOCIDAD_INICIAL_Y = 3;
const VELOCIDAD_INICIAL_X = 1.3;

// Variables de estado del juego
let cajas = [];
let sobrante = { x: 0, y: 0, ancho: 0 };
let scrollCont, camaraY, actual, modo, velocidadX, velocidadY, puntuacionTotal;


// --Funciones utilitarias--

// Generar un color aleatorio para la caja actual.
function cambiarColorCaja(cajaActual) {
    if (cajaActual === 0) 
        return "white";
    // Valores aleatorios para el color RGB
    const rojo = Math.floor(Math.random() * 255);
    const verde = Math.floor(Math.random() * 255);
    const azul = Math.floor(Math.random() * 255);

    return `rgb(${rojo}, ${verde}, ${azul})`;
}

//Actualiza la posición de la cámara para simular el scroll.
//La camara se mueve hacia arriba a medida que se apilan más cajas.
function actualizarCamara() {
    if (scrollCont > 0) {
        camaraY++;
        scrollCont--;
    }
}

// -- Inicialización, reinicio y final del juego --

// Inicializa el estado del juego y crea la primera caja.
function inicializarJuego() {
    cajas = [ // Creamos la caja fija donde caerá la primera caja.
        {
            x: canvas.width / 2 - ANCHO_CAJA_INICIAL / 2,
            y: 200,
            ancho: ANCHO_CAJA_INICIAL,
            color: "white",
        },
    ];
    // Reinicio de las variables de estado del juego.
    sobrante = { x: 0, y: 0, ancho: 0 };
    actual = 1;
    modo = MODOS.BALANCEO;
    velocidadX = VELOCIDAD_INICIAL_X;
    velocidadY = VELOCIDAD_INICIAL_Y;
    scrollCont = 0;
    camaraY = 0;
    crearNuevaCaja();
}


// Reiniciar la puntuación y el juego.
function reiniciar() {
    puntuacionTotal = 0;
    puntuacion.textContent = puntuacionTotal; // Reiniciar la puntuación en el DOM
    inicializarJuego();
    dibujar();
}

// Mostrar la pantalla de Game Over y actualizar el top 3.
function gameOver() {
    modo = MODOS.GAMEOVER;
    contexto.fillStyle = "rgba(255, 0, 0, 0.5)"; // Color de fondo rojo para Game Over
    contexto.fillRect(0, 0, canvas.width, canvas.height); // Rellenar el canvas con el color rojo
    contexto.font = "bold 20px Arial";
    contexto.fillStyle = "white"; 
    contexto.textAlign = "center"; 
    contexto.fillText("Game Over", canvas.width / 2, canvas.height / 2); // Mostrar mensaje de Game Over
    actualizarTop3(puntuacionTotal); 
    mostrarTop3();
}


// --Gestión de puntuaciones TOP 3--

// Obtener el top 3 de puntuaciones del localStorage.
function obtenerTop3() {
    return JSON.parse(localStorage.getItem("top3")) || [];
}

// Guardar el top 3 de puntuaciones en localStorage. 
function guardarTop3(top3) {
    localStorage.setItem("top3", JSON.stringify(top3));
}

// Actualizar el top 3 si la puntuación es record.
function actualizarTop3(puntuacion) {
    let top3 = obtenerTop3();
    if (top3.length < 3 || puntuacion > top3[top3.length - 1].puntuacion) {
        let nombre = prompt("¡Nuevo récord! Introduce tu nombre:");
            nombre = nombre.toUpperCase().slice(0, 3);
        top3.push({ nombre, puntuacion });
        top3 = top3.sort((a, b) => b.puntuacion - a.puntuacion).slice(0, 3);
        guardarTop3(top3);
    }
}

// Mostrar el top 3 en el HTML.
function mostrarTop3() {
    const top3 = obtenerTop3();
    let html = "<h3>Top 3</h3>";
    top3.forEach((item, i) => {
        html += `<div class="score">${i + 1}. ${item.nombre} - ${item.puntuacion}</div>`;
    });
    document.getElementById("top3").innerHTML = html;
}

// --Lógica principal del juego--

//Dibujar el estado actual del juego en el canvas.
function dibujar() {
    if (modo === MODOS.GAMEOVER) {
        gameOver();
        return;
    }
    dibujarFondo();
    dibujarCaja();
    dibujarSobrante();

    if (modo === MODOS.BALANCEO) {
        moverYDetectarColision();
    } 
    else if (modo === MODOS.CAIDA) {
        actualizarModoCaida();
    }

    sobrante.y -= velocidadY;
    actualizarCamara();
    window.requestAnimationFrame(dibujar);
}

// Dibujar el fondo del canvas.
function dibujarFondo() {
    contexto.fillStyle = "rgba(24, 24, 24, 0.5)";
    contexto.fillRect(0, 0, canvas.width, canvas.height);
}

// Dibujar todas las cajas apiladas.
function dibujarCaja() {
    cajas.forEach((caja) => {
        const { x, y, ancho, color } = caja;
        const newY = CAJA_INICIAL_Y - y + camaraY; // Ajustar la posición Y según la posición de la cámara

        contexto.fillStyle = color;
        contexto.fillRect(x, newY, ancho, ALTURA_CAJA);
    });
}

// Dibujar la parte sobrante de la caja tras el choque.
function dibujarSobrante() {
    const { x, y, ancho } = sobrante;
    const newY = CAJA_INICIAL_Y - y + camaraY;

    contexto.fillStyle = "red";
    contexto.fillRect(x, newY, ancho, ALTURA_CAJA);
}


// Crear una nueva caja para apilar.
function crearNuevaCaja() {
    cajas[actual] = {
        x: 0,
        y: (actual + 10) * ALTURA_CAJA,
        ancho: cajas[actual - 1].ancho,
        color: cambiarColorCaja(actual),
    };
}

// Obtener el sobrante tras el choque de cajas.
function crearSobrante(diferencia) {
    const cajaActual = cajas[actual];
    const cajaPrevia = cajas[actual - 1];
    const sobranteX =
        cajaActual.x > cajaPrevia.x
            ? cajaActual.x + cajaActual.ancho
            : cajaActual.x;
    sobrante = {
        x: sobranteX,
        y: cajaActual.y,
        ancho: diferencia,
    };
}

// Lógica de la caída de caja.
function actualizarModoCaida() {
    const cajaActual = cajas[actual];
    cajaActual.y -= velocidadY;

    const posicionCajaPrevia = cajas[actual - 1].y + ALTURA_CAJA;
    if (cajaActual.y === posicionCajaPrevia) {
        controlChoque();
    }
}

// Ajustar la caja actual tras el choque. 
function ajustarCajaActual(diferencia) {
    const cajaActual = cajas[actual];
    const cajaPrevia = cajas[actual - 1];

    if (cajaActual.x > cajaPrevia.x) {
        cajaActual.ancho -= diferencia;
    } else {
        cajaActual.ancho += diferencia;
        cajaActual.x = cajaPrevia.x;
    }
}

// Calcular la puntuación obtenida tras colocar una caja. 
// Cuanto más cerca esté de la anterior y mas avanzado está el juego, más puntos se obtienen.
function calcularPuntuacion(diferencia, cajaActual) {
    let puntos = 1000;
    let multiplicador = 1 + 0.1 * (actual - 1);

    if (diferencia !== 0) {
        puntos -= Math.abs(diferencia) * (1000 / cajaActual.ancho);
        puntos = Math.max(100, Math.round(puntos));
    }
    return Math.round(puntos * multiplicador);
}

// Controla el choque entre la caja actual y la anterior. 
function controlChoque() {
    const cajaActual = cajas[actual];
    const cajaPrevia = cajas[actual - 1];
    const diferencia = cajaActual.x - cajaPrevia.x;

    if (Math.abs(diferencia) >= cajaActual.ancho) {
        // Si la diferencia es mayor al ancho de la caja, la caja ha caído fuera y hemos perdido
        modo = MODOS.GAMEOVER;
        return;
    }
    ajustarCajaActual(diferencia);
    crearSobrante(diferencia);

    let puntos = calcularPuntuacion(diferencia, cajaActual);
    puntuacionTotal += puntos;
    puntuacion.textContent = puntuacionTotal;

    velocidadX += velocidadX > 0 ? 0.2 : -0.2; // Aumentar la velocidad según dirección
    actual++; // Aumentar el índice de la caja actual
    scrollCont = ALTURA_CAJA; // Aumentar el scroll para simular la caída en actualizarCamara()
    modo = MODOS.BALANCEO;
    crearNuevaCaja();
}

// Mover la caja y detectar colisiones con los bordes.
function moverYDetectarColision() {
    const cajaActual = cajas[actual];
    cajaActual.x += velocidadX;
    // Constantes para detectar direccion de movimiento y colisiones
    const isMovDerecha = velocidadX > 0;
    const isMovIzquierda = velocidadX < 0;
    const choqueDerecha = cajaActual.x + cajaActual.ancho > canvas.width;
    const choqueIzquierda = cajaActual.x < 0;

    if ((isMovDerecha && choqueDerecha) || (isMovIzquierda && choqueIzquierda))
        velocidadX = -velocidadX;
}


// Eventos del usuario

// Espacio para soltar la caja
document.addEventListener("keydown", (event) => {
    if (event.key === " " && modo === MODOS.BALANCEO) {
        modo = MODOS.CAIDA;
    }
});

// Click para reiniciar si estamos en GameOver o soltar la caja si estamos jugando.
canvas.onpointerdown = () => {
    if (modo === MODOS.GAMEOVER) {
        reiniciar();
    } else if (modo === MODOS.BALANCEO) {
        modo = MODOS.CAIDA;
    }
};

// Mostrar top 3 al cargar la página
document.addEventListener("DOMContentLoaded", mostrarTop3);


// Inicio del juego

reiniciar();
