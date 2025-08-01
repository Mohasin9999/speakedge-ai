import React, { useState, useEffect } from 'react';
import { FiUser, FiLock, FiBell, FiTrash2, FiCamera } from 'react-icons/fi';

// A simple toggle switch component
const ToggleSwitch = ({ label, enabled, setEnabled }) => (
    <label className="flex items-center justify-between cursor-pointer">
        <span className="text-gray-700 dark:text-gray-300">{label}</span>
        <div className="relative">
            <input type="checkbox" className="sr-only" checked={enabled} onChange={() => setEnabled(!enabled)} />
            <div className={`block w-14 h-8 rounded-full transition ${enabled ? 'bg-brand-blue' : 'bg-gray-200 dark:bg-gray-600'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${enabled ? 'translate-x-6' : ''}`}></div>
        </div>
    </label>
);


const SettingsPage = () => {
    const [user, setUser] = useState({ name: '', email: '', photo: '' });
    
    // State for form inputs
    const [profileData, setProfileData] = useState({ name: '', email: '' });
    const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
    const [notifications, setNotifications] = useState({ email: true, push: false });

    useEffect(() => {
        // Fetch user data from localStorage on component mount
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setProfileData({ name: parsedUser.name, email: parsedUser.email });
        }
    }, []);

    const handleProfileChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    // Placeholder for form submission logic
    const handleProfileSave = (e) => {
        e.preventDefault();
        // Here you would typically make an API call to update the user profile
        console.log('Saving profile:', profileData);
        alert('Profile updated successfully! (Simulation)');
    };

    const handlePasswordSave = (e) => {
        e.preventDefault();
        if (passwordData.new !== passwordData.confirm) {
            alert("New passwords do not match.");
            return;
        }
        // API call to change password
        console.log('Changing password...');
        alert('Password changed successfully! (Simulation)');
        setPasswordData({ current: '', new: '', confirm: '' });
    };

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>

            <div className="space-y-10 max-w-4xl mx-auto">
                {/* Profile Settings */}
                <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center"><FiUser className="mr-3 text-brand-blue"/> Profile Information</h2>
                    <form onSubmit={handleProfileSave} className="space-y-6">
                        <div className="flex items-center space-x-6">
                            <div className="relative">
                                <img src={user.photo || 'https://placehold.co/100x100/E9D5FF/3730A3?text=U'} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
                                <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-brand-blue p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                                    <FiCamera className="w-4 h-4 text-white"/>
                                    <input id="photo-upload" type="file" className="hidden" />
                                </label>
                            </div>
                            <div className="flex-grow">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                    <input type="text" name="name" id="name" value={profileData.name} onChange={handleProfileChange} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                </div>
                            </div>
                        </div>
                         <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                            <input type="email" name="email" id="email" value={profileData.email} onChange={handleProfileChange} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                        </div>
                        <div className="text-right">
                            <button type="submit" className="bg-brand-blue text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700">Save Changes</button>
                        </div>
                    </form>
                </div>

                {/* Security Settings */}
                <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center"><FiLock className="mr-3 text-brand-blue"/> Security</h2>
                    <form onSubmit={handlePasswordSave} className="space-y-4">
                        <div>
                            <label htmlFor="current" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
                            <input type="password" name="current" id="current" value={passwordData.current} onChange={handlePasswordChange} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="new" className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                                <input type="password" name="new" id="new" value={passwordData.new} onChange={handlePasswordChange} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            </div>
                            <div>
                                <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
                                <input type="password" name="confirm" id="confirm" value={passwordData.confirm} onChange={handlePasswordChange} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            </div>
                        </div>
                        <div className="text-right">
                            <button type="submit" className="bg-brand-blue text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700">Change Password</button>
                        </div>
                    </form>
                </div>
                
                {/* Notification Settings */}
                <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center"><FiBell className="mr-3 text-brand-blue"/> Notifications</h2>
                    <div className="space-y-4">
                        <ToggleSwitch label="Email Notifications" enabled={notifications.email} setEnabled={(val) => setNotifications({...notifications, email: val})} />
                        <ToggleSwitch label="Push Notifications" enabled={notifications.push} setEnabled={(val) => setNotifications({...notifications, push: val})} />
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md border-t-4 border-red-500">
                    <h2 className="text-xl font-bold text-red-600 dark:text-red-500 mb-4 flex items-center"><FiTrash2 className="mr-3"/> Danger Zone</h2>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-gray-800 dark:text-white">Delete your account</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Once you delete your account, there is no going back.</p>
                        </div>
                        <button className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600">Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
