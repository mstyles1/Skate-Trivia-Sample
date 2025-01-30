import express from 'express';
import db from '../dbConnection.js';

const Router = express.Router();

Router.get("/", async (req, res) => {
  const { question_id } = req.query;

  if (!question_id) {
    return res.status(400).send("question_id is required.");
  }

  try {
    const [result] = await db.execute(
      `SELECT * FROM answers WHERE question_id = ?`,
      [question_id]
    );
    res.send(result);
  } catch (err) {
    console.error("Error in fetching answers:", err);
    res.status(500).send("Error in the Query");
  }
});

// POST request to submit an answer and check if it's correct
Router.post("/", async (req, res) => {
  const { question_id, answer_name } = req.body;

  if (!question_id || !answer_name) {
    return res.status(400).send("question_id and answer_name are required.");
  }

  try {
    // Fetch the correct answer for the question
    const [correctAnswerResult] = await db.execute(
      "SELECT correct_answer FROM questions WHERE question_id = ?",
      [question_id]
    );

    const correctAnswer = correctAnswerResult[0]?.correct_answer;

    // Compare the submitted answer with the correct answer
    if (correctAnswer && answer_name.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
      // The answer is correct
      res.status(200).send({ message: "Correct Answer!" });
    } else {
      // The answer is incorrect
      res.status(200).send({ message: "Incorrect Answer, try again!" });
    }

    // You can also optionally save the answer to the database here
    // const [result] = await db.execute(
    //   "INSERT INTO answers (question_id, answer_name) VALUES (?, ?)",
    //   [question_id, answer_name]
    // );

  } catch (err) {
    console.error("Error submitting answer:", err);
    res.status(500).send("Error submitting answer");
  }
});

export default Router;