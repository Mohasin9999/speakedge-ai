// src/pages/SpeakPage.js
import React, { useState, useEffect } from "react";
import { FaMicrophone, FaStop, FaUpload, FaDownload, FaRedoAlt } from "react-icons/fa";
import { useReactMediaRecorder } from "react-media-recorder";

const SpeakPage = () => {
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const {
    startRecording,
    stopRecording,
    mediaBlobUrl,
    status,
    mediaBlob,
    clearBlobUrl
  } = useReactMediaRecorder({
    audio: true,
    blobPropertyBag: { type: "audio/wav" },
  });

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  useEffect(() => {
    if (status === 'idle' && !mediaBlobUrl && timer !== 0) {
      setTimer(0);
      setUploadStatus('');
    }
  }, [mediaBlobUrl, status, timer]);


  const handleStart = () => {
    setTimer(0);
    setUploadStatus('');
    clearBlobUrl();
    if (intervalId) clearInterval(intervalId);
    startRecording();
    let count = 0;
    const id = setInterval(() => {
      count += 1;
      setTimer(count);
    }, 1000);
    setIntervalId(id);
  };

  const handleStop = () => {
    stopRecording();
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const handleRetake = () => {
    clearBlobUrl();
    setTimer(0);
    setUploadStatus('');
    if (intervalId) clearInterval(intervalId);
    setIntervalId(null);
  };

  const handleUpload = async () => {
    if (!mediaBlob) {
      setUploadStatus("No recording available to upload.");
      return;
    }
    setIsUploading(true);
    setUploadStatus('Uploading...');

    const formData = new FormData();
    formData.append("audio", mediaBlob, `recording-${Date.now()}.wav`);
    const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : "DEFAULT_USER_ID";
    formData.append("userId", userId);

    try {
      const response = await fetch('http://localhost:5001/api/upload-audio', {
        method: "POST",
        body: formData,
        // headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      const data = await response.json();

      if (response.ok && data.message === "File uploaded successfully") {
        setUploadStatus("File uploaded successfully! Your feedback is processing.");
      } else {
        console.error("Upload failed response:", data);
        setUploadStatus(data.message || "Failed to upload file. Server error.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus(`Error uploading file: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    // Main container: clean background, centered content
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex flex-col items-center justify-center py-12 px-4 font-inter text-gray-800 overflow-hidden dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* Main Content Card - Simple, clean look */}
      <div className="relative z-10 bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-200 max-w-xl mx-auto w-full flex flex-col items-center animate-fade-in-down dark:bg-gray-800 dark:border-gray-700 dark:shadow-2xl">
        
        {/* Topic Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 mb-6 text-center font-dancing leading-tight dark:text-indigo-300">
          Your Speaking Practice
        </h1>
        <p className="text-xl md:text-2xl font-bold text-gray-700 mb-8 bg-indigo-50 px-6 py-3 rounded-full shadow-md dark:bg-indigo-900 dark:text-gray-200">
          Topic: AI in Everyday Life
        </p>

        {/* Recording Status & Timer Display */}
        <div className="bg-gray-100 p-6 rounded-lg text-gray-600 w-full mb-8 shadow-inner flex flex-col items-center border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
          <p className="text-lg mb-2">
            Status: <span className="font-semibold text-gray-800 capitalize ml-1 dark:text-gray-100">{status.replace('_', ' ')}</span>
          </p>
          <p className="font-mono text-5xl font-bold text-indigo-600 dark:text-indigo-400">
            {formatTime(timer)}
          </p>
        </div>

        {/* Record/Stop Button - Simple, prominent */}
        <button
          className={`relative w-28 h-28 rounded-full flex items-center justify-center text-white text-5xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 ${ // Ring offset theme
            status === "recording"
              ? "bg-red-500 hover:bg-red-600 focus:ring-red-400"
              : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
          }`}
          onClick={status === "recording" ? handleStop : handleStart}
          aria-label={status === "recording" ? "Stop Recording" : "Start Recording"}
          disabled={status === 'acquiring_media'}
        >
          {status === "recording" ? (
            <FaStop className="text-white text-6xl" />
          ) : (
            <FaMicrophone className="text-white text-6xl" />
          )}
          {status === 'acquiring_media' && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-full dark:bg-gray-900/50"> {/* Loader bg theme */}
                <svg className="animate-spin text-indigo-600 h-full w-full p-4 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
          )}
        </button>

        {/* Initial instructions/status messages */}
        {!mediaBlobUrl && status === 'idle' && !isUploading && !uploadStatus && (
          <p className="text-gray-500 text-lg mt-8 animate-fade-in-up text-center max-w-xs dark:text-gray-400">
            Press the microphone to begin your practice session.
          </p>
        )}
        
        {/* Recording Playback and Upload Area */}
        {mediaBlobUrl && status === 'stopped' && (
          <div className="bg-gray-100 p-6 rounded-lg w-full mt-8 shadow-inner flex flex-col items-center border border-gray-200 animate-fade-in-up dark:bg-gray-700 dark:border-gray-600"> {/* Playback area theme */}
            <p className="text-lg text-gray-700 mb-4 text-center dark:text-gray-200">Review Your Recording:</p>
            
            <audio
              src={mediaBlobUrl}
              className="w-full h-12 mb-4 bg-gray-300 rounded-lg outline-none dark:bg-gray-600" // Audio player bg theme
              controls
            >
              Your browser does not support the audio element.
            </audio>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <a
                href={mediaBlobUrl}
                download={`speakedge_recording_${Date.now()}.wav`}
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <FaDownload /> Download
              </a>
              <button
                onClick={handleUpload}
                className="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  <>
                    <FaUpload /> Submit for Feedback
                  </>
                )}
              </button>
            </div>
            
            {uploadStatus && (
              <p className={`text-sm mt-4 font-medium ${uploadStatus.includes('successfully') ? 'text-green-600' : 'text-red-600'} dark:text-green-400 dark:text-red-400`}> {/* Status text theme */}
                {uploadStatus}
              </p>
            )}

            <button
              onClick={handleRetake}
              className="mt-6 px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition-colors duration-200 flex items-center justify-center gap-2 border border-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 dark:border-gray-500" // Retake button theme
            >
              <FaRedoAlt /> Retake Recording
            </button>
          </div>
        )}
        
        {/* Display upload status even if mediaBlobUrl is cleared after upload */}
        {uploadStatus && !mediaBlobUrl && (status !== 'stopped') && (
            <p className={`text-sm mt-4 font-medium ${uploadStatus.includes('successfully') ? 'text-green-600' : 'text-red-600'} dark:text-green-400 dark:text-red-400`}>
                {uploadStatus}
            </p>
        )}

      </div> {/* End main content card */}
    </div>
  );
};

export default SpeakPage;
