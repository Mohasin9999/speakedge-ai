import torch
import numpy as np
from typing import List, Dict, Any
from pydub.utils import mediainfo
from transformers import AutoTokenizer, AutoModelForSequenceClassification

class FluencyEvaluator:
    def __init__(self, model_name: str = "4i-ai/BERT_disfluency_cls", device: str = None):
        self.model_name = model_name
        self.device = device or ("cuda" if torch.cuda.is_available() else "cpu")
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForSequenceClassification.from_pretrained(model_name).to(self.device)
        
        cfg = getattr(self.model, "config", None)
        self.id2label = getattr(cfg, "id2label", None) or {0: "disfluent", 1: "fluent"}

    # ---------------------------
    # AUDIO DURATION
    # ---------------------------
    @staticmethod
    def get_audio_duration(audio_path: str) -> float:
        """Return audio duration in seconds."""
        info = mediainfo(audio_path)
        return float(info["duration"])

    # ---------------------------
    # DISFLUENCY CLASSIFICATION
    # ---------------------------
    def _predict_proba(self, text: str) -> Dict[str, Any]:
        """Get model probabilities for 'fluent' and 'disfluent'."""
        inputs = self.tokenizer(text, truncation=True, padding=True, return_tensors="pt").to(self.device)
        with torch.no_grad():
            outputs = self.model(**inputs)
            logits = outputs.logits
            probs = torch.softmax(logits, dim=-1).cpu().numpy()[0]
            pred_idx = int(np.argmax(probs))
            pred_label = self.id2label.get(pred_idx, str(pred_idx))
        return {"label": pred_label, "label_id": pred_idx, "probs": probs.tolist()}

    def utterance_fluency_score(self, text: str, speech_rate: float = None) -> Dict[str, Any]:
        """Compute fluency score with speech rate penalty."""
        res = self._predict_proba(text)
        
        # find fluent index
        fluent_idx = None
        for idx, lbl in self.id2label.items():
            if lbl.lower().startswith("fluent"):
                fluent_idx = idx
                break
        if fluent_idx is None:
            fluent_idx = 1 if len(res["probs"]) > 1 else 0
        
        p_fluent = float(res["probs"][fluent_idx])
        score = p_fluent * 100
        
        # penalty for slow speech rate
        if speech_rate is not None and speech_rate < 1.5:
            score -= 5
        score = max(0, min(score, 100))
        
        return {
            "p_fluent": round(p_fluent, 4),
            "fluency_score": round(score, 2),
            "label": res["label"]
        }

    # ---------------------------
    # SPEECH RATE
    # ---------------------------
    @staticmethod
    def analyze_speech_rate(transcript: str, total_audio_duration: float) -> Dict[str, Any]:
        """Return total words and speech rate in words/sec."""
        words = transcript.split()
        total_words = len(words)
        speech_rate = total_words / total_audio_duration if total_audio_duration > 0 else 0
        return {
            "total_words": total_words,
            "speech_rate": round(speech_rate, 2),
            "total_duration": total_audio_duration
        }

    # ---------------------------
    # IELTS MAPPING
    # ---------------------------
    @staticmethod
    def fluency_score_to_ielts(score: float) -> Dict[str, Any]:
        """
     Map fluency score (0–100) to IELTS band 4–9 using linear scaling.
        """
        band = round(4 + (score / 100) * 5)  # Map to IELTS band 4–9
        band = min(max(band, 4), 9)  # Ensure range stays between 4 and 9

     
        return band,round(score, 2)


    # ---------------------------
    # MAIN EVALUATION
    # ---------------------------
    def evaluate(self, audio_path: str, transcript: str) -> Dict[str, Any]:
        duration = self.get_audio_duration(audio_path)
        speech_stats = self.analyze_speech_rate(transcript, duration)
        
        result = self.utterance_fluency_score(
            text=transcript,
            speech_rate=speech_stats["speech_rate"]
        )
        
        band, score = self.fluency_score_to_ielts(result["fluency_score"])
        
        return band, score
