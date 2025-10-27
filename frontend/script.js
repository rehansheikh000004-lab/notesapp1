const backendUrl = "https://notesapp1-a9tg.onrender.com"; // your render backend

// === LOGIN & SIGNUP PAGE ===
if (document.getElementById("submitBtn")) {
  const formTitle = document.getElementById("form-title");
  const toggleForm = document.getElementById("toggleForm");
  const submitBtn = document.getElementById("submitBtn");
  const message = document.getElementById("message");

  let isLogin = true;

  toggleForm.addEventListener("click", () => {
    isLogin = !isLogin;
    formTitle.textContent = isLogin ? "Login" : "Signup";
    submitBtn.textContent = isLogin ? "Login" : "Signup";
    toggleForm.innerHTML = isLogin
      ? `Don't have an account? <span>Signup</span>`
      : `Already have an account? <span>Login</span>`;
    message.textContent = "";
  });

  submitBtn.addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      message.textContent = "Please fill all fields";
      return;
    }

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
    const res = await fetch(`${backendUrl}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      message.textContent = data.message || "Error occurred";
      return;
    }

    if (isLogin) {
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("token", data.token);
      window.location.href = "notes.html";
    } else {
      message.textContent = "Signup successful! Please login.";
      isLogin = true;
      formTitle.textContent = "Login";
      submitBtn.textContent = "Login";
    }
  });
}

// === NOTES PAGE ===
if (document.getElementById("addNoteBtn")) {
  const userId = localStorage.getItem("userId");
  if (!userId) window.location.href = "index.html";

  const notesList = document.getElementById("notesList");

  const loadNotes = async () => {
    const res = await fetch(`${backendUrl}/api/notes/${userId}`);
    const notes = await res.json();
    notesList.innerHTML = "";
    notes.forEach((note) => {
      const div = document.createElement("div");
      div.className = "note";
      div.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
      `;
      notesList.appendChild(div);
    });
  };

  loadNotes();

  document.getElementById("addNoteBtn").addEventListener("click", async () => {
    const title = document.getElementById("noteTitle").value.trim();
    const content = document.getElementById("noteContent").value.trim();

    if (!title || !content) return alert("Please enter both title and content");

    await fetch(`${backendUrl}/api/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, title, content }),
    });

    document.getElementById("noteTitle").value = "";
    document.getElementById("noteContent").value = "";
    loadNotes();
  });

  document.getElementById("logout").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
  });
}
