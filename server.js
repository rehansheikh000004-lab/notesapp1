import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";

dotenv.config();

const app = express();

// ----- Middleware -----
app.use(express.json());

// CORS: change these origins to your frontend URLs
const allowedOrigins = [
  "https://rehansheikh000004-lab.github.io",
  "https://rehansheikh000004-lab.github.io/notesapp1",
  "http://localhost:5173",
  "http://localhost:5000"
];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("CORS policy: Origin not allowed"), false);
  },
  credentials: true
}));

// ----- Connect DB & start server -----
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    // Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/tasks", taskRoutes);

    // simple root route
    app.get("/", (req, res) => res.json({ message: "Luxvora Tasks backend running" }));

    app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
