#main.py
import torch
import warnings
import subprocess
import os
from audio_preprocessor import AudioPreprocessor
from transcriber import Transcriber
from SpeechToPhoneme import SpeechToPhoneme  
from pronunciation_evaluator import needleman_wunsch, calculate_similarity_and_band
from fluency_evaluator import FluencyEvaluator
from grammar_evaluator import GrammarEvaluator
from vocabulary_evaluator import VocabularyEvaluator
from llm_feedback import LLM_Feedback

import multiprocessing
multiprocessing.set_start_method('fork', force=True)
torch.set_num_threads(1)


warnings.filterwarnings("ignore")

def main():
    # Remove .DS_Store files
    try:
        subprocess.run(
            ['find', '/Users/niloy/Desktop/499_b', '-name', '.DS_Store', '-delete'],
            check=True
        )
    except subprocess.CalledProcessError as e:
        print(f"Failed to delete .DS_Store files: {e}")

    raw_audio_dir = "/Users/niloy/Desktop/499_b/speakedge-ai/server/AudioFiles"
    clean_audio_dir = os.path.join(raw_audio_dir, "clearAudio")

    # Normalize and save audio
    preprocessor = AudioPreprocessor(raw_audio_dir, clean_audio_dir)
    audio_path = preprocessor.preprocess_and_resample()
    if not audio_path:
        print("No valid audio file found.")
        return

    # Transcribe speech
    transcriber = Transcriber()
    transcription = transcriber.transcribe(audio_path)
    print(f"\n🗣️ Transcription: {transcription}")

      
    stp = SpeechToPhoneme()
# Get phonemes from Wav2Vec2 model
    wav2vec_phonemes = stp.extract_phonemes(audio_path)

# Get phonemes from transcription using eSpeak
    espeak_phonemes = stp.get_reference_phonemes(transcription)


# Preprocess sequences
   
    seq1 = wav2vec_phonemes  # From Wav2Vec2
    seq2 = espeak_phonemes.replace(" ", "")  # From eSpeak, remove spaces
      
    align1, align2, score = needleman_wunsch(seq1, seq2)
    
    similarity, p_band =calculate_similarity_and_band(align1, align2)
    
    feedback_generator = LLM_Feedback()
    
    print(f"Pronounciation Score : {similarity:.2f}%")
    #print(f"IELTS Pronunciation Band: {p_band}")
    
    pron_feedback = feedback_generator.pronunciation_feedback(seq2, seq1, similarity, p_band)
    print("Pronunciation Feedback:\n", pron_feedback)
    # Fluency evaluation
    flu=FluencyEvaluator()
    band,score,duration,speech_stats = flu.evaluate(audio_path, transcription)
    print(f"Fluency Score : {score}")
    #print(f"flu_band : {band}")
    
    fluency_feedback = feedback_generator.fluency_feedback(score, duration, speech_stats)
    print("Fluency Feedback:\n", fluency_feedback)
    
    evaluator = GrammarEvaluator()
    corrected_text, band, score  = evaluator.evaluate(transcription)
    print(f"Grammer Score : {score}")
    #print(f"gra_band : {band}")
    
    grammar_feedback = feedback_generator.grammar_feedback(corrected_text, score)
    print("Grammar Feedback:\n", grammar_feedback)
    
    evaluator = VocabularyEvaluator()
    band, score= evaluator.evaluate_vocabulary(transcription)
    print(f"Vocabulary Score : {score}")
    #print(f"vocab_band : {band}")
    vocab_feedback = feedback_generator.vocabulary_feedback(score)
    print("Vocabulary Feedback:\n", vocab_feedback)


if __name__ == "__main__":
    main()
