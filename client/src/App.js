import React, { useState } from "react";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleRegister = () => {
    setIsRegistering(true);
  };

  const handleCancelRegister = () => {
    setIsRegistering(false);
  };

  return (
    <div>
      <Navbar
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        handleRegister={handleRegister}
      />
      <main>
        {!isLoggedIn && isRegistering && (
          <RegisterForm handleCancelRegister={handleCancelRegister} />
        )}
        {!isLoggedIn && !isRegistering && (
          <LoginForm handleLogin={handleLogin} handleRegister={handleRegister} />
        )}
        {/* Render your main content here */}
      </main>
    </div>
  );
}

export default App;