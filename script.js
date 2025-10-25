document.getElementById("showSignup").addEventListener("click", () => {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
});

document.getElementById("showLogin").addEventListener("click", () => {
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
});

// Login placeholder
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Login functionality will connect to backend soon!");
});

// Signup placeholder
document.getElementById("signupForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Signup functionality will connect to backend soon!");
});
