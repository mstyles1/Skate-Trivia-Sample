import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'REMUSlupinAVAnina1@',
    database: 'sotydb',
});

export default pool.promise();