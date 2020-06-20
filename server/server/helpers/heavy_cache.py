from database.models import objects, Admin

#  выглядит очень хуево, но пока не придумал,
#  как сделать это для динамический моделей


async def get_vk_access_token(user_id: int):
    try:
        q = await objects.get(Admin, admin_id=user_id)
        return q.token
    except:
        return None


async def set_vk_access_token(user_id: int, access_token: str):
    user = await get_vk_access_token(user_id)
    if user is None:
        await objects.create(Admin, admin_id=user_id, token=access_token)

    else:

        await objects.execute(
            Admin.update(
                {'token': access_token}
            ).where(Admin.admin_id == user_id)
        )
