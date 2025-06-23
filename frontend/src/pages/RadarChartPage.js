import React, { useState } from 'react';
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';
import './RadarChartPage.css';
import Header from '../components/Header';

// 🟦 Import the score data from another file
import scoreData from './scoreData';

const RadarChartPage = () => {
  const [scores] = useState(scoreData); // 🟦 Initialize with imported scores


  const chartData = Object.entries(scores).map(([subject, value]) => ({
    subject,
    value,
    fullMark: 100
  }));

  return (
    <div className="radar-chart-page-wrapper">
      <Header />
      <div className="radar-chart-page-content">
        <h1 className="page-title">Speaking Skills Analysis</h1>

        <div className="chart-container">
          <div className="chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsRadarChart outerRadius="80%" data={chartData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#1e40af', fontSize: 14 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#6b7280', fontSize: 12 }} tickCount={6} />
                <Radar name="Score" dataKey="value" stroke="#2563eb" fill="#2563eb" fillOpacity={0.5} isAnimationActive={true} />
              </RechartsRadarChart>
            </ResponsiveContainer>
          </div>

       
        </div>

        <div className="scores-grid">
          {chartData.map((skill) => (
            <div key={skill.subject} className="score-item">
              <h3 className="score-subject">{skill.subject}</h3>
              <span className="score-value">{skill.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RadarChartPage;