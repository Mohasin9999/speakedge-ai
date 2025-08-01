import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom'; // Import hook to receive context
import UserProfileSidebar from './UserProfileSidebar';
import { FiCheckCircle, FiClock, FiTarget, FiAward } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
// Import the shared data
import { dashboardData } from './data';

const DashboardOverviewPage = () => {
    // Receive user and achievements from the parent layout via context
    const { user, achievements } = useOutletContext();
    const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

    useEffect(() => {
        const observer = new MutationObserver(() => setIsDark(document.documentElement.classList.contains('dark')));
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    if (!user) {
        return <div className="p-4 md:p-8">Loading...</div>;
    }

    const dailyGoalProgress = (dashboardData.dailyGoal.completed / dashboardData.dailyGoal.total) * 100;

    return (
        <div className="flex h-full">
            <div className="flex-grow p-4 sm:p-6 md:p-8 overflow-y-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back, {user.name}!</p>
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">
                    {/* Left Column: Scores and Progress */}
                    <div className="xl:col-span-2 space-y-8">
                        <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Last Speech Score</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                <div className="p-4 bg-blue-100 dark:bg-blue-500/20 rounded-lg"><p className="text-3xl font-bold text-brand-blue">{dashboardData.lastSpeechScore.overall}</p><p className="text-sm font-semibold text-blue-800 dark:text-blue-300">Overall</p></div>
                                <div className="p-4 bg-green-100 dark:bg-green-500/20 rounded-lg"><p className="text-3xl font-bold text-green-600">{dashboardData.lastSpeechScore.pronunciation}</p><p className="text-sm font-semibold text-green-800 dark:text-green-300">Pronunciation</p></div>
                                <div className="p-4 bg-yellow-100 dark:bg-yellow-500/20 rounded-lg"><p className="text-3xl font-bold text-yellow-600">{dashboardData.lastSpeechScore.fluency}</p><p className="text-sm font-semibold text-yellow-800 dark:text-yellow-300">Fluency</p></div>
                                <div className="p-4 bg-purple-100 dark:bg-purple-500/20 rounded-lg"><p className="text-3xl font-bold text-purple-600">{dashboardData.lastSpeechScore.pacing}</p><p className="text-sm font-semibold text-purple-800 dark:text-purple-300">Pacing</p></div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Weekly Progress</h3>
                            <div className="h-64"><ResponsiveContainer width="100%" height="100%"><LineChart data={dashboardData.weeklyProgress} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} /><XAxis dataKey="day" stroke={isDark ? '#9ca3af' : '#6b7280'} /><YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} /><Tooltip contentStyle={{ backgroundColor: isDark ? '#1f2937' : '#ffffff', border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}` }} /><Legend /><Line type="monotone" dataKey="score" stroke="#4A00E0" strokeWidth={2} activeDot={{ r: 8 }} /></LineChart></ResponsiveContainer></div>
                        </div>
                    </div>

                    {/* Right Column: Daily Goal and Activity */}
                    <div className="xl:col-span-1 space-y-8">
                        <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md"><h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Daily Goal</h3><div className="flex items-center space-x-4"><div className="relative w-20 h-20"><svg className="w-full h-full" viewBox="0 0 36 36"><path className="text-gray-200 dark:text-gray-700" strokeWidth="3" fill="none" stroke="currentColor" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" /><path className="text-brand-blue" strokeWidth="3" fill="none" strokeLinecap="round" stroke="currentColor" strokeDasharray={`${dailyGoalProgress}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" /></svg><div className="absolute inset-0 flex items-center justify-center"><FiTarget className="text-brand-blue" size={24} /></div></div><div><p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{dashboardData.dailyGoal.completed} / {dashboardData.dailyGoal.total}</p><p className="text-sm text-gray-500 dark:text-gray-400">Lessons Completed</p></div></div></div>
                        <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md"><h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Activity</h3><ul className="space-y-4">{dashboardData.activity.map((item, index) => (<li key={index} className="flex items-start"><div className="flex-shrink-0 mr-3 mt-1 p-2 bg-light-gray dark:bg-gray-700 rounded-full">{item.type.includes('Lesson') && <FiCheckCircle className="text-green-500" />}{item.type.includes('Achievement') && <FiAward className="text-yellow-500" />}{item.type.includes('Practice') && <FiClock className="text-blue-500" />}</div><div><p className="font-semibold text-gray-800 dark:text-gray-200">{item.title}</p><p className="text-sm text-gray-500 dark:text-gray-400">{item.time}</p></div></li>))}</ul></div>
                    </div>
                </div>
            </div>
            
            <UserProfileSidebar user={user} achievements={achievements} />
        </div>
    );
};

export default DashboardOverviewPage;
