import React, { useState } from "react";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Notes from "./components/Notes.jsx";

export default function App() {
  const [userId, setUserId] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  if (!userId) {
    return (
      <div className="auth-container">
        <h1>📝 Notes App</h1>
        {showSignup ? (
          <Signup setShowSignup={setShowSignup} setUserId={setUserId} />
        ) : (
          <Login setShowSignup={setShowSignup} setUserId={setUserId} />
        )}
      </div>
    );
  }

  return <Notes userId={userId} setUserId={setUserId} />;
}
