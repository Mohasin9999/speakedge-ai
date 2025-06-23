// src/pages/NotFoundPage.js
import React from 'react';
import { Link } from 'react-router-dom';

import { FaQuestionCircle } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    // Main container: full height, centered content, light background, consistent font
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center justify-center text-center px-4 py-16 font-inter overflow-hidden dark:from-gray-900 dark:to-gray-950 transition-colors duration-300"> {/* Background theme */}
      
      {/* Animated Icon / Visual Element */}
      <div className="relative mb-8">
        <FaQuestionCircle className="text-indigo-400 text-9xl md:text-[10rem] animate-float transition-all duration-500 ease-in-out dark:text-indigo-600" /> {/* Icon color theme */}
        {/* Subtle glow/shadow effect */}
        <div className="absolute inset-0 bg-indigo-300 opacity-20 rounded-full blur-xl animate-pulse-slow z-[-1] dark:bg-indigo-700"></div> {/* Glow color theme */}
      </div>

      {/* Main Title */}
      <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 mb-4 font-dancing animate-fade-in-up dark:text-gray-100"> {/* Title theme */}
        404
      </h1>

      {/* Page Message */}
      <p className="text-xl md:text-2xl text-gray-700 mb-6 max-w-lg mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        Oops! It looks like you've wandered off the path. The page you're looking for doesn't exist.
      </p>

      {/* Call to Action Button */}
      <Link
        to="/"
        className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-75"
        style={{ animationDelay: '0.4s' }}
      >
        <span className="mr-2">🚀</span> Go Back Home
      </Link>

      {/* Optional: Add some subtle background shapes or patterns */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob dark:bg-purple-700" style={{animationDelay: '0.2s'}}></div> {/* Blob theme */}
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000 dark:bg-indigo-700"></div> {/* Blob theme */}
      <div className="absolute top-1/2 right-1/2 w-24 h-24 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000 dark:bg-pink-700"></div> {/* Blob theme */}

    </div>
  );
};

export default NotFoundPage;
