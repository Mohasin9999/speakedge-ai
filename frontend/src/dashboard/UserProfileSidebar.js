import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import the Link component
import { FiEdit2 } from 'react-icons/fi';
// Import the shared default image from your data file
import { defaultUserImage } from './data';

// The component receives user and achievements as props from the parent (DashboardOverviewPage)
const UserProfileSidebar = ({ user, achievements }) => {
    // If user data hasn't loaded yet, show a placeholder
    if (!user) {
        return (
            <aside className="w-80 bg-white dark:bg-dark-surface p-6 h-screen border-l border-gray-200 dark:border-gray-700 hidden lg:block">
                <div className="animate-pulse">
                    <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 mx-auto mt-4"></div>
                </div>
            </aside>
        );
    }

    return (
        <aside className="w-80 bg-white dark:bg-dark-surface p-6 h-screen border-l border-gray-200 dark:border-gray-700 hidden lg:flex flex-col">
            {/* Profile Section */}
            <div className="text-center">
                <div className="relative inline-block">
                    <img
                        src={user.photo || defaultUserImage}
                        alt={user.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-brand-blue"
                    />
                    {/* 2. Wrap the button with the Link component */}
                    <Link to="/dashboard/settings" className="absolute bottom-0 right-0">
                        <div className="bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                            <FiEdit2 className="w-4 h-4 text-gray-600 dark:text-gray-300"/>
                        </div>
                    </Link>
                </div>
                <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>

            {/* Achievements Section */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4">Achievements Unlocked</h3>
                <div className="grid grid-cols-3 gap-4">
                    {achievements.map(ach => (
                        <div 
                            key={ach.id} 
                            className={`p-3 rounded-lg flex flex-col items-center justify-center text-center transition-opacity ${
                                ach.unlocked ? 'bg-green-100 dark:bg-green-500/20 opacity-100' : 'bg-gray-100 dark:bg-gray-700 opacity-50'
                            }`}
                            title={ach.name}
                        >
                            <span className="text-3xl">{ach.icon}</span>
                            <p className="text-xs mt-1 font-semibold text-gray-700 dark:text-gray-300">{ach.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default UserProfileSidebar;
