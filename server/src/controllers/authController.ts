import { Request, Response } from "express";
import pool from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Describes the shape of the request body for auth routes
interface AuthBody {
  email: string;
  password: string;
}

// Request<{}, {}, AuthBody> tells TypeScript the third slot (req.body) matches AuthBody
export const register = async (
  req: Request<{}, {}, AuthBody>,
  res: Response,
) => {
  const { email, password } = req.body;

  try {
    // Check if email is already registered before doing anything else
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email],
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // 10 is the salt rounds — higher is more secure but slower
    const hashedPassword = await bcrypt.hash(password, 10);

    // RETURNING id gives us back the new row's id without a second query
    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id",
      [email, hashedPassword],
    );
    res.status(201).json({ userId: result.rows[0].id });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (
  req: Request<{}, {}, AuthBody>,
  res: Response,
) => {
  const { email, password } = req.body;

  try {
    // Fetch the stored hashed password to compare against
    const result = await pool.query(
      "SELECT id, password FROM users WHERE email = $1",
      [email],
    );

    // Same error message for missing user and wrong password — prevents email enumeration
    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const user = result.rows[0];

    // bcrypt.compare hashes the submitted password and checks it against the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d", // Token expires in 7 days
    });

    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};