// src/components/Header.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";

import { useTheme } from '../context/ThemeContext';

// Import both logos
import speakEdgeLogo from '../assets/speakedge_logo.jpeg';       // Light mode logo (black text on white/light bg)
import speakEdgeLogowhite from '../assets/speakedge_logo_white.png'; // Dark mode logo (white text on dark bg)

const Header = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const DEFAULT_AVATAR_URL = "https://placehold.co/40x40/cbd5e1/2a4365?text=U";

  useEffect(() => {
    const checkUserStatus = () => {
      const storedUserData = localStorage.getItem("user");
      if (storedUserData) {
        try {
          const parsedUser = JSON.parse(storedUserData);
          setUser(parsedUser);
        } catch (error) {
          console.error("Error parsing user data from localStorage:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkUserStatus();

    const handleAuthChange = () => {
      checkUserStatus();
    };
    window.addEventListener('storage', handleAuthChange);
    
    return () => {
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    console.log("User logged out.");
  };

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Left Section: Logo and Desktop Navigation */}
        <div className="flex items-center space-x-8 lg:space-x-12">
          <Link to="/" className="flex-shrink-0" onClick={handleNavLinkClick}>
            <img 
              src={theme === 'light' ? speakEdgeLogo : speakEdgeLogowhite} 
              alt="SpeakEdge Logo" 
              className="h-14 md:h-16 object-contain" 
            />
          </Link>

          {/* Desktop Navigation - Hidden below lg breakpoint */}
          <nav className="hidden lg:flex items-center space-x-6 lg:space-x-8"> {/* CHANGED: md:flex to lg:flex */}
            <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium text-base transition-colors duration-200 px-3 py-2 rounded-md dark:text-gray-200 dark:hover:text-indigo-400" onClick={handleNavLinkClick}>Home</Link>
            <Link to="/pricing" className="text-gray-700 hover:text-indigo-600 font-medium text-base transition-colors duration-200 px-3 py-2 rounded-md dark:text-gray-200 dark:hover:text-indigo-400" onClick={handleNavLinkClick}>Pricing</Link>
            <Link to="/about" className="text-gray-700 hover:text-indigo-600 font-medium text-base transition-colors duration-200 px-3 py-2 rounded-md dark:text-gray-200 dark:hover:text-indigo-400" onClick={handleNavLinkClick}>About Us</Link>
            <Link to="/faqs" className="text-gray-700 hover:text-indigo-600 font-medium text-base transition-colors duration-200 px-3 py-2 rounded-md dark:text-gray-200 dark:hover:text-indigo-400" onClick={handleNavLinkClick}>FAQs</Link>
            <Link to="/contact" className="text-gray-700 hover:text-indigo-600 font-medium text-base transition-colors duration-200 px-3 py-2 rounded-md dark:text-gray-200 dark:hover:text-indigo-400" onClick={handleNavLinkClick}>Contact Us</Link>
          </nav>
        </div>

        {/* Right Section: User/Login, Theme Toggle, Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 dark:text-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <FaMoon className="h-5 w-5" />
            ) : (
              <FaSun className="h-5 w-5" />
            )}
          </button>

          {user ? (
            // User is signed in (Desktop Display) - Hidden below lg breakpoint
            <div className="relative hidden lg:flex items-center"> {/* CHANGED: md:flex to lg:flex */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:hover:bg-gray-700"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen ? "true" : "false"}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-400 flex items-center justify-center bg-gray-200 flex-shrink-0 dark:bg-gray-700 dark:border-indigo-500">
                  {user.photo ? (
                    <img
                      src={user.photo}
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = DEFAULT_AVATAR_URL;
                      }}
                    />
                  ) : (
                    <img src={DEFAULT_AVATAR_URL} alt="Default User Avatar" className="w-full h-full object-cover" />
                  )}
                </div>
                <span className="font-medium text-gray-800 text-base hidden lg:block dark:text-gray-100">{user.name || "User"}</span>
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-100 visible transition-all duration-200 transform origin-top-right animate-dropdown-fade-in z-20 dark:bg-gray-700 dark:border-gray-600 dark:shadow-xl">
                  <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-t-lg dark:text-gray-200 dark:hover:bg-gray-600" onClick={handleNavLinkClick}>Profile</Link>
                  <Link to="/speak" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 dark:text-gray-200 dark:hover:bg-gray-600" onClick={handleNavLinkClick}>Start Speaking</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-b-lg dark:text-red-400 dark:hover:bg-gray-600">Logout</button>
                </div>
              )}
            </div>
          ) : (
            // User is not signed in (Desktop Display) - Hidden below lg breakpoint
            <Link
              to="/login"
              className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 flex items-center gap-2 text-sm md:text-base hidden lg:flex" /* CHANGED: md:flex to lg:flex */
              onClick={handleNavLinkClick}
            >
              <FaUser className="text-lg" />
              Sign In
            </Link>
          )}

          {/* Mobile Menu Toggle Button (Hamburger) - Visible from lg breakpoint down */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 dark:text-gray-200 dark:hover:bg-gray-700" /* CHANGED: md:hidden to lg:hidden */
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay - Slides in from right, visible from lg breakpoint down */}
      <div
        className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out lg:hidden ${ /* CHANGED: md:hidden to lg:hidden */
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } shadow-lg dark:bg-gray-800`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <Link to="/" className="flex-shrink-0" onClick={handleNavLinkClick}>
            <img 
              src={theme === 'light' ? speakEdgeLogo : speakEdgeLogowhite} 
              alt="SpeakEdge Logo" 
              className="h-14 object-contain" 
            />
          </Link>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-200 dark:hover:bg-gray-700"
            aria-label="Close navigation"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="flex flex-col items-start px-4 pt-6 space-y-4">
          <Link onClick={handleNavLinkClick} to="/" className="w-full text-left text-xl text-gray-800 hover:text-indigo-600 font-semibold py-3 px-2 rounded-md transition-colors duration-200 dark:text-gray-100 dark:hover:bg-gray-700">Home</Link>
          <Link onClick={handleNavLinkClick} to="/pricing" className="w-full text-left text-xl text-gray-800 hover:text-indigo-600 font-semibold py-3 px-2 rounded-md transition-colors duration-200 dark:text-gray-100 dark:hover:bg-gray-700">Pricing</Link>
          <Link onClick={handleNavLinkClick} to="/about" className="w-full text-left text-xl text-gray-800 hover:text-indigo-600 font-semibold py-3 px-2 rounded-md transition-colors duration-200 dark:text-gray-100 dark:hover:bg-gray-700">About Us</Link>
          <Link onClick={handleNavLinkClick} to="/faqs" className="w-full text-left text-xl text-gray-800 hover:text-indigo-600 font-semibold py-3 px-2 rounded-md transition-colors duration-200 dark:text-gray-100 dark:hover:bg-gray-700">FAQs</Link>
          <Link onClick={handleNavLinkClick} to="/contact" className="w-full text-left text-xl text-gray-800 hover:text-indigo-600 font-semibold py-3 px-2 rounded-md transition-colors duration-200 dark:text-gray-100 dark:hover:bg-gray-700">Contact Us</Link>
          <Link onClick={handleNavLinkClick} to="/feedback" className="w-full text-left text-xl text-gray-800 hover:text-indigo-600 font-semibold py-3 px-2 rounded-md transition-colors duration-200 dark:text-gray-100 dark:hover:bg-gray-700">Feedback</Link>
          
          {/* User/Login section within Mobile Menu */}
          {user ? (
            <div className="w-full pt-6 border-t border-gray-200 mt-4 flex flex-col items-start space-y-3 dark:border-gray-700">
              <Link to="/profile" className="w-full flex items-center gap-3 py-3 px-2 rounded-md text-gray-800 hover:bg-gray-100 transition-colors duration-200 dark:text-gray-100 dark:hover:bg-gray-700" onClick={handleNavLinkClick}>
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-400 flex items-center justify-center bg-gray-200 flex-shrink-0 dark:bg-gray-700 dark:border-indigo-500">
                  {user.photo ? (
                    <img src={user.photo} alt="User Avatar" className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_AVATAR_URL; }} />
                  ) : (
                    <img src={DEFAULT_AVATAR_URL} alt="Default User Avatar" className="w-full h-full object-cover" />
                  )}
                </div>
                <span className="font-semibold text-lg">{user.name || "User"}</span>
              </Link>
              <Link to="/speak" className="w-full text-left px-2 py-3 text-gray-800 hover:bg-indigo-50 rounded-md transition-colors duration-200 text-lg font-semibold dark:text-gray-100 dark:hover:bg-gray-700" onClick={handleNavLinkClick}>Start Speaking</Link>
              <button onClick={handleLogout} className="w-full text-left px-2 py-3 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200 text-lg font-semibold dark:text-red-400 dark:hover:bg-gray-700">Logout</button>
            </div>
          ) : (
            <Link onClick={handleNavLinkClick} to="/login" className="w-full mt-4 px-2 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition-colors duration-200 text-lg text-center">Sign In</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
