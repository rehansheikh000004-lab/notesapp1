import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function Login({ setShowSignup, setUserId }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { username, password });
      setUserId(res.data.userId);
    } catch (err) {
      setMsg("Invalid credentials");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p>{msg}</p>
      <p>
        Don't have an account? <span onClick={() => setShowSignup(true)}>Signup</span>
      </p>
    </div>
  );
}
