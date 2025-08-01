import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FiMoon, FiSun, FiMenu, FiX } from 'react-icons/fi';
import logoWhite from '../assets/speakedge_logo_white.png';

// This is a fallback user image. Replace with a default placeholder if you have one.
const defaultUserImage = 'https://placehold.co/100x100/E9D5FF/3730A3?text=U';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // State for managing the mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // State for storing user data from localStorage
  const [user, setUser] = useState(null);

  // This effect runs when the component mounts and whenever the 'storage' event is fired.
  // It checks localStorage to see if a user is logged in.
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to parse user data from localStorage", error);
        setUser(null);
      }
    };

    // Initial check
    handleStorageChange();

    // Listen for the custom 'storage' event dispatched on login/logout
    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Contact', path: '/contact' },
  ];

  // Determine if the login button should be shown
  const showLoginButton = !user && location.pathname !== '/login';

  return (
    <>
      <header className="absolute top-0 left-0 w-full z-20 p-6">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 z-30">
            {/* Assuming you have a logo file. If not, you can use text. */}
            <img 
              src={logoWhite}
              alt="SpeakEdge Logo" 
              className="h-16 w-auto" 
            />
          </Link>
          
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => (
              <Link key={link.name} to={link.path} className="text-white hover:text-gray-200">
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right-side actions: Theme Toggle, User Info/Login, Hamburger Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="text-white text-xl p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <FiMoon /> : <FiSun />}
            </button>

            {/* User Info or Login Button for Desktop */}
            <div className="hidden md:flex items-center">
              {user ? (
                <Link to="/dashboard" className="flex items-center space-x-3">
                  <img 
                    src={user.photo || defaultUserImage} 
                    alt={user.name} 
                    className="w-10 h-10 rounded-full object-cover border-2 border-white/50"
                  />
                  <span className="text-white font-semibold">{user.name}</span>
                </Link>
              ) : (
                showLoginButton && (
                  <Link 
                    to="/login" 
                    className="bg-white text-brand-blue font-semibold px-6 py-2 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    Login
                  </Link>
                )
              )}
            </div>

            {/* Hamburger Menu Button */}
            <div className="md:hidden z-30">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white text-2xl">
                {isMenuOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden fixed inset-0 bg-brand-blue/95 backdrop-blur-lg z-20 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full space-y-8 text-2xl">
          {navLinks.map(link => (
            <Link key={link.name} to={link.path} className="text-white hover:text-green-300">
              {link.name}
            </Link>
          ))}
          
          {/* User Info or Login Button for Mobile */}
          <div className="pt-8">
            {user ? (
              <Link to="/dashboard" className="flex flex-col items-center space-y-3">
                <img 
                  src={user.photo || defaultUserImage} 
                  alt={user.name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/50"
                />
                <span className="text-white font-semibold text-xl">{user.name}</span>
              </Link>
            ) : (
              showLoginButton && (
                <Link 
                  to="/login" 
                  className="bg-white text-brand-blue font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition-colors"
                >
                  Login
                </Link>
              )
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
