import React from 'react';
import { Link } from 'react-router-dom';
import { FiFileText, FiUser, FiCreditCard, FiCode, FiXCircle, FiGitPullRequest, FiMail, FiPackage, FiCpu } from 'react-icons/fi';


import geminiLogoPng from '../assets/tech/gemini.png';
import chatgptLogoPng from '../assets/tech/chatgpt.png';
import metaLogoPng from '../assets/tech/meta.png';
import huggingfaceLogoPng from '../assets/tech/huggingface.png';


const InfoCard = ({ icon, title, children }) => (
    <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md border-l-4 border-brand-blue mb-8 transform hover:scale-[1.02] transition-transform duration-300">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            {icon}
            <span className="ml-3">{title}</span>
        </h2>
        <div className="prose dark:prose-invert max-w-none">
            {children}
        </div>
    </div>
);

const TermsPage = () => {
  return (
    <div className="bg-light-gray dark:bg-dark-bg text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-brand-blue to-green-400 pt-32 pb-24 text-center text-white">
        <div className="container mx-auto px-6">
          <FiFileText className="mx-auto w-12 h-12 mb-4" />
          <h1 className="text-4xl md:text-6xl font-extrabold">
            Terms of Service
          </h1>
          <p className="mt-4 text-lg text-white/90">
            Last Updated: August 1, 2025
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <main className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-lg text-center text-gray-700 dark:text-gray-300 mb-12">
            Welcome to SpeakEdge! These Terms of Service ("Terms") govern your use of the SpeakEdge website, applications, and services (collectively, the "Service"), provided by SpeakEdge Inc. By accessing or using our Service, you agree to be bound by these Terms.
          </p>

          <InfoCard icon={<FiUser className="text-brand-blue"/>} title="1. Accounts">
            <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.</p>
          </InfoCard>

          <InfoCard icon={<FiCreditCard className="text-brand-blue"/>} title="2. Subscriptions">
            <p>Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring and periodic basis ("Billing Cycle"). Billing cycles are set either on a monthly or annual basis, depending on the type of subscription plan you select when purchasing a Subscription. At the end of each Billing Cycle, your Subscription will automatically renew under the exact same conditions unless you cancel it or we cancel it.</p>
          </InfoCard>

          <InfoCard icon={<FiCode className="text-brand-blue"/>} title="3. User Content">
            <p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness. By posting Content, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service.</p>
          </InfoCard>

          <InfoCard icon={<FiXCircle className="text-brand-blue"/>} title="4. Prohibited Uses">
            <p>You may use the Service only for lawful purposes. You agree not to use the Service:</p>
            <ul>
                <li>In any way that violates any applicable national or international law or regulation.</li>
                <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
                <li>To transmit, or procure the sending of, any advertising or promotional material.</li>
                <li>To impersonate or attempt to impersonate the Company or another user.</li>
            </ul>
          </InfoCard>

          <InfoCard icon={<FiPackage className="text-brand-blue"/>} title="5. Intellectual Property">
            <p>The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of SpeakEdge Inc. and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.</p>
          </InfoCard>

          {/* --- MODIFIED SECTION --- */}
          <InfoCard icon={<FiCpu className="text-brand-blue"/>} title="6. Third-Party Services & AI Models">
            <p>Our Service integrates technologies from various third-party providers to deliver its core functionality. By using SpeakEdge, you acknowledge that your interactions with our AI features are also governed by the terms and policies of these providers.</p>
            <div className="mt-4 space-y-3">
                <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <img src={geminiLogoPng} alt="Google Gemini" className="h-6 w-auto" />
                    <span className="font-semibold">Google Gemini</span>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <img src={chatgptLogoPng} alt="OpenAI" className="h-6 w-auto" />
                    <span className="font-semibold">OpenAI (ChatGPT, Whisper)</span>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <img src={metaLogoPng} alt="Meta" className="h-6 w-auto" />
                    <span className="font-semibold">Meta</span>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <img src={huggingfaceLogoPng} alt="Hugging Face" className="h-6 w-auto" />
                    <span className="font-semibold">Hugging Face</span>
                </div>
            </div>
            <p className="mt-4 text-sm">SpeakEdge does not own or control these third-party services. We are not responsible for their content, policies, or practices. We encourage you to review the terms and privacy policies of any third-party services you interact with.</p>
          </InfoCard>
          
          <InfoCard icon={<FiGitPullRequest className="text-brand-blue"/>} title="7. Changes to Terms">
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
          </InfoCard>

          <InfoCard icon={<FiMail className="text-brand-blue"/>} title="8. Contact Us">
            <p>If you have any questions about these Terms, please <Link to="/contact" className="text-brand-blue hover:underline">contact us</Link>.</p>
          </InfoCard>
        </div>
      </main>
    </div>
  );
};

export default TermsPage;
