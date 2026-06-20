import { Router } from "express";
import { register, login } from "../controllers/authController";

// Router groups related routes together — mounted at /api/auth in index.ts
const router = Router();

// POST /api/auth/register — create a new user account
router.post("/register", register);

// POST /api/auth/login — verify credentials and return a JWT token
router.post("/login", login);

export default router;