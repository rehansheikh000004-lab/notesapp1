const backendURL = "https://notesapp1-a9tg.onrender.com";

// === AUTH PAGE ===
if (document.getElementById("auth-btn")) {
  const authBtn = document.getElementById("auth-btn");
  const switchLink = document.getElementById("switch");
  const formTitle = document.getElementById("form-title");
  const message = document.getElementById("message");
  let isLogin = true;

  switchLink.addEventListener("click", (e) => {
    e.preventDefault();
    isLogin = !isLogin;
    formTitle.textContent = isLogin ? "Login" : "Sign Up";
    authBtn.textContent = isLogin ? "Login" : "Sign Up";
    switchLink.textContent = isLogin ? "Sign up" : "Login";
  });

  authBtn.addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      message.textContent = "Please fill in all fields.";
      return;
    }

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
      const res = await fetch(`${backendURL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      if (isLogin) {
        localStorage.setItem("userId", data.userId);
        window.location.href = "notes.html";
      } else {
        message.textContent = "Signup successful! Please login.";
        isLogin = true;
        formTitle.textContent = "Login";
        authBtn.textContent = "Login";
      }
    } catch (err) {
      message.textContent = err.message;
    }
  });
}

// === NOTES PAGE ===
if (document.getElementById("add-note")) {
  const userId = localStorage.getItem("userId");
  const notesList = document.getElementById("notes-list");

  if (!userId) window.location.href = "index.html";

  document.getElementById("add-note").addEventListener("click", async () => {
    const title = document.getElementById("note-title").value.trim();
    const content = document.getElementById("note-content").value.trim();
    if (!title || !content) return alert("Please fill in both fields");

    await fetch(`${backendURL}/api/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, title, content }),
    });

    document.getElementById("note-title").value = "";
    document.getElementById("note-content").value = "";
    loadNotes();
  });

  async function loadNotes() {
    const res = await fetch(`${backendURL}/api/notes/${userId}`);
    const notes = await res.json();
    notesList.innerHTML = "";
    notes.forEach(note => {
      const div = document.createElement("div");
      div.className = "note";
      div.innerHTML = `<h3>${note.title}</h3><p>${note.content}</p>`;
      notesList.appendChild(div);
    });
  }

  document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("userId");
    window.location.href = "index.html";
  });

  loadNotes();
}
