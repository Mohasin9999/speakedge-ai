// src/context/ThemeContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
export const ThemeContext = createContext();

// Create a custom hook for easy consumption
export const useTheme = () => useContext(ThemeContext);

// Create the ThemeProvider component
export const ThemeProvider = ({ children }) => {
  // Initialize theme state from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') { // Ensure window is defined (for SSR compatibility)
      const storedTheme = localStorage.getItem('theme');
      // Check for user's system preference if no theme is stored
      if (storedTheme) {
        return storedTheme;
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light'; // Default to light if no preference found
  });

  // Effect to apply/remove 'dark' class on <html> element and save to localStorage
  useEffect(() => {
    const root = window.document.documentElement; // Get the <html> element

    // Remove both classes first to ensure correct state
    root.classList.remove('light', 'dark');

    // Add the current theme class
    root.classList.add(theme);

    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]); // Re-run effect whenever theme changes

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};