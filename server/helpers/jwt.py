import jwt
import settings
import http.cookies

def encode(payload: dict):
	return jwt.encode(
		payload=payload,
		key=settings.JWT_TOKEN,
	).decode()


def decode(token: str):
	return jwt.decode(
		jwt=token,
		key=settings.JWT_TOKEN
	)


def verify(token: str, payload: dict):
	return payload == decode(token)


def verify_refresh(
		cookies: [str, str],
		body: dict
):
	print(cookies)
	assert 'refreshJwt' in cookies.keys(), "cookies don't have refreshJwt"
	refresh_jwt = decode(cookies['refreshJwt'])

	keys = ['csrf', 'userId']

	for key in keys:
		assert key in body.keys(), f'{key} not in request body'
		assert key in refresh_jwt.keys(), f'{key} not in jwt'

	return all(
		body[key] == refresh_jwt[key]
		for key in keys
	)
