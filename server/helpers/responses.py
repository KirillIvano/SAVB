from aiohttp import web
import json
import time

from helpers import jwt, csrf
import settings


def generate_error_response(message: str, status: int = 500):
	return web.Response(
		status=status,
		body=json.dumps({'error':  message})
	)


def generate_access_response(user_id: str):
	csrf_: str = csrf.generate_csrf()

	access_jwt = jwt.encode(
		payload={
			"userId": user_id,
			"exp": time.time().__int__() + settings.ACCESS_TOKEN_EXP,
		}
	)
	refresh_jwt = jwt.encode(
		payload={
			"userId": user_id,
			"csrf": csrf_,
			"exp": time.time().__int__() + settings.REFRESH_TOKEN_EXP,
		}
	)

	response_body: str = json.dumps({
		"data": {
			"csrf": csrf_,
			"userId": user_id
		}
	})

	resp = web.Response(body=response_body)
	resp.set_cookie('refreshJwt', refresh_jwt)
	resp.set_cookie('accessJwt', access_jwt)
	return resp
