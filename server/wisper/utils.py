import os

def get_latest_audio_file(directory, extensions=None):
    if extensions is None:
        extensions = {".mp3", ".wav", ".m4a", ".flac", ".ogg"}  # You can extend this list
    else:
        extensions = set(ext.lower() for ext in extensions)

    if not os.path.exists(directory) or not os.listdir(directory):
        return None

    files = [
        os.path.join(directory, f)
        for f in os.listdir(directory)
        if os.path.isfile(os.path.join(directory, f)) and os.path.splitext(f)[1].lower() in extensions
    ]
    
    return max(files, key=os.path.getmtime) if files else None