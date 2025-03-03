import React, { useState } from 'react';
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';

const RadarChart = () => {
  const [scores, setScores] = useState({
    Fluency: 75,
    Vocabulary: 80,
    Interaction: 70,
    Pronunciation: 85,
    Grammar: 78
  });

  // Function to generate new random scores
  const updateScores = () => {
    setScores({
      Fluency: Math.floor(Math.random() * 100),
      Vocabulary: Math.floor(Math.random() * 100),
      Interaction: Math.floor(Math.random() * 100),
      Pronunciation: Math.floor(Math.random() * 100),
      Grammar: Math.floor(Math.random() * 100)
    });
  };

  // Transform scores into Recharts data format
  const chartData = Object.entries(scores).map(([subject, value]) => ({
    subject,
    value,
    fullMark: 100
  }));

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        Speaking Skills Analysis
      </h1>

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsRadarChart outerRadius="80%" data={chartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#1e40af', fontSize: 14 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#6b7280', fontSize: 12 }} />
              
              <Radar
                name="Score"
                dataKey="value"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.4}
                isAnimationActive={true} // Enables smooth animation
              />
            </RechartsRadarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Click the button below to refresh scores
          </p>

          <button
            onClick={updateScores}
            className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Refresh Scores
          </button>

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5">
            {chartData.map((skill) => (
              <div key={skill.subject} className="p-2 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800">{skill.subject}</h3>
                <span className="text-2xl font-bold text-blue-600">
                  {skill.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadarChart;
