import React from 'react';
import { FiMapPin, FiMail, FiPhone, FiSend } from 'react-icons/fi';

const ContactPage = () => {
  return (
    <div className="bg-white dark:bg-dark-bg text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-brand-blue to-green-400 pt-32 pb-24 text-center text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold">Get in Touch</h1>
          <p className="mt-4 text-lg text-white/90">
            We'd love to hear from you. Please fill out the form below or contact us directly.
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <main className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            
            {/* Contact Form */}
            <div className="bg-light-gray dark:bg-dark-surface p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                    <input type="text" id="name" name="name" required className="w-full px-4 py-2 bg-white dark:bg-dark-bg border border-gray-300 dark:border-gray-600 rounded-md focus:ring-brand-blue focus:border-brand-blue" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                    <input type="email" id="email" name="email" required className="w-full px-4 py-2 bg-white dark:bg-dark-bg border border-gray-300 dark:border-gray-600 rounded-md focus:ring-brand-blue focus:border-brand-blue" />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                  <input type="text" id="subject" name="subject" required className="w-full px-4 py-2 bg-white dark:bg-dark-bg border border-gray-300 dark:border-gray-600 rounded-md focus:ring-brand-blue focus:border-brand-blue" />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                  <textarea id="message" name="message" rows="5" required className="w-full px-4 py-2 bg-white dark:bg-dark-bg border border-gray-300 dark:border-gray-600 rounded-md focus:ring-brand-blue focus:border-brand-blue"></textarea>
                </div>
                <div>
                  <button type="submit" className="w-full flex items-center justify-center bg-brand-blue text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                    <FiSend className="mr-2" />
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Info & Map */}
            <div className="space-y-8">
                <div className="bg-light-gray dark:bg-dark-surface p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
                    <div className="space-y-4">
                        <div className="flex items-start">
                            <FiMapPin className="w-6 h-6 text-brand-blue mt-1 mr-4 flex-shrink-0"/>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">Our Office</h3>
                                <p className="text-gray-600 dark:text-gray-400">Plot # 15, Dhaka 1229</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <FiMail className="w-6 h-6 text-brand-blue mt-1 mr-4 flex-shrink-0"/>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">Email Us</h3>
                                <a href="mailto:contact@speakedge.com" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue">contact@speakedge.com</a>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <FiPhone className="w-6 h-6 text-brand-blue mt-1 mr-4 flex-shrink-0"/>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">Call Us</h3>
                                <a href="tel:+1234567890" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue">+1 (234) 567-890</a>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Embedded Map */}
                <div className="rounded-lg shadow-lg overflow-hidden h-80">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13008.013882844627!2d90.42656201407989!3d23.809694173834444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c64c103a8093%3A0xd660a4f50365294a!2sNorth%20South%20University!5e0!3m2!1sen!2sbd!4v1754023638763!5m2!1sen!2sbd"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="Google Maps Location"
                    ></iframe>
                </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
