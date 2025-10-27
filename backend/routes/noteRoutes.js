import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

// Get notes
router.get("/:userId", async (req, res) => {
  const notes = await Note.find({ userId: req.params.userId });
  res.json(notes);
});

// Add note
router.post("/", async (req, res) => {
  const { userId, title, content } = req.body;
  const note = new Note({ userId, title, content });
  await note.save();
  res.json({ message: "Note added" });
});

export default router;
