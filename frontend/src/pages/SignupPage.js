// src/pages/SignupPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import speakEdgeLogo from '../assets/speakedge_logo.jpeg';
import illustrationWoman from '../assets/illustration_woman.png';
import aiBubble from '../assets/ai_bubble.png';
import ieltsBubble from '../assets/ielts_bubble.jpeg';
import waves from '../assets/waves.png';
import mic from '../assets/mic.png';
import googleLogo from '../assets/google_logo.png';
import facebookLogo from '../assets/facebook_logo.jpg';

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
      alert('Signup successful! Please log in.'); // Temporary feedback
      navigate('/login');

    } catch (err) {
      console.error('Signup failed:', err);
      setError(err.message || 'An unexpected error occurred during signup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Main container with full height, light background, and Inter font
    <div className="min-h-screen bg-gray-50 font-inter flex flex-col antialiased dark:bg-gray-900 transition-colors duration-300">
      {/* Header - Already themed by global App.js ThemeProvider */}

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
            <div className="absolute -top-4 -left-4 w-6 h-6 bg-pink-300 rounded-full animate-bounce-slow dark:bg-pink-600" style={{ animationDelay: '0.2s' }}></div>
            <div className="absolute top-1/4 right-0 w-4 h-4 bg-blue-300 rounded-full animate-bounce-slow dark:bg-blue-600" style={{ animationDelay: '0.4s' }}></div>
            <div className="absolute bottom-0 left-1/3 w-5 h-5 bg-green-300 rounded-full animate-bounce-slow dark:bg-green-600" style={{ animationDelay: '0.6s' }}></div>
          </div>
        </div>

        {/* Signup Form Section */}
        <div className="w-full md:w-auto flex-1 max-w-md">
          <div className="relative bg-white p-8 md:p-10 rounded-xl border border-indigo-200 shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl dark:bg-gray-800 dark:border-indigo-700">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center dark:text-gray-100">Sign up</h2>

            {/* Display Error Message */}
            {error && (
              <p className="bg-red-100 text-red-700 border border-red-300 p-3 rounded-lg text-sm text-center mb-6 animate-fade-in dark:bg-red-900 dark:text-red-200 dark:border-red-700">
                {error}
              </p>
            )}

            {/* Social Signup Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 font-semibold shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-indigo-500"
                disabled={loading}
              >
                <img src={googleLogo} alt="Google logo" className="w-5 h-5 object-contain" /> Google
              </button>
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 font-semibold shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-indigo-500"
                disabled={loading}
              >
                <img src={facebookLogo} alt="Facebook logo" className="w-5 h-5 object-contain" /> Facebook
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center text-gray-400 text-sm my-6 dark:text-gray-500">
              <span className="flex-grow border-b border-gray-200 dark:border-gray-700"></span>
              <span className="px-4">or</span>
              <span className="flex-grow border-b border-gray-200 dark:border-gray-700"></span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div className="form-group">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-200">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 placeholder-gray-500 text-gray-800 disabled:opacity-70 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-indigo-500"
                />
              </div>
              {/* Email Input */}
              <div className="form-group">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-200">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 placeholder-gray-500 text-gray-800 disabled:opacity-70 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-indigo-500"
                />
              </div>
              {/* Password Input */}
              <div className="form-group">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-200">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 placeholder-gray-500 text-gray-800 disabled:opacity-70 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-indigo-500"
                  />
                  <span
                    onClick={() => !loading && setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors duration-200 dark:text-gray-500 dark:hover:text-gray-300"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              {/* Agreement Group */}
              <div className="flex items-start text-sm text-gray-600 mt-2 mb-6 dark:text-gray-300">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  required
                  disabled={loading}
                  className="mt-1 mr-3 text-indigo-600 focus:ring-indigo-500 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-indigo-600 dark:checked:border-transparent"
                />
                <label htmlFor="terms" className="leading-relaxed">
                  I agree with SpeakEdge{' '}
                  <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-medium dark:text-indigo-400 dark:hover:text-indigo-500">
                    privacy policy
                  </Link>{' '}
                  and{' '}
                  <Link to="/terms" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-medium dark:text-indigo-400 dark:hover:text-indigo-500">
                    terms
                  </Link>
                </label>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={!agreeTerms || loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center text-gray-600 text-sm mt-8 dark:text-gray-300">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-600 font-bold hover:text-indigo-800 hover:underline transition-colors duration-200 dark:text-indigo-400 dark:hover:text-indigo-500">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
