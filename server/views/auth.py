from aiohttp import web
routes = web.RouteTableDef()

@routes.post('/api/auth/login')
async def auth_login(request):
	request_json = await request.json()
	return web.Response(text='not_yet')

@routes.post('/api/auth/refreshTokens')
async def auth_refresh_tokens(request):
	return web.Response(text='not_yet')