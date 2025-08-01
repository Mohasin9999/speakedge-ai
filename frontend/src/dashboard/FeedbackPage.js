// src/pages/FeedbackPage.js
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { FaCheckCircle, FaExclamationCircle, FaSpinner, FaChevronDown, FaChevronUp } from 'react-icons/fa';

import { useTheme } from '../context/ThemeContext';

// Helper function to get score level and description (assuming 0-100 scale now)
const getScoreFeedback = (score) => {
  if (score === null || score === undefined) {
    return { level: 'na', description: 'Score not available yet.', textColor: 'text-gray-500 dark:text-gray-400' };
  }
  if (score >= 90) {
    return { level: 'excellent', description: 'Outstanding performance!', textColor: 'text-green-700 dark:text-green-400' };
  } else if (score >= 70) {
    return { level: 'good', description: 'Solid performance, room for mastery.', textColor: 'text-blue-700 dark:text-blue-400' };
  } else if (score >= 50) {
    return { level: 'average', description: 'Good effort, focus on consistency.', textColor: 'text-yellow-700 dark:text-yellow-400' };
  } else {
    return { level: 'needs-improvement', description: 'Area for focused improvement.', textColor: 'text-red-700 dark:text-red-400' };
  }
};

const FeedbackPage = () => {
  const { id } = useParams(); // Get the speech ID from the URL
  const navigate = useNavigate();
  const [feedbackData, setFeedbackData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTranscription, setShowTranscription] = useState(false); // State for transcription visibility

  const { theme } = useTheme();

  // Consolidated dummy data for fetching by ID, now with transcriptions
  const allDummyRecordings = useMemo(() => ([
    {
      _id: 'speech1',
      topic: 'My Daily Routine',
      duration: '0:45',
      date: '2025-06-20',
      feedbackStatus: 'Processed',
      fluency: 85, // These are 0-100 scale, but we will convert to 0-9 for display/chart
      vocabulary: 90,
      pronunciation: 88,
      grammar: 92,
      overall: 88.75, // Average of scores
      transcription: "Hello, my name is Alex. Today I want to talk about my daily routine. I usually wake up around 7 AM. After that, I brush my teeth and prepare my breakfast. I like to eat eggs and toast. Then, I check my emails and plan my tasks for the day. Around 9 AM, I start working. I have a short break for lunch at 1 PM. In the evening, I enjoy reading a book or watching a movie before going to bed at 10 PM. This routine helps me stay organized."
    },
    {
      _id: 'speech2',
      topic: 'The Future of AI',
      duration: '1:10',
      date: '2025-06-18',
      feedbackStatus: 'Processed',
      fluency: 78,
      vocabulary: 82,
      pronunciation: 75,
      grammar: 80,
      overall: 78.75,
      transcription: "Artificial intelligence is rapidly changing our world. It's impacting industries like healthcare, finance, and transportation. In the future, AI could revolutionize how we interact with technology and solve complex global challenges. However, there are also ethical concerns and job displacement issues that need to be addressed carefully. We must develop AI responsibly to ensure it benefits all of humanity."
    },
    {
      _id: 'speech3',
      topic: 'Travel Experiences',
      duration: '0:55',
      date: '2025-06-15',
      feedbackStatus: 'Processing',
      fluency: null,
      vocabulary: null,
      pronunciation: null,
      grammar: null,
      overall: null,
      transcription: "This is a placeholder transcription for a recording that is currently being processed. The full text will appear here once the analysis is complete. Please bear with us while our AI works its magic."
    },
    {
      _id: 'speech4',
      topic: 'Environmental Challenges',
      duration: '2:01',
      date: '2025-06-10',
      feedbackStatus: 'Processed',
      fluency: 90,
      vocabulary: 88,
      pronunciation: 91,
      grammar: 89,
      overall: 89.5,
      transcription: "Environmental challenges are becoming increasingly urgent. Climate change, deforestation, and pollution threaten our planet. We need collective action from governments, industries, and individuals to mitigate these issues. Adopting renewable energy, reducing waste, and practicing sustainable consumption are crucial steps. Education also plays a vital role in raising awareness and fostering a sense of responsibility towards our environment for future generations. It's a big task, but we can make a difference."
    },
  ]), []);

  useEffect(() => {
    const fetchFeedback = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const data = allDummyRecordings.find(rec => rec._id === id);

        if (!data) {
          throw new Error('Feedback not found for this ID.');
        }

        setFeedbackData(data);

      } catch (err) {
        console.error("Error fetching feedback:", err);
        setError(err.message || "Could not load feedback data.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchFeedback();
    } else {
      setError("No speech ID provided for feedback.");
      setIsLoading(false);
    }
  }, [id, allDummyRecordings]);

  // Prepare data for Radar Chart
  const chartData = feedbackData && feedbackData.feedbackStatus === 'Processed'
    ? [
        { subject: 'Fluency', value: feedbackData.fluency / 100 * 9, fullMark: 9 },
        { subject: 'Vocabulary', value: feedbackData.vocabulary / 100 * 9, fullMark: 9 },
        { subject: 'Pronunciation', value: feedbackData.pronunciation / 100 * 9, fullMark: 9 },
        { subject: 'Grammar', value: feedbackData.grammar / 100 * 9, fullMark: 9 },
      ]
    : [];

  const scoreCategories = [
    { key: 'fluency', title: 'Fluency' },
    { key: 'vocabulary', title: 'Vocabulary Range' },
    { key: 'pronunciation', title: 'Pronunciation' },
    { key: 'grammar', title: 'Grammar & Accuracy' },
    { key: 'overall', title: 'Overall Performance' },
  ];

  return (
    <div className="min-h-full pb-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Page Header / Hero Section - Cleaned up to match overall style */}
      <section className="relative py-12 px-4 md:px-8 text-white text-center flex items-center justify-center rounded-b-lg shadow-sm mb-10 bg-indigo-600 dark:bg-indigo-800 transition-colors duration-300">
        <div className="relative z-10 container mx-auto max-w-4xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-2 font-inter tracking-tight">
            Your Detailed Speech Feedback
          </h1>
          <p className="text-base sm:text-lg text-indigo-100 max-w-2xl mx-auto">
            Review your performance for the topic: "{feedbackData?.topic || 'Loading...'}"
          </p>
        </div>
      </section>

      {/* Main Content Area - Grid for better alignment */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Loading and Error States */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 transition-colors duration-300">
            <FaSpinner className="animate-spin text-4xl text-indigo-500 mb-4" />
            <p className="text-xl font-semibold">Loading feedback...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="flex flex-col items-center justify-center py-20 bg-red-50 rounded-lg shadow-sm text-red-700 border border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-900 transition-colors duration-300">
            <FaExclamationCircle className="text-4xl mb-4" />
            <p className="text-xl font-semibold mb-2">Error Loading Feedback:</p>
            <p className="text-lg">{error}</p>
            <button onClick={() => navigate(-1)} className="mt-6 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200">Go Back</button>
          </div>
        )}

        {/* Content Area: Show only when data is loaded and no error */}
        {!isLoading && !error && feedbackData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column Container (for Speech Details & Overall Score) */}
            <div className="lg:col-span-1 flex flex-col gap-8"> {/* NEW: Flex column to stack cards */}
              {/* Speech Details Card */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 font-inter dark:text-gray-100">
                  Speech Details
                </h2>
                <div className="text-base text-gray-700 dark:text-gray-200 space-y-2">
                  <p><span className="font-medium text-gray-900 dark:text-gray-100">Topic:</span> {feedbackData.topic}</p>
                  <p><span className="font-medium text-gray-900 dark:text-gray-100">Date:</span> {feedbackData.date}</p>
                  <p><span className="font-medium text-gray-900 dark:text-gray-100">Duration:</span> {feedbackData.duration}</p>
                  <p>
                    <span className="font-medium text-gray-900 dark:text-gray-100">Status:</span>{' '}
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      feedbackData.feedbackStatus === 'Processed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {feedbackData.feedbackStatus}
                    </span>
                  </p>
                </div>
              </div>

              {/* Overall Score Card - NEW POSITION: Below Speech Details */}
              {feedbackData?.feedbackStatus === 'Processed' && (
                <div className={`p-6 rounded-lg border shadow-sm transition-colors duration-300 bg-white dark:bg-gray-800 dark:border-gray-700 ${
                  getScoreFeedback(feedbackData.overall).level === 'excellent' ? 'border-green-200 dark:border-green-800' :
                  getScoreFeedback(feedbackData.overall).level === 'good' ? 'border-blue-200 dark:border-blue-800' :
                  getScoreFeedback(feedbackData.overall).level === 'average' ? 'border-yellow-200 dark:border-yellow-800' :
                  getScoreFeedback(feedbackData.overall).level === 'needs-improvement' ? 'border-red-200 dark:border-red-800' :
                  'border-gray-200 dark:border-gray-600'
                }`}>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Overall Performance</h3>
                  <div className="flex items-baseline mb-2">
                    <span className={`text-4xl font-bold ${getScoreFeedback(feedbackData.overall).textColor}`}>{feedbackData.overall?.toFixed(1)}%</span>
                  </div>
                  <p className={`text-base ${getScoreFeedback(feedbackData.overall).textColor}`}>{getScoreFeedback(feedbackData.overall).description}</p>
                </div>
              )}
            </div> {/* END Left Column Container */}


            {/* Radar Chart Section (col 2-3) */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center justify-center transition-colors duration-300">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 font-inter dark:text-gray-100">Score Overview</h2>
              {feedbackData.feedbackStatus === 'Processed' && chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsRadarChart outerRadius="80%" data={chartData}>
                    <PolarGrid stroke={theme === 'light' ? '#e5e7eb' : '#4b5563'} />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: theme === 'light' ? '#4b5563' : '#d1d5db', fontSize: 12, fontWeight: 'bold' }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 9]}
                      tickCount={4}
                      tick={{ fill: theme === 'light' ? '#6b7280' : '#9ca3af', fontSize: 10 }}
                      axisLine={false}
                    />
                    <Radar
                      name="Your Score"
                      dataKey="value"
                      stroke="#4f46e5"
                      fill="#4f46e5"
                      fillOpacity={0.6}
                      isAnimationActive={true}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(55, 65, 81, 0.9)',
                        border: `1px solid ${theme === 'light' ? '#ccc' : '#4b5563'}`,
                        borderRadius: '8px',
                      }}
                      itemStyle={{ color: theme === 'light' ? '#1f2937' : '#f9fafb' }}
                      labelStyle={{ color: theme === 'light' ? '#1f2937' : '#f9fafb' }}
                    />
                  </RechartsRadarChart>
                </ResponsiveContainer>
              ) : feedbackData.feedbackStatus === 'Processing' ? (
                <div className="flex flex-col items-center justify-center h-full py-10 text-center text-gray-700 dark:text-gray-200">
                  <FaSpinner className="animate-spin text-4xl text-yellow-600 mb-4" />
                  <p className="text-xl font-semibold">Scores are currently being processed...</p>
                  <p className="text-base text-gray-500 dark:text-gray-400 mt-2">Please check back in a few minutes.</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-10 text-center text-gray-700 dark:text-gray-200">
                  <FaExclamationCircle className="text-4xl text-red-600 mb-4" />
                  <p className="text-xl font-semibold mb-2">Scores not available.</p>
                  <p className="text-base text-gray-500 dark:text-gray-400">No data found or processing failed.</p>
                </div>
              )}
            </div>

            {/* Detailed Feedback Grid Section (col 1-3, full width below chart) */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300"> {/* Removed mt-8 from here */}
              <h2 className="lg:col-span-4 text-xl font-semibold text-gray-900 mb-4 font-inter dark:text-gray-100">Detailed Score Breakdown</h2>
              {scoreCategories.filter(cat => cat.key !== 'overall').map(({ key, title }) => {
                const score = feedbackData[key];
                const { level, description, textColor } = getScoreFeedback(score);
                return (
                  <div key={key} className={`p-5 rounded-lg border shadow-sm transition-colors duration-300 ${
                    level === 'excellent' ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800' :
                    level === 'good' ? 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800' :
                    level === 'average' ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800' :
                    level === 'needs-improvement' ? 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800' :
                    'bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600'
                  }`}>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h3>
                    {score !== null ? (
                      <div className="flex items-baseline mb-2">
                        <span className={`text-3xl font-bold ${textColor}`}>{score}%</span>
                        {level === 'excellent' && <FaCheckCircle className={`ml-2 text-xl ${textColor}`} />}
                        {level === 'needs-improvement' && <FaExclamationCircle className={`ml-2 text-xl ${textColor}`} />}
                      </div>
                    ) : (
                      <p className="text-xl font-bold text-gray-500 dark:text-gray-400 mb-2">N/A</p>
                    )}
                    <p className={`text-sm ${textColor}`}>{description}</p>
                  </div>
                );
              })}
            </div>
            
            {/* Transcription Section (col 1-3, full width below detailed grid) */}
            <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md border border-gray-100 dark:bg-gray-800 dark:border-gray-700 mt-8 transition-colors duration-300">
              <button
                onClick={() => setShowTranscription(!showTranscription)}
                className="w-full flex justify-between items-center text-left text-xl font-semibold text-gray-900 dark:text-gray-100 py-3 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-300"
              >
                Transcription
                {showTranscription ? <FaChevronUp className="text-indigo-600 dark:text-indigo-400" /> : <FaChevronDown className="text-gray-500 dark:text-gray-400" />}
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  showTranscription ? 'max-h-screen opacity-100 pt-4' : 'max-h-0 opacity-0'
                }`}
              >
                {feedbackData.transcription ? (
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-wrap text-base font-mono">
                    {feedbackData.transcription}
                  </p>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-base italic mt-4">
                    Transcription not available for this speech.
                  </p>
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
