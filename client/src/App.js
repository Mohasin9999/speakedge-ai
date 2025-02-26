import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home"; 
import Header from "./components/Header";
import Footer from "./components/Footer"; 
import Login from "./pages/Login"; 
import SignUp from "./pages/SignUp";
import PricingPage from "./pages/PricingPage";
import AboutUsPage from './pages/AboutUsPage';

function App() {
  const userPhoto = null; // Placeholder, replace with real user photo URL if logged in

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Header with user photo */}
        <Header userPhoto={userPhoto} />
        
        {/* Main Content with Routes */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/SignUP" element={<SignUp />} />
            <Route path="/PricingPage" element={<PricingPage />} />
            <Route path="/AboutUsPage" element={<AboutUsPage />} />
          </Routes>
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
