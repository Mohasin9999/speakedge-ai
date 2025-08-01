import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; // Import useTheme
import { FiHome, FiMic, FiBarChart2, FiSettings, FiLogOut, FiMoon, FiSun,FiMessageCircle,FiGift } from 'react-icons/fi';

// Import your logo assets
import logoWhite from '../assets/speakedge_logo_white.png';
import logoBlack from '../assets/speakedge_logo.png';

const DashboardSidebar = () => {
    const { theme, toggleTheme } = useTheme(); // Get theme and toggle function

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('storage'));
        window.location.href = '/';
    };

    const navLinkClasses = "flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors";
    const activeLinkClasses = "bg-brand-blue text-white dark:bg-green-400 dark:text-black";

    return (
        <aside className="w-64 bg-white dark:bg-dark-surface p-6 flex flex-col h-screen border-r border-gray-200 dark:border-gray-700">
            <div className="mb-8">
                <Link to="/">
                    {/* MODIFIED: Logo now changes based on theme */}
                    <img 
                        src={theme === 'dark' ? logoWhite : logoBlack} 
                        alt="SpeakEdge Logo" 
                        className="h-16 w-auto"
                    />
                </Link>
            </div>

            <nav className="flex-grow">
                <ul className="space-y-2">
                    <li>
                        <NavLink to="/dashboard/overview" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
                            <FiHome className="mr-3" />
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/chat" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
                            <FiMessageCircle className="mr-3" />
                            Chat
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/speak" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
                            <FiMic className="mr-3" />
                            Start Speaking
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/recordings" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
                            <FiBarChart2 className="mr-3" />
                            My Progress
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/achivements" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
                            <FiGift className="mr-3" />
                            Achievement
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/settings" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
                            <FiSettings className="mr-3" />
                            Settings
                        </NavLink>
                    </li>
                </ul>
            </nav>

            {/* MODIFIED: Added Theme toggle button */}
            <div className="space-y-2">
                 <button onClick={toggleTheme} className={`${navLinkClasses} w-full`}>
                    {theme === 'light' ? <FiMoon className="mr-3" /> : <FiSun className="mr-3" />}
                    <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                </button>
                <button onClick={handleLogout} className={`${navLinkClasses} w-full`}>
                    <FiLogOut className="mr-3" />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default DashboardSidebar;
