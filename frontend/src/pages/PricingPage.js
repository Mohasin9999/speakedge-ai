// src/pages/PricingPage.js
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const CheckIcon = ({ colorClass = "text-indigo-600", darkColorClass = "dark:text-indigo-400" }) => (
  <FaCheckCircle className={`w-5 h-5 mr-2 flex-shrink-0 ${colorClass} ${darkColorClass}`} />
);

const PricingPage = () => {
  return (
    // Removed min-h-[calc(100vh-80px)] and added py-20 for consistent top/bottom padding
    <div className="bg-gray-50 font-inter py-20 dark:bg-gray-900 transition-colors duration-300"> {/* <--- MODIFIED HERE */}
      {/* Hero Section for Pricing Page - Modern gradient and title */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-16 px-4 md:px-8 text-center rounded-b-3xl shadow-lg mb-16 dark:from-purple-900 dark:to-indigo-900">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 font-dancing tracking-tight animate-fade-in-up">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg sm:text-xl text-indigo-100 max-w-xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Choose a plan that fits your learning journey. Start mastering English today!
          </p>
        </div>
      </section>

      {/* Pricing Cards Section - Responsive grid layout */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Basic Plan Card */}
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl">
            <div className="bg-indigo-500 text-white p-8 text-center rounded-t-xl dark:bg-indigo-700">
              <h3 className="text-3xl font-extrabold mb-2">Basic Plan</h3>
              <p className="text-xl font-bold mb-4">
                <span className="text-5xl md:text-6xl font-bold">$19</span>/month
              </p>
              <p className="text-indigo-100 text-sm">Ideal for individuals just getting started.</p>
            </div>
            <div className="p-8">
              <ul className="space-y-4 text-gray-700 mb-8 dark:text-gray-200">
                <li className="flex items-center text-lg">
                  <CheckIcon /> 1 AI Interaction per day
                </li>
                <li className="flex items-center text-lg">
                  <CheckIcon /> Access to basic tutorials
                </li>
                <li className="flex items-center text-lg">
                  <CheckIcon /> Email support
                </li>
                <li className="flex items-center text-lg opacity-60 line-through dark:text-gray-400">
                  <FaCheckCircle className="w-5 h-5 mr-2 flex-shrink-0 text-gray-400 dark:text-gray-500" /> Community features
                </li>
                <li className="flex items-center text-lg opacity-60 line-through dark:text-gray-400">
                  <FaCheckCircle className="w-5 h-5 mr-2 flex-shrink-0 text-gray-400 dark:text-gray-500" /> Priority support
                </li>
              </ul>
              <button className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 text-lg">
                Choose Basic
              </button>
            </div>
          </div>

          {/* Pro Plan - Highlighted and more prominent */}
          <div className="bg-white rounded-xl shadow-2xl border-4 border-indigo-500 overflow-hidden transform scale-[1.03] transition-all duration-300 hover:scale-[1.05] hover:shadow-3xl z-10 dark:bg-gray-800 dark:border-indigo-600 dark:shadow-2xl">
            <div className="bg-indigo-600 text-white p-8 text-center rounded-t-xl relative dark:bg-indigo-800">
              <span className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg dark:bg-yellow-500 dark:text-yellow-950">Popular</span>
              <h3 className="text-3xl font-extrabold mb-2">Pro Plan</h3>
              <p className="text-xl font-bold mb-4">
                <span className="text-5xl md:text-6xl font-bold">$49</span>/month
              </p>
              <p className="text-indigo-100 text-sm">Perfect for professionals who need more advanced features.</p>
            </div>
            <div className="p-8">
              <ul className="space-y-4 text-gray-700 mb-8 dark:text-gray-200">
                <li className="flex items-center text-lg">
                  <CheckIcon /> 5 AI Interactions per day
                </li>
                <li className="flex items-center text-lg">
                  <CheckIcon /> Access to premium tutorials
                </li>
                <li className="flex items-center text-lg">
                  <CheckIcon /> Priority email support
                </li>
                <li className="flex items-center text-lg">
                  <CheckIcon /> Community features
                </li>
                <li className="flex items-center text-lg opacity-60 line-through dark:text-gray-400">
                  <FaCheckCircle className="w-5 h-5 mr-2 flex-shrink-0 text-gray-400 dark:text-gray-500" /> Dedicated account manager
                </li>
              </ul>
              <button className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 text-lg">
                Choose Pro
              </button>
            </div>
          </div>

          {/* Enterprise Plan Card */}
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl">
            <div className="bg-indigo-500 text-white p-8 text-center rounded-t-xl dark:bg-indigo-700">
              <h3 className="text-3xl font-extrabold mb-2">Enterprise Plan</h3>
              <p className="text-xl font-bold mb-4">
                <span className="text-5xl md:text-6xl font-bold">$99</span>/month
              </p>
              <p className="text-indigo-100 text-sm">For teams and organizations looking for premium features.</p>
            </div>
            <div className="p-8">
              <ul className="space-y-4 text-gray-700 mb-8 dark:text-gray-200">
                <li className="flex items-center text-lg">
                  <CheckIcon /> Unlimited AI Interactions
                </li>
                <li className="flex items-center text-lg">
                  <CheckIcon /> Premium and advanced tutorials
                </li>
                <li className="flex items-center text-lg">
                  <CheckIcon /> 24/7 premium support
                </li>
                <li className="flex items-center text-lg">
                  <CheckIcon /> Team collaboration features
                </li>
                <li className="flex items-center text-lg">
                  <CheckIcon /> Dedicated account manager
                </li>
              </ul>
              <button className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 text-lg">
                Choose Enterprise
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PricingPage;