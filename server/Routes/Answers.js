import express from 'express'
import db from '../dbConnection.js'

const Router = express.Router()

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

    // Assuming that you have an "is_correct" field to determine the correct answer
    res.send(result);
  } catch (err) {
    console.error("Error in fetching answers:", err);
    res.status(500).send("Error in the Query");
  }
});

export default Router; 