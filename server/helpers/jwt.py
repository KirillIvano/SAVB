import jwt
import settings


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
		cookies: dict,
		body: dict
):
	assert 'refreshJwt' in cookies.keys()
	refresh_jwt = decode(cookies['refreshJwt'])

	keys = ['csrf', 'userId']

	for key in keys:
		assert key in body.keys() and key in refresh_jwt.keys()

	return all(
		body[key] == refresh_jwt[key]
		for key in keys
	)
