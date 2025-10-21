import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/notes.js";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err.message));

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// ✅ Serve frontend
const __dirnamePath = path.resolve();
app.use(express.static(path.join(__dirnamePath, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirnamePath, "public", "index.html"));
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
