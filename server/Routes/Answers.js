import express from 'express';
import db from '../dbConnection.js';

const Router = express.Router();
Router.get("/answers", async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT a.answer_id, a.answer_name, q.question_id 
      FROM answers a
      JOIN questions q ON a.question_id = q.question_id
    `);
    res.send(rows); // Send answers along with their question IDs
  } catch (err) {
    console.log("Error fetching answers:", err);
    return res.status(500).send("Error fetching answers");
  }
});

export default Router;