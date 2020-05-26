# API routes for authorisation
# Should start with /api/group
from helpers import vk_api, cache, responses
from views.auth import check_auth

from aiohttp import web

routes = web.RouteTableDef()


@routes.get(path='/api/user/info')
@check_auth
async def info(request: web.Request):
    try:
        user_id: str = request.query['userId']
    except KeyError:
        return responses.generate_error_response('no user_id parameter', 401)

    try:
        access_token = cache.VkAccessTokens().get(int(user_id))
    except KeyError:
        return responses.generate_error_response('no access_token in cache', 401)

    vk_response = await vk_api.users_info(access_token, user_id)
    try:
        vk_response_body = vk_response['response'][0]
    except KeyError:
        return responses.generate_error_response(
            'vk did not response: ' + str(vk_response)
        )

    user_full_name = ' '.join(
        [vk_response_body['first_name'], vk_response_body['last_name']]
    )
    user_image = vk_response_body['photo_200']

    return responses.generate_json_response(
        userId=user_id,
        name=user_full_name,
        image=user_image,
    )
