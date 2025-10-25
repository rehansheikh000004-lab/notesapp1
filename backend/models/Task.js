import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true, trim: true },
  completed: { type: Boolean, default: false },
  notes: { type: String, default: "" }
}, { timestamps: true });

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
export default Task;
