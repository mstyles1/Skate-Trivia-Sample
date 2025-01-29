import express from 'express'
import db from '../dbConnection.js'
import { check, validationResult} from 'express-validator'

const Router = express.Router()

Router.get ("/", (req, res)=> {
  const {email, password} = req.query 
  db.query ("SELECT * FROM users WHERE user_name= ? AND user_password = ?", [email, password],  (err,result)=> {
    if (err) {
      console.log ("Error in fetching user", err)
      res.status(500).send("error in the Query")
    }   
    else
      res.send (result)
  })
})


Router.post('/', (req, res) => {
  const { name, password } = req.body; 
  db.query("INSERT INTO users (name,password) VALUES (?, ?)",[name, password],
           (err, result) => {
      if (err) res.status(500).send('Error adding user');
      else res.status(201).send('User added successfully');
    }
  );
});


Router.post('/users',[
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


export default Router;