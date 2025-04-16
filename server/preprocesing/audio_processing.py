import datetime
import os
import librosa
import soundfile as sf

# Load the audio file (original sample rate, convert to mono)
directory_path = '/Users/niloyahmed/499A3.0/speakedge/server/AudioFiles'

# Get all files in the directory
files = [f for f in os.listdir(directory_path) if os.path.isfile(os.path.join(directory_path, f))]

# Get the latest file based on modification time
latest_file = max(files, key=lambda f: os.path.getmtime(os.path.join(directory_path, f)))

# Build the full path for the latest file
file_path = os.path.join(directory_path, latest_file)

audio, sr = librosa.load(file_path, sr=None, mono=True)  # Load as mono

# Peak normalization (avoid division by zero if silent audio)
max_val = max(abs(audio)) if max(abs(audio)) != 0 else 1.0
normalized_audio = (audio / max_val) * 0.99  # Scale to 0.99 for safety

# Save the normalized mono audio (16-bit PCM format)
timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
output_path = f'/Users/niloyahmed/499A3.0/speakedge/server/AudioFiles/clearAudio/output_audio_{timestamp}.wav'
sf.write(output_path, normalized_audio, sr, subtype='PCM_16')

print(f"✅ Processed and saved to '{output_path}'")