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
    mispronounced_words = []

    for word in words:
        word_phonemes = pronouncing.phones_for_word(word.lower())
        if word_phonemes:
            total_score += 5  # Assume correct pronunciation
        else:
            total_score += 1  # Possibly mispronounced or unclear
            mispronounced_words.append(word)

    if word_count == 0:
        return 0, []

    percentage_score = total_score / (word_count * 5) * 100  # Score as a percentage

    if percentage_score >= 90:
        band_score = 9
    elif percentage_score >= 80:
        band_score = 8
    elif percentage_score >= 70:
        band_score = 7
    elif percentage_score >= 60:
        band_score = 6
    elif percentage_score >= 50:
        band_score = 5
    elif percentage_score >= 40:
        band_score = 4
    elif percentage_score >= 30:
        band_score = 3
    elif percentage_score >= 20:
        band_score = 2
    elif percentage_score >= 10:
        band_score = 1
    else:
        band_score = 0

    return band_score, mispronounced_words

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
        print(f"\nTranscription: {transcription}")
        pronunciation_score, mispronounced_words = evaluate_pronunciation_score(transcription)
        print(f"\nPronunciation Score (IELTS-like): {pronunciation_score}")

        if mispronounced_words:
            print("\nPossibly Mispronounced or Unclear Words:")
            print(", ".join(mispronounced_words))
        else:
            print("\n All words likely pronounced clearly.")
    else:
        print("No valid audio files found.")