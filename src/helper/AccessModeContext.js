import React, { createContext, useContext, useEffect, useState } from "react";

const AccessModeContext = createContext({ read: false, write: true, setAccessMode: () => {} });

export const useAccessMode = () => useContext(AccessModeContext);

export const AccessModeProvider = ({ children }) => {
  const [mode, setMode] = useState({ read: false, write: true });

  // Helper to update mode from localStorage
  const updateModeFromStorage = () => {
    const userData = localStorage.getItem('U_TOKENS');
    if (userData) {
      const user = JSON.parse(userData);
      setMode({
        read: !!user.read,
        write: !!user.write
      });
    } else {
      setMode({ read: false, write: true });
    }
  };

  // Expose a setter for immediate updates
  const setAccessMode = (newMode) => {
    setMode(newMode);
    localStorage.setItem('U_TOKENS', JSON.stringify(newMode));
  };

  useEffect(() => {
    updateModeFromStorage();
    // Listen for changes to U_TOKENS in localStorage
    const handleStorage = (e) => {
      if (e.key === 'U_TOKENS') {
        updateModeFromStorage();
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <AccessModeContext.Provider value={{ ...mode, setAccessMode }}>
      {children}
    </AccessModeContext.Provider>
  );
};
