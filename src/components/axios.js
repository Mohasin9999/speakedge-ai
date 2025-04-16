import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [audioFile, setAudioFile] = useState(null);
    const [result, setResult] = useState(null);

    // Handle file selection
    const handleFileChange = (e) => {
        setAudioFile(e.target.files[0]);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!audioFile) return;

        const formData = new FormData();
        formData.append('audio', audioFile);

        try {
            const response = await axios.post('http://127.0.0.1:5000/evaluate', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResult(response.data);
        } catch (error) {
            console.error('Error uploading audio:', error);
        }
    };

    return (
        <div>
            <h1>Speech Evaluation</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} accept="audio/*" />
                <button type="submit">Evaluate</button>
            </form>

            {result && (
                <div>
                    <h2>Evaluation Results</h2>
                    <p><strong>Transcription:</strong> {result.transcription}</p>
                    <p><strong>Fluency Score:</strong> {result.fluency_score}</p>
                    <p><strong>Pronunciation Score:</strong> {result.pronunciation_score}</p>
                    <p><strong>Vocabulary Score:</strong> {result.vocabulary_score}</p>
                    <p><strong>Grammar Score:</strong> {result.grammar_score}</p>
                    {result.mispronounced_words.length > 0 && (
                        <div>
                            <h3>Mispronounced Words:</h3>
                            <ul>
                                {result.mispronounced_words.map((word, index) => (
                                    <li key={index}>{word}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;