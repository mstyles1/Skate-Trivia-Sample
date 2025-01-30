import express from 'express';
import db from '../dbConnection.js';

const Router = express.Router();
Router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT a.answer_id, q.question_year, a.answer_name
FROM answers a
JOIN questions q ON a.question_year = q.question_year
    `);
    res.send(rows); // Send answers along with their question IDs
  } catch (err) {
    console.log("Error fetching answers:", err);
    return res.status(500).send("Error fetching answers");
  }
});

export default Router;