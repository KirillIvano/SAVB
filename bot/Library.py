import os
import dotenv
import time
import asyncio
import traceback
from aiohttp import ClientSession
import aiohttp

dotenv.load_dotenv()
token = os.environ.get('vk_token')

methodsMap = {
    'history': 'messages.getHistory',
    'message': 'messages.send'
}

values = {}
values['v'] = "5.92"
values['access_token'] = token

info =  {}
info['lasttime'] = 0
info['errors'] = 0

def enchance_params(params: dict):
    params.update(values)
    return params
    
async def execute_method(
    session: aiohttp.ClientSession,
    method: str,
    params: dict
):
    async with session.get(f"https://api.vk.com/method/{method}", params = enchance_params(params)) as response:
        data = await response.json()
        print(data)
        
        # try:
        #     print(data['response']['count'])
        # except:
        #     info['errors'] += 1

async def vk_method(method, params):
    async with aiohttp.ClientSession() as session:
        difference = info['lasttime'] - time.time()
 
        if (difference > 0): 
            info['lasttime'] += 0.06
            await asyncio.sleep(difference) 
        else:
            info['lasttime'] = time.time() + 0.06

        # тут не было await, выполнение функции не ожидалось, и программа оканчивала свою работу до окончания запроса
        await asyncio.gather(
            execute_method(session, method, params) 
        )

start = time.time()

loop = asyncio.get_event_loop()
loop.run_until_complete(
    vk_method(methodsMap['history'], {"user_id": 169871363}) # получение истории 
)

print(time.time() - start, "seconds passed, errors:", info['errors'])