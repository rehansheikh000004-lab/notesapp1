import React, { useState } from "react";

const NoteForm = ({ addNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    addNote({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="4"
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
      />
      <button
        type="submit"
        style={{
          width: "100%",
          padding: 10,
          background: "black",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Add Note
      </button>
    </form>
  );
};

export default NoteForm;
