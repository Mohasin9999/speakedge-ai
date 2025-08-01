import React, { useState, useEffect, useRef } from 'react';
import { FiMic, FiPause, FiPlay, FiRefreshCw, FiCheckCircle, FiBarChart2, FiThumbsUp } from 'react-icons/fi';

// --- Mock Data & Helpers ---
const topics = [
    "Describe your favorite holiday destination.",
    "What is a skill you would like to learn and why?",
    "Talk about a book or movie that has inspired you.",
    "What are your thoughts on the future of artificial intelligence?",
];

const mockAnalysisData = {
    fluency: 85,
    pronunciation: 92,
    pacing: {
        wpm: 145,
        rating: "Good",
    },
    feedback: [
        { type: 'Strength', text: 'Excellent use of varied vocabulary.' },
        { type: 'Improvement', text: 'Try to reduce the use of filler words like "um" and "uh".' },
        { type: 'Strength', text: 'Great intonation when asking questions.' },
    ]
};

// Helper to format seconds into MM:SS
const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};


const SpeakPage = () => {
    const [pageState, setPageState] = useState('topic-selection'); 
    const [topic, setTopic] = useState('');
    const [elapsedTime, setElapsedTime] = useState(0); // Timer state
    const timerIntervalRef = useRef(null); // Ref for the timer interval
    const canvasRef = useRef(null);
    const animationFrameId = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const mediaStreamSourceRef = useRef(null);

    // --- NEW Audio Visualization Logic (Circular Wave) ---
    useEffect(() => {
        const cleanup = () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            // Disconnect the source to stop the visualizer when not recording
            if (mediaStreamSourceRef.current) {
                mediaStreamSourceRef.current.disconnect();
                mediaStreamSourceRef.current = null;
            }
        };

        if (pageState === 'recording' && canvasRef.current) {
            const initializeAudio = async () => {
                if (!audioContextRef.current) {
                    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
                    analyserRef.current = audioContextRef.current.createAnalyser();
                    analyserRef.current.fftSize = 512;
                }

                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    mediaStreamSourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
                    mediaStreamSourceRef.current.connect(analyserRef.current);
                    drawVisualizer();
                } catch (err) {
                    console.error('Error accessing microphone:', err);
                    // Fallback to a simple pulsing simulation if mic access is denied
                    simulateVisualizer();
                }
            };

            const drawVisualizer = () => {
                animationFrameId.current = requestAnimationFrame(drawVisualizer);
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                const bufferLength = analyserRef.current.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);
                analyserRef.current.getByteTimeDomainData(dataArray);

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.lineWidth = 3;
                ctx.strokeStyle = '#4A00E0';
                ctx.shadowBlur = 15;
                ctx.shadowColor = 'rgba(74, 0, 224, 0.5)';
                
                ctx.beginPath();
                
                const sliceWidth = canvas.width * 1.0 / bufferLength;
                let x = 0;

                for (let i = 0; i < bufferLength; i++) {
                    const v = dataArray[i] / 128.0;
                    const y = v * canvas.height / 2;

                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                    x += sliceWidth;
                }
                
                ctx.lineTo(canvas.width, canvas.height / 2);
                ctx.stroke();
            };
            
            initializeAudio();

        } else {
            cleanup();
        }

        return cleanup;
    }, [pageState]);
    
    const simulateVisualizer = () => {
        let angle = 0;
        const drawSimulation = () => {
            animationFrameId.current = requestAnimationFrame(drawSimulation);
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            const radius = 70 + Math.sin(angle) * 10;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(74, 0, 224, 0.1)';
            ctx.fill();
            ctx.strokeStyle = '#4A00E0';
            ctx.lineWidth = 2;
            ctx.stroke();
            angle += 0.05;
        };
        drawSimulation();
    };

    const startTimer = () => {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = setInterval(() => {
            setElapsedTime(prevTime => prevTime + 1);
        }, 1000);
    };

    const pauseTimer = () => {
        clearInterval(timerIntervalRef.current);
    };

    const resetTimer = () => {
        clearInterval(timerIntervalRef.current);
        setElapsedTime(0);
    };

    const handleStartRecording = (selectedTopic) => {
        setTopic(selectedTopic || topics[Math.floor(Math.random() * topics.length)]);
        setPageState('recording');
        startTimer();
    };

    const handlePauseRecording = () => {
        setPageState('paused');
        pauseTimer();
    };
    
    const handleResumeRecording = () => {
        setPageState('recording');
        startTimer();
    };

    const handleRerecord = () => {
        setPageState('topic-selection');
        resetTimer();
    };

    const handleAnalyze = () => {
        setPageState('analysis');
        pauseTimer();
    };

    return (
        <div className="flex flex-col h-full p-4 md:p-8 bg-light-gray dark:bg-dark-bg">
            {pageState === 'topic-selection' && (
                <div className="flex-grow flex flex-col items-center justify-center text-center">
                    <FiMic className="text-5xl text-gray-400 mb-4" />
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Start Speaking Practice</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 mb-6 max-w-md">Choose a topic to talk about, or get a random one to challenge yourself.</p>
                    <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md w-full max-w-2xl">
                        <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Select a Topic:</h3>
                        <div className="space-y-3">
                            {topics.map((t, i) => (
                                <button key={i} onClick={() => handleStartRecording(t)} className="w-full text-left p-4 bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-colors">
                                    {t}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center my-4"><span className="flex-grow border-t dark:border-gray-700"></span><span className="px-4 text-gray-500 text-sm">OR</span><span className="flex-grow border-t dark:border-gray-700"></span></div>
                        <button onClick={() => handleStartRecording()} className="w-full bg-brand-blue text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                            Give me a Random Topic
                        </button>
                    </div>
                </div>
            )}

            {(pageState === 'recording' || pageState === 'paused') && (
                <div className="flex-grow flex flex-col items-center justify-between text-center">
                    <div>
                        <p className="text-gray-600 dark:text-gray-400">Your Topic:</p>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{topic}</h2>
                    </div>
                    
                    <div className="relative w-full max-w-2xl h-48 my-8 flex items-center justify-center">
                        <canvas ref={canvasRef} width="600" height="200" className="w-full h-full"></canvas>
                        <div className="absolute top-2 right-2 bg-black/20 text-white text-sm font-mono px-2 py-1 rounded-md">{formatTime(elapsedTime)}</div>
                    </div>

                    <div>
                        {pageState === 'recording' && (
                            <button onClick={handlePauseRecording} className="bg-white dark:bg-gray-700 text-gray-800 dark:text-white font-semibold w-24 h-24 rounded-full shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform">
                                <FiPause size={32} />
                            </button>
                        )}
                        {pageState === 'paused' && (
                            <div className="flex items-center space-x-6">
                                <button onClick={handleRerecord} className="bg-white dark:bg-gray-700 text-gray-800 dark:text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 flex items-center"><FiRefreshCw className="mr-2"/> Re-record</button>
                                <button onClick={handleResumeRecording} className="bg-brand-blue text-white w-24 h-24 rounded-full shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform"><FiPlay size={32} className="ml-1"/></button>
                                <button onClick={handleAnalyze} className="bg-green-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-600 flex items-center"><FiCheckCircle className="mr-2"/> Analyze</button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {pageState === 'analysis' && (
                <div className="flex-grow">
                     <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">Analysis Report</h1>
                     <p className="text-gray-600 dark:text-gray-400 mb-6">Here's the feedback on your speech about: <span className="font-semibold">"{topic}"</span></p>
                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md">
                            <h3 className="font-bold text-lg mb-4">Feedback</h3>
                            <ul className="space-y-3">
                                {mockAnalysisData.feedback.map((item, i) => (
                                    <li key={i} className="flex items-start">
                                        <div className={`mr-3 mt-1 flex-shrink-0 ${item.type === 'Strength' ? 'text-green-500' : 'text-yellow-500'}`}>
                                            {item.type === 'Strength' ? <FiThumbsUp /> : <FiBarChart2 />}
                                        </div>
                                        <div>
                                            <p className="font-semibold">{item.type}</p>
                                            <p className="text-gray-600 dark:text-gray-400">{item.text}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md text-center">
                                <p className="text-sm font-semibold text-gray-500">Fluency Score</p>
                                <p className="text-5xl font-bold text-brand-blue my-2">{mockAnalysisData.fluency}</p>
                                <p className="text-sm text-green-500 font-semibold">Very Good</p>
                            </div>
                             <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md text-center">
                                <p className="text-sm font-semibold text-gray-500">Pronunciation</p>
                                <p className="text-5xl font-bold text-green-600 my-2">{mockAnalysisData.pronunciation}</p>
                                <p className="text-sm text-green-500 font-semibold">Excellent</p>
                            </div>
                        </div>
                     </div>
                     <div className="mt-8 text-center">
                        <button onClick={handleRerecord} className="bg-brand-blue text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">
                            Practice Again
                        </button>
                     </div>
                </div>
            )}
        </div>
    );
};

export default SpeakPage;
