from database.models import objects, User

#  выглядит очень хуево, но пока не придумал,
#  как сделать это для динамический моделей


async def get_vk_access_token(user_id: int):
    try:
        q = await objects.get(User, user_id=user_id)
        return q.access_token
    except:
        return None


async def set_vk_access_token(user_id: int, access_token: str):
    user = await get_vk_access_token(user_id)
    if user is None:
        await objects.create(User, user_id=user_id, access_token=access_token)
    else:
        await objects.execute(User.update({'access_token': access_token}))
