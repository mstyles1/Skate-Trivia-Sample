import express from 'express';
import db from '../dbConnection.js';

const Router = express.Router();

Router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM questions");
    res.send(rows); 
  } catch (err) {
    console.log("Error in fetching questions", err);
    return res.status(500).send("Error in the Query");
  }
});


Router.post('/', async (req, res) => {
  const { question_id, user_id, answer_name } = req.body;

  if (!question_id || !user_id || !answer_name) {
    return res.status(400).send("All fields (question_id, user_id, answer_name) are required.");
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO answers (question_id, user_id, answer_name) VALUES (?, ?, ?)",
      [question_id, user_id, answer_name]
    );
    res.status(201).send({ message: "Answer submitted successfully", answerId: result.insertId });
  } catch (err) {
    console.log("Error in inserting answer:", err);
    return res.status(500).send("Error inserting answer");
  }
});

export default Router;