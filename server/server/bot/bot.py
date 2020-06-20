import os
import traceback
import json
from aiohttp import web
import asyncio
from database.interactors.bot import *
from database.models import *
from helpers.responses import *
from helpers.cache import *
from helpers.keyboards import *
from library.vk_lib import *

token_cache = get_vk_token_cache()

newdata = {
    'random_id': 0
}

vk_method = get_vk_interactor()


def create_new_data(peer_id, message, token):
    newdata['peer_id'] = peer_id
    newdata['message'] = message
    newdata['access_token'] = token


async def messages(request: web.Request):

    data = await request.json()
    try:
        query = await objects.execute(Bot.select().where(Bot.bot_id == data['group_id']))
        if data['type'] == 'confirmation':
            confirmation_token = await objects.execute(Bot.select().where(Bot.bot_id == data['group_id']))
            return web.Response(text=confirmation_token[0].confirmation_token)
        elif data['secret'] == query[0].secret_key:

            if data['type'] == 'message_new':
                if not token_cache.includes(data['group_id']):

                    query = await objects.execute(Bot.select().where(Bot.bot_id == data['group_id']))
                    token_cache.set(data['group_id'], query[0].token)

                id = data['object']['message']['from_id']
                body = str(data['object']['message']['text']).lower()
                token = token_cache.get(data['group_id'])

                msg, buttons = await get_response_info(body)

                keyboard = create_keyboard(buttons)
                newdata['keyboard'] = keyboard


                if len(msg):

                    create_new_data(data['object']['message']['peer_id'], msg[0].text, token)

                    await loop.create_task(vk_method("messages.send", newdata))

                    await get_update_state_id()

                else:
                    create_new_data(data['object']['message']['peer_id'], "Извините, не знаю такой комманды", token)

                    await loop.create_task(vk_method("messages.send", newdata))

                return web.Response(text="Ok")

            else:
                return web.Response(text='Only message_new supported')

        else:
            return web.Response(text='Invalid secret key')
            
    except Exception as e:
        print(traceback.format_exc())
        return web.Response(text=traceback.format_exc())

loop = asyncio.get_event_loop()
bot_app = web.Application()

bot_app.add_routes(
    [web.post('/bot_callback', messages)]
)