import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

// A new, space-themed SVG icon that fits the updated design.
const LostPlanetIcon = () => (
    <svg width="120" height="120" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-float">
        {/* Planet Body */}
        <circle cx="75" cy="75" r="50" fill="url(#planetGradient)"/>
        {/* Planet Shadow */}
        <circle cx="75" cy="75" r="50" fill="url(#shadowGradient)"/>
        {/* Planet Ring */}
        <ellipse cx="75" cy="75" rx="80" ry="25" stroke="url(#ringGradient)" strokeWidth="5" transform="rotate(-20 75 75)"/>
        <defs>
            <linearGradient id="planetGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8E2DE2" />
                <stop offset="100%" stopColor="#4A00E0" />
            </linearGradient>
            <radialGradient id="shadowGradient">
                <stop offset="70%" stopColor="transparent" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
            </radialGradient>
             <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a7f3d0" />
                <stop offset="100%" stopColor="#4de6b6" />
            </linearGradient>
        </defs>
    </svg>
);


const NotFoundPage = () => {
  return (
    // Main container now uses a dark slate background in both light and dark modes.
    // This provides excellent contrast for your white header text.
    <div className="relative bg-slate-900 text-center overflow-hidden">
        <div className="container mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] px-4 py-16">

            {/* Starfield Background */}
            <div className="absolute inset-0 z-0">
                <div className="star"></div><div className="star"></div><div className="star"></div><div className="star"></div>
                <div className="star"></div><div className="star"></div><div className="star"></div><div className="star"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10">
                {/* Animated Icon */}
                <div className="relative mb-8">
                    <LostPlanetIcon />
                </div>

                {/* Main Title */}
                <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-4 animate-fade-in-up">
                    404
                </h1>

                {/* Page Message */}
                <p className="text-xl md:text-2xl text-slate-300 mb-6 max-w-lg mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    Oops! It looks like you've drifted off course into an unknown galaxy.
                </p>

                {/* Call to Action Button */}
                <Link
                    to="/"
                    className="inline-flex items-center px-8 py-4 bg-green-400 text-slate-900 font-bold text-lg rounded-full shadow-lg hover:bg-green-500 transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-75 animate-fade-in-up"
                    style={{ animationDelay: '0.4s' }}
                >
                    <FiHome className="mr-2" /> Go Back Home
                </Link>
            </div>
        </div>

        {/* Add this style block to your main CSS file (e.g., index.css) for the animations. */}
        <style>{`
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
              100% { transform: translateY(0px); }
            }
            @keyframes fade-in-up {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes twinkle {
              0% { transform: scale(0.5); opacity: 0.5; }
              50% { transform: scale(1); opacity: 1; }
              100% { transform: scale(0.5); opacity: 0.5; }
            }
            .animate-float { animation: float 6s ease-in-out infinite; }
            .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
            
            .star {
              position: absolute;
              width: 2px;
              height: 2px;
              background: white;
              border-radius: 50%;
              animation: twinkle 5s infinite ease-in-out;
            }
            .star:nth-child(1) { top: 10%; left: 20%; animation-delay: 0s; }
            .star:nth-child(2) { top: 40%; left: 80%; animation-delay: 0.5s; }
            .star:nth-child(3) { top: 80%; left: 10%; animation-delay: 1s; }
            .star:nth-child(4) { top: 60%; left: 50%; animation-delay: 1.5s; }
            .star:nth-child(5) { top: 25%; left: 90%; animation-delay: 2s; }
            .star:nth-child(6) { top: 5%; left: 5%; animation-delay: 2.5s; }
            .star:nth-child(7) { top: 95%; left: 95%; animation-delay: 3s; }
            .star:nth-child(8) { top: 50%; left: 25%; animation-delay: 3.5s; }
        `}</style>
    </div>
  );
};

export default NotFoundPage;
