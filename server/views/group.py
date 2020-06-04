# API routes for authorisation
# Should start with /api/group
from views.auth import check_auth
from helpers import vk_api, cache, heavy_cache, responses

from aiohttp import web
routes = web.RouteTableDef()


@routes.get('/api/group')
@check_auth
async def handle(request: web.Request):

	user_id: int = int(request.query.get('userId'))
	if user_id is None:
		return responses.generate_error_response('no user_id parameter', 401)

	if cache.get_vk_token_cache().includes(user_id):
		access_token = cache.get_vk_token_cache().get(user_id)
	else:
		access_token = heavy_cache.get_vk_access_token(user_id)
		if access_token is None:
			return responses.generate_error_response('no access token in cache', 401)

	vk_response = await vk_api.group(access_token, user_id)
	vk_response_body = vk_response.get('response')
	if not vk_response_body:
		return responses.generate_error_response(f'bad vk_response: {vk_response}')

	groups = []
	for group in vk_response_body.get('items'):
		groups.append({
			'name': group.get('name'),
			'id': group.get('id'),
			'image': group.get('photo_200')
		})

	return responses.generate_json_response(
		groups=groups
	)