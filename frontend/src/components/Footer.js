import React from "react";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-dark-surface py-12">
      <div className="container mx-auto px-6 text-center text-gray-600 dark:text-gray-400">
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-brand-blue dark:hover:text-white"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-brand-blue dark:hover:text-white"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-brand-blue dark:hover:text-white"
          >
            <FaInstagram size={24} />
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} SpeakEdge. All rights reserved.</p>
        <p className="text-sm mt-2">
          <Link to="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link to="/terms" className="hover:underline">
            Terms of Service
          </Link>
          {/*  */}{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
