const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    port: '3307',
    user : 'root',
    password : '',
    database : 'hotelimperial'
});

pool.query = util.promisify(pool.query);
module.exports = pool;