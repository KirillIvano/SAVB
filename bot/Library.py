import os
import dotenv
import time
import asyncio
import traceback
from aiohttp import ClientSession
import aiohttp
import json
from aiohttp import web


dotenv.load_dotenv()
TOKEN = os.environ.get('VK_TOKEN')
SECRET = os.environ.get('SECRET')
CONFIRMATION_TOKEN = os.environ.get('CONFIRMATION_TOKEN')

methodsMap = {
    'history': 'messages.getHistory',
    'message': 'messages.send'
}

values = {}
values['v'] = "5.92"
values['access_token'] = TOKEN

info = {
    'lasttime': 0,
    'cnt': 0,
    'start': time.time()
}

newdata = {
    'random_id': 0
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
        info['cnt'] = info['cnt'] + 1
        print(time.time() - info['start'], info['cnt']) 
        return "Hello! ", data

async def vk_method(method: str, params: dict):
    async with aiohttp.ClientSession() as session:
        difference = info['lasttime'] - time.time()
        if (difference > 0): 
            info['lasttime'] += 0.06
            await asyncio.sleep(difference) 
        else:
            info['lasttime'] = time.time() + 0.06

        return await execute_method(session, method, params)

loop = asyncio.get_event_loop()
app = web.Application()

async def messages(request: web.Request):
    data = await request.json()
    print(data)
    try:
        if data['type'] == 'confirmation':
            return web.Response(text=CONFIRMATION_TOKEN)
        elif data['secret'] == SECRET:
            newdata['peer_id'] = data['object']['message']['peer_id']
            newdata['message'] = data['object']['message']['text']
            if data['type'] == 'message_new':
                id = data['object']['message']['from_id']
                body = data['object']['message']['text']
                res = await loop.create_task(vk_method(methodsMap['message'], newdata))
                return web.Response(text="OK")
            else:
                return web.Response(text='I can only work with the message_new event')
        else:
            return web.Response(text='Invalid secret key')
    except Exception as e:
        print(web.Response(text=str(traceback.format_exc())))
        return web.Response(text=str(traceback.format_exc()))

app.add_routes([web.post('/', messages)])

web.run_app(app, port=80)