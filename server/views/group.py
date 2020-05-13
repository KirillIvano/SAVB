from aiohttp import web
routes = web.RouteTableDef()

@routes.get('/group')
async def handle(request):
	# user_id = request ...
	return web.Response(text='Привет')
