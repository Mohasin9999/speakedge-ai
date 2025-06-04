import language_tool_python

class GrammarEvaluator:
    def __init__(self):
        self.tool = language_tool_python.LanguageTool('en-US')

    def evaluate(self, transcription):
        matches = self.tool.check(transcription)
        issue_count = len(matches)
        band = 9 - min(issue_count // 2, 8)
        return band, matches