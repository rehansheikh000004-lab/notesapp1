const API_BASE = "https://notesapp1-a9tg.onrender.com/api/auth"; // 🔥 Replace with your actual Render URL

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const authBtn = document.getElementById("auth-btn");
const toggleText = document.getElementById("toggle-text");
const toggleLink = document.getElementById("toggle-link");
const message = document.getElementById("message");
const formTitle = document.getElementById("form-title");

let isLogin = true;

toggleLink.addEventListener("click", () => {
  isLogin = !isLogin;
  formTitle.textContent = isLogin ? "Login" : "Sign Up";
  authBtn.textContent = isLogin ? "Login" : "Sign Up";
  toggleText.innerHTML = isLogin
    ? `Don't have an account? <span id="toggle-link">Sign up</span>`
    : `Already have an account? <span id="toggle-link">Login</span>`;
  message.textContent = "";

  nameInput.classList.toggle("hidden", isLogin);
});

document.addEventListener("click", (e) => {
  if (e.target.id === "toggle-link") {
    toggleLink.click();
  }
});

authBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const name = nameInput.value.trim();

  if (!email || !password || (!isLogin && !name)) {
    message.textContent = "Please fill all fields.";
    return;
  }

  try {
    const endpoint = isLogin ? `${API_BASE}/login` : `${API_BASE}/signup`;
    const body = isLogin ? { email, password } : { name, email, password };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      message.textContent = data.message || "Something went wrong";
      message.style.color = "red";
      return;
    }

    if (isLogin) {
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html";
    } else {
      message.textContent = "Account created successfully! Please login.";
      message.style.color = "lightgreen";
      toggleLink.click();
    }
  } catch (err) {
    message.textContent = "Server error. Try again later.";
    message.style.color = "red";
  }
});
