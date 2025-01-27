import express from 'express'
import db from '../dbConnection.js'

const Router = express.Router()

Router.get ("/", (req, res)=> {
  const {user_name, user_password} = req.query 
  db.query ("SELECT * FROM users WHERE user_name= ? AND user_password = ?", [user_name, user_password],  (err,result)=> {
    if (err) {
      console.log ("Error in fetching user", err)
      res.status(500).send("error in the Query")
    }   
    else
      res.send (result)
  })
})


Router.post('/', (req, res) => {
  const { user_name, user_password } = req.body; 
  db.query("INSERT INTO users (user_name, user_password) VALUES (?, ?)",[user_name, user_password],
           (err, result) => {
      if (err) res.status(500).send('Error adding user');
      else res.status(201).send('User added successfully');
    }
  );
});

export default Router;