// src/App.js

import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

// Page components
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import SpeakPage from './pages/SpeakPage';
import RadarChartPage from './pages/RadarChartPage';
import PricingPage from './pages/PricingPage';
import FeedbackPage from './pages/FeedbackPage';


// Optional shared components
// import Header from './components/Header';

function App() {
  return (
    <div className="App">
      {/* Optional global header */}
      {/* <Header /> */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/speak" element={<SpeakPage />} />
        <Route path="/status" element={<RadarChartPage />} />
        <Route path="/pricing" element={<PricingPage />} />
       

        {/* Feedback route - use static or dynamic as needed */}
        <Route path="/feedback" element={<FeedbackPage />} />
        {/* OR: If you want to handle feedback per recording, use the line below instead */}
        {/* <Route path="/feedback/:id" element={<FeedbackPage />} /> */}

        {/* Fallback route for undefined URLs */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;