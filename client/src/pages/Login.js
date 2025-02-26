import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Basic form submission handler (could be expanded with validation)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login functionality (e.g., API call for authentication)
    console.log('Logging in with:', { email, password });
  };

  return (
    <div>
      {/* Header */}

      {/* Login Form */}
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
          {/* Title */}
          <h1 className="text-center text-4xl font-bold text-accent mb-6" style={{ fontFamily: 'Dancing Script, cursive' }}>
            Login
          </h1>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-accent text-lg font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg border border-accent focus:outline-none focus:ring-2 focus:ring-secondary text-accent"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-accent text-lg font-medium mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-lg border border-accent focus:outline-none focus:ring-2 focus:ring-secondary text-accent"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 mt-4 text-white bg-primary rounded-lg hover:bg-secondary transition duration-300"
            >
              Login
            </button>
          </form>

          {/* Sign Up and Forgot Password Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-accent">
              Don't have an account?{' '}
              <Link to="/signup" className="text-secondary font-medium hover:text-primary transition duration-300">
                Sign Up
              </Link>
            </p>
            <p className="text-sm text-accent mt-2">
              <Link to="/forgot-password" className="text-secondary font-medium hover:text-primary transition duration-300">
                Forgot Password?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;