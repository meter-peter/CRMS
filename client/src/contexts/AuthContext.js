import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  function signup(email, password) {
    // Sample implementation for sign up
    return Promise.resolve();
  }

  function login(email, password) {
    // Sample implementation for login
    return Promise.resolve();
  }

  function logout() {
    // Sample implementation for logout
    return Promise.resolve();
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
