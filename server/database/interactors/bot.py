import asyncio
from database import *

async def get_response_info(body):

    msg = await objects.execute(BotMessage.select().from_(Dialog).join(
        Trigger, on=(Dialog.current_state_id == Trigger.initial_state_id)
    ).join(
        UserMessage, on=(Trigger.trigger_id == UserMessage.trigger_id)
    ).where(UserMessage.text == body).join(
        Action, on=(Trigger.action_id == Action.action_id)
    ).join(
        BotMessage, on=(Action.action_id == BotMessage.action_id)
    ))

    btn = await objects.execute(KeyboardButton.select().from_(Dialog).join(
        Trigger, on=(Dialog.current_state_id == Trigger.initial_state_id)
    ).join(
        UserMessage, on=(Trigger.trigger_id == UserMessage.trigger_id)
    ).where(UserMessage.text == body).join(
        KeyboardButton, on=(Trigger.trigger_id == KeyboardButton.trigger_id)
    ))

    return msg, btn
