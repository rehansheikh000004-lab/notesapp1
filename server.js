import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// ---------- MongoDB Connection ----------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// ---------- User Schema ----------
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

// ---------- Note Schema ----------
const noteSchema = new mongoose.Schema({
  userId: String,
  title: String,
  content: String,
});
const Note = mongoose.model("Note", noteSchema);

// ---------- Middleware ----------
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.userId = decoded.userId;
    next();
  });
}

// ---------- Routes ----------
// Register
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();
  res.json({ message: "User registered successfully" });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token });
});

// CRUD for Notes (Protected)
app.get("/notes", verifyToken, async (req, res) => {
  const notes = await Note.find({ userId: req.userId });
  res.json(notes);
});

app.post("/notes", verifyToken, async (req, res) => {
  const newNote = new Note({ ...req.body, userId: req.userId });
  await newNote.save();
  res.json(newNote);
});

app.delete("/notes/:id", verifyToken, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
});

app.listen(3000, () => console.log("✅ NotesApp backend running successfully"));
