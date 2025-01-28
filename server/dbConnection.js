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

app.post('/login',[    
check('email', "Email length error").isEmail().isLength({min: 10, max:30}),    
check('password', "password length 8-10").isLength({min: 8, max: 10})], (req, res) => {    
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";    
    db.query(sql, [req.body.email,req.body.password ], (err, data) => {
    const errors = validationResult(req);        
    if(!errors.isEmpty()) {            
        return res.json(errors);        
    } else {            
        if(err) {                
             return res.json("Error");            
        }            
            if(data.length > 0) 
                 {                
                      return res.json("Success");            
                } else {                
                      return res.json("Fail");            
                }        
             }            
         })})
    app.listen(3001, ()=> {    console.log("listening");})

db.connect((err) => {
    if (err) {
        console.log("Error on DB connection", err);
    return;
}
console.log("Connected to DB")
});

export default db;
