import express from "express";
import jwt from "jsonwebtoken";
import Note from "../models/Note.js";

const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
};

router.post("/", verifyToken, async (req, res) => {
  const { title, content } = req.body;
  const note = new Note({ userId: req.userId, title, content });
  await note.save();
  res.json(note);
});

router.get("/", verifyToken, async (req, res) => {
  const notes = await Note.find({ userId: req.userId });
  res.json(notes);
});

export default router;
