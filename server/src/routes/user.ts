import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import {
  addFavorite,
  getFavorites,
  deleteFavorite,
} from "../controllers/userController";

const userRouter = Router();

// All routes in this router require authentication
userRouter.use(authenticateToken);

// POST /api/user/favorites — add a new favorite repository for the authenticated user
userRouter.post("/favorites", addFavorite);

// GET /api/user/favorites — retrieve all favorite repositories for the authenticated user
userRouter.get("/favorites", getFavorites);

// DELETE /api/user/favorites/:id — remove a favorite repository by its ID for the authenticated user
userRouter.delete("/favorites/:id", deleteFavorite);

export default userRouter;
