import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'REMUSlupinAVAnina1@',
    database: 'sotydb'
});

db.connect((err) => {
    if (err) {
        console.log("Error on DB connection:", err);
        process.exit(1); 
    } else {
        console.log("Connected to DB");
    }
});

export default db;
