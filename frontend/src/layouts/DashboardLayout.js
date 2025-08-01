import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DashboardSidebar from '../dashboard/DashboardSidebar';
import { FiMenu, FiChevronDown } from 'react-icons/fi';
// Import the shared data
import { achievementsData, defaultUserImage } from '../dashboard/data';

// MobileUserDropdown now receives data as props
const MobileUserDropdown = ({ user, achievements }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) { document.addEventListener('mousedown', handleClickOutside); }
        return () => { document.removeEventListener('mousedown', handleClickOutside); };
    }, [isOpen]);

    if (!user) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2">
                <img src={user.photo || defaultUserImage} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                <span className="font-semibold text-gray-700 dark:text-gray-200 hidden sm:block">{user.name}</span>
                <FiChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`absolute right-0 mt-2 w-64 sm:w-72 bg-white dark:bg-dark-surface rounded-lg shadow-xl border dark:border-gray-700 p-4 z-50 transition-all duration-200 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4">Achievements Unlocked</h3>
                <div className="grid grid-cols-3 gap-4">
                    {achievements.map(ach => (
                        <div key={ach.id} className={`p-3 rounded-lg flex flex-col items-center justify-center text-center transition-opacity ${ach.unlocked ? 'bg-green-100 dark:bg-green-500/20' : 'bg-gray-100 dark:bg-gray-700 opacity-50'}`} title={ach.name}>
                            <span className="text-2xl">{ach.icon}</span>
                            <p className="text-xs mt-1 font-semibold text-gray-700 dark:text-gray-300 truncate">{ach.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    // In a real app, achievements would be fetched along with the user data
    const [achievements, setAchievements] = useState([]);
    const location = useLocation();

    // This effect runs ONCE in the layout to fetch all necessary shared data.
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        // Simulate fetching achievement data
        setAchievements(achievementsData);
    }, []);

    useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    return (
        <div className="flex bg-light-gray dark:bg-dark-bg h-screen overflow-hidden">
            <div className="hidden lg:flex lg:flex-shrink-0"><DashboardSidebar /></div>

            {sidebarOpen && (
                <>
                    <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} aria-hidden="true"></div>
                    <div className="fixed inset-y-0 left-0 flex z-40 lg:hidden"><div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-dark-surface"><DashboardSidebar /></div></div>
                </>
            )}

            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                <div className="lg:hidden sticky top-0 z-20 flex-shrink-0 flex h-16 bg-white dark:bg-dark-surface shadow items-center justify-between px-4">
                    <button type="button" className="text-gray-500 dark:text-gray-400" onClick={() => setSidebarOpen(true)}>
                        <span className="sr-only">Open sidebar</span>
                        <FiMenu className="h-6 w-6" />
                    </button>
                    {/* Pass the fetched data down to the mobile dropdown */}
                    <MobileUserDropdown user={user} achievements={achievements} />
                </div>
                
                <main className="flex-1 relative overflow-y-auto focus:outline-none">
                    {/* Pass the fetched data down to the child pages (e.g., Overview) via context */}
                    <Outlet context={{ user, achievements }} />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
