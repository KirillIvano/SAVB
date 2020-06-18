import requests
import json
from database.models import UserMessage, Bot

res = []

GROUP_ID = 194893012

secrets = Bot.select().dicts()

SECRET = ''
#сделаю потом нормальный запрос не бейте больно пожалуйста
for se in secrets:
    if se['bot_id'] == GROUP_ID:
        SECRET = se['secret_key']

def test_valid_mes():
    query = UserMessage.select().dicts()
    for mes in query:
        dictToSend = {
            "type": "message_new",
            "object": {
                "message": {
                    "from_id": 121125853,
                    "peer_id": 121125853,
                     "text": mes['text'],
                    "random_id": 0
                }
            },
            "group_id": GROUP_ID,
            "secret": SECRET 
        }
        r = requests.post('http://127.0.0.1:80', json=dictToSend)
        res.append(r.text)

def test_invalid_mes():
    words = ['qwerty',
             '12345',
             'приветтт',
             'None',
             '',
             'Жду ответ']
    for each in words:
        dictToSend = {
            "type": "message_new",
            "object": {
                "message": {
                    "from_id": 121125853,
                    "peer_id": 121125853,
                     "text": each,
                    "random_id": 0
                }
            },
            "group_id": GROUP_ID,
            "secret": SECRET 
        }
        r = requests.post('http://127.0.0.1:80', json=dictToSend)
        res.append(r.text)

def test_invalid_info():
    secret = ["RZDwr8q8U8WLdXYuyrXa46p6jLfs42OUe2eOnnVN63P9GUyJ9V",
              "",
              "qwejh23313njc1hgd123d12nbdshg42g32h4gc23ns2hbm4234",
              "0"
                ]
    for each in secret:
        dictToSend = {
            "type": "message_new",
            "object": {
                "message": {
                    "from_id": 121125853,
                    "peer_id": 121125853,
                     "text": "Тест",
                    "random_id": 0
                }
            },
            "group_id": GROUP_ID,
            "secret":each
        }
        r = requests.post('http://127.0.0.1:80', json=dictToSend)
        res.append(r.text)

def type_test():
    dictToSend = {
        "type": "message_reply",
        "object": {
            "message": {
                "from_id": 121125853,
                "peer_id": 121125853,
                "text": 'Привет',
                "random_id": 0
            }
        },
        "group_id": GROUP_ID,
        "secret": SECRET
    }
    r = requests.post('http://127.0.0.1:80', json=dictToSend)
    res.append(r.text)

def different_id_test():
    dictToSend = {
        "type": "message_new",
        "object": {
            "message": {
                "from_id": 121125853,
                "peer_id": 121125853,
                #"peer_id": 169871363,
                "text": 'Привет',
                "random_id": 0
            }
        },
        "group_id": GROUP_ID,
        "secret": SECRET 
    }
    r = requests.post('http://127.0.0.1:80', json=dictToSend)
    res.append(r.text)


test_valid_mes()
test_invalid_mes()
test_invalid_info()
type_test()
different_id_test()
print(res)
