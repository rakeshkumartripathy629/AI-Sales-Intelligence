import express from "express";
import cors from "cors";

import leadRoutes from "./routes/lead.routes.js";

import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

// Middlewares
app.use(cors());

app.use(express.json());

// Health Check Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Sales Intelligence API Running"
  });
});

// Routes
app.use("/api/leads", leadRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;