// src/pages/HomePage.js
import React, { useState, useEffect } from 'react'; // <-- Import useState and useEffect
import { Link } from 'react-router-dom';
import './HomePage.css'; // Styles for the page content

// --- Import the Header component ---
// Ensure the path and casing are correct for your project structure
import Header from '../components/header';

// --- Asset Imports ---
import heroBg from '../assets/background.png';
import feature1Img from '../assets/feature1.jpg';
import feature2Img from '../assets/feature2.jpg';
import feature3Img from '../assets/feature3.jpg';
import step1Img from '../assets/step1.jpg';
import step2Img from '../assets/step2.jpg';
import step3Img from '../assets/step4.jpg';
import user1Avatar from '../assets/user1.jpeg';
import user2Avatar from '../assets/user2.jpeg';
import user3Avatar from '../assets/user3.jpeg';

// Helper component for rendering stars
const StarRating = ({ rating }) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="review-rating">
        {[...Array(fullStars)].map((_, i) => (
          <svg key={`full-${i}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="var(--hp-star-color, #FFD700)" d="M3.612 15.442c-.393.23-.836-.142-.707-.579l1.105-3.414L1.236 7.363c-.304-.449.129-.977.582-.977h3.401l1.067-3.348c.195-.618.911-.618 1.106 0l1.067 3.348h3.401c.453 0 .886.528.582.977l-3.774 4.086 1.105 3.414c.129.437-.314.809-.707.579L8 12.27l-3.652 3.173c-.156.134-.357.211-.548.211-.191 0-.392-.077-.548-.211L3.612 15.442z"/></svg>
        ))}
        {halfStar && (
           <svg key="half" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="half-star">
              <defs>
                  <linearGradient id="halfGradient">
                  <stop offset="50%" stopColor="var(--hp-star-color, #FFD700)" />
                  <stop offset="50%" stopColor="#ccc" stopOpacity="1" />
                  </linearGradient>
              </defs>
              <path fill="url(#halfGradient)" d="M3.612 15.442c-.393.23-.836-.142-.707-.579l1.105-3.414L1.236 7.363c-.304-.449.129-.977.582-.977h3.401l1.067-3.348c.195-.618.911-.618 1.106 0l1.067 3.348h3.401c.453 0 .886.528.582.977l-3.774 4.086 1.105 3.414c.129.437-.314.809-.707.579L8 12.27l-3.652 3.173c-.156.134-.357.211-.548.211-.191 0-.392-.077-.548-.211L3.612 15.442z"/>
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg key={`empty-${i}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="empty-star"><path fill="#ccc" d="M3.612 15.442c-.393.23-.836-.142-.707-.579l1.105-3.414L1.236 7.363c-.304-.449.129-.977.582-.977h3.401l1.067-3.348c.195-.618.911-.618 1.106 0l1.067 3.348h3.401c.453 0 .886.528.582.977l-3.774 4.086 1.105 3.414c.129.437-.314.809-.707.579L8 12.27l-3.652 3.173c-.156.134-.357.211-.548.211-.191 0-.392-.077-.548-.211L3.612 15.442zM8 1.377l-1.42 4.355H2.24l3.63 2.644L4.76 13.11l3.24-2.35 3.24 2.35-1.11-4.732 3.63-2.644H9.42L8 1.377z"/></svg>
        ))}
      </div>
    );
};

const HomePage = () => {
  // --- MODIFICATION: Add state to track login status ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // --- MODIFICATION: Check login status on component mount ---
  useEffect(() => {
    // Check for the presence of the token (or user object) in localStorage
    // Adjust the key 'token' if you store it under a different name
    const token = localStorage.getItem('token');
    if (token) {
      // Basic check: If token exists, assume user is logged in for this button's purpose.
      // A more robust check might involve validating the token.
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className="home-page">
      <Header />

      <main>
        {/* Section 1: Hero Section */}
        <section
          className="hero-section"
          style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1 className="hero-title">Welcome to SpeakEdge</h1>
            <p className="hero-subtitle">Improve your English with personalized AI-driven conversations. Practice speaking anytime, anywhere.</p>
            {/* --- MODIFICATION: Conditional Link --- */}
            <Link
              to={isLoggedIn ? '/speak' : '/login'} // Navigate to /speak if logged in, otherwise /login
              className="hero-cta-button"
            >
              Get Started for Free
            </Link>
            {/* --- END OF MODIFICATION --- */}
          </div>
        </section>

        {/* Section 2: Features */}
        <section className="features-section home-section">
           <div className="home-container">
            <h2 className="section-title">Why Choose SpeakEdge?</h2>
            <p className="section-subtitle">Unlock your potential with cutting-edge features designed for fluency.</p>
            <div className="features-grid">
              {/* Feature Cards */}
              <div className="feature-card">
                <div className="feature-icon"> <img src={feature1Img} alt="AI Conversations" /> </div>
                <h3 className="feature-title">AI Conversations</h3>
                <p className="feature-description">Engage in real-time, natural conversations with our advanced AI tutor.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"> <img src={feature2Img} alt="Personalized Feedback" /> </div>
                <h3 className="feature-title">Instant Feedback</h3>
                <p className="feature-description">Receive personalized feedback on pronunciation, grammar, and fluency.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"> <img src={feature3Img} alt="Progress Tracking" /> </div>
                <h3 className="feature-title">Progress Tracking</h3>
                <p className="feature-description">Monitor your improvement over time with detailed analytics and reports.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Tutorial */}
        <section className="tutorial-section home-section">
           <div className="home-container">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Start improving your English speaking skills in just three simple steps.</p>
            <div className="tutorial-steps">
               {/* Tutorial Steps */}
               <div className="tutorial-step">
                <div className="tutorial-icon"> <img src={step1Img} alt="Step 1: Sign Up" /> </div>
                <h3 className="tutorial-step-title">Step 1: Sign Up</h3>
                <p className="tutorial-step-description">Create your free account in minutes to access all features.</p>
               </div>
               <div className="tutorial-step">
                <div className="tutorial-icon"> <img src={step2Img} alt="Step 2: Speak" /> </div>
                <h3 className="tutorial-step-title">Step 2: Practice</h3>
                <p className="tutorial-step-description">Start a conversation with our AI on various topics and scenarios.</p>
               </div>
               <div className="tutorial-step">
                <div className="tutorial-icon"> <img src={step3Img} alt="Step 3: Improve" /> </div>
                <h3 className="tutorial-step-title">Step 3: Improve</h3>
                <p className="tutorial-step-description">Review feedback, track your progress, and watch your fluency grow.</p>
               </div>
            </div>
           </div>
        </section>

        {/* Section 4: User Reviews */}
        <section className="reviews-section home-section">
           <div className="home-container">
            <h2 className="section-title">What Our Users Say</h2>
            <p className="section-subtitle">Hear from learners who have transformed their English skills with SpeakEdge.</p>
            <div className="reviews-grid">
              {/* Review Cards */}
              <div className="review-card">
                <div className="review-avatar"> <img src={user1Avatar} alt="User John Doe" /> </div>
                <p className="review-text">"SpeakEdge is fantastic! The AI feels like talking to a real person, and the feedback helped me fix mistakes I didn't even know I was making."</p>
                <p className="review-author">John D.</p>
                <StarRating rating={5} />
              </div>
              <div className="review-card">
                <div className="review-avatar"> <img src={user2Avatar} alt="User Jane Smith" /> </div>
                <p className="review-text">"I needed to practice for my IELTS speaking test, and this app was a lifesaver. It's convenient and really boosted my confidence."</p>
                <p className="review-author">Priya S.</p>
                 <StarRating rating={5} />
              </div>
              <div className="review-card">
                <div className="review-avatar"> <img src={user3Avatar} alt="User Mark Johnson" /> </div>
                <p className="review-text">"A great tool for intermediate learners like me. The progress tracking keeps me motivated. Highly recommend!"</p>
                <p className="review-author">Carlos M.</p>
                <StarRating rating={4.5} />
              </div>
            </div>
           </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="home-footer">
           <div className="footer-content">
              <div className="footer-links">
                  <Link to="/about">About Us</Link>
                  <Link to="/features">Features</Link>
                  <Link to="/pricing">Pricing</Link>
                  <Link to="/contact">Contact</Link>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                  <Link to="/terms">Terms of Service</Link>
              </div>
              <p className="footer-copyright">
                  © {new Date().getFullYear()} SpeakEdge. All rights reserved.
              </p>
          </div>
      </footer>
    </div>
  );
};

export default HomePage;