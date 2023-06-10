const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    // connectionLimit : 10,
    // host: 'localhost',
    // // port: '3307',
    // user : 'root',
    // password : '',
    // database : 'hotelimperial'

    //Conexion a base de datos en planet scale
    host : 'aws.connect.psdb.cloud',
    database : 'hotelimperial',
    user : '32lvhcwnlu0sdr0jcyx4',
    password : 'pscale_pw_xebrrXPSh28MNwgc2If65VAidJwTSQKQh6LaTfncfNj',
    ssl : true
});

pool.query = util.promisify(pool.query);
module.exports = pool;