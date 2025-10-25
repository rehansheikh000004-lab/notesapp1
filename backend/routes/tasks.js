import express from "express";
import Task from "../models/Task.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Get all tasks for logged-in user
router.get("/", protect, async (req, res) => {
  const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(tasks);
});

// Create task
router.post("/", protect, async (req, res) => {
  try {
    const { title, notes } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const task = await Task.create({ user: req.userId, title, notes: notes || "" });
    res.status(201).json(task);
  } catch (err) {
    console.error("Create task error", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update task (title / completed / notes)
router.put("/:id", protect, async (req, res) => {
  try {
    const { title, completed, notes } = req.body;
    const task = await Task.findOne({ _id: req.params.id, user: req.userId });
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;
    if (notes !== undefined) task.notes = notes;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error("Update task error", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete task
router.delete("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error("Delete task error", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
