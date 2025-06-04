import warnings
warnings.filterwarnings("ignore")

from audio_preprocessor import AudioPreprocessor
from transcriber import Transcriber
from fluency_evaluator import FluencyEvaluator
from pronunciation_evaluator import PronunciationEvaluator
from vocabulary_evaluator import VocabularyEvaluator
from grammar_evaluator import GrammarEvaluator
from utils import get_latest_audio_file

def main():

    raw_audio_dir = "/Users/niloyahmed/499A3.0/speakedge/server/AudioFiles"
    clean_audio_dir = "/Users/niloyahmed/499A3.0/speakedge/server/AudioFiles/clearAudio"

    preprocessor = AudioPreprocessor(raw_audio_dir, clean_audio_dir)
    audio_path = preprocessor.normalize_and_save()

    if not audio_path:
        print("No valid audio file found.")
        return


    transcriber = Transcriber()
    transcription = transcriber.transcribe(audio_path)
    print(f"\n🗣️ Transcription: {transcription}")

    fluency = FluencyEvaluator()
    speech_rate, pause_duration = fluency.extract_features(audio_path, transcription)
    fluency_score = fluency.evaluate(speech_rate, pause_duration)
    print(f"\n🎯 Fluency Score: {fluency_score}/9")
    print(f"Speech Rate: {speech_rate:.2f} wpm | Pauses: {pause_duration:.2f} sec")

    pronunciation = PronunciationEvaluator()
    pron_score, mispronounced = pronunciation.evaluate(transcription)
    print(f"\n🔊 Pronunciation Score: {pron_score}/9")
    print(f"Mispronounced Words: {mispronounced}")

    vocabulary = VocabularyEvaluator()
    total, unique, ttr, vocab_score = vocabulary.evaluate(transcription)
    print(f"\n📚 Vocabulary Score: {vocab_score}/9")
    print(f"Total Words: {total}, Unique Words: {unique}, TTR: {ttr:.4f}")

    grammar = GrammarEvaluator()
    grammar_score, issues = grammar.evaluate(transcription)
    print(f"\n📝 Grammar Score: {grammar_score}/9")
    for issue in issues:
        print(f"Issue: {issue.message} | Suggestion: {issue.replacements} | Context: {transcription[issue.offset:issue.offset+issue.errorLength]}")

if __name__ == "__main__":
    main()