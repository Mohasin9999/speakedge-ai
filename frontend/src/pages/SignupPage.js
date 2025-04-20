// src/pages/SignupPage.js
import React, { useState } from 'react';
import './SignupPage.css'; // Corrected CSS import path/name
// --- MODIFICATION: Add Link to import ---
import { useNavigate, Link } from 'react-router-dom';

// --- Asset Imports --- (Ensure these are correct)
import speakEdgeLogo from '../assets/speakedge_logo.jpeg';
import illustrationWoman from '../assets/illustration_woman.png';
import aiBubble from '../assets/ai_bubble.png';
import ieltsBubble from '../assets/ielts_bubble.jpeg';
import waves from '../assets/waves.png';
import mic from '../assets/mic.png';
import googleLogo from '../assets/google_logo.png';
import facebookLogo from '../assets/facebook_logo.jpg';

// --- Icon Imports ---
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!agreeTerms) {
      setError('Please agree to the terms and privacy policy.');
      return;
    }
    setLoading(true);

    const newUser = { name, email, password };

    try {
      const response = await fetch('http://localhost:5001/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || `HTTP error! Status: ${response.status}`);
      }

      console.log('Signup successful response:', data);
      alert('Signup successful! Please log in.');
      navigate('/login');

    } catch (err) {
      console.error('Signup failed:', err);
      setError(err.message || 'An unexpected error occurred during signup.');
    } finally {
       setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <header className="signup-header">
        <img src={speakEdgeLogo} alt="SpeakEdge Logo" className="logo" />
        <div className="header-icons">
          <span>?</span>
          <span>👤</span>
        </div>
      </header>

      <main className="signup-container">
        <div className="illustration-section">
          <div className="illustration-background">
            <img src={illustrationWoman} alt="Student illustration" className="illustration-main-image" />
            <img src={aiBubble} alt="AI" className="bubble ai-bubble" />
            <img src={ieltsBubble} alt="IELTS" className="bubble ielts-bubble" />
            <img src={waves} alt="Chat" className="bubble chat-bubble" />
            <img src={mic} alt="Mic" className="bubble mic-bubble" />
          </div>
        </div>

        <div className="signup-form-section">
           <div className="signup-form-box">
             <h2>Sign up</h2>

             {error && <p className="error-message">{error}</p>}

             <div className="social-signup">
                <button type="button" className="social-button google-button">
                  <img src={googleLogo} alt="Google logo" /> Google
                </button>
                <button type="button" className="social-button facebook-button">
                   <img src={facebookLogo} alt="Facebook logo" /> Facebook
                </button>
             </div>

             <div className="divider">
                <span className="divider-line"></span>
                <span className="divider-text">or</span>
                <span className="divider-line"></span>
             </div>

             <form onSubmit={handleSubmit}>
               <div className="form-group">
                 <label htmlFor="name">Name</label>
                 <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required disabled={loading} />
               </div>
               <div className="form-group">
                 <label htmlFor="email">Email</label>
                 <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
               </div>
               <div className="form-group">
                 <label htmlFor="password">Password</label>
                 <div className="password-input-wrapper">
                   <input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading}/>
                   <span onClick={() => !loading && setShowPassword(!showPassword)} className="password-toggle-icon">
                     {showPassword ? <FaEyeSlash /> : <FaEye />}
                   </span>
                 </div>
               </div>
               <div className="agreement-group">
                 <input type="checkbox" id="terms" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} required disabled={loading}/>
                 <label htmlFor="terms"> I agree with SmallTalk2Me <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">privacy policy</a> and <a href="/terms" target="_blank" rel="noopener noreferrer">terms</a></label>
               </div>
               <button type="submit" className="submit-button" disabled={!agreeTerms || loading}>
                 {loading ? 'Creating Account...' : 'Create Account'}
               </button>
             </form>

             {/* --- MODIFICATION: Added Login Link --- */}
             <p className="login-link">
               Already have an account? <Link to="/login">Log in</Link>
             </p>
             {/* --- END OF MODIFICATION --- */}

           </div>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;