import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";
import { useReactMediaRecorder } from "react-media-recorder";
import './Speakpage.css';
import Header from '../components/header';

const SpeakPage = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const {
    startRecording,
    stopRecording,
    mediaBlobUrl,
    status,
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

  const handleDownload = async () => {
    if (!mediaBlobUrl) {
      setUploadStatus("No recording available to upload.");
      return;
    }

    setUploadStatus("Uploading and evaluating...");

    try {
      const response = await fetch(mediaBlobUrl);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append("audio", blob, "recording.wav");
      formData.append("userId", "test_user_123");

      const uploadResponse = await fetch("http://localhost:5001/api/upload-audio", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Upload failed");
      }

      const result = await uploadResponse.json();
      setUploadStatus("Upload successful! Redirecting to feedback...");

      navigate("/feedback", { state: { evaluation: result.result } });

    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Upload failed: " + error.message);
    }
  };

  return (
    <div className="speak-page-wrapper">
      <Header />
      <div className="speak-page">
        <h1 className="topic-title">Today's Topic: AI in Communication</h1>

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
              <button
                onClick={handleDownload}
                className="action-button download-button"
              >
                Submit & Get Feedback
              </button>
            </div>
            {uploadStatus && <p className="upload-status-text">{uploadStatus}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeakPage;