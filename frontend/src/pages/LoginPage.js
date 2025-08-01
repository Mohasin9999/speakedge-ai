import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Assets
import illustrationWoman from '../assets/illustration_woman.png';
import aiBubble from '../assets/ai_bubble.png';
import ieltsBubble from '../assets/ielts_bubble.jpeg';
import waves from '../assets/waves.png';
import mic from '../assets/mic.png';

// Icons
import { FaRegEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { BsGrid3X3GapFill } from 'react-icons/bs';
import { FiLogIn } from 'react-icons/fi';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        const loginCredentials = { email, password };

        try {
            const response = await fetch('http://localhost:5001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginCredentials),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || `HTTP error! Status: ${response.status}`);
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify({
                _id: data._id,
                name: data.name,
                email: data.email,
                photo: data.photo
            }));
            
            window.dispatchEvent(new Event('storage'));
            navigate('/');

        } catch (err) {
            console.error('Login failed:', err);
            setError(err.message || 'An unexpected error occurred during login.');
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-brand-blue to-green-400 dark:from-slate-900 dark:via-slate-800 dark:to-dark-bg font-sans flex flex-col items-center justify-center antialiased">
            <main className="flex flex-grow items-center justify-center py-10 px-4 md:px-8 lg:px-12 w-full">
                <div className="w-full max-w-6xl flex items-center justify-center">
                    {/* Illustration Section (from your original code) */}
                    <div className="hidden md:flex flex-1 justify-center items-center pr-8 lg:pr-16">
                        <div className="relative w-96 h-96 bg-white/30 dark:bg-black/20 backdrop-blur-lg rounded-2xl flex justify-center items-center shadow-lg transform rotate-3 scale-95 transition-all duration-300 ease-in-out hover:rotate-0 hover:scale-100 border border-white/20">
                            <img src={illustrationWoman} alt="Student illustration" className="relative z-10 w-64 h-auto object-contain" />
                            <img src={aiBubble} alt="AI" className="absolute top-8 left-8 w-16 h-auto rounded-md shadow-md transform -rotate-12 hover:scale-105 transition-transform" />
                            <img src={ieltsBubble} alt="IELTS" className="absolute top-12 right-12 w-16 h-auto rounded-md shadow-md transform rotate-12 hover:scale-105 transition-transform" />
                            <img src={waves} alt="Chat" className="absolute bottom-10 left-10 w-24 h-auto shadow-md hover:scale-105 transition-transform" />
                            <img src={mic} alt="Mic" className="absolute bottom-8 right-8 w-24 h-auto shadow-md transform -rotate-6 hover:scale-105 transition-transform" />
                            <div className="absolute -top-4 -left-4 w-6 h-6 bg-pink-300 rounded-full animate-pulse dark:bg-pink-600" style={{animationDelay: '0.2s'}}></div>
                            <div className="absolute top-1/4 right-0 w-4 h-4 bg-blue-300 rounded-full animate-pulse dark:bg-blue-600" style={{animationDelay: '0.4s'}}></div>
                            <div className="absolute bottom-0 left-1/3 w-5 h-5 bg-green-300 rounded-full animate-pulse dark:bg-green-600" style={{animationDelay: '0.6s'}}></div>
                        </div>
                    </div>

                    {/* Login Form Section (from your original code, with updated colors) */}
                    <div className="w-full md:w-auto flex-1 max-w-md">
                        <div className="relative bg-white dark:bg-dark-surface p-8 md:p-10 rounded-xl border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden">
                            <BsGrid3X3GapFill className="absolute top-4 left-4 text-gray-300 dark:text-gray-600 text-2xl" />
                            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 mt-4 md:mt-0 text-center md:text-left">
                                Welcome back <span className="ml-2">👋</span>
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-8 text-center md:text-left">Log in to your account</p>

                            {error && (
                                <p className="bg-red-100 text-red-700 border border-red-300 p-3 rounded-lg text-sm text-center mb-6 dark:bg-red-900/20 dark:text-red-300 dark:border-red-500/30">
                                    {error}
                                </p>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="relative">
                                    <FaRegEnvelope className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={loading}
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-blue dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-brand-blue"
                                    />
                                </div>
                                <div className="relative">
                                    <FaLock className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={loading}
                                        className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-blue dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-brand-blue"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => !loading && setShowPassword(!showPassword)}
                                        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <label className="flex items-center text-gray-600 dark:text-gray-300 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            disabled={loading}
                                            className="mr-2 text-brand-blue focus:ring-brand-blue rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-brand-blue"
                                        />
                                        Remember me
                                    </label>
                                    <Link to="/forgot-password" className="text-brand-blue hover:underline font-semibold">
                                        Forgot password?
                                    </Link>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-brand-blue text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 transition-all duration-300 flex items-center justify-center disabled:opacity-70"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Logging in...
                                        </>
                                    ) : (
                                        <>
                                            <FiLogIn className="mr-2" /> Continue
                                        </>
                                    )}
                                </button>
                            </form>
                            <p className="text-center text-gray-600 text-sm mt-8 dark:text-gray-400">
                                Don't have an account? <Link to="/signup" className="text-brand-blue font-bold hover:underline">Sign up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;
