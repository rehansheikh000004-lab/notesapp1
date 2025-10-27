import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ✅ Schema + Model
const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});
const Note = mongoose.model("Note", noteSchema);

// ✅ Routes
app.get("/", (req, res) => res.send("NotesApp Backend Running 🚀"));

// Get all notes
app.get("/api/notes", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

// Add a note
app.post("/api/notes", async (req, res) => {
  const { title, content } = req.body;
  const newNote = new Note({ title, content });
  await newNote.save();
  res.json({ message: "Note added successfully", note: newNote });
});

// Delete a note
app.delete("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  await Note.findByIdAndDelete(id);
  res.json({ message: "Note deleted" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
