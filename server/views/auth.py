from aiohttp import web
routes = web.RouteTableDef()

@routes.get('/test_connection')
async def handle(request):
	return web.Response(text='Привет')

@routes.post('/auth/login')
async def auth_login(request):
	request_json = await request.json()
	return web.Response(text='not_yet')

@routes.post('/auth/refreshTokens')
async def auth_refresh_tokens(request):
	return web.Response(text='not_yet')