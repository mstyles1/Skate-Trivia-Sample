import express from 'express';
import db from '../dbConnection.js';

const Router = express.Router();
Router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT a.answer_id, q.question_id, a.answer_name
FROM answers a
JOIN questions q ON a.question_id = q.question_id
    `);
    res.send(rows); 
  } catch (err) {
    console.log("Error fetching answers:", err);
    return res.status(500).send("Error fetching answers");
  }
});

Router.post("/", async (req, res) => {
  const { question_id, answer_name } = req.body;

  if (!question_id || !answer_name) {
    return res.status(400).send("Both question_id and answer_name are required.");
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO answers (question_id, answer_name) VALUES (?, ?)",
      [question_id, answer_name]
    );
    res.status(201).send({ message: "Answer added successfully", answerId: result.insertId });
  } catch (err) {
    console.log("Error inserting answer:", err);
    return res.status(500).send("Error inserting answer");
  }
});
Router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.execute('DELETE FROM answers WHERE answer_id = ?', [id]);
    res.status(200).send({ message: 'Answer deleted successfully' });
  } catch (err) {
    console.log('Error deleting answer:', err);
    res.status(500).send('Error deleting answer');
  }
});

export default Router;