const API_URL = "https://notesapp1-a9tg.onrender.com"; // 🔥 Change this

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const authBtn = document.getElementById("auth-btn");
const switchForm = document.getElementById("switch-form");
const message = document.getElementById("message");

let isLogin = false;

if (switchForm) {
  switchForm.addEventListener("click", (e) => {
    e.preventDefault();
    isLogin = !isLogin;
    document.getElementById("form-title").textContent = isLogin
      ? "Login"
      : "Create Account";
    authBtn.textContent = isLogin ? "Login" : "Sign Up";
    switchForm.innerHTML = isLogin
      ? 'Don’t have an account? <a href="#">Sign Up</a>'
      : 'Already have an account? <a href="#">Login</a>';
  });
}

if (authBtn) {
  authBtn.addEventListener("click", async () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
      message.textContent = "Please fill all fields";
      return;
    }

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (res.ok) {
      message.textContent = data.message;
      if (isLogin) {
        localStorage.setItem("userId", data.userId);
        window.location.href = "notes.html";
      }
    } else {
      message.textContent = data.message || "Error occurred";
    }
  });
}

// NOTES PAGE LOGIC
const addNoteBtn = document.getElementById("add-note");

if (addNoteBtn) {
  const userId = localStorage.getItem("userId");
  const titleInput = document.getElementById("note-title");
  const contentInput = document.getElementById("note-content");
  const notesContainer = document.getElementById("notes-container");

  async function fetchNotes() {
    const res = await fetch(`${API_URL}/api/notes/${userId}`);
    const notes = await res.json();
    notesContainer.innerHTML = notes
      .map(
        (note) => `
      <div class="note">
        <h3>${note.title}</h3>
        <p>${note.content}</p>
      </div>`
      )
      .join("");
  }

  fetchNotes();

  addNoteBtn.addEventListener("click", async () => {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title || !content) return alert("Please fill all fields");

    await fetch(`${API_URL}/api/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, title, content }),
    });

    titleInput.value = "";
    contentInput.value = "";
    fetchNotes();
  });
}
