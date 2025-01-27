import express from 'express'
import db from '../dbConnection.js'

const Router = express.Router()

Router.get ("/", (req, res)=> {
  db.query ("SELECT * FROM questions",  (err,result)=> {
    if (err) {
      console.log ("Error in fetching questions", err)
      res.status(500).send("error in the Query")
    }   
    else
      res.send (result)
  })
})

Router.post('/', (req, res) => {
  const { question_id, user_id, answer_name } = req.body;
  db.query("INSERT INTO answers (question_id, user_id, answer_name) VALUES (?, ?, ?)",[question_id, user_id, answer_name]
  );
});


export default Router;
