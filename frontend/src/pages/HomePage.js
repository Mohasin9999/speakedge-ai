import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import icons for features
import { FiMic, FiMessageCircle, FiBarChart2, FiAward, FiArrowRight, FiZap, FiTrendingUp } from 'react-icons/fi';

// Import the newly created component
import ReviewCarousel from '../components/ReviewCarousel'; 

// SVG logos for the technology section
import ieltsLogoPng from '../assets/tech/ielts.png';
import geminiLogoPng from '../assets/tech/gemini.png';
import chatgptLogoPng from '../assets/tech/chatgpt.png';
import huggingfaceLogoPng from '../assets/tech/huggingface.png';
import metaLogoPng from '../assets/tech/meta.png';


// Floating UI element for the hero section
const FloatingUI = () => (
    <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20 w-48 h-64 shadow-lg">
        <div className="w-full h-3 bg-white/20 rounded-full mb-4"></div>
        <div className="w-3/4 h-3 bg-white/20 rounded-full mb-2"></div>
        <div className="w-1/2 h-3 bg-white/20 rounded-full mb-6"></div>
        <div className="w-full h-8 bg-green-400/50 rounded-lg mb-2"></div>
        <div className="w-full h-8 bg-white/20 rounded-lg"></div>
    </div>
);

const WhisperLogo = () => (
  <svg className="h-10 w-auto" viewBox="0 0 150 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="25" fontFamily="Arial, sans-serif" fontSize="30" fontWeight="bold" fill="currentColor">Whisper</text>
  </svg>
);

const HomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                setIsLoggedIn(true);
            }
        }
    }, []);
    
    const logos = [
        { src: ieltsLogoPng, alt: 'IELTS Logo', height: 'h-8' },
        { src: geminiLogoPng, alt: 'Gemini Logo', height: 'h-10' },
        { src: chatgptLogoPng, alt: 'ChatGPT Logo', height: 'h-8' },
        { component: <WhisperLogo />, alt: 'Whisper Logo' },
        { src: huggingfaceLogoPng, alt: 'Hugging Face Logo', height: 'h-10' },
        {src: metaLogoPng, alt: 'Meta Logo', height: 'h-10'},
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-brand-blue to-green-400 dark:from-slate-900 dark:via-slate-800 dark:to-dark-bg text-white overflow-hidden">
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-blue/30 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-green-400/30 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
                <div className="container mx-auto px-6 py-32 md:py-40 relative z-10">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-black leading-tight">
                                Unlock Your English Speaking Potential with AI
                            </h1>
                            <p className="mt-4 text-lg text-slate-300">
                                Practice conversations, get real-time feedback, and track your progress to speak fluently and confidently.
                            </p>
                            <Link to={isLoggedIn ? "/dashboard" : "/login"}>
                                <button className="mt-8 bg-brand-blue font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg">
                                    Start Your Free Trial
                                </button>
                            </Link>
                        </div>
                        <div className="relative hidden md:block h-80">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2"><FloatingUI /></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* "How It Works" Section */}
            <section className="py-20 bg-light-gray dark:bg-dark-surface -mt-20 rounded-t-3xl relative z-10">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* How It Works */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">How It Works</h3>
                            <div className="space-y-4">
                                <div className="bg-white dark:bg-dark-bg p-6 rounded-lg shadow-md border-l-4 border-brand-blue transform hover:scale-105 transition-transform duration-300">
                                    <h4 className="font-bold text-gray-800 dark:text-gray-200">1. Start a Conversation</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Choose from dozens of real-world scenarios.</p>
                                </div>
                                <div className="bg-white dark:bg-dark-bg p-6 rounded-lg shadow-md border-l-4 border-gray-300 dark:border-gray-600 transform hover:scale-105 transition-transform duration-300">
                                    <h4 className="font-bold text-gray-800 dark:text-gray-200">2. Get Instant Feedback</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Our AI analyzes your speech in real-time.</p>
                                </div>
                                <div className="bg-white dark:bg-dark-bg p-6 rounded-lg shadow-md border-l-4 border-gray-300 dark:border-gray-600 transform hover:scale-105 transition-transform duration-300">
                                    <h4 className="font-bold text-gray-800 dark:text-gray-200">3. Track Your Progress</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Watch your fluency and confidence grow.</p>
                                </div>
                            </div>
                        </div>
                        {/* Key Features */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Features</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white dark:bg-dark-bg p-4 text-center rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"><FiMic className="mx-auto text-brand-blue mb-2" size={24}/><p className="font-semibold text-sm text-gray-700 dark:text-gray-300">Pronunciation</p></div>
                                <div className="bg-white dark:bg-dark-bg p-4 text-center rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"><FiMessageCircle className="mx-auto text-brand-blue mb-2" size={24}/><p className="font-semibold text-sm text-gray-700 dark:text-gray-300">Intonation</p></div>
                                <div className="bg-white dark:bg-dark-bg p-4 text-center rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"><FiBarChart2 className="mx-auto text-brand-blue mb-2" size={24}/><p className="font-semibold text-sm text-gray-700 dark:text-gray-300">Fluency</p></div>
                                <div className="bg-white dark:bg-dark-bg p-4 text-center rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"><FiZap className="mx-auto text-brand-blue mb-2" size={24}/><p className="font-semibold text-sm text-gray-700 dark:text-gray-300">Pacing</p></div>
                                <div className="bg-white dark:bg-dark-bg p-4 text-center rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"><FiTrendingUp className="mx-auto text-brand-blue mb-2" size={24}/><p className="font-semibold text-sm text-gray-700 dark:text-gray-300">Progress</p></div>
                                <div className="bg-white dark:bg-dark-bg p-4 text-center rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"><FiAward className="mx-auto text-brand-blue mb-2" size={24}/><p className="font-semibold text-sm text-gray-700 dark:text-gray-300">Confidence</p></div>
                            </div>
                        </div>
                        {/* Pricing Tiers */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Pricing Tiers</h3>
                            <div className="space-y-4">
                                <div className="bg-white dark:bg-dark-bg p-4 flex justify-between items-center rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"><div><h4 className="font-bold text-gray-800 dark:text-gray-200">Basic</h4><p className="text-sm text-gray-600 dark:text-gray-400">Free forever</p></div><Link to="/pricing" className="text-brand-blue font-bold text-sm">View <FiArrowRight className="inline"/></Link></div>
                                <div className="bg-white dark:bg-dark-bg p-4 flex justify-between items-center rounded-lg shadow-lg border-2 border-brand-blue transform hover:scale-105 transition-transform duration-300"><div><h4 className="font-bold text-brand-blue dark:text-green-400">Premium</h4><p className="text-sm text-gray-600 dark:text-gray-400">$15.00 / month</p></div><Link to="/pricing" className="text-brand-blue font-bold text-sm">View <FiArrowRight className="inline"/></Link></div>
                                <div className="bg-white dark:bg-dark-bg p-4 flex justify-between items-center rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"><div><h4 className="font-bold text-gray-800 dark:text-gray-200">Enterprise</h4><p className="text-sm text-gray-600 dark:text-gray-400">Contact Us</p></div><Link to="/pricing" className="text-brand-blue font-bold text-sm">View <FiArrowRight className="inline"/></Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Powered by Technology Section */}
            <section className="py-16 bg-white dark:bg-dark-bg">
                <div className="container mx-auto px-6">
                    <h3 className="text-center text-lg font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-8">
                        Powered By The Best AI Technology
                    </h3>
                    <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
                        <div className="flex w-[calc(200%+8rem)] animate-scroll">
                            {[...Array(2)].map((_, i) => (
                                <div key={i} className="flex-shrink-0 flex justify-around w-full items-center space-x-16">
                                    {logos.map((logo, index) => (
                                        <div key={index} className="text-gray-500 dark:text-gray-400">
                                            {logo.src ? (
                                                <img src={logo.src} alt={logo.alt} className={`${logo.height} w-auto`} />
                                            ) : (
                                                logo.component
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* User Reviews Section - NOW DYNAMIC */}
            <section className="py-16 md:py-24 bg-light-gray dark:bg-dark-surface">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 text-center dark:text-white">What Our Community Says</h2>
                    <p className="text-base sm:text-lg text-gray-600 mb-12 max-w-2xl mx-auto text-center dark:text-gray-300">
                        Hear from learners who have transformed their English skills with SpeakEdge.
                    </p>
                    {/* Just call the component here */}
                    <ReviewCarousel />
                </div>
            </section>
        </>
    );
};

export default HomePage;
