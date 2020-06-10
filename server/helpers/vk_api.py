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


async def vk_method(
		method_name: str,
		access_token: str,
		**parameters
) -> dict:
	url = f"https://api.vk.com/method/{method_name}?"
	parameters.update(
		{
			"access_token": access_token,
			"v": settings.VK_API_VERSION
		}
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


async def get_groups(access_token: str, group_ids: [int]):
	return await vk_method(
		'groups.getById',
		access_token,
		group_ids=','.join(group_ids),
		fields='photo_200,members_count',
	)

