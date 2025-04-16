import pronouncing
import whisper
import os
import warnings
warnings.filterwarnings("ignore")

# Load the latest Whisper model
model = whisper.load_model("medium")

def transcribe_audio(audio_path):
    result = model.transcribe(audio_path)
    return result["text"]

def evaluate_pronunciation_score(transcription):
    words = transcription.split()
    total_score = 0
    word_count = len(words)

    for word in words:
        word_phonemes = pronouncing.phones_for_word(word.lower())
        if word_phonemes:
            # Assuming phonemes match if the transcription is accurate
            total_score += 5  # Perfect match score
        else:
            total_score += 1  # If no phoneme match (wrong or unknown word)
    
    pronunciation_score = total_score / (word_count * 5) * 100  # Score as a percentage
    return pronunciation_score

# Path to uploaded audio files
directory_path = "/Users/niloyahmed/project499A/speakedge-ai/server/uploads/recordings"

if not os.path.exists(directory_path) or not os.listdir(directory_path):
    print("No audio files found.")
else:
    audio_extensions = [".mp3", ".wav", ".m4a"]
    files = [os.path.join(directory_path, f)
             for f in os.listdir(directory_path)
             if os.path.isfile(os.path.join(directory_path, f)) and
             os.path.splitext(f)[1].lower() in audio_extensions]

    if files:
        latest_file = max(files, key=os.path.getmtime)
        transcription = transcribe_audio(latest_file)
        print(f"Improved Transcription: {transcription}")
        
        pronunciation_score = evaluate_pronunciation_score(transcription)
        print(f"Pronunciation Score (IELTS-like): {pronunciation_score:.2f}%")
    else:
        print("No valid audio files found.")