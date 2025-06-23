// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import the ThemeProvider
import { ThemeProvider } from './context/ThemeContext';

// Page components
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import SpeakPage from './pages/SpeakPage';
import RadarChartPage from './pages/RadarChartPage';
import PricingPage from './pages/PricingPage';
import FeedbackPage from './pages/FeedbackPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import AboutUsPage from './pages/AboutUsPage';
import FAQsPage from './pages/FAQsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';

// Shared components
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  return (
    // Wrap your entire app content with ThemeProvider
    <ThemeProvider>
      {/* Corrected: Removed the extra `</div>>` from line 57 */}
      <div className="min-h-screen flex flex-col font-inter bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Global Header - Fixed at the top */}
        <Header />

        {/* Main content area. flex-grow pushes the footer to the bottom. */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/speak" element={<SpeakPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/faqs" element={<FAQsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/status" element={<RadarChartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
