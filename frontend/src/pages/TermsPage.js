// src/pages/TermsPage.js
import React from 'react';

const TermsPage = () => {
  return (
    <div className="bg-gray-50 font-inter min-h-[calc(100vh-80px)] dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section for Terms of Service Page */}
      <section className="relative py-20 px-4 md:px-8 text-white text-center flex items-center justify-center rounded-b-3xl shadow-lg bg-gradient-to-r from-red-600 to-orange-700 dark:from-red-900 dark:to-orange-900"> {/* Gradient theme */}
        <div className="relative z-10 container mx-auto max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 font-dancing tracking-tight animate-fade-in-up">
            Terms of Service
          </h1>
          <p className="text-lg sm:text-xl text-orange-100 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Please read these terms carefully before using our services.
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 max-w-5xl">
        <div className="space-y-12">
          
          {/* Introduction */}
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl"> {/* Card theme */}
            <p className="text-xl text-gray-700 leading-relaxed mb-4 dark:text-gray-200"> {/* Text theme */}
              Welcome to SpeakEdge! These Terms of Service ("Terms") outline the rules and guidelines for your use of the SpeakEdge website and all associated services. By accessing or utilizing our services, you acknowledge and agree to abide by these Terms.
            </p>
            <p className="text-gray-600 text-sm dark:text-gray-300">Last updated: June 23, 2025</p>
          </div>

          {/* Section: Acceptance of Terms */}
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-dancing dark:text-gray-100">1. Acceptance of Terms</h2>
            <p className="text-lg text-gray-700 leading-relaxed dark:text-gray-200">
              Your engagement with SpeakEdge's platform implies your full acceptance of these Terms and our Privacy Policy. Should you disagree with any part of these terms, your access to our services is not permitted.
            </p>
          </div>

          {/* Section: User Accounts */}
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-dancing dark:text-gray-100">2. User Accounts</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 dark:text-gray-200">
              <li><strong>Eligibility:</strong> You must be at least 13 years old to create an account and use our services.</li>
              <li><strong>Account Security:</strong> You are solely responsible for safeguarding your account credentials and all activities that occur under your account.</li>
              <li><strong>Accurate Information:</strong> You agree to provide and maintain accurate, current, and complete registration information.</li>
              <li><strong>Account Suspension/Termination:</strong> We reserve the right to suspend or terminate accounts that violate these Terms, without prior notice.</li>
            </ul>
          </div>

          {/* Section: Content and Conduct */}
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-dancing dark:text-gray-100">3. Content and Conduct</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-orange-700 mb-3 dark:text-orange-400">User-Generated Content</h3> {/* Subtitle theme */}
                <p className="text-gray-700 leading-relaxed dark:text-gray-200">
                  You retain all ownership rights to any content you create, submit, or display on SpeakEdge, including your voice recordings. By doing so, you grant SpeakEdge a non-exclusive, worldwide, royalty-free license to use this content for service operation and improvement.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-orange-700 mb-3 dark:text-orange-400">Prohibited Conduct</h3>
                <p className="text-gray-700 leading-relaxed mb-4 dark:text-gray-200">
                  To ensure a safe and productive environment, you agree not to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 dark:text-gray-200">
                  <li>Upload malicious software or viruses.</li>
                  <li>Engage in harassment, hate speech, or any unlawful activities.</li>
                  <li>Infringe upon intellectual property rights of others.</li>
                  <li>Attempt unauthorized access to our systems.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section: Intellectual Property */}
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-dancing dark:text-gray-100">4. Intellectual Property</h2>
            <p className="text-lg text-gray-700 leading-relaxed dark:text-gray-200">
              All materials, content, trademarks, and intellectual property found on SpeakEdge are the exclusive property of SpeakEdge or its licensors. Unauthorized use, reproduction, or distribution is strictly prohibited.
            </p>
          </div>

          {/* Section: Disclaimer & Limitation of Liability */}
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-dancing dark:text-gray-100">5. Disclaimer & Limitation of Liability</h2>
            <p className="text-lg text-gray-700 leading-relaxed dark:text-gray-200">
              SpeakEdge services are provided "as is" without any warranties. We shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your access to or use of or inability to access or use the Services; (b) any conduct or content of any third party on the Services.
            </p>
          </div>

          {/* Section: Governing Law */}
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-dancing dark:text-gray-100">6. Governing Law</h2>
            <p className="text-lg text-gray-700 leading-relaxed dark:text-gray-200">
              These Terms will be governed by and construed in accordance with the laws of [Your Country/State, e.g., the State of California], without regard to its conflict of law principles.
            </p>
          </div>

          {/* Section: Contact Information */}
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100 text-center dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-dancing dark:text-gray-100">Contact Us</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4 dark:text-gray-200">
              Should you have any questions or require clarification regarding these Terms of Service, please feel free to reach out:
            </p>
            <p className="text-xl font-semibold text-red-600 dark:text-red-400">
              Email: <a href="mailto:support@speakedge.com" className="hover:underline">support@speakedge.com</a>
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default TermsPage;
