import whisper
import os
import warnings
import language_tool_python

warnings.filterwarnings("ignore")

# --- Configuration ---
model = whisper.load_model("medium")  # use "small" if you want faster loading

def transcribe_audio(audio_path):
    result = model.transcribe(audio_path)
    return result["text"]

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

    
# --- Main Logic ---
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
        print(f"\nImproved Transcription: {transcription}")
        evaluate_grammar(transcription)
    else:
        print("No valid audio files found.")