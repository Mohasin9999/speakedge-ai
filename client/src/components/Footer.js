import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-accent text-white p-6 mt-12">
      <div className="container mx-auto flex justify-between">
        <nav className="space-x-6">
          <a href="/AboutUsPage" className="hover:text-primary">About Us</a>
          <a href="/privacy" className="hover:text-primary">Privacy Policy</a>
          <a href="/terms" className="hover:text-primary">Terms & Conditions</a>
        </nav>
        <p className="text-sm">© 2025 NSU 499A.AZK. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
