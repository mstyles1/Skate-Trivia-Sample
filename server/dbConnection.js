import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'REMUSlupinAVAnina1@',
    database: 'sotydb',
});

pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to database:", err);
      process.exit(1);
    } else {
      console.log("Connected to MySQL database");
      connection.release();
    }
  });

export default pool.promise();