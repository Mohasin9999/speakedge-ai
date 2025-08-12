from typing import Dict, Any
from happytransformer import HappyTextToText, TTSettings
import Levenshtein
import os
import logging
import warnings
os.environ["TRANSFORMERS_VERBOSITY"] = "error"  # For HF transformers logging

logging.getLogger("happytransformer").setLevel(logging.ERROR)
logging.getLogger("transformers").setLevel(logging.ERROR)

warnings.filterwarnings("ignore", message="Both `max_new_tokens`.*")

class GrammarEvaluator:
    def __init__(self):
        self.model = HappyTextToText("T5", "vennify/t5-base-grammar-correction")
        self.args = TTSettings(num_beams=5, min_length=1)

    def _calculate_score(self, original: str, corrected: str) -> float:
        """
        Calculate similarity score between original and corrected sentence.
        Returns score as float from 0 to 1.
        """
        return Levenshtein.ratio(original.lower(), corrected.lower())

    @staticmethod
    def fluency_score_to_ielts(score: float) -> Dict[str, Any]:
        """
        Map fluency score (0–100) to IELTS band 4–9 using linear scaling.
        Returns dict with 'band' and rounded 'score'.
        """
        band = round(4 + (score / 100) * 5)  # Map to IELTS band 4–9
        band = min(max(band, 4), 9)  # Clamp band between 4 and 9
        return band, round(score, 2)

    def evaluate(self, text: str) -> Dict[str, Any]:
        """
        Evaluate grammar of input text.
        Returns dict with corrected text, score (0-100), and IELTS band 4-9.
        """
        input_text = f"grammar: {text}"
        result = self.model.generate_text(input_text, args=self.args)
        corrected_text = result.text.strip()

        # Calculate similarity score (0-1) and convert to 0-100 scale
        score_ratio = self._calculate_score(text, corrected_text)
        score_100 = score_ratio * 100

        # Map score to IELTS band
        band,score = self.fluency_score_to_ielts(score_100)

        return corrected_text,band,score 

