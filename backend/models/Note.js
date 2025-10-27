import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  userId: String,
  title: String,
  content: String
});

export default mongoose.models.Note || mongoose.model("Note", noteSchema);
