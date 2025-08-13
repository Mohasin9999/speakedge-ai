import torch
import numpy as np
from pydub import AudioSegment
from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor
from phonemizer import phonemize
from phonemizer.backend import EspeakBackend
import torchaudio

class SpeechToPhoneme:
    def __init__(self, model_name="facebook/wav2vec2-base-960h"):
        """
        Initializes the processor, model, and explicitly sets the eSpeak backend path.
        """
        # --- THE FIX ---
        # We are explicitly telling phonemizer where to find the espeak executable.
        # This bypasses any and all system PATH issues.
        EspeakBackend.set_executable('C:\\Program Files\\eSpeak NG\\espeak-ng.exe')
        
        self.processor = Wav2Vec2Processor.from_pretrained(model_name)
        self.model = Wav2Vec2ForCTC.from_pretrained(model_name)

    def extract_phonemes(self, audio_path):
        """
        Loads an audio file using pydub, converts it to a PyTorch tensor,
        and then processes it to extract a phoneme sequence.
        """
        audio = AudioSegment.from_file(audio_path, format="webm")
        sample_rate = audio.frame_rate
        samples = np.array(audio.get_array_of_samples()).astype(np.float32)
        samples /= (2**(audio.sample_width * 8 - 1))
        waveform = torch.from_numpy(samples).unsqueeze(0)
        
        if sample_rate != 16000:
            resampler = torchaudio.transforms.Resample(orig_freq=sample_rate, new_freq=16000)
            waveform = resampler(waveform)
        
        input_values = self.processor(waveform, sampling_rate=16000, return_tensors="pt").input_values
        
        with torch.no_grad():
            logits = self.model(input_values.squeeze(0)).logits
        
        predicted_ids = torch.argmax(logits, dim=-1)
        transcription = self.processor.batch_decode(predicted_ids)[0]
        
        phonemes = self.get_reference_phonemes(transcription)
        
        return phonemes

    def get_reference_phonemes(self, text):
        """
        Converts a string of text into a sequence of phonemes using the now-configured espeak backend.
        """
        reference_phonemes = phonemize(
            text,
            language='en-us',
            backend='espeak',
            strip=True,
            preserve_punctuation=False,
            njobs=4
        )
        return reference_phonemes