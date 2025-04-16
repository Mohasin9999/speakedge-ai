# server/app.py or wherever your Flask backend lives

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename

# ✅ Import your evaluation script
from preprocessing.OverAllPerformance import evaluate_audio

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/api/upload-audio", methods=["POST"])
def upload_audio():
    if "audio" not in request.files:
        return jsonify({"message": "No audio file provided"}), 400

    audio_file = request.files["audio"]
    user_id = request.form.get("userId", "default_user")
    filename = secure_filename(audio_file.filename)
    save_path = os.path.join(UPLOAD_FOLDER, filename)
    audio_file.save(save_path)

    try:
        # ✅ Call your evaluator
        result = evaluate_audio(save_path)

        return jsonify({
            "message": "File uploaded successfully",
            "result": result
        })
    except Exception as e:
        print("Error in evaluation:", str(e))
        return jsonify({
            "message": "Error during evaluation",
            "error": str(e)
        }), 500