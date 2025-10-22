import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: String,
  content: String
});

export default mongoose.models.Note || mongoose.model("Note", noteSchema);
