import glob
import json
import os
import random
import string
import urllib.request
from os import path

import cv2
import flask
import moviepy.editor as mp
import numpy as np
import pytesseract
import requests
import speech_recognition as sr
from PIL import Image
from pydub import AudioSegment
from pydub.silence import split_on_silence

from seg import segment

app = flask.Flask(__name__)

@app.route('/')
def index():
    return "Official Backend API Of Vershio"

@app.route('/ocr', methods=["POST"])
def ocr():
    request_json = flask.request.json
    secret = request_json["secret"]

    if secret != "CONGPilDnoMinEThonYAnkoLViTypOlmStOd":
        return {"code": 401, "error": "Unauthorized"}

    try:
        images = request_json["imageUrls"]
        name = request_json["name"] 
        userId = request_json["userId"] #bet bet go get started on the feed ill work on api call that will just take in the text
        tags = request_json["tags"] #ayo when u get the chance check discord
    except: 
        return {"code": 400, "error": "Bad request, missing arguments"}

    if images == []:
        return {"code": 400, "error": "Bad request, missing images"}

    text = ""

    for imageurl in images:
        image = Image.open(urllib.request.urlopen(imageurl))
        localText = pytesseract.image_to_string(image)
        text += localText

    segText = segment(text)

    url = "https://us-central1-vershio-hawt.cloudfunctions.net/end"
    data = {
        "secret" : "CONGPilDnoMinEThonYAnkoLViTypOlmStOd",
        "name" : name,
        "userId" : userId,
        "nuggets" : segText,
    }

    requests.post(url=url, data=data)

    return json.dumps(segText)

def random_token():
    alphabet = string.ascii_lowercase
    random_string = ""
    for i in range(8):
        letter = random.choice(alphabet)
        random_string += letter

    return random_string


# write a function to convert .mp4 to .wav
def convert_mp4_to_wav(mp4file):
    token = random_token()
    audio_file = f"output{token}.wav"
    audio_path = os.path.join(os.getcwd(), "wav_outputs")
    audio_path = os.path.join("wav_outputs", audio_file)
    movie_clip = mp.VideoFileClip(mp4file)
    movie_clip.audio.write_audiofile(audio_path)
    return token, mp4file

# function to 4 text from an audio clip
def text_from_audio_clip(audiofile):
    translated_text = ""
    r = sr.Recognizer()
    with sr.AudioFile(audiofile) as audio:
        data = r.record(audio)
        try:
            text = r.recognize_google(audio_data=data)
            translated_text += text
        except:
            print("No Text Detected in the Audio!")
    return translated_text

def save_chunks_to_folder(audio_chunks):
    if not os.path.isdir("audio_chunks"):
        os.mkdir("audio_chunks")

    for i, audio_chunk in enumerate(audio_chunks):
        file_name = os.path.join("audio_chunks/" + f"{i}.wav")
        print(file_name)
        audio_chunk.export(file_name, format="wav")
      
def text_from_large_clip(audio_file):
    r = sr.Recognizer()
    audio_path = os.path.join(os.getcwd(), "wav_outputs")
    audio_path = os.path.join("wav_outputs", audio_file)
    audio = AudioSegment.from_wav(audio_path)
    # in order to split the audio we have to do in chuncks (these chunks will be split by the silence found for atleast 1 second)
    audio_chunks = split_on_silence(audio, 
                                    min_silence_len=1000, # 1 second is also 1000 milliseconds
                                    silence_thresh = audio.dBFS - 16 # our audio chunks will detect silence under 16 dBFS the normal
                                    )
    # now since speech_recognition needs to listen to audio files we have to save the chunks to a folder
    save_chunks_to_folder(audio_chunks)

    audio_files = os.listdir(os.getcwd() + r"/audio_chunks")
    chunks_folder = os.path.join(os.getcwd() + r"/audio_chunks")
    translated_text = ""
    for audio_fi1e in audio_files:
        with sr.AudioFile(os.path.join(chunks_folder, audio_fi1e)) as audio:
            audio_data = r.record(audio)

            try:
                audio_chunk_text = r.recognize_google(audio_data)
                audio_chunk_text = audio_chunk_text.capitalize() + "."
                translated_text += audio_chunk_text
            except:
                print("No Text Detected in the Audio!")
            
    
    return translated_text


@app.route("/transcribe", methods=["POST"])
def audio_to_text():
    request_json = flask.request.json
    vid_file = "output.mp4"

     
    # check to see if the secret key is valid
    secret_key = "CONGPilDnoMinEThonYAnkoLViTypOlmStOd"
    secret = request_json["secret"]

    if secret != secret_key:
        return {"Error" : "Secret Key is Invalid"} 
    try:
        name = request_json["name"]
        userId = request_json["userId"]
        tags = request_json["tags"]
        videos = request_json["videoUrl"]
    except: 
        return {"code": 400, "error": "Bad request, missing arguments"}

    token, _ = convert_mp4_to_wav(videos)
    audio_file = f"output{token}.wav"

    
    text = text_from_large_clip(audio_file)

    betterTextChunks = segment(text)

    url = "https://us-central1-vershio-hawt.cloudfunctions.net/end"
    data = {
        "secret" : "CONGPilDnoMinEThonYAnkoLViTypOlmStOd",
        "name" : name,
        "userId" : userId,
        "nuggets" : betterTextChunks,
    }

    requests.post(url=url, data=data)
    return betterTextChunks

@app.route("/text", methods=["POST"])
def text_to_gpt3():
    request_json = flask.request.json
    
    # check to see if the secret key is valid
    secret_key = "CONGPilDnoMinEThonYAnkoLViTypOlmStOd"
    secret = request_json["secret"]

    if secret != secret_key:
        return {"Error" : "Secret Key is Invalid"} 
    try:
        name = request_json["name"]
        userId = request_json["userId"]
        tags = request_json["tags"]
        text = request_json["text"]
    except: 
        return {"code": 400, "error": "Bad request, missing arguments"}

    bestTextChunks = segment(text)
    url = "https://us-central1-vershio-hawt.cloudfunctions.net/end"
    data = {
        "secret" : "CONGPilDnoMinEThonYAnkoLViTypOlmStOd",
        "name" : name,
        "userId" : userId,
        "nuggets" : betterTextChunks,
    }

    requests.post(url=url, data=data)
    
    return json.dumps(bestTextChunks)

        # if key is invalid stop the function there
if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get("PORT", 8080)))
