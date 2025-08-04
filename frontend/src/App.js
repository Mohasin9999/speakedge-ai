import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';

// Page components (Public/Unauthenticated)
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import AboutUsPage from './pages/AboutUsPage';
import FAQsPage from './pages/FAQsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';



// Dashboard components
import DashboardLayout from './layouts/DashboardLayout';
import DashboardOverviewPage from './dashboard/DashboardOverviewPage';
import MyRecordingsPage from './dashboard/MyRecordingsPage';
import SettingsPage from './dashboard/SettingsPage';
import DashboardFeedbackPage from './dashboard/FeedbackPage'; 
import ChatPage from './dashboard/ChatPage';
import SpeakPage from './dashboard/SpeakPage';
import AchievementsPage from './dashboard/AchievementsPage';
// Global components
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <ThemeProvider>
      {/* The root div uses flex-col to enable the sticky footer layout */}
      <div className="min-h-screen flex flex-col font-inter bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        
        {!isDashboardRoute && <Header />}

        {/* MODIFIED: Removed the conditional 'pb-20' class that was causing the gap. */}
        <main className="flex-grow">
          <Routes>
            {/* Public/Unauthenticated Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/faqs" element={<FAQsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />


            {/* Authenticated Dashboard Routes (Nested) */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardOverviewPage />} /> 
              <Route path="overview" element={<DashboardOverviewPage />} />
              <Route path="recordings" element={<MyRecordingsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="speak" element={<SpeakPage />} /> 
              <Route path="chat" element={<ChatPage />} />
              <Route path="feedback/:id" element={<DashboardFeedbackPage />} />
              <Route path="achivements" element={<AchievementsPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {!isDashboardRoute && <Footer />}
      </div>
    </ThemeProvider>
  );
}

export default App;
