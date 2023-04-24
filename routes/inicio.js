const express = require('express');
const inicio = express.Router();
const path = require('path');

inicio.get("/", (req, res) => {
    const rutaCompleta = path.join(__dirname, '../public/index.html');
    res.sendFile(rutaCompleta);
})

module.exports = inicio;

