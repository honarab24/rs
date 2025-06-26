from flask import Flask, Response, request
import requests

app = Flask(__name__)

TARGET_URL = 'http://fl5.moveonjoy.com/TSN_2/index.m3u8'

@app.route('/stream.m3u8')
def proxy():
    headers = {
        'User-Agent': request.headers.get('User-Agent', '')
    }
    r = requests.get(TARGET_URL, headers=headers, stream=True)
    return Response(r.iter_content(chunk_size=1024),
                    content_type=r.headers['Content-Type'])
