import vk_api
from flask import Flask, request, json
import requests
import os
import traceback
from keyboards import keyboard
import json


TOKEN = os.environ.get('VK_TOKEN')
SECRET = os.environ.get('SECRET')
CONFIRMATION_TOKEN = os.environ.get('CONFIRMATION_TOKEN')

vk = vk_api.VkApi(token = TOKEN)
app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return "Welcome to main page. <br>/newmessage to sent message to 169871363 user's id"

@app.route('/newmessage', methods=['GET'])
def nm():
    data = {
        "type": "message_new",
        "object": {
            "message": {
                "from_id": 169871363,
                "id": 147,
                "text": "New user"
            }
        },
        "secret": SECRET
    }

    requests.post("http://194.67.109.99", data=json.dumps(data, ensure_ascii=False))

    return 'Message was sent'

@app.route('/', methods=['POST'])
def messages():
    data = json.loads(request.data)

    try:
        if data['type'] == 'confirmation':
            return CONFIRMATION_TOKEN

        elif data['secret'] == SECRET:
            if data['type'] == 'message_new':
                id = data['object']['message']['from_id']
                body = data['object']['message']['text']

                vk.method("messages.send", {"peer_id": id, "message": body, "keyboard": keyboard, "random_id": 0})

                return 'OK'
            else:
                return 'I can only work with the message_new event'
        else:
            return 'Invalid secret key'
    except Exception as e:
        return traceback.format_exc()

if __name__=='__main__':
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get('PORT', 80)))