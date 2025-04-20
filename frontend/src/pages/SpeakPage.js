// src/pages/SpeakPage.js
import React, { useState, useEffect } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";
import { useReactMediaRecorder } from "react-media-recorder";
// --- Ensure CSS import path/casing matches your file ---
import './Speakpage.css'; // Or './Speakpage.css' if that's the actual name

// --- Import the Header Component ---
// Make sure the path and filename casing are correct
import Header from '../components/header';

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
      // If you fixed the ESLint warning by removing clearBlobUrl, keep it removed.
      // If you plan to use it, add it back here:
      // clearBlobUrl
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

  const handleStart = () => {
    setTimer(0);
    setUploadStatus('');
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

  const handleUpload = async () => {
    if (!mediaBlob) {
      setUploadStatus("No recording available to upload.");
      return;
    }
    setIsUploading(true);
    setUploadStatus('Uploading...');

    const formData = new FormData();
    formData.append("audio", mediaBlob, `recording-${Date.now()}.wav`);
    const userId = localStorage.getItem("userId") || "DEFAULT_USER_ID"; // Example placeholder
    formData.append("userId", userId);

    try {
      const response = await fetch('http://localhost:5001/api/upload-audio', { // Example backend URL
        method: "POST",
        body: formData,
        // headers: { /* Add Auth if needed */ }
      });

      const data = await response.json();

      if (response.ok && data.message === "File uploaded successfully") {
        setUploadStatus("File uploaded successfully!");
        // Consider calling clearBlobUrl() here if you want the preview removed after upload
        // clearBlobUrl();
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

  return (
    // Wrapper div for the entire page including header
    <div className="speak-page-wrapper"> {/* Optional: Can help with layout */}

        {/* --- Add the Header Component --- */}
        <Header />

        {/* --- Main content area for the Speak Page --- */}
        {/* Use the class that has background, padding, flex etc. */}
        <div className="speak-page">
          <h1 className="topic-title">
            Today's Topic: AI in Communication {/* Example Topic */}
          </h1>

          <div className="status-box">
            <p className="status-text">
              Recording Status: {
                status === 'idle' ? 'Idle' :
                status === 'recording' ? 'Recording...' :
                status === 'stopped' ? 'Stopped' :
                status === 'acquiring_media' ? 'Getting Mic...' :
                'Waiting'
              }
            </p>
            <p className="timer-text">Recording Time: {timer} sec</p>
          </div>

          <button
            className={`record-button ${status === "recording" ? "active" : ""}`}
            onClick={status === "recording" ? handleStop : handleStart}
            aria-label={status === "recording" ? "Stop Recording" : "Start Recording"}
          >
            {status === "recording" ? (
              <FaStop className="record-button-icon" />
            ) : (
              <FaMicrophone className="record-button-icon" />
            )}
          </button>

          {mediaBlobUrl && status === 'stopped' && (
            <div className="playback-area">
              <p className="playback-label">Your Recording:</p>
              <audio controls className="audio-player">
                <source src={mediaBlobUrl} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
              <div className="playback-actions">
                <a
                    href={mediaBlobUrl}
                    download={`recording-${Date.now()}.wav`}
                    className="action-button download-button"
                >
                    Download
                </a>
                <button
                  onClick={handleUpload}
                  className="action-button upload-button"
                  disabled={isUploading}
                >
                  {isUploading ? 'Uploading...' : 'Upload Recording'}
                </button>
              </div>
              {uploadStatus && <p className="upload-status-text">{uploadStatus}</p>}
            </div>
          )}
          {!mediaBlobUrl && uploadStatus && (
            <div className="playback-area">
                <p className="upload-status-text">{uploadStatus}</p>
            </div>
          )}
        </div>
        {/* --- End Main content area --- */}
    </div> // End wrapper
  );
};

export default SpeakPage;