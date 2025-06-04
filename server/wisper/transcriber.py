import whisper

class Transcriber:
    def __init__(self, model_size="medium"):
        self.model = whisper.load_model(model_size)

    def transcribe(self, audio_path):
        result = self.model.transcribe(audio_path)
        return result["text"]