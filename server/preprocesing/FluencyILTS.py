import whisper
import os
import torchaudio
import numpy as np
import warnings
warnings.filterwarnings("ignore")

# Load Whisper Medium model
model = whisper.load_model("medium")

# Process the audio and extract speech features
def extract_features(audio_path):
    waveform, sample_rate = torchaudio.load(audio_path)
    
    # If the waveform has more than 2 dimensions, squeeze it to remove extra dimensions
    waveform = waveform.squeeze(0)  # Remove the channel dimension if it's present
    if waveform.ndimension() > 2:
        waveform = waveform.mean(dim=0)  # Handle multi-channel audio by averaging

    # Ensure the waveform is 2D: (batch_size, sequence_length)
    # Convert the audio waveform to numpy array (Whisper requires numpy)
    audio_np = waveform.numpy()

    # Transcribe using Whisper
    result = model.transcribe(audio_np)
    transcription = result['text']
    
    words = transcription.split()
    speech_duration = waveform.size(0) / sample_rate / 60  # Convert duration to minutes
    speech_rate = len(words) / speech_duration

    # Detect pauses (same logic as before)
    def detect_pauses(waveform, sample_rate, silence_threshold=0.01, window_size=1024):
        # Ensure waveform is 1D for energy calculation
        if waveform.ndimension() > 1:
            waveform = waveform.mean(dim=0)  # Average over channels if multi-channel
        
        energy = np.square(waveform.numpy())  # Calculate energy
        pause_indices = []
        for i in range(0, len(energy), window_size):
            if np.mean(energy[i:i + window_size]) < silence_threshold:
                pause_indices.append(i)

        pause_durations = []
        for i in range(len(pause_indices) - 1):
            pause_duration = (pause_indices[i + 1] - pause_indices[i]) / sample_rate
            pause_durations.append(pause_duration)

        return sum(pause_durations)

    pause_duration = detect_pauses(waveform, sample_rate)

    return speech_rate, pause_duration, transcription

# Fluency Evaluation: Based on speech rate and pause duration
def evaluate_fluency(speech_rate, pause_duration):
    # Define criteria for fluency
    if speech_rate > 160 and pause_duration < 1.5:
        fluency_score = 9
    elif 140 <= speech_rate <= 160 and pause_duration < 2:
        fluency_score = 8
    elif 120 <= speech_rate < 140 and pause_duration < 3:
        fluency_score = 7
    elif 100 <= speech_rate < 120 and pause_duration < 4:
        fluency_score = 6
    else:
        fluency_score = 5  # For slower speech or longer pauses

    return fluency_score

# Load the audio file (original sample rate, convert to mono)
directory_path = '/Users/niloyahmed/project499A/speakedge-ai/server/uploads/recordings'

# Get all files in the directory
files = [f for f in os.listdir(directory_path) if os.path.isfile(os.path.join(directory_path, f))]

# Get the latest file based on modification time
latest_file = max(files, key=lambda f: os.path.getmtime(os.path.join(directory_path, f)))

# Build the full path for the latest file
audio_path = os.path.join(directory_path, latest_file)
speech_rate, pause_duration, transcription = extract_features(audio_path)

# Evaluate Fluency
fluency_score = evaluate_fluency(speech_rate, pause_duration)

# Display the results
print(f"Improved Transcription: {transcription}")
print(f"Speech Rate: {speech_rate} words per minute")
print(f"Pause Duration: {pause_duration} seconds")
print(f"Fluency Score (IELTS-like): {fluency_score}/9")