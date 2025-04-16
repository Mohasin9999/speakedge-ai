// src/components/Header.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
// Assuming your CSS file is named Header.css (PascalCase) based on previous corrections
import './header.css';

// Import your logo - adjust the path as needed
import speakEdgeLogo from '../assets/speakedge_logo.jpeg';

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    console.log("Stored user data string:", storedUserData);

    if (storedUserData) {
      try {
        const parsedUser = JSON.parse(storedUserData);
        console.log("Parsed user data:", parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    } else {
        console.log("No user data found in localStorage.");
    }
  }, []);

  return (
    <header className="app-header">
      <div className="header-left">
        <Link to="/" className="header-logo-link">
          <img src={speakEdgeLogo} alt="SpeakEdge Logo" className="header-logo" />
        </Link>
        <nav className="header-nav">
          <Link to="/" className="header-link">Home</Link>
          <Link to="/pricing" className="header-link">Pricing</Link>
          {/* --- MODIFICATION: Corrected the 'to' prop --- */}
          <Link to="/status" className="header-link">Status</Link>
          {/* ------------------------------------------- */}
          <Link to="/contact" className="header-link">Contact Us</Link>
          <Link to="/feedback" className="header-link">Feedback</Link>
        </nav>
      </div>

      <div className="header-right">
        {user ? (
          <div className="header-user-section">
            <Link to="/profile" className="header-profile-link">
              <div className="header-avatar-container">
                {user.photo ? (
                  <>
                    <img
                      src={user.photo}
                      alt="User Avatar"
                      className="header-avatar-image"
                      onError={(e) => { e.target.style.display = 'none'; /* Hide img on error */ const fallback = e.target.nextElementSibling; if (fallback) fallback.style.display = 'flex'; /* Show fallback */ }} // Slightly safer error handling
                    />
                    {/* Fallback icon div (using CSS might be better) */}
                    <div className="header-avatar-fallback" style={{ display: 'none' }}>
                      <FaUser className="header-avatar-icon" />
                    </div>
                  </>
                ) : (
                  <div className="header-avatar-fallback" style={{ display: 'flex' }}> {/* Ensure fallback displays */}
                    <FaUser className="header-avatar-icon" />
                  </div>
                )}
              </div>
              <span className="header-username">{user.name || "User"}</span>
            </Link>
            {/* Optional: Add Logout Button Here */}
            {/* <button onClick={handleLogout} className="logout-button">Logout</button> */}
          </div>
        ) : (
          <Link to="/login" className="header-login-link">
            <FaUser className="header-login-icon" />
            <span className="header-login-text">Login</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;