SpeakEdge

SpeakEdge is a web application that provides automated feedback on spoken English, helping users improve their IELTS-style speaking skills. The platform uses OpenAI’s Whisper model for speech-to-text transcription ￼ and analyzes the transcript for pronunciation, vocabulary, grammar, and fluency.

Key Features
• Automatic Transcription: Uses OpenAI Whisper (a state-of-the-art speech recognition model) to convert recorded speech to text ￼.
• Pronunciation Scoring: Leverages the pronouncing library (an interface to the CMU Pronouncing Dictionary ￼) to analyze and score phonetic pronunciation.
• Grammar Checking: Employs language_tool_python (a Python API for LanguageTool) to detect grammatical and spelling errors in the transcript ￼.
• Fluency Analysis: Uses audio processing (torchaudio, a PyTorch audio library ￼) to measure speaking rate, pauses, and overall fluency.
• Interactive UI: Built with React (a JavaScript library for building user interfaces ￼) to offer a responsive, user-friendly front end.

Technologies Used
• OpenAI Whisper: Speech recognition model for transcription ￼.
• language_tool_python: Python wrapper for the open-source LanguageTool grammar checker ￼.
• pronouncing: Python interface to the CMU Pronouncing Dictionary for phonetic analysis ￼.
• torchaudio: Audio and speech processing library (PyTorch-based) ￼.
• React: Frontend framework for the user interface ￼.
• Python 3.9+: Backend language for the speech evaluation logic.
• Node.js / Express: Backend server (API endpoints, authentication) if applicable.

Project Structure
• frontend/ – React application (UI components and pages).
• server/ – Backend code:
• server.js (Express server entry point, handles API routes).
• wisper/ (Python modules for speech evaluation: Whisper model loading, evaluators, etc.).
• README.md – Project documentation (this file).

Installation

Backend (Python) 1. Prerequisites: Install Python 3.9 or newer.

    2.	Dependencies: In the server/wisper/ directory, install required packages:

    [ pip install openai-whisper torchaudio pronouncing language_tool_python librosa soundfile ]

    (This installs Whisper with its PyTorch dependencies, plus audio libraries.)

    3.	FFmpeg: Whisper requires the ffmpeg command-line tool to process audio ￼. Install via your package manager (e.g. sudo apt install ffmpeg on Linux).

    4.	Run Evaluation Script: Place an audio file in server/AudioFiles/ (or configure paths as needed), then run the main script:

    [python speakedge.py]
    This loads the Whisper model, transcribes the latest audio, and prints evaluation results.

    Frontend (React)
    1.	Prerequisites: Install Node.js (v14+) and npm.
    2.	Setup: In the frontend/ directory, install dependencies:
    [npm install]


    3.	Development Server: Start the React app:
      [npm start]
    The app will open at http://localhost:3000 in your browser.

    Usage Workflow
    1.	Record Speech: In the app, click “Start Recording” and speak into the microphone.
    2.	Submit: Stop recording to upload the audio to the backend.
    3.	Processing: The backend runs OpenAI Whisper to transcribe the audio ￼. The transcript is then analyzed:
    •	Pronunciation is evaluated using phonetic data from the CMU dictionary (pronouncing ￼).
    •	Grammar and vocabulary usage are checked via LanguageTool (language_tool_python) ￼.
    •	Fluency and vocabulary diversity are assessed (e.g. by measuring pauses or word variety).
    4.	Feedback: The system returns scores and feedback aligned with IELTS criteria, which are displayed to the user.

Evaluation Criteria

SpeakEdge aligns its feedback with IELTS speaking assessment criteria ￼ ￼ ￼ ￼:
• Fluency & Coherence: Ability to speak at a normal pace with logical sentence flow ￼.
• Lexical Resource: Range and appropriate use of vocabulary ￼.
• Grammatical Range & Accuracy: Variety and correctness of grammar structures ￼.
• Pronunciation: Clarity and intelligibility of spoken words ￼.

Production Build
• Frontend: In the frontend/ directory, run:

    [npm run build]
    This generates an optimized production bundle in build/ ￼. Serve the build/ folder with a static file server or integrate it into an Express server.

    •	Backend: Deploy the Python evaluation service on a production server (for example, using a WSGI/ASGI server). Ensure all Python dependencies are installed and the evaluation script is properly hosted.

Sources:
OpenAI Whisper documentation [https://github.com/openai/whisper#:~:text=Whisper%20is%20a%20general,speech%20translation%2C%20and%20language%20identification];

LanguageTool Python library info [https://pypi.org/project/language-tool-python/#:~:text=Current%20LanguageTool%20version%3A%206.7]￼;

Pronouncing library docs [https://pypi.org/project/pronouncing/#:~:text=Pronouncing%20is%20a%20simple%20interface,rhymes%20for%20a%20given%20word]￼;

TorchAudio GitHub repository [https://github.com/pytorch/audio#:~:text=The%20aim%20of%20torchaudio%20is,be%20seen%20in%20torchaudio%20through];

React official site[https://legacy.reactjs.org/#:~:text=React]￼;

IELTS official scoring criteria ￼[https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-speaking#:~:text=Fluency%20and%20coherence%20assesses%20how,is%20not%20difficult%20to%20follow]
[https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-speaking#:~:text=Lexical%20resource%20assesses%20the%20range,don%E2%80%99t%20know%20a%20particular%20word];

Create React App docs [https://create-react-app.dev/docs/production-build/#:~:text=,enables%20long%20term%20caching%20techniques]￼.
