import os
import librosa
import soundfile as sf
from pydub import AudioSegment

class AudioPreprocessor:
    def __init__(self, source_dir, target_dir):
        self.source_dir = source_dir
        self.target_dir = target_dir

    def get_latest_file(self):
        files = [f for f in os.listdir(self.source_dir)
                 if os.path.isfile(os.path.join(self.source_dir, f))]
        if not files:
            return None
        latest_file = max(files, key=lambda f: os.path.getmtime(os.path.join(self.source_dir, f)))
        return os.path.join(self.source_dir, latest_file)

    def preprocess_and_resample(self):
        latest_file = self.get_latest_file()
        if not latest_file:
            print("❌ No audio file found for preprocessing.")
            return None

        # Preprocess (trim silence)
        y, sr = librosa.load(latest_file, sr=None)
        y, _ = librosa.effects.trim(y)

        # Save a temporary file in memory for pydub to handle
        temp_path = os.path.join(self.target_dir, "_temp.wav")
        os.makedirs(self.target_dir, exist_ok=True)
        sf.write(temp_path, y, sr)

        # Resample to 16kHz and save final output
        audio = AudioSegment.from_file(temp_path)
        audio = audio.set_frame_rate(16000)
        final_path = os.path.join(self.target_dir, os.path.splitext(os.path.basename(latest_file))[0] + "_16k.wav")
        audio.export(final_path, format="wav")

        # Remove the temporary file
        os.remove(temp_path)

        return final_path
