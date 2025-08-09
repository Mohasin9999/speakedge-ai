import subprocess
import json

def needleman_wunsch(seq1, seq2, match=1, mismatch=-1, gap=-1):
    n = len(seq1)
    m = len(seq2)
    score = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(n + 1):
        score[i][0] = i * gap
    for j in range(m + 1):
        score[0][j] = j * gap

    for i in range(1, n + 1):
        for j in range(1, m + 1):
            match_score = score[i - 1][j - 1] + (match if seq1[i - 1] == seq2[j - 1] else mismatch)
            delete_score = score[i - 1][j] + gap
            insert_score = score[i][j - 1] + gap
            score[i][j] = max(match_score, delete_score, insert_score)

    align1, align2 = "", ""
    i, j = n, m
    while i > 0 and j > 0:
        current_score = score[i][j]
        if current_score == score[i - 1][j - 1] + (match if seq1[i - 1] == seq2[j - 1] else mismatch):
            align1 = seq1[i - 1] + align1
            align2 = seq2[j - 1] + align2
            i -= 1
            j -= 1
        elif current_score == score[i - 1][j] + gap:
            align1 = seq1[i - 1] + align1
            align2 = "-" + align2
            i -= 1
        else:
            align1 = "-" + align1
            align2 = seq2[j - 1] + align2
            j -= 1
    while i > 0:
        align1 = seq1[i - 1] + align1
        align2 = "-" + align2
        i -= 1
    while j > 0:
        align1 = "-" + align1
        align2 = seq2[j - 1] + align2
        j -= 1

    return align1, align2, score[n][m]

def calculate_similarity_and_band(align1, align2):
    matches = sum(a == b for a, b in zip(align1, align2) if a != "-" and b != "-")
    total = sum(1 for a, b in zip(align1, align2) if a != "-" and b != "-")
    similarity = 100 * matches / total if total > 0 else 0
    band = round(4 + (similarity / 100) * 5)
    band = min(max(band, 4), 9)
    return similarity, band

