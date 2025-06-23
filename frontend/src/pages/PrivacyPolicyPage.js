// src/pages/PrivacyPolicyPage.js
import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-gray-50 font-inter min-h-[calc(100vh-80px)] dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section for Privacy Policy Page */}
      <section className="relative py-20 px-4 md:px-8 text-white text-center flex items-center justify-center rounded-b-3xl shadow-lg bg-gradient-to-r from-blue-700 to-indigo-800 dark:from-blue-900 dark:to-indigo-900"> {/* Gradient theme */}
        <div className="relative z-10 container mx-auto max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 font-dancing tracking-tight animate-fade-in-up">
            Our Privacy Commitment
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Your trust is paramount. Learn how we collect, use, and protect your information with transparency.
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 max-w-5xl">
        <div className="space-y-12">
          
          {/* Introduction */}
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl"> {/* Card theme */}
            <p className="text-xl text-gray-700 leading-relaxed mb-4 dark:text-gray-200"> {/* Text theme */}
              This Privacy Policy details how SpeakEdge ("we," "us," or "our") handles the information you provide when using our website (www.speakedge.com) and our language learning services. We are committed to safeguarding your privacy and ensuring your data is protected.
            </p>
            <p className="text-gray-600 text-sm dark:text-gray-300">Last updated: June 23, 2025</p> {/* Text theme */}
          </div>

          {/* Section: Information We Collect */}
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-dancing dark:text-gray-100">1. Information We Collect</h2> {/* Title theme */}
            <p className="text-lg text-gray-700 leading-relaxed mb-6 dark:text-gray-200"> {/* Text theme */}
              We collect information that helps us provide and improve your language learning experience. This includes data you provide directly and data collected automatically through your use of our services.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-indigo-700 mb-3 dark:text-indigo-300">Directly Provided Information</h3> {/* Subtitle theme */}
                <ul className="list-disc list-inside text-gray-700 space-y-2 dark:text-gray-200"> {/* List theme */}
                  <li><strong>Account Data:</strong> Names, email addresses, passwords.</li>
                  <li><strong>Payment Info:</strong> Processed securely by third-party payment gateways (we do not store full credit card details).</li>
                  <li><strong>Communication:</strong> Content of messages or inquiries you send to us.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-indigo-700 mb-3 dark:text-indigo-300">Automatically Collected Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 dark:text-gray-200">
                  <li><strong>Voice Recordings:</strong> Audio of your practice sessions for providing feedback and improving AI accuracy.</li>
                  <li><strong>Usage Data:</strong> How you interact with the AI, features used, time spent on the platform, progress reports.</li>
                  <li><strong>Device/Browser Info:</strong> IP address, browser type, operating system, device identifiers.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section: How We Use Your Information */}
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-dancing dark:text-gray-100">2. How We Use Your Information</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6 dark:text-gray-200">
              Your information is used primarily to deliver and enhance the SpeakEdge service, ensuring a personalized and effective learning journey.
            </p>
            <ul className="list-decimal list-inside text-gray-700 space-y-2 dark:text-gray-200">
              <li>To facilitate account creation and login process.</li>
              <li>To provide, operate, and maintain our Services.</li>
              <li>To improve, personalize, and expand our Services.</li>
              <li>To understand and analyze how you use our Services.</li>
              <li>To develop new products, services, features, and functionality.</li>
              <li>To communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the Services, and for marketing and promotional purposes.</li>
            </ul>
          </div>

          {/* Section: Sharing Your Information */}
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-dancing dark:text-gray-100">3. Sharing Your Information</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6 dark:text-gray-200">
              We value your privacy. We only share information in specific, necessary circumstances, with your consent, or as required by law.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 dark:text-gray-200">
              <li><strong>Service Providers:</strong> We may share data with third-party vendors (e.g., cloud hosting, analytics, payment processing) who perform services on our behalf, under strict confidentiality agreements.</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or asset sale, your information may be transferred to the acquiring entity.</li>
              <li><strong>Legal Compliance:</strong> We may disclose information if required by law, subpoena, or other legal process.</li>
              <li><strong>Protection of Rights:</strong> To protect the rights, property, or safety of SpeakEdge, our users, or the public.</li>
            </ul>
          </div>

          {/* Section: Your Privacy Rights */}
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-dancing dark:text-gray-100">4. Your Privacy Rights</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6 dark:text-gray-200">
              Depending on your location, you may have specific rights regarding your personal data. These typically include:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 dark:text-gray-200">
              <li><strong>Access:</strong> The right to request copies of your personal data.</li>
              <li><strong>Rectification:</strong> The right to request that we correct any information you believe is inaccurate.</li>
              <li><strong>Erasure:</strong> The right to request that we erase your personal data under certain conditions.</li>
              <li><strong>Restriction of Processing:</strong> The right to request that we restrict the processing of your personal data under certain conditions.</li>
              <li><strong>Data Portability:</strong> The right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
              <li><strong>Objection:</strong> The right to object to our processing of your personal data, under certain conditions.</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed mt-6 dark:text-gray-200">
              If you wish to exercise any of these rights, please contact us using the details below.
            </p>
          </div>

          {/* Section: Contact Us */}
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100 text-center dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-dancing dark:text-gray-100">Contact Us</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4 dark:text-gray-200">
              For any questions or concerns regarding this Privacy Policy or your data, please reach out to us:
            </p>
            <p className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
              Email: <a href="mailto:privacy@speakedge.com" className="hover:underline">privacy@speakedge.com</a>
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
