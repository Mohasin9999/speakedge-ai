import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        // --- API Call Simulation ---
        // In a real application, you would make an API call here.
        try {
            console.log('Sending password reset link to:', email);
            // Simulate a network delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Simulate a successful response
            setMessage('If an account with that email exists, a password reset link has been sent.');
            setSubmitted(true);

        } catch (err) {
            setError('Failed to send reset link. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-brand-blue to-green-400 font-sans flex flex-col items-center justify-center antialiased p-4">
            <div className="w-full max-w-md">
                <div className="relative bg-white dark:bg-dark-surface p-8 md:p-10 rounded-xl shadow-2xl">
                    
                    {!submitted ? (
                        <>
                            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 text-center">
                                Forgot Password?
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
                                No worries, we'll send you reset instructions.
                            </p>

                            {error && (
                                <p className="bg-red-100 text-red-700 border border-red-300 p-3 rounded-lg text-sm text-center mb-6 dark:bg-red-900/20 dark:text-red-300 dark:border-red-500/30">
                                    {error}
                                </p>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="relative">
                                    <FiMail className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={loading}
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-blue dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-brand-blue text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 transition-all duration-300 flex items-center justify-center disabled:opacity-70"
                                    disabled={loading}
                                >
                                    {loading ? 'Sending...' : 'Send Reset Link'}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center">
                            <FiCheckCircle className="mx-auto text-5xl text-green-500 mb-4" />
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Check your email</h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">{message}</p>
                        </div>
                    )}

                    <div className="text-center mt-8">
                        <Link to="/login" className="text-sm font-semibold text-brand-blue hover:underline flex items-center justify-center">
                            <FiArrowLeft className="mr-2" />
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
