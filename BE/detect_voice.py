import ssl
ssl._create_default_https_context = ssl._create_unverified_context

import sys
import whisper
import json

if len(sys.argv) < 2:
    print(json.dumps({'error': 'No input file'}))
    sys.exit(1)

model = whisper.load_model('base')
result = model.transcribe(sys.argv[1])

output = {
    'text': result['text'],
    'segments': [
        {'start': seg['start'], 'end': seg['end'], 'text': seg['text']}
        for seg in result.get('segments', [])
    ],
    'language': result.get('language', 'unknown')
}
print(json.dumps(output, ensure_ascii=False)) 