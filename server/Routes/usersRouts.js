import express from 'express';
import db from '../dbConnection.js';

const Router = express.Router();

Router.post("/", async (req, res) => {
  const { user_email, user_password } = req.body;
  
  if (!user_email || !user_password) {
    return res.status(400).json({ error: "Email and Password are required" });
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO users (user_email, user_password) VALUES (?, ?)",
      [user_email, user_password]
    );
    res.status(201).json({ message: "User created successfully", userId: result.insertId });
  } catch (err) {
    console.log("Error inserting user:", err);
    res.status(500).json({ error: "Database error" });
  }
});

Router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM questions");
    res.send(rows); // Send questions to the client
  } catch (err) {
    console.log("Error in fetching questions", err);
    return res.status(500).send("Error in the Query");
  }
});

export default Router;