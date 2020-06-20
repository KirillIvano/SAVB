from helpers.session import sess
from urllib import parse
import settings


async def get_access_token(
		redirect_uri,
		code,
		client_id=settings.CLIENT_ID,
		client_secret=settings.CLIENT_SECRET,
):
	url = "https://oauth.vk.com/access_token?"
	async with sess.get(
			url + parse.urlencode(
				{
					"client_id": client_id,
					"client_secret": client_secret,
					"redirect_uri": redirect_uri,
					"code": code
				}
			)
	) as resp:
		return await resp.json()


async def get_groups_access_token(
		redirect_uri,
		code,
		client_id=settings.CLIENT_ID,
		client_secret=settings.CLIENT_SECRET,
):
	url = "https://oauth.vk.com/access_token?"
	async with sess.get(
			url + parse.urlencode(
				{
					"client_id": client_id,
					"client_secret": client_secret,
					"redirect_uri": redirect_uri,
					"code": code,
				}
			)
	) as resp:
		return await resp.json()


async def vk_method(
		method_name: str,
		access_token: str = None,
		**parameters
) -> dict:
	url = f"https://api.vk.com/method/{method_name}?"
	parameters.update({"v": settings.VK_API_VERSION})
	if access_token:
		parameters.update(
			{"access_token": access_token,}
		)

	query = parse.urlencode(parameters)
	async with sess.get(url + query) as vk_response:
		return await vk_response.json()


async def get_users_info(access_token: str, user_id: int):
	return await vk_method(
		'users.get',
		access_token,
		user_id=user_id,
		fields='photo_200'
	)


async def get_user_group_list(access_token: str, user_id: int):
	return await vk_method(
		'groups.get',
		access_token,
		user_id=user_id,
		extended=1,
		filter='admin',
		fields='photo_200,members_count',
	)


async def get_groups(access_token: str, group_ids: [int or str]):
	return await vk_method(
		'groups.getById',
		access_token,
		group_ids=','.join([str(_) for _ in group_ids]),
		fields='photo_200,members_count',
	)


async def add_callback_server(
		group_access_token: str,
		group_id: int,
		title: str,
		secret: str
):
	# https://vk.com/dev/groups.addCallbackServer
	return await vk_method(
		'groups.addCallbackServer',
		group_access_token,
		group_id=group_id,
		title=title,
		secret_key=secret,
		url=settings.CALLBACK_SERVER_URL,
	)


async def get_group_callback_servers(group_access_token, group_id):
	# https://vk.com/dev/groups.getCallbackServers
	return await vk_method(
		'groups.getCallbackServers',
		group_access_token,
		group_id=group_id
	)


async def get_callback_confirmation_code(group_access_token, group_id):

	return await vk_method(
		'groups.getCallbackConfirmationCode',
		group_access_token,
		group_id=group_id
	)


async def delete_callback_server(group_access_token, group_id, server_id):
	return await vk_method(
		'groups.deleteCallbackServer',
		group_access_token,
		group_id=group_id,
		server_id=server_id
	)


async def set_callback_settings(group_access_token, group_id, server_id):
	return await vk_method(
		'groups.setCallbackSettings',
		group_access_token,
		group_id=group_id,
		server_id=server_id,
		api_version=settings.VK_API_VERSION,
		message_new=1
	)

