from app import app
from bot import bot
from aiohttp import web
import settings
from threading import Thread
import threading
import asyncio

runners = []

async def start(app, port, address='0.0.0.0'):
	runner = web.AppRunner(app)
	runners.append(runner)	
	await runner.setup()
	site = web.TCPSite(runner, address, port)
	await site.start()

if __name__ == '__main__':
	loop = asyncio.get_event_loop()

	loop.create_task(start(bot.bot_app, port=80))
	loop.create_task(start(app, port=400))
	try:
   		loop.run_forever()
	except:
		pass
	for runner in runners:
		loop.run_until_complete(runner.cleanup())