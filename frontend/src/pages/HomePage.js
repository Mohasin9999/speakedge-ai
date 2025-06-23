// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Re-Import Original Asset Images
import heroBg from '../assets/background.png';
import user1Avatar from '../assets/user1.jpeg';
import user2Avatar from '../assets/user2.jpeg';
import user3Avatar from '../assets/user3.jpeg';

// Import react-icons (Only the ones actively used in this component)
import { FaRobot, FaMicrophoneAlt, FaChartLine, FaAward } from 'react-icons/fa';
import { MdOutlineFeedback } from 'react-icons/md';
import { BsPersonFillAdd } from 'react-icons/bs';


// Helper component for rendering stars with Tailwind CSS
const StarRating = ({ rating, idSuffix }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  const gradientId = `halfGradient-${idSuffix || Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className="flex gap-0.5 md:gap-1 text-yellow-400">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${idSuffix}-${i}`} className="w-4 h-4 md:w-5 md:h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path d="M3.612 15.442c-.393.23-.836-.142-.707-.579l1.105-3.414L1.236 7.363c-.304-.449.129-.977.582-.977h3.401l1.067-3.348c.195-.618.911-.618 1.106 0l1.067 3.348h3.401c.453 0 .886.528.582.977l-3.774 4.086 1.105 3.414c.129.437-.314.809-.707.579L8 12.27l-3.652 3.173c-.156.134-.357.211-.548.211-.191 0-.392-.077-.548-.211L3.612 15.442z" />
        </svg>
      ))}
      {halfStar && (
        <svg key={`half-${idSuffix}`} className="w-4 h-4 md:w-5 md:h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <defs>
            <linearGradient id={gradientId}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#d1d5db" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path fill={`url(#${gradientId})`} d="M3.612 15.442c-.393.23-.836-.142-.707-.579l1.105-3.414L1.236 7.363c-.304-.449.129-.977.582-.977h3.401l1.067-3.348c.195-.618.911-.618 1.106 0l1.067 3.348h3.401c.453 0 .886.528.582.977l-3.774 4.086 1.105 3.414c.129.437-.314.809-.707.579L8 12.27l-3.652 3.173c-.156.134-.357.211-.548.211-.191 0-.392-.077-.548-.211L3.612 15.442z" />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={`empty-${idSuffix}-${i}`} className="w-4 h-4 md:w-5 md:h-5 fill-current text-gray-300 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"> {/* Empty star in dark mode */}
          <path d="M3.612 15.442c-.393.23-.836-.142-.707-.579l1.105-3.414L1.236 7.363c-.304-.449.129-.977.582-.977h3.401l1.067-3.348c.195-.618.911-.618 1.106 0l1.067 3.348h3.401c.453 0 .886.528.582.977l-3.774 4.086 1.105 3.414c.129.437-.314.809-.707.579L8 12.27l-3.652 3.173c-.156.134-.357.211-.548.211-.191 0-.392-.077-.548-.211L3.612 15.442zM8 1.377l-1.42 4.355H2.24l3.63 2.644L4.76 13.11l3.24-2.35 3.24 2.35-1.11-4.732 3.63-2.644H9.42L8 1.377z" />
        </svg>
      ))}
    </div>
  );
};


const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    // Base page container. App.js handles global min-h-screen and font.
    <div>
      {/* Section 1: Hero Section */}
      <section
        className="relative h-[calc(100vh-80px)] flex items-center justify-center text-center text-white px-4 md:px-8 py-20 overflow-hidden"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10 dark:bg-black dark:bg-opacity-70"></div> {/* Darker overlay in dark mode */}
        <div className="relative z-20 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight tracking-tight text-shadow-lg animate-fade-in-up">
            Welcome to <span className="text-indigo-300 font-dancing dark:text-indigo-200">SpeakEdge</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-gray-200 text-shadow-md animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Improve your English with personalized AI-driven conversations. Practice speaking anytime, anywhere.
          </p>
          <Link
            to={isLoggedIn ? '/speak' : '/login'}
            className="inline-block px-10 py-4 bg-indigo-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-75"
            style={{ animationDelay: '0.6s' }}
          >
            Get Started for Free
          </Link>
        </div>
      </section>

      {/* Section 2: Core Features */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900"> {/* Section background */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 text-center font-dancing dark:text-gray-100">Why Choose SpeakEdge?</h2> {/* Title color */}
          <p className="text-base sm:text-lg text-gray-600 mb-12 max-w-2xl mx-auto text-center dark:text-gray-300"> {/* Subtitle color */}
            Unlock your potential with cutting-edge features designed for fluency.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards with Icons */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:scale-105 hover:shadow-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl"> {/* Card background, border, shadow */}
              <div className="mb-6 flex justify-center">
                <FaRobot className="w-20 h-20 text-indigo-600 bg-indigo-50 rounded-full p-4 border-4 border-indigo-100 dark:text-indigo-400 dark:bg-indigo-900 dark:border-indigo-800" /> {/* Icon bg/border/color */}
              </div>
              <h3 className="text-xl font-bold text-indigo-700 mb-3 text-center dark:text-indigo-300">Intelligent AI Tutor</h3> {/* Title color */}
              <p className="text-gray-600 text-center dark:text-gray-300">Engage in dynamic, real-time conversations with our advanced AI tutor, simulating real-life scenarios.</p> {/* Text color */}
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:scale-105 hover:shadow-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl">
              <div className="mb-6 flex justify-center">
                <MdOutlineFeedback className="w-20 h-20 text-green-600 bg-green-50 rounded-full p-4 border-4 border-green-100 dark:text-green-400 dark:bg-green-900 dark:border-green-800" />
              </div>
              <h3 className="text-xl font-bold text-indigo-700 mb-3 text-center dark:text-indigo-300">Instant, Detailed Feedback</h3>
              <p className="text-gray-600 text-center dark:text-gray-300">Receive immediate, personalized insights on pronunciation, grammar, vocabulary, and fluency.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:scale-105 hover:shadow-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl">
              <div className="mb-6 flex justify-center">
                <FaChartLine className="w-20 h-20 text-blue-600 bg-blue-50 rounded-full p-4 border-4 border-blue-100 dark:text-blue-400 dark:bg-blue-900 dark:border-blue-800" />
              </div>
              <h3 className="text-xl font-bold text-indigo-700 mb-3 text-center dark:text-indigo-300">Comprehensive Progress Tracking</h3>
              <p className="text-gray-600 text-center dark:text-gray-300">Monitor your linguistic journey with intuitive charts and reports, seeing your improvement over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: How It Works / Tutorial */}
      <section className="py-16 md:py-24 bg-indigo-700 text-white dark:bg-indigo-900"> {/* Section background */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-center font-dancing text-indigo-100 dark:text-indigo-200">Your Path to Fluency</h2> {/* Title color */}
          <p className="text-base sm:text-lg text-indigo-200 mb-12 max-w-2xl mx-auto text-center dark:text-indigo-300"> {/* Subtitle color */}
            Achieve your speaking goals in three simple, guided steps.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tutorial Steps with Icons */}
            <div className="bg-white text-gray-900 p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-103 hover:shadow-2xl flex flex-col items-center dark:bg-gray-800 dark:text-gray-100 dark:shadow-2xl dark:border dark:border-gray-700"> {/* Card theme */}
              <span className="text-3xl font-bold text-indigo-600 mb-4 bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center shadow-md dark:bg-indigo-900 dark:text-indigo-300">1</span> {/* Step number theme */}
              <BsPersonFillAdd className="w-24 h-24 text-red-600 bg-red-50 rounded-lg p-4 mb-4 border-4 border-red-100 dark:text-red-400 dark:bg-red-900 dark:border-red-800" /> {/* Icon theme */}
              <h3 className="text-xl font-bold text-indigo-700 mb-3 text-center dark:text-indigo-300">Create Your Account</h3> {/* Title theme */}
              <p className="text-gray-600 text-center dark:text-gray-300">Join SpeakEdge in minutes. It's free and simple to begin your journey.</p> {/* Text theme */}
            </div>
            <div className="bg-white text-gray-900 p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-103 hover:shadow-2xl flex flex-col items-center dark:bg-gray-800 dark:text-gray-100 dark:shadow-2xl dark:border dark:border-gray-700">
              <span className="text-3xl font-bold text-indigo-600 mb-4 bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center shadow-md dark:bg-indigo-900 dark:text-indigo-300">2</span>
              <FaMicrophoneAlt className="w-24 h-24 text-purple-600 bg-purple-50 rounded-lg p-4 mb-4 border-4 border-purple-100 dark:text-purple-400 dark:bg-purple-900 dark:border-purple-800" />
              <h3 className="text-xl font-bold text-indigo-700 mb-3 text-center dark:text-indigo-300">Start Practicing</h3>
              <p className="text-gray-600 text-center dark:text-gray-300">Engage in interactive conversations tailored to your proficiency and interests.</p>
            </div>
            <div className="bg-white text-gray-900 p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-103 hover:shadow-2xl flex flex-col items-center dark:bg-gray-800 dark:text-gray-100 dark:shadow-2xl dark:border dark:border-gray-700">
              <span className="text-3xl font-bold text-indigo-600 mb-4 bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center shadow-md dark:bg-indigo-900 dark:text-indigo-300">3</span>
              <FaAward className="w-24 h-24 text-yellow-600 bg-yellow-50 rounded-lg p-4 mb-4 border-4 border-yellow-100 dark:text-yellow-400 dark:bg-yellow-900 dark:border-yellow-800" />
              <h3 className="text-xl font-bold text-indigo-700 mb-3 text-center dark:text-indigo-300">Achieve Fluency</h3>
              <p className="text-gray-600 text-center dark:text-gray-300">Apply feedback, track growth, and confidently master new linguistic skills.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: User Testimonials */}
      <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-900"> {/* Section background */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 text-center font-dancing dark:text-gray-100">What Our Community Says</h2> {/* Title color */}
          <p className="text-base sm:text-lg text-gray-600 mb-12 max-w-2xl mx-auto text-center dark:text-gray-300"> {/* Subtitle color */}
            Hear from learners who have transformed their English skills with SpeakEdge.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial Cards with Original User Avatars */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-indigo-100 flex flex-col items-center text-center transition-transform duration-300 hover:translate-y-[-5px] dark:bg-gray-800 dark:border-indigo-800 dark:shadow-2xl"> {/* Card theme */}
              <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-4 border-indigo-200 shadow-md dark:border-indigo-700"> {/* Avatar border theme */}
                <img src={user1Avatar} alt="User John Doe" className="w-full h-full object-cover" />
              </div>
              <p className="text-gray-700 text-base italic mb-4 flex-grow dark:text-gray-200"> {/* Text theme */}
                "SpeakEdge is fantastic! The AI feels like talking to a real person, and the feedback helped me fix mistakes I didn't even know I was making."
              </p>
              <p className="font-semibold text-indigo-600 mb-2 dark:text-indigo-400">John D.</p> {/* Author theme */}
              <StarRating rating={5} idSuffix="john-doe" />
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-indigo-100 flex flex-col items-center text-center transition-transform duration-300 hover:translate-y-[-5px] dark:bg-gray-800 dark:border-indigo-800 dark:shadow-2xl">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-4 border-indigo-200 shadow-md dark:border-indigo-700">
                <img src={user2Avatar} alt="User Jane Smith" className="w-full h-full object-cover" />
              </div>
              <p className="text-gray-700 text-base italic mb-4 flex-grow dark:text-gray-200">
                "I needed to practice for my IELTS speaking test, and this app was a lifesaver. It's convenient and really boosted my confidence."
              </p>
              <p className="font-semibold text-indigo-600 mb-2 dark:text-indigo-400">Priya S.</p>
              <StarRating rating={5} idSuffix="priya-s" />
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-indigo-100 flex flex-col items-center text-center transition-transform duration-300 hover:translate-y-[-5px] dark:bg-gray-800 dark:border-indigo-800 dark:shadow-2xl">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-4 border-indigo-200 shadow-md dark:border-indigo-700">
                <img src={user3Avatar} alt="User Mark Johnson" className="w-full h-full object-cover" />
              </div>
              <p className="text-gray-700 text-base italic mb-4 flex-grow dark:text-gray-200">
                "A great tool for intermediate learners like me. The progress tracking keeps me motivated. Highly recommend!"
              </p>
              <p className="font-semibold text-indigo-600 mb-2 dark:text-indigo-400">Carlos M.</p>
              <StarRating rating={4.5} idSuffix="carlos-m" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
