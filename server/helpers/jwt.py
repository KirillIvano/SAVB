import jwt as jwt_lib
import settings
from aiohttp import web


def encode(payload: dict) -> str:
	return jwt_lib.encode(
		payload=payload,
		key=settings.JWT_TOKEN,
	).decode()


def verify(token: str) -> dict or bool:
	try:
		return jwt_lib.decode(
			jwt=token,
			key=settings.JWT_TOKEN
		)
	except jwt_lib.exceptions.ExpiredSignatureError:
		return False


def match(token: str, body: dict, *keys: str) -> bool:
	try:
		payload = verify(token)
	except jwt_lib.exceptions.InvalidSignatureError:
		return False
	except jwt_lib.exceptions.ExpiredSignatureError:
		return False

	matched = True
	for key in keys:
		assert key in body.keys(), f'{key} not in request body'
		assert key in payload.keys(), f'{key} not in jwt'

		if str(body[key]) != str(payload[key]):
			matched = False
			break

	return matched


def verify_refresh_request(
		cookies: [str, str],
		body: dict
) -> bool:
	refresh_jwt = cookies.get('refreshJwt')
	assert refresh_jwt, "cookies don't have refreshJwt"

	return match(refresh_jwt, body, 'csrf', 'userId')


def verify_access_request(
		cookies: [str, str],
) -> bool:

	access_jwt = cookies.get('accessJwt')
  
	if not access_jwt:
		return False
  
	return True if verify(access_jwt) else False

