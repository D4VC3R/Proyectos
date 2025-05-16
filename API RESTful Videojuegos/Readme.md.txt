# 🎮 API de Videojuegos

API REST para gestionar una base de datos de videojuegos con operaciones CRUD, validaciones, y filtros de búsqueda. Ideal para proyectos web o apps de catálogo gaming.

---

## 📋 Contenido

* [Descripción](#descripción)
* [Características](#características)
* [Tecnologías](#tecnologías)
* [Instalación](#instalación)
* [Configuración](#configuración)
* [Uso](#uso)
* [Estructura del Proyecto](#estructura-del-proyecto)
* [Endpoints](#endpoints)
* [Validaciones](#validaciones)
* [Scripts de Carga y Actualización](#scripts-de-carga-y-actualización)
* [Mejoras Futuras](#mejoras-futuras)
* [Contribuciones](#contribuciones)
* [Licencia](#licencia)

---

## 📝 Descripción

Esta API permite crear, leer, actualizar y eliminar videojuegos almacenados en MongoDB. Incluye validaciones para los datos, filtros para búsquedas avanzadas y scripts para cargar datos iniciales y actualizar calificaciones. Pensada para ser la base de proyectos relacionados con videojuegos, como webs, apps o dashboards.

---

## 🚀 Características

* CRUD completo para videojuegos
* Validaciones para campos obligatorios y opcionales
* Filtros de búsqueda por título, género, plataformas, fecha, calificación, etc.
* Scripts para carga masiva y actualización de datos
* Manejo centralizado de errores
* Configuración vía variables de entorno

---

## 💠 Tecnologías

* Node.js
* Express.js
* MongoDB Atlas + Mongoose
* Axios (para scripts internos)
* dotenv (variables de entorno)
* Postman (recomendado para pruebas)

---

## ⚙ Instalación

1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/api-videojuegos.git
cd api-videojuegos
```

2. Instala dependencias

```bash
npm install
```

3. Crea un archivo `.env` con la URI de tu base de datos MongoDB (ver sección Configuración)

---

## 🔧 Configuración

Crea un archivo `.env` en la raíz con esta variable:

```env
MONGODB_URI=mongodb+srv://usuario:contraseña@clustervideojuegos.mongodb.net/videojuegos?retryWrites=true&w=majority
PORT=3000
```

* Cambia `usuario` y `contraseña` por tus credenciales reales.
* La base de datos usada será `videojuegos`.

---

## 🎯 Uso

Inicia el servidor con:

```bash
npm start
```

La API estará escuchando en `http://localhost:3000`.

---

## 📂 Estructura del Proyecto

```
|- controllers
   |- videojuegosController.js
|- data
   |- cargarJuegos.js
   |- actualizarCalificacion.js
   |- data.json
   |- calificaciones.json
|- middlewares
   |- validarNuevoVideojuego.js
   |- validarActualizacion.js
   |- manejadorErrores.js
|- models
   |- Videojuego.js
|- routes
   |- rutas.js
|- .env
|- index.js
|- package.json
```

---

## 🔗 Endpoints Principales

| Método | Ruta              | Descripción                 |
| ------ | ----------------- | --------------------------- |
| GET    | /videojuegos      | Listar juegos (con filtros) |
| POST   | /videojuegos      | Crear un nuevo videojuego   |
| PUT    | /videojuegos/\:id | Actualizar un videojuego    |
| DELETE | /videojuegos/\:id | Borrar un videojuego        |

---

## ✅ Validaciones

* **Creación**: campos obligatorios (título, desarrollador, publisher, fecha, plataformas, género)
* **Actualización**: validación flexible para actualizar campos opcionales
* Validación de tipos, rangos, longitudes y formatos correctos

---

## 🔄 Scripts de Carga y Actualización

* `data/cargarJuegos.js`: para cargar un conjunto inicial de juegos desde `data/data.json`
* `data/actualizarCalificacion.js`: para actualizar las calificaciones manualmente o desde un archivo JSON

Estos scripts usan Axios para consumir la propia API.

---

## 💡 Mejoras Futuras

* Paginación y ordenación en las respuestas
* Autenticación con JWT o OAuth
* Subida de imágenes
* Pruebas automáticas con Jest o Supertest
* Caching con Redis

---

## 🤝 Contribuciones

¡Contribuciones bienvenidas! Abre un issue o pull request para sugerencias o mejoras.

---

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).
