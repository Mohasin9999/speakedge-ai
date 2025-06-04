import re

class VocabularyEvaluator:
    def evaluate(self, transcription):
        cleaned = re.sub(r"[^\w\s']|'(?!\w)|(?<!\w)'", '', transcription.lower()).replace('_', '')
        words = cleaned.split()

        if not words:
            return 0, 0, 0.0, 0

        total = len(words)
        unique = set(words)
        ttr = len(unique) / total

        band = min(9, max(1, int(ttr * 10)))
        return total, len(unique), ttr, band