const backendURL = "https://notesapp1-a9tg.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
  const signupBtn = document.getElementById("signup-btn");
  const loginBtn = document.getElementById("login-btn");
  const addNoteBtn = document.getElementById("add-note");

  if (signupBtn) signupBtn.addEventListener("click", signup);
  if (loginBtn) loginBtn.addEventListener("click", login);
  if (addNoteBtn) addNoteBtn.addEventListener("click", addNote);
});

async function signup() {
  const username = document.getElementById("signup-username").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  const res = await fetch(`${backendURL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  });

  const data = await res.json();
  alert(data.message);
}

async function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const res = await fetch(`${backendURL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.href = "notes.html";
  } else {
    alert(data.message);
  }
}

async function addNote() {
  const title = document.getElementById("note-title").value;
  const content = document.getElementById("note-content").value;

  const token = localStorage.getItem("token");

  const res = await fetch(`${backendURL}/api/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title, content })
  });

  const data = await res.json();
  console.log("Note added:", data);
}
