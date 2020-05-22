# API routes for authorisation
# Should start with /api/auth
import settings
from helpers import jwt
from helpers.csrf import generate_csrf
from helpers import responses
from helpers import vk_api

import jwt as jwt_lib
from aiohttp import web
import json

routes = web.RouteTableDef()


@routes.post('/api/auth/login')
async def auth_login(request: web.Request):
	try:
		request_dict: dict = await request.json()
	except TypeError:
		return responses.generate_error_response(
			'Could not get json from request'
		)

	access_token_response = await vk_api.get_access_token(
		client_id=settings.CLIENT_ID,
		client_secret=settings.CLIENT_SECRET,
		redirect_uri=request_dict.get('redirectUri'),
		code=request_dict.get('code')
	)
	user_id = access_token_response.get('user_id')

	if user_id is None:
		return responses.generate_error_response(
			f'no user id in vk response: {access_token_response}'
		)

	return responses.generate_access_response(user_id)


@routes.post('/api/auth/refreshTokens')
async def auth_refresh_tokens(request: web.Request):
	print(request.headers)
	request_dict: dict = await request.json()
	try:
		user_id = request_dict.get('userId')
		assert user_id is not None, 'userId is null'

		jwt.verify_refresh_request(
			cookies=request.cookies,
			body=request_dict
		)
	except AssertionError as e:
		return responses.generate_error_response(';'.join(e.args))
	except jwt_lib.ExpiredSignatureError as e:
		return responses.generate_error_response('refresh token expired')

	return responses.generate_access_response(user_id)


# check auth decorator
def check_auth(func):
	pass
