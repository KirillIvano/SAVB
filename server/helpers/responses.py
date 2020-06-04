from aiohttp import web
import json
import time

from helpers import jwt, csrf
import settings


def generate_json_response(
        status: int = 200,
        error_message: str = '',
        body: dict = None):
    # add logs here

    if status == 200:
        json_body = json.dumps(body, ensure_ascii=False)
    else:
        json_body = json.dumps({'error': error_message}, ensure_ascii=False)

    return web.Response(status=status, body=json_body), status, body


# sugar
def generate_error_response(message: str, status: int = 401):
    return generate_json_response(status, message)


# sugar
def generate_access_response(user_id: int):
    csrf_: str = csrf.generate_csrf()
    user_id: str = str(user_id)

    access_exp = time.time().__int__() + settings.ACCESS_TOKEN_EXP
    access_jwt: str = jwt.encode(
        payload={
            "userId": user_id,
            "exp": access_exp,
        }
    )

    refresh_exp = time.time().__int__() + settings.REFRESH_TOKEN_EXP
    refresh_jwt: str = jwt.encode(
        payload={
            "userId": user_id,
            "csrf": csrf_,
            "exp": refresh_exp,
        }
    )

    resp, status, body = generate_json_response(
        body=dict(
            csrf=csrf_,
            userId=user_id,
            accessExp=access_exp,
            refreshExp=refresh_exp
        )
    )
    resp.set_cookie('refreshJwt', refresh_jwt, httponly=False)
    resp.set_cookie('accessJwt', access_jwt, httponly=False)
    return resp, status, body
