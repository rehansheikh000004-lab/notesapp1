import React from "react";

const NotesList = ({ notes, deleteNote }) => {
  if (notes.length === 0) return <p>No notes yet...</p>;

  return (
    <div>
      {notes.map((note) => (
        <div
          key={note._id}
          style={{
            border: "1px solid #ccc",
            borderRadius: 8,
            padding: 10,
            marginBottom: 10,
          }}
        >
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button
            onClick={() => deleteNote(note._id)}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "6px 10px",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
