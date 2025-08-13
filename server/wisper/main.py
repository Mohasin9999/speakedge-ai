import sys
import os
import json
import traceback
import torch
import warnings
import multiprocessing

# Your other application imports
from audio_preprocessor import AudioPreprocessor
from transcriber import Transcriber
from SpeechToPhoneme import SpeechToPhoneme
from pronunciation_evaluator import needleman_wunsch, calculate_similarity_and_band
from fluency_evaluator import FluencyEvaluator
from grammar_evaluator import GrammarEvaluator
from vocabulary_evaluator import VocabularyEvaluator

# --- Setup multiprocessing and torch ---
try:
    if sys.platform.startswith('win'):
        multiprocessing.set_start_method('spawn', force=True)
    else:
        multiprocessing.set_start_method('spawn', force=True)
except RuntimeError:
    pass

torch.set_num_threads(1)
warnings.filterwarnings("ignore")

# --- Main Analysis Function ---
def analyze_audio(audio_path):
    # This function's content remains the same
    results = {}
    transcriber = Transcriber()
    transcription = transcriber.transcribe(audio_path)
    results['transcription'] = transcription
    
    stp = SpeechToPhoneme()
    wav2vec_phonemes = stp.extract_phonemes(audio_path)
    
    espeak_phonemes = stp.get_reference_phonemes(transcription)
    
    seq1 = wav2vec_phonemes
    seq2 = espeak_phonemes.replace(" ", "")
    align1, align2, score = needleman_wunsch(seq1, seq2)
    similarity, p_band = calculate_similarity_and_band(align1, align2)
    results['pronunciation_score'] = round(similarity, 2)

    flu_evaluator = FluencyEvaluator()
    flu_band, flu_score, duration, speech_stats = flu_evaluator.evaluate(audio_path, transcription)
    results['fluency_score'] = flu_score
    results['duration'] = duration

    grammar_evaluator = GrammarEvaluator()
    corrected_text, gra_band, gra_score = grammar_evaluator.evaluate(transcription)
    results['grammar_score'] = gra_score

    vocab_evaluator = VocabularyEvaluator()
    vocab_band, vocab_score = vocab_evaluator.evaluate_vocabulary(transcription)
    results['vocabulary_score'] = vocab_score

    return results

# --- NEW, SIMPLIFIED ROBUST EXECUTION BLOCK ---
if __name__ == "__main__":
    try:
        # We still run the main logic inside a try block
        if len(sys.argv) != 2:
            raise ValueError("Invalid number of arguments.")
        
        audio_file_path = sys.argv[1]

        if not os.path.exists(audio_file_path):
            raise FileNotFoundError(f"File not found: {audio_file_path}")
        
        analysis_results = analyze_audio(audio_file_path)
        
        # On success, print the results
        print(json.dumps(analysis_results))

    except Exception as e:
        # THE FIX: If ANY exception occurs, we do the simplest possible thing.
        # We do NOT try to format the traceback, as that may be the cause of the silent failure.
        # We just print a simple JSON error object with the error converted to a string.
        # This is guaranteed to produce output.
        print(json.dumps({
            "error": "A critical error was caught inside main.py",
            "error_details": str(e)
        }))