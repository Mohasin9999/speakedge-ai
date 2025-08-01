# server/app.py
import os
import uuid
from flask import Flask, request, jsonify
from flask_cors import CORS
import traceback

# Import the analysis function from your refactored module
from whisper.analyzer import analyze_audio

# --- Flask App Initialization ---
app = Flask(__name__)
# Allow requests from your React app's origin
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# --- Directory Setup ---
# Create temporary directories to store audio files
TEMP_DIR = os.path.join(os.path.dirname(__file__), "temp_audio")
RAW_AUDIO_DIR = os.path.join(TEMP_DIR, "raw")
CLEAN_AUDIO_DIR = os.path.join(TEMP_DIR, "clean")

os.makedirs(RAW_AUDIO_DIR, exist_ok=True)
os.makedirs(CLEAN_AUDIO_DIR, exist_ok=True)

# --- API Endpoint ---
@app.route("/api/analyze-audio", methods=["POST"])
def analyze_audio_route():
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file part in the request"}), 400

    audio_file = request.files['audio']

    if audio_file.filename == '':
        return jsonify({"error": "No selected audio file"}), 400

    # Generate a unique filename to prevent conflicts
    unique_filename = f"{uuid.uuid4()}.wav"
    raw_audio_path = os.path.join(RAW_AUDIO_DIR, unique_filename)
    
    # This will be the path to the cleaned audio, which the analyzer will create
    # We need to know its potential path for cleanup later
    clean_audio_path = os.path.join(CLEAN_AUDIO_DIR, unique_filename)

    try:
        # 1. Save the uploaded raw audio file
        audio_file.save(raw_audio_path)

        # 2. Call the analysis function
        analysis_results = analyze_audio(raw_audio_path, CLEAN_AUDIO_DIR)

        if analysis_results is None:
            return jsonify({"error": "Failed to analyze audio."}), 500

        # 3. Return the results as JSON
        return jsonify(analysis_results), 200

    except Exception as e:
        # Log the full error for debugging
        print(traceback.format_exc())
        return jsonify({"error": f"An internal server error occurred: {e}"}), 500
        
    finally:
        # 4. Securely delete the temporary files
        if os.path.exists(raw_audio_path):
            os.remove(raw_audio_path)
            print(f"Cleaned up raw file: {raw_audio_path}")
        if os.path.exists(clean_audio_path):
            os.remove(clean_audio_path)
            print(f"Cleaned up clean file: {clean_audio_path}")


# --- Main Execution ---
if __name__ == "__main__":
    # Run the app on port 5001 to match your frontend code
    app.run(host="0.0.0.0", port=5001, debug=True)