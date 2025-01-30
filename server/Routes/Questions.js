import express from 'express';
import db from '../dbConnection.js';

const Router = express.Router();

// GET route to fetch all questions
Router.get("/", (req, res) => {
  db.query("SELECT * FROM questions", (err, result) => {
    if (err) {
      console.log("Error in fetching questions", err);
      return res.status(500).send("Error in the Query");
    }
    res.send(result); // Send questions to the client
  });
});

// POST route to insert a new answer (related to a question)
Router.post('/', (req, res) => {
  const { question_id, user_id, answer_name } = req.body;

  // Validate the required fields
  if (!question_id || !user_id || !answer_name) {
    return res.status(400).send("All fields (question_id, user_id, answer_name) are required.");
  }

  db.query(
    "INSERT INTO answers (question_id, user_id, answer_name) VALUES (?, ?, ?)",
    [question_id, user_id, answer_name],
    (err, result) => {
      if (err) {
        console.log("Error in inserting answer:", err);
        return res.status(500).send("Error inserting answer");
      }
      res.status(201).send({ message: "Answer submitted successfully", answerId: result.insertId });
    }
  );
});

export default Router;