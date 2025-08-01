import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiChevronUp, FiHelpCircle } from 'react-icons/fi';

// --- Component Data ---

// FAQ data organized by category
const faqData = {
  'General': [
    {
      question: "What is SpeakEdge?",
      answer: "SpeakEdge is an AI-powered language coaching platform designed to help you improve your speaking clarity, confidence, and impact. We provide real-time feedback on your pronunciation, pace, filler words, and more."
    },
    {
      question: "Who is SpeakEdge for?",
      answer: "SpeakEdge is for anyone looking to enhance their verbal communication skills. This includes students, professionals, public speakers, non-native speakers practicing for fluency, and anyone who wants to speak more effectively."
    }
  ],
  'Billing & Subscriptions': [
    {
      question: "Can I try SpeakEdge for free?",
      answer: "Yes! Our Starter plan is completely free and gives you access to our basic voice analysis tools with a limited number of daily sessions. It's a great way to experience the core features of our platform."
    },
    {
      question: "How do I upgrade my plan?",
      answer: "You can upgrade your plan at any time from your account dashboard. Simply select the plan that best fits your needs and follow the on-screen instructions. The change will be effective immediately."
    },
    {
        question: "What is your refund policy?",
        answer: "We offer a 14-day money-back guarantee on all our paid plans. If you're not satisfied with SpeakEdge, please contact our support team within 14 days of your purchase for a full refund."
    }
  ],
  'Technical': [
    {
      question: "What equipment do I need?",
      answer: "All you need is a device with a modern web browser (like Chrome, Firefox, or Safari) and a microphone. Most built-in microphones on laptops and smartphones work perfectly fine."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We take data privacy and security very seriously. All your practice sessions and personal information are encrypted and stored securely. We never share your data with third parties. Please see our Privacy Policy for more details."
    }
  ]
};

// --- Reusable FAQ Item Component ---
const FaqItem = ({ faq, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800 dark:text-gray-200"
      >
        <span>{faq.question}</span>
        {isOpen ? <FiChevronUp className="flex-shrink-0"/> : <FiChevronDown className="flex-shrink-0"/>}
      </button>
      {isOpen && (
        <div className="mt-3 text-gray-600 dark:text-gray-400">
          <p>{faq.answer}</p>
        </div>
      )}
    </div>
  );
};

// --- Main FAQs Page Component ---
const FAQsPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const handleToggle = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-white dark:bg-dark-bg text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-brand-blue to-green-400 pt-32 pb-24 text-center text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg text-white/90">
            Find answers to common questions about our platform, billing, and more.
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <main className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {Object.entries(faqData).map(([category, faqs], categoryIndex) => (
            <div key={category} className={categoryIndex > 0 ? 'mt-12' : ''}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{category}</h2>
              <div className="space-y-2">
                {faqs.map((faq, faqIndex) => {
                  const globalIndex = `${categoryIndex}-${faqIndex}`;
                  return (
                    <FaqItem
                      key={globalIndex}
                      faq={faq}
                      isOpen={openFaq === globalIndex}
                      onClick={() => handleToggle(globalIndex)}
                    />
                  )
                })}
              </div>
            </div>
          ))}

          {/* Still have questions? Section */}
          <div className="mt-20 text-center bg-light-gray dark:bg-dark-surface p-8 rounded-lg">
            <FiHelpCircle className="mx-auto w-12 h-12 text-brand-blue mb-4"/>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Still have questions?</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Can't find the answer you're looking for? Don't hesitate to reach out to our support team.
            </p>
            <Link to="/contact">
              <button className="mt-6 bg-brand-blue text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FAQsPage;
