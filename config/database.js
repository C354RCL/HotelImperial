const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    // connectionLimit : 10,
    // host: 'localhost',
    // port: '3307',
    // user : 'root',
    // password : '',
    // database : 'hotelimperial'

    host : 'aws.connect.psdb.cloud',
    database : 'hotelimperial',
    user : 'j9s8zmkt6fxi0ny1jbf4',
    password : 'pscale_pw_5O6J0TXJ046AUySah5aumnEL09wZPhk13FgtMg8LKT3',
    ssl : true
});

pool.query = util.promisify(pool.query);
module.exports = pool;