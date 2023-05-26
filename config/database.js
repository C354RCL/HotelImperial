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
    user : 'wknbofudo1bxjt0ao5f6',
    password : 'pscale_pw_vqT7Vt3HkhtVDTH5B0qWBfCnw2UJVmB472aynDg51Zh',
    ssl : true
});

pool.query = util.promisify(pool.query);
module.exports = pool;