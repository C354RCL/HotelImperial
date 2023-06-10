const express = require('express');
const reservar = express.Router();
const db = require('../config/databaseW');
const path = require('path');

reservar.post('/', async(req, res, next) => {
    const {nombre, correo, numTelefono, fechaIngreso, fechaSalida, habMat, habKing, habDoble, totalPagar} = req.body;

    let query = `INSERT INTO reservaciones (nombre, correo, telefono, fecIngreso, fecSalida, noHabMat, noHabKin, noHabDob, totalPagar) VALUES ('${nombre}', '${correo}', '${numTelefono}', '${fechaIngreso}', '${fechaSalida}', '${habMat}', '${habKing}', '${habDoble}', '${totalPagar}');`;
    const rows = await db.query(query);

    if(rows.affectedRows == 1){
        return res.status(201).json({code : 201, message : 'Usuario resgitrado correctamente'});
    }

    return res.status(500).json({code : 201, message : 'Campos incompletos'});
});

reservar.get('/', (req, res) => {
    const rutaCompleta = path.join(__dirname, '../public/reservacion.html');
    res.sendFile(rutaCompleta);
});

module.exports = reservar;