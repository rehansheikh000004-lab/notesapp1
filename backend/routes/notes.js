import express from "express";
import jwt from "jsonwebtoken";
import Note from "../models/Note.js";

const router = express.Router();
const JWT_SECRET = "supersecretkey";

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
}

router.get("/", authenticate, async (req, res) => {
  const notes = await Note.find({ userId: req.user.userId });
  res.json(notes);
});

router.post("/", authenticate, async (req, res) => {
  const { title, content } = req.body;
  const note = new Note({ userId: req.user.userId, title, content });
  await note.save();
  res.json(note);
});

export default router;
