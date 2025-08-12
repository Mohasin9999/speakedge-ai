from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch
from typing import Dict, Any

class VocabularyEvaluator:
    def __init__(self, model_name: str = "KevSun/Engessay_grading_ML"):
        # Load model and tokenizer once
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForSequenceClassification.from_pretrained(model_name)
        self.model.eval()

    def evaluate_vocabulary(self, text: str) -> Dict[str, Any]:
        
        # Tokenize
        inputs = self.tokenizer(
            text, 
            return_tensors="pt", 
            truncation=True, 
            padding=True, 
            max_length=512
        )

        # Get model outputs
        with torch.no_grad():
            outputs = self.model(**inputs)

        # Extract vocabulary score (3rd value in 6 outputs, index 2)
        raw_score = outputs.logits.squeeze().tolist()[2]  # out of 5
        percentage_score = (raw_score / 5) * 100  # Convert to percentage

        # Map to IELTS band
        band, rounded_score = self.vocabulary_score_to_ielts(percentage_score)

        return  band,rounded_score
        

    @staticmethod
    def vocabulary_score_to_ielts(score: float) -> Dict[str, Any]:

        band = round(4 + (score / 100) * 5)  # Map to IELTS band 4–9
        band = min(max(band, 4), 9)  # Clamp between 4 and 9
        return band, round(score, 2)



