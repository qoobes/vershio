FROM python:3.7

RUN pip install Flask gunicorn pydub opencv-python pytesseract requests pillow urllib3 openai SpeechRecognition moviepy python-dotenv 
RUN apt update -qqy && apt install -qqy tesseract-ocr libtesseract-dev ffmpeg libsm6 libxext6 python3-opencv libgl1-mesa-glx

COPY src/ app/
WORKDIR /app

ENV PORT 8080

CMD exec gunicorn --bind :$PORT --workers 3 --threads 8 --timeout 0 app:app