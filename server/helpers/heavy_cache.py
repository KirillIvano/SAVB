from database.models import User

#  выглядит очень хуево, но пока не придумал,
#  как сделать это для динамический моделей


def get_vk_access_token(user_id: int):
    try:
        q = User.get_by_id(user_id)
        return q.access_token
    except:
        return None


def set_vk_access_token(user_id: int, access_token: str):
    if get_vk_access_token(user_id) is None:
        User().create(user_id=user_id, access_token=access_token)
    else:
        User.set_by_id(user_id, {User.access_token: access_token})
