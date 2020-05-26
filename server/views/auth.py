# API routes for authorisation
# Should start with /api/auth
import settings
from helpers import jwt
from helpers import responses
from helpers import vk_api
from helpers import cache

import jwt as jwt_lib
from aiohttp import web
import functools
import json

routes = web.RouteTableDef()


# check auth decorator
def check_auth(func):
	@functools.wraps(func)
	async def process(request):
		try:
			request_dict: dict = request.query
		except json.decoder.JSONDecodeError:
			return responses.generate_error_response('no request params', 401)

		try:
			verified = jwt.verify_access_request(request.cookies)
		except AssertionError as e:
			return responses.generate_error_response(' '.join(e.args), 401)

		if verified:
			return await func(request)
		else:
			return responses.generate_error_response('bad accessJwt ot no accessJwt')
	return process


@routes.post('/api/auth/login')
async def auth_login(request: web.Request):
	try:
		request_dict: dict = await request.json()
	except TypeError:
		return responses.generate_error_response(
			'Could not get json from request'
		)

	access_token_response = await vk_api.get_access_token(
		redirect_uri=request_dict.get('redirectUri'),
		code=request_dict.get('code')
	)
	user_id: int = access_token_response.get('user_id')
	print(cache)
	cache.VkAccessTokens().set(
		user_id, access_token_response.get('access_token')
	)

	if user_id is None:
		return responses.generate_error_response(
			f'no user_id in vk response: {access_token_response}'
		)

	return responses.generate_access_response(user_id)


@routes.post('/api/auth/refreshTokens')
async def auth_refresh_tokens(request: web.Request):
	request_dict: dict = await request.json()
	try:
		user_id = request_dict.get('userId')
		assert user_id is not None, 'userId is null'

		jwt_verified = jwt.verify_refresh_request(
			cookies=request.cookies,
			body=request_dict
		)
	except AssertionError as e:
		return responses.generate_error_response(';'.join(e.args))

	except jwt_lib.ExpiredSignatureError as e:
		return responses.generate_error_response('refresh token expired')

	if not jwt_verified:
		return responses.generate_error_response('refresh jwt does not match body')

	return responses.generate_access_response(user_id)
