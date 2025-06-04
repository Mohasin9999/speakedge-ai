import torchaudio
import numpy as np

class FluencyEvaluator:
    def extract_features(self, audio_path, transcription):
        waveform, sample_rate = torchaudio.load(audio_path)
        waveform = waveform.squeeze(0)
        if waveform.ndimension() > 1:
            waveform = waveform.mean(dim=0)

        words = transcription.split()
        speech_duration = waveform.size(0) / sample_rate / 60
        speech_rate = len(words) / speech_duration
        pause_duration = self._detect_pauses(waveform, sample_rate)
        return speech_rate, pause_duration

    def _detect_pauses(self, waveform, sample_rate, silence_threshold=0.01, window_size=1024):
        energy = np.square(waveform.numpy())
        pause_indices = [i for i in range(0, len(energy), window_size)
                         if np.mean(energy[i:i + window_size]) < silence_threshold]
        pause_durations = [(pause_indices[i + 1] - pause_indices[i]) / sample_rate
                           for i in range(len(pause_indices) - 1)]
        return sum(pause_durations)

    def evaluate(self, speech_rate, pause_duration):
        if speech_rate > 160 and pause_duration < 1.5:
            return 9
        elif 140 <= speech_rate <= 160 and pause_duration < 2:
            return 8
        elif 120 <= speech_rate < 140 and pause_duration < 3:
            return 7
        elif 100 <= speech_rate < 120 and pause_duration < 4:
            return 6
        return 5