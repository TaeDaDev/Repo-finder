import { Request, Response } from "express";
import pool from "../db";

interface FavoriteBody {
  repo_id: string;
  repo_name: string;
  repo_url: string;
}

export const addFavorite = async (req: Request <{}, {}, FavoriteBody>, res: Response) => {
  const {repo_id, repo_name, repo_url }: FavoriteBody = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO favorites (user_id, repo_id, repo_name, repo_url) VALUES ($1, $2, $3, $4) RETURNING *",
      [req.userId, repo_id, repo_name, repo_url],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getFavorites = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM favorites WHERE user_id = $1",
      [req.userId],
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteFavorite = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM favorites WHERE id = $1 AND user_id = $2", [
      id,
      req.userId,
    ]);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting favorite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
