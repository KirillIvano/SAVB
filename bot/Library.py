import vk_api
import os
import dotenv
import time
import http
import requests_async as requests
import asyncio
import traceback
from aiohttp import ClientSession
import aiohttp

dotenv.load_dotenv()
token = os.environ.get('vk_token')

vk = vk_api.VkApi(token = token)

method = "messages.getHistory"

values = {}
values['v'] = 5.92
values['access_token'] = token
values['user_id'] = 169871363

class lasttime():
    time = 0
    errors = 0

# создать элемент класса
# абстрагироваться от статических данных
# связать с bot.py

async def make_account(method, data):
    async with aiohttp.ClientSession() as session:
        lasttime.time = time.time() + 0.06
        difference = lasttime.time - time.time() # Разница между текущим временем и БУДУЩИМ временем окончания запроса
        lasttime.time += 0.06
        if (difference > 0): # Если сейчас наступил момент времени окончания последнего запроса
            await asyncio.sleep(difference) # Спим на время разницы прошлого запроса и текущего времени
        async with session.get("https://api.vk.com/method/" + str(method), params=data) as response:
            data = await response.json()
            try:
                print(data['response'])
            except:
                lasttime.errors += 1
                print(data)

def vkmethod(method, data):
    loop = asyncio.get_event_loop()
    loop.run_until_complete(make_account(method, data))
    print("Errors:", lasttime.errors)

initial = time.time()
vkmethod("messages.send", {"v": "5.92", "access_token": token, "user_id": 169871363, "random_id": 0, "message": "Test"})
vkmethod("messages.send", {"v": "5.92", "access_token": token, "user_id": 169871363, "random_id": 0, "message": "Test"})
vkmethod("messages.send", {"v": "5.92", "access_token": token, "user_id": 169871363, "random_id": 0, "message": "Test"})
vkmethod("messages.send", {"v": "5.92", "access_token": token, "user_id": 169871363, "random_id": 0, "message": "Test"})
vkmethod("messages.send", {"v": "5.92", "access_token": token, "user_id": 169871363, "random_id": 0, "message": "Test"})
vkmethod("messages.send", {"v": "5.92", "access_token": token, "user_id": 169871363, "random_id": 0, "message": "Test"})
vkmethod("messages.send", {"v": "5.92", "access_token": token, "user_id": 169871363, "random_id": 0, "message": "Test"})
vkmethod("messages.send", {"v": "5.92", "access_token": token, "user_id": 169871363, "random_id": 0, "message": "Test"})
vkmethod("messages.send", {"v": "5.92", "access_token": token, "user_id": 169871363, "random_id": 0, "message": "Test"})
vkmethod("messages.send", {"v": "5.92", "access_token": token, "user_id": 169871363, "random_id": 0, "message": "Test"})
print(time.time() - initial)