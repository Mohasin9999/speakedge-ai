import datetime
import os
import librosa
import soundfile as sf

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

    def normalize_and_save(self):
        file_path = self.get_latest_file()
        if not file_path:
            print("❌ No audio files found.")
            return None

        audio, sr = librosa.load(file_path, sr=None, mono=True)
        max_val = max(abs(audio)) if max(abs(audio)) != 0 else 1.0
        normalized_audio = (audio / max_val) * 0.99

        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        output_filename = f"output_audio_{timestamp}.wav"
        output_path = os.path.join(self.target_dir, output_filename)

        sf.write(output_path, normalized_audio, sr, subtype='PCM_16')
        print(f"✅ Processed and saved to '{output_path}'")
        return output_path