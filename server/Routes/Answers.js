import express from 'express';
import db from '../dbConnection.js';

const Router = express.Router();

Router.post("/", async (req, res) => {
  const { question_id, answer_name } = req.body;

  if (!question_id || !answer_name) {
    return res.status(400).send("Both question_id and answer_name are required.");
  }

  try {
    const [correctAnswerRows] = await db.execute(
      "SELECT answer_name FROM answers WHERE question_id = ? AND is_correct = 1",
      [question_id]
    );

    if (correctAnswerRows.length === 0) {
      return res.status(404).send("Correct answer not found.");
    }

    const correctAnswer = correctAnswerRows[0].answer_name;
    const isCorrect = correctAnswerRows[0].is_correct;

    if (answer_name.toLowerCase() === correctAnswer.toLowerCase()) {
      return res.status(200).send({ message: "Correct!" });
    } else {
      return res.status(200).send({
        message: "Incorrect",
        correct_answer: correctAnswer,
      });
    }
  } catch (err) {
    console.error("Error in validating answer:", err);
    return res.status(500).send("Error validating answer.");
  }
});

export default Router;