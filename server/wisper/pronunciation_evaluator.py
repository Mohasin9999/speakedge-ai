import pronouncing

class PronunciationEvaluator:
    def evaluate(self, transcription):
        words = transcription.split()
        total_score = 0
        mispronounced_words = []

        for word in words:
            phonemes = pronouncing.phones_for_word(word.lower())
            total_score += 5 if phonemes else 1
            if not phonemes:
                mispronounced_words.append(word)

        word_count = len(words)
        if word_count == 0:
            return 0, []

        percentage_score = total_score / (word_count * 5) * 100
        band = max(0, min(9, int(percentage_score // 10)))
        return band, mispronounced_words