import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function Notes({ userId, setUserId }) {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const getNotes = async () => {
    const res = await axios.get(`${API_URL}/api/notes/${userId}`);
    setNotes(res.data);
  };

  const addNote = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/api/notes`, { userId, title, content });
    setTitle("");
    setContent("");
    getNotes();
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="notes-container">
      <h2>Your Notes</h2>
      <form onSubmit={addNote}>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
        <button type="submit">Add Note</button>
      </form>
      <button className="logout-btn" onClick={() => setUserId(null)}>Logout</button>

      <div className="notes-list">
        {notes.map((n) => (
          <div key={n._id} className="note-card">
            <h3>{n.title}</h3>
            <p>{n.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
