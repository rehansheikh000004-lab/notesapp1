// ✅ Backend API base URL (your Render link)
const backendUrl = "https://notesapp1-a9tg.onrender.com";

// ✅ Select HTML elements
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const notesContainer = document.getElementById("notesContainer");
const noteForm = document.getElementById("noteForm");
const logoutBtn = document.getElementById("logoutBtn");

// ✅ Helper: get token from localStorage
function getToken() {
  return localStorage.getItem("token");
}

// ✅ Redirect if not logged in (for notes page)
if (window.location.pathname.includes("notes.html")) {
  if (!getToken()) {
    window.location.href = "index.html";
  } else {
    fetchNotes();
  }
}

// ✅ Register User
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();

    const res = await fetch(`${backendUrl}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Registration successful! Please log in.");
      window.location.href = "login.html";
    } else {
      alert(`⚠️ ${data.message}`);
    }
  });
}

// ✅ Login User
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const res = await fetch(`${backendUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      alert("✅ Login successful!");
      window.location.href = "notes.html";
    } else {
      alert(`⚠️ ${data.message}`);
    }
  });
}

// ✅ Fetch Notes
async function fetchNotes() {
  try {
    const res = await fetch(`${backendUrl}/notes`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const notes = await res.json();
    if (notesContainer) {
      notesContainer.innerHTML = "";

      notes.forEach((note) => {
        const div = document.createElement("div");
        div.className = "note";
        div.innerHTML = `
          <h3>${note.title}</h3>
          <p>${note.content}</p>
          <button onclick="deleteNote('${note._id}')">🗑 Delete</button>
        `;
        notesContainer.appendChild(div);
      });
    }
  } catch (err) {
    console.error("Error fetching notes:", err);
  }
}

// ✅ Add New Note
if (noteForm) {
  noteForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("noteTitle").value.trim();
    const content = document.getElementById("noteContent").value.trim();

    const res = await fetch(`${backendUrl}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      document.getElementById("noteTitle").value = "";
      document.getElementById("noteContent").value = "";
      fetchNotes();
    } else {
      alert("⚠️ Failed to add note.");
    }
  });
}

// ✅ Delete Note
async function deleteNote(id) {
  const confirmDel = confirm("🗑 Delete this note?");
  if (!confirmDel) return;

  const res = await fetch(`${backendUrl}/notes/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (res.ok) {
    fetchNotes();
  } else {
    alert("⚠️ Failed to delete note.");
  }
}

// ✅ Logout
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    alert("🚪 Logged out successfully!");
    window.location.href = "index.html";
  });
}
