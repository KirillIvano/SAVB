from views.auth import check_auth
from helpers.log import logged
from helpers import responses, jwt
from database.models import objects, DialogState, BotAdmin

from aiohttp import web
routes = web.RouteTableDef()


# message_preview = {
#     id: number;
#     botId: number;
#     name: string;
# }


@routes.get('/api/stage/byBot')
@logged(False)
@check_auth
async def by_bot(request: web.Request):
    user_id = jwt.get_attr_from_access_jwt(request, 'userId')

    if not user_id:
        return responses.generate_error_response(
            'Ошибка авторизации', 401
        )

    bot_id = request.query.get('botId')

    if not bot_id:
        return responses.generate_error_response(
            'Не передан параметр botId', 400)

    is_admin = await objects.execute(
        BotAdmin.select().where(
            BotAdmin.bot_id == bot_id
        )
    )
    if len(is_admin) == 0:
        return responses.generate_error_response('Нет бота с таким id', 400)

    if str(is_admin[0].admin_id) != str(user_id):
        return responses.generate_error_response('Нет доступа к боту', 400)

    stages = await objects.execute(
        DialogState.select(
            DialogState.state_id,
            DialogState.name
        ).where(
            DialogState.bot_id == bot_id
        ).order_by(
            DialogState.state_id
        )
    )

    previews = []
    for st in stages:
        previews.append(
            dict(
                id=st.state_id,
                botId=bot_id,
                name=st.name
            )
        )

    return responses.generate_json_response(
        body=dict(
            stages=previews,
            start_id=stages[0].state_id
        )
    )


@routes.put('/api/stage/edit')
@logged(False)
@check_auth
async def edit_stage(request: web.Request):
    body = await request.json()
    name = body.get('name')
    stage_id = body.get('stageId')

    if not name or not stage_id:
        return responses.generate_error_response(
            'Неверные параметры в теле запроса', 400
        )

    stage = await objects.execute(
        DialogState.select(DialogState.bot_id).where(
            DialogState.state_id == stage_id
        )
    )
    if len(stage) == 0:
        return responses.generate_error_response(
            'Не найдено в базе данных', 400
        )
    bot_id = stage[0].bot_id.bot_id

    updated_stage = await objects.execute(
        DialogState.update(name=name).where(
            DialogState.state_id == stage_id
        )
    )

    return responses.generate_json_response(
            body=dict(
                stage=dict(
                    stageId=stage_id,
                    botId=bot_id,
                    name=name
                ),
            ))
