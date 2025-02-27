import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import { FaMicrophone, FaStop } from 'react-icons/fa';

const Speak = () => {
  const [recording, setRecording] = useState(false);
  const [blobURL, setBlobURL] = useState(null);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const startRecording = () => {
    setRecording(true);
    setBlobURL(null);
    let count = 0;
    const id = setInterval(() => {
      count += 1;
      setTimer(count);
    }, 1000);
    setIntervalId(id);
  };

  const stopRecording = () => {
    setRecording(false);
    clearInterval(intervalId);
    setTimer(0);
  };

  const onData = () => {
    // You can use this function to process audio data in real time
  };

  const onStop = (recordedBlob) => {
    setBlobURL(recordedBlob.blobURL);
    const link = document.createElement('a');
    link.href = recordedBlob.blobURL;
    link.download = `recording-${Date.now()}.wav`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-white text-center font-sans flex flex-col items-center justify-center p-6">
      {/* Topic Section */}
      <h1 className="text-3xl font-bold text-accent mb-4 font-dancingScript">Today's Topic: AI in Communication</h1>
      
      {/* Voice Graph & Timer */}
      <div className="w-full max-w-md bg-fade p-6 rounded-lg shadow-lg mb-6 flex flex-col items-center">
        <ReactMic
          record={recording}
          className="w-full"
          onStop={onStop}
          onData={onData}
          strokeColor="#3FA6A6"
          backgroundColor="#F2F2F2"
        />
        <p className="text-lg text-gray-700 mt-4">Recording Time: {timer} sec</p>
      </div>

      {/* Mic Button */}
      <button
        className={`w-16 h-16 flex items-center justify-center rounded-full shadow-lg transition duration-300 ${recording ? 'bg-red-500' : 'bg-primary'} hover:bg-secondary`}
        onClick={recording ? stopRecording : startRecording}
      >
        {recording ? <FaStop className="text-white text-2xl" /> : <FaMicrophone className="text-white text-2xl" />}
      </button>

      {/* Playback */}
      {blobURL && (
        <div className="mt-6">
          <p className="text-lg text-gray-700">Your Recording:</p>
          <audio controls className="mt-2">
            <source src={blobURL} type="audio/wav" />
          </audio>
        </div>
      )}
    </div>
  );
};

export default Speak;