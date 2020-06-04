import os
import dotenv
import time
import asyncio
import traceback
from aiohttp import ClientSession
import aiohttp
import json
from aiohttp import web
import cache
from cache import *

def enchance_params(params: dict):
    params.update({ 'v': "5.92" })

    return params

async def execute_method(
    session: aiohttp.ClientSession,
    method: str,
    params: dict
):
    async with session.get(f'https://api.vk.com/method/{method}', params = enchance_params(params)) as response:
        data = await response.json()
        return data

async def vk_method(method: str, params: dict):
    async with aiohttp.ClientSession() as session:
        access_token = params['access_token']
        if cache.Cache(BOT_REQUESTS_CACHE).includes(access_token):

            difference = cache.Cache(BOT_REQUESTS_CACHE).get(access_token) - time.time()
        
            if difference > 0: 
                oldtime = cache.Cache(BOT_REQUESTS_CACHE).get(access_token)
                cache.Cache(BOT_REQUESTS_CACHE).set(access_token, oldtime + 0.06)

                # print("Im sleeping", difference)
                await asyncio.sleep(difference) 

            else:
                cache.Cache(BOT_REQUESTS_CACHE).set(access_token, time.time() + 0.06)
        else:
            cache.Cache(BOT_REQUESTS_CACHE).set(access_token, time.time() + 0.06)

        return await execute_method(session, method, params)