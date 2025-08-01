import React from 'react';
import { FiAward } from 'react-icons/fi';

// --- Mock Data for Achievements ---
// In a real app, this would come from your database
const achievementsList = [
    // Consistency
    { id: 1, name: 'First Step', description: 'Complete your first practice session.', icon: '🎯', current: 1, goal: 1, category: 'Getting Started' },
    { id: 2, name: 'Daily Habit', description: 'Practice for 3 days in a row.', icon: '📅', current: 1, goal: 3, category: 'Consistency' },
    { id: 3, name: 'Week Warrior', description: 'Complete a 7-day practice streak.', icon: '⚔️', current: 1, goal: 7, category: 'Consistency' },
    { id: 4, name: 'Month of Mastery', description: 'Maintain a 30-day practice streak.', icon: '🗓️', current: 1, goal: 30, category: 'Consistency' },
    { id: 5, name: 'Weekend Practice', description: 'Practice on a Saturday or Sunday.', icon: '🌴', current: 0, goal: 1, category: 'Consistency' },
    { id: 6, name: 'Early Bird', description: 'Complete a session before 9 AM.', icon: '☀️', current: 0, goal: 1, category: 'Consistency' },
    { id: 7, name: 'Night Owl', description: 'Complete a session after 9 PM.', icon: '🌙', current: 0, goal: 1, category: 'Consistency' },

    // Performance
    { id: 8, name: 'Great Start', description: 'Achieve a fluency score of 80+.', icon: '👍', current: 78, goal: 80, category: 'Performance' },
    { id: 9, name: 'Excellent Speaker', description: 'Achieve a fluency score of 90+.', icon: '🌟', current: 78, goal: 90, category: 'Performance' },
    { id: 10, name: 'Pronunciation Pro', description: 'Get a pronunciation score of 95+.', icon: '🎤', current: 85, goal: 95, category: 'Performance' },
    { id: 11, name: 'Smooth Talker', description: 'Use fewer than 5 filler words in a session.', icon: '😎', current: 8, goal: 4, category: 'Performance' },
    { id: 12, name: 'Perfect Pace', description: 'Maintain an ideal pace for over 2 minutes.', icon: '�', current: 1, goal: 2, category: 'Performance' },
    { id: 13, name: 'Top of the Class', description: 'Get a perfect score of 100 in any category.', icon: '💯', current: 0, goal: 1, category: 'Performance' },
    { id: 14, name: 'Hat Trick', description: 'Score 90+ in three consecutive sessions.', icon: '🎩', current: 1, goal: 3, category: 'Performance' },

    // Milestones
    { id: 15, name: 'Novice Speaker', description: 'Complete 10 practice sessions.', icon: '🌱', current: 3, goal: 10, category: 'Milestones' },
    { id: 16, name: 'Competent Speaker', description: 'Complete 25 practice sessions.', icon: '🌿', current: 3, goal: 25, category: 'Milestones' },
    { id: 17, name: 'Proficient Speaker', description: 'Complete 50 practice sessions.', icon: '🌳', current: 3, goal: 50, category: 'Milestones' },
    { id: 18, name: 'Expert Speaker', description: 'Complete 100 practice sessions.', icon: '🌲', current: 3, goal: 100, category: 'Milestones' },
    { id: 19, name: 'Marathon Talker', description: 'Speak for a total of 1 hour.', icon: '🏃‍♀️', current: 25, goal: 60, category: 'Milestones' },
    { id: 20, name: 'Endurance Speaker', description: 'Speak for a total of 5 hours.', icon: '🏃‍♀️', current: 25, goal: 300, category: 'Milestones' },

    // Exploration
    { id: 21, name: 'Topic Explorer', description: 'Try 5 different topics.', icon: '🗺️', current: 2, goal: 5, category: 'Exploration' },
    { id: 22, name: 'Scenario Specialist', description: 'Complete all scenarios in one category.', icon: '📁', current: 0, goal: 1, category: 'Exploration' },
    { id: 23, name: 'Random Challenger', description: 'Complete 3 random topic challenges.', icon: '🎲', current: 1, goal: 3, category: 'Exploration' },
    { id: 24, name: 'Chat Champion', description: 'Complete 10 chat practice sessions.', icon: '💬', current: 0, goal: 10, category: 'Exploration' },
    { id: 25, name: 'Role-player', description: 'Try 3 different chat roles.', icon: '🎭', current: 1, goal: 3, category: 'Exploration' },
    { id: 26, name: 'Feedback Fan', description: 'Review your analysis 10 times.', icon: '🔍', current: 2, goal: 10, category: 'Exploration' },
    { id: 27, name: 'Customizer', description: 'Create your first custom scenario.', icon: '✍️', current: 0, goal: 1, category: 'Exploration' },
    { id: 28, name: 'Social Butterfly', description: 'Join a practice group.', icon: '👥', current: 0, goal: 1, category: 'Exploration' },
    { id: 29, name: 'High Achiever', description: 'Unlock 10 other achievements.', icon: '🏆', current: 4, goal: 10, category: 'Exploration' },
    { id: 30, name: 'Perfectionist', description: 'Re-record a single session 3 times.', icon: '🔄', current: 1, goal: 3, category: 'Exploration' },
    { id: 31, name: 'Legendary Linguist', description: 'Unlock all other achievements.', icon: '👑', current: 4, goal: 30, category: 'Exploration' },
];

// Group achievements by category
const groupedAchievements = achievementsList.reduce((acc, ach) => {
    acc[ach.category] = [...(acc[ach.category] || []), ach];
    return acc;
}, {});

const AchievementCard = ({ achievement }) => {
    const progress = Math.min((achievement.current / achievement.goal) * 100, 100);
    const isCompleted = progress >= 100;

    return (
        <div className={`bg-white dark:bg-dark-surface p-4 rounded-lg shadow-md flex items-start space-x-4 transition-all duration-300 ${isCompleted ? 'border-l-4 border-green-400' : 'opacity-80'}`}>
            <div className={`flex-shrink-0 w-16 h-16 rounded-lg flex items-center justify-center text-4xl ${isCompleted ? 'bg-green-100 dark:bg-green-500/20' : 'bg-gray-100 dark:bg-gray-700'}`}>
                {achievement.icon}
            </div>
            <div className="flex-grow">
                <h3 className="font-bold text-gray-800 dark:text-white">{achievement.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                <div className="mt-2">
                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{achievement.current} / {achievement.goal}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                            className={`h-2 rounded-full transition-all duration-500 ${isCompleted ? 'bg-green-400' : 'bg-brand-blue'}`} 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AchievementsPage = () => {
    return (
        <div className="p-4 sm:p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Achievements</h1>
            <p className="text-gray-600 dark:text-gray-400">Track your progress and celebrate your milestones on your journey to fluency.</p>

            <div className="mt-8 space-y-10">
                {Object.entries(groupedAchievements).map(([category, achievements]) => (
                    <div key={category}>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                            <FiAward className="mr-3 text-brand-blue"/>
                            {category}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {achievements.map(ach => <AchievementCard key={ach.id} achievement={ach} />)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AchievementsPage;
