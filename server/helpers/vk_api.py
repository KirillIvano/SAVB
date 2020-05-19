from helpers.session import sess


async def get_access_token(
		client_id,
		client_secret,
		redirect_uri,
		code
):
	async with sess.get(
			f"https://oauth.vk.com/access_token?"
			f"client_id={client_id}&"
			f"client_secret={client_secret}&"
			f"redirect_uri={redirect_uri}&"
			f"code={code}"
	) as resp:
		return await resp.json()
