import asyncio
from aiohttp import web
from helpers.log import get_last_logs, logged
from helpers.responses import generate_json_response

routes = web.RouteTableDef()

@routes.get('/logs')
@logged(False)
async def handle_logs(request: web.Request):
	return generate_json_response(status=200, body= await get_last_logs())
