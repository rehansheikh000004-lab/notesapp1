import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  title: String,
  content: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.models.Note || mongoose.model("Note", NoteSchema);
