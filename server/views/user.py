# API routes for authorisation
# Should start with /api/group
from helpers import vk_api, cache, responses
from urllib import parse

from aiohttp import web
routes = web.RouteTableDef()


@routes.get(path='/api/user/info')
async def info(request: web.Request):
    try:
        user_id: str = request.query['userId']
    except KeyError:
        return responses.generate_error_response('no user_id parameter', 401)

    try:
        access_token = cache.vk_access_tokens[user_id]
    except KeyError:
        return responses.generate_error_response('no access_token in cache')

    return web.Response(body=vk_api.users_info(access_token, user_id))
