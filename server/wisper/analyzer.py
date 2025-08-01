# server/whisper/analyzer.py
import warnings
import os
# Assuming your other modules are in the same 'whisper' directory
from .audio_preprocessor import AudioPreprocessor
from .transcriber import Transcriber
from .fluency_evaluator import FluencyEvaluator
from .pronunciation_evaluator import PronunciationEvaluator
from .vocabulary_evaluator import VocabularyEvaluator
from .grammar_evaluator import GrammarEvaluator

warnings.filterwarnings("ignore")

def analyze_audio(raw_audio_path, clean_audio_dir):
    """
    Analyzes a single audio file for fluency, pronunciation, vocab, and grammar.

    Args:
        raw_audio_path (str): The full path to the raw audio file to be processed.
        clean_audio_dir (str): The directory to save the processed (clean) audio file.

    Returns:
        dict: A dictionary containing the analysis results.
              Returns None if processing fails.
    """
    try:
        # 1. Preprocess Audio
        # The preprocessor now takes the raw file path directly
        preprocessor = AudioPreprocessor(os.path.dirname(raw_audio_path), clean_audio_dir)
        clean_audio_path = preprocessor.normalize_and_save(specific_file=os.path.basename(raw_audio_path))

        if not clean_audio_path:
            print("Audio preprocessing failed.")
            return None

        # 2. Transcribe
        transcriber = Transcriber()
        transcription = transcriber.transcribe(clean_audio_path)
        if not transcription:
             transcription = "Could not transcribe audio." # Handle empty transcription

        # 3. Evaluate Metrics
        fluency = FluencyEvaluator()
        speech_rate, pause_duration = fluency.extract_features(clean_audio_path, transcription)
        fluency_score = fluency.evaluate(speech_rate, pause_duration)

        pronunciation = PronunciationEvaluator()
        pron_score, mispronounced = pronunciation.evaluate(transcription)

        vocabulary = VocabularyEvaluator()
        total, unique, ttr, vocab_score = vocabulary.evaluate(transcription)

        grammar = GrammarEvaluator()
        grammar_score, issues = grammar.evaluate(transcription)
        
        # Format grammar issues for JSON
        grammar_issues_list = [
            {
                "message": issue.message,
                "replacements": issue.replacements,
                "context": transcription[issue.offset:issue.offset+issue.errorLength]
            } for issue in issues
        ]

        # 4. Compile Results
        results = {
            "transcription": transcription,
            "fluency": {"score": fluency_score, "speech_rate": round(speech_rate, 2), "pauses": round(pause_duration, 2)},
            "pronunciation": {"score": pron_score, "mispronounced": mispronounced},
            "vocabulary": {"score": vocab_score, "total_words": total, "unique_words": unique, "ttr": round(ttr, 4)},
            "grammar": {"score": grammar_score, "issues": grammar_issues_list}
        }
        
        return results

    except Exception as e:
        print(f"An error occurred during analysis: {e}")
        return None
    finally:
        # The cleanup of files will be handled by the server in the main app.py
        pass