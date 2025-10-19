const backendURL = "https://notesapp-nmpz.onrender.com"; // Your Render backend URL

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesList = document.getElementById("notesList");
const authSection = document.getElementById("auth-section");
const notesSection = document.getElementById("notes-section");

let userId = localStorage.getItem("userId");

if (userId) {
  authSection.style.display = "none";
  notesSection.style.display = "block";
  loadNotes();
}

// Signup
signupBtn.onclick = async () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  const res = await fetch(`${backendURL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  alert(data.message);
};

// Login
loginBtn.onclick = async () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  const res = await fetch(`${backendURL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();

  if (data.userId) {
    localStorage.setItem("userId", data.userId);
    authSection.style.display = "none";
    notesSection.style.display = "block";
    loadNotes();
  } else {
    alert(data.message);
  }
};

// Add Note
addNoteBtn.onclick = async () => {
  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();

  const res = await fetch(`${backendURL}/api/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, title, content })
  });
  const data = await res.json();
  alert(data.message);
  noteTitle.value = "";
  noteContent.value = "";
  loadNotes();
};

// Load Notes
async function loadNotes() {
  const res = await fetch(`${backendURL}/api/notes/${localStorage.getItem("userId")}`);
  const notes = await res.json();
  notesList.innerHTML = notes.map(n => `
    <div style="border:1px solid #ccc; padding:10px; margin:10px 0; border-radius:6px;">
      <h3>${n.title}</h3>
      <p>${n.content}</p>
    </div>
  `).join("");
}
