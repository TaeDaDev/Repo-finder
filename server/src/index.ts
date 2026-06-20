import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";

const app = express();

// Enable CORS for local frontend during development
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Allows Express to parse incoming JSON request bodies (req.body)
app.use(express.json());

// Falls back to 3000 locally — production environments set PORT via environment variable
const PORT = process.env.PORT || 3000;

// Test route to confirm the server is running
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Mount auth routes at /auth
app.use("/auth", authRoutes);

// Mount user routes at /user
app.use("/user", userRoutes); // All routes in userRoutes require authentication via the middleware defined in userRoutes.ts

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
