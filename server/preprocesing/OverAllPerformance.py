from flask import Flask, jsonify, request
from flask_cors import CORS
import whisper
import pronouncing
import os
import warnings
import re 
import torchaudio
import numpy as np
import language_tool_python
warnings.filterwarnings("ignore")

app = Flask(__name__)
CORS(app)  # Allow all domains by default

# --- Configuration ---
model = whisper.load_model("medium") 

def transcribe_audio(audio_path):
    result = model.transcribe(audio_path)
    return result["text"]

# Path to uploaded audio files
directory_path = "/Users/niloyahmed/499A3.0/speakedge/server/AudioFiles/clearAudio"

# Get all files in the directory
files = [f for f in os.listdir(directory_path) if os.path.isfile(os.path.join(directory_path, f))]

# Get the latest file based on modification time
latest_file = max(files, key=lambda f: os.path.getmtime(os.path.join(directory_path, f)))

# Build the full path for the latest file
audio_path = os.path.join(directory_path, latest_file)

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
        
    else:
        print("No valid audio files found.")
@app.route('/evaluate', methods=['POST'])
def evaluate():
    # Get the audio file from the frontend
    file = request.files['audio']
    file_path = f"./AudioFiles/{file.filename}"
    file.save(file_path)
    
    # Process the audio and return evaluation results
    grammar_score = evaluate_grammar(transcription)
    
    # Return results as JSON
    return jsonify({
        'transcription': transcription,
        'fluency_score': fluency_score,
        'pronunciation_score': pronunciation_score,
        'mispronounced_words': mispronounced_words,
        'vocabulary_score': vocabulary_score,
        'grammar_score': grammar_score
    })

##############################
#--- Evaluating Fluency ---
################################
print("\n--- Evaluating Fluency ---\n")
def extract_features(audio_path):
    waveform, sample_rate = torchaudio.load(audio_path)
    
    # If the waveform has more than 2 dimensions, squeeze it to remove extra dimensions
    waveform = waveform.squeeze(0)  # Remove the channel dimension if it's present
    if waveform.ndimension() > 2:
        waveform = waveform.mean(dim=0)  # Handle multi-channel audio by averaging

    # Ensure the waveform is 2D: (batch_size, sequence_length)
    # Convert the audio waveform to numpy array (Whisper requires numpy)
    
    words = transcription.split()
    speech_duration = waveform.size(0) / sample_rate / 60  # Convert duration to minutes
    speech_rate = len(words) / speech_duration

    # Detect pauses (same logic as before)
    def detect_pauses(waveform, sample_rate, silence_threshold=0.01, window_size=1024):
        # Ensure waveform is 1D for energy calculation
        if waveform.ndimension() > 1:
            waveform = waveform.mean(dim=0)  # Average over channels if multi-channel
        
        energy = np.square(waveform.numpy())  # Calculate energy
        pause_indices = []
        for i in range(0, len(energy), window_size):
            if np.mean(energy[i:i + window_size]) < silence_threshold:
                pause_indices.append(i)

        pause_durations = []
        for i in range(len(pause_indices) - 1):
            pause_duration = (pause_indices[i + 1] - pause_indices[i]) / sample_rate
            pause_durations.append(pause_duration)

        return sum(pause_durations)

    pause_duration = detect_pauses(waveform, sample_rate)

    return speech_rate, pause_duration, transcription

def evaluate_fluency(speech_rate, pause_duration):
    # Define criteria for fluency
    if speech_rate > 160 and pause_duration < 1.5:
        fluency_score = 9
    elif 140 <= speech_rate <= 160 and pause_duration < 2:
        fluency_score = 8
    elif 120 <= speech_rate < 140 and pause_duration < 3:
        fluency_score = 7
    elif 100 <= speech_rate < 120 and pause_duration < 4:
        fluency_score = 6
    else:
        fluency_score = 5  # For slower speech or longer pauses

    return fluency_score
speech_rate, pause_duration, transcription = extract_features(audio_path)

fluency_score = evaluate_fluency(speech_rate, pause_duration)

# Display the results
print(f"Speech Rate: {speech_rate} words per minute")
print(f"Pause Duration: {pause_duration} seconds")
print(f"Fluency Score (IELTS-like): {fluency_score}/9")

###################################
# --- Pronunciation Evaluation ---
##################################
print("\n--- Evaluating Pronunciation ---")

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
        
        pronunciation_score, mispronounced_words = evaluate_pronunciation_score(transcription)
        print(f"\nPronunciation Score (IELTS-like): {pronunciation_score}")

        if mispronounced_words:
            print("\nPossibly Mispronounced or Unclear Words:")
            print(", ".join(mispronounced_words))
        else:
            print("\n All words likely pronounced clearly.")
    else:
        print("No valid audio files found.")

###################################
# --- vocabulary Evaluation ---
##################################
def evaluate_vocabulary(transcription):
   
    if not transcription or not isinstance(transcription, str):
        print("Cannot evaluate vocabulary: Invalid transcription provided.")
        return 0, 0, 0.0

    print("\n--- Evaluating Vocabulary ---")

    # 1. Preprocess Text for Vocabulary Analysis:
    #    - Lowercase everything
    #    - Remove punctuation (important!)
    text_lower = transcription.lower()
    # Removes punctuation, keeps words and spaces. Handles apostrophes within words better.
    text_cleaned = re.sub(r"[^\w\s']|'(?!\w)|(?<!\w)'", '', text_lower)
    # Specifically remove underscores that might remain if source had them
    text_cleaned = text_cleaned.replace('_', '')
    print(f"Cleaned Text for Vocab: {text_cleaned}")

    # 2. Tokenize (Split into words)
    words = text_cleaned.split()

    if not words:
        print("No words found in transcription after cleaning.")
        return 0, 0, 0.0

    # 3. Calculate Metrics
    total_words = len(words)
    unique_words_set = set(words)
    num_unique_words = len(unique_words_set)

    # Calculate Type-Token Ratio (TTR)
    ttr = num_unique_words / total_words if total_words > 0 else 0.0

    print(f"Total words counted: {total_words}")
    print(f"Unique words counted: {num_unique_words}")
    print(f"Type-Token Ratio (TTR): {ttr:.4f}")
    # print(f"Unique word list: {sorted(list(unique_words_set))}") # Uncomment to see the list

    return total_words, num_unique_words, ttr

# --- Main Execution Logic ---
if __name__ == "__main__":
    try:
        # 2. Evaluate Vocabulary (only if transcription was successful)
        if transcription:
            total_w, unique_w, vocabulary_ttr = evaluate_vocabulary(transcription)

            # Print Vocabulary Summary
            print("\n--- Vocabulary Summary ---")
            print(f"- Total Words: {total_w}")
            print(f"- Unique Words: {unique_w}")
            print(f"- Lexical Diversity (TTR): {vocabulary_ttr:.4f}")

                       # Map TTR to IELTS-like band score
            if vocabulary_ttr >= 0.70:
                vocabulary_score = 9
                print(f"- Band Score: {vocabulary_score} (Excellent vocabulary range)")
            elif vocabulary_ttr >= 0.60:
                vocabulary_score = 8
                print(f"- Band Score: {vocabulary_score} (Very good vocabulary range)")
            elif vocabulary_ttr >= 0.50:
                vocabulary_score = 7
                print(f"- Band Score: {vocabulary_score} (Good vocabulary range)")
            elif vocabulary_ttr >= 0.40:
                vocabulary_score = 6
                print(f"- Band Score: {vocabulary_score} (Competent vocabulary range)")
            elif vocabulary_ttr >= 0.30:
                vocabulary_score = 5
                print(f"- Band Score: {vocabulary_score} (Modest vocabulary range)")
            elif vocabulary_ttr >= 0.20:
                vocabulary_score = 4
                print(f"- Band Score: {vocabulary_score} (Limited vocabulary range)")
            elif vocabulary_ttr >= 0.10:
                vocabulary_score = 3
                print(f"- Band Score: {vocabulary_score} (Extremely limited vocabulary)")
            elif vocabulary_ttr > 0:
                vocabulary_score = 2
                print(f"- Band Score: {vocabulary_score} (Intermittent vocabulary)")
            else:
                vocabulary_score = 1
                print(f"- Band Score: {vocabulary_score} (Non-user / No vocabulary detected)")
        else:
            print("\nVocabulary evaluation skipped due to transcription error or empty transcription.")
    
    except Exception as e:
        print(f"\nAn unexpected error occurred in the main execution:")
        import traceback
        traceback.print_exc()

###################################
# --- grammar Evaluation ---
##################################
def evaluate_grammar(text):
    print("\n--- Evaluating Grammar ---")
    tool = language_tool_python.LanguageTool('en-US')
    matches = tool.check(text)

    issue_count = len(matches)

    # IELTS-style band scoring
    if issue_count == 0:
        band = 9
    elif issue_count <= 2:
        band = 8
    elif issue_count <= 4:
        band = 7
    elif issue_count <= 6:
        band = 6
    elif issue_count <= 8:
        band = 5
    elif issue_count <= 10:
        band = 4
    elif issue_count <= 12:
        band = 3
    elif issue_count <= 14:
        band = 2
    elif issue_count >= 15:
        band = 1
    else:
        band = 0  # fallback for edge cases

    if issue_count == 0:
        print("No grammar issues found!")
    else:
        for match in matches:
            print(f"Issue: {match.message}")
            print(f"Suggestion: {match.replacements}")
            print(f"Context: {text[match.offset:match.offset + match.errorLength]}")
            print("---")

    print(f"\n📝 Estimated IELTS Grammar Band: {band}/9")
if files:
        evaluate_grammar(transcription)
else:
        print("No valid audio files found.")

