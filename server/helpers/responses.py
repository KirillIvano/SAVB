from aiohttp import web
import json
from helpers import jwt, csrf


def generate_error_response(message: str, status: int = 500):
	return web.Response(
		status=status,
		body=json.dumps({'error':  message})
	)


def generate_access_response(user_id: str):
	csrf_ = csrf.generate_csrf()

	access_jwt = jwt.encode(payload={"userId": user_id, })
	refresh_jwt = jwt.encode(payload={"userId": user_id, "csrf": csrf_})

	response_body = json.dumps({
		"data": {
			"accessJwt": access_jwt,
			"csrf": csrf,
			"userId": user_id
		}
	})
	resp = web.Response(body=response_body)
	resp.set_cookie(
		'refreshJwt', refresh_jwt,
	)
	return resp
