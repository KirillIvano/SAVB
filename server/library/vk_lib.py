import time
import asyncio
import aiohttp
from helpers.cache import get_library_cache
import settings

library_cache = get_library_cache()


def _enhance_params(params: dict):
    params.update(
        {'v': settings.VK_API_VERSION}
    )
    return params


async def _execute_method(
    session: aiohttp.ClientSession,
    method: str,
    **params
):
    async with session.get(
        f'https://api.vk.com/method/{method}', 
        params=_enhance_params(params)
    ) as response:
        return await response.json()


def get_vk_interactor(request_type='group'):
    delay = .35 if request_type == 'user' else .06

    async def vk_bot_method(method: str, **params):
        
        async with aiohttp.ClientSession() as session:
            access_token = params['access_token']

            if library_cache.includes(access_token):
                difference = library_cache.get(access_token) - time.time()
            
                if difference > 0: 
                    old_time = library_cache.get(access_token)
                    library_cache.set(access_token, old_time + delay)
                    await asyncio.sleep(difference) 

                else:
                    library_cache.set(access_token, time.time() + delay)

            else:
                library_cache.set(access_token, time.time() + delay)

            return await _execute_method(session, method, **params)
    
    return vk_bot_method
