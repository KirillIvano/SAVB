# API routes for authorisation
# Should start with /api/auth
import settings
from helpers import jwt
from helpers.csrf import generate_csrf
from helpers import responses
from helpers import vk_api

from aiohttp import web
import json

routes = web.RouteTableDef()


def generate_access_response(user_id: str):
	csrf = generate_csrf()

	access_jwt = jwt.encode(payload={"userId": user_id})
	refresh_jwt = jwt.encode(payload={"userId": user_id, "csrf": csrf})

	response_body = json.dumps({
		"data": {
			"accessJwt": access_jwt,
			"csrf": csrf,
			"userId": user_id
		}
	})
	resp = web.Response(body=response_body)
	resp.set_cookie(
		'refreshJwt', refresh_jwt,
		httponly=True
	)
	return resp


@routes.post('/api/auth/login')
async def auth_login(request: web.Request):
	request_dict: dict = await request.json()
	access_token_response = await vk_api.get_access_token(
		client_id=settings.CLIENT_ID,
		client_secret=settings.CLIENT_SECRET,
		redirect_uri=request_dict.get('redirectUri'),
		code=request_dict.get('code')
	)
	user_id = access_token_response.get('user_id')

	if user_id is None:
		return responses.generate_error_response('no user id')

	return generate_access_response(user_id)


@routes.post('/api/auth/refreshTokens')
async def auth_refresh_tokens(request: web.Request):
	request_dict: dict = await request.json()
	try:
		user_id = request_dict.get('userId')
		assert user_id is not None, 'userId is null'

		jwt.verify_refresh(
			cookies=dict(request.cookies),
			body=request_dict
		)
	except AssertionError as e:
		return responses.generate_error_response(';'.join(e.args))

	return generate_access_response(user_id)
