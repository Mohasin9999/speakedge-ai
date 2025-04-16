from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from speakedge.server.preprocesing.OverAllPerformance import evaluate_audio

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/api/upload-audio", methods=["POST"])
def upload_audio():
    if "audio" not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    file = request.files["audio"]
    user_id = request.form.get("userId", "anonymous")
    filename = f"{user_id}.wav"
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    try:
        result = evaluate_audio(filepath)  # Run your OverAllPerformance.py logic
        return jsonify({"result": result}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="localhost", port=5001)