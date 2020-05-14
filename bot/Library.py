import os
import dotenv
import time
import asyncio
import traceback
from aiohttp import ClientSession
import aiohttp
from aiohttp import web

dotenv.load_dotenv()
token = os.environ.get('vk_token')

methodsMap = {
    'history': 'messages.getHistory',
    'message': 'messages.send'
}

values = {}
values['v'] = "5.92"
values['access_token'] = token

info = {
    'lasttime': 0,
    'cnt': 0,
    'start': time.time()
}

def enchance_params(params: dict):
    params.update(values)
    return params
    
async def execute_method(
    session: aiohttp.ClientSession,
    method: str,
    params: dict
):
    async with session.get(f'https://api.vk.com/method/{method}', params = enchance_params(params)) as response:
        data = await response.json()
        # info['cnt'] = info['cnt'] + 1
        # print(time.time() - info['start'], info['cnt']) 
        # print(data['response']['count'])
        return data['response']['count']

async def vk_method(method, params):
    async with aiohttp.ClientSession() as session:
        difference = info['lasttime'] - time.time()
        if (difference > 0): 
            info['lasttime'] += 0.06
            await asyncio.sleep(difference) 
        else:
            info['lasttime'] = time.time() + 0.06

        # тут не было await, выполнение функции не ожидалось, и программа оканчивала свою работу до окончания запроса
        return await asyncio.gather(
            execute_method(session, method, params) 
        )

start = time.time()

loop = asyncio.get_event_loop()

async def hello(request: web.Request):
    res = await loop.create_task(vk_method(methodsMap['history'], {"user_id": 169871363}))
    return web.Response(text=str(res))

app = web.Application()
app.add_routes([web.get('/hello', hello)])

web.run_app(app)