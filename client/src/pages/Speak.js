import React, { useState } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";
import { useReactMediaRecorder } from "react-media-recorder";

const Speak = () => {
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const { startRecording, stopRecording, mediaBlobUrl, status, mediaBlob } =
    useReactMediaRecorder({
      audio: true,
      blobPropertyBag: { type: "audio/wav" },
    });

  const handleStart = () => {
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
    clearInterval(intervalId);
    setTimer(0);
  };

  const handleUpload = async () => {
    if (!mediaBlob) return;

    const formData = new FormData();
    formData.append("audio", mediaBlob, `audio-${Date.now()}.wav`);
    formData.append("userId", "USER_ID"); 

    try {
      const response = await fetch("/api/upload-audio", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.message === "File uploaded successfully") {
        alert("File uploaded successfully");
      } else {
        alert("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  return (
    <div className="min-h-screen bg-white text-center font-sans flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-accent mb-4 font-dancingScript">
        Today's Topic: AI in Communication
      </h1>

      {/* Voice Graph & Timer */}
      <div className="w-full max-w-md bg-fade p-6 rounded-lg shadow-lg mb-6 flex flex-col items-center">
        <p className="text-lg text-gray-700 mt-4">
          Recording Status: {status}
        </p>
        <p className="text-lg text-gray-700 mt-2">Recording Time: {timer} sec</p>
      </div>

      {/* Mic Button */}
      <button
        className={`w-16 h-16 flex items-center justify-center rounded-full shadow-lg transition duration-300 ${
          status === "recording" ? "bg-red-500" : "bg-primary"
        } hover:bg-secondary`}
        onClick={status === "recording" ? handleStop : handleStart}
      >
        {status === "recording" ? (
          <FaStop className="text-white text-2xl" />
        ) : (
          <FaMicrophone className="text-white text-2xl" />
        )}
      </button>

      {/* Playback */}
      {mediaBlobUrl && (
        <div className="mt-6">
          <p className="text-lg text-gray-700">Your Recording:</p>
          <audio controls className="mt-2">
            <source src={mediaBlobUrl} type="audio/wav" />
          </audio>
          <a href={mediaBlobUrl} download={`recording-${Date.now()}.wav`}>
            <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary">
              Download Recording
            </button>
          </a>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary"
          >
            Upload Recording
          </button>
        </div>
      )}
    </div>
  );
};

export default Speak;
