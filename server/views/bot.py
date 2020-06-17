# Should start with /api/bot[s]
from views.auth import check_auth
from helpers.log import logged
from helpers import vk_api, cache, heavy_cache, responses, jwt, csrf
from database.models import objects, Bot, DialogState, Trigger, Action, \
    BotMessage, BotAdmin, Admin
import settings
from aiohttp import web

routes = web.RouteTableDef()

vk_token_cache = cache.get_vk_token_cache()

@routes.get('/api/bots')
@logged(True)
@check_auth
async def bot(request: web.Request):
    user_id = int(jwt.get_attr_from_access_jwt(request, 'userId'))

    if cache.get_vk_token_cache().includes(user_id):
        access_token = cache.get_vk_token_cache().get(user_id)
    else:
        access_token = await heavy_cache.get_vk_access_token(user_id)
        if access_token is None:
            return responses.generate_error_response(
                'no access token in cache', 401
            )

    bot_admin_fetch = await objects.execute(
        BotAdmin
            .select()
            .where(BotAdmin.admin_id == user_id)
    )

    bot_ids = [bot_admin.bot_id for bot_admin in bot_admin_fetch]

    if not bot_ids:
        return responses.generate_json_response(
            body=dict(bots=[])
        )

    bots_vk_info = (
        await vk_api.get_groups(access_token, bot_ids)
    ).get('response')
    bots = []

    for b in bots_vk_info:
        bots.append(
            {
                'id': b['id'],
                'name': b['name'],
                'image': b['photo_200'],
                'membersCount': b['members_count'],
            }
        )

    return responses.generate_json_response(
        body=dict(bots=bots)
    )


# example: (get) - http://194.67.109.99:500/api/bot?bot_id=12345
@routes.get('/api/bot/{bot_id}')
@logged(True)
@check_auth
async def get_single_bot(request: web.Request):
    bot_id = request.match_info.get('bot_id', None)
    user_id = int(jwt.get_attr_from_access_jwt(request, 'userId'))

    if cache.get_vk_token_cache().includes(user_id):
        access_token = cache.get_vk_token_cache().get(user_id)
    else:
        access_token = await heavy_cache.get_vk_access_token(user_id)
        if access_token is None:
            return responses.generate_error_response(
                'no access token in cache', 401
            )

    bot_ids_fetch = await objects.execute(
        BotAdmin.select().where(
            (BotAdmin.admin_id == user_id) & (BotAdmin.bot_id == bot_id)
        )
    )

    if not bot_ids_fetch:
        return responses.generate_error_response(
            'У Вас нет такой группы', 400
        )

    bot_ids = [bot_id]

    bots_vk_info = (
        await vk_api.get_groups(
            access_token,
            bot_ids
        )
    ).get('response')

    if not bots_vk_info:
        return responses.generate_error_response(
            'Произошла ошибка с vk API', 500
        )

    bot = {
        'id': bots_vk_info[0]['id'],
        'name': bots_vk_info[0]['name'],
        'image': bots_vk_info[0]['photo_200'],
        'membersCount': bots_vk_info[0]['members_count'],
    }
    
    return responses.generate_json_response(
        body=dict(bot=bot)
    )



@routes.post('/api/bot/create')
@logged(False)
@check_auth
async def create_bot(request: web.Request):

    # todo: удалять старые колбэки с нашим сервером

    request_dict: dict = await request.json()

    code = request_dict.get('code')
    redirect_uri = request_dict.get('redirectUri')
    user_id = jwt.get_attr_from_access_jwt(request, 'userId')

    if not all([code, redirect_uri, user_id]):
        return responses.generate_error_response(
            f'wrong parameters query: {request_dict}', 400
        )

    group_access_token_vk_response: dict = await vk_api.get_groups_access_token(
        redirect_uri=redirect_uri,
        code=code,
    )

    # вк присылает {access_token_123: xxx}
    # Отсюда получаю group id и access token
    for k, v in group_access_token_vk_response.items():
        if str(k).startswith('access_token'):
            group_access_token: str = v
            group_id: int = int(k.split('_')[-1])
            break
    else:
        return responses.generate_error_response(
            f"no group access token: {group_access_token_vk_response}", 400
        )

    group_secret = csrf.generate_csrf()
    group_name = (await vk_api.get_groups(
        access_token=group_access_token,
        group_ids=[group_id]
    ))['response'][0]['name']

    cb_servers = await vk_api.get_group_callback_servers(
        group_access_token, group_id=group_id
    )
    # если уже добавлен колбэк-сервер с нашим url'ом
    for cb in cb_servers['response']['items']:
        if cb['url'] == settings.CALLBACK_SERVER_URL:
            return responses.generate_error_response(
                message='group already has our url',
                status=400
            )

    await vk_api.add_callback_server(
        group_access_token=group_access_token,
        group_id=int(group_id),
        title='savb',
        secret=group_secret
    )

    bot = await objects.create(
        Bot,
        bot_id=group_id,
        token=group_access_token,
        name=group_name,
        secret_key=group_secret
    )

    await objects.create(
        BotAdmin,
        bot_id=group_id,
        admin_id=user_id,
    )
    print(f'bot {bot} created')

    dialogstate_id = (await objects.create(
        DialogState, bot_id=group_id
    )).state_id

    action = await objects.create(
        Action,
        target_state_id=dialogstate_id
    )

    start_message = await objects.create(
        BotMessage,
        bot_id=group_id,
        text='Приветик',
        action_id=action.action_id
    )

    trigger = await objects.create(
        Trigger,
        initial_state_id=dialogstate_id,
        action_id=action.action_id
    )

    return responses.generate_json_response(body={})

