import os
import dotenv
import time
import asyncio
import traceback
from aiohttp import ClientSession
import aiohttp
import json
from aiohttp import web
from cache import *

library_cache = get_library_cache()

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


def get_vk_interactor(type='group'):
    delay = .35 if type is 'user' else .06

    async def vk_bot_method(method: str, params: dict):
        async with aiohttp.ClientSession() as session:
            access_token = params['access_token']
            print(library_cache())
            if library_cache.includes(access_token):

                difference = library_cache.get(access_token) - time.time()
            
                if difference > 0: 
                    oldtime = library_cache.get(access_token)
                    library_cache.set(access_token, oldtime + delay)

                    await asyncio.sleep(difference) 

                else:
                    library_cache.set(access_token, time.time() + delay)
            else:
                library_cache.set(access_token, time.time() + delay)

            return await execute_method(session, method, params)
    
    return vk_bot_method


