import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const Header = ({ userPhoto, isLoggedIn }) => {
  return (
    <header className="flex justify-between items-center px-6 text-white shadow-lg">
      {/* Logo and Navigation */}
      <div className="flex items-center space-x-6">
        <img src="image/logo.png" alt="Logo" className="w-48 object-contain" /> {/* Logo Size */}
        <nav className="flex space-x-8 text-lg"> {/* Text Size for Navigation Links */}
          <Link to="/" className="text-accent hover:text-secondary transition duration-300">Home</Link>
          <Link to="/PricingPage" className="text-accent hover:text-secondary transition duration-300">Pricing</Link>
          <Link to="/RadarChart" className="text-accent hover:text-secondary transition duration-300"> Status</Link>
          <Link to="/contact" className="text-accent hover:text-secondary transition duration-300">Contact Us</Link>

        </nav>
      </div>

      {/* User photo or Default Icon */}
      <div className="flex items-center justify-center w-14 h-14 rounded-full overflow-hidden border-2 border-white">
        {isLoggedIn ? (
          <Link to="/profile">  {/* Link to user profile if logged in */}
            <img
              src={userPhoto}
              alt="User"
              className="object-cover w-full h-full"
            />
          </Link>
        ) : (
          <Link to="/login">  {/* Link to login page if not logged in */}
            <FaUser className="text-accent w-full h-full" />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
