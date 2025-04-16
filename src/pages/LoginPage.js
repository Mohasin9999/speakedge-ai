// src/pages/LoginPage.js
import React, { useState } from 'react';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom'; // <-- Import useNavigate

// --- Asset Imports --- (Ensure these are correct)
import speakEdgeLogo from '../assets/speakedge_logo.jpeg';
import illustrationWoman from '../assets/illustration_woman.png';
import aiBubble from '../assets/ai_bubble.png';
import ieltsBubble from '../assets/ielts_bubble.jpeg';
import waves from '../assets/waves.png';
import mic from '../assets/mic.png';

// --- Icon Imports ---
import { FaRegEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { BsGrid3X3GapFill } from 'react-icons/bs';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // Keep if you use it locally, otherwise remove
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(''); // Optional: For displaying errors
  const [loading, setLoading] = useState(false); // Optional: For loading state

  const navigate = useNavigate(); // <-- Initialize useNavigate

  // --- UPDATED handleSubmit ---
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true); // Set loading state

    const loginCredentials = { email, password };

    try {
      const response = await fetch('http://localhost:5001/api/auth/login', { // Ensure port matches your backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginCredentials),
      });

      const data = await response.json(); // Always parse JSON

      if (!response.ok) {
        // Use error message from backend if available
        throw new Error(data.msg || `HTTP error! Status: ${response.status}`);
      }

      // Login successful!
      console.log('Login successful response:', data); // Contains the token

      // Store the token in localStorage
      localStorage.setItem('token', data.token);
      console.log('Token stored in localStorage');

      // --- Redirect to the dashboard or main app area ---
      // Replace '/dashboard' with your actual authenticated route
      alert('Login Successful!'); // Placeholder feedback
      navigate('/'); // Example: Navigate to dashboard


    } catch (err) {
      console.error('Login failed:', err);
      setError(err.message || 'An unexpected error occurred during login.'); // Show error message
      // alert(`Login failed: ${err.message}`); // Alternative: use alert
    } finally {
        setLoading(false); // Reset loading state
    }
  };
  // --- END OF UPDATED handleSubmit ---

  return (
    <div className="login-page">
      {/* Header */}
      <header className="login-header">
        <img src={speakEdgeLogo} alt="SpeakEdge Logo" className="logo" />
        <div className="header-icons">
          <span>?</span>
          <span>👤</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="login-container">
        {/* Illustration Section */}
        <div className="illustration-section">
          <div className="illustration-background">
            <img src={illustrationWoman} alt="Student illustration" className="illustration-main-image" />
            <img src={aiBubble} alt="AI" className="bubble ai-bubble" />
            <img src={ieltsBubble} alt="IELTS" className="bubble ielts-bubble" />
            <img src={waves} alt="Chat" className="bubble chat-bubble" />
            <img src={mic} alt="Mic" className="bubble mic-bubble" />
          </div>
        </div>

        {/* Login Form Section */}
        <div className="login-form-section">
           <div className="login-form-box">
             <BsGrid3X3GapFill className="grid-icon" />
             <h2>Welcome back 👋</h2>
             <p className="subtitle">Log in to your account</p>

             {/* Display Error Message */}
             {error && <p className="error-message">{error}</p>} {/* Optional error display */}

             <form onSubmit={handleSubmit}>
               {/* --- Input fields remain the same --- */}
               {/* Email Input */}
               <div className="input-group">
                 <FaRegEnvelope className="input-icon" />
                 <input type="email" placeholder="What is your e-mail?" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading}/>
               </div>
               {/* Password Input */}
               <div className="input-group">
                 <FaLock className="input-icon" />
                 <input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading}/>
                 <span onClick={() => !loading && setShowPassword(!showPassword)} className="password-toggle-icon">
                   {showPassword ? <FaEyeSlash /> : <FaEye />}
                 </span>
               </div>
               {/* Options */}
               <div className="options-group">
                 <label className="remember-me">
                   <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} disabled={loading}/>
                   Remember me
                 </label>
                 <a href="/forgot-password">Forgot password?</a>
               </div>
               {/* Button */}
               <button type="submit" className="continue-button" disabled={loading}>
                 {loading ? 'Logging in...' : 'Continue'} {/* Show loading text */}
               </button>
             </form>
             {/* Signup Link */}
             <p className="signup-link">
               Don't have an account? <Link to="/signup">Sign up</Link>
             </p>
           </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;