// src/pages/FeedbackPage.js
import React, { useState, useEffect } from 'react';
import './FeedbackPage.css'; // Import the CSS
import {
    Radar,
    RadarChart as RechartsRadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip // Added Tooltip for better chart interaction
} from 'recharts';

// Import Header Component
import Header from '../components/Header'; // Adjust path if needed

// Helper function to get score level and description
const getScoreFeedback = (score) => {
    if (score === null || score === undefined) {
        return { level: 'low', description: 'Score not available.' };
    }
    // Adjust score scale if needed (e.g., if API returns 0-100 but display is 0-9)
    // Assuming scores are already 0-9 based on description logic
    if (score >= 8) {
        return { level: 'high', description: 'Excellent performance in this area. Keep it up!' };
    } else if (score >= 6) {
        return { level: 'medium', description: 'Good effort. Focus on consistency and minor refinements.' };
    } else if (score >= 5 ) { // Adjusted lower bound for 'medium' slightly based on placeholder data
        return { level: 'medium', description: 'Good effort. Focus on consistency and minor refinements.' };
    }
     else {
        return { level: 'low', description: 'Area for improvement. Practice specific exercises related to this skill.' };
    }
};

const FeedbackPage = () => {
    // --- State for Scores ---
    // This state will hold the fetched feedback data
    const [feedbackScores, setFeedbackScores] = useState({
        Fluency: null,
        Pronunciation: null,
        Vocabulary: null,
        Grammar: null,
        Overall: null,
    });
    const [isLoading, setIsLoading] = useState(true); // Start in loading state
    const [error, setError] = useState(null);

    // --- Simulate Data Fetching ---
    useEffect(() => {
        const fetchFeedback = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1500));

                // --- Replace with actual fetch ---
                // Example: const response = await fetch('/api/feedback/{recordingId}');
                // if (!response.ok) throw new Error('Failed to fetch feedback');
                // const data = await response.json();

                // Use placeholder data (ensure consistency, e.g., 0-9 scale)
                const placeholderData = {
                    Fluency: 7,
                    Pronunciation: 6, // Kept placeholder
                    Vocabulary: 8,
                    Grammar: 5,
                    Overall: 6.5, // Example calculated overall (can be average or weighted)
                };
                // -----------------------------

                setFeedbackScores(placeholderData);

            } catch (err) {
                console.error("Error fetching feedback:", err);
                setError(err.message || "Could not load feedback data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchFeedback();
    }, []); // Empty dependency array means run once on mount

    // --- Prepare Data for Chart and Grid ---
    // Create data structure suitable for Recharts Radar chart using fetched scores
    // Filter out null scores and potentially 'Overall' if you don't want it in the chart
    const chartData = Object.entries(feedbackScores)
        .filter(([key, value]) => value !== null && key !== 'Overall') // Exclude 'Overall' from chart axes if desired
        .map(([subject, value]) => ({
            subject: subject === 'Vocabulary' ? 'Vocab' : // Shorten long labels for chart if needed
                     subject === 'Pronunciation' ? 'Pronun' :
                     subject,
            value: value,
            fullMark: 9 // Set the maximum possible score for the axis scaling
        }));

    // Define categories for the detailed feedback grid (including Overall)
    const scoreCategories = [
        { key: 'Fluency', title: 'Fluency' },
        { key: 'Pronunciation', title: 'Pronunciation' },
        { key: 'Vocabulary', title: 'Vocabulary Range' },
        { key: 'Grammar', title: 'Grammar & Accuracy' },
        { key: 'Overall', title: 'Overall Performance' }, // Added Overall score
    ];

    return (
        <div className="feedback-page-wrapper">
            <Header />
            <div className="feedback-page">
                <div className="page-header">
                    <h1 className="page-title">Your Performance Feedback</h1>
                    <p className="page-subtitle">Here's a breakdown of your scores based on your recent recording.</p>
                </div>

                {/* Loading and Error States */}
                {isLoading && <p className="loading-message">Loading feedback...</p>}
                {error && <p className="error-message">Error: {error}</p>}

                {/* Content Area: Show only when data is loaded and no error */}
                {!isLoading && !error && feedbackScores && (
                    <div className="feedback-content-area"> {/* Added a container */}

                        {/* Radar Chart Section */}
                        <div className="radar-chart-container"> {/* Renamed for clarity */}
                            <h2 className="section-title">Score Overview</h2> {/* Added title */}
                            <div className="chart-area">
                                {chartData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={300}> {/* Adjusted height */}
                                        <RechartsRadarChart
                                            outerRadius="80%"
                                            data={chartData}
                                        >
                                            <PolarGrid stroke="#e5e7eb" />
                                            <PolarAngleAxis
                                                dataKey="subject"
                                                tick={{ fill: '#1e40af', fontSize: 12 }} // Smaller font size for ticks
                                            />
                                            <PolarRadiusAxis
                                                angle={90} // Adjust angle if needed
                                                domain={[0, 9]} // Correct domain based on score scale
                                                tickCount={4} // Adjust number of radius ticks (e.g., 0, 3, 6, 9)
                                                tick={{ fill: '#6b7280', fontSize: 10 }}
                                                axisLine={false} // Hide the radius axis line if desired
                                            />
                                            <Radar
                                                name="Score"
                                                dataKey="value"
                                                stroke="#2563eb"
                                                fill="#2563eb"
                                                fillOpacity={0.6} // Slightly adjusted opacity
                                                isAnimationActive={true}
                                            />
                                            <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid #ccc' }}/>
                                        </RechartsRadarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <p>No chart data available.</p> // Fallback if chartData is empty
                                )}
                            </div>
                        </div>

                        {/* Detailed Feedback Grid Section */}
                        <div className="feedback-grid-container"> {/* Renamed for clarity */}
                            <h2 className="section-title">Detailed Scores & Feedback</h2> {/* Added title */}
                            <div className="feedback-grid">
                                {scoreCategories.map(({ key, title }) => {
                                    const score = feedbackScores[key];
                                    // Ensure score is valid before getting feedback
                                    if (score === null || score === undefined) {
                                        return ( // Render a placeholder or skip if score is missing
                                          <div className="score-card score-card-missing" key={key}>
                                            <h2 className="score-category-title">{title}</h2>
                                            <p className="score-description">Score not available.</p>
                                          </div>
                                        );
                                    }
                                    const { level, description } = getScoreFeedback(score);
                                    return (
                                        <div className="score-card" key={key}>
                                            <h2 className="score-category-title">{title}</h2>
                                            <div className="score-display">
                                                <span className={`score-value ${level}`}>
                                                    {score.toFixed(1)} {/* Format score to one decimal place */}
                                                </span>
                                                <span className="score-scale">/ 9</span>
                                            </div>
                                            <p className={`score-description ${level}`}>{description}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeedbackPage;