// src/dashboard/pages/MyRecordingsPage.js
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaMicrophoneAlt } from 'react-icons/fa';

const MyRecordingsPage = () => {
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const dummyRecordings = useMemo(() => ([
    {
      _id: 'speech1',
      topic: 'My Daily Routine',
      duration: '0:45',
      date: '2025-06-20',
      feedbackStatus: 'Processed',
      fluency: 85,
      vocabulary: 90,
      pronunciation: 88,
      grammar: 92,
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
    },
  ]), []);

  useEffect(() => {
    const fetchSpeechRecords = async () => {
      setLoading(true);
      setError('');
      setMessage('');
      try {
        const token = localStorage.getItem('token'); // eslint-disable-line no-unused-vars
        // const response = await fetch('http://localhost:5001/api/speeches', {
        //   headers: { 'Authorization': `Bearer ${token}` },
        // });
        // const data = await response.json();
        // if (!response.ok) throw new Error(data.msg || 'Failed to fetch speech records');
        // setRecordings(data);

        setTimeout(() => {
          setRecordings(dummyRecordings);
          setLoading(false);
        }, 800);

      } catch (err) {
        console.error("Error fetching speech records:", err);
        setError(err.message || 'Failed to load speech records.');
        setLoading(false);
      }
    };
    fetchSpeechRecords();
  }, [dummyRecordings]);

  return (
    <div className="min-h-full pb-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 font-dancing dark:text-gray-100">
        My Speech Feedback
      </h1>
      <p className="text-lg text-gray-600 mb-8 dark:text-gray-300">
        Review detailed feedback from your past speaking practice sessions.
      </p>

      {message && (
        <div className={`p-4 rounded-lg text-center mb-6 text-sm font-medium ${
          message.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' :
          'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
        }`}>
          {message.text}
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center py-10 dark:text-gray-200">
          <svg className="animate-spin h-8 w-8 text-indigo-500 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          Loading speech records...
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center dark:bg-red-900 dark:text-red-200">
          Error: {error}
        </div>
      )}

      {!loading && !error && recordings.length === 0 && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
          <FaMicrophoneAlt className="text-5xl text-indigo-400 mx-auto mb-4" />
          <p className="text-xl font-semibold mb-2">No speech records yet!</p>
          <p className="text-gray-600 dark:text-gray-300">Start a practice session from the "Speak" page to see your feedback here.</p>
          <Link to="/speak" className="mt-4 inline-block px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200">
            Go to Speak Page
          </Link>
        </div>
      )}

      {!loading && !error && recordings.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Topic</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Duration</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Status</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Fluency</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Vocabulary</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Pronunciation</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Grammar</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100 dark:bg-gray-800 dark:divide-gray-700">
                {recordings.map((rec) => (
                  <tr key={rec._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {/* FIXED: Link to the new nested feedback route */}
                      <Link to={`/dashboard/feedback/${rec._id}`} className="text-indigo-600 hover:underline dark:text-indigo-400">
                        {rec.topic}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{rec.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{rec.duration}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        rec.feedbackStatus === 'Processed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {rec.feedbackStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      {rec.feedbackStatus === 'Processed' ? <span className="font-bold text-gray-900 dark:text-gray-100">{rec.fluency}%</span> : <span className="text-gray-500 dark:text-gray-400">N/A</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      {rec.feedbackStatus === 'Processed' ? <span className="font-bold text-gray-900 dark:text-gray-100">{rec.vocabulary}%</span> : <span className="text-gray-500 dark:text-gray-400">N/A</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      {rec.feedbackStatus === 'Processed' ? <span className="font-bold text-gray-900 dark:text-gray-100">{rec.pronunciation}%</span> : <span className="text-gray-500 dark:text-gray-400">N/A</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      {rec.feedbackStatus === 'Processed' ? <span className="font-bold text-gray-900 dark:text-gray-100">{rec.grammar}%</span> : <span className="text-gray-500 dark:text-gray-400">N/A</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRecordingsPage;
