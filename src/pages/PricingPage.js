// src/pages/PricingPage.js
import React from 'react';
import './PricingPage.css'; // Import the CSS

// Import Header Component
import Header from '../components/header'; // Adjust path if needed

// Keep the SVG component inline or define it separately
const CheckIcon = () => (
  <svg className="feature-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
  </svg>
);

const PricingPage = () => {
  return (
    <div className="pricing-page-wrapper"> {/* Optional wrapper */}
      <Header /> {/* Add Header */}
      <div className="pricing-page"> {/* Apply page background and padding */}
        <div className="page-header">
          <h2 className="page-title">Our Pricing Plans</h2>
          <p className="page-subtitle">Choose a plan that suits your needs. Start your journey today!</p>
        </div>

        {/* Pricing Cards Section */}
        <div className="pricing-cards-container">

          {/* Basic Plan */}
          <div className="pricing-card">
            {/* Add 'basic' class for specific styling */}
            <div className="card-header basic">
              <h3 className="card-plan-name">Basic Plan</h3>
              <p className="card-price">$19/month</p>
              <p className="card-description">Ideal for individuals who are just getting started.</p>
            </div>
            <div className="card-body">
              <ul className="features-list">
                <li className="feature-item">
                  <CheckIcon /> 1 AI Interaction per day
                </li>
                <li className="feature-item">
                  <CheckIcon /> Access to basic tutorials
                </li>
                <li className="feature-item">
                  <CheckIcon /> Email support
                </li>
              </ul>
              <button className="choose-plan-button basic">
                Choose Plan
              </button>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="pricing-card">
             {/* Add 'pro' class for specific styling */}
            <div className="card-header pro">
              <h3 className="card-plan-name">Pro Plan</h3>
              <p className="card-price">$49/month</p>
              <p className="card-description">Perfect for professionals who need more advanced features.</p>
            </div>
            <div className="card-body">
              <ul className="features-list">
                <li className="feature-item">
                  <CheckIcon /> 5 AI Interactions per day
                </li>
                <li className="feature-item">
                  <CheckIcon /> Access to premium tutorials
                </li>
                <li className="feature-item">
                  <CheckIcon /> Priority email support
                </li>
                <li className="feature-item">
                   <CheckIcon /> Access to community features
                </li>
              </ul>
              <button className="choose-plan-button pro">
                Choose Plan
              </button>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="pricing-card">
             {/* Add 'enterprise' class for specific styling */}
            <div className="card-header enterprise">
              <h3 className="card-plan-name">Enterprise Plan</h3>
              <p className="card-price">$99/month</p>
              <p className="card-description">For teams and organizations looking for premium features.</p>
            </div>
            <div className="card-body">
              <ul className="features-list">
                <li className="feature-item">
                  <CheckIcon /> Unlimited AI Interactions
                </li>
                <li className="feature-item">
                  <CheckIcon /> Premium and advanced tutorials
                </li>
                <li className="feature-item">
                  <CheckIcon /> 24/7 premium support
                </li>
                <li className="feature-item">
                   <CheckIcon /> Team collaboration features
                </li>
              </ul>
              <button className="choose-plan-button enterprise">
                Choose Plan
              </button>
            </div>
          </div>

        </div> {/* End pricing-cards-container */}
      </div> {/* End pricing-page */}
    </div> // End wrapper
  );
};

export default PricingPage;