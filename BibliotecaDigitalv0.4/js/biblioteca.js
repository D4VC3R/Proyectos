//Atributos de los libros
let libros = [];

// Cargar libros desde libros.json
async function cargarLibros() {
    try {
        const response = await fetch('../libros.json');
        if (!response.ok) throw new Error('No se pudo cargar libros.json');
        libros = await response.json();
    } catch (error) {
        console.error('Error cargando libros:', error);
        libros = [];
    }
}

// Esperar a que los libros estén cargados antes de usar
cargarLibros().then(() => {

});



// Ficha de detalles dinámica en la página principal
document.addEventListener('DOMContentLoaded', () => {
    const fichas = document.querySelectorAll('#detalles .ficha');
    let currentFicha = 0;

    function showNextFicha() {
        fichas[currentFicha].classList.remove('active');
        currentFicha = (currentFicha + 1) % fichas.length;
        fichas[currentFicha].classList.add('active');
    }

    setInterval(showNextFicha, 4000); 
});


// Agregar un libro si todos los campos están completos
function agregarLibro(event) {
    event.preventDefault();
    const titulo = document.getElementById("tituloLibro").value;
    const autor = document.getElementById("autorLibro").value;
    const sinopsis = document.getElementById("sinopsisLibro").value;
    const genero = document.getElementById("generoLibro").value;
    const año = document.getElementById("añoLibro").value;
    const imagen = document.getElementById("imagenLibroUrl").value;
    const resumen = document.getElementById("resumenLibro").value;
    const cita = document.getElementById("citaLibro").value;

    if (titulo && autor && sinopsis && genero && año) {
        fetch('agregarLibro.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                titulo: titulo,
                autor: autor,
                sinopsis: sinopsis,
                genero: genero,
                año: año,
                imagen: imagen,
                resumen: resumen,
                cita: cita
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Libro añadido correctamente.');
                document.getElementById("formAgregarLibro").reset();
                document.getElementById("dropImagen").textContent = 'Arrastra aquí la imagen o haz clic para seleccionar';
                document.getElementById("dropImagen").style.background = '';
            } else {
                alert('Error al añadir el libro: ' + (data.error || 'Error desconocido.'));
            }
        })
        .catch(error => {
            alert('Error de red o del servidor.');
        });
    } else {
        alert("Por favor, complete todos los campos.");
    }
}

//Funciones para buscar libros y mostrar resultados

function buscarLibros(event) {
    event.preventDefault();
    const titulo = document.getElementById("titulo").value.toLowerCase();
    const autor = document.getElementById("autor").value.toLowerCase();
    const genero = document.getElementById("genero").value;
    const año = document.getElementById("anio").value;

    const resultados = [];
    for (const libro of libros) {
        if ((titulo === "" || libro.titulo.toLowerCase().includes(titulo)) &&
            (autor === "" || libro.autor.toLowerCase().includes(autor)) &&
            (genero === "" || libro.genero === genero) &&
            (año === "" || libro.año.toString() === año)) {
            resultados.push(libro);
        }
    }

    sessionStorage.setItem("resultadosBusqueda", JSON.stringify(resultados));
    window.open("resultados_busqueda.php", "_self");
}

// Con esto me aseguro de que el evento se ejecute después de que el DOM esté completamente cargado
// y que el formulario exista en la página.
document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector(".buscarlibro");
    if (formulario) {
        formulario.addEventListener("submit", buscarLibros);
    }
});

// Esto sirve para mostrar los resultados de la búsqueda en la página de resultados
document.addEventListener("DOMContentLoaded", () => {
    const resultados = JSON.parse(sessionStorage.getItem("resultadosBusqueda"));
    const contenedor = document.getElementById("resultados");

    if (!resultados || resultados.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron resultados.</p>";
        return;
    }

    // Mostrar los resultados en tarjetas, me ha hecho falta sustituir
    // las comillas simples por comillas dobles para que no se rompa el HTML
    // al llamar a la funcion verDetalleLibro. Me he vuelto loco con esto.
    resultados.forEach(libro => {
        const tarjeta = `<div class='tarjetaLibros'>
            <h3 onclick="verDetalleLibro('${libro.titulo.replace(/'/g, "\\'")}')">${libro.titulo}</h3>
            <p><strong>Autor:</strong> ${libro.autor}</p>
            <p><strong>Género:</strong> ${libro.genero}</p>
            <p><strong>Año:</strong> ${libro.año}</p>
        </div>`;
        contenedor.innerHTML += tarjeta;
    });
});

// Abrir la página de detalle del libro seleccionado
function verDetalleLibro(titulo) {
    const libro = libros.find(libro => libro.titulo === titulo);
    if (libro) {
        sessionStorage.setItem("libroSeleccionado", JSON.stringify(libro));
        window.open("detalle_libro.php", "_self");
    }
}


// Mostrar/ocultar sinopsis
function toggleSinopsis(element) {
    const sinopsis = element.previousElementSibling; 
    if (sinopsis.style.display === 'none' || sinopsis.style.display === '') {
        sinopsis.style.display = 'block';
    } else {
        sinopsis.style.display = 'none';
    }
}

// Activar/desactivar el modo oscuro con persistencia
function toggleModoOscuro() {
    document.body.classList.toggle('modo-oscuro');
    const btn = document.getElementById('modoOscuroBtn');
    const isDark = document.body.classList.contains('modo-oscuro');
    if (btn) btn.textContent = isDark ? '☀️' : '🌙';
    // Guardar preferencia en localStorage
    localStorage.setItem('modoOscuro', isDark ? '1' : '0');
}

// Al cargar la página, aplicar el modo guardado
function aplicarModoOscuroGuardado() {
    const modoOscuro = localStorage.getItem('modoOscuro');
    if (modoOscuro === '1') {
        document.body.classList.add('modo-oscuro');
        const btn = document.getElementById('modoOscuroBtn');
        if (btn) btn.textContent = '☀️';
    } else {
        document.body.classList.remove('modo-oscuro');
        const btn = document.getElementById('modoOscuroBtn');
        if (btn) btn.textContent = '🌙';
    }
}

// Ejecutar al cargar el DOM
document.addEventListener('DOMContentLoaded', function() {
    aplicarModoOscuroGuardado();
    const fileInput = document.getElementById('imagenLibro');
    const dropArea = document.getElementById('dropImagen');
    const imagenUrlInput = document.getElementById('imagenLibroUrl');

    // Click en el área para abrir el selector
    dropArea.addEventListener('click', () => fileInput.click());

    // Drag & drop
    dropArea.addEventListener('dragover', e => {
        e.preventDefault();
        dropArea.style.background = '#e0e0e0';
    });
    dropArea.addEventListener('dragleave', e => {
        e.preventDefault();
        dropArea.style.background = '';
    });
    dropArea.addEventListener('drop', e => {
        e.preventDefault();
        dropArea.style.background = '';
        if (e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            subirImagen(fileInput.files[0]);
        }
    });

    // Cambio por input file
    fileInput.addEventListener('change', function() {
        if (fileInput.files.length > 0) {
            subirImagen(fileInput.files[0]);
        }
    });

    function subirImagen(file) {
        const formData = new FormData();
        formData.append('imagen', file);
        fetch('subirImagen.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                imagenUrlInput.value = data.url;
                dropArea.textContent = 'Imagen subida correctamente';
                dropArea.style.background = '#d4ffd4';
            } else {
                imagenUrlInput.value = '';
                dropArea.textContent = 'Error: ' + (data.error || 'No se pudo subir la imagen');
                dropArea.style.background = '#ffd4d4';
            }
        })
        .catch(() => {
            imagenUrlInput.value = '';
            dropArea.textContent = 'Error de red al subir la imagen';
            dropArea.style.background = '#ffd4d4';
        });
    }
});


