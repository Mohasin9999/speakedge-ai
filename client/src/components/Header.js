import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser)); // Ensure proper parsing
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  console.log("User data:", user); // Debugging: Check if user data is being retrieved

  return (
    <header className="flex justify-between items-center px-6 text-white shadow-lg">
      <div className="flex items-center space-x-6">
        <img src="/image/logo.png" alt="Logo" className="w-48 object-contain" />
        <nav className="flex space-x-8 text-lg">
          <Link to="/" className="text-accent hover:text-secondary transition duration-300">Home</Link>
          <Link to="/PricingPage" className="text-accent hover:text-secondary transition duration-300">Pricing</Link>
          <Link to="/contact" className="text-accent hover:text-secondary transition duration-300">Contact Us</Link>
        </nav>
      </div>

      {user ? (
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="flex items-center space-x-2">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white flex items-center justify-center bg-gray-200">
              {user.photo ? (
                <img
                  src={user.photo}
                  alt="User"
                  className="object-cover w-full h-full"
                />
              ) : (
                <FaUser className="text-accent w-8 h-8" />
              )}
            </div>
            <span className="text-accent font-medium text-lg">{user.name || "User"}</span>
          </Link>
        </div>
      ) : (
        <Link to="/login" className="flex items-center space-x-2">
          <FaUser className="text-accent w-8 h-8" />
          <span className="text-accent font-medium text-lg">Login</span>
        </Link>
      )}
    </header>
  );
};

export default Header;
