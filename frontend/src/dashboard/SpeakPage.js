import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FiMic, FiPause, FiPlay, FiRefreshCw, FiCheckCircle, FiLoader } from 'react-icons/fi';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const topics = ["Describe your favorite holiday destination.", "What is a skill you would like to learn and why?", "Talk about a book or movie that has inspired you."];

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

const SpeakPage = () => {
    const [pageState, setPageState] = useState('topic-selection'); // topic-selection, recording, paused, loading, analysis
    const [topic, setTopic] = useState('');
    const [elapsedTime, setElapsedTime] = useState(0);
    const [analysisData, setAnalysisData] = useState(null);
    const [error, setError] = useState('');

    const timerIntervalRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const startTimer = () => {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = setInterval(() => setElapsedTime(prev => prev + 1), 1000);
    };
    const pauseTimer = () => clearInterval(timerIntervalRef.current);
    const resetTimer = () => {
        clearInterval(timerIntervalRef.current);
        setElapsedTime(0);
    };

    const handleStartRecording = async (selectedTopic) => {
        setError('');
        setTopic(selectedTopic || topics[Math.floor(Math.random() * topics.length)]);
        setPageState('recording');
        audioChunksRef.current = [];
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });
            mediaRecorderRef.current.ondataavailable = (event) => audioChunksRef.current.push(event.data);
            mediaRecorderRef.current.start();
            startTimer();
        } catch (err) {
            setError('Microphone access denied. Please allow microphone access in your browser settings.');
            setPageState('topic-selection');
        }
    };

    const handlePauseRecording = () => {
        setPageState('paused');
        mediaRecorderRef.current?.pause();
        pauseTimer();
    };

    const handleResumeRecording = () => {
        setPageState('recording');
        mediaRecorderRef.current?.resume();
        startTimer();
    };
    
    const handleRerecord = () => {
        setPageState('topic-selection');
        resetTimer();
    };

    const handleAnalyze = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                sendAudioForAnalysis(audioBlob);
            };
        }
        pauseTimer();
    };

    const sendAudioForAnalysis = async (audioBlob) => {
        setPageState('loading');
        const formData = new FormData();
        formData.append('audio', audioBlob, `${topic}.webm`);
        formData.append('topic', topic);
        formData.append('duration', elapsedTime);
        formData.append('userId', '60d0fe4f5311236168a109ca'); // Replace with a real user ID

        try {
            const initialResponse = await axios.post('http://localhost:5000/api/test-scores/analyze', formData);
            const { testScoreId } = initialResponse.data;

            const pollInterval = setInterval(async () => {
                try {
                    const statusResponse = await axios.get(`http://localhost:5000/api/test-scores/${testScoreId}`);
                    const scoreData = statusResponse.data;
                    
                    if (scoreData.status === 'processed') {
                        clearInterval(pollInterval);
                        setAnalysisData(scoreData);
                        setPageState('analysis');
                    } else if (scoreData.status === 'failed') {
                        clearInterval(pollInterval);
                        setError('Analysis failed on the server. Please try again.');
                        setPageState('topic-selection');
                    }
                } catch (pollError) {
                    clearInterval(pollInterval);
                    setError('Could not retrieve analysis results.');
                    setPageState('topic-selection');
                }
            }, 3000);

        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send audio for analysis.');
            setPageState('topic-selection');
        }
    };

    const chartData = {
        labels: ['Pronunciation', 'Fluency', 'Grammar', 'Vocabulary'],
        datasets: [{
            label: 'Your Score',
            data: [
                analysisData?.pronunciation || 0,
                analysisData?.fluency || 0,
                analysisData?.grammar || 0,
                analysisData?.vocabulary || 0,
            ],
            backgroundColor: 'rgba(74, 0, 224, 0.2)',
            borderColor: 'rgba(74, 0, 224, 1)',
            borderWidth: 2,
        }],
    };

    return (
        <div className="flex flex-col h-full p-4 md:p-8 bg-light-gray dark:bg-dark-bg">
            {error && <div className="fixed top-5 right-5 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 animate-pulse">{error}</div>}

            {pageState === 'topic-selection' && (
                <div className="flex-grow flex flex-col items-center justify-center text-center">
                    <FiMic className="text-5xl text-gray-400 mb-4" />
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Start Speaking Practice</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 mb-6 max-w-md">Choose a topic to talk about.</p>
                    <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md w-full max-w-2xl">
                        {topics.map((t, i) => (
                            <button key={i} onClick={() => handleStartRecording(t)} className="w-full text-left p-4 mb-2 bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-colors">{t}</button>
                        ))}
                    </div>
                </div>
            )}

            {(pageState === 'recording' || pageState === 'paused') && (
                <div className="flex-grow flex flex-col items-center justify-center text-center">
                    <p className="text-gray-500">Your Topic:</p>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{topic}</h2>
                    <div className="text-6xl font-mono text-brand-blue mb-8">{formatTime(elapsedTime)}</div>
                    {pageState === 'recording' && (
                        <button onClick={handlePauseRecording} className="bg-red-500 text-white w-24 h-24 rounded-full shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform"><FiPause size={32} /></button>
                    )}
                    {pageState === 'paused' && (
                        <div className="flex items-center space-x-6">
                            <button onClick={handleRerecord} className="bg-white dark:bg-gray-700 text-gray-800 dark:text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 flex items-center"><FiRefreshCw className="mr-2"/> Re-record</button>
                            <button onClick={handleResumeRecording} className="bg-brand-blue text-white w-24 h-24 rounded-full shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform"><FiPlay size={32} className="ml-1"/></button>
                            <button onClick={handleAnalyze} className="bg-green-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-600 flex items-center"><FiCheckCircle className="mr-2"/> Finish & Analyze</button>
                        </div>
                    )}
                </div>
            )}
            
            {pageState === 'loading' && (
                <div className="flex-grow flex flex-col items-center justify-center text-center">
                    <FiLoader className="text-6xl text-brand-blue animate-spin mb-4" />
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Analyzing Your Speech...</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">This may take a moment. We're calculating your scores.</p>
                </div>
            )}

            {pageState === 'analysis' && analysisData && (
                <div className="flex-grow animate-fade-in">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Analysis Report</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">Feedback for: <span className="font-semibold">"{topic}"</span></p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md h-full">
                            <h3 className="font-bold text-lg mb-4 text-center">Score Breakdown</h3>
                            <div className="max-w-md mx-auto"><Radar data={chartData} options={{ scales: { r: { suggestedMin: 0, suggestedMax: 100 } } }} /></div>
                        </div>
                        <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md h-full">
                             <h3 className="font-bold text-lg mb-4">Your Transcription</h3>
                             <p className="text-gray-700 dark:text-gray-300 italic p-4 bg-gray-50 dark:bg-gray-800 rounded-md">"{analysisData.transcription}"</p>
                        </div>
                    </div>
                    <div className="mt-8 text-center">
                        <button onClick={handleRerecord} className="bg-brand-blue text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">Practice Again</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SpeakPage;