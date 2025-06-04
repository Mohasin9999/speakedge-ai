SpeakEdge

SpeakEdge is an AI-driven speaking practice and evaluation tool for English learners, tailored for IELTS preparation. It uses the OpenAI Whisper speech recognition model ￼ to transcribe spoken answers with high accuracy and evaluates responses using official IELTS speaking criteria ￼. SpeakEdge provides real-time feedback on your fluency, vocabulary, grammar, and pronunciation, helping you improve your speaking score.

Key Features
• 🎙️ Real-Time Speech Transcription – Converts spoken responses to text using OpenAI’s Whisper model ￼ for high accuracy.
• 📝 IELTS-Aligned Scoring – Evaluates answers across IELTS speaking criteria (Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, Pronunciation) ￼ and assigns band scores.
• 🔊 Advanced Audio Processing – Leverages PyTorch and Torchaudio for robust handling of audio data ￼.
• ⚛️ Interactive React Frontend – Responsive, modern user interface built with React ￼ for a smooth practice experience.

Technologies Used
• ⚛️ React – A JavaScript library for building user interfaces ￼.
• 🐍 Python 3 – Backend programming language (compatible with Python 3.8–3.11) ￼.
• 🤖 OpenAI Whisper – Speech recognition model for transcription ￼.
• 🔊 PyTorch & Torchaudio – Deep learning framework and audio processing libraries ￼ ￼.
• 📦 Node.js & npm – JavaScript runtime and package manager for building the frontend.

Project Structure
The repository is organized as follows:

├── frontend
│ ├── package-lock.json
│ ├── package.json
│ ├── public
│ ├── public copy
│ └── src
│ ├── App.css
│ ├── App.js
│ ├── App.test.js
│ ├── assets
│ │ ├── ai_bubble.png
│ │ ├── background.jpg
│ │ ├── background.png
. . .
. . .
. . .
│ │ └── waves.png
│ ├── components
│ │ ├── axios.js
│ │ ├── header.css
│ │ └── header.js
│ ├── index.css
│ ├── index.js
│ ├── logo.svg
│ ├── pages
│ │ ├── HomePage.css
│ │ ├── HomePage.js
. . .
. . .
. . .
│ │ ├── Speakpage.css
│ │ └── SpeakPage.js
│ ├── reportWebVitals.js
│ └── setupTests.js
├── server
│ ├── .env
│ ├── AudioFiles
│ │ ├── clearAudio
│ │ │ └── output_audio_20250604_170909.wav
│ │ ├── recording-1744745588078.wav
│ ├── config
│ │ └── db.js
│ ├── models
│ │ └── User.js
│ ├── package-lock.json
│ ├── package.json
│ ├── routes
│ │ └── auth.js
│ ├── server.js
│ └── wisper
│ ├── audio_preprocessor.py
│ ├── fluency_evaluator.py
│ ├── grammar_evaluator.py
│ ├── main.py
│ ├── pronunciation_evaluator.py
│ ├── speakedge.py
│ ├── tempCodeRunnerFile.py
│ ├── transcriber.py
│ ├── utils.py
│ └── vocabulary_evaluator.py
├── .gitignore
├── README.md
└── structure.txt
