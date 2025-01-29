import express from 'express'
import db from '../dbConnection.js'

const Router = express.Router()

Router.post("/", (req, res) => {
  const { user_email, user_password } = req.body;

  if (!user_email || !user_password) {
    return res.status(400).json({ error: "Email and Password are required" });
  }

  db.query(
    "INSERT INTO users (user_email, user_password) VALUES (?, ?)",
    [user_email, user_password],
    (err, result) => {
      if (err) {
        console.log("Error inserting user:", err); // Improved error logging
        return res.status(500).json({ error: "Database error: " + err.message }); // More informative error
      }
      res.status(201).json({ message: "User created successfully", userId: result.insertId });
    }
  );
});

export default Router;

Router.get ("/", (req, res)=> {
  const {user_email, user_password} = req.query 
  db.query ("SELECT * FROM users WHERE user_email= ? AND user_password = ?", [user_email, user_password],  (err,result)=> {
    if (err) {
      console.log ("Error in fetching user", err)
      res.status(500).send("error in the Query")
    }   
    else
      res.send (result)
  })
})