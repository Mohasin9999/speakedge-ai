import os
import re
import warnings
import whisper
import torchaudio
import numpy as np
import pronouncing
import language_tool_python

warnings.filterwarnings("ignore")

# --- Load Whisper Model ---
model = whisper.load_model("medium")

# --- Utility Functions ---
def get_latest_audio_file(directory_path, extensions=[".mp3", ".wav", ".m4a"]):
    if not os.path.exists(directory_path) or not os.listdir(directory_path):
        return None

    files = [os.path.join(directory_path, f)
             for f in os.listdir(directory_path)
             if os.path.isfile(os.path.join(directory_path, f)) and
             os.path.splitext(f)[1].lower() in extensions]

    return max(files, key=os.path.getmtime) if files else None

# --- Transcription ---
def transcribe_audio(audio_path):
    result = model.transcribe(audio_path)
    return result["text"]

# --- Fluency Evaluation ---
def extract_features(audio_path, transcription):
    waveform, sample_rate = torchaudio.load(audio_path)
    waveform = waveform.squeeze(0)
    if waveform.ndimension() > 1:
        waveform = waveform.mean(dim=0)

    words = transcription.split()
    speech_duration = waveform.size(0) / sample_rate / 60
    speech_rate = len(words) / speech_duration

    def detect_pauses(waveform, sample_rate, silence_threshold=0.01, window_size=1024):
        energy = np.square(waveform.numpy())
        pause_indices = [i for i in range(0, len(energy), window_size)
                         if np.mean(energy[i:i + window_size]) < silence_threshold]

        pause_durations = [(pause_indices[i + 1] - pause_indices[i]) / sample_rate
                           for i in range(len(pause_indices) - 1)]

        return sum(pause_durations)

    pause_duration = detect_pauses(waveform, sample_rate)
    return speech_rate, pause_duration

def evaluate_fluency(speech_rate, pause_duration):
    if speech_rate > 160 and pause_duration < 1.5:
        return 9
    elif 140 <= speech_rate <= 160 and pause_duration < 2:
        return 8
    elif 120 <= speech_rate < 140 and pause_duration < 3:
        return 7
    elif 100 <= speech_rate < 120 and pause_duration < 4:
        return 6
    return 5

# --- Pronunciation Evaluation ---
def evaluate_pronunciation_score(transcription):
    words = transcription.split()
    total_score = 0
    mispronounced_words = []

    for word in words:
        phonemes = pronouncing.phones_for_word(word.lower())
        total_score += 5 if phonemes else 1
        if not phonemes:
            mispronounced_words.append(word)

    word_count = len(words)
    if word_count == 0:
        return 0, []

    percentage_score = total_score / (word_count * 5) * 100
    if percentage_score >= 90:
        return 9, mispronounced_words
    elif percentage_score >= 80:
        return 8, mispronounced_words
    elif percentage_score >= 70:
        return 7, mispronounced_words
    elif percentage_score >= 60:
        return 6, mispronounced_words
    elif percentage_score >= 50:
        return 5, mispronounced_words
    elif percentage_score >= 40:
        return 4, mispronounced_words
    elif percentage_score >= 30:
        return 3, mispronounced_words
    elif percentage_score >= 20:
        return 2, mispronounced_words
    elif percentage_score >= 10:
        return 1, mispronounced_words
    return 0, mispronounced_words

# --- Vocabulary Evaluation ---
def evaluate_vocabulary(transcription):
    print("\n--- Evaluating Vocabulary ---")
    text_cleaned = re.sub(r"[^\w\s']|'(?!\w)|(?<!\w)'", '', transcription.lower()).replace('_', '')
    words = text_cleaned.split()

    if not words:
        return 0, 0, 0.0

    total_words = len(words)
    unique_words = set(words)
    ttr = len(unique_words) / total_words
    return total_words, len(unique_words), ttr

# --- Grammar Evaluation ---
def evaluate_grammar(transcription):
    print("\n--- Evaluating Grammar ---")
    tool = language_tool_python.LanguageTool('en-US')
    matches = tool.check(transcription)
    issue_count = len(matches)

    if issue_count == 0:
        print("No grammar issues found!")
    else:
        for match in matches:
            print(f"Issue: {match.message}")
            print(f"Suggestion: {match.replacements}")
            print(f"Context: {transcription[match.offset:match.offset + match.errorLength]}")
            print("---")

    band = 9 - min(issue_count // 2, 8)
    print(f"\n📝 Estimated IELTS Grammar Band: {band}/9")
    return band

# --- Main Pipeline ---
def main():
    audio_dir = "/Users/niloyahmed/499A3.0/speakedge/server/AudioFiles/clearAudio"
    audio_path = get_latest_audio_file(audio_dir)

    if not audio_path:
        print("No valid audio files found.")
        return

    transcription = transcribe_audio(audio_path)
    print(f"\nTranscription: {transcription}\n")

    print("\n--- Evaluating Fluency ---")
    speech_rate, pause_duration = extract_features(audio_path, transcription)
    fluency_score = evaluate_fluency(speech_rate, pause_duration)
    print(f"Speech Rate: {speech_rate:.2f} words/min")
    print(f"Pause Duration: {pause_duration:.2f} seconds")
    print(f"Fluency Score (IELTS-like): {fluency_score}/9")

    print("\n--- Evaluating Pronunciation ---")
    pronunciation_score, mispronounced = evaluate_pronunciation_score(transcription)
    print(f"Pronunciation Score (IELTS-like): {pronunciation_score}/9")
    if mispronounced:
        print("Mispronounced or Unclear Words:", ", ".join(mispronounced))
    else:
        print("All words likely pronounced clearly.")

    total_w, unique_w, ttr = evaluate_vocabulary(transcription)
    print("\n--- Vocabulary Summary ---")
    print(f"Total Words: {total_w}, Unique Words: {unique_w}, TTR: {ttr:.4f}")
    if ttr >= 0.70:
        vocab_score = 9
    elif ttr >= 0.60:
        vocab_score = 8
    elif ttr >= 0.50:
        vocab_score = 7
    elif ttr >= 0.40:
        vocab_score = 6
    elif ttr >= 0.30:
        vocab_score = 5
    elif ttr >= 0.20:
        vocab_score = 4
    elif ttr >= 0.10:
        vocab_score = 3
    elif ttr > 0:
        vocab_score = 2
    else:
        vocab_score = 1
    print(f"Vocabulary Score (IELTS-like): {vocab_score}/9")

    grammar_score = evaluate_grammar(transcription)

if __name__ == "__main__":
    main()
