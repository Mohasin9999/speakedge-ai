import React from 'react';
import { Link } from 'react-router-dom';
import { FiShield, FiDatabase, FiLock, FiUserCheck, FiUsers, FiAlertTriangle, FiMail, FiGitPullRequest } from 'react-icons/fi';

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

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-light-gray dark:bg-dark-bg text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-brand-blue to-green-400 pt-32 pb-24 text-center text-white">
        <div className="container mx-auto px-6">
          <FiShield className="mx-auto w-12 h-12 mb-4" />
          <h1 className="text-4xl md:text-6xl font-extrabold">
            Privacy Policy
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
            SpeakEdge Inc. ("us", "we", or "our") operates the SpeakEdge website and mobile application (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
          </p>

          <InfoCard icon={<FiDatabase className="text-brand-blue"/>} title="1. Information Collection and Use">
            <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
            <h3>Types of Data Collected</h3>
            <ul>
                <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to: Email address, First name and last name, and Usage Data.</li>
                <li><strong>Usage Data:</strong> We may also collect information that your browser sends whenever you visit our Service or when you access the Service by or through a mobile device ("Usage Data").</li>
                <li><strong>Voice Data:</strong> To provide our core speech analysis features, we collect and process recordings of your voice when you use our practice sessions. This data is used solely for the purpose of providing you with feedback on your speech.</li>
            </ul>
          </InfoCard>

          <InfoCard icon={<FiGitPullRequest className="text-brand-blue"/>} title="2. How We Use Your Information">
            <p>SpeakEdge Inc. uses the collected data for various purposes:</p>
            <ul>
                <li>To provide and maintain our Service.</li>
                <li>To notify you about changes to our Service.</li>
                <li>To provide customer support.</li>
                <li>To gather analysis or valuable information so that we can improve our Service.</li>
                <li>To monitor the usage of our Service.</li>
                <li>To detect, prevent and address technical issues.</li>
            </ul>
          </InfoCard>

          <InfoCard icon={<FiLock className="text-brand-blue"/>} title="3. Data Security">
            <p>The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
          </InfoCard>

          <InfoCard icon={<FiUserCheck className="text-brand-blue"/>} title="4. Your Data Protection Rights">
            <p>You have certain data protection rights. SpeakEdge Inc. aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data. If you wish to be informed about what Personal Data we hold about you and if you want it to be removed from our systems, please contact us.</p>
          </InfoCard>

          <InfoCard icon={<FiUsers className="text-brand-blue"/>} title="5. Service Providers">
            <p>We may employ third-party companies and individuals to facilitate our Service ("Service Providers"), provide the Service on our behalf, perform Service-related services, or assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>
          </InfoCard>

          <InfoCard icon={<FiAlertTriangle className="text-brand-blue"/>} title="6. Children's Privacy">
            <p>Our Service does not address anyone under the age of 13 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your Child has provided us with Personal Data, please contact us.</p>
          </InfoCard>
          
          <InfoCard icon={<FiMail className="text-brand-blue"/>} title="7. Contact Us">
            <p>If you have any questions about this Privacy Policy, please <Link to="/contact" className="text-brand-blue hover:underline">contact us</Link>.</p>
          </InfoCard>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;
