// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

import speakEdgeLogowhite from '../assets/speakedge_logo_white.png';

import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // Correct import for X/Twitter icon

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-10 px-4 sm:px-6 lg:px-8 dark:bg-gray-950 transition-colors duration-300"> {/* Footer background theme */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info / Logo */}
        <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
          <Link to="/" className="mb-4">
            <img src={speakEdgeLogowhite} alt="SpeakEdge Logo" className="h-20 w-auto" />
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs dark:text-gray-500">
            Empowering your voice with AI-powered language practice. Master IELTS, effortlessly.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold text-lg mb-4 text-indigo-300 dark:text-indigo-400">Quick Links</h3> {/* Title theme */}
          <ul className="space-y-2">
            <li><Link to="/pricing" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200 text-sm dark:text-gray-400 dark:hover:text-indigo-500">Pricing</Link></li> {/* Link theme */}
            <li><Link to="/faqs" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200 text-sm dark:text-gray-400 dark:hover:text-indigo-500">FAQs</Link></li>
            <li><Link to="/status" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200 text-sm dark:text-gray-400 dark:hover:text-indigo-500">Status</Link></li>
            <li><Link to="/feedback" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200 text-sm dark:text-gray-400 dark:hover:text-indigo-500">Feedback</Link></li>
          </ul>
        </div>

        {/* Legal & About */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold text-lg mb-4 text-indigo-300 dark:text-indigo-400">Company</h3> {/* Title theme */}
          <ul className="space-y-2">
            <li><Link to="/about" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200 text-sm dark:text-gray-400 dark:hover:text-indigo-500">About Us</Link></li>
            <li><Link to="/terms" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200 text-sm dark:text-gray-400 dark:hover:text-indigo-500">Terms of Service</Link></li>
            <li><Link to="/privacy-policy" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200 text-sm dark:text-gray-400 dark:hover:text-indigo-500">Privacy Policy</Link></li>
            <li><Link to="/contact" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200 text-sm dark:text-gray-400 dark:hover:text-indigo-500">Contact Us</Link></li>
          </ul>
        </div>

        {/* Social Media & Newsletter */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold text-lg mb-4 text-indigo-300 dark:text-indigo-400">Connect With Us</h3> {/* Title theme */}
          <div className="flex justify-center md:justify-start space-x-4 mb-6">
            <a href="https://facebook.com/speakedge" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors duration-200 dark:text-gray-500 dark:hover:text-blue-400"> {/* Icon theme */}
              <FaFacebook className="h-6 w-6" />
            </a>
            <a href="https://x.com/speakedge" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-100 transition-colors duration-200 dark:text-gray-500 dark:hover:text-gray-400"> {/* Icon theme */}
              <FaXTwitter className="h-6 w-6" />
            </a>
            <a href="https://instagram.com/speakedge" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors duration-200 dark:text-gray-500 dark:hover:text-pink-400"> {/* Icon theme */}
              <FaInstagram className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com/company/speakedge" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 transition-colors duration-200 dark:text-gray-500 dark:hover:text-blue-600"> {/* Icon theme */}
              <FaLinkedin className="h-6 w-6" />
            </a>
            <a href="https://github.com/speakedge" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 transition-colors duration-200 dark:text-gray-500 dark:hover:text-gray-400"> {/* Icon theme */}
              <FaGithub className="h-6 w-6" />
            </a>
          </div>
          {/* Newsletter Signup */}
          <p className="text-gray-400 text-sm mb-3 dark:text-gray-500">Stay updated with our latest news!</p> {/* Text theme */}
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full sm:flex-1 p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-500 dark:text-gray-200 dark:focus:ring-indigo-600" // Input theme
            />
            <button className="px-4 py-2 bg-indigo-600 rounded-md text-white font-semibold hover:bg-indigo-700 transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm dark:border-gray-800 dark:text-gray-600"> {/* Border and text theme */}
        &copy; {currentYear} SpeakEdge. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
