# API routes for authorisation
# Should start with /api/group

from aiohttp import web
routes = web.RouteTableDef()

@routes.get('/api/group')
async def handle(request: web.Request):
	# user_id = request ...
	return web.Response(text='Привет')
