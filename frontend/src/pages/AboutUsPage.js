// src/pages/AboutUsPage.js
import React from 'react';
import { Link } from 'react-router-dom';

import { FaLightbulb, FaRocket } from 'react-icons/fa';

const AboutUsPage = () => {
  const teamMember1 = "https://placehold.co/120x120/d1d5db/374151?text=John+D";
  const teamMember2 = "https://placehold.co/120x120/d1d5db/374151?text=Jane+S";
  const teamMember3 = "https://placehold.co/120x120/d1d5db/374151?text=Carlos+M";

  return (
    <div className="bg-gray-50 font-inter min-h-[calc(100vh-80px)] dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section for About Us Page */}
      <section className="relative py-20 px-4 md:px-8 text-white text-center flex items-center justify-center rounded-b-3xl shadow-lg bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-900"> {/* Gradient theme */}
        <div className="relative z-10 container mx-auto max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 font-dancing tracking-tight animate-fade-in-up">
            About SpeakEdge
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Our journey to empower voices worldwide through innovative AI language learning.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800"> {/* Section background */}
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 font-dancing dark:text-gray-100">Our Story</h2> {/* Title theme */}
          <p className="text-lg text-gray-700 leading-relaxed mb-8 dark:text-gray-200"> {/* Text theme */}
            SpeakEdge was founded with a simple yet powerful vision: to make language learning accessible, engaging, and effective for everyone, everywhere. We believe that confidently speaking a new language opens up a world of opportunities, and our AI-powered platform is designed to break down barriers and build fluency.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed dark:text-gray-200">
            From humble beginnings, our team of passionate educators, linguists, and AI specialists has poured their expertise into creating an unparalleled conversational learning experience. We are constantly innovating to bring you the most personalized and impactful English practice available.
          </p>
          <div className="flex justify-center mt-10">
            <Link to="/contact" className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-75">
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900"> {/* Section background */}
        <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Mission Card */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center transform transition-all duration-300 hover:scale-103 hover:shadow-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl"> {/* Card theme */}
            <FaLightbulb className="text-6xl text-yellow-500 mx-auto mb-6 dark:text-yellow-400" /> {/* Icon theme */}
            <h3 className="text-2xl font-bold text-indigo-700 mb-3 font-dancing dark:text-indigo-300">Our Mission</h3> {/* Title theme */}
            <p className="text-gray-700 leading-relaxed dark:text-gray-200"> {/* Text theme */}
              To empower every individual with the confidence and skills to communicate effectively in English, fostering global connection and personal growth through cutting-edge AI technology.
            </p>
          </div>
          {/* Vision Card */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center transform transition-all duration-300 hover:scale-103 hover:shadow-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl">
            <FaRocket className="text-6xl text-red-500 mx-auto mb-6 dark:text-red-400" />
            <h3 className="text-2xl font-bold text-indigo-700 mb-3 font-dancing dark:text-indigo-300">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed dark:text-gray-200">
              To be the leading AI language learning platform, recognized for our innovative approach, exceptional user results, and commitment to accessible education worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800"> {/* Section background */}
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-12 font-dancing dark:text-gray-100">Meet the Team</h2> {/* Title theme */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Team Member 1 */}
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl shadow-md border border-gray-100 transition-transform duration-300 hover:scale-103 dark:bg-gray-700 dark:border-gray-600 dark:shadow-lg"> {/* Card theme */}
              <img src={teamMember1} alt="Team Member John Doe" className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-indigo-200 shadow-lg dark:border-indigo-600" /> {/* Image border theme */}
              <h3 className="text-xl font-semibold text-gray-800 mb-1 dark:text-gray-100">John Doe</h3> {/* Name theme */}
              <p className="text-indigo-600 text-sm mb-3 dark:text-indigo-400">CEO & Co-founder</p> {/* Role theme */}
              <p className="text-gray-600 text-center text-sm dark:text-gray-300">Visionary leader passionate about leveraging AI for education.</p> {/* Text theme */}
            </div>
            {/* Team Member 2 */}
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl shadow-md border border-gray-100 transition-transform duration-300 hover:scale-103 dark:bg-gray-700 dark:border-gray-600 dark:shadow-lg">
              <img src={teamMember2} alt="Team Member Jane Smith" className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-indigo-200 shadow-lg dark:border-indigo-600" />
              <h3 className="text-xl font-semibold text-gray-800 mb-1 dark:text-gray-100">Jane Smith</h3>
              <p className="text-indigo-600 text-sm mb-3 dark:text-indigo-400">Head of AI Development</p>
              <p className="text-gray-600 text-center text-sm dark:text-gray-300">Leads the charge in building our intelligent conversational AI.</p>
            </div>
            {/* Team Member 3 */}
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl shadow-md border border-gray-100 transition-transform duration-300 hover:scale-103 dark:bg-gray-700 dark:border-gray-600 dark:shadow-lg">
              <img src={teamMember3} alt="Team Member Carlos M" className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-indigo-200 shadow-lg dark:border-indigo-600" />
              <h3 className="text-xl font-semibold text-gray-800 mb-1 dark:text-gray-100">Carlos M.</h3>
              <p className="text-indigo-600 text-sm mb-3 dark:text-indigo-400">Chief Education Officer</p>
              <p className="text-gray-600 text-center text-sm dark:text-gray-300">Ensures our learning content is pedagogically sound and effective.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
