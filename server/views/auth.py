# API routes for authorisation
# Should start with /api/auth

from aiohttp import web
routes = web.RouteTableDef()

@routes.post('/api/auth/login')
async def auth_login(request: web.Request):
	request_json = await request.json()
	return web.Response(text='not_yet')

@routes.post('/api/auth/refreshTokens')
async def auth_refresh_tokens(request: web.Request):
	return web.Response(text='not_yet')