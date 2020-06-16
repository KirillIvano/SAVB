# Should start with /api/user
from helpers import vk_api, cache, heavy_cache, responses, jwt
from views.auth import check_auth
from helpers.log import logged

from aiohttp import web

routes = web.RouteTableDef()


@routes.get(path='/api/user/info')
@logged(True)
@check_auth
async def info(request: web.Request):
    user_id = int(jwt.get_attr_from_access_jwt(request, 'userId'))

    if cache.get_vk_token_cache().includes(user_id):
        access_token = cache.get_vk_token_cache().get(user_id)
    else:
        access_token = await heavy_cache.get_vk_access_token(user_id)
        if access_token is None:
            return responses.generate_error_response(
                'no access token in cache', 401
            )

    vk_response = await vk_api.get_users_info(access_token, user_id)
    try:
        vk_response_body = vk_response['response'][0]
    except KeyError:
        return responses.generate_error_response(
            'vk did not response: ' + str(vk_response),
            400
        )

    user_full_name = ' '.join(
        [vk_response_body['first_name'], vk_response_body['last_name']]
    )
    user_image = vk_response_body['photo_200']

    return responses.generate_json_response(
        body=dict(
            userId=user_id,
            name=user_full_name,
            image=user_image,
        )
    )
