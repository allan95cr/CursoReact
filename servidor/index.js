// Importar el servidor
const express = require('express');
// Importamos la conexion de la bd del archivo Config/db.js
const connectDB = require('./config/db');

// Creamos el servidor
const app = express();

// Conectar a la base de datos
connectDB();

// Usamos el puerto del archivo env o por defecto el 4000
// puerto del app
const PORT = process.env.PORT || 4000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`El servidor se ejecuta en el puerto ${PORT}`);
})