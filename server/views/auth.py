# API routes for authorisation
# Should start with /api/auth
import settings
from helpers import jwt
from helpers import responses
from helpers import vk_api
from helpers import cache
from helpers import heavy_cache

import jwt as jwt_lib
from aiohttp import web
import functools
import json

routes = web.RouteTableDef()


# check auth decorator
def check_auth(func):
    @functools.wraps(func)
    async def process(request):

        verified = jwt.verify_access_request(request.cookies)

        if not verified:
            return responses.generate_error_response('not verified', 401)

        return await func(request)
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
    if user_id is None:
        return responses.generate_error_response(
            f'no user_id in vk response: {access_token_response}'
        )

    access_token: str = access_token_response.get('access_token')
    if access_token is None:
        return responses.generate_error_response(
            f'no access_token in vk response: {access_token_response}'
        )

    cache.get_vk_token_cache().set(user_id, access_token)
    await heavy_cache.set_vk_access_token(user_id, access_token)

    return responses.generate_access_response(user_id)


@routes.post('/api/auth/refreshTokens')
async def auth_refresh_tokens(request: web.Request):
    request_dict: dict = await request.json()

    user_id = request_dict.get('userId')
    if user_id is None:
        return responses.generate_error_response('userId is null')

    try:
        jwt_verified = jwt.verify_refresh_request(
            cookies=request.cookies,
            body=request_dict
        )
    except jwt_lib.ExpiredSignatureError as e:
        return responses.generate_error_response('refresh token expired')

    if not jwt_verified:
        return responses.generate_error_response(
            'refresh jwt does not match body')

    return responses.generate_access_response(user_id)
