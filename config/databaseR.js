const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    host : 'aws.connect.psdb.cloud',
    database : 'hotelimperial',
    user : 'uk4yvahbxkvn1ukr5stq',
    password : 'pscale_pw_zkp5xasObXCX6JM7DyurQg2qXOEf0QCOXP4Wu5KJK1c',
    ssl : true
});

pool.query = util.promisify(pool.query);
module.exports = pool;