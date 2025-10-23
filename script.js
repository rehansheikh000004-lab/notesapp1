const backendURL = "https://notesapp1-a9tg.onrender.com";

// ---------- SIGNUP ----------
document.getElementById("signupBtn")?.addEventListener("click", async () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const res = await fetch(`${backendURL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  document.getElementById("message").textContent = data.message || "Signup failed!";
});

// ---------- LOGIN ----------
document.getElementById("loginBtn")?.addEventListener("click", async () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const res = await fetch(`${backendURL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (data.userId) {
    localStorage.setItem("userId", data.userId);
    window.location.href = "notes.html";
  } else {
    document.getElementById("message").textContent = data.message;
  }
});

// ---------- NOTES ----------
const userId = localStorage.getItem("userId");

async function loadNotes() {
  if (!userId) return;
  const res = await fetch(`${backendURL}/api/notes/${userId}`);
  const notes = await res.json();

  const notesList = document.getElementById("notesList");
  if (notesList) {
    notesList.innerHTML = "";
    notes.forEach(note => {
      const div = document.createElement("div");
      div.className = "note";
      div.innerHTML = `<h3>${note.title}</h3><p>${note.content}</p>`;
      notesList.appendChild(div);
    });
  }
}

document.getElementById("saveNoteBtn")?.addEventListener("click", async () => {
  const title = document.getElementById("noteTitle").value;
  const content = document.getElementById("noteContent").value;

  await fetch(`${backendURL}/api/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, title, content }),
  });

  loadNotes();
});

document.getElementById("logoutBtn")?.addEventListener("click", () => {
  localStorage.removeItem("userId");
  window.location.href = "index.html";
});

loadNotes();
