# API routes for authorisation
# Should start with /api/group
from views.auth import check_auth
from helpers.log import logged
from helpers import vk_api, cache, heavy_cache, responses, jwt
from database.models import objects, Bot

from aiohttp import web
routes = web.RouteTableDef()


@routes.get('/api/group')
@logged(True)
@check_auth
async def handle(request: web.Request):

	cookies_body: dict = jwt.verify(request.cookies['accessJwt'])
	user_id = cookies_body['userId']

	if user_id is None:
		return responses.generate_error_response('no user_id parameter', 400)

	if cache.get_vk_token_cache().includes(user_id):
		access_token = cache.get_vk_token_cache().get(user_id)
	else:
		access_token = await heavy_cache.get_vk_access_token(user_id)
		if access_token is None:
			return responses.generate_error_response(
				'no access token in cache', 401
			)

	vk_response = await vk_api.group(access_token, user_id)
	vk_response_body = vk_response.get('response')
	if not vk_response_body:
		return responses.generate_error_response(
			f'bad vk_response: {vk_response}', 400
		)

	groups = {}
	for group in vk_response_body.get('items'):
		group_id = int(group['id'])
		groups[group_id] = {
			'id': group_id,
			'name': group['name'],
			'image': group['photo_200'],
			'isUsed': False
		}

	groups_in_db = await objects.execute(
		Bot.select(Bot.bot_id).where(Bot.bot_id << list(groups.keys()))
	)
	groups_in_db = [int(str(_)) for _ in groups_in_db]

	for g in groups_in_db:
		groups[g]['isUsed'] = True

	return responses.generate_json_response(
		body=dict(
			groups=list(groups.values())
		)
	)
