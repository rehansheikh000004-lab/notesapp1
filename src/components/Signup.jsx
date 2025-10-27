import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function Signup({ setShowSignup, setUserId }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/auth/signup`, { username, password });
      setMsg("Signup successful! Please login.");
      setTimeout(() => setShowSignup(false), 1000);
    } catch (err) {
      setMsg("User already exists");
    }
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Signup</button>
      </form>
      <p>{msg}</p>
      <p>
        Already have an account? <span onClick={() => setShowSignup(false)}>Login</span>
      </p>
    </div>
  );
}
