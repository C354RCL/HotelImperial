const express = require('express');
const registros = express.Router();
const db = require('../config/database');
const path = require('path');
const opn = require('opn');

// registros.get('/', async (req, res) => {
//     const rutaCompleta = path.join(__dirname, '../public/registros.html');
//     res.sendFile(rutaCompleta);
// });
let archivoAbierto = false;
registros.get('/', async(req, res) => {

    const registrosTotales = await db.query("SELECT * FROM reservaciones");
    // console.log(registrosTotales);
    res.status(200).send(registrosTotales);
    const rutaCompleta = path.join(__dirname, '../public/registros.html');
    if (!archivoAbierto) {
      archivoAbierto = true;
      opn(rutaCompleta);
    }
});

module.exports = registros;