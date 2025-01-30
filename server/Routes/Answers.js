import express from 'express'
import db from '../dbConnection.js'

const Router = express.Router()

Router.get("/", async (req, res) => {
  const { question_id, answer_id } = req.query;

  if (!question_id || !answer_id) {
    return res.status(400).send("Both question_id and answer_id are required.");
  }

  try {
    const [result] = await db.execute(
      `SELECT * FROM answers 
       INNER JOIN users ON answers.answer_id = answer.id 
       INNER JOIN questions ON answers.question_id = questions.question_id
       WHERE answers.question_id = ? 
       AND answers.answer_id = ?`,
      [question_id, answer_id]
    );
    
    res.send(result);
  } catch (err) {
    console.error("Error in fetching answers:", err);
    res.status(500).send("Error in the Query");
  }
});


export default Router;