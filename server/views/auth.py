# API routes for authorisation
# Should start with /api/auth
import json
import jwt
import settings
from helpers.session import sess
from helpers import vk_api
import random

from aiohttp import web

routes = web.RouteTableDef()


@routes.get('/api/auth/showCode')
async def auth_login(request: web.Request):
	code = request.query.get('code')
	async with sess.get(
			f"http://oauth.vk.com/access_token?"
			f"client_id={settings.CLIENT_ID}&"
			f"client_secret={settings.CLIENT_SECRET}&"
			f"redirect_uri=http://0.0.0.0:8080/api/auth/showCode&"
			f"code={code}"
	) as resp:
		responce_json = await resp.json()
		user_id = responce_json.get('user_id')
	return web.Response(text=str('worked'))


@routes.post('/api/auth/login')
async def auth_login(request: web.Request):
	request_dict = await request.json()
	access_token_response = vk_api.access_token(
		client_id=settings.CLIENT_ID,
		client_secret=settings.CLIENT_SECRET,
		redirect_uri=request_dict.get('redirectUri'),
		code=request_dict.get('code')
	)
	user_id = (await access_token_response).get('user_id')

	if user_id is None:
		resp = web.Response(
			body=json.dumps({
				"error"
			})
		)

	csrf = random.getrandbits(64)

	access_jwt = jwt.encode(
		payload={"userId": user_id},
		key=settings.JWT_TOKEN,
	).decode()

	refresh_jwt = jwt.encode(
		payload={"userId": user_id, "csrf": csrf},
		key=settings.JWT_TOKEN,
	).decode()

	responce_body = json.dumps({
		"data": {
			"accessJwt": access_jwt,
			"csrf": csrf,
			"userId": user_id
		}
	})
	resp = web.Response(body=responce_body)
	resp.cookies['refreshJwt'] = refresh_jwt
	return resp


@routes.post('/api/auth/refreshTokens')
async def auth_refresh_tokens(request: web.Request):
	return web.Response(text='not_yet')
