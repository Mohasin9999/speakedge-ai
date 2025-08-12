import subprocess

class LLM_Feedback:

    def __init__(self, model_name="qwen"):
        self.model_name = model_name

    def _run_ollama(self, prompt):
        try:
            result = subprocess.run(
                ["ollama", "run", self.model_name],
                input=prompt,
                capture_output=True,
                text=True,
                timeout=120  # avoid hanging forever
            )
            if result.stderr.strip():
                print(f"LLM stderr: {result.stderr.strip()}")
            return result.stdout.strip()
        except FileNotFoundError:
            return "Error: Ollama not found. Please make sure Ollama is installed and running."
        except subprocess.TimeoutExpired:
            return "Error: Qwen model took too long to respond."

    def pronunciation_feedback(self, ref_phonemes, hyp_phonemes, similarity, band):
        prompt = f"""
You are an expert English pronunciation coach.
I will give you:
1. Reference phoneme sequence (correct pronunciation)
2. Hypothesis phoneme sequence (learner's pronunciation)
3. Similarity score (percentage)
4. Estimated IELTS Pronunciation Band

Reference phonemes: {ref_phonemes}
Learner phonemes: {hyp_phonemes}
Similarity: {similarity:.2f}%
IELTS Pronunciation Band: {band}

Please provide a **single concise paragraph** summarizing:
- The main phoneme differences
- 2-3 clear improvement tips

Keep it short, practical, and focused.
"""
        return self._run_ollama(prompt)

    def fluency_feedback(self, score, duration, speech_stats):
        prompt = f"""
You are an expert English fluency coach.
I will give you:
- Fluency score (0-100): {score:.2f}
- Speech duration in seconds: {duration}
- Speech statistics: {speech_stats}

Please provide a **single concise paragraph** that includes:
- A brief interpretation of the fluency score
- 2 practical tips for improving fluency

Keep feedback clear, actionable, and limited to one paragraph.
"""
        return self._run_ollama(prompt)

    def grammar_feedback(self, corrected_text, score):
        prompt = f"""
You are an expert English grammar coach.
I will give you:
- Corrected learner's text: {corrected_text}
- Grammar score (0-100): {score:.2f}

Please provide a **single concise paragraph** summarizing:
- The main grammar corrections made
- 2 quick grammar improvement tips

Keep it simple, direct, and limited to one practical paragraph.
"""
        return self._run_ollama(prompt)

    def vocabulary_feedback(self, score):
        prompt = f"""
You are an expert English vocabulary coach.
I will give you:
- Vocabulary score (0-100): {score:.2f}

Please provide a **single concise paragraph** stating:
- What the vocabulary score means
- 2 brief ways to improve vocabulary skills

Keep it motivational and under one short paragraph.
"""
        return self._run_ollama(prompt)
