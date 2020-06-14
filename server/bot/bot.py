import os
import traceback
import json
from aiohttp import web
import asyncio
import helpers
from database import *
from helpers import *
from library import *

token_cache = get_vk_token_cache()

newdata = {
    'random_id': 0
}

vk_method = get_vk_interactor()

def json_response(text: str):

    return web.Response(text=text)

def create_new_data(peer_id, message, token):
    newdata['peer_id'] = peer_id
    newdata['message'] = message
    newdata['access_token'] = token

async def messages(request: web.Request):
    data = await request.json()
    try:
        query = await objects.execute(Bot.select().where(Bot.bot_id == data['group_id']))
        if data['type'] == 'confirmation':
            return json_response(Bot.select().where(Bot.bot_id == data['group_id'])[0].confirmation_token)
        elif data['secret'] == query[0].secret_key:

            if data['type'] == 'message_new':
                if not token_cache.includes(data['group_id']):

                    query = await objects.execute(Bot.select().where(Bot.bot_id == data['group_id']))
                    token_cache.set(data['group_id'], query[0].token)

                id = data['object']['message']['from_id']
                body = str(data['object']['message']['text']).lower()
                token = token_cache.get(data['group_id'])
                msg = await objects.execute(BotMessage.select().from_(Dialog).join(
                    Trigger, on=(Dialog.current_state_id == Trigger.initial_state_id)
                ).join(
                    UserMessage, on=(Trigger.trigger_id == UserMessage.trigger_id)
                ).where(UserMessage.text == body).join(
                    Action, on=(Trigger.action_id == Action.action_id)
                ).join(
                    BotMessage, on=(Action.action_id == BotMessage.action_id)
                ))

                buttons = await objects.execute(KeyboardButton.select().from_(Dialog).join(
                    Trigger, on=(Dialog.current_state_id == Trigger.initial_state_id)
                ).join(
                    UserMessage, on=(Trigger.trigger_id == UserMessage.trigger_id)
                ).where(UserMessage.text == body).join(
                    KeyboardButton, on=(Trigger.trigger_id == KeyboardButton.trigger_id)
                ))

                keyboard = create_keyboard(buttons)
                newdata['keyboard'] = keyboard


                if len(msg):

                    create_new_data(data['object']['message']['peer_id'], msg[0].text, token)

                    await loop.create_task(vk_method("messages.send", newdata))

                    q = await objects.execute(Dialog.update({Dialog.current_state_id: Action.target_state_id}).from_(Trigger, UserMessage, Action).where(
                    Dialog.current_state_id == Trigger.initial_state_id
                    ).where(
                        Trigger.trigger_id == UserMessage.trigger_id
                    ).where(UserMessage.text == body).where(
                        Trigger.action_id == Action.action_id
                    ))

                else:
                    create_new_data(data['object']['message']['peer_id'], "Извините, не знаю такой комманды", token)

                    await loop.create_task(vk_method("messages.send", newdata))

                return json_response("OK")

            else:
                return json_response('I can only work with the message_new event')

        else:
            return json_response('Invalid secret key')
            
    except Exception as e:
        print(traceback.format_exc())
        return json_response(traceback.format_exc())

loop = asyncio.get_event_loop()
bot_app = web.Application()

bot_app.add_routes(
    [web.post('/', messages)]
)