import React, { useState, useEffect, useRef } from 'react';
import { FiSend, FiXCircle, FiCheckCircle, FiEdit3,FiMessageSquare } from 'react-icons/fi';

// --- Mock Data & Helpers ---
const randomScenarios = [
    { 
        title: "At a Coffee Shop",
        description: "You are the 'Customer' and the AI is the 'Barista'.",
        task: "Order a large latte with oat milk and ask for a recommendation for a pastry.",
        aiRole: "Barista",
        userRole: "Customer",
    },
    { 
        title: "Job Interview",
        description: "You are the 'Interviewee' and the AI is the 'Interviewer'.",
        task: "Introduce yourself and ask a question about the company culture.",
        aiRole: "Interviewer",
        userRole: "Interviewee",
    }
];

// This function simulates the AI's response.
const getMockAiResponse = (userMessage, scenario) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    if (scenario.title.includes("Coffee")) {
        if (lowerCaseMessage.includes("latte")) {
            return "Of course, one large latte with oat milk coming right up! For pastries, I highly recommend our almond croissant. Would you like to try one?";
        }
        return "Welcome to our coffee shop! What can I get for you today?";
    }
    if (scenario.title.includes("Interview")) {
        if (lowerCaseMessage.includes("culture")) {
            return "That's a great question. We have a very collaborative and supportive culture here. We value teamwork and open communication. Do you have any other questions?";
        }
        return "Hello, thank you for coming in today. Please, tell me a little bit about yourself.";
    }
    return "I'm not sure how to respond to that. Could you try rephrasing?";
};

// This function simulates the AI analysis.
const getMockAnalysis = (messages) => {
    return [
        {
            message: messages.find(m => m.text.toLowerCase().includes("buy something"))?.text || "I want to but something.",
            feedback: "The word 'but' should be 'buy'. 'Buy' is a verb meaning to purchase, while 'but' is a conjunction.",
            type: "Grammar",
        },
        {
            message: messages.find(m => m.text.toLowerCase().includes("recommendation"))?.text || "Can you give me recommendation?",
            feedback: "Add the article 'a' before 'recommendation'. The correct phrase is 'a recommendation'.",
            type: "Clarity",
        }
    ];
};


const ChatPage = () => {
    const [gameState, setGameState] = useState('pre-chat'); // 'pre-chat', 'scenario-selection', 'in-chat', 'analysis'
    const [scenario, setScenario] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleStartNewChat = () => {
        setGameState('scenario-selection');
        setMessages([]);
        setScenario(null);
        setAnalysis(null);
    };

    const handleScenarioSelect = (selectedScenario) => {
        const sc = selectedScenario || randomScenarios[Math.floor(Math.random() * randomScenarios.length)];
        setScenario(sc);
        setMessages([{
            sender: sc.aiRole,
            text: getMockAiResponse("", sc) // Get initial greeting
        }]);
        setGameState('in-chat');
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage = { sender: scenario.userRole, text: inputValue };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInputValue('');

        setTimeout(() => {
            const aiResponse = { sender: scenario.aiRole, text: getMockAiResponse(inputValue, scenario) };
            setMessages(prev => [...prev, aiResponse]);
        }, 1000);
    };

    const handleEndChat = () => {
        const userMessages = messages.filter(m => m.sender === scenario.userRole);
        const feedback = getMockAnalysis(userMessages);
        setAnalysis(feedback);
        setGameState('analysis');
    };

    return (
        <div className="flex h-full bg-light-gray dark:bg-dark-bg">
            {/* This is the main chat window */}
            <div className="flex-grow flex flex-col p-4 md:p-8">
                {gameState === 'pre-chat' && (
                    <div className="flex-grow flex items-center justify-center text-center">
                        <div>
                            <FiMessageSquare className="mx-auto text-5xl text-gray-400 mb-4" />
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Chat Practice</h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">Improve your conversational skills by chatting with our AI.</p>
                            <button onClick={handleStartNewChat} className="mt-6 bg-brand-blue text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                                Start New Chat
                            </button>
                        </div>
                    </div>
                )}

                {gameState === 'scenario-selection' && (
                    <div className="flex-grow flex items-center justify-center text-center">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Choose a Scenario</h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-2 mb-6">Select a scenario to start your practice session.</p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button onClick={() => handleScenarioSelect()} className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border dark:border-gray-700">
                                    <p className="text-4xl">🎲</p>
                                    <p className="font-semibold mt-2">Random Scenario</p>
                                </button>
                                <button className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border dark:border-gray-700 opacity-50 cursor-not-allowed" disabled>
                                    <p className="text-4xl">✍️</p>
                                    <p className="font-semibold mt-2">Custom Scenario</p>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {(gameState === 'in-chat' || gameState === 'analysis') && (
                    <>
                        <div className="bg-white dark:bg-dark-surface p-4 rounded-t-lg shadow-md border-b dark:border-gray-700">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{scenario.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{scenario.description}</p>
                                    <p className="text-sm text-brand-blue font-semibold mt-1">Your Task: <span className="font-normal text-gray-700 dark:text-gray-300">{scenario.task}</span></p>
                                </div>
                                {gameState === 'in-chat' && (
                                    <button onClick={handleEndChat} className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center">
                                        <FiXCircle className="mr-2" /> End
                                    </button>
                                )}
                                {gameState === 'analysis' && (
                                     <button onClick={handleStartNewChat} className="bg-brand-blue text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                                        <FiEdit3 className="mr-2" /> New Chat
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Message Display Area */}
                        <div className="flex-grow bg-white dark:bg-dark-surface p-4 overflow-y-auto shadow-inner">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex my-2 ${msg.sender === scenario.userRole ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`p-3 rounded-lg max-w-lg ${msg.sender === scenario.userRole ? 'bg-brand-blue text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
                                        <p className="text-sm">{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Message Input or Analysis Report */}
                        {gameState === 'in-chat' && (
                            <div className="bg-white dark:bg-dark-surface p-4 rounded-b-lg shadow-md">
                                <form onSubmit={handleSendMessage} className="flex gap-4">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Type your message..."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-blue dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                    <button type="submit" className="bg-brand-blue text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition-colors">
                                        <FiSend />
                                    </button>
                                </form>
                            </div>
                        )}
                        {gameState === 'analysis' && (
                            <div className="bg-white dark:bg-dark-surface p-6 rounded-b-lg shadow-md border-t-4 border-green-400">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center"><FiCheckCircle className="text-green-500 mr-2"/> Analysis Complete</h3>
                                <ul className="space-y-4">
                                    {analysis.map((item, index) => (
                                        <li key={index} className="p-4 bg-light-gray dark:bg-gray-700/50 rounded-lg">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Original message:</p>
                                            <p className="italic text-gray-800 dark:text-gray-200 mb-2">"{item.message}"</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Feedback ({item.type}):</p>
                                            <p className="font-semibold text-gray-900 dark:text-white">{item.feedback}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ChatPage;
