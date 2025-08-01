export const achievementsData = [
    { id: 1, name: 'First Step', icon: '🎯', unlocked: true },
    { id: 2, name: 'Weekend Warrior', icon: '⚔️', unlocked: true },
    { id: 3, name: 'Perfect Pronunciation', icon: '🎤', unlocked: true },
    { id: 4, name: 'Confident Speaker', icon: '🌟', unlocked: true },
    { id: 5, name: 'Daily Habit', icon: '📅', unlocked: false },
    { id: 6, name: 'Topic Master', icon: '📚', unlocked: false },
];

export const dashboardData = {
    lastSpeechScore: {
        overall: 88,
        pronunciation: 92,
        fluency: 85,
        pacing: 87,
    },
    weeklyProgress: [
        { day: 'Mon', score: 75 },
        { day: 'Tue', score: 80 },
        { day: 'Wed', score: 78 },
        { day: 'Thu', score: 85 },
        { day: 'Fri', score: 88 },
        { day: 'Sat', score: 90 },
        { day: 'Sun', score: 87 },
    ],
    activity: [
        { type: 'Lesson Completed', title: 'Business Negotiations', time: '2 hours ago' },
        { type: 'Achievement Unlocked', title: 'Confident Speaker', time: '1 day ago' },
        { type: 'Practice Session', title: 'Daily Warm-up', time: '1 day ago' },
        { type: 'Lesson Completed', title: 'Everyday Greetings', time: '2 days ago' },
    ],
    dailyGoal: {
        completed: 7,
        total: 10,
    }
};

export const defaultUserImage = 'https://placehold.co/100x100/E9D5FF/3730A3?text=U';
