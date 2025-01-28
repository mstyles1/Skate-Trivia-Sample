import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'REMUSlupinAVAnina1@',
    database: 'sotydb'
})

db.connect((err) => {
    if (err) {
        console.log("Error on DB connection", err);
    return;
}
console.log("Connected to DB")
});

export default db;
