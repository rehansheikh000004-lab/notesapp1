const backendUrl = "https://notesapp1-a9tg.onrender.com/api";
let token = localStorage.getItem("token");

async function signup() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const res = await fetch(`${backendUrl}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  alert(data.message || "Signup complete");
}

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const res = await fetch(`${backendUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();

  if (data.token) {
    token = data.token;
    localStorage.setItem("token", token);
    document.getElementById("auth").style.display = "none";
    document.getElementById("notes").style.display = "block";
    loadNotes();
  } else {
    alert(data.message);
  }
}

async function addNote() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  await fetch(`${backendUrl}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  });
  loadNotes();
}

async function loadNotes() {
  const res = await fetch(`${backendUrl}/notes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const notes = await res.json();
  const container = document.getElementById("allNotes");
  container.innerHTML = notes.map((n) => `<p><b>${n.title}</b>: ${n.content}</p>`).join("");
}
