import whisper
import os
import warnings
import re 
warnings.filterwarnings("ignore")

# --- Configuration ---
model = whisper.load_model("medium") 

def transcribe_audio(audio_path):
    result = model.transcribe(audio_path)
    return result["text"]

directory_path = "/Users/niloyahmed/project499A/speakedge-ai/server/uploads/recordings"

files = [f for f in os.listdir(directory_path) if os.path.isfile(os.path.join(directory_path, f))]

# Get the latest file based on modification time
latest_file = max(files, key=lambda f: os.path.getmtime(os.path.join(directory_path, f)))

# Build the full path for the latest file
audio_path = os.path.join(directory_path, latest_file)

# --- Function to Get Transcription (Simplified) ---
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
       

# --- Function to Evaluate Vocabulary (Unchanged from your original script) ---
def evaluate_vocabulary(transcription):
   
    if not transcription or not isinstance(transcription, str):
        print("Cannot evaluate vocabulary: Invalid transcription provided.")
        return 0, 0, 0.0

    print("\n--- Evaluating Vocabulary ---")
    print(f"Original Transcription: {transcription}")

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
                vocab_band = 9
                print(f"- Band Score: {vocab_band} (Excellent vocabulary range)")
            elif vocabulary_ttr >= 0.60:
                vocab_band = 8
                print(f"- Band Score: {vocab_band} (Very good vocabulary range)")
            elif vocabulary_ttr >= 0.50:
                vocab_band = 7
                print(f"- Band Score: {vocab_band} (Good vocabulary range)")
            elif vocabulary_ttr >= 0.40:
                vocab_band = 6
                print(f"- Band Score: {vocab_band} (Competent vocabulary range)")
            elif vocabulary_ttr >= 0.30:
                vocab_band = 5
                print(f"- Band Score: {vocab_band} (Modest vocabulary range)")
            elif vocabulary_ttr >= 0.20:
                vocab_band = 4
                print(f"- Band Score: {vocab_band} (Limited vocabulary range)")
            elif vocabulary_ttr >= 0.10:
                vocab_band = 3
                print(f"- Band Score: {vocab_band} (Extremely limited vocabulary)")
            elif vocabulary_ttr > 0:
                vocab_band = 2
                print(f"- Band Score: {vocab_band} (Intermittent vocabulary)")
            else:
                vocab_band = 1
                print(f"- Band Score: {vocab_band} (Non-user / No vocabulary detected)")
        else:
            print("\nVocabulary evaluation skipped due to transcription error or empty transcription.")
    
    except Exception as e:
        print(f"\nAn unexpected error occurred in the main execution:")
        import traceback
        traceback.print_exc()