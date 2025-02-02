import express from 'express';
import db from '../dbConnection.js';

const Router = express.Router();

// Login Route (existing)
Router.post("/", async (req, res) => {
  const { user_email, user_password } = req.body;

  if (!user_email || !user_password) {
    return res.status(400).json({ error: "Email and Password are required" });
  }

  try {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE user_email = ?",
      [user_email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = rows[0];

    // Validate password (TODO: Use hashing in production)
    if (user_password !== user.user_password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json([user]); // Send the user data back
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).json({ error: "Database error" });
  }
});

// New Signup Route
Router.post("/signup", async (req, res) => {
  const { user_email, user_password } = req.body;

  if (!user_email || !user_password) {
    return res.status(400).json({ error: "Email and Password are required" });
  }

  try {
    // Check if user already exists
    const [existingUsers] = await db.execute(
      "SELECT * FROM users WHERE user_email = ?",
      [user_email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Insert new user
    await db.execute(
      "INSERT INTO users (user_email, user_password) VALUES (?, ?)",
      [user_email, user_password]
    );

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({ error: "Database error" });
  }
});

export default Router;