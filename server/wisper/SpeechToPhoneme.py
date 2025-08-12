import subprocess
import re
import torch
from transformers import Wav2Vec2Processor, Wav2Vec2ForCTC
import torchaudio


class SpeechToPhoneme:
    def __init__(self, model_path="facebook/wav2vec2-xlsr-53-phon-cv-ft"):
        self.processor = Wav2Vec2Processor.from_pretrained(model_path)
        self.model = Wav2Vec2ForCTC.from_pretrained(model_path)

    def _clean_phonemes(self, phoneme_str):
        # Remove underscores, extra spaces, and stress marks
        phoneme_str = re.sub(r"[_ˈˌː]", "", phoneme_str)
        phoneme_str = re.sub(r"\s+", "", phoneme_str)  # No spaces at all
        return phoneme_str.strip()

    def extract_phonemes(self, audio_path):
        waveform, sample_rate = torchaudio.load(audio_path)
        inputs = self.processor(waveform.squeeze(), sampling_rate=sample_rate, return_tensors="pt", padding=True)

        with torch.no_grad():
            logits = self.model(**inputs).logits

        predicted_ids = torch.argmax(logits, dim=-1)
        transcription = self.processor.batch_decode(predicted_ids)[0]
        return self._clean_phonemes(transcription)

    def get_reference_phonemes(self, text):
        result = subprocess.run(
            ["espeak", "-q", "--ipa=3", text],
            capture_output=True,
            text=True
        )
        return self._clean_phonemes(result.stdout)