import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserAlt, FaLock, FaEnvelope } from 'react-icons/fa';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
    } else {
      // Handle form submission logic here
      console.log('Form Submitted:', formData);
      setError('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-center text-3xl font-dancingScript mb-6 text-primary">Sign Up</h2>
        
        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <div className="flex items-center mt-2 border border-gray-300 rounded-lg px-4 py-2">
              <FaUserAlt className="text-gray-500 mr-3" />
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full focus:outline-none"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <div className="flex items-center mt-2 border border-gray-300 rounded-lg px-4 py-2">
              <FaEnvelope className="text-gray-500 mr-3" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="flex items-center mt-2 border border-gray-300 rounded-lg px-4 py-2">
              <FaLock className="text-gray-500 mr-3" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full focus:outline-none"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="flex items-center mt-2 border border-gray-300 rounded-lg px-4 py-2">
              <FaLock className="text-gray-500 mr-3" />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full focus:outline-none"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Submit Button */}
          <button type="submit" className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition duration-300">
            Sign Up
          </button>
        </form>

        {/* Already have an account? Link to login */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
