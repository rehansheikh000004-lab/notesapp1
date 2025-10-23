import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://rehansheikh000004-lab.github.io", // your GitHub Pages site
  methods: ["GET", "POST"],
}));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB error:", err));

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});
const noteSchema = new mongoose.Schema({
  userId: String,
  title: String,
  content: String
});

const User = mongoose.model("User", userSchema);
const Note = mongoose.model("Note", noteSchema);

app.get("/", (req, res) => res.send("🚀 NotesApp backend running successfully!"));

// Signup
app.post("/api/auth/signup", async (req, res) => {
  const { username, password } = req.body;
  const existing = await User.findOne({ username });
  if (existing) return res.status(400).json({ message: "User already exists" });

  const user = new User({ username, password });
  await user.save();
  res.json({ message: "Signup successful" });
});

// Login
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });
  res.json({ message: "Login successful", userId: user._id });
});

// Notes
app.get("/api/notes/:userId", async (req, res) => {
  const notes = await Note.find({ userId: req.params.userId });
  res.json(notes);
});
app.post("/api/notes", async (req, res) => {
  const { userId, title, content } = req.body;
  const note = new Note({ userId, title, content });
  await note.save();
  res.json({ message: "Note added successfully" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
