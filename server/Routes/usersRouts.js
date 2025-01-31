import express from 'express';
import db from '../dbConnection.js';

const Router = express.Router();

Router.post("/", async (req, res) => {
  const { user_email, user_password } = req.query;

  if (!user_email || !user_password) {
    return res.status(400).json({ error: "Email and Password are required" });
  }

  try {
    // Check if user exists
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE user_email = ?",
      [user_email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = rows[0];

    // Validate password (assuming you store hashed passwords)
    if (user_password !== user.user_password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Successfully authenticated
    res.status(200).json([user]); // Send the user data back
  } catch (err) {
    console.log("Error fetching user:", err);
    return res.status(500).json({ error: "Database error" });
  }
});
export default Router;