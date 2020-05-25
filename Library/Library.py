import os
import dotenv
import time
import asyncio
import traceback
from aiohttp import ClientSession
import aiohttp
import json
from aiohttp import web

methodsMap = {
    'history': 'messages.getHistory',
    'message': 'messages.send'
}

values = {
    'v': "5.92",
}

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
        info['cnt'] = info['cnt'] + 1
        print(time.time() - info['start'], info['cnt']) 
        return data

async def vk_method(method: str, params: dict):
    async with aiohttp.ClientSession() as session:
        difference = info['lasttime'] - time.time()
        if (difference > 0): 
            info['lasttime'] += 0.06
            await asyncio.sleep(difference) 
        else:
            info['lasttime'] = time.time() + 0.06

        return await execute_method(session, method, params)