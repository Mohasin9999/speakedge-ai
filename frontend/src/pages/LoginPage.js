// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import speakEdgeLogo from '../assets/speakedge_logo.jpeg';
import illustrationWoman from '../assets/illustration_woman.png';
import aiBubble from '../assets/ai_bubble.png';
import ieltsBubble from '../assets/ielts_bubble.jpeg';
import waves from '../assets/waves.png';
import mic from '../assets/mic.png';

import { FaRegEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { BsGrid3X3GapFill } from 'react-icons/bs';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    const loginCredentials = { email, password };

    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginCredentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || `HTTP error! Status: ${response.status}`);
      }

      console.log('Login successful response:', data);

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user)); // Store user data for Header to pick up
      console.log('Token and user stored in localStorage');

      // Dispatch a custom event to notify Header about login (optional, but good for sync)
      window.dispatchEvent(new Event('storage'));

      navigate('/');

    } catch (err) {
      console.error('Login failed:', err);
      setError(err.message || 'An unexpected error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Main container with full height, light background, and Inter font
    <div className="min-h-screen bg-gray-50 font-inter flex flex-col antialiased dark:bg-gray-900 transition-colors duration-300">
      {/* Main Content Area */}
      <main className="flex flex-grow items-center justify-center py-10 px-4 md:px-8 lg:px-12 dark:bg-gray-900 transition-colors duration-300">
        {/* Illustration Section - Hidden on small screens, flex on medium and up */}
        <div className="hidden md:flex flex-1 justify-center items-center pr-8 lg:pr-16 max-w-2xl">
          <div className="relative w-96 h-96 bg-purple-50 rounded-2xl flex justify-center items-center shadow-lg transform rotate-3 scale-95 transition-all duration-300 ease-in-out hover:rotate-0 hover:scale-100 dark:bg-gray-800 dark:border dark:border-indigo-700">
            {/* Main Illustration Image */}
            <img src={illustrationWoman} alt="Student illustration" className="relative z-10 w-64 h-auto object-contain" />

            {/* Bubbles - No specific dark mode images, so they'll rely on contrast */}
            <img src={aiBubble} alt="AI" className="absolute top-8 left-8 w-16 h-auto rounded-md shadow-md transform -rotate-12 hover:scale-105 transition-transform" />
            <img src={ieltsBubble} alt="IELTS" className="absolute top-12 right-12 w-16 h-auto rounded-md shadow-md transform rotate-12 hover:scale-105 transition-transform" />
            <img src={waves} alt="Chat" className="absolute bottom-10 left-10 w-24 h-auto shadow-md hover:scale-105 transition-transform" />
            <img src={mic} alt="Mic" className="absolute bottom-8 right-8 w-24 h-auto shadow-md transform -rotate-6 hover:scale-105 transition-transform" />

            {/* Decorative dots/lines */}
            <div className="absolute -top-4 -left-4 w-6 h-6 bg-pink-300 rounded-full animate-bounce-slow dark:bg-pink-600" style={{animationDelay: '0.2s'}}></div>
            <div className="absolute top-1/4 right-0 w-4 h-4 bg-blue-300 rounded-full animate-bounce-slow dark:bg-blue-600" style={{animationDelay: '0.4s'}}></div>
            <div className="absolute bottom-0 left-1/3 w-5 h-5 bg-green-300 rounded-full animate-bounce-slow dark:bg-green-600" style={{animationDelay: '0.6s'}}></div>
          </div>
        </div>

        {/* Login Form Section */}
        <div className="w-full md:w-auto flex-1 max-w-md">
          <div className="relative bg-white p-8 md:p-10 rounded-xl border border-indigo-200 shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl dark:bg-gray-800 dark:border-indigo-700">
            {/* Grid Icon - Top-left decorative element */}
            <BsGrid3X3GapFill className="absolute top-4 left-4 text-gray-300 text-2xl dark:text-gray-600" />

            <h2 className="text-3xl font-extrabold text-gray-900 mb-2 mt-4 md:mt-0 flex items-center justify-center md:justify-start dark:text-gray-100">
              Welcome back <span className="ml-2">👋</span>
            </h2>
            <p className="text-gray-600 mb-8 text-center md:text-left dark:text-gray-300">Log in to your account</p>

            {/* Display Error Message */}
            {error && (
              <p className="bg-red-100 text-red-700 border border-red-300 p-3 rounded-lg text-sm text-center mb-6 animate-fade-in dark:bg-red-900 dark:text-red-200 dark:border-red-700">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="relative">
                <FaRegEnvelope className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="email"
                  placeholder="What is your e-mail?"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 placeholder-gray-500 text-gray-800 disabled:opacity-70 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-indigo-500"
                />
              </div>
              {/* Password Input */}
              <div className="relative">
                <FaLock className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 placeholder-gray-500 text-gray-800 disabled:opacity-70 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-indigo-500"
                />
                <span
                  onClick={() => !loading && setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors duration-200 dark:text-gray-500 dark:hover:text-gray-300"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {/* Options */}
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center text-gray-600 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={loading}
                    className="mr-2 text-indigo-600 focus:ring-indigo-500 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-indigo-600 dark:checked:border-transparent"
                  />
                  Remember me
                </label>
                <Link to="/forgot-password" className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-200 dark:text-indigo-400 dark:hover:text-indigo-500">
                  Forgot password?
                </Link>
              </div>
              {/* Button */}
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </>
                ) : (
                  'Continue'
                )}
              </button>
            </form>
            {/* Signup Link */}
            <p className="text-center text-gray-600 text-sm mt-8 dark:text-gray-300">
              Don't have an account? <Link to="/signup" className="text-indigo-600 font-bold hover:text-indigo-800 hover:underline transition-colors duration-200 dark:text-indigo-400 dark:hover:text-indigo-500">Sign up</Link> {/* <-- FIXED: Missing closing quote on 'Sign up' link's className */}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
