# embddings
#
# Author: araobp@github.com
# Date: 2024/12/1

import os
import requests

EMBEDDING_MODEL = "text-embedding-004"
DIMENSION = 768

API_KEY = os.environ['GEMINI_API_KEY']
URL = f"https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key={API_KEY}"
HEADERS = {"Content-Type": "application/json"}
body = {"model": "models/text-embedding-004",
        "content": {
            "parts": None 
        }
       }

def get_embedding(text):
    if type(text) == str: 
        URL = f"https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key={API_KEY}"
        body = {"model": "models/text-embedding-004", "content": {"parts": [{"text": text}]}} 
        r = requests.post(URL, headers=HEADERS, json=body)
        data = r.json()["embedding"]["values"]
    elif type(text) == list or type(text) == tuple:
        URL = f"https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:batchEmbedContents?key={API_KEY}"
        body = {"requests": [{"model": "models/text-embedding-004", "content": {"parts": [{"text": t}]}} for t in text]}
        r = requests.post(URL, headers=HEADERS, json=body)
        data = [v["values"] for v in r.json()["embeddings"]]
    else:
        raise Exception("Type error!")
    return data 

def ui():

    while True:
        print("Text: ", end="")
        text = input()
        print("")
        vector = get_embedding([text, text])
        print(f"Embeddings: \n{vector[1]}", end="\n\n")


if __name__ == '__main__':
    ui()
