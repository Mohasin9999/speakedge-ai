// src/pages/ContactPage.js
import React, { useState } from 'react';

import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPaperPlane } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // Import FaXTwitter from fa6

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(''); // 'success', 'error', 'idle'

  // Placeholder for a hero background image
  const contactHeroBg = "https://placehold.co/1920x400/a78bfa/ffffff?text=Get+in+Touch";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    // Simulating API call for demonstration
    setTimeout(() => {
      setLoading(false);
      if (Math.random() > 0.1) { // 90% chance of success
        setStatus('success');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setStatus('error');
      }
    }, 1500);
  };

  return (
    // Main container to ensure full height and consistent background
    <div className="bg-gray-50 font-inter min-h-[calc(100vh-80px)] dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section for Contact Page */}
      <section
        className="relative py-20 px-4 md:px-8 text-white text-center flex items-center justify-center rounded-b-3xl shadow-lg"
        style={{
          backgroundImage: `url(${contactHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-800 opacity-80 rounded-b-3xl dark:from-purple-900 dark:to-indigo-900"></div> {/* Gradient theme */}
        <div className="relative z-10 container mx-auto max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 font-dancing tracking-tight animate-fade-in-up">
            Get in Touch
          </h1>
          <p className="text-lg sm:text-xl text-indigo-100 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            We'd love to hear from you! Send us a message or find our contact details below.
          </p>
        </div>
      </section>

      {/* Main Content: Contact Form and Info */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Contact Form Section */}
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl"> {/* Card theme */}
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center lg:text-left font-dancing dark:text-gray-100">Send Us a Message</h2> {/* Title theme */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">Your Name</label> {/* Label theme */}
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-indigo-500" // Input theme
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">Your Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-indigo-500"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">Subject</label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-indigo-500"
                  placeholder="Inquiry about pricing..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">Your Message</label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 resize-y disabled:opacity-70 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-indigo-500"
                  placeholder="Tell us how we can help..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  disabled={loading}
                ></textarea>
              </div>
              {status === 'success' && (
                <div className="bg-green-100 text-green-700 p-3 rounded-lg text-center text-sm dark:bg-green-900 dark:text-green-200">
                  Your message has been sent successfully!
                </div>
              )}
              {status === 'error' && (
                <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center text-sm dark:bg-red-900 dark:text-red-200">
                  Failed to send message. Please try again later.
                </div>
              )}
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed text-lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information Section */}
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100 flex flex-col justify-between dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl"> {/* Card theme */}
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center lg:text-left font-dancing dark:text-gray-100">Our Contact Details</h2> {/* Title theme */}
              <div className="space-y-6 mb-10">
                <div className="flex items-center text-gray-700 text-lg dark:text-gray-200"> {/* Text theme */}
                  <FaMapMarkerAlt className="text-indigo-600 w-7 h-7 mr-4 flex-shrink-0 dark:text-indigo-400" /> {/* Icon theme */}
                  <span>123 SpeakEdge Lane, Language City, FL 12345</span>
                </div>
                <div className="flex items-center text-gray-700 text-lg dark:text-gray-200">
                  <FaPhoneAlt className="text-indigo-600 w-7 h-7 mr-4 flex-shrink-0 dark:text-indigo-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-gray-700 text-lg dark:text-gray-200">
                  <FaEnvelope className="text-indigo-600 w-7 h-7 mr-4 flex-shrink-0 dark:text-indigo-400" />
                  <span>support@speakedge.com</span>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-200 rounded-lg overflow-hidden shadow-inner h-64 w-full flex items-center justify-center text-gray-500 text-xl font-medium mb-10 dark:bg-gray-700"> {/* Map bg theme */}
                <img src="https://placehold.co/600x400/e0e0e0/555555?text=Map+Placeholder" alt="Map Location" className="w-full h-full object-cover dark:filter dark:brightness-75" /> {/* Image adjust for dark mode */}
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center lg:text-left font-dancing dark:text-gray-100">Follow Us</h3> {/* Title theme */}
              <div className="flex justify-center lg:justify-start space-x-6">
                <a href="https://facebook.com/speakedge" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors duration-200 dark:text-gray-400 dark:hover:text-blue-500"> {/* Icon theme */}
                  <FaFacebook className="w-8 h-8" />
                </a>
                <a href="https://x.com/speakedge" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800 transition-colors duration-200 dark:text-gray-400 dark:hover:text-gray-100"> {/* Icon theme */}
                  <FaXTwitter className="w-8 h-8" />
                </a>
                <a href="https://instagram.com/speakedge" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-600 transition-colors duration-200 dark:text-gray-400 dark:hover:text-pink-500"> {/* Icon theme */}
                  <FaInstagram className="w-8 h-8" />
                </a>
                <a href="https://linkedin.com/company/speakedge" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700 transition-colors duration-200 dark:text-gray-400 dark:hover:text-blue-600"> {/* Icon theme */}
                  <FaLinkedin className="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ContactPage;

