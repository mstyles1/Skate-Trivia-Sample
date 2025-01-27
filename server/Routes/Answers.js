import express from 'express'
import db from '../dbConnection.js'

const Router = express.Router()

Router.get ("/", (req, res)=> {
  const {question_id, user_id} = req.query 
  db.query ("SELECT * FROM answer.answers " &
            "INNER JOIN users ON answers.user_id = users.user_id" &
            "INNER JOIN Questions ON answers.question_id = questions.question_id " &      
            "WHERE answers.question_id = ? " &
            "AND " &
            "answers.user_id = ?", [question_id,user_id], (err,result)=> {
    if (err) {
      console.log ("Error in fetching answers", err)
      res.status(500).send("error in the Query")
    }   
    else
      res.send (result)
  })
})


export default Router;