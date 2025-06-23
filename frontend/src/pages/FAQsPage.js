// src/pages/FAQsPage.js
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqData = [
  {
    question: "What is SpeakEdge?",
    answer: "SpeakEdge is an AI-powered language learning platform designed to help you improve your English speaking skills through real-time, interactive conversations with an AI tutor. We provide instant feedback on pronunciation, grammar, and fluency."
  },
  {
    question: "How does the AI tutor work?",
    answer: "Our AI tutor uses advanced natural language processing (NLP) and speech recognition to understand your speech and respond dynamically. It simulates real conversations, allowing you to practice various topics and scenarios."
  },
  {
    question: "What kind of feedback will I receive?",
    answer: "You'll receive instant feedback on your pronunciation, grammatical accuracy, vocabulary usage, and overall fluency. This feedback is designed to be actionable, helping you identify and correct mistakes in real-time."
  },
  {
    question: "Is SpeakEdge suitable for all English proficiency levels?",
    answer: "Yes! SpeakEdge offers content and conversation topics suitable for learners from beginner to advanced levels. Our AI adapts to your speaking pace and proficiency to provide a comfortable and challenging learning environment."
  },
  {
    question: "Do you offer a free trial?",
    answer: "We offer a free tier that allows you to experience limited daily AI interactions. You can upgrade to a paid plan anytime for more features and unlimited practice."
  },
  {
    question: "How is my progress tracked?",
    answer: "Your progress is tracked through detailed analytics dashboards. You can see improvements in various linguistic aspects, review past conversations, and identify areas for further practice."
  },
  {
    question: "What topics can I practice?",
    answer: "We cover a wide range of topics, from daily conversations and job interviews to travel scenarios and IELTS speaking test simulations. You can choose topics based on your interests and learning goals."
  },
  {
    question: "Can I use SpeakEdge on my mobile device?",
    answer: "Yes, SpeakEdge is fully responsive and optimized for use on all devices, including smartphones, tablets, and desktop computers."
  }
];

const FAQsPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 font-inter min-h-[calc(100vh-80px)] dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section for FAQs Page */}
      <section className="relative py-20 px-4 md:px-8 text-white text-center flex items-center justify-center rounded-b-3xl shadow-lg bg-gradient-to-r from-teal-600 to-cyan-700 dark:from-teal-900 dark:to-cyan-900">
        <div className="relative z-10 container mx-auto max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 font-dancing tracking-tight animate-fade-in-up">
            Frequently Asked Questions
          </h1>
          <p className="text-lg sm:text-xl text-teal-100 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Find quick answers to common questions about SpeakEdge.
          </p>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 max-w-4xl">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl">
          {faqData.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 last:border-b-0 py-4 dark:border-gray-700">
              <button
                className="flex justify-between items-center w-full text-left text-xl font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-200 dark:text-gray-100 dark:hover:text-indigo-400"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                {faq.question}
                {openIndex === index ? (
                  <FaChevronUp className="text-indigo-600 transition-transform duration-200 dark:text-indigo-400" />
                ) : (
                  <FaChevronDown className="text-gray-500 transition-transform duration-200 dark:text-gray-400" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-600 pt-2 pb-1 dark:text-gray-300">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQsPage;
