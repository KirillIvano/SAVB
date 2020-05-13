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
values['v'] = "5.92"
values['access_token'] = token

info =  {}
info['lasttime'] = 0
info['errors'] = 0

async def get_function(session, method, params):
    async with session.get("https://api.vk.com/method/" + method, params = params) as response:
        data = await response.json()
        try:
            print(data['response']['count'])
        except:
            info['errors'] += 1
            print(data)

async def vk_method(method, params):
    async with aiohttp.ClientSession() as session:
        for i in range(100):
            params.update(values)
            difference = info['lasttime'] - time.time() 
            if (difference > 0): 
                info['lasttime'] += 0.06
                await asyncio.sleep(difference) 
            else:
                info['lasttime'] = time.time() + 0.06
            asyncio.gather(get_function(session, method, params))



start = time.time()


loop = asyncio.get_event_loop()
loop.run_until_complete(vk_method("messages.getHistory", {"user_id": 169871363})) # получение истории 

# loop.run_until_complete(vk_method("messages.send", {"peer_id": 169871363, "random_id": 0, "message": "Test message"})) # отправка сообщения
print(time.time() - start, "seconds passed, errors:", info['errors'])