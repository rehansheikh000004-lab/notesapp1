import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await axios.get(`${API_URL}/api/notes`);
    setNotes(res.data);
  };

  const addNote = async (note) => {
    await axios.post(`${API_URL}/api/notes`, note);
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`${API_URL}/api/notes/${id}`);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>📝 Notes App</h1>
      <NoteForm addNote={addNote} />
      <NotesList notes={notes} deleteNote={deleteNote} />
    </div>
  );
};

export default App;
